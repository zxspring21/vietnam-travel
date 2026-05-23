import { EXCHANGE_ADVICE } from "../data/exchange";

export default function ExchangeTip({ day }) {
  const p = EXCHANGE_ADVICE.primary;
  const a = EXCHANGE_ADVICE.arrivalPlan;

  if (day === 1) {
    return (
      <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(91,141,239,0.4)", fontSize: "14px" }}>
        <strong style={{ color: "#5B8DEF" }}>💱 今日換匯 · {p.name}</strong>
        <p style={{ margin: "8px 0 0" }}>
          <strong>{p.scheduledTime}</strong>（營業 {p.hours}）→ 08:30 回飯店等 Klook 09:00 接送
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(200,151,90,0.4)", fontSize: "14px", lineHeight: 1.65 }}>
      <strong style={{ color: "#C8975A" }}>💱 換匯時機 · {p.name}</strong>
      <p style={{ margin: "8px 0 0", color: "var(--text-muted)" }}>
        營業 <strong>{p.hours}</strong> · 行程改排 <strong>Day 1 {p.scheduledTime}</strong>（非今晚）
      </p>
      <p style={{ margin: "10px 0 0" }}>
        <strong>今晚 {a.flightLand} 抵達來得及嗎？</strong> {a.verdict}。
        {a.carryOnOnly && " 僅随身行李出關較快，但 Soạn Hà "}
        <strong>{a.soanHaCloses} 關門</strong>，Grab 機場→海洲多半已來不及。
      </p>
      <ul style={{ margin: "8px 0 0", paddingLeft: "20px", color: "var(--text-muted)" }}>
        {a.reasoning.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p style={{ margin: "10px 0 0", fontSize: "13px" }}>
        <strong>建議：</strong>
        {a.day0Instead}
      </p>
      <details style={{ marginTop: "10px" }}>
        <summary style={{ cursor: "pointer", color: "#C8975A" }}>{a.planB.label}</summary>
        <p style={{ margin: "8px 0 0", fontSize: "13px", color: "var(--text-muted)" }}>
          {a.planB.steps}
          <br />
          風險：{a.planB.risk}
        </p>
      </details>
    </div>
  );
}
