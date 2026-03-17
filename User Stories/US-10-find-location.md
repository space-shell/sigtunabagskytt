# US-10 — Find Club Location

**Role:** First-time visitor
**Goal:** Find the club address and a map to navigate there
**Benefit:** Arrive at the right place on the first visit without calling for directions

## Story

> As a visitor who found the site on Google, I want to see the club's address and a map so that I can navigate to the range for the first time.

## Acceptance Criteria

- [ ] Both addresses (summer/Rävsta and winter/Eddaskolan) are clearly listed
- [ ] Each address has a "Öppna i Google Maps" link
- [ ] An embedded map is present (privacy-friendly: static image shown by default, interactive map loads on user click)
- [ ] Operating hours / training times are visible near the location info
- [ ] The page is reachable from the footer on every page and from the top navigation
- [ ] On mobile, the address is tap-to-copy or tappable to open maps app
- [ ] Structured data: `LocalBusiness` + `SportsClub` JSON-LD with correct coordinates

## Notes

- Summer outdoor range: Rävstvägen 110, 195 92 Märsta (59.6167°N, 17.85°E)
- Winter indoor range: Eddaskolan, Märsta
- Privacy: Google Maps iframe only loads after user interaction (GDPR best practice)
