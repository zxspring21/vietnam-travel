/** 推薦住宿 — 依當日行程主要活動區域（步行/Grab 可及） */
export const HOTELS = {
  danangMain: {
    id: "danangMain",
    name: "Grand Mercure Danang",
    nameZh: "峴港 Grand Mercure Danang",
    area: "峴港美溪海灘（D0–D2 市區/巴拿山）",
    stars: "4★ 含早",
    priceHint: "NT$1,800–2,400/晚",
    features: "美溪沙灘步行 · 含早 · 近 D1 市區串遊",
    mapsUrl:
      "https://www.google.com/maps/place/Grand+Mercure+Danang/@16.0483415,108.2267041,17z/data=!4m21!1m10!3m9!1s0x314219db392e5bb5:0x2a43b2cacea4567a!2sGrand+Mercure+Danang!8m2!3d16.0483415!4d108.2267041!16s%2Fg%2F1vn9lkpb",
    tripUrl:
      "https://tw.trip.com/hotels/list?city=770&checkin=2025-06-11&checkout=2025-06-14&keyword=Grand+Mercure+Danang",
    photoPath: "/place-photos/hotel-danangMain.jpg",
    lat: 16.0483415,
    lng: 108.2267041,
    days: [0, 1, 2],
  },
  hoiAn: {
    id: "hoiAn",
    name: "Hotel Royal Hoi An - MGallery",
    nameZh: "會安 Royal MGallery（古城旁）",
    area: "會安古城步行圈（D3–D6）",
    stars: "5★ 含早",
    priceHint: "NT$2,200–3,200/晚",
    features: "步行 5–10 分鐘進古城 · 燈籠街/日本橋近 · 取代偏遠度假村",
    mapsUrl:
      "https://www.google.com/maps/place/Hotel+Royal+Hoi+An+-+MGallery/data=!4m2!3m1!1s0x31420f51aba9bcd1:0x8c45c29f88c42ed0",
    tripUrl:
      "https://tw.trip.com/hotels/list?city=725&checkin=2025-06-14&checkout=2025-06-18&keyword=Hotel+Royal+Hoi+An+MGallery",
    photoPath: "/place-photos/hotel-hoiAn.jpg",
    lat: 15.8787,
    lng: 108.3283,
    days: [3, 4, 5, 6],
  },
  hue: {
    id: "hue",
    name: "Pilgrimage Village Boutique Resort",
    nameZh: "順化 Pilgrimage Village",
    area: "順化香江畔（D7 抵達 · D8 皇城）",
    stars: "4★ 含早",
    priceHint: "NT$2,000–2,800/晚",
    features: "度假感 · Grab 至皇城約 15 分",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pilgrimage+Village+Boutique+Resort+Hue",
    tripUrl:
      "https://tw.trip.com/hotels/list?city=662&checkin=2025-06-18&checkout=2025-06-19&keyword=Pilgrimage+Village+Hue",
    photoPath: "/place-photos/hotel-hue.jpg",
    lat: 16.449,
    lng: 107.567,
    days: [7, 8],
  },
  danangFinal: {
    id: "danangFinal",
    name: "Novotel Danang Premier Han River",
    nameZh: "峴港 Novotel 漢江",
    area: "峴港漢江畔（D8 晚起 · D9 山茶半島 · D10 送機）",
    stars: "4★ 含早",
    priceHint: "NT$1,600–2,200/晚",
    features: "漢市場/市區近 · 送機方便",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Novotel+Danang+Premier+Han+River",
    tripUrl:
      "https://tw.trip.com/hotels/list?city=770&checkin=2025-06-19&checkout=2025-06-21&keyword=Novotel+Danang+Han+River",
    photoPath: "/place-photos/hotel-danangFinal.jpg",
    lat: 16.0678,
    lng: 108.2208,
    days: [8, 9, 10],
  },
};

export function getHotelForDay(day) {
  if (day <= 2) return HOTELS.danangMain;
  if (day <= 6) return HOTELS.hoiAn;
  if (day === 7) return HOTELS.hue;
  return HOTELS.danangFinal;
}
