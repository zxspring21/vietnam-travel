import { getLocalPhotoPath } from "../data/placePhotoManifest";
import { getCoordByCsvId, getCoordByCsvName } from "../data/csvCoords";
import { HOTELS } from "../data/hotels";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function photoCandidatesForKey(key) {
  if (!key) return [];
  const path = getLocalPhotoPath(key);
  if (!path) return [];
  const out = [path];
  if (path.endsWith(".jpg")) out.push(path.replace(/\.jpg$/, ".svg"));
  else if (path.endsWith(".svg")) out.push(path.replace(/\.svg$/, ".jpg"));
  return [...new Set(out)];
}

export function getPlacePhotoCandidates(stop) {
  const keys = [stop?.csvId, stop?.csvName, stop?.isHotel && stop?.hotelId ? `hotel-${stop.hotelId}` : null].filter(
    Boolean
  );
  const paths = [];
  for (const k of keys) {
    paths.push(...photoCandidatesForKey(k));
    if (stop?.isHotel && stop?.hotelId) {
      const h = HOTELS[stop.hotelId];
      if (h?.photoPath) paths.push(h.photoPath);
    }
  }
  const staticUrl = getGoogleStaticPhotoUrl(stop);
  if (staticUrl) paths.push(staticUrl);
  return [...new Set(paths)];
}

export function getPlacePhotoSrc(stop) {
  return getPlacePhotoCandidates(stop)[0] || null;
}

export function getGoogleStaticPhotoUrl(stop) {
  if (!API_KEY) return null;
  let c =
    stop?.lat != null
      ? { lat: stop.lat, lng: stop.lng }
      : getCoordByCsvId(stop?.csvId) || getCoordByCsvName(stop?.csvName);
  if (!c && stop?.isHotel && stop?.hotelId) {
    const h = HOTELS[stop.hotelId];
    if (h?.lat != null) c = { lat: h.lat, lng: h.lng };
  }
  if (!c) return null;
  return `https://maps.googleapis.com/maps/api/staticmap?center=${c.lat},${c.lng}&zoom=17&size=640x400&scale=2&maptype=roadmap&markers=color:0xC8975A%7C${c.lat},${c.lng}&key=${API_KEY}`;
}

export function resolvePlacePhoto(stop) {
  return getPlacePhotoSrc(stop);
}
