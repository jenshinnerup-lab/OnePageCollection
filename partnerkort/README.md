# BC Partnerkort

Samlekort i bilkort-stil, der sammenligner partnerløsninger til Microsoft Dynamics 365 Business Central. De er lavet i Observatorium-stil (VibrantColor.dev). Hver serie dækker ét område, som standard BC ikke dækker godt nok. Alle kort i en serie scores 1–10 i de samme seks kategorier, og standard BC er med som referencekort.

Åbn `index.html` i en browser. Vælg en kategori, så sorteres kortene, og vinderen markeres.

## Søgning på ISV og landekode

Hvert kort viser ISV'en og ISV'ens land som en ISO-landekode på to bogstaver (fx `DK`). Kort i serie 05 viser også de markeder, appen dækker. Søgefeltet virker på tværs af serier:

| Søgning | Finder |
|---|---|
| `DK` | Kort hvor ISV'en er dansk **eller** appen dækker DK |
| `isv:DK` | Kun kort hvor ISV'en er dansk |
| `mk:DK` | Kun kort der dækker DK som marked (apps markeret `GLOBAL` tæller med) |
| `isv:continia` | Kort fra en bestemt ISV |
| fritekst | Navn, ISV, tags og beskrivelse. Flere ord skal alle matche |

## Serier

| # | Serie | Adresse | Kort |
|---|---|---|---|
| 01 | Shopfloor & tidsregistrering | `index.html#shopfloor` | JobManager, Shop Floor Insight, Power MIT, Nav24 ShopFloor, Time Entry |
| 02 | Dokument-output & e-mail | `index.html#dokument-output` | Continia Document Output, Zetadocs Delivery, Easy PDF, Email720, Document Mail Queue |
| 03 | Dokument-capture & kreditorautomatisering | `index.html#dokument-capture` | Continia Document Capture, ExFlow AP, Zetadocs Capture, Corpay AP |
| 04 | Labelprint & etiketter | `index.html#labelprint` | Tasklet Mobile WMS Print, InterFormNG, Abakion Labels Mobile, BarTender Print Connector, AL Zebra ZPL Label Manager |
| 05 | Bank & betalinger | `index.html#bank` | Continia Banking, AMC Banking 365 Business, Aritma Finance Manager, SMARTbank, IT.integro Electronic Banking, IDYN Direct Banking, BankLink, 365 business Banking, Yavrio Open Banking |
| 06 | Fragt & forsendelse | `index.html#fragt` | XtensionIT Shipment Connector, Abakion nShift/Webshipper Connector, Inventio.IT SMARTshipment, MDC Nordic Shipmondo Connector, iDyn ShipIT 365 |
| 07 | Løn & lønintegration | `index.html#loen` | Zenegy Payroll, Intect, JobManager (lønforberedelse); reference: Payroll Data Definitions (DK) |
| 08 | Udlæg & firmakort | `index.html#udlaeg` | Continia Expense Management, Pleo, Zetadocs Expenses, Payhawk, Spendesk |
| 09 | E-handel & PIM | `index.html#ehandel` | DynamicWeb, Perfion PIM, Sana Commerce; reference: Standard BC + Shopify Connector |
| 10 | Mobilt lager (WMS) | `index.html#lager` | Tasklet Mobile WMS, NaviPartner NP WMS, Insight Works Warehouse Insight, Yaveon 365 Warehouse App |
| 11 | Grafisk planlægning (Gantt) | `index.html#planlaegning` | NETRONIC VPS/VAPS, NETRONIC VJS, Insight Works Graphical Scheduler, Abakion ROB-EX Scheduler Connector |
| 12 | Rapport- & dokumentlayout | `index.html#layout` | ForNAV, Abakion Document Customizer, InterFormNG, Beyond Document Designer, WSB Document Creator |
| 13 | Rollecenter & KPI | `index.html#rollecenter` | Beyond Cues, Eagle Free, Dynamics Cues, Faect Dynamic Role Center |
| 14 | Felter & tilpasning uden kode | `index.html#nocode` | Simple Object Designer, SD Easy Customise, DINO 365, EOS Custom Defined Fields |
| 15 | Excel & dataimport | `index.html#excel` | Theta Excel Importer, Jet Reports, Memento Import Templates, Hougaard BCCL |
| 16 | Debitor & opkrævning | `index.html#debitor` | Continia Collection Management, Continia MobilePay Invoice & Subscriptions, Tecman Clever Credit, Binary Stream AR & Collections Manager |
| 17 | Projekt, sag & tid | `index.html#projekt` | TimeLog PSA, Abakion Project Time Mobile, Inventio.IT SMARTtime, ON720 Timesheet720, Pryme Time |
| 18 | BI & rapportering | `index.html#bi` | TARGIT, Jet Reports, Datawareness BI Endpoints, navida BC 2 Fabric; reference: Power BI-apps i BC |
| 19 | Stamdata & kreditinfo | `index.html#stamdata` | Proff Pro, KUMAVISION Credit-Check (Creditsafe), Telos Team D&B Integration, Allianz Trade for BC |
| 20 | Udlejning & rental | `index.html#udlejning` | Abakion Rental Management, EQM 365 Rental, ODT Rentals, Suite Engine RPM, Essential Rental |

