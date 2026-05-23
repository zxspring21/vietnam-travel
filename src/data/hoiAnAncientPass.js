/**
 * 會安古城套票 Klook #72346 — 你的 5 選（每人 1 套）
 * 古蹟多於 17:30 關門 → 已排在 Day 6 13:00–16:30
 */
export const USER_PASS_FIVE = [
  { slot: 1, label: "進記古宅", csvName: "進記古宅", day: 6, time: "13:00" },
  { slot: 2, label: "福建會館", csvName: "福建會館", day: 6, time: "13:40" },
  { slot: 3, label: "陶瓷貿易博物館", csvName: "Museum of Trade Ceramics", day: 6, time: "14:20" },
  { slot: 4, label: "會安歷史文化博物館", csvName: "Hoi An Museum", day: 6, time: "15:00" },
  { slot: 5, label: "日本橋（來遠橋）", csvName: "Chùa Cầu", day: 6, time: "15:45" },
];

export const HERITAGE_CLOSING = {
  time: "17:30",
  note: "古城付費古蹟多於 17:30 關門；17:30 後 Teh Dar 秀與夜市。",
};

export const FOLK_PERFORMANCE = {
  venue: "The Center for Culture and Sports of Hoi An city",
  csvName: "The Center for Culture and Sports of Hoi An city",
  times: ["10:15", "15:15", "16:15"],
  note: "免費，與套票分開。Day 6 套票時間緊，建議改 Day 7 無法（美山團）→ 可放棄或 Day 8 前若路過 10:15",
  optional: true,
};

export const PASS_FAQ = [
  {
    q: "需要一人買兩套嗎？",
    a: "不需要。你的 5 個點正好一套；雙人買 2 套即可。",
  },
  {
    q: "為什麼沒排「古鎮風光」？",
    a: "你的 5 選已滿（日本橋、進記、福建、陶瓷館、歷史博物館）。進城步行仍會經過古鎮街景。",
  },
  {
    q: "17:30 來得及嗎？",
    a: "Day 6 已壓在 13:00–16:30 逛完 5 點，16:45 前離開古城區；晚上 Teh Dar 不在古蹟內。",
  },
];

/** @deprecated 使用 USER_PASS_FIVE */
export const RECOMMENDED_FIVE = USER_PASS_FIVE;
