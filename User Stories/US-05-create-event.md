# US-05 — Create Competition Event

**Role:** Club editor / competition organizer
**Goal:** Create a competition event entry with date, location, and registration link
**Benefit:** Members can find upcoming events without emailing the club

## Story

> As a club editor, I want to create a new competition or event entry with a date and location so that members can find upcoming events on the website.

## Acceptance Criteria

- [ ] I can navigate to "Tävlingar" in the CMS admin and click "New event"
- [ ] I can fill in: title, event date, end date (optional, for multi-day events), location, description
- [ ] I can add an optional registration URL (external link, e.g. ianseo or Laget.se)
- [ ] I can set an optional registration deadline date
- [ ] I can set status: Kommande / Inställd / Avslutad
- [ ] Upcoming events appear on the website (sorted by date)
- [ ] Past events are hidden from the listing but not deleted (historical record)
- [ ] Event has JSON-LD `Event` structured data for Google

## Notes

- Events is a Keystatic collection
- The club typically runs 1–2 events per year: Thors 3D (spring) and a district target competition
