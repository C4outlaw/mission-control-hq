# cravburgers.shop — Behavior Bible (extracted 2026-07-04)

## Design tokens (computed values)
- **Colors:** beige `#f5e3cd` (rgb 245,227,205) · red `#f91814` (rgb 249,24,20) · mustard `#ffd750` (rgb 255,215,80) · gold accent `#f4a804` · ink `#1b1b1b` · white `#fff`
- **Fonts:** `Mouse Memoirs` (display + body, weight 400) and `Modak` (logotype). Both Google Fonts.
- **Display type scale (1440px vp):** H1 hero 432.7px ≈ **30vw**, line-height 0.8em; H2 sections 216.4px ≈ **15vw**, line-height 0.75em; uppercase.
- **Stroke effect:** `-webkit-text-stroke: 14.4px` ≈ **1vw** white (red text on beige) or `rgba(244,168,4,0.3)` (white text on mustard). Rendered as TWO stacked copies of the text (aria-hidden clone behind with stroke; clean copy on top) so the stroke sits *outside* the glyphs.
- **Body/paragraph:** Mouse Memoirs ~1.25vw, color #1b1b1b, line-height ~1.4.
- **CTA pill:** red ellipse-ish (border-radius 50%), white Mouse Memoirs uppercase text, slight -2° rotation, white outline ring; hover: scale 1.05 + rotate wobble.
- **Sticker labels:** small uppercase word(s), red or gold fill, thick white stroke + drop shadow, rotated -8°…+8°, absolutely positioned. Hover: peel/wobble (`sticker-image`/`flap-image` pattern).

## Behaviors
1. **Lenis smooth scroll** — global, v1.3.23, default lerp. All scroll-driven values read from Lenis-driven scrollY.
2. **Mouse-trail (desktop only)** — fixed full-viewport layer: 3-4 cutout PNGs follow the cursor with progressive lag (each one eases toward cursor at decreasing lerp factor → trailing chain), each keeps a fixed rotation offset; plus an SVG polyline redrawn from recent cursor points (quadratic segments), stroke fades out. `pointer-events-none`, hidden below md.
3. **Hero load-in** — H1 lines rise+fade in staggered; centerpiece image drops in with spring overshoot; logotype scales in; stickers pop in (scale 0→1 with back-out easing) delayed ~0.6-1s.
4. **Scroll reveal (all sections)** — headings/cards/paragraphs animate in when entering viewport: translateY(40-80px)→0 + opacity 0→1, ~0.6s ease-out, stagger 0.08-0.15s. Framer Motion `whileInView`, once.
5. **Tilted photo cards (about)** — 3 cards rotate ≈ -6°, +3°, +8°, border-radius ~24px, enter with stagger + slight parallax while scrolling (different translateY rates). Hover: straighten toward 0° + scale 1.03.
6. **Experience centerpiece scale** — wrapper `-mt-[15vw]` overlaps prior section; centerpiece image + googly eyes: `useScroll({target, offset:["start end","center center"]})` → scale ~0.6→1, y 10vw→0. Eyes = two white ellipses w/ black pupils that track the cursor slightly (pupil translate ±20% toward cursor). Stat lines fly in from left/right (translateX ∓80px→0, stagger).
7. **Sticky video** — 160vh wrapper; inner `position: sticky; top: 0; height: 100vh` video `object-fit: cover`, autoplay muted loop playsInline. Enter/exit masked by wave dividers.
8. **Ingredients parallax** — floating cutouts around 15vw text, each with its own `useTransform(scrollYProgress, [0,1], [Ypx_a, Ypx_b])` rate (±60-160px) and rotation drift; text itself reveals per-line.
9. **Map flight path** — full-width SVG path (curvy S loops), `stroke #f4a804, stroke-width ~6, dasharray 42 42, fill none`. Plane sticker translates along path via `offset-path`/`getPointAtLength` driven by section scrollYProgress (also rotates to path tangent). Polaroids (rounded ~20px, slight rotation, shadow) fade/pop in when reached; each has a red sticker city label (white stroke, rotated).
10. **Floating bottom dock** — fixed pill, bottom 2vw, centered, ~32vw wide: white/cream bg, radius-full, nav links + CTA button; shadow; appears after scrolling past hero (translateY 120%→0 spring).
11. **Wave dividers** — static SVGs (no animation), `viewBox 0 0 1536 300`, S-curves, placed absolute at boundaries, fill = bleeding section color, z-99.
12. **Responsive** — breakpoint ~768px: mouse-trail + dock + map-desktop hidden (map-mobile = simple stacked list); display type scales up to 20vw/34vw; tilted cards stack vertical; stat columns become rows under centerpiece.
