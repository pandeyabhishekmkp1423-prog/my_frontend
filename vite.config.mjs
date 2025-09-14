// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional, default Vite port
  },
  build: {
    outDir: 'dist', // ensure Vercel uses this folder
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': '/src', // optional, for cleaner imports
    },
  },
});
