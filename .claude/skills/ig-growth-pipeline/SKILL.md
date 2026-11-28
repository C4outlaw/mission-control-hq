---
name: ig-growth-pipeline
description: >-
  Run the Instagram growth pipeline in order: audit the profile, research what the niche is asking this month, find
  where a flopped reel lost people, then cut five trial-reel versions of the next video. Use when the user says
  "/ig-growth-pipeline", "run the Instagram pipeline", "run the IG pipeline", "grow my Instagram", or asks which of
  the Instagram skills to use next.
---

# Instagram growth pipeline

Four installed skills, run in this order. Each stage hands something to the next. Run one stage at a time and stop
after each so the user can read the result; never chain them silently.

| # | Stage | Skill | Needs from the user | Hands on |
|---|-------|-------|---------------------|----------|
| 1 | Audit | `/ig-audit @handle` | The Instagram handle | Niche name, topic gaps, 5 video ideas |
| 2 | Research | `/last30days <niche or topic>` | Nothing (uses stage 1's niche) | The questions people are asking this month |
| 3 | Post-mortem | `/post-mortem` | A flopped reel (link or file) and its retention-graph screenshot | The second people left, and a rewrite of that part |
| 4 | Trial reels | `/trial-reel-lab` | One finished video file | Five versions with five captions |
| 5 | Viral radar | not installed | | |

## How to run it

1. Ask which stage to start from if the user didn't say. Default to stage 1.
2. Invoke that stage's skill and follow its own instructions exactly. This file adds nothing to how a stage works.
3. When a stage finishes, give its result in a few lines, then say what the next stage is and what it needs.
4. Carry results forward: stage 2's topic is the `niche.line` and gap topics from stage 1's report; the ideas and
   questions from stages 1 and 2 are what the next video should be about; stage 3's rewrite is the hook to use when
   that video is recorded; the finished video goes into stage 4.

## Where it runs

Stages 1, 3 and 4 work on the user's own computer: they read Instagram in a browser the user is signed into, download
reels, transcribe locally and save reports under `~/Documents`. Each one's first run checks for `yt-dlp`, `ffmpeg` and
a local Whisper transcriber and says what to install. In a cloud session there is no signed-in browser and no
Documents folder, so say that plainly instead of improvising.

No stage posts, follows, likes, comments or signs in. Posting stays with the user.

## Stage 5

The reel this pipeline came from lists a fifth skill, `corbinsylk/viral-radar` (scans the niche and notifies every 12
hours). That repository was not publicly available when the pipeline was set up, so nothing is installed for it. Do
not substitute a similarly named repository. If the user gets a working link, install it the same way as the others
and add it to the table.

Sources and pinned versions are in `.claude/skills/THIRD_PARTY.md`.
