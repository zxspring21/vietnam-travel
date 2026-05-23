/** 已訂住宿（Trip.com 機加酒 NT$36,000/雙人）— 地圖連結以完整地址為準 */

function mapsAddressUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const HOTELS = {
  danangMain: {
    id: "danangMain",
    name: "Elite Riverlight Hotel by Elite24",
    nameZh: "Elite Riverlight Hotel by Elite24",
    csvName: "Elite Riverlight Hotel by Elite24",
    /** Places API 搜尋用完整地址，避免抓到同名錯誤飯店 */
    photoSearchQuery:
      "Elite Riverlight Hotel by Elite24, 02 Cao Xuân Dục, Hai Chau, Da Nang 550000 Vietnam",
    address: "02 Cao Xuân Dục, Hải Châu, Đà Nẵng 550000, Vietnam",
    area: "峴港海洲 · 近韓市場/超市",
    stars: "機加酒含早",
    priceHint: "含於機加酒 NT$36,000/雙人",
    features: "6/11–6/17 · 海洲區動線佳",
    mapsUrl: mapsAddressUrl("02 Cao Xuân Dục, Hải Châu, Đà Nẵng 550000, Vietnam"),
    tripUrl: "https://tw.trip.com/hotels/list?city=669&keyword=Elite+Riverlight",
    lat: 16.0684,
    lng: 108.2212,
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
