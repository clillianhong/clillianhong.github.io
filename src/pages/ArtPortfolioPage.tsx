import React from 'react';
import PortalHero from '../components/PortalHero';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import data from '../data/projects';

const ArtPortfolioPage: React.FC = () => {
  return (
    <>
      <PortalHero />
      
      <section 
        className="section" 
        style={{ 
          background: 'var(--color-cream-warm)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          <header className="section__header">
            <h2 className="section__title">Illustrations & Comics</h2>
            <p className="section__subtitle">
              Works inspired by mythology, porcelain, and the sea
            </p>
          </header>

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
