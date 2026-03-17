# US-01 — Publish News Post

**Role:** Club secretary (klubbsekreterare)
**Goal:** Publish a news post with a photo via a web form
**Benefit:** Keep members informed without editing code or using FTP

## Story

> As the club secretary, I want to publish a news post with a photo through a web form so that I can keep members informed without editing code or using FTP.

## Acceptance Criteria

- [ ] I can log in to the CMS admin at `/keystatic` with my credentials
- [ ] I can click "New news post" and fill in a title, publish date, and body text
- [ ] I can upload a photo and attach it as the featured image
- [ ] I can write a short intro/excerpt that appears in the news listing
- [ ] I can save as draft and preview before publishing
- [ ] Once published, the post appears on `/nyheter/` within seconds (or after next deploy)
- [ ] The published post is mobile-friendly
- [ ] The post has correct Open Graph meta for sharing on Facebook

## Notes

- CMS is Keystatic — content is committed to Git as Markdown files
- Images are stored in Cloudflare R2 and served via CDN
- No code knowledge required to publish
