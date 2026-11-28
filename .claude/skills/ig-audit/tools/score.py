"""Check profile scores against the rubric, and reel labels against labels.json.

    python3 score.py fill <data.json>          checks every account's score and writes its total
    python3 score.py check-labels <data.json>  checks every reel's content_type and hook_style
Both exit 1 and print the problems when something is wrong.
"""
import json
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parents[1]


def load_rubric(path=None):
    return json.loads(Path(path or SKILL / "rubric.json").read_text(encoding="utf-8"))


def load_labels(path=None):
    return json.loads(Path(path or SKILL / "labels.json").read_text(encoding="utf-8"))


def validate(score, rubric):
    problems = []
    items = score.get("items", {})
    known = {i["id"]: i for i in rubric["items"]}
    for key in items:
        if key not in known:
            problems.append(f"unknown rubric item: {key}")
    for key, item in known.items():
        if key not in items:
            problems.append(f"missing rubric item: {key}")
            continue
        pts = items[key].get("points")
        if not isinstance(pts, (int, float)) or pts < 0 or pts > item["points"]:
            problems.append(f"{key}: points must be 0 to {item['points']}, got {pts!r}")
    return problems


def total(score, rubric):
    ids = {i["id"] for i in rubric["items"]}
    return int(round(sum(v.get("points", 0) for k, v in score.get("items", {}).items() if k in ids)))


def fill(data, rubric):
    problems = []
    for acc in data.get("accounts", []):
        s = acc.get("score") or {}
        found = validate(s, rubric)
        problems += [f"@{acc.get('handle')}: {p}" for p in found]
        if not found:
            s["total"] = total(s, rubric)
    return problems


def check_labels(data, labels):
    types, hooks = set(labels["content_types"]), set(labels["hook_styles"])
    problems = []
    for acc in data.get("accounts", []):
        for reel in acc.get("reels", []):
            if reel.get("content_type") not in types:
                problems.append(f"@{acc.get('handle')} {reel.get('url')}: content_type {reel.get('content_type')!r}")
            if reel.get("hook_style") not in hooks:
                problems.append(f"@{acc.get('handle')} {reel.get('url')}: hook_style {reel.get('hook_style')!r}")
    return problems


def main(argv):
    if len(argv) != 2 or argv[0] not in ("fill", "check-labels"):
        print(__doc__)
        return 2
    path = Path(argv[1])
    data = json.loads(path.read_text(encoding="utf-8"))
    if argv[0] == "fill":
        problems = fill(data, load_rubric())
        if not problems:
            path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    else:
        problems = check_labels(data, load_labels())
    if problems:
        print("\n".join(problems))
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
