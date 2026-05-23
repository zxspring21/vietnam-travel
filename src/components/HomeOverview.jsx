import { DAILY_DETAILS, CITY_TIMELINE } from "../data/itinerary";
import { DAY_STOPS } from "../data/itineraryStops";
import { KLOOK_BOOKINGS, FLIGHT_BOOKING, PACKAGE_BOOKING } from "../data/bookedActivities";
import { getCoverageStats } from "../utils/coverage";
import { getDayRouteSummary } from "../utils/dayRoute";
import { getDaySpotTags } from "../utils/daySpotTags";

const TYPE_COLORS = {
  景點: "#7B5EA7",
  美食: "#DE7A32",
  購物: "#C8975A",
  伴手禮: "#DE7A32",
  住宿: "#5B8DEF",
  交通: "#3D8B8B",
  體驗: "#4A7C59",
  表演: "#9B84C4",
  航班: "#5B8DEF",
};

function SpotTag({ tag }) {
  const color = TYPE_COLORS[tag.type] || "#6C757D";
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "12px",
        padding: "4px 10px",
        borderRadius: "999px",
        margin: "4px 6px 0 0",
        background: tag.isKlook ? `${color}33` : "rgba(255,255,255,0.06)",
        border: `1px solid ${tag.isKlook ? color : "rgba(200,151,90,0.25)"}`,
        color: tag.isKlook ? color : "rgba(245,237,214,0.85)",
        fontWeight: tag.isKlook ? 600 : 400,
      }}
    >
      {tag.isKlook && "🎫 "}
      {tag.label}
    </span>
  );
}

export default function HomeOverview({ onSelectDay }) {
  const coverage = getCoverageStats();

  return (
    <div>
      <div className="card card-highlight" style={{ marginBottom: "24px" }}>
        <div className="stat-big">行程 6/11–6/20 · 機加酒（含機票）+{KLOOK_BOOKINGS.length} 項 Klook</div>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: "10px", marginBottom: 0 }}>
          CSV 景點 {coverage.checkedInItinerary}/{coverage.totalCsv} · 每日一覽標籤列出當日每一站
        </p>
      </div>

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 className="section-title">✅ 已訂摘要</h3>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.9, fontSize: "15px" }}>
          <li>
            <a href={PACKAGE_BOOKING.url} target="_blank" rel="noopener noreferrer" style={{ color: "#5B8DEF" }}>
              機加酒（含虎航）
            </a>
            ：雙人 NT${PACKAGE_BOOKING.coupleTotal.toLocaleString()} · {FLIGHT_BOOKING.outbound.time} / {FLIGHT_BOOKING.inbound.time}
          </li>
          <li style={{ opacity: 0.85 }}>Elite Riverlight 6/11–17 · Saga 6/17–20 · {FLIGHT_BOOKING.baggage}</li>
        </ul>
        <ul style={{ margin: "12px 0 0", paddingLeft: "20px", lineHeight: 1.8, fontSize: "14px" }}>
          {KLOOK_BOOKINGS.map((b) => (
            <li key={b.id}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ color: "#C8975A" }}>
                {b.name}
              </a>
              <span style={{ opacity: 0.65 }}> · NT${b.coupleTwd.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="section-title">📍 住宿區間</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {CITY_TIMELINE.map((c, i) => (
          <div key={i} className="card" style={{ flex: "1 1 150px", textAlign: "center", borderColor: `${c.color}55`, padding: "14px" }}>
            <div style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: c.color }}>{c.label}</div>
            <div style={{ fontSize: "14px", opacity: 0.75, marginTop: "6px" }}>{c.days}</div>
            {c.note && <div style={{ fontSize: "13px", opacity: 0.55, marginTop: "6px" }}>{c.note}</div>}
          </div>
        ))}
      </div>

      <h3 className="section-title">📅 每日一覽</h3>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 14px" }}>
        <span style={{ color: "#7B5EA7", fontWeight: 600 }}>🎫</span> 為已訂 Klook 行程站點
      </p>
      {DAILY_DETAILS.map((d) => {
        const raw = DAY_STOPS[d.day] || [];
        const route = getDayRouteSummary(raw);
        const tags = getDaySpotTags(raw);
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
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: d.color }}>
                  Day {d.day} · {d.date}
                </div>
                <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, marginTop: "6px" }}>{d.title}</div>
                <div style={{ fontSize: "15px", color: "var(--accent-green)", marginTop: "8px", fontWeight: 600 }}>
                  {route.label}
                </div>
                <div style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
                  {d.city} · {tags.length} 站 · {d.transport}
                </div>
                <div style={{ marginTop: "12px", lineHeight: 1.6 }}>
                  {tags.map((tag) => (
                    <SpotTag key={tag.key} tag={tag} />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: "24px", color: d.color, flexShrink: 0 }}>→</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
