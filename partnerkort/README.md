# BC Partnerkort

Samlekort i bilkort-stil, der sammenligner partnerløsninger til Microsoft Dynamics 365 Business Central. De er lavet i Observatorium-stil (VibrantColor.dev). Hver serie dækker ét område, som standard BC ikke dækker godt nok. Alle kort i en serie scores 1–10 i de samme seks kategorier, og standard BC er med som referencekort.

Åbn `index.html` i en browser. Vælg en kategori, så sorteres kortene, og vinderen markeres.

## Serier

| # | Serie | Adresse | Kort |
|---|---|---|---|
| 01 | Shopfloor & tidsregistrering | `index.html#shopfloor` | JobManager, Shop Floor Insight, Power MIT, Nav24 ShopFloor, Time Entry |
| 02 | Dokument-output & e-mail | `index.html#dokument-output` | Continia Document Output, Zetadocs Delivery, Easy PDF, Email720, Document Mail Queue |
| 03 | Dokument-capture & kreditorautomatisering | `index.html#dokument-capture` | Continia Document Capture, ExFlow AP, Zetadocs Capture, Corpay AP |
| 04 | Labelprint & etiketter | `index.html#labelprint` | Tasklet Mobile WMS Print, InterFormNG, Abakion Labels Mobile, BarTender Print Connector, AL Zebra ZPL Label Manager |
| 05 | Bank & betalinger | `index.html#bank` | Continia Banking, AMC Banking 365 Business, Aritma Finance Manager DK, SMARTbank |

## Scorer

- **Basisscore:** en foreløbig vurdering ud fra leverandørernes offentlige materiale (AppSource, produktsider, dokumentation). Løsningerne er ikke afprøvet side om side, og priser er ikke med.
- **Ekspertfaktor:** `samlet = (basis × 2 + Σ vægt × ekspertscore) / (2 + Σ vægt)`. En ekspert scorer kun de kategorier, vedkommende kender. Vægten er relation × erfaring:
  - Relation: uafhængig eller kunde 1,0, partner der sælger løsningen 0,6, leverandøren selv 0.
  - Erfaring: 5+ implementeringer 1,0, 2–4 implementeringer 0,75, 1 implementering eller demo 0,5.
- Der er endnu ingen ekspertvurderinger i denne version.

## Data

Alt indhold ligger i `app.js` i objektet `SERIES`. En serie har `cats` (seks kategorier) og `cards`. Et kort har `s` (scorer pr. kategori), `up`/`dn` (superkraft og svaghed) og en valgfri liste `xp` med ekspertvurderinger:

```js
xp:[{name:'…', company:'…', role:'…', rel:'uafh'|'kunde'|'partner'|'lev', exp:1|2|3,
     date:'2026-11', s:{tid:9, ui:8}, quote:'…'}]
```

Citater må kun bruges med eksplicit tilladelse fra eksperten.
