import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import MovieCard from '../components/MovieCard';
import FeaturedHero from '../components/FeaturedHero';
import './Home.css';
import { Toaster, toast } from 'react-hot-toast';

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const popularNow = useMemo(() => {
    const popular = movies.filter(m => m.is_popular);
    return (popular.length ? popular : movies).slice(0, 6);
  }, [movies]);

  const recentReleases = useMemo(() => movies.slice(0, 4), [movies]);

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Search param from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) setSearchTerm(searchParam);
  }, [location.search]);

  // Filter movies based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (movie.interpreter_name && movie.interpreter_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, movies]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await api.getMovies();
      setMovies(data);
      setFilteredMovies(data);

      toast.success('Movies loaded successfully!');
    } catch (err) {
      console.error(err);
      let errorMessage = err.message || 'Failed to load movies.';

      if (err.message.includes('timed out')) {
        errorMessage = 'Server is waking up. Please wait a moment.';
      } else if (err.message.includes('Unable to connect')) {
        errorMessage = 'Cannot reach the server. Check your internet connection.';
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading amazing movies...</p>
            <p className="loading-subtitle">Please wait while we fetch the latest content</p>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={fetchMovies} className="retry-btn">🔄 Try Again</button>
              <button onClick={() => window.location.reload()} className="retry-btn secondary">🔄 Refresh Page</button>
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Featured Hero */}
      <div className="container" id="featured">
        <FeaturedHero movies={movies} />
      </div>

      <div className="container">
        {/* Popular Now */}
        <div className="movies-section" id="popular">
          <div className="section-header">
            <h2 className="section-title">Popular Now</h2>
            <div className="section-subtitle">Hand-picked highlights</div>
          </div>
          <div className="movies-grid compact-grid">
            {popularNow.length ? popularNow.map(movie => (
              <MovieCard key={`popular-${movie.id}`} movie={movie} />
            )) : <p style={{ color: 'white', textAlign: 'center', padding: '40px' }}>No popular movies found</p>}
          </div>
        </div>

        {/* Recent Releases */}
        <div className="movies-section" id="recent">
          <div className="section-header">
            <h2 className="section-title">Recent Releases</h2>
            <div className="section-subtitle">Fresh additions across genres</div>
          </div>
          <div className="movies-grid compact-grid">
            {recentReleases.length ? recentReleases.map(movie => (
              <MovieCard key={`recent-${movie.id}`} movie={movie} />
            )) : <p style={{ color: 'white', textAlign: 'center', padding: '40px' }}>No recent movies found</p>}
          </div>
        </div>

        {/* All Movies */}
        <div className="movies-section" id="all-movies">
          <div className="section-header">
            <h2 className="section-title">All Movies</h2>
            <div className="section-subtitle">Browse our complete collection</div>
          </div>
          <div className="movies-grid compact-grid">
            {filteredMovies.length ? filteredMovies.map(movie => (
              <MovieCard key={`all-${movie.id}`} movie={movie} />
            )) : (
              <div className="no-results">
                <div className="no-results-icon">🎭</div>
                <h3>No movies found</h3>
                <button onClick={() => setSearchTerm('')} className="browse-all-btn">Browse All Movies</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

