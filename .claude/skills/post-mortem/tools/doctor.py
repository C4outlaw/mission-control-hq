"""Check that the tools Post-Mortem needs are installed, and say how to get any that are missing.

    python3 doctor.py              prints READY, or one line per missing tool (exit 1)
    python3 doctor.py --get-model  downloads the free Whisper model whisper.cpp needs
"""
import importlib.util
import shutil
import sys
import urllib.request
from pathlib import Path

MODEL = Path.home() / ".cache" / "ig-skills" / "ggml-base.bin"
MODEL_URL = "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin"


def _can_import(name):
    return importlib.util.find_spec(name) is not None


def check(which=shutil.which, can_import=_can_import, model_exists=MODEL.exists):
    """Return {python, yt_dlp, ffmpeg, whisper} -> True when ready."""
    whisper = can_import("faster_whisper") or (bool(which("whisper-cli")) and model_exists())
    return {
        "python": sys.version_info >= (3, 9),
        "yt_dlp": bool(which("yt-dlp")) or can_import("yt_dlp"),
        "ffmpeg": bool(which("ffmpeg")) and bool(which("ffprobe")),
        "whisper": whisper,
    }


def fix_lines(status, platform=sys.platform, which=shutil.which):
    """One plain-words line per missing tool."""
    mac = platform == "darwin"
    lines = []
    if not status["python"]:
        lines.append("Python 3.9 or newer is needed: get it from python.org.")
    if not status["yt_dlp"]:
        lines.append("yt-dlp (downloads the reels): " + ("brew install yt-dlp" if mac else "winget install yt-dlp.yt-dlp"))
    if not status["ffmpeg"]:
        lines.append("ffmpeg (pulls the sound and frames): " + ("brew install ffmpeg" if mac else "winget install Gyan.FFmpeg"))
    if not status["whisper"]:
        if which("whisper-cli"):
            lines.append("Whisper model (free, about 150 MB): python3 doctor.py --get-model")
        elif mac:
            lines.append("Whisper (writes the transcripts on this computer): brew install whisper-cpp, "
                         "then python3 doctor.py --get-model")
        else:
            lines.append("Whisper (writes the transcripts on this computer): python -m pip install faster-whisper")
    return lines


def get_model():
    MODEL.parent.mkdir(parents=True, exist_ok=True)
    tmp = MODEL.with_suffix(".part")
    urllib.request.urlretrieve(MODEL_URL, tmp)
    tmp.replace(MODEL)
    return MODEL


def main(argv):
    if "--get-model" in argv:
        print("Model saved:", get_model())
        return 0
    status = check()
    lines = fix_lines(status)
    if not lines:
        print("READY")
        return 0
    print("\n".join(lines))
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
