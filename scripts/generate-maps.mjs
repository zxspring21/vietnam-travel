#!/usr/bin/env node
/**
 * 生成每日 + 全程路線 SVG 至 public/maps/
 * 執行：node scripts/generate-maps.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../public/maps");

const PLACES = {
  tpe: { name: "桃園", lat: 25.0797, lng: 121.2342, city: "taiwan" },
  dad: { name: "峴港機場", lat: 16.0439, lng: 108.1994, city: "danang" },
  myKhe: { name: "美溪沙灘", lat: 16.0544, lng: 108.2498, city: "danang" },
  pinkCathedral: { name: "粉紅教堂", lat: 16.0689, lng: 108.1614, city: "danang" },
  hanMarket: { name: "漢市場", lat: 16.0678, lng: 108.2208, city: "danang" },
  chamMuseum: { name: "占婆館", lat: 16.0603, lng: 108.2203, city: "danang" },
  dragonBridge: { name: "龍橋", lat: 16.0614, lng: 108.2275, city: "danang" },
  banaHills: { name: "巴拿山", lat: 15.995, lng: 107.9892, city: "danang" },
  goldenBridge: { name: "金橋", lat: 15.995, lng: 107.9964, city: "danang" },
  marbleMountains: { name: "五行山", lat: 16.0039, lng: 108.2633, city: "danang" },
  ladyBuddha: { name: "觀音", lat: 16.1, lng: 108.2775, city: "danang" },
  intercontinental: { name: "洲際", lat: 16.12, lng: 108.3, city: "danang" },
  sixOnSix: { name: "SIX ON SIX", lat: 16.055, lng: 108.215, city: "danang" },
  madameLan: { name: "Madame Lân", lat: 16.058, lng: 108.218, city: "danang" },
  escoBeach: { name: "Esco", lat: 16.052, lng: 108.248, city: "danang" },
  banhXeo: { name: "煎餅", lat: 16.062, lng: 108.21, city: "danang" },
  bepCuon: { name: "Bếp Cuốn", lat: 16.064, lng: 108.219, city: "danang" },
  thiaGo: { name: "Thìa Gỗ", lat: 16.065, lng: 108.225, city: "danang" },
  luxurySpa: { name: "Spa", lat: 16.06, lng: 108.22, city: "danang" },
  hoiAnTown: { name: "會安古城", lat: 15.877, lng: 108.3269, city: "hoian" },
  japaneseBridge: { name: "日本橋", lat: 15.8775, lng: 108.3263, city: "hoian" },
  anBang: { name: "安邦沙灘", lat: 15.9034, lng: 108.3528, city: "hoian" },
  vinWonders: { name: "VinWonders", lat: 15.8407, lng: 108.3678, city: "hoian" },
  hoiAnMemories: { name: "印象秀", lat: 15.8736, lng: 108.3689, city: "hoian" },
  anantara: { name: "Anantara", lat: 15.872, lng: 108.335, city: "hoian" },
  rosies: { name: "Rosie's", lat: 15.8772, lng: 108.3275, city: "hoian" },
  banhMiSum: { name: "法包", lat: 15.878, lng: 108.328, city: "hoian" },
  purpleLantern: { name: "Purple", lat: 15.903, lng: 108.353, city: "hoian" },
  haiVanPass: { name: "海雲關", lat: 16.2, lng: 108.13, city: "transfer" },
  lapAnLagoon: { name: "立安潭", lat: 16.2833, lng: 108.0833, city: "transfer" },
  hueImperial: { name: "皇城", lat: 16.4696, lng: 107.5796, city: "hue" },
  thienMu: { name: "天姥寺", lat: 16.4534, lng: 107.545, city: "hue" },
  khaiDinh: { name: "啟定陵", lat: 16.3988, lng: 107.5901, city: "hue" },
  azeraiHue: { name: "Azerai", lat: 16.465, lng: 107.59, city: "hue" },
  yThao: { name: "Y Thao", lat: 16.465, lng: 107.585, city: "hue" },
  madamThu: { name: "Madam Thu", lat: 16.468, lng: 107.582, city: "hue" },
};

const COLORS = { danang: "#3D8B8B", hoian: "#D1A153", hue: "#9B84C4", transfer: "#C8975A", taiwan: "#6C757D" };

const DAILY_KEYS = [
  ["tpe", "dad", "myKhe"],
  ["sixOnSix", "pinkCathedral", "hanMarket", "chamMuseum", "madameLan", "myKhe"],
  ["myKhe", "banaHills", "goldenBridge", "bepCuon", "dragonBridge"],
  ["myKhe", "marbleMountains", "banhXeo", "hoiAnTown", "anantara"],
  ["rosies", "japaneseBridge", "hoiAnTown", "banhMiSum"],
  ["anantara", "anBang", "purpleLantern", "hoiAnMemories"],
  ["anantara", "vinWonders", "hoiAnTown"],
  ["hoiAnTown", "haiVanPass", "lapAnLagoon", "azeraiHue", "yThao"],
  ["azeraiHue", "hueImperial", "thienMu", "madamThu", "khaiDinh", "intercontinental"],
  ["intercontinental", "ladyBuddha", "thiaGo", "luxurySpa", "myKhe"],
  ["intercontinental", "hanMarket", "dad", "tpe"],
];

const DAILY_META = [
  { day: 0, date: "6/11", title: "抵達峴港" },
  { day: 1, date: "6/12", title: "峴港市區" },
  { day: 2, date: "6/13", title: "巴拿山" },
  { day: 3, date: "6/14", title: "五行山→會安" },
  { day: 4, date: "6/15", title: "會安古城" },
  { day: 5, date: "6/16", title: "安邦+印象秀" },
  { day: 6, date: "6/17", title: "VinWonders" },
  { day: 7, date: "6/18", title: "海雲嶺→順化" },
  { day: 8, date: "6/19", title: "順化→峴港" },
  { day: 9, date: "6/20", title: "山茶半島" },
  { day: 10, date: "6/21", title: "返程" },
];

function projectPoints(keys, width = 640, height = 360, padding = 48) {
  const pts = keys.map((k) => PLACES[k]).filter(Boolean);
  if (!pts.length) return { points: [], labels: [] };

  const lats = pts.map((p) => p.lat);
  const lngs = pts.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = maxLat - minLat || 0.01;
  const lngRange = maxLng - minLng || 0.01;

  const projected = pts.map((p, i) => ({
    x: padding + ((p.lng - minLng) / lngRange) * (width - 2 * padding),
    y: height - padding - ((p.lat - minLat) / latRange) * (height - 2 * padding),
    name: p.name,
    city: p.city,
    idx: i + 1,
  }));

  return { points: projected, labels: pts.map((p) => p.name) };
}

function buildSvg(keys, meta, id) {
  const W = 640, H = 380;
  const { points } = projectPoints(keys, W, H - 40);
  const title = meta ? `Day ${meta.day} · ${meta.date} — ${meta.title}` : "11天全程路線";

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const nodes = points
    .map((p) => {
      const c = COLORS[p.city] || "#C8975A";
      return `
    <circle cx="${p.x}" cy="${p.y}" r="10" fill="${c}" stroke="#fff" stroke-width="2"/>
    <text x="${p.x}" y="${p.y - 14}" text-anchor="middle" fill="#f5edd6" font-size="11" font-family="sans-serif">${p.idx}</text>
    <text x="${p.x}" y="${p.y + 24}" text-anchor="middle" fill="rgba(245,237,214,0.7)" font-size="9" font-family="sans-serif">${p.name}</text>`;
    })
    .join("");

  const arrows = points
    .slice(0, -1)
    .map((p, i) => {
      const n = points[i + 1];
      const mx = (p.x + n.x) / 2;
      const my = (p.y + n.y) / 2;
      return `<text x="${mx}" y="${my - 4}" fill="#C8975A" font-size="12" text-anchor="middle">→</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#091118"/>
      <stop offset="100%" style="stop-color:#160f0a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})" rx="12"/>
  <text x="${W / 2}" y="28" text-anchor="middle" fill="#C8975A" font-size="14" font-weight="bold" font-family="sans-serif">${title}</text>
  <polyline points="${polyline}" fill="none" stroke="#C8975A" stroke-width="2" stroke-dasharray="6,4" opacity="0.6"/>
  ${arrows}
  ${nodes}
  <text x="${W / 2}" y="${H - 8}" text-anchor="middle" fill="rgba(245,237,214,0.4)" font-size="10" font-family="sans-serif">中越旅遊路線圖 · 非比例示意</text>
</svg>`;
}

mkdirSync(OUT_DIR, { recursive: true });

DAILY_KEYS.forEach((keys, i) => {
  const svg = buildSvg(keys, DAILY_META[i], `day-${i}`);
  writeFileSync(join(OUT_DIR, `day-${i}.svg`), svg);
  console.log(`✓ day-${i}.svg`);
});

const overallKeys = [
  "dad", "myKhe", "banaHills", "marbleMountains", "hoiAnTown", "anBang", "vinWonders",
  "haiVanPass", "hueImperial", "khaiDinh", "intercontinental",
];
writeFileSync(join(OUT_DIR, "overall.svg"), buildSvg(overallKeys, null, "overall"));
console.log("✓ overall.svg");
console.log(`\nGenerated ${DAILY_KEYS.length + 1} maps in public/maps/`);
