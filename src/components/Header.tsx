import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Art' },
    { to: '/code', label: 'Work' },
    { href: 'https://www.instagram.com/c.lillianhong/', label: 'Instagram' },
    { href: 'https://www.linkedin.com/in/lillian-hong-69506b176/', label: 'LinkedIn' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          <Link to="/" className="header__logo">
            Lillian Hong
          </Link>

          <nav className="header__nav">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className={location.pathname === link.to ? 'active' : ''}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Hamburger button - positioned outside header for proper z-index stacking */}
      <button
        className={`menu-toggle ${isMobileMenuOpen ? 'menu-toggle--open' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1.5rem',
          zIndex: 110, // Above mobile menu (105)
        }}
      >
        <span className="menu-toggle__line" />
        <span className="menu-toggle__line" />
        <span className="menu-toggle__line" />
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
        onClick={(e) => {
          // Close menu when clicking the background (not the links)
          if (e.target === e.currentTarget) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        {navLinks.map((link) =>
          link.to ? (
            <Link key={link.label} to={link.to} onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          )
        )}
        
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            window.open('mailto:c.lillianhong@gmail.com', '_blank');
          }}
        >
          Contact
        </a>
      </div>
    </>
  );
};

export default Header;
