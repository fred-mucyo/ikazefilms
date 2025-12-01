import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-192x192.png',
        'favicon-256x256.png',
        'favicon-512x512.png',
        'favicon.svg',
        'hashye-preview.png',
      ],
      manifest: {
        name: 'Hashye.online',
        short_name: 'Hashye',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#0d0d0d',
        icons: [
          {
            src: '/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    open: true,
  },
  optimizeDeps: {
    include: [
      'react-hot-toast',
      'lucide-react',
      'lodash.debounce',
      'react-helmet-async',
      'react-infinite-scroll-component',
    ],
  },
});
