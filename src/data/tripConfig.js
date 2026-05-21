import { HOTELS } from "./hotels.js";
import { FLIGHT_BOOKING, PACKAGE_BOOKING, KLOOK_COUPLE_TOTAL } from "./bookedActivities.js";
import { calcExpenseSummary, EXPENSE_ECONOMY_ACTIVE } from "./expenses.js";

const summary = calcExpenseSummary(EXPENSE_ECONOMY_ACTIVE);

export const TRIP_CONFIG = {
  tripComUrl: PACKAGE_BOOKING.url,
  flightUrl: FLIGHT_BOOKING.url,
  packagePerPerson: PACKAGE_BOOKING.perPerson,
  flightPerPerson: FLIGHT_BOOKING.perPersonTwd,
  flightOptions: [
    {
      dateRange: "6/11 — 6/20",
      outbound: `台灣虎航 ${FLIGHT_BOOKING.outbound.flight} | ${FLIGHT_BOOKING.outbound.time}`,
      inbound: `台灣虎航 ${FLIGHT_BOOKING.inbound.flight} | ${FLIGHT_BOOKING.inbound.time}`,
      status: "已訂",
      desc: `含於機加酒 · ${FLIGHT_BOOKING.baggage}`,
    },
  ],
  hotels: Object.values(HOTELS).map((h) => ({
    area: `${h.checkIn}–${h.checkOut} · ${h.area}`,
    name: h.nameZh,
    specs: h.priceHint,
    features: h.features,
    tripUrl: h.tripUrl,
    mapsUrl: h.mapsUrl,
    hotelId: h.id,
  })),
  packageDealAnalysys: `已訂：機加酒（含虎航）NT$${PACKAGE_BOOKING.coupleTotal.toLocaleString()} + Klook NT$${KLOOK_COUPLE_TOTAL.toLocaleString()} + 其餘約 NT$${(summary.total - PACKAGE_BOOKING.coupleTotal - KLOOK_COUPLE_TOTAL).toLocaleString()} = 雙人總計約 NT$${summary.total.toLocaleString()}（每人 NT$${summary.perPerson.toLocaleString()}）。`,
};
