"""
AuraSynth 멀티 AI 브릿지 서버 (OpenVINO + ONNX/YOLOv8-Pose)
- 웹앱(Electron)에서 전송한 비디오 프레임을 수신하여 요청된 AI 모델로 실시간 손 랜드마크(21개 관절)를 추론합니다.
- 모델 1: Intel Geti (OpenVINO RTMPose-Tiny) - 좌/우 듀얼 분할 추론
- 모델 2: 커스텀 YOLOv8-Pose (ONNX) - 1.8만 장 데이터셋으로 학습된 고정밀 동시 다중 손 검출 모델
- Google MediaPipe 규격과 100% 호환되는 랜드마크 및 Handedness 데이터를 WebSocket으로 즉각 스트리밍합니다.
"""

import sys
import json
import asyncio
import os
import base64
import numpy as np
import cv2

try:
    import openvino as ov
    import websockets
except ImportError:
    print("[!] 필수 패키지가 없습니다. (pip install openvino websockets)")
    sys.exit(1)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_XML = os.path.join(BASE_DIR, "models", "openvino", "model.xml")
MODEL_ONNX = os.path.join(BASE_DIR, "models", "onnx", "model.onnx")

core = ov.Core()

# ========================================================
# 1. Intel Geti (OpenVINO RTMPose-Tiny) 모델 컴파일
# ========================================================
compiled_openvino = None
output_x = None
output_y = None

if os.path.exists(MODEL_XML):
    try:
        print("[*] [1/2] Intel Geti OpenVINO 모델 컴파일 중...")
        ov_model = core.read_model(MODEL_XML)
        compiled_openvino = core.compile_model(ov_model, "CPU")
        output_x = compiled_openvino.output("pred_x")
        output_y = compiled_openvino.output("pred_y")
        print("[+] Intel Geti OpenVINO 모델 로드 완료")
    except Exception as e:
        print(f"[!] OpenVINO 모델 로드 실패: {e}")
else:
    print(f"[-] OpenVINO 모델 파일 없음: {MODEL_XML}")

# Geti 라벨 순서를 MediaPipe 표준 21개 관절 인덱스로 매핑
GETI_TO_MEDIAPIPE = [
    16, # 0: WRIST
    15, # 1: THUMB_CMC
    14, # 2: THUMB_MCP
    13, # 3: THUMB_IP
    20, # 4: THUMB_TIP
    3,  # 5: INDEX_MCP
    2,  # 6: INDEX_PIP
    1,  # 7: INDEX_DIP
    0,  # 8: INDEX_TIP
    4,  # 9: MIDDLE_MCP
    10, # 10: MIDDLE_PIP
    11, # 11: MIDDLE_DIP
    12, # 12: MIDDLE_TIP
    5,  # 13: RING_MCP
    17, # 14: RING_PIP
    18, # 15: RING_DIP
    19, # 16: RING_TIP
    6,  # 17: PINKY_MCP
    7,  # 18: PINKY_PIP
    8,  # 19: PINKY_DIP
    9   # 20: PINKY_TIP
]

def infer_openvino_crop(crop_img, x_offset_ratio, x_scale_ratio):
    """OpenVINO RTMPose 크롭 영역 추론"""
    if compiled_openvino is None:
        return []
    resized = cv2.resize(crop_img, (512, 512))
    rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
    tensor = np.transpose(rgb, (2, 0, 1)).astype(np.float32)
    tensor = np.expand_dims(tensor, axis=0)

    res = compiled_openvino([tensor])
    pred_x = res[output_x]
    pred_y = res[output_y]

    raw_x = np.argmax(pred_x, axis=-1)[0] / 1024.0
    raw_y = np.argmax(pred_y, axis=-1)[0] / 1024.0

    landmarks = []
    for mp_idx in range(21):
        geti_idx = GETI_TO_MEDIAPIPE[mp_idx]
        global_x = x_offset_ratio + float(raw_x[geti_idx]) * x_scale_ratio
        global_y = float(raw_y[geti_idx])
        landmarks.append({
            "x": max(0.0, min(1.0, global_x)),
            "y": max(0.0, min(1.0, global_y))
        })
    return landmarks

def infer_openvino_dual(frame):
    """화면을 좌(0~60%)와 우(40~100%)로 분할하여 양손 추론"""
    h, w = frame.shape[:2]
    left_crop = frame[:, :int(w * 0.6)]
    right_crop = frame[:, int(w * 0.4):]

    left_lm = infer_openvino_crop(left_crop, x_offset_ratio=0.0, x_scale_ratio=0.6)
    right_lm = infer_openvino_crop(right_crop, x_offset_ratio=0.4, x_scale_ratio=0.6)

    return {
        "landmarks": [left_lm, right_lm],
        "handedness": [
            [{"categoryName": "Left"}],
            [{"categoryName": "Right"}]
        ]
    }

# ========================================================
# 2. 커스텀 학습된 YOLOv8-Pose (ONNX) 모델 컴파일
# ========================================================
compiled_yolo = None
yolo_output_key = None

