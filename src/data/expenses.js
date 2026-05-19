/** 花費方案：目標每人 ≤ NT$80,000（雙人約 16 萬內）— 與機票住宿頁一致 */

import { KKDAY, KLOOK } from "./tourLinks.js";

export const BUDGET_TARGET_PER_PERSON = 80000;

/** Trip.com 機加酒雙人參考（與 FlightHotel 頁一致） */
export const TRIP_PACKAGE_COUPLE = { low: 28000, mid: 30000, high: 32000 };

const KK = KKDAY;
const KL = KLOOK;

export const EXPENSE_CATEGORIES = [
  {
    id: "flights_pkg",
    label: "✈️ 機票 + 機加酒（Trip.com 參考）",
    color: "#5B8DEF",
    items: [
      {
        name: "Trip.com 虎航機加酒 10 晚（雙人）",
        amount: TRIP_PACKAGE_COUPLE.mid,
        note: "端午檔約 NT$14,000–16,000/人；含早餐優先",
        link: "https://tw.trip.com/packages/list?departurecity=台北&arrivalcity=峴港",
      },
      {
        name: "機場接送（去+回）",
        amount: 1200,
        note: "套餐內含則 $0",
        link: KL.airportTransfer,
      },
    ],
  },
  {
    id: "hotels",
    label: "🏨 住宿（若單訂、未買機加酒時參考）",
    color: "#C8975A",
    items: [
      {
        name: "Grand Mercure Danang ×3 晚",
        amount: 6600,
        note: "美溪 · 與行程 D0–D2 同區",
        link: "https://tw.trip.com/hotels/list?city=770&keyword=Grand+Mercure+Danang",
      },
      {
        name: "Hotel Royal Hoi An MGallery ×4 晚",
        amount: 10000,
        note: "古城步行圈 · 非 Hoiana 度假村",
        link: "https://tw.trip.com/hotels/list?city=725&keyword=Hotel+Royal+Hoi+An+MGallery",
      },
      {
        name: "Pilgrimage Village 順化 ×1 晚",
        amount: 2400,
        note: "D7–D8 皇城",
        link: "https://tw.trip.com/hotels/list?city=662&keyword=Pilgrimage+Village",
      },
      {
        name: "Novotel 漢江 ×2 晚",
        amount: 3600,
        note: "D8 晚起 · 送機",
        link: "https://tw.trip.com/hotels/list?city=770&keyword=Novotel+Danang+Han+River",
      },
    ],
    note: "⚠️ 已買 Trip.com 機加酒時勿重複計入",
  },
  {
    id: "tours",
    label: "🎫 必玩 Tour / 門票",
    color: "#7B5EA7",
    items: [
      { name: "巴拿山一日遊（KKday 雙人）", amount: 4400, note: "#10048", link: KK.banaHills },
      { name: "Thanh Ha 陶瓷村（雙人）", amount: 600, note: "現場體驗", link: KL.thanhHa },
      { name: "會安印象秀（雙人）", amount: 2800, note: "Klook", link: KL.memoriesShow },
      { name: "古城/皇城/五行山門票（雙人）", amount: 1200, note: "現場購", link: KL.marbleHoiAn },
    ],
  },
  {
    id: "transport",
    label: "🛵 交通",
    color: "#3D8B8B",
    items: [
      { name: "租機車 ×5 天（1 台）", amount: 1500, note: "同伴騎；孕婦用 Grab", link: KK.scooter },
      { name: "Grab / 會安步行", amount: 2500, note: "市區短程", link: "https://www.google.com/maps/search/?api=1&query=Grab+Da+Nang" },
      { name: "海雲嶺+順化包車", amount: 5500, note: "KKday #572916", link: KK.charter },
      { name: "移防/送機 Grab", amount: 800, note: "會安·機場", link: KL.airportTransfer },
    ],
  },
  {
    id: "food",
    label: "🍽️ 餐飲",
    color: "#DE7A32",
    items: [
      {
        name: "每日三餐 ×11 天（雙人）",
        amount: 14000,
        note: "含早後午晚約 NT$600–800/人/餐",
        link: "https://tw.trip.com/travel-guide/attraction/da-nang-669-food-and-drinks/",
      },
    ],
  },
  {
    id: "spa_misc",
    label: "💆 其他",
    color: "#4A7C59",
    items: [
      { name: "Spa ×1（雙人）", amount: 2000, note: "可選", link: "https://www.kkday.com/zh-tw/category/list/0001_VN_Vietnam" },
      { name: "伴手禮、旅平險", amount: 3000, note: "腰果等", link: "https://tw.trip.com/travel-guide/shopping/" },
    ],
  },
];

export const EXPENSE_ECONOMY_ACTIVE = EXPENSE_CATEGORIES.filter((c) => c.id !== "hotels");

export const TRANSPORT_COMPARE = [
  { mode: "租機車", cost: "NT$200–350/天", bestFor: "峴港市區、會安（同伴騎）", pregnant: "❌ 孕婦不宜", cp: "★★★★★" },
  { mode: "Grab", cost: "NT$80–150/趟", bestFor: "市區短程、孕婦移動", pregnant: "✅ 推薦", cp: "★★★★" },
  { mode: "包車 8hr", cost: "NT$2,500–3,500/天", bestFor: "巴拿山、海雲嶺、順化", pregnant: "✅ 最舒適", cp: "★★★" },
  { mode: "Tour 巴士", cost: "含在套票", bestFor: "巴拿山、順化一日遊", pregnant: "✅", cp: "★★★★" },
];

export function calcExpenseSummary(categories = EXPENSE_ECONOMY_ACTIVE) {
  let total = 0;
  const byCategory = categories.map((cat) => {
    const subtotal = cat.items.reduce((s, i) => s + i.amount, 0);
    total += subtotal;
    return { ...cat, subtotal };
  });
  return {
    byCategory,
    total,
    perPerson: Math.round(total / 2),
    currency: "NT$",
    withinBudget: Math.round(total / 2) <= BUDGET_TARGET_PER_PERSON,
  };
}

const _activeSummary = calcExpenseSummary(EXPENSE_ECONOMY_ACTIVE);

export const BUDGET_TIERS = {
  economy: {
    id: "economy",
    label: "💎 精打細算（推薦 CP 值）",
    desc: `Trip.com 機加酒 NT$${(TRIP_PACKAGE_COUPLE.mid / 1000).toFixed(0)}k/雙人 + 在地交通 Tour`,
    perPerson: _activeSummary.perPerson,
    coupleTotal: _activeSummary.total,
    highlights: ["Grand Mercure 美溪", "會安古城旁 MGallery", "巴拿山 KKday", "海雲嶺包車"],
  },
  standard: {
    id: "standard",
    label: "⭐ 舒適平衡",
    desc: "機加酒偏高檔 + 更多 Tour",
    perPerson: Math.round(_activeSummary.perPerson * 1.15),
    coupleTotal: Math.round(_activeSummary.total * 1.15),
    highlights: ["印象秀 VIP", "順化 Tour", "Spa 加購"],
  },
};
