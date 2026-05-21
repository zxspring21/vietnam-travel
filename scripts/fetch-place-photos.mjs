#!/usr/bin/env node
/**
 * 依座標下載 Google Static Maps 預覽圖 → public/place-photos/
 * 需 GOOGLE_MAPS_API_KEY 或 VITE_GOOGLE_MAPS_API_KEY；無 key 時產生 SVG 占位（不用 OSM 瓦片）
 */
import "./load-env.mjs";
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/place-photos");
const manifestPath = join(__dirname, "../src/data/placePhotoManifest.js");

const API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

const { CSV_PLACES } = await import("../src/data/csvRegistry.js");
const { CSV_COORDS } = await import("../src/data/csvCoords.js");

mkdirSync(outDir, { recursive: true });

function staticMapUrl(lat, lng) {
  const center = `${lat},${lng}`;
  const marker = `color:0xC8975A%7C${lat},${lng}`;
  return `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=16&size=640x400&scale=2&maptype=roadmap&markers=${marker}&key=${API_KEY}`;
}

function svgPlaceholder(id, lat, lng, title) {
  const label = (title || id).slice(0, 28).replace(/[<>&]/g, "");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a2520"/>
      <stop offset="100%" style="stop-color:#3d2818"/>
    </linearGradient>
  </defs>
  <rect width="640" height="400" fill="url(#g)"/>
  <circle cx="320" cy="180" r="36" fill="none" stroke="#C8975A" stroke-width="3"/>
  <circle cx="320" cy="180" r="8" fill="#C8975A"/>
  <text x="320" y="260" text-anchor="middle" fill="#f5edd6" font-family="system-ui,sans-serif" font-size="18" font-weight="600">${label}</text>
  <text x="320" y="290" text-anchor="middle" fill="#9a8b7a" font-family="system-ui,sans-serif" font-size="13">${lat.toFixed(4)}, ${lng.toFixed(4)}</text>
</svg>`;
}

function writeSvg(id, lat, lng, title) {
  const dest = join(outDir, `${id}.svg`);
  writeFileSync(dest, svgPlaceholder(id, lat, lng, title));
  return `/place-photos/${id}.svg`;
}

async function savePreview(id, lat, lng, title) {
  if (API_KEY) {
    try {
      const res = await fetch(staticMapUrl(lat, lng));
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        const dest = join(outDir, `${id}.jpg`);
        writeFileSync(dest, buf);
        return `/place-photos/${id}.jpg`;
      }
    } catch {
      /* Static Maps 失敗時改 SVG，不讓 manifest 空白 */
    }
  }
  return writeSvg(id, lat, lng, title);
}

const manifest = {};
let ok = 0;
let fail = 0;

if (!API_KEY) {
  console.warn("⚠️  未設定 GOOGLE_MAPS_API_KEY — 將產生 SVG 占位圖（非 OSM 瓦片）");
}

for (const p of CSV_PLACES) {
  const coord = CSV_COORDS[p.id];
  if (!coord) {
    fail++;
    continue;
  }
  try {
    const path = await savePreview(p.id, coord.lat, coord.lng, p.name);
    manifest[p.id] = path;
    manifest[p.name] = path;
    ok++;
    process.stdout.write(".");
    if (API_KEY) await new Promise((r) => setTimeout(r, 80));
  } catch {
    fail++;
    process.stdout.write("x");
  }
}

const hotels = {
  "hotel-danangMain": { lat: 16.0522, lng: 108.2465, title: "Awaken Danang 148 Vo Nguyen Giap" },
  "hotel-hoiAn": { lat: 15.8878, lng: 108.3472, title: "THE SAGA 321 Cua Dai Hoi An" },
};
for (const [id, c] of Object.entries(hotels)) {
  try {
    manifest[id] = await savePreview(id, c.lat, c.lng, c.title);
    ok++;
    if (API_KEY) await new Promise((r) => setTimeout(r, 80));
  } catch {
    fail++;
  }
}

writeFileSync(
  manifestPath,
  `/** 自動生成：npm run fetch-photos（Google Static Maps 或 SVG 占位） */
export const PLACE_PHOTO_MANIFEST = ${JSON.stringify(manifest, null, 2)};

export function getLocalPhotoPath(csvIdOrName) {
  return PLACE_PHOTO_MANIFEST[csvIdOrName] || null;
}
`
);

console.log(`\nDone: ${ok} ok, ${fail} fail`);
