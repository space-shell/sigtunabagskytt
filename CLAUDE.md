# Sigtuna Bågskytteklubb — CLAUDE.md

## Project Overview

Website for [Sigtuna Bågskytteklubb](https://www.sigtunabagskytte.se/), a Swedish archery club. Migration from WordPress to a modern static stack, currently live at **https://sbk.spaceshell.xyz**.

## Stack

- **Framework:** Astro 5 (`output: 'static'`, Cloudflare adapter)
- **CMS:** Keystatic (git-based, admin UI at `/keystatic`)
- **Styling:** Tailwind CSS 3 + `@tailwindcss/typography`
- **Hosting:** Cloudflare Pages (Git integration — push to `main` auto-deploys)
- **Images:** Static assets in `public/images/`; Cloudflare R2 (`sbk-assets` bucket) for future CMS media uploads
- **Contact form:** Cloudflare Turnstile + Mailchannels *(not yet configured)*

## Development

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:4321 — CMS at /keystatic
npm run build      # Production build
npm run check      # TypeScript type check
npm run format     # Prettier
```

> `platformProxy` is disabled (`enabled: false`) in `astro.config.mjs` because wrangler is not available in dev. Enable it only if you need local R2/KV access via wrangler.

## Content (Keystatic)

Content lives in `src/content/` as Markdown/YAML. CMS schema defined in `keystatic.config.ts`.

- **Collections:** `news` (nyheter), `bow-types`, `disciplines`
- **Singletons:** `training-schedule`, `membership` (avgifter), `board` (styrelse), `trial-program`, `settings` (site)

CMS is live at https://sbk.spaceshell.xyz/keystatic — sign in with the GitHub App (`sbk-cms`) installed on the `space-shell` account.

> **Important:** Keystatic requires a **GitHub App** (not an OAuth App). GitHub Apps return `expires_in`, `refresh_token`, and `refresh_token_expires_in` in their token exchange response — Keystatic's schema validation requires all three. OAuth Apps do not return these fields, causing "Authorization failed" on login.

## Themes

The site supports two themes, toggled via CMS (`Settings → Site` → `activeTheme`):

- **`modern`** (default) — Clean, contemporary design built for the migration
- **`faithful`** — Pixel-perfect recreation of the original WordPress site

The active theme is stored in `src/content/settings/site.yaml` and read at build/request time via `src/utils/theme.ts`. `Base.astro` conditionally renders `src/components/layout/faithful/` header+footer when `faithful` is active, and applies CSS overrides via `data-theme="faithful"` on `<html>`.

## Deployment

Push to `main` → Cloudflare Pages Git integration auto-builds and deploys.
GitHub Actions (`.github/workflows/deploy.yml`) runs CI only (type check + build) — it does **not** deploy.

**Cloudflare Pages secrets** (set via `wrangler pages secret put` or dashboard → Secrets):
- `KEYSTATIC_GITHUB_CLIENT_ID` — Client ID from the GitHub App
- `KEYSTATIC_GITHUB_CLIENT_SECRET` — Client secret from the GitHub App
- `KEYSTATIC_SECRET` — Random 64-char string used to encrypt the refresh token cookie

These are read at runtime via `context.locals.runtime.env` (Cloudflare adapter injects this). They are NOT available via `process.env` for secrets — only `import.meta.env` for build-time vars.

**Cloudflare Pages bindings** (Settings → Functions → R2 bucket bindings):
- Variable name: `R2_ASSETS` → Bucket: `sbk-assets`

## Key Files

- `astro.config.mjs` — Astro config (Cloudflare adapter, Keystatic integration)
- `keystatic.config.ts` — CMS schema
- `wrangler.toml` — Cloudflare Pages/Workers config (R2 binding, env vars)
- `public/_redirects` — 301 redirects from old WordPress URLs
- `public/images/` — Static images (`logo.png`, `hero-home.jpg`)
- `src/layouts/Base.astro` — Root layout; switches header/footer based on active theme
- `src/layouts/Page.astro` — Inner page layout (renders `<h1>` from `title` prop)
- `src/styles/global.css` — Design tokens, button/component classes, `color-scheme: light`
- `src/utils/theme.ts` — Reads `activeTheme` from CMS settings singleton
- `src/components/layout/faithful/` — Faithful theme header + footer components
- `src/content/settings/site.yaml` — Site-wide settings including `activeTheme`

## User Stories

15 user stories in `User Stories/` covering editorial workflows, visitor needs, and technical requirements.

## Next Steps

### Content
- [ ] Fill in board member names via CMS (`/keystatic` → Styrelse)
- [ ] Add more news articles via CMS
- [ ] Review and update all placeholder content
- [ ] Decide which theme to go live with (`modern` or `faithful`) — toggle via CMS Settings

### Technical
- [ ] Configure Cloudflare Turnstile (contact form spam protection)
- [ ] Configure Mailchannels (contact form email delivery)
- [ ] Test contact form end-to-end in production
- [ ] Set up `www.sigtunabagskytte.se` as custom domain in Cloudflare Pages
- [ ] DNS cutover: point `sigtunabagskytte.se` from WordPress host to Cloudflare Pages
- [ ] After DNS cutover: re-enable `security: { checkOrigin: true }` in `astro.config.mjs` (currently disabled because staging domain `sbk.spaceshell.xyz` doesn't match the configured `site` URL — the check silently returns empty responses for all SSR routes)

### Polish
- [ ] Add real images to R2 bucket for CMS-managed content (news, events)
- [ ] Add a favicon (`public/favicon.svg`, `public/favicon.ico`)
- [ ] Lighthouse / accessibility audit before final go-live
