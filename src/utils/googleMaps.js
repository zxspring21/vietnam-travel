/**
 * Google Maps — 座標導航（避免完整地址無法算路）
 */
import { getCoordByCsvName, getCoordByCsvId } from "../data/csvCoords";

export const MAPS_QUERY_ALIAS = {
  海雲關: "Hai Van Pass",
  立安潭: "Lap An Lagoon",
  天姥寺: "Thien Mu Pagoda Hue",
  巴拿山奇幻樂園: "Ba Na Hills",
};

/** 全程精華路線 — 城市級座標（開放路線，起終點不同以免算路失敗） */
export const OVERALL_ROUTE_COORDS = [
  { label: "峴港美溪", lat: 16.0544, lng: 108.2498 },
  { label: "巴拿山", lat: 15.995, lng: 107.9892 },
  { label: "會安古城", lat: 15.877, lng: 108.3269 },
  { label: "海雲關", lat: 16.2, lng: 108.13 },
  { label: "順化皇城", lat: 16.4696, lng: 107.5796 },
  { label: "山茶半島", lat: 16.1, lng: 108.2775 },
];

function nearSameCoord(a, b, eps = 0.0003) {
  if (!a || !b) return false;
  return Math.abs(a.lat - b.lat) < eps && Math.abs(a.lng - b.lng) < eps;
}

export function dedupeAdjacentCoords(coords) {
  const out = [];
  for (const c of coords || []) {
    const prev = out[out.length - 1];
    if (prev && nearSameCoord(prev, c)) continue;
    out.push(c);
  }
  return out;
}

export function placeNameFromUrl(url) {
  if (!url) return null;
  try {
    const m = url.match(/\/place\/([^/]+)/);
    if (m) return decodeURIComponent(m[1].replace(/\+/g, " "));
  } catch {
    /* ignore */
  }
  return null;
}

/** CSV 內建的 Google Place 連結（含 1s0x… 精確地點） */
export function isGooglePlaceUrl(url) {
  return Boolean(url && /google\.com\/maps\/place/i.test(url) && !/\/dir\//i.test(url));
}

/**
 * 外開單一站點
 * 優先使用 CSV 原始 Place URL（最準），其次才是 Geocoding 座標
 */
export function openPlaceUrlFromStop(stop) {
  const raw = stop?.mapsUrl;
  if (isGooglePlaceUrl(raw)) return raw;

  const c = resolveCoord(stop);
  if (c) {
    return `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}&hl=zh-TW`;
  }
  const placeName = placeNameFromUrl(raw);
  const label = placeName || stop?.csvName || stop?.title;
  if (label) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${label} Vietnam`)}&hl=zh-TW`;
  }
  return raw && !raw.startsWith("#") ? raw : null;
}

export function resolveCoord(stop) {
  if (stop?.lat != null && stop?.lng != null) return { lat: stop.lat, lng: stop.lng };
  if (stop?.csvId) {
    const c = getCoordByCsvId(stop.csvId);
    if (c) return c;
  }
  if (stop?.csvName) {
    const c = getCoordByCsvName(stop.csvName);
    if (c) return c;
  }
  return null;
}

export function resolveMapsQuery(stop, mapsUrl) {
  if (stop?.mapsQuery) return stop.mapsQuery;
  const c = resolveCoord(stop);
  if (c) return `${c.lat},${c.lng}`;
  const csvName = stop?.csvName;
  if (csvName && MAPS_QUERY_ALIAS[csvName]) return MAPS_QUERY_ALIAS[csvName];
  return placeNameFromUrl(mapsUrl) || csvName || stop?.title || null;
}

function coordToParam(c) {
  return `${c.lat},${c.lng}`;
}

export function embedUrlFromStop(stop, zoom = 16) {
  const c = resolveCoord(stop);
  if (c) {
    return `https://maps.google.com/maps?q=${c.lat},${c.lng}&hl=zh-TW&z=${zoom}&output=embed`;
  }
  const q = resolveMapsQuery(stop, stop?.mapsUrl);
  if (!q) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&hl=zh-TW&z=${zoom}&output=embed`;
}

/** 外開導航 — 座標 + travelmode=driving */
export function directionsUrlFromCoords(coords) {
  if (!coords?.length) return null;
  if (coords.length === 1) {
    const c = coords[0];
    return `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}&hl=zh-TW`;
  }
  const origin = coordToParam(coords[0]);
  const dest = coordToParam(coords[coords.length - 1]);
  const waypoints = coords.slice(1, -1).map(coordToParam).join("|");
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving&hl=zh-TW`;
  if (waypoints) url += `&waypoints=${waypoints}`;
  return url;
}

export function directionsUrlFromStops(stops) {
  const coords = vietnamOnlyDirections(stops)
    .map((s) => resolveCoord(s))
    .filter(Boolean);
  return directionsUrlFromCoords(coords);
}

export function vietnamOnlyDirections(stops) {
  const skip = /桃園|Taiwan|Taoyuan|TPE|航班|機場 IT|返台|抵達桃園/i;
  return stops.filter((s) => {
    if (s.noMap || s.isFlight) return false;
    const label = `${s.title || ""} ${s.detail || ""}`;
    if (skip.test(label) && !/峴港|Da Nang|DAD/i.test(label)) return false;
    return Boolean(resolveCoord(s) || s.mapsUrl);
  });
}

export function buildDayDirectionsUrl(stops) {
  return directionsUrlFromStops(stops);
}

/** 嵌入路線 — 使用 lat,lng（最多 8 站） */
export function embedDirectionsFromStops(stops, zoom = 12) {
  const vn = vietnamOnlyDirections(stops).slice(0, 10);
  let coords = dedupeAdjacentCoords(vn.map((s) => resolveCoord(s)).filter(Boolean));
  if (coords.length >= 2 && nearSameCoord(coords[0], coords[coords.length - 1]) && coords.length > 2) {
    coords = coords.slice(0, -1);
  }
  return embedDirectionsFromCoords(coords, zoom);
}

export function embedDirectionsFromCoords(coords, zoom = 11) {
  let list = dedupeAdjacentCoords(coords);
  if (!list?.length) return null;
  if (list.length === 1) {
    const c = list[0];
    return `https://maps.google.com/maps?q=${c.lat},${c.lng}&hl=zh-TW&z=15&output=embed`;
  }
  if (nearSameCoord(list[0], list[list.length - 1]) && list.length > 2) {
    list = list.slice(0, -1);
  }
  const saddr = coordToParam(list[0]);
  const daddr = coordToParam(list[list.length - 1]);
  const waypoints = list.slice(1, -1).map(coordToParam).join("|");
  let url = `https://maps.google.com/maps?saddr=${saddr}&daddr=${daddr}&hl=zh-TW&z=${zoom}&output=embed`;
  if (waypoints) url += `&waypoints=${waypoints}`;
  return url;
}

export function overallDirectionsUrl() {
  return directionsUrlFromCoords(OVERALL_ROUTE_COORDS);
}

export function overallEmbedUrl() {
  return embedDirectionsFromCoords(OVERALL_ROUTE_COORDS, 9);
}
