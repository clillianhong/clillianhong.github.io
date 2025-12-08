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
    bioEdgePosition,
  } = useScrollPhase(2.0); // 2x viewport height for scroll distance

  const isPortrait = layoutMode === 'portrait';

  // Calculate wheel size - use the larger of width/height to fill the screen
  // On portrait mobile: 100vh fills vertically
  // On landscape/desktop: 100vw fills horizontally
  const baseWheelSize = isPortrait ? '100vh' : '100vw';

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
            showHint={false}
            interactive={isInteractive}
            alt="Qingming Jie plate artwork"
          />

          {/* Center text - counter-rotates to stay readable */}
          {/* Font sizes are percentage of wheel diameter (which is 100vw or 100vh) */}
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
              width: '45%',
              transition: 'opacity 0.2s ease',
            }}
          >
            {/* Soft white glow background for legibility */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isPortrait ? '50vh' : '40vw',
                height: isPortrait ? '50vh' : '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0) 100%)',
                zIndex: -1,
              }}
            />
            <h1
              style={{
                fontFamily: "'Rampart One', sans-serif",
                fontSize: isPortrait ? '5.3vh' : '4.25vw',
                fontWeight: 400,
                color: '#ff3576',
                margin: 0,
                letterSpacing: '0.05em',
                textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, -2px 0 0 #fff, 2px 0 0 #fff',
              }}
            >
              lillian hong
            </h1>
            <p
              style={{
                fontFamily: "'Rampart One', sans-serif",
                fontSize: isPortrait ? '3.75vh' : '3vw', // ~75% the size of English name
                fontWeight: 400,
                color: '#ff3576',
                margin: '0.3em 0 0 0',
                letterSpacing: '0.2em',
              }}
            >
              洪晨昕
            </p>
            <div
              style={{
                width: '15%',
                height: '1px',
                background: '#ff3576',
                margin: '0.5em auto',
                opacity: 0.5,
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isPortrait ? '1.84vh' : '1.38vw', // ~1.8% of wheel diameter
                fontStyle: 'italic',
                color: '#ff3576',
                margin: 0,
              }}
            >
              artist · prototyper · angler
            </p>
          </div>
        </div>

        {/* === BIO PANEL === */}
        {/* Portrait: below the plate, centered, compact text */}
        {/* Landscape: right side, right-justified, hugging the edge */}
        <div
          className="bio-panel"
          style={{
            position: 'absolute',
            // Position dynamically based on where wheel stops
            top: isPortrait ? `${bioEdgePosition}%` : '50%',
            bottom: isPortrait ? '2%' : 'auto',
            left: isPortrait ? '5%' : 'auto',
            right: isPortrait ? '5%' : '3%',
            transform: isPortrait ? 'none' : 'translateY(-50%)',
            textAlign: isPortrait ? 'center' : 'right',
            opacity: bioOpacity,
            pointerEvents: bioOpacity < 0.3 ? 'none' : 'auto',
            zIndex: 5,
            width: isPortrait ? 'auto' : `${100 - bioEdgePosition - 3}%`,
            maxWidth: isPortrait ? 'none' : '450px',
            transition: 'opacity 0.3s ease',
            overflow: isPortrait ? 'auto' : 'visible',
          }}
        >
          {/* Profile photo - landscape only */}
          {!isPortrait && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              marginBottom: '1rem',
            }}>
              <img
                src={`${process.env.PUBLIC_URL}/profile.jpg`}
                alt="Lillian Hong"
                style={{
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>
          )}
          
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isPortrait ? '1.1rem' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: 'var(--color-ink)',
              marginBottom: isPortrait ? '0.5rem' : '1.25rem',
            }}
          >
            About
          </h2>
          
          <p
            style={{
              fontSize: isPortrait ? '0.8rem' : 'clamp(1.1rem, 1.8vw, 1.5rem)',
              lineHeight: 1.6,
              color: 'var(--color-ink-light)',
              marginBottom: isPortrait ? '0.5rem' : '1.25rem',
            }}
          >
            While my professional work lives at the future intersection of wearable tech 
            and artificial intelligence, my creative work is rooted in the past—infused 
            with a reverence for nature and history.
          </p>
          
          <p
            style={{
              fontSize: isPortrait ? '0.8rem' : 'clamp(1.1rem, 1.8vw, 1.5rem)',
              lineHeight: 1.6,
              color: 'var(--color-ink-light)',
              marginBottom: isPortrait ? '0.5rem' : '1.5rem',
            }}
          >
            I draw inspiration from Fujianese and Taoist mythology, wuxia fantasy, 
            Chinese porcelain, and the ocean.
          </p>

          <p
            style={{
              fontSize: isPortrait ? '0.7rem' : 'clamp(1rem, 1.4vw, 1.25rem)',
              fontStyle: 'italic',
              color: 'var(--color-ink-light)',
              marginBottom: isPortrait ? '0.75rem' : '2rem',
              opacity: 0.75,
            }}
          >
            Favorite things: oolong tea, emerald, moon snails, fish
          </p>

          {/* Links */}
          <div style={{ 
            display: 'flex', 
            gap: isPortrait ? '1rem' : '1.5rem', 
            flexWrap: 'wrap',
            justifyContent: isPortrait ? 'center' : 'flex-end',
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
                  fontSize: isPortrait ? '0.7rem' : '0.85rem',
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
            bottom: isPortrait ? '0.5rem' : '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isPortrait ? '0.25rem' : '0.5rem',
            opacity: phase === 3 ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: isPortrait ? '0.55rem' : '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-light)',
            }}
          >
            View work
          </span>
          <svg
            width={isPortrait ? '12' : '16'}
            height={isPortrait ? '12' : '16'}
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
