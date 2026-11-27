# Limfjord

Limfjord er designsproget bag VibrantColor.dev: skovgrøn, lime og papir. Det startede som layoutet til BC Partnerkort og bruges nu på BC Observatorium, M365-onepagerne og kunde-one-pagere som Copilot-tjekket. Brug det, når en side skal se ud som VibrantColor.dev.

## Hvor det bruges

| Flade | Hvad den viser |
|---|---|
| BC Partnerkort ([`partnerkort/`](../partnerkort/)) | Samlekort med scorer, spil en kategori, søgning |
| BC Observatorium (`vibrantcolor-site`) | Hjemmesiden og Opslagsværk |
| M365-onepagere ([`index.html`](../index.html)) | Tips til kolleger, én side pr. emne |
| Kunde-one-pagere | Fx *Copilot-rettigheder i BC* |

## Stemme

- Dansk, kort og konkret. Konklusionen først, så hvordan.
- Overskrifter i almindelig sætningsstil (kun første ord med stort).
- Én pointe pr. kort eller felt. Hellere en tabel end en lang opremsning.
- Ærlig om usikkerhed: forbehold står i en **Note**, ikke gemt i brødteksten.
- Gør: "Vælg en kategori, så sorteres kortene." Undgå: "Oplev den ultimative sammenligning!"

## Visuelle grundregler

- **Papir som grund.** Siden står på `paper`. Indhold ligger på hvide kort (`surface`) med 1px `line`-kant og radius `radius-lg`/`radius-xl`.
- **Skovgrøn bærer identiteten.** `forest` bruges i fulde flader: header-båndet, paneler og kort-toppe. Tekst på forest er `on-forest`, `on-forest-soft` eller `on-forest-muted`, aldrig `ink`.
- **Lime er en accent, ikke en flade.** `lime` markerer det, der er valgt eller vinder: aktiv fane (3px understregning), vinderkort (2px kant + `shadow-win`), krone, valgt knap, ikoner på forest. Lime er aldrig tekst på papir eller hvid. Eneste store lime-flade er ét fremhævet fakta-felt i et panel.
- **Grøn betyder god.** `green` bruges til scorebarer og positive tal. Svagheder og minus-tal bruger `warn-ink` på `warn-soft`.
- **Referencer er grå.** Et referencekort (fx standard BC) har `ref`-top og `ref-bar`-barer, så det tydeligt ikke konkurrerer.
- **Skygger er bløde og grønne.** `shadow-card` i hvile, `shadow-win` kun på vinderen. Ingen andre skygger.
- **Ingen gradienter, ingen emoji-ikoner, ingen farvet venstrekant på kort.**

## Typografi

- **Inter** til alt brødtekst og overskrifter. **JetBrains Mono** til koder, seriemærker, landekoder og tal i statrækker. Begge hentes fra Google Fonts:
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap`
- Én H1 pr. side (`display`, skaleret med `clamp(30px, 5vw, 44px)`). Lead-tekst (`lead`) under H1, max 720px bred.
- Tal i statrækker er højrestillede i mono (`score`).

## Layout

- Indhold max `page-max` (1240px), sidemargin `page-gutter` (24px, 16px på mobil).
- Sektioner i main står med `space-6` imellem. Kort i gitter: `repeat(auto-fill, minmax(285px, 1fr))` med `space-4` gap.
- Fast rækkefølge på en side: header → hero (eyebrow, H1, lead) → evt. søgning → forest-panel med det vigtigste → kort → note → metode/kilder → footer.
- Under 600px stables alt i én kolonne. Interaktive mål er mindst 40px høje.

## Ikoner

Linjeikoner i 24×24 viewBox, `stroke-width` 2, runde ender og hjørner (Lucide-stil). På forest er stregen `lime`, i 22px ved siden af brand-navnet. Der er intet logo endnu: brandet skrives som tekst i Inter 700, 19px.

## Komponenter

Klasserne ligger i [`limfjord.css`](limfjord.css) med præfikset `lf-` og bruger kun tokens. Der er ingen JavaScript: komponenterne er HTML + CSS.

| Komponent | Bruges til |
|---|---|
| Header | Forest-bånd med brand og faner |
| Panel | Det vigtigste på siden: forklaring, knapper, fakta-felter |
| Partnerkort | Sammenligning med scorer, styrke og svaghed |
| Card | Hvidt indholdskort til metode, tabeller og lister |
| Pill | Korte mærker: version, status, kategori |
| Note | Forbehold, prototype-markering |

## Sådan bygger du en ny side

1. Indlæs de to Google Fonts og [`limfjord.css`](limfjord.css), som har alle tokens som CSS-variabler og alle `lf-`-klasser (eller brug værdierne direkte fra [`tokens.json`](tokens.json)).
2. Start med Header og hero, og sæt sidens vigtigste budskab i et Panel.
3. Brug Card og Partnerkort til resten. Afslut med en Note, hvis noget er foreløbigt, og en footer med kilder og dato.

## Filer i denne mappe

| Fil | Hvad |
|---|---|
| `tokens.json` | Alle tokens (farver, typografi, afstande, radier, skygger) med brugsnoter. Kilden til alt andet |
| `limfjord.css` | Tokens som CSS-variabler + komponentklasserne (`lf-`) |
| `README.md` | Denne brandbog |

Ændrer du en farve eller et mål, så ret `tokens.json` først og derefter `limfjord.css`.

## Status

Partnerkort og M365-onepagerne bruger endnu deres egne CSS-variabler med de samme værdier (fx `--forest`, `--lime`, `--bg`). De peger på Limfjord via `<meta name="design-system" content="Limfjord">` og en kommentar i deres CSS. Næste skridt er at lade dem indlæse `limfjord.css` direkte.
