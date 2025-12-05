// Sitemap generator utility
// This file contains functions to generate sitemap data for the website

// Base URL - should be updated for production
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://ikazefilms.online/' // Updated to new production domain
    : 'http://localhost:5173';

// Static routes that are always available
export const STATIC_ROUTES = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/login',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/register',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/watchlist',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/profile',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/change-password',
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/admin/login',
    priority: '0.5',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/terms',
    priority: '0.4',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/privacy',
    priority: '0.4',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0],
  },
];

// Function to generate sitemap XML
export function generateSitemapXML(routes = STATIC_ROUTES) {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urls = routes
    .map((route) => {
      const url = `${BASE_URL}${route.path}`;
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `${xmlHeader}
${urlsetOpen}
${urls}
${urlsetClose}`;
}

// Function to generate sitemap for specific movie IDs (if you have a list)
export function generateMovieSitemap(movieIds = []) {
  const movieRoutes = movieIds.map((id) => ({
    path: `/movie/${id}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  }));

  return generateSitemapXML([...STATIC_ROUTES, ...movieRoutes]);
}

// Function to save sitemap to file (for build process)
export function saveSitemapToFile(content, filename = 'sitemap.xml') {
  if (typeof window !== 'undefined') {
    // Browser environment - create download
    const blob = new Blob([content], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    // Node.js environment - write to file
    const fs = require('fs');
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`Sitemap saved to ${filename}`);
  }
}

// Function to get current sitemap data
export function getCurrentSitemapData() {
  return {
    routes: STATIC_ROUTES,
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
  };
}
