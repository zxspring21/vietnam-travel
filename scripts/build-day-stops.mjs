#!/usr/bin/env node
/** 產生 itineraryStops.js（60+ CSV 景點 + 飯店起迄） */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DAD =
  "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b";
const TPE =
  "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2";

/** [time, csvName|null, titleOverride|null, type, transportFromPrev, detailOverride] */
const PLAN = {
  0: [
    ["16:35", null, "桃園機場 IT551 出發", "航班", null, "台灣虎航", { flight: true, mapsUrl: TPE, noMap: true }],
    ["18:10", null, "峴港機場 DAD 抵達", "交通", "飛機", null, { mapsUrl: DAD }],
    ["19:30", null, "入住 · Grand Mercure 美溪", "住宿", "Grab 機場接送", null, { hotel: "danangMain" }],
    ["20:00", "PHỞ BẮC 63", null, "美食", "Grab", null, {}],
    ["21:30", null, "返回 · Grand Mercure 美溪", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  1: [
    ["07:30", null, "出發 · Grand Mercure 美溪", "住宿", null, null, { hotel: "danangMain" }],
    ["09:00", "SIX ON SIX CAFE - BRUNCH & RESTAURANT", null, "美食", "Grab", null, {}],
    ["10:15", "Da Nang Cathedral", "粉紅大教堂", "景點", "Grab", null, {}],
    ["10:45", "Con Market", null, "購物", "步行", null, {}],
    ["11:30", "Han Market", "漢市場", "購物", "Grab", null, {}],
    ["12:00", "Bac My An Market", null, "美食", "Grab", null, {}],
    ["13:00", "Nhà hàng Madame Lân", null, "美食", "Grab", null, {}],
    ["14:30", "Da Nang Museum of Cham Sculpture", null, "景點", "Grab", null, {}],
    ["16:00", "Nguon Spa Da Nang - Nguồn Hoàng Kế Viêm", null, "體驗", "Grab", null, {}],
    ["17:30", "Esco Beach, Bar Lounge & Restaurant", null, "美食", "Grab", null, {}],
    ["19:00", "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑", null, "美食", "Grab", null, {}],
    ["21:00", "Dragon Bridge", null, "景點", "Grab", null, {}],
    ["21:30", "Cộng Cà Phê", null, "休息", "步行", null, {}],
    ["22:00", "Vietnam Daily Cuisine", null, "美食", "Grab", null, {}],
    ["22:15", "Nhà Bếp Xưa Restaurant", null, "美食", "Grab", null, {}],
    ["22:30", null, "返回 · Grand Mercure 美溪", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  2: [
    ["07:00", null, "出發 · Grand Mercure 美溪", "住宿", null, null, { hotel: "danangMain" }],
    ["08:00", "巴拿山奇幻樂園", null, "景點", "KKday Tour 巴士", null, {}],
    ["10:00", "Golden Bridge", null, "景點", "Tour 園內", null, {}],
    ["12:30", "Thèm Hải Sản", "山上午餐", "美食", "園內", null, {}],
    ["18:00", "Bếp Cuốn Đà Nẵng", null, "美食", "Grab", null, {}],
    ["20:00", "Ơ Kìa - Seafood Restaurant", null, "美食", "Grab", null, {}],
    ["20:30", "L'Italiano Restaurant Danang", null, "美食", "Grab", null, {}],
    ["21:00", "Indus Indian Restaurant - Nhà hàng Ấn Độ - 인도 음식점", null, "美食", "Grab", null, {}],
    ["21:30", null, "返回 · Grand Mercure 美溪", "住宿", "Grab", null, { hotel: "danangMain", end: true }],
  ],
  3: [
    ["07:30", null, "出發 · Grand Mercure 美溪", "住宿", null, null, { hotel: "danangMain" }],
    ["09:00", "The Marble Mountains", null, "景點", "Grab", null, {}],
    ["12:00", "Bánh Xèo Bà Dưỡng", null, "美食", "Grab", null, {}],
    ["12:45", "Bánh mì Bà Lan", null, "美食", "步行", null, {}],
    ["14:00", "Hoi An ancient town", "前往會安古城", "交通", "Grab 廂型車", "行李移防", {}],
    ["15:00", null, "入住 · Royal MGallery 古城旁", "住宿", "Grab", null, { hotel: "hoiAn" }],
    ["16:00", "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park", null, "景點", "步行", null, {}],
    ["17:00", "Tiệm Vàng Soạn Hà", "換匯（大額建議）", "購物", "步行", "背包客推薦金樓；D1–D2 峴港可於漢市場先換少量，大額在此比價", {}],
    ["18:30", "越南會安夜市", null, "美食", "步行", null, {}],
    ["21:00", null, "返回 · Royal MGallery 會安", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  4: [
    ["08:00", null, "出發 · Royal MGallery 會安", "住宿", null, null, { hotel: "hoiAn" }],
    ["09:30", "Rosie's cafe / Coffee & Brunch", null, "美食", "Grab 至古城", null, {}],
    ["10:30", "Chùa Cầu", "日本橋", "景點", "步行", null, {}],
    ["11:00", "廣肇會館", null, "景點", "步行", null, {}],
    ["11:20", "中華會館", null, "景點", "步行", null, {}],
    ["11:40", "福建會館", null, "景點", "步行", null, {}],
    ["12:00", "進記古宅", null, "景點", "步行", null, {}],
    ["12:30", "Bánh Mì Sum", null, "美食", "步行", null, {}],
    ["14:00", "Mê Hội An Rooftop Coffee & Kitchen", null, "休息", "步行", null, {}],
    ["15:00", "阮廷沼步行街", null, "景點", "步行", null, {}],
    ["16:00", "CỦI COFFEE", null, "休息", "步行", null, {}],
    ["17:00", "Pause and Enjoy Restaurant", null, "美食", "步行", null, {}],
    ["18:00", "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )", null, "體驗", "步行", null, {}],
    ["20:00", "HOME Hoi An", null, "美食", "步行", null, {}],
    ["21:30", null, "返回 · Royal MGallery 會安", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  5: [
    ["08:30", null, "出發 · Royal MGallery 會安", "住宿", null, null, { hotel: "hoiAn" }],
    ["09:30", "An Bang Beach", null, "景點", "Grab", null, {}],
    ["12:30", "Purple Lantern Restaurant( An Bang Beach Hoi An )", null, "美食", "Grab", null, {}],
    ["14:00", "會安市場", null, "購物", "Grab", null, {}],
    ["15:30", "Nhan's kitchen", null, "美食", "Grab", null, {}],
    ["17:00", "Hoi An Heart Restaurant", null, "美食", "Grab", null, {}],
    ["17:30", "Hoi An Memories Land", "會安印象秀", "表演", "Klook 接送", null, {}],
    ["20:30", "MIX Greek Restaurant Hoi An", null, "美食", "Grab", null, {}],
    ["21:00", "ECO restaurant -bar- coffee", null, "休息", "Grab", null, {}],
    ["21:15", "Cam On cafe - Coffee Class", null, "休息", "Grab", null, {}],
    ["21:30", "Zucca Restaurant", null, "美食", "Grab", null, {}],
    ["22:00", null, "返回 · Royal MGallery 會安", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  6: [
    ["08:00", null, "出發 · Royal MGallery 會安", "住宿", null, null, { hotel: "hoiAn" }],
    ["09:00", "Thanh Ha Pottery Village, Hoi An", null, "景點", "Grab", null, {}],
    ["11:00", "My Son Sanctuary", "美山聖地", "景點", "Grab / Tour", "可選半日遊", {}],
    ["12:30", "Anabas Restaurant - Cá Rô Đồng Quán - Hoi An restaurant - 호이안 로컬 레스토랑", null, "美食", "Grab", null, {}],
    ["15:00", "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 10", null, "休息", "Grab 至古城", null, {}],
    ["16:30", "Baba's Kitchen Indian Restaurant - Hoian", null, "美食", "步行", null, {}],
    ["18:00", "Firefly Restaurant & Bar", null, "美食", "Grab", null, {}],
    ["20:00", "MAAZI Hoi An", null, "美食", "Grab", null, {}],
    ["20:30", "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 9", null, "休息", "Grab", null, {}],
    ["21:00", "MẸT Hội An - Vietnamese restaurant & Vegetarian Food 6", null, "休息", "Grab", null, {}],
    ["21:15", "Hong Phuc 2", null, "美食", "Grab", null, {}],
    ["21:30", "Sake Restaurant", null, "美食", "Grab", null, {}],
    ["21:30", null, "返回 · Royal MGallery 會安", "住宿", "Grab", null, { hotel: "hoiAn", end: true }],
  ],
  7: [
    ["07:00", null, "出發 · Royal MGallery 會安", "住宿", null, null, { hotel: "hoiAn" }],
    ["08:30", "海雲關", null, "景點", "包車", "KKday #572916", { mapsQuery: "Hai Van Pass Vietnam" }],
    ["09:30", "棋盤頂", null, "景點", "包車", null, {}],
    ["12:00", "立安潭", null, "美食", "包車", null, {}],
    ["15:00", null, "入住 · Pilgrimage Village 順化", "住宿", "包車", null, { hotel: "hue" }],
    ["15:30", "Hue Imperial City", "順化皇城", "景點", "Grab", null, {}],
    ["17:00", "Hue Historic Citadel", null, "景點", "步行", null, {}],
    ["18:00", "Y Thao Garden", null, "美食", "Grab", null, {}],
    ["20:00", "Vị Huế Restaurant & Café", null, "美食", "Grab", null, {}],
    ["20:30", "Family Home Cafe & Restaurant", null, "美食", "Grab", null, {}],
    ["21:00", "Nina's Cafe-Vietnamese Restaurant", null, "美食", "Grab", null, {}],
    ["21:30", null, "返回 · Pilgrimage Village", "住宿", "Grab", null, { hotel: "hue", end: true }],
  ],
  8: [
    ["08:00", null, "出發 · Pilgrimage Village", "住宿", null, null, { hotel: "hue" }],
    ["09:00", "Hue Imperial City", "皇城深度", "景點", "電動車", null, {}],
    ["11:00", "天姥寺", null, "景點", "Grab", null, {}],
    ["12:30", "Madam Thu 2 - Hue Restaurant", null, "美食", "Grab", null, {}],
    ["13:30", "Bánh Mì Trường Tiền O Tho", null, "美食", "步行", null, {}],
    ["14:00", "Mausoleum of Emperor Khai Dinh", null, "景點", "Grab", null, {}],
    ["15:30", "明命陵（孝陵）", null, "景點", "Grab", null, {}],
    ["16:30", "嗣德陵", null, "景點", "Grab", null, {}],
    ["18:00", "Cozy Restaurant ( Huế )", null, "美食", "Grab", null, {}],
    ["19:30", null, "移動 · 前往峴港 Novotel", "交通", "包車", "海雲嶺返程", { hotel: "danangFinal", checkout: "hue" }],
    ["21:00", null, "入住 · Novotel 漢江", "住宿", "包車", null, { hotel: "danangFinal" }],
  ],
  9: [
    ["08:00", null, "出發 · Novotel 漢江", "住宿", null, null, { hotel: "danangFinal" }],
    ["09:30", "Lady Buddha", null, "景點", "Grab", null, {}],
    ["10:00", "Chùa Linh Ứng", "靈應寺", "景點", "步行", null, {}],
    ["12:00", "Thìa Gỗ 峴港餐廳", null, "美食", "Grab", null, {}],
    ["14:00", "Luxury Herbal Spa", null, "體驗", "Grab", null, {}],
    ["16:00", "Golden Lotus Oriental Organic Spa 1", null, "體驗", "Grab", null, {}],
    ["17:00", "My Hanh Seafood", null, "美食", "Grab", null, {}],
    ["18:30", "魚蛋粉", null, "美食", "Grab", null, {}],
    ["20:00", "EMO'S HOMECOOKED VIETNAMESE CUISINE", null, "美食", "Grab", null, {}],
    ["20:30", "Maharaja Indian Restaurant Đà Nẵng ( since 2016)", null, "美食", "Grab", null, {}],
    ["21:00", "Korea BBQ House", null, "美食", "Grab", null, {}],
    ["21:15", "Adobo Mexican Grill", null, "美食", "Grab", null, {}],
    ["21:30", null, "返回 · Novotel 漢江", "住宿", "Grab", null, { hotel: "danangFinal", end: true }],
  ],
  10: [
    ["08:00", null, "出發 · Novotel 漢江", "住宿", null, null, { hotel: "danangFinal" }],
    ["10:30", "Han Market", "伴手禮採購", "購物", "Grab", null, {}],
    ["12:00", "Con Market", null, "美食", "Grab", null, {}],
    ["13:00", "Quán bánh O Lé", null, "美食", "Grab", null, {}],
    ["14:00", "Cam On cafe - Coffee Class", null, "休息", "Grab", null, {}],
    ["14:30", null, "返回飯店取行李", "住宿", "Grab", null, { hotel: "danangFinal" }],
    ["16:30", null, "峴港機場 DAD 送機", "交通", "Grab / 專車", null, { mapsUrl: DAD }],
    ["19:10", null, "IT552 返桃園", "航班", "飛機", null, { flight: true, mapsUrl: TPE, noMap: true }],
  ],
};

function buildStop([time, csvName, title, type, transport, detail, extra = {}]) {
  const s = {
    time,
    type,
    transportFromPrev: transport || undefined,
    detail: detail || (csvName ? "" : ""),
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
  if (extra.mapsQuery) s.mapsQuery = extra.mapsQuery;
  if (extra.hotel) {
    s.isHotel = true;
    s.hotelId = extra.hotel;
    s.inCsv = true;
  }
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
 * CSV 景點：${names.size} 個 · 含每日飯店起迄
 */
const DAD = ${JSON.stringify(DAD)};
const TPE = ${JSON.stringify(TPE)};

export const DAY_STOPS = ${JSON.stringify(DAY_STOPS, null, 2)};

export const ITINERARY_CSV_COUNT = ${names.size};
`;

writeFileSync(join(__dirname, "../src/data/itineraryStops.js"), out);
console.log(`Wrote itineraryStops.js — ${names.size} unique CSV places`);
