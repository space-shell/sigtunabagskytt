# US-14 — Contact Form Spam Protection

**Role:** Club (organization)
**Goal:** Contact form submissions are protected against spam bots
**Benefit:** Club email inbox is not flooded with automated junk

## Story

> As the club, I want the contact form to be protected against spam bots so that the club email address (sigtunabagskytte@gmail.com) does not receive automated junk submissions.

## Acceptance Criteria

- [ ] Contact form includes Cloudflare Turnstile challenge (invisible by default, CAPTCHA only when suspicious)
- [ ] Server-side validation rejects submissions without a valid Turnstile token
- [ ] Form submission is handled by a Cloudflare Worker (not a third-party form service)
- [ ] Email is sent to `sigtunabagskytte@gmail.com` via Mailchannels (free on Cloudflare Workers)
- [ ] Sender's email is included in the reply-to field
- [ ] A success/error message is shown to the user after submission
- [ ] Form fields are validated both client-side (HTML5) and server-side (Worker)
- [ ] Form is accessible: correct `<label>` elements, keyboard navigation, screen reader compatible

## Notes

- Cloudflare Turnstile is free and GDPR-compliant (no Google reCAPTCHA)
- Mailchannels email delivery is free for Cloudflare Workers
- Worker endpoint: `POST /api/contact`
