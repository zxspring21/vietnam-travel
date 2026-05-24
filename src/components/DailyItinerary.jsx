import { useState } from "react";
import { DAILY_DETAILS } from "../data/itinerary";
import { DAY_STOPS } from "../data/itineraryStops";
import { DAILY_TRANSPORT } from "../data/tours";
import StopTimeline from "./StopTimeline";
import DayRouteLinks from "./DayRouteLinks";
import { getCoverageStats } from "../utils/coverage";
import { getDayRouteSummary } from "../utils/dayRoute";
import { getHotelForDay } from "../data/hotels";
import { getDayTourSummary } from "../utils/dayTours";
import { dayHasCoveredTransport } from "../data/bookedActivities";
import ExchangeTip from "./ExchangeTip";
import HoiAnPassPanel from "./HoiAnPassPanel";

export default function DailyItinerary({ initialDay = 0 }) {
  const [activeDay, setActiveDay] = useState(initialDay);
  const maxDay = DAILY_DETAILS.length - 1;
  const safeDay = Math.min(activeDay, maxDay);
  const day = DAILY_DETAILS[safeDay] || DAILY_DETAILS[0];
  const rawStops = DAY_STOPS[safeDay] || [];
  const transportInfo = DAILY_TRANSPORT[safeDay];
  const coverage = getCoverageStats();
  const route = getDayRouteSummary(rawStops);
  const hotel = getHotelForDay(safeDay);
  const dayTours = getDayTourSummary(safeDay);
  const transportCovered = dayHasCoveredTransport(safeDay);

  return (
    <div>
      <div className="app-nav" style={{ position: "static", background: "transparent", border: "none", padding: "0 0 16px", justifyContent: "flex-start", flexWrap: "wrap" }}>
        {DAILY_DETAILS.map((d, i) => {
          const r = getDayRouteSummary(DAY_STOPS[d.day] || []);
          return (
            <button
              key={i}
              type="button"
              className={`day-tab ${safeDay === i ? "active" : ""}`}
              onClick={() => setActiveDay(i)}
              style={{
                background: safeDay === i ? d.color : undefined,
                borderColor: safeDay === i ? d.color : undefined,
                color: safeDay === i ? "#fff" : undefined,
              }}
            >
              <div className="day-tab-num">
                {d.emoji} Day {d.day} · {d.date}
              </div>
              <div className="day-tab-place">{d.city}</div>
              <div className="day-tab-route">{r.from} → {r.to}</div>
            </button>
          );
        })}
      </div>

      <div className="card" style={{ borderColor: `${day.color}50`, background: `linear-gradient(135deg, ${day.color}15, transparent)` }}>
        <p style={{ fontSize: "15px", color: "var(--accent-green)", margin: "0 0 12px" }}>
          本日 {rawStops.filter((s) => s.csvName).length} 個景點 · 全程 {coverage.checkedInItinerary}/{coverage.totalCsv} 已勾選
        </p>

        <div className="card" style={{ marginBottom: "18px", borderColor: "rgba(91,141,239,0.4)", background: "rgba(91,141,239,0.1)" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-blue)" }}>📍 {route.label}</div>
          <div style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "8px" }}>
            住宿：<strong style={{ color: "var(--text)" }}>{hotel.nameZh}</strong>
          </div>
        </div>

        <h2 style={{ fontSize: "22px", fontWeight: 700, color: day.color, margin: "0 0 16px" }}>
          {day.title}
        </h2>

        <DayRouteLinks stops={rawStops} day={safeDay} />

        {safeDay === 0 && <ExchangeTip day={0} />}
        {safeDay === 1 && <ExchangeTip day={1} />}
        {safeDay === 3 && <ExchangeTip day={3} />}
        {safeDay === 6 && <HoiAnPassPanel />}

        {transportInfo && (
          <div className="card" style={{ marginBottom: "20px", fontSize: "15px" }}>
            <strong style={{ color: day.color }}>今日交通：</strong>
            {transportInfo.mode}
            {transportCovered && (
              <span style={{ marginLeft: "8px", color: "#7FCD91", fontWeight: 600 }}>✓ Klook 已含交通</span>
            )}
            {transportInfo.tourCover && transportInfo.tourCover !== "—" && (
              <span style={{ marginLeft: "10px", color: "#b8a0e8" }}>{transportInfo.tourCover}</span>
            )}
            {transportInfo.tourUrl && (
              <div style={{ marginTop: "10px" }}>
                <a href={transportInfo.tourUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#e8b86d", fontWeight: 600 }}>
                  已訂商品 ↗
                </a>
              </div>
            )}
            {transportInfo.tourStops?.length > 0 && (
              <div style={{ marginTop: "8px", fontSize: "14px", color: "var(--accent-green)" }}>
                覆蓋：{transportInfo.tourStops.join(" → ")}
              </div>
            )}
            <div style={{ marginTop: "8px", color: "var(--text-muted)" }}>{transportInfo.note}</div>
            {!transportCovered && (
              <div style={{ marginTop: "8px", fontSize: "13px", color: "#e8b86d" }}>
                本日短程請用 Grab（未含於已訂 Klook）
              </div>
            )}
          </div>
        )}

        <h3 className="section-title">站點時間軸</h3>
        <StopTimeline stops={rawStops} accentColor={day.color} />

        <div className="card card-highlight" style={{ marginTop: "20px", fontSize: "15px" }}>
          💡 {day.tips}
        </div>
      </div>
    </div>
  );
}
