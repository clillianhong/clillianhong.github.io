import React from 'react';
import ComicBook from '../components/ComicBook';

const shelves = [
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue' },
  { imageSrc: '/project_title_cards/comics/millennia_museum_cover.png', href: '/millennia_museum', alt: 'Millennia Museum' },
  { imageSrc: '/project_title_cards/comics/memory_waves_2.jpg', href: '/memory_waves', alt: 'Memory Waves' },
  { imageSrc: '/project_title_cards/comics/flotsam_jetsam_comic.png', href: '/flotsam_jetsam', alt: 'Flotsam, Jetsam' },
  { imageSrc: '/project_title_cards/comics/qingmingjie_plate.png', href: '/qingming_jie', alt: 'Rose Medallion Qingming Jie' },
];

const FLOAT_DURATIONS = [4.5, 5.2, 3.8, 4.0, 4.8];
const FLOAT_DELAYS = [0, -1.5, -3, -2, -0.8];

const BookshelfPage: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes float-vertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-24px); }
        }
        @keyframes float-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(40px); }
        }
        .shelf-unit {
          animation: float-vertical var(--float-duration) ease-in-out infinite;
          animation-delay: var(--float-delay);
        }
        .bookshelf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          max-width: 1100px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .shelf-unit {
            animation-name: float-horizontal;
            max-width: calc(100vw - 2rem);
          }
          .bookshelf-grid {
            grid-template-columns: 1fr;
            padding-top: 25vh;
          }
        }
      `}</style>
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          marginTop: '-40px',
          paddingTop: 'calc(40px + clamp(2rem, 5vw, 4rem))',
          paddingBottom: 'clamp(2rem, 5vw, 4rem)',
          paddingLeft: 'clamp(1rem, 3vw, 2rem)',
          paddingRight: 'clamp(1rem, 3vw, 2rem)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'clip',
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '-10%',
            left: '-5%',
            width: '110%',
            height: '120%',
            backgroundImage: 'url(/bookshelf/purple_pixel_sunset.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            imageRendering: 'pixelated',
            zIndex: 0,
          }}
        />
        <div
          className="bookshelf-grid"
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          {shelves.map((shelf, i) => (
            <div
              key={i}
              className="shelf-unit"
              style={{
                '--float-duration': `${FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]}s`,
                '--float-delay': `${FLOAT_DELAYS[i % FLOAT_DELAYS.length]}s`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              } as React.CSSProperties}
            >
              <div
                style={{
                  minHeight: 'clamp(47px, 6.7vw, 73px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 1rem',
                  marginBottom: '-100px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 'clamp(0.675rem, 1.5vw, 0.975rem)',
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    textShadow: '1px 1px 0 rgba(0,0,0,0.8)',
                    lineHeight: 1.4,
                    maxWidth: '160px',
                  }}
                >
                  {shelf.alt}
                </span>
                <ComicBook
                  imageSrc={shelf.imageSrc}
                  href={shelf.href}
                  alt={shelf.alt}
                />
              </div>
              <img
                src="/bookshelf/pixel_cloud.png"
                alt=""
                draggable={false}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  imageRendering: 'pixelated',
                  userSelect: 'none',
                  transform: 'scaleY(-1)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookshelfPage;
