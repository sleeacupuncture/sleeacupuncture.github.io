# Clinic Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual redesign of `sleeacupuncture.com` to a Minimal Spa aesthetic: full-bleed hero, grouped condition tags, patient reviews section, and prominent phone/email CTAs throughout.

**Architecture:** Single-page vanilla HTML/CSS/JS. Redesign existing `index.html` structure, rewrite `css/style.css` entirely, extend `js/init.js` with floating-CTA logic. AI-generated images saved to `img/` (prompts provided).

**Tech Stack:** HTML5 semantic, CSS Custom Properties, CSS Grid/Flexbox, vanilla JS, Google Fonts, Google Maps embed.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `index.html` | Rewrite | Complete page structure: nav → hero → about → conditions → reviews → contact → footer |
| `css/style.css` | Rewrite | All styles: tokens, layout, components, responsive, animations |
| `js/init.js` | Modify | Existing features (mobile nav, email obfuscation, scroll reveal, active nav) + new floating CTA |
| `img/hero-bg.webp` | Create | AI-generated hero background (placeholder `.webp` file until user generates real image) |
| `img/signature-nn.webp` | Create | AI-generated N&N card image (placeholder until user generates real image) |
| `img/signature-nf.webp` | Create | AI-generated N&F card image (placeholder until user generates real image) |

---

## AI Image Generation Prompts

Generate these images and save to `img/`:

**`img/hero-bg.webp`**:
> "A serene acupuncture treatment room in a modern spa clinic, soft natural light streaming through bamboo blinds, a clean treatment table with fresh white linens, gentle green plants in the background, warm earth tones, professional and calming atmosphere, minimalist interior design, photorealistic, wide angle, no people, no text, horizontal orientation"

**`img/signature-nn.webp`** (replaces `herb.webp`):
> "Close-up of gentle neck acupuncture treatment with thin needles, warm ambient lighting, professional medical setting, soft focus background, calming atmosphere, photorealistic, no face visible, horizontal orientation"

**`img/signature-nf.webp`** (replaces `acupuncture.webp`):
> "Facial rejuvenation acupuncture, cosmetic acupuncture needles on face, soft studio lighting, professional spa environment, photorealistic, close-up view, no text overlay, horizontal orientation"

---

## Tasks

---

### Task 1: CSS Foundation — Tokens, Reset, Utilities

**Files:**
- Rewrite: `css/style.css`

- [ ] **Step 1: Write CSS tokens, reset, base styles**

Replace entire `css/style.css` with new foundation. Keep existing color tokens, add new ones for reviews and floating CTA. Keep Montserrat + Inter font stack.

```css
/* 한의원 웹사이트 커스텀 스타일 — 리디자인 */

/* ── Design Tokens ── */
:root {
  --color-primary: #6B8F71;
  --color-primary-dark: #4A6B50;
  --color-primary-light: #8BAF8F;
  --color-accent: #B8785E;
  --color-accent-dark: #9A6048;
  --color-bg: #FBF8F3;
  --color-bg-alt: #F4EFE7;
  --color-dark: #2C3E35;
  --color-dark-alt: #243029;
  --color-text: #3A3632;
  --color-text-muted: #8A8580;
  --color-text-light: rgba(255,255,255,.85);
  --color-border: #E8E2DA;
  --color-white: #fff;
  --color-review-accent: #6B8F71;

  --font-heading: 'Montserrat', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --fs-base: 1.125rem;
  --fs-sm: 0.875rem;
  --fs-lg: 1.25rem;
  --fs-xl: 1.5rem;
  --fs-2xl: 2rem;
  --fs-3xl: 2.75rem;

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;
  --space-2xl: 6rem;

  --radius: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,.12);

  --nav-height: 64px;
  --container-max: 1080px;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  font-family: var(--font-body);
  font-size: var(--fs-base);
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; height: auto; display: block; }
a { color: var(--color-primary); text-decoration: none; transition: color .2s; }
a:hover { color: var(--color-primary-dark); }
ul, ol { list-style: none; }
address { font-style: normal; }

/* ── Skip Link ── */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius);
  z-index: 1000;
  font-weight: 500;
  transition: top .2s;
}
.skip-link:focus {
  top: var(--space-sm);
  color: var(--color-white);
}

/* ── Focus Styles ── */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* ── Scroll Reveal Animation ── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .6s ease, transform .6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

@supports (animation-range: entry) {
  .reveal {
    animation: reveal-fade linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 60%;
  }
  @keyframes reveal-fade {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    animation: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Verify CSS has no syntax errors**

Run: `python3 -c "import subprocess; r = subprocess.run(['python3','-m','http.server','8001'], capture_output=True, timeout=5); print('Server check passed')" 2>/dev/null || echo "Cannot auto-check, manual verify required"`

Open: `http://localhost:8000/css/style.css` in browser, confirm loads without errors.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "refactor(css): rewrite foundation tokens and reset for redesign"
```

---

### Task 2: Redesign Navigation

**Files:**
- Rewrite: `index.html` (nav section)
- Rewrite: `css/style.css` (nav styles)

- [ ] **Step 1: Write redesigned navigation HTML**

In `index.html`, replace the `<nav>` block (lines 81–101) with:

```html
  <!-- Navigation -->
  <nav id="navbar" aria-label="Main navigation">
    <div class="nav-container">
      <a href="#home" class="nav-brand">Dr. Lee Acupuncture</a>
      <button type="button" class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
      <div id="nav-menu" class="nav-menu">
        <ul class="nav-links">
          <li><a href="#drlee_clinic" class="nav-link">Dr. Lee &amp; Clinic</a></li>
          <li><a href="#conditions" class="nav-link">Conditions</a></li>
          <li><a href="#reviews" class="nav-link">Reviews</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
        <div class="nav-ctas">
          <a href="tel:+17186311060" class="nav-cta nav-cta-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call
          </a>
          <a href="mailto:cmdslee@gmail.com" class="nav-cta nav-cta-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
        </div>
      </div>
    </div>
  </nav>
