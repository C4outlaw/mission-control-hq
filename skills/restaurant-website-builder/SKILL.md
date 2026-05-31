---
name: restaurant-website-builder
description: "Restaurant website template skill — replicate the Beach Bucket #2 layout (luxury Bodoni + Jost typography, hero video, time-of-day signature swap, mobile slideshow carousel, gallery lightbox, gift cards, FAQ, contact, full menu wall, mobile bottom Call/Directions/Order bar). Use when the user asks to build a new restaurant website, clone the Beach Bucket layout for another restaurant, or 'use the restaurant template'. Stack: Vite + vanilla JS + CSS, deployed as a subpath under a Next.js public/ folder (or any static host)."
---

# Restaurant Website Builder

A drop-in template skill for spinning up a luxury restaurant single-page site that matches the **Beach Bucket #2** design language and feature set. Swap content blocks (dishes, photos, branding, hours) and the site is ready to deploy.

## When to use

- User says: "build a restaurant website", "use the restaurant template", "clone Beach Bucket for [other restaurant]", "spin up a site for [restaurant name]".
- Any oceanfront / casual-fine / brunch / bar-and-grill site where the owner wants: hero video, menu wall, time-of-day signature swap, dish gallery, gift cards, contact section.

## When NOT to use

- Multi-page sites with routing (use Next.js directly).
- Reservation / POS / ordering platforms (this is a marketing site).
- Headless CMS-driven restaurants (this is JS-data driven, not Sanity/Contentful).

## What the template provides

### Visual & layout
- **Typography:** Bodoni Moda (display, italic accents) + Jost (sans body). Imported from Google Fonts.
- **Palette:** cream `#faf6ef`, ocean `#0c3c49`, coral `#e8693c`. Override per brand.
- **Container:** fluid (`clamp(16px, 1vw, 22px)` root font), widens at 1700px/2400px breakpoints.
- **Sections:** Hero video → Intro → Menu (Signatures + Full Wall) → Gallery → Gift Cards → FAQ → Contact.

### Single top bar
Brand logo · social icons · hamburger · quick-nav (Home/Menu/Breakfast/Lunch-Dinner/Gallery) · Location · Print Menu. Hamburger dropdown floats absolute and re-opens via inline-style JS (CSS cascade bypass — see Gotchas).

### Mobile collapse
At `max-width: 820px`:
- Topbar drops to **brand · Home/Breakfast/Lunch-Dinner pills · hamburger**. Social, full nav, Location/Print all move into the hamburger dropdown.
- Sticky topbar.

### Menu engineering
- "Signature Dishes" featured grid (3×3 = 9 cards) above the full menu wall.
- No `$` symbols, no dotted leaders.
- De-emphasized prices (lighter weight).
- Full plate visible (`object-fit: contain` for white-bg dish photos; `cover` for scenery).

### Time-of-day signature swap (autonomous)
Two grids in DOM (`#sigBreakfast`, `#sigLunch`). A single `timeMode()` reads America/New_York time and toggles `[hidden]`. Re-checks every 60 seconds.

```
07:00 – 11:00 → Breakfast 9
11:01 – 21:00 → Lunch & Dinner 9
21:01 – 06:59 → Breakfast 9 (closed-hours default)
```

Override the breakfast window per restaurant in `timeMode()`.

### Mobile slideshow carousel
Signature cards become a one-card-per-screen swipe carousel at `max-width: 640px`:
- `scroll-snap-type: x mandatory` + `scroll-snap-align: start`
- Full image visible (`object-fit: contain`, `max-height: 56vh`)
- **Auto-advances every 2.5s**, loops 1→N→1
- Dots indicator below; tap to jump
- Swipe/touch pauses auto-advance for 7s

### Mobile bottom bar
Fixed `Call · Directions · Order` action bar at viewport bottom, safe-area-aware padding.

### Gallery + lightbox
Category filter pills (All / Breakfast / Lunch / Drinks / Atmosphere). Click any card to open a centered fullscreen lightbox sized to `94vw × 80vh` (no crop). Captions sit below the image, no dark gradient overlay.

### Other modules ready to use
- **Print Menu (PDF)** link — drop a PDF at `public/assets/menu/food-menu.pdf`.
- **Clickable gift card amount pills** ($15 / $25 / $50 / $100) with recipient form scaffolding.
- **FAQ accordion**.
- **Contact section** with phone, address, hours, map embed slot.

## Project structure

```
restaurant-site/
├── index.html              ← <base href="/<deploy-subpath>/" /> required for subpath deploys
├── vite.config.js          ← base: process.env.SITE_BASE || './'
├── package.json
├── public/
│   └── assets/
│       ├── beachbucket-logo-mascot.png          ← swap: brand mascot
│       ├── beachbucket-logo-full.jpg            ← swap: brand wordmark
│       ├── hero-video.mp4                       ← swap: hero loop
│       ├── venue/patio-dusk.jpg                 ← swap: hero poster
│       ├── dishes/breakfast/*.jpg               ← swap: breakfast dishes
│       ├── dishes/lunch/*.jpg                   ← swap: lunch dishes
│       ├── dishes/drinks/*.jpg                  ← swap: drinks
│       └── menu/food-menu.pdf                   ← swap: PDF menu
└── src/
    ├── main.js             ← all content + render + handlers
    └── style.css           ← all styles
```

