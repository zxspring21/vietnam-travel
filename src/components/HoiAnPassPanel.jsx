import { USER_PASS_FIVE, HERITAGE_CLOSING, FOLK_PERFORMANCE, PASS_FAQ } from "../data/hoiAnAncientPass";

export default function HoiAnPassPanel() {
  return (
    <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(209,161,83,0.45)", fontSize: "14px", lineHeight: 1.65 }}>
      <h3 className="section-title" style={{ fontSize: "17px", color: "#D1A153" }}>
        🎫 會安古城套票（你的 5 選）
      </h3>
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
      <p style={{ margin: "14px 0 0", fontSize: "13px", color: "var(--accent-green)" }}>
        🎭 免費民俗表演（{FOLK_PERFORMANCE.times.join(" / ")}）已排：
      </p>
      <ul style={{ margin: "6px 0 0", paddingLeft: "20px" }}>
        {FOLK_PERFORMANCE.scheduled.map((s) => (
          <li key={`${s.day}-${s.time}`}>
            Day {s.day} <strong>{s.time}</strong> — {s.note}
          </li>
        ))}
      </ul>
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
