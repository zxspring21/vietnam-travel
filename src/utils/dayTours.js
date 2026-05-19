import { DAY_STOPS } from "../data/itineraryStops";
import { DAILY_TRANSPORT, TOUR_CATEGORIES } from "../data/tours";

const ALL_TOURS = TOUR_CATEGORIES.flatMap((cat) =>
  cat.tours.map((t) => ({ ...t, categoryLabel: cat.label }))
);

/** 當日行程中由 Tour / 包車 / KKday / Klook 銜接的站點 */
export function getTourLinkedStops(day) {
  const stops = DAY_STOPS[day] || [];
  const linked = [];
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    const t = s.transportFromPrev || "";
    if (!/tour|kkday|klook|包車|巴士|專車接送|一日遊/i.test(t)) continue;
    const label = s.csvName || s.title;
    if (label) linked.push({ label, transport: t, time: s.time });
  }
  return linked;
}

/** 建議當日使用的 Tour 商品（含連結） */
export function getRecommendedToursForDay(day) {
  return ALL_TOURS.filter((t) => t.recommendDays?.includes(day));
}

export function getDayTourSummary(day) {
  const transport = DAILY_TRANSPORT.find((d) => d.day === day);
  const tours = getRecommendedToursForDay(day);
  const linkedStops = getTourLinkedStops(day);
  return { transport, tours, linkedStops };
}
