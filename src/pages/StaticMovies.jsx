import React from 'react'
import staticMovies from '../utils/staticMovies'
import TrailerEmbed from '../components/TrailerEmbed'
import useSEO from "../hooks/useSeo.jsx"
import MovieCard from '../components/MovieCard'
import './Home.css'

const StaticMovies = () => {
  return (
    <>
      {useSEO({
        title: 'Static Movies - Hashye',
        description: 'Watch trailers instantly from our on-site static collection while the server wakes up.',
        image: '/hashye-preview.png',
        url: 'https://hashye.online/static-movie',
      })}
      <div className="home-page">
        <div className="container">
          <div className="movies-section" id="static-collection">
            <div className="section-header">
              <h2 className="section-title">Instant Trailers</h2>
              <div className="section-subtitle">Play trailers without leaving the page</div>
            </div>

            <div className="movies-grid compact-grid">
              {staticMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="movie-card-image">
                    <TrailerEmbed
                      youtubeUrl={movie.youtube_trailer_url}
                      thumbnailUrl={movie.thumbnail_url || movie.poster_url || movie.image_url}
                      title={movie.title}
                    />
                  </div>
                  <div className="movie-card-content">
                    <h3 className="movie-card-title">{movie.title}</h3>
                    {movie.description && (
                      <p className="movie-card-description">{movie.description}</p>
                    )}
                    <div className="movie-card-actions" style={{ marginTop: 8 }}>
                      {movie.video_url && (
                        <a href={movie.video_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                         REBA FILM YOSE 
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default StaticMovies


