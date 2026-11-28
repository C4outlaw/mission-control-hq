"""Turn an audit's data.json into report.html and report.md, then open the HTML.

    python3 report.py <data.json>
"""
import base64
import html
import json
import os
import subprocess
import sys
from collections import Counter
from pathlib import Path

from metrics import to_int
from score import load_labels, load_rubric

SKILL = Path(__file__).resolve().parents[1]
FONTS = ("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400"
         "&family=Plus+Jakarta+Sans:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap")
THIN = "Some reels couldn't be downloaded, so topics and hooks are thinner than usual."

CSS = """
:root{--page:#F2F2F2;--ink:#1F1D1B;--ink2:#4A4642;--muted:#8A847D;--clay:#B03926;--line:#E2DEDA;--card:#FFFFFF;
--soft:#F8F6F4;--serif:'Newsreader',Georgia,'Times New Roman',serif;--ui:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
--mono:'DM Mono',ui-monospace,Menlo,monospace}
*{box-sizing:border-box}
body{margin:0;background:var(--page);color:var(--ink);font:400 15px/1.55 var(--ui);
background-image:linear-gradient(rgba(0,0,0,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.035) 1px,transparent 1px);
background-size:28px 28px}
.wrap{max-width:1040px;margin:0 auto;padding:40px 16px 80px}
header{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
header img{height:30px;width:auto}
.label{font:500 11px/1.4 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--clay)}
h1{font:400 clamp(38px,6.4vw,68px)/1.02 var(--serif);letter-spacing:-.02em;margin:34px 0 12px}
h1 em,h2 em{font-style:normal;color:var(--clay)}
.lede{font-size:17px;color:var(--ink2);max-width:640px;margin:0}
section{margin-top:64px}
h2{font:400 clamp(28px,4.2vw,40px)/1.08 var(--serif);letter-spacing:-.015em;margin:8px 0 18px}
.notice{margin-top:28px;padding:14px 18px;border:1px solid var(--clay);border-radius:12px;background:#fff;color:var(--clay);font-weight:600}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:22px}
.scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:16px;border:1px solid var(--line);background:#fff}
table{border-collapse:collapse;width:100%;min-width:560px}
th,td{padding:10px 14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
th{font:500 11px/1.3 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);background:var(--soft)}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
.you{background:rgba(176,57,38,.06)}
tr.total td{font:400 30px/1 var(--serif);border-bottom:0;padding-top:16px;padding-bottom:16px}
tr.total td.you{color:var(--clay)}
.max{color:var(--muted);font-size:12px}
.skipped{margin:12px 2px 0;color:var(--muted);font-size:13px}
.fixes{display:grid;gap:14px;counter-reset:fix}
.fix{display:grid;grid-template-columns:auto 1fr;gap:4px 18px}
.fix .n{font:400 44px/1 var(--serif);color:var(--clay);grid-row:span 3}
.fix h3{margin:0;font:700 17px/1.3 var(--ui)}
.fix h3 small{font:500 11px var(--mono);letter-spacing:.1em;color:var(--clay);margin-left:8px;text-transform:uppercase}
.fix p{margin:0;color:var(--ink2)}
.copy{margin-top:8px;padding:12px 14px;border-left:3px solid var(--clay);background:var(--soft);border-radius:0 10px 10px 0;
white-space:pre-wrap;font-weight:500}
.phones{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.phone{background:#fff;border:1px solid var(--line);border-radius:28px;padding:22px 20px;max-width:420px}
.phone .tag{margin-bottom:14px}
.prow{display:flex;align-items:center;gap:16px}
.avatar{width:74px;height:74px;border-radius:50%;background:linear-gradient(135deg,#d9d3cd,#bfb6ad);flex:none;
outline:3px solid #fff;box-shadow:0 0 0 2px var(--line)}
.avatar.ring{box-shadow:0 0 0 2.5px var(--clay)}
.stats{display:flex;gap:18px;font-size:13px;color:var(--ink2)}.stats b{display:block;color:var(--ink);font-size:16px}
.pname{font-weight:700;margin-top:12px}.pbio{white-space:pre-wrap;margin:2px 0;font-size:14px}
.plink{color:#2c4a8a;font-size:14px;font-weight:600}
.hls{display:flex;gap:12px;margin-top:14px;overflow:hidden}
.hl{text-align:center;font-size:11px;color:var(--ink2);width:58px;flex:none}
.hl i{display:block;width:52px;height:52px;margin:0 auto 4px;border-radius:50%;border:1px solid var(--line);background:var(--soft)}
.pins{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:14px}
.pin{aspect-ratio:3/4;background:var(--soft);border-radius:6px;display:flex;align-items:flex-end;padding:6px;font-size:10.5px;
font-weight:700;color:var(--ink2);position:relative}
.pin::before{content:"📌";position:absolute;top:5px;right:6px;font-size:10px}
.pin.empty{opacity:.45}.pin.empty::before{content:""}
.dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--clay)}
.chip{display:inline-block;font:500 10.5px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--clay);
border-radius:99px;padding:2px 8px;margin-left:6px}
a{color:var(--clay)}
.bar{height:10px;border-radius:99px;background:var(--line);overflow:hidden;min-width:70px}
.bar i{display:block;height:100%;background:var(--clay)}
.share{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink2)}
.list{margin:0;padding-left:20px}.list li{margin:6px 0}
.reels{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:10px}
.reel{font-size:12px;color:var(--ink2);text-decoration:none}.reel img,.reel .ph{width:100%;aspect-ratio:9/16;object-fit:cover;border-radius:8px;background:var(--soft);display:block}
.reel b{color:var(--ink)}.reel i{color:var(--ink)}.reel .chip{margin:4px 0 2px}
.ideas{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.idea .hook{font:italic 400 22px/1.25 var(--serif);margin:8px 0 12px}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
footer{margin-top:72px;color:var(--muted);font-size:13px;display:flex;gap:10px;align-items:center}
footer img{height:18px}
@media (max-width:720px){.phones,.cols{grid-template-columns:1fr}.reels{grid-template-columns:repeat(3,1fr)}
.fix .n{font-size:34px}section{margin-top:48px}}
"""


def e(text):
    # Attributes are always double-quoted, so single quotes can stay readable.
    return html.escape(str(text if text is not None else ""), quote=False).replace('"', "&quot;")


def _wordmark_uri():
    png = (SKILL / "assets" / "wordmark.png").read_bytes()
    return "data:image/png;base64," + base64.b64encode(png).decode()


def _user(data):
    return next((a for a in data["accounts"] if a.get("role") == "user"), data["accounts"][0])


def _competitors(data):
    return [a for a in data["accounts"] if a.get("role") != "user"]


def _all_reels(data):
    return [r for a in data["accounts"] for r in a.get("reels", [])]


def is_thin(data):
    reels = _all_reels(data)
    return bool(reels) and sum(r.get("status") == "caption_only" for r in reels) > len(reels) / 2


def _rel(path, base):
    if not path or base is None:
        return ""
    try:
        return os.path.relpath(path, base)
    except ValueError:
        return ""


def _num(v):
    """Counts may arrive as 12.3K or None; always show a whole number with commas."""
    return f"{to_int(v):,}"


def _total(a):
    return (a.get("score") or {}).get("total", "–")


def _text(v):
    """Fields Claude may write as a list (several options) read as lines."""
    if isinstance(v, (list, tuple)):
        return "\n".join(str(x) for x in v)
    return "" if v is None else str(v)


def _you(a):
    return " you" if a.get("role") == "user" else ""


def _scorecard(data, rubric):
    accs = data["accounts"]
    head = "".join(f'<th class="num{_you(a)}">@{e(a.get("handle"))}</th>' for a in accs)
    rows = []
    for item in rubric["items"]:
        cells = "".join(
            f'<td class="num{_you(a)}">'
            f'{e(((a.get("score") or {}).get("items") or {}).get(item["id"], {}).get("points", "–"))}</td>' for a in accs)
        rows.append(f'<tr><td>{e(item["label"])} <span class="max">/ {item["points"]}</span></td>{cells}</tr>')
    totals = "".join(f'<td class="num{_you(a)}">{e(_total(a))}</td>' for a in accs)
    skipped = ""
    if data.get("skipped"):
        names = ", ".join(f'@{e(s.get("handle"))}' + (f' ({e(s.get("reason"))})' if s.get("reason") else "")
                          for s in data["skipped"])
        skipped = f'<p class="skipped">Skipped: {names}.</p>'
    return (f'<section id="scorecard"><div class="label">01 · Scorecard</div><h2>You against the accounts '
            f'<em>beating you</em></h2><div class="scroll"><table><thead><tr><th>Part of the profile</th>{head}</tr>'
            f'</thead><tbody>{"".join(rows)}<tr class="total"><td>Total</td>{totals}</tr></tbody></table></div>'
            f'{skipped}</section>')


def _fixes(data, rubric):
    labels = {i["id"]: i["label"] for i in rubric["items"]}
    cards = []
    for n, f in enumerate(data.get("fixes", []), 1):
        item = f.get("item", "")
        cards.append(f'<div class="card fix"><div class="n">{n}</div><h3>{e(labels.get(item, item))}'
                     f'<small>+{e(f.get("points_lost", 0))} points</small></h3><p>{e(f.get("evidence"))}</p>'
                     f'<div class="copy">{e(_text(f.get("rewrite")))}</div></div>')
    return (f'<section id="fixes"><div class="label">02 · Top fixes</div><h2>Fix these <em>first</em></h2>'
            f'<div class="fixes">{"".join(cards)}</div></section>')


def _phone(tag, p, followers, story):
    hls = "".join(f'<div class="hl"><i></i>{e(h)}</div>' for h in (p.get("highlights") or [])[:5])
    pins = list(p.get("pinned") or [])
    pin_html = "".join(f'<div class="pin">{e(x)}</div>' for x in pins[:3])
    pin_html += '<div class="pin empty">Not pinned</div>' * (3 - min(3, len(pins)))
    return (f'<div class="phone"><div class="label tag">{e(tag)}</div><div class="prow">'
            f'<div class="avatar{" ring" if story else ""}"></div><div class="stats"><div><b>{e(_num(followers))}</b>'
            f'followers</div></div></div><div class="pname">{e(p.get("name_field"))}</div>'
            f'<div class="pbio">{e(_text(p.get("bio")))}</div><div class="plink">{e(p.get("link"))}</div>'
            f'<div class="hls">{hls}</div><div class="pins">{pin_html}</div></div>')


def _before_after(data):
    u = _user(data)
    now = u.get("profile") or {}
    after = {**now, **{k: v for k, v in (data.get("after") or {}).items() if v}}
    f = now.get("followers")
    return (f'<section id="before-after"><div class="label">03 · Before and after</div><h2>Your profile, '
            f'<em>fixed</em></h2><div class="phones">{_phone("Now", now, f, now.get("story_up"))}'
            f'{_phone("After the fixes", after, f, True)}</div></section>')


def _gaps(data):
    accs = data["accounts"]
    gap_topics = {g.get("topic"): g for g in data.get("gaps", []) if g.get("topic")}
    topics = list(dict.fromkeys(list(data.get("niche", {}).get("topics", [])) + list(gap_topics)))
    head = "".join(f'<th>@{e(a.get("handle"))}</th>' for a in accs)
    rows = []
    for t in topics:
        cells = "".join(
            f'<td>{"<span class=dot></span>" if any(t in (r.get("topics") or []) for r in a.get("reels", [])) else ""}</td>'
            for a in accs)
        g = gap_topics.get(t)
        mark = ""
        if g:
            mark = '<span class="chip">Gap</span>'
            if g.get("proof_url"):
                mark += f' <a href="{e(g["proof_url"])}">proof</a>'
        rows.append(f'<tr><td>{e(t)} {mark}</td>{cells}</tr>')
    return (f'<section id="gaps"><div class="label">04 · Topic gaps</div><h2>What they talk about that <em>you '
            f'don\'t</em></h2><div class="scroll"><table><thead><tr><th>Topic</th>{head}</tr></thead>'
            f'<tbody>{"".join(rows)}</tbody></table></div></section>')


def _share_table(data, key, names):
    accs = data["accounts"]
    counts = {a.get("handle"): Counter(r.get(key) for r in a.get("reels", []) if r.get(key)) for a in accs}
    used = [k for k in names if any(counts[a.get("handle")][k] for a in accs)]
    head = "".join(f'<th>@{e(a.get("handle"))}</th>' for a in accs)
    rows = []
    for k in used:
        cells = []
        for a in accs:
            total = sum(counts[a.get("handle")].values()) or 1
            pct = round(100 * counts[a.get("handle")][k] / total)
            cells.append(f'<td><div class="share"><div class="bar"><i style="width:{pct}%"></i></div>{pct}%</div></td>')
        rows.append(f'<tr><td>{e(k.replace("_", " ").capitalize())}</td>{"".join(cells)}</tr>')
    return f'<div class="scroll"><table><thead><tr><th></th>{head}</tr></thead><tbody>{"".join(rows)}</tbody></table></div>'


def _rhythm_table(data):
    accs = data["accounts"]
    head = "".join(f'<th class="num">@{e(a.get("handle"))}</th>' for a in accs)
    ppw = "".join(f'<td class="num">{e((a.get("rhythm") or {}).get("posts_per_week", "–"))}</td>' for a in accs)
    length = "".join(f'<td class="num">{e(round((a.get("rhythm") or {}).get("median_length") or 0))} s</td>' for a in accs)
    return (f'<div class="scroll"><table><thead><tr><th></th>{head}</tr></thead><tbody>'
            f'<tr><td>Posts per week</td>{ppw}</tr><tr><td>Typical reel length</td>{length}</tr></tbody></table></div>')


def _style_counts(reels):
    c = Counter(r.get("hook_style") for r in reels if r.get("hook_style"))
    if not c:
        return "<li>Not enough reels to tell.</li>"
    return "".join(f"<li>{e(k.replace('_', ' ').capitalize())}: {n} of {sum(c.values())}</li>" for k, n in c.most_common(4))


def _types_hooks(data):
    labels = load_labels()
    winners = [r for a in _competitors(data) for r in a.get("reels", [])]
    flops = [r for r in _user(data).get("reels", []) if r.get("pick") == "bottom"]
    return (f'<section id="types-hooks"><div class="label">05 · Content types and hooks</div><h2>How their '
            f'<em>best reels</em> are made</h2><h3 class="label" style="margin:18px 0 10px">Content types</h3>'
            f'{_share_table(data, "content_type", list(labels["content_types"]))}'
            f'<h3 class="label" style="margin:26px 0 10px">Hook styles</h3>'
            f'{_share_table(data, "hook_style", list(labels["hook_styles"]))}'
            f'<div class="cols" style="margin-top:18px"><div class="card"><div class="label">Their winners open with</div>'
            f'<ul class="list">{_style_counts(winners)}</ul></div><div class="card"><div class="label">Your flops open with'
            f'</div><ul class="list">{_style_counts(flops)}</ul></div></div>'
            f'<h3 class="label" style="margin:26px 0 10px">Rhythm</h3>{_rhythm_table(data)}</section>')


def _reel_strip(reels, base):
    out = []
    for r in reels:
        src = _rel((r.get("frames") or [""])[0], base)
        img = f'<img src="{e(src)}" alt="">' if src else '<div class="ph"></div>'
        cap = " ".join((r.get("caption") or "").split())
        cap = cap[:70] + ("…" if len(cap) > 70 else "")
        views = _num(r.get("views"))
        chip = '<span class="chip">Caption only</span><br>' if r.get("status") == "caption_only" else ""
        first = f'<i>"{e(r.get("hook_line"))}"</i><br>' if r.get("hook_line") else ""
        out.append(f'<a class="reel" href="{e(r.get("url"))}" title="{e(cap)}">{img}{chip}<b>{e(views)}</b> '
                   f'views · {e(r.get("outlier", 0))}x<br>{first}{e(cap)}</a>')
    return f'<div class="reels">{"".join(out)}</div>'


def _failures(data):
    failed = [(a.get("handle"), r) for a in data["accounts"] for r in a.get("reels", [])
              if r.get("status") == "caption_only"]
    if not failed:
        return ""
    items = "".join(f'<li>@{e(h)} <a href="{e(r.get("url"))}">reel</a>: {e(r.get("reason") or "could not download")}</li>'
                    for h, r in failed)
    return (f'<p class="skipped">Read from the caption only ({len(failed)}), because the download failed:</p>'
            f'<ul class="list skipped">{items}</ul>')


def _winners_flops(data, base):
    u = _user(data)
    top = [r for r in u.get("reels", []) if r.get("pick") == "top"]
    bottom = [r for r in u.get("reels", []) if r.get("pick") == "bottom"]
    points = "".join(f"<li>{e(p)}</li>" for p in data.get("winners_vs_flops", []))
    return (f'<section id="winners-flops"><div class="label">06 · Your winners vs your flops</div><h2>What your '
            f'<em>best reels</em> have</h2><div class="card"><ul class="list">{points}</ul>'
            f'<h3 class="label" style="margin:20px 0 0">Your top {len(top)}</h3>{_reel_strip(top, base)}'
            f'<h3 class="label" style="margin:20px 0 0">Your bottom {len(bottom)}</h3>{_reel_strip(bottom, base)}</div>'
            f'{_failures(data)}</section>')


