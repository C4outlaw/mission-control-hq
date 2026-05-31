# Restaurant Site Content Checklist

Every place to swap when cloning the template for a new restaurant.

## Brand
- [ ] `<title>` + meta description + canonical + OG/Twitter (`index.html`)
- [ ] Brand mascot logo `public/assets/<brand>-logo-mascot.png` (intro)
- [ ] Brand wordmark `public/assets/<brand>-logo-full.jpg` (topbar)
- [ ] Theme colors in `src/style.css` `:root` (--cream, --ocean, --coral)
- [ ] Hero video `public/assets/hero-video.mp4` (8–15s silent loop)
- [ ] Hero poster fallback `public/assets/venue/<photo>.jpg`

## Restaurant info
- [ ] Tagline (intro section)
- [ ] One-paragraph intro lead
- [ ] Phone number — used in `tel:` for mobile Call button + contact
- [ ] Address — used in maps link for Directions + contact
- [ ] Hours — contact section + `timeMode()` breakfast window
- [ ] Order online URL (in nav + bottom bar)
- [ ] Social URLs: Facebook, Instagram, TikTok, X (top bar + nav dropdown)

## Menu data (`src/main.js`)
- [ ] `SIGNATURES_BREAKFAST` — 9 items: `{name, img, blurb, price}`
- [ ] `SIGNATURES_LUNCH` — 9 items: `{name, img, blurb, price}`
- [ ] `menuSections` — every section (Omelettes, Benedicts, Entrees, Salads, Sides, Starters, Desserts, Beverages…)
- [ ] `dishCarouselItems` — Our Dishes carousel (if used)
- [ ] `galleryItems` — gallery photos w/ `category: breakfast | lunch | drinks | atmosphere`
- [ ] `faqs` — FAQ accordion items
- [ ] `giftCardAmounts` — clickable amount pills
- [ ] Menu notes (toast options, cheese options, raw-meat disclaimer)

## Dish photography
- [ ] Breakfast dish JPGs in `public/assets/dishes/breakfast/` (white-bg, plate centered, no cropping)
- [ ] Lunch dish JPGs in `public/assets/dishes/lunch/`
- [ ] Drinks JPGs in `public/assets/dishes/drinks/`
- [ ] Venue / atmosphere photos in `public/assets/venue/`
- [ ] PDF menu at `public/assets/menu/food-menu.pdf`

## Behavior
- [ ] `timeMode()` breakfast window adjusted (default 7:00–11:00 ET)
- [ ] Time zone string in `timeMode()` (default `America/New_York`)
- [ ] Slideshow auto-advance speed (default 2500ms)
- [ ] `vite.config.js` `base` set to deploy subpath (or `./` for root)
- [ ] `index.html` `<base href="...">` matches the same subpath

## Deploy
- [ ] Build verified locally (`npm run build`, then `vite preview`)
- [ ] Asset URLs in `dist/index.html` use the correct subpath
- [ ] Hosting target (Vercel/Netlify/GH Pages/Next.js public/) confirmed
- [ ] HTTPS canonical URL set in meta
