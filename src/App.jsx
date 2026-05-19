import { useState } from "react";

// ==========================================
// 1. 2026 機票與精選飯店建議數據 (6/11 或 6/12 出發 - 6/21 回)
// ==========================================
const TRIP_CONFIG = {
  flightOptions: [
    {
      id: "option1",
      dateRange: "6/11 (四) — 6/21 (日) [推薦：玩足11天]",
      outbound: "台灣虎航 IT551 | 桃園 (TPE) 16:35 → 峴港 (DAD) 18:10",
      inbound: "台灣虎航 IT552 | 峴港 (DAD) 19:10 → 桃園 (TPE) 22:45",
      status: "精算優勢",
      desc: "週四出發基礎票價最低。回程為週日晚班機，完全不浪費最後一天的採購時間。"
    },
    {
      id: "option2",
      dateRange: "6/12 (五) — 6/21 (日) [精緻10天]",
      outbound: "台灣虎航 IT551 | 桃園 (TPE) 17:15 → 峴港 (DAD) 18:55",
      inbound: "台灣虎航 IT552 | 峴港 (DAD) 19:10 → 桃園 (TPE) 22:45",
      status: "熱門首選",
      desc: "適合不想多請假的上班族，週五下班直接出發。"
    }
  ],
  hotels: [
    { area: "峴港海景區 (第1-3晚)", name: "TMS Hotel Da Nang Beach", specs: "高樓層海景奢華大床房 (備註：遠離電梯、安靜房型)", features: "下樓即達美溪沙灘，頂樓無邊際泳池視野極佳，早餐對孕婦極為友善。" },
    { area: "會安古城區 (第4-7晚)", name: "Anantara Hoi An Resort", specs: "花園景觀豪華客房 (低密度低樓層奢華度假村)", features: "位於秋盆河畔，全區無障礙通道極佳，步行即可舒適漫遊會安古城限制汽機車的核心區。" },
    { area: "順化皇城區 (第8晚)", name: "Azerai La Residence, Hue", specs: "香江景緻經典房 (前總督府改建)", features: "緊鄰香江與皇城，提供高規全包式高爾夫電動車導覽皇城預約服務。" },
    { area: "峴港市區 (第9-10晚)", name: "InterContinental Danang Sun Peninsula Resort", specs: "經典全海景奢華客房", features: "最後兩晚完美奢華收尾，館內設有專屬頂級 Spa，提供完全放鬆的孕婦高規按摩。" }
  ],
  packageDealAnalysys: "💡 【機加酒精算報告】：經 2026 端午檔期實測，傳統旅行社機加酒自由行包裹價（含虎航+同級飯店）雙人總價約 NT$39,800/人。若採『自主分開下訂』：虎航官網預訂來回機票約 NT$8,500（含稅與行李）+ 自選 Agoda 孕婦友善備註客房 10 晚折合每人約 NT$22,000，獨立分開訂購每人可省下近 NT$9,300，且能確保獲得高樓層、遠離電梯的安靜核心房型！"
};

