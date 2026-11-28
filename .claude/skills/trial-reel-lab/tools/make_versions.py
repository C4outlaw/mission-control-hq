"""Make the five trial reel versions of one finished video.

    python3 make_versions.py <run folder> [--mirror flip | --mirror none | --mirror <clean export file>]

Reads <run folder>/video.json (from prepare.py) and <run folder>/cold_open.json ({"start": s, "end": s}, written by
Claude), and writes five files next to them:

    1 Original.mp4     the finished video as it is
    2 Cold open.mp4    the cold-open moment first, then the whole video from the start
    3 Mirrored.mp4     flipped left to right (from the clean export when given), or, with --mirror none,
    3 Zoomed and faster.mp4   both changes at once (the video has burned-in text and no clean export)
    4 Zoomed.mp4       5% closer, cropped back to the same size
    5 Faster.mp4       5% faster, voice pitch kept

Every file keeps the source's size and frame rate: H.264 (CRF 18), AAC, ready for the web.
"""
import json
import subprocess
import sys
from pathlib import Path

ZOOM = 1.05
SPEED = 1.05
LEAD = 0.05     # seconds of air before the cold open's first word
FADE = 0.02     # a tiny audio fade at each join, so the cut never clicks
TIMEOUT = 1800


def _even(x):
    n = int(round(x))
    return n + (n % 2)


def _encode(info):
    out = ["-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", info["fps_text"] or "30"]
    out += ["-c:a", "aac", "-b:a", "192k"] if info.get("has_audio") else ["-an"]
    return out + ["-movflags", "+faststart"]


def _check_cold_open(cold, duration):
    try:
        start, end = float(cold["start"]), float(cold["end"])
    except (KeyError, TypeError, ValueError):
        raise ValueError("cold_open.json needs a start and an end, in seconds.")
    if start < 5 or end > duration + 0.01 or not (1.5 <= end - start <= 8):
        raise ValueError(f"The cold open ({start:g}-{end:g} s) must start after the first 5 seconds, end inside the "
                         f"video ({duration:g} s) and last 1.5 to 8 seconds. Pick whole sentences of 2 to 6 seconds.")
    return start, end


def version_plan(info, cold, run_dir, mirror="flip"):
    """[{"name", "file", "cmd"}] for the five versions. mirror: "flip", "none", or the path of a clean export."""
    run_dir = Path(run_dir)
    src, W, H = info["video"], int(info["width"]), int(info["height"])
    audio = bool(info.get("has_audio"))
    start, end = _check_cold_open(cold, float(info["duration"]))
    a = round(max(start - LEAD, 0.0), 3)
    enc = _encode(info)
    zoom = f"scale={_even(W * ZOOM)}:{_even(H * ZOOM)},crop={W}:{H}"
    ff = lambda inp, *mid, out: ["ffmpeg", "-v", "error", "-y", "-i", inp, *mid, *enc, str(run_dir / out)]  # noqa: E731
    faster_a = ["-filter:a", f"atempo={SPEED}"] if audio else []

    if audio:
        fc = (f"[0:v]split[v1][v2];[v1]trim=start={a}:end={end},setpts=PTS-STARTPTS[cv];[v2]setpts=PTS-STARTPTS[fv];"
              f"[0:a]asplit[a1][a2];[a1]atrim=start={a}:end={end},asetpts=PTS-STARTPTS,afade=t=in:d={FADE},"
              f"afade=t=out:st={round(end - a - FADE, 3)}:d={FADE}[ca];[a2]asetpts=PTS-STARTPTS,afade=t=in:d={FADE}[fa];"
              f"[cv][ca][fv][fa]concat=n=2:v=1:a=1[v][a]")
        cold_mid = ["-filter_complex", fc, "-map", "[v]", "-map", "[a]"]
    else:
        fc = (f"[0:v]split[v1][v2];[v1]trim=start={a}:end={end},setpts=PTS-STARTPTS[cv];[v2]setpts=PTS-STARTPTS[fv];"
              f"[cv][fv]concat=n=2:v=1:a=0[v]")
        cold_mid = ["-filter_complex", fc, "-map", "[v]"]

    if mirror == "none":
        third = {"name": "Zoomed and faster", "file": "3 Zoomed and faster.mp4",
                 "cmd": ff(src, "-filter:v", f"{zoom},setpts=PTS/{SPEED}", *faster_a, out="3 Zoomed and faster.mp4")}
    else:
        msrc = src if mirror == "flip" else str(mirror)
        third = {"name": "Mirrored", "file": "3 Mirrored.mp4",
                 "cmd": ff(msrc, "-filter:v", f"hflip,scale={W}:{H}", out="3 Mirrored.mp4")}

    return [
        {"name": "Original", "file": "1 Original.mp4", "cmd": ff(src, out="1 Original.mp4")},
        {"name": "Cold open", "file": "2 Cold open.mp4", "cmd": ff(src, *cold_mid, out="2 Cold open.mp4")},
        third,
        {"name": "Zoomed", "file": "4 Zoomed.mp4", "cmd": ff(src, "-filter:v", zoom, out="4 Zoomed.mp4")},
        {"name": "Faster", "file": "5 Faster.mp4",
         "cmd": ff(src, "-filter:v", f"setpts=PTS/{SPEED}", *faster_a, out="5 Faster.mp4")},
    ]


def main(argv, run=subprocess.run):
    args = [x for x in argv if not x.startswith("--")]
    if len(args) < 1:
        print(__doc__)
        return 2
    mirror = argv[argv.index("--mirror") + 1] if "--mirror" in argv else "flip"
    run_dir = Path(args[0]).expanduser()
    info = json.loads((run_dir / "video.json").read_text(encoding="utf-8"))
    cold = json.loads((run_dir / "cold_open.json").read_text(encoding="utf-8"))
    try:
        versions = version_plan(info, cold, run_dir, mirror=mirror)
    except ValueError as e:
        print(e)
        return 2
    failed = []
    for v in versions:
        print(f"making {v['file']} ...", flush=True)
        r = run(v["cmd"], capture_output=True, text=True, timeout=TIMEOUT)
        if r.returncode != 0 or not (run_dir / v["file"]).exists():
            failed.append(v["file"])
            print(f"  failed: {(r.stderr or '').strip()[-300:]}")
    if failed:
        print("Some versions failed: " + ", ".join(failed))
        return 1
    print("Done: " + ", ".join(v["file"] for v in versions))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
