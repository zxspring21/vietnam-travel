import { CSV_PLACES } from "../data/csvRegistry";
import { getCoverageStats } from "../utils/coverage";
import { getDaysForCsvName, formatDaysLabel } from "../utils/csvDayCoverage";
import { openPlaceUrlFromStop } from "../utils/googleMaps";
import { getCoordByCsvId } from "../data/csvCoords";
import GooglePlaceMedia from "./GooglePlaceMedia";

function regionOf(p) {
  const s = p.name + (p.note || "");
  if (/Hue|順化|天姥|皇|陵|Huế/i.test(s)) return { key: "hue", label: "順化", color: "#9B84C4" };
  if (/Hoi An|會安|An Bang|日本|廣|中華|進記|福建|安邦|印象|美山|Thanh Ha|陶瓷/i.test(s)) return { key: "hoian", label: "會安", color: "#D1A153" };
  if (/海雲|立安|五行|Marble|My Son|美山/i.test(s)) return { key: "transfer", label: "海雲/五行山", color: "#C8975A" };
  if (/峴|Da Nang|Lady|Dragon|Han|Cham|Bana|巴拿|山茶|棋盤|Cathedral/i.test(s)) return { key: "danang", label: "峴港", color: "#3D8B8B" };
  return { key: "other", label: "其他", color: "#6C757D" };
}

export default function CsvList() {
  const coverage = getCoverageStats();
  const inSet = new Set(coverage.usedNames);

  const groups = {};
  for (const p of CSV_PLACES) {
    const r = regionOf(p);
    if (!groups[r.key]) groups[r.key] = { ...r, places: [] };
    groups[r.key].places.push({ ...p, inItinerary: inSet.has(p.name) });
  }

  return (
    <div>
      <h2 style={h2}>🔍 CSV 完整景點（{CSV_PLACES.length} 筆）</h2>
      <div style={{ background: "rgba(127,205,145,0.1)", border: "1px solid rgba(127,205,145,0.35)", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#7FCD91" }}>
          行程已勾選 {coverage.checkedInItinerary} / {coverage.totalCsv} 個景點
        </div>
        <div style={{ fontSize: "12px", color: "rgba(245,237,214,0.6)", marginTop: "6px" }}>
          下方卡片含景點背景圖；「✓ 已排」+ Day 標籤表示出現在哪幾天行程
        </div>
      </div>
      <p style={intro}>來自您更新的 central_vietnam_itinerary.csv，連結已校正。</p>
      {Object.values(groups).map((g) => (
        <div key={g.key} style={{ marginBottom: "24px" }}>
          <h3 style={{ color: g.color, fontSize: "15px", marginBottom: "12px" }}>
            {g.label}（{g.places.length}）· 已勾選 {g.places.filter((p) => p.inItinerary).length}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
            {g.places.map((item) => {
              const daysLabel = formatDaysLabel(getDaysForCsvName(item.name));
              const coord = getCoordByCsvId(item.id);
              const openUrl = openPlaceUrlFromStop({
                csvId: item.id,
                csvName: item.name,
                mapsUrl: item.url,
              });
              return (
              <div
                key={item.id}
                style={{
                  background: `${g.color}08`,
                  border: `1px solid ${item.inItinerary ? "#7FCD91" : `${g.color}30`}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <GooglePlaceMedia
                  stop={{
                    csvId: item.id,
                    csvName: item.name,
                    mapsUrl: item.url,
                    lat: coord?.lat,
                    lng: coord?.lng,
                    title: item.name,
                  }}
                  thumbHeight={160}
                />
                <div style={{ padding: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <strong style={{ fontSize: "12px" }}>{item.name}</strong>
                    {item.inItinerary && (
                      <span style={{ fontSize: "10px", background: "rgba(127,205,145,0.25)", color: "#7FCD91", padding: "2px 6px", borderRadius: "4px" }}>
                        ✓ 已排
                      </span>
                    )}
                    {daysLabel && (
                      <span style={{ fontSize: "10px", background: "rgba(200,151,90,0.2)", color: "#e8b86d", padding: "2px 6px", borderRadius: "4px" }}>
                        {daysLabel}
                      </span>
                    )}
                  </div>
                  {item.note && <div style={{ fontSize: "10px", opacity: 0.55, marginTop: "4px" }}>{item.note}</div>}
                  {item.tags?.length > 0 && <div style={{ fontSize: "10px", marginTop: "4px" }}>{item.tags.join(" ")}</div>}
                  {openUrl && (
                    <a href={openUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "#C8975A", marginTop: "6px", display: "inline-block" }}>
                      Google Maps ↗
                    </a>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const h2 = { fontSize: "18px", color: "#C8975A", marginBottom: "8px", fontWeight: 700 };
const intro = { fontSize: "13px", color: "rgba(245,237,214,0.6)", marginBottom: "20px" };
