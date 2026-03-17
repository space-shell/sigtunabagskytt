# US-04 — Manage Board Members

**Role:** Chairperson (ordförande)
**Goal:** Update the board roster after annual meeting without developer help
**Benefit:** The Styrelse page reflects the current board accurately year-round

## Story

> As the club chairperson, I want to add or remove board members and their roles through the admin interface so that the Styrelse page reflects the current board after each annual meeting.

## Acceptance Criteria

- [ ] I can navigate to "Styrelse" in the CMS admin
- [ ] I can see the current list of board members with name, role, and optional contact
- [ ] I can add a new member: name, role (e.g. Kassör, Sekreterare, Ordförande)
- [ ] I can remove a member who has left the board
- [ ] I can reorder board members to control display priority
- [ ] Each member has a toggle: "Visa kontaktuppgifter" (show email/phone publicly)
- [ ] Changes appear on `/om-oss/styrelse/` after saving
- [ ] The page notes the year of last election

## Notes

- Board is a Keystatic singleton (YAML array)
- GDPR: contact info only displayed if the member explicitly opted in via the toggle
