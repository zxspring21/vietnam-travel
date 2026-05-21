/** 已訂住宿（Trip.com 機加酒 NT$36,000/雙人）— 地圖連結以完整地址為準 */

function mapsAddressUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const HOTELS = {
  danangMain: {
    id: "danangMain",
    name: "Awaken Danang Hotel",
    nameZh: "Awaken Danang Hotel",
    address: "148 Võ Nguyên Giáp, An Hải, Đà Nẵng 550000, Vietnam",
    area: "峴港美溪 · An Hải",
    stars: "機加酒含早",
    priceHint: "含於機加酒 NT$36,000/雙人",
    features: "6/11–6/17 · 近美溪沙灘",
    mapsUrl: mapsAddressUrl("148 Võ Nguyên Giáp, An Hải, Đà Nẵng 550000, Vietnam"),
    tripUrl: "https://tw.trip.com/hotels/detail?hotelId=awaken-danang",
    lat: 16.0522,
    lng: 108.2465,
    days: [0, 1, 2, 3, 4, 5],
    checkIn: "6/11",
    checkOut: "6/17",
  },
  hoiAn: {
    id: "hoiAn",
    name: "THE SAGA HOTEL HOI AN",
    nameZh: "THE SAGA HOTEL HOI AN",
    address: "321 Cửa Đại, Hội An Đông, Đà Nẵng 560000, Vietnam",
    area: "會安 Cửa Đại · 近 An Bang",
    stars: "機加酒含早",
    priceHint: "含於機加酒",
    features: "6/17–6/20 · 321 Cửa Đại",
    mapsUrl: mapsAddressUrl("321 Cửa Đại, Hội An Đông, Đà Nẵng 560000, Vietnam"),
    tripUrl: "https://tw.trip.com/hotels/list?city=725&keyword=THE+SAGA+HOTEL+HOI+AN",
    lat: 15.8878,
    lng: 108.3472,
    days: [6, 7, 8, 9],
    checkIn: "6/17",
    checkOut: "6/20",
  },
};

export function getHotelForDay(day) {
  if (day <= 5) return HOTELS.danangMain;
  return HOTELS.hoiAn;
}
