import GooglePlaceMedia from "./GooglePlaceMedia";
import PlaceReviews from "./PlaceReviews";
import { enrichStops } from "../utils/stopMaps";
import { HOTELS } from "../data/hotels";

export default function StopTimeline({ stops, accentColor = "#C8975A" }) {
  const enriched = enrichStops(stops);
  if (!enriched.length) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {enriched.map((stop, idx) => {
        const prev = idx > 0 ? enriched[idx - 1] : null;
        const prevLabel = prev?.title || prev?.csvName || "";
        const thisLabel = stop.title || stop.csvName || "";

        return (
          <div key={idx}>
            {stop.transportFromPrev && idx > 0 && (
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#c4b5fd",
                  marginBottom: "10px",
                  padding: "10px 14px",
                  background: "rgba(123,94,167,0.15)",
                  borderRadius: "10px",
                  borderLeft: `4px solid ${accentColor}`,
                }}
              >
                🚗 {prevLabel} → {thisLabel}
                <span style={{ color: "var(--gold)", marginLeft: "8px" }}>· {stop.transportFromPrev}</span>
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(200px, 260px) 1fr",
                gap: "16px",
                alignItems: "start",
              }}
            >
              {!stop.noMap && (stop.mapsUrl || stop.lat) ? (
                <GooglePlaceMedia stop={stop} title={stop.title} name={stop.csvName} thumbHeight={200} />
              ) : (
                <div
                  className="card"
                  style={{
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    color: "var(--gold-dim)",
                  }}
                >
                  ✈️ 航班段
                </div>
              )}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <span style={{ color: accentColor, fontWeight: 700, fontSize: "16px" }}>{stop.time}</span>
                  {stop.type && (
                    <span style={{ fontSize: "13px", background: `${accentColor}33`, color: accentColor, padding: "3px 10px", borderRadius: "6px" }}>
                      {stop.type}
                    </span>
                  )}
                  {stop.isHotel && (
                    <span style={{ fontSize: "13px", background: "rgba(91,141,239,0.25)", color: "var(--accent-blue)", padding: "3px 10px", borderRadius: "6px" }}>
                      🏨 住宿
                    </span>
                  )}
                  {stop.csvName && (
                    <span style={{ fontSize: "13px", background: "rgba(127,205,145,0.2)", color: "var(--accent-green)", padding: "3px 10px", borderRadius: "6px" }}>
                      ✓ CSV
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: 700, fontSize: "18px", lineHeight: 1.35 }}>{stop.title}</div>
                {stop.isHotel && stop.hotelId && HOTELS[stop.hotelId] && (
                  <div style={{ fontSize: "14px", color: "var(--accent-blue)", marginTop: "8px", lineHeight: 1.6 }}>
                    <div>{HOTELS[stop.hotelId].address}</div>
                    <div style={{ marginTop: "4px" }}>
                      {HOTELS[stop.hotelId].features}
                      {" · "}
                      <a href={HOTELS[stop.hotelId].tripUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)" }}>
                        Trip.com ↗
                      </a>
                    </div>
                  </div>
                )}
                {stop.klookUrl && (
                  <a href={stop.klookUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "#7FCD91", marginTop: "8px", display: "inline-block", fontWeight: 600 }}>
                    已訂 Klook 商品 ↗
                  </a>
                )}
                {stop.detail && (
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", margin: "10px 0 0", lineHeight: 1.6 }}>{stop.detail}</p>
                )}
                {(stop.openMapsUrl || stop.mapsUrl) && (
                  <a
                    href={stop.openMapsUrl || stop.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "14px", color: "var(--gold)", marginTop: "10px", display: "inline-block", fontWeight: 600 }}
                  >
                    開啟此站 Google Maps ↗
                  </a>
                )}
                <PlaceReviews stop={stop} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
