// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Determine if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  // Use localhost for development, your domain for production
  site: isDev ? 'http://localhost:3000' : 'https://haydenwestbrook.com',
  output: 'static',
  redirects: {
    "/about": "/"
  },
  vite: {
    plugins: [tailwind()],
    // Add development-specific Vite config
    server: isDev ? {
      port: 3000,
      host: true,
      open: true
    } : undefined,
    optimizeDeps: {
      exclude: ['@astrojs/markdown-remark']
    }
  },
  integrations: [tailwind(), react()],
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});