let data=[];
const $=s=>document.querySelector(s);
let lang=localStorage.getItem("oaklab-language")||"ru";
const selectedIds=new Set();

const I={
ru:{subtitle:"Открытая база экспериментов с дубом",language:"Язык",compare:"Сравнить",selectForCompare:"Выбрать",selected:"Выбрано",newExp:"+ Новый эксперимент",hero:"Делись. Воспроизводи. Сравнивай.",intro:"Структурированная открытая база экспериментов с дубовой выдержкой и настаиванием.",search:"Поиск экспериментов…",allToast:"Все степени обжарки",export:"Экспорт JSON",experiments:"Эксперименты",shown:"показано",contributors:"участников",replications:"репликаций",view:"Открыть эксперимент",detail:"Эксперимент",oak:"Дуб",liquid:"Жидкость и экстракция",observations:"Наблюдения",tastings:"Дегустационные сессии",evidence:"Репликация и источники",color:"Цвет",srm:"Цвет (SRM)",tasteProfile:"Профиль вкуса",hex:"HEX",rgb:"RGB",colorDb:"Цвет из базы данных",compareWith:"Сравнение цвета образцов",compareTitle:"Сравнение дегустаций",sample:"Образец",order:"Порядок",total:"Итог",overall:"Общее",title:"Название",author:"Автор",oakType:"Тип дуба",toast:"Обжарка",oakForm:"Форма дуба",chips:"Щепа",cubes:"Кубики",stave:"Планка",other:"Другое",volume:"Объём мл",dose:"Доза дуба г/л",duration:"Длительность, дней",temperature:"Температура °C",soaking:"Замачивание",boiling:"Кипячение",sourceId:"ID исходного эксперимента",notes:"Заметки",newTitle:"Новый эксперимент",cancel:"Отмена",create:"Создать локальный черновик",base:"Основа",abv:"ABV",container:"Ёмкость",agitation:"Перемешивание",type:"Тип",form:"Форма",species:"Порода",origin:"Происхождение",particle:"Размер частиц",rinsing:"Промывка",drying:"Сушка",prep:"Заметки подготовки",extraction:"Заметки экстракции",appearance:"Внешний вид",aroma:"Аромат",taste:"Вкус",mouthfeel:"Тактильное ощущение",overallNotes:"Общие заметки",sourceExp:"Исходный эксперимент",sourceNotes:"Заметки источника",firstTasting:"Дегустация",aging:"Выдержка",days:"дней",noData:"Нет подходящих экспериментов.",loadError:"Не удалось загрузить публичный набор данных."},
en:{subtitle:"Open oak experiment database",language:"Language",compare:"Compare",selectForCompare:"Select",selected:"Selected",newExp:"+ New experiment",hero:"Share. Reproduce. Compare.",intro:"A structured open database for oak infusion and aging experiments.",search:"Search experiments…",allToast:"All toast levels",export:"Export JSON",experiments:"Experiments",shown:"shown",contributors:"contributors",replications:"replications",view:"View experiment",detail:"Experiment",oak:"Oak",liquid:"Liquid & extraction",observations:"Observations",tastings:"Tasting sessions",evidence:"Replication & evidence",color:"Color",srm:"Color (SRM)",tasteProfile:"Taste profile",hex:"HEX",rgb:"RGB",colorDb:"Color from database",compareWith:"Sample color comparison",compareTitle:"Tasting comparison",sample:"Sample",order:"Order",total:"Total",overall:"Overall",title:"Title",author:"Author",oakType:"Oak type",toast:"Toast",oakForm:"Oak form",chips:"Chips",cubes:"Cubes",stave:"Stave",other:"Other",volume:"Volume ml",dose:"Oak dose g/L",duration:"Duration days",temperature:"Temperature °C",soaking:"Soaking",boiling:"Boiling",sourceId:"Source experiment ID",notes:"Notes",newTitle:"New experiment",cancel:"Cancel",create:"Create local draft",base:"Base",abv:"ABV",container:"Container",agitation:"Agitation",type:"Type",form:"Form",species:"Species",origin:"Origin",particle:"Particle size",rinsing:"Rinsing",drying:"Drying",prep:"Preparation notes",extraction:"Extraction notes",appearance:"Appearance",aroma:"Aroma",taste:"Taste",mouthfeel:"Mouthfeel",overallNotes:"Overall notes",sourceExp:"Source experiment",sourceNotes:"Source notes",firstTasting:"Tasting",aging:"Aging",days:"days",noData:"No matching experiments.",loadError:"The public dataset could not be loaded."},
de:{subtitle:"Offene Datenbank für Eichenexperimente",language:"Sprache",compare:"Vergleichen",selectForCompare:"Auswählen",selected:"Ausgewählt",newExp:"+ Neues Experiment",hero:"Teilen. Reproduzieren. Vergleichen.",intro:"Strukturierte offene Datenbank für Eicheninfusion und Reifung.",search:"Experimente suchen…",allToast:"Alle Röstgrade",export:"JSON exportieren",experiments:"Experimente",shown:"angezeigt",contributors:"Mitwirkende",replications:"Replikationen",view:"Experiment öffnen",detail:"Experiment",oak:"Eiche",liquid:"Flüssigkeit & Extraktion",observations:"Beobachtungen",tastings:"Verkostungen",evidence:"Replikation & Quellen",color:"Farbe",srm:"Farbe (SRM)",tasteProfile:"Geschmacksprofil",hex:"HEX",rgb:"RGB",colorDb:"Farbe aus der Datenbank",compareWith:"Farbvergleich der Muster",compareTitle:"Verkostungsvergleich",sample:"Muster",order:"Reihenfolge",total:"Gesamt",overall:"Gesamteindruck",title:"Titel",author:"Autor",oakType:"Eichenart",toast:"Röstung",oakForm:"Eichenform",chips:"Chips",cubes:"Würfel",stave:"Stave",other:"Andere",volume:"Volumen ml",dose:"Eichendosis g/L",duration:"Dauer Tage",temperature:"Temperatur °C",soaking:"Einweichen",boiling:"Kochen",sourceId:"Quell-Experiment-ID",notes:"Notizen",newTitle:"Neues Experiment",cancel:"Abbrechen",create:"Lokalen Entwurf erstellen",base:"Basis",abv:"ABV",container:"Behälter",agitation:"Bewegung",type:"Typ",form:"Form",species:"Art",origin:"Herkunft",particle:"Partikelgröße",rinsing:"Spülen",drying:"Trocknen",prep:"Vorbereitungsnotizen",extraction:"Extraktionsnotizen",appearance:"Aussehen",aroma:"Aroma",taste:"Geschmack",mouthfeel:"Mundgefühl",overallNotes:"Gesamtnotizen",sourceExp:"Quell-Experiment",sourceNotes:"Quellnotizen",firstTasting:"Verkostung",aging:"Reifung",days:"Tage",noData:"Keine passenden Experimente.",loadError:"Der öffentliche Datensatz konnte nicht geladen werden."},
fr:{subtitle:"Base ouverte d'expériences sur le chêne",language:"Langue",compare:"Comparer",selectForCompare:"Sélectionner",selected:"Sélectionnés",newExp:"+ Nouvelle expérience",hero:"Partager. Reproduire. Comparer.",intro:"Base ouverte structurée pour les expériences au chêne.",search:"Rechercher des expériences…",allToast:"Tous les niveaux de chauffe",export:"Exporter JSON",experiments:"Expériences",shown:"affichées",contributors:"contributeurs",replications:"réplications",view:"Ouvrir l'expérience",detail:"Expérience",oak:"Chêne",liquid:"Liquide et extraction",observations:"Observations",tastings:"Dégustations",evidence:"Réplication et sources",color:"Couleur",srm:"Couleur (SRM)",tasteProfile:"Profil gustatif",hex:"HEX",rgb:"RVB",colorDb:"Couleur de la base",compareWith:"Comparaison des couleurs",compareTitle:"Comparaison des dégustations",sample:"Échantillon",order:"Ordre",total:"Total",overall:"Global",title:"Titre",author:"Auteur",oakType:"Type de chêne",toast:"Chauffe",oakForm:"Forme",chips:"Copeaux",cubes:"Cubes",stave:"Douelle",other:"Autre",volume:"Volume ml",dose:"Dose de chêne g/L",duration:"Durée jours",temperature:"Température °C",soaking:"Trempage",boiling:"Ébullition",sourceId:"ID source",notes:"Notes",newTitle:"Nouvelle expérience",cancel:"Annuler",create:"Créer un brouillon local",base:"Base",abv:"ABV",container:"Récipient",agitation:"Agitation",type:"Type",form:"Forme",species:"Espèce",origin:"Origine",particle:"Taille des particules",rinsing:"Rinçage",drying:"Séchage",prep:"Notes de préparation",extraction:"Notes d'extraction",appearance:"Aspect",aroma:"Arôme",taste:"Goût",mouthfeel:"Sensation en bouche",overallNotes:"Notes générales",sourceExp:"Expérience source",sourceNotes:"Notes source",firstTasting:"Dégustation",aging:"Vieillissement",days:"jours",noData:"Aucune expérience correspondante.",loadError:"Impossible de charger les données."},
es:{subtitle:"Base abierta de experimentos con roble",language:"Idioma",compare:"Comparar",selectForCompare:"Seleccionar",selected:"Seleccionados",newExp:"+ Nuevo experimento",hero:"Comparte. Reproduce. Compara.",intro:"Base abierta estructurada para experimentos con roble.",search:"Buscar experimentos…",allToast:"Todos los niveles de tostado",export:"Exportar JSON",experiments:"Experimentos",shown:"mostrados",contributors:"colaboradores",replications:"replicaciones",view:"Abrir experimento",detail:"Experimento",oak:"Roble",liquid:"Líquido y extracción",observations:"Observaciones",tastings:"Catas",evidence:"Replicación y fuentes",color:"Color",srm:"Color (SRM)",tasteProfile:"Perfil de sabor",hex:"HEX",rgb:"RGB",colorDb:"Color de la base",compareWith:"Comparación de colores",compareTitle:"Comparación de catas",sample:"Muestra",order:"Orden",total:"Total",overall:"General",title:"Título",author:"Autor",oakType:"Tipo de roble",toast:"Tostado",oakForm:"Forma",chips:"Virutas",cubes:"Cubos",stave:"Listón",other:"Otro",volume:"Volumen ml",dose:"Dosis de roble g/L",duration:"Duración días",temperature:"Temperatura °C",soaking:"Remojo",boiling:"Hervido",sourceId:"ID de origen",notes:"Notas",newTitle:"Nuevo experimento",cancel:"Cancelar",create:"Crear borrador local",base:"Base",abv:"ABV",container:"Recipiente",agitation:"Agitación",type:"Tipo",form:"Forma",species:"Especie",origin:"Origen",particle:"Tamaño de partícula",rinsing:"Enjuague",drying:"Secado",prep:"Notas de preparación",extraction:"Notas de extracción",appearance:"Aspecto",aroma:"Aroma",taste:"Sabor",mouthfeel:"Sensación en boca",overallNotes:"Notas generales",sourceExp:"Experimento de origen",sourceNotes:"Notas de origen",firstTasting:"Cata",aging:"Envejecimiento",days:"días",noData:"No hay experimentos coincidentes.",loadError:"No se pudieron cargar los datos."},
it:{subtitle:"Database aperto degli esperimenti con rovere",language:"Lingua",compare:"Confronta",selectForCompare:"Seleziona",selected:"Selezionati",newExp:"+ Nuovo esperimento",hero:"Condividi. Riproduci. Confronta.",intro:"Database aperto strutturato per esperimenti con rovere.",search:"Cerca esperimenti…",allToast:"Tutti i livelli di tostatura",export:"Esporta JSON",experiments:"Esperimenti",shown:"visualizzati",contributors:"collaboratori",replications:"repliche",view:"Apri esperimento",detail:"Esperimento",oak:"Rovere",liquid:"Liquido ed estrazione",observations:"Osservazioni",tastings:"Degustazioni",evidence:"Replica e fonti",color:"Colore",srm:"Colore (SRM)",tasteProfile:"Profilo gustativo",hex:"HEX",rgb:"RGB",colorDb:"Colore dal database",compareWith:"Confronto dei colori",compareTitle:"Confronto degustazioni",sample:"Campione",order:"Ordine",total:"Totale",overall:"Complessivo",title:"Titolo",author:"Autore",oakType:"Tipo di rovere",toast:"Tostatura",oakForm:"Forma",chips:"Scaglie",cubes:"Cubetti",stave:"Listello",other:"Altro",volume:"Volume ml",dose:"Dose rovere g/L",duration:"Durata giorni",temperature:"Temperatura °C",soaking:"Ammollo",boiling:"Bollitura",sourceId:"ID origine",notes:"Note",newTitle:"Nuovo esperimento",cancel:"Annulla",create:"Crea bozza locale",base:"Base",abv:"ABV",container:"Contenitore",agitation:"Agitazione",type:"Tipo",form:"Forma",species:"Specie",origin:"Origine",particle:"Dimensione particelle",rinsing:"Risciacquo",drying:"Asciugatura",prep:"Note di preparazione",extraction:"Note di estrazione",appearance:"Aspetto",aroma:"Aroma",taste:"Gusto",mouthfeel:"Sensazione al palato",overallNotes:"Note generali",sourceExp:"Esperimento origine",sourceNotes:"Note fonte",firstTasting:"Degustazione",aging:"Affinamento",days:"giorni",noData:"Nessun esperimento corrispondente.",loadError:"Impossibile caricare i dati."},
pt:{subtitle:"Base aberta de experiências com carvalho",language:"Idioma",compare:"Comparar",newExp:"+ Nova experiência",hero:"Partilhe. Reproduza. Compare.",intro:"Base aberta estruturada para experiências com carvalho.",search:"Pesquisar experiências…",allToast:"Todos os níveis de tosta",export:"Exportar JSON",experiments:"Experiências",shown:"mostradas",contributors:"colaboradores",replications:"replicações",view:"Abrir experiência",detail:"Experiência",oak:"Carvalho",liquid:"Líquido e extração",observations:"Observações",tastings:"Degustações",evidence:"Replicação e fontes",color:"Cor",srm:"Cor (SRM)",tasteProfile:"Perfil de sabor",hex:"HEX",rgb:"RGB",colorDb:"Cor da base de dados",compareWith:"Comparação das cores",compareTitle:"Comparação de degustações",sample:"Amostra",order:"Ordem",total:"Total",overall:"Geral",title:"Título",author:"Autor",oakType:"Tipo de carvalho",toast:"Tosta",oakForm:"Forma",chips:"Aparas",cubes:"Cubos",stave:"Tábua",other:"Outro",volume:"Volume ml",dose:"Dose de carvalho g/L",duration:"Duração dias",temperature:"Temperatura °C",soaking:"Demolha",boiling:"Fervura",sourceId:"ID de origem",notes:"Notas",newTitle:"Nova experiência",cancel:"Cancelar",create:"Criar rascunho local",base:"Base",abv:"ABV",container:"Recipiente",agitation:"Agitação",type:"Tipo",form:"Forma",species:"Espécie",origin:"Origem",particle:"Tamanho das partículas",rinsing:"Enxaguamento",drying:"Secagem",prep:"Notas de preparação",extraction:"Notas de extração",appearance:"Aspeto",aroma:"Aroma",taste:"Sabor",mouthfeel:"Sensação na boca",overallNotes:"Notas gerais",sourceExp:"Experiência de origem",sourceNotes:"Notas de origem",firstTasting:"Degustação",aging:"Envelhecimento",days:"dias",noData:"Nenhuma experiência correspondente.",loadError:"Não foi possível carregar os dados."}
};
const t=k=>(I[lang]||I.ru)[k]||I.ru[k]||k;
const V={
  ru:{draft:"черновик",founding:"Исходный набор данных",chips:"Щепа",cubes:"Кубики",stave:"Планка",other:"Другое",light:"Лёгкая",medium:"Средняя",mediumPlus:"Средняя+",heavy:"Сильная",char:"Обугливание",sugarDistillate:"сахарный дистиллят",glassJar:"стеклянная банка",periodicShaking:"периодическое встряхивание"},
  en:{draft:"draft",founding:"Founding dataset",chips:"chips",cubes:"cubes",stave:"stave",other:"other",light:"Light",medium:"Medium",mediumPlus:"Medium+",heavy:"Heavy",char:"Char",sugarDistillate:"sugar distillate",glassJar:"glass jar",periodicShaking:"periodic shaking"},
  de:{draft:"Entwurf",founding:"Ausgangsdatensatz",chips:"Chips",cubes:"Würfel",stave:"Stave",other:"Andere",light:"Leicht",medium:"Mittel",mediumPlus:"Mittel+",heavy:"Stark",char:"Verkohlt",sugarDistillate:"Zuckerdestillat",glassJar:"Glasgefäß",periodicShaking:"regelmäßiges Schütteln"},
  fr:{draft:"brouillon",founding:"jeu de données initial",chips:"copeaux",cubes:"cubes",stave:"douelle",other:"autre",light:"Légère",medium:"Moyenne",mediumPlus:"Moyenne+",heavy:"Forte",char:"Charbonnée",sugarDistillate:"distillat de sucre",glassJar:"bocal en verre",periodicShaking:"agitation périodique"},
  es:{draft:"borrador",founding:"conjunto de datos inicial",chips:"virutas",cubes:"cubos",stave:"listón",other:"otro",light:"Ligero",medium:"Medio",mediumPlus:"Medio+",heavy:"Fuerte",char:"Carbonizado",sugarDistillate:"destilado de azúcar",glassJar:"frasco de vidrio",periodicShaking:"agitación periódica"},
  it:{draft:"bozza",founding:"dataset iniziale",chips:"scaglie",cubes:"cubetti",stave:"listello",other:"altro",light:"Leggera",medium:"Media",mediumPlus:"Media+",heavy:"Forte",char:"Carbonizzato",sugarDistillate:"distillato di zucchero",glassJar:"barattolo di vetro",periodicShaking:"agitazione periodica"},
  pt:{draft:"rascunho",founding:"conjunto de dados inicial",chips:"aparas",cubes:"cubos",stave:"tábua",other:"outro",light:"Leve",medium:"Média",mediumPlus:"Média+",heavy:"Forte",char:"Carbonizado",sugarDistillate:"destilado de açúcar",glassJar:"frasco de vidro",periodicShaking:"agitação periódica"}
};
const v=(k)=>V[lang]?.[k]??V.en[k]??k;
const statusText=x=>x==="draft"?v("draft"):x;
const formText=x=>({chips:v("chips"),cubes:v("cubes"),stave:v("stave"),other:v("other")}[x]||x);
const toastText=x=>({Light:v("light"),Medium:v("medium"),"Medium+":v("mediumPlus"),Heavy:v("heavy"),Char:v("char")}[x]||x);
const baseText=x=>x==="sugar distillate"?v("sugarDistillate"):x;
const containerText=x=>x==="glass jar"?v("glassJar"):x;
const agitationText=x=>x==="periodic shaking"?v("periodicShaking"):x;
const authorText=x=>x==="Founding dataset"?v("founding"):x;
const durationText=(x)=>x==null||x===""?x:lang==="ru"?String(x).replace(/\bh\b/g,"ч").replace(/\bmin\b/g,"мин"):x;
const DATA_TEXT={
ru:{
"Initial founding entry. Complete from original lab notes before public release.":"Исходная запись набора данных. Заполнена по исходным лабораторным заметкам перед публичной публикацией.",
"Initial founding entry.":"Исходная запись набора данных.",
"Preparation recorded from the current project notes; other parameters remain unfilled until verified.":"Подготовка записана по текущим заметкам проекта; остальные параметры не заполнены до проверки.",
"First comparative series; 2.5 g oak per 300 ml. Additional components not used.":"Первая сравнительная серия; 2,5 г дуба на 300 мл. Дополнительные компоненты не использовались.",
"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.":"Первая дегустация — новая система оценки. Перенесено из журнала дегустации от 04.09.2026.",
"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.":"Визуальные материалы первой дегустации: три загруженные фотографии от 04.09.2026 с образцами 1–8. Описание внешнего вида носит только описательный характер и не является сенсорной оценкой.",
"OakLab visual color record":"Визуальная запись цвета OakLab",
"220 °C; no additional charring":"220 °C; дополнительное обугливание не проводилось."
},
en:{
"Initial founding entry. Complete from original lab notes before public release.":"Initial founding entry. Complete from original lab notes before public release.",
"Initial founding entry.":"Initial founding entry.",
"Preparation recorded from the current project notes; other parameters remain unfilled until verified.":"Preparation recorded from the current project notes; other parameters remain unfilled until verified.",
"First comparative series; 2.5 g oak per 300 ml. Additional components not used.":"First comparative series; 2.5 g oak per 300 ml. Additional components not used.",
"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.":"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.",
"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.":"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.",
"OakLab visual color record":"OakLab visual color record",
"220 °C; no additional charring":"220 °C; no additional charring"
},
de:{
"Initial founding entry. Complete from original lab notes before public release.":"Ursprünglicher Datensatz-Eintrag. Vor der Veröffentlichung anhand der ursprünglichen Labornotizen vervollständigt.",
"Initial founding entry.":"Ursprünglicher Datensatz-Eintrag.",
"Preparation recorded from the current project notes; other parameters remain unfilled until verified.":"Die Vorbereitung wurde aus den aktuellen Projektnotizen übernommen; weitere Parameter bleiben bis zur Überprüfung offen.",
"First comparative series; 2.5 g oak per 300 ml. Additional components not used.":"Erste Vergleichsserie; 2,5 g Eiche auf 300 ml. Zusätzliche Komponenten wurden nicht verwendet.",
"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.":"Erste Verkostung — neues Bewertungssystem. Aus dem Verkostungsjournal vom 04.09.2026 übertragen.",
"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.":"Visuelle Belege der ersten Verkostung: drei am 04.09.2026 hochgeladene Fotos mit den Proben 1–8. Die Angaben zum Aussehen sind ausschließlich beschreibend und keine sensorischen Bewertungen.",
"OakLab visual color record":"Visuelle Farbdokumentation von OakLab",
"220 °C; no additional charring":"220 °C; keine zusätzliche Verkohlung"
},
fr:{
"Initial founding entry. Complete from original lab notes before public release.":"Entrée initiale du jeu de données. Complétée à partir des notes de laboratoire originales avant publication.",
"Initial founding entry.":"Entrée initiale du jeu de données.",
"Preparation recorded from the current project notes; other parameters remain unfilled until verified.":"Préparation relevée dans les notes actuelles du projet ; les autres paramètres restent à compléter jusqu'à vérification.",
"First comparative series; 2.5 g oak per 300 ml. Additional components not used.":"Première série comparative ; 2,5 g de chêne pour 300 ml. Aucun composant supplémentaire utilisé.",
"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.":"Première dégustation — nouveau système d'évaluation. Transcrit du journal de dégustation daté du 04.09.2026.",
"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.":"Preuves visuelles de la première dégustation : trois photos mises en ligne le 04.09.2026 montrant les échantillons 1 à 8. Les notes d'aspect sont uniquement descriptives et ne constituent pas des évaluations sensorielles.",
"OakLab visual color record":"Relevé visuel de couleur OakLab",
"220 °C; no additional charring":"220 °C ; sans carbonisation supplémentaire"
},
es:{
"Initial founding entry. Complete from original lab notes before public release.":"Entrada inicial del conjunto de datos. Completada a partir de las notas originales de laboratorio antes de su publicación.",
"Initial founding entry.":"Entrada inicial del conjunto de datos.",
"Preparation recorded from the current project notes; other parameters remain unfilled until verified.":"Preparación registrada a partir de las notas actuales del proyecto; los demás parámetros quedan sin completar hasta su verificación.",
"First comparative series; 2.5 g oak per 300 ml. Additional components not used.":"Primera serie comparativa; 2,5 g de roble por 300 ml. No se utilizaron componentes adicionales.",
"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.":"Primera cata — nuevo sistema de puntuación. Transcrito del diario de cata del 04.09.2026.",
"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.":"Evidencia visual de la primera cata: tres fotos subidas el 04.09.2026 que muestran las muestras 1–8. Las notas sobre el aspecto son únicamente descriptivas y no son puntuaciones sensoriales.",
"OakLab visual color record":"Registro visual del color de OakLab",
"220 °C; no additional charring":"220 °C; sin carbonización adicional"
},
it:{
"Initial founding entry. Complete from original lab notes before public release.":"Voce iniziale del dataset. Completata sulla base delle note di laboratorio originali prima della pubblicazione.",
"Initial founding entry.":"Voce iniziale del dataset.",
"Preparation recorded from the current project notes; other parameters remain unfilled until verified.":"Preparazione registrata dalle note attuali del progetto; gli altri parametri restano da compilare fino alla verifica.",
"First comparative series; 2.5 g oak per 300 ml. Additional components not used.":"Prima serie comparativa; 2,5 g di rovere per 300 ml. Nessun componente aggiuntivo utilizzato.",
"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.":"Prima degustazione — nuovo sistema di valutazione. Trascritto dal diario di degustazione del 04.09.2026.",
"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.":"Prove visive della prima degustazione: tre foto caricate il 04.09.2026 che mostrano i campioni 1–8. Le note sull'aspetto sono esclusivamente descrittive e non costituiscono valutazioni sensoriali.",
"OakLab visual color record":"Registrazione visiva del colore OakLab",
"220 °C; no additional charring":"220 °C; senza carbonizzazione aggiuntiva"
},
pt:{
"Initial founding entry. Complete from original lab notes before public release.":"Entrada inicial do conjunto de dados. Concluída a partir das notas originais do laboratório antes da publicação.",
"Initial founding entry.":"Entrada inicial do conjunto de dados.",
"Preparation recorded from the current project notes; other parameters remain unfilled until verified.":"Preparação registada a partir das notas atuais do projeto; os restantes parâmetros ficam por preencher até serem verificados.",
"First comparative series; 2.5 g oak per 300 ml. Additional components not used.":"Primeira série comparativa; 2,5 g de carvalho por 300 ml. Não foram utilizados componentes adicionais.",
"First tasting — new scoring system. Transcribed from the tasting journal dated 04.09.2026.":"Primeira degustação — novo sistema de avaliação. Transcrito do diário de degustação de 04.09.2026.",
"First tasting visual evidence: three uploaded photos dated 04.09.2026 showing samples 1–8. Visual appearance notes are descriptive only and are not sensory scores.":"Evidência visual da primeira degustação: três fotografias carregadas em 04.09.2026 mostrando as amostras 1–8. As notas sobre o aspeto são apenas descritivas e não constituem avaliações sensoriais.",
"OakLab visual color record":"Registo visual da cor OakLab",
"220 °C; no additional charring":"220 °C; sem carbonização adicional"
}};
const localizeDataText=x=>typeof x==="string"?(DATA_TEXT[lang]?.[x]??DATA_TEXT.en[x]??x):x;
// Tasting-note localization
for (const [k,vals] of Object.entries({
  "Second independent tasting — Александр; 25.09.2026; 2 months aging. Separate tasting result. Scores transcribed from the tasting sheet. Overall impression is separate and excluded from total 0–50.": {
    ru:"Вторая независимая дегустация — Александр; 25.09.2026; выдержка 2 месяца. Отдельный результат дегустации. Оценки перенесены из дегустационного листа. Общее впечатление является отдельной оценкой и не входит в итог 0–50.",
    en:"Second independent tasting — Alexander; 25.09.2026; 2 months aging. Separate tasting result. Scores transcribed from the tasting sheet. Overall impression is separate and excluded from total 0–50.",
    de:"Zweite unabhängige Verkostung — Alexander; 25.09.2026; 2 Monate Reifung. Separates Verkostungsergebnis. Die Bewertungen wurden aus dem Verkostungsbogen übertragen. Der Gesamteindruck ist eine separate Bewertung und nicht in der Summe 0–50 enthalten.",
    fr:"Deuxième dégustation indépendante — Alexander ; 25.09.2026 ; vieillissement de 2 mois. Résultat de dégustation séparé. Les notes ont été transcrites depuis la fiche de dégustation. L'impression générale est une évaluation distincte et n'est pas incluse dans le total 0–50.",
    es:"Segunda cata independiente — Alexander; 25.09.2026; 2 meses de envejecimiento. Resultado de cata separado. Las puntuaciones se transcribieron de la hoja de cata. La impresión general es una evaluación independiente y no está incluida en el total 0–50.",
    it:"Seconda degustazione indipendente — Alexander; 25.09.2026; 2 mesi di affinamento. Risultato di degustazione separato. I punteggi sono stati trascritti dalla scheda di degustazione. L'impressione complessiva è una valutazione separata e non è inclusa nel totale 0–50.",
    pt:"Segunda degustação independente — Alexander; 25.09.2026; 2 meses de envelhecimento. Resultado de degustação separado. As pontuações foram transcritas da ficha de degustação. A impressão geral é uma avaliação separada e não está incluída no total 0–50."
  },
  "Second independent tasting — Александр; 25.09.2026; 2 months aging. One joint result. Scores transcribed from the tasting sheet. Overall impression is separate and excluded from total 0–50.": {
    ru:"Вторая независимая дегустация — Александр; 25.09.2026; выдержка 2 месяца. Один общий результат. Оценки перенесены из дегустационного листа. Общее впечатление является отдельной оценкой и не входит в итог 0–50.",
    en:"Second independent tasting — Alexander; 25.09.2026; 2 months aging. One joint result. Scores transcribed from the tasting sheet. Overall impression is separate and excluded from total 0–50.",
    de:"Zweite unabhängige Verkostung — Alexander; 25.09.2026; 2 Monate Reifung. Ein gemeinsames Ergebnis. Die Bewertungen wurden aus dem Verkostungsbogen übertragen. Der Gesamteindruck ist eine separate Bewertung und nicht in der Summe 0–50 enthalten.",
    fr:"Deuxième dégustation indépendante — Alexander ; 25.09.2026 ; vieillissement de 2 mois. Un seul résultat commun. Les notes ont été transcrites depuis la fiche de dégustation. L'impression générale est une évaluation distincte et n'est pas incluse dans le total 0–50.",
    es:"Segunda cata independiente — Alexander; 25.09.2026; 2 meses de envejecimiento. Un único resultado conjunto. Las puntuaciones se transcribieron de la hoja de cata. La impresión general es una evaluación independiente y no está incluida en el total 0–50.",
    it:"Seconda degustazione indipendente — Alexander; 25.09.2026; 2 mesi di affinamento. Un unico risultato congiunto. I punteggi sono stati trascritti dalla scheda di degustazione. L'impressione complessiva è una valutazione separata e non è inclusa nel totale 0–50.",
    pt:"Segunda degustação independente — Alexander; 25.09.2026; 2 meses de envelhecimento. Um único resultado conjunto. As pontuações foram transcritas da ficha de degustação. A impressão geral é uma avaliação separada e não está incluída no total 0–50."
  },
  "Second independent tasting — Alexander; 25.09.2026; 2 months aging. Scores transcribed from the tasting sheet. Overall impression is separate and excluded from total 0–50.": {
    ru:"Вторая независимая дегустация — Александр; 25.09.2026; выдержка 2 месяца. Оценки перенесены из дегустационного листа. Общее впечатление является отдельной оценкой и не входит в итог 0–50.",
    en:"Second independent tasting — Alexander; 25.09.2026; 2 months aging. Scores transcribed from the tasting sheet. Overall impression is separate and excluded from total 0–50.",
    de:"Zweite unabhängige Verkostung — Alexander; 25.09.2026; 2 Monate Reifung. Die Bewertungen wurden aus dem Verkostungsbogen übertragen. Der Gesamteindruck ist eine separate Bewertung und nicht in der Summe 0–50 enthalten.",
    fr:"Deuxième dégustation indépendante — Alexander ; 25.09.2026 ; vieillissement de 2 mois. Les notes ont été transcrites depuis la fiche de dégustation. L'impression générale est une évaluation distincte et n'est pas incluse dans le total 0–50.",
    es:"Segunda cata independiente — Alexander; 25.09.2026; 2 meses de envejecimiento. Las puntuaciones se transcribieron de la hoja de cata. La impresión general es una evaluación independiente y no está incluida en el total 0–50.",
    it:"Seconda degustazione indipendente — Alexander; 25.09.2026; 2 mesi di affinamento. I punteggi sono stati trascritti dalla scheda di degustazione. L'impressione complessiva è una valutazione separata e non è inclusa nel totale 0–50.",
    pt:"Segunda degustação independente — Alexander; 25.09.2026; 2 meses de envelhecimento. As pontuações foram transcritas da ficha de degustação. A impressão geral é uma avaliação separada e não está incluída no total 0–50."
  }
})) {
  for (const [lng,textValue] of Object.entries(vals)) { if (!DATA_TEXT[lng]) DATA_TEXT[lng]={}; DATA_TEXT[lng][k]=textValue; }
}

