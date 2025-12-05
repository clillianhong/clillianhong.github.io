import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <p className="footer__text">
            © {currentYear} Lillian Hong. All rights reserved.
          </p>
          
          <div className="footer__links">
            <a
              href="https://www.instagram.com/c.lillianhong/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/lillian-hong-69506b176/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="footer__link"
              onClick={(e) => {
                e.preventDefault();
                window.open('mailto:c.lillianhong@gmail.com', '_blank');
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

