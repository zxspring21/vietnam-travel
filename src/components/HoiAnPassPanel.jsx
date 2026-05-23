import { USER_PASS_FIVE, HERITAGE_CLOSING, FOLK_PERFORMANCE, PASS_FAQ } from "../data/hoiAnAncientPass";

export default function HoiAnPassPanel() {
  return (
    <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(209,161,83,0.45)", fontSize: "14px", lineHeight: 1.65 }}>
      <h3 className="section-title" style={{ fontSize: "17px", color: "#D1A153" }}>
        🎫 會安古城套票（5 選）建議
      </h3>
      <p style={{ margin: "0 0 12px", color: "var(--text-muted)" }}>
        每人 1 套 = 5 個付費景點各進 1 次；<strong style={{ color: "var(--text)" }}>雙人買 2 套即可</strong>
        ，一般不必一人買兩套。
      </p>
      <p style={{ margin: "0 0 10px", color: "#DE7A32", fontSize: "13px" }}>
        ⏰ 古蹟約 <strong>{HERITAGE_CLOSING.time}</strong> 關門 — {HERITAGE_CLOSING.note}
      </p>
      <ol style={{ margin: 0, paddingLeft: "20px" }}>
        {USER_PASS_FIVE.map((r) => (
          <li key={r.slot} style={{ marginBottom: "6px" }}>
            <strong>Day {r.day} {r.time}</strong> · {r.label}
          </li>
        ))}
      </ol>
      {FOLK_PERFORMANCE.optional && (
        <p style={{ margin: "14px 0 0", fontSize: "13px", color: "var(--text-muted)" }}>
          🎭 民俗表演（{FOLK_PERFORMANCE.times.join(" / ")}）{FOLK_PERFORMANCE.note}
        </p>
      )}
      <details style={{ marginTop: "12px" }}>
        <summary style={{ cursor: "pointer", color: "#C8975A" }}>常見問題</summary>
        <ul style={{ margin: "10px 0 0", paddingLeft: "20px" }}>
          {PASS_FAQ.map((f) => (
            <li key={f.q} style={{ marginBottom: "8px" }}>
              <strong>{f.q}</strong>
              <div style={{ color: "var(--text-muted)" }}>{f.a}</div>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
