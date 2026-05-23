/** Google Places — 優先新版 API (v1)，失敗時回退 Classic */

const NEW_BASE = "https://places.googleapis.com/v1";

export function placeNameFromMapsUrl(url) {
  if (!url) return null;
  try {
    const m = url.match(/\/place\/([^/]+)/);
    if (m) return decodeURIComponent(m[1].replace(/\+/g, " "));
  } catch {
    /* ignore */
  }
  return null;
}

function newApiHeaders(apiKey, fieldMask) {
  return {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": fieldMask,
  };
}

/** 新版 Text Search → place resource id（ChIJ… 或 places/ChIJ…） */
export async function findPlaceIdNew(target, apiKey) {
  const label =
    target.photoSearchQuery ||
    placeNameFromMapsUrl(target.mapsUrl) ||
    target.name;
  if (!label) return null;

  const body = { textQuery: `${label}, Vietnam`, languageCode: "zh-TW" };
  if (target.lat != null && target.lng != null) {
    body.locationBias = {
      circle: {
        center: { latitude: target.lat, longitude: target.lng },
        radius: 50000,
      },
    };
  }

  const res = await fetch(`${NEW_BASE}/places:searchText`, {
    method: "POST",
    headers: newApiHeaders(apiKey, "places.id,places.name,places.displayName"),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  const place = data.places?.[0];
  if (!place) return null;
  return normalizePlaceId(place.id || place.name);
}

export async function fetchPlacePhotoRefsNew(placeId, apiKey) {
  const id = normalizePlaceId(placeId);
  const res = await fetch(`${NEW_BASE}/places/${id}`, {
    headers: newApiHeaders(apiKey, "id,displayName,photos"),
  });
  const data = await res.json();
  if (!data.photos?.length) return null;
  const photoNames = data.photos.slice(0, 10).map((p) => p.name).filter(Boolean);
  return {
    placeId: id,
    name: data.displayName?.text || data.displayName,
    photoNames,
    api: "new",
  };
}

/** 下載新版照片：GET …/v1/{photoName}/media */
export async function downloadPlacePhotoNew(photoName, apiKey, maxWidth = 800) {
  if (!photoName?.startsWith("places/")) return null;
  const url = `${NEW_BASE}/${photoName}/media?maxWidthPx=${maxWidth}&key=${apiKey}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  return buf.length > 1000 ? buf : null;
}

/** Classic fallback */
export async function findPlaceIdLegacy(target, apiKey) {
  const label = placeNameFromMapsUrl(target.mapsUrl) || target.name;
  if (!label) return null;
  const query = encodeURIComponent(`${label}, Vietnam`);
  let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name&key=${apiKey}`;
  if (target.lat != null && target.lng != null) {
    url += `&locationbias=circle:80000@${target.lat},${target.lng}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" || !data.candidates?.[0]?.place_id) return null;
  return data.candidates[0].place_id;
}

export async function fetchPlacePhotoRefsLegacy(placeId, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos,name&language=zh-TW&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" || !data.result) return null;
  const photoReferences = (data.result.photos || []).slice(0, 10).map((p) => p.photo_reference).filter(Boolean);
  return { placeId, name: data.result.name, photoReferences, api: "legacy" };
}

export async function downloadPlacePhotoLegacy(photoReference, apiKey, maxWidth = 800) {
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${encodeURIComponent(photoReference)}&key=${apiKey}`;
  const res = await fetch(photoUrl, { redirect: "follow" });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  return buf.length > 1000 ? buf : null;
}

export async function findPlaceId(target, apiKey) {
  try {
    const id = await findPlaceIdNew(target, apiKey);
    if (id) return id;
  } catch {
    /* try legacy */
  }
  return findPlaceIdLegacy(target, apiKey);
}

export async function fetchPlacePhotoRefs(placeId, apiKey) {
  try {
    const info = await fetchPlacePhotoRefsNew(placeId, apiKey);
    if (info?.photoNames?.length) return info;
  } catch {
    /* legacy */
  }
  return fetchPlacePhotoRefsLegacy(placeId, apiKey);
}

export async function downloadPlacePhoto(photoRefOrName, apiKey, maxWidth = 800) {
  if (typeof photoRefOrName === "string" && photoRefOrName.startsWith("places/")) {
    return downloadPlacePhotoNew(photoRefOrName, apiKey, maxWidth);
  }
  return downloadPlacePhotoLegacy(photoRefOrName, apiKey, maxWidth);
}

function normalizePlaceId(id) {
  if (!id) return id;
  return id.replace(/^places\//, "");
}
