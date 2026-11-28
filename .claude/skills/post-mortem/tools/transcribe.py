"""Transcribe the reel's sound on this computer, free, with a time for every word.

    python3 transcribe.py <run folder>

Reads <run folder>/reel.json (from pull.py) and writes <run folder>/transcript.json:
{"language": "en", "words": [{"s": seconds, "e": seconds, "w": "word"}], "sentences": [{"s", "e", "text"}]}.
Uses whisper.cpp (whisper-cli) or faster-whisper, whichever doctor.py set up.
"""
import importlib.util
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from doctor import MODEL

GAP = 0.8  # seconds of silence that ends a sentence even without punctuation
_END = (".", "?", "!", "…")


def _is_word(text):
    """False for non-speech tokens: [Music], (laughs), *music*, ♪, and anything with no letter or digit."""
    if re.fullmatch(r"\[.*\]|\(.*\)|\*.*\*", text):
        return False
    return any(ch.isalnum() for ch in text)


def parse_whisper_json(data):
    """whisper.cpp JSON made with -ml 1 -sow (one word per segment) -> [{"s", "e", "w"}]; empty tokens dropped."""
    words = []
    for seg in data.get("transcription", []):
        text = (seg.get("text") or "").strip()
        if not _is_word(text):
            continue
        off = seg.get("offsets", {})
        words.append({"s": round(off.get("from", 0) / 1000, 3), "e": round(off.get("to", 0) / 1000, 3), "w": text})
    return words


def sentences(words):
    """Group words into sentences: a new one after . ? ! or after a silence longer than GAP."""
    out, cur = [], []
    for i, w in enumerate(words):
        if cur and w["s"] - cur[-1]["e"] > GAP:
            out.append(cur)
            cur = []
        cur.append(w)
        if w["w"].endswith(_END):
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)
    return [{"s": c[0]["s"], "e": c[-1]["e"], "text": " ".join(x["w"] for x in c)} for c in out]


def _whisper_cli(audio, run=subprocess.run):
    with tempfile.TemporaryDirectory() as tmp:
        base = Path(tmp) / "out"
        r = run(["whisper-cli", "-m", str(MODEL), "-l", "auto", "-ml", "1", "-sow", "-sns", "-oj", "-of", str(base),
                 "-f", str(audio)], capture_output=True, text=True)
        if r.returncode != 0:
            raise RuntimeError((r.stderr or "whisper-cli failed").strip()[-300:])
        data = json.loads(base.with_suffix(".json").read_text(encoding="utf-8"))
    m = re.search(r"auto-detected language:\s*([a-z]{2})", r.stderr or "")
    lang = m.group(1) if m else (data.get("result") or {}).get("language", "")
    return {"language": lang, "words": parse_whisper_json(data)}


def _faster_whisper(audio):
    from faster_whisper import WhisperModel
    model = WhisperModel("base", compute_type="int8")
    segments, info = model.transcribe(str(audio), word_timestamps=True)
    words = [{"s": round(w.start, 3), "e": round(w.end, 3), "w": w.word.strip()}
             for s in segments for w in (s.words or []) if _is_word(w.word.strip())]
    return {"language": info.language or "", "words": words}


def transcribe(audio):
    """Return {"language", "words", "sentences"}. No words is a valid result (a music-only reel)."""
    if shutil.which("whisper-cli") and MODEL.exists():
        t = _whisper_cli(audio)
    elif importlib.util.find_spec("faster_whisper"):
        t = _faster_whisper(audio)
    else:
        raise RuntimeError("No transcriber installed. Run: python3 doctor.py")
    t["sentences"] = sentences(t["words"])
    return t


def main(argv):
    if len(argv) != 1:
        print(__doc__)
        return 2
    run_dir = Path(argv[0]).expanduser()
    reel = json.loads((run_dir / "reel.json").read_text(encoding="utf-8"))
    if reel.get("status") != "ok" or not reel.get("audio"):
        print("no sound to transcribe: " + reel.get("reason", ""))
        return 1
    t = transcribe(reel["audio"])
    (run_dir / "transcript.json").write_text(json.dumps(t, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"{len(t['words'])} words, {len(t['sentences'])} sentences, language {t['language'] or '?'}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
