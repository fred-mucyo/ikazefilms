/**
 * Sitemap Configuration
 * Update these values for your production environment
 */

export const SITEMAP_CONFIG = {
  // Base URL for your website
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://ikazefilms.online' // IkazeFilms production domain
    : 'http://localhost:5173',
  
  // Output directory for generated files
  outputDir: 'public',
  
  // Whether to include robots.txt generation
  includeRobotsTxt: true,
  
  // Whether to fetch and include dynamic movie routes
  includeMovieRoutes: true,
  
  // API URL to fetch movie data
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://your-backend-url.onrender.com/api' // Replace with your production API
    : 'http://localhost:5012/api',
  
  // Route priorities (0.0 to 1.0)
  priorities: {
    home: '1.0',
    auth: '0.8',
    userFeatures: '0.9',
    profile: '0.7',
    admin: '0.5',
    legal: '0.4',
    movies: '0.9'
  },
  
  // Change frequencies
  changeFreq: {
    home: 'daily',
    auth: 'monthly',
    userFeatures: 'weekly',
    profile: 'monthly',
    admin: 'monthly',
    legal: 'yearly',
    movies: 'weekly'
  }
};

// Example usage in generate-sitemap.js:
// import { SITEMAP_CONFIG } from './sitemap.config.js';
// const CONFIG = SITEMAP_CONFIG;
