import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PromoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="promo-banner">
        <div className="promo-banner__inner">
          <Link to="/vessel_blue" className="promo-banner__link">
            Coming Soon: <em>Vessel Blue</em> the Webcomic!
          </Link>
          <button
            className="promo-banner__subscribe"
            onClick={(e) => {
              e.preventDefault();
              setShowSubscribe(true);
            }}
          >
            Subscribe
          </button>
          <button
            className="promo-banner__close"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
          >
            &times;
          </button>
        </div>
      </div>

      {showSubscribe && (
        <div
          className="modal-overlay modal-overlay--open"
          onClick={() => setShowSubscribe(false)}
        >
          <div
            className="promo-banner__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal__close"
              onClick={() => setShowSubscribe(false)}
              aria-label="Close subscribe modal"
            >
              &times;
            </button>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--color-ink)',
              marginBottom: '1rem',
              textAlign: 'center',
            }}>
              Subscribe to <em>Vessel Blue</em>
            </h3>
            <iframe
              src="https://vesselblue.substack.com/embed"
              width="480"
              height="320"
              style={{ border: '1px solid #EEE', background: 'white', maxWidth: '100%' }}
              frameBorder="0"
              scrolling="no"
              title="Subscribe to Vessel Blue on Substack"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PromoBanner;
