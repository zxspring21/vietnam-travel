import { HOTELS } from "./hotels.js";
import { TRIP_PACKAGE_COUPLE, calcExpenseSummary, EXPENSE_ECONOMY_ACTIVE } from "./expenses.js";

const TRIP_COM = "https://tw.trip.com/packages/list?departurecity=台北&arrivalcity=峴港";
const summary = calcExpenseSummary(EXPENSE_ECONOMY_ACTIVE);

export const TRIP_CONFIG = {
  tripComUrl: TRIP_COM,
  packagePerPerson: {
    low: Math.round(TRIP_PACKAGE_COUPLE.low / 2),
    mid: Math.round(TRIP_PACKAGE_COUPLE.mid / 2),
    high: Math.round(TRIP_PACKAGE_COUPLE.high / 2),
  },
  addonPerPerson: summary.perPerson,
  flightOptions: [
    {
      id: "option1",
      dateRange: "6/11 (四) — 6/21 (日) [11天]",
      outbound: "台灣虎航 IT551 | 桃園 16:35 → 峴港 18:10",
      inbound: "台灣虎航 IT552 | 峴港 19:10 → 桃園 22:45",
      status: "推薦",
      desc: "週四出發票價較低，Trip.com 套餐常配此班次。",
    },
  ],
  hotels: Object.values(HOTELS).map((h) => ({
    area: h.area,
    name: h.nameZh,
    specs: h.priceHint,
    features: h.features,
    tripUrl: h.tripUrl,
    mapsUrl: h.mapsUrl,
    hotelId: h.id,
  })),
  packageDealAnalysys: `💡 Trip.com 機加酒雙人約 NT$${TRIP_PACKAGE_COUPLE.low.toLocaleString()}–${TRIP_PACKAGE_COUPLE.high.toLocaleString()}（約 NT$${Math.round(TRIP_PACKAGE_COUPLE.mid / 2).toLocaleString()}/人）。加 Tour+交通+餐飲後，精算表雙人約 NT$${summary.total.toLocaleString()}（每人約 NT$${summary.perPerson.toLocaleString()}），與上方「花費」頁一致。`,
};
