import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { useAuth } from '../context/AuthContext'
import { truncateText } from '../utils/api'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  


  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      // Show login prompt or redirect to login
      return
    }

    setIsLoading(true)
    try {
      if (isInWatchlist(movie.id)) {
        await removeFromWatchlist(movie.id)
      } else {
        await addToWatchlist(movie.id)
      }
    } catch (error) {
      // Watchlist operation failed
    } finally {
      setIsLoading(false)
    }
  }

  const handleThumbnailClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const defaultThumbnail = 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Movie'
  
  // Try multiple possible thumbnail field names
  const getThumbnailUrl = () => {
    const thumbnail = movie.thumbnail_url || 
                     movie.poster_url || 
                     movie.image_url || 
                     movie.cover_url || 
                     movie.thumbnail || 
                     movie.poster || 
                     movie.image
    
    // If we have a valid thumbnail, return it, otherwise use default
    return thumbnail && thumbnail !== 'undefined' && thumbnail !== 'null' && thumbnail.trim() !== '' ? thumbnail : defaultThumbnail
  }

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img 
          src={getThumbnailUrl()} 
          alt={movie.title}
          onClick={handleThumbnailClick}
          className="clickable-thumbnail"
          onError={(e) => {
            e.target.src = defaultThumbnail
          }}
        />
        

 
        {/* Movie Card Overlay with Actions*/ }
        <div className="movie-card-overlay">
          <div className="movie-card-actions">

            
                    {/* Trailer or Details Button */}
             <Link to={`/movie/${movie.id}`} className="btn btn-primary watch-full-btn">
              Watch Movie
             </Link>
            
            {/* Watchlist Button */}
            {isAuthenticated && (
              <button
                onClick={handleWatchlistToggle}
                disabled={isLoading}
                className={`btn ${isInWatchlist(movie.id) ? 'btn-danger' : 'btn-success'}`}
              >
                {isLoading ? (
                  <span className="spinner spinner-sm"></span>
                ) : isInWatchlist(movie.id) ? (
                  '❌ Remove'
                ) : (
                  'Add to Watchlist'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Popular/Featured Badge */}
        {(movie.is_popular || movie.is_featured) && (
          <div className="movie-badge">
            {movie.is_popular ? '🔥 Popular' : '⭐ Featured'}
          </div>
        )}
        

      </div>
      
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        {movie.description && (
          <p className="movie-card-description">
            {truncateText(movie.description, 100)}
          </p>
        )}
        {movie.interpreter_name && (
          <p className="movie-card-interpreter">
            <strong>Interpreter:</strong> {movie.interpreter_name}
          </p>
        )}
        {movie.created_at && (
          <p className="movie-card-date">
            <strong>Added:</strong> {new Date(movie.created_at).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default MovieCard
