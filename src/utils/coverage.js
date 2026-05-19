import { CSV_PLACES } from "../data/csvRegistry";
import { DAY_STOPS } from "../data/itineraryStops";

export function getItineraryCsvNames() {
  const names = new Set();
  for (const day of Object.values(DAY_STOPS)) {
    for (const stop of day) {
      if (stop.csvName) names.add(stop.csvName);
    }
  }
  return names;
}

export function getCoverageStats() {
  const usedNames = new Set(getItineraryCsvNames());

  const places = CSV_PLACES.map((p) => ({
    ...p,
    inItinerary: usedNames.has(p.name),
  }));

  const checked = places.filter((p) => p.inItinerary).length;

  return {
    totalCsv: CSV_PLACES.length,
    checkedInItinerary: checked,
    uniqueStopRefs: usedNames.size,
    percent: Math.round((checked / CSV_PLACES.length) * 100),
    places,
    usedNames: [...usedNames],
  };
}