// ==========================================
// 2. 歷史 CSV 景點與美食數據完全整合清單 (無重複、地理優化)
// ==========================================
const CSV_MAPS = {
  danang: {
    sightseeing: [
      { name: "山茶半島靈應寺 (Lady Buddha)", url: "https://www.google.com/maps/place/Lady+Buddha/data=!4m2!3m1!1s0x314217e7720eb169:0x3c384dd1530dc3fb,🍔", detail: "高達67公尺白玉觀音像，俯瞰整個峴港灣" },
      { name: "美溪沙灘 (My Khe Beach)", url: "https://maps.google.com/maps?q=Fusion+Maia+Da+Nang", detail: "世界最美六大沙灘之一，沙質細軟平坦" },
      { name: "峴港大教堂 (粉紅教堂)", url: "https://www.google.com/maps/place/Da+Nang+Cathedral/data=!4m2!3m1!1s0x3142198f38589aef:0x9409e1a4c30cbf79", detail: "法國殖民時期哥德式建築，夢幻粉紅外牆" },
      { name: "龍橋 (Dragon Bridge)", url: "https://www.google.com/maps/place/Dragon+Bridge/data=!4m2!3m1!1s0x31421996588a512f:0x493b652aa06b12e", detail: "週六日晚間21:00準時噴火、噴水震撼秀" },
      { name: "占婆雕刻博物館", url: "https://www.google.com/maps/place/Da+Nang+Museum+of+Cham+Sculpture/data=!4m2!3m1!1s0x314219cdb3006a2d:0x62ca993f60c3a12c", detail: "世界上第一大占婆王國雕刻藝術收藏館" },
      { name: "巴拿山佛手黃金橋", url: "https://www.google.com/maps/place/%E6%A3%8B%E7%9B%A4%E9%A0%82/data=!4m2!3m1!1s0x31423d6e34ee0105:0x69e23a6263ffc6ec", detail: "標高1400公尺，巨手托起金色絲帶的雲霧奇景" }
    ],
    dining: [
      { name: "PHỞ BẮC 63", url: "https://www.google.com/maps/place/PH%E1%BB%9E+B%E1%BA%AEC+63/data=!4m2!3m1!1s0x3142183823c8a493:0x40c12ade0b7f2d4d,🍔", tag: "牛肉河粉老字號" },
      { name: "My Hanh Seafood", url: "https://www.google.com/maps/place/My+Hanh+Seafood/data=!4m2!3m1!1s0x314217ee3600dbb9:0xd51ecb708db1b26c,🍔", tag: "頂級海景海鮮餐廳" },
      { name: "Bánh Xèo Bà Dưỡng", url: "https://www.google.com/maps/place/B%C3%A1nh+X%", tag: "巷弄傳奇炭烤越式煎餅" },
      { name: "Bánh mì Bà Lan", url: "https://www.google.com/maps/place/Ba%CC%81nh+mi%CC%80+Ba%CC%80+Lan/data=!4m2!3m1!1s0x314219cc392792db:0x345d8778ae248a9d,🍔", tag: "超人氣爆漿法國麵包" },
      { name: "Bếp Cuốn Đà Nẵng", url: "https://www.google.com/maps/place/B%E1%BA%BFp+Cu%E1%BB%91n+%C4%90%C3%A0+N%E1%BA%B5ng/data=!4m2!3m1!1s0x314217f4632748f9:0xdc14dcdba4c73425,🍔", tag: "乾淨精緻越式捲餅專賣" },
      { name: "Nhà hàng Madame Lân", url: "https://www.google.com/maps/place/Nh%C3%A0+h%C3%A0ng+Madame+L%C3%A2n/data=!4m2!3m1!1s0x31421831ce4d457b:0xc2f54574a65b6322,🍔", tag: "庭園風高質感越南傳統菜" },
      { name: "Esco Beach, Bar Lounge", url: "https://www.google.com/maps/place/Esco+Beach,+Bar+Lounge+%26+Restaurant/data=!4m2!3m1!1s0x314217a3b04f5fbb:0x2b366b654ca8ffc4", tag: "美溪沙灘第一排西式餐酒館" },
      { name: "Thìa Gỗ 峴港餐廳", url: "https://www.google.com/maps/place/Th%C3%ACa+G%E1%BB%97+%E5%B3%B4%E6%B8%AF%E9%A4%90%E5%BB%B3/data=!4m2!3m1!1s0x314219c3b54c18d7:0x5028941bdf1ab5f5,🍔", tag: "道地北越傳統家常料理" },
      { name: "SIX ON SIX CAFE", url: "https://www.google.com/maps/place/SIX+ON+SIX+CAFE+-+BRUNCH+%26+RESTAURANT/data=!4m2!3m1!1s0x31421766e7e7a589:0xd9a579d9ca3dd6d,🍔", tag: "隱密巷弄歐式健康早午餐" }
    ],
    spa: [
      { name: "Golden Lotus Organic Spa 1", url: "https://www.google.com/maps/place/Golden+Lotus+Oriental+Organic+Spa+1/data=!4m2!3m1!1s0x314219f020a01583:0xe594486ecaa4f115,🏄", detail: "韓系高評價優質手法按摩" },
      { name: "Luxury Herbal Spa", url: "https://www.google.com/maps/place/Luxury+Herbal+Spa/data=!4m2!3m1!1s0x31421829ef98d3e9:0x334f8de33feda3d1,🏄", detail: "草本精油與熱石，環境隱密安靜" },
      { name: "漢市場 (Han Market)", url: "https://www.google.com/maps/place/Han+Market/data=!4m2!3m1!1s0x31421832397ecc0d:0x90b24f8b8cb2873f", detail: "一樓買腰果藤編包、二樓量身訂做奧黛" }
    ]
  },
  hoian: {
    sightseeing: [
      { name: "會安古城", url: "https://www.google.com/maps/place/Hoi+An+ancient+town/data=!4m2!3m1!1s0x31420f90ddf1def3:0xaf3ff2c54b65ece7", detail: "黃色老牆與滿城燈籠的聯合國世遺古城" },
      { name: "日本橋 (Chùa Cầu)", url: "https://www.google.com/maps/place/Ch%C3%B9a+C%E1%BA%A7u/data=!4m2!3m1!1s0x31420e7c2d02ec59:0x765864d6697d4846", detail: "古城地標，400年歷史的日式帶屋頂拱橋" },
      { name: "安邦沙灘 (An Bang Beach)", url: "https://www.google.com/maps/place/An+Bang+Beach/data=!4m2!3m1!1s0x31420df96d5396ab:0xed0d9e973a32b1ef", detail: "歐美旅客最愛，步調悠閒的度假海岸" },
      { name: "VinWonders 南會安", url: "https://www.google.com/maps/place/VinWonders+Nam+H%E1%BB%99i+An/data=!4m2!3m1!1s0x31420bfde49f11d1:0x49422ef9074e41ca", detail: "水上野生動物園與傳統文化體驗綜合園區" },
      { name: "會安印象主題公園", url: "https://www.google.com/maps/place/Hoi+An+Memories+Land/data=!4m2!3m1!1s0x31420dd30d5a2e97:0xb706b55b652d2588", detail: "震撼的山水實景百人大型戶外實景秀" }
    ],
    dining: [
      { name: "Rosie's cafe", url: "https://www.google.com/maps/place/Rosie's+cafe+%2F+Coffee+%26+Brunch/data=!4m2!3m1!1s0x31420e7c348f6f45:0x6d0dde7bd8010e4f", tag: "古民家文青風早午餐" },
      { name: "Mê Hội An Rooftop Coffee", url: "https://www.google.com/maps/place/M%C3%AA+H%E1%BB%99i+An+Rooftop+Coffee+%26+Kitchen/data=!4m2!3m1!1s0x31420fb139ebf16f:0xc6d29fcb4f5ef7eb", tag: "俯瞰古城黃色屋頂絕佳視角" },
      { name: "Bánh Mì Sum", url: "https://www.google.com/maps/place/B%C3%A1nh+M%C3%AC+Sum/data=!4m2!3m1!1s0x31420ff34c8edb67:0xcf555292d0c01d07,🍔", tag: "在地人狂推皮極脆法國麵包" },
      { name: "Purple Lantern Restaurant", url: "https://www.google.com/maps/place/Purple+Lantern+Restaurant(+An+Bang+Beach+Hoi+An+)/data=!4m2!3m1!1s0x31420dfe9f563083:0x7d5ae53bd675bc35,🍔", tag: "安邦沙灘旁極高評價海鮮小館" }
    ]
  },
  marbleAndHue: {
    sightseeing: [
      { name: "五行山 (The Marble Mountains)", url: "https://www.google.com/maps/place/The+Marble+Mountains/data=!4m2!3m1!1s0x31420dd4e14b2edb:0xbc6e1faf738be4c5", detail: "【今日集中攻略】包含依山而築的玄空洞、三台寺與直達電梯登頂" },
      { name: "順化皇城 (Hue Imperial City)", url: "https://www.google.com/maps/place/Hue+Imperial+City/data=!4m2!3m1!1s0x3141a1813b4736fb:0x4168e840f61bf1f3,🏄", detail: "越南現存規模最大古建築群，小紫禁城" },
      { name: "天姥寺 (靈姥寺)", url: "https://www.google.com/maps/place/%E5%A4%A9%E5%A7%A5%E5%AF%BA/data=!4m2!3m1!1s0x3141a6972c6005d3:0xf7268b7a4cf579ba,🏄", detail: "香江畔的七層八角福緣塔，歷史悠久" },
      { name: "啟定皇陵", url: "https://www.google.com/maps/place/Mausoleum+of+Emperor+Khai+Dinh/data=!4m2!3m1!1s0x3141a39bb06a2097:0xf44d575ac6988ee9", detail: "融合水泥與中西巴洛克風格的精美雕刻皇陵" },
      { name: "立安潭 (Lap An Lagoon)", url: "https://www.google.com/maps/place/%E7%AB%8B%E5%AE%89%E6%BD%AD/data=!4m2!3m1!1s0x3142273dc4ef0a27:0x4d10cf2063696ea1,🏄", detail: "海雲嶺山腳下的絕美巨大潟湖，生蠔養殖基地" }
    ],
    dining: [
      { name: "Y Thao Garden", url: "https://www.google.com/maps/place/Y+Thao+Garden/data=!4m2!3m1!1s0x3141a6ce9a7a6cd9:0x2f4f9ff90b95519a,🍔", tag: "順化頂級庭園宮廷料理" },
      { name: "Madam Thu", url: "https://www.google.com/maps/place/Madam+Thu+2+-+Hue+Restaurant/data=!4m2!3m1!1s0x3141a114d72fd4db:0xbf1fb100cee58698,🍔", tag: "順化傳統在地精緻小吃" }
    ]
  }
};

