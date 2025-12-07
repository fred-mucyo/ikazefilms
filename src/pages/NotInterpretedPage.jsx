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
        title: 'Not Interpreted - IkazeFilms',
        description:
          'Browse movies and seasons that are marked as not interpreted on IkazeFilms.',
        image: '/ikazefilms-preview.png',
        url: 'https://ikazefilms.online/not-interpreted',
      })}
      <div className="home-page">
        <div className="container">
          <div className="movies-section">
            <div className="section-header">
              {/* <h2 className="section-title">Not Interpreted</h2>
              <div className="section-subtitle">
                Switch between seasons and movies that are marked as not interpreted
              </div> */}
            </div>

            {/* FILTER COMMENTED OUT FOR THIS MOMENT */}

            {/* <div style={{ marginBottom: 16 }}>
              <label htmlFor="not-interpreted-filter" style={{ marginRight: 8 }}>
                Filter:
              </label>
              <select
                id="not-interpreted-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="select-input"
              >
                <option value="all">All</option>
                <option value="series">Seasons</option>
                <option value="movies">Movies</option>
              </select>
            </div> */}
          </div>

          {showMovies.length > 0 && (
            <div className="movies-section">
              <div className="section-header">
                <h2 className="section-title">Movies</h2>
              </div>

              <div className="movies-grid compact-grid">
                {showMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}

          {showSeries.length > 0 && (
            <div className="movies-section">
              <div className="section-header">
                <h2 className="section-title">Seasons</h2>
              </div>
              <div className="movies-grid compact-grid">
                {showSeries.map((s) => (
                  <MovieCard key={s.id} movie={s} />
                ))}
              </div>
            </div>
          )}

          {hasAnyContent === false && (
            <div className="movies-section">
              <div className="no-results" aria-live="polite">
                <h3> No movies or seasons here yet</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotInterpretedPage;
