# AuraSynth (AI Gesture Synthesizer)

> **카메라 기반 멀티 AI 제스처 신디사이저 및 인터랙티브 오디오 워크스테이션**  
> 본 프로젝트는 오픈소스 제스처 악기 프로토타입을 기반으로, **멀티 AI 모델 스위칭 아키텍처(Google MediaPipe, Intel Geti/OpenVINO RTMPose, Custom YOLOv8-Pose)**, **21키포인트 실시간 스트리밍 파이프라인**, **데스크톱 독립 실행(.exe) 자동화**, **스튜디오 DAW급 인터페이스**로 고도화한 연구/발표 프로젝트입니다.

---

## 📌 주요 특징 및 핵심 기여 (Core Contributions)

1. **3종 멀티 AI 비전 모델 스위칭 아키텍처**:
   - **Google MediaPipe**: 고정밀 21개 관절 추적 (기본 내장 기준 모델)
   - **Intel Geti (OpenVINO RTMPose-Tiny)**: 소표본 파인튜닝 모델 실시간 추론 연동 (SimCC 디코더 및 듀얼 크롭)
   - **커스텀 YOLOv8-Pose (ONNX)**: 직접 전이학습(Transfer Learning)을 완주한 고정밀 모델 (1.8만 장 학습, mAP50 99.2%, 실시간 다중 손 동시 검출)
2. **단일 UI에서 실시간 무중단 모델 스위칭**:
   - 드롭다운 선택만으로 연주 도중 모델 3종을 실시간 전환 가능
   - 모든 모델이 MediaPipe 21개 키포인트 표준 규격으로 일원화되어 동일한 화음 및 사운드 제어 경험 제공
3. **Electron 데스크톱 독립 실행(`.exe`) & 자동 프로세스 수명주기 제어**:
   - 터미널이나 파이썬 명령어 입력 없이, `.exe` 더블 클릭 시 백그라운드 AI 브릿지가 자동 구동되고 앱 종료 시 완전 자동 정리
4. **전문 DAW 스튜디오 스타일의 제로-오버랩(Zero-Overlap) UI/UX**:
   - 고정 탑바, 사이버네틱 LED 볼륨 미터, 마스터 볼륨(0~150%) 슬라이더, 완전 한글 로컬라이징

---

## 📊 탑재 AI 모델 비교 (Model Benchmark)

| 특성 / 지표 | 🌟 Google MediaPipe | 🧪 Intel Geti (OpenVINO) | 🚀 Custom YOLOv8-Pose |
| :--- | :---: | :---: | :---: |
| **추론 엔진** | WASM / WebGL (브라우저) | OpenVINO CPU Runtime | OpenVINO / ONNX Runtime |
| **학습 데이터셋** | Google 대규모 비공개셋 | Geti 소표본 파인튜닝 | **18,776장 손 키포인트 데이터셋** |
| **손 검출 방식** | 손 영역 검출 후 랜드마크 | 듀얼 영역 분할 크롭 추론 | **다중 손 동시 바운딩박스+포즈 검출** |
| **키포인트 정확도** | 고정밀 (표준 기준 모델) | SimCC 1024-bin 근사 | **mAP50 99.2% (Box) / 87.9% (Kpt)** |
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
                                                                                                   - 손목 틸트: Lowpass Filter 스윕
                                                                                                   - 엄지 폄: -8ve 베이스 시프트
                                                     └──────────────────────────┬──────────────────────────┘
                                                                                ▼
                                                               [ Web Audio API 사운드 합성 엔진 ]
                                                               Oscillators ➔ WaveShaper ➔ BiquadFilter ➔ Output
```

---

## 🚀 실행 방법

### 방법 1: 윈도우 단독 실행 파일 (추천)
- `release/GestureSynth 1.0.0.exe` 파일을 더블 클릭하여 바로 실행합니다.
- 백그라운드 AI 브릿지가 자동 시작되며, 카메라 및 마이크 권한이 자동으로 승인됩니다.

### 방법 2: 개발 모드 실행
```bash
npm install
npm run electron:dev
```

---

## 📜 오픈소스 크레딧 및 저작권 안내 (License & Attribution)

- **원본 프로젝트**: [Gesture Synth](https://github.com/indecisiveeric/gesture-synth) by [Eric Wei](https://indecisiveeric.com)
- **라이선스 조건 준수**: 원본 Gesture Synth의 개인적/교육적 라이선스(Personal, educational, non-commercial license) 조건에 따라 원작자 크레딧을 보존하고 비상업적 연구/교육 발표 목적으로 제작 및 각색(Adaptation)되었습니다.
- **파생 저작물 고도화**: 3종 멀티 AI 모델 연동 파이프라인(OpenVINO/ONNX/YOLOv8-Pose), SimCC 디코더, 1.8만 장 전이학습, 데스크톱 프로세스 라이프사이클 및 UI 리디자인 등은 발표자의 독자적인 고도화 기여 작업물입니다.

---

## 📚 데이터셋 출처 (Dataset Source)

- **손 키포인트 학습 데이터셋**: [Ultralytics Hand-Keypoints Release](https://github.com/ultralytics/assets/releases/download/v0.0.0/hand-keypoints.zip)
  - 구성: Train 18,776장 / Val 7,992장
  - 라벨: 21개 손 관절 키포인트 (COCO-Pose 표준 규격)
