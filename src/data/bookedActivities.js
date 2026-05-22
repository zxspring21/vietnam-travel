/** 已訂 Klook / 機票 / 機加酒 — 含交通者不再另計 Grab/包車/租機車 */

export const FLIGHT_BOOKING = {
  airline: "台灣虎航",
  outbound: { date: "6/11", flight: "IT551", time: "16:35–18:10", route: "桃園 → 峴港" },
  inbound: { date: "6/20", flight: "IT552", time: "19:00–22:40", route: "峴港 → 桃園" },
  perPersonTwd: 10138,
  baggage: "僅手提行李，不含托運",
  url: "https://tw.trip.com/flights/showfarefirst?dcity=tpe&acity=dad&ddate=2026-06-11&rdate=2026-06-20&triptype=rt&class=y&quantity=2&locale=zh-TW&curr=TWD",
  coupleTotal: 10138 * 2,
};

export const PACKAGE_BOOKING = {
  label: "Trip.com 機加酒（6/11–6/20）",
  coupleTotal: 36000,
  perPerson: 18000,
  includesFlights: true,
  url: "https://tw.trip.com/packages/list?departurecity=台北&arrivalcity=峴港",
  segments: [
    { from: "6/11", to: "6/17", hotel: "danangMain", note: "Awaken Danang Hotel" },
    { from: "6/17", to: "6/20", hotel: "hoiAn", note: "THE SAGA HOTEL HOI AN" },
  ],
};

/** @type {Array<{id:string, name:string, platform:string, url:string, coupleTwd:number, days:number[], coversTransport:boolean, note:string}>} */
export const KLOOK_BOOKINGS = [
  {
    id: "dad-day-1573",
    name: "峴港一日遊（大理石山+山茶半島+占婆博物館+韓市場）",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/",
    coupleTwd: 1916,
    perPersonTwd: 958,
    days: [1],
    coversTransport: true,
    note: "09:00 飯店接送 · 13:30 回飯店 · 2 人",
    stops: [
      { label: "努諾可石雕", csvName: null },
      { label: "大理石山售票亭（五行山）", csvName: "The Marble Mountains", detail: "舍利塔、靈應一寺、唐鐘洞" },
      { label: "峴港靈應寺·白佛觀音像（山茶半島）", csvName: "Chùa Linh Ứng", detail: "Bai But / Lady Buddha 一帶" },
      { label: "順福橋", csvName: null, detail: "Thuan Phuoc Bridge" },
      { label: "峴港占婆雕刻博物館", csvName: "Da Nang Museum of Cham Sculpture" },
      { label: "韓市場", csvName: "Han Market" },
    ],
  },
  {
    id: "bana-13283",
    name: "峴港太陽世界巴拿山門票（含雲霄飛車3+自助午餐+往返巴士）",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/13283-ba-na-hills-ticket-da-nang/",
    coupleTwd: 3614,
    perPersonTwd: 1807,
    days: [2],
    coversTransport: true,
    note: "2 人 · 往返接駁巴士已含",
  },
  {
    id: "hue-4808",
    name: "陵姑灣＆順化市區一日遊（峴港出發）",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/4808-hue-day-tour-da-nang/",
    coupleTwd: 2550,
    days: [4],
    coversTransport: true,
    note: "2 人 · 含往返交通與行程",
  },
  {
    id: "myson-1602",
    name: "美山聖地半日遊（會安 08:00 出發含午餐）",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/1602-my-son-discovery-hoi-an/",
    coupleTwd: 748,
    days: [7],
    coversTransport: true,
    note: "11:30 廣南麵午餐 · 13:30 回飯店",
  },
  {
    id: "memories-17514",
    name: "會安印象秀＋主題樂園（生態門票+燒烤自助+放水燈+彩繪）",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/17514-hoi-an-memories-show-ticket/",
    coupleTwd: 2754,
    days: [8],
    coversTransport: true,
    note: "週三至週一開放 · Non La 燒烤自助 17:00–20:30",
  },
  {
    id: "transfer-dad-hoi-182982",
    name: "峴港 → 會安私人接送",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/",
    coupleTwd: 340,
    days: [6],
    coversTransport: true,
    note: "6/17 移防 · 2 人",
  },
  {
    id: "transfer-hoi-dad-182982",
    name: "會安 → 峴港私人接送（送機日）",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/",
    coupleTwd: 340,
    days: [9],
    coversTransport: true,
    note: "2 人 · 若需先回峴港再赴機場",
  },
  {
    id: "basket-24274",
    name: "會安椰林竹籃船體驗",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/24274-basket-boat-ticket-hoi-an-coconut-forest/",
    coupleTwd: 296,
    days: [7],
    coversTransport: false,
    note: "2 人 · 古城旁 Grab 短程",
  },
  {
    id: "pass-72346",
    name: "會安古鎮景點套票（5 景點）",
    platform: "Klook",
    url: "https://www.klook.com/zh-TW/activity/72346-hoi-an-ancient-town-attractions-adminssion-ticket/",
    coupleTwd: 312,
    days: [6, 7, 8],
    linkDays: [6],
    coversTransport: false,
    note: "2 人 · 五景點（6/17–6/19 分散使用）",
  },
];

/** 當日行程側欄顯示的 Klook（套票僅在首日列出，避免重複） */
export function getBookingsForDay(day) {
  return KLOOK_BOOKINGS.filter((b) => {
    if (!b.days.includes(day)) return false;
    if (b.linkDays) return b.linkDays.includes(day);
    return true;
  });
}

/** 全表核對用：每個 activityId 僅一筆 */
export const KLOOK_BY_ACTIVITY_ID = {
  1573: KLOOK_BOOKINGS[0],
  13283: KLOOK_BOOKINGS[1],
  4808: KLOOK_BOOKINGS[2],
  1602: KLOOK_BOOKINGS[3],
  17514: KLOOK_BOOKINGS[4],
  182982: KLOOK_BOOKINGS[5],
  24274: KLOOK_BOOKINGS[6],
  72346: KLOOK_BOOKINGS[7],
};

export function getKlookBooking(id) {
  return KLOOK_BOOKINGS.find((b) => b.id === id);
}

export function dayHasCoveredTransport(day) {
  return getBookingsForDay(day).some((b) => b.coversTransport);
}

export const KLOOK_COUPLE_TOTAL = KLOOK_BOOKINGS.reduce((s, b) => s + b.coupleTwd, 0);
