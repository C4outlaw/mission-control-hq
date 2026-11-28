---
name: ig-audit
description: >-
  Audit an Instagram account against its top 3 competitors. Scores the profile out of 100, downloads and transcribes
  the best reels (on this computer, free), shows the topics, content types and hooks the account is missing, and opens
  a report with ranked fixes, a before/after profile and 5 video ideas. Use when the user says "/ig-audit",
  "audit my Instagram", "score my profile", "why am I not growing", "compare me to my competitors", "what are my
  competitors doing better", or gives an Instagram handle and asks how it stacks up.
---

# IG-audit

You audit one Instagram account against the 3 accounts beating it in its niche, then hand back one report the user can
act on today. Plain words with the user, always: no tool names, no file paths unless they ask.

`TOOLS` below means the `tools` folder next to this file (normally `~/.claude/skills/ig-audit/tools`), and `RUN`
means this run's folder, `~/Documents/IG Audit/<handle>/<YYYY-MM-DD>`. Write both as full paths in every command,
and keep the quotes: the folder name has a space in it.

## Rules that always hold

- **Never type, ask for, or look at an Instagram password.** If Instagram wants a sign-in, the user does it.
- **Read at human pace.** You read 4 profiles and their Reels tabs. No loops, no crawling, no scraping services,
  no running this in the background. Downloads go one at a time with a wait between them (the tool does this).
- **Never post, follow, like, comment or DM.** This skill only reads.
- **Never hand back a competitor's script.** Report topics, content types and hook *styles*, and link the reel that
  proves it. Hook lines you write are new, in the user's own voice.
- **Score honestly.** Most first-pass profiles land in the 30s to 50s. A kind score helps nobody.
- **Every fix points at evidence:** something in this user's profile or reels, or a named competitor's.
- **Only one question in the whole run:** the competitor picks (step 4).

## 0. Set up (first run only)

Run `python3 TOOLS/doctor.py`. If it prints `READY`, go on. Otherwise install what it lists, one plain line each to the
user ("Installing the free transcriber, about a minute"), and run it again. On a Mac, `brew install whisper-cpp` then
`python3 TOOLS/doctor.py --get-model`. If something can't be installed, say exactly what the user needs to run.

Make the run folder `RUN`. Everything for this run goes there: `data.json`, `reels/`, and the report. Start
`RUN/data.json` with the shape in "The data file" below.

**Numbers and dates go in clean.** Instagram shows counts like "12.3K" or "1.2M": store them as whole numbers
(12.3K is 12300). Dates are always `YYYY-MM-DD`. If you can't see a reel's date, leave it as `""`, and never write
"3 weeks ago".

## 1. Open the browser

Use the Claude desktop app's built-in browser. Claude in Chrome works too. If you have neither, use the fallback at
the end.

Open `https://www.instagram.com/<handle>/`. If the user's own account doesn't exist, is private, or has no reels,
stop and tell them in one line what you found (a private account can't be compared). Never audit a different
account in its place. If a sign-in screen appears (now or later), say exactly:
"Instagram wants you to sign in. Please sign in in the browser panel, then tell me when you're done." Then wait. Carry on
when they say it's done.

## 2. Read the user's profile

From the profile page, fill `accounts[0].profile`:
`name_field` (the bold line under the photo, not the handle), `bio`, `link`, `category`, `highlights` (their names),
`pinned` (what each pinned post is about, in a few words), `story_up` (is there a story ring), `followers`,
`last_post_date`. Note the photo, the handle and the first nine grid covers too: you score them later.

Then open the Reels tab and read the last ~30 reels into `grid`: each reel's link, its view count (shown on the
thumbnail), its date when you can see it (open a reel if needed), and its caption when it shows. Each reel goes in
once. Scroll like a person would.

## 3. Pull the user's reels and find the niche

```
python3 TOOLS/metrics.py jobs "RUN/data.json" "RUN/jobs-user.json" user
python3 TOOLS/pull.py "RUN/jobs-user.json" "RUN/reels"
python3 TOOLS/metrics.py merge "RUN/data.json" "RUN/reels/pulled.json"
```

This downloads the user's top 5 and bottom 5 (sound and 3 frames each) and transcribes them on this computer. Tell
the user in one line while it runs ("Reading your best and worst 5 reels").

Then fill `niche`: `line` is a short name for the niche, 2 to 6 words, that reads well in "the accounts beating you
in ___" (for example "AI content creation" or "home workouts for busy mums"), never a full sentence; then 5 to 8 topics,
and the words people would search to find it. Use the bio, captions and transcripts.

## 4. Pick 3 competitors

