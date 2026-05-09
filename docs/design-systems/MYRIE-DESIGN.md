# MyrieHQ Design System — Apple × Runway Fusion

> Inspired by `apple/DESIGN.md` (light editorial backbone) + `runwayml/DESIGN.md` (cinematic dark portfolio reveals). The Fraunces editorial display + warm gold accent stay as MyrieHQ's brand spine.

## 1. Visual Theme & Atmosphere

A premium agency portfolio rendered as a **museum gallery that occasionally cuts to a film reel**. Light Apple-grade tiles (white + parchment) carry the marketing copy, services, process, contact — the "reading" surfaces. Every third section drops to a cinematic Runway-style dark canvas where photography and video become the UI: case studies, portfolio reveals, the magazine showcase, the drink-ad reel.

The rhythm is the design: light → light → DARK CINEMATIC → light → light → DARK CINEMATIC. The dark section change itself acts as the divider — no decorative borders required.

**Key Characteristics:**
- Apple-style restraint on light surfaces: massive whitespace, hairline borders, single-tone ink.
- Runway-style cinematic dark sections used as deliberate punctuation, not as the dominant surface.
- Fraunces editorial serif for h1/h2 headlines (MyrieHQ's distinguishing voice — Apple uses SF Pro, we use Fraunces because hospitality/agency reads warmer than tech).
- One blue-equivalent accent: warm gold (#b08a3e) replaces Apple's Action Blue. Reserved for ScrollProgress, link underlines, and one accent moment per page.
- Zero shadows on dark sections (Runway rule). Whisper-soft elevation on light tiles only (Apple's single drop-shadow rule).
- Two button grammars: pill glass-morphic (CTAs) + utility radius `sm` (nav/inline).

## 2. Color Tokens

```css
/* LIGHT (Apple) */
--canvas:           #ffffff;       /* dominant */
--canvas-parchment: #f5f5f7;       /* alternating light tile */
--surface-pearl:    #fafafc;       /* secondary ghost button fill */
--ink:              #0a0a0a;       /* near-black headlines */
--ink-2:            #1d1d1f;       /* body */
--muted:            #6e6e73;       /* secondary text */
--muted-2:          #a3a3a8;       /* tertiary */
--hairline:         rgba(10,10,10,0.08);

/* DARK CINEMATIC (Runway) */
--cinema-black:     #000000;       /* hero / mission moment */
--cinema-tile-1:    #0c0c0c;       /* primary dark surface */
--cinema-tile-2:    #1a1a1a;       /* card on dark */
--cinema-border:    #27272a;       /* near-invisible border */
--cool-slate:       #767d88;       /* secondary text on dark — cool, not warm */
--mid-slate:        #7d848e;       /* tertiary text on dark */

/* BRAND ACCENT (MyrieHQ) */
--warm:             #b08a3e;       /* warm gold — single accent */
--warm-soft:        #f5e9d3;       /* cream pop, sparingly */
```

**Rule:** the warm gold appears at most three times per page (ScrollProgress, one link underline cluster, one editorial italic word). Everything else is monochrome.

## 3. Typography

| Role | Font | Size | Weight | Line | Tracking |
|------|------|------|--------|------|----------|
| Hero display | Fraunces | clamp(3.4rem, 6.5vw, 6rem) | 500 | 1.02 | -0.035em |
| Section h2 | Fraunces | clamp(2.4rem, 5vw, 4.4rem) | 500 | 1.04 | -0.038em |
| Cinema h2 (dark) | Fraunces | clamp(2.4rem, 5vw, 4.4rem) | 500 | 1.0 | -0.04em |
| Lead | Inter | clamp(1.1rem, 1.4vw, 1.3rem) | 400 | 1.55 | -0.012em |
| Body | Inter | 16px | 400 | 1.5 | -0.011em |
| Eyebrow / nav-label | Inter | 12px | 600 | 1.0 | 0.16em UPPERCASE |
| Cinema label (dark) | Inter | 14px | 500 | 1.25 | 0.35em UPPERCASE — Runway weight 500 |

Italic Fraunces handles the one editorial accent word per heading.

## 4. Components

**Cinematic Section (Runway).** Full-bleed, `--cinema-tile-1` background, white headline at Fraunces 500, lead in `--cool-slate`. Zero shadows, optional `1px solid --cinema-border` only on alert containers. Photography or video fills the section — the image IS the UI. Padding: 144px top/bottom desktop, 80px mobile.

**Light Tile (Apple).** White or `--canvas-parchment` background. Hairline border `1px solid --hairline` on cards. Border-radius 22px (cards), 18px (utility), 999px (pills). Padding 32–80px. The signature single drop-shadow appears only on a product/portfolio image resting on a tile: `0 3px 5px 30px rgba(0,0,0,0.22)`.

**Glass Pill Button (existing, retained).** The Vision Pro language already in marketing.css is on-brand and stays. On dark cinematic sections, switch to dark glass variant (`.ti-btn.primary` already supports this).

**Eyebrow.** Tight uppercase 12px, `--muted` on light, `--cool-slate` on dark, `0.16em` letter-spacing. The em-dash prefix (`— SERVICES`) carries the editorial mark.

## 5. Layout

- 4pt spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 144 / 192 / 256.
- Section padding: 144px desktop / 80px mobile (matches Apple's section: 80px scaled up for editorial feel).
- Container: `min(1200px, 100% - 48px)` for reading sections; full-bleed on cinematic sections.
- Border radius: pills (999px) for CTAs, 22px for cards, 18px utility, 8px image cards in dark sections (Runway rule), 0px for full-bleed tiles.

## 6. Section Rhythm (the prescription)

For the homepage, this is the order that delivers the premium feel:

1. **Hero** — light parchment, Fraunces hero display, glass pill CTAs, Waterfall canvas overlay (existing).
2. **Stats strip** — light, hairline-divided, Inter only.
3. **Services** — light card grid, hairline borders, no shadows.
4. **Showcase magazine** — **CINEMATIC DARK** — full-bleed `--cinema-tile-1`, white Fraunces h2 "Selected Work", BookFlip floats inside, cool-slate caption underneath. This is the Runway moment.
5. **Featured projects** — light parchment, asymmetric image grid (Runway-style mixed-size).
6. **Magic Menu try-app** — light, hairline iframe frame.
7. **Testimonials** — **CINEMATIC DARK** — black canvas, large Fraunces italic quote in white, attribution in cool-slate. The "mission statement" Runway moment.
8. **Process** — light, numbered steps, hairline dividers.
9. **About** — light parchment.
10. **Contact** — light, single warm-gold link underline (the one accent moment), glass primary CTA.
11. **Footer** — light parchment (Apple footer rule), hairline-divided 5-column.

## 7. Do / Don't

**Do**
- Alternate light/dark sections deliberately — the cinematic break carries weight only if rare.
- Use Fraunces for all h1/h2 — that's the brand spine.
- Use cool-slate (#767d88) for secondary text on dark; warm `--muted` on light. Never mix.
- Keep the warm gold count ≤3 per page.
- Photography on dark sections must be cinema-quality. Anything less and the section reads cheap.

**Don't**
- Don't add shadows on dark sections (Runway rule).
- Don't pill-shape Runway-style cards — keep small radius (8px) on dark image cards.
- Don't use the warm gold on dark — it muddies. Stick to white + cool-slate on dark.
- Don't use Inter for h2 — Fraunces is the differentiator vs Apple/Runway who both use a single sans.
- Don't add gradient backgrounds anywhere (Runway rule, also Apple rule).

## 8. Agent Prompt

> "Use `docs/design-systems/MYRIE-DESIGN.md` as the design system. Light sections follow Apple's editorial restraint with Fraunces headlines and a hairline-bordered card grid. Cinematic dark sections follow Runway: black canvas, full-bleed photography, zero shadows, cool-slate secondary text, white Fraunces h2 with -0.04em tracking. The warm gold (#b08a3e) appears at most three times per page."