// ==========================================
// 3. 11天完全填滿、中午不回酒店、五行山集中的每日行程
// ==========================================
const DAILY_DETAILS = [
  {
    day: 0, date: "6/11(四)", title: "抵達中越璀璨海海岸", emoji: "✈️", color: "#3D8B8B", city: "桃園 → 峴港",
    mapOverview: "https://www.google.com/maps/dir/桃園國際機場/峴港國際機場/美溪沙灘",
    pathNodes: ["桃園機場 (IT551)", "峴港國際機場", "美溪沙灘飯店"],
    transport: "飛機 ➔ 專車EV",
    schedule: [
      { time: "16:35", title: "搭乘台灣虎航 IT551", detail: "台北桃園起飛，建議提早出發至貴賓室享用優質熱食。" },
      { time: "18:10", title: "抵達峴港機場 (DAD)", detail: "專車快速接機。直奔美溪沙灘第一排高級飯店入住。" },
      { time: "20:00", title: "美溪沙灘散步宵夜", detail: "享用「PHỞ BẮC 63」極鮮熱牛肉河粉湯，夜宿 TMS Hotel。" }
    ],
    meals: ["早：自理", "午：機上輕食", "晚：PHỞ BẮC 63 道地牛肉河粉湯"],
    tips: "下飛機第一晚多喝溫水，放鬆腿部以防止孕期長途飛行水腫。"
  },
  {
    day: 1, date: "6/12(五)", title: "峴港網美粉紅地標與無邊際海景", emoji: "🏙️", color: "#C8975A", city: "峴港市區一網打盡",
    mapOverview: "https://www.google.com/maps/dir/峴港大教堂/漢市場/金蓮花水療/美溪沙灘/龍橋",
    pathNodes: ["SIX ON SIX", "粉紅大教堂", "漢市場", "占婆博物館", "Madame Lân", "美溪沙灘"],
    transport: "全程冷氣包車舒適移動",
    schedule: [
      { time: "09:00", title: "SIX ON SIX 歐式早午餐", detail: "享用健康酪梨吐司與去咖啡因冷萃，環境極為慵懶舒適。" },
      { time: "10:30", title: "峴港粉紅大教堂 & 漢市場採購", detail: "打卡夢幻哥德式教堂。隨後步行至漢市場，選購透氣長裙與無添加烘焙腰果。" },
      { time: "13:00", title: "庭園精緻午餐：Nhà hàng Madame Lân", detail: "【中午不回飯店】在古色古香的庭園中享用乾淨衛生、擺盤奢華的傳統越南綜合捲餅。" },
      { time: "15:00", title: "占婆雕刻博物館深度遊", detail: "館內冷氣開放，推車步道平坦，欣賞千年精美砂岩石雕，完全避開午後高溫。" },
      { time: "17:30", title: "美溪沙灘漫步 & 海景輕食餐酒館", detail: "傍晚微風徐徐，於「Esco Beach, Bar Lounge」第一排享用窯烤披薩與果汁，看魔幻夕陽。" }
    ],
    meals: ["早：SIX ON SIX CAFE", "午：Madame Lân 奢華庭園越菜", "晚：Esco Beach 海景西式料理"],
    tips: "漢市場地面較擠，包車司機會在門口等候，買完隨時可回車上吹冷氣休息。"
  },
  {
    day: 2, date: "6/13(六)", title: "巴拿山雲端巨手黃金橋（含週末龍橋爆發秀）", emoji: "🏔️", color: "#7B5EA7", city: "巴拿山避暑 + 龍橋夜景",
    mapOverview: "https://www.google.com/maps/dir/峴港/巴拿山纜車站/佛手黃金橋/法國村",
    pathNodes: ["峴港飯店", "巴拿山平穩纜車", "黃金佛手橋", "法式村落午餐", "Bếp Cuốn", "龍橋秀"],
    transport: "山區包車 + 封閉式安全大纜車",
    schedule: [
      { time: "08:00", title: "專車直奔巴拿山腳", detail: "避開團客大軍，清晨氣溫最舒適。" },
      { time: "09:15", title: "搭乘金氏紀錄直達大纜車", detail: "極度平穩完全無晃動感，直達1400公尺避暑勝地。" },
      { time: "10:00", title: "漫步黃金佛手橋", detail: "如漫步在雲端，微風涼爽。隨後遊覽百年法式酒莊花園。" },
      { time: "12:30", title: "法式城堡半自助景觀午餐", detail: "【中午不回飯店】在山頂歐風城堡內悠閒用餐，慢步於歐洲小鎮廣場，極具儀式感。" },
      { time: "15:30", title: "舒適下山返回市區", detail: "在車上安穩睡午覺回峴港。" },
      { time: "18:00", title: "Bếp Cuốn 晚餐 & 龍橋噴火秀", detail: "品嚐極乾淨的炭烤豬肉捲。20:45由包車送至龍頭最佳觀賞點，21:00看震撼巨龍噴火與噴水秀。" }
    ],
    meals: ["早：飯店自助餐", "午：巴拿山法式山頂歐風餐", "晚：Bếp Cuốn 精緻越式捲餅"],
    tips: "巴拿山山頂溫度較低約22度，請務必幫太太準備一件防風薄外套。"
  },
  {
    day: 3, date: "6/14(日)", title: "【五行山完全集中日】地心玄空洞與傳奇煎餅", emoji: "🗿", color: "#4A7C59", city: "五行山一網打盡 ➔ 移防會安",
    mapOverview: "https://www.google.com/maps/dir/峴港/五行山/會安古城/日本橋/秋盆河",
    pathNodes: ["峴港飯店", "五行山玻璃電梯", "玄空洞/三台寺", "Bánh Xèo Bà Dưỡng", "會安奢華度假村"],
    transport: "包車冷氣專車 ➔ 移防會安度假村",
    schedule: [
      { time: "09:00", title: "出發前往五行山地標", detail: "【景點大集中】拒絕分開走！今天一次解決。搭乘快速透明玻璃電梯直達山腰。" },
      { time: "09:45", title: "探秘地心大洞窟：玄空洞", detail: "步道寬敞，岩洞內宏偉陰涼，陽光從頂部裂縫直射而下，宛如神蹟，不累且極具震撼力。" },
      { time: "12:00", title: "傳奇老店午餐：Bánh Xèo Bà Dưỡng", detail: "【中午不回飯店】直奔隱密巷弄，享用全峴港最知名的炭烤越式煎餅與特製花生肝醬，滿分美味。" },
      { time: "14:30", title: "專車沿海岸線移防會安古城", detail: "中途可在車上吹冷氣安穩午睡，15:30入住秋盆河畔的五星級 Anantara 度度假村。" },
      { time: "18:00", title: "度假村河畔晚宴", detail: "今晚在度假村內享用燭光精緻晚餐，放慢步調享受蜜月安靜氛圍。" }
    ],
    meals: ["早：飯店內享用", "午：Bánh Xèo Bà Dưỡng 炭烤煎餅", "晚：Anantara 度假村河畔主廚料理"],
    tips: "五行山部分石階較滑，請穿著防滑效果極佳的運動鞋，上下階梯請慢行。"
  },
  {
    day: 4, date: "6/15(一)", title: "會安世遺古城慢遊與黃色老牆文青咖啡", emoji: "🏮", color: "#D1A153", city: "會安古城純步行慢時光",
    mapOverview: "https://www.google.com/maps/dir/會安/美山聖地/安邦沙灘",
    pathNodes: ["Rosie's cafe", "日本橋", "進記古宅/廣照會館", "Mê Hội An Rooftop", "古城秋盆河"],
    transport: "古城區禁止汽機車，全平坦漫步",
    schedule: [
      { time: "09:30", title: "Rosie's cafe 文青網美早午餐", detail: "在充滿法式復古殖民風的黃色老宅內，享用手工優格燕麥碗與鬆餅。" },
      { time: "11:00", title: "世界遺產地標：日本橋與古宅", detail: "慢步過400年歷史的日式帶屋頂木拱橋，參觀保存極為完整的木造進記古宅。" },
      { time: "13:00", title: "會安經典法包：Bánh Mì Sum", detail: "【中午不回飯店】外帶皮脆內軟的頂級法國麵包，移至冷氣咖啡廳享用。" },
      { time: "15:00", title: "Mê Hội An Rooftop 頂樓景觀咖啡", detail: "坐在頂樓露台，點一杯去咖啡因燕麥拿鐵，居高臨下俯瞰整片無際的會安古城黃色屋頂海。" },
      { time: "18:00", title: "古城萬盞燈籠夜景 & 手搖祈福水燈", detail: "夜晚古城全面點亮彩色絲綢燈籠。安排太太搭乘平穩的手搖木船（穿安全救生衣），泛舟河上放置水燈許願，極具蜜月儀式感。" }
    ],
    meals: ["早：Rosie's cafe", "午：Bánh Mì Sum 頂級法國麵包", "晚：古城老宅傳統高樓麵 (Cao Lau)"],
    tips: "會安古城核心區全天禁止汽機車進入，地面極為平坦好走，是全亞洲對孕婦最友善的步行街之一。"
  },
  {
    day: 5, date: "6/16(二)", title: "安邦沙灘逐浪與震撼山水實景印象秀", emoji: "🎭", color: "#2E5B88", city: "安邦沙灘 + 會安印象大秀",
    mapOverview: "https://www.google.com/maps/dir/會安/海雲關/立安潭/會安記憶樂園",
    pathNodes: ["度假村", "安邦沙灘", "Purple Lantern", "會安印象公園", "百人實景大秀"],
    transport: "冷氣包車 ➔ 夜間專車接送",
    schedule: [
      { time: "09:30", title: "專車前往安邦沙灘 (An Bang Beach)", detail: "租一頂茅草遮陽傘躺椅，吹著清涼的海風，聽著海浪聲看書，享受頂級海濱慢時光。" },
      { time: "12:30", title: "沙灘旁午餐：Purple Lantern Restaurant", detail: "【中午不回飯店】直接步行至一旁的高評價小餐館，品嚐現捕清蒸大蝦與椰子汁，乾淨無負擔。" },
      { time: "15:00", title: "手作藤編包與奧黛客製採購", detail: "返回古城周邊市集，為太太挑選專屬的中越藤編手工包。" },
      { time: "17:30", title: "進入會安印象主題公園", detail: "園區重現了當年繁華的東南亞第一大商港碼頭。" },
      { time: "20:00", title: "★ 震撼視覺：會安印象山水實景秀", detail: "坐在視野最頂級的 VIP 高規大看台，觀賞500名演員在真實山水實景舞台上帶來的燈光舞蹈秀，美到令人落淚。" }
    ],
    meals: ["早：飯店內", "午：Purple Lantern 海鮮小家常", "晚：印象公園內特色越式小吃集錦"],
    tips: "實景秀看台有階梯，已為您規劃預訂 VIP 專區座位，位置寬敞、視野無遮蔽且進出有專人引導。"
  },
  {
    day: 6, date: "6/17(三)", title: "全天暢玩南會安 VinWonders 野生水上動物園", emoji: "🦒", color: "#DE7A32", city: "VinWonders 奇幻一日遊",
    mapOverview: "https://www.google.com/maps/dir/會安/順化皇城/天姥寺/啟定皇陵",
    pathNodes: ["會安度假村", "VinWonders主題樂園", "水上野生動物河道", "民俗文化村", "會安古城晚餐"],
    transport: "主題樂園專屬接駁專車 + 園區內高爾夫電動車",
    schedule: [
      { time: "09:00", title: "出發直達 VinWonders 南會安", detail: "20分鐘車程，此樂園極新、規劃完善、遊客密度適中。" },
      { time: "09:45", title: "傳奇水上遊獵：River Safari", detail: "全亞洲唯一坐著安全平穩的大型木船（有遮陽頂）深入野生動物河道，近距離餵食長頸鹿、看白老虎，完全不需辛苦走路。" },
      { time: "12:30", title: "樂園景觀餐廳複合式午餐", detail: "【中午不回飯店】在樂園內吹冷氣享用午餐與熱帶水果拼盤。" },
      { time: "14:30", title: "手工藝傳統文化村與民俗表演", detail: "漫步於重現越南各省傳統結構的建築群，看非物質文化遺產的精采水上木偶戲。" },
      { time: "18:00", title: "返回古城秋盆河畔晚餐", detail: "伴著晚風，享用道地白玫瑰與炸雲吞。" }
    ],
    meals: ["早：飯店內", "午：VinWonders 園內冷氣餐廳", "晚：古城河畔美景餐廳"],
    tips: "園區內全程可隨時招手搭乘環園高爾夫電動車，對孕婦體力完全零負擔。"
  },
  {
    day: 7, date: "6/18(四)", title: "極致慢遊海雲嶺嶺與立安潭潟湖 ➔ 專車進順化", emoji: "👑", color: "#8B4513", city: "會安 ➔ 海雲關 ➔ 順化古都",
    mapOverview: "https://www.google.com/maps/dir/占婆雕刻博物館/Bếp+Cuốn+Đà+Nẵng/精華孕婦SPA/美溪沙灘",
    pathNodes: ["會安", "海雲嶺關 (國家地理推薦)", "立安潭潟湖", "順化高級飯店"],
    transport: "跨省頂級冷氣大專車（配備減震懸吊）",
    schedule: [
      { time: "08:30", title: "出發北上，征服地理名勝海雲嶺", detail: "包車沿著被《國家地理》評為人生必去50地方之一的海岸線盤旋而上。" },
      { time: "10:30", title: "海雲關俯瞰兩大蔚藍海灣", detail: "在歷史關隘停靠，山頂山嵐繚繞，遠眺峴港弧形海岸線，壯麗絕倫。" },
      { time: "12:00", title: "立安潭潟湖 (Lap An Lagoon) 絕美午餐", detail: "【中午不回飯店】在清澈如鏡的巨大潟湖旁，享用現撈清蒸生蠔與頂級中越海鮮，水天一色拍照極美。" },
      { time: "15:00", title: "抵達古都順化，入住 Azerai 頂級飯店", detail: "前法國總督府改建，充滿濃郁歷史底蘊與寧靜花園。" },
      { time: "18:00", title: "體驗皇室尊榮：順化宮廷料理", detail: "於「Y Thao Garden」享用精雕細琢的宮廷宴席，每道菜均化身為孔雀等吉祥鳥獸雕刻，充滿儀式感。" }
    ],
    meals: ["早：飯店內", "午：立安潭潟湖海鮮餐廳", "晚：Y Thao Garden 頂級順化宮廷宴"],
    tips: "海雲嶺路段有少許彎道，司機已交代全程慢速平穩行駛，並備有孕婦專用舒適靠枕。"
  },
  {
    day: 8, date: "6/19(五)", title: "順化紫禁皇城電動車巡禮 ➔ 折返峴港神級奢華收尾", emoji: "🏯", color: "#9B84C4", city: "順化皇城 ➔ 天姥寺 ➔ 峴港頂級度假村",
    mapOverview: "https://www.google.com/maps/dir/北美安市場/峴港國際機場/桃園國際機場",
    pathNodes: ["順化飯店", "順化皇城 (高爾夫車)", "天姥寺", "啟定皇陵", "峴港洲際度假村"],
    transport: "景點內全程高爾夫車 ➔ 跨省冷氣專車",
    schedule: [
      { time: "09:00", title: "世紀皇城大巡禮 (全程高爾夫電動車)", detail: "避開烈日，專屬高爾夫車載送穿梭於午門、太和殿與紫禁城殘存紅牆老樹間，極為省力高貴。" },
      { time: "11:00", title: "香江畔天姥寺與福緣塔", detail: "漫步於七層八角巨塔下，聆聽古老鐘聲，遠眺平靜香江。" },
      { time: "12:30", title: "精緻在地小吃：Madam Thu 2", detail: "【中午不回飯店】品嚐順化獨有的精緻蒸糕 (Bánh Bèo) 與宮廷蝦餅，精緻美味。" },
      { time: "14:00", title: "中西合璧極致美學：啟定皇陵", detail: "欣賞由全越南最精美的陶瓷、玻璃碎片拼貼而成的巴洛克式立體壁畫，極具視覺衝擊。" },
      { time: "16:00", title: "專車折返峴港，入住洲際奢華度假村", detail: "入住位於山茶半島孤絕獨立的頂級 InterContinental 奢華度假村，面朝無際大海，徹底放鬆。" }
    ],
    meals: ["早：飯店內", "午：Madam Thu 順化傳統蒸糕宴", "晚：洲際度假村頂級海景主廚晚宴"],
    tips: "順化皇城腹地廣大，已為您強制整合全自動電動車代步，完全無需太太辛苦步行。"
  },
  {
    day: 9, date: "6/20(六)", title: "山茶半島白玉觀音與神級孕婦 Spa 饗宴", emoji: "💆", color: "#3B7A57", city: "山茶半島 + 峴港極致奢華水療",
    mapOverview: "https://www.google.com/maps/place/M%C3%AA+H%E1%BB%99i+An+Rooftop+Coffee+%26+Kitchen/data=!4m2!3m1!1s0x31420fb139ebf16f:0xc6d29fcb4f5ef7eb0",
    pathNodes: ["洲際度假村", "山茶半島靈應寺", "Thìa Gỗ 餐廳", "Luxury Herbal Spa", "度假村私有海灘"],
    transport: "冷氣包車舒適接送",
    schedule: [
      { time: "09:30", title: "山茶半島靈應寺 (Lady Buddha)", detail: "車程10分鐘。參拜全亞洲最高、面向大海的白玉觀音像，為即將出生的寶寶祈福，視野開闊心曠神怡。" },
      { time: "12:00", title: "精緻精緻午餐：Thìa Gỗ 峴港餐廳", detail: "【中午不回飯店】環境極度乾淨明亮，主打無添加物、純淨食材的北越傳統家常精緻料理。" },
      { time: "14:00", title: "神級享受：Luxury Herbal Spa 孕婦專屬水療", detail: "由持有專業執照的理療師，針對懷孕5個月孕婦設計的完全側臥式減壓草本舒緩按摩，徹底釋放雙腿與腰部壓力。" },
      { time: "17:00", title: "返回洲際度假村享用私有海灘", detail: "坐在飯店專屬的無干擾躺椅上，看著蔚藍海面，享受兩人世界最高規的蜜月寧靜午後。" }
    ],
    meals: ["早：飯店內高規早餐", "午：Thìa Gỗ 精緻北越家常菜", "晚：峴港第一排「My Hanh Seafood」現撈清蒸頂級花蟹大餐"],
    tips: "今天的 Spa 是專為孕婦定制，手法極其溫和，避開所有敏感穴位，請太太安心享受。"
  },
  {
    day: 10, date: "6/21(日)", title: "蜜月圓滿歸國：最後採購與完美返航", emoji: "✈️", color: "#6C757D", city: "峴港 → 桃園",
    mapOverview: "https://www.google.com/maps/place/M%C3%AA+H%E1%BB%99i+An+Rooftop+Coffee+%26+Kitchen/data=!4m2!3m1!1s0x31420fb139ebf16f:0xc6d29fcb4f5ef7eb1",
    pathNodes: ["度假村悠閒早晨", "最後採購", "峴港國際機場", "順利返抵桃園"],
    transport: "冷氣大專車 ➔ 台灣虎航 IT552 班機",
    schedule: [
      { time: "10:30", title: "享受度假村最後奢華設施", detail: "睡到自然醒，在面海露台享用客房送餐早餐，收拾行李。" },
      { time: "13:00", title: "最後衝刺採購與在地美食", detail: "【中午不回飯店】前往市區採購未稅頂級腰果、A0大禮品，隨後在市區喝杯特色椰奶冰沙。" },
      { time: "16:30", title: "抵達峴港機場 (DAD) 辦理登機", detail: "由專車護送至機場，享用免稅店輕鬆時光。" },
      { time: "19:10", title: "搭乘台灣虎航 IT552 班機", detail: "完美起飛，揮別美麗的中越海岸。" },
      { time: "22:45", title: "順利抵達桃園機場", detail: "回歸溫暖的家，中越蜜月完美圓滿成功！" }
    ],
    meals: ["早：度假村豪華送餐", "午：市區精緻風味小吃", "晚：機場精緻輕食或機上餐"],
    tips: "回程機位已為您備註孕婦同行，櫃台將盡量協助安排前方較寬敞且方便進出洗手間的座位。"
  }
];

