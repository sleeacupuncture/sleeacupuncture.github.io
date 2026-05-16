# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page website for Dr. Lee's Acupuncture Clinic (`sleeacupuncture.com`), deployed to GitHub Pages. Based on the "Summit" one-page responsive theme by WebDesignCrowd. No build step, no package manager, no modern framework — all changes are direct file edits.

## Key Files

- `index.html` — The only production HTML page; contains all content sections
- `css/style.css` — Custom theme styles (2,200+ lines); overrides Bootstrap defaults
- `js/init.js` — All client-side logic: parallax, scrollspy, navbar affix, smooth scrolling, Google Maps

## Tech Stack

- **HTML5 / CSS3 / ES5 JavaScript** — no transpilation, no bundling
- **Bootstrap 3** — grid system (`col-md-*`), navbar, collapse, affix
- **jQuery 1.9.1** — all DOM interaction in `js/init.js`
- **Masonry + AnimOnScroll** — scroll-triggered masonry grid for treatment cards
- **Google Maps JS API** — embedded map at clinic location (lat 40.761315, lng -73.763671)
- **Google Fonts** — Open Sans, Lato (loaded from CDN)
- **Font Awesome 4** — self-hosted in `fonts/font-awesome/`

## Page Sections

`index.html` is divided into anchor-linked sections:

1. `#home` — Hero with parallax background (`img/forest.png`) and logo
2. `#drlee_clinic` — Doctor bio, treatment methods, and portrait
3. `#conditions_we_treat` — Conditions list + masonry grid with N&N and N&F signature treatments (parallax background `img/night-mountains.png`)
4. `#contact_us` — Contact info, clinic hours, Google Map
5. `#footer` — Copyright

Navigation uses fixed-top navbar (`#navbar`) that affixes after scrolling past the hero. Smooth scroll via `a.scroll` click handler in `init.js`.

## Development

No build or test commands. Open `index.html` directly in a browser or use any static file server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

## Architecture Notes

- **Parallax**: Driven by `updateParallax()` in `init.js`, applied to `.parallax` elements. Disabled below 768px viewport width.
- **Slide-in animations**: Elements with class `.slide-in` get `.slid` added on scroll.
- **Masonry grid**: `#grid` element initialized via `AnimOnScroll` after `imagesLoaded`. The two treatment cards use `col-md-6` columns.
- **Google Maps API key**: Hardcoded in `index.html` line 254. If the map stops working, the key needs to be replaced or moved to a server-side proxy.
- **CSS**: `css/style.css` is the only custom stylesheet. Bootstrap core (`bootstrap.css`) and theme (`bootstrap-theme.css`) are unmodified vendor files.

## Unused Template Assets

The original "Summit" theme shipped with stock images and components not used in this site. Known unused files in `img/`: `sintel-*`, `preview*`, `portrait*`, `summit-*`, `ishtar-alley.png`, `macbookAir.png`, `company-preview.jpg`, `product-preview.jpg`, `dribbble-logo.png`, `mountains.png`. The `documentation/` directory is also not part of the live site.

## Deployment

GitHub Pages serves from the repository root. `CNAME` contains `sleeacupuncture.com`. Push to the `master` branch to deploy.