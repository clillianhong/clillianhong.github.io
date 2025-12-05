import { useState, useEffect, useMemo } from 'react';

// Phase boundaries (scroll progress 0-1)
const PHASE_1_END = 0.4;    // Shrink phase ends
const PHASE_2_END = 0.9;    // Roll phase ends
const INTERACTIVE_START = 0.9;

// Animation keyframes for LANDSCAPE (width > height) - roll LEFT
const KEYFRAMES_LANDSCAPE = {
  phase1Start: {
    scale: 1.0,
    x: 50,        // percentage
    y: 50,        // percentage
    rotation: 0,
  },
  phase1End: {
    scale: 0.6,
    x: 50,
    y: 50,
    rotation: -90,
  },
  phase2End: {
    scale: 0.5,
    x: 0,         // center at left edge (half visible)
    y: 50,
    rotation: -185,
  },
};

// Animation keyframes for PORTRAIT (height > width) - roll UP
const KEYFRAMES_PORTRAIT = {
  phase1Start: {
    scale: 1.0,
    x: 50,
    y: 50,
    rotation: 0,
  },
  phase1End: {
    scale: 0.55,
    x: 50,
    y: 50,
    rotation: -90,
  },
  phase2End: {
    scale: 0.4,
    x: 50,        // stay centered horizontally
    y: 12,        // move to top (partially visible)
    rotation: -185,
  },
};

export type LayoutMode = 'portrait' | 'landscape';

export interface ScrollPhaseState {
  phase: 1 | 2 | 3;
  scrollProgress: number;
  layoutMode: LayoutMode;
  
  // Wheel transform values
  wheelScale: number;
  wheelX: number;          // percentage from left
  wheelY: number;          // percentage from top
  wheelRotation: number;   // degrees (scroll-driven)
  
  // UI state
  centerTextOpacity: number;
  bioOpacity: number;
  isInteractive: boolean;
  showScrollHint: boolean;
}

// Linear interpolation
const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * Math.max(0, Math.min(1, t));
};

// Ease out cubic for smoother feel
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export function useScrollPhase(heroHeight: number = 2.0): ScrollPhaseState {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );

  // Track viewport orientation
  useEffect(() => {
    const handleResize = () => {
      setLayoutMode(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScrollDistance = windowHeight * heroHeight;
      
      const progress = Math.min(Math.max(scrollY / totalScrollDistance, 0), 1);
      setScrollProgress(progress);
      
      if (scrollY > 30 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHeight, hasScrolled]);

  const state = useMemo((): ScrollPhaseState => {
    // Select keyframes based on layout mode
    const KEYFRAMES = layoutMode === 'portrait' ? KEYFRAMES_PORTRAIT : KEYFRAMES_LANDSCAPE;

    // Determine current phase
    let phase: 1 | 2 | 3;
    if (scrollProgress < PHASE_1_END) {
      phase = 1;
    } else if (scrollProgress < PHASE_2_END) {
      phase = 2;
    } else {
      phase = 3;
    }

    // Calculate phase-local progress (0-1 within each phase)
    let wheelScale: number;
    let wheelX: number;
    let wheelY: number;
    let wheelRotation: number;

    if (phase === 1) {
      // Phase 1: Shrink & initial rotation
      const t = easeOutCubic(scrollProgress / PHASE_1_END);
      
      wheelScale = lerp(KEYFRAMES.phase1Start.scale, KEYFRAMES.phase1End.scale, t);
      wheelX = lerp(KEYFRAMES.phase1Start.x, KEYFRAMES.phase1End.x, t);
      wheelY = lerp(KEYFRAMES.phase1Start.y, KEYFRAMES.phase1End.y, t);
      wheelRotation = lerp(KEYFRAMES.phase1Start.rotation, KEYFRAMES.phase1End.rotation, t);
      
    } else if (phase === 2) {
      // Phase 2: Roll (rotation linked to translation)
      const phase2Progress = (scrollProgress - PHASE_1_END) / (PHASE_2_END - PHASE_1_END);
      const t = phase2Progress; // Linear for rolling feel
      
      wheelScale = lerp(KEYFRAMES.phase1End.scale, KEYFRAMES.phase2End.scale, t);
      wheelX = lerp(KEYFRAMES.phase1End.x, KEYFRAMES.phase2End.x, t);
      wheelY = lerp(KEYFRAMES.phase1End.y, KEYFRAMES.phase2End.y, t);
      wheelRotation = lerp(KEYFRAMES.phase1End.rotation, KEYFRAMES.phase2End.rotation, t);
      
    } else {
      // Phase 3: Settled
      wheelScale = KEYFRAMES.phase2End.scale;
      wheelX = KEYFRAMES.phase2End.x;
      wheelY = KEYFRAMES.phase2End.y;
      wheelRotation = KEYFRAMES.phase2End.rotation;
    }

    // Center text fades out during phase 1
    const centerTextOpacity = phase === 1 
      ? lerp(1, 0, easeOutCubic(scrollProgress / PHASE_1_END))
      : 0;

    // Bio fades in during phase 2
    let bioOpacity: number;
    if (phase === 1) {
      bioOpacity = 0;
    } else if (phase === 2) {
      const phase2Progress = (scrollProgress - PHASE_1_END) / (PHASE_2_END - PHASE_1_END);
      // Delay bio appearance until wheel has moved a bit
      bioOpacity = lerp(0, 1, Math.max(0, (phase2Progress - 0.3) / 0.7));
    } else {
      bioOpacity = 1;
    }

    const isInteractive = scrollProgress >= INTERACTIVE_START;
    const showScrollHint = !hasScrolled || (phase < 3 && scrollProgress < 0.8);

    return {
      phase,
      scrollProgress,
      layoutMode,
      wheelScale,
      wheelX,
      wheelY,
      wheelRotation,
      centerTextOpacity,
      bioOpacity,
      isInteractive,
      showScrollHint,
    };
  }, [scrollProgress, hasScrolled, layoutMode]);

  return state;
}

export default useScrollPhase;
