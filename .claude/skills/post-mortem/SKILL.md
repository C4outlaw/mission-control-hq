---
name: post-mortem
description: >-
  Find out why a reel flopped. The user drops in a reel (its link or the video file) and a screenshot of its retention
  graph; this finds the exact second people swiped away, matches it to the line they were saying, and rewrites that
  part in their own voice. Use when the user says "/post-mortem", "why did my reel flop", "where did people drop off",
  "why did people swipe away", "rewrite my hook", "fix this reel", or shares an Instagram Insights screenshot of a reel.
---

# Post-Mortem

You take one reel that underperformed and hand back one page: where people left, what was being said right then, why
it likely lost them, and two rewrites of that part that sound like the user. Plain words with the user, always: no
tool names, no file paths unless they ask.

`TOOLS` below means the `tools` folder next to this file (normally `~/.claude/skills/post-mortem/tools`), and `RUN`
means this run's folder, `~/Documents/Post-Mortem/<reel id or file name>/<YYYY-MM-DD>`. Write both as full paths in
every command, and keep the quotes: folder names can have spaces.

## Rules that always hold

- **Never type, ask for, or look at an Instagram password.** This skill never needs a sign-in.
- **One reel per run.** Never crawl the account or download anything else.
- **Never invent a second or a line.** Every claim points at the graph or the transcript.
- **The rewrite keeps their facts.** It never adds claims, numbers, results or promises they didn't say.
- **Write in the user's language.** If the reel is in Spanish, the rewrite is in Spanish.
- **One question at most:** asking for whatever is missing (step 1). Then work to the end.

## 0. Set up (first run only)

Run `python3 TOOLS/doctor.py`. If it prints `READY`, go on. Otherwise install what it lists, one plain line each to the
user ("Installing the free transcriber, about a minute"), and run it again. On a Mac, `brew install yt-dlp ffmpeg
whisper-cpp` then `python3 TOOLS/doctor.py --get-model`. If something can't be installed, say exactly what the user
needs to run.

## 1. Get the two things

You need **the retention graph screenshot** and **the reel** (its link, or the video file). If either is missing, ask
for both in one message:

"Send me two things: (1) a screenshot of the reel's Insights page in the Instagram app, the part called 'How long
people watched your reel'. Before you take it, press on the steepest part of the line so the exact second shows. The
whole page is fine. (2) The reel's link, or the video file if it's a trial reel or private."

If they also send other Insights (views, watch time, skip rate, saves, shares, follows), keep those numbers for the
report. Never ask for them.

## 2. Get the sound and transcribe it

```
python3 TOOLS/pull.py "<link or file>" "RUN"
python3 TOOLS/transcribe.py "RUN"
```

Say one line while it runs ("Reading your reel"). If `pull.py` fails on a link, tell the user its message in plain
words: Instagram wouldn't let it download, so ask them to save the reel and send the **video file**, then run `pull.py`
again with the file. A reel with no speech is fine: carry on (the transcript is empty).

**Fix what the transcriber misheard.** It's free and local, so it gets a few words wrong, usually names and slang
("Claude" heard as "claw", "feed" as "feet", "reels" as "real"). Read `RUN/transcript.json` with the reel's topic in
mind and correct only those obvious mishearings in its `sentences` text, keeping every time as it is. Never change
what they actually said.

## 3. Read the graph into `curve.json`

Look at the screenshot and find the retention graph (a line falling from 100% on the left). Read it like this:

- **Up and down:** the grid lines are 100%, 50% and 0. Read each point's percent against them.
- **Across:** the left edge is 0:00 and the right edge is the time under it (the reel's length). If the time label is
  missing, use `duration` from `RUN/reel.json`.
- **The tooltip:** if a dark box shows a percent and a time (for example "37%" over "0:03"), that point is exact. Put
  it in `tooltip`.
- Read **at least 12 points**, closer together wherever the line falls fast (every half second there), and wider apart
  where it's flat. Always include 0:00 and the last point.

Write `RUN/curve.json`:

```json
{"points": [[0, 100], [1, 78], [2, 52], [3, 37], [5, 25], [10, 17], [20, 12], [40, 9], [60, 5]],
 "tooltip": [3, 37], "end_label": 60}
```

If you can't find the graph, or it's too small or cut off to read, stop and ask for a clearer screenshot.

## 4. Find the drop-off

```
python3 TOOLS/dropoff.py "RUN"
```

It writes `RUN/dropoff.json`. The rules it follows: the **first 3 seconds** (the hook) are judged on their own,
because almost every graph falls hard there. A later drop wins when at least 8 points of the audience leave within 2
seconds and that fall is clearly steeper than the seconds around it. The **last 3 seconds** are ignored (people
finishing the reel). `main` is the drop-off to fix; `also`, when there is one, is a smaller drop worth a look;
`words` holds the whole sentences spoken from 3 seconds before the drop to 1 second after it. If it says it couldn't
read the graph, ask for a clearer screenshot.

Look at the graph once more and check `main` agrees with what you see. If it clearly doesn't (you misread a point),
fix `curve.json` and run it again.

## 5. Rewrite that part, in their voice

1. **Read the whole transcript first** (`RUN/transcript.json`), not just the drop-off lines. Note in 3 to 5 plain lines,
   each backed by something said in this reel, how this person talks: sentence length, how they open lines ("So", "Now", "Look"), words and phrases they repeat,
   how they address the viewer, their energy. Note the topic and the point of the reel.
2. **Find why people left at that moment.** Read the drop-off lines in context. Common reasons: a slow setup before
   the point, repeating something already said, a vague promise, explaining the process instead of showing the result,
   a missing payoff, a joke or aside that breaks the flow. If the drop is in the hook, it's usually that the first line
   doesn't tell the viewer what they get. One or two sentences, specific to this reel.
3. **Rewrite only the drop-off section** (the lines in `words`), keeping the facts and the point, matching their voice,
   and making it lead into the next line they kept. If it's the hook, the rewrite is a new opening line or two. Give 2
   versions: **Close** (the smallest change that fixes it) and **Bolder** (a stronger rewrite, same facts). Never use
   lines any creator could say ("Stop scrolling!", "Here's the secret").
4. If there were no words at the drop (a music-only start), say what was on screen probably lost them and write the
   on-screen text or first spoken line instead.

Write `RUN/rewrite.json`:

```json
{"voice": ["Short, plain sentences", "Opens lines with So and Now", "Talks to one person"],
 "why": "One or two sentences on why people left right there.",
 "original": "The drop-off lines, exactly as said.",
 "rewrites": [{"label": "Close", "text": "..."}, {"label": "Bolder", "text": "..."}],
 "stats": {"Views": "312", "Average watch time": "0:06"}}
```

`stats` is `null` unless the user sent those numbers.

## 6. The report

```
python3 TOOLS/report.py "RUN"
```

It opens a one-page report: the graph with the drop-off marked, the transcript with the drop-off lines highlighted,
why they left, the two rewrites beside the original (with copy buttons), and what the rewrite kept from their voice.
Then tell the user in chat, in a few lines: the second they lost people, the line they were saying, why, and the two
rewrites. End with: "Want me to look at another reel?"

## The run folder

Everything for the run lives in `RUN`: `audio.wav`, `reel.json`, `transcript.json`, `curve.json`, `dropoff.json`,
`rewrite.json`, the screenshot if you saved it, and `post-mortem.html` / `post-mortem.md`. Nothing leaves the
computer except the reel download from Instagram.
