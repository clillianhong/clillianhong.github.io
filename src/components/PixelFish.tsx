import React, { useRef, useEffect } from 'react';

interface PixelFishProps {
  length?: number;
  height?: number;
  roundness?: number;
  color?: string;
  eyeColor?: string;
  pixelScale?: number;
}

const PixelFish: React.FC<PixelFishProps> = ({
  length = 20,
  height = 10,
  roundness = 0.6,
  color = '#f4a83d',
  eyeColor = '#1a1a1a',
  pixelScale = 4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = length;
    canvas.height = height;

    ctx.clearRect(0, 0, length, height);

    const cx = length * 0.45;
    const cy = height / 2;
    const rx = length * 0.4 * roundness + length * 0.4 * (1 - roundness) * 1.2;
    const ry = (height / 2 - 1) * roundness + (height / 2 - 1) * (1 - roundness) * 0.6;

    // Parse color to darken for outline
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.fillStyle = color;
    tempCtx.fillRect(0, 0, 1, 1);
    const imgData = tempCtx.getImageData(0, 0, 1, 1).data;
    const r = imgData[0], g = imgData[1], b = imgData[2];
    const darker = `rgb(${Math.floor(r * 0.5)},${Math.floor(g * 0.5)},${Math.floor(b * 0.5)})`;
    const lighter = `rgb(${Math.min(255, Math.floor(r * 1.3))},${Math.min(255, Math.floor(g * 1.3))},${Math.min(255, Math.floor(b * 1.3))})`;

    // Draw body
    for (let x = 0; x < length; x++) {
      for (let y = 0; y < height; y++) {
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        const dist = dx * dx + dy * dy;

        if (dist <= 1.0) {
          if (dist > 0.75) {
            ctx.fillStyle = darker;
          } else if (dy < -0.3) {
            ctx.fillStyle = lighter;
          } else {
            ctx.fillStyle = color;
          }
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Draw tail
    const tailStartX = Math.round(cx + rx * 0.8);
    const tailW = Math.max(3, Math.round(length * 0.25));
    const tailH = Math.max(2, Math.round(height * 0.4));

    for (let tx = 0; tx < tailW; tx++) {
      const spread = (tx / tailW);
      const topY = Math.round(cy - tailH * spread);
      const botY = Math.round(cy + tailH * spread);
      const px = tailStartX + tx;
      if (px >= length) break;

      for (let ty = topY; ty <= botY; ty++) {
        if (ty >= 0 && ty < height) {
          const edge = ty === topY || ty === botY;
          ctx.fillStyle = edge ? darker : color;
          ctx.fillRect(px, ty, 1, 1);
        }
      }
    }

    // Draw eye
    const eyeX = Math.round(cx - rx * 0.4);
    const eyeY = Math.round(cy - ry * 0.2);
    if (eyeX >= 0 && eyeX < length && eyeY >= 0 && eyeY < height) {
      ctx.fillStyle = eyeColor;
      ctx.fillRect(eyeX, eyeY, 1, 1);
    }

    // Draw mouth
    const mouthX = Math.round(cx - rx * 0.85);
    const mouthY = Math.round(cy + 1);
    if (mouthX >= 0 && mouthX < length && mouthY >= 0 && mouthY < height) {
      ctx.fillStyle = darker;
      ctx.fillRect(mouthX, mouthY, 1, 1);
    }

  }, [length, height, roundness, color, eyeColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: length * pixelScale,
        height: height * pixelScale,
        imageRendering: 'pixelated',
      }}
    />
  );
};

export default PixelFish;
