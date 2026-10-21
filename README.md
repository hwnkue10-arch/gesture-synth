# AuraSynth (AI Gesture Synthesizer)

> **카메라 기반 멀티 AI 제스처 신디사이저 및 인터랙티브 오디오 워크스테이션**  
> 본 프로젝트는 오픈소스 제스처 악기 프로토타입을 기반으로, **멀티 AI 비전 모델 스위칭 아키텍처(Google MediaPipe, Intel Geti/OpenVINO RTMPose, Custom YOLOv8-Pose)**, **21개 관절 키포인트 실시간 스트리밍 파이프라인**, **데스크톱 독립 실행(.exe) 자동화**, **스튜디오 DAW급 인터페이스**로 고도화한 연구 및 발표 프로젝트입니다.

---

## 📑 발표 자료 (Presentation)
- **최종 발표 PPT**: [`gesture-synth-ai.pptx`](./gesture-synth-ai.pptx)  
  *(인텔 Geti 파인튜닝, 커스텀 YOLOv8 학습 곡선, OpenVINO 가속 및 양손 악기 매핑 시스템 전 과정 수록)*

---

## 📌 주요 특징 및 핵심 성과 (Core Contributions)

1. **3종 멀티 AI 비전 모델 스위칭 아키텍처**:
   - **Google MediaPipe**: 고정밀 21개 관절 추적 (기본 내장 기준 모델)
   - **Intel Geti (OpenVINO RTMPose-Tiny)**: 소표본 파인튜닝 모델 실시간 추론 연동 (SimCC 디코더 및 듀얼 크롭)
   - **커스텀 YOLOv8-Pose (ONNX)**: 1.8만 장 데이터셋 전이학습(Transfer Learning) 완주 (mAP50 99.2%, 실시간 다중 손 동시 검출)
2. **단일 UI에서 실시간 무중단 모델 스위칭**:
   - 상단 드롭다운 선택만으로 연주 도중 3개 AI 모델을 즉각 전환 가능
   - 모든 모델이 MediaPipe 표준 21개 키포인트 규격으로 일원화되어 동일한 화음 및 사운드 제어 경험 제공
3. **완전 독립 실행 포터블 배포 (`.exe` 단일 파일 / Zero-Dependency)**:
   - 복잡한 파이썬 환경이나 라이브러리 설치 없이, `GestureSynth 1.0.0.exe` 파일 하나만 더블클릭하면 내장된 AI 브릿지 바이너리가 백그라운드에서 자동 구동
   - 앱 종료 시 백그라운드 프로세스가 100% 자동 정리되며, 삭제 시에도 파일만 휴지통에 버리면 컴퓨터에 찌꺼기 없이 완전히 삭제되는 완전 무설치 포터블 아키텍처
4. **전문 DAW 스튜디오 스타일의 제로-오버랩(Zero-Overlap) UI/UX**:
   - 고정 탑바, 사이버네틱 LED 볼륨 미터, 마스터 볼륨(0~150%) 슬라이더, 한글 로컬라이징 및 실시간 코드 네온 피드백

---

## 📊 탑재 AI 모델 비교 (Model Benchmark)

| 특성 / 지표 | 🌟 Google MediaPipe | 🧪 Intel Geti (OpenVINO) | 🚀 Custom YOLOv8-Pose |
| :--- | :---: | :---: | :---: |
| **추론 엔진** | WASM / WebGL (브라우저) | OpenVINO GPU / CPU Runtime | OpenVINO / ONNX Runtime |
| **학습 데이터셋** | Google 대규모 비공개셋 | Geti 소표본 파인튜닝 | **18,776장 손 키포인트 데이터셋** |
| **손 검출 방식** | 손 영역 검출 후 랜드마크 | 듀얼 영역 분할 크롭 추론 | **다중 손 동시 바운딩박스+포즈 검출** |
| **키포인트 정확도** | 고정밀 (표준 기준 모델) | SimCC 1024-bin 정밀 근사 | **mAP50 99.2% (Box) / 87.9% (Kpt)** |
| **실행 방식** | 인브라우저 즉시 구동 | WebSocket 비동기 스트리밍 | WebSocket 비동기 스트리밍 |

---

## 🏗️ 시스템 아키텍처

```
[ 웹캠 입력 (640x480) ]
        │
        ├──▶ [ 모델 1: Google MediaPipe ] ──(GPU WASM 인브라우저 추론)──────────┐
        │                                                                       │
        ├──▶ [ 모델 2: Intel Geti OpenVINO ] ──(WebSocket ws://localhost:8765)───┤
        │    (SimCC 1024-bin 디코딩 & 듀얼 크롭)                                  │
        │                                                                       │
        └──▶ [ 모델 3: Custom YOLOv8-Pose (ONNX) ] ──(WebSocket 브릿지)────────┤
             (1.8만 장 학습 모델, 동시 다중 손 검출)                              │
                                                                                ▼
                                                           [ 21개 키포인트 표준 정규화 데이터 ]
                                                                                │
                                                     ┌──────────────────────────┴──────────────────────────┐
                                                     ▼                                                     ▼
                                            [ 왼손: 화음 및 모드 ]                                [ 오른손: 보이싱 및 표현 ]
                                            - 스케일 도수 (I~VII)                                  - 기본위치, 1전위, 7th 화음
                                            - 손목 틸트: Major / Minor                             - 손 높이: 음량 (Master Gain)
                                            - 실시간 코드명 화면 출력                              - 손목 틸트: Lowpass Filter 스윕
                                                                                                   - 엄지 폄: -8ve 베이스 레이어링
                                                     └──────────────────────────┬──────────────────────────┘
                                                                                ▼
                                                               [ Web Audio API 사운드 합성 엔진 ]
                                                               Oscillators ➔ WaveShaper ➔ BiquadFilter ➔ Output
```

