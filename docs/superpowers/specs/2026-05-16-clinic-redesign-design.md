# Dr. Lee's Acupuncture Clinic — Redesign Design Spec

**Date:** 2026-05-16  
**Approach:** A — Full-bleed Hero + Clean Scroll / Minimal Spa Style

---

## 1. Summary

A complete visual redesign of the single-page static website for Dr. Lee's Acupuncture Clinic (`sleeacupuncture.com`). The new design adopts a **Minimal Spa** aesthetic: generous whitespace, soft natural tones, clean typography, and a trustworthy yet modern feel appropriate for a medical-wellness practice.

The redesign preserves all existing content and adds a **Patient Reviews** section and prominent **Phone / Email CTAs** throughout.

## 2. Design Decisions

| Item | Decision |
|------|----------|
| **Tech Stack** | Vanilla HTML5 / CSS3 / JS — no build step, no framework. GitHub Pages deployment. |
| **Design Mood** | Minimal Spa: wide whitespace, soft earth tones, clean typography, calming rhythm. |
| **Color Palette** | Retain existing tokens: Sage Green `#6B8F71`, Terracotta `#B8785E`, Warm White `#FBF8F3`, Deep Forest `#2C3E35`. |
| **Content** | Existing 4 sections preserved + new **Patient Reviews** section + phone/email CTAs added. |
| **Images** | Keep existing 4 images + generate 1 hero background + 2 signature-card images via AI prompts. |
| **Typography** | Keep Google Fonts: Montserrat (headings, 500/600/700) + Inter (body, 400/500). |

## 3. Page Sections

### 3.1 Navigation (Sticky)

- **Layout**: Logo left, menu center, CTAs right.
- **Logo**: Text "Dr. Lee Acupuncture" in Montserrat 700.
- **Menu Items**: Dr. Lee & Clinic | Conditions | Reviews | Contact
- **CTAs** (always visible on desktop):
  - "Call" button — sage green background, white text, phone icon, links to `tel:+17186311060`.
  - "Email" button — outline style, sage green border/text, envelope icon, links to `mailto:cmdslee@gmail.com`.
- **Mobile**: Hamburger menu. CTAs appear inside the dropdown.
- **Visual**: White background, bottom border `1px solid #E8E2DA`, subtle shadow.

### 3.2 Hero (100vh)

- **Background**: Full-viewport AI-generated image + dark gradient overlay (`rgba(44,62,53,0.6)` → transparent).
- **Content**: Centered vertically and horizontally.
  - Clinic logo (`sla_logo.png`, brightness inverted for dark background)
  - Headline: "Natural Healing, Expert Care"
  - Subtext: "Acupuncture, Cupping, Moxibustion & more in Bayside, NY"
  - Two CTA buttons side by side:
    - Primary: "Call Now" (sage green fill)
    - Secondary: "Email Us" (white outline)
- **Scroll Indicator**: Gentle bounce animation at bottom center.

**AI Image Prompt (Hero Background)**:
> "A serene acupuncture treatment room in a modern spa clinic, soft natural light streaming through bamboo blinds, a clean treatment table with fresh white linens, gentle green plants in the background, warm earth tones, professional and calming atmosphere, minimalist interior design, photorealistic, wide angle, no people, no text, horizontal orientation"

### 3.3 Dr. Lee & Clinic (Light Background `#FBF8F3`)

- **Layout**: Two-column grid (portrait left, text right). Stacks vertically on mobile.
- **Left Column**:
  - Circular portrait (`dr_soongho_lee.webp`, 240×240, `border-radius: 50%`, border)
  - Credentials: "L.Ac., D.V.M., M.S., O.M.D."
  - Name: "Dr. Soong H. Lee"
- **Right Column**:
  - Bio paragraphs (current text retained)
  - Treatment tags: Acupuncture, Cupping, Moxibustion, Chinese Herbs, Iris Diagnosis (Iridology), Tuina
  - Definition list: Tuina, Iridology, Herbs (current content, restyled)
- **Bottom CTA**: "Schedule a Consultation" — subtle sage-green text link or small button.

### 3.4 Conditions We Treat (Dark Background `#2C3E35`)

- **Title**: "Conditions We Treat" — centered, white text.
- **Tags (grouped)**:
  - 🫁 Respiratory: Allergy, Rhinitis, Sinusitis, Asthma
  - 🧠 Mental Health: Anxiety, Depression, Stress
  - 🦴 Musculoskeletal: Arthritis, Pain (neck, lower back, shoulder, knee), Migraine, Headache
  - 🩺 Other: Digestive Disorders, Immune Disorders, Chronic Fatigue, Facial Rejuvenation, Weight Loss, Menopause / PMS / Infertility
- **Blood Flow Explanation**: Retain current text, centered, max-width 720px, muted white text.
- **Signature Cards** (2-column grid, stacks on mobile):
  - **N & N (Neck & Nose)** — larger image + shadow + rounded corners
  - **N & F (Neck & Facial)** — larger image + shadow + rounded corners

