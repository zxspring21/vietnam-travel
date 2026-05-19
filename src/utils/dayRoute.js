import { enrichStops } from "./stopMaps";
import { HOTELS } from "../data/hotels";

/** 本日路線摘要：起點 → 終點 */
export function getDayRouteSummary(stops) {
  const enriched = enrichStops(stops || []);
  if (!enriched.length) return { from: "—", to: "—", label: "—" };

  const first = enriched[0];
  const last = enriched[enriched.length - 1];

  const labelOf = (s) => {
    if (s.isHotel && s.hotelId) return HOTELS[s.hotelId]?.nameZh || s.title;
    if (s.isFlight) return s.title?.includes("桃園") ? "桃園機場" : s.title?.includes("峴港") ? "峴港機場" : s.title;
    return s.title || s.csvName || "—";
  };

  return {
    from: labelOf(first),
    to: labelOf(last),
    label: `${labelOf(first)} → ${labelOf(last)}`,
    stopCount: enriched.length,
    csvCount: enriched.filter((s) => s.csvName).length,
  };
}
