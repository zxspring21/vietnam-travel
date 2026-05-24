import { EXCHANGE_ADVICE } from "../data/exchange";

export default function ExchangeTip({ day }) {
  const p = EXCHANGE_ADVICE.primary;
  const swap = EXCHANGE_ADVICE.itinerarySwap;

  if (day === 1) {
    return (
      <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(91,141,239,0.4)", fontSize: "14px" }}>
        <strong style={{ color: "#5B8DEF" }}>💱 今日換匯 · {p.name}</strong>
        <p style={{ margin: "8px 0 0" }}>
          <strong>{p.scheduledTime}</strong>（{p.hours}）— 休閒日不趕 Klook，{p.note}
        </p>
        <p style={{ margin: "10px 0 0", fontSize: "13px", color: "var(--text-muted)" }}>{swap.summary}</p>
        <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#DE7A32" }}>
          ⚠️ {swap.klookWarning}
        </p>
      </div>
    );
  }

  if (day === 3) {
    return (
      <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(200,151,90,0.4)", fontSize: "14px" }}>
        <strong style={{ color: "#C8975A" }}>🎫 峴港一日遊 Klook #1573</strong>
        <p style={{ margin: "8px 0 0", color: "#DE7A32" }}>⚠️ {swap.klookWarning}</p>
      </div>
    );
  }

  const a = EXCHANGE_ADVICE.arrivalPlan;
  return (
    <div className="card" style={{ marginBottom: "20px", borderColor: "rgba(200,151,90,0.4)", fontSize: "14px", lineHeight: 1.65 }}>
      <strong style={{ color: "#C8975A" }}>💱 換匯時機</strong>
      <p style={{ margin: "8px 0 0" }}>{a.day0Instead}</p>
      <p style={{ margin: "8px 0 0", color: "var(--text-muted)" }}>
        當晚 {a.flightLand} 抵達：{a.verdict}（Soạn Hà {a.soanHaCloses} 關門）。
      </p>
    </div>
  );
}
