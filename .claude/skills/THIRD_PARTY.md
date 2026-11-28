# Third-party skills

Installed from the five skills listed in https://www.instagram.com/reel/DgBDtqvznz_/ (2026-11-21), in the order given
there. `ig-growth-pipeline` is ours and runs them in that order.

| # | Skill | Source | Version | Licence | How it is installed |
|---|-------|--------|---------|---------|---------------------|
| 1 | `ig-audit` | github.com/corbinsylk/ig-audit | commit `eb465b3` | MIT | Copied to `.claude/skills/ig-audit` |
| 2 | `last30days` | github.com/mvanhorn/last30days-skill | latest (4.8.1 at setup) | MIT | Plugin, enabled in `.claude/settings.json` |
| 3 | `post-mortem` | github.com/corbinsylk/post-mortem | commit `38d2c9c` | MIT | Copied to `.claude/skills/post-mortem` |
| 4 | `trial-reel-lab` | github.com/corbinsylk/trial-reel-lab | commit `59ebda5` | MIT | Copied to `.claude/skills/trial-reel-lab` |
| 5 | `viral-radar` | github.com/corbinsylk/viral-radar | none | | Not installed: repository not publicly available on 2026-11-28 |

The copied skills are unmodified apart from the upstream `LICENSE` placed in each folder. To update one, replace its
folder with the upstream `.claude/skills/<name>` folder and change the commit above.

`last30days` is not copied in because it is large (about 200 files) and updates often. Claude Code fetches it from its
author's marketplace and asks for approval the first time the project is opened. It tracks the author's latest
version, so it changes without a commit here.

Requirements on the computer that runs them: Python 3, `yt-dlp`, `ffmpeg`, and a local Whisper transcriber
(`whisper-cpp` or `faster-whisper`). Each skill's `tools/doctor.py` reports what is missing.
