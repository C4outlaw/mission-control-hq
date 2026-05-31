# Dish Photo Pipeline

Generates clean white-background dish images for the site via a ChatGPT custom GPT.

## Pipeline

1. Source photo → upload to **"The Beach Bucket Menu Photo creator"** GPT
2. GPT produces a 1254×1254 commercial food-photography output on pure white
3. Saved to `OneDrive/Pictures/THE BEACH BUCKET IMAGES/Beach Bucket/Menu Dishes/<slug>.jpg`
4. Copy into the site's `public/assets/dishes/<breakfast|lunch|drinks>/<slug>.jpg`

## Run for one dish

```powershell
cd "C:/Users/email/OneDrive/Pictures/THE BEACH BUCKET IMAGES/automation"
node _menu_drive.mjs <key> "<source-filename>.jpg" "<Dish Title>" "<dest-filename>.jpg" "<EXTRAS>"
```

- `<source-filename>` — must exist at `Break Fast Picture/Output/_src/<source-filename>`
- `<dest-filename>` — what to save (matches site path)
- `<EXTRAS>` — natural-language modifications to the source (e.g. "replace ham with shredded blue swimming crab; no green garnish")

## Hard rules baked into the GPT prompt

- Output ONLY the dish, pure white background, no text/logos/branding
- Whole plate inside frame with margin, no edge cropping
- Fresh just-served look (glossy sauces, crisp greens, golden bread)
- Square 1:1, slight top-down or 3/4 angle

## Requirements

- Chrome Profile 5 (Tyrese Light) launched with `--remote-debugging-port=9222`
- Signed in to chatgpt.com on that profile
- Playwright installed at `OneDrive/Pictures/THE BEACH BUCKET IMAGES/automation/node_modules`

## Failure modes

- "TIMEOUT waiting for image" → GPT didn't finish in 12 minutes; retry with smaller EXTRAS prompt
- ChatGPT logged out → CDP redirects to accounts.google.com; sign in manually then re-run
- Image limit reached → wait for daily reset (typically ~16:45 ET)
