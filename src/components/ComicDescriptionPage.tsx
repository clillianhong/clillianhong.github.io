import React from 'react';
import Footer from './Footer';

interface ComicDescriptionPageProps {
  title: string;
  subtitle?: string;
  date?: string;
  label?: string;
  tagline?: string;
  descriptions: string[];
  coverImage: string;
  coverAlt?: string;
  status?: string;
  substackUrl?: string;
}

const ComicDescriptionPage: React.FC<ComicDescriptionPageProps> = ({
  title,
  subtitle,
  date,
  label,
  tagline,
  descriptions,
  coverImage,
  coverAlt,
  status,
  substackUrl,
}) => {
  return (
    <>
      <section className="comic-desc">
        <div className="comic-desc__layout container">
          <div className="comic-desc__text">
            {subtitle && <p className="comic-desc__label">{subtitle}</p>}
            <h1 className="comic-desc__title">{title}</h1>
            {date && <p className="comic-desc__label">{date}</p>}
            <div className="accent-line" style={{ marginBottom: '1.5rem' }} />
            {tagline && <p className="comic-desc__tagline">{tagline}</p>}
            {descriptions.map((text, i) => (
              <p key={i} className="comic-desc__body">{text}</p>
            ))}
            {status && <p className="comic-desc__status">{status}</p>}
            {substackUrl && (
              <div style={{ marginTop: '2rem' }}>
                <iframe
                  src={substackUrl}
                  width="400"
                  height="280"
                  style={{ border: '1px solid var(--color-silk)', background: 'white', maxWidth: '100%' }}
                  frameBorder="0"
                  scrolling="no"
                  title={`Subscribe to ${title} on Substack`}
                />
              </div>
            )}
          </div>
          <div className="comic-desc__image-wrapper">
            <img
              src={coverImage}
              alt={coverAlt || `${title} cover art`}
              className="comic-desc__image"
            />
            <div className="comic-desc__image-frame" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ComicDescriptionPage;
