(function(){
  // ---------- Data ----------
  // Ekspertvurdering: rel = 'uafh' | 'kunde' | 'partner' | 'lev'; exp = 1 (demo/1 impl) | 2 (2-4) | 3 (5+)
  var SERIES = {
    shopfloor: {
      no:'01', short:'Shopfloor', title:'Serie 01: Shopfloor & tidsregistrering',
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
        {id:'te', name:'Time Entry', vendor:'Cost Control Software', isv:'Cost Control Software', cc:'', tags:['AppSource','Rollecenter'],
         desc:'Simpel stempling på produktions- og sagsopgaver via et mobilvenligt rollecenter med indbygget stregkodescanner.',
         s:{tid:5,prod:4,mes:2,ui:6,std:9,aab:4},
         up:'Lille og hurtig at sætte op; ind- og udstempling på hver sin terminal.', dn:'Kun tid; ingen lønregler, spild eller kvalitet.'}
      ]
    },
    'dokument-output': {
      no:'02', short:'Dokument-output', title:'Serie 02: Dokument-output & e-mail',
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
      no:'03', short:'Dokument-capture', title:'Serie 03: Dokument-capture & kreditorautomatisering',
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
      no:'04', short:'Labelprint', title:'Serie 04: Labelprint & etiketter',
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
        {id:'azl', name:'AL Zebra ZPL Label Manager', vendor:'Applibra', isv:'Applibra', cc:'', tags:['AppSource','Native ZPL'],
         desc:'Direkte Zebra-print med native ZPL fra dynamiske skabeloner, GS1, billeder og multi-up, uden Windows-drivere.',
         s:{des:5,vej:8,flow:6,gs1:8,std:6,dk:3},
         up:'Skarpe Zebra-labels uden drivere eller ekstern labelsoftware.', dn:'Kræver AL Bridge som lokal service; ZPL er teknisk at vedligeholde.'}
      ]
    },
    'bank': {
      no:'05', short:'Bank & betalinger', title:'Serie 05: Bank & betalinger',
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
      (winners.length>1?' (uafgjort)':'')+'. Standard BC står til '+fmt(vk(ref,k))+'.';
  }

  function loadSeries(id){
    S=SERIES[id]||SERIES.shopfloor; currentK=null;
    document.title='BC Partnerkort · '+S.title;
    document.getElementById('s-title').textContent=S.title;
    document.getElementById('s-lead').textContent=S.lead+' Alle kort scores i de samme seks kategorier, ligesom bilkort.';
    document.getElementById('s-short').textContent=S.short;
    document.getElementById('tabs').innerHTML=Object.keys(SERIES).map(function(k){
      return '<a href="#'+k+'"'+(SERIES[k]===S?' class="on"':'')+'>Serie '+SERIES[k].no+' · '+esc(SERIES[k].short)+'</a>';}).join('');
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
