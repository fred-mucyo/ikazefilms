import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { useAuth } from '../context/AuthContext';
import { truncateText } from '../utils/api';
import { Play } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      if (isInWatchlist(movie.id)) {
        await removeFromWatchlist(movie.id);
      } else {
        await addToWatchlist(movie.id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigationWithSearchClear = (path) => {
    navigate('/', { replace: true });
    setTimeout(() => {
      navigate(path);
    }, 0);
  };

  const handleThumbnailClick = () => {
    if (movie.type === 'series') {
      handleNavigationWithSearchClear(`/series/${movie.id}`); // ✅ Series route
      return;
    }
    if (String(movie.id).startsWith('s')) {
      handleNavigationWithSearchClear(`/static-movie/${movie.id}`);
      return;
    }
    handleNavigationWithSearchClear(`/movie/${movie.id}`);
  };

  const defaultThumbnail = 'https://imgur.com/a/0ajDIYU';

  const getThumbnailUrl = () => {
    const thumbnail =
      movie.thumbnail_url ||
      movie.poster_url ||
      movie.image_url ||
      movie.cover_url ||
      movie.thumbnail ||
      movie.poster ||
      movie.image;
    return thumbnail &&
      thumbnail !== 'undefined' &&
      thumbnail !== 'null' &&
      thumbnail.trim() !== ''
      ? thumbnail
      : defaultThumbnail;
  };

  const getWebpThumbnail = () => {
    const url = getThumbnailUrl();
    if (url === defaultThumbnail) return url;
    if (url.startsWith('/')) return url;
    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  return (
    <div className="movie-card">
      <div
        className="movie-card-image"
        onClick={handleThumbnailClick}
        style={{ cursor: 'pointer' }}
      >
        <picture>
          {/* <source srcSet={getWebpThumbnail()} type="image/webp" /> */}
          <source srcSet={`${getWebpThumbnail()} 1x`} type="image/webp" />

          <img
            src={getThumbnailUrl()}
            alt={movie.title}
            className="clickable-thumbnail"
            loading="lazy"
            onError={(e) => {
              e.target.src = defaultThumbnail;
            }}
          />
        </picture>

        <div className="movie-card-overlay">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering parent click twice
              handleNavigationWithSearchClear(
                movie.type === 'series'
                  ? `/series/${movie.id}`
                  : String(movie.id).startsWith('s')
                    ? `/static-movie/${movie.id}`
                    : `/movie/${movie.id}`,
              );
            }}
            className="play-btn"
            aria-label="Play"
          >
            <Play size={20} strokeWidth={2.5} />
          </button>
        </div>

        {(movie.is_popular || movie.is_featured) && (
          <div className="movie-badge">
            {movie.is_popular ? '🔥 Popular' : '⭐ Featured'}
          </div>
        )}
      </div>

      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        {/* {movie.description && (
          <p className="movie-card-description">
            {truncateText(movie.description, 100)}
          </p>
        )} */}
        {movie.interpreter_name && (
          <p className="movie-card-interpreter">
            <strong>Interpreter:</strong> {movie.interpreter_name}
          </p>
        )}
        {/* {movie.created_at && (
  <p className="movie-card-date">
    <strong>Added:</strong>{' '}
    {(() => {
      const now = new Date();
      const uploadedDate = new Date(movie.created_at);
      const diffMs = now - uploadedDate;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      }
    })()}
  </p>
)} */}
      </div>
    </div>
  );
};

export default MovieCard;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useWatchlist } from '../context/WatchlistContext';
// import { useAuth } from '../context/AuthContext';
// import { Play } from 'lucide-react';
// import './MovieCard.css';

// const MovieCard = ({ movie }) => {
//   const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
//   const { isAuthenticated } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleWatchlistToggle = async () => {
//     if (!isAuthenticated) return;
//     setIsLoading(true);
//     try {
//       if (isInWatchlist(movie.id)) {
//         await removeFromWatchlist(movie.id);
//       } else {
//         await addToWatchlist(movie.id);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNavigationWithSearchClear = (path) => {
//     navigate('/', { replace: true });
//     setTimeout(() => {
//       navigate(path);
//     }, 0);
//   };

//   const handleThumbnailClick = () => {
//     if (movie.type === 'series') {
//       handleNavigationWithSearchClear(`/series/${movie.id}`);
//       return;
//     }
//     if (String(movie.id).startsWith('s')) {
//       handleNavigationWithSearchClear(`/static-movie/${movie.id}`);
//       return;
//     }
//     handleNavigationWithSearchClear(`/movie/${movie.id}`);
//   };

//   const defaultThumbnail = import.meta.env.BASE_URL + 'images/default-thumbnail.png';

//   const getThumbnailUrl = () => {
//     const thumbnail =
//       movie.thumbnail_url ||
//       movie.poster_url ||
//       movie.image_url ||
//       movie.cover_url ||
//       movie.thumbnail ||
//       movie.poster ||
//       movie.image;

//     if (!thumbnail || thumbnail === 'undefined' || thumbnail === 'null' || thumbnail.trim() === '') {
//       return defaultThumbnail;
//     }

//     // Prepend BASE_URL if relative path
//     if (thumbnail.startsWith('/')) {
//       return import.meta.env.BASE_URL + thumbnail.replace(/^\/+/, '');
//     }

//     return thumbnail;
//   };

//   const getWebpThumbnail = () => {
//     const url = getThumbnailUrl();
//     // Skip conversion if default or relative path
//     if (url === defaultThumbnail || url.startsWith(import.meta.env.BASE_URL)) return url;
//     return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
//   };

//   return (
//     <div className="movie-card">
//       <div
//         className="movie-card-image"
//         onClick={handleThumbnailClick}
//         style={{ cursor: 'pointer' }}
//       >
//         <picture>
//           <source srcSet={`${getWebpThumbnail()} 1x`} type="image/webp" />
//           <img
//             src={getThumbnailUrl()}
//             alt={movie.title}
//             className="clickable-thumbnail"
//             loading="lazy"
//             onError={(e) => {
//               e.target.src = defaultThumbnail;
//             }}
//           />
//         </picture>

//         <div className="movie-card-overlay">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleNavigationWithSearchClear(
//                 movie.type === 'series'
//                   ? `/series/${movie.id}`
//                   : String(movie.id).startsWith('s')
//                     ? `/static-movie/${movie.id}`
//                     : `/movie/${movie.id}`
//               );
//             }}
//             className="play-btn"
//             aria-label="Play"
//           >
//             <Play size={20} strokeWidth={2.5} />
//           </button>
//         </div>

//         {(movie.is_popular || movie.is_featured) && (
//           <div className="movie-badge">
//             {movie.is_popular ? '🔥 Popular' : '⭐ Featured'}
//           </div>
//         )}
//       </div>

//       <div className="movie-card-content">
//         <h3 className="movie-card-title">{movie.title}</h3>
//         {movie.interpreter_name && (
//           <p className="movie-card-interpreter">
//             <strong>Interpreter:</strong> {movie.interpreter_name}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieCard;
