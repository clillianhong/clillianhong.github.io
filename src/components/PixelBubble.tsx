import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import PixelSpeechBubble from './PixelSpeechBubble';

interface PixelBubbleProps {
  children?: React.ReactNode;
  size?: number;
  pixelSize?: number;
  seed?: number;
  hoverLabel?: string;
  speechPosition?: 'above' | 'below';
}

const PixelBubble: React.FC<PixelBubbleProps> = ({
  children,
  size = 200,
  pixelSize = 5,
  seed,
  hoverLabel,
  speechPosition: fixedPosition,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shimmerRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const hueOffset = useMemo(() => seed !== undefined ? seed : Math.random() * Math.PI * 2, [seed]);
  const res = Math.ceil(size / pixelSize);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = res;
    canvas.height = res;

    ctx.clearRect(0, 0, res, res);

    const cx = res / 2;
    const cy = res / 2;
    const r = res / 2 - 1;

    for (let x = 0; x < res; x++) {
      for (let y = 0; y < res; y++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= r && dist > r - 1.5) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.fillRect(x, y, 1, 1);
        } else if (dist <= r - 1.5 && dist > r - 2.5) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Iridescent oil-slick sheen
    for (let x = 0; x < res; x++) {
      for (let y = 0; y < res; y++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= r && dist > r * 0.4) {
          const normDist = dist / r;
          const angle = Math.atan2(dy, dx);
          const wave = normDist * 12 + angle * 2;

          const rr = Math.sin(wave + hueOffset) * 0.5 + 0.5;
          const gg = Math.sin(wave + hueOffset + 2.1) * 0.5 + 0.5;
          const bb = Math.sin(wave + hueOffset + 4.2) * 0.5 + 0.5;

          const edgeFade = Math.pow((normDist - 0.4) / 0.6, 0.8);
          const alpha = edgeFade * 0.12;

          ctx.fillStyle = `rgba(${Math.round(rr * 255)},${Math.round(gg * 255)},${Math.round(bb * 255)},${alpha})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Highlight near bottom-right
    const hx = cx + r * 0.3;
    const hy = cy + r * 0.35;
    const hr = r * 0.3;
    for (let x = 0; x < res; x++) {
      for (let y = 0; y < res; y++) {
        const dx = x - hx;
        const dy = y - hy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < hr) {
          const alpha = (1 - dist / hr) * 0.7;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Small dot highlight
    const sx = Math.round(cx + r * 0.15);
    const sy = Math.round(cy + r * 0.55);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(sx, sy, 1, 1);

  }, [res, hueOffset]);

  const drawShimmer = useCallback((time: number) => {
    const canvas = shimmerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = res;
    canvas.height = res;
    ctx.clearRect(0, 0, res, res);

    const cx = res / 2;
    const cy = res / 2;
    const r = res / 2 - 1;
    const t = time * 0.003;

    for (let x = 0; x < res; x++) {
      for (let y = 0; y < res; y++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= r) {
          const normDist = dist / r;
          const angle = Math.atan2(dy, dx);
          const sweep = Math.sin(angle * 2 + t * 2) * 0.5 + 0.5;
          const wave = normDist * 8 + angle * 4 + t;

          const rr = Math.sin(wave + hueOffset) * 0.5 + 0.5;
          const gg = Math.sin(wave + hueOffset + 2.1) * 0.5 + 0.5;
          const bb = Math.sin(wave + hueOffset + 4.2) * 0.5 + 0.5;

          const shimmerBand = Math.pow(sweep, 4);
          const edgeBright = 0.3 + normDist * 0.7;
          const alpha = shimmerBand * edgeBright * 0.3;

          if (alpha > 0.02) {
            ctx.fillStyle = `rgba(${Math.round(rr * 255)},${Math.round(gg * 255)},${Math.round(bb * 255)},${alpha})`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }

    animRef.current = requestAnimationFrame(drawShimmer);
  }, [res, hueOffset]);

  useEffect(() => {
    if (hovered) {
      animRef.current = requestAnimationFrame(drawShimmer);
    } else {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      const canvas = shimmerRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, res, res);
      }
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [hovered, drawShimmer, res]);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: size,
          height: size,
          imageRendering: 'pixelated',
          pointerEvents: 'none',
        }}
      />
      <canvas
        ref={shimmerRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: size,
          height: size,
          imageRendering: 'pixelated',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      {hoverLabel && (
        <PixelSpeechBubble visible={hovered} position={fixedPosition || 'above'}>
          {hoverLabel}
        </PixelSpeechBubble>
      )}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};

export default PixelBubble;
