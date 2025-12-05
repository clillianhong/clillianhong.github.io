import React, { useState, useEffect, useRef, useCallback } from 'react';
import RotatingWheel from './RotatingWheel';

const PortalHero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Handle scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const heroHeight = heroRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Progress from 0 to 1 over the hero section
      const progress = Math.min(Math.max(scrollY / (heroHeight - windowHeight), 0), 1);
      setScrollProgress(progress);
      
      if (scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  // Interpolation helper
  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  // Calculate animated values based on scroll progress
  const wheelScale = lerp(1, 0.12, Math.pow(scrollProgress, 0.8));
  const wheelRotation = lerp(0, 180, Math.pow(scrollProgress, 0.6)); // Rotate as it shrinks
  const wheelOpacity = lerp(1, 0.9, scrollProgress);
  const centerTextOpacity = lerp(1, 0, Math.pow(scrollProgress, 0.3)); // Fade faster
  const centerTextScale = lerp(1, 0.8, scrollProgress);
  const bioOpacity = lerp(0, 1, Math.pow(Math.max(scrollProgress - 0.3, 0) / 0.7, 0.5));
  const bioTranslateY = lerp(60, 0, Math.pow(Math.max(scrollProgress - 0.2, 0) / 0.8, 0.6));
  
  // Wheel position: center → top-left corner
  const wheelX = lerp(50, 12, Math.pow(scrollProgress, 0.7)); // percentage from left
  const wheelY = lerp(50, 15, Math.pow(scrollProgress, 0.7)); // percentage from top

  // Entrance hint opacity
  const hintOpacity = hasScrolled ? 0 : 1;

  return (
    <section 
      ref={heroRef}
      className="portal-hero"
      style={{
        height: '250vh', // Extra height for scroll room
        position: 'relative',
      }}
    >
      {/* Sticky container that stays in viewport */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'var(--color-cream)',
        }}
      >
        {/* Decorative background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at ${wheelX}% ${wheelY}%, var(--color-celadon-light) 0%, transparent 50%)`,
            opacity: 0.3,
            transition: 'background 0.1s ease-out',
            pointerEvents: 'none',
          }}
        />

        {/* The Rotating Wheel */}
        <div
          style={{
            position: 'absolute',
            left: `${wheelX}%`,
            top: `${wheelY}%`,
            transform: `translate(-50%, -50%) scale(${wheelScale}) rotate(${wheelRotation}deg)`,
            transformOrigin: 'center center',
            opacity: wheelOpacity,
            transition: 'opacity 0.1s ease-out',
            zIndex: 10,
            // Size: full viewport width (will overflow top/bottom)
            width: '100vw',
            height: '100vw',
          }}
        >
          <RotatingWheel
            imageSrc="/project_title_cards/comics/qingmingjie_plate.png"
            size="100%"
            sensitivity={2}
            showFrame={scrollProgress < 0.5}
            showHint={false}
            alt="Qingming Jie plate artwork"
          />

          {/* Center text overlay (inside the wheel) - counter-rotate to stay readable */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${-wheelRotation}deg) scale(${centerTextScale})`,
              opacity: centerTextOpacity,
              textAlign: 'center',
              pointerEvents: centerTextOpacity < 0.3 ? 'none' : 'auto',
              zIndex: 20,
              width: '60%',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--color-ink)',
                margin: 0,
                letterSpacing: '0.05em',
                textShadow: '0 2px 20px rgba(248, 246, 241, 0.9)',
              }}
            >
              Lillian Hong
            </h1>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'var(--color-cobalt)',
                margin: '0.75rem auto',
                opacity: 0.6,
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                fontStyle: 'italic',
                color: 'var(--color-cobalt-deep)',
                margin: 0,
                textShadow: '0 1px 10px rgba(248, 246, 241, 0.9)',
              }}
            >
              artist · prototyper · angler
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: hintOpacity,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-light)',
            }}
          >
            Scroll to enter
          </span>
          <div
            style={{
              width: '1px',
              height: '30px',
              background: 'linear-gradient(to bottom, var(--color-cobalt), transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Bio content that fades in */}
        <div
          style={{
            position: 'absolute',
            top: scrollProgress > 0.5 ? '10%' : '50%',
            left: scrollProgress > 0.5 ? '30%' : '50%',
            right: '5%',
            transform: `translateY(${bioTranslateY}px)`,
            opacity: bioOpacity,
            transition: 'top 0.3s ease-out, left 0.3s ease-out',
            pointerEvents: bioOpacity < 0.3 ? 'none' : 'auto',
            maxWidth: '500px',
            zIndex: 5,
          }}
        >
          {/* Mobile: adjust positioning */}
          <style>{`
            @media (max-width: 768px) {
              .portal-bio {
                left: 5% !important;
                right: 5% !important;
                top: auto !important;
                bottom: 10% !important;
                max-width: none !important;
              }
            }
          `}</style>
          
          <div className="portal-bio">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 400,
                color: 'var(--color-ink)',
                marginBottom: '1rem',
              }}
            >
              About
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--color-ink-light)',
                marginBottom: '1.5rem',
              }}
            >
              While my professional work lives at the future intersection of wearable tech 
              and artificial intelligence, my creative work is rooted in the past—infused 
              with a reverence for nature and history. I draw inspiration from Fujianese 
              and Taoist mythology, wuxia fantasy, Chinese porcelain, and the ocean.
            </p>
            
            <p
              style={{
                fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                fontStyle: 'italic',
                color: 'var(--color-ink-light)',
                marginBottom: '2rem',
                opacity: 0.8,
              }}
            >
              Favorite things: oolong tea, emerald, moon snails, fish
            </p>

            {/* Links */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { href: 'https://www.instagram.com/c.lillianhong/', label: 'Instagram' },
                { href: 'https://www.linkedin.com/in/lillian-hong-69506b176/', label: 'LinkedIn' },
                { href: 'mailto:c.lillianhong@gmail.com', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-light)',
                    textDecoration: 'none',
                    paddingBottom: '2px',
                    borderBottom: '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = 'var(--color-cobalt)';
                    e.currentTarget.style.borderBottomColor = 'var(--color-cobalt)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'var(--color-ink-light)';
                    e.currentTarget.style.borderBottomColor = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Continue scrolling hint (after bio appears) */}
        {scrollProgress > 0.8 && (
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: Math.min((scrollProgress - 0.8) / 0.2, 1),
              animation: 'fadeInUp 0.5s ease forwards',
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-light)',
              }}
            >
              View work
            </span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--color-cobalt)" 
              strokeWidth="2"
              style={{ animation: 'bounce 1s ease infinite' }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        )}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default PortalHero;

