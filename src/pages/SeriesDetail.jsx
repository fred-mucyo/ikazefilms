import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import staticSeries from '../utils/staticSeries';
import toast from 'react-hot-toast';
import './SeriesDetail.css';

const SeriesDetail = () => {
  const { id } = useParams();
  const series = staticSeries.find((s) => String(s.id) === String(id));

  if (!series) return <p className="not-found">Series not found</p>;

  // ✅ You forgot to define this before using it
  const [selectedSeason, setSelectedSeason] = useState(series.seasons[0]);

  // ✅ Share logic
  const handleShare = async () => {
    const shareData = {
      title: series.title,
      text: `Check out "${series.title}" on Hashye!`,
      url: window.location.href, // current series page URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Sharing failed:', err);
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      toast.success('📋 Link copied to clipboard!');
    }
  };

  return (
    <div className="series-detail">
      <div className="series-header">
        <img
          className="series-poster"
          src={series.poster_url}
          alt={series.title}
        />
        <div className="series-info">
          <h1 className="series-title">{series.title}</h1>
          <p className="series-description">{series.description}</p>
        </div>
      </div>

      <div className="season-selector">
        {series.seasons.map((season) => (
          <button
            key={season.seasonNumber}
            className={
              selectedSeason.seasonNumber === season.seasonNumber
                ? 'active'
                : ''
            }
            onClick={() => setSelectedSeason(season)}
          >
            Season {season.seasonNumber}
          </button>
        ))}
        {/* ✅ Share Button */}
        <button className="share-btn" onClick={handleShare}>
          Share
        </button>
      </div>

      {/* Keyed container ensures old episodes are removed */}
      <div className="episodes" key={selectedSeason.seasonNumber}>
        {selectedSeason.episodes.map((ep) => (
          <div key={ep.id} className="episode-card">
            <img
              className="episode-thumbnail"
              src={ep.thumbnail_url}
              alt={ep.title}
            />
            <div className="episode-info">
              <h4>{ep.title}</h4>
              <div className="episode-actions">
                <a
                  href={ep.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-btn"
                >
                  ▶ Watch
                </a>
                {ep.download_url && (
                  <a href={ep.download_url} className="download-btn">
                    ⬇ Download 
                    </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesDetail;