**AI Image Prompts (Signature Cards)**:
- **N&N (replaces `herb.webp`)**:
  > "Close-up of gentle neck acupuncture treatment with thin needles, warm ambient lighting, professional medical setting, soft focus background, calming atmosphere, photorealistic, no face visible, horizontal orientation"
- **N&F (replaces `acupuncture.webp`)**:
  > "Facial rejuvenation acupuncture, cosmetic acupuncture needles on face, soft studio lighting, professional spa environment, photorealistic, close-up view, no text overlay, horizontal orientation"

### 3.5 Patient Reviews (Light Background `#FBF8F3`)

- **New section.**
- **Title**: "What Our Patients Say"
- **Layout**: 3-column card grid on desktop, 1-column on mobile.
- **Cards**:
  - White background, subtle shadow, left border accent (sage green).
  - 5-star rating (SVG icons).
  - Quote text.
  - Name / initials (e.g., "— J.K.")
- **Placeholder Reviews** (to be replaced with real testimonials later):
  1. "Dr. Lee treated my chronic migraines and I feel so much better after just a few sessions." — J.K.
  2. "I've been coming here for my allergies and the N&N treatment really works." — S.P.
  3. "Professional, caring, and knowledgeable. Highly recommend." — M.R.
  4. "The facial treatment reduced my wrinkles and relieved my neck pain at the same time." — A.L.

### 3.6 Contact Us (Light Background `#FBF8F3`)

- **Layout**: Two-column grid.
  - **Left**: Contact info (address, phone, email) + two large CTA buttons.
  - **Right**: Clinic hours table + "Sunday: Appointment Only" emphasis.
- **CTA Buttons**: "Call Now" (sage green, large) + "Email Us" (outline, large).
- **Map**: Full-width Google Maps embed below (retain current).

### 3.7 Floating CTA

- **Position**: Fixed bottom-right corner.
- **Icon**: Phone icon inside a circular sage-green button.
- **Behavior**: Links to `tel:+17186311060`.
- **Visibility**: Hidden when near top (scrollY < 200px), fades in after scrolling down.
- **Rationale**: Mobile users can call with one thumb tap without scrolling back to the top.

### 3.8 Footer

- **Text**: "© 2013–2026 Dr. Lee's Acupuncture Clinic"
- **Links**: Dr. Lee & Clinic | Conditions | Reviews | Contact (anchor links)
- **Background**: `#F4EFE7`, top border.

## 4. File Structure

```
index.html              — redesigned single page
css/style.css           — redesigned styles
js/init.js              — JS with floating-CTA logic added, other features preserved
img/
  hero-bg.webp          — AI-generated hero background (NEW)
  signature-nn.webp     — N&N signature image (NEW, replaces herb.webp)
  signature-nf.webp     — N&F signature image (NEW, replaces acupuncture.webp)
  dr_soongho_lee.webp   — existing, retained
  sla_logo.png          — existing, retained
  favicon.ico           — existing, retained
  favicon-32x32.png     — existing, retained
  apple-touch-icon-180x180.png — existing, retained
```

## 5. Technical Details

| Concern | Detail |
|---------|--------|
| **CSS Architecture** | Custom Properties in `:root` for all tokens. Grid + Flexbox layout. No framework. |
| **Breakpoints** | 480px, 768px, 1024px |
| **Scroll Animations** | IntersectionObserver-based reveal (current method). CSS `animation-range` progressive enhancement retained. |
| **Email Obfuscation** | Current JS method preserved (assemble `cmdslee@gmail.com` at runtime). |
| **Accessibility** | Semantic HTML5, ARIA landmarks, skip link, focus-visible styles, reduced-motion media query. |
| **SEO** | Schema.org LocalBusiness JSON-LD retained. Meta description, Open Graph tags retained. Canonical link retained. |
| **Performance** | Images served as WebP where possible. Lazy loading on non-hero images. No external JS libraries. |
| **No Build Step** | Files edited directly; `git push` deploys to GitHub Pages instantly. |

## 6. Self-Review Notes

- **Placeholder content**: Patient reviews are placeholders and must be replaced with real testimonials later. The spec makes this explicit.
- **AI images**: The hero and signature-card images are generated via the provided prompts. The user must run the prompts (GPT-5.5, DALL-E, Midjourney, etc.) and save the outputs to `img/`.
- **No contradictions**: All sections use the same color palette and typography. The dark/light section alternation creates rhythm without breaking consistency.
- **Scope**: Single-page vanilla site. Appropriate scope for one implementation plan.
- **Ambiguity**: None. Every section has explicit layout, content, and styling guidance.

## 7. Implementation Plan Transition

This spec is ready for the `writing-plans` skill to produce a concrete task-by-task implementation plan.
