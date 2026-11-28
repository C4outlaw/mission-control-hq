# Script: Pole Vault to the Beach Bucket

## STYLE BLOCK (start of every Grok image prompt)
> Bright stylized 3D animation in the style of a viral science "what if" explainer, clean simplified city, saturated sunny daylight, clear cyan sky, slightly cartoonish realistic proportions, vertical 9:16, no text, no captions, no logos, no watermark.

## Characters and props (lock in stage 2 refs)
- **VAULTER:** athletic man, short brown hair, a navy, yellow and red athletic singlet with **no lettering**, black running shorts, yellow spikes. (Optional: make the vaulter Myrie, using `public/images/myrie-headshot.jpg`. Ask Myrie.)
- **POLE:** a yellow and black striped vaulting pole. The giant version is 2,000 ft long and 4 ft thick.
- **TOWER:** a tall Art-Deco skyscraper modeled on the Empire State Building (narration names it; no signage needed).
- **DECK:** the Beach Bucket's oceanfront deck in Ormond Beach (match `beachbucket-site/public/assets/hero-beachbucket-premium.jpg`): tables, umbrellas, the Atlantic, palm trees.

## Narration (VO)
> If you try to pole vault over the Empire State Building, you would fly up about 20 feet before smashing into it. Now if you dug a giant slot in front, and ran faster than a race car while hugging a pole that's almost 2,000 feet long and four feet thick, you could plant it into the slot, and the pole would snap back, sending you flying at hundreds of feet per second. You would then fly all the way down the East Coast and land safely on the deck at the Beach Bucket in Ormond Beach, where you can then cool off with our famous Bloody Mary.

## Beats

| # | time | dur | shot | image_prompt (STYLE BLOCK +) | video_prompt (motion only) | VO | overlays |
|---|---|---|---|---|---|---|---|
| 1 | 0:00-0:03 | 3s | Low tracking shot: the VAULTER sprints down a city street toward the TOWER, pole lowered. | VAULTER sprinting down an empty city avenue carrying a yellow vaulting pole, a huge Art-Deco skyscraper ahead. | Fast sprint toward camera; camera tracks backward. | "If you try to pole vault over the Empire State Building," | — |
| 2 | 0:03-0:05 | 2s | Worm's-eye view up the TOWER's facade. | Worm's-eye view straight up the facade of a massive Art-Deco skyscraper, blue sky. | Slow tilt up. | (cont.) | — |
| 3 | 0:05-0:06 | 1.5s | He plants and rises about 20 ft up the wall. | VAULTER mid-vault beside the skyscraper's base, pole bent, body inverted about 20 feet up. | He rises up the wall, the pole straightens. | "you would fly up about 20 feet" | red bracket "14 ft" growing to "20 ft" |
| 4 | 0:06-0:08 | 2s | He smacks flat into the facade. | VAULTER splatted spread-eagle against the skyscraper's stone facade, a cartoon impact. | Impact, a slight bounce, then he slides down. | "before smashing into it." | — |
| 5 | 0:08-0:12 | 4s | Overhead: excavators dig a giant slot in front of the tower. | Top-down view of a city block where yellow excavators and dump trucks dig a huge rectangular trench in front of a skyscraper. | Excavators dig quickly, the dirt piles up, a time-lapse feel. | "Now if you dug a giant slot in front," | green highlight on the slot area |
| 6 | 0:12-0:15 | 3s | He sprints alongside a red racing car and pulls ahead. | VAULTER sprinting beside a red open-wheel race car on a city street, both a motion blur. | He overtakes the race car; speed lines; dust. | "and ran faster than a race car" | — |
| 7 | 0:15-0:17 | 2s | He runs hugging an enormous pole. | VAULTER running while hugging an enormous yellow and black striped pole that stretches far ahead down the street. | Running, the giant pole bouncing. | "while hugging a pole" | — |
| 8 | 0:17-0:21 | 4s | Along the giant pole, it stretches past the buildings. | Low angle along an enormous yellow striped pole stretching down a city avenue past the buildings, into the distance. | The camera flies along the pole toward its tip. | "that's almost 2,000 feet long and four feet thick," | "1,815 ft" counting to "2,000 ft", then "4 ft" diameter callout |
| 9 | 0:21-0:23 | 2.5s | The tip plants into the slot. | The tip of a giant yellow pole jammed into a huge dirt trench in front of a skyscraper, seen from above. | The pole slams in, dirt bursts, and it starts to bend. | "you could plant it into the slot," | — |
| 10 | 0:23-0:25 | 2s | The pole bends then whips upright, towering over the city. | A giant yellow pole bent into an arc over the city, about to whip upright. | It springs upright violently. | "and the pole would snap back," | — |
| 11 | 0:25-0:27 | 2s | Tiny vaulter flung off the pole's tip into the sky. | A tiny figure launched off the tip of a giant yellow pole high into a bright sky, the city far below. | Launch; speed streaks; the camera follows him. | "sending you flying at hundreds of feet per second." | "200 ft/sec" |
| 12 | 0:27-0:29 | 2s | He soars past the tower top, arms out, the city far below. | VAULTER soaring superman-style past the spire of an Art-Deco skyscraper, the city far below. | Flying past the spire, wind-whipped. | "You would then fly" | — |
| 13 | 0:29-0:32 | 3s | **Map flight:** a dotted path down the East Coast from NYC to Ormond Beach, FL. | — (Remotion: satellite-style map, a path animating NYC → Ormond Beach, the vaulter icon) | — | "all the way down the East Coast" | "NYC → Ormond Beach, FL" |
| 14 | 0:32-0:34 | 2s | He drops out of the sky and lands, feet first, on the Beach Bucket deck. | VAULTER landing feet-first on a sunny oceanfront restaurant deck with umbrellas and tables, the Atlantic behind, diners looking up surprised. | Landing with a small dust puff; he straightens and grins. | "and land safely on the deck at the Beach Bucket in Ormond Beach," | — |
| 15 | 0:34-0:37 | 3s | **Real footage:** a Bloody Mary set down on the deck, the ocean behind; end on the logo. | — (real clip: new phone footage, or `hero-video.mp4` plus a Bloody Mary drinks card) | — | "where you can then cool off with our famous Bloody Mary." | logo lower third, "Ormond Beach • Open daily 7AM–9PM" |

### Notes
- Beat 13 replaces the original's real Google-Earth-style map shot. Build it in Remotion with a static map image plus an animated path (no screen recording of a map app needed).
- Beats 14-15 are the brand payoff. Keep the switch to real footage, because it's what makes the twist land.

## Decisions (Myrie, approved)
1. Vaulter: **generic athlete** (no lettering on the singlet).
2. Punchline: the **famous Bloody Mary**.
3. Narration: **local TTS** (calm, slightly amused male voice).
4. Final shots: **existing site photos and video** (`hero-video.mp4`, sunset photos, the Bloody Mary drinks card, the logo). No new shoot.
