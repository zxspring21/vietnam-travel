import { DAILY_DETAILS, CITY_TIMELINE } from "../data/itinerary";
import { DAY_STOPS } from "../data/itineraryStops";
import RouteMapEmbed from "./RouteMapEmbed";
import { getCoverageStats } from "../utils/coverage";
import { getDayRouteSummary } from "../utils/dayRoute";
import { overallDirectionsUrl, overallEmbedUrl } from "../utils/googleMaps";

export default function HomeOverview({ onSelectDay }) {
  const coverage = getCoverageStats();
  const directionsUrl = overallDirectionsUrl();
  const embedUrl = overallEmbedUrl();

  return (
    <div>
      <div className="card card-highlight" style={{ marginBottom: "24px" }}>
        <div className="stat-big">
          行程已勾選 {coverage.checkedInItinerary} / {coverage.totalCsv} 個 CSV 景點（{coverage.percent}%）
        </div>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: "10px", marginBottom: 0 }}>
          共 {coverage.uniqueStopRefs} 個景點 · 路線以座標計算（開車模式），避免地址無法導航
        </p>
      </div>

      <h3 className="section-title">📍 哪幾天在哪個城市？</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {CITY_TIMELINE.map((c, i) => (
          <div
            key={i}
            className="card"
            style={{ flex: "1 1 150px", textAlign: "center", borderColor: `${c.color}55`, padding: "14px" }}
          >
            <div style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: c.color }}>{c.label}</div>
            <div style={{ fontSize: "14px", opacity: 0.75, marginTop: "6px" }}>{c.days}</div>
            {c.note && <div style={{ fontSize: "13px", opacity: 0.55, marginTop: "6px" }}>{c.note}</div>}
          </div>
        ))}
      </div>

      <RouteMapEmbed
        embedUrl={embedUrl}
        directionsUrl={directionsUrl}
        title="🗺️ 全程精華路線（峴港 → 巴拿山 → 會安 → 海雲關 → 順化 → 山茶半島）"
        height={360}
      />
      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "-4px", marginBottom: "20px" }}>
        點「在 Google Maps 開啟」可選最佳交通方式（開車 / 大眾運輸）。
      </p>

      <h3 className="section-title">📅 每日一覽</h3>
      {DAILY_DETAILS.map((d) => {
        const raw = DAY_STOPS[d.day] || [];
        const route = getDayRouteSummary(raw);
        return (
          <button
            key={d.day}
            type="button"
            className="card"
            onClick={() => onSelectDay(d.day)}
            style={{
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              marginBottom: "12px",
              borderColor: `${d.color}40`,
              fontFamily: "inherit",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: d.color }}>
                  Day {d.day} · {d.date}
                </div>
                <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, marginTop: "6px" }}>{d.title}</div>
                <div style={{ fontSize: "15px", color: "var(--accent-green)", marginTop: "8px", fontWeight: 600 }}>
                  {route.label}
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
                  {d.city} · {route.csvCount} 個景點
                </div>
              </div>
              <span style={{ fontSize: "24px", color: d.color }}>→</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
