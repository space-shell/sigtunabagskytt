# Original Website Screenshots

Captures of **sigtunabagskytte.se** taken before the migration to Astro + Keystatic CMS.

These are the authoritative reference for:
- Migration fidelity checks (does the new site cover all content?)
- Content recovery if the WordPress export is incomplete
- Design reference for both the faithful recreation and modern redesign themes

## Status

> **Screenshots not yet captured.** The development environment does not have outbound internet access. Run the capture script from any machine with internet access:
>
> ```bash
> npm run screenshots
> ```
>
> or directly: `node scripts/capture-screenshots.cjs`

## Capture Details (target)

| Field | Value |
|-------|-------|
| Target date | Before migration launch |
| Tool | Playwright (automated headless browser — `scripts/capture-screenshots.cjs`) |
| Desktop viewport | 1440×900 |
| Mobile viewport | 390×844 |
| Format | PNG |
| Source URL | https://www.sigtunabagskytte.se/ |

## Page Index

### Desktop (1440px)

| File | URL |
|------|-----|
| `00-hem.png` | / |
| `01-nyheter.png` | /nyheter/ |
| `02-prova-pa.png` | /prova-pa/ |
| `03-pilbagar.png` | /prova-pa/pilbagar/ |
| `04-pilbagar-recurve.png` | /prova-pa/pilbagar/recurve/ |
| `05-pilbagar-langbage.png` | /prova-pa/pilbagar/langbage/ |
| `06-pilbagar-compound.png` | /prova-pa/pilbagar/compound/ |
| `07-grenar.png` | /prova-pa/grenar/ |
| `08-grenar-3d.png` | /prova-pa/grenar/3d/ |
| `09-grenar-jakt.png` | /prova-pa/grenar/jakt/ |
| `10-grenar-falt.png` | /prova-pa/grenar/falt/ |
| `11-grenar-monterad.png` | /prova-pa/grenar/monterad/ |
| `12-grenar-clout.png` | /prova-pa/grenar/clout/ |
| `13-om-oss.png` | /om-sigtuna-bagskytteklubb/ |
| `14-om-oss-medlemskap.png` | /om-sigtuna-bagskytteklubb/medlemskap/ |
| `15-om-oss-traning.png` | /om-sigtuna-bagskytteklubb/traning/ |
| `16-om-oss-tavling.png` | /om-sigtuna-bagskytteklubb/tavling/ |
| `17-om-oss-styrelse.png` | /om-sigtuna-bagskytteklubb/styrelse/ |
| `18-kontakt.png` | /kontakt/ |
| `19-hitta-till-oss.png` | /hitta-till-oss/ |

### Mobile (390px)

| File | URL |
|------|-----|
| `00-hem-mobile.png` | / |
| `01-nyheter-mobile.png` | /nyheter/ |
| `02-prova-pa-mobile.png` | /prova-pa/ |
| `13-om-oss-mobile.png` | /om-sigtuna-bagskytteklubb/ |
| `18-kontakt-mobile.png` | /kontakt/ |

## Notes

- Full-page scrolling captures — entire page height captured, not just the visible viewport
- Screenshots taken before any WordPress updates during the migration period
- URL bar visible in metadata (see Playwright script at `scripts/capture-screenshots.cjs`)
