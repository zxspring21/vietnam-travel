import { enrichStops } from "../utils/stopMaps";
import { openPlaceUrlFromStop } from "../utils/googleMaps";
import { getBookingsForDay } from "../data/bookedActivities";
import { buildDayDirectionsUrl } from "../utils/googleMaps";

/** 文字超連結取代嵌入地圖 */
export default function DayRouteLinks({ stops, day }) {
  const enriched = enrichStops(stops || []);
  const bookings = getBookingsForDay(day ?? -1);
  const routeUrl = buildDayDirectionsUrl(enriched);

  return (
    <div className="card" style={{ marginBottom: "20px", fontSize: "14px" }}>
      <strong style={{ color: "#e8b86d" }}>📎 地圖與商品連結</strong>
      {bookings.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          <div style={{ color: "#7FCD91", fontWeight: 600, marginBottom: "6px" }}>已訂 Klook（含交通）</div>
          <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.8 }}>
            {bookings.map((b) => (
              <li key={b.id}>
                <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ color: "#C8975A" }}>
                  {b.name}
                </a>
                <span style={{ opacity: 0.6 }}> · NT${b.coupleTwd.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {routeUrl && (
        <p style={{ marginTop: "12px" }}>
          <a href={routeUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#5B8DEF", fontWeight: 600 }}>
            本日全程 Google Maps 路線 ↗
          </a>
        </p>
      )}
      <ul style={{ margin: "12px 0 0", paddingLeft: "18px", lineHeight: 1.9, color: "rgba(245,237,214,0.85)" }}>
        {enriched
          .filter((s) => !s.noMap && (s.mapsUrl || s.csvName || s.isHotel))
          .map((s, i) => {
            const url = s.openMapsUrl || openPlaceUrlFromStop(s);
            const label = s.title || s.csvName || `站點 ${i + 1}`;
            return (
              <li key={i}>
                <span style={{ color: "#9a8b7a", marginRight: "6px" }}>{s.time}</span>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#C8975A" }}>
                    {label} ↗
                  </a>
                ) : (
                  label
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
