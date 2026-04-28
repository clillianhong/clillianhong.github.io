import React from 'react';
import ComicBook from '../components/ComicBook';

const shelves = [
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue Issue 1' },
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue Issue 1' },
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue Issue 1' },
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue Issue 1' },
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue Issue 1' },
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue Issue 1' },
];

const FLOAT_DURATIONS = [4.5, 5.2, 3.8, 4.0, 4.8, 3.5];
const FLOAT_DELAYS = [0, -1.5, -3, -2, -0.8, -2.5];

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
            padding-top: 50vh;
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
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/bookshelf/pixel_wood.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '540px',
            imageRendering: 'pixelated',
            filter: 'contrast(0.7) brightness(1.1) saturate(0.8)',
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
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  padding: '0 1rem',
                  marginBottom: '-100px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
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
