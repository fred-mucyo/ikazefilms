import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import MovieCard from '../components/MovieCard';
import FeaturedHero from '../components/FeaturedHero';
import './Home.css';
import { Toaster, toast } from 'react-hot-toast';
import debounce from 'lodash.debounce';
import useSEO from "../hooks/useSeo.jsx";
import InfiniteScroll from 'react-infinite-scroll-component';
import staticMovies from '../utils/staticMovies';
import staticSeries from '../utils/staticSeries';

const MOVIES_PER_LOAD = 12;

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([...staticMovies, ...staticSeries]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([...staticMovies, ...staticSeries]);
  const [visibleCount, setVisibleCount] = useState(MOVIES_PER_LOAD);

  const searchTerm = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  }, [location.search]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getMovies();
      setMovies([...data, ...staticSeries]);
      setFilteredMovies([...data, ...staticSeries]);
    } catch (err) {
      console.error(err);
      const errorMessage = err.message || 'Failed to load movies.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filterMovies = useMemo(
    () =>
      debounce((term) => {
        if (!term.trim()) {
          setFilteredMovies(movies);
        } else {
          const filtered = movies.filter(
            (movie) =>
              movie?.title?.toLowerCase().includes(term.toLowerCase()) ||
              movie?.interpreter_name?.toLowerCase().includes(term.toLowerCase())
          );
          setFilteredMovies(filtered);
        }
        setVisibleCount(MOVIES_PER_LOAD);
      }, 300),
    [movies]
  );

  useEffect(() => {
    filterMovies(searchTerm);
    return () => filterMovies.cancel();
  }, [searchTerm, filterMovies]);

  // --- Popular Now: combine movies & series properly ---
  const popularNow = useMemo(() => {
    return [...movies]
      .filter(m => m.is_popular)
      .sort((a, b) => {
        // Optional: series first, then movies
        if (a.type === 'series' && b.type !== 'series') return -1;
        if (a.type !== 'series' && b.type === 'series') return 1;
        return 0;
      })
      .slice(0, 6);
  }, [movies]);

  const recentReleases = useMemo(() => {
    return [...movies]
      .filter((m) => m?.created_at)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);
  }, [movies]);

  const allMovies = useMemo(() => {
    const excludedIds = new Set([...popularNow, ...recentReleases].map(m => m.id));
    return filteredMovies.filter((m) => !excludedIds.has(m.id));
  }, [filteredMovies, popularNow, recentReleases]);

  const loadMoreMovies = () => setVisibleCount(prev => prev + MOVIES_PER_LOAD);

  if (loading && movies.length === 0) {
    return (
      <>
        {useSEO({
          title: "Hashye - Stream Movies & Shows in HD",
          description: "Discover and stream the latest movies and shows in HD on Hashye.",
          image: "/hashye-preview.png",
          url: "https://hashye.online/",
        })}
        <div className="home-page">
          <div className="container">
            <div className="loading-container" aria-live="polite">
              <div className="spinner"></div>
              <p>Loading amazing movies...</p>
              <p className="loading-subtitle">Please wait while we fetch the latest content</p>
            </div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </>
    );
  }

  if (error && movies.length === 0) {
    return (
      <>
        {useSEO({
          title: "Hashye - Error Loading Movies",
          description: "Oops! Something went wrong while loading movies on Hashye.",
          image: "/hashye-preview.png",
          url: "https://hashye.online/",
        })}
        <div className="home-page">
          <div className="container">
            <div className="error-container" aria-live="assertive">
              <div className="error-icon" role="img" aria-label="Error">⚠️</div>
              <h2>Oops! Something went wrong</h2>
              <p>{error}</p>
              <div className="error-actions">
                <button onClick={fetchMovies} className="retry-btn">🔄 Try Again</button>
                <button onClick={() => window.location.reload()} className="retry-btn secondary">
                  🔄 Refresh Page
                </button>
              </div>
            </div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </>
    );
  }

  return (
    <>
      {useSEO({
        title: "Hashye - Stream Movies & Shows in HD",
        description: "Discover and stream the latest movies and shows in HD on Hashye.",
        image: "/hashye-preview.png",
        url: "https://hashye.online/",
      })}
      <div className="home-page">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="container" id="featured">
          <FeaturedHero movies={movies} />
        </div>

        <div className="container">
          {/* Search Results */}
          {searchTerm.trim() && filteredMovies.length > 0 && (
            <div className="movies-section" id="search-results">
              <div className="section-header">
                <h2 className="section-title">Search Results for "{searchTerm}"</h2>
                <div className="section-subtitle">Movies matching your search</div>
              </div>
              <InfiniteScroll
                dataLength={Math.min(visibleCount, filteredMovies.length)}
                next={loadMoreMovies}
                hasMore={visibleCount < filteredMovies.length}
                loader={<p className="loading-text">Loading more movies...</p>}
              >
                <div className="movies-grid compact-grid">
                  {filteredMovies.slice(0, visibleCount).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} loading="lazy" />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          )}

          {/* Popular Now */}
          <div className="movies-section" id="popular">
            <div className="section-header">
              <h2 className="section-title">Popular Now</h2>
              <div className="section-subtitle">Hand-picked highlights</div>
            </div>
            <div className="movies-grid compact-grid">
              {popularNow.map((movie) => (
                <MovieCard key={`popular-${movie.id}`} movie={movie} loading="lazy" />
              ))}
            </div>
          </div>

          {/* Recent Releases */}
          <div className="movies-section" id="recent">
            <div className="section-header">
              <h2 className="section-title">Recent Releases</h2>
              <div className="section-subtitle">Fresh additions across genres</div>
            </div>
            <div className="movies-grid compact-grid">
              {recentReleases.map((movie) => (
                <MovieCard key={`recent-${movie.id}`} movie={movie} loading="lazy" />
              ))}
            </div>
          </div>

          {/* All Movies */}
          {!searchTerm.trim() && allMovies.length > 0 && (
            <div className="movies-section" id="all-movies">
              <div className="section-header">
                <h2 className="section-title">All Movies & Series</h2>
                <div className="section-subtitle">Browse our complete collection</div>
              </div>
              <InfiniteScroll
                dataLength={Math.min(visibleCount, allMovies.length)}
                next={loadMoreMovies}
                hasMore={visibleCount < allMovies.length}
                loader={<p className="loading-text">Loading more movies...</p>}
              >
                <div className="movies-grid compact-grid">
                  {allMovies.slice(0, visibleCount).map((movie) => (
                    <MovieCard key={`all-${movie.id}`} movie={movie} loading="lazy" />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          )}

          {/* No results */}
          {!searchTerm.trim() && allMovies.length === 0 && (
            <div className="no-results" aria-live="polite">
              <div className="no-results-icon" role="img" aria-label="No Results">🎭</div>
              <h3>No movies found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;


