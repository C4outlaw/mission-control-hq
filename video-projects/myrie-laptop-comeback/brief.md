# Brief: Myrie Laptop Comeback

**Pipeline:** `dramaclaw-local` (Grok in Myrie's logged-in debug Chrome, then ffmpeg and Remotion). This folder holds the stage 1 output. Copy it to `C:/Users/email/dramaclaw-local/projects/myrie-laptop-comeback/` and run from stage 2.

## Source
- Instagram reel: https://www.instagram.com/reel/Dfi565uNez9/
- Download a local copy for reference only (do not reuse its footage):
  `yt-dlp --cookies-from-browser chrome -o "source/reel.mp4" "https://www.instagram.com/reel/Dfi565uNez9/"`
- Format: 1080x1920 (9:16), 60 fps, 2:08. About 48 cuts. Pixar-style 3D animation, word-by-word white caption pops, music bed with dialogue.

## The ask
Remake the reel's story with **Myrie as the main guy**: same beats, pacing, camera language and animated look. Every shot of the lead must clearly read as Myrie.

## What changes from the source
| Source | Remake |
|---|---|
| Lead "Shlok": thin, curly hair, clear glasses | **Myrie**: Pixar-style version of Myrie (see character sheet in `script.md`) |
| Name "Shlok" in dialogue | "Myrie" |
| "You're 23 and broke" | "You're grown and broke" (Myrie isn't 23) |
| Ending (~1:24-2:08): talking-head tutorial telling people to use higgsfield.ai/content-factory | **Myrie's own tutorial and call to action.** He doesn't use Higgsfield. Draft in beats 23-26; Myrie must approve the wording. |

## Specs
- 9:16, 1080x1920, 30 fps final (the source's 60 fps isn't needed)
- Target length 1:50-2:10
- Captions: word-pop, white bold uppercase with dark shadow, centered at ~45% height (matches source)
- Audio: Grok native clip audio for dialogue where usable, otherwise local TTS per `dramaclaw-local` stage 5. Music only from Myrie's local library.
- **No posting without Myrie's explicit OK.**

## Face references for Myrie (in this repo)
- `public/images/myrie-headshot.jpg` (studio headshot, grey suit, best for the face)
- `public/assets/profile/myrie.jpg`
- `public/store/shoot/founder-myrie.webp` (black hoodie, seated)
