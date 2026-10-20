import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties } from 'react';

// 슬라이드 에셋 임포트
import resultsImg from './assets/results.png';
import yoloMetricsImg from './assets/yolo_train_metrics.png';
import valPredImg from './assets/val_batch0_pred.jpg';
import handLandmarksImg from './assets/hand_landmarks.jpg';
import getiManualImg from './assets/geti_manual_labeling.jpg';
import trainBatch0Img from './assets/train_batch0.jpg';
import mediapipeWebImg from './assets/mediapipe_vision_web.jpg';
import getiResultImg from './assets/geti_inference_result.png';
import yoloOpenPalmImg from './assets/yolo_open_palm.png';
import yoloVSignImg from './assets/yolo_v_sign.png';
import mediapipeResultImg from './assets/mediapipe_inference_result.png';
import mediapipeFistImg from './assets/mediapipe_fist.png';
import synthLeftHandImg from './assets/synth_left_hand.jpg';
import synthRightHandImg from './assets/synth_right_hand.jpg';
import synthLivePlayImg from './assets/synth_live_play.png';
import topBarImg from './assets/top_bar.png';

// ========================================================
// 1. DESIGN SYSTEM (모던 엔지니어링 미니멀: 오프화이트 / 차콜 / 딥블루)
// ========================================================
export const design: DesignSystem = {
  palette: {
    bg: '#f8fafc',
    text: '#0f172a',
    accent: '#2563eb',
  },
  fonts: {
    display: '"Inter", -apple-system, BlinkMacSystemFont, "Pretendard", system-ui, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Pretendard", system-ui, sans-serif',
  },
  typeScale: { hero: 84, body: 24 },
  radius: 16,
};

export const transition: SlideTransition = {
  duration: 220,
  enter: {
    duration: 220,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
  exit: {
    duration: 140,
    easing: 'ease-out',
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-4px)' },
    ],
  },
};

// ========================================================
// COMMON REUSABLE COMPONENTS & STYLES (대형 1920x1080 캔버스 고시인성 스케일 최적화)
// ========================================================
const S = {
  canvas: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--osd-bg)',
    color: 'var(--osd-text)',
    fontFamily: 'var(--osd-font-body)',
    padding: '38px 60px 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  } as CSSProperties,

  card: {
    background: '#ffffff',
    border: '1.5px solid #e2e8f0',
    borderRadius: '18px',
    padding: '26px 32px',
    boxShadow: '0 8px 16px -2px rgba(0, 0, 0, 0.05), 0 4px 8px -3px rgba(0, 0, 0, 0.03)',
    boxSizing: 'border-box',
  } as CSSProperties,

  codeBox: {
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: '12px',
    padding: '18px 24px',
    fontFamily: '"JetBrains Mono", Consolas, monospace',
    fontSize: '17px',
    lineHeight: '1.65',
    border: '1.5px solid #1e293b',
    boxSizing: 'border-box',
  } as CSSProperties,

  badge: (bg = '#eff6ff', color = '#2563eb', border = '#bfdbfe'): CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 16px',
    borderRadius: '8px',
    background: bg,
    color,
    border: `1.5px solid ${border}`,
    fontSize: '15px',
    fontWeight: 800,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  }),
};

