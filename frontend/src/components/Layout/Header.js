import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.vehicles'), href: '/vehiculos' },
    { name: t('nav.services'), href: '/servicios' },
    { name: t('nav.financing'), href: '/financiacion' },
    { name: t('nav.news'), href: '/noticias' },
    { name: t('nav.about'), href: '/nosotros' },
    { name: t('nav.contact'), href: '/contacto' }
  ];

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            Ridauto Motor
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-nav hidden-mobile">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`navbar-link ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="btn btn-sm btn-secondary"
              aria-label="Toggle language"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="hidden-desktop flex items-center justify-center w-10 h-10 text-gray-700 hover:text-ridauto-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="hidden-desktop py-4 border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-gray-700 hover:text-ridauto-primary ${
                  location.pathname === item.href ? 'text-ridauto-primary font-semibold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="mt-4 btn btn-sm btn-secondary"
            >
              {i18n.language === 'es' ? 'English' : 'Español'}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;