---

## 🚀 빠른 시작 가이드 (Quick Start)

### 1. 배포 및 실행 (최종 사용자)

#### 🌟 윈도우 단독 실행 프로그램 (완전 무설치 / Python 불필요)
- **`release/GestureSynth 1.0.0.exe`** 파일 하나만 더블클릭하면 즉시 실행됩니다.
- **파이썬이나 별도 패키지 설치가 전혀 필요 없습니다.** (OpenVINO, YOLOv8-Pose AI 런타임 및 모델 가중치 전체 내장)
- 프로그램 종료 시 백그라운드 프로세스가 완벽하게 자동 정리되며, 삭제 시에도 파일만 휴지통에 버리면 컴퓨터에 찌꺼기 없이 100% 제거됩니다.

---

### 2. 개발 및 빌드 가이드 (개발자용)

#### 의존성 설치
```bash
# Node.js 패키지 설치
npm install

# 파이썬 AI 라이브러리 및 PyInstaller 설치
pip install -r requirements.txt
```

#### 단독 실행 바이너리 및 포터블 .exe 빌드
```bash
# 1. AI 브릿지 독립 실행 바이너리 빌드 (bridge_dist/bridge/ 생성)
npm run build:bridge

# 2. 웹 프론트엔드 빌드 및 Electron 포터블 .exe 패키징
npm run dist
```
- 빌드가 완료되면 `release/GestureSynth 1.0.0.exe` (단일 포터블 파일) 및 `release/win-unpacked/`가 생성됩니다.

#### 개발 모드 실행
```bash
npm run electron:dev
```

---

## 📂 저장소 구조 (Repository Structure)

```
├── .gitignore               # Git 추적 제외 설정
├── LICENSE                  # 라이선스 문서
├── README.md                # 프로젝트 안내 문서
├── requirements.txt         # 파이썬 AI 브릿지 및 빌드 패키지
├── gesture-synth-ai.pptx    # 프로젝트 최종 발표 자료 (PPT)
├── bridge_openvino.py       # OpenVINO / YOLOv8-Pose WebSocket AI 브릿지
├── bridge_dist/             # [빌드 산출물] PyInstaller로 패키징된 독립 실행 AI 브릿지
├── index.html               # AuraSynth 스튜디오 웹 인터페이스
├── main.js                  # 멀티 모델 스위칭 및 신디사이저 코어 로직
├── vite.config.js           # 프론트엔드 번들러 설정
├── electron/
│   └── main.cjs             # 일렉트론 프로세스 라이프사이클 관리
├── release/                 # [배포 산출물] 포터블 .exe 및 win-unpacked 빌드본
└── models/
    ├── onnx/
    │   └── model.onnx       # 1.8만 장 학습 커스텀 YOLOv8-Pose 모델
    └── openvino/
        ├── model.xml        # Intel Geti RTMPose OpenVINO 구조
        └── model.bin        # Intel Geti RTMPose OpenVINO 가중치
```

---

## 📜 오픈소스 크레딧 및 저작권 안내 (License & Attribution)

- **원본 프로젝트**: [Gesture Synth](https://github.com/indecisiveeric/gesture-synth) by [Eric Wei](https://indecisiveeric.com)
- **라이선스 조건 준수**: 원본 Gesture Synth의 개인적/교육적 라이선스(Personal, educational, non-commercial license) 조건에 따라 원작자 크레딧을 보존하고 비상업적 연구/교육 발표 목적으로 제작 및 각색(Adaptation)되었습니다.
- **파생 저작물 고도화 기여**: 3종 멀티 AI 모델 연동 파이프라인(OpenVINO/ONNX/YOLOv8-Pose), SimCC 디코더, 1.8만 장 전이학습 모델 제작, 완전 무설치 포터블 배포 파이프라인 및 UI 리디자인 등은 본 프로젝트 독자 기여 작업물입니다.

---

## 📚 데이터셋 출처 (Dataset Source)

- **손 키포인트 학습 데이터셋**: [Ultralytics Hand-Keypoints Release](https://github.com/ultralytics/assets/releases/download/v0.0.0/hand-keypoints.zip)
  - 구성: Train 18,776장 / Val 7,992장
  - 라벨: 21개 손 관절 키포인트 (COCO-Pose 표준 규격)
