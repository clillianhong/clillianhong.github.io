import React from 'react';
import Footer from '../components/Footer';

const VesselBluePage: React.FC = () => {
  return (
    <>
      <section className="vessel-blue">
        <div className="vessel-blue__layout container">
          {/* Description — left on desktop, top on mobile */}
          <div className="vessel-blue__text">
            <p className="vessel-blue__label">Issue 1</p>
            <h1 className="vessel-blue__title">Vessel Blue</h1>
            <div className="accent-line" style={{ marginBottom: '1.5rem' }} />
            <p className="vessel-blue__tagline">
              A genre and gender bending romantic fantasy.
            </p>
            <p className="vessel-blue__desc">
              Raised on the high seas, Kai knows the secret to staying
              alive is simple: take care of yourself and no one else. He has
              arrived on the shores of a fading Ming dynasty to steal the
              secret to magic, a secret for which Lin Ren holds the key.
            </p>
            <p className="vessel-blue__desc">
              Ren is everything Kai is not — sheltered and gentle, they are an
              artist, not a warrior. In such dangerous times, Ren is not the
              kind of person who survives for long. It's just his luck that Kai
              finds himself cursed with an impossible task: keeping Ren alive,
              when the whole world seems to want them dead.
            </p>
            <p className="vessel-blue__coming-soon">Coming Soon</p>
            <div style={{ marginTop: '2rem' }}>
              <iframe
                src="https://vesselblue.substack.com/embed"
                width="400"
                height="280"
                style={{ border: '1px solid var(--color-silk)', background: 'white', maxWidth: '100%' }}
                frameBorder="0"
                scrolling="no"
                title="Subscribe to Vessel Blue on Substack"
              />
            </div>
          </div>

          {/* Image — right on desktop, bottom on mobile */}
          <div className="vessel-blue__image-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/project_title_cards/comics/vessel_blue_cover.png`}
              alt="Vessel Blue cover art"
              className="vessel-blue__image"
            />
            <div className="vessel-blue__image-frame" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default VesselBluePage;
