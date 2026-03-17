# US-02 — Update Training Schedule

**Role:** Club secretary (klubbsekreterare)
**Goal:** Update training times and locations through the CMS
**Benefit:** Schedule changes reflected on the website quickly without developer involvement

## Story

> As the club secretary, I want to edit the training schedule (days, times, locations) through the CMS so that members always see the current schedule.

## Acceptance Criteria

- [ ] I can navigate to "Träningsschema" in the CMS admin
- [ ] I can see all existing sessions listed with day, time, location, and audience
- [ ] I can edit an existing session's time without recreating it
- [ ] I can add a new session (e.g. a new outdoor weekday slot in summer)
- [ ] I can remove a session that is no longer running
- [ ] I can toggle between indoor (Eddaskolan) and outdoor (Rävsta) locations
- [ ] Changes are reflected on `/om-oss/traning/` after saving
- [ ] The schedule displays correctly on mobile (table or card layout)

## Notes

- Training schedule is a Keystatic singleton (one YAML file, not multiple entries)
- Seasonal sessions can be marked with start/end dates so they auto-hide off-season
