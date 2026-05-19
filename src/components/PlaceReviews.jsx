import { getPlaceDetails } from "../data/placeDetailsApi";
import { getMentionedHighlights } from "../utils/reviewHighlights";

export default function PlaceReviews({ stop }) {
  const key = stop?.csvName || stop?.csvId;
  const d = getPlaceDetails(key);
  if (!d) return null;

  const mentioned = getMentionedHighlights(d);
  if (!d.rating && !mentioned.length) return null;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px 14px",
        background: "rgba(0,0,0,0.35)",
        borderRadius: "10px",
        border: "1px solid rgba(200,151,90,0.25)",
        fontSize: "13px",
      }}
    >
      <div style={{ color: "#e8b86d", fontWeight: 700, marginBottom: mentioned.length ? "10px" : 0 }}>
        ⭐ {d.rating != null ? Number(d.rating).toFixed(1) : "—"} ·{" "}
        {(d.userRatingCount ?? 0).toLocaleString()} 則 Google 評論
      </div>
      {mentioned.length > 0 && (
        <>
          <div style={{ fontSize: "12px", color: "rgba(245,237,214,0.55)", marginBottom: "8px" }}>
            Mentioned in reviews（評論常提及）
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {mentioned.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(127,205,145,0.2)",
                  color: "#7FCD91",
                  border: "1px solid rgba(127,205,145,0.35)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
