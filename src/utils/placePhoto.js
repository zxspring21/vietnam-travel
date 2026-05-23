import { getPlacePhotoRefEntry } from "../data/placePhotoRefs";
import { getLocalPhotoPaths, PLACE_PHOTO_MANIFEST } from "../data/placePhotoManifest";
import { HOTELS } from "../data/hotels";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAX_PHOTOS = 3;

export function resolvePhotoKeys(stop) {
  const keys = [];
  if (stop?.csvId) keys.push(stop.csvId);
  if (stop?.csvName) keys.push(stop.csvName);
  if (stop?.isHotel && stop?.hotelId) {
    keys.push(`hotel-${stop.hotelId}`);
    const h = HOTELS[stop.hotelId];
    if (h?.csvName) keys.push(h.csvName);
    if (h?.id) keys.push(`hotel-${h.id}`);
  }
  if (stop?.photoKey) keys.push(stop.photoKey);
  if (stop?.souvenirId) keys.push(`souvenir-item-${stop.souvenirId}`);
  return [...new Set(keys)];
}

/** 本機 jpg（每站最多 3 張） */
export function getLocalPhotoCandidates(stop) {
  const paths = [];
  for (const k of resolvePhotoKeys(stop)) {
    for (const p of getLocalPhotoPaths(k)) {
      if (!paths.includes(p)) paths.push(p);
      if (paths.length >= MAX_PHOTOS) return paths;
    }
  }
  return paths;
}

/** 新版 Place Photos：places/…/photos/…/media */
export function googlePlacePhotoUrlNew(photoName, maxWidth = 800) {
  if (!photoName?.startsWith("places/")) return null;
  if (API_KEY) {
    return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;
  }
  return `/api/place-photo-v1/${photoName}/media?maxWidthPx=${maxWidth}`;
}

/** Classic photo_reference */
export function googlePlacePhotoUrlLegacy(photoReference, maxWidth = 800) {
  if (!photoReference) return null;
  const q = `maxwidth=${maxWidth}&photo_reference=${encodeURIComponent(photoReference)}`;
  if (API_KEY) {
    return `https://maps.googleapis.com/maps/api/place/photo?${q}&key=${API_KEY}`;
  }
  return `/api/place-photo?${q}`;
}

export function getPhotoRefsForStop(stop) {
  for (const k of resolvePhotoKeys(stop)) {
    const entry = getPlacePhotoRefEntry(k);
    if (entry?.photoNames?.length || entry?.photoReferences?.length) return entry;
  }
  return null;
}

function remotePhotoUrls(entry) {
  const urls = [];
  if (entry?.photoNames?.length) {
    for (const name of entry.photoNames.slice(0, MAX_PHOTOS)) {
      const u = googlePlacePhotoUrlNew(name);
      if (u) urls.push(u);
    }
  }
  if (urls.length) return urls;
  if (entry?.photoReferences?.length) {
    for (const ref of entry.photoReferences.slice(0, MAX_PHOTOS)) {
      const u = googlePlacePhotoUrlLegacy(ref);
      if (u) urls.push(u);
    }
  }
  return urls;
}

/** 優先本機 jpg（最多 3），其次 Google 即時 URL */
export function getPlacePhotoCandidates(stop) {
  const local = getLocalPhotoCandidates(stop);
  if (local.length > 0) return local.slice(0, MAX_PHOTOS);

  const entry = getPhotoRefsForStop(stop);
  return remotePhotoUrls(entry).slice(0, MAX_PHOTOS);
}

export function resolvePlacePhoto(stop) {
  return getPlacePhotoCandidates(stop)[0] || null;
}

export async function fetchPhotoRefsLive() {
  return [];
}

export function hasGoogleMapsApiKey() {
  return Boolean(API_KEY);
}

function countManifestPhotos() {
  let n = 0;
  for (const p of Object.values(PLACE_PHOTO_MANIFEST)) {
    if (Array.isArray(p)) n += p.filter((x) => /\.jpe?g$/i.test(x)).length;
    else if (typeof p === "string" && /\.jpe?g$/i.test(p)) n += 1;
  }
  return n;
}

export function photoSetupHint() {
  const count = countManifestPhotos();
  if (count > 0) {
    return { ok: true, message: `已載入 ${count} 張本機實景照（每站最多 ${MAX_PHOTOS} 張）` };
  }
  if (API_KEY) {
    return { ok: true, message: "使用 Places API (New) 即時載入照片" };
  }
  return {
    ok: false,
    message: "請設定 VITE_GOOGLE_MAPS_API_KEY 並執行 npm run fetch-photos",
  };
}
