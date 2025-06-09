// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

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
    plugins: [tailwindcss()],
    // Add development-specific Vite config
    server: isDev ? {
      port: 3000,
      host: true,
      open: true
    } : undefined
  },
  integrations: [react()],
});