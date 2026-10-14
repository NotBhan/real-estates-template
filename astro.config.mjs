// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: process.env.SITE_URL || 'https://real-estates-ashen-chi.vercel.app',

  adapter: isVercel
    ? vercel()
    : node({
        mode: 'standalone',
      }),

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
