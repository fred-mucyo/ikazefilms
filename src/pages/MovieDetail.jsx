import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { api, formatDate } from '../utils/api';
import TrailerEmbed from '../components/TrailerEmbed';
import Comments from '../components/Comments';
import useSEO from '../hooks/useSeo.jsx';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(false);
  const [popular, setPopular] = useState([]);


  // Scroll to trailer section when component mounts
    useEffect(() => {
      const timer = setTimeout(() => {
        const trailerSection = document.querySelector('.trailer-section');
        if (trailerSection) {
          trailerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure DOM is ready
  
      return () => clearTimeout(timer);
    }, [id]);


  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const data = await api.getMovie(id);
      setMovie(data);
      const all = await api.getMovies();
      const popularList = all.filter((m) => m.is_popular).slice(0, 6);
      setPopular(popularList.length ? popularList : all.slice(0, 6));
      setError(null);
    } catch (err) {
      setError('Movie not found or failed to load.');
      console.error('Error fetching movie:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsWatchlistLoading(true);
    try {
      if (isInWatchlist(movie.id)) {
        await removeFromWatchlist(movie.id);
      } else {
        await addToWatchlist(movie.id);
      }
    } catch (error) {
      console.error('Watchlist operation failed:', error);
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  const openExternal = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const defaultThumbnail = 'https://imgur.com/a/0ajDIYU';
  const getThumbnail = (m) =>
    m.thumbnail_url || m.poster_url || m.image_url || defaultThumbnail;

  if (loading) {
    return (
      <>
        {useSEO({
          title: 'Hashye - Loading Movie...',
          description: 'Fetching movie details on Hashye...',
          image: '/hashye-preview.png',
          url: `https://hashye.online/movie/${id}`,
        })}
        <div className="movie-detail-page">
          <div className="container">
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading movie details...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        {useSEO({
          title: ' Hashye - Movie Not Found',
          description: 'The movie could not be found on Hashye.',
          image: '/hashye-preview.png',
          url: 'https://hashye.online/',
        })}
        <div className="movie-detail-page">
          <div className="container">
            <div className="error-container">
              <h2>Movie Not Found</h2>
              <p>{error || 'The movie you are looking for does not exist.'}</p>
              <button
                onClick={() => navigate('/', { replace: true })}
                className="btn btn-primary"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {useSEO({
        title: `${movie.title} - Watch on Hashye.online`,
        description: movie.description || 'Stream movies on Hashye in HD.',
        image: movie.thumbnail_url || '/hashye-preview.png',
        url: `https://hashye.online/movie/${movie.id}`,
      })}
      <div className="movie-detail-page">
        <div className="container">
          <div className="movie-detail-container">
            <button
              onClick={() => navigate('/', { replace: true })}
              className="back-button"
            >
              ← Back to Movies
            </button>

            <div className="movie-detail-content">
              <div className="movie-info">
                <h1 className="movie-title">{movie.title}</h1>
                {movie.description && (
                  <p className="movie-description">{movie.description}</p>
                )}

                {movie.youtube_trailer_url && (
                  <div className="trailer-section">
                    <h3>🎬 Watch Movie</h3>
                    <TrailerEmbed
                      youtubeUrl={movie.youtube_trailer_url}
                      thumbnailUrl={getThumbnail(movie)}
                      title={movie.title}
                    />
                  </div>
                )}

                <div className="movie-actions">
                  {movie.video_url && (
                    <>
                      <button
                        onClick={() => openExternal(movie.video_url)}
                        className="btn btn-primary watch-btn"
                      >
                        REBA FILM YOSE
                      </button>
                      <a
                        href={movie.download_url || movie.video_url}
                        download
                        className="btn btn-secondary download-btn"
                      >
                        ⬇️ Download
                      </a>
                    </>

                    // btn btn-secondary download-btn
                  )}
                  {isAuthenticated && (
                    <button
                      onClick={handleWatchlistToggle}
                      disabled={isWatchlistLoading}
                      className={`btn ${isInWatchlist(movie.id) ? 'btn-danger' : 'btn-secondary'}`}
                    >
                      {isWatchlistLoading ? (
                        <span className="spinner spinner-sm"></span>
                      ) : isInWatchlist(movie.id) ? (
                        '❌ Remove'
                      ) : (
                        '➕ Add to List'
                      )}
                    </button>
                  )}
                </div>

                <div className="movie-details">
                  {movie.interpreter_name && (
                    <div className="detail-item">
                      <strong>Interpreter:</strong> {movie.interpreter_name}
                    </div>
                  )}
                  {movie.created_at && (
                    <div className="detail-item">
                      <strong>Added:</strong> {formatDate(movie.created_at)}
                    </div>
                  )}
                  {(movie.is_popular || movie.is_featured) && (
                    <div className="detail-item badge-item">
                      <strong>Status:</strong>
                      <span className="status-badge">
                        {movie.is_popular ? '🔥 Popular' : '⭐ Featured'}
                      </span>
                    </div>
                  )}
                </div>

                <Comments movieId={movie.id} />
              </div>

              <aside className="right-panel">
                <h3 className="right-panel-title">🔥 Popular Now</h3>
                <div className="thumb-strip">
                  {popular.map((p) => (
                    <button
                      key={p.id}
                      className="thumb-card"
                      onClick={() => {
                        // Clear search when navigating to another movie detail
                        navigate('/', { replace: true });
                        setTimeout(() => {
                          navigate(`/movie/${p.id}`);
                        }, 0);
                      }}
                      title={p.title}
                    >
                      <img
                        src={p.thumbnail_url || defaultThumbnail}
                        alt={p.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = defaultThumbnail;
                        }}
                      />
                      <div className="thumb-info">
                        <span className="thumb-title">{p.title}</span>
                        {p.is_popular && (
                          <span className="thumb-badge">🔥</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
