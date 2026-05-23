import { photoSetupHint } from "../utils/placePhoto";

export default function PhotoSetupBanner() {
  const hint = photoSetupHint();
  if (hint.ok) return null;

  return (
    <div
      className="card"
      style={{
        marginBottom: "20px",
        borderColor: "rgba(222,122,50,0.5)",
        background: "rgba(222,122,50,0.12)",
        fontSize: "14px",
        lineHeight: 1.6,
      }}
    >
      <strong style={{ color: "#DE7A32" }}>⚠️ 照片無法顯示</strong>
      <p style={{ margin: "10px 0 0", color: "var(--text-muted)" }}>{hint.message}</p>
      <ol style={{ margin: "10px 0 0", paddingLeft: "20px", color: "var(--text)" }}>
        <li>
          在 <code>.env</code> 加入（兩行可填相同 Key）：
          <pre style={{ marginTop: "8px", fontSize: "12px", overflow: "auto" }}>
{`GOOGLE_MAPS_API_KEY=你的key
VITE_GOOGLE_MAPS_API_KEY=你的key`}
          </pre>
        </li>
        <li>
          Google Cloud 啟用 <strong>Places API (New)</strong> 與 Place Photos (New)
        </li>
        <li>
          執行 <code>npm run fetch-photos</code>（每站最多 3 張 jpg → <code>public/place-photos/</code>）
        </li>
        <li>
          重啟 <code>npm run dev</code> 後重新整理
        </li>
      </ol>
      <p style={{ margin: "10px 0 0", fontSize: "13px", opacity: 0.85 }}>
        僅跑 fetch-photos 而沒下載 jpg 時，畫面不會有圖——因為瀏覽器還需要 Key 或本機檔案才能顯示。
      </p>
    </div>
  );
}