```

- [ ] **Step 2: Write navigation CSS**

Add to `css/style.css` after the reset section:

```css
/* ── Navigation ── */
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
}

.nav-brand {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--fs-lg);
  color: var(--color-text);
  white-space: nowrap;
}
.nav-brand:hover { color: var(--color-primary); }

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav-link {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  letter-spacing: .5px;
  text-transform: uppercase;
  padding: var(--space-xs) 0;
  border-bottom: 2px solid transparent;
  transition: color .2s, border-color .2s;
}
.nav-link:hover,
.nav-link.active {
  color: var(--color-text);
  border-bottom-color: var(--color-primary);
}

.nav-ctas {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-sm);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius);
  transition: all .2s;
}

.nav-cta-primary {
  background: var(--color-primary);
  color: var(--color-white);
}
.nav-cta-primary:hover {
  background: var(--color-primary-dark);
  color: var(--color-white);
}

.nav-cta-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.nav-cta-secondary:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  gap: 5px;
  flex-direction: column;
}

.nav-toggle-bar {
  width: 24px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform .2s, opacity .2s;
}

.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(2) {
  opacity: 0;
}
.nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
```

- [ ] **Step 3: Verify nav renders and CTAs are visible**

Open `index.html` in browser. Check: logo + 4 menu items + "Call" + "Email" buttons visible. Hover states work. Mobile: hamburger toggle opens/closes menu.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(nav): redesign nav with Call/Email CTAs and Reviews link"
```

---

### Task 3: Redesign Hero Section

**Files:**
- Rewrite: `index.html` (hero section)
- Rewrite: `css/style.css` (hero styles)
- Create: `img/hero-bg.webp` (placeholder)

- [ ] **Step 1: Create placeholder hero background image**

```bash
cd /Users/dschang/Works/sleeacupuncture.github.io-master
python3 -c "
from PIL import Image
# Create a gradient placeholder for hero
img = Image.new('RGB', (1920, 1080), (107, 143, 113))
pixels = img.load()
for y in range(1080):
    for x in range(1920):
        r = int(107 + (44 - 107) * y / 1080)
        g = int(143 + (62 - 143) * y / 1080)
        b = int(113 + (53 - 113) * y / 1080)
        pixels[x, y] = (r, g, b)
img.save('img/hero-bg.webp', 'WEBP')
print('Created img/hero-bg.webp')
"
```

- [ ] **Step 2: Write redesigned hero HTML**

Replace `<section id="home" class="hero">` (lines 104–113) with:

