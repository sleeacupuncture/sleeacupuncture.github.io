# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page website for Dr. S. Lee Acupuncture Clinic (`sleeacupuncture.com`), deployed to GitHub Pages. Vanilla HTML5/CSS3/JS — no framework, no build step, no package manager.

## Key Files

- `index.html` — The only production HTML page; semantic HTML5 with Schema.org JSON-LD
- `css/style.css` — Custom styles using CSS Custom Properties (~350 lines)
- `js/init.js` — Vanilla JS: mobile nav toggle, email obfuscation, IntersectionObserver reveal, active nav
- `img/` — WebP images (sla_logo.png is the only PNG)

## Tech Stack

- **HTML5 semantic** — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, ARIA landmarks
- **CSS Custom Properties** — color palette, spacing, typography tokens in `:root`
- **CSS Grid + Flexbox** — no Bootstrap or CSS framework
- **Vanilla JS** — no jQuery or libraries
- **Google Fonts** — Montserrat (headings), Inter (body)
- **Google Maps iframe** — embed without API key

## Design System

| Token | Value |
|-------|-------|
| Primary | `#6B8F71` (sage green) |
| Accent | `#B8785E` (muted terracotta) |
| Background | `#FBF8F3` (warm white) |
| Dark section | `#2C3E35` (deep forest) |
| Text | `#3A3632` (deep brown) |

## Development

No build commands. Serve directly:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Page Sections

1. `#home` — Hero with CSS gradient background, logo, welcome text
2. `#drlee_clinic` — Doctor bio, treatment methods, portrait
3. `#conditions` — Conditions list + blood flow explanation + N&N/N&F signature cards
4. `#contact` — Contact info (email via JS obfuscation), clinic hours, Google Maps iframe

## Deployment

GitHub Pages serves from repo root. `CNAME` contains `sleeacupuncture.com`. Push to `master` branch to deploy.