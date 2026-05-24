import { TRIP_CONFIG } from "../data/tripConfig";
import { FLIGHT_BOOKING, PACKAGE_BOOKING, KLOOK_BOOKINGS } from "../data/bookedActivities";
import { calcExpenseSummary, EXPENSE_ECONOMY_ACTIVE } from "../data/expenses";
import { HOTELS, DANANG_HOTEL_BOOKING } from "../data/hotels";
import GooglePlaceMedia from "./GooglePlaceMedia";

export default function FlightHotel() {
  const summary = calcExpenseSummary(EXPENSE_ECONOMY_ACTIVE);

  return (
    <div>
      <h2 className="section-title" style={{ fontSize: "22px" }}>✈️ 機票住宿 · 已訂明細</h2>

      <div className="card" style={{ borderColor: "rgba(91,141,239,0.4)", marginBottom: "24px" }}>
        <h3 style={{ color: "var(--accent-blue)", margin: "0 0 12px", fontSize: "18px" }}>機加酒（含虎航機票）</h3>
        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "16px", lineHeight: 1.8, color: "var(--text-muted)" }}>
          <li>
            <a href={PACKAGE_BOOKING.url} target="_blank" rel="noopener noreferrer" style={{ color: "#5B8DEF" }}>
              Trip.com 機加酒 ↗
            </a>
            ：雙人 NT${PACKAGE_BOOKING.coupleTotal.toLocaleString()}（虎航 + Saga）
          </li>
          <li>
            峴港 <strong>The Dream Suite</strong>（6/11–17）：雙人 NT$
            {DANANG_HOTEL_BOOKING.coupleTotal.toLocaleString()}（獨立訂 · An Hải）
          </li>
          <li>
            航班：
            <a href={FLIGHT_BOOKING.url} target="_blank" rel="noopener noreferrer" style={{ color: "#5B8DEF", marginLeft: "6px" }}>
              {FLIGHT_BOOKING.outbound.flight} / {FLIGHT_BOOKING.inbound.flight} ↗
            </a>
            （{FLIGHT_BOOKING.baggage}）
          </li>
          <li>
            加 Klook 與 Grab 等後，精算總計約 <strong style={{ color: "var(--accent-green)" }}>NT${summary.total.toLocaleString()}</strong>（每人 NT$
            {summary.perPerson.toLocaleString()}）— 與「花費」頁一致
          </li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h3 className="section-title">虎航班次（已訂）</h3>
        {TRIP_CONFIG.flightOptions.map((f, i) => (
          <div key={i} style={{ fontSize: "16px", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--accent-green)" }}>{f.dateRange}</strong>
            <div>去：{f.outbound}</div>
            <div>回：{f.inbound}</div>
            <div style={{ fontSize: "14px", marginTop: "8px", opacity: 0.8 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">🏨 住宿</h3>
      {Object.values(HOTELS).map((h) => (
        <div key={h.id} className="card" style={{ marginBottom: "16px", padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 1.2fr", gap: 0 }}>
            <GooglePlaceMedia stop={{ isHotel: true, hotelId: h.id, mapsUrl: h.mapsUrl, title: h.nameZh }} title={h.nameZh} thumbHeight={200} />
            <div style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-blue)" }}>{h.nameZh}</div>
              <div style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "6px" }}>
                {h.area} · {h.checkIn}–{h.checkOut}
              </div>
              <div style={{ fontSize: "14px", color: "var(--gold-dim)", marginTop: "8px", lineHeight: 1.5 }}>{h.address}</div>
              <div style={{ fontSize: "15px", marginTop: "10px" }}>{h.features}</div>
              <div style={{ marginTop: "14px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={h.tripUrl} target="_blank" rel="noopener noreferrer" className="map-link-btn">
                  Trip.com ↗
                </a>
                <a href={h.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "15px", color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}>
                  Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 className="section-title">已訂 Klook</h3>
        <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.9 }}>
          {KLOOK_BOOKINGS.map((b) => (
            <li key={b.id}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ color: "#C8975A" }}>
                {b.name} ↗
              </a>
              <span style={{ opacity: 0.7 }}> · NT${b.coupleTwd.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card card-highlight" style={{ fontSize: "16px" }}>{TRIP_CONFIG.packageDealAnalysys}</div>
    </div>
  );
}
