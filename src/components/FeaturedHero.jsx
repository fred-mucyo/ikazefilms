import React, { useMemo } from 'react'
import TrailerEmbed from './TrailerEmbed'
import './FeaturedHero.css'

const FeaturedHero = ({ movies = [] }) => {
  const featured = useMemo(() => {
    if (!Array.isArray(movies) || movies.length === 0) return null
    const flagged = movies.find((m) => m.is_featured)
    if (flagged) return flagged
    const withTrailer = movies.filter((m) => m.youtube_trailer_url)
    return (withTrailer[0] || movies[0]) ?? null
  }, [movies])

  if (!featured) return null

  const createdYear = featured.created_at ? new Date(featured.created_at).getFullYear() : ''

  // Background image handling (WebP + fallback)
  const bgImage = featured.backdrop_url || featured.cover_url || featured.image || ''
  const bgWebp = bgImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  const bgStyle = bgImage
    ? { backgroundImage: `url(${bgWebp}), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: '#000' }

  return (
    <section className="featured-hero" style={bgStyle}>
      <div className="featured-overlay" />
      <div className="featured-inner container">
        <div className="featured-text">
          <h1 className="featured-title">{featured.title}</h1>
          <p className="featured-subtitle">{createdYear} • Exclusive Trailer</p>
          <div className="featured-actions">
            {featured.video_url && (
              <a
                href={featured.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
              >
                WATCH FULL MOVIE
              </a>
            )}
            {featured.video_url && (
              <a
                href={featured.video_url}
                download
                className="btn-secondary-cta"
              >
                DOWNLOAD
              </a>
            )}
          </div>
        </div>
        {featured.youtube_trailer_url && (
          <div className="featured-trailer">
            <TrailerEmbed
              youtubeUrl={featured.youtube_trailer_url}
              thumbnailUrl={featured.thumbnail_url?.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
              title={featured.title}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedHero
