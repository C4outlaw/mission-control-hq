"""The numbers: medians, outlier multiples, top and bottom reels, posting rhythm.

    python3 metrics.py jobs <data.json> <jobs.json> user|competitor
                                          the download list: your top 5 + bottom 5, or each competitor's top 5
    python3 metrics.py merge <data.json> <pulled.json>   adds the downloaded reels into data.json
    python3 metrics.py fill <data.json>   writes each reel's outlier and each account's rhythm, in place
"""
import json
import math
import statistics
import sys
from datetime import date
from pathlib import Path


def to_int(value):
    """Instagram shows counts like "12.3K", "1.2M" or "3,450". Turn any of them into a whole number."""
    if value is None or isinstance(value, bool):
        return 0
    if isinstance(value, (int, float)):
        return int(value)
    text = str(value).strip().lower().replace(",", "").replace(" ", "")
    mult = 1
    for suffix, m in (("k", 1_000), ("m", 1_000_000), ("b", 1_000_000_000)):
        if text.endswith(suffix):
            text, mult = text[:-1], m
            break
    try:
        return int(round(float(text) * mult))
    except ValueError:
        return 0


def _iso(value):
    try:
        return date.fromisoformat(str(value)[:10])
    except ValueError:
        return None


def median(xs):
    xs = [to_int(x) for x in xs if x is not None]
    return float(statistics.median(xs)) if xs else 0.0


def outlier(views, account_views):
    m = median(account_views)
    return round(views / m, 1) if m else 0.0


def _recent(grid, window):
    return sorted(grid, key=lambda r: r.get("date", ""), reverse=True)[:window]


def _by_views(reels):
    return sorted(reels, key=lambda r: to_int(r.get("views")), reverse=True)


def top_bottom(grid, window=30, n=5):
    """The user's best and worst recent reels. Never the same reel in both."""
    ranked = _by_views(_recent(grid, window))
    k = min(n, math.ceil(len(ranked) / 2))
    top = ranked[:k]
    rest = ranked[k:]
    bottom = rest[-n:] if rest else []
    return top, bottom


def top_n(grid, window=30, n=5):
    return _by_views(_recent(grid, window))[:n]


def rhythm(grid, durations):
    dates = sorted(d for d in (_iso(r.get("date")) for r in grid if r.get("date")) if d)
    if dates:
        weeks = max(1.0, (dates[-1] - dates[0]).days / 7)
        ppw = round(len(dates) / weeks, 1)
    else:
        ppw = 0.0
    return {"posts_per_week": ppw, "median_length": median(durations)}


def jobs(data, role):
    out = []
    for acc in data.get("accounts", []):
        if acc.get("role") != role:
            continue
        grid = acc.get("grid", [])
        if role == "user":
            top, bottom = top_bottom(grid)
            picks = [(r, "top") for r in top] + [(r, "bottom") for r in bottom]
        else:
            picks = [(r, "top") for r in top_n(grid)]
        out += [{"account": acc["handle"], "url": r["url"], "pick": pick} for r, pick in picks]
    return out


def merge(data, pulled):
    """Put downloaded reels into their account. Views and date come from the grid the browser read."""
    by_handle = {a["handle"]: a for a in data.get("accounts", [])}
    for p in pulled:
        acc = by_handle.get(p.get("account"))
        if acc is None:
            continue
        g = next((r for r in acc.get("grid", []) if r.get("url") == p["url"]), {})
        reel = {k: v for k, v in p.items() if k not in ("account", "audio")}
        reel["views"] = g.get("views", p.get("views", 0))
        reel["date"] = g.get("date") or p.get("date", "")
        if not reel.get("caption") and g.get("caption"):
            reel["caption"] = g["caption"]
        reels = acc.setdefault("reels", [])
        reels[:] = [r for r in reels if r.get("url") != p["url"]] + [reel]
    return data


def fill(data):
    for acc in data.get("accounts", []):
        profile = acc.get("profile") or {}
        if "followers" in profile:
            profile["followers"] = to_int(profile["followers"])
        grid = acc.get("grid", [])
        for r in grid:
            r["views"] = to_int(r.get("views"))
        for r in acc.get("reels", []):
            r["views"] = to_int(r.get("views"))
        views = [r.get("views") for r in grid if r.get("views") is not None]
        for reel in acc.get("reels", []):
            reel["outlier"] = outlier(reel.get("views") or 0, views)
        acc["rhythm"] = rhythm(grid, [r.get("duration") for r in acc.get("reels", []) if r.get("duration")])
    return data


def main(argv):
    if len(argv) == 4 and argv[0] == "jobs":
        data = json.loads(Path(argv[1]).read_text(encoding="utf-8"))
        out = jobs(data, argv[3])
        Path(argv[2]).write_text(json.dumps(out, indent=2), encoding="utf-8")
        print(f"{len(out)} reels to download:", argv[2])
        return 0
    if len(argv) == 3 and argv[0] == "merge":
        path = Path(argv[1])
        data = merge(json.loads(path.read_text(encoding="utf-8")), json.loads(Path(argv[2]).read_text(encoding="utf-8")))
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        print("Reels added to", path)
        return 0
    if len(argv) != 2 or argv[0] != "fill":
        print(__doc__)
        return 2
    path = Path(argv[1])
    data = fill(json.loads(path.read_text(encoding="utf-8")))
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print("Numbers filled:", path)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