def _ideas(data):
    cards = "".join(
        f'<div class="card idea"><div class="label">{e(i.get("gap_topic"))}</div>'
        f'<div class="hook">"{e(i.get("hook") or i.get("title"))}"</div><div>{e(i.get("title"))}</div>'
        + (f'<a href="{e(i["proof_url"])}">The reel that proves it works</a>' if i.get("proof_url") else "")
        + '</div>'
        for i in data.get("ideas", []))
    return (f'<section id="ideas"><div class="label">07 · Video ideas</div><h2>Videos to make <em>next</em></h2>'
            f'<div class="ideas">{cards}</div></section>')


def render_html(data, rubric, base=None):
    u = _user(data)
    comps = _competitors(data)
    totals = [t for t in (_total(a) for a in comps) if isinstance(t, (int, float))]
    avg = round(sum(totals) / len(totals)) if totals else "–"
    wm = _wordmark_uri()
    niche = data.get("niche", {}).get("line") or "your niche"
    if len(niche) > 1 and niche[0].isupper() and niche[1].islower():
        niche = niche[0].lower() + niche[1:]
    notice = f'<div class="notice">{e(THIN)}</div>' if is_thin(data) else ""
    handle = e(u.get("handle"))
    run_date = e((data.get("run") or {}).get("date"))
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>IG Audit · @{handle}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{FONTS}" rel="stylesheet"><style>{CSS}</style></head><body><div class="wrap">
<header><img src="{wm}" alt="CreatorPro"><div class="label">IG Audit · @{handle} · {run_date}</div></header>
<h1>Your profile scores <em>{e(_total(u))}</em> out of 100.</h1>
<p class="lede">The accounts beating you in {e(niche)} average {avg}.
Here's exactly where the points go, and what their best reels do that yours don't.</p>{notice}
{_scorecard(data, rubric)}{_fixes(data, rubric)}{_before_after(data)}{_gaps(data)}{_types_hooks(data)}
{_winners_flops(data, base)}{_ideas(data)}
<footer><img src="{wm}" alt="CreatorPro"> IG-audit, free from CreatorPro</footer></div></body></html>"""


def render_md(data, rubric):
    u = _user(data)
    labels = {i["id"]: i["label"] for i in rubric["items"]}
    lines = [f"# IG Audit: @{u.get('handle')} ({(data.get('run') or {}).get('date', '')})", "",
             f"**Your score: {_total(u)} / 100.** " +
             ", ".join(f"@{a.get('handle')}: {_total(a)}" for a in _competitors(data)), ""]
    if is_thin(data):
        lines += [f"> {THIN}", ""]
    if data.get("skipped"):
        lines += ["Skipped: " + ", ".join(f"@{s.get('handle')}" + (f" ({s['reason']})" if s.get("reason") else "")
                                          for s in data["skipped"]), ""]
    lines += ["## Top fixes", ""]
    for n, f in enumerate(data.get("fixes", []), 1):
        item = f.get("item", "")
        lines += [f"{n}. **{labels.get(item, item)}** (+{f.get('points_lost', 0)} points). {f.get('evidence', '')}", "",
                  "   " + _text(f.get("rewrite")).replace("\n", "\n   "), ""]
    lines += ["## Topic gaps", ""] + [f"- **{g.get('topic', '')}**: covered by " +
                                      ", ".join("@" + c for c in g.get("competitors", [])) +
                                      (f" ({g['proof_url']})" if g.get("proof_url") else "") for g in data.get("gaps", [])]
    lines += ["", "## Your winners vs your flops", ""] + [f"- {p}" for p in data.get("winners_vs_flops", [])]
    lines += ["", "## Video ideas", ""] + [f"{n}. \"{i.get('hook') or i.get('title', '')}\" "
                                           f"({i.get('gap_topic', '')}, proof: {i.get('proof_url', '')})"
                                           for n, i in enumerate(data.get("ideas", []), 1)]
    return "\n".join(lines) + "\n"


def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    if len(args) != 1:
        print(__doc__)
        return 2
    path = Path(args[0]).resolve()
    data = json.loads(path.read_text(encoding="utf-8"))
    rubric = load_rubric()
    out = path.with_name("report.html")
    out.write_text(render_html(data, rubric, base=path.parent), encoding="utf-8")
    path.with_name("report.md").write_text(render_md(data, rubric), encoding="utf-8")
    print("Report saved:", out)
    if "--no-open" not in argv:
        opener = ["open"] if sys.platform == "darwin" else (["cmd", "/c", "start", ""] if os.name == "nt" else ["xdg-open"])
        subprocess.run(opener + [str(out)], check=False)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
