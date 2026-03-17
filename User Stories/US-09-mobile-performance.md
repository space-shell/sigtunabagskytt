# US-09 — Mobile Performance

**Role:** Mobile user on 4G
**Goal:** Load the site quickly while on the move
**Benefit:** Quickly look up contact info or training times without waiting

## Story

> As a mobile user on 4G, I want the website to load in under 2 seconds so that I can quickly look up contact information while travelling to the club.

## Acceptance Criteria

- [ ] Largest Contentful Paint (LCP) < 2.5s on mobile (4G simulation)
- [ ] First Input Delay (FID) / Interaction to Next Paint (INP) < 200ms
- [ ] Cumulative Layout Shift (CLS) < 0.1 (no content jumping while loading)
- [ ] Lighthouse mobile score ≥ 90 on the home page
- [ ] Hero images are served in WebP format with appropriate `srcset`
- [ ] No layout-blocking scripts (no jQuery, no large render-blocking CSS)
- [ ] Fonts are self-hosted (no Google Fonts network request on page load)
- [ ] Navigation is usable with a thumb (touch targets ≥ 44px)

## Notes

- Astro ships zero JS by default — this target is achievable
- Images served from Cloudflare R2 via CDN (global edge caching)
- Tailwind CSS purges unused styles at build time
