import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
const required = ["schemaVersion","id","status","title","author","oak","liquid","extraction","observations","replication","evidence"];

if (data.schemaVersion !== 2) throw new Error("data.json must use schemaVersion 2");
if (!Array.isArray(data.experiments)) throw new Error("data.json: experiments must be an array");

const ids = new Set();
for (let i = 0; i < data.experiments.length; i++) {
  const x = data.experiments[i];
  for (const key of required) if (!(key in x)) throw new Error("Experiment " + i + ": missing " + key);
  if (typeof x.id !== "string" || !x.id) throw new Error("Experiment " + i + ": invalid id");
  if (ids.has(x.id)) throw new Error("Duplicate experiment id: " + x.id);
  ids.add(x.id);
  if (x.status !== "draft" && x.status !== "published") throw new Error(x.id + ": invalid status");
  if (!x.title || !x.author || !x.oak || !x.oak.type) throw new Error(x.id + ": title, author and oak.type are required");
  if (!["chips","cubes","stave","other"].includes(x.oak.form)) throw new Error(x.id + ": invalid oak.form");
  if (x.liquid.abv != null && (typeof x.liquid.abv !== "number" || x.liquid.abv < 0 || x.liquid.abv > 100)) throw new Error(x.id + ": invalid ABV");
  if (x.extraction.doseGPerL != null && (typeof x.extraction.doseGPerL !== "number" || x.extraction.doseGPerL < 0)) throw new Error(x.id + ": invalid doseGPerL");
  if (x.extraction.durationDays != null && (typeof x.extraction.durationDays !== "number" || x.extraction.durationDays < 0)) throw new Error(x.id + ": invalid durationDays");
}
console.log("OakLab validation passed: " + data.experiments.length + " experiment(s), " + ids.size + " unique IDs.");