Serierne er grupperet i menuen: Drift & lager (01, 04, 06, 10), Økonomi (02, 03, 05, 07, 08, 16), Salg & kanaler (09), Interface & UX (11–15), Projekt & service (17, 20) og Data & indsigt (18, 19). En serie har feltet `group`, som styrer grupperingen.

## Scorer

- **Basisscore:** en foreløbig vurdering ud fra leverandørernes offentlige materiale (AppSource, produktsider, dokumentation). Løsningerne er ikke afprøvet side om side, og priser er ikke med.
- **Ekspertfaktor:** `samlet = (basis × 2 + Σ vægt × ekspertscore) / (2 + Σ vægt)`. En ekspert scorer kun de kategorier, vedkommende kender. Vægten er relation × erfaring:
  - Relation: uafhængig eller kunde 1,0, partner der sælger løsningen 0,6, leverandøren selv 0.
  - Erfaring: 5+ implementeringer 1,0, 2–4 implementeringer 0,75, 1 implementering eller demo 0,5.
- Der er endnu ingen ekspertvurderinger i denne version.

## Data

Alt indhold ligger i `app.js` i objektet `SERIES`. En serie har `cats` (seks kategorier) og `cards`. Et kort har `isv` (ISV-navn), `cc` (ISV'ens land, ISO 3166-1 alpha-2, tom streng = ukendt), `mk` (valgfri liste med markeder: landekoder, `EU` eller `GLOBAL`), `s` (scorer pr. kategori), `up`/`dn` (superkraft og svaghed) og en valgfri liste `xp` med ekspertvurderinger:

```js
xp:[{name:'…', company:'…', role:'…', rel:'uafh'|'kunde'|'partner'|'lev', exp:1|2|3,
     date:'2026-11', s:{tid:9, ui:8}, quote:'…'}]
```

Citater må kun bruges med eksplicit tilladelse fra eksperten.

## Ændringer i serie 05 (nov. 2026)

- Serien er nu global. Kategorien *Bankdækning DK* er blevet til *Bankdækning* (antal banker og lande), og dansk relevans vises i stedet med markedskoder.
- Fem nye kort fra AppSource-research: IT.integro, IDYN Direct Banking, BankLink, 365 business Banking og Yavrio. Basisscorerne bygger kun på offentligt materiale og er et startpunkt.
- Betalingsmodtagelse (PSP, kort, direct debit, fx PSP Connect, Adyen, GoCardless og Stripe) er ikke med. Det er en kandidat til en senere serie.
- ISV-land er verificeret via ISV'ernes egne hjemmesider: Cost Control Software (Carmel, Indiana, US) og AppLibra srl (Thiene, Italien, IT).
