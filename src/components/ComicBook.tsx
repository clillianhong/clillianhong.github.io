import React from 'react';

interface ComicBookProps {
  imageSrc: string;
  href: string;
  alt?: string;
  width?: string;
}

const ComicBook: React.FC<ComicBookProps> = ({
  imageSrc,
  href,
  alt = '',
  width = '140px',
}) => {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        width,
        textDecoration: 'none',
        imageRendering: 'auto',
      }}
    >
      <div
        style={{
          border: '4px solid #1a1a1a',
          boxShadow:
            'inset 0 0 0 2px #1a1a1a, 4px 4px 0 #1a1a1a',
          background: '#1a1a1a',
          lineHeight: 0,
        }}
      >
        <img
          src={imageSrc}
          alt={alt}
          draggable={false}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            userSelect: 'none',
          }}
        />
      </div>
    </a>
  );
};

export default ComicBook;
