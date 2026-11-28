"""Transcribe one audio file on this computer, free. Uses whisper.cpp (whisper-cli) or faster-whisper,
whichever is installed (doctor.py sets one up).

    python3 transcribe.py <audio.wav>
"""
import importlib.util
import re
import shutil
import subprocess
import sys
from pathlib import Path

from doctor import MODEL

_fw_model = None


def _whisper_cli(audio, run=subprocess.run):
    r = run(["whisper-cli", "-m", str(MODEL), "-l", "auto", "-nt", "-f", str(audio)],
            capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError((r.stderr or "whisper-cli failed").strip()[-300:])
    m = re.search(r"auto-detected language:\s*([a-z]{2})", r.stderr or "")
    return {"text": " ".join(r.stdout.split()), "language": m.group(1) if m else ""}


def _faster_whisper(audio):
    global _fw_model
    from faster_whisper import WhisperModel
    if _fw_model is None:
        _fw_model = WhisperModel("base", compute_type="int8")
    segments, info = _fw_model.transcribe(str(audio))
    return {"text": " ".join(s.text.strip() for s in segments).strip(), "language": info.language or ""}


def transcribe(audio):
    """Return {"text": str, "language": str}. Empty text is a valid result (music-only reels)."""
    audio = Path(audio)
    if shutil.which("whisper-cli") and MODEL.exists():
        return _whisper_cli(audio)
    if importlib.util.find_spec("faster_whisper"):
        return _faster_whisper(audio)
    raise RuntimeError("No transcriber installed. Run: python3 doctor.py")


if __name__ == "__main__":
    print(transcribe(sys.argv[1]))
