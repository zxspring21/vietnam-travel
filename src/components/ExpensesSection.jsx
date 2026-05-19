import {
  EXPENSE_ECONOMY_ACTIVE,
  BUDGET_TIERS,
  BUDGET_TARGET_PER_PERSON,
  TRANSPORT_COMPARE,
  calcExpenseSummary,
} from "../data/expenses";

export default function ExpensesSection() {
  const summary = calcExpenseSummary(EXPENSE_ECONOMY_ACTIVE);

  return (
    <div>
      <h2 style={h2}>💰 花費精算（目標每人 ≤ NT$80,000）</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {Object.values(BUDGET_TIERS).map((tier) => (
          <div
            key={tier.id}
            style={{
              background: tier.id === "economy" ? "rgba(127,205,145,0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${tier.id === "economy" ? "#7FCD91" : "rgba(200,151,90,0.2)"}`,
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ fontWeight: 700, color: tier.id === "economy" ? "#7FCD91" : "#C8975A" }}>{tier.label}</div>
            <div style={{ fontSize: "22px", fontWeight: 700, margin: "8px 0" }}>NT$ {tier.perPerson.toLocaleString()}/人</div>
            <div style={{ fontSize: "12px", color: "rgba(245,237,214,0.55)" }}>{tier.desc}</div>
            <ul style={{ fontSize: "11px", margin: "10px 0 0", paddingLeft: "16px", color: "rgba(245,237,214,0.6)" }}>
              {tier.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "24px" }}>
        <Card label="此方案雙人總計" value={`NT$ ${summary.total.toLocaleString()}`} />
        <Card label="每人約" value={`NT$ ${summary.perPerson.toLocaleString()}`} highlight={summary.withinBudget} />
        <Card label="預算目標" value={`NT$ ${BUDGET_TARGET_PER_PERSON.toLocaleString()}`} />
      </div>

      <h3 style={h3}>🛵 交通 CP 值比較</h3>
      <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse", marginBottom: "28px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(200,151,90,0.3)" }}>
            {["方式", "費用", "適用", "孕婦", "CP"].map((h) => (
              <th key={h} style={{ padding: "8px", textAlign: "left", color: "#C8975A" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRANSPORT_COMPARE.map((r) => (
            <tr key={r.mode} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={td}>{r.mode}</td>
              <td style={td}>{r.cost}</td>
              <td style={td}>{r.bestFor}</td>
              <td style={td}>{r.pregnant}</td>
              <td style={td}>{r.cp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: "12px", color: "rgba(245,237,214,0.55)", marginBottom: "20px" }}>
        Trip.com 機加酒：搜尋「台北→峴港」套餐，比奢華分開訂省 NT$9,000+/人。優先選<strong>含早餐</strong>，每日省一餐。
      </p>

      {summary.byCategory.map((cat) => (
        <div key={cat.id} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${cat.color}33`, borderRadius: "12px", padding: "16px", marginBottom: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <strong style={{ color: cat.color }}>{cat.label}</strong>
            <span style={{ color: cat.color }}>NT$ {cat.subtotal.toLocaleString()}</span>
          </div>
          {cat.items.map((item, i) => (
            <div key={i} style={{ fontSize: "13px", padding: "6px 0", borderTop: i ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <span>
                  {item.name}
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "8px", fontSize: "12px", color: "#e8b86d", fontWeight: 600 }}>
                      連結 ↗
                    </a>
                  ) : null}
                </span>
                <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{item.amount.toLocaleString()}</span>
              </div>
              {item.note && <div style={{ fontSize: "11px", color: "rgba(245,237,214,0.45)" }}>{item.note}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Card({ label, value, highlight }) {
  return (
    <div style={{ background: highlight ? "rgba(127,205,145,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${highlight ? "#7FCD91" : "rgba(200,151,90,0.2)"}`, borderRadius: "10px", padding: "14px", textAlign: "center" }}>
      <div style={{ fontSize: "11px", opacity: 0.6 }}>{label}</div>
      <div style={{ fontSize: "18px", fontWeight: 700, color: highlight ? "#7FCD91" : "#C8975A", marginTop: "6px" }}>{value}</div>
    </div>
  );
}

const h2 = { fontSize: "18px", color: "#C8975A", marginBottom: "16px", fontWeight: 700 };
const h3 = { fontSize: "15px", color: "#C8975A", marginBottom: "12px", fontWeight: 700 };
const td = { padding: "8px", verticalAlign: "top" };