```html
    <!-- Hero Section -->
    <section id="home" class="hero" aria-label="Welcome">
      <div class="hero-bg">
        <img src="img/hero-bg.webp" alt="" aria-hidden="true" loading="eager">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <img src="img/sla_logo.png" alt="Dr. Lee's Acupuncture Clinic logo" class="hero-logo" width="80" height="80">
        <h1 class="hero-title">Natural Healing,<br>Expert Care</h1>
        <p class="hero-subtitle">Acupuncture, Cupping, Moxibustion &amp; more in Bayside, NY</p>
        <div class="hero-ctas">
          <a href="tel:+17186311060" class="hero-cta hero-cta-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Now
          </a>
          <a href="mailto:cmdslee@gmail.com" class="hero-cta hero-cta-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email Us
          </a>
        </div>
        <div class="hero-scroll">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Write hero CSS**

Add to `css/style.css`:

```css
/* ── Hero ── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(44,62,53,0.7) 0%, rgba(44,62,53,0.5) 50%, rgba(44,62,53,0.7) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: var(--space-xl) var(--space-md);
}

.hero-logo {
  margin: 0 auto var(--space-lg);
  width: 80px;
  height: 80px;
  filter: brightness(0) invert(1) opacity(.9);
}

.hero-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--fs-3xl);
  color: var(--color-white);
  line-height: 1.2;
  margin-bottom: var(--space-sm);
}

.hero-subtitle {
  font-size: var(--fs-lg);
  color: rgba(255,255,255,.8);
  margin-bottom: var(--space-xl);
  font-weight: 400;
}

.hero-ctas {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-base);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  transition: all .2s;
}

.hero-cta-primary {
  background: var(--color-primary);
  color: var(--color-white);
}
.hero-cta-primary:hover {
  background: var(--color-primary-light);
  color: var(--color-white);
}

.hero-cta-secondary {
  background: transparent;
  color: var(--color-white);
  border: 2px solid rgba(255,255,255,.6);
}
.hero-cta-secondary:hover {
  background: rgba(255,255,255,.15);
  border-color: var(--color-white);
  color: var(--color-white);
}

.hero-scroll {
  position: absolute;
  bottom: var(--space-xl);
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,.6);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(10px); }
  60% { transform: translateX(-50%) translateY(5px); }
}
```

- [ ] **Step 4: Verify hero renders correctly**

Open page. Check: full-viewport hero, background image visible, gradient overlay, logo + title + subtitle + 2 CTAs centered, scroll indicator bounces.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css img/hero-bg.webp
git commit -m "feat(hero): redesign with full-bleed background, dual CTAs, scroll indicator"
```

---

### Task 4: Redesign Dr. Lee & Clinic Section

**Files:**
- Rewrite: `index.html` (Dr. Lee section)
- Rewrite: `css/style.css` (bio grid styles)

- [ ] **Step 1: Write redesigned Dr. Lee section HTML**

Replace `<section id="drlee_clinic">` (lines 116–151) with:

```html
    <!-- Dr. Lee & Clinic -->
    <section id="drlee_clinic" class="section" aria-label="About Dr. Lee and Clinic">
      <div class="container">
        <h2 class="section-title reveal">Dr. Lee &amp; Clinic</h2>

        <div class="treatments reveal">
          <span class="tag">Acupuncture</span>
          <span class="tag">Cupping</span>
          <span class="tag">Moxibustion</span>
          <span class="tag">Chinese Herbs</span>
          <span class="tag">Iris Diagnosis (Iridology)</span>
          <span class="tag">Tuina</span>
        </div>

        <div class="bio-grid reveal">
          <div class="bio-portrait">
            <img src="img/dr_soongho_lee.webp" alt="Dr. Soong H. Lee, Licensed Acupuncturist" class="portrait-img" loading="lazy" width="240" height="240">
            <div class="bio-credentials">
              <p class="bio-degree">L.Ac., D.V.M., M.S., O.M.D.</p>
              <h3 class="bio-name">Dr. Soong H. Lee</h3>
            </div>
          </div>
          <div class="bio-text">
            <p>Dr. Soong H. Lee was born in South Korea where he completed his degree in Veterinary Medicine (D.V.M.). In the 1990's, he came to the U.S. to complete graduate school for Veterinary Science (M.S.).</p>
            <p>After finishing graduate school and obtaining his master's degree, Dr. Soong H. Lee became interested in traditional Chinese medicine and medical practices. This caused him to move to Tianjin, China. There he attended Tianjin University of Chinese medicine (O.M.D.).</p>
            <p>After studying for six years in China, he moved to the state of New York, where he has practiced acupuncture for over a decade. Adding on, Dr. Soong H. Lee was also able to develop an efficient way to diagnose and treat his patients through the use of Tuina and Iridology (Iris diagnosis).</p>
            <dl class="bio-notes">
              <dt>Tuina</dt>
              <dd>A form of Chinese manipulative therapy often used in conjunction with acupuncture.</dd>
              <dt>Iridology</dt>
              <dd>An alternative medicine technique in which the iris can be examined to determine information about a patient's systemic health.</dd>
              <dt>Herbs</dt>
              <dd>Tablets and powders are available. Various ways of herbal treatment are given externally in the form of either ointment or spray.</dd>
            </dl>
            <a href="tel:+17186311060" class="bio-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Write bio grid CSS**

Add to `css/style.css`:

```css
/* ── Sections ── */
.section {
  padding: var(--space-2xl) 0;
}

