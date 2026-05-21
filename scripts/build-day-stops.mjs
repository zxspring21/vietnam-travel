#!/usr/bin/env node
/** 產生 itineraryStops.js — 依已訂 Klook + Awaken/Saga（6/11–6/20） */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DAD =
  "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b";
const TPE =
  "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2";

/** [time, csvName|null, titleOverride, type, transportFromPrev, detail, extra] */
const PLAN = {
  0: [
    ["16:35", null, "桃園機場 IT551 出發", "航班", null, "虎航 · 每人 NT$10,138 手提", { flight: true, mapsUrl: TPE, noMap: true }],
    ["18:10", null, "峴港機場 DAD 抵達", "交通", "飛機", null, { mapsUrl: DAD }],
    ["19:30", null, "入住 · Awaken Danang", "住宿", "Grab 機場", "機加酒", { hotel: "danangMain" }],
    ["20:30", "Esco Beach, Bar Lounge & Restaurant", null, "美食", "Grab", "近美溪沙灘", {}],
    ["21:30", null, "返回 · Awaken Danang", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  1: [
    ["08:00", null, "出發 · Awaken Danang", "住宿", null, null, { hotel: "danangMain" }],
    ["09:00", "SIX ON SIX CAFE - BRUNCH & RESTAURANT", null, "美食", "Grab", null, {}],
    ["10:15", "Da Nang Cathedral", "粉紅大教堂", "景點", "Grab", null, {}],
    ["11:00", "Han Market", "漢市場", "購物", "Grab", "可少額換匯", {}],
    ["12:30", "Nhà hàng Madame Lân", null, "美食", "Grab", null, {}],
    ["14:30", "Da Nang Museum of Cham Sculpture", null, "景點", "Grab", null, {}],
    ["17:30", "Esco Beach, Bar Lounge & Restaurant", "美溪夕陽晚餐", "美食", "Grab", "近飯店", {}],
    ["21:00", "Dragon Bridge", "龍橋", "景點", "Grab", null, {}],
    ["22:00", null, "返回 · Awaken Danang", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  2: [
    ["07:00", null, "出發 · Awaken Danang", "住宿", null, "Klook #13283 接駁", { hotel: "danangMain", klook: "bana-13283" }],
    ["08:00", "巴拿山奇幻樂園", "太陽世界巴拿山", "景點", "Klook 往返巴士", "門票+雲霄飛車3", { klook: "bana-13283" }],
    ["10:00", "Golden Bridge", "黃金橋", "景點", "園內", null, {}],
    ["12:30", null, "國際自助午餐", "美食", "園內含票", "Klook 已含", {}],
    ["17:00", null, "Klook 巴士返回峴港", "交通", "Klook 往返巴士", null, { klook: "bana-13283" }],
    ["19:00", "Bếp Cuốn Đà Nẵng", null, "美食", "Grab", null, {}],
    ["21:30", null, "返回 · Awaken Danang", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  3: [
    ["09:00", null, "出發 · Awaken Danang", "住宿", null, null, { hotel: "danangMain" }],
    ["10:00", "Lady Buddha", null, "景點", "Grab", null, {}],
    ["12:00", "My Hanh Seafood", null, "美食", "Grab", "山茶半島回程順路", {}],
    ["14:00", "Luxury Herbal Spa", null, "體驗", "Grab", null, {}],
    ["17:00", "Con Market", null, "購物", "Grab", null, {}],
    ["19:00", "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑", null, "美食", "Grab", "近美溪", {}],
    ["21:30", null, "返回 · Awaken Danang", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  4: [
    ["06:30", null, "出發 · Awaken（Klook 順化團）", "住宿", null, "Klook #4808", { hotel: "danangMain", klook: "hue-4808" }],
    ["07:00", null, "陵姑灣＆順化一日遊", "景點", "Klook 全程", "含交通", { klook: "hue-4808" }],
    ["12:00", "Hue Imperial City", "順化皇城", "景點", "Tour", null, {}],
    ["13:00", "天姥寺", null, "景點", "Tour", null, {}],
    ["18:00", null, "返回峴港 · Awaken", "住宿", "Klook 巴士", null, { hotel: "danangMain", klook: "hue-4808", end: true }],
  ],
  5: [
    ["09:00", null, "出發 · Awaken Danang", "住宿", null, "最後峴港日", { hotel: "danangMain" }],
    ["10:00", "Con Market", "伴手禮", "購物", "Grab", null, {}],
    ["12:00", "Bac My An Market", null, "美食", "Grab", null, {}],
    ["14:00", "Nguon Spa Da Nang - Nguồn Hoàng Kế Viêm", null, "體驗", "Grab", null, {}],
    ["18:00", "Vietnam Daily Cuisine", null, "美食", "Grab", "近飯店", {}],
    ["21:00", null, "返回 · Awaken · 整理行李", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  6: [
    ["08:00", null, "退房 · Awaken Danang", "住宿", null, null, { hotel: "danangMain", checkout: true }],
    ["09:00", null, "Klook 私人接送 → 會安", "交通", "Klook #182982", "NT$340/2人", { klook: "transfer-dad-hoi-182982" }],
    ["11:00", null, "入住 · THE SAGA HOTEL HOI AN", "住宿", "Klook 接送", null, { hotel: "hoiAn" }],
    ["12:30", "Firefly Restaurant & Bar", null, "美食", "Grab 短程", "Cửa Đại 方向", {}],
    ["14:00", "Hoi An ancient town", "古鎮套票入場", "景點", "Grab→步行", "Klook 72346", { klook: "pass-72346" }],
    ["16:00", "Chùa Cầu", "日本橋", "景點", "步行", "套票", {}],
    ["17:00", "Tiệm Vàng Soạn Hà", "換匯", "購物", "步行", null, {}],
    ["18:30", "越南會安夜市", null, "美食", "步行", null, {}],
    ["21:00", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  7: [
    ["07:30", null, "出發 · THE SAGA", "住宿", null, "Klook 美山團", { hotel: "hoiAn", klook: "myson-1602" }],
    ["08:00", null, "Klook 美山聖地半日遊", "景點", "Klook 巴士", "08:00 出發", { klook: "myson-1602" }],
    ["11:30", null, "廣南麵午餐", "美食", "Tour 含", "Klook 含", {}],
    ["13:30", null, "返回 THE SAGA", "住宿", "Klook", null, { hotel: "hoiAn" }],
    ["15:00", null, "椰林竹籃船", "體驗", "Grab 短程", "Klook #24274", { klook: "basket-24274" }],
    ["17:00", "廣肇會館", null, "景點", "Grab→步行", "套票", {}],
    ["18:00", "福建會館", null, "景點", "步行", "套票", {}],
    ["19:30", "Purple Lantern Restaurant( An Bang Beach Hoi An )", null, "美食", "Grab", "近 Saga·An Bang", {}],
    ["21:30", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  8: [
    ["09:00", null, "出發 · THE SAGA", "住宿", null, "印象秀週三至週一", { hotel: "hoiAn" }],
    ["10:00", "An Bang Beach", null, "景點", "Grab 短程", "近 Cửa Đại", {}],
    ["12:00", "Pause and Enjoy Restaurant", null, "美食", "Grab", "往古城方向", {}],
    ["13:30", "進記古宅", null, "景點", "步行", "套票", {}],
    ["14:30", "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )", null, "體驗", "步行", null, {}],
    ["16:00", null, "前往 Hoi An Memories Land", "交通", "Klook 含", null, { klook: "memories-17514" }],
    ["17:00", "Hoi An Memories Land", "印象秀+主題樂園", "表演", "Klook", "生態門票+放水燈", { klook: "memories-17514" }],
    ["17:30", null, "Non La 燒烤自助晚餐", "美食", "園內", "17:00–20:30 · Klook 已含", {}],
    ["21:00", null, "返回 · THE SAGA", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  9: [
    ["08:00", null, "退房 · THE SAGA", "住宿", null, null, { hotel: "hoiAn", checkout: true }],
    ["09:00", "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park", null, "景點", "Grab", null, {}],
    ["11:00", null, "Klook 會安→峴港接送", "交通", "Klook #182982", "NT$340/2人", { klook: "transfer-hoi-dad-182982" }],
    ["13:00", "Bếp Cuốn Đà Nẵng", "峴港午餐", "美食", "Grab", "機場前順路", {}],
    ["15:00", null, "前往峴港機場 DAD", "交通", "Grab 送機", null, { mapsUrl: DAD }],
    ["19:00", null, "IT552 返桃園", "航班", "飛機", "19:00–22:40", { flight: true, mapsUrl: TPE, noMap: true }],
  ],
};

const KLOOK_URLS = {
  "bana-13283": "https://www.klook.com/zh-TW/activity/13283-ba-na-hills-ticket-da-nang/",
  "hue-4808": "https://www.klook.com/zh-TW/activity/4808-hue-day-tour-da-nang/",
  "myson-1602": "https://www.klook.com/zh-TW/activity/1602-my-son-discovery-hoi-an/",
  "memories-17514": "https://www.klook.com/zh-TW/activity/17514-hoi-an-memories-show-ticket/",
  "transfer-dad-hoi-182982": "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/",
  "transfer-hoi-dad-182982": "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/",
  "basket-24274": "https://www.klook.com/zh-TW/activity/24274-basket-boat-ticket-hoi-an-coconut-forest/",
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
