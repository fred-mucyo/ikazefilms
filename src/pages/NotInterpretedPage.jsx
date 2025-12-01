import React, { useState, useMemo } from 'react';
import staticSeries from '../utils/staticSeries';
import staticMovies from '../utils/staticMovies';
import MovieCard from '../components/MovieCard';
import useSEO from '../hooks/useSeo.jsx';
import './Home.css';
import './SeriesPage.css';

const NotInterpretedPage = () => {
  const [filter, setFilter] = useState('all'); // 'all' | 'series' | 'movies'

  const notInterpretedSeries = useMemo(
    () => staticSeries.filter((s) => s.is_not_interpreted),
    [],
  );

  const notInterpretedMovies = useMemo(
    () => staticMovies.filter((m) => m.is_not_interpreted),
    [],
  );

  const showSeries =
    filter === 'all' || filter === 'series' ? notInterpretedSeries : [];
  const showMovies =
    filter === 'all' || filter === 'movies' ? notInterpretedMovies : [];

  const hasAnyContent =
    notInterpretedSeries.length > 0 || notInterpretedMovies.length > 0;

  return (
    <>
      {useSEO({
        title: 'Not Interpreted - Hashye',
        description:
          'Browse movies and seasons that are marked as not interpreted on Hashye.',
        image: '/hashye-preview.png',
        url: 'https://hashye.online/not-interpreted',
      })}
      <div className="home-page">
        <div className="container">
          <div className="movies-section">
            <div className="section-header">
              <h2 className="section-title">Not Interpreted</h2>
              <div className="section-subtitle">
                Switch between seasons and movies that are marked as not interpreted
              </div>
            </div>

            <div className="filter-tabs" style={{ marginBottom: 16 }}>
              <button
                className={`btn ${
                  filter === 'all' ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`btn ${
                  filter === 'series' ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={() => setFilter('series')}
                style={{ marginLeft: 8 }}
              >
                Seasons
              </button>
              <button
                className={`btn ${
                  filter === 'movies' ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={() => setFilter('movies')}
                style={{ marginLeft: 8 }}
              >
                Movies
              </button>
            </div>
          </div>

          {showSeries.length > 0 && (
            <div className="movies-section">
              <div className="section-header">
                <h2 className="section-title">Not Interpreted Seasons</h2>
              </div>
              <div className="movies-grid compact-grid">
                {showSeries.map((s) => (
                  <MovieCard key={s.id} movie={s} />
                ))}
              </div>
            </div>
          )}

          {showMovies.length > 0 && (
            <div className="movies-section">
              <div className="section-header">
                <h2 className="section-title">Not Interpreted Movies</h2>
              </div>

              <div className="movies-grid compact-grid">
                {showMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}

          {hasAnyContent === false && (
            <div className="movies-section">
              <div className="no-results" aria-live="polite">
                <h3>No not interpreted movies or seasons yet</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotInterpretedPage;
