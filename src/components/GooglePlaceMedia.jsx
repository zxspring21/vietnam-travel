import { useEffect, useState } from "react";
import { openPlaceUrlFromStop } from "../utils/googleMaps";
import { usePlacePhoto } from "../hooks/usePlacePhoto";

/** 站點卡片：最多 3 張 Google 實景照 + 文字地圖連結 */
export default function GooglePlaceMedia({ mapsUrl, title, name, csvId, stop, thumbHeight = 180 }) {
  const enrichedStop = stop || { mapsUrl, csvName: name, title, csvId };
  const linkUrl = enrichedStop.openMapsUrl || openPlaceUrlFromStop(enrichedStop) || mapsUrl;
  const { urls, loading, currentUrl } = usePlacePhoto(enrichedStop);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    setPhotoIdx(0);
  }, [urls.join("|")]);

  const photoSrc = urls[photoIdx] ?? currentUrl;
  const showPhoto = Boolean(photoSrc);
  const multi = urls.length > 1;

  const boxStyle = {
    display: "block",
    textDecoration: "none",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(200,151,90,0.35)",
    position: "relative",
    height: thumbHeight,
    background: showPhoto ? "#1a2520" : "linear-gradient(145deg, #1a2520 0%, #2d3a28 50%, #3d2818 100%)",
  };

  const statusText = loading
    ? "載入實景照…"
    : showPhoto
      ? multi
        ? `實景照 ${photoIdx + 1}/${urls.length} · 點擊開地圖`
        : "Google 實景照 · 點擊開啟地圖"
      : linkUrl
        ? "執行 npm run fetch-photos"
        : "—";

  const cyclePhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (urls.length > 1) setPhotoIdx((i) => (i + 1) % urls.length);
  };

  const inner = (
    <>
      {showPhoto && (
        <img
          key={photoSrc}
          src={photoSrc}
          alt={title || name || ""}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => {
            if (photoIdx + 1 < urls.length) setPhotoIdx((i) => i + 1);
          }}
        />
      )}
      {loading && !showPhoto && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9a8b7a",
            fontSize: "13px",
          }}
        >
          載入照片中…
        </div>
      )}
      {multi && showPhoto && (
        <button
          type="button"
          onClick={cyclePhoto}
          aria-label="下一張照片"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 3,
            background: "rgba(0,0,0,0.55)",
            color: "#f5edd6",
            border: "none",
            borderRadius: "8px",
            padding: "4px 10px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          {photoIdx + 1}/{urls.length} ›
        </button>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: showPhoto ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" : "none",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: "12px 14px",
          color: "#f5edd6",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.3 }}>{title || name}</div>
        <div style={{ fontSize: "12px", opacity: 0.85, marginTop: "4px" }}>{statusText}</div>
      </div>
    </>
  );

  if (!linkUrl) {
    return <div style={boxStyle}>{inner}</div>;
  }

  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={boxStyle} title={title || "開啟 Google Maps"}>
      {inner}
    </a>
  );
}
