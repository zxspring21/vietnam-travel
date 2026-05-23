/** 花費 — 依已訂票券（交通已含於 Klook 者不另計包車/租機車） */
import {
  FLIGHT_BOOKING,
  PACKAGE_BOOKING,
  KLOOK_BOOKINGS,
  KLOOK_COUPLE_TOTAL,
} from "./bookedActivities.js";

export const BUDGET_TARGET_PER_PERSON = 80000;

const GRAB_MISC = 3500;

export const EXPENSE_CATEGORIES = [
  {
    id: "package",
    label: "✈️🏨 機加酒（已訂，含機票）",
    color: "#C8975A",
    items: [
      {
        name: "Trip.com 6/11–6/20 虎航+Elite+Saga（2人）",
        amount: PACKAGE_BOOKING.coupleTotal,
        link: PACKAGE_BOOKING.url,
        note: `含虎航 IT551/IT552 · ${FLIGHT_BOOKING.baggage} · Elite Riverlight 6/11–17 · Saga 6/17–20`,
      },
    ],
  },
  {
    id: "klook",
    label: "🎫 已訂 Klook（含交通者不重複計程）",
    color: "#7B5EA7",
    items: KLOOK_BOOKINGS.map((b) => ({
      name: b.name,
      amount: b.coupleTwd,
      link: b.url,
      note: b.coversTransport ? "✓ 含交通" : b.note,
    })),
  },
  {
    id: "transport_local",
    label: "🛵 其餘短程（Grab）",
    color: "#3D8B8B",
    items: [
      {
        name: "機場接送、市區短程、竹籃船至港口等",
        amount: GRAB_MISC,
        link: "https://www.google.com/maps/search/?api=1&query=Grab+Da+Nang",
        note: "Klook 已涵蓋：巴拿山、順化、美山、烹飪課接送、印象秀、峴港↔會安接送",
      },
    ],
  },
  {
    id: "food",
    label: "🍽️ 餐飲（不含 Klook 已含餐）",
    color: "#DE7A32",
    items: [
      {
        name: "每日三餐約 9 天（2人）",
        amount: 11000,
        link: "https://tw.trip.com/travel-guide/attraction/da-nang-669-food-and-drinks/",
        note: "含早來自飯店；巴拿山/美山/印象秀午餐已含",
      },
    ],
  },
  {
    id: "misc",
    label: "💆 其他",
    color: "#4A7C59",
    items: [
      { name: "伴手禮、旅平險", amount: 2500, link: "https://tw.trip.com/travel-guide/shopping/", note: "" },
    ],
  },
];

export const EXPENSE_ECONOMY_ACTIVE = EXPENSE_CATEGORIES;

export const TRANSPORT_COMPARE = [
  { mode: "Klook 含巴士/團", cost: "見上方明細", bestFor: "巴拿山、順化、美山、印象秀、接送", pregnant: "✅", cp: "★★★★★" },
  { mode: "Grab", cost: "NT$80–150/趟", bestFor: "市區、送機、竹籃船短程", pregnant: "✅", cp: "★★★★" },
  { mode: "租機車", cost: "—", bestFor: "本行程不建議", pregnant: "❌", cp: "—" },
  { mode: "包車", cost: "—", bestFor: "已由 Klook 順化團取代", pregnant: "—", cp: "—" },
];

export function calcExpenseSummary(categories = EXPENSE_ECONOMY_ACTIVE) {
  let total = 0;
  const byCategory = categories.map((cat) => {
    const subtotal = cat.items.reduce((s, i) => s + i.amount, 0);
    total += subtotal;
    return { ...cat, subtotal };
  });
  return {
    byCategory,
    total,
    perPerson: Math.round(total / 2),
    currency: "NT$",
    withinBudget: Math.round(total / 2) <= BUDGET_TARGET_PER_PERSON,
    klookTotal: KLOOK_COUPLE_TOTAL,
  };
}

const _s = calcExpenseSummary();

export const BUDGET_TIERS = {
  economy: {
    id: "economy",
    label: "✅ 已訂票券加總",
    desc: `機加酒（含機票）+Klook+Grab 等`,
    perPerson: _s.perPerson,
    coupleTotal: _s.total,
    highlights: [
      `機加酒（含機票）NT$${PACKAGE_BOOKING.coupleTotal.toLocaleString()}`,
      `Klook NT$${KLOOK_COUPLE_TOTAL.toLocaleString()}`,
    ],
  },
};
