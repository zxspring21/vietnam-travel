import { PLACES } from "../data/placeCoords";

/** Google Maps 嵌入地圖（免 API Key，視覺接近官方地圖） */
export function buildGoogleEmbedUrl(placeKeys) {
  const pts = placeKeys.map((k) => PLACES[k]).filter(Boolean);
  if (!pts.length) return null;

  if (pts.length === 1) {
    const p = pts[0];
    return `https://maps.google.com/maps?q=${p.lat},${p.lng}&hl=zh-TW&z=15&output=embed`;
  }

  const origin = `${pts[0].lat},${pts[0].lng}`;
  const dest = `${pts[pts.length - 1].lat},${pts[pts.length - 1].lng}`;
  const waypoints = pts
    .slice(1, -1)
    .map((p) => `${p.lat},${p.lng}`)
    .join("|");

  let url = `https://www.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(dest)}&hl=zh-TW&z=12&output=embed`;
  if (waypoints) url += `&waypoints=${encodeURIComponent(waypoints)}`;
  return url;
}
