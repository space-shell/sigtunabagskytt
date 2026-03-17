# US-13 — Git-Based Automatic Deployments

**Role:** Site maintainer / developer
**Goal:** All content and code changes auto-deploy from a Git commit
**Benefit:** No manual FTP uploads; full change history preserved; easy rollback

## Story

> As the site maintainer, I want all content deployments to trigger automatically from a Git commit so that there is no manual FTP upload step and the full change history is preserved.

## Acceptance Criteria

- [ ] Every push to `main` branch triggers a Cloudflare Pages build automatically
- [ ] CMS edits via Keystatic admin create a Git commit and trigger a new deploy
- [ ] Build time is under 3 minutes for a full site rebuild
- [ ] A preview deployment URL is generated for every pull request
- [ ] Failed builds send a notification (GitHub Actions status)
- [ ] The full content history is visible in `git log` — every change timestamped and authored
- [ ] Rollback requires only a `git revert` — no database to restore

## Notes

- GitHub Actions workflow: `.github/workflows/deploy.yml` using `cloudflare/pages-action`
- Keystatic in GitHub mode writes content commits directly to the repo
- Build output: `dist/` (Astro static + Cloudflare Worker for Keystatic API routes)
