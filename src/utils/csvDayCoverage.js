import { DAY_STOPS } from "../data/itineraryStops";

let cache = null;

/** csvName → 出現的 Day 編號（排序） */
export function getCsvDaysMap() {
  if (cache) return cache;
  cache = {};
  for (const [dayStr, stops] of Object.entries(DAY_STOPS)) {
    const day = Number(dayStr);
    for (const s of stops || []) {
      if (!s.csvName) continue;
      if (!cache[s.csvName]) cache[s.csvName] = [];
      if (!cache[s.csvName].includes(day)) cache[s.csvName].push(day);
    }
  }
  for (const k of Object.keys(cache)) {
    cache[k].sort((a, b) => a - b);
  }
  return cache;
}

export function getDaysForCsvName(name) {
  return getCsvDaysMap()[name] || [];
}

export function formatDaysLabel(days) {
  if (!days?.length) return null;
  return `Day ${days.join(", ")}`;
}
