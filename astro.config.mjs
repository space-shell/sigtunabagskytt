import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sigtunabagskytte.se',

  // Hybrid: static pages by default, SSR for Keystatic API routes
  output: 'hybrid',

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    // Keystatic CMS admin UI + API
    keystatic(),
  ],

  // Image optimization via Cloudflare
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },

  // Vite config
  vite: {
    ssr: {
      external: ['node:crypto'],
    },
  },
});
