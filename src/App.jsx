import { useState } from "react";
import HomeOverview from "./components/HomeOverview";
import DailyItinerary from "./components/DailyItinerary";
import ToursSection from "./components/ToursSection";
import ExpensesSection from "./components/ExpensesSection";
import CsvList from "./components/CsvList";
import FlightHotel from "./components/FlightHotel";

const TABS = [
  ["overview", "🏠 首頁路線"],
  ["daily", "📅 每日行程"],
  ["tours", "🎫 Tour 評估"],
  ["expenses", "💰 花費"],
  ["csv_list", "🔍 CSV 景點"],
  ["pkg_deal", "✈️ 機票住宿"],
];

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [dailyInitialDay, setDailyInitialDay] = useState(0);

  const goToDay = (day) => {
    setDailyInitialDay(day);
    setActiveSection("daily");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>🇻🇳 中越蜜月 · 6/11–6/21</h1>
        <p>Trip.com 機加酒 · Google 地圖導航 · 91+ CSV 景點 · 每日飯店起迄 · 開車路線模式</p>
      </header>

      <nav className="app-nav">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={activeSection === id ? "active" : ""}
            onClick={() => setActiveSection(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeSection === "overview" && <HomeOverview onSelectDay={goToDay} />}
        {activeSection === "daily" && <DailyItinerary key={dailyInitialDay} initialDay={dailyInitialDay} />}
        {activeSection === "tours" && <ToursSection />}
        {activeSection === "expenses" && <ExpensesSection />}
        {activeSection === "csv_list" && <CsvList />}
        {activeSection === "pkg_deal" && <FlightHotel />}
      </main>
    </div>
  );
}