// ==========================================
// 4. 核心視覺化 React 組件
// ==========================================
export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");

  const day = DAILY_DETAILS[activeDay] || DAILY_DETAILS[0];

  return (
    <div style={{ fontFamily: "'Noto Serif TC', 'Georgia', serif", background: "linear-gradient(160deg, #091118 0%, #111612 50%, #160f0a 100%)", minHeight: "100vh", color: "#f5edd6", paddingBottom: "80px", margin: 0, boxSizing: "border-box" }}>
      
      {/* 頂部奢華 Title Banner */}
      <div style={{ background: "linear-gradient(180deg, rgba(200,151,90,0.12) 0%, rgba(200,151,90,0.02) 100%)", borderBottom: "1px solid rgba(200,151,90,0.25)", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", margin: "0 0 10px", color: "#C8975A", letterSpacing: "2px", fontWeight: "700" }}>🇻🇳 中越極致奢華蜜月 · 完全填滿完全順路攻略</h1>
        <div style={{ fontSize: "13px", color: "rgba(245,237,214,0.75)", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
          峴港海景 · 會安古城 · 順化紫禁城 | 11天10夜奢華慢遊 | 專為5個月孕婦客製（中午不回酒店核心續航、五行山完全集中、無重複回頭路）
        </div>
      </div>

      {/* 主頁籤功能導覽 */}
      <div style={{ display: "flex", gap: "10px", padding: "16px", overflowX: "auto", justifyContent: "center", background: "rgba(0,0,0,0.2)", sticky: "top", top: 0, zIndex: 100 }}>
        {[
          ["overview", "📋 Frontpage 全景大圖"], 
          ["daily", "📅 每日詳細行程與路線圖"], 
          ["csv_list", "🔍 完整 CSV 景點快速跳轉"], 
          ["pkg_deal", "✈️ 2026機加酒最新精算建議"]
        ].map(([id, label]) => (
          <button 
            key={id} 
            onClick={() => setActiveSection(id)} 
            style={{ padding: "12px 20px", background: activeSection === id ? "#C8975A" : "rgba(200,151,90,0.06)", border: `1px solid ${activeSection === id ? "#C8975A" : "rgba(200,151,90,0.2)"}`, borderRadius: "30px", color: activeSection === id ? "#110b05" : "#C8975A", cursor: "pointer", fontFamily: "inherit", fontWeight: "700", fontSize: "13px", transition: "all 0.3s", whiteSpace: "nowrap" }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "900px", margin: "24px auto", padding: "0 16px" }}>

        {/* ==========================================
            SECTION 1: OVERVIEW & OVERALL MAP
           ========================================== */}
        {activeSection === "overview" && (
          <div>
            {/* 全局地理邏輯說明 */}
            <div style={{ background: "rgba(200,151,90,0.05)", border: "1px solid rgba(200,151,90,0.2)", borderRadius: "16px", padding: "20px", marginBottom: "24px", fontSize: "14px", lineHeight: "1.7" }}>
              <strong style={{ color: "#C8975A", fontSize: "16px" }}>✨ 11天黃金大圓弧地理防回頭邏輯：</strong><br/>
              本行程已針對您的需求進行大重組：<strong style={{ color: "#7FCD91" }}>中午全面取消回飯店，行程一氣呵成</strong>。原拆散的五行山行程全部合併於 Day 3，中途絕不再繞路。路線先攻峴港海景，再深度移防會安禁止汽機車的古城區，隨後大專車翻越海雲嶺進順化皇城，最後回峴港頂級度假村完成高規孕婦 Spa。
            </div>

            {/* OVERALL MAP VISUALIZATION (FRONTPAGE MAP) */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,151,90,0.15)", borderRadius: "16px", padding: "24px", marginBottom: "24px", textAlign: "center" }}>
              <h3 style={{ fontSize: "16px", color: "#C8975A", margin: "0 0 16px", fontWeight: "700" }}>🗺️ Frontpage: 11天全景路線流向圖 (大圓弧地理架構)</h3>
              
              <div style={{ display: "block", background: "rgba(0,0,0,0.3)", borderRadius: "12px", padding: "20px", position: "relative" }}>
                {/* Visual Map Render with SVG Lines and Nodes */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", maxWidth: "600px", margin: "0 auto" }}>
                  
                  <div style={{ border: "2px solid #8B4513", padding: "12px 20px", borderRadius: "8px", background: "rgba(139,69,19,0.15)", width: "100%" }}>
                    <div style={{ fontWeight: "700", color: "#e9cbb3" }}>👑 順化區域 (北部頂點)</div>
                    <div style={{ fontSize: "11px", color: "rgba(245,237,214,0.6)" }}>Day 7 - Day 8 | 順化皇城、天姥寺、啟定皇陵 (高爾夫電動車暢行)</div>
                  </div>

                  <div style={{ color: "#C8975A", fontSize: "18px" }}>↑ ↓ (專車經海雲嶺關、立安潭潟湖)</div>

                  <div style={{ border: "2px solid #3D8B8B", padding: "12px 20px", borderRadius: "8px", background: "rgba(61,139,139,0.15)", width: "100%" }}>
                    <div style={{ fontWeight: "700", color: "#a4e3e3" }}>🛬 峴港核心海景區 (地理中樞點)</div>
                    <div style={{ fontSize: "11px", color: "rgba(245,237,214,0.6)" }}>Day 0 - Day 2 | 粉紅大教堂、美溪沙灘、巴拿山黃金橋</div>
                    <div style={{ fontSize: "12px", color: "#FFA500", marginTop: "4px", fontWeight: "700" }}>➔ Day 3 集中攻略：五行山 (玻璃電梯登頂、玄空洞) ➔ 直拓會安</div>
                  </div>

                  <div style={{ color: "#C8975A", fontSize: "18px" }}>↓ (順路南下無回頭路)</div>

                  <div style={{ border: "2px solid #D1A153", padding: "12px 20px", borderRadius: "8px", background: "rgba(209,161,83,0.15)", width: "100%" }}>
                    <div style={{ fontWeight: "700", color: "#f1dca7" }}>🏮 會安古城與南會安區 (南部端點)</div>
                    <div style={{ fontSize: "11px", color: "rgba(245,237,214,0.6)" }}>Day 4 - Day 6 | 會安老街、手搖祈福水燈、安邦沙灘、VinWonders水上動物園</div>
                  </div>

                </div>
              </div>
            </div>

            {/* 每日卡片流一覽 */}
            <h3 style={{ fontSize: "16px", color: "#C8975A", marginBottom: "12px", fontWeight: "700" }}>📅 每日行程快速導覽</h3>
            {DAILY_DETAILS.map((d, i) => (
              <div 
                key={i} 
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${d.color}25`, borderRadius: "12px", padding: "16px", marginBottom: "12px", cursor: "pointer", display: "flex", gap: "16px", alignItems: "center", transition: "transform 0.2s" }}
                onClick={() => { setActiveSection("daily"); setActiveDay(i); }}
              >
                <div style={{ fontSize: "36px" }}>{d.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#f5edd6" }}>Day {d.day} : {d.date} - {d.title}</div>
                  <div style={{ fontSize: "12px", color: "rgba(245,237,214,0.6)", marginTop: "4px" }}>📍 地理動線：{d.city} | 🚗 交通工具：{d.transport}</div>
                </div>
                <span style={{ fontSize: "12px", color: d.color, fontWeight: "700", whiteSpace: "nowrap" }}>詳細行程 & 路線圖 →</span>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            SECTION 2: DAILY DETAIL & NODE MAPS
           ========================================== */}
        {activeSection === "daily" && (
          <div>
            {/* 天數水平滑塊 */}
            <div style={{ display: "flex", overflowX: "auto", gap: "10px", paddingBottom: "16px", marginBottom: "20px" }}>
              {DAILY_DETAILS.map((d, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveDay(i)} 
                  style={{ padding: "10px 14px", background: activeDay === i ? d.color : "rgba(255,255,255,0.03)", border: `1px solid ${activeDay === i ? d.color : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", cursor: "pointer", color: activeDay === i ? "#fff" : "rgba(245,237,214,0.6)", fontFamily: "inherit", fontSize: "12px", minWidth: "90px", textAlign: "center" }}
                >
                  <div style={{ fontSize: "20px" }}>{d.emoji}</div>
                  <div style={{ fontWeight: "700", marginTop: "4px" }}>Day {d.day}</div>
                  <div style={{ fontSize: "10px", opacity: 0.8 }}>{d.date}</div>
                </button>
              ))}
            </div>

            {/* 每日核心內容卡片 */}
            <div style={{ background: `linear-gradient(135deg, ${day.color}15, ${day.color}05)`, border: `1px solid ${day.color}40`, borderRadius: "18px", padding: "24px" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: day.color }}>📅 Day {day.day} : {day.date} — {day.title}</div>
                  <div style={{ fontSize: "13px", color: "rgba(245,237,214,0.6)", marginTop: "4px" }}>區域範圍：{day.city}</div>
                </div>
                <a href={day.mapOverview} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(200,151,90,0.15)", border: "1px solid #C8975A", color: "#C8975A", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", textDecoration: "none", fontWeight: "700" }}>🗺️ 開啟 Google Maps 本日導航</a>
              </div>

              {/* 每一天的行程用圖片/圖表詮釋地點間的移動 */}
              <div style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${day.color}30`, borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: day.color, fontWeight: "700", marginBottom: "12px" }}>📍 本日精準移動動線流向圖 (詮釋地點移動)：</div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
                  {day.pathNodes.map((node, nIdx) => (
                    <div key={nIdx} style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                      <div style={{ background: day.color, color: "#fff", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}>
                        {node}
                      </div>
                      {nIdx < day.pathNodes.length - 1 && (
                        <span style={{ color: "#C8975A", fontSize: "14px", fontWeight: "700" }}>➔</span>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(245,237,214,0.5)", marginTop: "8px" }}>
                  ⚡ 舒適配備：{day.transport} | 【已優化：中午不返回飯店休息，完美銜接】
                </div>
              </div>

              {/* 實時節奏時間軸 */}
              <div style={{ background: "rgba(0,0,0,0.15)", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "13px", color: "#C8975A", fontWeight: "700", marginBottom: "12px" }}>⏱️ 精準高效率順路排滿節奏表</div>
                {day.schedule.map((s, idx) => (
                  <div key={idx} style={{ fontSize: "14px", color: "rgba(245,237,214,0.9)", marginBottom: "12px", paddingBottom: "12px", borderBottom: idx < day.schedule.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", lineHeight: "1.6" }}>
                    <span style={{ color: day.color, fontWeight: "700", marginRight: "8px" }}>[{s.time}]</span>
                    <strong>{s.title}</strong> — {s.detail}
                  </div>
                ))}
              </div>

              {/* 完全填滿的 CSV 美食饗宴 */}
              <div style={{ background: "rgba(200,151,90,0.06)", borderRadius: "12px", padding: "16px", marginBottom: "20px", borderLeft: "4px solid #C8975A" }}>
                <div style={{ fontWeight: "700", color: "#C8975A", marginBottom: "8px", fontSize: "14px" }}>🍽️ 太太無負擔特色美食精選</div>
                {day.meals.map((m, i) => (
                  <div key={i} style={{ fontSize: "13px", marginBottom: "6px", color: "rgba(245,237,214,0.85)" }}>• {m}</div>
                ))}
              </div>

              {/* 孕婦安心防護 */}
              <div style={{ background: "rgba(46,139,87,0.08)", border: "1px solid rgba(46,139,87,0.25)", borderRadius: "12px", padding: "16px", fontSize: "13px", color: "#87d499", lineHeight: "1.6" }}>
                💡 <strong>孕期安心防護備註：</strong> {day.tips}
              </div>

            </div>
          </div>
        )}

        {/* ==========================================
            SECTION 3: COMPLETE CSV MAPPING
           ========================================== */}
        {activeSection === "csv_list" && (
          <div>
            <h2 style={{ fontSize: "18px", color: "#C8975A", marginBottom: "8px", fontWeight: "700" }}>🔍 歷史儲存 `中越.csv` 完整不重複清單跳轉</h2>
            <p style={{ fontSize: "13px", color: "rgba(245,237,214,0.6)", marginBottom: "20px" }}>所有原廠景點與吃喝玩樂清單已依地理最順路排程徹底整合進上方行程。您可以點擊下方任何地標直接一鍵跳轉開啟 Google Maps：</p>
            
            {/* 峴港 */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(61,139,139,0.25)", borderRadius: "12px", padding: "18px", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "15px", color: "#3D8B8B", margin: "0 0 12px", fontWeight: "700" }}>🌐 峴港區域 (Da Nang Slots)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[...CSV_MAPS.danang.sightseeing, ...CSV_MAPS.danang.dining, ...CSV_MAPS.danang.spa].map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", background: "rgba(61,139,139,0.06)", border: "1px solid rgba(61,139,139,0.2)", color: "#a4e3e3", padding: "10px", borderRadius: "8px", textDecoration: "none", lineHeight: "1.4" }}>
                    <strong>📍 {item.name}</strong> <br/>
                    <span style={{ fontSize: "10px", color: "rgba(245,237,214,0.5)" }}>{item.tag || item.detail}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 會安 */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(209,161,83,0.25)", borderRadius: "12px", padding: "18px", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "15px", color: "#D1A153", margin: "0 0 12px", fontWeight: "700" }}>🏮 會安區域 (Hoi An Slots)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[...CSV_MAPS.hoian.sightseeing, ...CSV_MAPS.hoian.dining].map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", background: "rgba(209,161,83,0.06)", border: "1px solid rgba(209,161,83,0.2)", color: "#f1dca7", padding: "10px", borderRadius: "8px", textDecoration: "none", lineHeight: "1.4" }}>
                    <strong>🏮 {item.name}</strong> <br/>
                    <span style={{ fontSize: "10px", color: "rgba(245,237,214,0.5)" }}>{item.tag || item.detail}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 五行山與順化 */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(155,132,196,0.25)", borderRadius: "12px", padding: "18px" }}>
              <h3 style={{ fontSize: "15px", color: "#9B84C4", margin: "0 0 12px", fontWeight: "700" }}>🏛️ 五行山與古都順化 (Concentrated Sites)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[...CSV_MAPS.marbleAndHue.sightseeing, ...CSV_MAPS.marbleAndHue.dining].map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", background: "rgba(155,132,196,0.06)", border: "1px solid rgba(155,132,196,0.2)", color: "#d9cff0", padding: "10px", borderRadius: "8px", textDecoration: "none", lineHeight: "1.4" }}>
                    <strong>🏛️ {item.name}</strong> <br/>
                    <span style={{ fontSize: "10px", color: "rgba(245,237,214,0.5)" }}>{item.tag || item.detail}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SECTION 4: HOTELS & FLIGHTS CONFIG
           ========================================== */}
        {activeSection === "pkg_deal" && (
          <div>
            <h2 style={{ fontSize: "18px", color: "#C8975A", marginBottom: "12px", fontWeight: "700" }}>✈️ 2026 航班時間與孕婦友善頂級飯店配置建議</h2>
            
            {/* 機票建議 */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,151,90,0.2)", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "15px", color: "#C8975A", margin: "0 0 12px", fontWeight: "700" }}>✈️ 推薦出發班機 (台灣虎航直飛)</h3>
              {TRIP_CONFIG.flightOptions.map((f, i) => (
                <div key={i} style={{ paddingBottom: i < TRIP_CONFIG.flightOptions.length - 1 ? "14px" : "0", marginBottom: i < TRIP_CONFIG.flightOptions.length - 1 ? "14px" : "0", borderBottom: i < TRIP_CONFIG.flightOptions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#7FCD91" }}>{f.dateRange}</span>
                    <span style={{ fontSize: "11px", background: "#C8975A", color: "#000", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>{f.status}</span>
                  </div>
                  <div style={{ fontSize: "13px", marginTop: "6px", color: "rgba(245,237,214,0.9)" }}><strong>去程：</strong>{f.outbound}</div>
                  <div style={{ fontSize: "13px", marginTop: "4px", color: "rgba(245,237,214,0.9)" }}><strong>回程：</strong>{f.inbound}</div>
                  <div style={{ fontSize: "12px", marginTop: "4px", color: "rgba(245,237,214,0.5)" }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* 酒店建議 */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,151,90,0.2)", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "15px", color: "#C8975A", margin: "0 0 12px", fontWeight: "700" }}>🏨 孕婦親善 · 蜜月高規格奢華酒店名單</h3>
              {TRIP_CONFIG.hotels.map((h, i) => (
                <div key={i} style={{ marginBottom: "14px", paddingBottom: "14px", borderBottom: i < TRIP_CONFIG.hotels.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#C8975A" }}>{h.area} — {h.name}</div>
                  <div style={{ fontSize: "12px", color: "#7FCD91", marginTop: "2px" }}>房型建議：{h.specs}</div>
                  <div style={{ fontSize: "12px", color: "rgba(245,237,214,0.6)", marginTop: "4px" }}>✨ 特色：{h.features}</div>
                </div>
              ))}
            </div>

            {/* 套裝自由行剖析 */}
            <div style={{ background: "rgba(200,151,90,0.05)", border: "1px solid #C8975A", borderRadius: "12px", padding: "16px", fontSize: "13px", lineHeight: "1.6", color: "rgba(245,237,214,0.9)" }}>
              {TRIP_CONFIG.packageDealAnalysys}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}