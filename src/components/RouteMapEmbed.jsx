import { embedDirectionsFromStops } from "../utils/googleMaps";
import { enrichStops } from "../utils/stopMaps";

export default function RouteMapEmbed({ stops, embedUrl: embedUrlProp, directionsUrl, title, height = 320 }) {
  const enriched = stops?.length ? enrichStops(stops) : [];
  const embedUrl = embedUrlProp || embedDirectionsFromStops(enriched) || null;

  if (!embedUrl && !directionsUrl) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      {title && <h3 className="section-title">{title}</h3>}
      {embedUrl && (
        <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border-gold)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          <iframe
            title={title || "路線地圖"}
            src={embedUrl}
            width="100%"
            height={height}
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
      {directionsUrl && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "12px",
            padding: "12px 18px",
            fontSize: "15px",
            fontWeight: 600,
            color: "#1a1008",
            background: "linear-gradient(135deg, #e8b86d, #c8975a)",
            borderRadius: "999px",
            textDecoration: "none",
          }}
        >
          🗺️ 在 Google Maps 開啟（可選最佳交通方式）↗
        </a>
      )}
    </div>
  );
}
