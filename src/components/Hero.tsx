import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__image-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/profile.jpg`}
              alt="Lillian Hong"
              className="hero__image"
            />
            <div className="hero__image-frame" />
          </div>

          <div className="hero__text">
            <h1 className="hero__name">Lillian Hong</h1>
            
            <p className="hero__tagline">
              Indie comics artist · R&D prototyper · Master angler
            </p>

            <p className="hero__bio">
              While my professional work lives at the future intersection of wearable tech 
              and artificial intelligence, my creative work is rooted in the past—infused 
              with a reverence for nature and history. I draw inspiration from Fujianese 
              and Taoist mythology, wuxia fantasy, Chinese porcelain, and the ocean.
            </p>

            <p className="hero__bio" style={{ fontStyle: 'italic', marginTop: '1rem', fontSize: '0.9em', opacity: 0.8 }}>
              Favorite things: oolong tea, emerald, moon snails, fish
            </p>

            <div className="hero__links">
              <a
                href="https://www.instagram.com/c.lillianhong/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Instagram
              </a>
              
              <a
                href="https://www.linkedin.com/in/lillian-hong-69506b176/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>

              <a
                href="#"
                className="hero__link"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('mailto:c.lillianhong@gmail.com', '_blank');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

