# OnePageCollection: M365+

En serie korte onepagers om Microsoft 365 i hverdagen (Teams, Outlook, To Do, Planner, Loop, OneNote og Copilot) i Observatorium-stil. Siderne er beregnet til at blive delt med kolleger og kan udskrives på én A4-side.

Indholdet bygger på Lea Davids nyhedsbrev ([m365coaching.com](https://m365coaching.com)) og er skrevet om på dansk med egne ord. Hver side angiver, hvilke udgaver af nyhedsbrevet den bygger på. Menunavne er gengivet på engelsk, så de matcher den engelske brugerflade.

## Sider

| # | Side | Emne |
|---|---|---|
| – | [`index.html`](index.html) | Oversigt over serien |
| 1 | [`01-teams-chat-eller-kanal.html`](01-teams-chat-eller-kanal.html) | Teams: Chat eller kanal? |
| 2 | [`02-teams-find-det-igen.html`](02-teams-find-det-igen.html) | Teams: Ctrl+E og Ctrl+F |
| 3 | [`03-teams-notifikationer.html`](03-teams-notifikationer.html) | Teams-notifikationer i fire niveauer |
| 4 | [`04-outlook-triage.html`](04-outlook-triage.html) | Fastgør, flag, Quick Steps og regler |
| 5 | [`05-outlook-find-og-sorter.html`](05-outlook-find-og-sorter.html) | Søgeoperatorer, kategorier og målrettede alarmer |
| 6 | [`06-ny-eller-klassisk-outlook.html`](06-ny-eller-klassisk-outlook.html) | New eller Classic Outlook og uddelegering |
| 7 | [`07-kalender-og-tid.html`](07-kalender-og-tid.html) | Kalenderblokering, To Do-gentagelser og Planner |
| 8 | [`08-loop-eller-onenote.html`](08-loop-eller-onenote.html) | Loop eller OneNote, hvem der ejer komponenten, og gendannelse |
| 9 | [`09-copilot-i-teams-moder.html`](09-copilot-i-teams-moder.html) | Copilot-referater og transskriptkvalitet |

## Andre samlinger

| Mappe | Hvad |
|---|---|
| [`partnerkort/`](partnerkort/) | BC Partnerkort: samlekort, der sammenligner partnerløsninger til Business Central i 20 serier. Se [`partnerkort/README.md`](partnerkort/README.md) |

## Struktur

| Sti | Hvad |
|---|---|
| `data/NN-<slug>.json` | Indholdet af én onepager (tekst med simpel HTML) |
| `scripts/build.py` | Bygger alle `NN-<slug>.html` og `index.html` ud fra `data/` |
| `NN-<slug>.html`, `index.html` | De færdige sider. Åbn dem direkte i en browser |

## Ny side eller rettelse

```bash
# ret eller tilføj data/10-<slug>.json (samme felter som de andre)
python3 scripts/build.py
```

Python 3.9+ uden eksterne pakker. Felter i en datafil: `nr`, `tab` (Teams, Outlook, Planlægning, Loop & OneNote eller Copilot), `title`, `teaser`, `sources` (datoer for de nyhedsbreve, siden bygger på), `lead`, `rule` (tommelfingerregel og spørgsmålsboks) og de valgfrie felter `duo`, `table`, `lists`, `bonus` og `print_zoom` (hvis siden fylder mere end én A4-side ved udskrift).

## Deling

Slå GitHub Pages til (Settings → Pages → Deploy from branch → `main` / root), så har hver side sit eget link, der kan deles. Bemærk, at en Pages-side som udgangspunkt er offentlig, også selv om repoet er privat (undtagen med Enterprise Cloud). Alternativt kan siderne gemmes som PDF fra browseren (Ctrl+P), så kommer hver side ud på én A4-side.
