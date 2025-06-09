// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import assets from '@astrojs/assets';

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
    },
    build: {
      // Enable code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@headlessui/react', '@heroicons/react']
          }
        }
      },
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev
        }
      }
    }
  },
  integrations: [
    tailwind(),
    react(),
    assets({
      // Enable image optimization
      service: 'sharp',
      // Configure image quality
      quality: 80,
      // Enable WebP conversion
      format: ['webp']
    })
  ],
  trailingSlash: 'never',
  build: {
    format: 'directory',
    // Enable asset optimization
    assets: 'assets',
    // Enable source maps in development
    sourcemap: isDev
  }
});