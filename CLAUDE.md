# Sigtuna Bågskytteklubb — CLAUDE.md

## Project Overview

Website for [Sigtuna Bågskytteklubb](https://www.sigtunabagskytte.se/), a Swedish archery club. This is a migration from WordPress to a modern stack.

## Stack

- **Framework:** Astro 5 (SSR via Cloudflare adapter)
- **CMS:** Keystatic (git-based, admin UI at `/keystatic`)
- **Styling:** Tailwind CSS 3
- **Hosting:** Cloudflare Pages + Workers
- **Images:** Cloudflare R2
- **Contact form:** Cloudflare Turnstile + Mailchannels

## Development

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:4321 — CMS at /keystatic
npm run build      # Production build
npm run check      # TypeScript type check
npm run format     # Prettier
```

## Content (Keystatic)

Content lives in `src/content/` as Markdown/YAML. CMS schema defined in `keystatic.config.ts`.

Collections: news (`nyheter`), bow types, disciplines, events.
Singletons: training schedule, membership fees, board members, trial program, site settings.

## Deployment

Push to `main` triggers GitHub Actions → Cloudflare Pages deploy. See `.github/workflows/deploy.yml`.

Required secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`.

## Key Files

- `astro.config.mjs` — Astro config (Cloudflare adapter, Keystatic integration)
- `keystatic.config.ts` — CMS schema
- `wrangler.toml` — Cloudflare Workers config
- `public/_redirects` — 301 redirects from old WordPress URLs
- `src/layouts/Base.astro` — Theme import (switch between modern/faithful themes)

## User Stories

15 user stories in `User Stories/` covering editorial workflows, visitor needs, and technical requirements.
