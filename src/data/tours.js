/**
 * Tour 評估 — 以已訂 Klook 為主
 */
import { KLOOK_BOOKINGS, FLIGHT_BOOKING, PACKAGE_BOOKING } from "./bookedActivities.js";

export const TOUR_CATEGORIES = [
  {
    id: "booked",
    label: "✅ 已訂 Klook",
    description: "以下已付款，行程交通欄位已標註，勿重複購買包車/租機車",
    tours: KLOOK_BOOKINGS.map((b) => ({
      name: b.name,
      platform: "Klook",
      url: b.url,
      priceHint: `NT$${b.coupleTwd.toLocaleString()}/雙人`,
      rating: b.coversTransport ? "含交通" : "—",
      covers: b.note ? [b.note] : [],
      recommendDays: b.days,
      verdict: "已訂",
      note: b.note,
      csvCover: null,
    })),
  },
];

export const DAILY_TRANSPORT = [
  { day: 0, date: "6/11", city: "峴港", mode: "虎航+Grab", tourCover: "—", tourUrl: FLIGHT_BOOKING.url, tourStops: ["DAD", "Awaken"], walkable: false, scooter: false, note: "機加酒 Awaken" },
  { day: 1, date: "6/12", city: "峴港", mode: "Grab", tourCover: "—", tourUrl: null, tourStops: [], walkable: "部分", scooter: false, note: "市區" },
  { day: 2, date: "6/13", city: "巴拿山", mode: "Klook #13283", tourCover: "巴拿山門票+巴士", tourUrl: KLOOK_BOOKINGS[0].url, tourStops: ["巴拿山奇幻樂園", "Golden Bridge"], walkable: false, scooter: false, note: "勿另計交通費" },
  { day: 3, date: "6/14", city: "峴港", mode: "Grab", tourCover: "—", tourUrl: null, tourStops: [], walkable: false, scooter: false, note: "山茶半島" },
  { day: 4, date: "6/15", city: "順化", mode: "Klook #4808", tourCover: "陵姑灣順化一日遊", tourUrl: KLOOK_BOOKINGS[1].url, tourStops: ["Hue Imperial City", "天姥寺"], walkable: false, scooter: false, note: "含全程交通" },
  { day: 5, date: "6/16", city: "峴港", mode: "Grab", tourCover: "—", tourUrl: null, tourStops: [], walkable: false, scooter: false, note: "採購" },
  { day: 6, date: "6/17", city: "→會安", mode: "Klook 接送", tourCover: "峴港→會安", tourUrl: KLOOK_BOOKINGS[4].url, tourStops: ["Hoi An ancient town"], walkable: true, scooter: false, note: "Saga入住+套票" },
  { day: 7, date: "6/18", city: "會安", mode: "Klook 美山", tourCover: "美山+竹籃船", tourUrl: KLOOK_BOOKINGS[2].url, tourStops: ["My Son Sanctuary"], walkable: "古城", scooter: false, note: "巴士已含" },
  { day: 8, date: "6/19", city: "會安", mode: "Klook 印象秀", tourCover: "印象秀", tourUrl: KLOOK_BOOKINGS[3].url, tourStops: ["Hoi An Memories Land"], walkable: true, scooter: false, note: "Non La 17:00" },
  { day: 9, date: "6/20", city: "返程", mode: "Klook 接送+Grab 送機", tourCover: "會安→峴港+IT552", tourUrl: KLOOK_BOOKINGS[5].url, tourStops: ["DAD"], walkable: false, scooter: false, note: "11:00 Klook 至峴港 · 19:00 起飛" },
];

export const CSV_COVERAGE_SUMMARY = {
  totalSpots: 94,
  coveredByTours: 35,
  selfWalkOrGrab: 45,
  foodOptional: 14,
  recommendation: "已訂 Klook 涵蓋巴拿山、順化、美山、印象秀與峴港↔會安接送；其餘 Grab 短程即可。",
};
