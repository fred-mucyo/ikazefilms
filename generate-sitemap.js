#!/usr/bin/env node

/**
 * Enhanced sitemap generation script
 * This script generates sitemap.xml and robots.txt files including dynamic movie routes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:5173', // Update this for production
  outputDir: 'public',
  includeRobotsTxt: true,
  includeMovieRoutes: true,
  apiUrl: 'http://localhost:5012/api' // Update this for production
};

// Static routes configuration
const STATIC_ROUTES = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/login',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/register',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/watchlist',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/profile',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/change-password',
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/admin/login',
    priority: '0.5',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/terms',
    priority: '0.4',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/privacy',
    priority: '0.4',
    changefreq: 'yearly',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Function to fetch movie IDs from API
async function fetchMovieIds() {
  if (!CONFIG.includeMovieRoutes) {
    console.log('⚠️  Movie routes disabled in config');
    return [];
  }

  try {
    console.log('🔍 Fetching movie IDs from API...');
    const response = await fetch(`${CONFIG.apiUrl}/movies`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const movies = await response.json();
    const movieIds = movies.map(movie => movie.id || movie._id).filter(Boolean);
    
    console.log(`✅ Found ${movieIds.length} movies`);
    return movieIds;
  } catch (error) {
    console.warn(`⚠️  Could not fetch movie IDs: ${error.message}`);
    console.log('💡 Continuing with static routes only...');
    return [];
  }
}

// Function to generate movie routes
function generateMovieRoutes(movieIds) {
  return movieIds.map(id => ({
    path: `/movie/${id}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  }));
}

// Function to generate sitemap XML
function generateSitemapXML(routes, baseUrl) {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  
  const urls = routes.map(route => {
    const url = `${baseUrl}${route.path}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');
  
  return `${xmlHeader}
${urlsetOpen}
${urls}
${urlsetClose}`;
}

// Function to generate robots.txt
function generateRobotsTxt(baseUrl) {
  return `# Robots.txt for ${baseUrl}
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin routes
Disallow: /admin/
Disallow: /api/

# Allow public routes
Allow: /
Allow: /movie/
Allow: /watchlist
Allow: /profile
Allow: /terms
Allow: /privacy

# Crawl delay (optional)
Crawl-delay: 1`;
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting enhanced sitemap generation...');
    console.log(`📍 Base URL: ${CONFIG.baseUrl}`);
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
    console.log(`🔗 API URL: ${CONFIG.apiUrl}`);
    
    // Ensure output directory exists
    const outputPath = path.join(__dirname, CONFIG.outputDir);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
      console.log(`📁 Created directory: ${outputPath}`);
    }
    
    // Fetch movie IDs and generate all routes
    const movieIds = await fetchMovieIds();
    const movieRoutes = generateMovieRoutes(movieIds);
    const allRoutes = [...STATIC_ROUTES, ...movieRoutes];
    
    // Generate sitemap XML
    const sitemapContent = generateSitemapXML(allRoutes, CONFIG.baseUrl);
    
    // Write sitemap.xml
    const sitemapPath = path.join(outputPath, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap generated: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${allRoutes.length} (${STATIC_ROUTES.length} static + ${movieRoutes.length} movies)`);
    
    // Generate robots.txt if enabled
    if (CONFIG.includeRobotsTxt) {
      const robotsContent = generateRobotsTxt(CONFIG.baseUrl);
      const robotsPath = path.join(outputPath, 'robots.txt');
      fs.writeFileSync(robotsPath, robotsContent, 'utf8');
      console.log(`✅ Robots.txt generated: ${robotsPath}`);
    }
    
    // Display sitemap preview
    console.log('\n📋 Sitemap Preview:');
    console.log('==================');
    console.log('📱 Static Routes:');
    STATIC_ROUTES.forEach(route => {
      console.log(`  ${route.path} (Priority: ${route.priority}, Change: ${route.changefreq})`);
    });
    
    if (movieRoutes.length > 0) {
      console.log('\n🎬 Movie Routes:');
      movieRoutes.slice(0, 5).forEach(route => {
        console.log(`  ${route.path} (Priority: ${route.priority}, Change: ${route.changefreq})`);
      });
      if (movieRoutes.length > 5) {
        console.log(`  ... and ${movieRoutes.length - 5} more movie routes`);
      }
    }
    
    console.log('\n🎉 Sitemap generation completed successfully!');
    console.log(`🌐 Your sitemap is available at: ${CONFIG.baseUrl}/sitemap.xml`);
    
    if (CONFIG.includeRobotsTxt) {
      console.log(`🤖 Robots.txt available at: ${CONFIG.baseUrl}/robots.txt`);
    }
    
    // Production reminder
    if (CONFIG.baseUrl.includes('localhost')) {
      console.log('\n⚠️  REMINDER: Update baseUrl in CONFIG for production deployment!');
    }
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
main();
