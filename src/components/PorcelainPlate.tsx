import React from 'react';

interface PorcelainPlateProps {
  children?: React.ReactNode;
  width?: string;
  aspectRatio?: string;
}

const PorcelainPlate: React.FC<PorcelainPlateProps> = ({
  children,
  width = '100%',
  aspectRatio = '3 / 2',
}) => {
  const patternId = 'plate-crosshatch';
  const floralsId = 'plate-florals';

  return (
    <div
      style={{
        width,
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <svg
        viewBox="0 0 600 400"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cross-hatch diamond pattern for the border */}
          <pattern id={patternId} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#3b6fa0" />
            <path d="M6 0L12 6L6 12L0 6Z" fill="none" stroke="#c8daea" strokeWidth="0.8" />
            <circle cx="6" cy="6" r="1.2" fill="#c8daea" opacity="0.7" />
            <circle cx="0" cy="0" r="0.8" fill="#c8daea" opacity="0.5" />
            <circle cx="12" cy="0" r="0.8" fill="#c8daea" opacity="0.5" />
            <circle cx="0" cy="12" r="0.8" fill="#c8daea" opacity="0.5" />
            <circle cx="12" cy="12" r="0.8" fill="#c8daea" opacity="0.5" />
          </pattern>

          {/* Floral motif for corners */}
          <g id={floralsId}>
            <circle cx="0" cy="0" r="8" fill="#2B4F81" opacity="0.15" />
            {/* Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-6"
                rx="2.5"
                ry="5"
                fill="#2B4F81"
                opacity="0.6"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3" fill="#2B4F81" opacity="0.7" />
            <circle cx="0" cy="0" r="1.5" fill="#e8e4db" opacity="0.5" />
          </g>

          {/* Subtle glaze sheen gradient */}
          <radialGradient id="plate-glaze" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.03" />
          </radialGradient>

          {/* Inner shadow for depth */}
          <filter id="plate-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1a2a3a" floodOpacity="0.15" />
          </filter>

          {/* Clip path for notched corners */}
          <clipPath id="plate-clip">
            <path d="
              M 30,0
              L 570,0
              L 600,30
              L 600,370
              L 570,400
              L 30,400
              L 0,370
              L 0,30
              Z
            " />
          </clipPath>
        </defs>

        {/* Plate body with notched corners */}
        <g filter="url(#plate-shadow)" clipPath="url(#plate-clip)">
          {/* Base plate color - warm porcelain white */}
          <rect x="0" y="0" width="600" height="400" rx="4" fill="#f0ede6" />

          {/* Patterned border band */}
          <path
            d="
              M 30,0 L 570,0 L 600,30 L 600,370 L 570,400 L 30,400 L 0,370 L 0,30 Z
              M 55,30 L 545,30 L 568,53 L 568,347 L 545,370 L 55,370 L 32,347 L 32,53 Z
            "
            fill={`url(#${patternId})`}
            fillRule="evenodd"
          />

          {/* Thin cobalt line on outer edge of border */}
          <path
            d="M 30,0 L 570,0 L 600,30 L 600,370 L 570,400 L 30,400 L 0,370 L 0,30 Z"
            fill="none"
            stroke="#2B4F81"
            strokeWidth="2"
          />

          {/* Thin cobalt line on inner edge of border */}
          <path
            d="M 55,30 L 545,30 L 568,53 L 568,347 L 545,370 L 55,370 L 32,347 L 32,53 Z"
            fill="none"
            stroke="#2B4F81"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Inner porcelain surface */}
          <path
            d="M 55,30 L 545,30 L 568,53 L 568,347 L 545,370 L 55,370 L 32,347 L 32,53 Z"
            fill="#f5f2ec"
          />

          {/* Inner decorative frame - double line with rounded feel */}
          <rect
            x="60" y="58" width="480" height="284"
            rx="16" ry="16"
            fill="none"
            stroke="#2B4F81"
            strokeWidth="1.2"
            opacity="0.35"
          />
          <rect
            x="66" y="64" width="468" height="272"
            rx="12" ry="12"
            fill="none"
            stroke="#2B4F81"
            strokeWidth="0.8"
            opacity="0.25"
          />

          {/* Corner floral accents on the border */}
          <use href={`#${floralsId}`} x="28" y="28" transform="translate(28,28) scale(1.4)" />
          <use href={`#${floralsId}`} x="572" y="28" transform="translate(572,28) scale(1.4)" />
          <use href={`#${floralsId}`} x="28" y="372" transform="translate(28,372) scale(1.4)" />
          <use href={`#${floralsId}`} x="572" y="372" transform="translate(572,372) scale(1.4)" />

          {/* Mid-edge floral accents */}
          <use href={`#${floralsId}`} x="300" y="14" transform="translate(300,14) scale(1.2)" />
          <use href={`#${floralsId}`} x="300" y="386" transform="translate(300,386) scale(1.2)" />
          <use href={`#${floralsId}`} x="14" y="200" transform="translate(14,200) scale(1.2)" />
          <use href={`#${floralsId}`} x="586" y="200" transform="translate(586,200) scale(1.2)" />

          {/* Glaze sheen overlay */}
          <path
            d="M 30,0 L 570,0 L 600,30 L 600,370 L 570,400 L 30,400 L 0,370 L 0,30 Z"
            fill="url(#plate-glaze)"
          />
        </g>
      </svg>

      {/* Content area positioned over the inner surface */}
      {children && (
        <div
          style={{
            position: 'absolute',
            top: '17%',
            left: '13%',
            right: '13%',
            bottom: '17%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default PorcelainPlate;
