/** 已訂住宿 — 地圖連結以完整地址為準 */

function mapsAddressUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const DREAM_SUITE_ADDRESS = "121-123 Hà Bổng, An Hải, Đà Nẵng 550000, Vietnam";
const SAGA_ADDRESS = "321 Cửa Đại, Hội An Đông, Đà Nẵng 560000, Vietnam";

/** 峴港住宿（獨立訂價） */
export const DANANG_HOTEL_BOOKING = {
  coupleTotal: 12278,
  perPerson: 6139,
  nights: 6,
  checkIn: "6/11",
  checkOut: "6/17",
};

export const HOTELS = {
  danangMain: {
    id: "danangMain",
    name: "The Dream Suite",
    nameZh: "The Dream Suite 夢想套房飯店",
    csvName: "The Dream Suite",
    photoSearchQuery: "The Dream Suite, 121-123 Ha Bong, An Hai, Da Nang 550000 Vietnam",
    address: DREAM_SUITE_ADDRESS,
    area: "峴港 An Hải · 美溪沙灘東岸",
    stars: "已訂",
    priceHint: `NT$${DANANG_HOTEL_BOOKING.coupleTotal.toLocaleString()}/雙人 · 6 晚`,
    features: "6/11–6/17 · 近美溪、Klook 巴士集合點 A La Carte",
    mapsUrl:
      "https://www.google.com/maps/place/The+Dream+Suite/data=!4m2!3m1!1s0x31421783dd29d14f:0x7151e5bff6df4e2",
    tripUrl: "https://tw.trip.com/hotels/list?city=669&keyword=The+Dream+Suite",
    lat: 16.0482,
    lng: 108.2475,
    days: [0, 1, 2, 3, 4, 5],
    checkIn: "6/11",
    checkOut: "6/17",
  },
  hoiAn: {
    id: "hoiAn",
    name: "THE SAGA HOTEL HOI AN",
    nameZh: "THE SAGA HOTEL HOI AN",
    csvName: "THE SAGA HOTEL HOI AN",
    photoSearchQuery: "THE SAGA HOTEL HOI AN, 321 Cua Dai, Hoi An Vietnam",
    address: SAGA_ADDRESS,
    area: "會安 Cửa Đại · 近 An Bang",
    stars: "機加酒含早",
    priceHint: "含於機加酒",
    features: "6/17–6/20 · 321 Cửa Đại",
    mapsUrl:
      "https://www.google.com/maps/place/THE+SAGA+HOTEL+HOI+AN/data=!4m2!3m1!1s0x31420d5ba221929b:0x474daecf526df5cf",
    tripUrl: "https://tw.trip.com/hotels/list?city=725&keyword=THE+SAGA+HOTEL+HOI+AN",
    lat: 15.8878,
    lng: 108.3472,
    days: [6, 7, 8, 9],
    checkIn: "6/17",
    checkOut: "6/20",
  },
};

/** 巴拿山 Klook 巴士集合／下車點（非住宿） */
export const BANA_SHUTTLE_POINT = {
  name: "A La Carte Danang Beach",
  nameZh: "A La Carte Danang Beach",
  address: "200 Võ Nguyên Giáp, An Hải, Đà Nẵng 550000, Vietnam",
  mapsUrl: mapsAddressUrl("200 Võ Nguyên Giáp, An Hải, Đà Nẵng 550000, Vietnam"),
  lat: 16.051,
  lng: 108.246,
};

export function getHotelForDay(day) {
  if (day <= 5) return HOTELS.danangMain;
  return HOTELS.hoiAn;
}
