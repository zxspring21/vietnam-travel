import { HOTELS } from "../data/hotels";

/** 首頁每日一覽：列出當日每一站標籤 */
export function getDaySpotTags(stops) {
  return (stops || [])
    .filter((s) => s.title && s.type !== "航班")
    .map((s, i) => {
      let label = s.title;
      if (s.isHotel && s.hotelId) {
        label = HOTELS[s.hotelId]?.nameZh || label;
      }
      return {
        key: `${s.time || i}-${label}`,
        label,
        type: s.type || "景點",
        isKlook: Boolean(s.klookId),
        isHotel: Boolean(s.isHotel),
      };
    });
}
