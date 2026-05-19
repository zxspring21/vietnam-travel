import { useState } from "react";
import { DAILY_DETAILS } from "../data/itinerary";
import { DAY_STOPS } from "../data/itineraryStops";
import { DAILY_TRANSPORT } from "../data/tours";
import RouteMapEmbed from "./RouteMapEmbed";
import StopTimeline from "./StopTimeline";
import { dayMapUrls } from "../utils/stopMaps";
import { getCoverageStats } from "../utils/coverage";
import { getDayRouteSummary } from "../utils/dayRoute";
import { getHotelForDay } from "../data/hotels";
import { EXCHANGE_ADVICE } from "../data/exchange";
import { getDayTourSummary } from "../utils/dayTours";

export default function DailyItinerary({ initialDay = 0 }) {
  const [activeDay, setActiveDay] = useState(initialDay);
  const day = DAILY_DETAILS[activeDay] || DAILY_DETAILS[0];
  const rawStops = DAY_STOPS[activeDay] || [];
  const { directionsUrl, stops } = dayMapUrls(rawStops);
  const transportInfo = DAILY_TRANSPORT[activeDay];
  const coverage = getCoverageStats();
  const route = getDayRouteSummary(rawStops);
  const hotel = getHotelForDay(activeDay);
  const dayTours = getDayTourSummary(activeDay);
  const showExchange = activeDay <= 3;

  return (
    <div>
      <div className="app-nav" style={{ position: "static", background: "transparent", border: "none", padding: "0 0 16px", justifyContent: "flex-start" }}>
        {DAILY_DETAILS.map((d, i) => {
          const r = getDayRouteSummary(DAY_STOPS[d.day] || []);
          return (
            <button
              key={i}
              type="button"
              className={`day-tab ${activeDay === i ? "active" : ""}`}
              onClick={() => setActiveDay(i)}
              style={{
                background: activeDay === i ? d.color : undefined,
                borderColor: activeDay === i ? d.color : undefined,
                color: activeDay === i ? "#fff" : undefined,
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
          本日 {stops.filter((s) => s.csvName).length} 個景點 · 全程 {coverage.checkedInItinerary}/{coverage.totalCsv} 已勾選
        </p>

        <div className="card" style={{ marginBottom: "18px", borderColor: "rgba(91,141,239,0.4)", background: "rgba(91,141,239,0.1)" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-blue)" }}>📍 {route.label}</div>
          <div style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "8px" }}>
            住宿：<strong style={{ color: "var(--text)" }}>{hotel.nameZh}</strong> · 首末站為飯店（D0/D10 為機場）
          </div>
        </div>

        <h2 style={{ fontSize: "22px", fontWeight: 700, color: day.color, margin: "0 0 16px" }}>
          {day.title}
        </h2>

        <RouteMapEmbed stops={rawStops} directionsUrl={directionsUrl} title="本日開車路線" height={300} />

        {transportInfo && (
          <div className="card" style={{ marginBottom: "20px", fontSize: "15px" }}>
            <strong style={{ color: day.color }}>今日交通：</strong>
            {transportInfo.mode}
            {transportInfo.tourCover && transportInfo.tourCover !== "—" && (
              <span style={{ marginLeft: "10px", color: "#b8a0e8" }}>Tour：{transportInfo.tourCover}</span>
            )}
            {transportInfo.tourUrl && (
              <div style={{ marginTop: "10px" }}>
                <a
                  href={transportInfo.tourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#e8b86d", fontWeight: 600 }}
                >
                  查看 Tour 商品 ↗
                </a>
              </div>
            )}
            {transportInfo.tourStops?.length > 0 && (
              <div style={{ marginTop: "8px", fontSize: "14px", color: "var(--accent-green)" }}>
                Tour 覆蓋站點：{transportInfo.tourStops.join(" → ")}
              </div>
            )}
            {dayTours.linkedStops?.length > 0 && (
              <div style={{ marginTop: "6px", fontSize: "13px", color: "var(--text-muted)" }}>
                行程標示：{dayTours.linkedStops.map((s) => `${s.label}（${s.transport}）`).join("；")}
              </div>
            )}
            <div style={{ marginTop: "8px", color: "var(--text-muted)" }}>{transportInfo.note}</div>
          </div>
        )}

        {showExchange && (
          <div className="card" style={{ marginBottom: "20px", fontSize: "14px", borderColor: "rgba(232,184,109,0.35)" }}>
            <strong style={{ color: "#e8b86d" }}>💱 換匯建議</strong>
            <p style={{ margin: "8px 0 0", color: "var(--text-muted)", lineHeight: 1.6 }}>{EXCHANGE_ADVICE.summary}</p>
            <ul style={{ margin: "8px 0 0", paddingLeft: "18px", color: "var(--text-muted)" }}>
              {EXCHANGE_ADVICE.earlyOptions.map((o) => (
                <li key={o.label} style={{ marginBottom: "4px" }}>
                  <strong style={{ color: "var(--text)" }}>Day {o.day} {o.label}</strong> — {o.note}
                </li>
              ))}
            </ul>
          </div>
        )}

        <h3 className="section-title">站點時間軸（點對點交通 · 地圖預覽圖）</h3>
        <StopTimeline stops={rawStops} accentColor={day.color} />

        <div className="card card-highlight" style={{ marginTop: "20px", fontSize: "15px" }}>
          💡 {day.tips}
        </div>
      </div>
    </div>
  );
}
