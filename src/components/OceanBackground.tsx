import React, { useRef, useEffect, useState } from 'react';
import PixelFish from './PixelFish';

const BG_TOP = [0x48, 0xa6, 0xa7];
const BG_BOTTOM = [0x00, 0x6a, 0x71];
const LIGHT_BLUE = [0x9A, 0xCB, 0xD0] as const;

interface OceanBackgroundProps {
  showControls?: boolean;
}

const OceanBackground: React.FC<OceanBackgroundProps> = ({ showControls: externalShowControls }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef({
    pixelSize: 4,
    waveSpeed: 0.9,
    waveHeight: 2.2,
    surfaceY: 0.4,
    rippleFreq: 1.0,
    rippleThreshold: 0.8,
    depthFade: 0.041,
    showFoam: false,
    fishLength: 17,
    fishHeight: 9,
    fishRoundness: 0.6,
    fishColor: '#f4a83d',
    fishSpeed: 0.02,
  });

  const [pixelSize, setPixelSize] = useState(4);
  const [waveSpeed, setWaveSpeed] = useState(0.9);
  const [waveHeight, setWaveHeight] = useState(2.2);
  const [surfaceY, setSurfaceY] = useState(0.4);
  const [rippleFreq, setRippleFreq] = useState(1.0);
  const [rippleThreshold, setRippleThreshold] = useState(0.8);
  const [depthFade, setDepthFade] = useState(0.041);
  const [showFoam, setShowFoam] = useState(false);

  const [fishLength, setFishLength] = useState(17);
  const [fishHeight, setFishHeight] = useState(9);
  const [fishRoundness, setFishRoundness] = useState(0.6);
  const [fishColor, setFishColor] = useState('#f4a83d');
  const [fishSpeed, setFishSpeed] = useState(0.02);
  const [panelOpen, setPanelOpen] = useState(false);

  paramsRef.current = { pixelSize, waveSpeed, waveHeight, surfaceY, rippleFreq, rippleThreshold, depthFade, showFoam, fishLength, fishHeight, fishRoundness, fishColor, fishSpeed };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (time: number) => {
      const p = paramsRef.current;
      canvas.width = Math.ceil(window.innerWidth / p.pixelSize);
      canvas.height = Math.ceil(window.innerHeight / p.pixelSize);
      const { width, height } = canvas;
      const t = time * 0.001 * p.waveSpeed;

      for (let y = 0; y < height; y++) {
        const t2 = y / height;
        const r = Math.round(BG_TOP[0] + (BG_BOTTOM[0] - BG_TOP[0]) * t2);
        const g = Math.round(BG_TOP[1] + (BG_BOTTOM[1] - BG_TOP[1]) * t2);
        const b = Math.round(BG_TOP[2] + (BG_BOTTOM[2] - BG_TOP[2]) * t2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, width, 1);
      }

      for (let x = 0; x < width; x++) {
        const wave1 = Math.sin(x * 0.08 + t * 1.2) * 6 * p.waveHeight;
        const wave2 = Math.sin(x * 0.04 + t * 0.8 + 1.5) * 10 * p.waveHeight;
        const wave3 = Math.sin(x * 0.15 + t * 2.0 + 3.0) * 3 * p.waveHeight;
        const wave4 = Math.sin(x * 0.02 + t * 0.5) * 14 * p.waveHeight;

        const surface = height * p.surfaceY + wave1 + wave2 + wave3 + wave4;

        const surfaceY = Math.round(surface) - 3;
        const foam = (Math.sin(x * 0.3 + t * 2.0) + Math.sin(x * 0.7 + t * 1.3 + 2.0) + Math.sin(x * 0.13 + t * 0.4)) / 3;
        if (p.showFoam && surfaceY >= 0 && surfaceY + 1 < height && foam > -0.2) {
          const foamAlpha = Math.min((foam + 0.2) * 2, 1.0) * 0.8;
          ctx.fillStyle = `rgba(255,255,255,${foamAlpha})`;
          ctx.fillRect(x, surfaceY, 1, foam > 0.3 ? 2 : 1);
        }

        for (let y = 0; y < height; y++) {
          const depth = y - surface;

          const rf = p.rippleFreq;
          const ripple1 = Math.sin(x * 0.1 * rf + y * 0.15 * rf + t * 1.5) * 0.5;
          const ripple2 = Math.sin(x * 0.05 * rf - y * 0.08 * rf + t * 0.7) * 0.5;
          const pattern = ripple1 + ripple2;

          if (depth > 0 && pattern > p.rippleThreshold - depth * p.depthFade) {
            const alpha = 0.8 - (y / height) * 0.6;
            ctx.fillStyle = `rgba(${LIGHT_BLUE[0]},${LIGHT_BLUE[1]},${LIGHT_BLUE[2]},${Math.max(alpha, 0.2)})`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Draw fish
      const FISH_W = p.fishLength;
      const FISH_H = p.fishHeight;
      const FISH_ROUNDNESS = p.fishRoundness;
      const fSpeed = p.fishSpeed * p.waveSpeed;
      const fishXPos = ((t * fSpeed * width) % (width + FISH_W * 2)) - FISH_W;

      const getSurface = (xp: number) => {
        const w1 = Math.sin(xp * 0.08 + t * 1.2) * 6 * p.waveHeight;
        const w2 = Math.sin(xp * 0.04 + t * 0.8 + 1.5) * 10 * p.waveHeight;
        const w3 = Math.sin(xp * 0.15 + t * 2.0 + 3.0) * 3 * p.waveHeight;
        const w4 = Math.sin(xp * 0.02 + t * 0.5) * 14 * p.waveHeight;
        return height * p.surfaceY + w1 + w2 + w3 + w4;
      };

      const fishSurface = getSurface(fishXPos);
      const fishCenterX = fishXPos + FISH_W / 2;
      const fishCenterY = fishSurface - FISH_H * 0.1;

      const slopeAhead = getSurface(fishXPos + 2);
      const slopeBehind = getSurface(fishXPos - 2);
      const angle = Math.atan2(slopeAhead - slopeBehind, 4);

      const fc = p.fishColor;
      const fishColorRGB = [parseInt(fc.slice(1,3),16), parseInt(fc.slice(3,5),16), parseInt(fc.slice(5,7),16)];
      const fishDark = [Math.floor(fishColorRGB[0] * 0.5), Math.floor(fishColorRGB[1] * 0.5), Math.floor(fishColorRGB[2] * 0.5)];
      const fishLight = [Math.min(255, Math.floor(fishColorRGB[0] * 1.3)), Math.min(255, Math.floor(fishColorRGB[1] * 1.3)), Math.min(255, Math.floor(fishColorRGB[2] * 1.3))];

      const fcx = FISH_W * 0.55;
      const fcy = FISH_H / 2;
      const frx = FISH_W * 0.4 * FISH_ROUNDNESS + FISH_W * 0.4 * (1 - FISH_ROUNDNESS) * 1.2;
      const fry = (FISH_H / 2 - 1) * FISH_ROUNDNESS + (FISH_H / 2 - 1) * (1 - FISH_ROUNDNESS) * 0.6;

      ctx.save();
      ctx.translate(fishCenterX, fishCenterY);
      ctx.rotate(angle);

      for (let fx = 0; fx < FISH_W; fx++) {
        for (let fy = 0; fy < FISH_H; fy++) {
          const lx = FISH_W - 1 - fx;
          const dx = (lx - fcx) / frx;
          const dy = (fy - fcy) / fry;
          const dist = dx * dx + dy * dy;
          if (dist <= 1.0) {
            if (dist > 0.75) {
              ctx.fillStyle = `rgb(${fishDark[0]},${fishDark[1]},${fishDark[2]})`;
            } else if (dy < -0.3) {
              ctx.fillStyle = `rgb(${fishLight[0]},${fishLight[1]},${fishLight[2]})`;
            } else {
              ctx.fillStyle = `rgb(${fishColorRGB[0]},${fishColorRGB[1]},${fishColorRGB[2]})`;
            }
            ctx.fillRect(fx - FISH_W / 2, fy - FISH_H / 2, 1, 1);
          }
        }
      }

      const tailStartX = Math.round(fcx + frx * 0.8);
      const tailW = Math.max(3, Math.round(FISH_W * 0.25));
      const tailH = Math.max(2, Math.round(FISH_H * 0.4));
      for (let tx = 0; tx < tailW; tx++) {
        const spread = tx / tailW;
        const topY = Math.round(fcy - tailH * spread);
        const botY = Math.round(fcy + tailH * spread);
        const drawX = (FISH_W - 1 - (tailStartX + tx)) - FISH_W / 2;
        for (let ty = topY; ty <= botY; ty++) {
          const edge = ty === topY || ty === botY;
          ctx.fillStyle = edge ? `rgb(${fishDark[0]},${fishDark[1]},${fishDark[2]})` : `rgb(${fishColorRGB[0]},${fishColorRGB[1]},${fishColorRGB[2]})`;
          ctx.fillRect(drawX, ty - FISH_H / 2, 1, 1);
        }
      }

      const eyeLx = FISH_W - 1 - Math.round(fcx - frx * 0.4);
      const eyeLy = Math.round(fcy - fry * 0.2);
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(eyeLx - FISH_W / 2, eyeLy - FISH_H / 2, 1, 1);

      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const showPanel = externalShowControls !== undefined ? externalShowControls : panelOpen;
  const togglePanel = () => setPanelOpen(!panelOpen);

  const sliderStyle: React.CSSProperties = { width: '100%', accentColor: '#9ACBD0' };
  const labelStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#ccc', marginBottom: '2px' };
  const rowStyle: React.CSSProperties = { marginBottom: '0.75rem' };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          imageRendering: 'pixelated',
          zIndex: 0,
        }}
      />
      <button
        onClick={togglePanel}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 11,
          background: 'rgba(10, 22, 40, 0.85)',
          color: '#9ACBD0',
          border: '1px solid rgba(154, 203, 208, 0.3)',
          borderRadius: '6px',
          padding: '0.4rem 0.75rem',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
        }}
      >
        {showPanel ? '✕' : <img src="/pixel_wave_transparent.png" alt="controls" style={{ width: '20px', height: '20px', imageRendering: 'pixelated' }} />}
      </button>
      {showPanel && <div
        style={{
          position: 'fixed',
          top: '3.5rem',
          left: '1rem',
          zIndex: 10,
          background: 'rgba(10, 22, 40, 0.85)',
          padding: '1rem',
          borderRadius: '8px',
          width: '260px',
          fontFamily: 'monospace',
          backdropFilter: 'blur(4px)',
          maxHeight: 'calc(100vh - 5rem)',
          overflowY: 'auto',
        }}
      >
        <div style={{ color: '#9ACBD0', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>Ocean Controls</div>

        <div style={rowStyle}>
          <div style={labelStyle}><span>Pixel Size</span><span>{pixelSize}px</span></div>
          <input type="range" min="1" max="10" step="1" value={pixelSize} onChange={e => setPixelSize(Number(e.target.value))} style={sliderStyle} />
        </div>
        <div style={rowStyle}>
          <div style={labelStyle}><span>Wave Speed</span><span>{waveSpeed.toFixed(1)}x</span></div>
          <input type="range" min="0.1" max="3" step="0.1" value={waveSpeed} onChange={e => setWaveSpeed(Number(e.target.value))} style={sliderStyle} />
        </div>
        <div style={rowStyle}>
          <div style={labelStyle}><span>Wave Height</span><span>{waveHeight.toFixed(1)}x</span></div>
          <input type="range" min="0.1" max="3" step="0.1" value={waveHeight} onChange={e => setWaveHeight(Number(e.target.value))} style={sliderStyle} />
        </div>
        <div style={rowStyle}>
          <div style={labelStyle}><span>Surface Position</span><span>{(surfaceY * 100).toFixed(0)}%</span></div>
          <input type="range" min="0.05" max="0.8" step="0.05" value={surfaceY} onChange={e => setSurfaceY(Number(e.target.value))} style={sliderStyle} />
        </div>
        <div style={rowStyle}>
          <div style={labelStyle}><span>Ripple Frequency</span><span>{rippleFreq.toFixed(1)}x</span></div>
          <input type="range" min="0.2" max="3" step="0.1" value={rippleFreq} onChange={e => setRippleFreq(Number(e.target.value))} style={sliderStyle} />
        </div>
        <div style={rowStyle}>
          <div style={labelStyle}><span>Ripple Threshold</span><span>{rippleThreshold.toFixed(2)}</span></div>
          <input type="range" min="-0.5" max="0.8" step="0.05" value={rippleThreshold} onChange={e => setRippleThreshold(Number(e.target.value))} style={sliderStyle} />
        </div>
        <div style={rowStyle}>
          <div style={labelStyle}><span>Depth Fade</span><span>{depthFade.toFixed(3)}</span></div>
          <input type="range" min="0" max="0.05" step="0.001" value={depthFade} onChange={e => setDepthFade(Number(e.target.value))} style={sliderStyle} />
        </div>
        <div style={rowStyle}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#ccc', cursor: 'pointer' }}>
            <input type="checkbox" checked={showFoam} onChange={e => setShowFoam(e.target.checked)} style={{ accentColor: '#9ACBD0' }} />
            Foam Line
          </label>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
          <div style={{ color: '#9ACBD0', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>Fish Controls</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', padding: '0.5rem' }}>
            <PixelFish length={fishLength} height={fishHeight} roundness={fishRoundness} color={fishColor} />
          </div>
          <div style={rowStyle}>
            <div style={labelStyle}><span>Length</span><span>{fishLength}px</span></div>
            <input type="range" min="8" max="40" step="1" value={fishLength} onChange={e => setFishLength(Number(e.target.value))} style={sliderStyle} />
          </div>
          <div style={rowStyle}>
            <div style={labelStyle}><span>Height</span><span>{fishHeight}px</span></div>
            <input type="range" min="4" max="20" step="1" value={fishHeight} onChange={e => setFishHeight(Number(e.target.value))} style={sliderStyle} />
          </div>
          <div style={rowStyle}>
            <div style={labelStyle}><span>Roundness</span><span>{fishRoundness.toFixed(1)}</span></div>
            <input type="range" min="0.1" max="1.0" step="0.1" value={fishRoundness} onChange={e => setFishRoundness(Number(e.target.value))} style={sliderStyle} />
          </div>
          <div style={rowStyle}>
            <div style={labelStyle}><span>Color</span><span>{fishColor}</span></div>
            <input type="color" value={fishColor} onChange={e => setFishColor(e.target.value)} style={{ width: '100%', height: '24px', border: 'none', cursor: 'pointer' }} />
          </div>
          <div style={rowStyle}>
            <div style={labelStyle}><span>Speed</span><span>{fishSpeed.toFixed(3)}</span></div>
            <input type="range" min="0.005" max="0.1" step="0.005" value={fishSpeed} onChange={e => setFishSpeed(Number(e.target.value))} style={sliderStyle} />
          </div>
        </div>
      </div>}
    </>
  );
};

export default OceanBackground;
