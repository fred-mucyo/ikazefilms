import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import MovieCard from '../components/MovieCard';
import FeaturedHero from '../components/FeaturedHero';
import './Home.css';
import { Toaster, toast } from 'react-hot-toast';
import debounce from 'lodash.debounce';
import useSEO from '../hooks/useSeo.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import staticMovies from '../utils/staticMovies';
import staticSeries from '../utils/staticSeries';

const MOVIES_PER_LOAD = 12;

// Exclude not-interpreted items from Home; they are shown only on /not-interpreted
const homeStaticMovies = staticMovies.filter((m) => !m.is_not_interpreted);
const homeStaticSeries = staticSeries.filter((s) => !s.is_not_interpreted);
const searchExtraStatic = [
  ...staticMovies.filter((m) => m.is_not_interpreted),
  ...staticSeries.filter((s) => s.is_not_interpreted),
];

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([
    ...homeStaticMovies,
    ...homeStaticSeries,
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([
    ...homeStaticMovies,
    ...homeStaticSeries,
  ]);
  const [visibleCount, setVisibleCount] = useState(MOVIES_PER_LOAD);

  const searchPool = useMemo(() => {
    const byId = new Map();
    [...movies, ...searchExtraStatic].forEach((m) => {
      if (m && m.id) byId.set(m.id, m);
    });
    return Array.from(byId.values());
  }, [movies]);

  const searchTerm = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  }, [location.search]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getMovies();
      const backendMoviesForHome = data.filter((m) => !m.is_not_interpreted);
      setMovies([...backendMoviesForHome, ...homeStaticSeries]);
      setFilteredMovies([...backendMoviesForHome, ...homeStaticSeries]);
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
          setFilteredMovies(searchPool);
        } else {
          const filtered = searchPool.filter(
            (movie) =>
              movie?.title?.toLowerCase().includes(term.toLowerCase()) ||
              movie?.interpreter_name
                ?.toLowerCase()
                .includes(term.toLowerCase()),
          );
          setFilteredMovies(filtered);
        }
        setVisibleCount(MOVIES_PER_LOAD);
      }, 300),
    [searchPool],
  );

  useEffect(() => {
    filterMovies(searchTerm);
    return () => filterMovies.cancel();
  }, [searchTerm, filterMovies]);

  const popularNow = useMemo(() => {
    return [...movies]
      .filter((m) => m.is_popular)
      .sort((a, b) => {
        if (a.type === 'series' && b.type !== 'series') return -1;
        if (a.type !== 'series' && b.type === 'series') return 1;
        return 0;
      })
      .slice(0, 20);
  }, [movies]);

  const recentReleases = useMemo(() => {
    return [...movies]
      .filter((m) => m?.created_at)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 12);
  }, [movies]);

  const allMovies = useMemo(() => {
    const excludedIds = new Set(
      [...popularNow, ...recentReleases].map((m) => m.id),
    );
    return filteredMovies.filter((m) => !excludedIds.has(m.id));
  }, [filteredMovies, popularNow, recentReleases]);

  const loadMoreMovies = () =>
    setVisibleCount((prev) => prev + MOVIES_PER_LOAD);

  if (loading && movies.length === 0) {
    return (
      <>
        {useSEO({
          title: 'IkazeFilms - Stream Movies & Shows in HD',
          description:
            'Discover and stream the latest movies and shows in HD on IkazeFilms.',
          image: '/ikazefilms-preview.png',
          url: 'https://ikazefilms.online/',
        })}
        <div className="home-page">
          <div className="container">
            <div className="loading-container" aria-live="polite">
              <div className="spinner"></div>
              <p>Loading amazing movies...</p>
              <p className="loading-subtitle">
                Please wait while we fetch the latest content
              </p>
            </div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>

        {/* ✅ Floating WhatsApp Button */}
        <a
          href="https://whatsapp.com/channel/0029Vb62TIr7tkj7u17XUa3v"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
          <span className="tooltip">Join us</span>
        </a>
      </>
    );
  }

  if (error && movies.length === 0) {
    return (
      <>
        {useSEO({
          title: 'IkazeFilms - Error Loading Movies',
          description:
            'Oops! Something went wrong while loading movies on IkazeFilms.',
          image: '/ikazefilms-preview.png',
          url: 'https://ikazefilms.online/',
        })}
        <div className="home-page">
          <div className="container">
            <div className="error-container" aria-live="assertive">
              <div className="error-icon" role="img" aria-label="Error">
                ⚠️
              </div>
              <h2>Oops! Something went wrong</h2>
              <p>{error}</p>
              <div className="error-actions">
                <button onClick={fetchMovies} className="retry-btn">
                  🔄 Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="retry-btn secondary"
                >
                  🔄 Refresh Page
                </button>
              </div>
            </div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>

        {/* ✅ Floating WhatsApp Button */}
        <a
          href="https://whatsapp.com/channel/0029Vb62TIr7tkj7u17XUa3v"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
          <span className="tooltip">Join us</span>
        </a>
      </>
    );
  }

  return (
    <>
      {useSEO({
        title: 'IkazeFilms - Stream Movies & Shows in HD',
        description:
          'Discover and stream the latest movies and shows in HD on IkazeFilms.',
        image: '/ikazefilms-preview.png',
        url: 'https://ikazefilms.online/',
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
                <h2 className="section-title">
                  Search Results for "{searchTerm}"
                </h2>
                <div className="section-subtitle">
                  Movies matching your search
                </div>
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

          <div className="movies-section" id="recent">
            <div className="section-header">
              <h2 className="section-title">Recent Releases</h2>
              <div className="section-subtitle">
                Movie nshya kuri IkazeFilms
              </div>
            </div>
            <div className="horizontal-scroll">
              {recentReleases.map((movie) => (
                <MovieCard
                  key={`recent-${movie.id}`}
                  movie={movie}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div className="movies-section" id="popular">
            <div className="section-header">
              <h2 className="section-title">Popular</h2>
              <div className="section-subtitle">Movie zigezweho</div>
            </div>
            <div className="horizontal-scroll">
              {popularNow.map((movie) => (
                <MovieCard
                  key={`popular-${movie.id}`}
                  movie={movie}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchTerm.trim() && filteredMovies.length > 0 && (
            <div className="movies-section" id="search-results">
              <div className="section-header">
                <h2 className="section-title">
                  Search Results for "{searchTerm}"
                </h2>
                <div className="section-subtitle">
                  Movies matching your search
                </div>
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

          {/* No search results */}
          {searchTerm.trim() && filteredMovies.length === 0 && (
            <div className="no-results" id="search-results" aria-live="polite">
              <div
                className="no-results-icon"
                role="img"
                aria-label="No Results"
              >
                🎬
              </div>
              <h3>No movies found for "{searchTerm}"</h3>
              <p>
                {' '}
                Reba niba wanditse neza izina cg{' '}
                <a
                  href="https://chat.whatsapp.com/JEJeboBdJ0c4D6vD6Qz1oA?mode=ems_copy_t"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Utuvugishe kuri WhatsApp
                </a>
              </p>
            </div>
          )}

          {/* All Movies */}
          {!searchTerm.trim() && allMovies.length > 0 && (
            <div className="movies-section" id="all-movies">
              <div className="section-header">
                <h2 className="section-title">All Movies & Series</h2>
                <div className="section-subtitle">
                  Browse our complete collection
                </div>
              </div>
              <InfiniteScroll
                dataLength={Math.min(visibleCount, allMovies.length)}
                next={loadMoreMovies}
                hasMore={visibleCount < allMovies.length}
                loader={<p className="loading-text">Loading more movies...</p>}
              >
                <div className="movies-grid compact-grid">
                  {allMovies.slice(0, visibleCount).map((movie) => (
                    <MovieCard
                      key={`all-${movie.id}`}
                      movie={movie}
                      loading="lazy"
                    />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          )}
          {/* No results */}
          {!searchTerm.trim() && allMovies.length === 0 && (
            <div className="no-results" aria-live="polite">
              <div
                className="no-results-icon"
                role="img"
                aria-label="No Results"
              >
                🎭
              </div>
              <h3>No movies found</h3>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://whatsapp.com/channel/0029Vb62TIr7tkj7u17XUa3v"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
        <span className="tooltip">Join us</span>
      </a>
    </>
  );
};

export default Home;
