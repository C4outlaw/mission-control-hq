# cravburgers.shop — Page Topology (extracted 2026-07-04, desktop 1440×900)

Framework: Next.js + Tailwind + Lenis 1.3.23 + Framer Motion. Total page height ~10,807px. No WebGL/Three.js — the "3D" feel is scroll-driven transforms, giant vw-typography, and layered cutout PNGs.

## Global fixed layers (z-order top→bottom)
1. **Mouse-trail layer** — `fixed inset-0 pointer-events-none` (desktop only). Contains an SVG path that redraws following the cursor + 4 cutout PNG stickers stacked at the cursor position with staggered follow (z 10000→9997, each `translate(-50%,-50%) translate(Xpx,Ypx) rotate(...)`).
2. **Menu overlay** — `fixed inset-0 z-998 bg-red/30 backdrop-blur-md` (hidden until menu opens).
3. **Floating bottom dock** — `fixed bottom-[2vw] left-1/2 -translate-x-1/2 z-997 w-[32vw]` (~109px tall): pill-shaped nav with links + CTA.

## Flow sections (top → bottom)
| # | id | bg | h | interaction model |
|---|----|----|---|---|
| 1 | `#hero` | beige #f5e3cd | 100vh | load-in animation; giant H1 (30vw, 2 lines) + 40vw centerpiece image absolutely centered + 15vw Modak arched logotype; corner paragraphs bottom row; sticker labels |
| 2 | `#about` | beige | ~1300px | scroll-into-view reveals; pill tag, 15vw H2 (3 lines), paragraph, CTA pill, 3 tilted photo cards (rotate ≈ -6°/3°/8°) |
| 3 | experience wrapper | red #f91814, wave top+bottom | ~2100px, `-mt-[15vw]` overlap | scroll-driven: cream 15vw H2, sticker labels, centerpiece image w/ googly eyes scales up on scroll; two stat columns fly in (3 lines each side) |
| 4 | video wrapper | — | 160vh | full-bleed background media (sticky viewport while wrapper scrolls) |
| 5 | `#ingredients` | beige, wave top | ~800px | 15vw red H2; floating cutout PNGs parallax at different scroll rates around the text |
| 6 | `#map-desktop` | mustard #ffd750, wave top | ~2350px | dashed SVG flight path (stroke #F4A804, dasharray 42px) drawn across section; 5 city polaroid photos alternating sides w/ red city sticker labels; plane PNG travels along path on scroll |
| 7 | `#cta` | beige, wave top | ~1160px | sticker tag, 15vw red H2 left + paragraph + CTA pill; large photo right; engraved-style mascot sticker overlap |
| 8 | `footer` | beige | ~900px | nav links row + copyright + tagline line; giant Modak logotype (~30vw) with face details; falling cutouts parallax |

Wave dividers between color changes: inline SVG `viewBox="0 0 1536 300"`, S-curve path, `fill` = the *adjacent* section色, absolutely positioned `z-99 w-full left-0 right-0 overflow-x-clip` at the section boundary (one wave per transition, fill matches the section it "bleeds" from).

## MyrieHQ mapping (build target: /experience route)
hero→"BOLD BRANDS"+MYRIE logotype; about→services+3 work cards; experience→"WORK THAT FEELS GOOD"+stats; video→beachbucket-featured.mp4; ingredients→"STACKED WITH EVERYTHING YOU NEED"+floating service emoji stickers; map→"GREAT WORK TRAVELS FAR"+FL cities polaroids; cta→"READY TO GROW"; footer→giant MYRIE.
