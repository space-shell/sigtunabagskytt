import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sigtunabagskytte.se',

  // Disable origin check — site URL is the final domain but deployment runs on sbk.spaceshell.xyz
  // for now. Re-enable once DNS is cut over to www.sigtunabagskytte.se.
  security: {
    checkOrigin: false,
  },

  // Static output by default; individual routes opt-in to SSR with `export const prerender = false`
  output: 'static',

  adapter: cloudflare({
    platformProxy: {
      enabled: false,
    },
    routes: {
      extend: {
        // /keystatic/* is auto-included but bare /keystatic is not matched by /*
        include: [{ pattern: '/keystatic' }],
      },
    },
  }),

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    react(),
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
    resolve: {
      alias: {
        '@styles': path.resolve('./src/styles'),
        // react-dom/server.browser uses MessageChannel which is unavailable
        // in Cloudflare Workers. Use the edge variant instead.
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },
});
