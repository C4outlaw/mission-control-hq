# Etsy Search-Results Page — Clone Specification

Source: `https://www.etsy.com/search?q=jamaica%20shirt&ref=search_bar`
Extracted live via `getComputedStyle()` in the in-app browser pane, 2026-08-29, viewport 1280px.
(agent-browser/CDP was IP-blocked with "Access is temporarily restricted"; the in-app pane loaded fine.)

## Scope
Retrofit onto `myriehq.com/store`. **The hero section is untouched** (dark cinematic video +
marquee). Everything below the hero adopts the Etsy results-page system.

## Design tokens (exact, from computed styles)

| Token | Value |
|---|---|
| Page background | `rgb(250, 248, 245)` → `#FAF8F5` |
| Body text | `rgb(49, 43, 54)` → `#312B36` |
| Muted text | `rgb(102, 94, 92)` → `#665E5C` |
| Price green | `rgb(64, 98, 33)` → `#406221` |
| Font stack | `ABCDiatype, -apple-system, "Helvetica Neue", "Droid Sans", Arial, sans-serif` (ABCDiatype is Etsy-licensed — we fall back to the same public chain) |
| Container padding | `0 18px`, no max-width cap |

## Grid

- Container: `UL`, `display:flex`, `flex-wrap:wrap`, `margin:-9px`, width 1247px @1280
- Cell: `LI`, `flex-basis:25%`, `max-width:25%`, `padding:9px` (→ 18px gutters)
- Breakpoints (Etsy `wt-grid__item-*`): `xs-6` = 2 cols · `md-4` = 3 cols · `xl-3` = 4 cols

## Card anatomy

| Element | Computed values |
|---|---|
| Image | `aspect-ratio: 0.8 / 1`, `border-radius: 8px`, `object-fit: cover` |
| Card link | `position: relative`, `transition: box-shadow 0.2s ease-in-out` (hover raises shadow) |
| Title | `14px / 22.4px`, weight `400`, `#312B36`, `margin-top: 6px`, 2-line clamp |
| Shop line | `14px`, weight `400`, `#312B36`, height 18px — "Ad・By ShopName" |
| Price | `16px / 25.6px`, weight `700`, `#406221`, `letter-spacing: -0.16px` |
| Original price (strike) | `13px / 20.8px`, weight `400`, `#312B36`, `line-through` |
| Discount | `13px / 20.8px`, `#665E5C` — format `(20% off)` |
| Free shipping | `13px / 16px`, `letter-spacing: 0.12px`, `#312B36` |

Verbatim card text order from the live DOM:
`title` → `Ad・By PremiumSportswear` → `Sale Price $20.00` → `$20.00` → `$25.00` →
`Original Price $25.00` → `(20% off)` → `Add to cart` → `More like this`

→ Etsy DOES surface a quick **Add to cart** on the results card. Our size `<select>` +
Add-to-cart live in that same slot, so checkout keeps working without listing pages.

## Filter / sort bar

- Filter pills: `height 36px`, `border-radius 18px`, `padding 9px 15px`, `font-size 14px`, transparent bg
- Sort + category pills: `border-radius 24px`, `padding 9px 15px`, `height 36px`, `font-size 14px`
- Live facet labels on the target page: `Ships from near …`, `Under $50`, `Arrives within 7 days`,
  `Pride`, `Independence`, `Reggae`, `Flag`, `Crest`, `One Love`, `Vintage`, `Graphic`, `Unisex`,
  `Independence Day`, `Black History Month`
- Sort control: `Most relevant`
- Left filter rail (`#collapsible-filter-rail-preact-root`) is `wt-hide-xs wt-show-lg` — **width 0 at
  1280px**. At this breakpoint the horizontal pill row IS the filter UI. Rail only appears ≥lg.

## Interaction model

**Static + click-driven.** No scroll-driven state on the results grid. Card hover raises a
box-shadow (0.2s ease-in-out). Filter pills are click-to-toggle. Sort is a click-to-open menu.

## Data honesty constraints (deliberate deviation)

Etsy cards carry star ratings, review counts, "Bestseller" badges, and strikethrough
compare-at prices. **We do not fabricate these** — inventing reviews or fake original prices on
a live store that takes real money is deceptive (and compare-at pricing is FTC-regulated).
The markup and CSS for each slot are built to Etsy's exact spec and render only when a real
value is present:

- `rating` / `reviews` — omitted until real order/review data exists
- `compareAt` — omitted until Myrie sets a genuine former price
- `badge` — omitted until backed by real sales rank
- `freeShipping` — flag, default off; flip on when the shipping policy is actually free

Layout is identical either way; the rows simply collapse.

## Responsive

- Desktop ≥1200px: 4 columns
- Tablet 768–1199px: 3 columns
- Mobile <768px: 2 columns (Etsy stays 2-up on phones, it does not go single-column)
- Filter bar scrolls horizontally on overflow at every width

---

# Listing View + Lightbox Specification

Source: `etsy.com/listing/789680039/...` — extracted live 2026-08-29, viewport 1280px.
We have no per-listing routes, so this is built as a **full-screen modal** opened by clicking a
result card image, with a nested zoom lightbox.

## Gallery (left column)

| Element | Computed values |
|---|---|
| Main image | displayed `511x537` from a `794x834` source, `object-fit: contain` |
| Thumbnail | `60x60`, `border-radius: 8px` |
| Thumbnail (active) | `border: 2px solid rgb(0,0,0)` |
| Thumbnail count | 9 on the sampled listing |
| Carousel arrows | `48px` wide, `border-radius: 999999px` (full circle), transparent bg |
| Arrow labels | `Previous image` / `Next image` |

## Buy box (right column)

| Element | Computed values |
|---|---|
| Title (`h1`) | `16px / 20px`, weight `400` |
| Price | `16px`, weight `400`, `rgb(49,43,54)` |
| Variant selects | `variation-selector-0` = colour, `variation-selector-1` = size |
| Quantity select | `1`–`27` |
| **Add to cart** | `height 48px`, `border-radius 24px`, `font-size 16px`, weight `700`, `padding 12px 18px`, full width |
| Add to Favorites | `42x42` circular button, `border-radius 24px` |

Sampled option sets — colour: `Select a color / Yellow / Green`;
size: `Select an option / S US letter / M / L / XL / 2X`.

## Lightbox (click the main image)

Trigger: click on the gallery image. Opens `div.image-overlay[role="dialog"]`.

| Property | Value |
|---|---|
| Overlay background | `rgba(63, 63, 63, 0.9)` |
| Position / z-index | `fixed` / `80` |
| Layout | `display: flex`, `justify-content: center` |
| Image | `object-fit: contain`, `max-height: 100%`, `border-radius: 8px` |
| Image source | swaps up to a higher-res file (`1140x1197` vs the page's `794x834`) |
| Thumbnails | 9, carried into the overlay |
| Close button | `48x48`, `border-radius: 24px`, offset `top: 12px`, `right: 27px` |
| Hint text | `Click to zoom` |

**Interaction model:** click-driven throughout. No scroll-driven state anywhere in this view.