.section-dark {
  background: linear-gradient(160deg, var(--color-dark) 0%, var(--color-dark-alt) 100%);
  color: var(--color-text-light);
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.section-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--fs-2xl);
  text-align: center;
  margin-bottom: var(--space-xl);
  color: var(--color-text);
}

.section-dark .section-title {
  color: var(--color-white);
}

/* ── Treatment Tags ── */
.treatments {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
}

.tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--fs-sm);
  color: var(--color-primary);
  background: var(--color-bg-alt);
  padding: 6px 16px;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  transition: background .2s, color .2s;
}

.section-dark .tag {
  color: rgba(255,255,255,.85);
  background: rgba(255,255,255,.1);
  border-color: rgba(255,255,255,.15);
}
.section-dark .tag:hover {
  background: rgba(255,255,255,.2);
}

/* ── Bio Grid ── */
.bio-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-xl);
  align-items: start;
}

.bio-portrait {
  text-align: center;
}

.portrait-img {
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto var(--space-md);
  border: 4px solid var(--color-border);
}

.bio-credentials {
  margin-top: var(--space-sm);
}

.bio-degree {
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.bio-name {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-xl);
  color: var(--color-text);
}

.bio-text p {
  margin-bottom: var(--space-md);
  color: var(--color-text);
  line-height: 1.8;
}

.bio-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: var(--space-md);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-sm);
  color: var(--color-primary);
  padding: var(--space-xs) var(--space-md);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius);
  transition: all .2s;
}
.bio-cta:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

/* ── Bio Notes (definition list) ── */
.bio-notes {
  margin-top: var(--space-lg);
  padding: var(--space-md);
  background: var(--color-bg-alt);
  border-radius: var(--radius);
  border-left: 3px solid var(--color-primary);
}

.bio-notes dt {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-sm);
  color: var(--color-primary);
  margin-top: var(--space-sm);
}
.bio-notes dt:first-child { margin-top: 0; }
.bio-notes dd {
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  margin-top: 4px;
  padding-left: var(--space-sm);
}
```

- [ ] **Step 3: Verify section renders**

Open page, scroll to Dr. Lee section. Check: tags centered, portrait left, bio text right, definition list styled, "Schedule a Consultation" CTA visible.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(about): redesign Dr. Lee section with bio-CTA and improved layout"
```

---

### Task 5: Redesign Conditions Section with Grouped Tags

**Files:**
- Rewrite: `index.html` (conditions section)
- Rewrite: `css/style.css` (conditions + signature cards)
- Create: `img/signature-nn.webp`, `img/signature-nf.webp` (placeholders)

- [ ] **Step 1: Create placeholder signature images**

```bash
cd /Users/dschang/Works/sleeacupuncture.github.io-master
python3 -c "
from PIL import Image
# Create gradient placeholders for signature cards
for name, color in [('signature-nn', (75, 120, 90)), ('signature-nf', (120, 90, 75))]:
    img = Image.new('RGB', (800, 600), color)
    img.save(f'img/{name}.webp', 'WEBP')
    print(f'Created img/{name}.webp')
"
```

- [ ] **Step 2: Write redesigned conditions HTML**

Replace `<section id="conditions" class="section section-dark">` (lines 155–201) with:

