import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
