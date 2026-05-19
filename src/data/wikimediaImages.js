/**
 * Wikimedia Commons 圖片（Special:FilePath 穩定導向 upload）
 * 檔名對應：https://commons.wikimedia.org/wiki/File:...
 */
export function commonsImageUrl(fileName, width = 640) {
  if (!fileName) return null;
  const f = encodeURIComponent(fileName.replace(/ /g, "_"));
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${f}?width=${width}`;
}

/** CSV Title 精確對應 Wikimedia 檔名 */
export const WIKIMEDIA_BY_CSV_NAME = {
  "Lady Buddha": "Linh_Ung_Pagoda_Da_Nang.jpg",
  "PHỞ BẮC 63": "Pho_in_Hanoi.jpg",
  "My Hanh Seafood": "Seafood_platter.jpg",
  "Golden Lotus Oriental Organic Spa 1": "Spa_in_Vietnam.jpg",
  "Bánh Xèo Bà Dưỡng": "Banh_xeo.jpg",
  "Bánh mì Bà Lan": "Banh_mi.jpg",
  "Bánh mì Bà Lan": "Banh_mi.jpg",
  "天姥寺": "Thien_Mu_Pagoda.jpg",
  "Y Thao Garden": "Citadel_of_Hue.jpg",
  "Hue Historic Citadel": "Citadel_of_Hue.jpg",
  "立安潭": "Lang_Co_Beach.jpg",
  "海雲關": "Hai_Van_Pass.jpg",
  "Bánh Mì Sum": "Banh_mi.jpg",
  "Cộng Cà Phê": "Vietnamese_iced_coffee.jpg",
  "Hoi An Lantern Boat Tour ( 호이안 랜턴 보트 투어 )": "Hoi_An_ancient_town.jpg",
  "Nguon Spa Da Nang - Nguồn Hoàng Kế Viêm": "Spa_in_Vietnam.jpg",
  "Luxury Herbal Spa": "Spa_in_Vietnam.jpg",
  "魚蛋粉": "Pho_in_Hanoi.jpg",
  "Ơ Kìa - Seafood Restaurant": "Seafood_platter.jpg",
  "巴拿山奇幻樂園": "Ba_Na_Hills_cable_car.jpg",
  "Bếp Cuốn Đà Nẵng": "Banh_xeo.jpg",
  "Thèm Hải Sản": "Seafood_platter.jpg",
  "Dragon Bridge": "Dragon_bridge_Danang_Vietnam.jpg",
  "Nhà hàng Madame Lân": "Banh_xeo.jpg",
  "Purple Lantern Restaurant( An Bang Beach Hoi An )": "An_Bang_Beach.jpg",
  "Quán bánh O Lé": "Banh_xeo.jpg",
  "Bánh Mì Trường Tiền O Tho": "Banh_mi.jpg",
  "Cozy Restaurant ( Huế )": "Citadel_of_Hue.jpg",
  "Family Home Cafe & Restaurant": "Vietnamese_iced_coffee.jpg",
  "Madam Thu 2 - Hue Restaurant": "Citadel_of_Hue.jpg",
  "Nina's Cafe-Vietnamese Restaurant": "Vietnamese_iced_coffee.jpg",
  "Cam On cafe - Coffee Class": "Vietnamese_iced_coffee.jpg",
  "Vị Huế Restaurant & Café": "Citadel_of_Hue.jpg",
  "Zucca Restaurant": "Hoi_An_ancient_town.jpg",
  "Sake Restaurant": "Seafood_platter.jpg",
  "Hue Imperial City": "Citadel_of_Hue.jpg",
  "CỦI COFFEE": "Vietnamese_iced_coffee.jpg",
  "ECO restaurant -bar- coffee": "Vietnamese_iced_coffee.jpg",
  "SIX ON SIX CAFE - BRUNCH & RESTAURANT": "Vietnamese_iced_coffee.jpg",
  "Maharaja Indian Restaurant Đà Nẵng ( since 2016)": "Indian_cuisine.jpg",
  "Korea BBQ House": "Korean_barbecue.jpg",
  "Adobo Mexican Grill": "Mexican_food.jpg",
  "Nhà Bếp Xưa Restaurant": "Pho_in_Hanoi.jpg",
  "Vietnam Daily Cuisine": "Pho_in_Hanoi.jpg",
  "Indus Indian Restaurant - Nhà hàng Ấn Độ - 인도 음식점": "Indian_cuisine.jpg",
  "L'Italiano Restaurant Danang": "Italian_cuisine.jpg",
  "EMO'S HOMECOOKED VIETNAMESE CUISINE": "Pho_in_Hanoi.jpg",
  "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park": "Hoi_An_ancient_town.jpg",
  "Esco Beach, Bar Lounge & Restaurant": "My_Khe_beach.jpg",
  "LoCo Restaurant - Danang Seafood Restaurant - 다낭 레스토랑": "Seafood_platter.jpg",
  "Thìa Gỗ 峴港餐廳": "Pho_in_Hanoi.jpg",
  "Tiệm Vàng Soạn Hà": "Hoi_An_ancient_town.jpg",
  "Bac My An Market": "Han_Market_Danang.jpg",
  "Con Market": "Han_Market_Danang.jpg",
  "棋盤頂": "Hai_Van_Pass.jpg",
  "Pause and Enjoy Restaurant": "Hoi_An_ancient_town.jpg",
  "Firefly Restaurant & Bar": "Hoi_An_ancient_town.jpg",
  "Nhan's kitchen": "Hoi_An_ancient_town.jpg",
  "Hoi An Memories Land": "Hoi_An_ancient_town.jpg",
  "Baba's Kitchen Indian Restaurant - Hoian": "Indian_cuisine.jpg",
  "MIX Greek Restaurant Hoi An": "Greek_salad.jpg",
  "Anabas Restaurant - Cá Rô Đồng Quán - Hoi An restaurant - 호이안 로컬 레스토랑": "Hoi_An_ancient_town.jpg",
  "Hong Phuc 2": "Pho_in_Hanoi.jpg",
  "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 10": "Hoi_An_ancient_town.jpg",
  "Hoi An Heart Restaurant": "Hoi_An_ancient_town.jpg",
  "MẸT Hội An - Vietnamese restaurant & Vegetarian Food MET 9": "Hoi_An_ancient_town.jpg",
  "MAAZI Hoi An": "Hoi_An_ancient_town.jpg",
  "HOME Hoi An": "Hoi_An_ancient_town.jpg",
  "MẸT Hội An - Vietnamese restaurant & Vegetarian Food 6": "Hoi_An_ancient_town.jpg",
  "阮廷沼步行街": "Hoi_An_ancient_town.jpg",
  "Chùa Cầu": "Japanese_Bridge_Hoi_An.jpg",
  "廣肇會館": "Hoi_An_ancient_town.jpg",
  "中華會館": "Hoi_An_ancient_town.jpg",
  "進記古宅": "Hoi_An_ancient_town.jpg",
  "Hoi An ancient town": "Hoi_An_ancient_town.jpg",
  "福建會館": "Hoi_An_ancient_town.jpg",
  "靈應寺": "Linh_Ung_Pagoda_Da_Nang.jpg",
  "My Son Sanctuary": "My_Son_Sanctuary.jpg",
  "嗣德陵": "Tomb_of_Tu_Duc.jpg",
  "明命陵（孝陵）": "Tomb_of_Min_Mang.jpg",
  "Thanh Ha Pottery Village, Hoi An": "Hoi_An_ancient_town.jpg",
  "美山聖地": "My_Son_Sanctuary.jpg",
  "An Bang Beach": "An_Bang_Beach.jpg",
  "Mausoleum of Emperor Khai Dinh": "Tomb_of_Khai_Dinh.jpg",
  "Golden Bridge": "Golden_Bridge_Vietnam.jpg",
  "Rosie's cafe / Coffee & Brunch": "Hoi_An_ancient_town.jpg",
  "Mê Hội An Rooftop Coffee & Kitchen": "Hoi_An_ancient_town.jpg",
  "會安市場": "Hoi_An_ancient_town.jpg",
  "越南會安夜市": "Hoi_An_ancient_town.jpg",
  "The Marble Mountains": "Marble_Mountains,_Vietnam.jpg",
  "Chùa Linh Ứng": "Linh_Ung_Pagoda_Da_Nang.jpg",
  "Da Nang Cathedral": "Danang_Cathedral.jpg",
  "Da Nang Museum of Cham Sculpture": "Museum_of_Cham_Sculpture_Danang.jpg",
  "Han Market": "Han_Market_Danang.jpg",
};

/** 正規化 CSV 名稱（處理 Bánh mì 等 Unicode 變體） */
export function normalizeCsvName(name) {
  return (name || "").normalize("NFC").trim();
}

export function getWikimediaImageUrl(csvName) {
  const key = normalizeCsvName(csvName);
  const file = WIKIMEDIA_BY_CSV_NAME[key];
  if (file) return commonsImageUrl(file);
  return null;
}
