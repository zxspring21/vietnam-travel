import { TRIP_CONFIG } from "../data/tripConfig";
import { TRIP_PACKAGE_COUPLE, calcExpenseSummary, EXPENSE_ECONOMY_ACTIVE } from "../data/expenses";
import { HOTELS } from "../data/hotels";
import GooglePlaceMedia from "./GooglePlaceMedia";

export default function FlightHotel() {
  const tripUrl = TRIP_CONFIG.tripComUrl;
  const summary = calcExpenseSummary(EXPENSE_ECONOMY_ACTIVE);

  return (
    <div>
      <h2 className="section-title" style={{ fontSize: "22px" }}>✈️ 機票住宿 · Trip.com 機加酒</h2>

      <div className="card" style={{ borderColor: "rgba(91,141,239,0.4)", marginBottom: "24px" }}>
        <h3 style={{ color: "var(--accent-blue)", margin: "0 0 12px", fontSize: "18px" }}>Trip.com 機加酒</h3>
        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "16px", lineHeight: 1.8, color: "var(--text-muted)" }}>
          <li>台北 → 峴港 · 6/11–6/21 · 雙人 10 晚</li>
          <li>
            參考 <strong style={{ color: "var(--text)" }}>NT${TRIP_PACKAGE_COUPLE.low.toLocaleString()}–{TRIP_PACKAGE_COUPLE.high.toLocaleString()}/雙人</strong>（約 NT$
            {TRIP_CONFIG.packagePerPerson.mid.toLocaleString()}/人）
          </li>
          <li>
            含早餐優先 · 加購後總預算見「花費」：雙人 <strong style={{ color: "var(--accent-green)" }}>NT${summary.total.toLocaleString()}</strong>（每人 NT$
            {summary.perPerson.toLocaleString()}）
          </li>
        </ul>
        <a href={tripUrl} target="_blank" rel="noopener noreferrer" className="map-link-btn" style={{ marginTop: "14px" }}>
          前往 Trip.com 搜尋機加酒 ↗
        </a>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h3 className="section-title">虎航班次</h3>
        {TRIP_CONFIG.flightOptions.map((f, i) => (
          <div key={i} style={{ fontSize: "16px", marginBottom: i < 1 ? "16px" : 0, paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <strong style={{ color: "var(--accent-green)" }}>{f.dateRange}</strong>
            <div style={{ marginTop: "8px" }}>去：{f.outbound}</div>
            <div>回：{f.inbound}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">🏨 推薦住宿（依每日行程區域）</h3>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "-8px", marginBottom: "16px" }}>
        會安改為古城旁 Royal MGallery；峴港為 Grand Mercure Danang（您提供的 Google 座標）。
      </p>
      {Object.values(HOTELS).map((h) => (
        <div key={h.id} className="card" style={{ marginBottom: "16px", padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 1.2fr", gap: 0 }}>
            <GooglePlaceMedia
              stop={{ isHotel: true, hotelId: h.id, mapsUrl: h.mapsUrl, lat: h.lat, lng: h.lng, title: h.nameZh }}
              title={h.nameZh}
              thumbHeight={200}
            />
            <div style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-blue)" }}>{h.nameZh}</div>
              <div style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "6px" }}>
                {h.area} · {h.stars} · {h.priceHint}
              </div>
              <div style={{ fontSize: "15px", marginTop: "10px" }}>{h.features}</div>
              <div style={{ fontSize: "13px", color: "var(--accent-green)", marginTop: "8px" }}>行程 Day {h.days.join(", ")}</div>
              <div style={{ marginTop: "14px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={h.tripUrl} target="_blank" rel="noopener noreferrer" className="map-link-btn">
                  Trip.com 查價 ↗
                </a>
                <a href={h.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "15px", color: "var(--gold)", fontWeight: 600, textDecoration: "none", padding: "10px 0" }}>
                  Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="card card-highlight" style={{ fontSize: "16px" }}>{TRIP_CONFIG.packageDealAnalysys}</div>
    </div>
  );
}
