#!/usr/bin/env node
/** 產生 itineraryStops.js — The Dream Suite (An Hải) + Saga */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DAD =
  "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b";
const TPE =
  "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2";

const HTL = "The Dream Suite";
const BANA_MEET = "A La Carte Danang Beach";

/** [time, csvName|null, titleOverride, type, transportFromPrev, detail, extra] */
const PLAN = {
  0: [
    ["16:35", null, "桃園機場 IT551 出發", "航班", null, "含於機加酒", { flight: true, mapsUrl: TPE, noMap: true }],
    ["18:10", null, "峴港機場 DAD 抵達", "交通", "飛機", null, { mapsUrl: DAD }],
    ["19:30", null, `入住 · ${HTL}`, "住宿", "Grab 機場", "An Hải · 美溪東岸", { hotel: "danangMain" }],
    ["20:30", "Esco Beach, Bar Lounge & Restaurant", "海灘晚餐", "美食", "Grab 短程", "近飯店", {}],
    ["21:45", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  1: [
    ["09:00", "Tiệm Vàng Soạn Hà", "換匯（峴港）", "購物", "Grab 海洲", "07:00–19:00", {}],
    ["10:15", "Da Nang Cathedral", "粉紅大教堂", "景點", "Grab", null, {}],
    ["11:15", "Vincom Plaza Da Nang", "商場", "購物", "Grab", null, {}],
    ["12:30", "Phin Cu Coffee", null, "美食", "Grab", "午餐", {}],
    ["14:00", "Golden Lotus Oriental Organic Spa", "按摩", "體驗", "Grab", null, {}],
    ["18:00", "My Hanh Seafood", "美溪海鮮", "美食", "Grab 短程", "近 Dream Suite", {}],
    ["21:00", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  2: [
    ["07:15", null, `出發 · ${HTL}`, "住宿", "Grab", "前往集合點", { hotel: "danangMain", klook: "bana-13283" }],
    ["07:45", BANA_MEET, "巴拿山巴士集合", "交通", "步行/Grab", "200 Võ Nguyên Giáp", { klook: "bana-13283" }],
    ["08:30", null, "巴士出發 · 巴拿山", "交通", "Klook", null, { klook: "bana-13283" }],
    ["09:00", "Ba Na Hills SunWorld", "巴拿山", "景點", "纜車", "門票+纜車", { klook: "bana-13283" }],
    ["10:30", "Golden Bridge", "黃金橋", "景點", "園內", null, {}],
    ["12:30", null, "園內午餐", "美食", "園內", "可自費或輕食", {}],
    ["14:00", null, "Luna 城堡·法國村·Helios 等", "景點", "園內", "依體力選逛", { klook: "bana-13283" }],
    ["16:30", null, "巴士返回集合點", "交通", "Klook", null, { klook: "bana-13283" }],
    ["17:15", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain" }],
    ["19:00", "Thèm Hải Sản", "海鮮晚餐", "美食", "Grab 短程", "An Hải", {}],
    ["21:00", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  3: [
    ["08:30", null, `等候 · ${HTL}`, "住宿", null, "Klook 09:00 接送", { hotel: "danangMain", klook: "dad-day-1573" }],
    ["09:00", null, "Klook 峴港一日遊", "景點", "飯店接送", "Dream Suite 出發", { klook: "dad-day-1573" }],
    ["09:30", "Non Nuoc Pagoda", "努諾可石雕", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["10:15", "The Marble Mountains", "大理石山", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["11:15", "Chùa Linh Ứng", "靈應寺白佛", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["12:00", null, "順福橋", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["12:30", "Da Nang Museum of Cham Sculpture", "占婆博物館", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["13:00", "Han Market", "韓市場", "購物", "Tour", null, { klook: "dad-day-1573" }],
    ["13:30", null, `返回 · ${HTL}`, "住宿", "Klook", null, { hotel: "danangMain", klook: "dad-day-1573" }],
    ["18:00", "Dragon Bridge", "龍橋", "景點", "Grab", "週末噴火", {}],
    ["19:00", "Bánh Xèo Bà Dưỡng", "煎餅晚餐", "美食", "Grab", null, {}],
    ["21:00", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  4: [
    ["07:30", null, `出發 · ${HTL}`, "住宿", null, "Klook 08:00 接送", { hotel: "danangMain", klook: "hue-4808" }],
    ["08:00", null, "陵姑灣＆順化一日遊", "景點", "Klook", "Dream Suite 上車", { klook: "hue-4808" }],
    ["12:00", "Hue Imperial City", "順化皇城", "景點", "Tour", null, {}],
    ["13:00", "天姥寺", null, "景點", "Tour", null, {}],
    ["18:00", null, `返回 · ${HTL}`, "住宿", "Klook", null, { hotel: "danangMain", klook: "hue-4808", end: true }],
  ],
  5: [
    ["09:00", null, `出發 · ${HTL}`, "住宿", null, "美溪散步·輕鬆", { hotel: "danangMain" }],
    ["09:30", null, "美溪沙灘散步", "體驗", "步行", "飯店旁", {}],
    ["11:00", "Han Market", "韓市場", "體驗", "Grab", "順路小逛", {}],
    ["12:30", "Esco Beach, Bar Lounge & Restaurant", "午餐", "美食", "Grab 短程", null, {}],
    ["14:30", "Golden Lotus Oriental Organic Spa", "按摩", "體驗", "Grab", "打包前", {}],
    ["18:00", "Thèm Hải Sản", "晚餐", "美食", "Grab", "近飯店", {}],
    ["20:00", null, `返回 · ${HTL} · 打包`, "住宿", null, null, { hotel: "danangMain", end: true }],
  ],
  6: [
    ["08:00", null, `退房 · ${HTL}`, "住宿", null, null, { hotel: "danangMain", checkout: true }],
    ["09:00", null, "Klook 私人接送 → 會安", "交通", "Klook", "Dream Suite", { klook: "transfer-dad-hoi-182982" }],
    ["11:00", null, "入住 · THE SAGA HOTEL HOI AN", "住宿", "Klook", null, { hotel: "hoiAn" }],
    ["12:00", "會安市場", "古城午餐", "美食", "Grab→步行", null, {}],
    ["12:45", null, "進古城 · 套票", "景點", "步行", "17:30 前", { klook: "pass-72346" }],
    ["13:00", "進記古宅", null, "景點", "步行", "套票 1/5", {}],
    ["13:40", "福建會館", null, "景點", "步行", "套票 2/5", {}],
    ["14:20", "Museum of Folk Culture", "民俗博物館", "景點", "步行", "套票 3/5", {}],
    ["15:00", "Hoi An Museum", "歷史博物館", "景點", "步行", "套票 4/5", {}],
    ["15:45", "Chùa Cầu", "日本橋", "景點", "步行", "套票 5/5", {}],
    ["17:30", null, "Teh Dar 取票", "表演", "Grab", null, { klook: "teh-dar-10213" }],
    ["18:00", null, "Teh Dar 西貢歌劇院", "表演", "Klook", null, { klook: "teh-dar-10213" }],
    ["19:30", "越南會安夜市", "晚餐", "美食", "步行", null, {}],
    ["21:00", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  7: [
    ["07:30", null, "出發 · THE SAGA", "住宿", null, "美山", { hotel: "hoiAn", klook: "myson-1602" }],
    ["08:00", null, "Klook 美山聖地", "景點", "Klook", null, { klook: "myson-1602" }],
    ["11:30", null, "廣南麵午餐", "美食", "Tour", null, {}],
    ["13:30", null, "返回 THE SAGA", "住宿", "Klook", null, { hotel: "hoiAn" }],
    ["14:30", "Thanh Ha Pottery Village, Hoi An", "陶藝村", "體驗", "Grab", null, {}],
    ["16:15", "The Center for Culture and Sports of Hoi An city", "民俗表演", "體驗", "Grab→步行", "16:15 免費", {}],
    ["18:30", "HOME Hoi An", "古鎮晚餐", "美食", "Grab→步行", "慢逛古城", {}],
    ["21:00", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  8: [
    ["08:30", null, "出發 · THE SAGA", "住宿", null, "烹飪課", { hotel: "hoiAn", klook: "cooking-136639" }],
    ["08:30", null, "烹飪課＋市場＋竹籃船", "體驗", "Klook", "全日", { klook: "cooking-136639" }],
    ["14:30", "Hoi An ancient town", "古鎮慢遊", "景點", "Grab→步行", "非套票·街景", {}],
    ["15:30", "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )", "燈籠船", "體驗", "步行", null, {}],
    ["16:30", null, "前往 Memories Land", "交通", "Grab", null, { klook: "memories-17514" }],
    ["17:00", "Hoi An Memories Land", "印象秀", "表演", "Klook", null, { klook: "memories-17514" }],
    ["17:30", null, "Non La 燒烤自助", "美食", "園內", "Klook 已含", {}],
    ["21:00", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  9: [
    ["08:00", null, "退房 · THE SAGA", "住宿", null, null, { hotel: "hoiAn", checkout: true }],
    ["08:30", "An Bang Beach", "An Bang 半日", "景點", "Grab", "最後一天慢遊", {}],
    ["10:30", "Pause and Enjoy Restaurant", "午餐", "美食", "Grab", "An Bang", {}],
    ["11:00", null, "Klook 會安→峴港", "交通", "Klook", null, { klook: "transfer-hoi-dad-182982" }],
    ["13:00", null, "峴港機場 DAD", "交通", "Grab/Klook", "送機", { mapsUrl: DAD }],
    ["19:00", null, "IT552 返桃園", "航班", "飛機", null, { flight: true, mapsUrl: TPE, noMap: true }],
  ],
};

const KLOOK_URLS = {
  "dad-day-1573": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/",
  "bana-13283": "https://www.klook.com/zh-TW/activity/13283-ba-na-hills-ticket-da-nang/",
  "hue-4808": "https://www.klook.com/zh-TW/activity/4808-hue-day-tour-da-nang/",
  "myson-1602": "https://www.klook.com/zh-TW/activity/1602-my-son-discovery-hoi-an/",
  "memories-17514": "https://www.klook.com/zh-TW/activity/17514-hoi-an-memories-show-ticket/",
  "transfer-dad-hoi-182982":
    "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/",
  "transfer-hoi-dad-182982":
    "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/",
  "cooking-136639":
    "https://www.klook.com/zh-TW/activity/136639-coconut-forest-basket-boat-cooking-class-hoian/",
  "teh-dar-10213": "https://www.klook.com/zh-TW/activity/10213-teh-dar-show-ticket-hoi-an/",
  "pass-72346": "https://www.klook.com/zh-TW/activity/72346-hoi-an-ancient-town-attractions-adminssion-ticket/",
};

function buildStop([time, csvName, title, type, transport, detail, extra = {}]) {
  const s = {
    time,
    type,
    transportFromPrev: transport || undefined,
    detail: typeof detail === "string" ? detail : "",
  };
  if (csvName) {
    s.csvName = csvName;
    s.title = title || csvName;
  } else {
    s.title = title;
  }
  if (extra.mapsUrl) s.mapsUrl = extra.mapsUrl;
  if (extra.noMap) s.noMap = true;
  if (extra.flight) s.isFlight = true;
  if (extra.hotel) {
    s.isHotel = true;
    s.hotelId = extra.hotel;
    s.inCsv = true;
  }
  if (extra.klook) {
    s.klookId = extra.klook;
    s.klookUrl = KLOOK_URLS[extra.klook];
  }
  if (extra.checkout) s.checkout = true;
  if (extra.end) s.end = true;
  return s;
}

const DAY_STOPS = {};
for (const [day, legs] of Object.entries(PLAN)) {
  DAY_STOPS[day] = legs.map(buildStop);
}

const names = new Set();
for (const legs of Object.values(PLAN)) {
  for (const leg of legs) {
    if (leg[1]) names.add(leg[1]);
  }
}

const out = `/**
 * 每日站點 — 自動生成（npm run build-stops）
 * 行程 6/11–6/20 · CSV 景點：${names.size} 個
 */
const DAD = ${JSON.stringify(DAD)};
const TPE = ${JSON.stringify(TPE)};

export const DAY_STOPS = ${JSON.stringify(DAY_STOPS, null, 2)};

export const ITINERARY_CSV_COUNT = ${names.size};
`;

writeFileSync(join(__dirname, "../src/data/itineraryStops.js"), out);
console.log(`Wrote itineraryStops.js — ${names.size} unique CSV places, days 0–9`);
