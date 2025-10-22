
// import React, { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// // import TrailerEmbed from "./TrailerEmbed"; // We'll keep this if you want the actual embed, but the Figma implies the image is primary.
// import "./FeaturedHero.css";

// const FeaturedHero = ({ movies = [] }) => {
//   const featuredList = useMemo(() => {
//     if (!Array.isArray(movies) || movies.length === 0) return [];
//     const flagged = movies.filter((m) => m.is_featured);
//     return flagged.length ? flagged : movies;
//   }, [movies]);

//   const [index, setIndex] = useState(0);
//   const featured = featuredList[index] ?? null;

//   // Auto-rotation every 10 seconds
//   useEffect(() => {
//     if (featuredList.length <= 1) return;
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % featuredList.length);
//     }, 10000); // Auto-slide every 10 seconds as per your requirement
//     return () => clearInterval(interval);
//   }, [featuredList]);

//   // Removed Parallax effect as per new Figma style
//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     const hero = document.querySelector(".featured-hero");
//   //     if (hero) {
//   //       const offset = window.scrollY * 0.3;
//   //       hero.style.backgroundPositionY = `${offset}px`;
//   //     }
//   //   };
//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => window.removeEventListener("scroll", handleScroll);
//   // }, []);

//   if (!featured) return null;
//   const createdYear = featured.created_at
//     ? new Date(featured.created_at).getFullYear()
//     : "";

//   const bgImage =
//     featured.poster_url ||
//     featured.image_url ||
//     featured.thumbnail_url ||
//     "/hashye-preview.png";

//   // Calculate current time for the progress bar (simplistic)
//   const [progress, setProgress] = useState(0);
//   useEffect(() => {
//     if (featuredList.length <= 1) {
//       setProgress(100); // If only one item, show full progress or hide bar
//       return;
//     }

//     const timer = setInterval(() => {
//       setProgress((prev) => {
//         const newProgress = prev + (1000 / 10000) * 100; // 1000ms increment / 10000ms total * 100%
//         if (newProgress >= 100) {
//           return 0; // Reset for next slide
//         }
//         return newProgress;
//       });
//     }, 1000); // Update progress every second

//     return () => clearInterval(timer);
//   }, [index, featuredList.length]); // Reset progress when index changes

//   return (
//     <motion.section
//       className="featured-hero"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//       }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <div className="featured-overlay" />

//       {/* Top Navigation - This would typically be a separate <Header/> component */}
//       {/* For demo purposes, we'll put placeholders here to match Figma's visual */}
//       {/* <div className="top-nav-placeholder">
//         <div className="nav-links">
//           <span>HOME</span>
//           <span>MOVIES</span>
//           <span>SERIES</span>
//           <span>GENRES</span>
//           <span>RCNRES</span>
//         </div>
//         <div className="search-icon">🔍</div>
//       </div> */}

//       <div className="featured-inner">
//         <motion.div
//           className="featured-text-content"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <p className="featured-tagline">FEATURED MOVIE</p>
//           <h1 className="featured-title">{featured.title}</h1>
//           <p className="featured-subtitle">
//             {createdYear} • {featured.tagline || "The only way out is through"}
//           </p>

//           <div className="featured-actions">
//             {featured.youtube_trailer_url && (
//               <a
//                 href={featured.youtube_trailer_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-cta"
//               >
//                 WATCH TRAILER
//               </a>
//             )}
//             {featured.download_url && (
//               <a
//                 href={featured.download_url}
//                 download
//                 className="btn-secondary-cta" // Using secondary CTA for download
//               >
//                 DOWNLOAD
//               </a>
//             )}
//           </div>

//           <div className="playback-controls">
//             <div className="progress-bar-container">
//               <div
//                 className="progress-bar"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//             <span className="current-time">
//               0:{String(Math.floor(progress / 10)).padStart(2, "0")} / 0:30
//               {/* Simplified time display based on progress for visual */}
//             </span>
//           </div>
//         </motion.div>
//       </div>

//       <div className="featured-carousel-nav">
//         {featuredList.map((_, i) => (
//           <span
//             key={i}
//             className={`dot ${i === index ? "active" : ""}`}
//             onClick={() => setIndex(i)}
//           ></span>
//         ))}
//         <span className="arrow">›</span> {/* Placeholder for next arrow */}
//       </div>
//     </motion.section>
//   );
// };

// export default FeaturedHero;









import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./FeaturedHero.css";

const FeaturedHero = ({ movies = [] }) => {
  const featuredList = useMemo(() => {
    if (!Array.isArray(movies) || movies.length === 0) return [];
    const flagged = movies.filter((m) => m.is_featured);
    // Ensure we default to all movies if none are explicitly featured
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

    // Reset progress when index changes
    setProgress(0); 

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (1000 / 10000) * 100;
        if (newProgress >= 100) {
          clearInterval(timer); // Stop timer just before reset
          return 100;
        }
        return newProgress;
      });
    }, 1000); 

    return () => clearInterval(timer);
  }, [index, featuredList.length]); // Dependencies include index to reset progress

  if (!featured) return null;
  
  const createdYear = featured.created_at
    ? new Date(featured.created_at).getFullYear()
    : "";

  const backdropImage =
    featured.backdrop_url || featured.image_url || "/hashye-preview.png";
  
  const posterImage =
    featured.poster_url || featured.thumbnail_url || "/hashye-preview.png";

  return (
    <motion.section
      className="featured-hero"
      key={featured.id || featured.title} // Key ensures re-render on slide change
      style={{
        backgroundImage: `url(${backdropImage})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="featured-overlay" />

      {/* Top Navigation Placeholder (Kept for visual context)
      <div className="top-nav-placeholder">
        <div className="nav-links">
          <span>HOME</span>
          <span>MOVIES</span>
          <span>SERIES</span>
          <span>GENRES</span>
          <span>RCNRES</span>
        </div>
        <div className="search-icon">🔍</div>
      </div> */}

      <div className="featured-inner">
        {/* 1. VERTICAL POSTER CARD (New Element) */}
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
          <p className="featured-tagline">FEATURED MOVIE</p>
          <h1 className="featured-title">{featured.title}</h1>
          <p className="featured-subtitle">
            {createdYear} • {featured.tagline || "The only way out is through"}
          </p>

          <div className="featured-actions">
            {/* WATCH TRAILER button - uses youtube_trailer_url */}
            {featured.youtube_trailer_url && (
              <a
                href={featured.youtube_trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
              >
                WATCH TRAILER
              </a>
            )}
            
            {/* DOWNLOAD button - uses download_url */}
            {featured.download_url && (
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
              0:{String(Math.floor(progress / 10)).padStart(2, "0")} / 0:10
              {/* Note: This is a placeholder time for the 10-second slide duration */}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="featured-carousel-nav">
        {featuredList.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
        <span className="arrow" onClick={() => setIndex((index + 1) % featuredList.length)}>›</span>
      </div>
    </motion.section>
  );
};

export default FeaturedHero;