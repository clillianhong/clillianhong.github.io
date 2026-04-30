import React from 'react';

interface PixelSpeechBubbleProps {
  children: React.ReactNode;
  visible?: boolean;
  position?: 'above' | 'below';
}

const BORDER = 3;

const CLIP_PATH = `polygon(
  ${BORDER * 2}px 0,
  calc(100% - ${BORDER * 2}px) 0,
  calc(100% - ${BORDER * 2}px) ${BORDER}px,
  calc(100% - ${BORDER}px) ${BORDER}px,
  calc(100% - ${BORDER}px) ${BORDER * 2}px,
  100% ${BORDER * 2}px,
  100% calc(100% - ${BORDER * 2}px),
  calc(100% - ${BORDER}px) calc(100% - ${BORDER * 2}px),
  calc(100% - ${BORDER}px) calc(100% - ${BORDER}px),
  calc(100% - ${BORDER * 2}px) calc(100% - ${BORDER}px),
  calc(100% - ${BORDER * 2}px) 100%,
  ${BORDER * 2}px 100%,
  ${BORDER * 2}px calc(100% - ${BORDER}px),
  ${BORDER}px calc(100% - ${BORDER}px),
  ${BORDER}px calc(100% - ${BORDER * 2}px),
  0 calc(100% - ${BORDER * 2}px),
  0 ${BORDER * 2}px,
  ${BORDER}px ${BORDER * 2}px,
  ${BORDER}px ${BORDER}px,
  ${BORDER * 2}px ${BORDER}px
)`;

const Tail: React.FC<{ flipped?: boolean }> = ({ flipped }) => (
  <div style={{
    display: 'flex',
    flexDirection: flipped ? 'column-reverse' : 'column',
    alignItems: 'center',
    ...(flipped ? { marginBottom: '0' } : {}),
  }}>
    <div style={{ width: '12px', height: `${BORDER}px`, background: '#1a1a1a', ...(flipped ? { marginBottom: '1px' } : {}) }} />
    <div style={{ width: '8px', height: `${BORDER}px`, background: '#1a1a1a', ...(flipped ? { marginBottom: '1px' } : { marginTop: '1px' }) }} />
    <div style={{ width: `${BORDER}px`, height: `${BORDER}px`, background: '#1a1a1a', ...(flipped ? { marginBottom: '1px' } : { marginTop: '1px' }) }} />
  </div>
);

const PixelSpeechBubble: React.FC<PixelSpeechBubbleProps> = ({
  children,
  visible = true,
  position = 'above',
}) => {
  if (!visible) return null;

  const showBelow = position === 'below';

  const bubbleBody = (
    <div
      style={{
        position: 'relative',
        background: '#fff',
        padding: '8px 12px',
        imageRendering: 'pixelated',
        border: `${BORDER}px solid #1a1a1a`,
        borderRadius: '0',
        minWidth: '80px',
        maxWidth: '200px',
        clipPath: CLIP_PATH,
      }}
    >
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '0.55rem',
        lineHeight: 1.6,
        color: '#1a1a1a',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {children}
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: 'absolute',
        ...(showBelow
          ? { top: '105%' }
          : { bottom: '105%' }),
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {showBelow && <Tail flipped />}
      {bubbleBody}
      {!showBelow && <Tail />}
    </div>
  );
};

export default PixelSpeechBubble;
