import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@panoptesui/core': path.resolve(import.meta.dirname, '../packages/core/src'),
      '@panoptesui/react': path.resolve(import.meta.dirname, '../packages/react/src'),
      '@panoptesui/theme': path.resolve(import.meta.dirname, '../packages/theme'),
      '@panoptes/core': path.resolve(import.meta.dirname, '../packages/core/src'),
      '@panoptes/react': path.resolve(import.meta.dirname, '../packages/react/src'),
      '@panoptes/theme': path.resolve(import.meta.dirname, '../packages/theme')
    }
  },
  server: {
    port: 3000
  }
});
