// src/pages/SeriesPage.jsx
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Toaster } from 'react-hot-toast';
import useSEO from '../hooks/useSeo.jsx';
import staticSeries from '../utils/staticSeries';
import MovieCard from '../components/MovieCard';
import './SeriesPage.css';

const SERIES_PER_LOAD = 12;

const SeriesPage = () => {
  const location = useLocation();
  const [series, setSeries] = useState(staticSeries);
  const [filteredSeries, setFilteredSeries] = useState(staticSeries);
  const [visibleCount, setVisibleCount] = useState(SERIES_PER_LOAD);

  // Extract search term from URL
  const searchTerm = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  }, [location.search]);

  // Filter series based on search term
  useMemo(() => {
    if (!searchTerm.trim()) {
      setFilteredSeries(series);
    } else {
      const filtered = series.filter((s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredSeries(filtered);
    }
    setVisibleCount(SERIES_PER_LOAD);
  }, [searchTerm, series]);

  // Popular Series
  const popularSeries = useMemo(() => {
    return series.filter((s) => s.is_popular);
  }, [series]);

  const loadMoreSeries = () =>
    setVisibleCount((prev) => prev + SERIES_PER_LOAD);

  return (
    <>
      {useSEO({
        title: 'Hashye - All Series',
        description:
          'Browse all series available on Hashye. Watch popular shows or explore new releases.',
        image: '/hashye-preview.png',
        url: 'https://hashye.online/series',
      })}
      <div className="series-page">
        <Toaster position="top-center" reverseOrder={false} />

        {/* Popular Series Section */}
        {/* {popularSeries.length > 0 && (
          <div className="movies-section">
            <div className="section-header">
              <h2 className="section-title">Popular Series</h2>
              <div className="section-subtitle">
                Trending shows on the platform
               </div> 
            </div>
            <div className="movies-grid compact-grid">
              {popularSeries.map((s) => (
                <MovieCard key={s.id} movie={s} />
              ))}
            </div>
          </div>
        )} */}

        {/* All Series Section */}
        <div className="movies-section">
          <div className="section-header">
            <h2 className="section-title">All Series</h2>
            {searchTerm && (
              <div className="section-subtitle">
                Search results for "{searchTerm}"
              </div>
            )}
          </div>
          <InfiniteScroll
            dataLength={Math.min(visibleCount, filteredSeries.length)}
            next={loadMoreSeries}
            hasMore={visibleCount < filteredSeries.length}
            loader={<p className="loading-text">Loading more series...</p>}
          >
            <div className="movies-grid compact-grid">
              {filteredSeries.slice(0, visibleCount).map((s) => (
                <MovieCard key={s.id} movie={s} />
              ))}
            </div>
          </InfiniteScroll>

          {!searchTerm && filteredSeries.length === 0 && (
            <div className="no-results" aria-live="polite">
              <div
                className="no-results-icon"
                role="img"
                aria-label="No Results"
              >
                🎭
              </div>
              <h3>No series found</h3>
            </div>
          )}
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
      </div>
    </>
  );
};

export default SeriesPage;