const Header = ({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) => (
  <div style={{ marginBottom: '18px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
      <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>{tag}</span>
      <span style={{ fontSize: '18px', color: '#64748b', fontWeight: 700 }}>
        AuraSynth Engine Architecture
      </span>
    </div>
    <h1 style={{ fontSize: '50px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
      {title}
    </h1>
    <p style={{ fontSize: '23px', color: '#475569', margin: '6px 0 0', lineHeight: 1.4, fontWeight: 500 }}>
      {subtitle}
    </p>
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1.5px solid #e2e8f0',
        paddingTop: '14px',
        fontSize: '17px',
        color: '#94a3b8',
        fontWeight: 600,
      }}
    >
      <span>AuraSynth: Computer Vision & Interactive Web Audio Research</span>
      <span style={{ background: '#f1f5f9', padding: '5px 16px', borderRadius: '8px', color: '#334155', fontWeight: 800 }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

// ========================================================
// SLIDE 0: 표지 (Title Slide / Cover) - 발표자(박현규) 표기 및 시원한 여백
// ========================================================
const Slide0_Cover: Page = () => {
  return (
    <section
      style={{
        ...S.canvas,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '70px',
      }}
    >
      <div style={{ maxWidth: '1480px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '28px' }}>
          <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>
            AI VISION &amp; INTERACTIVE AUDIO WORKSTATION
          </span>
        </div>

        <h1
          style={{
            fontSize: '88px',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 24px',
            letterSpacing: '-0.035em',
            lineHeight: 1.15,
          }}
        >
          AI 제스처 신디사이저 <span style={{ color: '#2563eb' }}>AuraSynth</span>
        </h1>

        <p
          style={{
            fontSize: '32px',
            color: '#475569',
            margin: '0 0 48px',
            fontWeight: 500,
            maxWidth: '1200px',
            lineHeight: 1.45,
          }}
        >
          Intel Geti &amp; OpenVINO 기반 21개 손 관절 실시간 인식 및 멀티 비전 제스처 전자 악기 개발
        </p>

        {/* 핵심 기술 태그 뱃지 모음 */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '46px' }}>
          <span style={S.badge('#e0f2fe', '#0284c7', '#7dd3fc')}>🧪 Intel Geti™ &amp; OpenVINO™ 2024</span>
          <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>Custom YOLOv8-Pose (1.8만 장 학습)</span>
          <span style={S.badge('#f0fdf4', '#16a34a', '#86efac')}>Google MediaPipe Tasks Vision</span>
          <span style={S.badge('#fef3c7', '#d97706', '#fde68a')}>Web Audio API Polyphonic Synth</span>
          <span style={S.badge('#f1f5f9', '#475569', '#cbd5e1')}>Electron Standalone App (.exe)</span>
        </div>

        {/* 중앙 하단 이름 */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', letterSpacing: '0.12em' }}>
            박현규
          </span>
        </div>
      </div>
    </section>
  );
};

// ========================================================
// SLIDE 1: 목차 (Table of Contents / Agenda) - 직관적이고 쉬운 한글 표현
// ========================================================
const Slide1_Agenda: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="AGENDA"
        title="발표 목차 (Table of Contents)"
        subtitle="손동작 인식 원리부터 AI 모델 학습, 그리고 실시간 악기 시스템까지의 6단계 순서"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '26px',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Item 01 */}
        <div style={{ ...S.card, borderTop: '6px solid #2563eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>PART 01</span>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#2563eb' }}>01</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
              21개 손 관절 구조와 데이터셋
            </h3>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              손목부터 손끝까지 21개 관절 마디 구조와 2.7만 장 표준 데이터셋의 기본 원리
            </p>
          </div>
          <div style={{ fontSize: '15px', color: '#2563eb', fontWeight: 700 }}>손 관절 구조 &amp; 데이터셋</div>
        </div>

        {/* Item 02 */}
        <div style={{ ...S.card, borderTop: '6px solid #0284c7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={S.badge('#e0f2fe', '#0284c7', '#bae6fd')}>PART 02</span>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#0284c7' }}>02</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
              학습 플랫폼 오류와 모델 구축 방향
            </h3>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              인텔 Geti의 데이터 임포트 오류 규명과, 이를 극복하기 위해 수작업·터미널·구글 3가지 모델을 구축한 방향
            </p>
          </div>
          <div style={{ fontSize: '15px', color: '#0284c7', fontWeight: 700 }}>라벨 유실 규명 &amp; 3대 모델 전략</div>
        </div>

        {/* Item 03 */}
        <div style={{ ...S.card, borderTop: '6px solid #059669', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={S.badge('#dcfce7', '#059669', '#86efac')}>PART 03</span>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#059669' }}>03</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
              3가지 AI 모델 성능 비교
            </h3>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              28장 수작업 모델 vs 1.8만 장 직접 학습 모델 vs 구글 미디어파이프의 인식률과 속도 비교
            </p>
          </div>
          <div style={{ fontSize: '15px', color: '#059669', fontWeight: 700 }}>3가지 AI 모델 스펙 비교</div>
        </div>

        {/* Item 04 */}
        <div style={{ ...S.card, borderTop: '6px solid #d97706', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={S.badge('#fef3c7', '#d97706', '#fde68a')}>PART 04</span>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#d97706' }}>04</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
              각 모델별 실전 추론 결과 &amp; 분석
            </h3>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              게티 모델의 94% 점수 이면과 유령 관절, 그리고 3대 모델의 실제 추론 양상 비교
            </p>
          </div>
          <div style={{ fontSize: '15px', color: '#d97706', fontWeight: 700 }}>모델별 실전 결과 &amp; 점수의 진실</div>
        </div>

        {/* Item 05 */}
        <div style={{ ...S.card, borderTop: '6px solid #7c3aed', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={S.badge('#f3e8ff', '#7c3aed', '#d8b4fe')}>PART 05</span>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#7c3aed' }}>05</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
              손 제스처 음악 변환과 실시간 악기
            </h3>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              손가락 펴짐/접힘 조합으로 피아노 코드를 연주하고, 오른손으로 볼륨과 음색을 실시간 제어
            </p>
          </div>
          <div style={{ fontSize: '15px', color: '#7c3aed', fontWeight: 700 }}>제스처 코드 매핑 &amp; 악기 연주</div>
        </div>

        {/* Item 06 */}
        <div style={{ ...S.card, borderTop: '6px solid #475569', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={S.badge('#f1f5f9', '#475569', '#cbd5e1')}>PART 06</span>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#475569' }}>06</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px', color: '#0f172a' }}>
              Intel Geti &amp; OpenVINO 핵심 성과
            </h3>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              Intel Geti 노코드 훈련 경험과 OpenVINO GPU 가속 최적화, 그리고 실시간 악기 완성까지의 엔지니어링 결론
            </p>
          </div>
          <div style={{ fontSize: '15px', color: '#475569', fontWeight: 700 }}>Geti &amp; OpenVINO 성과 및 고찰</div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 2: 21개 손 관절 구조 (사진 초대형화 & 폰트 대폭 확대)
// ========================================================
const Slide2_Anatomy: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 01 • 관절 구조 &amp; 데이터셋"
        title="21개 손 관절 구조와 데이터셋"
        subtitle="손목(0번)부터 손끝(20번)까지의 21개 관절 마디 구조와 2.7만 장 글로벌 표준 데이터셋"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '34px', flex: 1, minHeight: 0 }}>
        {/* Left: 사용자 제공 사진 (21개 관절 다이어그램 - 대형화) */}
        <div
          style={{
            ...S.card,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#ffffff',
            padding: '24px 30px',
          }}
        >
          <div
            style={{
              width: '100%',
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              padding: '16px',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={handLandmarksImg}
              alt="21 Hand Keypoint Landmarks"
              style={{
                width: '100%',
                maxHeight: '560px',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{ marginTop: '18px', fontSize: '18.5px', color: '#334155', fontWeight: 800, textAlign: 'center' }}>
            21개 손 관절(Keypoint) 표준 해부학 매핑. 출처: ResearchGate
          </div>
        </div>

        {/* Right: 시원하고 큼직한 2대 핵심 요약 카드 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', justifyContent: 'center' }}>
          {/* Card 1: 21개 관절 계층 */}
          <div style={{ ...S.card, borderLeft: '8px solid #2563eb', padding: '34px 36px' }}>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#2563eb', marginBottom: '10px' }}>
              01 • 해부학적 21개 관절 구조
            </div>
            <h3 style={{ fontSize: '27px', fontWeight: 800, margin: '0 0 14px', color: '#0f172a' }}>
              손목(Root) 기준 5개 손가락 독립 추적
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '19.5px', color: '#475569', lineHeight: 1.6 }}>
              <div>• <strong>손목(0번 Root):</strong> 5개 손가락으로 뻗어 나가는 해부학적 기준점 역할</div>
              <div>• <strong>21개 관절 마디:</strong> 엄지(1~4), 검지(5~8), 중지(9~12), 약지(13~16), 새끼(17~20) 독립 좌표 추적</div>
            </div>
          </div>

          {/* Card 2: 데이터셋 규모 */}
          <div style={{ ...S.card, borderLeft: '8px solid #0284c7', padding: '34px 36px' }}>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#0284c7', marginBottom: '10px' }}>
              02 • 대규모 표준 데이터셋 활용
            </div>
            <h3 style={{ fontSize: '27px', fontWeight: 800, margin: '0 0 14px', color: '#0f172a' }}>
              총 26,768장 (학습 1.8만 + 검증 8천 장)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '19.5px', color: '#475569', lineHeight: 1.6 }}>
              <div>• <strong>글로벌 표준 규격:</strong> Ultralytics Hand-Keypoints 공인 딥러닝 데이터셋 채택</div>
              <div>• <strong>100% 정밀 라벨링:</strong> 학습 세트 18,776장 + 검증 세트 7,992장 전량에 21개 관절 좌표 완비</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// ========================================================
// SLIDE 3: [플랫폼 결함 로그] Intel Geti 데이터 임포트 불가 & 라벨 증발 규명
// ========================================================
const Slide3_ReverseEngineering: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 02 • 플랫폼 결함 분석"
        title="학습 플랫폼 오류와 라벨 유실"
        subtitle="인텔 Geti 플랫폼의 데이터 임포트 불가와 자체 라벨 유실 결함을 분석한 과정"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '26px', flex: 1, minHeight: 0 }}>
        {/* Attempt 01 */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={S.badge('#fee2e2', '#b91c1c', '#fca5a5')}>Attempt 01</span>
              <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 700 }}>Format Packing</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 12px', color: '#0f172a' }}>
              COCO &amp; Datumaro 변환 시도
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '17.5px', color: '#475569', lineHeight: 1.5 }}>
              <div>• YOLO Pose 상대좌표를 픽셀 절대좌표로 역산</div>
              <div>• 공식 <code style={{ color: '#2563eb', fontWeight: 700 }}>coco_person_keypoints</code> 규격으로 패킹</div>
            </div>
          </div>

          {/* 중간 핵심 요약 박스 (문단 띄우기) */}
          <div
            style={{
              background: '#fef2f2',
              border: '2px solid #fca5a5',
              borderRadius: '12px',
              padding: '16px 18px',
              margin: '14px 0 16px',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#dc2626', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>❌</span> 1단계 핵심 요약
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#991b1b', lineHeight: 1.5 }}>
                • 사진 1.8만 장과 좌표를 표준 형식으로 바꿔서 게티에 업로드해 봄.
              </div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#dc2626', lineHeight: 1.5 }}>
                • 하지만 게티가 외부에서 만든 라벨 파일을 아예 인식하지 못하고 거부함.
              </div>
            </div>
          </div>

          <div style={S.codeBox}>
            <span style={{ color: '#ef4444', fontWeight: 700 }}>[Error] Datumaro Extractor</span>
            <br />
            &gt; Detected format not supported
            <br />
            &gt; Validation Error: Unknown key
            <br />
            <span style={{ color: '#94a3b8' }}>*Keypoint 태스크 외부 스키마 병합 차단</span>
          </div>
        </div>

        {/* Attempt 02 */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={S.badge('#fef3c7', '#d97706', '#fde68a')}>Attempt 02</span>
              <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 700 }}>AST Re-engineering</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 12px', color: '#0f172a' }}>
              Geti 템플릿(default.json) 역공학
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '17.5px', color: '#475569', lineHeight: 1.5 }}>
              <div>• 빈 프로젝트 Export로 내부 JSON 헤더 복제</div>
              <div>• 21개 관절 위상 재정렬(LUT Remapping) 수행</div>
            </div>
          </div>

          {/* 중간 핵심 요약 박스 (문단 띄우기) */}
          <div
            style={{
              background: '#fffbeb',
              border: '2px solid #fde68a',
              borderRadius: '12px',
              padding: '16px 18px',
              margin: '14px 0 16px',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#b45309', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⚠️</span> 2단계 핵심 요약
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#92400e', lineHeight: 1.5 }}>
                • 게티 내부 파일 구조를 분석해 손목(0➔16번) 등 21개 관절 번호를 게티에 맞춰줌.
              </div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#b45309', lineHeight: 1.5 }}>
                • 화면에는 간신히 불러왔으나, 저장 버튼을 누르자마자 관절 점들이 다 사라져 버림.
              </div>
            </div>
          </div>

          <div style={S.codeBox}>
            <span style={{ color: '#38bdf8', fontWeight: 700 }}># 위상 재정렬 (LUT Remapping)</span>
            <br />
            MediaPipe: <span style={{ color: '#facc15' }}>0: WRIST</span>
            <br />
            Geti Schema: <span style={{ color: '#facc15' }}>16: WRIST</span>
            <br />
            <span style={{ color: '#34d479' }}>✓ 1:1 매핑으로 스키마 크래시 해결</span>
          </div>
        </div>

        {/* Attempt 03 */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={S.badge('#fee2e2', '#b91c1c', '#fca5a5')}>Attempt 03</span>
              <span style={{ fontSize: '16px', color: '#b91c1c', fontWeight: 700 }}>Silent Drop Discovered</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 12px', color: '#0f172a' }}>
              자체 라벨링 데이터 재임포트 실패
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '17.5px', color: '#475569', lineHeight: 1.5 }}>
              <div>• 플랫폼 결함 확인 위해 웹에서 직접 수동 라벨링</div>
              <div>• Export한 순정 데이터셋 재임포트 시에도 전량 증발</div>
            </div>
          </div>

          {/* 중간 핵심 요약 박스 (문단 띄우기) */}
          <div
            style={{
              background: '#fef2f2',
              border: '2px solid #fca5a5',
              borderRadius: '12px',
              padding: '16px 18px',
              margin: '14px 0 16px',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#dc2626', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>❌</span> 3단계 핵심 요약
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#991b1b', lineHeight: 1.5 }}>
                • 파일 변환 탓인가 싶어, 게티 화면에서 마우스로 31장을 직접 찍어 저장함.
              </div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#dc2626', lineHeight: 1.5 }}>
                • 그런데 게티가 직접 만든 파일조차 다시 열면 라벨이 싹 지워지는 플랫폼 자체 버그 확인.
              </div>
            </div>
          </div>

          <div style={{ ...S.codeBox, borderLeft: '4px solid #ef4444' }}>
            <span style={{ color: '#f87171', fontWeight: 700 }}>[확인된 플랫폼 결함: Silent Drop]</span>
            <br />
            Geti 자체 라벨링 데이터조차 재임포트 시 라벨 증발.
            <br />
            <span style={{ color: '#94a3b8' }}>*플랫폼 자체 버그로 인해 외부/내부 라벨 일괄 유실 확인 (미해결)</span>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 3-2: 오류 극복을 위한 3가지 AI 모델 구축 방향 (사진 대형화 & 폰트 확대)
// ========================================================
const Slide3_2_ModelStrategy: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 02 • 모델 구축 방향"
        title="오류 이후 3가지 AI 모델 구축 방향"
        subtitle="기존 저장된 라벨을 쓸 수 없게 됨에 따라 수작업 라벨링, 터미널 직접 학습, 상용 모델을 병행한 3대 개발 전략"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '26px', flex: 1, minHeight: 0 }}>
        {/* Model 1: Geti 수작업 */}
        <div style={{ ...S.card, borderTop: '7px solid #d97706', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '17px', fontWeight: 900, color: '#b45309', letterSpacing: '0.04em' }}>
                MODEL 01
              </span>
              <span style={S.badge('#fef3c7', '#d97706', '#fde68a')}>수작업 베이스라인</span>
            </div>

            {/* 모델 이름 대형화 (34px) */}
            <h3 style={{ fontSize: '34px', fontWeight: 900, margin: '0 0 4px', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Intel Geti
            </h3>
            <div style={{ fontSize: '17.5px', color: '#d97706', fontWeight: 800, marginBottom: '14px' }}>
              31장 직접 라벨링 모델
            </div>

            {/* 사진 */}
            <div style={{ width: '100%', height: '235px', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #e2e8f0', background: '#0f172a', marginBottom: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <img src={getiManualImg} alt="Intel Geti Manual Labeling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '17.5px', lineHeight: 1.55 }}>
              <div style={{ color: '#1e293b' }}>
                • <strong>수동 라벨링 대체:</strong> 플랫폼 오류 우회를 위해 31장 마우스 직접 라벨링
              </div>
              <div style={{ color: '#64748b' }}>
                • <strong>임시 베이스라인:</strong> 플랫폼 내 최소 관절 인식 가능 여부를 검증하기 위한 기준 모델
              </div>
            </div>
          </div>

          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '12px 16px', marginTop: '12px' }}>
            <span style={{ fontSize: '16.5px', fontWeight: 800, color: '#b45309' }}>
              ⚠️ 최소 동작 검증용 (데이터 부족으로 실전 불가)
            </span>
          </div>
        </div>

        {/* Model 2: Custom YOLOv8 터미널 직접 학습 */}
        <div style={{ ...S.card, borderTop: '7px solid #2563eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '17px', fontWeight: 900, color: '#1d4ed8', letterSpacing: '0.04em' }}>
                MODEL 02
              </span>
              <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>독자 전이학습</span>
            </div>

            {/* 모델 이름 대형화 (34px) */}
            <h3 style={{ fontSize: '34px', fontWeight: 900, margin: '0 0 4px', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Custom YOLOv8
            </h3>
            <div style={{ fontSize: '17.5px', color: '#2563eb', fontWeight: 800, marginBottom: '14px' }}>
              1.8만 장 터미널 직접 학습 (CLI)
            </div>

            {/* 사진 */}
            <div style={{ width: '100%', height: '235px', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #e2e8f0', background: '#0f172a', marginBottom: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <img src={trainBatch0Img} alt="Terminal Dataset Training Batch" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '17.5px', lineHeight: 1.55 }}>
              <div style={{ color: '#1e293b' }}>
                • <strong>1.8만 장 100% 보존:</strong> 플랫폼을 거치지 않고 원본 18,776장 전체 라벨 온전 활용
              </div>
              <div style={{ color: '#64748b' }}>
                • <strong>CLI 학습 완주:</strong> 로컬 터미널 환경에서 64분 만에 직접 전이학습 완주 (mAP 99.2%)
              </div>
            </div>
          </div>

          <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '12px 16px', marginTop: '12px' }}>
            <span style={{ fontSize: '16.5px', fontWeight: 800, color: '#1d4ed8' }}>
              ⭐ 18,776장 전량 온전히 전이학습 (mAP 99.2% 달성)
            </span>
          </div>
        </div>

        {/* Model 3: Google MediaPipe */}
        <div style={{ ...S.card, borderTop: '7px solid #059669', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '17px', fontWeight: 900, color: '#15803d', letterSpacing: '0.04em' }}>
                MODEL 03
              </span>
              <span style={S.badge('#dcfce7', '#059669', '#86efac')}>상용 SOTA 기준</span>
            </div>

            {/* 모델 이름 대형화 (34px) */}
            <h3 style={{ fontSize: '34px', fontWeight: 900, margin: '0 0 4px', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Google MediaPipe
            </h3>
            <div style={{ fontSize: '17.5px', color: '#059669', fontWeight: 800, marginBottom: '14px' }}>
              실시간 악기 연주 기준 모델
            </div>

            {/* 사진 */}
            <div style={{ width: '100%', height: '235px', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #e2e8f0', background: '#0f172a', marginBottom: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <img src={mediapipeWebImg} alt="MediaPipe Web Realtime Tracking" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '17.5px', lineHeight: 1.55 }}>
              <div style={{ color: '#1e293b' }}>
                • <strong>60 FPS 무지연 엔진:</strong> 브라우저 WebGL 가속 기반 초고속 실시간 추론 달성
              </div>
              <div style={{ color: '#64748b' }}>
                • <strong>프로덕션 레퍼런스:</strong> 실시간 악기 구동의 핵심 엔진이자 성능 평가의 상용 기준점
              </div>
            </div>
          </div>

          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '12px 16px', marginTop: '12px' }}>
            <span style={{ fontSize: '16.5px', fontWeight: 800, color: '#15803d' }}>
              🎹 60 FPS 무지연 실시간 악기 구동 엔진 탑재
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 4: 3가지 AI 모델 구축 파이프라인 비교 (표 폰트 대폭 확대)
// ========================================================
const Slide4_Pipelines: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 03 • AI 모델 비교"
        title="3가지 AI 모델 성능 비교"
        subtitle="31장 수작업 모델 vs 1.8만 장 직접 학습 모델 vs 구글 미디어파이프의 인식률과 속도 비교"
      />

      <div style={{ ...S.card, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px 40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '19.5px' }}>
          <thead>
            <tr style={{ borderBottom: '2.5px solid #cbd5e1', background: '#f8fafc' }}>
              <th style={{ padding: '16px 22px', color: '#475569', fontWeight: 800, width: '18%' }}>구분</th>
              <th style={{ padding: '16px 22px', color: '#0284c7', fontWeight: 800, width: '27%' }}>
                Model 1: Intel Geti (31장 수작업)
              </th>
              <th style={{ padding: '16px 22px', color: '#2563eb', fontWeight: 800, width: '27%' }}>
                Model 2: Custom YOLOv8-Pose (CLI)
              </th>
              <th style={{ padding: '16px 22px', color: '#059669', fontWeight: 800, width: '28%' }}>
                Model 3: Google MediaPipe (상용 기준)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 22px', fontWeight: 800, color: '#0f172a' }}>학습 데이터셋</td>
              <td style={{ padding: '14px 22px', color: '#dc2626', fontWeight: 700 }}>31장 (수동 라벨링)</td>
              <td style={{ padding: '14px 22px', color: '#2563eb', fontWeight: 800 }}>
                18,776장 (원본 데이터 100% 온전 학습)
              </td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>수백만 장 대규모 데이터 (합성+실사)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 22px', fontWeight: 800, color: '#0f172a' }}>모델 아키텍처</td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>RTMPose-Tiny OpenVINO (FP16 / FP32)</td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>YOLOv8n-Pose (PyTorch / ONNX)</td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>Palm Detector + Hand Landmarker</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 22px', fontWeight: 800, color: '#0f172a' }}>학습 및 증강 설정</td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>
                <div>512×512 / Max 200 Ep (Patience 10) / LR 0.001</div>
                <div style={{ color: '#64748b', fontSize: '15px', marginTop: '3px' }}>
                  Topdown Affine On (1.0) / Blur·Noise Off
                </div>
              </td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>
                <div>640×640 / 100 Ep / Batch 64 / LR 0.01</div>
                <div style={{ color: '#64748b', fontSize: '15px', marginTop: '3px' }}>
                  Mosaic, Random Flip, HSV 실전 풀 증강
                </div>
              </td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>
                <div>구글 프로덕션 완성형 파이프라인</div>
                <div style={{ color: '#64748b', fontSize: '15px', marginTop: '3px' }}>
                  대규모 3D 합성 데이터 전이학습
                </div>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 22px', fontWeight: 800, color: '#0f172a' }}>모델 용량 (Size)</td>
              <td style={{ padding: '14px 22px', color: '#0284c7', fontWeight: 700 }}>7.72 MB (FP16) / 15.18 MB (FP32)</td>
              <td style={{ padding: '14px 22px', color: '#2563eb', fontWeight: 700 }}>6.5 MB (ONNX 경량화)</td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>~12.0 MB (Tasks-Vision 번들)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 22px', fontWeight: 800, color: '#0f172a' }}>인식 성능 (정확도)</td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>
                <div><strong>PCK (Correct Keypoints): 0.94 (94.0%)</strong></div>
                <div style={{ color: '#64748b', fontSize: '15px', marginTop: '1px' }}>Geti 화면 표기 Score: 93.7%</div>
                <div style={{ color: '#dc2626', fontSize: '14.5px', fontWeight: 700, marginTop: '2px' }}>
                  (※ 31장 고정 포즈 한정 평가 / 실전 미검증)
                </div>
              </td>
              <td style={{ padding: '14px 22px', color: '#2563eb', fontWeight: 800 }}>
                <div>Box 99.2% / Pose 87.9% (mAP50)</div>
                <div style={{ color: '#1d4ed8', fontSize: '14.5px', fontWeight: 700, marginTop: '2px' }}>
                  (1.8만 장 실측 검증 완료)
                </div>
              </td>
              <td style={{ padding: '14px 22px', color: '#059669', fontWeight: 800 }}>
                <div>상용 최고 수준 (SOTA ~95%+)</div>
                <div style={{ color: '#15803d', fontSize: '14.5px', fontWeight: 700, marginTop: '2px' }}>
                  (글로벌 공인 벤치마크)
                </div>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 22px', fontWeight: 800, color: '#0f172a' }}>실측 추론 속도</td>
              <td style={{ padding: '14px 22px', color: '#475569' }}>~45ms (OpenVINO CPU)</td>
              <td style={{ padding: '14px 22px', color: '#2563eb', fontWeight: 800 }}>
                GPU 2.6ms (380 FPS) / CPU 39ms
              </td>
              <td style={{ padding: '14px 22px', color: '#059669', fontWeight: 800 }}>~16ms (60 FPS 실시간 보장)</td>
            </tr>
            <tr>
              <td style={{ padding: '14px 22px', fontWeight: 800, color: '#0f172a' }}>특징 및 역할</td>
              <td style={{ padding: '14px 22px', color: '#475569', fontSize: '17px', lineHeight: 1.5 }}>
                플랫폼 결함 속 최소 데이터(31장)로 강행한 베이스라인
              </td>
              <td style={{ padding: '14px 22px', color: '#1e40af', fontSize: '17px', lineHeight: 1.5, fontWeight: 700 }}>
                1.8만 장 라벨 좌표를 손실 없이 64분 만에 직접 완성한 정통 모델
              </td>
              <td style={{ padding: '14px 22px', color: '#475569', fontSize: '17px', lineHeight: 1.5 }}>
                웹 브라우저 실시간 무지연 연주를 위한 최종 프로덕션 엔진
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 5-1: [Model 1] Intel Geti 실전 결과 & 원인 분석
// ========================================================
const Slide5_1_GetiResult: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 04 • 모델별 실전 추론 결과 (1/3)"
        title="[Model 1] Intel Geti 실전 결과: 시험 점수 94%의 함정"
        subtitle="31장 고정 데이터셋에서는 94%가 나왔으나, 실제 카메라에서는 배경 노이즈를 손으로 오인하는 유령 관절 현상 발생"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '28px', flex: 1, minHeight: 0 }}>
        {/* Left: 실제 Geti 추론 결과 사진 */}
        <div style={{ ...S.card, border: '2.5px solid #ef4444', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 26px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={S.badge('#fef2f2', '#dc2626', '#fca5a5')}>실전 추론 테스트</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#991b1b' }}>실제 웹캠 추론 화면</span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#dc2626', background: '#fef2f2', padding: '3px 8px', borderRadius: '6px' }}>
                치명적 오인식 발생
              </span>
            </div>

            {/* 유저가 제공한 실제 Geti 추론 결과 사진 */}
            <div
              style={{
                width: '100%',
                height: '350px',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '2px solid #334155',
                background: '#000',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
              }}
            >
              <img
                src={getiResultImg}
                alt="Intel Geti Inference Ghost Keypoints"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <p style={{ fontSize: '16.5px', color: '#475569', lineHeight: 1.55, margin: 0 }}>
              ▲ <strong>실제 카메라 추론 화면:</strong> 손 형태를 전혀 잡지 못하고, 어두운 배경 노이즈를 손가락으로 착각하여 허공에 관절 점들이 무작위로 흩뿌려지는 현상 발생
            </p>
          </div>

          <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '12px 16px', borderRadius: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#b91c1c' }}>
              ❌ 실전 사용 불가: 손 뼈대 추적 실패 &amp; 허공에 유령 관절(Ghost Keypoint) 난무
            </span>
          </div>
        </div>

        {/* Right: 왜 시험 점수(94%)는 높게 나왔을까? 심층 원인 분석 */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={S.badge('#fef3c7', '#d97706', '#fde68a')}>원인 분석</span>
              <h3 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                왜 게티의 시험 점수(PCK 94%)는 높게 나왔을까?
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Point 1 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #ef4444',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  1. 극소량 데이터셋(31장)의 심각한 과적합 (Overfitting)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>31장 픽셀 단순 암기:</strong> 손의 해부학적 일반 원리를 배운 것이 아니라 특정 31장 속 좌표만 외운 상태</div>
                  <div>• <strong>새 환경 대응력 0%:</strong> 조금만 각도나 조명이 바뀌어도 관절을 전혀 찾지 못하는 극단적 과적합 발생</div>
                </div>
              </div>

              {/* Point 2 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #d97706',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  2. 정형화된 정면 포즈에 국한된 평가의 착시 현상
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>단순 포즈로만 라벨링:</strong> 31장 전체가 비슷한 조명과 배경에서 정면으로 활짝 편 손으로만 구성</div>
                  <div>• <strong>시험 문제 동일 출제:</strong> 검증(Validation)도 똑같은 포즈에서만 출제되어 점수만 94%로 높게 측정된 허수</div>
                </div>
              </div>

              {/* Point 3 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #2563eb',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  3. 실전 환경 노이즈 필터링 능력 완전 부재
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>배경 픽셀 관절 오인:</strong> 웹캠의 어두운 배경 노이즈와 그림자를 손가락 관절로 오판</div>
                  <div>• <strong>유령 관절(Ghost Keypoint):</strong> 손 형태를 잡지 못하고 허공에 마구잡이로 점을 찍는 치명적 오작동 발생</div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 교훈 박스 */}
          <div
            style={{
              background: '#f8fafc',
              border: '2px solid #cbd5e1',
              borderRadius: '14px',
              padding: '18px 24px',
              fontSize: '19px',
              color: '#1e293b',
              lineHeight: 1.6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          >
            💡 <strong>핵심 고찰:</strong> "학습 데이터가 부족하면 검증 점수가 94%로 높게 나와도, 실제 웹캠에서는 전혀 작동하지 않는 <strong>'과적합(Overfitting)'</strong>이 발생함"
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 5-2: [Model 2] Custom YOLOv8-Pose 실전 결과 & 학습 데이터 분석
// ========================================================
const Slide5_2_YoloResult: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 04 • 모델별 실전 추론 결과 (2/3)"
        title="[Model 2] Custom YOLOv8-Pose 실전 결과 &amp; 데이터 분석"
        subtitle="18,776장 학습으로 펼친 손은 정밀 추적했으나, 접힌 손(V·주먹)에서 드러난 2D 자가 가림의 한계"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1.15fr', gap: '26px', flex: 1, minHeight: 0 }}>
        {/* Left Column: 카메라 실측 사진 2장 + 학습 손실 곡선 그래프 */}
        <div style={{ ...S.card, border: '2.5px solid #2563eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '22px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 1. 상단: 실제 추론 사진 2장 가로 나란히 배치 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>실시간 웹캠 추론 비교</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e40af' }}>펼친 손 vs 브이(V) 제스처</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '3px 8px', borderRadius: '6px' }}>
                  Box 99.2% / Pose 87.9%
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Photo 1: 펴진 손 (성공) */}
                <div style={{ background: '#0a0f1d', borderRadius: '10px', padding: '8px', border: '1.5px solid #3b82f6', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: '142px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                    <img src={yoloOpenPalmImg} alt="YOLO Open Palm Success" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '5px', width: '100%', textAlign: 'center' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                      ✓ 펼친 손 (정밀 검출)
                    </span>
                    <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>
                      5개 손가락 끝마디까지 관절 정밀 추적
                    </div>
                  </div>
                </div>

                {/* Photo 2: 브이 제스처 (실패) */}
                <div style={{ background: '#0a0f1d', borderRadius: '10px', padding: '8px', border: '1.5px solid #ef4444', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: '142px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                    <img src={yoloVSignImg} alt="YOLO V-Sign Failure" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '5px', width: '100%', textAlign: 'center' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#dc2626', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px' }}>
                      ❌ 브이(V) 제스처 (관절 뭉침)
                    </span>
                    <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>
                      손가락 끝 미인식 &amp; 손바닥 중앙에 뭉침
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 하단: 15 Epochs 학습 결과 그래프 및 데이터 분석 (크기 대폭 확대) */}
            <div style={{ borderTop: '1.5px solid #e2e8f0', paddingTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                  📊 15 Epochs 학습 곡선: 손실(Loss) 급감 &amp; 정확도(mAP) 99.2% 고득점 수렴
                </span>
                <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 700, background: '#eff6ff', padding: '3px 10px', borderRadius: '6px' }}>
                  18,776장 학습 • 64분 완주
                </span>
              </div>

              {/* 고해상도 2단 핵심 차트 (265px로 대폭 확대) */}
              <div style={{ width: '100%', height: '265px', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #cbd5e1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <img src={yoloMetricsImg} alt="YOLO Training Results Curves (Loss & mAP)" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              {/* 그래프 설명 2단 카드 (Loss vs mAP) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1d4ed8' }}>
                    📉 [왼쪽 차트] 관절 오차 (Loss)
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '3px', lineHeight: 1.45 }}>
                    • <strong>7.79 ➔ 1.62 (-79.2%)</strong>: 학습을 거듭할수록 오차가 바닥으로 수직 하강하며 안정 수렴
                  </div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#059669' }}>
                    📈 [오른쪽 차트] 검출 성능 (mAP50)
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '3px', lineHeight: 1.45 }}>
                    • <strong>손 검출 99.2% / 관절 87.9%</strong>: 1.8만 장 검증셋에서 높은 정확도(99.2%)에 도달
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 요약 및 발표 반전 포인트 */}
          <div style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb', padding: '10px 14px', borderRadius: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e40af' }}>
              💡 <strong>핵심 반전:</strong> "학습 지표는 99.2%로 높게 수렴했으나, 펴진 손 데이터 편향으로 접힌 제스처에서 관절 붕괴"
            </span>
          </div>
        </div>

        {/* Right Column: 왜 펴진 손은 잘 되는데 접은 손은 무너질까? 심층 원인 분석 */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>원인 분석</span>
              <h3 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                수치(99.2%)와 실전의 괴리 심층 분석
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Point 1 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #2563eb',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  1. 자가 가림(Self-Occlusion)에 의한 2D 좌표 붕괴
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>자가 가림(Occlusion):</strong> 손가락을 접으면 앞마디가 뒷마디를 가려 관절 위치 은폐</div>
                  <div>• <strong>깊이(z축) 부재:</strong> 2D 평면 신경망은 입체 깊이를 알 수 없어 좌표가 손바닥 중심에 뭉침</div>
                </div>
              </div>

              {/* Point 2 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #0284c7',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  2. 펴진 손 위주의 학습 데이터 편향 (Open-Palm Bias)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>정면 펴진 손 편향:</strong> 18,776장 대다수가 활짝 편 손 위주로 구성되어 접힌 손 포즈 미학습</div>
                  <div>• <strong>비정형 포즈 취약:</strong> 펴진 손은 정밀 추적하나 V자·주먹 등 접힌 손에서 인식률 급락</div>
                </div>
              </div>

              {/* Point 3 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #d97706',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  3. 손바닥 미분리(1-Stage) 단일 회귀의 한계
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>손바닥 미분리(1-Stage):</strong> 손 영역 크롭 없이 전체 화면에서 예측하여 경계 혼선 발생</div>
                  <div>• <strong>회전 증강 부재:</strong> <code style={{ color: '#2563eb', fontWeight: 700 }}>degrees: 0.0</code> 설정으로 손이 기울어질 때 키포인트 엉킴</div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 교훈 박스 */}
          <div
            style={{
              background: '#f8fafc',
              border: '2px solid #cbd5e1',
              borderRadius: '14px',
              padding: '18px 24px',
              fontSize: '19px',
              color: '#1e293b',
              lineHeight: 1.6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          >
            💡 <strong>핵심 고찰:</strong> "1.8만 장 학습으로 펴진 손은 안정화했으나, 2D 모델의 자가 가림 한계로 인해 3D 좌표 추정이 가능한 <strong>MediaPipe</strong> 도입이 필수적임을 규명함"
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 5-3: [Model 3] Google MediaPipe 상용 엔진 검증 (실측 사진 2장 및 기술 분석)
// ========================================================
const Slide5_3_MediaPipe: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 04 • 모델별 실전 추론 결과 (3/3)"
        title="[Model 3] Google MediaPipe 상용 엔진 검증"
        subtitle="손바닥 1차 검출과 3D 합성 데이터로 복합 포즈부터 주먹까지 무지연 실시간 연주 보장"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1.15fr', gap: '26px', flex: 1, minHeight: 0 }}>
        {/* Left: MediaPipe 실시간 실측 화면 2장 (복합 제스처 vs 주먹) */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '22px 24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={S.badge('#dcfce7', '#15803d', '#86efac')}>실전 추론 테스트</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>실제 웹캠 추론 화면 2종</span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', background: '#f0fdf4', border: '1px solid #86efac', padding: '3px 8px', borderRadius: '6px' }}>
                SOTA 실시간 추적 (95%+)
              </span>
            </div>

            {/* 실제 MediaPipe 추론 사진 2장 가로 나란히 배치 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {/* Photo 1: 복합 제스처 */}
              <div style={{ background: '#0a0f1d', borderRadius: '10px', padding: '8px', border: '1.5px solid #10b981', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: '275px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                  <img src={mediapipeResultImg} alt="MediaPipe Complex Pose" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ marginTop: '6px', width: '100%', textAlign: 'center' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#15803d', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px' }}>
                    ✓ 복합 포즈 추적 (성공)
                  </span>
                  <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '3px' }}>
                    어두운 배경 노이즈 없이 21개 관절 정밀 고정
                  </div>
                </div>
              </div>

              {/* Photo 2: 주먹 제스처 (성공) */}
              <div style={{ background: '#0a0f1d', borderRadius: '10px', padding: '8px', border: '1.5px solid #10b981', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: '275px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                  <img src={mediapipeFistImg} alt="MediaPipe Clenched Fist" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ marginTop: '6px', width: '100%', textAlign: 'center' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#15803d', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px' }}>
                    ✓ ✊ 꽉 쥔 주먹 (3D 복원 성공)
                  </span>
                  <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '3px' }}>
                    손가락이 완전히 접혀도 21개 관절 입체 복원!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#f0fdf4', borderLeft: '4px solid #16a34a', padding: '10px 14px', borderRadius: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#15803d' }}>
              ✓ 모델 2(YOLO)에서 붕괴되던 주먹 제스처를 3D 깊이 추정으로 정상 복원
            </span>
          </div>
        </div>

        {/* Right: 왜 구글 모델은 압도적으로 잘 될까? */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={S.badge('#dcfce7', '#15803d', '#86efac')}>기술적 분석</span>
              <h3 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                구글 미디어파이프가 주먹까지 추적하는 핵심 원리
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Point 1 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #16a34a',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  1. 2-Stage 파이프라인 (손바닥 먼저 검출 후 영역 크롭)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>손바닥 박스 먼저 추출:</strong> 1차 신경망(Palm Detector)이 손바닥을 정확히 오려낸 후 관절 추적</div>
                  <div>• <strong>배경 노이즈 원천 차단:</strong> 잘라낸 손 안에서만 점을 찍으므로 모델 1(Geti)의 허공 유령 관절 100% 방지</div>
                </div>
              </div>

              {/* Point 2 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #059669',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  2. 3D 입체 좌표 추정 (가려진 주먹 관절도 z축 깊이로 복원)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>해부학적 3D 관절 모델링:</strong> 수백만 장의 3D 합성 데이터로 관절 간의 뼈대 연결 법칙 사전 학습</div>
                  <div>• <strong>주먹 자가 가림 극복:</strong> 손가락이 안쪽으로 완전히 말려 가려져도 입체적인 z축 좌표로 21개 점 정밀 복원</div>
                </div>
              </div>

              {/* Point 3 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #2563eb',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  3. 60 FPS 웹 브라우저 경량화 추론 (WASM / WebGL)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '18px', color: '#334155', lineHeight: 1.55 }}>
                  <div>• <strong>온디바이스 WebGL 가속:</strong> 별도 GPU 서버 없이 브라우저 내에서 프레임당 16ms(60 FPS) 연산</div>
                  <div>• <strong>무지연 실시간 연주:</strong> 입력 지연(Latency)이 없어 손가락을 움직이는 즉시 실시간 피아노 사운드 생성</div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 결론 박스 */}
          <div
            style={{
              background: '#f8fafc',
              border: '2px solid #cbd5e1',
              borderRadius: '14px',
              padding: '18px 24px',
              fontSize: '19px',
              color: '#1e293b',
              lineHeight: 1.6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          >
            💡 <strong>최종 결론:</strong> "3가지 AI 모델의 장단점을 직접 검증한 끝에, 주먹을 포함한 모든 손가락 제스처를 안정적으로 인식하고 실시간 무지연 연주가 가능한 <strong>Google MediaPipe</strong>를 AuraSynth의 최종 악기 엔진으로 확정했습니다."
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 6: 최종 결과물: 손동작 신디사이저 (AuraSynth) 기능 및 실시간 연주 시스템
// ========================================================
const Slide6_Instrument: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 05 • 실시간 악기 시스템"
        title="손 제스처 음악 변환과 실시간 악기 연동"
        subtitle="카메라 앞에서 양손의 제스처만으로 피아노 화음과 음색을 자유롭게 연주하는 비접촉 신디사이저"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', flex: 1, minHeight: 0 }}>
        {/* Left Hand: Chord Engine */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', padding: '22px 26px', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>LEFT HAND</span>
              <h2 style={{ fontSize: '25px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                왼손: 피아노 화음(코드) 만들기
              </h2>
            </div>
            <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 700 }}>Chord &amp; Mode</span>
          </div>

          {/* Generated Concept Illustration */}
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              height: '215px',
              border: '1.5px solid #cbd5e1',
              background: '#090d16',
              position: 'relative',
            }}
          >
            <img
              src={synthLeftHandImg}
              alt="왼손 화음 제스처 매핑"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#38bdf8',
                fontSize: '13px',
                padding: '4px 10px',
                borderRadius: '6px',
                backdropFilter: 'blur(4px)',
                fontWeight: 700,
              }}
            >
              🎹 손가락 포즈 인식 ➔ 피아노 화음 매핑
            </div>
          </div>

          {/* Easy feature descriptions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', flex: 1, justifyContent: 'center' }}>
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                🖐️ 손가락 모양으로 원하는 화음(Chord) 즉시 선택
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '15px', color: '#475569', lineHeight: 1.45 }}>
                <div>• <strong>손가락 개수 매핑:</strong> 1~5개 펴짐에 따라 C, Dm, Em, F, G 등 기본 피아노 화음 즉각 선택</div>
                <div>• <strong>직관적 반주:</strong> 건반을 직접 누르지 않고 손가락 포즈만으로 풍성한 코드 연주 가능</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #0284c7' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                🔄 손목을 살짝 기울여 밝은 장조 / 슬픈 단조 전환
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '15px', color: '#475569', lineHeight: 1.45 }}>
                <div>• <strong>손목 기울기 감지:</strong> 좌우 틸트(Tilt) 각도에 따라 메이저(Major) ↔ 마이너(Minor) 실시간 전환</div>
                <div>• <strong>감정선 표현:</strong> 별도 버튼 없이 손목 각도 조작만으로 곡의 분위기와 무드를 자유롭게 변형</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #7c3aed' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                ✨ 화면 하단 네온 텍스트로 현재 연주 코드 실시간 표시
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '15px', color: '#475569', lineHeight: 1.45 }}>
                <div>• <strong>실시간 시각 피드백:</strong> 연주 중인 코드명(C Major, Am 등)이 화면 하단 네온으로 즉시 디스플레이</div>
                <div>• <strong>안정적 모니터링:</strong> 현재 잡힌 손가락 모양과 코드 상태를 눈으로 보며 안심하고 연주</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand: Voicing & Expression */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', padding: '22px 26px', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={S.badge('#dcfce7', '#15803d', '#86efac')}>RIGHT HAND</span>
              <h2 style={{ fontSize: '25px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                오른손: 볼륨(소리 크기)과 음색 조절
              </h2>
            </div>
            <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 700 }}>Volume &amp; Expression</span>
          </div>

          {/* Generated Concept Illustration */}
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              height: '215px',
              border: '1.5px solid #cbd5e1',
              background: '#090d16',
              position: 'relative',
            }}
          >
            <img
              src={synthRightHandImg}
              alt="오른손 볼륨 및 필터 음색 조절"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#4ade80',
                fontSize: '13px',
                padding: '4px 10px',
                borderRadius: '6px',
                backdropFilter: 'blur(4px)',
                fontWeight: 700,
              }}
            >
              🎛️ 손 높이 볼륨 + 손목 틸트 음색 필터 변형
            </div>
          </div>

          {/* Easy feature descriptions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', flex: 1, justifyContent: 'center' }}>
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #16a34a' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                🔊 손을 올리고 내리는 높낮이로 볼륨 조절
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '15px', color: '#475569', lineHeight: 1.45 }}>
                <div>• <strong>높낮이(Y축) 연동:</strong> 손을 높이 올리면 웅장하고 풍성하게, 내리면 부드럽게 감쇄</div>
                <div>• <strong>비접촉 다이내믹스:</strong> 하드웨어 노브 없이 허공의 손 높이(Y축)만으로 음량 정밀 제어</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #059669' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                🎛️ 손목을 기울여 부드러운 피아노 ➔ 날카로운 신스 변신
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '15px', color: '#475569', lineHeight: 1.45 }}>
                <div>• <strong>로우패스 필터 개폐:</strong> 안쪽으로 꺾으면 아날로그 피아노 톤, 바깥으로 젖히면 날카로운 전자 신스</div>
                <div>• <strong>다이내믹 질감 변형:</strong> 연주 도중 손목 각도를 열어 EDM·신스팝 사운드로 즉각 빌드업</div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #d97706' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                🎶 엄지를 펼치면 웅장한 저음 베이스(-1옥타브) 추가
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '15px', color: '#475569', lineHeight: 1.45 }}>
                <div>• <strong>서브 베이스 레이어:</strong> 엄지손가락을 펴는 순간 묵직한 -1옥타브 근음(Bass)이 함께 울림</div>
                <div>• <strong>화려한 7th 텐션:</strong> 오른손 손가락 개수에 따라 재즈풍 고급 텐션 코드가 자동으로 레이어링</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Execution Showcase Banner */}
      <div
        style={{
          marginTop: '14px',
          background: '#ffffff',
          border: '1.5px solid #cbd5e1',
          borderRadius: '14px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.05)',
        }}
      >
        {/* Actual Live Execution Screenshot Container */}
        <div
          style={{
            height: '115px',
            width: '280px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '2px solid #0284c7',
            background: '#040711',
            position: 'relative',
            flexShrink: 0,
            boxShadow: '0 4px 14px -3px rgba(2, 132, 199, 0.3)',
          }}
        >
          <img
            src={synthLivePlayImg}
            alt="AuraSynth 실제 연주 화면"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '6px',
              background: 'rgba(15, 23, 42, 0.88)',
              color: '#38bdf8',
              fontSize: '11.5px',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 700,
              backdropFilter: 'blur(3px)',
            }}
          >
            🔴 LIVE 연주 화면
          </div>
          <div
            style={{
              position: 'absolute',
              top: '5px',
              right: '6px',
              background: 'rgba(15, 23, 42, 0.88)',
              color: '#4ade80',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 700,
            }}
          >
            ⚡ 30 FPS
          </div>
        </div>

        {/* Live Execution Details & Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                실제 신디사이저 연주 화면: <span style={{ color: '#2563eb' }}>E(V) Dominant 7th (-8ve)</span>
              </span>
            </div>
            <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>양손 인터랙티브 AI 신디사이저</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '15px', color: '#475569', lineHeight: 1.45 }}>
            <div>
              • <strong>실시간 시각 피드백:</strong> 왼손 5손가락 화음(E)과 오른손 7th 텐션 및 엄지 옥타브(-8ve)가 화면 중앙에 즉시 디스플레이
            </div>
            <div>
              • <strong>오디오 파형 &amp; 원클릭 연주:</strong> 하단 오렌지색 네온 파형으로 실시간 사운드 합성 시각화, 복잡한 설정 없이 .exe 실행만으로 즉시 연주
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 6-2: AuraSynth 상단 기능 제어 바 (Top Bar UI/UX)
// ========================================================
const Slide6_2_TopBar: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 05 • 실시간 악기 시스템"
        title="AuraSynth 상단 제어 바(Control Bar) 주요 기능"
        subtitle="연주 중 AI 모델 전환부터 음색, 조옮김, 볼륨 및 필터까지 한눈에 조작하는 컨트롤 타워"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, minHeight: 0 }}>
        {/* 상단: 실제 기능 바 UI 쇼케이스 */}
        <div
          style={{
            ...S.card,
            padding: '16px 26px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#07090e',
            border: '2px solid #1e293b',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 700 }}>
              🖥️ AuraSynth 실제 실행 화면 상단 헤더 (스튜디오 DAW 스타일 제로-오버랩 고정 바)
            </span>
            <span style={S.badge('#0f172a', '#38bdf8', '#0284c7')}>Zero-Overlap Control Bar</span>
          </div>
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <img
              src={topBarImg}
              alt="AuraSynth 상단 제어 바"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* 하단: 4대 핵심 기능 영역별 쉬운 설명 카드 (글자 대폭 확대 및 여백 채움) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', flex: 1 }}>
          {/* 1. AI 모델 스위칭 */}
          <div style={{ ...S.card, display: 'flex', flexDirection: 'column', padding: '24px 26px', borderTop: '6px solid #2563eb', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>AI ENGINE</span>
                <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 800 }}>01</span>
              </div>
              <h3 style={{ fontSize: '23px', fontWeight: 800, margin: '0 0 14px', color: '#0f172a' }}>
                3대 AI 모델 실시간 스위칭
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '17.5px', color: '#334155', lineHeight: 1.55 }}>
                <div>• <strong>무중단 모델 교체:</strong> 드롭다운 클릭만으로 MediaPipe, Geti, YOLOv8을 실시간 전환</div>
                <div>• <strong>AI 상태 배지:</strong> 현재 어떤 엔진으로 손을 인식 중인지 상단 배지에서 즉각 확인</div>
                <div>• <strong>무지연 스트리밍:</strong> 웹소켓 브릿지 연동으로 연주 중 끊김 없는 제로-딜레이 스왑</div>
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '14.5px', color: '#2563eb', fontWeight: 700, marginTop: '12px' }}>
              ✓ 런타임 실시간 모델 교체 지원
            </div>
          </div>

          {/* 2. Key 및 음색 선택 */}
          <div style={{ ...S.card, display: 'flex', flexDirection: 'column', padding: '24px 26px', borderTop: '6px solid #0284c7', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={S.badge('#e0f2fe', '#0284c7', '#bae6fd')}>SOUND PRESET</span>
                <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 800 }}>02</span>
              </div>
              <h3 style={{ fontSize: '23px', fontWeight: 800, margin: '0 0 14px', color: '#0f172a' }}>
                조옮김(Key) &amp; 음색 프리셋
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '17.5px', color: '#334155', lineHeight: 1.55 }}>
                <div>• <strong>12키 조옮김:</strong> A, C, G 등 원하는 악곡의 조에 맞춰 기준 음을 즉시 변경 (Transpose)</div>
                <div>• <strong>3종 음색 선택:</strong> 따뜻한 신스(삼각파), 밝은 신스(톱니파), 레트로 신스(사각파)</div>
                <div>• <strong>실시간 배음 합성:</strong> 음색 모드별 오실레이터 주파수 배율을 오디오 파이프라인에 반영</div>
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '14.5px', color: '#0284c7', fontWeight: 700, marginTop: '12px' }}>
              ✓ 12 Key &amp; 3 Color Presets
            </div>
          </div>

          {/* 3. 실시간 제스처 가이드 */}
          <div style={{ ...S.card, display: 'flex', flexDirection: 'column', padding: '24px 26px', borderTop: '6px solid #16a34a', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={S.badge('#dcfce7', '#15803d', '#86efac')}>INTERACTIVE HUD</span>
                <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 800 }}>03</span>
              </div>
              <h3 style={{ fontSize: '23px', fontWeight: 800, margin: '0 0 14px', color: '#0f172a' }}>
                초보자를 위한 실시간 가이드
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '17.5px', color: '#334155', lineHeight: 1.55 }}>
                <div>• <strong>화음 매핑 HUD:</strong> 가이드 버튼 클릭 시 손가락-화음표(도, 레, 미...)가 반투명 오버레이</div>
                <div>• <strong>직관적 즉석 연주:</strong> 코드를 모르는 사용자도 손모양을 보며 누구나 즉시 쉽게 연주</div>
                <div>• <strong>제스처 피드백:</strong> 왼손 제스처 변화에 따라 현재 잡힌 코드가 화면에 실시간 점등</div>
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '14.5px', color: '#16a34a', fontWeight: 700, marginTop: '12px' }}>
              ✓ On-Screen Interactive Guide
            </div>
          </div>

          {/* 4. 마스터 볼륨 & LED 필터 HUD */}
          <div style={{ ...S.card, display: 'flex', flexDirection: 'column', padding: '24px 26px', borderTop: '6px solid #d97706', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={S.badge('#fef3c7', '#d97706', '#fde68a')}>LEVEL &amp; FILTER</span>
                <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 800 }}>04</span>
              </div>
              <h3 style={{ fontSize: '23px', fontWeight: 800, margin: '0 0 14px', color: '#0f172a' }}>
                볼륨 슬라이더 &amp; LED 미터
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '17.5px', color: '#334155', lineHeight: 1.55 }}>
                <div>• <strong>마스터 볼륨:</strong> 0%부터 150%(사운드 증폭)까지 마우스 슬라이더로 출력 음량 조절</div>
                <div>• <strong>네온 LED 미터:</strong> 손목 기울기에 따른 음량 레벨과 필터 개방도 실시간 시각화</div>
                <div>• <strong>필터 상태 HUD:</strong> 오른손 틸트 각도에 따른 로우패스 필터 개방치(+7%) 실시간 표시</div>
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '14.5px', color: '#d97706', fontWeight: 700, marginTop: '12px' }}>
              ✓ Dynamic Output &amp; Filter HUD
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '16px',
          background: '#ffffff',
          border: '1.5px solid #cbd5e1',
          borderRadius: '14px',
          padding: '16px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '18px',
          color: '#1e293b',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <span>
          💡 <strong>통합 제어 경험:</strong> 복잡한 터미널 명령이나 오디오 장비 없이, 단 하나의 상단 바에서 <strong>AI 모델 교체 ➔ 사운드 조율 ➔ 실시간 모니터링</strong>이 즉각 완결됨
        </span>
        <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>All-in-One Control Bar</span>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// SLIDE 7: 결론 및 출처 (References) (폰트 대폭 확대)
// ========================================================
const Slide7_Conclusion: Page = () => {
  return (
    <section style={S.canvas}>
      <Header
        tag="PART 06 • 결론 &amp; 프로젝트 성과"
        title="Intel Geti &amp; OpenVINO 활용 성과 및 고찰"
        subtitle="Intel Geti를 통한 엣지 AI 프로토타이핑부터 OpenVINO GPU 런타임 가속, 그리고 실전 악기 구현까지의 핵심 결론"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.05fr', gap: '30px', flex: 1, minHeight: 0 }}>
        {/* Left: Engineering Takeaways (Intel Geti & OpenVINO 핵심 성과) */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>KEY TAKEAWAYS</span>
              <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Intel Geti &amp; OpenVINO 활용 핵심 성과
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Point 1 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #2563eb',
                  borderRadius: '12px',
                  padding: '15px 18px',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  1. Intel Geti: 노코드(No-Code) 훈련의 생산성과 실무적 한계 파악
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '17px', color: '#334155', lineHeight: 1.5 }}>
                  <div>• <strong>웹 GUI 프로토타이핑:</strong> 복잡한 코드 없이 브라우저에서 라벨링부터 경량 모델(RTMPose) 학습·배포까지 단번에 완료하는 Geti의 뛰어난 생산성을 경험</div>
                  <div>• <strong>실무적 제약 조건 분석:</strong> 소표본 중심 툴의 1.8만 장 라벨 유실 한계와 2D 자가 가림 문제를 분석하고, 터미널 직접 학습으로 보완하며 엔지니어링 시야 확장</div>
                </div>
              </div>

              {/* Point 2 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #0284c7',
                  borderRadius: '12px',
                  padding: '15px 18px',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  2. OpenVINO: GPU 하드웨어 가속을 통한 실시간 초고속 추론 실현
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '17px', color: '#334155', lineHeight: 1.5 }}>
                  <div>• <strong>GPU 런타임 가속:</strong> OpenVINO IR 포맷(FP16/FP32) 변환 및 GPU 하드웨어 가속을 통해 밀리초(ms) 단위의 초저지연 실시간 추론 달성</div>
                  <div>• <strong>실시간 스트리밍 연동:</strong> <code style={{ color: '#2563eb', fontWeight: 700 }}>bridge_openvino.py</code> 기반의 파이썬-웹소켓 브릿지를 구축하여 21개 관절 좌표를 악기 UI로 지연 없이 고속 전송</div>
                </div>
              </div>

              {/* Point 3 */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '6px solid #059669',
                  borderRadius: '12px',
                  padding: '15px 18px',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  3. Geti·OpenVINO 중심의 3대 모델 비교 &amp; 독립형 악기 완성
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '17px', color: '#334155', lineHeight: 1.5 }}>
                  <div>• <strong>멀티 비전 모델 비교:</strong> [Geti OpenVINO(GPU 가속 최적화)] vs [YOLOv8(대용량 훈련)] vs [MediaPipe(3D 좌표)]를 다각도로 비교 분석하여 AI 비전 실무 지식 확립</div>
                  <div>• <strong>독립형 데스크톱 완성:</strong> 모델 평가에 그치지 않고 일반 PC에서 더블클릭으로 바로 연주 가능한 완성형 제스처 악기(.exe) 최종 패키징</div>
                </div>
              </div>
            </div>
          </div>

          {/* 최종 결론 하이라이트 박스 */}
          <div
            style={{
              background: '#eff6ff',
              borderLeft: '5px solid #2563eb',
              borderRadius: '10px',
              padding: '12px 18px',
              marginTop: '10px',
            }}
          >
            <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#1e40af' }}>
              💡 프로젝트 최종 결론
            </div>
            <div style={{ fontSize: '15px', color: '#1e3a8a', marginTop: '3px', lineHeight: 1.45 }}>
              "Intel Geti와 OpenVINO의 GPU 런타임 가속 기술을 실시간 인터랙티브 악기에 성공적으로 접목하여, GPU 하드웨어 성능을 극대화한 비접촉 실시간 AI 음악 시스템을 완성함"
            </div>
          </div>
        </div>

        {/* Right: References & Credits (공식 최신 출처 링크 포함) */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '26px 30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={S.badge('#f1f5f9', '#475569', '#cbd5e1')}>REFERENCES</span>
              <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                공식 출처 및 데이터베이스 링크
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Ref 1: Base Dataset with direct link */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '5px solid #2563eb',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={S.badge('#eff6ff', '#2563eb', '#bfdbfe')}>학습 데이터셋</span>
                  <span style={{ fontSize: '13.5px', color: '#64748b', fontWeight: 700 }}>26,768장 COCO-Pose</span>
                </div>
                <div style={{ fontSize: '18.5px', fontWeight: 800, color: '#0f172a' }}>
                  Ultralytics Hand-Keypoints Dataset
                </div>
                <div style={{ fontSize: '13px', fontFamily: '"JetBrains Mono", monospace', color: '#2563eb', wordBreak: 'break-all', marginTop: '3px' }}>
                  https://github.com/ultralytics/assets/releases/download/v0.0.0/hand-keypoints.zip
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '3px' }}>
                  Train 18,776장 + Val 7,992장 / 21개 관절 키포인트 글로벌 공인 규격
                </div>
              </div>

              {/* Ref 2: Intel Geti & OpenVINO (프로젝트 핵심 기술) */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '5px solid #0284c7',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={S.badge('#e0f2fe', '#0284c7', '#7dd3fc')}>프로젝트 핵심 기술</span>
                  <span style={{ fontSize: '13.5px', color: '#0284c7', fontWeight: 700 }}>Intel 공식 플랫폼 &amp; 툴킷</span>
                </div>
                <div style={{ fontSize: '18.5px', fontWeight: 800, color: '#0f172a' }}>
                  Intel Geti™ Platform &amp; OpenVINO™ Toolkit
                </div>
                <div style={{ fontSize: '13px', fontFamily: '"JetBrains Mono", monospace', color: '#0284c7', wordBreak: 'break-all', marginTop: '3px' }}>
                  https://geti.intel.com | https://docs.openvino.ai
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '3px' }}>
                  Intel Geti 노코드 컴퓨터 비전 플랫폼 &amp; OpenVINO 2024 GPU 런타임 가속 엔진
                </div>
              </div>

              {/* Ref 3: Comparison Frameworks & Prototype */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: '5px solid #059669',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={S.badge('#dcfce7', '#059669', '#86efac')}>비교 모델 &amp; 원작</span>
                  <span style={{ fontSize: '13.5px', color: '#64748b', fontWeight: 700 }}>프레임워크 &amp; 프로토타입</span>
                </div>
                <div style={{ fontSize: '18.5px', fontWeight: 800, color: '#0f172a' }}>
                  Google MediaPipe &amp; YOLOv8 &amp; Gesture Synth
                </div>
                <div style={{ fontSize: '13px', fontFamily: '"JetBrains Mono", monospace', color: '#059669', wordBreak: 'break-all', marginTop: '3px' }}>
                  https://developers.google.com/mediapipe | https://github.com/indecisiveeric/gesture-synth
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '3px' }}>
                  3D 관절 추적 Tasks-Vision, YOLOv8 훈련 도구 및 Web Audio API 악기 원작
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1.5px solid #f1f5f9', paddingTop: '12px', fontSize: '14.5px', color: '#94a3b8' }}>
            ※ 모든 오픈소스 라이선스 및 인텔 공식 기술 규격을 준수하여 연구·발표 목적으로 제작되었습니다.
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

