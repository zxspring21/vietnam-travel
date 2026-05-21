import { DAY_STOPS } from "../data/itineraryStops";
import { DAILY_TRANSPORT } from "../data/tours";
import { getBookingsForDay } from "../data/bookedActivities";

/** 當日行程中由 Tour / Klook 銜接的站點 */
export function getTourLinkedStops(day) {
  const stops = DAY_STOPS[day] || [];
  const linked = [];
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    const t = s.transportFromPrev || "";
    if (!/tour|kkday|klook|包車|巴士|專車|一日遊|接送/i.test(t)) continue;
    const label = s.csvName || s.title;
    if (label) linked.push({ label, transport: t, time: s.time });
  }
  return linked;
}

export function getRecommendedToursForDay(day) {
  return getBookingsForDay(day);
}

export function getDayTourSummary(day) {
  const transport = DAILY_TRANSPORT.find((d) => d.day === day);
  const tours = getRecommendedToursForDay(day);
  const linkedStops = getTourLinkedStops(day);
  return { transport, tours, linkedStops };
}