## How to build a new restaurant site from this template

1. **Copy the template** under a new directory (e.g. `Desktop/<restaurant>-site`). The current best source-of-truth is `C:/Users/email/OneDrive/Desktop/beachbucket-site/`.
2. **Swap brand assets** in `public/assets/`:
   - `<brand>-logo-mascot.png` — square mascot for intro
   - `<brand>-logo-full.jpg` — wordmark for topbar (transparent recommended)
   - `hero-video.mp4` — 8–15 second silent loop
   - `venue/<your-photo>.jpg` — hero poster fallback
3. **Edit `src/main.js`** content blocks:
   - `SIGNATURES_BREAKFAST` — array of 9 `{name, img, blurb, price}` items
   - `SIGNATURES_LUNCH` — array of 9 `{name, img, blurb, price}` items
   - `menuSections` — full menu (Omelettes, Benedicts, Entrees, etc.)
   - `dishCarouselItems` — Our Dishes carousel
   - `galleryItems` — gallery photos with `category` field
   - `faqs`, `giftCardAmounts`, `contact` (phone, address, hours, mapHref)
   - Header: brand alt text, social URLs, Order Online URL
4. **Restaurant-specific copy**: tagline, intro paragraph, menu notes (toast choices, cheese choices, raw-meat disclaimer).
5. **`timeMode()`**: adjust breakfast hours if different from 7–11 AM ET.
6. **Tokens in `src/style.css`**: edit `:root { --cream, --ocean, --coral, ... }` for the new brand.
7. **`vite.config.js`**: confirm `base` matches the deploy subpath (e.g. `/my-restaurant/`). For root-domain deploys use `./`.
8. **`index.html`**: update `<base href="/<deploy-subpath>/" />` to match. Update `<title>`, meta description, canonical, OG/Twitter cards.

### Build & deploy

```powershell
# Local preview
npm install
npm run dev        # http://127.0.0.1:5173

# Production build
MSYS_NO_PATHCONV=1 SITE_BASE=/<deploy-subpath>/ npm run build

# Static-host deploy: copy dist/* to your host
# Next.js public/ subpath deploy: copy dist/* into public/<deploy-subpath>/
```

## Gotchas (learned from Beach Bucket build)

1. **Subpath base + relative img paths.** Vite-emitted asset URLs are rewritten by `base`, but **hard-coded string image paths in JS are not**. Use `<base href="/<subpath>/" />` in `index.html` so all relative URLs resolve correctly. Putting the base as a *static* element (not `document.createElement('base')`) is required — programmatically-appended `<base>` elements are ignored by some browsers.

2. **Trailing-slash subpath redirects.** If your host (Vercel/Netlify) redirects `/my-site` → `/my-site/` (or strips the slash), relative `./assets/` will resolve against the wrong base. The static `<base href>` solves this.

3. **Windows + Git Bash + env vars.** `BB_BASE=/beach-bucket-2/` gets mangled by MSYS path translation into `/Program Files/Git/beach-bucket-2/`. Prefix the command with `MSYS_NO_PATHCONV=1`.

4. **`hidden` attribute vs `display: flex !important`.** When a carousel grid uses `display: flex !important`, it overrides the `hidden` attribute. Add `.menu-feature[hidden] { display: none !important; }` and target visible siblings with `.menu-feature:not([hidden])`.

5. **Vite dev HMR on OneDrive.** OneDrive-synced project folders intermittently serve stale CSS through Vite dev. Verify with `npx vite preview --port 4174` against the production build.

6. **CSS cascade weirdness on the floating nav dropdown.** Setting `opacity: 0 → 1` via class toggle sometimes fails to commit in production builds. Bypass with inline-style JS (`primaryNav.style.opacity = open ? '1' : '0'`) and friends.

7. **OneDrive Pictures for source dish images.** Photo pipeline lives at `OneDrive/Pictures/THE BEACH BUCKET IMAGES/`. To generate new dish photos via ChatGPT GPT, see `templates/PHOTO_PIPELINE.md`.

## Reference files

See `templates/` for ready-to-copy starting points:

- `templates/index.html` — full HTML scaffold with `<base>`, meta, fonts
- `templates/main.js.skeleton` — render functions, slideshow JS, time-mode JS, nav handlers
- `templates/style.css.skeleton` — tokens, topbar, menu, carousel, slideshow dots, mobile breakpoints
- `templates/vite.config.js` — base-from-env
- `templates/package.json` — Vite vanilla setup
- `templates/PHOTO_PIPELINE.md` — Beach Bucket Menu Photo GPT workflow for generating dish images
- `templates/CONTENT_CHECKLIST.md` — every place that needs restaurant-specific copy/imagery

## Verified live reference

Beach Bucket #2 at `https://myriehq.com/beach-bucket-2/` (built with this exact pattern, May 2026).
