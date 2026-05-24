import { getCsvByName } from "../data/csvRegistry";
import { TOP10_SOUVENIRS, SOUVENIR_ALTERNATES, SOUVENIR_SHOPPING_DAYS, SOUVENIR_CATEGORIES } from "../data/souvenirs";
import GooglePlaceMedia from "./GooglePlaceMedia";

function souvenirPhotoStop(s) {
  const p = s.photoAt ? getCsvByName(s.photoAt) : null;
  return {
    csvId: p?.id,
    csvName: s.photoAt || s.name,
    mapsUrl: p?.url,
    title: s.name,
    souvenirId: s.id,
    photoKey: `souvenir-item-${s.id}`,
  };
}

export default function SouvenirsSection() {
  return (
    <div>
      <h2 className="section-title" style={{ fontSize: "22px" }}>🎁 伴手禮必買 Top 10</h2>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px" }}>
        依預算、送禮對象與保存性篩選；照片來自 Google Places 實景圖（店家/超市）。
        建議 <strong>Day 5（6/16）</strong> 集中採購。請先執行 <code>npm run fetch-photos</code> 或設定 API Key。
      </p>

      <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(200,151,90,0.4)" }}>
        <h3 className="section-title">建議採購動線（Dream Suite · An Hải 出發）</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px" }}>
          {SOUVENIR_SHOPPING_DAYS[0].places.map((name) => {
            const p = getCsvByName(name);
            return (
              <div key={name} style={{ borderRadius: "10px", overflow: "hidden" }}>
                <GooglePlaceMedia
                  stop={{ csvId: p?.id, csvName: name, mapsUrl: p?.url, title: name }}
                  thumbHeight={120}
                />
              </div>
            );
          })}
        </div>
        {SOUVENIR_SHOPPING_DAYS.map((d) => (
          <div key={d.day}>
            <div style={{ fontWeight: 700, color: "var(--accent-green)" }}>
              Day {d.day} · {d.date}：{d.places.join(" → ")}
            </div>
          </div>
        ))}
      </div>

      {SOUVENIR_CATEGORIES.map((cat) => (
        <div key={cat.id} style={{ marginBottom: "28px" }}>
          <h3 className="section-title">{cat.label}</h3>
          {TOP10_SOUVENIRS.filter((s) => cat.items.includes(s.id)).map((s) => (
            <div
              key={s.id}
              className="card"
              style={{
                marginBottom: "12px",
                padding: 0,
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "minmax(160px, 200px) 1fr",
              }}
            >
              <GooglePlaceMedia stop={souvenirPhotoStop(s)} title={s.name} thumbHeight={160} />
              <div style={{ padding: "14px 16px", fontSize: "14px", lineHeight: 1.65 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <strong style={{ fontSize: "17px", color: "#f5edd6" }}>{s.name}</strong>
                  <span style={{ color: "var(--gold)", fontWeight: 600 }}>{s.priceTwdHint}</span>
                </div>
                <div style={{ color: "var(--accent-blue)", marginTop: "6px" }}>品牌：{s.brand}</div>
                <div style={{ color: "var(--text-muted)", marginTop: "4px" }}>
                  參考價 {s.priceVnd} · 哪裡買：{s.where}
                </div>
                <p style={{ margin: "10px 0 0" }}>{s.reason}</p>
                <p style={{ margin: "8px 0 0", color: "var(--accent-green)", fontSize: "13px" }}>💡 {s.buyTip}</p>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="card card-highlight" style={{ fontSize: "13px" }}>
        <strong>未入 Top10 的備選：</strong>
        <ul style={{ margin: "10px 0 0", paddingLeft: "18px", lineHeight: 1.7 }}>
          {SOUVENIR_ALTERNATES.map((a) => (
            <li key={a.name}>
              <strong>{a.name}</strong> — {a.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
