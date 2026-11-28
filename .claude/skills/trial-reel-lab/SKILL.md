---
name: trial-reel-lab
description: >-
  Turn one finished video into five versions to post as Instagram trial reels, each with its own caption: the
  original, a cold open, a mirrored version, a zoomed version and a faster version. Use when the user says
  "/trial-reel-lab", "make trial reels", "five versions of this video", "variations for trial reels", "test this reel",
  or drops a finished video and asks for versions to test.
---

# Trial Reel Lab

You take one finished video and hand back five versions, ready to post as Instagram trial reels, each with its own
written caption. That's the whole job. Plain words with the user, always: no tool names, no file paths unless they ask.

`TOOLS` below means the `tools` folder next to this file (normally `~/.claude/skills/trial-reel-lab/tools`), and `RUN`
means this run's folder, `~/Documents/Trial Reel Lab/<video name>/<YYYY-MM-DD>`. Write both as full paths in every
command, and keep the quotes: folder names can have spaces.

## Rules that always hold

- **Never change the user's video.** Work on the copy in `RUN`.
- **No on-screen text.** Nothing is drawn on the video.
- **Captions keep their facts.** No new claims, numbers or results; same language as the reel; keep their comment
  keyword or call to action if the reel has one.
- **One question at most:** the clean export (step 2). Then work to the end.
- **Never post, like or comment.** The user posts the trial reels themselves.

## 0. Set up (first run only)

Run `python3 TOOLS/doctor.py`. If it prints `READY`, go on. Otherwise install what it lists, one plain line each to the
user ("Installing the free transcriber, about a minute"), and run it again. On a Mac: `brew install ffmpeg whisper-cpp`
then `python3 TOOLS/doctor.py --get-model`.

## 1. Read the video

```
python3 TOOLS/prepare.py "<their video file>" "RUN"
```

Say one line while it runs ("Reading your video"). It copies the video into `RUN`, takes 3 frames and writes
`RUN/transcript.json` (every word with its time). If they gave a link instead of a file, ask for the video file: the
finished export from their editor is best.

## 2. Check for burned-in text

Look at the 3 frames in `RUN/frames/`. If there are captions, titles or graphics with words baked into the picture,
the mirrored version would show them backwards. Ask once:

"Your video has text burned into it, so a mirrored version would show it backwards. Do you have an export without the
captions and graphics? If not, no problem, I'll make a zoomed-and-faster version in that slot instead."

- They send a clean export: use `--mirror "<that file>"` in step 4 (it's used for the mirrored version only).
- They don't have one: use `--mirror none`.
- No burned-in text: no question, `--mirror flip` (the default).

## 3. Pick the cold open

Read `RUN/transcript.json` (all of it). Pick one moment to move to the front: one or two whole sentences, 2 to 6
seconds long, that start **after the first 5 seconds** and work on their own as an opening line: a result, a number, a
bold claim, the payoff. Never the call to action, and never a line that needs the setup to make sense. Use the
sentences' times: start at the first word, end at the last word's end. Write `RUN/cold_open.json`:

```json
{"start": 21.4, "end": 25.9, "why": "the result: 200 to 10,000 followers in a week"}
```

The transcriber can mishear a word or two; read the line with the reel's topic in mind.

## 4. Make the five versions

```
python3 TOOLS/make_versions.py "RUN" --mirror flip
```

(or `--mirror none`, or `--mirror "<clean export>"` from step 2). It makes, in `RUN`:

1. `1 Original.mp4`: the video as it is.
2. `2 Cold open.mp4`: the cold-open moment first, then the whole video from the start.
3. `3 Mirrored.mp4`: flipped left to right (or `3 Zoomed and faster.mp4` with `--mirror none`).
4. `4 Zoomed.mp4`: 5% closer.
5. `5 Faster.mp4`: 5% faster, voice pitch kept.

If it says the cold open is out of bounds, pick again (step 3). If a version fails, tell the user which one and why in
plain words.

## 5. Write the captions

Read the whole transcript and the original caption if they gave one. Note how they talk (sentence length, words they
use, how they address the viewer). Write one post caption per version, each a different style, in their voice:

1. Original: **result first** (lead with what the viewer gets).
2. Cold open: **bold claim** (matches the moment that now opens the video).
3. Mirrored (or Zoomed and faster): **question** (a question the viewer already asks themselves).
4. Zoomed: **story** (one line of how it happened to them).
5. Faster: **how-to** (the steps in one line).

Each is 1 to 3 short lines plus their comment keyword or call to action if the reel has one. No hashtag walls (3 at
most), no "Stop scrolling", no lines any creator could write. Save them in `RUN/captions.txt`, one block per version,
headed by its file name.

## 6. Hand them over

Tell the user, in a few lines: the five files are ready (open the folder for them), the five captions (pasted in
chat, each under its version name), and how to post: in the Instagram app, post each version as a **trial reel** with
its caption, then share the one that does best with your followers.
