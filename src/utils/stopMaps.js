import { getCsvByName } from "../data/csvRegistry";
import { getCoordByCsvName } from "../data/csvCoords";
import { HOTELS } from "../data/hotels";
import { buildDayDirectionsUrl, isGooglePlaceUrl, openPlaceUrlFromStop, resolveCoord } from "./googleMaps";

export function resolveStopMapsUrl(stop) {
  if (stop.mapsUrl) return stop.mapsUrl;
  if (stop.csvName) {
    const p = getCsvByName(stop.csvName);
    if (p?.url) return p.url;
  }
  if (stop.isHotel && stop.hotelId) {
    const h = HOTELS[stop.hotelId];
    if (h?.csvName) {
      const p = getCsvByName(h.csvName);
      if (p?.url) return p.url;
    }
    return h?.mapsUrl;
  }
  return null;
}

export function enrichStops(stops) {
  return (stops || []).map((stop) => {
    const mapsUrl = resolveStopMapsUrl(stop);
    const csv = stop.csvName ? getCsvByName(stop.csvName) : null;
    const hotel = stop.isHotel && stop.hotelId ? HOTELS[stop.hotelId] : null;
    const coord = hotel
      ? { lat: hotel.lat, lng: hotel.lng }
      : resolveCoord({ ...stop, csvId: csv?.id, mapsUrl });
    const withMeta = {
      ...stop,
      mapsUrl,
      hotelAddress: hotel?.address,
      csvId: csv?.id ?? stop.csvId ?? null,
      lat: coord?.lat,
      lng: coord?.lng,
    };
    const openMapsUrl = isGooglePlaceUrl(mapsUrl) ? mapsUrl : openPlaceUrlFromStop(withMeta);
    return {
      ...withMeta,
      openMapsUrl,
      inCsv: Boolean(csv || stop.isHotel),
    };
  });
}

export function dayMapUrls(stops) {
  const enriched = enrichStops(stops);
  return {
    directionsUrl: buildDayDirectionsUrl(enriched),
    stops: enriched,
  };
}
