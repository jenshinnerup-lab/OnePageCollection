#!/usr/bin/env python3
"""Byg M365+ onepagers (Limfjord-designet, se limfjord/README.md) ud fra data/*.json.

Brug:  python3 scripts/build.py

Læser   data/NN-<slug>.json   én fil pr. onepager
Skriver NN-<slug>.html        én side pr. datafil
        index.html            oversigt over hele serien

Python 3.9+ uden eksterne pakker. Tekstfelter må indeholde simpel HTML (<b>, <i>, <span class="mono">).
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"

TABS = ["Teams", "Outlook", "Planlægning", "Loop & OneNote", "Copilot"]

ICONS = {
    "chat": '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    "shelf": '<path d="M4 4h16v6H4zM4 14h16v6H4z"/><path d="M8 7h.01M8 17h.01"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    "target": '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    "bell": '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    "moon": '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
    "pin": '<path d="M12 17v5"/><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>',
    "flag": '<path d="M4 22V4"/><path d="M4 4h12l-2 4 2 4H4"/>',
    "bolt": '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    "tag": '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    "swap": '<path d="M7 4L3 8l4 4"/><path d="M3 8h14"/><path d="M17 20l4-4-4-4"/><path d="M21 16H7"/>',
    "key": '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
    "calendar": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    "check": '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',
    "loop": '<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    "book": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
    "mic": '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    "doc": '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
}

LOGO = ('<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c6d94e" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/>'
        '<rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>'
        '<path d="M17.5 14v7M14 17.5h7"/></svg>')

CSS = """
/* Limfjord — værdierne følger limfjord/tokens.json */
:root{--forest:#1a4231;--forest-deep:#12291f;--green:#18805c;--lime:#c6d94e;--bg:#f3f2ed;--card:#fff;
--border:#e4e2d9;--rule:#e8e6de;--ink:#1c2621;--ink-2:#3d4842;--sec:#66706a;--mono:'JetBrains Mono',Consolas,monospace}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,'Segoe UI',Roboto,system-ui,sans-serif}
a{color:#11603f}a:hover{color:#0b4a30}
.wrap{max-width:1160px;margin:0 auto;padding:0 24px}
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px}
.muted{color:var(--sec)} .mono{font-family:var(--mono);font-size:.92em}
header{background:var(--forest);color:#fff}
nav{min-height:60px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 28px}
.brand{color:#fff;text-decoration:none;font-size:19px;font-weight:700;display:flex;align-items:center;gap:10px;padding:14px 0}
.brand:hover{color:#fff}
.tabs{display:flex;flex-wrap:wrap;gap:4px 24px;font-size:15px;flex:1 1 auto}
.tabs a{color:#dbe6df;text-decoration:none;padding:18px 0 15px;border-bottom:3px solid transparent}
.tabs a.on,.tabs a:hover{color:#fff}.tabs a.on{border-bottom-color:var(--lime)}
.stamp{font-size:13px;color:#c9d8cf}
main.wrap{padding-top:36px;padding-bottom:64px;display:flex;flex-direction:column;gap:28px}
.hero h1{margin:0;font-size:clamp(30px,5vw,44px);line-height:1.1;font-weight:700;letter-spacing:-.5px}
.hero p.lead{margin:14px 0 0;font-size:18px;line-height:1.55;color:var(--ink-2);max-width:780px}
.panel{background:var(--forest);color:#fff;border-radius:18px;padding:26px 28px}
.panel h2{margin:0;font-size:13px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;color:var(--lime)}
.sig{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:28px;margin-top:14px}
@media(max-width:820px){.sig{grid-template-columns:1fr}}
.sig h3{margin:0;font-size:30px;font-weight:700;letter-spacing:-.3px;line-height:1.2}
.sig .sub{margin:8px 0 0;color:#c9d8cf;font-size:15px;line-height:1.5}
.sig ul{margin:18px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px}
.sig li{position:relative;padding-left:18px;font-size:15px;line-height:1.5;color:#e7efe9}
.sig li:before{content:"";position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:var(--lime)}
.sig .mono{color:#fff}
.ask{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:20px}
.big{font-size:44px;font-weight:700;line-height:1;margin-top:6px}
.big span{font-size:16px;font-weight:500;color:#c9d8cf}
.route{display:flex;flex-direction:column;gap:8px;margin-top:16px;font-size:14px}
.route div{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,.08)}
.route b{white-space:nowrap;text-align:right}
.route .yes b{color:var(--lime)}
.duo{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:14px}
.mini{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start}
.mini .ic{flex:none;width:40px;height:40px;border-radius:10px;display:grid;place-items:center;background:#eef5d0}
.mini h3{margin:0;font-size:17px;font-weight:600}
.mini p{margin:4px 0 0;font-size:14px;line-height:1.5;color:var(--ink-2)}
.card h2{margin:0 0 4px;font-size:18px;font-weight:600}
.scroll{overflow-x:auto}
.tbl{width:100%;border-collapse:collapse;font-size:14px;min-width:640px;margin-top:10px}
.tbl th{text-align:left;font-size:12px;font-weight:600;color:var(--sec);padding:10px 10px;border-bottom:1px solid var(--border)}
.tbl td{padding:12px 10px;border-bottom:1px solid #efede6;vertical-align:top;line-height:1.45}
.tbl td:first-child{font-weight:600;width:22%}
.tbl tr:last-child td{border-bottom:none}
.tag{display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;margin-left:6px;vertical-align:1px;white-space:nowrap}
.tag.ok{background:#e3f1ea;color:#18805c}.tag.warn{background:#fbf1d8;color:#9a6b05}.tag.no{background:#fbe3e8;color:#b8304d}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr));gap:14px}
.check{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column}
.check li{display:grid;grid-template-columns:26px minmax(0,1fr);gap:10px;padding:11px 0;border-bottom:1px solid var(--rule);font-size:14px;line-height:1.5}
.check li:last-child{border-bottom:none}
.check .n,.check .x{font-family:var(--mono);font-size:12px;font-weight:600;border-radius:6px;height:22px;display:grid;place-items:center}
.check .n{color:var(--forest);background:#eef5d0}
.check .x{color:#9a6b05;background:#fbf1d8}
.check b{font-weight:600}
.tip{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:24px;align-items:start}
@media(max-width:820px){.tip{grid-template-columns:1fr}}
.tip p{margin:8px 0 0;font-size:14px;line-height:1.55;color:var(--ink-2)}
.steps{counter-reset:s;list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.steps li{counter-increment:s;position:relative;font-size:14px;line-height:1.5;background:var(--bg);border-radius:10px;padding:10px 12px 10px 46px}
.steps li:before{content:counter(s);position:absolute;left:12px;top:10px;width:22px;height:22px;border-radius:50%;background:var(--forest);color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center}
.kicker{font-size:12px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:var(--green)}
.pager{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:14px}
.pager a{text-decoration:none;font-weight:600}
.series{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(330px,100%),1fr));gap:14px}
.op{background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px 22px;text-decoration:none;color:var(--ink);display:flex;flex-direction:column;gap:8px;transition:border-color .15s,transform .15s}
.op:hover{border-color:var(--green);transform:translateY(-2px);color:var(--ink)}
.op .top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.op .nr{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--forest);background:#eef5d0;border-radius:6px;padding:2px 8px}
.op .grp{font-size:12px;color:var(--sec)}
.op h3{margin:4px 0 0;font-size:20px;font-weight:700;letter-spacing:-.2px}
.op p{margin:0;font-size:14px;line-height:1.5;color:var(--ink-2)}
.op .rule{border-left:3px solid var(--lime);padding-left:10px;font-weight:600;color:var(--ink)}
footer{border-top:1px solid var(--border)}
footer .wrap{padding-top:20px;padding-bottom:20px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;font-size:13px;color:var(--sec)}
@media(max-width:600px){.wrap{padding:0 16px}.panel{padding:20px}.card{padding:18px}.stamp{display:none}}
@media print{
  @page{size:A4;margin:10mm}
  html{zoom:var(--pz,.52)}
  body{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .wrap{max-width:none;padding:0}
  main.wrap{padding-top:16px;padding-bottom:0;gap:14px}
  .card,.mini,.panel,.op{break-inside:avoid}
  .tbl{min-width:0}.pager{display:none}
  nav{min-height:44px}.brand{padding:8px 0}.tabs a{padding:12px 0 9px}
}
"""

YES = ' class="yes"'

MONTHS = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august",
          "september", "oktober", "november", "december"]


def esc(s):
    return html.escape(s, quote=True)


def icon(name, color="#1a4231", size=22):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[name]}</svg>')


def head(title, print_zoom=None):
    pz = f'<style>:root{{--pz:{print_zoom}}}</style>' if print_zoom else ""
    return f"""<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="design-system" content="Limfjord">
<title>{esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>{CSS}</style>{pz}
</head>
<body>
"""


def header(pages, current_tab, stamp):
    first = {}
    for p in pages:
        first.setdefault(p["tab"], p["file"])
    on_all = ' class="on"' if current_tab is None else ""
    links = [f'<a href="index.html"{on_all}>Alle</a>']
    for t in TABS:
        if t in first:
            on = ' class="on"' if t == current_tab else ""
            links.append(f'<a href="{first[t]}"{on}>{esc(t)}</a>')
    return f"""<header><nav class="wrap" aria-label="Serie">
  <a class="brand" href="index.html">{LOGO} M365+</a>
  <div class="tabs">{"".join(links)}</div>
  <span class="stamp">{stamp}</span>
</nav></header>
"""


def ul_check(items, mark):
    out = []
    for i, it in enumerate(items, 1):
        m = f'<span class="n">{i}</span>' if mark == "n" else '<span class="x">!</span>'
        out.append(f"<li>{m}<span>{it}</span></li>")
    return '<ul class="check">' + "".join(out) + "</ul>"


def sec_rule(r):
    bullets = "".join(f"<li>{b}</li>" for b in r["bullets"])
    a = r["ask"]
    routes = "".join(
        f'<div{YES if x.get("yes") else ""}><span>{x["if"]}</span><b>→ {x["then"]}</b></div>'
        for x in a["routes"])
    return f"""<section class="panel" aria-labelledby="rule-title">
    <h2 id="rule-title">Tommelfingerregel</h2>
    <div class="sig">
      <div>
        <h3>{r["title"]}</h3>
        <p class="sub">{r["sub"]}</p>
        <ul>{bullets}</ul>
      </div>
      <div class="ask">
        <div style="font-size:13px;color:#c9d8cf">{a["label"]}</div>
        <div class="big">{a["big"]} <span>{a["unit"]}</span></div>
        <div style="font-size:14px;color:#e7efe9;margin-top:8px;line-height:1.5">{a["q"]}</div>
        <div class="route">{routes}</div>
      </div>
    </div>
  </section>
"""


def sec_duo(d):
    cards = "".join(
        f'<div class="mini"><div class="ic">{icon(x["icon"])}</div><div><h3>{x["title"]}</h3><p>{x["text"]}</p></div></div>'
        for x in d)
    return f'<section class="duo" aria-label="Billedet at huske">{cards}</section>\n'


def sec_table(t):
    th = "".join(f"<th>{c}</th>" for c in t["cols"])
    rows = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in t["rows"])
    return f"""<section class="card" aria-labelledby="tbl-title">
    <h2 id="tbl-title">{t["title"]}</h2>
    <p class="muted" style="margin:0;font-size:13px">{t["sub"]}</p>
    <div class="scroll"><table class="tbl"><thead><tr>{th}</tr></thead><tbody>{rows}</tbody></table></div>
  </section>
"""


def sec_lists(lists):
    cards = []
    for i, l in enumerate(lists):
        cards.append(f"""<div class="card" aria-labelledby="l{i}">
      <h2 id="l{i}">{l["title"]}</h2>
      <p class="muted" style="margin:0;font-size:13px">{l["sub"]}</p>
      {ul_check(l["items"], l.get("mark", "n"))}
    </div>""")
    return '<section class="grid2">' + "".join(cards) + "</section>\n"


def sec_bonus(b):
    paras = "".join(f"<p>{p}</p>" for p in b["paras"])
    note = f'<p class="muted" style="font-size:13px">{b["note"]}</p>' if b.get("note") else ""
    steps = "".join(f"<li>{s}</li>" for s in b["steps"])
    return f"""<section class="card" aria-labelledby="bonus-title">
    <div class="tip">
      <div>
        <div class="kicker">{b["kicker"]}</div>
        <h2 id="bonus-title" style="margin-top:4px">{b["title"]}</h2>
        {paras}{note}
      </div>
      <ol class="steps">{steps}</ol>
    </div>
  </section>
"""


def fmt_dates(dates):
    ds = sorted(dates)
    parts = [f"{int(d[8:10])}.{int(d[5:7])}" for d in ds]
    txt = parts[0] if len(parts) == 1 else ", ".join(parts[:-1]) + " og " + parts[-1]
    return f"{txt}.{ds[-1][:4]}"


def footer(p=None):
    if p:
        left = (f'Baseret på Lea Davids nyhedsbrev ({fmt_dates(p["sources"])}), skrevet om med egne ord · '
                f'Mere hos <a href="https://m365coaching.com">m365coaching.com</a>')
    else:
        left = ('Opsummeret med egne ord fra Lea Davids nyhedsbrev om Microsoft 365 · '
                'Mere hos <a href="https://m365coaching.com">m365coaching.com</a>')
    return f"""<footer><div class="wrap">
  <span>{left}</span>
  <span>M365+ · VibrantColor.dev</span>
</div></footer>
</body>
</html>
"""


def build_page(p, pages, total):
    idx = pages.index(p)
    prev_ = pages[idx - 1] if idx > 0 else None
    next_ = pages[idx + 1] if idx < len(pages) - 1 else None
    out = [head(f'{p["title"]} · M365+ onepager {p["nr"]}', p.get("print_zoom")),
           header(pages, p["tab"], f'Onepager {p["nr"]} af {total}'),
           '<main class="wrap">\n',
           f"""<section class="hero" aria-labelledby="hero-title">
    <p class="muted" style="margin:0 0 6px;font-size:13px">VibrantColor.dev · Microsoft 365 i hverdagen · {esc(p["tab"])}</p>
    <h1 id="hero-title">{p["title"]}</h1>
    <p class="lead">{p["lead"]}</p>
  </section>
""",
           sec_rule(p["rule"])]
    if p.get("duo"):
        out.append(sec_duo(p["duo"]))
    if p.get("table"):
        out.append(sec_table(p["table"]))
    if p.get("lists"):
        out.append(sec_lists(p["lists"]))
    if p.get("bonus"):
        out.append(sec_bonus(p["bonus"]))
    pv = f'<a href="{prev_["file"]}">← {prev_["nr"]}. {prev_["title"]}</a>' if prev_ else '<a href="index.html">← Oversigt</a>'
    nx = f'<a href="{next_["file"]}">{next_["nr"]}. {next_["title"]} →</a>' if next_ else '<a href="index.html">Oversigt →</a>'
    out.append(f'<nav class="pager" aria-label="Bladr">{pv}{nx}</nav>\n')
    out.append("</main>\n")
    out.append(footer(p))
    return "".join(out)


def build_index(pages):
    cards = "".join(f"""<a class="op" href="{p["file"]}">
      <div class="top"><span class="nr">{p["nr"]:02d}</span><span class="grp">{esc(p["tab"])}</span></div>
      <h3>{p["title"]}</h3>
      <p>{p["teaser"]}</p>
      <p class="rule">{p["rule"]["title"].replace("<br>", " ")}</p>
    </a>""" for p in pages)
    return "".join([
        head("M365+ · Microsoft 365 i hverdagen"),
        header(pages, None, f"{len(pages)} onepagers"),
        '<main class="wrap">\n',
        f"""<section class="hero" aria-labelledby="hero-title">
    <p class="muted" style="margin:0 0 6px;font-size:13px">VibrantColor.dev · Microsoft 365 i hverdagen</p>
    <h1 id="hero-title">M365+ onepagers</h1>
    <p class="lead">Korte, praktiske sider om Teams, Outlook, To Do, Planner, Loop, OneNote og Copilot. Hver side har en tommelfingerregel, en tjekliste og de begrænsninger, du skal kende. Siderne kan deles med kolleger og udskrives på én A4-side.</p>
  </section>
""",
        f'<section class="series" aria-label="Serien">{cards}</section>\n',
        "</main>\n",
        footer()])


def main():
    pages = []
    for f in sorted(DATA.glob("[0-9][0-9]-*.json")):
        p = json.loads(f.read_text(encoding="utf-8"))
        p["file"] = f.stem + ".html"
        pages.append(p)
    pages.sort(key=lambda p: p["nr"])
    for p in pages:
        (ROOT / p["file"]).write_text(build_page(p, pages, len(pages)), encoding="utf-8")
        print("skrev", p["file"])
    (ROOT / "index.html").write_text(build_index(pages), encoding="utf-8")
    print("skrev index.html")


if __name__ == "__main__":
    main()
