"""Get a finished video ready: copy it into the run folder, read its size, frame rate and length, take 3 frames for
Claude to look at, and transcribe it on this computer with a time for every word.

    python3 prepare.py <video file> <run folder>

Writes <run folder>/video.json and <run folder>/transcript.json. The original video is never changed.
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

TIMEOUT = 300


def _default_transcriber(audio):
    from transcribe import transcribe
    return transcribe(audio)


def _fps(text):
    try:
        num, den = (text or "0/1").split("/")
        return round(float(num) / float(den), 3) if float(den) else 0.0
    except ValueError:
        return 0.0


def prepare(source, out_dir, run=subprocess.run, transcriber=_default_transcriber):
    """Return the video's info dict (also saved as video.json). Never raises for a bad file."""
    source, out_dir = Path(source).expanduser(), Path(out_dir).expanduser()
    out_dir.mkdir(parents=True, exist_ok=True)
    info = {"status": "ok", "reason": "", "source": str(source), "video": "", "width": 0, "height": 0, "fps": 0.0,
            "fps_text": "", "duration": 0.0, "has_audio": False, "audio": "", "frames": []}
    if not source.is_file():
        info.update(status="failed", reason=f"Couldn't find the video file: {source}")
        return info
    video = out_dir / ("source" + (source.suffix.lower() or ".mp4"))
    shutil.copy2(source, video)
    info["video"] = str(video)

    probe = run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate:format=duration",
                 "-of", "json", str(video)], capture_output=True, text=True, timeout=TIMEOUT)
    try:
        data = json.loads(probe.stdout or "{}")
    except ValueError:
        data = {}
    vstream = next((s for s in data.get("streams", []) if s.get("codec_type") == "video"), None)
    if vstream is None:
        info.update(status="failed", reason="That file doesn't look like a video.")
        return info
    info.update(width=int(vstream.get("width") or 0), height=int(vstream.get("height") or 0),
                fps_text=vstream.get("r_frame_rate") or "", fps=_fps(vstream.get("r_frame_rate")),
                duration=round(float((data.get("format") or {}).get("duration") or 0), 2),
                has_audio=any(s.get("codec_type") == "audio" for s in data.get("streams", [])))

    frames = out_dir / "frames"
    frames.mkdir(exist_ok=True)
    for i, part in enumerate((0.1, 0.5, 0.9), 1):
        frame = frames / f"frame_{i}.jpg"
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{info['duration'] * part:.2f}", "-i", str(video), "-frames:v", "1",
             "-vf", "scale=540:-2", str(frame)], capture_output=True, text=True, timeout=TIMEOUT)
        if frame.exists():
            info["frames"].append(str(frame))

    transcript = {"language": "", "words": [], "sentences": []}
    if info["has_audio"]:
        audio = out_dir / "audio.wav"
        run(["ffmpeg", "-v", "error", "-y", "-i", str(video), "-vn", "-ac", "1", "-ar", "16000", str(audio)],
            capture_output=True, text=True, timeout=TIMEOUT)
        if audio.exists():
            info["audio"] = str(audio)
            transcript = transcriber(str(audio))
    (out_dir / "transcript.json").write_text(json.dumps(transcript, indent=1, ensure_ascii=False), encoding="utf-8")
    return info


def main(argv):
    if len(argv) != 2:
        print(__doc__)
        return 2
    out_dir = Path(argv[1]).expanduser()
    info = prepare(argv[0], out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "video.json").write_text(json.dumps(info, indent=1, ensure_ascii=False), encoding="utf-8")
    if info["status"] != "ok":
        print("failed: " + info["reason"])
        return 1
    print(f"{info['width']}x{info['height']}, {info['duration']} s, frames: {', '.join(info['frames'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
