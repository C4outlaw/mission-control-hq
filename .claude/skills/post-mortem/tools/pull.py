"""Get one reel's sound and length, from its link or from the video file.

    python3 pull.py <reel link or video file> <run folder>

Writes <run folder>/reel.json and prints its status. A link downloads the sound only, with plain yt-dlp: no cookies,
no config, no retries, a time limit. A file (a trial reel, a private reel, or one that won't download) has its sound
taken out with ffmpeg. Either way the sound is saved as a 16 kHz mono WAV for the transcriber.
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

TIMEOUT = 120  # seconds; a stalled download never hangs the run
USE_FILE = "Instagram wouldn't let it download. Save the reel to your computer and send the video file instead."


def _result(source, kind, status="ok", reason=""):
    return {"source": source, "kind": kind, "status": status, "reason": reason, "audio": "", "duration": 0.0,
            "caption": ""}


def _is_link(source):
    return source.startswith(("http://", "https://", "www.", "instagram.com"))


def _duration(path, run):
    try:
        probe = run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                    capture_output=True, text=True, timeout=TIMEOUT)
        return round(float(probe.stdout.strip()), 1)
    except (ValueError, subprocess.TimeoutExpired):
        return 0.0


def _to_wav(src, out_dir, run):
    wav = Path(out_dir) / "audio.wav"
    try:
        run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-vn", "-ac", "1", "-ar", "16000", str(wav)],
            capture_output=True, text=True, timeout=TIMEOUT)
    except subprocess.TimeoutExpired:
        return ""
    return str(wav) if wav.exists() else ""


def get_sound(source, out_dir, run=subprocess.run):
    """Return {source, kind, status, reason, audio, duration, caption}. Never raises for a bad source."""
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    source = str(source).strip()

    if not _is_link(source):
        path = Path(source).expanduser()
        r = _result(str(path), "file")
        if not path.is_file():
            r.update(status="failed", reason=f"Couldn't find the video file: {path}")
            return r
        r["duration"] = _duration(path, run)
        r["audio"] = _to_wav(path, out_dir, run)
        if not r["audio"]:
            r.update(status="failed", reason="Couldn't read the sound in that video file.")
        return r

    r = _result(source, "link")
    prog = ["yt-dlp"] if shutil.which("yt-dlp") else [sys.executable, "-m", "yt_dlp"]  # the module works too
    cmd = prog + ["-q", "--no-warnings", "--ignore-config", "--no-playlist", "--retries", "0",
           "--extractor-retries", "0", "--fragment-retries", "0", "-f", "ba/b", "--write-info-json",
           "-o", str(out_dir / "audio.%(ext)s"), source]
    try:
        d = run(cmd, capture_output=True, text=True, timeout=TIMEOUT)
    except subprocess.TimeoutExpired:
        r.update(status="failed", reason=USE_FILE + " (the download timed out)")
        return r
    except FileNotFoundError:
        r.update(status="failed", reason="The downloader (yt-dlp) isn't installed. Run the setup check again.")
        return r
    sound = next((p for p in out_dir.glob("audio.*") if p.suffix not in (".json", ".wav", ".part")), None)
    if d.returncode != 0 or sound is None:
        r.update(status="failed", reason=USE_FILE)
        return r
    info_path = out_dir / "audio.info.json"
    if info_path.exists():
        r["caption"] = json.loads(info_path.read_text(encoding="utf-8")).get("description") or ""
        info_path.unlink()
    r["duration"] = _duration(sound, run)
    r["audio"] = _to_wav(sound, out_dir, run)
    sound.unlink()
    if not r["audio"]:
        r.update(status="failed", reason="Couldn't read the reel's sound.")
    return r


def main(argv):
    if len(argv) != 2:
        print(__doc__)
        return 2
    run_dir = Path(argv[1]).expanduser()
    r = get_sound(argv[0], run_dir)
    (run_dir / "reel.json").write_text(json.dumps(r, indent=1, ensure_ascii=False), encoding="utf-8")
    print("ok" if r["status"] == "ok" else f"failed: {r['reason']}")
    return 0 if r["status"] == "ok" else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
