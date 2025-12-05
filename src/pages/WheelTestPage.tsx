import React, { useState } from 'react';
import RotatingWheel from '../components/RotatingWheel';
import Header from '../components/Header';

const WheelTestPage: React.FC = () => {
  const [wheelSize, setWheelSize] = useState(350);
  const [sensitivity, setSensitivity] = useState(2);
  const [showFrame, setShowFrame] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: '100vh',
          paddingTop: '6rem',
          paddingBottom: '4rem',
          background: 'var(--color-cream, #f8f6f1)',
        }}
      >
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--color-ink)',
              marginBottom: '0.5rem'
            }}>
              Rotating Wheel Test
            </h1>
            <p style={{ 
              color: 'var(--color-ink-light)', 
              fontStyle: 'italic',
              fontSize: '1.1rem'
            }}>
              Scroll or drag to spin the wheel
            </p>
          </header>

          {/* Wheel Display */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '450px',
              marginBottom: '3rem',
            }}
          >
            <RotatingWheel
              imageSrc={imageUrl || undefined}
              size={wheelSize}
              sensitivity={sensitivity}
              showFrame={showFrame}
              alt="Test artwork"
            />
          </div>

          {/* Controls Panel */}
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto',
              padding: '2rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 20px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h3 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
              color: 'var(--color-ink)'
            }}>
              Controls
            </h3>

            {/* Image URL Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--color-ink)',
                }}
              >
                Image URL (circular image works best)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL or leave empty for placeholder"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-silk, #e8e4db)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cobalt)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-silk, #e8e4db)'}
              />
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--color-ink-light)', 
                marginTop: '0.25rem' 
              }}>
                Try: /project_title_cards/comics/qingmingjie_plate.png
              </p>
            </div>

            {/* Size Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--color-ink)',
                }}
              >
                <span>Size</span>
                <span style={{ color: 'var(--color-cobalt)' }}>{wheelSize}px</span>
              </label>
              <input
                type="range"
                min="200"
                max="600"
                value={wheelSize}
                onChange={(e) => setWheelSize(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-cobalt)',
                }}
              />
            </div>

            {/* Sensitivity Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--color-ink)',
                }}
              >
                <span>Scroll Sensitivity</span>
                <span style={{ color: 'var(--color-cobalt)' }}>{sensitivity}x</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-cobalt)',
                }}
              />
            </div>

            {/* Show Frame Toggle */}
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={showFrame}
                  onChange={(e) => setShowFrame(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--color-cobalt)',
                  }}
                />
                Show decorative frame
              </label>
            </div>

            {/* Quick test buttons */}
            <div style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid var(--color-silk)' 
            }}>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--color-ink-light)', 
                marginBottom: '0.75rem' 
              }}>
                Quick test with your artwork:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setImageUrl('/project_title_cards/comics/qingmingjie_plate.png')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--color-cream-warm)',
                    border: '1px solid var(--color-silk)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-celadon-light)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-cream-warm)'}
                >
                  Qingming Plate
                </button>
                <button
                  onClick={() => setImageUrl('')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--color-cream-warm)',
                    border: '1px solid var(--color-silk)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-celadon-light)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-cream-warm)'}
                >
                  Placeholder
                </button>
              </div>
            </div>
          </div>

          {/* Usage Code */}
          <div
            style={{
              maxWidth: '500px',
              margin: '2rem auto 0',
              padding: '1.5rem',
              background: 'var(--color-ink)',
              borderRadius: '8px',
              color: 'var(--color-cream)',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              overflow: 'auto',
            }}
          >
            <p style={{ color: 'var(--color-celadon-light)', marginBottom: '0.5rem' }}>
              // Usage example:
            </p>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`<RotatingWheel
  imageSrc="${imageUrl || '/your-image.png'}"
  size={${wheelSize}}
  sensitivity={${sensitivity}}
  showFrame={${showFrame}}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default WheelTestPage;

