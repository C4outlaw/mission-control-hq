"""Find where people swiped away, and the words being said there.

    python3 dropoff.py <run folder>

Reads reel.json (the reel's real length), transcript.json (sentences with times) and curve.json, which Claude writes
from the retention graph screenshot: {"points": [[seconds, percent], ...], "tooltip": [seconds, percent] or null,
"end_label": seconds or null}. Writes dropoff.json: {"main", "also", "words", "also_words", "length"}.

The rules: the first 3 seconds (the hook) are judged on their own, because almost every graph falls hard there. A
later drop wins when at least 8 points of the audience leave within 2 seconds AND that fall is clearly steeper than
the curve a few seconds before and after it (a cliff or a long slide, not the hook's tail still sliding). The last 3 seconds are ignored:
people finishing the reel is not a drop-off.
"""
import json
import sys
from pathlib import Path

STEP = 0.25
CLEARER = ("I couldn't read enough of the graph. Please send a clearer screenshot of the retention graph "
           "(\"How long people watched your reel\"), not cropped, ideally after pressing on the steepest part.")


def load_curve(data, length):
    """curve.json -> sorted [(seconds, percent)], percent capped to 0..100, seconds clamped to 0..length."""
    pts = {}
    for p in data.get("points") or []:
        try:
            s, v = float(p[0]), float(p[1])
        except (TypeError, ValueError, IndexError):
            continue
        s = round(min(max(s, 0.0), float(length)), 3)
        pts[s] = min(max(v, 0.0), 100.0)
    if len(pts) < 4:
        raise ValueError(CLEARER)
    return sorted(pts.items())


def _value(curve, t):
    if t <= curve[0][0]:
        return curve[0][1]
    for (s0, v0), (s1, v1) in zip(curve, curve[1:]):
        if t <= s1:
            return v0 + (v1 - v0) * (t - s0) / (s1 - s0) if s1 > s0 else v1
    return curve[-1][1]


def _steepest(curve, start, end):
    """The middle of the steepest STEP inside start..end (ties: the middle of the tied run)."""
    xs, t = [], start
    while t + STEP <= end + 1e-9:
        xs.append(t)
        t += STEP
    if not xs:
        return round((start + end) / 2, 2)
    drops = [_value(curve, x) - _value(curve, x + STEP) for x in xs]
    best = max(drops)
    tied = [i for i, d in enumerate(drops) if d >= best - 1e-6]
    i = tied[len(tied) // 2]
    return round(xs[i] + STEP / 2, 2)


def _drop(curve, start, end, in_hook, tooltip):
    at = _steepest(curve, start, end)
    if tooltip is not None and start - 1e-9 <= float(tooltip[0]) <= end + 1e-9:
        at = round(float(tooltip[0]), 2)
    return {"start": round(start, 2), "end": round(end, 2), "at": at,
            "lost": round(_value(curve, start) - _value(curve, end), 2), "in_hook": in_hook}


def find_dropoffs(curve, length, hook=3.0, tail=3.0, min_drop=8.0, window=2.0, tooltip=None):
    """{"main": drop, "also": drop or None}; drop = {"start", "end", "at", "lost", "in_hook"}."""
    loss = lambda t: _value(curve, t) - _value(curve, min(t + window, length))  # noqa: E731
    cands, t = [], hook
    while t + window <= length - tail + 1e-9:
        here = loss(t)
        # compared with the curve 2 windows either side (review fix): a cliff or a long slide beats both, while the
        # hook's tail still sliding at 0:03-0:07 doesn't, because 2 windows back is still inside the hook's fall
        before = loss(max(t - 2 * window, 0.0))
        after = loss(t + 2 * window) if t + 3 * window <= length else 0.0
        cands.append((here, here - max(before, after), t))
        t += STEP
    main_c = [c for c in cands if c[0] >= min_drop and c[1] >= min_drop / 2]
    hook_drop = _drop(curve, 0.0, min(hook, length), True, tooltip)
    if main_c:
        best = max(main_c)
        main = _drop(curve, best[2], best[2] + window, False, tooltip)
    else:
        best, main = None, hook_drop
    rest = [c for c in cands if c[0] >= min_drop / 2 and c[1] >= min_drop / 4
            and (best is None or abs(c[2] - best[2]) >= window)]
    also = _drop(curve, max(rest)[2], max(rest)[2] + window, False, None) if rest else None
    return {"main": main, "also": also}


def words_at(sentences, start, end, before=3.0, after=1.0):
    """Whole sentences spoken from `before` s ahead of the drop to `after` s past it."""
    lo, hi = start - before, end + after
    hit = [s for s in sentences if s["s"] < hi and s["e"] > lo]
    if not hit:
        return {"from": round(lo, 2), "to": round(hi, 2), "text": ""}
    return {"from": hit[0]["s"], "to": hit[-1]["e"], "text": " ".join(s["text"] for s in hit)}


def main(argv):
    if len(argv) != 1:
        print(__doc__)
        return 2
    run = Path(argv[0]).expanduser()
    read = lambda name: json.loads((run / name).read_text(encoding="utf-8"))  # noqa: E731
    reel, transcript, data = read("reel.json"), read("transcript.json"), read("curve.json")
    length = float(reel.get("duration") or data.get("end_label") or 0)
    end_label = data.get("end_label")
    try:
        if isinstance(end_label, (int, float)) and length > 0 and abs(end_label - length) > 0.1 * length + 1:
            raise ValueError(f"The graph says the reel is {end_label:g} seconds long, but this reel is {length:g} seconds. "
                             "Make sure the screenshot and the reel are the same one, or send a clearer screenshot.")
        if length <= 0:
            raise ValueError("I don't know how long the reel is. Send the reel's link or video file again.")
        curve = load_curve(data, length)
    except ValueError as e:
        print(e)
        return 2
    found = find_dropoffs(curve, length, tooltip=data.get("tooltip"))
    sent = transcript.get("sentences") or []
    out = {"main": found["main"], "also": found["also"],
           "words": words_at(sent, found["main"]["start"], found["main"]["end"]),
           "also_words": words_at(sent, found["also"]["start"], found["also"]["end"]) if found["also"] else None,
           "length": length}
    (run / "dropoff.json").write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
    m = out["main"]
    print(f"main drop-off at {m['at']} s ({'the hook' if m['in_hook'] else 'mid-reel'}), {m['lost']} points lost")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
