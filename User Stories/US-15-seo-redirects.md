# US-15 — SEO 301 Redirects at Launch

**Role:** Club (organization) / SEO
**Goal:** All old WordPress URLs redirect correctly at DNS cutover
**Benefit:** Google rankings from the existing site are preserved after migration

## Story

> As the club, I want all outbound links and 301 redirects from the old WordPress URL structure to be in place at launch so that existing Google rankings are not lost.

## Acceptance Criteria

- [ ] Every URL from the current WordPress site either resolves to the same URL on the new site, or returns a permanent 301 redirect to the correct new URL
- [ ] 301 redirects are in place before DNS is cut over (testable on Cloudflare Pages preview URL)
- [ ] `public/_redirects` file contains all required redirect rules
- [ ] URL changes (e.g. `/hitta-till-oss/` → `/kontakt/hitta-till-oss/`) return HTTP 301
- [ ] WordPress-specific URLs (`/wp-admin/`, `/feed/`) return appropriate redirects or 410 Gone
- [ ] New sitemap is submitted to Google Search Console within 24 hours of launch
- [ ] Google Search Console Coverage report is monitored for 2 weeks after launch
- [ ] No page previously indexed by Google returns a 404 after launch

## Redirect Map

| Old URL | New URL | Status |
|---------|---------|--------|
| `/hitta-till-oss/` | `/kontakt/hitta-till-oss/` | 301 |
| `/feed/` | `/` | 301 |
| `/wp-admin/` | `/` | 301 |
| `/wp-login.php` | `/` | 301 |

## Notes

- Most URLs remain the same (Swedish slugs already in place on WordPress)
- Cloudflare Pages `_redirects` file format is compatible with Netlify syntax
- Reduce DNS TTL to 60s at least 24h before cutover for fast propagation