const scoreLabels={
  ru:{aroma:"Аромат",softness:"Мягкость",oak:"Дуб / древесность",vanilla:"Ваниль",caramelToast:"Карамель / обжарка",fruitNut:"Сухофрукты / орехи",smokeChar:"Дым / обугленность",spirit:"Спиртуозность",bitterness:"Горечь",astringency:"Терпкость"},
  en:{aroma:"Aroma",softness:"Softness",oak:"Oak / wood",vanilla:"Vanilla",caramelToast:"Caramel / toast",fruitNut:"Dried fruit / nuts",smokeChar:"Smoke / char",spirit:"Spirit",bitterness:"Bitterness",astringency:"Astringency"},
  de:{aroma:"Aroma",softness:"Weichheit",oak:"Eiche / Holz",vanilla:"Vanille",caramelToast:"Karamell / Röstung",fruitNut:"Trockenfrüchte / Nüsse",smokeChar:"Rauch / Verkohlung",spirit:"Spirituosität",bitterness:"Bitterkeit",astringency:"Adstringenz"},
  fr:{aroma:"Arôme",softness:"Douceur",oak:"Chêne / bois",vanilla:"Vanille",caramelToast:"Caramel / chauffe",fruitNut:"Fruits secs / noix",smokeChar:"Fumée / charbon",spirit:"Alcool",bitterness:"Amertume",astringency:"Astringence"},
  es:{aroma:"Aroma",softness:"Suavidad",oak:"Roble / madera",vanilla:"Vainilla",caramelToast:"Caramelo / tostado",fruitNut:"Frutos secos / nueces",smokeChar:"Humo / carbonizado",spirit:"Alcohol",bitterness:"Amargor",astringency:"Astringencia"},
  it:{aroma:"Aroma",softness:"Morbidezza",oak:"Rovere / legno",vanilla:"Vaniglia",caramelToast:"Caramello / tostatura",fruitNut:"Frutta secca / noci",smokeChar:"Fumo / carbonizzato",spirit:"Alcol",bitterness:"Amarezza",astringency:"Astringenza"},
  pt:{aroma:"Aroma",softness:"Suavidade",oak:"Carvalho / madeira",vanilla:"Baunilha",caramelToast:"Caramelo / tosta",fruitNut:"Frutos secos / nozes",smokeChar:"Fumo / carbonizado",spirit:"Álcool",bitterness:"Amargor",astringency:"Adstringência"}
};
const scoreLabelText=k=>scoreLabels[lang]?.[k]||scoreLabels.en[k]||k;
const esc=v=>String(v??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function color(x){return x.observations?.color||null}
function glass(x,large=false){
 const c=color(x); if(!c)return "";
 return '<div class="wine-glass '+(large?"large":"")+'" aria-label="'+esc(t("color"))+' '+esc(c.hex)+'"><div class="bowl"><div class="liquid" style="background:'+esc(c.hex)+'"></div><div class="shine"></div></div><div class="stem"></div><div class="foot"></div></div>';
}
function colorPanel(x){
 const c=color(x);if(!c)return "";
 const others=data.filter(y=>color(y));
 return '<section class="color-panel"><h3>'+t("color")+'</h3><div class="color-record"><div class="glass-stage">'+glass(x,true)+'</div><div class="color-info"><div class="color-db-label">'+t("colorDb")+'</div><div class="color-values"><div><small>'+t("srm")+'</small><b>'+esc(c.srm??"—")+'</b></div><div><small>'+t("hex")+'</small><b>'+esc(c.hex??"—")+'</b></div><div><small>'+t("rgb")+'</small><b>'+esc(c.rgb??"—")+'</b></div></div><div class="color-caption">'+esc(c.source||"")+'</div></div></div><div class="color-compare-title">'+t("compareWith")+'</div><div class="color-glasses">'+others.map(y=>'<div class="color-sample '+(y.id===x.id?"selected":"")+'">'+glass(y,false)+'<span>'+esc(y.title)+'</span></div>').join("")+'</div></section>';
}
function radarPanel(x){
 const ts=x.tastingSessions||[],v=ts[ts.length-1];
 if(!v?.scores)return "";
 const keys=["aroma","softness","oak","vanilla","caramelToast","fruitNut","smokeChar","spirit","bitterness","astringency"];
 const scores=keys.map(k=>Number(v.scores?.[k]??0));
 const labels=keys.map(scoreLabelText);
 const cx=210,cy=205,R=130,grid=[1,2,3,4,5];
 const point=(r,i)=>{const a=-Math.PI/2+(Math.PI*2*i/keys.length);return [cx+Math.cos(a)*R*r/5,cy+Math.sin(a)*R*r/5]};
 const pts=n=>keys.map((_,i)=>point(n,i).join(",")).join(" ");
 const labelPos=keys.map((_,i)=>{const a=-Math.PI/2+(Math.PI*2*i/keys.length);const r=R+31;return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,a}});
 const anchor=p=>p.x<cx-8?"end":p.x>cx+8?"start":"middle";
 const valuePos=keys.map((_,i)=>{const a=-Math.PI/2+(Math.PI*2*i/keys.length);const r=R+12;return {x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r}});
 const gridSvg=grid.map(n=>'<polygon points="'+pts(n)+'" fill="none" stroke="#d9d4cb" stroke-width="1"/>').join("");
 const axes=keys.map((_,i)=>'<line x1="'+cx+'" y1="'+cy+'" x2="'+point(5,i)[0]+'" y2="'+point(5,i)[1]+'" stroke="#ddd8cf" stroke-width="1"/>').join("");
 const texts=labels.map((label,i)=>{const p=labelPos[i],q=valuePos[i];const words=String(label).split(" / ");return '<text x="'+p.x+'" y="'+p.y+'" text-anchor="'+anchor(p)+'" dominant-baseline="middle" class="radar-label">'+(words.length>1?'<tspan x="'+p.x+'" dy="-7">'+esc(words[0])+'</tspan><tspan x="'+p.x+'" dy="14">'+esc(words.slice(1).join(" / "))+'</tspan>':'<tspan>'+esc(label)+'</tspan>')+'</text><text x="'+q.x+'" y="'+q.y+'" text-anchor="'+anchor(q)+'" dominant-baseline="middle" class="radar-value">'+esc(scores[i])+'</text>'}).join("");
 return '<section class="radar-panel"><h3>'+t("tasteProfile")+'</h3><svg class="radar" viewBox="0 0 420 420" role="img" aria-label="'+esc(t("tasteProfile"))+'">'+gridSvg+axes+'<polygon points="'+scores.map((s,i)=>point(s,i).join(",")).join(" ")+'" fill="#a55a20" fill-opacity=".16" stroke="#8b3f12" stroke-width="2.5" stroke-linejoin="round"/> '+scores.map((s,i)=>{const p=point(s,i);return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" fill="#8b3f12"/>'}).join("")+texts+'</svg><div class="radar-scale">1–5</div></section>';
}
function applyLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
 document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=t(e.dataset.i18nPlaceholder));
 $("#language").value=lang;$("#language").setAttribute("aria-label",t("language"));
 $("#toast").options[0].textContent=t("allToast");
 render();
}
async function load(){
 try{const r=await fetch("data.json",{cache:"no-store"});if(!r.ok)throw Error();const j=await r.json();data=await Promise.all((j.experiments||[]).map(async m=>{const r=await fetch(m.path,{cache:"no-store"});if(!r.ok)throw Error(m.path);return r.json()}));}
 catch(e){console.error(e);data=[];$("#list").innerHTML='<div class="empty">'+t("loadError")+"</div>"}render();
}
function render(){
 updateCompareButton();
 const q=$("#q").value.trim().toLowerCase(),toast=$("#toast").value;
 const a=data.filter(x=>(!q||JSON.stringify(x).toLowerCase().includes(q))&&(!toast||x.oak?.toast===toast));
 $("#count").textContent=a.length+" "+t("shown");
 $("#list").innerHTML=a.length?a.map(card).join(""):'<div class="empty">'+t("noData")+"</div>";
 const authors=new Set(data.map(x=>x.author).filter(Boolean)),reps=data.filter(x=>x.replication?.sourceId).length;
 $("#stats").innerHTML='<div class="stat"><b>'+data.length+'</b><span>'+t("experiments").toLowerCase()+'</span></div><div class="stat"><b>'+authors.size+'</b><span>'+t("contributors")+'</span></div><div class="stat"><b>'+reps+'</b><span>'+t("replications")+'</span></div>';
}
function card(x){
 const c=color(x),children=data.filter(y=>y.replication?.sourceId===x.id).length;
 let chips="";
 if(x.oak?.toast)chips+=`<span class="chip">${esc(toastText(x.oak.toast))}</span>`;
 if(x.liquid?.abv!=null)chips+=`<span class="chip">${x.liquid.abv}% ABV</span>`;
 if(x.extraction?.doseGPerL!=null)chips+=`<span class="chip">${x.extraction.doseGPerL} g/L</span>`;
 if(x.extraction?.durationDays!=null)chips+=`<span class="chip">${x.extraction.durationDays} ${t("days")}</span>`;
 return `<article class="card">
   <label class="card-select"><input type="checkbox" class="compare-check" data-id="${esc(x.id)}" ${selectedIds.has(x.id)?"checked":""}><span>${t("selectForCompare")}</span></label>
   <div class="card-top">${c?glass(x,false):""}<div><h3>${esc(x.title)}</h3><div class="meta">${esc(x.oak?.type||"")} · ${esc(formText(x.oak?.form||""))} · ${esc(authorText(x.author||""))}</div></div></div>
   <div class="chips">${chips}</div>
   ${x.replication?.sourceId?`<div class="meta">↳ ${esc(x.replication.sourceId)}</div>`:""}
   <small>${children} ${t("replications")}</small>
   <p>${esc(localizeDataText(x.observations?.overallNotes||""))}</p>
   <button class="open" data-id="${esc(x.id)}">${t("view")}</button>
 </article>`;
}
function details(x){
 const p=x.oak?.preparation||{},e=x.extraction||{},l=x.liquid||{},o=x.observations||{},ts=x.tastingSessions||[];
 const row=(label,v,unit="")=>v!=null&&v!==""?`<div><dt>${label}</dt><dd>${esc(localizeDataText(v))}${unit}</dd></div>`:"";
 const scoreKeys=["aroma","softness","oak","vanilla","caramelToast","fruitNut","smokeChar","spirit","bitterness","astringency"];
 const tasting=ts.map(v=>`<h3>${t("firstTasting")} — ${esc(v.date||"")}</h3><div class="meta">${t("order")}: ${esc(v.order??"—")} · ${t("aging")}: ${esc(v.agingDays??"—")} ${t("days")} · ${t("total")}: ${esc(v.total??"—")}/50 · ${t("overall")}: ${esc(v.overall??"—")}/10</div><dl>${scoreKeys.map(k=>row(scoreLabelText(k),v.scores?.[k])).join("")}</dl>${row(t("notes"),v.notes)}`).join("");
 $("#detailBody").innerHTML=`<div class="detail-scroll">
   <div class="detailtitle"><span class="chip">${esc(statusText(x.status))}</span><span class="meta">${esc(x.id)}</span></div>
   <h2>${esc(x.title)}</h2><p class="meta">${esc(authorText(x.author||""))}</p>
   ${x.tastingSessions?.length?`<div class="detail-visual-grid">${colorPanel(x)}${radarPanel(x)}</div>`:colorPanel(x)}
   <h3>${t("oak")}</h3><dl>${row(t("type"),x.oak?.type)}${row(t("form"),formText(x.oak?.form))}${row(t("species"),x.oak?.species)}${row(t("origin"),x.oak?.origin)}${row(t("particle"),x.oak?.particleSize)}${row(t("toast"),toastText(x.oak?.toast))}${row(t("soaking"),durationText(p.soaking))}${row(t("boiling"),durationText(p.boiling))}${row(t("rinsing"),p.rinsing)}${row(t("drying"),p.drying)}${row(t("prep"),p.notes)}</dl>
   <h3>${t("liquid")}</h3><dl>${row(t("base"),baseText(l.base))}${row(t("abv"),l.abv,"%")}${row(t("volume"),l.volumeMl," ml")}${row(t("dose"),e.doseGPerL," g/L")}${row(t("duration"),e.durationDays," "+t("days"))}${row(t("temperature"),e.temperatureC," °C")}${row(t("container"),containerText(e.container))}${row(t("agitation"),agitationText(e.agitation))}${row(t("extraction"),e.notes)}</dl>
   <h3>${t("observations")}</h3><dl>${row(t("appearance"),o.appearance)}${row(t("aroma"),o.aroma)}${row(t("taste"),o.taste)}${row(t("mouthfeel"),o.mouthfeel)}${row(t("overallNotes"),o.overallNotes)}</dl>
   ${tasting?`<h3>${t("tastings")}</h3>${tasting}`:""}
   <h3>${t("evidence")}</h3><dl>${row(t("sourceExp"),x.replication?.sourceId)}${row(t("sourceNotes"),x.evidence?.sourceNotes)}</dl>
 </div>`;
 $("#detail").showModal();
}
function updateCompareButton(){const n=selectedIds.size;$("#compare").textContent=n? t("compare")+" ("+n+")":t("compare")}
function compare(){
 const rows=data.filter(x=>selectedIds.has(x.id)).map(x=>({x,t:(x.tastingSessions||[]).slice(-1)[0]})).filter(v=>v.t).sort((a,b)=>(a.t.order??999)-(b.t.order??999));
 const keys=["aroma","spirit","softness","oak","vanilla","caramelToast","fruitNut","smokeChar","bitterness","astringency"];
 const names=keys.map(scoreLabelText);
 const body=rows.map(({x,t})=>'<tr><td>'+esc(x.title)+'</td><td>'+esc(t.order??"—")+'</td>'+keys.map(k=>'<td>'+esc(t.scores?.[k]??"—")+"</td>").join("")+'<td><b>'+esc(t.total??"—")+"/50</b></td><td><b>"+esc(t.overall??"—")+"/10</b></td></tr>").join("");
 if(!rows.length){$("#compareBody").innerHTML="<p class=\"compare-note\">"+t("selectForCompare")+": 1 "+t("sample")+"</p>";$("#compareDlg").showModal();return;} $("#compareBody").innerHTML='<div class="compare-scroll"><table class="compare-table"><thead><tr><th>'+t("sample")+'</th><th>'+t("order")+'</th>'+names.map(n=>"<th>"+n+"</th>").join("")+"<th>"+t("total")+"</th><th>"+t("overall")+"</th></tr></thead><tbody>"+body+"</tbody></table></div>";
 $("#compareDlg").showModal();
}
function num(v){return v===""?null:Number(v)}
$("#language").onchange=e=>{lang=e.target.value;localStorage.setItem("oaklab-language",lang);applyLanguage()};
$("#q").oninput=render;$("#toast").onchange=render;$("#compare").onclick=compare;
$("#list").addEventListener("change",e=>{const box=e.target.closest(".compare-check");if(!box)return;if(box.checked)selectedIds.add(box.dataset.id);else selectedIds.delete(box.dataset.id);updateCompareButton();});
$("#new").onclick=()=>$("#dlg").showModal();$("#close").onclick=()=>$("#dlg").close();$("#cancel").onclick=()=>$("#dlg").close();
$("#list").onclick=e=>{const b=e.target.closest(".open");if(b){const x=data.find(v=>v.id===b.dataset.id);if(x)details(x)}};
$("#form").onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));data.unshift({schemaVersion:2,id:"LOCAL-"+Date.now(),status:"draft",title:f.title,author:f.author,oak:{type:f.oakType,form:f.form,toast:f.toast,preparation:{soaking:f.soaking||null,boiling:f.boiling||null}},liquid:{abv:num(f.abv),volumeMl:num(f.volumeMl)},extraction:{doseGPerL:num(f.doseGPerL),durationDays:num(f.durationDays),temperatureC:num(f.temperatureC)},observations:{overallNotes:f.notes||null},replication:{sourceId:f.sourceId||null},tastingSessions:[]});e.target.reset();$("#dlg").close();render()};
$("#export").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({schemaVersion:2,experiments:data},null,2)],{type:"application/json"}));a.download="oaklab-data-v2.json";a.click()};
applyLanguage();load();