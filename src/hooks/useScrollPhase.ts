import { useState, useEffect, useMemo } from 'react';

// Phase boundaries (scroll progress 0-1)
const PHASE_1_END = 0.5;    // Shrink phase ends
const PHASE_2_END = 0.9;    // Settle phase ends
const INTERACTIVE_START = 0.85;

// Bio panel edge positions (must match PortalHero component)
const BIO_EDGE = {
  portrait: 55,    // Bio starts at this % from top (with small gap)
  landscape: 62,   // Bio starts at this % from left (hugging right side)
};

// Minimum gap between wheel edge and bio (in % of viewport)
const WHEEL_BIO_GAP = 5;

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
  
  // Calculated values for component use
  bioEdgePosition: number;
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
  const [viewportRatio, setViewportRatio] = useState(
    window.innerWidth / window.innerHeight
  );

  // Track viewport orientation and ratio
  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setLayoutMode(isPortrait ? 'portrait' : 'landscape');
      setViewportRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
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
    // Calculate target scale so wheel fits within viewport
    // Portrait: wheel is 100vh, needs to fit in width → scale = vw/vh = viewportRatio
    // Landscape: wheel is 100vw, needs to fit in height → scale = vh/vw = 1/viewportRatio
    const fitScale = layoutMode === 'portrait' 
      ? Math.min(viewportRatio * 0.95, 0.9)  // Fit in width with padding
      : Math.min((1 / viewportRatio) * 0.95, 0.9); // Fit in height with padding

    // Get the bio edge position for current layout
    const bioEdge = layoutMode === 'portrait' ? BIO_EDGE.portrait : BIO_EDGE.landscape;
    
    // Calculate final wheel position so it doesn't overlap bio
    // Wheel's edge = wheelCenter + (wheelDiameter / 2)
    // wheelDiameter in viewport % = fitScale * 100 (since wheel is 100vw or 100vh)
    // We want: wheelCenter + (fitScale * 50) + gap < bioEdge
    // Therefore: wheelCenter = bioEdge - gap - (fitScale * 50)
    const finalWheelPosition = bioEdge - WHEEL_BIO_GAP - (fitScale * 50);
    
    // Allow wheel to go off-screen (negative position) if needed to not cover bio
    // Only clamp to prevent wheel from going completely off-screen
    const clampedFinalPosition = Math.max(finalWheelPosition, -fitScale * 30);

    // Animation keyframes based on layout mode
    const KEYFRAMES = layoutMode === 'portrait' 
      ? {
          // PORTRAIT: Shrink to fit width, move to top
          phase1Start: { scale: 1.0, x: 50, y: 50, rotation: 0 },
          phase1End: { scale: fitScale, x: 50, y: 50, rotation: -60 },
          phase2End: { scale: fitScale * 0.95, x: 50, y: clampedFinalPosition, rotation: -90 },
        }
      : {
          // LANDSCAPE: Shrink to fit height, move left
          phase1Start: { scale: 1.0, x: 50, y: 50, rotation: 0 },
          phase1End: { scale: fitScale, x: 50, y: 50, rotation: -60 },
          phase2End: { scale: fitScale * 0.95, x: clampedFinalPosition, y: 50, rotation: -90 },
        };

    // Determine current phase
    let phase: 1 | 2 | 3;
    if (scrollProgress < PHASE_1_END) {
      phase = 1;
    } else if (scrollProgress < PHASE_2_END) {
      phase = 2;
    } else {
      phase = 3;
    }

    // Calculate animation values
    let wheelScale: number;
    let wheelX: number;
    let wheelY: number;
    let wheelRotation: number;

    if (phase === 1) {
      // Phase 1: Shrink to fit & initial rotation
      const t = easeOutCubic(scrollProgress / PHASE_1_END);
      
      wheelScale = lerp(KEYFRAMES.phase1Start.scale, KEYFRAMES.phase1End.scale, t);
      wheelX = lerp(KEYFRAMES.phase1Start.x, KEYFRAMES.phase1End.x, t);
      wheelY = lerp(KEYFRAMES.phase1Start.y, KEYFRAMES.phase1End.y, t);
      wheelRotation = lerp(KEYFRAMES.phase1Start.rotation, KEYFRAMES.phase1End.rotation, t);
      
    } else if (phase === 2) {
      // Phase 2: Small roll to final position
      const phase2Progress = (scrollProgress - PHASE_1_END) / (PHASE_2_END - PHASE_1_END);
      const t = easeOutCubic(phase2Progress);
      
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
      bioOpacity = lerp(0, 1, easeOutCubic(phase2Progress));
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
      bioEdgePosition: bioEdge,
    };
  }, [scrollProgress, hasScrolled, layoutMode, viewportRatio]);

  return state;
}

export default useScrollPhase;
