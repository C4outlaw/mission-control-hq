# Script: Balloon on a Jamaican Road

## STYLE BLOCK (start of every Grok image prompt)
> Hyper-real cinematic CGI macro photography, 100mm macro lens look, shallow depth of field, glossy saturated orange balloon, hot Caribbean late-afternoon sunlight, vertical 9:16, no text, no captions, no logos, no watermark.

**Road line (add to every exterior prompt):** *narrow Jamaican country road, cracked asphalt, faded yellow centre line, a pothole, zinc fence painted green gold and black, bamboo and breadfruit trees, lush green hills, hazy heat shimmer.*

## Locked references (stage 2)
1. **BALLOON:** a glossy orange latex balloon, knot down, resting on the asphalt, with the road and hills softly blurred behind.
2. **TAXI:** a white Toyota-Hiace-style route-taxi minibus with a red side stripe and no badges, seen low and front-on, with a dusty front tyre.
3. **ROAD:** the empty road wide shot, no balloon.

## Beats (match the source timing exactly)

| # | time | dur | shot | image_prompt (STYLE BLOCK + road line +) | video_prompt (motion only) | overlays (Remotion) |
|---|---|---|---|---|---|---|
| 1 | 0:00-0:01.8 | 1.8s | Low ground-level medium shot: the balloon sits in the road and the taxi's front tyre fills the top of the frame, far back. | Ground-level shot of an orange balloon sitting in the middle of the road; the front tyre of a white route taxi looms large at the top of the frame, about two metres behind it. | The tyre creeps forward very slowly; heat shimmer; the balloon trembles slightly in a breeze. | REC HUD (corner brackets, "REC 00:00:00:14", "85MM"), "FRAMES TO IMPACT" counter starting at 197 |
| 2a | 0:01.8-0:08 | 6.2s | Extreme macro: the balloon's curved surface fills the bottom half, the tyre tread descends toward it. | Extreme macro of the glossy top curve of an orange balloon, with the treaded rubber of a tyre a few centimetres above it, sun glinting on the latex, road blurred to bokeh. | The tread inches down; the balloon surface begins to dimple under the pressure. | HUD switches to "100MM MACRO"; counter 137 → 001 (reaching 001 at 7.0 s); at 7.0 s a small "You" appears |
| 2b | 0:08-0:12 | 4s | Same macro, deeper press. | Same as 2a, deeper dent in the balloon. (Use 2a's last frame as the start frame.) | The tread presses in further and the latex stretches and creases. Extremely slow. | Counter replaced by "• watching 8.5s" (counts up live). Captions: "You just watched a balloon / **for 7 seconds.**" then "A balloon that…" |
| 2c | 0:12-0:16 | 4s | **CGI reveal:** an orange wireframe mesh over the balloon. | Same macro frame rendered as an orange 3D wireframe mesh on black (a CG viewport look). | The mesh flexes under the tread. | "A balloon that **doesn't exist.**" then "And you're still here, / waiting for it to **pop.**". Tiny monospace debug text: "balloon_latex.mesh 227,680 polys". At 14 s, wipe back to the real render (top half mesh, bottom half real) |
| 3 | 0:16-0:21.6 | 5.6s | **Phone mockup:** a phone feed shows the same balloon shot, then Myrie's own clips. | — (built in Remotion from existing clips) | — | "Now imagine / that was **your brand.**" then "We make films people / **can't scroll past.**". In the feed: 3-4 of Myrie's best clips (Beach Bucket, Lost Jamaican, Lumo), 1.2 s each |
| 4 | 0:21.6-0:23 | 1.4s | Back to the macro: maximum dent, tension. | Same as 2b at maximum dent; the tread almost through the latex. | A tiny final push; the latex stretches thin. | Music drops out |
| 5 | 0:23-0:24 | 1s | **POP:** the balloon bursts into orange latex shreds; the taxi tyre rolls on through. | Orange balloon bursting into flying latex fragments on the asphalt, frozen mid-burst, with the tyre rolling through. | Burst in slow motion, shreds flying outward, then dust kicks up. | Hard pop SFX at 23.0 s |
| 6 | 0:24-0:29.6 | 5.6s | **End card:** dark background, the brand mark draws on. | — (Remotion) | — | Myrie's logo + "DM **'POP'** for a free ad idea" pill + URL |

### Grok production notes
- Beats 2a → 2b → 4 are one continuous shot. Generate 2a, take its **last frame** as the start frame of 2b, then 2b's last frame for 4. Slow each clip down 1.5-2x in ffmpeg (`setpts=1.8*PTS`, with `minterpolate` if it stutters) to get the long, unbearable creep.
- 2c (the wireframe): generate the image with Grok, or do it in Remotion as an edge-detect overlay on 2b (`ffmpeg -vf edgedetect` tinted orange) for a cheaper and consistent result.
- If Grok won't make the tyre read clearly, use the fallback from the brief: a sewing needle hanging over the balloon on the Jamaican road (the original's device, new setting).

## Decisions (Myrie, approved)
1. End card brand: **Myrie HQ**, with the line "DM 'POP' for a free ad idea".
2. On-screen text: **standard English**, identical to the original (a clean retention test).
3. Impact device: **route taxi tyre**. Use the needle fallback only if Grok can't make the tyre read clearly, and tell Myrie if you switch.
