import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PortalHero from '../components/PortalHero';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import PixelBubble from '../components/PixelBubble';
import data from '../data/projects';

const exhibitions = [
  { year: '2026', title: 'Brooklyn Independent Comics Showcase', type: 'Comic Convention', venue: 'Industry City, NY' },
  { year: '2025', title: 'Comics in the City: Sequential Art Is\u2026', type: 'Juried Group Exhibition', venue: 'Flushing Town Hall, NY' },
  { year: '2025', title: 'Thresholds', type: 'Group Exhibition', venue: 'Recess Grove, Brooklyn, NYC' },
  { year: '2024', title: 'League Comics Showcase', type: 'Group Exhibition', venue: 'Art Students League of New York, NYC' },
];

const projects = [
  { year: '2026', title: 'Vessel Blue, Issue 1', desc: 'Chinese fantasy comic/manhua', detail: 'Exhibited at Brooklyn Independent Comics Showcase 2026', link: '/vessel_blue', linkLabel: 'Vessel Blue, Issue 1' },
  { year: '2025', title: 'Millennia Museum', desc: 'Comic short-story; Risograph', detail: 'Exhibited at: League Comics Showcase \u2013 Honorable Mention, Women in Comics: Comics in the City' },
  { year: '2025', title: 'POV: AI Girlfriend', desc: 'Commissioned editorial illustration; Digital', detail: 'Printed in Reboot 2025', link: 'https://joinreboot.org/', linkLabel: 'Reboot Magazine' },
  { year: '2025', title: 'Dreaming with the Archives', desc: 'Augmented Reality Sculpture Exhibit, Brooklyn Bridge Park', detail: 'Park Volunteer Docent' },
  { year: '2025', title: 'A generic non-invasive neuromotor interface for human-computer interaction', desc: 'Scientific Paper, Nature Journal', detail: 'Named Contributor, R&D prototyper', link: 'https://www.nature.com/articles/s41586-025-09255-w', linkLabel: 'Nature' },
  { year: '2024', title: 'Flotsam, Jetsam', desc: 'Comic short-story, Ink & Bristol', detail: 'Printed in 2024 ASL Comics Anthology' },
  { year: '2020', title: 'Tempus', desc: 'Indie video game, PC & Mac \u2013 Lead Game Developer', detail: '2020 GDIAC Digital Showcase "Most Polished Game"' },
];

const CVSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
        fontWeight: 500,
        color: 'var(--color-ink)',
        marginBottom: '0.5rem',
        letterSpacing: '0.02em',
      }}
    >
      {title}
    </h3>
    <div
      style={{
        width: '24px',
        height: '1px',
        background: 'var(--color-cobalt)',
        opacity: 0.3,
        marginBottom: '0.5rem',
      }}
    />
    {children}
  </div>
);

const ArtPortfolioPage: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style>{`
        @keyframes art-bubble-drift {
          0%   { transform: translate(0, 0); }
          12%  { transform: translate(30vw, 15vh); }
          28%  { transform: translate(-20vw, 40vh); }
          42%  { transform: translate(25vw, -10vh); }
          58%  { transform: translate(-30vw, 25vh); }
          72%  { transform: translate(15vw, -20vh); }
          88%  { transform: translate(-10vw, -15vh); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
      <Link
        to="/bookshelf"
        style={{
          position: 'fixed',
          top: '30%',
          left: '40%',
          zIndex: 5,
          textDecoration: 'none',
          animation: 'art-bubble-drift 31s ease-in-out infinite',
        }}
      >
        <PixelBubble size={240} seed={2.5} borderWidth={3}>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.825rem',
              color: '#ffffff',
              textShadow: '-1px -1px 0 #1a1a1a, 1px -1px 0 #1a1a1a, -1px 1px 0 #1a1a1a, 1px 1px 0 #1a1a1a',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: '140px',
            }}
          >
            enter the comics ocean
          </span>
        </PixelBubble>
      </Link>
      <PortalHero />

      <section
        style={{
          background: 'var(--color-cream-warm)',
          borderTop: '1px solid var(--color-silk)',
          borderBottom: '1px solid var(--color-silk)',
          padding: 'clamp(1.25rem, 3vw, 2rem) 0',
        }}
      >
        <div className="container" style={{ maxWidth: '960px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 400,
              color: 'var(--color-ink)',
              textAlign: 'center',
              marginBottom: '0.75rem',
            }}
          >
            Projects & Exhibitions
          </h2>

          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              maxHeight: expanded ? '2000px' : '5.5rem',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {!expanded && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3rem',
                  background: 'linear-gradient(to top, var(--color-cream-warm) 0%, transparent 100%)',
                  backdropFilter: 'blur(2px)',
                  WebkitBackdropFilter: 'blur(2px)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
            )}
            <div style={{ padding: '0.5rem 0 1rem' }}>
              <CVSection title="Exhibitions & Showcases">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '0 2.5rem',
                  }}
                >
                  {exhibitions.map((ex) => (
                    <div
                      key={ex.title}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2.75rem 1fr',
                        gap: '0.75rem',
                        padding: '0.4rem 0',
                        borderBottom: '1px solid var(--color-silk)',
                        alignItems: 'baseline',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
                          fontWeight: 500,
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        {ex.year}
                      </span>
                      <span
                        style={{
                          fontSize: 'clamp(0.75rem, 1.1vw, 0.875rem)',
                          color: 'var(--color-ink-light)',
                          lineHeight: 1.4,
                        }}
                      >
                        <span style={{ fontStyle: 'italic' }}>"{ex.title}"</span>
                        , {ex.type}, {ex.venue}
                      </span>
                    </div>
                  ))}
                </div>
              </CVSection>

              <CVSection title="Projects & Awards">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '0 2.5rem',
                  }}
                >
                  {projects.map((p) => (
                    <div
                      key={p.title}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2.75rem 1fr',
                        gap: '0.75rem',
                        padding: '0.4rem 0',
                        borderBottom: '1px solid var(--color-silk)',
                        alignItems: 'baseline',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
                          fontWeight: 500,
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        {p.year}
                      </span>
                      <span
                        style={{
                          fontSize: 'clamp(0.75rem, 1.1vw, 0.875rem)',
                          color: 'var(--color-ink-light)',
                          lineHeight: 1.4,
                        }}
                      >
                        {p.link ? (
                          <a
                            href={p.link}
                            {...(p.link.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                            style={{
                              fontStyle: 'italic',
                              color: 'var(--color-cobalt)',
                              textDecoration: 'underline',
                              textUnderlineOffset: '2px',
                            }}
                          >
                            "{p.title}"
                          </a>
                        ) : (
                          <span style={{ fontStyle: 'italic' }}>"{p.title}"</span>
                        )}
                        {' \u2014 '}{p.desc}
                        <br />
                        <span style={{ opacity: 0.7, fontSize: '0.9em' }}>
                          {p.detail}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </CVSection>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-cobalt)',
                background: 'none',
                border: '1px solid var(--color-cobalt)',
                borderRadius: '3px',
                padding: '0.35rem 1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--color-cobalt)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--color-cobalt)';
              }}
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          </div>
        </div>
      </section>

      <section
        className="section" 
        style={{ 
          background: 'var(--color-cream)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section header stays contained */}
        <div className="container">
          <header className="section__header">
            <h2 className="section__title">Illustrations & Comics</h2>
          </header>
        </div>

        {/* Gallery expands full width on desktop */}
        <div className="gallery-wrapper">
          <div className="gallery">
            {data.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArtPortfolioPage;