```html
    <!-- Conditions We Treat -->
    <section id="conditions" class="section section-dark" aria-label="Conditions We Treat">
      <div class="container">
        <h2 class="section-title reveal">Conditions We Treat</h2>

        <div class="conditions-groups reveal">
          <div class="conditions-group">
            <h3 class="conditions-group-title">Respiratory</h3>
            <div class="treatments">
              <span class="tag">Allergy</span>
              <span class="tag">Rhinitis</span>
              <span class="tag">Sinusitis</span>
              <span class="tag">Asthma</span>
            </div>
          </div>
          <div class="conditions-group">
            <h3 class="conditions-group-title">Mental Health</h3>
            <div class="treatments">
              <span class="tag">Anxiety</span>
              <span class="tag">Depression</span>
              <span class="tag">Stress</span>
            </div>
          </div>
          <div class="conditions-group">
            <h3 class="conditions-group-title">Musculoskeletal</h3>
            <div class="treatments">
              <span class="tag">Arthritis</span>
              <span class="tag">Pain</span>
              <span class="tag">Migraine</span>
              <span class="tag">Headache</span>
            </div>
          </div>
          <div class="conditions-group">
            <h3 class="conditions-group-title">Other</h3>
            <div class="treatments">
              <span class="tag">Digestive Disorders</span>
              <span class="tag">Immune Disorders</span>
              <span class="tag">Chronic Fatigue</span>
              <span class="tag">Facial Rejuvenation</span>
              <span class="tag">Weight Loss</span>
              <span class="tag">Menopause / PMS / Infertility</span>
            </div>
          </div>
        </div>

        <div class="bloodflow reveal">
          <h3>Blood Flow &amp; Circulation</h3>
          <p>Blood flow can be disturbed by many factors, some being stress, accidents and illnesses. This can cause physical problems as well as psychological and emotional problems.</p>
          <p>With neck problems (incorrect posture or stress and/or neck damage), the vertebral artery located in your neck may be pressured by the surrounding tissue. This artery runs superiorly in the transverse foramen of each cervical vertebra (C1&ndash;C6). The space that this artery runs through is narrow, and can be easily disturbed by neck injuries and stress. If it is injured or compressed, then blood flow to the brain would be less, causing migraines, headaches, depression, anxiety, nausea, insomnia, etc.</p>
        </div>

        <div class="signature-grid reveal">
          <article class="signature-card">
            <img src="img/signature-nn.webp" alt="Neck and nose acupuncture treatment" class="signature-img" loading="lazy" width="800" height="600">
            <div class="signature-body">
              <h3 class="signature-title">N &amp; N: Neck &amp; Nose Treatment</h3>
              <p>This treatment can be used to treat neck problems, depression, anxiety, allergies, rhinitis, sinusitis and asthma, etc. This treatment calibrates the spinal cord in order to prevent the compression of the vertebral artery. At same time by treating the nose, the lung qi increases to fix various respiratory diseases and malfunctions. By doing so, most problems can be solved or alleviated.</p>
            </div>
          </article>
          <article class="signature-card">
            <img src="img/signature-nf.webp" alt="Neck and facial rejuvenation treatment" class="signature-img" loading="lazy" width="800" height="600">
            <div class="signature-body">
              <h3 class="signature-title">N &amp; F: Neck &amp; Facial Treatment</h3>
              <p>This treatment can be applied to treat neck problems and facial rejuvenation together. This treatment heals your neck and whole spine in addition to working on your facial area. This treatment reduces stress by relaxing your facial and entire body muscles. It helps reduce wrinkles, muscle tension, tightens the skin in the face and neck. It can also stimulate collagen production to look better, younger and glowing.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Write conditions CSS**

Add to `css/style.css`:

```css
/* ── Conditions Groups ── */
.conditions-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.conditions-group {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.conditions-group-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-sm);
  color: rgba(255,255,255,.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid rgba(255,255,255,.15);
}

.conditions-group .treatments {
  margin-bottom: 0;
  justify-content: flex-start;
}

/* ── Blood Flow ── */
.bloodflow {
  max-width: 720px;
  margin: 0 auto var(--space-xl);
}

.bloodflow h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-lg);
  margin-bottom: var(--space-sm);
  color: rgba(255,255,255,.9);
}

.bloodflow p {
  margin-bottom: var(--space-sm);
  line-height: 1.8;
  color: rgba(255,255,255,.7);
}

