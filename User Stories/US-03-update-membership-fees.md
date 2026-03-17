# US-03 — Update Membership Fees

**Role:** Club treasurer (kassör)
**Goal:** Update fee amounts and payment instructions via CMS
**Benefit:** Prospective members always see correct, up-to-date pricing

## Story

> As the club treasurer, I want to update membership fee amounts and payment instructions through a simple form so that prospective members always see correct pricing.

## Acceptance Criteria

- [ ] I can navigate to "Medlemskap" in the CMS admin
- [ ] I can see all fee categories: Senior, Junior, Support, family discounts
- [ ] I can change a fee amount (e.g. Senior from 750 kr to 800 kr) without touching code
- [ ] I can update Swish number and bank giro details
- [ ] I can update the family discount rules and explanatory text
- [ ] I can update the membership renewal period dates
- [ ] Changes appear on `/om-oss/medlemskap/` after saving
- [ ] Fee table is clearly readable on mobile

## Notes

- Membership fees are a Keystatic singleton
- Swish QR code should auto-update if Swish number changes (or note to regenerate manually)
