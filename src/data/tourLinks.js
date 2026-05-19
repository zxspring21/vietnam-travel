/** 統一 Tour / Klook / KKday 連結（避免 404 slug） */
const kk = (id) => `https://www.kkday.com/zh-tw/product/${id}`;
const klookSearch = (q) => `https://www.klook.com/zh-TW/search/result/?query=${encodeURIComponent(q)}`;

export const KKDAY = {
  banaHills: kk(10048),
  charter: kk(572916),
  charterAlt: kk(115145),
  charterFamily: kk(538349),
  hueDayTour: kk(122690),
  scooter: kk(129384),
};

export const KLOOK = {
  /** 活動 ID 頁（無 slug，較不易 404） */
  airportTransfer: "https://www.klook.com/zh-TW/activity/18379/",
  marbleHoiAn: "https://www.klook.com/zh-TW/activity/9488/",
  memoriesShow: "https://www.klook.com/zh-TW/activity/5027/",
  thanhHa: "https://www.klook.com/zh-TW/activity/18757/",
  /** 搜尋備援 */
  searchAirport: klookSearch("峴港機場接送"),
  searchMemories: klookSearch("會安印象秀"),
  searchMarble: klookSearch("五行山 會安"),
  searchPottery: klookSearch("Thanh Ha pottery village"),
};
