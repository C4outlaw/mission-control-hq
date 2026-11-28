"""Turn a Post-Mortem run folder into post-mortem.html and post-mortem.md, then open the HTML.

    python3 report.py <run folder> [--no-open]

Reads reel.json, transcript.json, curve.json, dropoff.json and rewrite.json (Claude writes the last one:
{"voice": [...], "why": "...", "original": "...", "rewrites": [{"label", "text"}], "stats": {...} or null}).
"""
import base64
import html
import json
import os
import subprocess
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parents[1]
FONTS = ("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400"
         "&family=Plus+Jakarta+Sans:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap")
NO_WORDS = "No words were spoken at this point, so people left on what they saw: the opening picture and on-screen text."

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
h1{font:400 clamp(38px,6.4vw,64px)/1.04 var(--serif);letter-spacing:-.02em;margin:34px 0 12px}
h1 em,h2 em{font-style:normal;color:var(--clay)}
.lede{font-size:17px;color:var(--ink2);max-width:680px;margin:0}
section{margin-top:56px}
h2{font:400 clamp(28px,4.2vw,40px)/1.08 var(--serif);letter-spacing:-.015em;margin:8px 0 18px}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:22px}
.graph{background:#0E1014;border-radius:16px;padding:18px 14px 8px}
.graph svg{width:100%;height:auto;display:block}
.stats{display:flex;flex-wrap:wrap;gap:22px;margin-top:16px;font-size:13px;color:var(--ink2)}
.stats b{display:block;color:var(--ink);font:400 26px/1.1 var(--serif)}
.line{margin:0;padding:8px 12px;border-radius:10px;color:var(--ink2)}
.line .t{font:500 12px var(--mono);color:var(--muted);margin-right:14px}
.line.hit{background:rgba(176,57,38,.09);color:var(--ink);font-weight:600}
.line.hit .t{color:var(--clay)}
.why{font:italic 400 24px/1.3 var(--serif);margin:0}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.original{padding:14px 16px;border-radius:12px;background:var(--soft);color:var(--muted);text-decoration:line-through;
text-decoration-color:rgba(176,57,38,.5);white-space:pre-wrap}
.rw h3{margin:0 0 8px;font:500 11px/1.3 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--clay)}
.copy{padding:12px 14px;border-left:3px solid var(--clay);background:var(--soft);border-radius:0 10px 10px 0;white-space:pre-wrap;font-weight:500}
button{margin-top:10px;font:600 13px var(--ui);border:1px solid var(--line);background:#fff;border-radius:99px;padding:6px 14px;cursor:pointer}
.list{margin:0;padding-left:20px}.list li{margin:6px 0}
footer{margin-top:72px;color:var(--muted);font-size:13px;display:flex;gap:10px;align-items:center}
footer img{height:18px}
@media (max-width:720px){.cols{grid-template-columns:1fr}section{margin-top:44px}}
"""


def e(text):
    return html.escape(str(text if text is not None else ""), quote=False).replace('"', "&quot;")


def ts(seconds):
    s = int(round(float(seconds)))
    return f"{s // 60}:{s % 60:02d}"


def _title(caption, limit=44):
    """The caption's first line, cut on a word with an ellipsis when it is long."""
    line = (caption or "").strip().splitlines()[0].strip() if (caption or "").strip() else ""
    if len(line) <= limit:
        return line or "your reel"
    return line[:limit].rsplit(" ", 1)[0].rstrip(" ,;:-") + "…"


def _load(run):
    run = Path(run)
    read = lambda n: json.loads((run / n).read_text(encoding="utf-8"))  # noqa: E731
    return {n: read(n + ".json") for n in ("reel", "transcript", "curve", "dropoff", "rewrite")}


def _wordmark_uri():
    png = (SKILL / "assets" / "wordmark.png").read_bytes()
    return "data:image/png;base64," + base64.b64encode(png).decode()


def _graph(curve, drop, length):
    W, H, L, R, T, B = 960, 300, 56, 16, 14, 34
    x = lambda s: L + (W - L - R) * float(s) / length  # noqa: E731
    y = lambda v: T + (H - T - B) * (1 - float(v) / 100)  # noqa: E731
    pts = " ".join(f"{x(min(s, length)):.1f},{y(min(max(v, 0), 100)):.1f}" for s, v in curve.get("points", []))
    grid = "".join(f'<line x1="{L}" x2="{W - R}" y1="{y(v):.1f}" y2="{y(v):.1f}" stroke="#2E3238"/>'
                   f'<text x="{L - 10}" y="{y(v) + 4:.1f}" fill="#9AA0A6" font-size="13" text-anchor="end">{v}%</text>'
                   for v in (100, 50, 0))
    band = lambda d, cls, color: (  # noqa: E731
        f'<g class="{cls}"><rect x="{x(d["start"]):.1f}" y="{T}" width="{max(x(d["end"]) - x(d["start"]), 3):.1f}" '
        f'height="{H - T - B}" fill="{color}" opacity=".22"/><line x1="{x(d["at"]):.1f}" x2="{x(d["at"]):.1f}" y1="{T}" '
        f'y2="{H - B}" stroke="{color}" stroke-dasharray="4 4"/><text x="{x(d["at"]) + 6:.1f}" y="{T + 16}" fill="#fff" '
        f'font-size="14" font-weight="700">{ts(d["at"])}</text></g>')
    also = band(drop["also"], "also", "#9AA0A6") if drop.get("also") else ""
    return (f'<div class="graph"><svg viewBox="0 0 {W} {H}" role="img" aria-label="Retention graph">{grid}'
            f'{band(drop["main"], "drop", "#FF4FD8")}{also}'
            f'<polyline points="{pts}" fill="none" stroke="#D63AD0" stroke-width="4" stroke-linejoin="round"/>'
            f'<text x="{L}" y="{H - 8}" fill="#9AA0A6" font-size="13">0:00</text>'
            f'<text x="{W - R}" y="{H - 8}" fill="#9AA0A6" font-size="13" text-anchor="end">{ts(length)}</text></svg></div>')


def _transcript(sentences, words):
    if not sentences:
        return f'<p class="lede">{e(NO_WORDS)}</p>'
    lo, hi = float(words.get("from", 0)), float(words.get("to", 0))
    hit = lambda s: bool(words.get("text")) and s["s"] < hi and s["e"] > lo  # noqa: E731
    return "".join(f'<p class="line{" hit" if hit(s) else ""}"><span class="t">{ts(s["s"])}</span>{e(s["text"])}</p>'
                   for s in sentences)


def render_html(run):
    d = _load(run)
    drop, rw, reel = d["dropoff"], d["rewrite"], d["reel"]
    m, length = drop["main"], float(drop.get("length") or reel.get("duration") or 1)
    where = "in the hook" if m["in_hook"] else f"at {ts(m['at'])}"
    wm = _wordmark_uri()
    stats = ""
    if rw.get("stats"):
        stats = '<div class="stats">' + "".join(f"<div><b>{e(v)}</b>{e(k)}</div>" for k, v in rw["stats"].items()) + "</div>"
    words = drop.get("words") or {}
    said = (f'<p class="lede">{e(NO_WORDS)}</p>' if not words.get("text") else "")
    also = ""
    if drop.get("also"):
        aw = (drop.get("also_words") or {}).get("text") or NO_WORDS
        also = (f'<section><div class="label">Also worth a look</div><h2>A smaller drop at <em>{ts(drop["also"]["at"])}</em></h2>'
                f'<div class="card"><p class="line hit"><span class="t">{ts(drop["also"]["at"])}</span>{e(aw)}</p></div></section>')
    rewrites = "".join(f'<div class="card rw"><h3>{e(r.get("label"))}</h3><div class="copy">{e(r.get("text"))}</div>'
                       f'<button onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText)">Copy</button></div>'
                       for r in rw.get("rewrites", []))
    voice = "".join(f"<li>{e(v)}</li>" for v in rw.get("voice", []))
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Post-Mortem</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{FONTS}" rel="stylesheet"><style>{CSS}</style></head><body><div class="wrap">
<header><img src="{wm}" alt="CreatorPro"><div class="label">Post-Mortem · {e(_title(reel.get("caption")))}</div></header>
<h1>People swiped away <em>{where}</em>.</h1>
<p class="lede">{e(round(m["lost"]))}% of viewers left between {ts(m["start"])} and {ts(m["end"])}. Here's what you were saying
right then, why it lost them, and two ways to rewrite it.</p>
<section><div class="label">Where they left</div>{_graph(d["curve"], drop, length)}{stats}</section>
<section><div class="label">What you were saying</div><h2>The words at the drop-off</h2>
<div class="card">{said}{_transcript(d["transcript"].get("sentences") or [], words)}</div></section>
<section><div class="label">Why they left</div><p class="why">{e(rw.get("why"))}</p></section>
<section><div class="label">The rewrite</div><h2>Say it like <em>this</em> instead</h2>
<div class="original">{e(rw.get("original"))}</div><div class="cols" style="margin-top:14px">{rewrites}</div></section>
{also}
<section><div class="label">How you talk</div><h2>What the rewrite kept from your voice</h2><ul class="list">{voice}</ul></section>
<footer><img src="{wm}" alt="CreatorPro"> Post-Mortem, free from CreatorPro</footer></div></body></html>"""


def render_md(run):
    d = _load(run)
    drop, rw = d["dropoff"], d["rewrite"]
    m = drop["main"]
    where = "in the hook" if m["in_hook"] else f"at {ts(m['at'])}"
    said = (drop.get("words") or {}).get("text") or NO_WORDS
    lines = [f"# Post-Mortem: people swiped away {where}", "",
             f"{round(m['lost'])}% of viewers left between {ts(m['start'])} and {ts(m['end'])}.", "",
             "**What you were saying:** " + said, "", "**Why they left:** " + str(rw.get("why", "")), "",
             "**Original:** " + str(rw.get("original", "")), ""]
    for r in rw.get("rewrites", []):
        lines += [f"**{r.get('label', '')}:** {r.get('text', '')}", ""]
    if drop.get("also"):
        lines += [f"**Also worth a look:** a smaller drop at {ts(drop['also']['at'])}: " +
                  ((drop.get("also_words") or {}).get("text") or NO_WORDS), ""]
    lines += ["**How you talk:** " + "; ".join(rw.get("voice", []))]
    return "\n".join(lines) + "\n"


def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    if len(args) != 1:
        print(__doc__)
        return 2
    run = Path(args[0]).expanduser().resolve()
    out = run / "post-mortem.html"
    out.write_text(render_html(run), encoding="utf-8")
    md = render_md(run)
    (run / "post-mortem.md").write_text(md, encoding="utf-8")
    print(md)
    print("Report saved:", out)
    if "--no-open" not in argv:
        opener = ["open"] if sys.platform == "darwin" else (["cmd", "/c", "start", ""] if os.name == "nt" else ["xdg-open"])
        subprocess.run(opener + [str(out)], check=False)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
