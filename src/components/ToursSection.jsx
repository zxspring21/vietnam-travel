import { TOUR_CATEGORIES, DAILY_TRANSPORT, CSV_COVERAGE_SUMMARY } from "../data/tours";
import { getCsvByName } from "../data/csvRegistry";
import GooglePlaceMedia from "./GooglePlaceMedia";

function tourMediaStop(tour) {
  if (tour.csvCover) {
    const p = getCsvByName(tour.csvCover);
    if (p) {
      return { csvId: p.id, csvName: p.name, mapsUrl: p.url, title: tour.name };
    }
  }
  for (const label of tour.covers || []) {
    const p = getCsvByName(label);
    if (p) return { csvId: p.id, csvName: p.name, mapsUrl: p.url, title: tour.name };
  }
  return { mapsUrl: tour.url, title: tour.name };
}

function TourCard({ tour }) {
  const mediaStop = tourMediaStop(tour);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(180px, 220px) 1fr",
        gap: "14px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(200,151,90,0.15)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      <GooglePlaceMedia stop={mediaStop} title={tour.name} thumbHeight={120} />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <strong style={{ color: "#f5edd6" }}>{tour.name}</strong>
          <span style={{ fontSize: "11px", background: verdictColor(tour.verdict), color: "#000", padding: "2px 8px", borderRadius: "4px", fontWeight: 700 }}>
            {tour.verdict}
          </span>
        </div>
        <div style={{ fontSize: "12px", marginTop: "8px", color: "rgba(245,237,214,0.7)" }}>
          <span style={{ color: "#C8975A" }}>{tour.platform}</span> · {tour.priceHint}
          {tour.rating && <span style={{ color: "#7FCD91" }}> · ⭐ {tour.rating}</span>}
          {tour.transport ? ` · 🚗 ${tour.transport}` : ""}
        </div>
        {(tour.covers || []).length > 0 && (
          <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tour.covers.map((label) => (
              <span
                key={label}
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(123,94,167,0.2)",
                  color: "#c4b5fd",
                  border: "1px solid rgba(123,94,167,0.35)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        )}
        {tour.recommendDays?.length > 0 && (
          <div style={{ fontSize: "11px", marginTop: "4px", color: "#7B5EA7" }}>建議 Day {tour.recommendDays.join(", ")}</div>
        )}
        <p style={{ fontSize: "12px", marginTop: "8px", color: "rgba(245,237,214,0.65)" }}>{tour.note}</p>
        {tour.url && (
          <a href={tour.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "#C8975A", marginTop: "8px", display: "inline-block", fontWeight: 600 }}>
            查看 {tour.platform} 產品 ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function ToursSection() {
  return (
    <div>
      <h2 style={h2}>🎫 KKday / Klook Tour 覆蓋度評估</h2>
      <p style={intro}>
        對照 CSV 景點清單，評估哪些天數可用 Tour 涵蓋交通+門票，哪些適合包車或步行。{CSV_COVERAGE_SUMMARY.recommendation}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "24px" }}>
        <Stat label="CSV 景點" value={CSV_COVERAGE_SUMMARY.totalSpots} />
        <Stat label="Tour 可覆蓋" value={CSV_COVERAGE_SUMMARY.coveredByTours} />
        <Stat label="步行/Grab" value={CSV_COVERAGE_SUMMARY.selfWalkOrGrab} />
        <Stat label="美食可選" value={CSV_COVERAGE_SUMMARY.foodOptional} />
      </div>

      <h3 style={h3}>📅 每日交通建議</h3>
      <div style={{ overflowX: "auto", marginBottom: "28px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(200,151,90,0.3)" }}>
              {["日期", "城市", "交通", "Tour", "連結", "步行?", "備註"].map((h) => (
                <th key={h} style={{ padding: "8px", textAlign: "left", color: "#C8975A" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAILY_TRANSPORT.map((r) => (
              <tr key={r.day} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={td}>
                  Day {r.day} {r.date}
                </td>
                <td style={td}>{r.city}</td>
                <td style={td}>{r.mode}</td>
                <td style={td}>
                  <div>{r.tourCover || "—"}</div>
                  {r.tourStops?.length > 0 && (
                    <div style={{ fontSize: "10px", color: "rgba(245,237,214,0.5)", marginTop: "4px", lineHeight: 1.5 }}>
                      {r.tourStops.join(" → ")}
                    </div>
                  )}
                </td>
                <td style={td}>
                  {r.tourUrl ? (
                    <a href={r.tourUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#C8975A" }}>
                      商品 ↗
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td style={td}>{r.walkable === true ? "✅" : r.walkable === false ? "❌" : r.walkable}</td>
                <td style={{ ...td, color: "rgba(245,237,214,0.55)" }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {TOUR_CATEGORIES.map((cat) => (
        <div key={cat.id} style={{ marginBottom: "24px" }}>
          <h3 style={h3}>{cat.label}</h3>
          {cat.description && <p style={{ fontSize: "12px", color: "rgba(245,237,214,0.55)", marginBottom: "12px" }}>{cat.description}</p>}
          {cat.tours.map((t, i) => (
            <TourCard key={i} tour={t} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ background: "rgba(200,151,90,0.08)", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#C8975A" }}>{value}</div>
      <div style={{ fontSize: "11px", color: "rgba(245,237,214,0.55)" }}>{label}</div>
    </div>
  );
}

function verdictColor(v) {
  if (v?.includes("強烈")) return "#7FCD91";
  if (v?.includes("推薦")) return "#C8975A";
  return "#6C757D";
}

const h2 = { fontSize: "18px", color: "#C8975A", marginBottom: "8px", fontWeight: 700 };
const h3 = { fontSize: "15px", color: "#C8975A", margin: "0 0 10px", fontWeight: 700 };
const intro = { fontSize: "13px", color: "rgba(245,237,214,0.65)", marginBottom: "20px", lineHeight: 1.7 };
const td = { padding: "8px", verticalAlign: "top" };
