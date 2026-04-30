import React from 'react';
import ComicBook from '../components/ComicBook';
import OceanBackground from '../components/OceanBackground';
import PixelBubble from '../components/PixelBubble';

const shelves = [
  { imageSrc: '/project_title_cards/comics/vessel_blue_cover.png', href: '/vessel_blue', alt: 'Vessel Blue' },
  { imageSrc: '/project_title_cards/comics/millennia_museum_cover.png', href: '/millennia_museum', alt: 'Millennia Museum' },
  { imageSrc: '/project_title_cards/comics/memory_waves_2.jpg', href: '/memory_waves', alt: 'Memory Waves' },
  null,
  { imageSrc: '/project_title_cards/comics/flotsam_jetsam_comic.png', href: '/flotsam_jetsam', alt: 'Flotsam, Jetsam' },
  { imageSrc: '/project_title_cards/comics/qingmingjie_plate.png', href: '/qingming_jie', alt: 'Rose Medallion Qingming Jie' },
];

const DRIFT_PARAMS = [
  { dx1: 0.7, dx2: 1.1, dy1: 0.9, dy2: 0.6, px1: 0, px2: 1.2, py1: 0.5, py2: 2.1, ax: 20, ay: 15, dur: '8s' },
  { dx1: 0.5, dx2: 0.9, dy1: 1.1, dy2: 0.7, px1: 1.5, px2: 0.3, py1: 2.0, py2: 0.8, ax: 18, ay: 22, dur: '9s' },
  { dx1: 0.8, dx2: 0.6, dy1: 0.7, dy2: 1.0, px1: 0.8, px2: 2.5, py1: 1.3, py2: 0.4, ax: 22, ay: 18, dur: '7.5s' },
  null,
  { dx1: 0.6, dx2: 1.0, dy1: 0.8, dy2: 0.5, px1: 2.0, px2: 0.7, py1: 0.9, py2: 1.8, ax: 15, ay: 20, dur: '10s' },
  { dx1: 0.9, dx2: 0.7, dy1: 0.6, dy2: 1.2, px1: 0.4, px2: 1.8, py1: 1.6, py2: 0.6, ax: 25, ay: 16, dur: '8.5s' },
];

const MINI_BUBBLES = [
  { size: 35, top: '12%', left: '8%', dur: '11s', ax: 12, ay: 18, seed: 0.5 },
  { size: 25, top: '65%', left: '82%', dur: '13s', ax: 15, ay: 10, seed: 2.1 },
  { size: 45, top: '78%', left: '25%', dur: '9s', ax: 10, ay: 14, seed: 3.8 },
  { size: 20, top: '30%', left: '90%', dur: '14s', ax: 8, ay: 20, seed: 5.2 },
  { size: 30, top: '50%', left: '5%', dur: '12s', ax: 18, ay: 12, seed: 1.3 },
  { size: 15, top: '8%', left: '45%', dur: '15s', ax: 6, ay: 10, seed: 4.0 },
  { size: 22, top: '42%', left: '72%', dur: '10s', ax: 14, ay: 8, seed: 0.9 },
  { size: 18, top: '88%', left: '60%', dur: '13.5s', ax: 9, ay: 16, seed: 3.1 },
  { size: 12, top: '22%', left: '35%', dur: '16s', ax: 7, ay: 11, seed: 5.8 },
  { size: 28, top: '55%', left: '15%', dur: '11.5s', ax: 16, ay: 9, seed: 2.7 },
  { size: 16, top: '70%', left: '48%', dur: '14.5s', ax: 5, ay: 13, seed: 1.8 },
  { size: 20, top: '15%', left: '75%', dur: '12.5s', ax: 11, ay: 15, seed: 4.5 },
  { size: 10, top: '35%', left: '55%', dur: '17s', ax: 8, ay: 6, seed: 0.2 },
  { size: 14, top: '85%', left: '88%', dur: '13s', ax: 10, ay: 12, seed: 3.4 },
  { size: 24, top: '5%', left: '62%', dur: '11s', ax: 13, ay: 7, seed: 5.5 },
];

const BookshelfPage: React.FC = () => {
  return (
    <>
      <style>{`
        ${MINI_BUBBLES.map((_, i) => `
          @keyframes mini-drift-${i} {
            0%   { transform: translate(0, 0); }
            20%  { transform: translate(${MINI_BUBBLES[i].ax}px, -${MINI_BUBBLES[i].ay}px); }
            40%  { transform: translate(-${Math.round(MINI_BUBBLES[i].ax * 0.7)}px, ${Math.round(MINI_BUBBLES[i].ay * 0.5)}px); }
            60%  { transform: translate(${Math.round(MINI_BUBBLES[i].ax * 0.4)}px, ${Math.round(MINI_BUBBLES[i].ay * 0.9)}px); }
            80%  { transform: translate(-${Math.round(MINI_BUBBLES[i].ax * 0.5)}px, -${Math.round(MINI_BUBBLES[i].ay * 0.3)}px); }
            100% { transform: translate(0, 0); }
          }
        `).join('')}
        ${DRIFT_PARAMS.map((p, i) => {
          if (!p) return '';
          return `
            @keyframes drift-${i} {
              0%   { transform: translate(0, 0); }
              25%  { transform: translate(${p.ax}px, -${p.ay}px); }
              50%  { transform: translate(-${Math.round(p.ax * 0.6)}px, ${Math.round(p.ay * 0.8)}px); }
              75%  { transform: translate(${Math.round(p.ax * 0.4)}px, ${Math.round(p.ay * 0.3)}px); }
              100% { transform: translate(0, 0); }
            }
          `;
        }).join('')}
        .bubble-drift {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .bookshelf-quadrants {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          width: 100%;
          max-width: 1200px;
          min-height: calc(100vh - 80px);
        }
        .quadrant {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        @media (max-width: 768px) {
          .bookshelf-quadrants {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            min-height: auto;
            padding-top: 20vh;
            gap: 2rem;
          }
          .quadrant--empty {
            display: none;
          }
        }
      `}</style>
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          marginTop: '-40px',
          paddingTop: 'calc(40px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'clip',
        }}
      >
        <OceanBackground />
        {MINI_BUBBLES.map((mb, i) => (
          <div
            key={`mini-${i}`}
            style={{
              position: 'fixed',
              top: mb.top,
              left: mb.left,
              zIndex: 2,
              animationName: `mini-drift-${i}`,
              animationDuration: mb.dur,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              pointerEvents: 'none',
            }}
          >
            <PixelBubble size={mb.size} seed={mb.seed} />
          </div>
        ))}
        <div
          className="bookshelf-quadrants"
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          {shelves.map((shelf, i) => (
            <div
              key={i}
              className={`quadrant ${!shelf ? 'quadrant--empty' : ''}`}
            >
              {shelf && (
                <div
                  className="bubble-drift"
                  style={{
                    animationName: `drift-${i}`,
                    animationDuration: DRIFT_PARAMS[i]?.dur || '8s',
                  }}
                >
                  <PixelBubble size={275}>
                    <span
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: 'clamp(0.5rem, 1vw, 0.7rem)',
                        color: '#ffffff',
                        textAlign: 'center',
                        marginBottom: '0.4rem',
                        textShadow: '1px 1px 0 rgba(0,0,0,0.8)',
                        lineHeight: 1.4,
                        maxWidth: '130px',
                        display: 'block',
                      }}
                    >
                      {shelf.alt}
                    </span>
                    <ComicBook
                      imageSrc={shelf.imageSrc}
                      href={shelf.href}
                      alt={shelf.alt}
                      width="100px"
                    />
                  </PixelBubble>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookshelfPage;