// ========================================================
// 4. METADATA & SPEAKER NOTES (발표 대본 탑재 - 총 12개 슬라이드 전체 동기화)
// ========================================================
export const meta: SlideMeta = {
  title: 'AuraSynth: AI 제스처 신디사이저 엔지니어링 (발표자: 박현규)',
  createdAt: '2026-10-20T14:23:40.929Z',
};

export const notes: (string | undefined)[] = [
  // Slide 0: Cover Notes
  `안녕하십니까, 'AI 제스처 신디사이저 AuraSynth' 프로젝트 발표를 맡은 박현규입니다.
본 프로젝트는 컴퓨터 비전 딥러닝과 웹 오디오 기술을 결합하여, 카메라 앞에서 맨손으로 화음과 음색을 제어하는 비접촉 전자 악기 시스템을 구현한 연구입니다.`,

  // Slide 1: Agenda Notes
  `오늘 발표는 화면에 보시는 것처럼 총 6단계로 진행됩니다.
먼저 손가락 21개 마디 구조와 2.7만 장의 표준 데이터셋을 살펴보고,
학습 플랫폼의 데이터 유실 결함과 이를 극복하기 위해 수립한 3가지 모델 구축 방향을 말씀드리겠습니다.
이어서 저희가 테스트한 3가지 AI 모델의 장단점을 비교하고,
점수는 99점인데 왜 실제 주먹 동작은 어려웠는지 그 흥미로운 원인을 짚어봅니다.
그리고 손 제스처를 피아노 코드로 변환해 직접 연주하는 실시간 악기 시스템과 최종 결론으로 마무리하겠습니다.`,

  // Slide 2: Anatomy Notes
  `첫 번째 순서인 '21개 손 관절 구조와 데이터셋'입니다.
화면의 다이어그램을 보시면, 손목 0번 노드를 루트(Root)로 삼아 각 손가락마다 4개 마디씩 총 21개 관절이 연결되어 있습니다.
저희는 약 2.7만 장 규모의 글로벌 표준 오픈 데이터셋을 사용했으며, 손목부터 5개 손가락 마디를 독립적이고 정밀하게 추적합니다.`,

  // Slide 3: Troubleshooting Notes
  `두 번째 순서인 '학습 플랫폼 오류와 라벨 유실' 과정입니다.
다운로드한 1.8만 장의 데이터를 플랫폼에 넣으려고 처음엔 표준 파일로 변환해 넣어봤지만 플랫폼이 거부했고,
내부 코드를 뜯어 번호를 맞춰주었더니 화면에는 들어갔으나 저장할 때 점들이 증발해 버렸습니다.
혹시 외부 파일 문제인가 싶어 Geti 웹에서 직접 31장을 수동 라벨링하고 내보낸 파일조차, 다시 가져오면 라벨이 흔적도 없이 사라지는 플랫폼 자체의 치명적인 결함(Silent Drop)을 규명했습니다. 문제를 플랫폼 내부에서 해결할 수 없다는 최종 결론에 도달했습니다.`,

  // Slide 3-2: Model Strategy Notes
  `이에 따라 저희는 프로젝트를 완성하기 위해 3가지 방향으로 AI 모델 구축 전략을 수립했습니다.
첫째, 기존에 저장된 1.8만 장 라벨을 Geti에서 전혀 쓸 수 없게 되었기 때문에, 웹 화면에서 31장 정도를 손으로 직접 라벨링하여 최소 베이스라인 모델을 만들어 보았습니다.
둘째, 플랫폼 결함을 우회하여 원본 18,776장 전체 라벨을 터미널에서 YOLOv8-Pose로 직접 학습시켜 독자적인 딥러닝 모델을 완성했습니다.
셋째, 웹 브라우저에서 지연 없이 피아노를 실시간 연주할 수 있도록 구글의 고성능 MediaPipe 상용 모델을 악기 엔진으로 함께 활용했습니다.`,

  // Slide 4: Pipelines Notes
  `세 번째 순서인 '3가지 AI 모델 성능 비교'입니다.
첫째는 플랫폼 제약 하에 31장으로 강행한 Intel Geti 수작업 모델,
둘째는 원본 18,776장의 라벨 데이터를 100% 손실 없이 CLI로 학습시킨 Custom YOLOv8-Pose 모델,
그리고 셋째는 실시간 악기 제어의 기준점이 되는 Google MediaPipe SOTA 모델입니다.`,

  // Slide 5-1: Model 1 Geti Notes
  `네 번째 순서인 '각 모델별 실전 추론 결과 & 분석' 중 첫 번째, Intel Geti 모델입니다.
화면 사진을 보시면 아시겠지만, 카메라 앞에서 손을 비추었을 때 손 형태를 전혀 잡지 못하고 검은 배경 노이즈에 유령 관절(Ghost Keypoint)들이 마구잡이로 찍히는 심각한 오류가 발생했습니다.
Geti 화면에서 시험 점수(PCK)는 94%로 매우 높게 나왔는데 왜 이런 일이 벌어졌을까요?
학습에 사용된 이미지가 단 31장에 불과했기 때문에 모델이 손의 구조를 배운 게 아니라 그 31장 사진 속 좌표만 달달 외워버린 '심각한 과적합(Overfitting)' 상태였던 것입니다. 데이터셋이 부족할 때 화면 점수만 믿어서는 안 된다는 점을 입증한 사례입니다.`,

  // Slide 5-2: Model 2 YOLO Notes
  `이어서 두 번째, 로컬 터미널에서 1.8만 장 전체를 직접 학습시킨 Custom YOLOv8-Pose 모델입니다.
화면 왼쪽 아래의 학습 결과 그래프를 보시면, 15 에포크 동안 손실 곡선이 안정적으로 수렴하며 Box mAP 99.2%, Pose mAP 87.9%라는 높은 시험 성적을 기록했습니다.
하지만 상단의 실제 카메라 사진을 비교해 보시면, 왼쪽처럼 손바닥을 활짝 폈을 때는 21개 관절 점을 정밀하게 추적했지만,
오른쪽처럼 손가락을 접어 브이(V)나 주먹을 쥐는 순간 관절 점들이 손바닥 중앙으로 뭉쳐버리는 현상이 발생했습니다.
그 이유는 시험 데이터 대다수가 펴진 손 위주였던 데이터 편향과, 회전 증강(degrees: 0)의 부재, 그리고 2D 평면 카메라로는 가려진 손가락의 깊이를 알 수 없는 '자가 가림(Self-Occlusion)' 때문이었습니다.`,

  // Slide 5-3: Model 3 MediaPipe Notes
  `마지막으로 세 번째, 구글 MediaPipe 상용 모델의 실측 결과입니다.
화면의 두 사진을 보시면, 어두운 배경에서도 노이즈 없이 복합 제스처를 정밀하게 고정할 뿐만 아니라,
오른쪽 사진처럼 손가락을 완전히 쥐어 안쪽으로 가려진 '주먹 제스처'에서도 21개 관절 점이 정확한 해부학적 위치에 입체적으로 유지됩니다.
구글 모델은 손바닥을 먼저 오려내는 2-Stage 구조와, 가려진 관절도 3D 입체 좌표로 복원하는 기술 덕분에 모델 2(YOLO)가 실패했던 주먹까지 정상적으로 추적할 수 있었습니다.
저희는 이 세 가지 모델의 실측 결과를 바탕으로, 실시간 피아노 악기 구동 엔진으로 가장 안정적인 구글 모델을 최종 채택했습니다.`,

  // Slide 6: Instrument Notes
  `다섯 번째 순서인 '손 제스처 음악 변환과 실시간 악기 시스템'입니다.
이제 21개 관절이 어떻게 실제 음악으로 바뀌는지 직관적으로 설명해 드리겠습니다.
왼손으로는 5개 손가락의 펴짐과 접힘 모양으로 피아노 화음을 선택하고, 손목을 살짝 기울여 밝은 장조와 슬픈 단조 모드를 자유롭게 바꿉니다.
오른손으로는 손의 높낮이로 볼륨 크기를 조절하고, 손목을 기울여 부드러운 음색부터 날카로운 신디사이저 전자음까지 자유자재로 변형하며 마치 마법처럼 허공에서 악기를 연주할 수 있습니다.`,

  // Slide 6-2: TopBar Notes
  `여섯 번째 순서인 'AuraSynth 상단 제어 바 주요 기능'입니다.
화면 상단에 고정된 이 컨트롤 바는 연주 도중에도 악기의 모든 요소를 한눈에 조작할 수 있는 중심 제어 센터입니다.
첫째, 3가지 AI 모델을 연주 중단 없이 실시간으로 전환할 수 있는 모델 스위칭 드롭다운이 위치해 있습니다.
둘째, 원하는 곡에 맞춰 기준 음을 바꾸는 Key 조옮김과 따뜻한 신스, 밝은 신스 등 3가지 음색 프리셋을 선택할 수 있습니다.
셋째, 초보자를 위해 어떤 손가락을 펴면 무슨 화음이 나오는지 알려주는 실시간 제스처 가이드 버튼이 탑재되어 있습니다.
넷째, 0에서 150%까지 조절되는 마스터 볼륨 슬라이더와, 오른손 기울기에 따라 음색 필터가 열리는 정도를 숫자로 보여주는 네온 LED 레벨 미터가 실시간으로 작동합니다.`,

  // Slide 7: Conclusion Notes
  `마지막으로 '결론 및 배운 점'입니다.
이번 프로젝트는 단순히 모델을 돌려본 것에 그치지 않고, 플랫폼 에러를 직접 파고들어 규명하고, 점수와 실제 성능 사이의 괴리를 분석하며, 최종 완성된 독립 실행 프로그램(.exe)까지 만들어낸 뜻깊은 엔지니어링 경험이었습니다.
경청해 주셔서 감사합니다.`,
];

export default [
  Slide0_Cover,
  Slide1_Agenda,
  Slide2_Anatomy,
  Slide3_ReverseEngineering,
  Slide3_2_ModelStrategy,
  Slide4_Pipelines,
  Slide5_1_GetiResult,
  Slide5_2_YoloResult,
  Slide5_3_MediaPipe,
  Slide6_Instrument,
  Slide6_2_TopBar,
  Slide7_Conclusion,
] satisfies Page[];
