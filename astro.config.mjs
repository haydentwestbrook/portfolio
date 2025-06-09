// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Determine if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  site: process.env.NODE_ENV === 'production' 
    ? 'https://haydenwestbrook.com'
    : 'http://localhost:3000',
  vite: {
    server: {
      port: 3000,
      strictPort: true,
      host: true
    },
    optimizeDeps: {
      exclude: ['@astrojs/markdown-remark']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@headlessui/react', '@heroicons/react']
          }
        }
      },
      minify: isDev ? false : 'terser',
      terserOptions: isDev ? undefined : {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
          passes: 2,
          dead_code: true,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true
        },
        mangle: {
          toplevel: true,
          safari10: true
        },
        format: {
          comments: false,
          beautify: false
        }
      },
      sourcemap: isDev
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
        format: ['webp']
      }
    }
  },
  output: 'static',
  redirects: {
    "/about": "/"
  },
  trailingSlash: 'never',
  build: {
    format: 'directory',
    // Enable asset optimization
    assets: 'assets',
    // Enable source maps in development
    sourcemap: isDev
  }
});