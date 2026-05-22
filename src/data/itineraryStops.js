/**
 * 每日站點 — 自動生成（npm run build-stops）
 * 行程 6/11–6/20 · CSV 景點：33 個
 */
const DAD = "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b";
const TPE = "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2";

export const DAY_STOPS = {
  "0": [
    {
      "time": "16:35",
      "type": "航班",
      "detail": "虎航 · 每人 NT$10,138 手提",
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
      "transportFromPrev": "Grab 機場",
      "detail": "機加酒",
      "title": "入住 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "20:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "近美溪沙灘",
      "csvName": "Esco Beach, Bar Lounge & Restaurant",
      "title": "Esco Beach, Bar Lounge & Restaurant"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "end": true
    }
  ],
  "1": [
    {
      "time": "08:30",
      "type": "住宿",
      "detail": "Klook #1573 · 09:00 接送",
      "title": "出發 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "09:00",
      "type": "景點",
      "transportFromPrev": "Klook 飯店接送",
      "detail": "雙人 NT$1,916",
      "title": "Klook 峴港一日遊",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "09:30",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "Non Nuoc 石雕村",
      "title": "努諾可石雕",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "10:15",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "五行山·舍利塔·靈應一寺·唐鐘洞",
      "csvName": "The Marble Mountains",
      "title": "大理石山售票亭",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "11:15",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "山茶半島 Bai But",
      "csvName": "Chùa Linh Ứng",
      "title": "靈應寺白佛觀音像",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "12:00",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "Thuan Phuoc Bridge",
      "title": "順福橋",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "12:30",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "",
      "csvName": "Da Nang Museum of Cham Sculpture",
      "title": "占婆雕刻博物館",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "13:00",
      "type": "購物",
      "transportFromPrev": "Tour",
      "detail": "可少額換匯",
      "csvName": "Han Market",
      "title": "韓市場",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "13:30",
      "type": "住宿",
      "transportFromPrev": "Klook",
      "detail": "",
      "title": "返回 Awaken 飯店",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "18:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "週六晚可賞噴火",
      "csvName": "Dragon Bridge",
      "title": "龍橋"
    },
    {
      "time": "19:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "近美溪",
      "csvName": "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑",
      "title": "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "end": true
    }
  ],
  "2": [
    {
      "time": "07:00",
      "type": "住宿",
      "detail": "Klook #13283 接駁",
      "title": "出發 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "klookId": "bana-13283",
      "klookUrl": "https://www.klook.com/zh-TW/activity/13283-ba-na-hills-ticket-da-nang/"
    },
    {
      "time": "08:00",
      "type": "景點",
      "transportFromPrev": "Klook 往返巴士",
      "detail": "門票+雲霄飛車3",
      "csvName": "巴拿山奇幻樂園",
      "title": "太陽世界巴拿山",
      "klookId": "bana-13283",
      "klookUrl": "https://www.klook.com/zh-TW/activity/13283-ba-na-hills-ticket-da-nang/"
    },
    {
      "time": "10:00",
      "type": "景點",
      "transportFromPrev": "園內",
      "detail": "",
      "csvName": "Golden Bridge",
      "title": "黃金橋"
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "園內含票",
      "detail": "Klook 已含",
      "title": "國際自助午餐"
    },
    {
      "time": "17:00",
      "type": "交通",
      "transportFromPrev": "Klook 往返巴士",
      "detail": "",
      "title": "Klook 巴士返回峴港",
      "klookId": "bana-13283",
      "klookUrl": "https://www.klook.com/zh-TW/activity/13283-ba-na-hills-ticket-da-nang/"
    },
    {
      "time": "19:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bếp Cuốn Đà Nẵng",
      "title": "Bếp Cuốn Đà Nẵng"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "end": true
    }
  ],
  "3": [
    {
      "time": "09:00",
      "type": "住宿",
      "detail": "峴港自由行",
      "title": "出發 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "10:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Da Nang Cathedral",
      "title": "粉紅大教堂"
    },
    {
      "time": "12:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "近美溪",
      "csvName": "My Hanh Seafood",
      "title": "My Hanh Seafood"
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
      "time": "17:00",
      "type": "購物",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Con Market",
      "title": "Con Market"
    },
    {
      "time": "19:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "近美溪",
      "csvName": "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑",
      "title": "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "end": true
    }
  ],
  "4": [
    {
      "time": "06:30",
      "type": "住宿",
      "detail": "Klook #4808",
      "title": "出發 · Awaken（Klook 順化團）",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "klookId": "hue-4808",
      "klookUrl": "https://www.klook.com/zh-TW/activity/4808-hue-day-tour-da-nang/"
    },
    {
      "time": "07:00",
      "type": "景點",
      "transportFromPrev": "Klook 全程",
      "detail": "含交通",
      "title": "陵姑灣＆順化一日遊",
      "klookId": "hue-4808",
      "klookUrl": "https://www.klook.com/zh-TW/activity/4808-hue-day-tour-da-nang/"
    },
    {
      "time": "12:00",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "",
      "csvName": "Hue Imperial City",
      "title": "順化皇城"
    },
    {
      "time": "13:00",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "",
      "csvName": "天姥寺",
      "title": "天姥寺"
    },
    {
      "time": "18:00",
      "type": "住宿",
      "transportFromPrev": "Klook 巴士",
      "detail": "",
      "title": "返回峴港 · Awaken",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "klookId": "hue-4808",
      "klookUrl": "https://www.klook.com/zh-TW/activity/4808-hue-day-tour-da-nang/",
      "end": true
    }
  ],
  "5": [
    {
      "time": "09:00",
      "type": "住宿",
      "detail": "最後峴港日",
      "title": "出發 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "10:00",
      "type": "購物",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Con Market",
      "title": "伴手禮"
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
      "time": "14:00",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Nguon Spa Da Nang - Nguồn Hoàng Kế Viêm",
      "title": "Nguon Spa Da Nang - Nguồn Hoàng Kế Viêm"
    },
    {
      "time": "18:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "近飯店",
      "csvName": "Vietnam Daily Cuisine",
      "title": "Vietnam Daily Cuisine"
    },
    {
      "time": "21:00",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Awaken · 整理行李",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "end": true
    }
  ],
  "6": [
    {
      "time": "08:00",
      "type": "住宿",
      "detail": "",
      "title": "退房 · Awaken Danang",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "checkout": true
    },
    {
      "time": "09:00",
      "type": "交通",
      "transportFromPrev": "Klook #182982",
      "detail": "NT$340/2人",
      "title": "Klook 私人接送 → 會安",
      "klookId": "transfer-dad-hoi-182982",
      "klookUrl": "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/"
    },
    {
      "time": "11:00",
      "type": "住宿",
      "transportFromPrev": "Klook 接送",
      "detail": "",
      "title": "入住 · THE SAGA HOTEL HOI AN",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "Grab 短程",
      "detail": "Cửa Đại 方向",
      "csvName": "Firefly Restaurant & Bar",
      "title": "Firefly Restaurant & Bar"
    },
    {
      "time": "14:00",
      "type": "景點",
      "transportFromPrev": "Grab→步行",
      "detail": "Klook 72346",
      "csvName": "Hoi An ancient town",
      "title": "古鎮套票入場",
      "klookId": "pass-72346",
      "klookUrl": "https://www.klook.com/zh-TW/activity/72346-hoi-an-ancient-town-attractions-adminssion-ticket/"
    },
    {
      "time": "16:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票",
      "csvName": "Chùa Cầu",
      "title": "日本橋"
    },
    {
      "time": "17:00",
      "type": "購物",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Tiệm Vàng Soạn Hà",
      "title": "換匯"
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
      "title": "返回 · THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true,
      "end": true
    }
  ],
  "7": [
    {
      "time": "07:30",
      "type": "住宿",
      "detail": "Klook 美山團",
      "title": "出發 · THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true,
      "klookId": "myson-1602",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1602-my-son-discovery-hoi-an/"
    },
    {
      "time": "08:00",
      "type": "景點",
      "transportFromPrev": "Klook 巴士",
      "detail": "08:00 出發",
      "title": "Klook 美山聖地半日遊",
      "klookId": "myson-1602",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1602-my-son-discovery-hoi-an/"
    },
    {
      "time": "11:30",
      "type": "美食",
      "transportFromPrev": "Tour 含",
      "detail": "Klook 含",
      "title": "廣南麵午餐"
    },
    {
      "time": "13:30",
      "type": "住宿",
      "transportFromPrev": "Klook",
      "detail": "",
      "title": "返回 THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "15:00",
      "type": "體驗",
      "transportFromPrev": "Grab 短程",
      "detail": "Klook #24274",
      "title": "椰林竹籃船",
      "klookId": "basket-24274",
      "klookUrl": "https://www.klook.com/zh-TW/activity/24274-basket-boat-ticket-hoi-an-coconut-forest/"
    },
    {
      "time": "17:00",
      "type": "景點",
      "transportFromPrev": "Grab→步行",
      "detail": "套票",
      "csvName": "廣肇會館",
      "title": "廣肇會館"
    },
    {
      "time": "18:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票",
      "csvName": "福建會館",
      "title": "福建會館"
    },
    {
      "time": "19:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "近 Saga·An Bang",
      "csvName": "Purple Lantern Restaurant( An Bang Beach Hoi An )",
      "title": "Purple Lantern Restaurant( An Bang Beach Hoi An )"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true,
      "end": true
    }
  ],
  "8": [
    {
      "time": "09:00",
      "type": "住宿",
      "detail": "印象秀週三至週一",
      "title": "出發 · THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "10:00",
      "type": "景點",
      "transportFromPrev": "Grab 短程",
      "detail": "近 Cửa Đại",
      "csvName": "An Bang Beach",
      "title": "An Bang Beach"
    },
    {
      "time": "12:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "往古城方向",
      "csvName": "Pause and Enjoy Restaurant",
      "title": "Pause and Enjoy Restaurant"
    },
    {
      "time": "13:30",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票",
      "csvName": "進記古宅",
      "title": "進記古宅"
    },
    {
      "time": "14:30",
      "type": "體驗",
      "transportFromPrev": "步行",
      "detail": "",
      "csvName": "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )",
      "title": "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )"
    },
    {
      "time": "16:00",
      "type": "交通",
      "transportFromPrev": "Klook 含",
      "detail": "",
      "title": "前往 Hoi An Memories Land",
      "klookId": "memories-17514",
      "klookUrl": "https://www.klook.com/zh-TW/activity/17514-hoi-an-memories-show-ticket/"
    },
    {
      "time": "17:00",
      "type": "表演",
      "transportFromPrev": "Klook",
      "detail": "生態門票+放水燈",
      "csvName": "Hoi An Memories Land",
      "title": "印象秀+主題樂園",
      "klookId": "memories-17514",
      "klookUrl": "https://www.klook.com/zh-TW/activity/17514-hoi-an-memories-show-ticket/"
    },
    {
      "time": "17:30",
      "type": "美食",
      "transportFromPrev": "園內",
      "detail": "17:00–20:30 · Klook 已含",
      "title": "Non La 燒烤自助晚餐"
    },
    {
      "time": "21:00",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true,
      "end": true
    }
  ],
  "9": [
    {
      "time": "08:00",
      "type": "住宿",
      "detail": "",
      "title": "退房 · THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true,
      "checkout": true
    },
    {
      "time": "09:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park",
      "title": "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park"
    },
    {
      "time": "11:00",
      "type": "交通",
      "transportFromPrev": "Klook #182982",
      "detail": "NT$340/2人",
      "title": "Klook 會安→峴港接送",
      "klookId": "transfer-hoi-dad-182982",
      "klookUrl": "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/"
    },
    {
      "time": "13:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "機場前順路",
      "csvName": "Bếp Cuốn Đà Nẵng",
      "title": "峴港午餐"
    },
    {
      "time": "15:00",
      "type": "交通",
      "transportFromPrev": "Grab 送機",
      "detail": "",
      "title": "前往峴港機場 DAD",
      "mapsUrl": "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b"
    },
    {
      "time": "19:00",
      "type": "航班",
      "transportFromPrev": "飛機",
      "detail": "19:00–22:40",
      "title": "IT552 返桃園",
      "mapsUrl": "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2",
      "noMap": true,
      "isFlight": true
    }
  ]
};

export const ITINERARY_CSV_COUNT = 33;
