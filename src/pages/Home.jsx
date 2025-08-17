import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../utils/api'
import MovieCard from '../components/MovieCard'
import FeaturedHero from '../components/FeaturedHero'
import './Home.css'

const Home = () => {
  const location = useLocation()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])
  const popularNow = useMemo(() => {
    const popular = movies.filter(m => m.is_popular)
    return (popular.length ? popular : movies).slice(0, 6)
  }, [movies])
  const recentReleases = useMemo(() => movies.slice(0, 4), [movies])

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    // Check for search parameter in URL
    const params = new URLSearchParams(location.search)
    const searchParam = params.get('search')
    if (searchParam) {
      setSearchTerm(searchParam)
    }
  }, [location.search])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMovies(movies)
    } else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (movie.interpreter_name && movie.interpreter_name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredMovies(filtered)
    }
  }, [searchTerm, movies])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)

      
      const data = await api.getMovies()

      
      setMovies(data)
      setFilteredMovies(data)
      setError(null)
    } catch (err) {
      // Provide user-friendly error messages
      let errorMessage = 'Failed to load movies. Please try again later.'
      
      if (err.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your internet connection and try again.'
      } else if (err.message.includes('Unable to connect')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.'
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }



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
      </div>
    )
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
              <button onClick={fetchMovies} className="retry-btn">
                🔄 Try Again
              </button>
              <button onClick={() => window.location.reload()} className="retry-btn secondary">
                🔄 Refresh Page
              </button>
            </div>
            <div className="error-help">
              <p><strong>Still having issues?</strong></p>
              <ul>
                <li>Check your internet connection</li>
                <li>Try refreshing the page</li>
                <li>Contact support if the problem persists</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Featured Hero with inline trailer embed */}
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
             {popularNow.length > 0 ? (
               popularNow.map((movie) => (
                 <MovieCard key={`popular-${movie.id}`} movie={movie} />
               ))
             ) : (
               <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'white' }}>
                 <p>No popular movies found</p>
               </div>
             )}
           </div>
         </div>

                 {/* Recent Releases */}
         <div className="movies-section" id="recent">
           <div className="section-header">
             <h2 className="section-title">Recent Releases</h2>
             <div className="section-subtitle">Fresh additions across genres</div>
           </div>
           <div className="movies-grid compact-grid">
             {recentReleases.length > 0 ? (
               recentReleases.map((movie) => (
                 <MovieCard key={`recent-${movie.id}`} movie={movie} />
               ))
             ) : (
               <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'white' }}>
                 <p>No recent movies found</p>
               </div>
             )}
           </div>
         </div>

                 {/* All Movies */}
         <div className="movies-section" id="all-movies">
           <div className="section-header">
             <h2 className="section-title">All Movies</h2>
             <div className="section-subtitle">Browse our complete collection</div>
             <div className="trailer-highlight">
               <span className="trailer-icon">🎬</span>
               <span>Click any thumbnail to watch trailers!</span>
             </div>
           </div>
           
           {filteredMovies.length > 0 ? (
             <div className="movies-grid compact-grid">
               {filteredMovies.map((movie) => (
                 <MovieCard key={`all-${movie.id}`} movie={movie} />
               ))}
             </div>
           ) : (
             <div className="no-results">
               <div className="no-results-icon">🎭</div>
               <h3>No movies found</h3>
               <p>Try adjusting your search terms or browse all movies</p>
               <button onClick={() => setSearchTerm('')} className="browse-all-btn">
                 Browse All Movies
               </button>
             </div>
           )}
         </div>

         {/* Search Results (if any) */}
         {searchTerm && (
           <div className="movies-section">
             <div className="section-header">
               <h2 className="section-title">Search Results</h2>
               <div className="trailer-highlight">
                 <span className="trailer-icon">🎬</span>
                 <span>Click any thumbnail to watch trailers!</span>
               </div>
             </div>

             {filteredMovies.length > 0 ? (
               <div className="movies-grid compact-grid">
                 {filteredMovies.map((movie) => (
                   <MovieCard key={`search-${movie.id}`} movie={movie} />
                 ))}
               </div>
             ) : (
               <div className="no-results">
                 <div className="no-results-icon">🎭</div>
                 <h3>No movies found</h3>
                 <p>Try adjusting your search terms or browse all movies</p>
                 <button onClick={() => setSearchTerm('')} className="browse-all-btn">
                   Browse All Movies
                 </button>
               </div>
             )}
           </div>
         )}
      </div>
    </div>
  )
}

export default Home
