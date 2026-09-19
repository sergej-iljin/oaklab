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
  const p=x.oak?.preparation||{},e=x.extraction||{},l=x.liquid||{},o=x.observations||{};
  const row=(label,v,unit="")=>v!=null&&v!==""?"<div><dt>"+label+"</dt><dd>"+esc(v)+unit+"</dd></div>":"";
  $("#detailBody").innerHTML="<div class=\"detailtitle\"><span class=\"chip\">"+esc(x.status)+"</span><span class=\"meta\">"+esc(x.id)+"</span></div><h2>"+esc(x.title)+"</h2><p class=\"meta\">"+esc(x.author)+"</p><h3>Oak</h3><dl>"+row("Type",x.oak?.type)+row("Form",x.oak?.form)+row("Species",x.oak?.species)+row("Origin",x.oak?.origin)+row("Particle size",x.oak?.particleSize)+row("Toast",x.oak?.toast)+row("Soaking",p.soaking)+row("Boiling",p.boiling)+row("Rinsing",p.rinsing)+row("Drying",p.drying)+row("Preparation notes",p.notes)+"</dl><h3>Liquid & extraction</h3><dl>"+row("Base",l.base)+row("ABV",l.abv,"%")+row("Volume",l.volumeMl," ml")+row("Oak dose",e.doseGPerL," g/L")+row("Duration",e.durationDays," days")+row("Temperature",e.temperatureC," °C")+row("Container",e.container)+row("Agitation",e.agitation)+row("Extraction notes",e.notes)+"</dl><h3>Observations</h3><dl>"+row("Appearance",o.appearance)+row("Aroma",o.aroma)+row("Taste",o.taste)+row("Mouthfeel",o.mouthfeel)+row("Overall notes",o.overallNotes)+"</dl><h3>Replication & evidence</h3><dl>"+row("Source experiment",x.replication?.sourceId)+row("Source notes",x.evidence?.sourceNotes)+"</dl>"
  $("#detail").showModal()
}
function num(v){return v===""?null:Number(v)}
$("#q").oninput=render;$("#toast").onchange=render;
$("#new").onclick=()=>$("#dlg").showModal();$("#close").onclick=()=>$("#dlg").close();$("#cancel").onclick=()=>$("#dlg").close();
$("#list").onclick=e=>{const b=e.target.closest(".open");if(b){const x=data.find(v=>v.id===b.dataset.id);if(x)details(x)}};
$("#detailClose").onclick=()=>$("#detail").close();
$("#form").onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));const record={schemaVersion:2,id:"LOCAL-"+Date.now(),status:"draft",title:f.title,author:f.author,createdAt:new Date().toISOString(),oak:{type:f.oakType,species:null,origin:null,form:f.form,particleSize:null,toast:f.toast,preparation:{soaking:f.soaking||null,boiling:f.boiling||null,rinsing:null,drying:null,notes:null}},liquid:{base:null,abv:num(f.abv),volumeMl:num(f.volumeMl)},extraction:{doseGPerL:num(f.doseGPerL),durationDays:num(f.durationDays),temperatureC:num(f.temperatureC),container:null,agitation:null,notes:null},observations:{appearance:null,aroma:null,taste:null,mouthfeel:null,overallNotes:f.notes||null},replication:{sourceId:f.sourceId||null},evidence:{photos:[],attachments:[],sourceNotes:null}};data.unshift(record);e.target.reset();$("#dlg").close();render()};
$("#export").onclick=()=>{const blob=new Blob([JSON.stringify({schemaVersion:2,experiments:data},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="oaklab-data-v2.json";a.click();URL.revokeObjectURL(a.href)};
function esc(v){return String(v??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]))}
load();