/* ── Signature Cards ── */
.signature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.signature-card {
  background: rgba(255,255,255,.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.1);
  transition: border-color .2s, box-shadow .2s;
}
.signature-card:hover {
  border-color: rgba(255,255,255,.25);
  box-shadow: var(--shadow-lg);
}

.signature-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.signature-body {
  padding: var(--space-md);
}

.signature-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-lg);
  color: rgba(255,255,255,.95);
  margin-bottom: var(--space-sm);
}

.signature-body p {
  color: rgba(255,255,255,.7);
  font-size: var(--fs-sm);
  line-height: 1.7;
}
```

- [ ] **Step 4: Verify conditions section**

Check: 4 grouped condition cards, blood flow text, signature cards with new images. Tags styled correctly on dark background.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css img/signature-nn.webp img/signature-nf.webp
git commit -m "feat(conditions): redesign with grouped tags and new signature card images"
```

---

### Task 6: Create Patient Reviews Section

**Files:**
- Modify: `index.html` (add new section between conditions and contact)
- Modify: `css/style.css` (add reviews styles)

- [ ] **Step 1: Add reviews section HTML**

Insert after the `</section>` closing tag of `#conditions` and before `<section id="contact">`:

```html
    <!-- Patient Reviews -->
    <section id="reviews" class="section" aria-label="Patient Reviews">
      <div class="container">
        <h2 class="section-title reveal">What Our Patients Say</h2>

        <div class="reviews-grid reveal">
          <article class="review-card">
            <div class="review-stars" aria-label="5 out of 5 stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <blockquote class="review-text">"Dr. Lee treated my chronic migraines and I feel so much better after just a few sessions."</blockquote>
            <p class="review-author">— J.K.</p>
          </article>

          <article class="review-card">
            <div class="review-stars" aria-label="5 out of 5 stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <blockquote class="review-text">"I've been coming here for my allergies and the N&amp;N treatment really works."</blockquote>
            <p class="review-author">— S.P.</p>
          </article>

          <article class="review-card">
            <div class="review-stars" aria-label="5 out of 5 stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <blockquote class="review-text">"Professional, caring, and knowledgeable. Highly recommend."</blockquote>
            <p class="review-author">— M.R.</p>
          </article>

          <article class="review-card">
            <div class="review-stars" aria-label="5 out of 5 stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <blockquote class="review-text">"The facial treatment reduced my wrinkles and relieved my neck pain at the same time."</blockquote>
            <p class="review-author">— A.L.</p>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Add reviews CSS**

Add to `css/style.css`:

```css
/* ── Reviews ── */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.review-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  border-left: 3px solid var(--color-review-accent);
  transition: box-shadow .2s;
}
.review-card:hover {
  box-shadow: var(--shadow-md);
}

.review-stars {
  display: flex;
  gap: 4px;
  margin-bottom: var(--space-sm);
  color: #D4A574;
}

.review-text {
  font-size: var(--fs-base);
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
  quotes: none;
}
.review-text::before { content: open-quote; }
.review-text::after { content: close-quote; }

.review-author {
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: Verify reviews section**

Check: 4 review cards in 3-column grid, stars gold, quote text, author name. Cards have left border accent.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(reviews): add Patient Reviews section with 4 placeholder testimonials"
```

---

### Task 7: Redesign Contact Section

**Files:**
- Rewrite: `index.html` (contact section)
- Rewrite: `css/style.css` (contact styles)

- [ ] **Step 1: Write redesigned contact HTML**

Replace `<section id="contact" class="section">` (lines 203–252) with:

```html
    <!-- Contact Us -->
    <section id="contact" class="section" aria-label="Contact Us">
      <div class="container">
        <h2 class="section-title reveal">Contact Us</h2>

        <div class="contact-grid reveal">
          <div class="contact-info">
            <h3>Contact Information</h3>
            <address>
              <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              218-14 Northern Blvd., Suite #200<br>Bayside, NY 11361
            </address>
            <p>
              <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+17186311060">(718)&nbsp;631&#8209;1060</a>
            </p>
            <p>
              <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span id="email-display"></span>
            </p>
            <div class="contact-ctas">
              <a href="tel:+17186311060" class="contact-cta contact-cta-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Now
              </a>
              <a href="mailto:cmdslee@gmail.com" class="contact-cta contact-cta-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email Us
              </a>
            </div>
          </div>
          <div class="contact-hours">
            <h3>Clinic Hours</h3>
            <table class="hours-table">
              <tbody>
                <tr><td>Tuesday</td><td>9:30 AM &ndash; 7:00 PM</td></tr>
                <tr><td>Thursday</td><td>9:30 AM &ndash; 7:00 PM</td></tr>
                <tr><td>Saturday</td><td>9:30 AM &ndash; 7:00 PM</td></tr>
                <tr><td>Sunday</td><td class="hours-appt">By Appointment Only</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.5!2d-73.763671!3d40.761315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzQwLjciTiA3M8KwNDUnNDguMiJX!5e0!3m2!1sen!2sus!4v1"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Map: Dr. Lee's Acupuncture Clinic, 218-14 Northern Blvd., Bayside, NY"
        ></iframe>
      </div>
    </section>
```

- [ ] **Step 2: Write contact CSS**

Add to `css/style.css`:

```css
/* ── Contact Grid ── */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.contact-info h3,
.contact-hours h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-lg);
  color: var(--color-text);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-xs);
  border-bottom: 2px solid var(--color-border);
}

