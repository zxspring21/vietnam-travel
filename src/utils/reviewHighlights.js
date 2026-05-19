/** 從 Google 評論文字萃取「Mentioned in reviews」風格標籤 */
const THEME_RULES = [
  [/河粉|pho|noodle soup/i, "河粉"],
  [/牛肉|beef/i, "牛肉"],
  [/景色|view|scenic|beautiful/i, "景色優美"],
  [/服務|staff|friendly|hospitable/i, "服務好"],
  [/乾淨|clean/i, "乾淨"],
  [/價格|便宜|reasonable|affordable|cheap/i, "價格合理"],
  [/早餐|breakfast/i, "早餐"],
  [/位置|location|walking distance|方便/i, "位置方便"],
  [/咖啡|coffee/i, "咖啡"],
  [/沙灘|beach/i, "沙灘"],
  [/古城|old town|hoi an/i, "古城"],
  [/按摩|spa|massage/i, "按摩"],
  [/海鮮|seafood/i, "海鮮"],
  [/纜車|cable car/i, "纜車"],
  [/人少|quiet|peaceful/i, "寧靜"],
  [/排隊|queue|crowd/i, "人潮"],
];

export function extractMentionedFromReviews(reviews, max = 6) {
  const texts = (reviews || []).map((r) => r?.text).filter(Boolean);
  if (!texts.length) return [];
  const joined = texts.join(" ");
  const found = [];
  for (const [re, label] of THEME_RULES) {
    if (re.test(joined) && !found.includes(label)) found.push(label);
    if (found.length >= max) break;
  }
  return found;
}

export function getMentionedHighlights(detail) {
  if (!detail) return [];
  if (detail.mentionedInReviews?.length) return detail.mentionedInReviews;
  return extractMentionedFromReviews(detail.reviews);
}
