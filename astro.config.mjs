// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
