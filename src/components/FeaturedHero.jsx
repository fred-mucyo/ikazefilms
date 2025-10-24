import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './FeaturedHero.css';

// Helper to generate the URL for the series detail page
const generateSeriesDetailPageUrl = (seriesId) => {
  return `/series/${seriesId}`; // Adjust this if your route is different
};

const FeaturedHero = ({ movies = [] }) => {
  const featuredList = useMemo(() => {
    if (!Array.isArray(movies) || movies.length === 0) return [];
    const flagged = movies.filter((m) => m.is_featured);
    return flagged.length ? flagged : movies;
  }, [movies]);

  const [index, setIndex] = useState(0);
  const featured = featuredList[index] ?? null;

  // Auto-rotation every 10 seconds (as requested)
  useEffect(() => {
    if (featuredList.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredList.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [featuredList]);

  // Progress Bar / Timer Logic
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (featuredList.length <= 1) {
      setProgress(100);
      return;
    }
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (1000 / 10000) * 100;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, featuredList.length]);

  if (!featured) return null;

  const createdYear = featured.created_at
    ? new Date(featured.created_at).getFullYear()
    : '';

  const isSeries = featured.type === 'series';

  // --- REVISED IMAGE LOGIC ---
  // Background Image (wide, landscape)
  const backdropImage =
    featured.backdrop_url || // Preferred wide image
    featured.image_url || // General image
    featured.poster_url || // Fallback to poster if no wide image, though it might get cropped/stretched if not truly wide
    '/hashye-preview.png'; // Ultimate fallback

  // Poster Image (vertical)
  const posterImage =
    featured.poster_url || // Preferred vertical image
    featured.thumbnail_url || // Fallback thumbnail
    '/hashye-preview.png'; // Ultimate fallback

  // Determine the primary link for the watch button
  const primaryWatchUrl = isSeries
    ? generateSeriesDetailPageUrl(featured.id) // Link to series detail page
    : featured.youtube_trailer_url; // Link to movie trailer

  const primaryButtonLabel = isSeries ? 'VIEW SERIES' : 'REBA FILIME';

  return (
    <motion.section
      className="featured-hero"
      key={featured.id || featured.title}
      style={{
        backgroundImage: `url(${backdropImage})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="featured-overlay" />

      <div className="featured-inner">
        {/* 1. VERTICAL POSTER CARD */}
        <motion.div
          className="featured-poster-card"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={posterImage}
            alt={`${featured.title} Poster`}
            loading="eager"
            className="poster-image"
          />
        </motion.div>

        {/* 2. TEXT CONTENT & BUTTONS */}
        <motion.div
          className="featured-text-content"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="featured-tagline">
            FEATURED {isSeries ? 'SERIES' : 'MOVIE'}
          </p>
          <h1 className="featured-title">{featured.title}</h1>
          <p className="featured-subtitle">
            {createdYear} •{' '}
            {isSeries
              ? `Season ${featured.seasons?.[0]?.seasonNumber}`
              : featured.tagline || 'Exclusive Trailer'}
          </p>

          <div className="featured-actions">
            {/* PRIMARY BUTTON (View Series/Watch Trailer) */}
            {primaryWatchUrl && (
              <a
                href={primaryWatchUrl}
                target={isSeries ? '_self' : '_blank'}
                rel={isSeries ? '' : 'noopener noreferrer'}
                className="btn-cta"
              >
                {primaryButtonLabel}
              </a>
            )}

            {/* SECONDARY BUTTON (Download) - Only visible for Movies */}
            {!isSeries && featured.download_url && (
              <a
                href={featured.download_url}
                download
                className="btn-secondary-cta"
              >
                DOWNLOAD
              </a>
            )}
          </div>

          <div className="playback-controls">
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="current-time">
              0:{String(Math.floor(progress / 10)).padStart(2, '0')} / 0:10
            </span>
          </div>
        </motion.div>
      </div>

      <div className="featured-carousel-nav">
        {featuredList.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
        <span
          className="arrow"
          onClick={() => setIndex((index + 1) % featuredList.length)}
        >
          ›
        </span>
      </div>
    </motion.section>
  );
};

export default FeaturedHero;
