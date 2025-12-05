import React, { useState, useRef, useEffect, useCallback } from 'react';

interface RotatingWheelProps {
  /** Image source for the wheel */
  imageSrc?: string;
  /** Size of the wheel (width and height) */
  size?: number | string;
  /** How fast the wheel rotates per scroll tick (degrees) */
  sensitivity?: number;
  /** Whether to show decorative frame */
  showFrame?: boolean;
  /** Alt text for the image */
  alt?: string;
  /** Optional className for custom styling */
  className?: string;
  /** Whether to show the interaction hint */
  showHint?: boolean;
  /** Whether scroll/drag interactions are enabled */
  interactive?: boolean;
}

const RotatingWheel: React.FC<RotatingWheelProps> = ({
  imageSrc,
  size = 400,
  sensitivity = 2,
  showFrame = true,
  alt = 'Rotating artwork',
  className = '',
  showHint = true,
  interactive = true,
}) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  // Calculate angle from center of wheel to pointer position
  const getAngleFromCenter = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  // Handle scroll wheel rotation
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !interactive) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * sensitivity * 0.1;
      setRotation(prev => prev + delta);
      setVelocity(delta);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [sensitivity, interactive]);

  // Handle drag rotation (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    lastAngleRef.current = getAngleFromCenter(e.clientX, e.clientY);
    lastTimeRef.current = Date.now();
    setVelocity(0);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
    let deltaAngle = currentAngle - lastAngleRef.current;
    
    // Handle wrap-around at ±180°
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    
    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;
    if (deltaTime > 0) {
      setVelocity(deltaAngle / deltaTime * 16); // Normalize to ~60fps
    }
    
    setRotation(prev => prev + deltaAngle);
    lastAngleRef.current = currentAngle;
    lastTimeRef.current = now;
  }, [isDragging, getAngleFromCenter]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch rotation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive || e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    lastAngleRef.current = getAngleFromCenter(touch.clientX, touch.clientY);
    lastTimeRef.current = Date.now();
    setVelocity(0);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const currentAngle = getAngleFromCenter(touch.clientX, touch.clientY);
    let deltaAngle = currentAngle - lastAngleRef.current;
    
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    
    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;
    if (deltaTime > 0) {
      setVelocity(deltaAngle / deltaTime * 16);
    }
    
    setRotation(prev => prev + deltaAngle);
    lastAngleRef.current = currentAngle;
    lastTimeRef.current = now;
  }, [isDragging, getAngleFromCenter]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse/touch listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Momentum / inertia animation
  useEffect(() => {
    if (isDragging) return;
    
    const animate = () => {
      setVelocity(prev => {
        if (Math.abs(prev) < 0.01) return 0;
        setRotation(r => r + prev);
        return prev * 0.96; // Friction
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    if (Math.abs(velocity) > 0.01) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, velocity]);

  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      ref={containerRef}
      className={`rotating-wheel ${className}`}
      style={{
        width: sizeValue,
        height: sizeValue,
        position: 'relative',
        cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none',
        touchAction: interactive ? 'none' : 'auto',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Decorative outer frame */}
      {showFrame && (
        <div
          className="rotating-wheel__frame"
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '2px solid var(--color-cobalt, #2B4F81)',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
      )}
      
      {/* Main wheel container */}
      <div
        className="rotating-wheel__disc"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          transform: `rotate(${rotation}deg)`,
          willChange: 'transform',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.1)',
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        ) : (
          /* Placeholder pattern when no image */
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `
                conic-gradient(
                  from 0deg,
                  var(--color-celadon, #8fa89a) 0deg,
                  var(--color-cream, #f8f6f1) 30deg,
                  var(--color-cobalt, #2B4F81) 60deg,
                  var(--color-cream, #f8f6f1) 90deg,
                  var(--color-celadon, #8fa89a) 120deg,
                  var(--color-cream, #f8f6f1) 150deg,
                  var(--color-cobalt, #2B4F81) 180deg,
                  var(--color-cream, #f8f6f1) 210deg,
                  var(--color-celadon, #8fa89a) 240deg,
                  var(--color-cream, #f8f6f1) 270deg,
                  var(--color-cobalt, #2B4F81) 300deg,
                  var(--color-cream, #f8f6f1) 330deg,
                  var(--color-celadon, #8fa89a) 360deg
                )
              `,
            }}
          />
        )}
      </div>

      {/* Center pin decoration */}
      {showFrame && (
        <div
          className="rotating-wheel__center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '12%',
            height: '12%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-cream, #f8f6f1) 0%, var(--color-silk, #e8e4db) 100%)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
            border: '2px solid var(--color-cobalt, #2B4F81)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Interaction hint */}
      {showHint && (
        <div
          className="rotating-wheel__hint"
          style={{
            position: 'absolute',
            bottom: '-2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.75rem',
            color: 'var(--color-ink-light, #666)',
            opacity: 0.7,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          Scroll or drag to rotate
        </div>
      )}
    </div>
  );
};

export default RotatingWheel;

