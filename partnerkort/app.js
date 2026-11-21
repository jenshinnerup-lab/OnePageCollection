(function(){
  // ---------- Data ----------
  // Ekspertvurdering: rel = 'uafh' | 'kunde' | 'partner' | 'lev'; exp = 1 (demo/1 impl) | 2 (2-4) | 3 (5+)
  var SERIES = {
    shopfloor: {
      group:'Drift & lager', no:'01', short:'Shopfloor', title:'Serie 01: Shopfloor & tidsregistrering',
      lead:'Standard BC dækker produktionskladder og afgangsregistrering, men ikke en terminal på gulvet, lønregler eller kvalitetsflow. Kortene viser, hvordan partnerløsningerne udfylder hullet.',
      cats:[
        ['tid','Tid & løn','Stempling, fravær, lønregler og lønudlæsning.'],
        ['prod','Produktionsdata','Afgang, forbrug, spild, lot/serienr. direkte på ordren.'],
        ['mes','MES-dybde','Kvalitet, omarbejde, stop/nedetid, planlægning på gulvet.'],
        ['ui','Gulv-UI','Touch, stregkode, terminal/kiosk; let for operatøren.'],
        ['std','Tæt på standard','Bygger på BC-logik og -poster; nem at opgradere.'],
        ['aab','Åbenhed','Integration til maskiner, MES, Power BI og andre systemer.']
      ],
      cards:[
        {id:'std', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Premium'],
         desc:'Produktionskladde, afgangs- og forbrugskladde samt kapacitetsposter. Fint fundament, men ingen operatørflade.',
         s:{tid:3,prod:5,mes:2,ui:2,std:10,aab:6},
         up:'Ingen ekstra licens og ingen opgraderingsrisiko.', dn:'Bygget til kontoret, ikke til gulvet.'},
        {id:'jm', name:'JobManager', vendor:'dynalogic · 9altitudes', isv:'dynalogic', cc:'DK', tags:['AppSource','Tid & løn'],
         desc:'Elektronisk tids- og jobregistrering med lønregelmotor og lønudlæsning. Åbent interface mod MES og maskiner.',
         s:{tid:10,prod:7,mes:5,ui:7,std:8,aab:9},
         up:'Lønregelmotoren: overenskomst og tillæg beregnes automatisk.', dn:'MES-dybde (kvalitet, planlægning) kræver tillæg som Tulip.'},
        {id:'sfi', name:'Shop Floor Insight', vendor:'Insight Works', isv:'Insight Works', cc:'CA', tags:['AppSource','MES'],
         desc:'MES-tillæg med stregkode og touch: tid, forbrug, afgang, spild, kvalitetstest, omarbejde og grafisk planlægning.',
         s:{tid:8,prod:9,mes:9,ui:8,std:7,aab:7},
         up:'Bredest MES-dækning: kvalitet, omarbejde og planlægningstavle.', dn:'Nordamerikansk fokus; lønregler skal tjekkes mod danske overenskomster.'},
        {id:'mit', name:'Power MIT', vendor:'innovio', isv:'innovio S.p.A.', cc:'IT', tags:['Power Apps','Maskine + operatør'],
         desc:'Power Apps-løsning til realtidsregistrering af tid, afgang, spild og nedetid, både operatør- og maskinstyret.',
         s:{tid:4,prod:8,mes:6,ui:8,std:5,aab:8},
         up:'Kan tage data direkte fra maskiner uden dobbeltregistrering.', dn:'Kører på Power Platform ved siden af BC; ekstra licenser og drift.'},
        {id:'n24', name:'Nav24 ShopFloor', vendor:'Nav24', isv:'Nav24 Sp. z o.o.', cc:'PL', tags:['BC + Power Apps','Auto-bogføring'],
         desc:'BC-udvidelse plus Power Apps-pakke. Bogfører afgang og forbrug automatisk og giver supervisor besked ved fejl.',
         s:{tid:4,prod:8,mes:5,ui:7,std:5,aab:7},
         up:'Fejlhåndtering med realtidsalarmer til supervisoren.', dn:'Lønsiden er ikke kernen; delt arkitektur BC/Power Apps.'},
        {id:'te', name:'Time Entry', vendor:'Cost Control Software', isv:'Cost Control Software', cc:'US', tags:['AppSource','Rollecenter'],
         desc:'Simpel stempling på produktions- og sagsopgaver via et mobilvenligt rollecenter med indbygget stregkodescanner.',
         s:{tid:5,prod:4,mes:2,ui:6,std:9,aab:4},
         up:'Lille og hurtig at sætte op; ind- og udstempling på hver sin terminal.', dn:'Kun tid; ingen lønregler, spild eller kvalitet.'}
      ]
    },
    'dokument-output': {
      group:'Økonomi', no:'02', short:'Dokument-output', title:'Serie 02: Dokument-output & e-mail',
      lead:'Standard BC kan sende et bilag som PDF med en e-mailskabelon. Partnerløsningerne tilføjer batch, automatik, branding, sikkerhed og e-faktura. Kortene viser, hvor de adskiller sig.',
      cats:[
        ['skab','Skabeloner','HTML-editor, flettefelter, sprog, signaturer og branding.'],
        ['batch','Batch & automatik','Masseudsendelse, jobkø, planlagte kontoudtog og rykkere.'],
        ['efak','E-faktura','Peppol, OIOUBL/NemHandel og XML direkte fra BC.'],
        ['sikk','Sikkerhed & log','Log/audit trail, leveringsstatus, PDF-signatur og kryptering.'],
        ['std','Tæt på standard','Bygger på BC-rapportvalg og -logik; nem at opgradere.'],
        ['udv','Udvidelse','Kan lægges på egne og andre moduler uden tung udvikling.']
      ],
      cards:[
        {id:'std2', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','E-mailskabeloner'],
         desc:'Send med e-mail fra bilaget, e-mailskabeloner med flettefelter, dokumentafsendelsesprofiler og E-Documents-rammen.',
         s:{skab:4,batch:3,efak:5,sikk:3,std:10,udv:6},
         up:'Gratis og altid med i opgraderingen.', dn:'Én ad gangen; ingen rigtig batch eller branding.'},
        {id:'cdo', name:'Document Output', vendor:'Continia', isv:'Continia Software', cc:'DK', tags:['AppSource','Peppol/CDN'],
         desc:'Automatisk udsendelse via e-mailjobs og skabeloner, HTML-editor, PDF-fletning, e-faktura via Continia Delivery Network og sikkerhedsmodul.',
         s:{skab:9,batch:9,efak:9,sikk:9,std:8,udv:9},
         up:'Alt-i-én: e-mail, print og Peppol fra samme opsætning.', dn:'Moduler og transaktionsprisning gør licensen sværere at gennemskue.'},
        {id:'zd', name:'Zetadocs Delivery', vendor:'Equisys', isv:'Equisys', cc:'GB', tags:['AppSource','Batch'],
         desc:'Batch-udsendelse af personlige bilag og kontoudtog med færdige skabeloner, planlagt afsendelse og arkiv.',
         s:{skab:7,batch:8,efak:3,sikk:6,std:7,udv:6},
         up:'Stærk på planlagt batch og arkivering af sendte bilag.', dn:'Ingen indbygget Peppol/OIOUBL; britisk fokus.'},
        {id:'epdf', name:'Easy PDF', vendor:'Software Grotto', isv:'Software Grotto (Rios Software)', cc:'US', tags:['AppSource','Gratis 1 bruger'],
         desc:'Udskriv, vedhæft og send enhver rapport med ét klik, HTML-editor med flettefelter og batch med jobkø.',
         s:{skab:7,batch:7,efak:2,sikk:4,std:8,udv:5},
         up:'Gratis for én bruger; lav tærskel for at komme i gang.', dn:'Ingen e-faktura og begrænset sikkerhed/log.'},
        {id:'e720', name:'Email720', vendor:'ON720.COM', isv:'ON720.COM A/S', cc:'DK', tags:['AppSource','Leveringsstatus'],
         desc:'Salgsbilag med e-mail, skabeloner pr. dokumenttype og sprog, leveringsstatus og godkendelse før afsendelse.',
         s:{skab:6,batch:5,efak:2,sikk:6,std:8,udv:4},
         up:'Følger mailen helt frem til levering.', dn:'Kun salgsbilag; pris skalerer med antal mails.'},
        {id:'dmq', name:'Document Mail Queue', vendor:'WSB Solutions', isv:'Apportunix (WSB Solutions)', cc:'NL', tags:['AppSource','Mailkø'],
         desc:'Batch-mailkø til 11 bilagstyper, bl.a. fakturaer, rykkere og ordrer, som PDF og/eller elektronisk dokument.',
         s:{skab:5,batch:7,efak:5,sikk:4,std:8,udv:4},
         up:'Enkel kø: alt udgående samlet ét sted.', dn:'Skabeloner og branding er basale.'}
      ]
    },
    'dokument-capture': {
      group:'Økonomi', no:'03', short:'Dokument-capture', title:'Serie 03: Dokument-capture & kreditorautomatisering',
      lead:'Standard BC har E-Documents og Payables Agent, der kan læse PDF-fakturaer fra en indbakke. Partnerløsningerne dækker hele flowet fra modtagelse over matchning og godkendelse til arkiv. Kortene viser, hvor de adskiller sig.',
      cats:[
        ['data','Datafangst','OCR/AI på hoved og linjer, læring pr. kreditor, få manuelle rettelser.'],
        ['efak','E-faktura ind','Peppol, OIOUBL/NemHandel og XML direkte ind uden OCR.'],
        ['match','Matchning','Mod indkøbsordre og modtagelse (2- og 3-vejs), afvigelseshåndtering.'],
        ['godk','Godkendelse','Workflow, godkendelse uden BC-licens/web, beløbsgrænser, auto-godkendelse.'],
        ['ark','Arkiv & revision','Søgbart arkiv, audit trail, digitale bilag.'],
        ['std','Tæt på standard','Bygger på BC-bilag og -logik; nem at opgradere.']
      ],
      cards:[
        {id:'std3', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['E-Documents','Payables Agent'],
         desc:'Payables Agent henter PDF-fakturaer fra en mailbox, udtrækker data med Azure Document Intelligence og laver kladder til købsfakturaer.',
         s:{data:6,efak:5,match:3,godk:4,ark:4,std:10},
         up:'Næsten ingen opsætning; AI er med i standard.', dn:'Ordrematchning og godkendelsesflow er stadig på vej.'},
        {id:'cdc', name:'Document Capture', vendor:'Continia', isv:'Continia Software', cc:'DK', tags:['AppSource','Peppol/CDN'],
         desc:'AI og OCR på PDF og XML, e-fakturaer ind via Continia Delivery Network, 3-vejs matchning, Web Approval Portal og digitalt arkiv.',
         s:{data:9,efak:9,match:9,godk:9,ark:9,std:8},
         up:'Hele P2P-flowet i BC, og godkendere behøver ikke BC-klienten.', dn:'Modulopbygning og pris pr. bilag kræver en god licensberegning.'},
        {id:'exf', name:'ExFlow AP', vendor:'SignUp Software · Truvio', isv:'SignUp Software · Truvio', cc:'SE', tags:['AppSource','Nordisk'],
         desc:'Indbygget AP-automatisering: datafangst, validering, forkontering, 3-vejs matchning og dynamiske godkendelsesflow, også på linjeniveau.',
         s:{data:8,efak:6,match:9,godk:9,ark:7,std:8},
         up:'Stærk på forkontering og godkendelse på linjeniveau.', dn:'Bred platform (også F&O) kan være mere, end en mindre BC-kunde behøver.'},
        {id:'zdc', name:'Zetadocs Capture', vendor:'Equisys', isv:'Equisys', cc:'GB', tags:['AppSource','SharePoint-arkiv'],
         desc:'AI-baseret datafangst uden skabeloner, validering mod BC-data, automatisk ordrematchning og arkiv i SharePoint.',
         s:{data:8,efak:3,match:8,godk:6,ark:8,std:8},
         up:'Ingen skabeloner at vedligeholde; arkivet ligger i jeres egen SharePoint.', dn:'Godkendelse bygger på BC-workflows; svag på danske e-fakturaformater.'},
        {id:'cpy', name:'Corpay AP', vendor:'Corpay', isv:'Corpay', cc:'US', tags:['Cloud-platform','Betalinger'],
         desc:'Cloudbaseret AP-automatisering med AI-OCR, integreret med BC, og betaling af kreditorer, bl.a. med virtuelle kort.',
         s:{data:7,efak:4,match:6,godk:7,ark:6,std:4},
         up:'Kobler fakturaflow og betaling, inkl. rabat på virtuelle kort.', dn:'Kører uden for BC; data og godkendelse ligger på en ekstern platform.'}
      ]
    },
    'labelprint': {
      group:'Drift & lager', no:'04', short:'Labelprint', title:'Serie 04: Labelprint & etiketter',
      lead:'Standard BC kan udskrive en rapport som label, men har ingen labeldesigner, ingen ZPL og ingen direkte vej til en Zebra-printer på lageret. Her er der flere danske leverandører med, derfor scores også dansk forankring.',
      cats:[
        ['des','Labeldesign','Designer, skabeloner, hvor let man laver og ændrer en label.'],
        ['vej','Printvej','Direkte til label-printer (ZPL, cloud, Bluetooth) uden driver-bøvl.'],
        ['flow','Flow & automatik','Print fra lagerflow, scanner, hændelser og job-kø.'],
        ['gs1','Stregkoder & GS1','GS1-128, SSCC, DataMatrix, QR, lot/serienr.'],
        ['std','Tæt på standard','Bygger på BC-rapporter og -logik; nem at opgradere.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support på dansk.']
      ],
      cards:[
        {id:'std4', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Rapporter','Universal Print'],
         desc:'Labels som almindelige BC-rapporter (Word/RDLC) med stregkodefonte, printet via Universal Print, e-mailprint eller en printerconnector.',
         s:{des:3,vej:3,flow:3,gs1:4,std:10,dk:6},
         up:'Ingen ekstra licens; kan ændres i VS Code som enhver rapport.', dn:'Ingen labeldesigner og ingen native ZPL.'},
        {id:'tfp', name:'Mobile WMS Print', vendor:'Tasklet Factory', isv:'Tasklet Factory', cc:'DK', tags:['🇩🇰 Dansk','Mobil'],
         desc:'Print label direkte fra håndterminalen i Mobile WMS: Report Print via BC-rapporter eller Cloud Print med online designer, Wi-Fi eller Bluetooth.',
         s:{des:6,vej:9,flow:9,gs1:6,std:8,dk:10},
         up:'Label printes der, hvor varen står, direkte fra scanneren.', dn:'Kræver Mobile WMS; Cloud Print er en separat licens.'},
        {id:'ifng', name:'InterFormNG', vendor:'InterForm A/S', isv:'InterForm A/S', cc:'DK', tags:['🇩🇰 Dansk','Online designer'],
         desc:'Online rapport- og labeldesigner til cloud-print, til både laser- og labelprint uden middleware, med e-mail og arkivering.',
         s:{des:9,vej:8,flow:6,gs1:6,std:7,dk:10},
         up:'Én designer til både fakturaer og labels.', dn:'Endnu et designværktøj at lære og drive ved siden af BC.'},
        {id:'abl', name:'Labels Mobile', vendor:'Abakion', isv:'Abakion', cc:'DK', tags:['🇩🇰 Dansk','Wizard'],
         desc:'Label-datasæt via guide uden udvikling; hændelser i lagerflowet kan udløse print via BarTender, Easylabel m.fl.',
         s:{des:7,vej:5,flow:8,gs1:6,std:8,dk:9},
         up:'Kobler BC-data til den labelsoftware, kunden allerede har.', dn:'Kræver separat labelsoftware og printvej.'},
        {id:'btc', name:'BarTender Print Connector', vendor:'Seagull Scientific', isv:'Seagull Scientific', cc:'US', tags:['AppSource','BarTender Cloud'],
         desc:'Synkroniserer labelskabeloner og printere fra BarTender Cloud til BC; feltmapping uden kode og print fra enhver liste eller kortside.',
         s:{des:10,vej:8,flow:6,gs1:9,std:7,dk:5},
         up:'Branchens stærkeste labeldesigner og printmotor.', dn:'Kræver BarTender Cloud-abonnement; salg via forhandlere.'},
        {id:'azl', name:'AL Zebra ZPL Label Manager', vendor:'Applibra', isv:'AppLibra srl', cc:'IT', tags:['AppSource','Native ZPL'],
         desc:'Direkte Zebra-print med native ZPL fra dynamiske skabeloner, GS1, billeder og multi-up, uden Windows-drivere.',
         s:{des:5,vej:8,flow:6,gs1:8,std:6,dk:3},
         up:'Skarpe Zebra-labels uden drivere eller ekstern labelsoftware.', dn:'Kræver AL Bridge som lokal service; ZPL er teknisk at vedligeholde.'}
      ]
    },
    'bank': {
      group:'Økonomi', no:'05', short:'Bank & betalinger', title:'Serie 05: Bank & betalinger',
      lead:'Standard BC har betalings- og afstemningskladder og AMC Banking 365 Fundamentals til konvertering af bankfiler. Filerne flyttes manuelt, og Microsoft udvikler ikke nye bankformater, men henviser til partner-apps. Serien er global: hvert kort viser ISV’ens land og de markeder, appen dækker, som landekoder. Søg fx på DK, NO eller DE.',
      cats:[
        ['bank','Bankdækning','Antal banker og lande, appen kan tale med (for DK: BEC, SDC, Bankdata, Danske Bank, Nordea).'],
        ['dir','Direkte kommunikation','Betalinger, status og kontoudtog sendes og hentes automatisk, uden filer.'],
        ['afs','Afstemning','Automatisk matchning af kontoudtog, regler, AI/Copilot.'],
        ['godk','Godkendelse & sikkerhed','Dobbeltgodkendelse, signering, svindelkontrol, regulering og sporbarhed.'],
        ['ind','Indbetalinger','Match af indbetalinger mod åbne debitorposter, FI/betalingsservice/direct debit.'],
        ['std','Tæt på standard','Bygger på BC-kladder og -logik; nem at opgradere.']
      ],
      cards:[
        {id:'std5', ref:true, name:'Standard BC', vendor:'Microsoft · AMC Fundamentals', isv:'Microsoft', cc:'US',
         mk:['AU','AT','BE','BR','BG','CA','HR','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','JP','LV','LT','LU','MX','NL','NZ','NO','PL','PT','RO','RS','SG','SK','SI','ZA','ES','SE','CH','US'],
         tags:['Indbygget','Filkonvertering'],
         desc:'Udbetalings- og afstemningskladder med automatisk matchning; AMC Banking 365 Fundamentals konverterer filer til 600+ banker. I USA/Canada også Envestnet Yodlee bankfeeds.',
         s:{bank:6,dir:2,afs:5,godk:4,ind:5,std:10},
         up:'Gratis for første bankkonto og helt standard.', dn:'Filer flyttes manuelt til og fra netbanken; ingen nye formater fra Microsoft.'},
        {id:'cbk', name:'Continia Banking', vendor:'Continia', isv:'Continia Software', cc:'DK', mk:['DK','BE','NL','FR'],
         tags:['AppSource','BankConnect'],
         desc:'Samler Payment Management, OPplus og Dynamo Pay i én global bankløsning: betalinger, direkte kommunikation (bl.a. BankConnect til BEC, SDC, Bankdata), afstemning og advarsel ved ændrede bankoplysninger.',
         s:{bank:8,dir:9,afs:9,godk:9,ind:8,std:8},
         up:'Direkte forbindelse til næsten alle danske banker og op til 95 % matchrate.', dn:'Global version er ny; lande og status skal tjekkes. Pris afhænger af moduler.'},
        {id:'amc', name:'AMC Banking 365 Business', vendor:'AMC Banking', isv:'AMC Consult A/S', cc:'DK',
         mk:['AU','AT','BE','BR','BG','CA','HR','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','JP','LV','LT','LU','MX','NL','NZ','NO','PL','PT','RO','RS','SG','SK','SI','ZA','ES','SE','CH'],
         tags:['AppSource','Betalingsinstitut'],
         desc:'Den fulde udgave af motoren bag Microsofts AMC Fundamentals: betalinger, kontoudtog og afstemning, med Host2Host-kommunikation til understøttede banker.',
         s:{bank:9,dir:6,afs:7,godk:6,ind:7,std:9},
         up:'Samme motor som standard BC; godkendt betalingsinstitut under Finanstilsynet.', dn:'Direkte H2H kun til udvalgte banker; ellers upload til netbank.'},
        {id:'ari', name:'Aritma Finance Manager', vendor:'Aritma', isv:'Aritma AS', cc:'NO', mk:['DK','NO','SE'],
         tags:['AppSource','Skandinavisk API'],
         desc:'Fuldt integreret bankløsning til betalinger, indbetalinger og bankafstemning via API til alle skandinaviske banker; flere banker pr. selskab, afstemning med Copilot.',
         s:{bank:5,dir:9,afs:8,godk:7,ind:8,std:8},
         up:'Én løsning til alle skandinaviske banker.', dn:'Kun Skandinavien; færre danske partnere.'},
        {id:'smb', name:'SMARTbank', vendor:'Inventio.IT · Bankintegration.dk', isv:'Inventio.IT (Dustin)', cc:'DK', mk:['DK'],
         tags:['AppSource','Standardkladder'],
         desc:'Direkte bankintegration via Bankintegration.dk; transaktioner ind i finanskladder og bankafstemning, betalinger ud fra udbetalingskladden.',
         s:{bank:4,dir:8,afs:6,godk:5,ind:6,std:9},
         up:'Bruger BC’s standardkladder uden nye processer.', dn:'Kun Danmark; kræver separat aftale med Bankintegration.dk.'},
        {id:'iti', name:'Electronic Banking', vendor:'IT.integro', isv:'IT.integro sp. z o.o.', cc:'PL', mk:['PL','NL','AT','SE','FI'],
         tags:['AppSource','Base-app gratis'],
         desc:'Gratis Base App til betalingseksport, kontoudtogsimport og udligning, plus betalte lande-extensions med bankinterfaces; afstemning med Copilot.',
         s:{bank:6,dir:6,afs:8,godk:6,ind:7,std:8},
         up:'Gratis fundament og AI-afstemning; ét design på tværs af lande.', dn:'Hvert land kræver sin egen extension; ingen dansk version set.'},
        {id:'idy', name:'Direct Banking', vendor:'IDYN · Ponto/Cobase', isv:'IDYN B.V.', cc:'NL', mk:['NL','BE','EU','GLOBAL'],
         tags:['AppSource','15.000+ banker'],
         desc:'Henter kontoudtog og saldi og sender betalingsordrer via Ponto (EU) eller Cobase (global, 15.000+ banker); bygget oven på standard BC.',
         s:{bank:10,dir:9,afs:7,godk:7,ind:6,std:8},
         up:'Største bankdækning i serien via Cobase.', dn:'Kræver separat Ponto- eller Cobase-konto.'},
        {id:'bkl', name:'BankLink', vendor:'Memento', isv:'Memento S.r.l.', cc:'IT', mk:['EU','GB'],
         tags:['AppSource','PSD2'],
         desc:'Open banking (PSD2): henter transaktioner direkte fra 2.500+ banker i 30+ lande uden filer eller netbank-login. Abonnement med 3 bankforbindelser.',
         s:{bank:8,dir:5,afs:5,godk:4,ind:5,std:8},
         up:'Hurtig vej til bankfeeds i hele Europa.', dn:'Fokus på at hente transaktioner; ingen betalinger beskrevet.'},
        {id:'b365', name:'365 business Banking', vendor:'365 business development', isv:'365 business development', cc:'DE', mk:['DE','EU'],
         tags:['AppSource','finAPI'],
         desc:'Multibank via finAPI (BaFin-reguleret, XS2A/PSD2): 4.000+ banker i 10+ europæiske lande; hent transaktioner og send betalinger direkte fra BC.',
         s:{bank:7,dir:8,afs:5,godk:6,ind:5,std:8},
         up:'Både feeds og betalinger via reguleret open banking.', dn:'Ny app (BC 26+); stærkest i Tyskland.'},
        {id:'yav', name:'Yavrio Open Banking', vendor:'Yavrio', isv:'Yavrio Ltd', cc:'GB', mk:['GB','EU'],
         tags:['AppSource','Open Banking'],
         desc:'Live bankfeeds og betalinger direkte fra betalingskladden via open banking i 19+ lande.',
         s:{bank:6,dir:8,afs:5,godk:5,ind:5,std:8},
         up:'Betalinger skubbes direkte fra kladden uden filer.', dn:'Mindre leverandør; afstemning er standard-BC.'}
      ]
    },
    'fragt': {
      no:'06', group:'Drift & lager', short:'Fragt & forsendelse', title:'Serie 06: Fragt & forsendelse',
      lead:'Standard BC har speditører, speditørservices og et link til track & trace, men kan ikke booke fragt eller printe fragtlabels. Her har mange danske partnere deres egen app oven på de samme platforme: nShift, Shipmondo og Webshipper.',
      cats:[
        ['frm','Fragtfirmaer','Antal og bredde: PostNord, GLS, Bring, DHL m.fl. via én platform.'],
        ['bk','Booking & labels','Fragtbrev, label og afhentning direkte fra ordre eller lagerforsendelse.'],
        ['tt','Track & trace','Status tilbage i BC og til kunden.'],
        ['ord','Fragt på ordren','Vægt, mål, kolli og fragtpris automatisk på salgsordren.'],
        ['ret','Returer','Returlabels og returflow tilbage i BC.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support på dansk.']
      ],
      cards:[
        {id:'std6', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Speditører'],
         desc:'Speditører og speditørservices på ordren, pakkesporingsnummer med link til fragtfirmaets side. Ingen booking eller labels.',
         s:{frm:2,bk:1,tt:3,ord:3,ret:2,dk:6},
         up:'Ingen licens; fint til få forsendelser.', dn:'Alt booking og labelprint foregår i en anden portal.'},
        {id:'xit', name:'Shipment Connector', vendor:'XtensionIT A/S · RelateIT', isv:'XtensionIT', cc:'DK', tags:['🇩🇰 Dansk','nShift Gold'],
         desc:'Fragtintegration til nShift, Shipmondo og Webshipper; fragtbrev dannes automatisk fra salgsordre eller lagerforsendelse.',
         s:{frm:9,bk:9,tt:9,ord:7,ret:6,dk:10},
         up:'Én app til alle tre danske platforme; højeste partnerniveau hos nShift.', dn:'Returflow og fragtpris kræver tillæg (Shipment Extender).'},
        {id:'abs', name:'nShift / Webshipper Connector', vendor:'Abakion', isv:'Abakion', cc:'DK', tags:['🇩🇰 Dansk','Power Automate'],
         desc:'Shipping Manager i BC plus connector via Power Automate: fragtbreve, kolli, labels, afhentning og track & trace; beregner vægt, mål og takster.',
         s:{frm:8,bk:8,tt:8,ord:8,ret:5,dk:9},
         up:'Beregner vægt, volumen og takster på forsendelsen.', dn:'Afhænger af Power Automate som mellemled.'},
        {id:'ssh', name:'SMARTshipment', vendor:'Inventio.IT A/S', isv:'Inventio.IT', cc:'DK', tags:['🇩🇰 Dansk','nShift + Shipmondo'],
         desc:'Opret og print fragtlabels direkte fra BC med adgang til både nShift (tidligere Consignor) og Shipmondo.',
         s:{frm:8,bk:8,tt:7,ord:6,ret:5,dk:9},
         up:'Valgfrihed mellem nShift og Shipmondo i samme app.', dn:'Mindre udbredt uden for Inventio.IT’s egne kunder.'},
        {id:'shm', name:'Shipmondo Connector', vendor:'MDC Nordic', isv:'MDC Nordic', cc:'', tags:['AppSource','Shipmondo'],
         desc:'Forsendelser fra bogførte salgsleverancer eller selvstændigt, afhentninger og alle fragtfirmaer på Shipmondo-kontoen.',
         s:{frm:8,bk:8,tt:7,ord:6,ret:5,dk:7},
         up:'Enkel og billig vej til Shipmondo, populær hos mindre danske webshops.', dn:'Kun Shipmondo; ingen nShift.'},
        {id:'sit', name:'ShipIT 365', vendor:'iDyn', isv:'iDyn', cc:'NL', tags:['AppSource','1.000+ fragtfirmaer'],
         desc:'Booking, labels og realtids-track & trace via nShift Ship eller Transsmart; fragtomkostning lægges automatisk på salgsordren.',
         s:{frm:9,bk:8,tt:8,ord:8,ret:6,dk:3},
         up:'Fragtgebyr automatisk på ordren og transportforsikring.', dn:'Hollandsk leverandør; ingen dansk sprogversion.'}
      ]
    },
    'loen': {
      no:'07', group:'Økonomi', short:'Løn', title:'Serie 07: Løn & lønintegration',
      lead:'Dansk løn kører næsten altid i et dansk lønsystem uden for BC. Spørgsmålet er, hvor godt lønbilaget, kontomapningen og tiden fra gulvet finder vej. Standard BC kan læse filer fra de klassiske danske lønudbydere.',
      cats:[
        ['bog','Lønbilag til finans','Lønkørsel bogføres automatisk i finanskladden.'],
        ['map','Kontomapning','Lønarter til finanskonti, afdelinger og dimensioner.'],
        ['tid','Tid & fravær til løn','Timer, fravær og tillæg fra registrering til lønsystem.'],
        ['app','Medarbejder-app','Lønsedler, ferie, fravær og kørsel på telefonen.'],
        ['std','Opsætning & standard','Hvor nemt det sættes op, og hvor tæt det er på BC-standard.'],
        ['dk','Dansk forankring','Danske regler, overenskomster og support.']
      ],
      cards:[
        {id:'std7', ref:true, name:'Payroll Data Definitions (DK)', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Filimport'],
         desc:'Importerer lønposter fra Danløn, Dataløn, Lønservice, Multiløn og Proløn; mapningen til finanskonti ligger i filen fra lønudbyderen.',
         s:{bog:4,map:4,tid:1,app:1,std:10,dk:9},
         up:'Gratis og dækker de klassiske danske lønudbydere.', dn:'Manuel filhåndtering; mapningen vedligeholdes uden for BC.'},
        {id:'zen', name:'Zenegy Payroll', vendor:'Zenegy', isv:'Zenegy', cc:'DK', tags:['🇩🇰 Dansk','BC-app'],
         desc:'Integration sat op fra Zenegys administratormodul; overfører lønkørsler, også tidligere, til BC. Samme app til timer, ferie, fravær, kørsel og udlæg.',
         s:{bog:8,map:7,tid:7,app:9,std:7,dk:10},
         up:'Moderne lønsystem med stærk medarbejder-app.', dn:'Appen er bygget af en tredjepart (Dynamics Inspire) for Zenegy.'},
        {id:'int', name:'Intect', vendor:'Intect', isv:'Intect', cc:'DK', tags:['🇩🇰 Dansk','API'],
         desc:'Lønkørsler eksporteres automatisk til finanskladden, når de bogføres; konti hentes fra BC og kobles på lønarterne.',
         s:{bog:9,map:8,tid:7,app:8,std:7,dk:10},
         up:'Bogføring sker af sig selv ved hver lønkørsel.', dn:'Opsætning via webtjenestenøgle; virksomhedsnavn skal matche præcist.'},
        {id:'jm7', name:'JobManager', vendor:'dynalogic · 9altitudes', isv:'dynalogic', cc:'DK', tags:['AppSource','Lønregler'],
         desc:'Ikke et lønsystem, men lønforberedelse: stempling og fravær i BC, lønregler beregner tillæg og danner lønbasis til eksport.',
         s:{bog:6,map:5,tid:10,app:7,std:8,dk:8},
         up:'Bedst til at få tid og overenskomsttillæg rigtigt fra gulvet.', dn:'Kræver stadig et lønsystem til selve lønkørslen.'}
      ]
    },
    'udlaeg': {
      no:'08', group:'Økonomi', short:'Udlæg & firmakort', title:'Serie 08: Udlæg & firmakort',
      lead:'Standard BC har ingen udlægsproces; medarbejdere oprettes typisk som kreditorer. Markedet er delt i to: løsninger bygget ind i BC og kortplatforme med en BC-connector. To af de største er danske.',
      cats:[
        ['kv','Kvitteringsflow','App, foto, OCR og påmindelser til medarbejderen.'],
        ['kort','Firmakort','Egne kort eller kreditkorttransaktioner matchet med kvitteringer.'],
        ['godk','Godkendelse','Godkendelsesflow, politikker og kontrol.'],
        ['bog','Bogføring & dimensioner','Konti, moms og dimensioner automatisk i BC.'],
        ['std','Inde i BC','Kører inde i BC frem for på en ekstern platform.'],
        ['dk','Dansk forankring','Dansk leverandør, regler og support.']
      ],
      cards:[
        {id:'std8', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Kreditor-model'],
         desc:'Medarbejdere som kreditorer og udlæg som købsfakturaer eller kladdelinjer. Ingen app og ingen kvitteringsflow.',
         s:{kv:2,kort:1,godk:3,bog:4,std:10,dk:6},
         up:'Ingen ekstra licens.', dn:'Manuel indtastning og papirkvitteringer.'},
        {id:'cem', name:'Expense Management', vendor:'Continia', isv:'Continia', cc:'DK', tags:['🇩🇰 Dansk','Inde i BC'],
         desc:'Udlæg via Continia Expense App eller Expense Portal, kreditkorttransaktioner, godkendelse, moms, fordelingskoder og sikkert arkiv.',
         s:{kv:8,kort:7,godk:9,bog:9,std:9,dk:10},
         up:'Samme godkendelses- og arkivlogik som Document Capture.', dn:'Ingen egne betalingskort; kortdata hentes fra banken.'},
        {id:'plo', name:'Pleo', vendor:'Pleo', isv:'Pleo', cc:'DK', tags:['🇩🇰 Dansk','Kortplatform'],
         desc:'Firmakort og app; integration v2 er en app i BC (cloud og on-prem) med kvitteringer, journal- eller købsfakturabogføring og dimensioner som tags.',
         s:{kv:9,kort:10,godk:7,bog:8,std:6,dk:10},
         up:'Bedste medarbejderoplevelse: kort, foto, færdig.', dn:'Processen lever i Pleo; BC får kun resultatet.'},
        {id:'zex', name:'Zetadocs Expenses', vendor:'Equisys', isv:'Equisys', cc:'GB', tags:['AppSource','Inde i BC'],
         desc:'Udlæg indsendes på telefonen, godkendes online og refunderes uden genindtastning i BC.',
         s:{kv:7,kort:6,godk:8,bog:8,std:8,dk:3},
         up:'Passer godt sammen med Zetadocs Capture og Delivery.', dn:'Britisk fokus; svagere på danske kort og regler.'},
        {id:'phk', name:'Payhawk', vendor:'Payhawk', isv:'Payhawk', cc:'', tags:['Kortplatform','BC-connector'],
         desc:'Kort-først-platform med kort, udlæg og fakturaer samt connector til Business Central.',
         s:{kv:8,kort:9,godk:8,bog:7,std:5,dk:2},
         up:'Stærk på multi-entitet og flere valutaer.', dn:'Ekstern platform; begrænset dansk tilstedeværelse.'},
        {id:'spd', name:'Spendesk', vendor:'Spendesk', isv:'Spendesk', cc:'FR', tags:['Kortplatform','BC-connector'],
         desc:'Fransk spend-platform med virtuelle og fysiske kort, godkendelser og eksport til Business Central.',
         s:{kv:8,kort:9,godk:7,bog:6,std:5,dk:2},
         up:'Virtuelle engangskort til abonnementer og indkøb.', dn:'Integrationen er mere eksport end integration.'}
      ]
    },
    'ehandel': {
      no:'09', group:'Salg & kanaler', short:'E-handel & PIM', title:'Serie 09: E-handel & PIM',
      lead:'Standard BC har en indbygget Shopify Connector, men ingen PIM. Danmark har to stærke spillere, DynamicWeb og Perfion. Serien blander webshop og PIM, så læs kategorierne som "hvor godt dækker den begge dele".',
      cats:[
        ['shop','Webshop B2B/B2C','Kundespecifikke priser, kundeportal, checkout.'],
        ['pim','PIM-dybde','Berigelse, attributter, sprog, medier og kanaler.'],
        ['erp','ERP-integration','Priser, lager og ordrer i realtid mod BC.'],
        ['ops','Opsætning','Low-code/no-code-mapping og tid til første resultat.'],
        ['std','Tæt på standard','Bruger BC-data og -logik uden tilpasninger.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support.']
      ],
      cards:[
        {id:'std9', ref:true, name:'Standard BC + Shopify', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Shopify Connector'],
         desc:'Indbygget Shopify Connector synkroniserer varer, kunder, lager og ordrer. Ingen PIM ud over varekortet.',
         s:{shop:6,pim:2,erp:7,ops:7,std:10,dk:5},
         up:'Gratis connector og hurtig vej til en B2C-shop.', dn:'Ingen B2B-portal og ingen produktberigelse.'},
        {id:'dw', name:'DynamicWeb', vendor:'DynamicWeb', isv:'DynamicWeb', cc:'DK', tags:['🇩🇰 Dansk','CMS + e-handel + PIM'],
         desc:'Composable suite med CMS, e-handel, PIM og marketing; standard OData-connector og no-code PIM-mapping til BC.',
         s:{shop:9,pim:8,erp:9,ops:7,std:7,dk:10},
         up:'Alt i én suite med stærk B2B og kundeportal.', dn:'Stort projekt; kræver en DynamicWeb-partner ved siden af BC-partneren.'},
        {id:'prf', name:'Perfion PIM', vendor:'Boyum IT', isv:'Boyum IT', cc:'DK', tags:['🇩🇰 Dansk','100 % BC-integreret'],
         desc:'PIM ved siden af BC: produktdata organiseres, beriges og valideres i Perfion, mens BC kun holder driftsklare varer.',
         s:{shop:3,pim:10,erp:8,ops:7,std:8,dk:10},
         up:'Den mest modne PIM i Dynamics-verdenen, med datablade og kataloger.', dn:'Ingen webshop; skal kombineres med fx Sana eller DynamicWeb.'},
        {id:'sana', name:'Sana Commerce', vendor:'Sana Commerce', isv:'Sana Commerce', cc:'NL', tags:['ERP-integreret','B2B'],
         desc:'ERP-integreret B2B-webshop, der bruger BC’s priser, lager og kundelogik direkte; har connector til Perfion.',
         s:{shop:9,pim:4,erp:10,ops:7,std:8,dk:4},
         up:'Priser og lager kommer direkte fra BC uden dobbelt data.', dn:'Hollandsk leverandør; PIM kræver et separat system.'}
      ]
    },
    'lager': {
      no:'10', group:'Drift & lager', short:'Mobilt lager', title:'Serie 10: Mobilt lager (WMS)',
      lead:'Standard BC har lagerdokumenter og BC-mobilappen, men ingen scanner-flade til lageret. Serien hænger tæt sammen med Labelprint (Serie 04). To af de stærkeste spillere er danske.',
      cats:[
        ['proc','Lagerprocesser','Modtagelse, læg-på-lager, pluk, optælling, flyt, produktion.'],
        ['off','Offline & robusthed','Arbejder videre uden Wi-Fi og synkroniserer bagefter.'],
        ['hw','Hardware','Zebra, Honeywell, Datalogic, smartphone, RFID.'],
        ['ops','Opsætning','Skabeloner, konfiguration uden kode, tid til første scanning.'],
        ['std','Tæt på standard','Bruger BC’s egne lagerdokumenter og -logik.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support.']
      ],
      cards:[
        {id:'std10', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','BC-mobilapp'],
         desc:'Lagerdokumenter (modtagelse, læg-på-lager, pluk) i BC-mobilappen, og stregkodescanning med kameraet i felter.',
         s:{proc:3,off:1,hw:4,ops:5,std:10,dk:6},
         up:'Ingen ekstra licens.', dn:'Ikke bygget til en scanner-arbejdsdag på lageret.'},
        {id:'tmw', name:'Tasklet Mobile WMS', vendor:'Tasklet Factory', isv:'Tasklet Factory', cc:'DK', tags:['🇩🇰 Dansk','1.500+ kunder'],
         desc:'Scanner-løsning med realtidsdata og offline-drift; integrerer med standard BC-lagerfunktioner, og tilpasninger laves i BC.',
         s:{proc:9,off:10,hw:8,ops:8,std:9,dk:10},
         up:'Offline-drift og stor installeret base (15.000+ enheder).', dn:'Kræver godkendte enheder; RFID er ikke kernen.'},
        {id:'npw', name:'NP WMS', vendor:'NaviPartner', isv:'NaviPartner', cc:'DK', tags:['🇩🇰 Dansk','RFID'],
         desc:'Bygget direkte i BC; 40+ skabeloner, opstart på én dag, scanning på smartphones og RFID med Zebra og Impinj.',
         s:{proc:8,off:6,hw:9,ops:9,std:9,dk:9},
         up:'Smartphone som scanner og RFID i samme løsning.', dn:'Kendt fra retail; færre referencer i produktion.'},
        {id:'iwi', name:'Warehouse Insight', vendor:'Insight Works', isv:'Insight Works', cc:'CA', tags:['AppSource','WMS Express gratis'],
         desc:'Fuld adgang til BC via scannere for lager og produktion; WMS Express er en gratis grundversion til BC Cloud.',
         s:{proc:8,off:6,hw:7,ops:7,std:8,dk:3},
         up:'Gratis indgang med WMS Express.', dn:'Nordamerikansk fokus; få danske partnere.'},
        {id:'yvn', name:'Yaveon 365 Warehouse App', vendor:'Yaveon', isv:'Yaveon', cc:'DE', tags:['AppSource','Papirløst lager'],
         desc:'Mobil, papirløs lagerløsning integreret med BC; tilbydes også sammen med Tasklet Mobile WMS.',
         s:{proc:7,off:6,hw:7,ops:6,std:8,dk:3},
         up:'Stærk i tysk procesindustri og regulerede brancher.', dn:'Tysk leverandør; begrænset dansk tilstedeværelse.'}
      ]
    },
    'planlaegning': {
      no:'11', group:'Interface & UX', short:'Grafisk planlægning', title:'Serie 11: Grafisk planlægning (Gantt)',
      lead:'Standard BC planlægger med datoer og linjer: man åbner rutelinjer én ad gangen og ser ikke, hvor arbejdscentre er overbelastede. Grafisk planlægning er ren brugeroplevelse: samme data, men som træk-og-slip på en tidslinje.',
      cats:[
        ['vis','Visuelt overblik','Gantt, kalender, belastning, farver og filtre.'],
        ['dd','Træk & slip','Flyt ordrer, operationer og ressourcer direkte i planen.'],
        ['kap','Kapacitet & konflikter','Endelig kapacitet, konfliktvarsler, semi-automatisk planlægning.'],
        ['omr','Områder','Produktion, sager/projekter, service.'],
        ['std','Tæt på standard','Arbejder direkte på BC-data uden kopi.'],
        ['tar','Lav tærskel','Pris, opsætning og hvor hurtigt planlæggeren er i gang.']
      ],
      cards:[
        {id:'std11', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Planlægningskladder'],
         desc:'Planlægningskladder, ordreplanlægning og kapacitetsposter; alt som lister og linjer.',
         s:{vis:2,dd:1,kap:4,omr:6,std:10,tar:8},
         up:'Fuld logik og ingen licens.', dn:'Intet visuelt billede af belastning og konflikter.'},
        {id:'vps', name:'Visual Production Scheduler', vendor:'NETRONIC · Boyum IT', isv:'NETRONIC', cc:'DE', tags:['AppSource','VPS / VAPS'],
         desc:'Interaktiv Gantt over produktionsordrer og kapaciteter; VAPS tilføjer semi-automatisk planlægning med endelig kapacitet.',
         s:{vis:9,dd:9,kap:9,omr:5,std:9,tar:6},
         up:'Branchens mest modne Gantt til BC-produktion.', dn:'Kun produktion; VAPS er en separat, dyrere udgave.'},
        {id:'vjs', name:'Visual Jobs Scheduler', vendor:'NETRONIC · Boyum IT', isv:'NETRONIC', cc:'DE', tags:['AppSource','Sager & ressourcer'],
         desc:'Træk-og-slip-forside til BC’s sager og ressourcer: sager, opgaver, planlægningslinjer og ressourcebelastning i én Gantt.',
         s:{vis:9,dd:9,kap:7,omr:5,std:9,tar:6},
         up:'Samler data fra mange tabeller i én plan.', dn:'Kun sager; produktion kræver VPS.'},
        {id:'igs', name:'Graphical Scheduler', vendor:'Insight Works', isv:'Insight Works', cc:'CA', tags:['AppSource','Gratis'],
         desc:'Gratis træk-og-slip-Gantt- og kalendervisning oven på BC’s egne planlægningsdata; ingen brugerbegrænsning i BC online.',
         s:{vis:7,dd:7,kap:5,omr:5,std:9,tar:10},
         up:'Gratis i BC online; lav risiko at prøve.', dn:'Ikke en APS; ingen avanceret kapacitetsoptimering.'},
        {id:'rbx', name:'ROB-EX Scheduler Connector', vendor:'Abakion', isv:'Abakion', cc:'DK', tags:['🇩🇰 Dansk partner','Ekstern APS'],
         desc:'Standardintegration mellem BC og ROB-EX Scheduler: frisk BC-data hentes ind i ROB-EX’s interaktive Gantt-planlægning.',
         s:{vis:9,dd:9,kap:9,omr:5,std:5,tar:5},
         up:'Fuld APS-motor til komplekse produktionsplaner.', dn:'Planen lever i ROB-EX, ikke i BC.'}
      ]
    },
    'layout': {
      no:'12', group:'Interface & UX', short:'Dokumentlayout', title:'Serie 12: Rapport- & dokumentlayout',
      lead:'Fakturaen er det, kunden ser. Standard BC har Word- og RDLC-layouts, men ændringer kræver ofte en udvikler. Her er flere danske kort: ForNAV og Perfion hører nu begge under danske Boyum IT, og Abakion og InterForm er også danske.',
      cats:[
        ['des','Designer til superbruger','Kan en superbruger rette layoutet uden udvikler?'],
        ['skb','Færdige skabeloner','Rapportpakke med pæne standarddokumenter fra start.'],
        ['spr','Sprog & varianter','Oversættelser, kundespecifikke versioner, betingelser.'],
        ['dist','Distribution','Print, e-mail, arkiv, e-faktura fra samme løsning.'],
        ['std','Tæt på standard','Bygger på BC-rapporter og -rapportvalg.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support.']
      ],
      cards:[
        {id:'std12', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Word / RDLC'],
         desc:'Rapportlayouts i Word, RDLC eller Excel; brugere kan rette Word-layouts, men nye felter kræver AL-udvikling.',
         s:{des:4,skb:4,spr:5,dist:4,std:10,dk:6},
         up:'Word-layouts er gratis og velkendte.', dn:'Nye data i layoutet kræver en udvikler.'},
        {id:'fnv', name:'ForNAV', vendor:'Boyum IT', isv:'ForNAV · Boyum IT', cc:'DK', tags:['🇩🇰 Dansk ejer','100+ rapporter'],
         desc:'Rapportpakke med 100+ standardrapporter, egen designer, direkte print, Excel, filservice og e-faktura under én licens.',
         s:{des:8,skb:10,spr:8,dist:9,std:8,dk:9},
         up:'Mest komplette pakke: designer, rapporter og print i én licens.', dn:'Designeren er et udviklerværktøj mere end et brugerværktøj.'},
        {id:'adc', name:'Document Customizer', vendor:'Abakion', isv:'Abakion', cc:'DK', tags:['🇩🇰 Dansk','26 dokumenter'],
         desc:'Tilpas, layout og oversæt 26 dokumenter: ret tekster, indsæt felter, styr sprogversioner og kundespecifikke versioner.',
         s:{des:9,skb:8,spr:9,dist:4,std:8,dk:10},
         up:'Den letteste vej for en superbruger; mange anmeldelser på AppSource.', dn:'Fokus på salgs- og købsbilag; ingen distribution.'},
        {id:'ifl', name:'InterFormNG', vendor:'InterForm A/S', isv:'InterForm', cc:'DK', tags:['🇩🇰 Dansk','Online designer'],
         desc:'Online layoutdesigner med betingede elementer; samme værktøj til fakturaer og labels, med e-mail og arkiv.',
         s:{des:8,skb:6,spr:7,dist:8,std:7,dk:10},
         up:'Én designer til dokumenter og labels.', dn:'Kører i InterForms platform ved siden af BC.'},
        {id:'bdd', name:'Beyond Document Designer', vendor:'Beyond IT', isv:'Beyond IT', cc:'DE', tags:['AppSource','No-code'],
         desc:'Pixelpræcise dokumenter uden kode: layout, felter, oversættelser og branding styres i BC.',
         s:{des:8,skb:6,spr:8,dist:4,std:8,dk:2},
         up:'Ren no-code inde i BC.', dn:'Tysk leverandør; få danske referencer.'},
        {id:'wdc', name:'Document Creator', vendor:'WSB Solutions', isv:'WSB Solutions', cc:'NL', tags:['AppSource','Træk & slip'],
         desc:'Rapportdesigner med træk-og-slip af felter, oversættelse af labels og udvidede datasæt.',
         s:{des:7,skb:5,spr:7,dist:3,std:7,dk:2},
         up:'Kan udvide datasættet uden AL.', dn:'Separat designer-program; hollandsk fokus.'}
      ]
    },
    'rollecenter': {
      no:'13', group:'Interface & UX', short:'Rollecenter & KPI', title:'Serie 13: Rollecenter & KPI',
      lead:'Rollecentret er det første, brugeren ser hver morgen. Standard BC har køer og indlejrede Power BI-apps, men egne køer og KPI’er kræver AL. Serien handler om no-code-tilpasning af forsiden.',
      cats:[
        ['nc','No-code KPI','Lav egne køer og fliser uden udvikler.'],
        ['vis','Visualisering','Grafer, farver, tendenser og tærskler.'],
        ['rol','Rolletilpasning','Forskellige forsider pr. rolle, bruger eller afdeling.'],
        ['drl','Drill-down','Fra tal til liste til bilag med ét klik.'],
        ['std','Tæt på standard','Bruger standardrollecentre og -sider.'],
        ['tar','Lav tærskel','Pris og tid til første KPI.']
      ],
      cards:[
        {id:'std13', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Power BI-apps'],
         desc:'Standardkøer pr. rolle og indlejrede Power BI-apps til finans, salg, indkøb, lager og produktion.',
         s:{nc:2,vis:7,rol:5,drl:8,std:10,tar:7},
         up:'Power BI-apps er gratis og indlejret i BC.', dn:'Nye køer kræver AL; Power BI kræver licens.'},
        {id:'bcu', name:'Beyond Cues', vendor:'Beyond IT', isv:'Beyond IT', cc:'DE', tags:['AppSource','No-code KPI-builder'],
         desc:'Rollespecifikke KPI’er, fliser og visuelle indsigter uden kode, flersprogede og ubegrænsede pr. rollecenter.',
         s:{nc:9,vis:8,rol:8,drl:8,std:8,tar:7},
         up:'Den mest komplette no-code KPI-builder.', dn:'Tysk leverandør; licens pr. bruger.'},
        {id:'egl', name:'Eagle Free', vendor:'SmartApps', isv:'SmartApps', cc:'', tags:['AppSource','Gratis'],
         desc:'KPI’er på standardrollecentre på under ét minut ud fra skabeloner, eller fra bunden på enhver tabel.',
         s:{nc:8,vis:6,rol:6,drl:7,std:9,tar:10},
         up:'Gratis og skabelonbaseret.', dn:'Enklere grafik end de betalte alternativer.'},
        {id:'dcu', name:'Dynamics Cues', vendor:'Dynamics Consultants', isv:'Dynamics Consultants', cc:'', tags:['AppSource','Køer & paneler'],
         desc:'Opret egne køer og paneler på rollecentre uden udvikling.',
         s:{nc:8,vis:6,rol:7,drl:7,std:7,tar:6},
         up:'Fleksible paneler oven på eksisterende rollecentre.', dn:'Kræver deres grundapp Dynamics Center.'},
        {id:'fdr', name:'Dynamic Role Center', vendor:'Faect', isv:'Faect', cc:'NL', tags:['AppSource','Konfiguration'],
         desc:'Nye rollecentre ved konfiguration alene, med filtre pr. rolle og ekstra komplementære felter.',
         s:{nc:7,vis:5,rol:9,drl:6,std:7,tar:6},
         up:'Hele rollecentre uden AL, ikke kun køer.', dn:'Ny og lille leverandør.'}
      ]
    },
    'nocode': {
      no:'14', group:'Interface & UX', short:'Tilpasning uden kode', title:'Serie 14: Felter & tilpasning uden kode',
      lead:'"Kan vi ikke lige få et felt mere?" er den mest almindelige ændringsønske. Standard BC lader administratorer tilføje eksisterende, skjulte felter til sider, men ikke nye felter. Appsene her genererer selv en udvidelse. Det giver fart, men også governance-spørgsmål.',
      cats:[
        ['flt','Nye felter','Nye felter på tabeller og sider uden AL.'],
        ['obj','Nye objekter','Nye tabeller, sider og rapporter.'],
        ['lgk','Logik','Validering, obligatoriske felter, egen kode i triggere.'],
        ['gov','Governance','Separat udvidelse, sandkasse-udrulning, sporbarhed.'],
        ['upg','Opgraderingssikkerhed','Hvor sikkert det overlever BC-opdateringer.'],
        ['ux','Brugervenlighed','Kan en superbruger gøre det selv?']
      ],
      cards:[
        {id:'std14', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Tilpasning'],
         desc:'Personalisering og tilpasning; administratorer kan tilføje eksisterende tabelfelter til sider med en systemtilladelse.',
         s:{flt:2,obj:1,lgk:1,gov:8,upg:10,ux:8},
         up:'Helt sikkert og gratis.', dn:'Kun eksisterende felter; intet nyt.'},
        {id:'sod', name:'Simple Object Designer', vendor:'Hougaard', isv:'Hougaard', cc:'', tags:['AppSource','App-generator'],
         desc:'Indbygget app-generator og compiler: nye felter, nye tabeller ud fra skabeloner og udrulning til produktion på få minutter.',
         s:{flt:10,obj:9,lgk:8,gov:7,upg:7,ux:8},
         up:'Det mest kraftfulde no-code-værktøj; prøveversion til sandkasser.', dn:'Så kraftfuldt, at det kræver styring, så det ikke bliver skygge-udvikling.'},
        {id:'sde', name:'SD Easy Customise', vendor:'Simply D', isv:'Simply D', cc:'', tags:['AppSource','Egen kode'],
         desc:'Nye felter, ændrede egenskaber, opslag og egen AL-kode i tabel-, felt- og sidetriggere; alt samlet i en separat udvidelse.',
         s:{flt:9,obj:5,lgk:9,gov:8,upg:7,ux:7},
         up:'Alle ændringer i én separat udvidelse.', dn:'"Egen kode" uden udvikler kan blive en risiko.'},
        {id:'dno', name:'DINO 365', vendor:'iDyn', isv:'iDyn', cc:'NL', tags:['AppSource','Guide'],
         desc:'Tilføj felter til enhver side via en trin-for-trin-guide; betaling pr. bruger via PayPal i appen.',
         s:{flt:8,obj:2,lgk:3,gov:6,upg:8,ux:9},
         up:'Den enkleste guide; superbrugere kan selv.', dn:'Kun felter; ingen logik eller nye objekter.'},
        {id:'cdf', name:'Custom Defined Fields', vendor:'EOS Solutions', isv:'EOS Solutions', cc:'IT', tags:['AppSource','Op til 32 felter'],
         desc:'Op til 32 brugerdefinerede felter på forskellige kort, med opslagstabeller og oversættelse, uden udviklerlicens.',
         s:{flt:6,obj:1,lgk:4,gov:8,upg:9,ux:8},
         up:'Forudbyggede felter; meget lav opgraderingsrisiko.', dn:'Fast antal felter og kun på kort.'}
      ]
    },
    'excel': {
      no:'15', group:'Interface & UX', short:'Excel & dataimport', title:'Serie 15: Excel & dataimport',
      lead:'Excel er stadig hverdagens brugerflade: kladder forberedes, prislister kommer fra leverandører, og ledelsesrapporter bygges i regneark. Standard BC har "Rediger i Excel" og konfigurationspakker, men data skal ofte formateres om først.',
      cats:[
        ['imp','Import som modtaget','Importér filen, som den kommer, uden omformatering.'],
        ['map','Skabeloner & mapping','Genbrugelige skabeloner og oversættelse til konti og dimensioner.'],
        ['val','Validering','Kontrol før import, fejlrapport.'],
        ['rap','Rapportering i Excel','Live BC-data i Excel-rapporter.'],
        ['std','Tæt på standard','Bruger BC-kladder og -bilag.'],
        ['ux','Brugervenlighed','Kan økonomi gøre det uden konsulent?']
      ],
      cards:[
        {id:'std15', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Rediger i Excel'],
         desc:'Rediger i Excel, Åbn i Excel og konfigurationspakker; filen skal have BC’s kolonner og opdeles i tabeller.',
         s:{imp:3,map:3,val:5,rap:5,std:10,ux:6},
         up:'Rediger i Excel er hurtigt til kladder.', dn:'Data skal formes, før BC vil have dem.'},
        {id:'exi', name:'Excel Importer', vendor:'Theta Systems', isv:'Theta Systems', cc:'NZ', tags:['AppSource','Skabeloner'],
         desc:'Importér regneark og tekstfiler uden at formatere om; oversætter kildeværdier til konti og dimensioner; kladder, ordrer, fakturaer og priser.',
         s:{imp:9,map:9,val:8,rap:1,std:9,ux:8},
         up:'Brugerne melder om 90 % hurtigere upload end standardværktøjet.', dn:'Kun import; ingen rapportering.'},
        {id:'jet', name:'Jet Reports', vendor:'insightsoftware', isv:'insightsoftware', cc:'US', tags:['Excel-tilføjelse','Rapportering'],
         desc:'Excel-baserede økonomi- og driftsrapporter med live data fra BC via en gratis BC-connector.',
         s:{imp:1,map:5,val:4,rap:10,std:7,ux:7},
         up:'Økonomiafdelingens favorit til månedsrapporter i Excel.', dn:'Kun rapportering; separat licens fra insightsoftware.'},
        {id:'itm', name:'Import Templates', vendor:'Memento', isv:'Memento', cc:'IT', tags:['AppSource','Kladder & bilag'],
         desc:'Konfigurerbare importmodeller til kladder og bilag fra Excel, CSV og faste længder, startet direkte fra kladden.',
         s:{imp:8,map:8,val:7,rap:1,std:9,ux:7},
         up:'Import startes der, hvor brugeren arbejder.', dn:'Italiensk leverandør; ingen dansk support.'},
        {id:'bcc', name:'BCCL', vendor:'Hougaard', isv:'Hougaard', cc:'', tags:['AppSource','Kommandolinje'],
         desc:'Kommandolinjeværktøj til eksport og import af enhver tabel i JSON, XML, CSV, SQL og Excel, til konverteringer og automatisering.',
         s:{imp:7,map:6,val:5,rap:3,std:6,ux:3},
         up:'Konsulentens schweizerkniv til datakonvertering.', dn:'Ikke for slutbrugere.'}
      ]
    },
    'debitor': {
      no:'16', group:'Økonomi', short:'Debitor & opkrævning', title:'Serie 16: Debitor & opkrævning',
      lead:'Standard BC kan sende kontoudtog og rykkere og automatisere rykkerprocessen. Det kan ikke opkræve via Betalingsservice eller MobilePay, og kreditstyringen er manuel. Serien blander danske opkrævningsløsninger og internationale kreditstyringsapps.',
      cats:[
        ['opk','Opkrævning','Betalingsservice, MobilePay, kort og direct debit direkte fra BC.'],
        ['ryk','Rykker & opfølgning','Rykkerforløb, påmindelser, opfølgningsopgaver.'],
        ['kred','Kreditstyring','Kreditgrænser, spærring af ordrer, tvister.'],
        ['ovb','Overblik & status','Aftale- og betalingsstatus, opgaver pr. debitor.'],
        ['std','Tæt på standard','Bygger på BC-debitorposter og -rykkere.'],
        ['dk','Dansk forankring','Danske betalingsformer, banker og support.']
      ],
      cards:[
        {id:'std16', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Rykkerautomatisering'],
         desc:'Kontoudtog, rykkerbetingelser og automatisering af rykkere; Copilot for Finance kan skrive rykkermails i Outlook.',
         s:{opk:2,ryk:7,kred:4,ovb:5,std:10,dk:6},
         up:'Automatiske rykkere er med i standard.', dn:'Ingen opkrævning via danske betalingsformer.'},
        {id:'ccm', name:'Collection Management', vendor:'Continia', isv:'Continia', cc:'DK', tags:['🇩🇰 Kun DK','Betalingsservice'],
         desc:'Kundens foretrukne opkrævningsform sættes automatisk på ordre og faktura; opkrævning, status og bogføring via Betalingsservice, Danske Bank, Bambora m.fl.',
         s:{opk:10,ryk:4,kred:6,ovb:9,std:8,dk:10},
         up:'Samme arbejdsgang uanset opkrævningsform, B2B og B2C.', dn:'Kun Danmark, Færøerne og Grønland; ingen rykkerlogik.'},
        {id:'cmp', name:'MobilePay Invoice & Subscriptions', vendor:'Continia · MobilePay', isv:'Continia', cc:'DK', tags:['🇩🇰 Dansk','Gratis udvidelse'],
         desc:'Faktura direkte i kundens MobilePay-app og tilbagevendende opkrævning via betalingsaftale; data i BC opdateres automatisk.',
         s:{opk:8,ryk:5,kred:2,ovb:6,std:8,dk:10},
         up:'Kunden betaler med ét swipe; push-besked på forfaldsdagen.', dn:'Kun MobilePay; resten kræver Collection Management.'},
        {id:'ccr', name:'Clever Credit', vendor:'Tecman', isv:'Tecman', cc:'GB', tags:['AppSource','Kreditspærring'],
         desc:'Spærrer automatisk salgsordrer ved overforfaldne saldi eller overskredet kreditgrænse; opfølgningsopkald og to-dos pr. kreditansvarlig.',
         s:{opk:1,ryk:8,kred:9,ovb:8,std:8,dk:3},
         up:'Automatisk ordrespærring med fleksible godkendelser.', dn:'Britisk fokus; ingen danske betalingsformer.'},
        {id:'bsr', name:'AR & Collections Manager', vendor:'Binary Stream', isv:'Binary Stream', cc:'CA', tags:['AppSource','Tvister'],
         desc:'Kreditstyring med automatisk kreditspærring, tvisthåndtering i realtid og samlet opfølgning på inddrivelse.',
         s:{opk:2,ryk:8,kred:9,ovb:8,std:7,dk:2},
         up:'Stærk tvist- og cash flow-styring.', dn:'Nordamerikansk; ingen dansk lokalisering.'}
      ]
    },
    'projekt': {
      no:'17', group:'Projekt & service', short:'Projekt, sag & tid', title:'Serie 17: Projekt, sag & tid',
      lead:'Standard BC har sager og timesedler, men timer registreres som summer pr. dag og opgave, uden fra-til. Serien er tæt på det danske marked: fire af fem kort er danske. Den hænger sammen med JobManager (Serie 01) og Visual Jobs Scheduler (Serie 11).',
      cats:[
        ['tid','Tidsregistrering','Mobil, start/stop, fra-til, kalender.'],
        ['godk','Godkendelse & fravær','Godkendelse, saldi, ferie og fravær.'],
        ['plan','Planlægning & ressourcer','Opgaver, kapacitet, ressourceplan.'],
        ['fakt','Fakturering','Løbende og afsluttende fakturering ud fra sagsposter.'],
        ['std','Inde i BC','Kører i BC frem for i et eksternt system.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support.']
      ],
      cards:[
        {id:'std17', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Sager + timesedler'],
         desc:'Sager, opgaver, planlægningslinjer og timesedler med godkendelse; timer registreres i alt pr. dag pr. opgave.',
         s:{tid:4,godk:6,plan:5,fakt:6,std:10,dk:6},
         up:'Fuld sagsøkonomi i standard.', dn:'Tung tidsregistrering for medarbejderen.'},
        {id:'tlg', name:'TimeLog PSA', vendor:'TimeLog · Abakion connector', isv:'TimeLog', cc:'DK', tags:['🇩🇰 Dansk','Ekstern PSA'],
         desc:'PSA til konsulenthuse: tid via app, desktop eller web, projektøkonomi, ressourceplanlægning og automatisk fakturering; Abakion-connector til BC.',
         s:{tid:9,godk:8,plan:9,fakt:9,std:4,dk:10},
         up:'Mest komplette PSA for rådgivere og konsulenter.', dn:'Projekterne lever i TimeLog, ikke i BC.'},
        {id:'ptm', name:'Project Time Mobile', vendor:'Abakion', isv:'Abakion', cc:'DK', tags:['🇩🇰 Dansk','Gratis'],
         desc:'Gratis app i BC: tid og materialer via guide eller start/stop, opgaver tildelt medarbejdere, bygget på BC’s mobile flow.',
         s:{tid:8,godk:4,plan:4,fakt:5,std:10,dk:9},
         up:'Gratis og helt inde i BC.', dn:'Kun registrering; planlægning og fakturering er standard.'},
        {id:'smt', name:'SMARTtime', vendor:'Inventio.IT', isv:'Inventio.IT', cc:'DK', tags:['🇩🇰 Kun DK','Fakturering'],
         desc:'Tid fra smartphone og tablet, masseoprettelse af projekter, rentabilitet og løbende eller afsluttende fakturering med frit valg af sagsposter.',
         s:{tid:8,godk:6,plan:6,fakt:9,std:8,dk:10},
         up:'Stærk på faktureringsgrad.', dn:'Kun dansk lokalisering.'},
        {id:'t720', name:'Timesheet720', vendor:'ON720.COM', isv:'ON720.COM', cc:'DK', tags:['🇩🇰 Dansk','Fravær'],
         desc:'Timesedler med fravær, saldi, udlæg, arbejdstidsskabeloner og helligdagskalendere til kapacitet.',
         s:{tid:7,godk:7,plan:7,fakt:5,std:8,dk:9},
         up:'Timer, fravær og saldi samlet ét sted.', dn:'Kun BC Cloud.'},
        {id:'pry', name:'Pryme Time', vendor:'Pryme', isv:'Pryme', cc:'', tags:['AppSource','Copilot'],
         desc:'Stopure, Outlook-kalender til tidsposter, og Copilot der finder huller i timesedlen og pudser beskrivelser på fakturaforslag.',
         s:{tid:9,godk:6,plan:5,fakt:6,std:8,dk:3},
         up:'Den mest moderne AI-hjælp til tidsregistrering.', dn:'Ingen dansk partner eller support.'}
      ]
    },
    'bi': {
      no:'18', group:'Data & indsigt', short:'BI & rapportering', title:'Serie 18: BI & rapportering',
      lead:'Standard BC har gratis Power BI-apps til økonomi, salg, indkøb, lager og produktion, men de kræver Power BI-licens. Serien skelner mellem færdige dashboards, Excel-rapportering og ren dataadgang til Power BI og Fabric.',
      cats:[
        ['dash','Færdige dashboards','Klar-til-brug-rapporter for økonomi, salg, SCM.'],
        ['selv','Selvbetjening','Kan forretningen selv bygge og ændre rapporter?'],
        ['data','Dataadgang','API, datawarehouse, Fabric, flere selskaber.'],
        ['xl','Excel','Rapportering og analyse i Excel.'],
        ['std','Tæt på standard','Microsoft-stak og BC-standard-API’er.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support.']
      ],
      cards:[
        {id:'std18', ref:true, name:'Power BI-apps i BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Power BI'],
         desc:'Power BI-apps til økonomi, salg, indkøb, lager, lagerværdi og produktion, indlejret i BC; kræver betalt Power BI-licens.',
         s:{dash:7,selv:6,data:5,xl:5,std:10,dk:6},
         up:'Gratis apps og indlejret visning i BC.', dn:'Kræver Power BI-licens og kompetencer at udvide.'},
        {id:'tgt', name:'TARGIT for Business Central', vendor:'TARGIT', isv:'TARGIT', cc:'DK', tags:['🇩🇰 Dansk','BI-accelerator'],
         desc:'BI-accelerator med færdige dashboards til salg, økonomi og SCM; BC-udvidelse til dataudtræk og datawarehouse i TARGITs cloud.',
         s:{dash:9,selv:8,data:8,xl:5,std:5,dk:10},
         up:'Hurtigt i gang med færdige dashboards; dansk BI-leverandør.', dn:'Egen platform ved siden af Microsoft-stakken.'},
        {id:'jet18', name:'Jet Reports', vendor:'insightsoftware', isv:'insightsoftware', cc:'US', tags:['Excel-tilføjelse','Økonomi'],
         desc:'Økonomi- og driftsrapporter i Excel med live data fra BC via en gratis connector.',
         s:{dash:5,selv:7,data:6,xl:10,std:7,dk:3},
         up:'Økonomiens foretrukne værktøj til månedsrapporter.', dn:'Excel-centreret; svagere til dashboards.'},
        {id:'dwe', name:'BI Endpoints', vendor:'Datawareness', isv:'Datawareness', cc:'DK', tags:['🇩🇰 Dansk','Power BI / Fabric'],
         desc:'Forenklede API-endpoints til at trække BC-data ind i Power BI og Microsoft Fabric, med referenceguide og eksempelkode.',
         s:{dash:2,selv:3,data:8,xl:3,std:8,dk:9},
         up:'Gør BC-data let at hente for Power BI-folk.', dn:'Dataadgang, ikke færdige rapporter.'},
        {id:'b2f', name:'BC 2 Fabric', vendor:'navida', isv:'navida', cc:'DE', tags:['AppSource','Fabric'],
         desc:'Næsten realtidssynkronisering af BC-data til Microsoft Fabric, også på tværs af selskaber og tenants.',
         s:{dash:2,selv:4,data:9,xl:2,std:6,dk:2},
         up:'Moderne dataplatform med data på tværs af selskaber.', dn:'Kræver Fabric-kapacitet og datakompetencer.'}
      ]
    },
    'stamdata': {
      no:'19', group:'Data & indsigt', short:'Stamdata & kreditinfo', title:'Serie 19: Stamdata & kreditinfo',
      lead:'Rigtige stamdata og en kreditvurdering, før ordren sendes, sparer tab og rettelser. Standard BC validerer CVR-nummer og momsnummer, men har ingen kreditoplysninger. Bemærk: flere apps her dækker ikke Danmark.',
      cats:[
        ['ops','Opslag & oprettelse','Søg virksomhed og opret kunde eller kreditor med korrekte data.'],
        ['krd','Kreditvurdering','Rating, kreditrapport, betalingsadfærd.'],
        ['ovv','Overvågning & workflows','Kreditgrænse, spærring, ændringsovervågning.'],
        ['glb','Global dækning','Antal lande og virksomheder.'],
        ['std','Tæt på standard','Bruger BC-kunder, -kreditorer og -kreditgrænser.'],
        ['dk','Dansk dækning','Danske data (CVR) og dansk support.']
      ],
      cards:[
        {id:'std19', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','CVR-validering'],
         desc:'CVR-nummer valideres via NemHandel-API’er og EU-momsnumre via VIES; kreditgrænse sættes manuelt.',
         s:{ops:3,krd:1,ovv:3,glb:4,std:10,dk:7},
         up:'Grundvalidering uden ekstra licens.', dn:'Ingen kreditoplysninger eller berigelse.'},
        {id:'prp', name:'Proff Pro', vendor:'BRX', isv:'BRX', cc:'NO', tags:['AppSource','Norden'],
         desc:'Skandinaviske virksomhedsoplysninger og kreditrating fra Proff direkte i BC; tilgængelig i Norge, Sverige, Danmark og Finland.',
         s:{ops:8,krd:8,ovv:6,glb:5,std:8,dk:6},
         up:'Nordiske data i en BC-app.', dn:'Designet til norske virksomheder.'},
        {id:'kcc', name:'Credit-Check (Creditsafe)', vendor:'KUMAVISION', isv:'KUMAVISION', cc:'DE', tags:['AppSource','Creditsafe'],
         desc:'Søg i Creditsafe fra BC, opret kunder med korrekte data, daglige rapporter, revisionsspor og workflows der sætter kreditgrænse eller spærrer salg.',
         s:{ops:9,krd:9,ovv:8,glb:9,std:8,dk:2},
         up:'Færdige workflows fra kreditscore til spærring.', dn:'Danmark er ikke blandt de understøttede lande.'},
        {id:'tdb', name:'Dun & Bradstreet Integration', vendor:'Telos Team ApS', isv:'Telos Team', cc:'DK', tags:['🇩🇰 Dansk','D&B'],
         desc:'Match, berig og søg kontakter, kunder og kreditorer i Dun & Bradstreet verden over; opret en eller flere direkte fra søgeresultatet.',
         s:{ops:9,krd:5,ovv:4,glb:9,std:8,dk:9},
         up:'Global stamdataberigelse fra en dansk leverandør.', dn:'Mere stamdata end kreditstyring.'},
        {id:'alz', name:'Allianz Trade for BC', vendor:'Allianz Trade', isv:'Allianz Trade', cc:'FR', tags:['Officiel udvidelse','Kreditforsikring'],
         desc:'Kreditforsikringen direkte i BC: adgang til Allianz Trades globale køberdatabase, kreditindsigt og historik, med automatisk synkronisering.',
         s:{ops:5,krd:8,ovv:7,glb:8,std:8,dk:7},
         up:'Forsikringsdækning og kreditgrænser samme sted.', dn:'Kræver en kreditforsikringspolice.'}
      ]
    },
    'udlejning': {
      no:'20', group:'Projekt & service', short:'Udlejning', title:'Serie 20: Udlejning & rental',
      lead:'Standard BC har ingen udlejning; man bøjer ressourcer, anlæg eller overflytninger. Udlejning er en klassisk BC-niche med mange internationale løsninger og få danske.',
      cats:[
        ['flow','Udlejningsflow','Tilbud, ordre, udlevering, retur.'],
        ['tlg','Tilgængelighed','Reservation, serienumre, lokationer, flåde.'],
        ['fakt','Fakturering','Periodisk og tilbagevendende fakturering.'],
        ['srv','Service & vedligehold','Eftersyn, skader og reparation af udlejningsudstyr.'],
        ['std','Tæt på standard','Bruger salgsordrer, ressourcer og lager i BC.'],
        ['dk','Dansk forankring','Dansk leverandør, partnere og support.']
      ],
      cards:[
        {id:'std20', ref:true, name:'Standard BC', vendor:'Microsoft', isv:'Microsoft', cc:'US', tags:['Indbygget','Omvej'],
         desc:'Ingen udlejningsmodul; typisk løst med ressourcer, anlæg eller overflytningsordrer og abonnementsfakturering.',
         s:{flow:2,tlg:3,fakt:4,srv:4,std:10,dk:6},
         up:'Ingen licens.', dn:'Udlejning bliver et lappetæppe af omveje.'},
        {id:'arm', name:'Rental Management', vendor:'Abakion', isv:'Abakion', cc:'DK', tags:['🇩🇰 Dansk','Salgsordre-baseret'],
         desc:'Varer markeres som udlejningsvarer og udlejes på en almindelig salgsordre; linjer konverteres til ressourcelinjer, og overflytninger dannes bag om.',
         s:{flow:7,tlg:8,fakt:6,srv:3,std:9,dk:9},
         up:'Bruger BC’s egne ordrer, reservationer og lager.', dn:'Mindre egnet til stor flåde og service.'},
        {id:'eqm', name:'EQM 365 Rental', vendor:'Armada Dynamics', isv:'Armada Dynamics', cc:'NO', tags:['AppSource','Udstyr & aktiver'],
         desc:'Komplet udlejning af udstyr og aktiver til BC, cloud og on-prem, med tillæg til deling af udstyr på tværs af selskaber.',
         s:{flow:9,tlg:9,fakt:9,srv:8,std:7,dk:6},
         up:'Nordisk branchetung løsning med intercompany.', dn:'Stort setup; tredjeparts-tillæg til mere.'},
        {id:'odt', name:'ODT Rentals', vendor:'Open Door Technology', isv:'Open Door Technology', cc:'', tags:['AppSource','Udstyrsudlejning'],
         desc:'Udstyrsudlejning med økonomi, drift, udnyttelse og flådestyring samt valgfri service; Power BI-tillæg.',
         s:{flow:8,tlg:8,fakt:8,srv:8,std:7,dk:2},
         up:'Moden løsning med udnyttelsesgrad og flåde.', dn:'Danmark er ikke blandt de understøttede lande.'},
        {id:'rpm', name:'RPM', vendor:'Suite Engine', isv:'Suite Engine', cc:'US', tags:['AppSource','Udlejning + salg + service'],
         desc:'Udlejning, salg og service af udstyr i én løsning, med abonnementsfakturering og periodisering af omsætning.',
         s:{flow:9,tlg:8,fakt:9,srv:9,std:7,dk:1},
         up:'Samler udlejning, salg og værksted.', dn:'Kun USA og Canada.'},
        {id:'esr', name:'Essential Rental', vendor:'H2 Business Systems', isv:'H2 Business Systems', cc:'', tags:['AppSource','Enkel'],
         desc:'Tilbud, ordrer, forsendelser, returer og automatisk tilbagevendende fakturering; ubegrænset prøve i sandkasse.',
         s:{flow:7,tlg:6,fakt:8,srv:2,std:8,dk:2},
         up:'Enkel og hurtig at komme i gang med.', dn:'Ingen service; tynd dokumentation.'}
      ]
    }
  };

  // ---------- Ekspertfaktor ----------
  var K = 2; // basis tæller som to fuldvægtige eksperter
  var REL = {uafh:[1,'Uafhængig'], kunde:[1,'Kunde'], partner:[0.6,'Partner der sælger løsningen'], lev:[0,'Leverandør (tæller ikke)']};
  var EXP = {1:[0.5,'1 impl./demo'], 2:[0.75,'2–4 impl.'], 3:[1,'5+ impl.']};
  function weight(x){ return REL[x.rel][0] * EXP[x.exp][0]; }
  function xpScore(c,k){
    var b=c.s[k], xs=(c.xp||[]).filter(function(x){return x.s[k]!=null && weight(x)>0;});
    if(!xs.length) return b;
    var sw=0, sum=0; xs.forEach(function(x){var w=weight(x); sw+=w; sum+=w*x.s[k];});
    return Math.round(((b*K+sum)/(K+sw))*10)/10;
  }
  function agreement(c){
    var spreads=[];
    S.cats.forEach(function(k){
      var v=(c.xp||[]).map(function(x){return x.s[k[0]];}).filter(function(n){return n!=null;});
      if(v.length>1) spreads.push(Math.max.apply(null,v)-Math.min.apply(null,v));
    });
    if(!spreads.length) return (c.xp&&c.xp.length===1)?'én stemme':'';
    var m=Math.max.apply(null,spreads);
    return m<=1?'enighed høj':(m<=3?'enighed middel':'enighed lav');
  }

  // ---------- Render ----------
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  var fmt=function(n){return String(n).replace('.',',');};
  var S, mode='xp', currentK=null, query='';
  var deck=document.getElementById('deck'), play=document.getElementById('play'), result=document.getElementById('result');
  var qIn=document.getElementById('q'), hits=document.getElementById('hits');

  // ---------- ISV, landekoder og søgning ----------
  // cc = ISV'ens land (ISO 3166-1 alpha-2), mk = markeder appen dækker (landekoder, 'EU' eller 'GLOBAL').
  function flag(cc){
    if(!/^[A-Z]{2}$/.test(cc||'')) return '';
    return String.fromCodePoint.apply(null,cc.split('').map(function(c){return 0x1F1E6+c.charCodeAt(0)-65;}));
  }
  function ccLabel(cc){ return cc ? flag(cc)+' '+cc : 'land ukendt'; }
  function hay(c){ return [c.name,c.vendor,c.isv||'',(c.tags||[]).join(' '),c.desc].join(' ').toLowerCase(); }
  // Syntaks: fritekst matcher navn/ISV/tags/beskrivelse. En kode på to bogstaver (DK) matcher ISV-land eller marked.
  // isv:DK = kun ISV-land. mk:DK = kun marked (inkl. apps markeret GLOBAL). Alle ord skal matche.
  function matches(c,q){
    if(!q) return true;
    return q.trim().split(/\s+/).every(function(t){
      var m=/^(isv|mk|land|marked):(.+)$/i.exec(t), mk=(c.mk||[]).map(function(x){return x.toUpperCase();});
      if(m){
        var code=m[2].toUpperCase(), f=m[1].toLowerCase();
        if(f==='isv'||f==='land'){
          if(code.length===2) return (c.cc||'').toUpperCase()===code;
          return (c.isv||c.vendor).toLowerCase().indexOf(m[2].toLowerCase())>=0; // isv:continia
        }
        return mk.indexOf(code)>=0 || mk.indexOf('GLOBAL')>=0;
      }
      if(/^[a-z]{2}$/i.test(t)){
        var u=t.toUpperCase();
        return (c.cc||'').toUpperCase()===u || mk.indexOf(u)>=0;
      }
      return hay(c).indexOf(t.toLowerCase())>=0;
    });
  }
  function visible(list){ return list.filter(function(c){ return matches(c,query); }); }
  function renderHits(){
    if(!query){ hits.innerHTML=''; return; }
    var own=visible(S.cards).length, other=[];
    Object.keys(SERIES).forEach(function(k){
      if(SERIES[k]===S) return;
      SERIES[k].cards.forEach(function(c){ if(!c.ref && matches(c,query)) other.push([k,c]); });
    });
    hits.innerHTML='<b>'+own+'</b> kort i denne serie'+(other.length?'. Også i andre serier: '+other.map(function(x){
      return '<a href="#'+x[0]+'">'+esc(SERIES[x[0]].no)+' · '+esc(x[1].name)+' <span class="cc">'+esc(ccLabel(x[1].cc))+'</span></a>';
    }).join(' '):'.');
  }

  function val(c,k){ return mode==='xp'?xpScore(c,k):c.s[k]; }
  function total(c){ return Math.round(S.cats.reduce(function(a,k){return a+val(c,k[0]);},0)*10)/10; }
  function vk(c,k){ return k==='total'?total(c):val(c,k); }

  function render(order){
    var players=S.cards.filter(function(x){return !x.ref;});
    order=visible(order);
    renderHits();
    if(!order.length){ deck.innerHTML='<p class="empty">Ingen kort i denne serie matcher «'+esc(query)+'».</p>'; return; }
    deck.innerHTML = order.map(function(c){
      var num=c.ref?'REF':String(players.indexOf(c)+1).padStart(2,'0');
      var stats=S.cats.map(function(k){
        var b=c.s[k[0]], v=val(c,k[0]), d=Math.round((v-b)*10)/10;
        var delta=(mode==='xp'&&d!==0)?'<small class="'+(d>0?'p':'m')+'">'+(d>0?'▲':'▼')+fmt(Math.abs(d))+'</small>':'';
        var tick=(mode==='xp'&&d!==0)?'<u style="left:calc('+(b*10)+'% - 1px)" title="Basis '+b+'"></u>':'';
        return '<div class="st" data-k="'+k[0]+'"><span>'+esc(k[1])+'</span><div class="bar"><i style="width:'+(v*10)+'%"></i>'+tick+'</div><span class="n">'+fmt(v)+delta+'</span></div>';
      }).join('');
      var xs=c.xp||[], xpHtml;
      if(xs.length){
        xpHtml='<details class="xp"><summary><span>👤 '+xs.length+' ekspertvurdering'+(xs.length>1?'er':'')+'</span><span class="agree">'+esc(agreement(c))+' ▾</span></summary>'+
          xs.map(function(x){
            var sc=Object.keys(x.s).map(function(k){var cat=S.cats.filter(function(z){return z[0]===k;})[0];return esc(cat?cat[1]:k)+' '+x.s[k];}).join(' · ');
            return '<div class="q"><div class="who">'+esc(x.name)+' · '+esc(x.company)+' '+(x.ex?'<span class="ex">EKSEMPEL</span>':'')+'</div>'+
              '<div class="meta">'+esc(x.role)+' · '+esc(REL[x.rel][1])+' · '+esc(EXP[x.exp][1])+' · '+esc(x.date)+' · vægt '+fmt(weight(x))+'</div>'+
              '<blockquote>'+esc(x.quote)+'</blockquote><div class="sc">'+sc+'</div></div>';
          }).join('')+'</details>';
      } else {
        xpHtml='<div class="xp none"><summary>👤 Ingen ekspertvurderinger endnu</summary></div>';
      }
      return '<article class="tc'+(c.ref?' ref':'')+'" data-id="'+c.id+'">'+
        '<div class="top"><div class="series"><span>SERIE '+S.no+' · '+esc(S.short.toUpperCase())+'</span><span>'+num+'/'+String(players.length).padStart(2,'0')+'</span></div>'+
        '<h3>'+esc(c.name)+'</h3><div class="vendor">'+esc(c.vendor)+'</div>'+
        '<div class="isv" title="ISV og ISV-land (ISO-landekode)">ISV '+esc(c.isv||c.vendor)+' · <b>'+esc(ccLabel(c.cc))+'</b></div><span class="crown">★ Vinder</span></div>'+
        '<div class="body"><div class="tags">'+c.tags.map(function(t){return '<span class="pill" style="background:#e3f0e9;color:#11603f">'+esc(t)+'</span>';}).join('')+'</div>'+
        (c.mk&&c.mk.length?'<div class="mk" title="Markeder appen dækker"><span class="muted">Markeder</span> '+(c.mk.length>9?c.mk.filter(function(x){return ['DK','NO','SE','FI','DE','NL','GB','US'].indexOf(x)>=0;}).map(function(x){return '<code>'+esc(x)+'</code>';}).join('')+'<code title="'+esc(c.mk.join(' '))+'">+'+(c.mk.length-c.mk.filter(function(x){return ['DK','NO','SE','FI','DE','NL','GB','US'].indexOf(x)>=0;}).length)+' lande</code>'
            :c.mk.map(function(x){return '<code>'+esc(x)+'</code>';}).join(''))+'</div>':'')+
        '<p class="desc">'+esc(c.desc)+'</p><div class="stats">'+stats+'</div>'+
        '<div class="total"><span class="muted">Total'+(mode==='xp'?' med ekspertfaktor':'')+'</span><b>'+fmt(total(c))+'<span class="muted" style="font-size:12px;font-weight:500"> / 60</span></b></div>'+
        xpHtml+
        '<div class="sw"><div class="up"><b>Superkraft</b>'+esc(c.up)+'</div><div class="dn"><b>Svaghed</b>'+esc(c.dn)+'</div></div>'+
        '</div><div class="foot">Basis: offentligt materiale · foreløbig score</div></article>';
    }).join('');
  }

  function playCat(k){
    currentK=k||null;
    play.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',!!k && x.getAttribute('data-k')===k);});
    if(!k){render(S.cards);result.textContent='';return;}
    var order=S.cards.slice().sort(function(a,b){return ((a.ref?1:0)-(b.ref?1:0))||(vk(b,k)-vk(a,k));});
    render(order);
    var players=visible(order).filter(function(c){return !c.ref;});
    if(!players.length){ result.textContent='Ingen kort at spille med det aktuelle søgefilter.'; return; }
    var best=vk(players[0],k);
    var winners=players.filter(function(c){return vk(c,k)===best;});
    winners.forEach(function(w){deck.querySelector('[data-id="'+w.id+'"]').classList.add('win');});
    if(k!=='total') deck.querySelectorAll('.st[data-k="'+k+'"]').forEach(function(r){r.classList.add('hl');});
    var label=k==='total'?'Total':S.cats.filter(function(c){return c[0]===k;})[0][1];
    var ref=S.cards.filter(function(c){return c.ref;})[0];
    result.innerHTML='<b>'+esc(label)+':</b> '+winners.map(function(w){return esc(w.name);}).join(' og ')+' vinder med '+fmt(best)+
      (winners.length>1?' (uafgjort)':'')+'. '+esc(ref.name)+' (reference) står til '+fmt(vk(ref,k))+'.';
  }

  function loadSeries(id){
    S=SERIES[id]||SERIES.shopfloor; currentK=null;
    document.title='BC Partnerkort · '+S.title;
    document.getElementById('s-title').textContent=S.title;
    document.getElementById('s-lead').textContent=S.lead+' Alle kort scores i de samme seks kategorier, ligesom bilkort.';
    document.getElementById('s-short').textContent=S.short;
    var groups=[];
    Object.keys(SERIES).forEach(function(k){var g=SERIES[k].group||'Øvrige'; if(groups.indexOf(g)<0) groups.push(g);});
    document.getElementById('tabs').innerHTML=
      '<details class="smenu" id="smenu"><summary><span class="muted-l">Serie '+S.no+'</span> '+esc(S.short)+' <span aria-hidden="true">▾</span></summary>'+
      '<div class="smenu-panel">'+groups.map(function(g){
        return '<div class="sgrp"><div class="sgrp-h">'+esc(g)+'</div>'+Object.keys(SERIES).filter(function(k){return (SERIES[k].group||'Øvrige')===g;}).map(function(k){
          return '<a href="#'+k+'"'+(SERIES[k]===S?' class="on"':'')+'><span>'+SERIES[k].no+'</span>'+esc(SERIES[k].short)+'</a>';}).join('')+'</div>';
      }).join('')+'</div></details>'+
      '<a class="navlink" href="#metode">Sådan scores der</a>';
    document.getElementById('smenu').addEventListener('click',function(e){ if(e.target.closest('a')) this.removeAttribute('open'); });
    document.getElementById('cats').innerHTML=S.cats.map(function(k){
      return '<div class="kv"><b>'+esc(k[1])+'</b><span class="muted">'+esc(k[2])+'</span></div>';}).join('');
    play.innerHTML=S.cats.map(function(k){return '<button type="button" data-k="'+k[0]+'">'+esc(k[1])+'</button>';}).join('')+
      '<button type="button" data-k="total">Total</button><button type="button" class="reset" data-k="">Nulstil</button>';
    result.textContent='';
    render(S.cards);
  }

  play.addEventListener('click',function(e){var b=e.target.closest('button'); if(b) playCat(b.getAttribute('data-k'));});
  qIn.addEventListener('input',function(){ query=qIn.value.trim(); playCat(currentK); });
  document.getElementById('qchips').addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    qIn.value=b.getAttribute('data-q'); query=qIn.value; playCat(currentK); qIn.focus();
  });
  document.getElementById('mode').addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return; mode=b.getAttribute('data-m');
    this.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);});
    playCat(currentK);
  });
  function route(){ var h=location.hash.slice(1); if(SERIES[h]||!S) loadSeries(SERIES[h]?h:'shopfloor'); }
  window.addEventListener('hashchange',route);
  route();
})();
