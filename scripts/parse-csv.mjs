#!/usr/bin/env node
/** 從 TSV 生成 csvRegistry.js */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, "../src/assets/central_vietnam_itinerary.csv");
const outPath = join(__dirname, "../src/data/csvRegistry.js");

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "place";
}

const raw = readFileSync(csvPath, "utf8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim());
const header = lines[0].split("\t");
const places = [];
const seen = new Set();

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split("\t");
  const row = {};
  header.forEach((h, idx) => {
    row[h.trim()] = (cols[idx] || "").trim();
  });
  const title = row.Title || row.title;
  const url = row.URL || row.url;
  if (!title || !url?.startsWith("http")) continue;

  let slug = slugify(title);
  if (seen.has(slug)) slug = `${slug}-${i}`;
  seen.add(slug);

  const tags = (row.Tags || row.tags || "")
    .split(";")
    .map((t) => t.trim())
    .filter(Boolean);

  places.push({
    id: slug,
    name: title,
    note: row.Note || row.note || row.Comment || row.comment || "",
    url,
    tags,
  });
}

const body = `/** 自動生成：central_vietnam_itinerary.csv · ${places.length} 筆 · 請執行 npm run parse-csv */
export const CSV_PLACES = ${JSON.stringify(places, null, 2)};

export const CSV_PLACE_COUNT = ${places.length};

const byName = new Map();
const byId = new Map();
for (const p of CSV_PLACES) {
  if (!byName.has(p.name)) byName.set(p.name, p);
  byId.set(p.id, p);
}

export function getCsvByName(name) {
  return byName.get(name) ?? null;
}

export function getCsvById(id) {
  return byId.get(id) ?? null;
}

export function findCsvFuzzy(query) {
  if (!query) return null;
  const q = query.toLowerCase();
  return CSV_PLACES.find(
    (p) =>
      p.name.toLowerCase() === q ||
      p.name.toLowerCase().includes(q) ||
      q.includes(p.name.toLowerCase().slice(0, 8))
  ) ?? null;
}
`;

writeFileSync(outPath, body);
console.log(`Wrote ${places.length} places → csvRegistry.js`);
