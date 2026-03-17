# Sigtuna Bågskytteklubb — Website

Modern website for [Sigtuna Bågskytteklubb](https://www.sigtunabagskytte.se/) built with Astro 5, Keystatic CMS, and deployed on Cloudflare Pages.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 5](https://astro.build) |
| CMS | [Keystatic](https://keystatic.com) (git-based, admin UI at `/keystatic`) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) + Workers |
| Images | [Cloudflare R2](https://developers.cloudflare.com/r2/) |
| SEO | Built-in (replaces WordPress Rank Math) |
| Contact form | Cloudflare Turnstile + Worker + Mailchannels |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
# → Site at http://localhost:4321
# → CMS at http://localhost:4321/keystatic
```

## Development

```bash
npm run dev      # Dev server with hot reload
npm run build    # Production build
npm run preview  # Preview production build locally
npm run check    # TypeScript type check
npm run format   # Prettier formatting
npm run screenshots  # Re-capture original site screenshots
```

## CMS — Keystatic

The CMS admin is available at `/keystatic`. In development it uses **local mode** — edits are written directly to the Git repository as Markdown/YAML files.

Content types:
- **Nyheter** — news posts with featured images
- **Pilbågstyper** — bow types (Recurve, Longbow, Compound)
- **Grenar** — archery disciplines
- **Tävlingar** — competition events
- **Träningsschema** — training schedule (singleton)
- **Medlemskap** — membership fees and payment info (singleton)
- **Styrelse** — board members (singleton)
- **Prova på** — trial program settings (singleton)
- **Webbplatsinställningar** — club contact info, addresses, social links (singleton)

## Dual Theme System

Two visual themes are maintained in parallel:

| Theme | File | Description |
|-------|------|-------------|
| Modern (Nature) | `src/styles/theme-modern.css` | Forest greens, earthy browns. New visual identity. |
| Faithful | `src/styles/theme-faithful.css` | Mirrors the existing WordPress site colors. |

Switch theme by changing the CSS import in `src/layouts/Base.astro`.

## Project Structure

```
src/
├── assets/          # Images, fonts (processed by Astro)
├── components/
│   ├── layout/      # Header, Footer, BaseHead, Breadcrumb
│   ├── home/        # Hero, news highlights, value props
│   ├── news/        # NewsCard, NewsList
│   ├── archery/     # BowTypeCard, DisciplineCard
│   ├── about/       # BoardMember, TrainingSchedule, MembershipFees
│   ├── contact/     # ContactForm, MapEmbed
│   └── ui/          # Button, Card, Badge, RichText
├── content/         # All CMS content (Markdown + YAML)
│   ├── news/
│   ├── bow-types/
│   ├── disciplines/
│   ├── events/
│   ├── training-schedule/
│   ├── membership/
│   ├── board/
│   └── settings/
├── layouts/         # Base, Page, NewsPost
├── pages/           # File-based routing
├── styles/          # Global CSS, theme files
└── utils/           # SEO, dates, constants
```

## Deployment

Deployment is automated via GitHub Actions on push to `main`.

**Required GitHub Secrets:**
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Pages:Edit permission
- `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID
- `KEYSTATIC_GITHUB_CLIENT_ID` — GitHub OAuth App client ID
- `KEYSTATIC_GITHUB_CLIENT_SECRET` — GitHub OAuth App client secret
- `KEYSTATIC_SECRET` — Random 32+ character string

**Required Cloudflare Environment Variables:**
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret
- `CONTACT_EMAIL` — Email address for contact form submissions
- `PUBLIC_TURNSTILE_SITE_KEY` — Turnstile site key (public)

## Original Screenshots

The `original/` directory contains full-page screenshots of the WordPress site captured before migration. See `original/README.md` for details.

## User Stories

Development user stories are in the `User Stories/` directory (15 stories covering editorial, visitor, and technical perspectives).

## Migration Notes

- 301 redirects from old WordPress URLs are in `public/_redirects`
- URL mapping from WordPress slug structure to new structure is documented there
- DNS cutover procedure documented in migration plan

## License

Private — Sigtuna Bågskytteklubb. All rights reserved.