"""Download public reels one at a time: caption and counts, 3 frames, and a transcript made on this computer.

    python3 pull.py <jobs.json> <out_root>

jobs.json is a list of {"account": handle, "url": reel link, "pick": "top" | "bottom"}.
Writes <out_root>/pulled.json. Never uses cookies, never retries, waits between downloads.
Only the sound is downloaded; frames are read from the video online, so no video file is saved.
"""
import json
import queue
import re
import subprocess
import sys
import threading
import time
from datetime import datetime, timezone
from pathlib import Path

DELAY = 4.0
TIMEOUT = 120  # seconds; a stalled download or stream never hangs the run


def _default_transcriber(audio):
    from transcribe import transcribe
    return transcribe(audio)


def _slug(url):
    m = re.search(r"/(?:reel|reels|p)/([A-Za-z0-9_-]+)", url)
    return m.group(1) if m else re.sub(r"[^A-Za-z0-9_-]+", "_", url)[-40:]


def _empty(url, status, reason=""):
    return {"url": url, "status": status, "reason": reason, "caption": "", "likes": 0, "comments": 0,
            "duration": 0.0, "date": "", "language": "", "transcript": "", "frames": [], "audio": ""}


def download(url, out_dir, run=subprocess.run):
    """Download one reel and take out its frames and sound. Returns the reel dict (no transcript yet)."""
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    # Only the sound is downloaded (small and fast). The frames are read straight from the smallest video
    # stream online, so no video file is ever saved.
    # --ignore-config: a user's own yt-dlp settings (cookies, retries) never leak in.
    cmd = ["yt-dlp", "-q", "--no-warnings", "--ignore-config", "--no-playlist", "--retries", "0",
           "--extractor-retries", "0", "--fragment-retries", "0", "-f", "ba/b", "--write-info-json",
           "-o", str(out_dir / "audio.%(ext)s"), url]
    try:
        r = run(cmd, capture_output=True, text=True, timeout=TIMEOUT)
    except subprocess.TimeoutExpired:
        return _empty(url, "caption_only", "download timed out")
    info_path = out_dir / "audio.info.json"
    sound = next((p for p in out_dir.glob("audio.*") if p.suffix not in (".json", ".wav", ".part")), None)
    if r.returncode != 0 or sound is None:
        reason = (r.stderr or "download failed").strip().splitlines()
        return _empty(url, "caption_only", reason[-1] if reason else "download failed")

    info = json.loads(info_path.read_text(encoding="utf-8")) if info_path.exists() else {}
    reel = _empty(url, "ok")
    reel["caption"] = info.get("description") or ""
    reel["likes"] = int(info.get("like_count") or 0)
    reel["comments"] = int(info.get("comment_count") or 0)
    if info.get("view_count"):
        reel["views"] = int(info["view_count"])
    if info.get("timestamp"):
        reel["date"] = datetime.fromtimestamp(info["timestamp"], tz=timezone.utc).date().isoformat()

    probe = run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(sound)],
                capture_output=True, text=True, timeout=TIMEOUT)
    try:
        reel["duration"] = round(float(probe.stdout.strip()), 1)
    except ValueError:
        reel["duration"] = 0.0

    source = _smallest_video_url(info) or (str(sound) if sound.suffix == ".mp4" else "")
    if source:
        for i, t in enumerate([0.0, min(1.0, reel["duration"]), reel["duration"] / 2]):
            frame = out_dir / f"frame_{i + 1}.jpg"
            try:
                run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.2f}", "-i", source, "-frames:v", "1",
                     "-vf", "scale=540:-2", str(frame)], capture_output=True, text=True, timeout=TIMEOUT)
            except subprocess.TimeoutExpired:
                continue
            if frame.exists():
                reel["frames"].append(str(frame))

    audio = out_dir / "audio.wav"
    run(["ffmpeg", "-v", "error", "-y", "-i", str(sound), "-vn", "-ar", "16000", "-ac", "1", str(audio)],
        capture_output=True, text=True, timeout=TIMEOUT)
    reel["audio"] = str(audio) if audio.exists() else ""
    sound.unlink()
    info_path.unlink(missing_ok=True)
    return reel


def _smallest_video_url(info):
    """The lowest-bitrate video stream that is still at least 480 px tall (enough to read the frame)."""
    videos = [f for f in info.get("formats", []) if f.get("url") and f.get("vcodec") not in (None, "none")]
    clear = [f for f in videos if (f.get("height") or 0) >= 480] or videos
    if not clear:
        return ""
    return min(clear, key=lambda f: f.get("tbr") or 1e9)["url"]


def add_transcript(reel, transcriber):
    if reel["status"] != "ok" or not reel.get("audio"):
        return reel
    try:
        t = transcriber(reel["audio"])
        reel["transcript"], reel["language"] = t.get("text", ""), t.get("language", "")
    except Exception as e:  # a failed transcript still leaves caption and frames
        reel["reason"] = f"transcript failed: {e}"
    if reel["transcript"]:
        Path(reel["audio"]).with_name("transcript.txt").write_text(reel["transcript"], encoding="utf-8")
    return reel


def pull_reel(url, out_dir, run=subprocess.run, transcriber=_default_transcriber):
    return add_transcript(download(url, out_dir, run=run), transcriber)


def pull_all(jobs, out_root, delay=DELAY, sleep=time.sleep, run=subprocess.run,
             transcriber=_default_transcriber, say=lambda _line: None, save=None):
    """Download one after another (waiting `delay` between), transcribing in the background meanwhile."""
    out_root = Path(out_root)
    results = [None] * len(jobs)
    work = queue.Queue()

    def worker():
        while True:
            item = work.get()
            if item is None:
                return
            i, reel = item
            results[i] = add_transcript(reel, transcriber)

    t = threading.Thread(target=worker, daemon=True)
    t.start()
    downloaded = []
    for i, job in enumerate(jobs):
        if i:
            sleep(delay)
        try:
            reel = download(job["url"], out_root / job["account"] / _slug(job["url"]), run=run)
        except Exception as e:  # one broken reel never stops the run
            reel = _empty(job["url"], "caption_only", f"download failed: {e}")
        reel.update({"account": job["account"], "pick": job.get("pick", "top")})
        say(f"@{job['account']} {_slug(job['url'])}: " +
            ("ok" if reel["status"] == "ok" else f"caption only: {reel['reason']}"))
        work.put((i, reel))
        downloaded.append(reel)
        if save:  # saved after every reel, so a crash never loses earlier downloads
            save([results[k] or downloaded[k] for k in range(len(downloaded))])
    work.put(None)
    t.join()
    return results


def main(argv):
    if len(argv) != 2:
        print(__doc__)
        return 2
    jobs = json.loads(Path(argv[0]).read_text(encoding="utf-8"))
    out_root = Path(argv[1])
    out_root.mkdir(parents=True, exist_ok=True)
    target = out_root / "pulled.json"

    def save(done):
        target.write_text(json.dumps([r for r in done if r], indent=2, ensure_ascii=False), encoding="utf-8")

    results = pull_all(jobs, out_root, say=print, save=save)
    save(results)
    ok = sum(r["status"] == "ok" for r in results)
    print(f"{ok} of {len(results)} reels downloaded. Saved {out_root / 'pulled.json'}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
