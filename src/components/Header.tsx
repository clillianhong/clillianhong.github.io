import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  const navLinks = [
    { to: '/', label: 'Art' },
    { to: '/code', label: 'Work' },
    { href: 'https://www.instagram.com/c.lillianhong/', label: 'Instagram' },
    { href: 'https://www.linkedin.com/in/lillian-hong-69506b176/', label: 'LinkedIn' },
    { href: 'mailto:c.lillianhong@gmail.com', label: 'Contact' },
  ];

  return (
    <>
      {/* Hamburger button - always visible */}
      <button
        className={`menu-toggle ${isSidebarOpen ? 'menu-toggle--open' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isSidebarOpen}
      >
        <span className="menu-toggle__line" />
        <span className="menu-toggle__line" />
        <span className="menu-toggle__line" />
      </button>

      {/* Backdrop overlay */}
      <div 
        className={`sidebar-backdrop ${isSidebarOpen ? 'sidebar-backdrop--open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar navigation */}
      <nav 
        className={`sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar__content">
          {/* Logo/Name at top of sidebar */}
          <div className="sidebar__header">
            <Link 
              to="/" 
              className="sidebar__logo"
              onClick={() => setIsSidebarOpen(false)}
            >
              Lillian Hong
            </Link>
          </div>

          {/* Navigation links */}
          <ul className="sidebar__nav">
            {navLinks.map((link) => (
              <li key={link.label} className="sidebar__nav-item">
                {link.to ? (
                  <Link 
                    to={link.to} 
                    onClick={() => setIsSidebarOpen(false)}
                    className={location.pathname === link.to ? 'active' : ''}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target={link.href?.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href?.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Footer text */}
          <div className="sidebar__footer">
            <p>© {new Date().getFullYear()}</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
