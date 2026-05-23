#!/usr/bin/env node
/** 產生 itineraryStops.js — Elite Riverlight + Saga · 順路評估（海洲區為中心） */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DAD =
  "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b";
const TPE =
  "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2";

const HTL = "Elite Riverlight Hotel by Elite24";

/** [time, csvName|null, titleOverride, type, transportFromPrev, detail, extra] */
const PLAN = {
  0: [
    ["16:35", null, "桃園機場 IT551 出發", "航班", null, "含於機加酒", { flight: true, mapsUrl: TPE, noMap: true }],
    ["18:10", null, "峴港機場 DAD 抵達", "交通", "飛機", null, { mapsUrl: DAD }],
    ["19:30", null, `入住 · ${HTL}`, "住宿", "Grab 機場", "機加酒 · 僅随身行李", { hotel: "danangMain" }],
    ["20:15", "Nhà hàng Madame Lân", "越式晚餐", "美食", "Grab 短程", "換匯改 Day1 09:00（不趕）", {}],
    ["21:45", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  /** 原 Day3 休閒日 → 首日不排 Klook，上午換匯 */
  1: [
    ["09:00", "Tiệm Vàng Soạn Hà", "換匯（峴港）", "購物", "步行/Grab", "營業 07:00–19:00 · 不趕", {}],
    ["10:00", null, `出發 · ${HTL}`, "住宿", null, "海洲→市中心→美溪", { hotel: "danangMain" }],
    ["10:30", "Da Nang Cathedral", "粉紅大教堂", "景點", "Grab 短程", null, {}],
    ["11:30", "Vincom Plaza Da Nang", "商場吹冷氣", "購物", "Grab", null, {}],
    ["12:30", "Golden Lotus Oriental Organic Spa", "按摩", "體驗", "Grab", "午間休息", {}],
    ["15:00", "Phin Cu Coffee", null, "美食", "Grab", "咖啡", {}],
    ["18:00", "My Hanh Seafood", "美溪海鮮晚餐", "美食", "Grab", null, {}],
    ["21:30", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  2: [
    ["07:00", null, `出發 · ${HTL}`, "住宿", null, "Klook #13283", { hotel: "danangMain", klook: "bana-13283" }],
    ["08:00", "Ba Na Hills SunWorld", "巴拿山", "景點", "Klook 巴士", "門票+雲霄飛車3", { klook: "bana-13283" }],
    ["10:00", "Golden Bridge", "黃金橋", "景點", "園內", null, {}],
    ["12:30", null, "國際自助午餐", "美食", "園內含票", "Klook 已含", {}],
    ["17:00", null, "Klook 巴士返回", "交通", "Klook", null, { klook: "bana-13283" }],
    ["19:00", "Bếp Cuốn Đà Nẵng", null, "美食", "Grab", null, {}],
    ["21:30", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  /** 原 Day1 峴港一日遊 Klook #1573 */
  3: [
    ["08:30", null, `出發 · ${HTL}`, "住宿", null, "Klook #1573 · 09:00 接送", { hotel: "danangMain", klook: "dad-day-1573" }],
    ["09:00", null, "Klook 峴港一日遊", "景點", "Klook 飯店接送", "雙人 NT$1,916", { klook: "dad-day-1573" }],
    ["09:30", "Non Nuoc Pagoda", "努諾可石雕", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["10:15", "The Marble Mountains", "大理石山售票亭", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["11:15", "Chùa Linh Ứng", "靈應寺白佛觀音像", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["12:00", null, "順福橋", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["12:30", "Da Nang Museum of Cham Sculpture", "占婆博物館", "景點", "Tour", null, { klook: "dad-day-1573" }],
    ["13:00", "Han Market", "韓市場", "購物", "Tour", "團末順路", { klook: "dad-day-1573" }],
    ["13:30", null, `返回 · ${HTL}`, "住宿", "Klook", null, { hotel: "danangMain", klook: "dad-day-1573" }],
    ["18:00", "Dragon Bridge", "龍橋", "景點", "Grab", "週末可能有噴火", {}],
    ["19:00", "Bánh Xèo Bà Dưỡng", "越式煎餅", "美食", "Grab", null, {}],
    ["21:30", null, `返回 · ${HTL}`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  4: [
    ["06:30", null, `出發 · ${HTL}（順化團）`, "住宿", null, "Klook #4808", { hotel: "danangMain", klook: "hue-4808" }],
    ["07:00", null, "陵姑灣＆順化一日遊", "景點", "Klook 全程", null, { klook: "hue-4808" }],
    ["12:00", "Hue Imperial City", "順化皇城", "景點", "Tour", null, {}],
    ["13:00", "天姥寺", null, "景點", "Tour", null, {}],
    ["18:00", null, `返回 · ${HTL}`, "住宿", "Klook", null, { hotel: "danangMain", klook: "hue-4808", end: true }],
  ],
  5: [
    ["09:00", null, `出發 · ${HTL}`, "住宿", null, "在地市場體驗", { hotel: "danangMain" }],
    ["09:30", "Con Market", "傳統市場", "體驗", "Grab 短程", null, {}],
    ["11:00", "Bac My An Market", "美安市場", "體驗", "Grab", null, {}],
    ["12:30", "Bánh Mì Ba Lan", "法棍", "美食", "Grab", null, {}],
    ["14:30", "Golden Lotus Oriental Organic Spa", "按摩", "體驗", "Grab", null, {}],
    ["18:00", "Moggumeong", null, "美食", "Grab", "收尾晚餐", {}],
    ["20:30", null, `返回 · ${HTL} · 打包`, "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  6: [
    ["08:00", null, `退房 · ${HTL}`, "住宿", null, null, { hotel: "danangMain", checkout: true }],
    ["09:00", null, "Klook 私人接送 → 會安", "交通", "Klook #182982", null, { klook: "transfer-dad-hoi-182982" }],
    ["11:00", null, "入住 · THE SAGA HOTEL HOI AN", "住宿", "Klook", "寄行李", { hotel: "hoiAn" }],
    ["11:45", "會安市場", "古城午餐", "美食", "Grab→步行", null, {}],
    ["12:45", null, "進古城 · 套票", "景點", "步行", "17:30 前逛完 5 景點", { klook: "pass-72346" }],
    ["13:00", "進記古宅", null, "景點", "步行", "套票 1/5", {}],
    ["13:40", "福建會館", null, "景點", "步行", "套票 2/5", {}],
    ["14:20", "Museum of Folk Culture", "民俗博物館", "景點", "步行", "套票 3/5", {}],
    ["15:00", "Hoi An Museum", "歷史文化博物館", "景點", "步行", "套票 4/5", {}],
    ["15:45", "Chùa Cầu", "日本橋", "景點", "步行", "套票 5/5", {}],
    ["17:30", null, "Teh Dar 取票", "表演", "Grab", "Klook #10213", { klook: "teh-dar-10213" }],
    ["18:00", null, "Teh Dar 西貢歌劇院", "表演", "Klook", null, { klook: "teh-dar-10213" }],
    ["19:30", "越南會安夜市", null, "美食", "Grab/步行", null, {}],
    ["21:00", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  7: [
    ["07:30", null, "出發 · THE SAGA", "住宿", null, "美山團", { hotel: "hoiAn", klook: "myson-1602" }],
    ["08:00", null, "Klook 美山聖地", "景點", "Klook 巴士", null, { klook: "myson-1602" }],
    ["11:30", null, "廣南麵午餐", "美食", "Tour 含", null, {}],
    ["13:30", null, "返回 THE SAGA", "住宿", "Klook", null, { hotel: "hoiAn" }],
    ["14:30", "Thanh Ha Pottery Village, Hoi An", "Thanh Ha 陶藝村", "體驗", "Grab", null, {}],
    ["16:15", "The Center for Culture and Sports of Hoi An city", "民俗音樂舞蹈", "體驗", "Grab→步行", "16:15 免費場", {}],
    ["19:30", "Purple Lantern Restaurant( An Bang Beach Hoi An )", null, "美食", "Grab", null, {}],
    ["21:30", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  8: [
    ["08:30", null, "出發 · THE SAGA", "住宿", null, "Klook #136639", { hotel: "hoiAn", klook: "cooking-136639" }],
    ["08:30", null, "烹飪課＋市場＋竹籃船", "體驗", "Klook 全程", null, { klook: "cooking-136639" }],
    ["14:00", "An Bang Beach", null, "景點", "Grab", null, {}],
    ["15:30", "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )", "燈籠船", "體驗", "Grab→步行", null, {}],
    ["16:30", null, "前往 Hoi An Memories Land", "交通", "Grab", null, { klook: "memories-17514" }],
    ["17:00", "Hoi An Memories Land", "印象秀", "表演", "Klook", null, { klook: "memories-17514" }],
    ["17:30", null, "Non La 燒烤自助", "美食", "園內", "Klook 已含", {}],
    ["21:00", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  9: [
    ["08:00", null, "退房 · THE SAGA", "住宿", null, null, { hotel: "hoiAn", checkout: true }],
    ["09:00", "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park", "燈籠公園", "景點", "Grab", null, {}],
    ["10:15", "The Center for Culture and Sports of Hoi An city", "民俗音樂舞蹈", "體驗", "Grab/步行", "10:15 免費場 · 近古城", {}],
    ["11:00", null, "Klook 會安→峴港", "交通", "Klook", null, { klook: "transfer-hoi-dad-182982" }],
    ["13:00", "Bếp Cuốn Đà Nẵng", "峴港午餐", "美食", "Grab", null, {}],
    ["15:00", null, "峴港機場 DAD", "交通", "Grab 送機", null, { mapsUrl: DAD }],
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