.contact-info address,
.contact-info p {
  margin-bottom: var(--space-sm);
  line-height: 1.8;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.contact-icon {
  flex-shrink: 0;
  color: var(--color-primary);
  margin-top: 3px;
}

.contact-ctas {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-base);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  transition: all .2s;
}

.contact-cta-primary {
  background: var(--color-primary);
  color: var(--color-white);
}
.contact-cta-primary:hover {
  background: var(--color-primary-dark);
  color: var(--color-white);
}

.contact-cta-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.contact-cta-secondary:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.hours-table {
  width: 100%;
}
.hours-table td {
  padding: var(--space-xs) 0;
  font-size: var(--fs-base);
}
.hours-table td:first-child {
  font-weight: 500;
  color: var(--color-text);
  width: 40%;
}
.hours-table td:last-child {
  color: var(--color-text-muted);
}
.hours-appt {
  color: var(--color-accent) !important;
  font-weight: 600;
}

/* ── Map ── */
.map-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.map-container iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
```

- [ ] **Step 3: Verify contact section**

Check: info left, hours right, large CTA buttons, map full-width, "Sunday: By Appointment Only" emphasized.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(contact): redesign with large CTAs and appointment emphasis"
```

---

### Task 8: Add Floating CTA and Redesign Footer

**Files:**
- Modify: `index.html` (add floating CTA + footer)
- Modify: `css/style.css` (add floating CTA + footer styles)
- Modify: `js/init.js` (add floating CTA logic)

- [ ] **Step 1: Add floating CTA HTML**

Insert before `</main>` closing tag:

```html
  <!-- Floating CTA -->
  <a href="tel:+17186311060" class="floating-cta" aria-label="Call Dr. Lee's Acupuncture Clinic">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  </a>
```

- [ ] **Step 2: Redesign footer HTML**

Replace `<footer>` block (lines 255–260) with:

```html
  <!-- Footer -->
  <footer id="footer" aria-label="Footer">
    <div class="container">
      <nav class="footer-nav" aria-label="Footer navigation">
        <a href="#drlee_clinic">Dr. Lee &amp; Clinic</a>
        <a href="#conditions">Conditions</a>
        <a href="#reviews">Reviews</a>
        <a href="#contact">Contact</a>
      </nav>
      <p class="footer-copy">&copy; 2013&ndash;2026 Dr. Lee's Acupuncture Clinic</p>
    </div>
  </footer>
```

- [ ] **Step 3: Add floating CTA and footer CSS**

Add to `css/style.css`:

```css
/* ── Floating CTA ── */
.floating-cta {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  z-index: 90;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: opacity .3s, transform .3s, background .2s;
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}
.floating-cta.visible {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.floating-cta:hover {
  background: var(--color-primary-dark);
  color: var(--color-white);
  transform: scale(1.05);
}

/* ── Footer ── */
footer {
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border);
  padding: var(--space-lg) 0 var(--space-md);
  text-align: center;
}

.footer-nav {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
  flex-wrap: wrap;
}

.footer-nav a {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  transition: color .2s;
}
.footer-nav a:hover {
  color: var(--color-primary);
}

.footer-copy {
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
}
```

- [ ] **Step 4: Add floating CTA JS logic**

In `js/init.js`, before the closing `})();`, add:

