import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('HOME');
  const searchInputRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // Sync search term with URL on mount and when location changes
  useEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);

  // Update URL live as user types — only on home page
  useEffect(() => {
    if (location.pathname !== '/') return; // <-- only update URL on home page

    const params = new URLSearchParams(location.search);
    const currentSearchParam = params.get('search') || '';
    
    // Only update URL if the search term actually changed to prevent loops
    if (searchTerm.trim() !== currentSearchParam) {
      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      } else {
        params.delete('search');
      }
      navigate({ pathname: '/', search: params.toString() }, { replace: true });
    }
  }, [searchTerm, navigate, location.pathname]);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to home page with search term
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      // Scroll to search results after a short delay
      setTimeout(() => {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
          searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    if (location.pathname === '/') {
      isNavigatingRef.current = true;
      navigate('/', { replace: true });
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

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-brand">
          <div className="brand-logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">HASHYE</span>
          </div>
          <div className="brand-tagline">Unlimited Movies & TV Shows</div>
        </Link>

        {/* Navigation Links */}
        <div className="nav-menu">
          <button className={`nav-link as-button ${activeMenu === 'HOME' ? 'active' : ''}`} onClick={() => { setActiveMenu('HOME'); isNavigatingRef.current = true; navigate('/', { replace: true }); }}>
            <span className="nav-text">HOME</span>
          </button>
          <button className={`nav-link as-button ${activeMenu === 'FEATURED' ? 'active' : ''}`} onClick={() => { setActiveMenu('FEATURED'); scrollToSection('featured'); }}>
            <span className="nav-text">FEATURED</span>
          </button>
          <button className={`nav-link as-button ${activeMenu === 'POPULAR' ? 'active' : ''}`} onClick={() => { setActiveMenu('POPULAR'); scrollToSection('popular'); }}>
            <span className="nav-text">POPULAR</span>
          </button>
        </div>

        {/* Search Bar */}
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


