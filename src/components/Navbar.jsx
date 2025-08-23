import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('HOME');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userDropdownRef = useRef(null);

  // Sync search term with URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);

  // Update URL live as user types — only on home page
  useEffect(() => {
    if (location.pathname !== '/') return; // <-- only update URL on home page

    const params = new URLSearchParams(location.search);
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    navigate({ pathname: '/', search: params.toString() }, { replace: true });
  }, [searchTerm, navigate, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const scrollToSection = (sectionId) => {
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      navigate('/');
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

        {/* Mobile Menu Toggle */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button className={`nav-link as-button ${activeMenu === 'HOME' ? 'active' : ''}`} onClick={() => { setActiveMenu('HOME'); navigate('/'); }}>
            <span className="nav-text">HOME</span>
          </button>
          <button className={`nav-link as-button ${activeMenu === 'FEATURED' ? 'active' : ''}`} onClick={() => { setActiveMenu('FEATURED'); scrollToSection('featured'); }}>
            <span className="nav-text">FEATURED</span>
          </button>
          <button className={`nav-link as-button ${activeMenu === 'POPULAR' ? 'active' : ''}`} onClick={() => { setActiveMenu('POPULAR'); scrollToSection('popular'); }}>
            <span className="nav-text">POPULAR</span>
          </button>
          <Link to="/watchlist" className={`nav-link ${activeMenu === 'WATCHLIST' ? 'active' : ''}`} onClick={() => setActiveMenu('WATCHLIST')}>
            <span className="nav-text">WATCHLIST</span>
          </Link>
        </div>

        {/* Auth & Search */}
        <div className="nav-auth">
          <button
            className="icon-btn search-btn"
            aria-label="Search"
            onClick={() => setShowSearchModal(true)}
          >
            <Search size={20} />
          </button>

          {isAuthenticated ? (
            <div className="user-dropdown" ref={userDropdownRef}>
              <button className="user-avatar-btn" onClick={toggleUserMenu} aria-label="User Menu">
                <span className="avatar-circle">{(user?.username?.[0] || 'U').toUpperCase()}</span>
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  <Link to="/change-password" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Change Password</Link>
                  {isAdmin && <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Admin Dashboard</Link>}
                  <button className="dropdown-item danger" onClick={() => { setIsUserMenuOpen(false); handleLogout(); }}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-avatar" ref={userDropdownRef}>
              <button className="auth-avatar-btn" onClick={toggleUserMenu} aria-label="Sign In">
                <span className="auth-avatar-icon">🙍🏾</span>
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  <Link to="/login" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Sign In</Link>
                  <Link to="/register" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Sign Up</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="search-modal-overlay" onClick={() => setShowSearchModal(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <h3>Search Movies</h3>
              <button className="search-modal-close" onClick={() => setShowSearchModal(false)}>×</button>
            </div>
            <div className="search-modal-form">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search movies, descriptions, or interpreters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-modal-input"
                  autoFocus
                />
                {searchTerm && (
                  <button type="button" onClick={() => setSearchTerm('')} className="clear-search-btn">✕</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