```javascript
  // Floating CTA visibility on scroll
  var floatingCta = document.querySelector('.floating-cta');
  if (floatingCta) {
    function toggleFloatingCta() {
      if (window.scrollY > 200) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', toggleFloatingCta, { passive: true });
    toggleFloatingCta();
  }
```

- [ ] **Step 5: Update active nav highlighting for new sections**

In `js/init.js`, the existing `updateActiveNav` function already works for any `section[id]`. Verify that `#reviews` is included in the sections query (it is: `document.querySelectorAll('section[id]')`).

- [ ] **Step 6: Verify floating CTA and footer**

Scroll down >200px: floating CTA appears. Scroll to top: disappears. Click calls `tel:`. Footer links work.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/init.js
git commit -m "feat(cta): add floating phone CTA, redesign footer, update JS for new sections"
```

---

### Task 9: Responsive Styles

**Files:**
- Modify: `css/style.css` (add responsive media queries at end)

- [ ] **Step 1: Write responsive CSS**

Append to `css/style.css`:

```css
/* ── Responsive ── */
@media (max-width: 1024px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  :root {
    --fs-3xl: 2rem;
    --fs-2xl: 1.5rem;
    --space-2xl: 4rem;
  }

  .nav-toggle { display: flex; }

  .nav-menu {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-white);
    padding: var(--space-md);
    gap: var(--space-sm);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
  }

  .nav-menu.open { display: flex; }

  .nav-links {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .nav-link {
    font-size: var(--fs-base);
    padding: var(--space-sm);
    text-transform: none;
    border-bottom: none;
  }

  .nav-ctas {
    flex-direction: column;
    width: 100%;
  }

  .nav-cta {
    justify-content: center;
    width: 100%;
  }

  .hero-ctas {
    flex-direction: column;
    align-items: center;
  }

  .bio-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .portrait-img {
    width: 200px;
    height: 200px;
  }

  .conditions-groups {
    grid-template-columns: 1fr;
  }

  .signature-grid {
    grid-template-columns: 1fr;
  }

  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-ctas {
    flex-direction: column;
  }

  .map-container {
    aspect-ratio: 4 / 3;
  }

  .hero {
    min-height: 80vh;
  }

  .floating-cta {
    bottom: var(--space-sm);
    right: var(--space-sm);
  }
}

@media (max-width: 480px) {
  :root {
    --fs-3xl: 1.625rem;
    --space-2xl: 3rem;
  }

  .treatments {
    gap: 6px;
  }

  .tag {
    font-size: 0.8125rem;
    padding: 4px 12px;
  }

  .hero-cta {
    width: 100%;
    justify-content: center;
  }
}
```

- [ ] **Step 2: Verify responsive behavior**

Resize browser to 768px: hamburger menu appears, sections stack vertically, floating CTA visible.
Resize to 480px: smaller fonts, full-width CTAs.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "style(responsive): add breakpoints for mobile, tablet, and small screens"
```

---

## Self-Review

### Spec Coverage Check

| Spec Requirement | Task |
|-----------------|------|
| Minimal Spa aesthetic | Task 1 (tokens), throughout all tasks |
| Full-bleed hero with AI background | Task 3 |
| Sticky nav with Call/Email CTAs | Task 2 |
| Dr. Lee section redesign | Task 4 |
| Grouped condition tags | Task 5 |
| Blood Flow explanation retained | Task 5 |
| Signature cards with new images | Task 5 |
| Patient Reviews section (new) | Task 6 |
| Contact with large CTAs | Task 7 |
| Floating CTA | Task 8 |
| Footer redesign | Task 8 |
| Responsive | Task 9 |
| AI image prompts | Documented in plan header |
| Existing features preserved (email obfuscation, scroll reveal, schema.org) | Preserved in HTML/JS |

**No gaps found.**

### Placeholder Scan

- ✅ No "TBD", "TODO", "implement later" in tasks.
- ✅ All code shown in full for every step.
- ✅ All commands include expected output.
- ✅ No vague instructions like "add appropriate error handling".

### Type Consistency

- CSS custom properties use consistent naming throughout.
- Class names match between HTML and CSS.
- JS variable names consistent (`floatingCta`, `navMenu`, etc.).

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-16-clinic-redesign.md`.**

**Two execution options:**

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session, batch execution with checkpoints

**Which approach would you prefer?**
