import { useMemo, useState } from "react";
import { openPlaceUrlFromStop } from "../utils/googleMaps";
import { getPlacePhotoCandidates } from "../utils/placePhoto";

/** 站點卡片：背景圖（jpg → svg → Static Map）+ 點擊開啟 CSV 原始 Google Place */
export default function GooglePlaceMedia({
  mapsUrl,
  title,
  name,
  csvId,
  stop,
  thumbHeight = 180,
}) {
  const enrichedStop = stop || { mapsUrl, csvName: name, title, csvId };
  const linkUrl = enrichedStop.openMapsUrl || openPlaceUrlFromStop(enrichedStop) || mapsUrl;
  const candidates = useMemo(() => getPlacePhotoCandidates(enrichedStop), [enrichedStop]);
  const [photoIdx, setPhotoIdx] = useState(0);
  const photoSrc = candidates[photoIdx] ?? null;
  const showPhoto = Boolean(photoSrc);

  if (!linkUrl && !candidates.length) return null;

  const inner = (
    <>
      {showPhoto && (
        <img
          key={photoSrc}
          src={photoSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => {
            if (photoIdx + 1 < candidates.length) setPhotoIdx((i) => i + 1);
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: showPhoto ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" : "none",
          zIndex: 1,
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
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.3 }}>{title || name}</div>
        <div style={{ fontSize: "12px", opacity: 0.85, marginTop: "4px" }}>
          {linkUrl ? "Google Maps · 點擊開啟此站" : "預覽圖"}
        </div>
      </div>
    </>
  );

  const boxStyle = {
    display: "block",
    textDecoration: "none",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(200,151,90,0.35)",
    position: "relative",
    height: thumbHeight,
    background: showPhoto
      ? undefined
      : "linear-gradient(145deg, #1a2520 0%, #2d3a28 40%, #3d2818 100%)",
  };

  if (!linkUrl) {
    return <div style={boxStyle}>{inner}</div>;
  }

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={boxStyle}
      title={title || "開啟 Google Maps"}
    >
      {inner}
    </a>
  );
}