if os.path.exists(MODEL_ONNX):
    try:
        print("[*] [2/2] 커스텀 YOLOv8-Pose ONNX 모델 컴파일 중...")
        yolo_model = core.read_model(MODEL_ONNX)
        compiled_yolo = core.compile_model(yolo_model, "CPU")
        yolo_output_key = compiled_yolo.output(0)
        print("[+] 커스텀 YOLOv8-Pose ONNX 모델 로드 완료 (실시간 다중 손 검출)")
    except Exception as e:
        print(f"[!] ONNX 모델 로드 실패: {e}")
else:
    print(f"[-] ONNX 모델 파일 없음: {MODEL_ONNX}")

def infer_yolo_onnx(frame):
    """YOLOv8-Pose ONNX 모델을 통한 실시간 다중 손 및 21개 키포인트 검출"""
    if compiled_yolo is None:
        return {"landmarks": [], "handedness": []}

    h, w = frame.shape[:2]
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    inp = cv2.resize(rgb, (640, 640)).transpose(2, 0, 1)[np.newaxis, ...].astype(np.float32) / 255.0

    out = compiled_yolo([inp])[yolo_output_key]
    pred = out[0].T  # [8400, 68]

    # 신뢰도 0.35 이상인 후보 검출
    mask = pred[:, 4] > 0.35
    filtered = pred[mask]
    if len(filtered) == 0:
        return {"landmarks": [], "handedness": []}

    boxes = []
    scores = []
    kpts_list = []

    for row in filtered:
        cx, cy, bw, bh = row[:4]
        boxes.append([int(cx - bw / 2), int(cy - bh / 2), int(bw), int(bh)])
        scores.append(float(row[4]))
        kpts_list.append(row[5:].reshape(21, 3))

    idxs = cv2.dnn.NMSBoxes(boxes, scores, score_threshold=0.35, nms_threshold=0.45)
    if len(idxs) == 0:
        return {"landmarks": [], "handedness": []}

    hands = []
    for i in idxs:
        idx = i if isinstance(i, (int, np.integer)) else i[0]
        kp = kpts_list[idx]
        cx = float(boxes[idx][0] + boxes[idx][2] / 2) / 640.0
        
        # 0~1 정규화된 21개 키포인트 좌표 추출
        lm = [
            {
                "x": max(0.0, min(1.0, float(kp[k, 0] / 640.0))),
                "y": max(0.0, min(1.0, float(kp[k, 1] / 640.0)))
            }
            for k in range(21)
        ]
        hands.append({"cx": cx, "landmarks": lm})

    # 화면 x 좌표 기준으로 정렬 (왼쪽 손 vs 오른쪽 손)
    hands.sort(key=lambda item: item["cx"])

    if len(hands) == 1:
        h0 = hands[0]
        tag = "Left" if h0["cx"] < 0.5 else "Right"
        return {
            "landmarks": [h0["landmarks"]],
            "handedness": [[{"categoryName": tag}]]
        }
    else:
        left_h = hands[0]
        right_h = hands[-1]
        return {
            "landmarks": [left_h["landmarks"], right_h["landmarks"]],
            "handedness": [
                [{"categoryName": "Left"}],
                [{"categoryName": "Right"}]
            ]
        }

# ========================================================
# 3. WebSocket 핸들러 및 서버 루프
# ========================================================
async def ws_handler(websocket):
    print(f"[+] 클라이언트 연결됨: {websocket.remote_address}")
    try:
        async for message in websocket:
            try:
                model_type = "openvino"
                img_bytes = None

                # JSON 메시지 포맷 확인
                if message.startswith("{"):
                    data = json.loads(message)
                    model_type = data.get("model", "openvino")
                    img_str = data.get("image", "")
                    if img_str.startswith("data:image"):
                        _, raw_b64 = img_str.split(",", 1)
                        img_bytes = base64.b64decode(raw_b64)
                    else:
                        img_bytes = base64.b64decode(img_str)
                elif message.startswith("data:image"):
                    _, data = message.split(",", 1)
                    img_bytes = base64.b64decode(data)
                else:
                    img_bytes = base64.b64decode(message)

                if not img_bytes:
                    continue

                nparr = np.frombuffer(img_bytes, np.uint8)
                frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                if frame is None:
                    continue

                # 요청된 모델 타입에 따라 추론 분기
                if model_type == "onnx" and compiled_yolo is not None:
                    payload = infer_yolo_onnx(frame)
                else:
                    payload = infer_openvino_dual(frame)

                await websocket.send(json.dumps(payload))

            except Exception:
                pass

    except Exception:
        pass
    finally:
        print("[-] 클라이언트 연결 종료")

async def main():
    print("[*] AuraSynth 멀티 AI 브릿지 서버 시작: ws://localhost:8765")
    async with websockets.serve(ws_handler, "localhost", 8765, max_size=10 * 1024 * 1024):
        await asyncio.Future()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n[*] 브릿지 종료")
