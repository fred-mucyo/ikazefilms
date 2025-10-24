// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     open: true
//   },
//   optimizeDeps: {
//     include: [
//       'react-hot-toast',
//       'lucide-react',
//       'lodash.debounce',
//       'react-helmet-async',
//       'react-infinite-scroll-component'
//     ]
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Hashye - Stream Movies & Shows',
        short_name: 'Hashye',
        description: 'Discover and stream the latest movies and shows in HD',
        theme_color: '#764ba2',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    open: true
  },
  optimizeDeps: {
    include: [
      'react-hot-toast',
      'lucide-react',
      'lodash.debounce',
      'react-helmet-async',
      'react-infinite-scroll-component'
    ]
  }
})
