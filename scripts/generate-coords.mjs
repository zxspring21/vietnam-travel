#!/usr/bin/env node
/**
 * 產生 csvCoords.js
 * 有 GOOGLE_MAPS_API_KEY 時用 Find Place 取得真實座標；否則用關鍵字猜測（較不準）
 */
import "./load-env.mjs";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
const { CSV_PLACES } = await import("../src/data/csvRegistry.js");

const CITY_CENTER = {
  danang: { lat: 16.0544, lng: 108.1994 },
  hoian: { lat: 15.877, lng: 108.327 },
  hue: { lat: 16.4637, lng: 107.5909 },
  transfer: { lat: 16.2, lng: 108.13 },
};

const KNOWN = [
  [/phở|pho bắc/i, { lat: 16.067, lng: 108.221 }],
  [/han market|漢市場/i, { lat: 16.0678, lng: 108.2208 }],
  [/con market/i, { lat: 16.064, lng: 108.219 }],
  [/cathedral|大教堂/i, { lat: 16.0689, lng: 108.1614 }],
  [/cham|占婆/i, { lat: 16.0603, lng: 108.2203 }],
  [/dragon|龍橋/i, { lat: 16.0614, lng: 108.2275 }],
  [/bana|巴拿/i, { lat: 15.995, lng: 107.9892 }],
  [/golden bridge|金橋/i, { lat: 15.995, lng: 107.9964 }],
  [/marble|五行/i, { lat: 16.0039, lng: 108.2633 }],
  [/hoi an ancient|會安古城/i, { lat: 15.877, lng: 108.3269 }],
  [/chùa cầu|日本橋/i, { lat: 15.8775, lng: 108.3263 }],
  [/an bang|安邦/i, { lat: 15.9034, lng: 108.3528 }],
  [/memories|印象/i, { lat: 15.8736, lng: 108.3689 }],
  [/hai van|海雲/i, { lat: 16.2, lng: 108.13 }],
  [/立安|lap an/i, { lat: 16.2833, lng: 108.0833 }],
  [/hue imperial|皇城|citadel/i, { lat: 16.4696, lng: 107.5796 }],
  [/thien mu|天姥/i, { lat: 16.4534, lng: 107.545 }],
  [/khai dinh|啟定/i, { lat: 16.3988, lng: 107.5901 }],
  [/minh mang|明命/i, { lat: 16.4125, lng: 107.565 }],
  [/tu duc|嗣德/i, { lat: 16.4333, lng: 107.561 }],
  [/lady buddha|觀音|linh ứng|靈應/i, { lat: 16.1, lng: 108.2775 }],
  [/my son|美山/i, { lat: 15.7644, lng: 108.1247 }],
  [/thanh ha|陶瓷/i, { lat: 15.878, lng: 108.345 }],
  [/museum of trade ceramics|陶瓷貿易/i, { lat: 15.8771, lng: 108.3284 }],
  [/hoi an museum|歷史文化博物館/i, { lat: 15.8778, lng: 108.3268 }],
  [/six on six/i, { lat: 16.055, lng: 108.215 }],
  [/tiệm vàng|soạn hà|換匯/i, { lat: 15.8792, lng: 108.3298 }],
  [/beach|沙灘|esco/i, { lat: 16.052, lng: 108.248 }],
];

function placeNameFromUrl(url) {
  if (!url) return null;
  try {
    const m = url.match(/\/place\/([^/]+)/);
    if (m) return decodeURIComponent(m[1].replace(/\+/g, " "));
  } catch {
    /* ignore */
  }
  return null;
}

function guessCity(name, tags) {
  const s = `${name} ${(tags || []).join(" ")}`;
  if (/hue|順化|huế|皇|陵|天姥/i.test(s)) return "hue";
  if (/hoi an|會安|hội an|安邦|an bang/i.test(s)) return "hoian";
  if (/海雲|立安|hai van|lap an/i.test(s)) return "transfer";
  if (/marble|五行|峴|da nang|lady|bana|巴拿/i.test(s)) return "danang";
  if (/hoi an|會安|廣肇|福建|進記|燈籠船/i.test(s)) return "hoian";
  return "danang";
}

function guessCoord(name, tags) {
  for (const [re, c] of KNOWN) {
    if (re.test(name)) return c;
  }
  return CITY_CENTER[guessCity(name, tags)];
}

async function geocodeViaPlaces(name, url) {
  if (!API_KEY) return null;
  const fromUrl = placeNameFromUrl(url);
  const query = encodeURIComponent(`${fromUrl || name}, Vietnam`);
  const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=geometry&key=${API_KEY}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const loc = data.candidates?.[0]?.geometry?.location;
    if (loc?.lat != null && loc?.lng != null) return { lat: loc.lat, lng: loc.lng };
  } catch {
    /* fallback */
  }
  return null;
}

const CSV_COORDS = {};
let geocoded = 0;
let guessed = 0;

for (const p of CSV_PLACES) {
  let c = await geocodeViaPlaces(p.name, p.url);
  if (c) {
    geocoded++;
    process.stdout.write(".");
  } else {
    c = guessCoord(p.name, p.tags);
    guessed++;
    process.stdout.write("?");
  }
  CSV_COORDS[p.id] = { name: p.name, lat: c.lat, lng: c.lng };
  if (API_KEY) await new Promise((r) => setTimeout(r, 120));
}

const body = `/** 自動生成：npm run generate-coords（Places API 或關鍵字猜測） */
export const CSV_COORDS = ${JSON.stringify(CSV_COORDS, null, 2)};

export function getCoordByCsvName(name) {
  const p = Object.values(CSV_COORDS).find((x) => x.name === name);
  return p ? { lat: p.lat, lng: p.lng } : null;
}

export function getCoordByCsvId(id) {
  const p = CSV_COORDS[id];
  return p ? { lat: p.lat, lng: p.lng } : null;
}
`;

writeFileSync(join(__dirname, "../src/data/csvCoords.js"), body);
console.log(`\nWrote ${Object.keys(CSV_COORDS).length} coords (${geocoded} geocoded, ${guessed} guessed)`);
