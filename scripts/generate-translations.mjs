import fs from "node:fs/promises";

const LANGS=["ru","en","de","fr","es","it","pt"];
const SOURCE_LANG="ru";
const DATA=JSON.parse(await fs.readFile("data.json","utf8"));
let cache={};
try{cache=JSON.parse(await fs.readFile("translations.json","utf8"));}catch{}
for(const lang of LANGS) if(!cache[lang]) cache[lang]={};

const paths=[
  ["oak","preparation","notes"],
  ["extraction","notes"],
  ["observations","appearance"],
  ["observations","aroma"],
  ["observations","taste"],
  ["observations","mouthfeel"],
  ["observations","overallNotes"],
  ["evidence","sourceNotes"]
];

function get(o,p){let x=o;for(const k of p){if(x==null)return null;x=x[k]}return x}
const sources=new Set();
for(const item of (DATA.experiments||[])){
  const obj=JSON.parse(await fs.readFile(item.path,"utf8"));
  for(const p of paths){const v=get(obj,p);if(typeof v==="string"&&v.trim())sources.add(v.trim());}
  for(const s of (obj.tastingSessions||[])) if(typeof s.notes==="string"&&s.notes.trim()) sources.add(s.notes.trim());
}

for(const source of sources) cache.ru[source]=source;

const missing=[];
for(const source of sources){
  for(const lang of LANGS.filter(x=>x!==SOURCE_LANG)){
    if(!cache[lang][source]) missing.push({source,targetLanguage:lang});
  }
}

if(missing.length && process.env.OPENAI_API_KEY){
  for(let i=0;i<missing.length;i+=20){
    const batch=missing.slice(i,i+20);
    const prompt=[
      "Translate every item into its requested target language.",
      "Return ONLY a JSON array. Each item must contain source, targetLanguage, translation.",
      "Preserve proper names, sample IDs, dates, numbers, units, temperatures, percentages and technical notation.",
      "Do not add explanations.",
      JSON.stringify(batch)
    ].join("\n");

    const response=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+process.env.OPENAI_API_KEY
      },
      body:JSON.stringify({
        model:"gpt-5.6-luna",
        input:[
          {role:"system",content:"You are a precise technical translator for an oak-aging and spirits laboratory."},
          {role:"user",content:prompt}
        ]
      })
    });
    if(!response.ok) throw new Error("Translation API failed: "+response.status+" "+await response.text());
    const body=await response.json();
    let text=body.output_text||"";
    text=text.replace(/^\\s*\`\`\`json\\s*/,"").replace(/\\s*\`\`\`\\s*$/,"").trim();
    const rows=JSON.parse(text);
    for(const row of rows){
      if(row?.source && row?.targetLanguage && typeof row.translation==="string"){
        if(!cache[row.targetLanguage]) cache[row.targetLanguage]={};
        cache[row.targetLanguage][row.source]=row.translation;
      }
    }
  }
}

await fs.writeFile("translations.json",JSON.stringify(cache,null,2)+"\n");
console.log(`Translation cache: ${sources.size} source texts; ${missing.length} missing translations before generation.`);
