#!/usr/bin/env node
/**
 * 以 Google Places API 取得評分、評論數、Top 3 評論 → src/data/placeDetails.js
 * 需 GOOGLE_MAPS_API_KEY 或 VITE_GOOGLE_MAPS_API_KEY
 */
import "./load-env.mjs";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/data/placeDetails.js");
const API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  console.error("請設定 GOOGLE_MAPS_API_KEY 後再執行 npm run fetch-reviews");
  process.exit(1);
}

const { CSV_PLACES } = await import("../src/data/csvRegistry.js");
const { CSV_COORDS } = await import("../src/data/csvCoords.js");

async function findPlaceId(name, lat, lng) {
  const input = encodeURIComponent(`${name} Vietnam`);
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id&locationbias=circle:50000@${lat},${lng}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.candidates?.[0]?.place_id || null;
}

function extractMentioned(reviews) {
  const THEME = [
    [/河粉|pho/i, "河粉"],
    [/景色|view|beautiful|scenic/i, "景色優美"],
    [/服務|staff|friendly/i, "服務好"],
    [/乾淨|clean/i, "乾淨"],
    [/價格|便宜|reasonable|affordable/i, "價格合理"],
    [/早餐|breakfast/i, "早餐"],
    [/位置|location|walking/i, "位置方便"],
    [/海鮮|seafood/i, "海鮮"],
    [/古城|old town/i, "古城"],
    [/咖啡|coffee/i, "咖啡"],
  ];
  const joined = (reviews || []).map((r) => r.text).filter(Boolean).join(" ");
  const out = [];
  for (const [re, label] of THEME) {
    if (re.test(joined) && !out.includes(label)) out.push(label);
    if (out.length >= 6) break;
  }
  return out;
}

async function fetchDetails(placeId) {
  const fields = "rating,user_ratings_total,reviews";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&reviews_sort=newest&language=zh-TW&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") return null;
  const r = data.result;
  const reviews = (r.reviews || []).slice(0, 5).map((rev) => ({
    authorName: rev.author_name,
    rating: rev.rating,
    text: rev.text,
    relativeTime: rev.relative_time_description,
  }));
  return {
    rating: r.rating,
    userRatingCount: r.user_ratings_total,
    mentionedInReviews: extractMentioned(reviews),
    reviews,
  };
}

const details = {};
let ok = 0;
let skip = 0;

for (const p of CSV_PLACES) {
  const coord = CSV_COORDS[p.id];
  if (!coord) {
    skip++;
    continue;
  }
  try {
    const placeId = await findPlaceId(p.name, coord.lat, coord.lng);
    if (!placeId) {
      skip++;
      process.stdout.write("?");
      continue;
    }
    const d = await fetchDetails(placeId);
    if (d) {
      details[p.id] = d;
      details[p.name] = d;
      ok++;
      process.stdout.write(".");
    } else skip++;
    await new Promise((r) => setTimeout(r, 200));
  } catch {
    skip++;
    process.stdout.write("x");
  }
}

writeFileSync(
  outPath,
  `/** 自動生成：npm run fetch-reviews */
export const PLACE_DETAILS = ${JSON.stringify(details, null, 2)};

export function getPlaceDetails(csvIdOrName) {
  return PLACE_DETAILS[csvIdOrName] || null;
}
`
);

console.log(`\nDone: ${ok} places, ${skip} skipped`);
