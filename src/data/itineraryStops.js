/**
 * 每日站點 — 自動生成（npm run build-stops）
 * 行程 6/11–6/20 · CSV 景點：37 個
 */
const DAD = "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b";
const TPE = "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport/data=!4m2!3m1!1s0x3442d97d0e6e5d61:0xf86a31b9d9c4c5e2";

export const DAY_STOPS = {
  "0": [
    {
      "time": "16:35",
      "type": "航班",
      "detail": "含於機加酒",
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
      "detail": "機加酒 · 僅随身行李",
      "title": "入住 · Elite Riverlight Hotel by Elite24",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "20:15",
      "type": "美食",
      "transportFromPrev": "Grab 短程",
      "detail": "換匯改 Day1 09:00",
      "csvName": "Nhà hàng Madame Lân",
      "title": "越式晚餐"
    },
    {
      "time": "21:45",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Elite Riverlight Hotel by Elite24",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "end": true
    }
  ],
  "1": [
    {
      "time": "09:00",
      "type": "住宿",
      "detail": "海洲→市中心→美溪",
      "title": "出發 · Elite Riverlight Hotel by Elite24",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "10:00",
      "type": "購物",
      "transportFromPrev": "步行/Grab",
      "detail": "營業 07:00–19:00 · 不趕",
      "csvName": "Tiệm Vàng Soạn Hà",
      "title": "換匯（峴港）"
    },
    {
      "time": "10:30",
      "type": "景點",
      "transportFromPrev": "Grab 短程",
      "detail": "",
      "csvName": "Da Nang Cathedral",
      "title": "粉紅大教堂"
    },
    {
      "time": "11:30",
      "type": "購物",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Vincom Plaza Da Nang",
      "title": "商場吹冷氣"
    },
    {
      "time": "12:30",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "午間休息",
      "csvName": "Golden Lotus Oriental Organic Spa",
      "title": "按摩"
    },
    {
      "time": "15:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "咖啡",
      "csvName": "Phin Cu Coffee",
      "title": "Phin Cu Coffee"
    },
    {
      "time": "18:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "My Hanh Seafood",
      "title": "美溪海鮮晚餐"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Elite Riverlight Hotel by Elite24",
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
      "detail": "Klook #13283",
      "title": "出發 · Elite Riverlight Hotel by Elite24",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "klookId": "bana-13283",
      "klookUrl": "https://www.klook.com/zh-TW/activity/13283-ba-na-hills-ticket-da-nang/"
    },
    {
      "time": "08:00",
      "type": "景點",
      "transportFromPrev": "Klook 巴士",
      "detail": "門票+雲霄飛車3",
      "csvName": "Ba Na Hills SunWorld",
      "title": "巴拿山",
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
      "transportFromPrev": "Klook",
      "detail": "",
      "title": "Klook 巴士返回",
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
      "title": "返回 · Elite Riverlight Hotel by Elite24",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "end": true
    }
  ],
  "3": [
    {
      "time": "08:30",
      "type": "住宿",
      "detail": "Klook #1573 · 09:00 接送",
      "title": "出發 · Elite Riverlight Hotel by Elite24",
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
      "detail": "",
      "csvName": "Non Nuoc Pagoda",
      "title": "努諾可石雕",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "10:15",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "",
      "csvName": "The Marble Mountains",
      "title": "大理石山售票亭",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "11:15",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "",
      "csvName": "Chùa Linh Ứng",
      "title": "靈應寺白佛觀音像",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "12:00",
      "type": "景點",
      "transportFromPrev": "Tour",
      "detail": "",
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
      "title": "占婆博物館",
      "klookId": "dad-day-1573",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1573-day-trip-da-nang/"
    },
    {
      "time": "13:00",
      "type": "購物",
      "transportFromPrev": "Tour",
      "detail": "團末順路",
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
      "title": "返回 · Elite Riverlight Hotel by Elite24",
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
      "detail": "週末可能有噴火",
      "csvName": "Dragon Bridge",
      "title": "龍橋"
    },
    {
      "time": "19:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bánh Xèo Bà Dưỡng",
      "title": "越式煎餅"
    },
    {
      "time": "21:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Elite Riverlight Hotel by Elite24",
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
      "title": "出發 · Elite Riverlight Hotel by Elite24（順化團）",
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
      "detail": "",
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
      "transportFromPrev": "Klook",
      "detail": "",
      "title": "返回 · Elite Riverlight Hotel by Elite24",
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
      "detail": "在地市場體驗",
      "title": "出發 · Elite Riverlight Hotel by Elite24",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true
    },
    {
      "time": "09:30",
      "type": "體驗",
      "transportFromPrev": "Grab 短程",
      "detail": "",
      "csvName": "Con Market",
      "title": "傳統市場"
    },
    {
      "time": "11:00",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bac My An Market",
      "title": "美安市場"
    },
    {
      "time": "12:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bánh Mì Ba Lan",
      "title": "法棍"
    },
    {
      "time": "14:30",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Golden Lotus Oriental Organic Spa",
      "title": "按摩"
    },
    {
      "time": "18:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "收尾晚餐",
      "csvName": "Moggumeong",
      "title": "Moggumeong"
    },
    {
      "time": "20:30",
      "type": "住宿",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "返回 · Elite Riverlight Hotel by Elite24 · 打包",
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
      "title": "退房 · Elite Riverlight Hotel by Elite24",
      "isHotel": true,
      "hotelId": "danangMain",
      "inCsv": true,
      "checkout": true
    },
    {
      "time": "09:00",
      "type": "交通",
      "transportFromPrev": "Klook #182982",
      "detail": "",
      "title": "Klook 私人接送 → 會安",
      "klookId": "transfer-dad-hoi-182982",
      "klookUrl": "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/"
    },
    {
      "time": "11:00",
      "type": "住宿",
      "transportFromPrev": "Klook",
      "detail": "寄行李",
      "title": "入住 · THE SAGA HOTEL HOI AN",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true
    },
    {
      "time": "11:45",
      "type": "美食",
      "transportFromPrev": "Grab→步行",
      "detail": "",
      "csvName": "會安市場",
      "title": "古城午餐"
    },
    {
      "time": "12:45",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "17:30 前逛完 5 景點",
      "title": "進古城 · 套票",
      "klookId": "pass-72346",
      "klookUrl": "https://www.klook.com/zh-TW/activity/72346-hoi-an-ancient-town-attractions-adminssion-ticket/"
    },
    {
      "time": "13:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票 1/5",
      "csvName": "進記古宅",
      "title": "進記古宅"
    },
    {
      "time": "13:40",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票 2/5",
      "csvName": "福建會館",
      "title": "福建會館"
    },
    {
      "time": "14:20",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票 3/5",
      "csvName": "Museum of Folk Culture",
      "title": "民俗博物館"
    },
    {
      "time": "15:00",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票 4/5",
      "csvName": "Hoi An Museum",
      "title": "歷史文化博物館"
    },
    {
      "time": "15:45",
      "type": "景點",
      "transportFromPrev": "步行",
      "detail": "套票 5/5",
      "csvName": "Chùa Cầu",
      "title": "日本橋"
    },
    {
      "time": "17:30",
      "type": "表演",
      "transportFromPrev": "Grab",
      "detail": "Klook #10213",
      "title": "Teh Dar 取票",
      "klookId": "teh-dar-10213",
      "klookUrl": "https://www.klook.com/zh-TW/activity/10213-teh-dar-show-ticket-hoi-an/"
    },
    {
      "time": "18:00",
      "type": "表演",
      "transportFromPrev": "Klook",
      "detail": "",
      "title": "Teh Dar 西貢歌劇院",
      "klookId": "teh-dar-10213",
      "klookUrl": "https://www.klook.com/zh-TW/activity/10213-teh-dar-show-ticket-hoi-an/"
    },
    {
      "time": "19:30",
      "type": "美食",
      "transportFromPrev": "Grab/步行",
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
      "detail": "美山團",
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
      "detail": "",
      "title": "Klook 美山聖地",
      "klookId": "myson-1602",
      "klookUrl": "https://www.klook.com/zh-TW/activity/1602-my-son-discovery-hoi-an/"
    },
    {
      "time": "11:30",
      "type": "美食",
      "transportFromPrev": "Tour 含",
      "detail": "",
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
      "time": "14:30",
      "type": "體驗",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Thanh Ha Pottery Village, Hoi An",
      "title": "Thanh Ha 陶藝村"
    },
    {
      "time": "16:15",
      "type": "體驗",
      "transportFromPrev": "Grab→步行",
      "detail": "16:15 免費場",
      "csvName": "The Center for Culture and Sports of Hoi An city",
      "title": "民俗音樂舞蹈"
    },
    {
      "time": "19:30",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
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
      "time": "08:30",
      "type": "住宿",
      "detail": "Klook #136639",
      "title": "出發 · THE SAGA",
      "isHotel": true,
      "hotelId": "hoiAn",
      "inCsv": true,
      "klookId": "cooking-136639",
      "klookUrl": "https://www.klook.com/zh-TW/activity/136639-coconut-forest-basket-boat-cooking-class-hoian/"
    },
    {
      "time": "08:30",
      "type": "體驗",
      "transportFromPrev": "Klook 全程",
      "detail": "",
      "title": "烹飪課＋市場＋竹籃船",
      "klookId": "cooking-136639",
      "klookUrl": "https://www.klook.com/zh-TW/activity/136639-coconut-forest-basket-boat-cooking-class-hoian/"
    },
    {
      "time": "14:00",
      "type": "景點",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "An Bang Beach",
      "title": "An Bang Beach"
    },
    {
      "time": "15:30",
      "type": "體驗",
      "transportFromPrev": "Grab→步行",
      "detail": "",
      "csvName": "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )",
      "title": "燈籠船"
    },
    {
      "time": "16:30",
      "type": "交通",
      "transportFromPrev": "Grab",
      "detail": "",
      "title": "前往 Hoi An Memories Land",
      "klookId": "memories-17514",
      "klookUrl": "https://www.klook.com/zh-TW/activity/17514-hoi-an-memories-show-ticket/"
    },
    {
      "time": "17:00",
      "type": "表演",
      "transportFromPrev": "Klook",
      "detail": "",
      "csvName": "Hoi An Memories Land",
      "title": "印象秀",
      "klookId": "memories-17514",
      "klookUrl": "https://www.klook.com/zh-TW/activity/17514-hoi-an-memories-show-ticket/"
    },
    {
      "time": "17:30",
      "type": "美食",
      "transportFromPrev": "園內",
      "detail": "Klook 已含",
      "title": "Non La 燒烤自助"
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
      "title": "燈籠公園"
    },
    {
      "time": "10:15",
      "type": "體驗",
      "transportFromPrev": "Grab/步行",
      "detail": "10:15 免費場 · 近古城",
      "csvName": "The Center for Culture and Sports of Hoi An city",
      "title": "民俗音樂舞蹈"
    },
    {
      "time": "11:00",
      "type": "交通",
      "transportFromPrev": "Klook",
      "detail": "",
      "title": "Klook 會安→峴港",
      "klookId": "transfer-hoi-dad-182982",
      "klookUrl": "https://www.klook.com/zh-TW/activity/182982-da-nang-hoi-an-private-transfer-to-hoi-an-mikazuki-water-park-intercontinental-da-nang/"
    },
    {
      "time": "13:00",
      "type": "美食",
      "transportFromPrev": "Grab",
      "detail": "",
      "csvName": "Bếp Cuốn Đà Nẵng",
      "title": "峴港午餐"
    },
    {
      "time": "15:00",
      "type": "交通",
      "transportFromPrev": "Grab 送機",
      "detail": "",
      "title": "峴港機場 DAD",
      "mapsUrl": "https://www.google.com/maps/place/Da+Nang+International+Airport/data=!4m2!3m1!1s0x3141cb2741ea73b5:0x97e732c06fb2980b"
    },
    {
      "time": "19:00",
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

export const ITINERARY_CSV_COUNT = 37;
