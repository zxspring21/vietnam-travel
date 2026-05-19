/**
 * 每日站點 — 自動生成（npm run build-stops）
 * CSV 景點：91 個 · 含每日飯店起迄
 */
const DAD = "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b";
const TPE = "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2";

export const DAY_STOPS = {
  "0": [
    {
      "time": "16:35",
      "type": "航班",
      "detail": "台灣虎航",
      "title": "桃園機場 IT551 出發",
      "mapsUrl": "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2",
      "noMap": true,
      "isFlight": true
    },
    {
      "time": "18:10",
      "type": "交通",
      "transportFromPrev": "飛機",
      "detail": "",
      "title": "峴港機場 DAD 抵達",
      "mapsUrl": "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b"
    },
    {
      "time": "19:30",
      "type": "住宿",
      "transportFromPrev": "Grab 機場接送",
      "detail": "",
      "title": "入住 · Grand Mercure 美溪",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "20:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "PHỞ BẮC 63",
      "title": "PHỞ BẮC 63"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Grand Mercure 美溪",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    }
  ],
  "1": [
    {
      "time": "07:30",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Grand Mercure 美溪",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "09:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "SIX ON SIX CAFE - BRUNCH & RESTAURANT",
      "title": "SIX ON SIX CAFE - BRUNCH & RESTAURANT"
    },
    {
      "time": "10:15",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Da Nang Cathedral",
      "title": "粉紅大教堂"
    },
    {
      "time": "10:45",
      "type": "購物",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Con Market",
      "title": "Con Market"
    },
    {
      "time": "11:30",
      "type": "購物",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Han Market",
      "title": "漢市場"
    },
    {
      "time": "12:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bac My An Market",
      "title": "Bac My An Market"
    },
    {
      "time": "13:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Nhà hàng Madame Lân",
      "title": "Nhà hàng Madame Lân"
    },
    {
      "time": "14:30",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Da Nang Museum of Cham Sculpture",
      "title": "Da Nang Museum of Cham Sculpture"
    },
    {
      "time": "16:00",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Nguon Spa Da Nang - Nguồn Hoàng Kế Viêm",
      "title": "Nguon Spa Da Nang - Nguồn Hoàng Kế Viêm"
    },
    {
      "time": "17:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Esco Beach, Bar Lounge & Restaurant",
      "title": "Esco Beach, Bar Lounge & Restaurant"
    },
    {
      "time": "19:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑",
      "title": "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑"
    },
    {
      "time": "21:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Dragon Bridge",
      "title": "Dragon Bridge"
    },
    {
      "time": "21:30",
      "type": "休息",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Cộng Cà Phê",
      "title": "Cộng Cà Phê"
    },
    {
      "time": "22:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Vietnam Daily Cuisine",
      "title": "Vietnam Daily Cuisine"
    },
    {
      "time": "22:15",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Nhà Bếp Xưa Restaurant",
      "title": "Nhà Bếp Xưa Restaurant"
    },
    {
      "time": "22:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Grand Mercure 美溪",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    }
  ],
  "2": [
    {
      "time": "07:00",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Grand Mercure 美溪",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "08:00",
      "type": "景點",
      "transportFromPrev": "KKday Tour 巴士",
      "detail": "",
      "csvName": "巴拿山奇幻樂園",
      "title": "巴拿山奇幻樂園"
    },
    {
      "time": "10:00",
      "type": "景點",
      "transportFromPrev": "Tour 園內",
      "detail": "",
      "csvName": "Golden Bridge",
      "title": "Golden Bridge"
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "園內",
      "detail": "",
      "csvName": "Thèm Hải Sản",
      "title": "山上午餐"
    },
    {
      "time": "18:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bếp Cuốn Đà Nẵng",
      "title": "Bếp Cuốn Đà Nẵng"
    },
    {
      "time": "20:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Ơ Kìa - Seafood Restaurant",
      "title": "Ơ Kìa - Seafood Restaurant"
    },
    {
      "time": "20:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "L'Italiano Restaurant Danang",
      "title": "L'Italiano Restaurant Danang"
    },
    {
      "time": "21:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Indus Indian Restaurant - Nhà hàng Ấn Độ - 인도 음식점",
      "title": "Indus Indian Restaurant - Nhà hàng Ấn Độ - 인도 음식점"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Grand Mercure 美溪",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    }
  ],
  "3": [
    {
      "time": "07:30",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Grand Mercure 美溪",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "09:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "The Marble Mountains",
      "title": "The Marble Mountains"
    },
    {
      "time": "12:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bánh Xèo Bà Dưỡng",
      "title": "Bánh Xèo Bà Dưỡng"
    },
    {
      "time": "12:45",
      "type": "美食",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Bánh mì Bà Lan",
      "title": "Bánh mì Bà Lan"
    },
    {
      "time": "14:00",
      "type": "交通",
      "transportFromPrev": "Grab 廂型車",
      "detail": "行李移防",
      "csvName": "Hoi An ancient town",
      "title": "前往會安古城"
    },
    {
      "time": "15:00",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "入住 · Royal MGallery 古城旁",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "16:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park",
      "title": "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park"
    },
    {
      "time": "17:00",
      "type": "購物",
      "transportFromPrev": "步行",
      "detail": "背包客推薦金樓；D1–D2 峴港可於漢市場先換少量，大額在此比價",
      "csvName": "Tiệm Vàng Soạn Hà",
      "title": "換匯（大額建議）"
    },
    {
      "time": "18:30",
      "type": "美食",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "越南會安夜市",
      "title": "越南會安夜市"
    },
    {
      "time": "21:00",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    }
  ],
  "4": [
    {
      "time": "08:00",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "09:30",
      "type": "美食",
      "transportFromPrev": "Grab 至古城",
      "detail": "",
      "csvName": "Rosie's cafe / Coffee & Brunch",
      "title": "Rosie's cafe / Coffee & Brunch"
    },
    {
      "time": "10:30",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Chùa Cầu",
      "title": "日本橋"
    },
    {
      "time": "11:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "廣肇會館",
      "title": "廣肇會館"
    },
    {
      "time": "11:20",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "中華會館",
      "title": "中華會館"
    },
    {
      "time": "11:40",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "福建會館",
      "title": "福建會館"
    },
    {
      "time": "12:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "進記古宅",
      "title": "進記古宅"
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Bánh Mì Sum",
      "title": "Bánh Mì Sum"
    },
    {
      "time": "14:00",
      "type": "休息",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Mê Hội An Rooftop Coffee & Kitchen",
      "title": "Mê Hội An Rooftop Coffee & Kitchen"
    },
    {
      "time": "15:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "阮廷沼步行街",
      "title": "阮廷沼步行街"
    },
    {
      "time": "16:00",
      "type": "休息",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "CỦI COFFEE",
      "title": "CỦI COFFEE"
    },
    {
      "time": "17:00",
      "type": "美食",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Pause and Enjoy Restaurant",
      "title": "Pause and Enjoy Restaurant"
    },
    {
      "time": "18:00",
      "type": "體驗",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )",
      "title": "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )"
    },
    {
      "time": "20:00",
      "type": "美食",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "HOME Hoi An",
      "title": "HOME Hoi An"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    }
  ],
  "5": [
    {
      "time": "08:30",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "09:30",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "An Bang Beach",
      "title": "An Bang Beach"
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Purple Lantern Restaurant( An Bang Beach Hoi An )",
      "title": "Purple Lantern Restaurant( An Bang Beach Hoi An )"
    },
    {
      "time": "14:00",
      "type": "購物",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "會安市場",
      "title": "會安市場"
    },
    {
      "time": "15:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Nhan's kitchen",
      "title": "Nhan's kitchen"
    },
    {
      "time": "17:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Hoi An Heart Restaurant",
      "title": "Hoi An Heart Restaurant"
    },
    {
      "time": "17:30",
      "type": "表演",
      "transportFromPrev": "Klook 接送",
      "detail": "",
      "csvName": "Hoi An Memories Land",
      "title": "會安印象秀"
    },
    {
      "time": "20:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "MIX Greek Restaurant Hoi An",
      "title": "MIX Greek Restaurant Hoi An"
    },
    {
      "time": "21:00",
      "type": "休息",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "ECO restaurant -bar- coffee",
      "title": "ECO restaurant -bar- coffee"
    },
    {
      "time": "21:15",
      "type": "休息",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Cam On cafe - Coffee Class",
      "title": "Cam On cafe - Coffee Class"
    },
    {
      "time": "21:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Zucca Restaurant",
      "title": "Zucca Restaurant"
    },
    {
      "time": "22:00",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    }
  ],
  "6": [
    {
      "time": "08:00",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "09:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Thanh Ha Pottery Village, Hoi An",
      "title": "Thanh Ha Pottery Village, Hoi An"
    },
    {
      "time": "11:00",
      "type": "景點",
      "transportFromPrev": "Grab / Tour",
      "detail": "可選半日遊",
      "csvName": "My Son Sanctuary",
      "title": "美山聖地"
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Anabas Restaurant - Cá Rô Đồng Quán - Hoi An restaurant - 호이안 로컬 레스토랑",
      "title": "Anabas Restaurant - Cá Rô Đồng Quán - Hoi An restaurant - 호이안 로컬 레스토랑"
    },
    {
      "time": "15:00",
      "type": "休息",
      "transportFromPrev": "Grab 至古城",
      "detail": "",
      "csvName": "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 10",
      "title": "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 10"
    },
    {
      "time": "16:30",
      "type": "美食",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Baba's Kitchen Indian Restaurant - Hoian",
      "title": "Baba's Kitchen Indian Restaurant - Hoian"
    },
    {
      "time": "18:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Firefly Restaurant & Bar",
      "title": "Firefly Restaurant & Bar"
    },
    {
      "time": "20:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "MAAZI Hoi An",
      "title": "MAAZI Hoi An"
    },
    {
      "time": "20:30",
      "type": "休息",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 9",
      "title": "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 9"
    },
    {
      "time": "21:00",
      "type": "休息",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "MẸT Hội An - Vietnamese restaurant & Vegetarian Food 6",
      "title": "MẸT Hội An - Vietnamese restaurant & Vegetarian Food 6"
    },
    {
      "time": "21:15",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Hong Phuc 2",
      "title": "Hong Phuc 2"
    },
    {
      "time": "21:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Sake Restaurant",
      "title": "Sake Restaurant"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    }
  ],
  "7": [
    {
      "time": "07:00",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Royal MGallery 會安",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "08:30",
      "type": "景點",
      "transportFromPrev": "包車",
      "detail": "KKday #572916",
      "csvName": "海雲關",
      "title": "海雲關",
      "mapsQuery": "Hai Van Pass Vietnam"
    },
    {
      "time": "09:30",
      "type": "景點",
      "transportFromPrev": "包車",
      "detail": "",
      "csvName": "棋盤頂",
      "title": "棋盤頂"
    },
    {
      "time": "12:00",
      "type": "美食",
      "transportFromPrev": "包車",
      "detail": "",
      "csvName": "立安潭",
      "title": "立安潭"
    },
    {
      "time": "15:00",
      "type": "住宿",
      "transportFromPrev": "包車",
      "detail": "",
      "title": "入住 · Pilgrimage Village 順化",
      "isHotel": true,
      "hotelId": "hue",
      "inCsv": true
    },
    {
      "time": "15:30",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Hue Imperial City",
      "title": "順化皇城"
    },
    {
      "time": "17:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Hue Historic Citadel",
      "title": "Hue Historic Citadel"
    },
    {
      "time": "18:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Y Thao Garden",
      "title": "Y Thao Garden"
    },
    {
      "time": "20:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Vị Huế Restaurant & Café",
      "title": "Vị Huế Restaurant & Café"
    },
    {
      "time": "20:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Family Home Cafe & Restaurant",
      "title": "Family Home Cafe & Restaurant"
    },
    {
      "time": "21:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Nina's Cafe-Vietnamese Restaurant",
      "title": "Nina's Cafe-Vietnamese Restaurant"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Pilgrimage Village",
      "isHotel": true,
      "hotelId": "hue",
      "inCsv": true
    }
  ],
  "8": [
    {
      "time": "08:00",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Pilgrimage Village",
      "isHotel": true,
      "hotelId": "hue",
      "inCsv": true
    },
    {
      "time": "09:00",
      "type": "景點",
      "transportFromPrev": "電動車",
      "detail": "",
      "csvName": "Hue Imperial City",
      "title": "皇城深度"
    },
    {
      "time": "11:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "天姥寺",
      "title": "天姥寺"
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Madam Thu 2 - Hue Restaurant",
      "title": "Madam Thu 2 - Hue Restaurant"
    },
    {
      "time": "13:30",
      "type": "美食",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Bánh Mì Trường Tiền O Tho",
      "title": "Bánh Mì Trường Tiền O Tho"
    },
    {
      "time": "14:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Mausoleum of Emperor Khai Dinh",
      "title": "Mausoleum of Emperor Khai Dinh"
    },
    {
      "time": "15:30",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "明命陵（孝陵）",
      "title": "明命陵（孝陵）"
    },
    {
      "time": "16:30",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "嗣德陵",
      "title": "嗣德陵"
    },
    {
      "time": "18:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Cozy Restaurant ( Huế )",
      "title": "Cozy Restaurant ( Huế )"
    },
    {
      "time": "19:30",
      "type": "交通",
      "transportFromPrev": "包車",
      "detail": "海雲嶺返程",
      "title": "移動 · 前往峴港 Novotel",
      "isHotel": true,
      "hotelId": "danangFinal",
      "inCsv": true
    },
    {
      "time": "21:00",
      "type": "住宿",
      "transportFromPrev": "包車",
      "detail": "",
      "title": "入住 · Novotel 漢江",
      "isHotel": true,
      "hotelId": "danangFinal",
      "inCsv": true
    }
  ],
  "9": [
    {
      "time": "08:00",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Novotel 漢江",
      "isHotel": true,
      "hotelId": "danangFinal",
      "inCsv": true
    },
    {
      "time": "09:30",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Lady Buddha",
      "title": "Lady Buddha"
    },
    {
      "time": "10:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Chùa Linh Ứng",
      "title": "靈應寺"
    },
    {
      "time": "12:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Thìa Gỗ 峴港餐廳",
      "title": "Thìa Gỗ 峴港餐廳"
    },
    {
      "time": "14:00",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Luxury Herbal Spa",
      "title": "Luxury Herbal Spa"
    },
    {
      "time": "16:00",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Golden Lotus Oriental Organic Spa 1",
      "title": "Golden Lotus Oriental Organic Spa 1"
    },
    {
      "time": "17:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "My Hanh Seafood",
      "title": "My Hanh Seafood"
    },
    {
      "time": "18:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "魚蛋粉",
      "title": "魚蛋粉"
    },
    {
      "time": "20:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "EMO'S HOMECOOKED VIETNAMESE CUISINE",
      "title": "EMO'S HOMECOOKED VIETNAMESE CUISINE"
    },
    {
      "time": "20:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Maharaja Indian Restaurant Đà Nẵng ( since 2016)",
      "title": "Maharaja Indian Restaurant Đà Nẵng ( since 2016)"
    },
    {
      "time": "21:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Korea BBQ House",
      "title": "Korea BBQ House"
    },
    {
      "time": "21:15",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Adobo Mexican Grill",
      "title": "Adobo Mexican Grill"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Novotel 漢江",
      "isHotel": true,
      "hotelId": "danangFinal",
      "inCsv": true
    }
  ],
  "10": [
    {
      "time": "08:00",
      "type": "住宿",
      "detail": "",
      "title": "出發 · Novotel 漢江",
      "isHotel": true,
      "hotelId": "danangFinal",
      "inCsv": true
    },
    {
      "time": "10:30",
      "type": "購物",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Han Market",
      "title": "伴手禮採購"
    },
    {
      "time": "12:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Con Market",
      "title": "Con Market"
    },
    {
      "time": "13:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Quán bánh O Lé",
      "title": "Quán bánh O Lé"
    },
    {
      "time": "14:00",
      "type": "休息",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Cam On cafe - Coffee Class",
      "title": "Cam On cafe - Coffee Class"
    },
    {
      "time": "14:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回飯店取行李",
      "isHotel": true,
      "hotelId": "danangFinal",
      "inCsv": true
    },
    {
      "time": "16:30",
      "type": "交通",
      "transportFromPrev": "Grab / 專車",
      "detail": "",
      "title": "峴港機場 DAD 送機",
      "mapsUrl": "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b"
    },
    {
      "time": "19:10",
      "type": "航班",
      "transportFromPrev": "飛機",
      "detail": "",
      "title": "IT552 返桃園",
      "mapsUrl": "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2",
      "noMap": true,
      "isFlight": true
    }
  ]
};

export const ITINERARY_CSV_COUNT = 91;
