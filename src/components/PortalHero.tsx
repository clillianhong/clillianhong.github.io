import React from 'react';
import RotatingWheel from './RotatingWheel';
import useScrollPhase from '../hooks/useScrollPhase';

const PortalHero: React.FC = () => {
  const {
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
  } = useScrollPhase(2.0); // 2x viewport height for scroll distance

  const isPortrait = layoutMode === 'portrait';

  // Calculate wheel size - starts at 100vw, but we use the scale transform
  const baseWheelSize = '100vw';

  return (
    <section
      className="portal-hero"
      style={{
        height: '300vh', // Scroll room
        position: 'relative',
        // Ensure mobile scrolling works
        touchAction: 'pan-y',
      }}
    >
      {/* Sticky viewport container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'var(--color-cream)',
          // Ensure touch scrolling works on mobile
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Ambient background gradient that follows wheel */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(
              ellipse at ${wheelX}% ${wheelY}%, 
              var(--color-celadon-light) 0%, 
              transparent 50%
            )`,
            opacity: 0.25,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* === WHEEL STAGE === */}
        <div
          className="wheel-stage"
          style={{
            position: 'absolute',
            left: `${wheelX}%`,
            top: `${wheelY}%`,
            transform: `
              translate(-50%, -50%) 
              scale(${wheelScale}) 
              rotate(${wheelRotation}deg)
            `,
            transformOrigin: 'center center',
            width: baseWheelSize,
            height: baseWheelSize,
            zIndex: 10,
            willChange: 'transform',
            // Allow touch scrolling to pass through when not interactive
            pointerEvents: isInteractive ? 'auto' : 'none',
          }}
        >
          <RotatingWheel
            imageSrc="/project_title_cards/comics/qingmingjie_plate.png"
            size="100%"
            sensitivity={2}
            showFrame={phase < 3}
            showHint={isInteractive}
            interactive={isInteractive}
            alt="Qingming Jie plate artwork"
          />

          {/* Center text - counter-rotates to stay readable */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${-wheelRotation}deg)`,
              opacity: centerTextOpacity,
              textAlign: 'center',
              pointerEvents: centerTextOpacity < 0.2 ? 'none' : 'auto',
              zIndex: 20,
              width: '55%',
              transition: 'opacity 0.2s ease',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                fontWeight: 300,
                color: 'var(--color-ink)',
                margin: 0,
                letterSpacing: '0.03em',
                textShadow: '0 2px 30px rgba(248, 246, 241, 0.95)',
              }}
            >
              Lillian Hong
            </h1>
            <div
              style={{
                width: '50px',
                height: '1px',
                background: 'var(--color-cobalt)',
                margin: '0.75rem auto',
                opacity: 0.5,
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
                fontStyle: 'italic',
                color: 'var(--color-cobalt-deep)',
                margin: 0,
                textShadow: '0 1px 15px rgba(248, 246, 241, 0.95)',
              }}
            >
              artist · prototyper · angler
            </p>
          </div>
        </div>

        {/* === BIO PANEL === */}
        {/* Portrait: bottom of screen, centered */}
        {/* Landscape: right side, vertically centered */}
        <div
          className="bio-panel"
          style={{
            position: 'absolute',
            // Portrait: position at bottom, full width
            // Landscape: position on right side
            top: isPortrait ? 'auto' : '50%',
            bottom: isPortrait ? '8%' : 'auto',
            left: isPortrait ? '5%' : '50%',
            right: '5%',
            transform: isPortrait ? 'none' : 'translateY(-50%)',
            textAlign: isPortrait ? 'center' : 'left',
            opacity: bioOpacity,
            pointerEvents: bioOpacity < 0.3 ? 'none' : 'auto',
            zIndex: 5,
            maxWidth: isPortrait ? 'none' : '450px',
            transition: 'opacity 0.3s ease',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 400,
              color: 'var(--color-ink)',
              marginBottom: '1.25rem',
            }}
          >
            About
          </h2>
          
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              lineHeight: 1.75,
              color: 'var(--color-ink-light)',
              marginBottom: '1.25rem',
            }}
          >
            While my professional work lives at the future intersection of wearable tech 
            and artificial intelligence, my creative work is rooted in the past—infused 
            with a reverence for nature and history.
          </p>
          
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              lineHeight: 1.75,
              color: 'var(--color-ink-light)',
              marginBottom: '1.5rem',
            }}
          >
            I draw inspiration from Fujianese and Taoist mythology, wuxia fantasy, 
            Chinese porcelain, and the ocean.
          </p>

          <p
            style={{
              fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
              fontStyle: 'italic',
              color: 'var(--color-ink-light)',
              marginBottom: '2rem',
              opacity: 0.75,
            }}
          >
            Favorite things: oolong tea, emerald, moon snails, fish
          </p>

          {/* Links */}
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            flexWrap: 'wrap',
            justifyContent: isPortrait ? 'center' : 'flex-start',
          }}>
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

        {/* === SCROLL HINTS === */}
        {/* Initial scroll hint */}
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
            opacity: showScrollHint && phase === 1 ? 1 : 0,
            transition: 'opacity 0.4s ease',
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

        {/* "View work" hint after bio appears */}
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
            opacity: phase === 3 ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
};

export default PortalHero;
