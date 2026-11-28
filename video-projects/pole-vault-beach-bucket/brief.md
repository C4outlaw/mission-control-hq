# Brief: Pole Vault to the Beach Bucket

**Pipeline:** `dramaclaw-local` (Grok in Myrie's logged-in debug Chrome, then ffmpeg and Remotion). Copy this folder to `C:/Users/email/dramaclaw-local/projects/pole-vault-beach-bucket/` and run from stage 2.

## Source
- Reel: https://www.instagram.com/reel/DdZC5ElxwpV/ by **Middleton Ford** (`middletonford`), about **785K likes** and 4.6K comments.
- Local copy for reference: `yt-dlp --cookies-from-browser chrome -o "source/reel.mp4" "https://www.instagram.com/reel/DdZC5ElxwpV/"`
- 1080x1920, 30 fps, 37 s. Bright stylized 3D "what if" physics explainer, a calm narrator voice, and white word captions at the lower third. Red measurement callouts ("14 ft", "1,815 ft", "2,000 ft", "4 ft", "200 ft/sec").

### Original narration (from the burned-in captions)
> If you try to pole vault over the Empire State Building, you would fly up about 20 ft before smashing into it. Now if you dug a giant slot in front, and ran faster than a race car while hugging a pole that's almost 2,000 feet long and four feet thick, you could plant it into the slot, and the pole would snap back, sending you flying at hundreds of feet per second. You would then fly across the country and land safely at Middleton Ford, where you can then drive away in your brand new F-150.

### Why it works
- It opens as a pure science-curiosity video, so nobody scrolls past it as an ad.
- The escalation keeps getting more absurd (the slot, race-car speed, a 2,000 ft pole), and the measurements make it feel real.
- **The twist:** the hypothetical lands at the business. The ad is the punchline, so people share it instead of skipping it. That's why it hit 785K likes.

## The Beach Bucket version
Same 3D style, same pacing and same first 27 seconds of narration. Only the landing changes: he flies **down the East Coast** and lands on the Beach Bucket's oceanfront deck in **Ormond Beach, FL**, then orders the **famous Bloody Mary**.

- Last ~6 s: **real Beach Bucket footage or photos**, the way the original switches to real dealership and truck footage at 30.6 s. Repo assets: `beachbucket-site/public/assets/hero-video.mp4`, `atmosphere-sunset-1.jpg`, `atmosphere-sunset-2.jpg`, `hero-beachbucket-premium.jpg`, drink cards in `assets/dishes/drinks-cards/`, logo `assets/beachbucket-logo-full.jpg`. Better: a fresh 5-second phone clip of a Bloody Mary set down on the deck with the ocean behind it.
- Brand colors (from the site): teal `#0b6f86`, coral `#ff8a5f`, sky `#e6f1f7`.

## Specs
- 9:16, 1080x1920, 30 fps, 35-38 s.
- Narration: local TTS (calm, slightly amused male voice, like the original) or Myrie records it. Whisper captions, styled to match the original (white, bold, black outline, lower third).
- Red measurement callouts and the map flight are done in Remotion.
- **No posting without Myrie's explicit OK.** If it goes to the Beach Bucket Facebook, it goes through Content 360 like the daily posts, only after he approves.
