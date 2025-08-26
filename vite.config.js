import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  optimizeDeps: {
    // Include dependencies that need to be pre-bundled to avoid "use client" or other bundling errors
    include: [
      'react-hot-toast',
      'lucide-react',
      'lodash.debounce'
    ]
  },
  build: {
    rollupOptions: {
      // Optionally mark these as external if you want them to remain outside the bundle
      external: []
    }
  }
})

