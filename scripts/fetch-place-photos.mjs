#!/usr/bin/env node
/**
 * Places API (New) 實景照 → 每站最多 3 張 jpg + placePhotoRefs.js
 * 需啟用 Places API (New) 與 Place Photos (New)
 */
import "./load-env.mjs";
import { mkdirSync, writeFileSync, unlinkSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { findPlaceId, fetchPlacePhotoRefs, downloadPlacePhoto } from "./lib/google-places-api.mjs";

const PHOTOS_PER_PLACE = 3;
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/place-photos");
const refsPath = join(__dirname, "../src/data/placePhotoRefs.js");
const manifestPath = join(__dirname, "../src/data/placePhotoManifest.js");

const API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
const REFS_ONLY = process.argv.includes("--refs-only");
const HOTELS_ONLY = process.argv.includes("--hotels-only");

if (!API_KEY) {
  console.error("請在 .env 設定 GOOGLE_MAPS_API_KEY 或 VITE_GOOGLE_MAPS_API_KEY");
  process.exit(1);
}

const { CSV_PLACES } = await import("../src/data/csvRegistry.js");
const { CSV_COORDS } = await import("../src/data/csvCoords.js");
const { HOTELS } = await import("../src/data/hotels.js");
const { TOP10_SOUVENIRS, SOUVENIR_SHOPPING_DAYS } = await import("../src/data/souvenirs.js");

mkdirSync(outDir, { recursive: true });

const HOTEL_FILE_PREFIXES = ["hotel-danangMain", "hotel-hoiAn", "the-dream-suite", "the-saga-hotel-hoi-an"];

function shouldClearJpeg(name) {
  if (!HOTELS_ONLY) return /\.jpe?g$/i.test(name);
  const base = name.replace(/\.jpe?g$/i, "");
  return HOTEL_FILE_PREFIXES.some((p) => base === p || base.startsWith(`${p}-`));
}

for (const f of readdirSync(outDir)) {
  if (shouldClearJpeg(f)) {
    try {
      unlinkSync(join(outDir, f));
    } catch {
      /* ignore */
    }
  }
}

let existingRefs = {};
let existingManifest = {};
if (HOTELS_ONLY) {
  try {
    const refsMod = await import("../src/data/placePhotoRefs.js");
    existingRefs = refsMod.PLACE_PHOTO_REFS || {};
    const manMod = await import("../src/data/placePhotoManifest.js");
    existingManifest = manMod.PLACE_PHOTO_MANIFEST || {};
  } catch {
    /* first run */
  }
}

const targets = new Map();

function addTarget(id, name, mapsUrl, lat, lng, photoSearchQuery) {
  if (!id || targets.has(id)) return;
  targets.set(id, { id, name, mapsUrl, lat, lng, photoSearchQuery });
}

const isHotelCsv = (p) =>
  /飯店|hotel|住宿/i.test(p.note || "") || /🏘️/.test((p.tags || []).join(" "));

for (const p of CSV_PLACES) {
  if (HOTELS_ONLY && !isHotelCsv(p) && p.id !== "the-dream-suite") continue;
  const c = CSV_COORDS[p.id];
  addTarget(p.id, p.name, p.url, c?.lat, c?.lng);
}

for (const h of Object.values(HOTELS)) {
  const q = h.photoSearchQuery || `${h.name}, ${h.address}`;
  addTarget(`hotel-${h.id}`, h.name, h.mapsUrl, h.lat, h.lng, q);
}

if (!HOTELS_ONLY) {
  for (const d of SOUVENIR_SHOPPING_DAYS) {
    for (const placeName of d.places) {
      const p = CSV_PLACES.find((x) => x.name === placeName);
      const c = p ? CSV_COORDS[p.id] : null;
      addTarget(`souvenir-${placeName}`, placeName, p?.url, c?.lat, c?.lng);
    }
  }
  for (const s of TOP10_SOUVENIRS) {
    addTarget(`souvenir-item-${s.id}`, s.name, null, 16.068, 108.221);
  }
}

const PLACE_PHOTO_REFS = HOTELS_ONLY ? { ...existingRefs } : {};
const manifest = HOTELS_ONLY ? { ...existingManifest } : {};
let ok = 0;
let skip = 0;
let cached = 0;

function photoIdsFromEntry(info) {
  if (info.photoNames?.length) return info.photoNames.slice(0, PHOTOS_PER_PLACE);
  if (info.photoReferences?.length) return info.photoReferences.slice(0, PHOTOS_PER_PLACE);
  return [];
}

if (HOTELS_ONLY) {
  for (const key of [...HOTEL_FILE_PREFIXES, "The Dream Suite", "THE SAGA HOTEL HOI AN"]) {
    delete PLACE_PHOTO_REFS[key];
    delete manifest[key];
  }
}

for (const t of targets.values()) {
  try {
    const placeId = await findPlaceId(t, API_KEY);
    if (!placeId) {
      skip++;
      process.stdout.write("?");
      continue;
    }
    const info = await fetchPlacePhotoRefs(placeId, API_KEY);
    const ids = photoIdsFromEntry(info);
    if (!ids.length) {
      skip++;
      process.stdout.write("o");
      continue;
    }
    PLACE_PHOTO_REFS[t.id] = info;
    if (t.name !== t.id) PLACE_PHOTO_REFS[t.name] = info;
    ok++;
    process.stdout.write(".");

    if (!REFS_ONLY) {
      const safeId = t.id.replace(/[^a-z0-9-]/gi, "-").slice(0, 72);
      const paths = [];
      for (let i = 0; i < ids.length; i++) {
        const buf = await downloadPlacePhoto(ids[i], API_KEY);
        if (buf?.length > 1000) {
          const rel = `/place-photos/${safeId}-${i + 1}.jpg`;
          writeFileSync(join(outDir, `${safeId}-${i + 1}.jpg`), buf);
          paths.push(rel);
          cached++;
          process.stdout.write("+");
        }
        await new Promise((r) => setTimeout(r, 120));
      }
      if (paths.length) {
        manifest[t.id] = paths;
        if (t.name !== t.id) manifest[t.name] = paths;
      }
    }

    await new Promise((r) => setTimeout(r, 180));
  } catch {
    skip++;
    process.stdout.write("x");
  }
}

/** CSV 飯店 slug 與 hotel-* 合併，避免同名不同圖 */
const HOTEL_ALIASES = [
  ["the-dream-suite", "hotel-danangMain"],
  ["the-saga-hotel-hoi-an", "hotel-hoiAn"],
];
for (const [csvId, hotelKey] of HOTEL_ALIASES) {
  if (manifest[hotelKey]) manifest[csvId] = manifest[hotelKey];
  if (PLACE_PHOTO_REFS[hotelKey]) PLACE_PHOTO_REFS[csvId] = PLACE_PHOTO_REFS[hotelKey];
}
for (const h of Object.values(HOTELS)) {
  const key = `hotel-${h.id}`;
  if (manifest[key]) {
    manifest[h.name] = manifest[key];
    manifest[h.csvName] = manifest[key];
  }
  if (PLACE_PHOTO_REFS[key]) {
    PLACE_PHOTO_REFS[h.name] = PLACE_PHOTO_REFS[key];
    PLACE_PHOTO_REFS[h.csvName] = PLACE_PHOTO_REFS[key];
  }
}
delete PLACE_PHOTO_REFS["Elite Riverlight Hotel by Elite24"];
delete manifest["Elite Riverlight Hotel by Elite24"];

writeFileSync(
  refsPath,
  `/** 自動生成：npm run fetch-photos — Places API (New) */
export const PLACE_PHOTO_REFS = ${JSON.stringify(PLACE_PHOTO_REFS, null, 2)};

export function getPlacePhotoRefEntry(key) {
  if (!key) return null;
  return PLACE_PHOTO_REFS[key] || null;
}
`
);

writeFileSync(
  manifestPath,
  `/** 自動生成：npm run fetch-photos — 每站最多 3 張本機 jpg */
export const PLACE_PHOTO_MANIFEST = ${JSON.stringify(manifest, null, 2)};

export function getLocalPhotoPaths(key) {
  const p = PLACE_PHOTO_MANIFEST[key];
  if (!p) return [];
  const list = Array.isArray(p) ? p : [p];
  return list.filter((x) => typeof x === "string" && /\\.jpe?g$/i.test(x));
}

/** @deprecated 使用 getLocalPhotoPaths */
export function getLocalPhotoPath(key) {
  return getLocalPhotoPaths(key)[0] || null;
}
`
);

console.log(`\n完成：${ok} 地點、${cached} 張 jpg（每站最多 ${PHOTOS_PER_PLACE} 張）、${skip} 略過`);
if (!REFS_ONLY && cached === 0) {
  console.error("警告：未下載到 jpg。請確認已啟用 Places API (New) + Place Photos (New)");
}
