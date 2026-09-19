import fs from "node:fs";

const index = JSON.parse(fs.readFileSync("data.json", "utf8"));
const required = ["id","status","title","author","oak","liquid","extraction","observations","replication","evidence"];

if (index.schemaVersion !== 2) throw new Error("data.json must use schemaVersion 2");
if (!Array.isArray(index.experiments)) throw new Error("data.json: experiments must be an array");

const ids = new Set();
const paths = new Set();

function validateRecord(x) {
  for (const key of required) if (!(key in x)) throw new Error(x.id + ": missing " + key);
  if (typeof x.id !== "string" || !x.id) throw new Error("invalid id");
  if (x.status !== "draft" && x.status !== "published") throw new Error(x.id + ": invalid status");
  if (!x.title || !x.author || !x.oak || !x.oak.type) throw new Error(x.id + ": title, author and oak.type are required");
  if (!["chips","cubes","stave","other"].includes(x.oak.form)) throw new Error(x.id + ": invalid oak.form");
  if (x.liquid.abv != null && (typeof x.liquid.abv !== "number" || x.liquid.abv < 0 || x.liquid.abv > 100)) throw new Error(x.id + ": invalid ABV");
  if (x.extraction.doseGPerL != null && (typeof x.extraction.doseGPerL !== "number" || x.extraction.doseGPerL < 0)) throw new Error(x.id + ": invalid doseGPerL");
  if (x.extraction.durationDays != null && (typeof x.extraction.durationDays !== "number" || x.extraction.durationDays < 0)) throw new Error(x.id + ": invalid durationDays");
}

for (const meta of index.experiments) {
  if (!meta.id || !meta.path) throw new Error("Index entry must contain id and path");
  if (ids.has(meta.id)) throw new Error("Duplicate experiment id: " + meta.id);
  if (paths.has(meta.path)) throw new Error("Duplicate experiment path: " + meta.path);
  ids.add(meta.id); paths.add(meta.path);
  if (!/^data\/experiments\/[A-Za-z0-9-]+\.json$/.test(meta.path)) throw new Error(meta.id + ": invalid path");
  const file = JSON.parse(fs.readFileSync(meta.path, "utf8"));
  if (file.id !== meta.id) throw new Error(meta.id + ": index id does not match record id");
  validateRecord(file);
  if (meta.status !== file.status || meta.title !== file.title || meta.author !== file.author) throw new Error(meta.id + ": index metadata does not match record");
  const expectedSource = file.replication?.sourceId ?? null;
  if ((meta.sourceId ?? null) !== expectedSource) throw new Error(meta.id + ": index sourceId does not match record");
}

const dir = "data/experiments";
const jsonFiles = fs.readdirSync(dir).filter(name => name.endsWith(".json")).map(name => dir + "/" + name);
for (const path of jsonFiles) if (!paths.has(path)) throw new Error("Unindexed experiment file: " + path);
if (jsonFiles.length !== index.experiments.length) throw new Error("Index/file count mismatch");

console.log("OakLab validation passed: " + ids.size + " experiment(s), " + jsonFiles.length + " record file(s).");