If the user named competitors, use those. Otherwise search Instagram (in the browser) and the web for the niche's
search words, and pick 3 accounts that:

1. post the same kind of content to the same kind of audience,
2. are clearly ahead: roughly 2 to 20 times the user's followers, or clearly more views per reel (no celebrities),
3. have posted in the last 2 weeks.

Show the 3 picks, one line each on why ("Same audience, 8x your followers, posts daily"), and ask if they want to swap
any. This is the only question in the run. If an account turns out private, renamed or missing, add it to `skipped`
with the reason and take the next candidate. Never stop the run for it.

## 5. Read the competitors

For each competitor, read the same profile fields and the last ~30 reels into its own entry in `accounts`
(`role: "competitor"`, with `why`). Then:

```
python3 TOOLS/metrics.py jobs "RUN/data.json" "RUN/jobs-comp.json" competitor
python3 TOOLS/pull.py "RUN/jobs-comp.json" "RUN/reels"
python3 TOOLS/metrics.py merge "RUN/data.json" "RUN/reels/pulled.json"
```

A reel marked `caption_only` couldn't be downloaded: use its caption and what you saw in the browser. Never retry it.

## 6. Analyse

Work through every account, and write everything into `data.json`:

- **Score** each account with `rubric.json` (12 parts, 100 points). Put each part's points and a one-line note in
  `score.items`. Use `full_marks` and `common_fail` to judge.
- **Label every reel** from its 3 frames and its transcript: `content_type` and `hook_style` from `labels.json`,
  `hook_line` (the first spoken sentence), `hook_text` (the first words on screen), and `topics` (from `niche.topics`,
  adding new ones when a competitor's reel is about something else). A reel with no speech is fine: use the frames
  and caption.
- **Gaps:** topics that carry competitors' best reels and that the user never covers. Each gap gets the competitors
  that cover it and one `proof_url`.
- **Fixes:** ordered by points lost (the most first). Each has the rubric `item`, `points_lost` (versus full marks),
  `evidence`, and a copy-ready `rewrite` (3 name field options, a new bio, which 3 reels to pin, highlight names,
  the link). A `rewrite` with several options can be a list of strings.
- **after:** the profile with the fixes applied (`name_field`, `bio`, `link`, `highlights`, `pinned`).
- **winners_vs_flops:** 2 to 4 findings on what the user's top 5 have that their bottom 5 don't.
- **ideas:** 5 videos from the gaps. Each has a `title`, a `hook` written in the user's voice (match how they write their
  captions), the `gap_topic`, and a competitor `proof_url`.

Then check and finish:

```
python3 TOOLS/metrics.py fill "RUN/data.json"
python3 TOOLS/score.py fill "RUN/data.json"
python3 TOOLS/score.py check-labels "RUN/data.json"
python3 TOOLS/report.py "RUN/data.json"
```

If a check prints problems, fix `RUN/data.json` and run it again until all of them pass. The last one opens the report.

## 7. Close

Three lines, nothing more: their score next to the competitors' average, the single biggest fix, and where the
report is saved.

## Fallback: no browser

Ask the user for their profile link, the links of 3 competitors (or let you suggest them from a web search), and a
screenshot of the top of each profile and its Reels tab with view counts showing. Read those screenshots for steps 2
and 5, then carry on from step 3 exactly the same.

## The data file

```json
{
  "run": {"handle": "", "date": "YYYY-MM-DD", "version": "1.0"},
  "niche": {"line": "", "topics": [], "keywords": []},
  "skipped": [{"handle": "", "reason": ""}],
  "accounts": [{
    "handle": "", "role": "user | competitor", "why": "",
    "profile": {"name_field": "", "bio": "", "link": "", "category": "", "highlights": [], "pinned": [],
                "story_up": false, "followers": 0, "last_post_date": "YYYY-MM-DD"},
    "grid": [{"url": "", "views": 0, "date": "YYYY-MM-DD", "caption": ""}],
    "reels": [],
    "score": {"items": {"<rubric id>": {"points": 0, "note": ""}}, "total": 0}
  }],
  "gaps": [{"topic": "", "competitors": [], "proof_url": ""}],
  "fixes": [{"item": "<rubric id>", "points_lost": 0, "evidence": "", "rewrite": ""}],
  "after": {"name_field": "", "bio": "", "link": "", "highlights": [], "pinned": []},
  "winners_vs_flops": [],
  "ideas": [{"title": "", "hook": "", "gap_topic": "", "proof_url": ""}]
}
```

`reels` is filled by `metrics.py merge`. You then add `content_type`, `hook_line`, `hook_text`, `hook_style` and
`topics` to each reel. The user's account is always first.
