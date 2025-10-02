import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import staticMovies from '../utils/staticMovies';
import TrailerEmbed from '../components/TrailerEmbed';
import Comments from '../components/Comments';
import { truncateText, formatDate } from '../utils/api';
import useSEO from '../hooks/useSeo.jsx';
import './MovieDetail.css';

const StaticMovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = useMemo(
    () => staticMovies.find((m) => String(m.id) === String(id)) || null,
    [id],
  );

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

  if (!movie) {
    return (
      <div className="movie-detail-page container">
        <h2>Movie not found</h2>
        <button
          onClick={() => navigate('/', { replace: true })}
          className="btn"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const poster =
    movie.thumbnail_url ||
    movie.poster_url ||
    movie.image_url ||
    movie.cover_url;
  const year = movie.created_at ? new Date(movie.created_at).getFullYear() : '';

  return (
    <>
      {useSEO({
        title: `${movie.title} - Hashye`,
        description: truncateText(
          movie.description || 'Watch now on Hashye',
          150,
        ),
        image: poster || '/hashye-preview.png',
        url: `https://hashye.online/static-movie/${movie.id}`,
      })}
      <div className="movie-detail-page">
        <div className="container">
          <div className="movie-detail-container">
            <div className="movie-detail-content">
              <div className="movie-info">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-description meta">
                  {year}
                  {movie.interpreter_name ? ` • ${movie.interpreter_name}` : ''}
                </p>
                {movie.description && (
                  <p className="movie-description">{movie.description}</p>
                )}

                {movie.youtube_trailer_url && (
                  <div className="trailer-section">
                    <h3>🎬 Watch Trailer</h3>
                    <TrailerEmbed
                      youtubeUrl={movie.youtube_trailer_url}
                      thumbnailUrl={poster || '/hashye-preview.png'}
                      title={movie.title}
                    />
                  </div>
                )}

                <div className="movie-actions">
                  {movie.video_url && (
                    <>
                      <a
                        href={movie.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        REBA FILM YOSE
                      </a>
                      <a
                        href={movie.download_url || movie.video_url}
                        download
                        className="btn btn-secondary"
                      >
                        ⬇️ Download
                      </a>
                    </>
                  )}
                </div>

                <div className="movie-details">
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
                  {(staticMovies.filter((m) => m.is_popular).slice(0, 6).length
                    ? staticMovies.filter((m) => m.is_popular).slice(0, 6)
                    : staticMovies.slice(0, 6)
                  ).map((p) => (
                    <button
                      key={p.id}
                      className="thumb-card"
                      onClick={() => {
                        // Clear search when navigating to another static movie detail
                        navigate('/', { replace: true });
                        setTimeout(() => {
                          navigate(`/static-movie/${p.id}`);
                        }, 0);
                      }}
                      title={p.title}
                    >
                      <img
                        src={
                          p.thumbnail_url ||
                          p.poster_url ||
                          p.image_url ||
                          '/hashye-preview.png'
                        }
                        alt={p.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/hashye-preview.png';
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

export default StaticMovieDetail;
