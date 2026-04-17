import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/chatkit': {
        target: 'http://localhost:8321',
        changeOrigin: true,
      },
      '/figures': {
        target: 'http://localhost:8321',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:8321',
        changeOrigin: true,
      },
    },
  },
});
