import { getPlaceImage, getImageByName } from "../data/placeImages";

export default function PlacePhoto({ placeKey, name, alt, size = "md", mapsUrl }) {
  const src = (placeKey && getPlaceImage(placeKey)) || getImageByName(name);
  const h = size === "sm" ? 72 : size === "lg" ? 200 : 120;

  const img = src ? (
    <img
      src={src}
      alt={alt || name}
      style={{ width: "100%", height: h, objectFit: "cover", display: "block" }}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling?.style && (e.target.nextSibling.style.display = "flex");
      }}
    />
  ) : null;

  const fallback = (
    <div
      style={{
        display: src ? "none" : "flex",
        width: "100%",
        height: h,
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a2520 0%, #2a2018 100%)",
        color: "#C8975A",
        fontSize: "11px",
        padding: "8px",
        textAlign: "center",
      }}
    >
      📍 {name?.slice(0, 20)}
    </div>
  );

  const inner = (
    <>
      {img}
      {fallback}
    </>
  );

  const wrapStyle = {
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid rgba(200,151,90,0.2)",
    flexShrink: 0,
    width: size === "sm" ? 96 : "100%",
  };

  if (mapsUrl) {
    return (
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...wrapStyle, textDecoration: "none" }} title="開啟 Google Maps">
        {inner}
      </a>
    );
  }

  return <div style={wrapStyle}>{inner}</div>;
}
