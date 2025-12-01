import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile menu state
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('HOME');
  const searchInputRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // Sync search term with URL
  useEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);

  // Update URL live as user types
  useEffect(() => {
    if (location.pathname !== '/') return;

    const params = new URLSearchParams(location.search);
    const currentSearchParam = params.get('search') || '';

    if (searchTerm.trim() !== currentSearchParam) {
      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      } else {
        params.delete('search');
      }
      navigate({ pathname: '/', search: params.toString() }, { replace: true });
    }
  }, [searchTerm, navigate, location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setTimeout(() => {
        const searchResults = document.getElementById('search-results');
        if (searchResults)
          searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const scrollToSection = (sectionId) => {
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      isNavigatingRef.current = true;
      navigate('/', { replace: true });
      setTimeout(doScroll, 0);
    } else {
      doScroll();
    }
  };

  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);

  const handleNavClick = (menu, path, sectionId) => {
    setActiveMenu(menu);
    setMobileMenuOpen(false); // close mobile menu
    if (path) {
      isNavigatingRef.current = true;
      navigate(path);
    } else if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="mobile-logo-wrapper">
          {/* Hamburger toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo/Brand */}
          <Link to="/" className="nav-brand">
            <span className="logo-text">HASHYE</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button
            className={`nav-link as-button ${activeMenu === 'HOME' ? 'active' : ''}`}
            onClick={() => handleNavClick('HOME', '/', null)}
          >
            <span className="nav-text">HOME</span>
          </button>

          <button
            className={`nav-link as-button ${
              activeMenu === 'NOT_INTERPRETED' ? 'active' : ''
            }`}
            onClick={() => handleNavClick('NOT_INTERPRETED', '/not-interpreted', null)}
          >
            <span className="nav-text">MOVIE ZIDASOBANUYE</span>
          </button>

          <button
            className={`nav-link as-button ${activeMenu === 'SERIES' ? 'active' : ''}`}
            onClick={() => handleNavClick('SERIES', '/series', null)}
          >
            <span className="nav-text">SEASONS</span>
          </button>

          

          {/* <button
            className={`nav-link as-button ${activeMenu === 'FEATURED' ? 'active' : ''}`}
            onClick={() => handleNavClick('FEATURED', null, 'featured')}
          >
            <span className="nav-text">FEATURED</span>
          </button> */}

          <button
            className={`nav-link as-button ${activeMenu === 'POPULAR' ? 'active' : ''}`}
            onClick={() => handleNavClick('POPULAR', null, 'popular')}
          >
            <span className="nav-text">POPULAR</span>
          </button>
        </div>

        {/* Search */}
        <div className="nav-search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-container">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`search-input ${isSearchFocused ? 'focused' : ''}`}
              />
              <button
                type="submit"
                className="search-submit-btn"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
