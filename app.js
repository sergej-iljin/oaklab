let data=[];
const $=s=>document.querySelector(s);
async function load(){
  try{
    const r=await fetch("data.json",{cache:"no-store"});
    if(!r.ok)throw new Error("Could not load data.json");
    const j=await r.json();
    const entries=Array.isArray(j.experiments)?j.experiments:[];
    data=await Promise.all(entries.map(async meta=>{
      const rr=await fetch(meta.path,{cache:"no-store"});
      if(!rr.ok)throw new Error("Could not load "+meta.path);
      return await rr.json();
    }));
  }catch(e){console.error(e);data=[];$("#list").innerHTML="<div class=\"empty\">The public dataset could not be loaded.</div>"}
  render()
}
function render(){
  const q=$("#q").value.trim().toLowerCase(),t=$("#toast").value;
  const a=data.filter(x=>(!q||JSON.stringify(x).toLowerCase().includes(q))&&(!t||x.oak?.toast===t));
  $("#count").textContent=a.length+" shown";
  $("#list").innerHTML=a.length?a.map(card).join(""):"<div class=\"empty\">No matching experiments.</div>";
  const authors=new Set(data.map(x=>x.author).filter(Boolean));
  $("#stats").innerHTML="<div class=\"stat\"><b>"+data.length+"</b><span>experiments</span></div><div class=\"stat\"><b>"+authors.size+"</b><span>contributors</span></div><div class=\"stat\"><b>"+data.filter(x=>x.replication?.sourceId).length+"</b><span>replications</span></div>"
}
function card(x){
  const children=data.filter(y=>y.replication?.sourceId===x.id).length;
  let chips="";
  if(x.oak?.toast)chips+="<span class=\"chip\">"+esc(x.oak.toast)+"</span>";
  if(x.liquid?.abv!=null)chips+="<span class=\"chip\">"+x.liquid.abv+"% ABV</span>";
  if(x.extraction?.doseGPerL!=null)chips+="<span class=\"chip\">"+x.extraction.doseGPerL+" g/L</span>";
  if(x.extraction?.durationDays!=null)chips+="<span class=\"chip\">"+x.extraction.durationDays+" days</span>";
  const rep=x.replication?.sourceId?"<div class=\"meta\">Replication of <strong>"+esc(x.replication.sourceId)+"</strong></div>":"";
  return "<article class=\"card\"><h3>"+esc(x.title)+"</h3><div class=\"meta\">"+esc(x.oak?.type||"")+" · "+esc(x.oak?.form||"")+" · "+esc(x.author||"")+"</div><div class=\"chips\">"+chips+"</div>"+rep+"<small>"+children+" replication(s)</small><p>"+esc(x.observations?.overallNotes||"")+"</p><button class=\"open\" data-id=\""+esc(x.id)+"\">View experiment</button></article>"
}
function details(x){
  const p=x.oak?.preparation||{},e=x.extraction||{},l=x.liquid||{},o=x.observations||{},ts=x.tastingSessions||[];
  const row=(label,v,unit="")=>v!=null&&v!==""?"<div><dt>"+label+"</dt><dd>"+esc(v)+unit+"</dd></div>":"";
  const tastingLabels={aroma:"Аромат",softness:"Мягкость",oak:"Дуб / древесность",vanilla:"Ваниль",caramelToast:"Карамель / обжарка",fruitNut:"Сухофрукты / орехи",smokeChar:"Дым / обугленность",spirit:"Спиртуозность",bitterness:"Горечь",astringency:"Терпкость"};
  const tastingHtml=ts.map(t=>{
    const sc=t.scores||{};
    return "<h3>First tasting — "+esc(t.date||"")+"</h3><div class=\"meta\">Order: "+esc(t.order??"—")+" · Aging: "+esc(t.agingDays??"—")+" days · Total: "+esc(t.total??"—")+"/50 · Overall: "+esc(t.overall??"—")+"/10</div><dl>"+Object.entries(tastingLabels).map(([k,label])=>row(label,sc[k])).join("")+"</dl>"+row("Notes",t.notes);
  }).join("");
  $("#detailBody").innerHTML="<div class=\"detailtitle\"><span class=\"chip\">"+esc(x.status)+"</span><span class=\"meta\">"+esc(x.id)+"</span></div><h2>"+esc(x.title)+"</h2><p class=\"meta\">"+esc(x.author)+"</p><h3>Oak</h3><dl>"+row("Type",x.oak?.type)+row("Form",x.oak?.form)+row("Species",x.oak?.species)+row("Origin",x.oak?.origin)+row("Particle size",x.oak?.particleSize)+row("Toast",x.oak?.toast)+row("Soaking",p.soaking)+row("Boiling",p.boiling)+row("Rinsing",p.rinsing)+row("Drying",p.drying)+row("Preparation notes",p.notes)+"</dl><h3>Liquid & extraction</h3><dl>"+row("Base",l.base)+row("ABV",l.abv,"%")+row("Volume",l.volumeMl," ml")+row("Oak dose",e.doseGPerL," g/L")+row("Duration",e.durationDays," days")+row("Temperature",e.temperatureC," °C")+row("Container",e.container)+row("Agitation",e.agitation)+row("Extraction notes",e.notes)+"</dl><h3>Observations</h3><dl>"+row("Appearance",o.appearance)+row("Aroma",o.aroma)+row("Taste",o.taste)+row("Mouthfeel",o.mouthfeel)+row("Overall notes",o.overallNotes)+"</dl>"+(tastingHtml?"<h3>Tasting sessions</h3>"+tastingHtml:"")+"<h3>Replication & evidence</h3><dl>"+row("Source experiment",x.replication?.sourceId)+row("Source notes",x.evidence?.sourceNotes)+"</dl>";
  $("#detail").showModal();
}
function num(v){return v===""?null:Number(v)}
const tastingKeys=["aroma","spirit","softness","oak","vanilla","caramelToast","fruitNut","smokeChar","bitterness","astringency"];
const tastingNames={aroma:"Аромат",spirit:"Спиртуозность",softness:"Мягкость",oak:"Дуб",vanilla:"Ваниль",caramelToast:"Карамель",fruitNut:"Сухофрукты",smokeChar:"Дым",bitterness:"Горечь",astringency:"Терпкость"};
function compare(){
  const rows=data.map(x=>({x,t:(x.tastingSessions||[]).slice(-1)[0]})).filter(v=>v.t);
  rows.sort((a,b)=>(a.t.order??999)-(b.t.order??999));
  const head=tastingKeys.map(k=>"<th>"+tastingNames[k]+"</th>").join("");
  const body=rows.map(({x,t})=>{
    const s=t.scores||{};
    return "<tr><td><strong>"+esc(x.title)+"</strong></td><td>"+esc(t.order??"—")+"</td>"+tastingKeys.map(k=>"<td>"+esc(s[k]??"—")+"</td>").join("")+"<td class=\"compare-total\">"+esc(t.total??"—")+"/50</td><td class=\"compare-total\">"+esc(t.overall??"—")+"/10</td></tr>";
  }).join("");
  $("#compareBody").innerHTML="<p class=\"compare-note\">Последняя внесённая дегустация каждого образца. Порядок — порядок дегустации.</p><div class=\"compare-wrap\"><table class=\"compare-table\"><thead><tr><th>Образец</th><th>Порядок</th>"+head+"<th>Итог</th><th>Общее</th></tr></thead><tbody>"+body+"</tbody></table></div>";
  $("#compareDlg").showModal();
}
$("#q").oninput=render;$("#toast").onchange=render;$("#compare").onclick=compare;
$("#new").onclick=()=>$("#dlg").showModal();$("#close").onclick=()=>$("#dlg").close();$("#cancel").onclick=()=>$("#dlg").close();
$("#list").onclick=e=>{const b=e.target.closest(".open");if(b){const x=data.find(v=>v.id===b.dataset.id);if(x)details(x)}};
$("#detailClose").onclick=()=>$("#detail").close();
$("#form").onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));const record={schemaVersion:2,id:"LOCAL-"+Date.now(),status:"draft",title:f.title,author:f.author,createdAt:new Date().toISOString(),oak:{type:f.oakType,species:null,origin:null,form:f.form,particleSize:null,toast:f.toast,preparation:{soaking:f.soaking||null,boiling:f.boiling||null,rinsing:null,drying:null,notes:null}},liquid:{base:null,abv:num(f.abv),volumeMl:num(f.volumeMl)},extraction:{doseGPerL:num(f.doseGPerL),durationDays:num(f.durationDays),temperatureC:num(f.temperatureC),container:null,agitation:null,notes:null},observations:{appearance:null,aroma:null,taste:null,mouthfeel:null,overallNotes:f.notes||null},replication:{sourceId:f.sourceId||null},tastingSessions:[],evidence:{photos:[],attachments:[],sourceNotes:null}};data.unshift(record);e.target.reset();$("#dlg").close();render()};
$("#export").onclick=()=>{const blob=new Blob([JSON.stringify({schemaVersion:2,experiments:data},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="oaklab-data-v2.json";a.click();URL.revokeObjectURL(a.href)};
function esc(v){return String(v??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]))}
let lang=localStorage.getItem("oaklab-language")||"ru";$("#language").addEventListener("change",function(e){lang=e.target.value;localStorage.setItem("oaklab-language",lang);applyLanguage()});function applyLanguage(){document.documentElement.lang=lang;$("#compare").textContent=tr("compare");$("#new").textContent=tr("newExp");document.querySelector(".hero h1").textContent=tr("hero");document.querySelector(".hero p").textContent=tr("intro");$("#export").textContent=tr("export");document.querySelector(".sectionhead h2").textContent=tr("experiments");$("#q").placeholder=tr("search");$("#toast").options[0].textContent=tr("allToast");render()}
const COLOR_MAP={"OL-001":{"hex":"#DA914A","rgb":"218, 145, 74","srm":"7.2"},"OL-002":{"hex":"#8B3A12","rgb":"139, 58, 18","srm":"12.4"},"OL-003":{"hex":"#D18D08","rgb":"209, 141, 8","srm":"6.5"},"OL-004":{"hex":"#860E01","rgb":"134, 14, 1","srm":"11.8"},"OL-005":{"hex":"#570501","rgb":"87, 5, 1","srm":"16.0"},"OL-006":{"hex":"#611401","rgb":"97, 20, 1","srm":"14.8"},"OL-007":{"hex":"#D08C03","rgb":"208, 140, 3","srm":"6.4"},"OL-008":{"hex":"#8C1201","rgb":"140, 18, 1","srm":"12.0"}};
const LANGS={ru:{compare:"Сравнить",newExp:"+ Новый эксперимент",hero:"Делись. Воспроизводи. Сравнивай.",intro:"Структурированная открытая база экспериментов с дубовой выдержкой и настаиванием.",search:"Поиск экспериментов…",allToast:"Все степени обжарки",export:"Экспорт JSON",experiments:"Эксперименты",view:"Открыть эксперимент",color:"Цвет",srm:"Цвет (SRM)",hex:"HEX",rgb:"RGB",compareWith:"Сравнение с другими экспериментами",language:"Язык"},en:{compare:"Compare",newExp:"+ New experiment",hero:"Share. Reproduce. Compare.",intro:"A structured open database for oak infusion and aging experiments.",search:"Search experiments…",allToast:"All toast levels",export:"Export JSON",experiments:"Experiments",view:"View experiment",color:"Color",srm:"Color (SRM)",hex:"HEX",rgb:"RGB",compareWith:"Comparison with other experiments",language:"Language"},de:{compare:"Vergleichen",newExp:"+ Neues Experiment",hero:"Teilen. Reproduzieren. Vergleichen.",intro:"Strukturierte offene Datenbank für Eicheninfusion und Reifung.",search:"Experimente suchen…",allToast:"Alle Röstgrade",export:"JSON exportieren",experiments:"Experimente",view:"Experiment öffnen",color:"Farbe",srm:"Farbe (SRM)",hex:"HEX",rgb:"RGB",compareWith:"Vergleich mit anderen Experimenten",language:"Sprache"},fr:{compare:"Comparer",newExp:"+ Nouvelle expérience",hero:"Partager. Reproduire. Comparer.",intro:"Base ouverte structurée pour les expériences au chêne.",search:"Rechercher des expériences…",allToast:"Tous les niveaux de chauffe",export:"Exporter JSON",experiments:"Expériences",view:"Ouvrir l'expérience",color:"Couleur",srm:"Couleur (SRM)",hex:"HEX",rgb:"RVB",compareWith:"Comparaison avec les autres expériences",language:"Langue"},es:{compare:"Comparar",newExp:"+ Nuevo experimento",hero:"Comparte. Reproduce. Compara.",intro:"Base abierta estructurada para experimentos con roble.",search:"Buscar experimentos…",allToast:"Todos los niveles de tostado",export:"Exportar JSON",experiments:"Experimentos",view:"Abrir experimento",color:"Color",srm:"Color (SRM)",hex:"HEX",rgb:"RGB",compareWith:"Comparación con otros experimentos",language:"Idioma"},it:{compare:"Confronta",newExp:"+ Nuovo esperimento",hero:"Condividi. Riproduci. Confronta.",intro:"Database aperto strutturato per esperimenti con rovere.",search:"Cerca esperimenti…",allToast:"Tutti i livelli di tostatura",export:"Esporta JSON",experiments:"Esperimenti",view:"Apri esperimento",color:"Colore",srm:"Colore (SRM)",hex:"HEX",rgb:"RGB",compareWith:"Confronto con altri esperimenti",language:"Lingua"}};
function tr(k){return (LANGS[lang]&&LANGS[lang][k])||LANGS.en[k]||k}
function colorMarkup(x,full){var c=COLOR_MAP[x.id];if(!c)return "";if(!full)return '<span class="color-dot" title="'+c.hex+'" style="background:'+c.hex+'"></span>';var pos=Math.max(4,Math.min(96,Number(c.srm)/20*100));var others=data.map(function(y){return {x:y,c:COLOR_MAP[y.id]}}).filter(function(v){return v.c});var samples=others.map(function(v){return '<div class="color-sample '+(v.x.id===x.id?'selected':'')+'"><div class="glass" style="background:'+v.c.hex+'"></div><span>'+esc(v.x.title)+'</span></div>'}).join("");return '<section class="color-section"><h3>'+tr("color")+'</h3><div class="color-box"><div class="swatch" style="background:'+c.hex+'"></div><div><div class="color-meta"><div><small>'+tr("srm")+'</small><strong>'+c.srm+'</strong></div><div><small>'+tr("hex")+'</small><strong>'+c.hex+'</strong></div><div><small>'+tr("rgb")+'</small><strong>'+c.rgb+'</strong></div></div><div class="color-scale"><span class="color-marker" style="left:'+pos+'%"></span></div><div class="meta" style="margin-top:8px">'+tr("compareWith")+'</div><div class="color-compare">'+samples+'</div></div></div></section>'}
var oldCard=card;card=function(x){var children=data.filter(function(y){return y.replication&&y.replication.sourceId===x.id}).length;var chips="";if(x.oak&&x.oak.toast)chips+='<span class="chip">'+esc(x.oak.toast)+'</span>';if(x.liquid&&x.liquid.abv!=null)chips+='<span class="chip">'+x.liquid.abv+'% ABV</span>';if(x.extraction&&x.extraction.doseGPerL!=null)chips+='<span class="chip">'+x.extraction.doseGPerL+' g/L</span>';if(x.extraction&&x.extraction.durationDays!=null)chips+='<span class="chip">'+x.extraction.durationDays+' days</span>';var rep=x.replication&&x.replication.sourceId?'<div class="meta">Replication of <strong>'+esc(x.replication.sourceId)+'</strong></div>':"";return '<article class="card"><div class="card-top">'+colorMarkup(x,false)+'<div><h3>'+esc(x.title)+'</h3><div class="meta">'+esc((x.oak&&x.oak.type)||"")+' · '+esc((x.oak&&x.oak.form)||"")+' · '+esc(x.author||"")+'</div></div></div><div class="chips">'+chips+'</div>'+rep+'<small>'+children+' replication(s)</small><p>'+esc((x.observations&&x.observations.overallNotes)||"")+'</p><button class="open" data-id="'+esc(x.id)+'">'+tr("view")+'</button></article>'};
var oldDetails=details;details=function(x){oldDetails(x);var b=$("#detailBody");if(b)b.innerHTML=b.innerHTML.replace("<h3>Observations</h3>",colorMarkup(x,true)+"<h3>Observations</h3>")};
applyLanguage();load();