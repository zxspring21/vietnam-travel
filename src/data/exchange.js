/** 換匯建議 — Tiệm Vàng Soạn Hà 位於會安，無法在 D1–D2 峴港當日前往 */
export const EXCHANGE_ADVICE = {
  primary: {
    name: "Tiệm Vàng Soạn Hà",
    csvName: "Tiệm Vàng Soạn Hà",
    scheduledDay: 3,
    note: "台灣背包客常推薦，匯率通常優於機場與飯店櫃台。",
  },
  earlyOptions: [
    {
      label: "峴港漢市場 Han Market 周邊",
      day: 1,
      note: "Day 1 行程已含漢市場，可詢價少額 VND（約 1–2 百萬），大額留到會安 Soạn Hà。",
    },
    {
      label: "機場 / 飯店兌換",
      day: 0,
      note: "匯率較差，僅建議換當晚交通與小費所需。",
    },
    {
      label: "燈籠公園對面珠寶店",
      day: 3,
      csvName: "Công Viên Đèn Lồng Hội An - Hoi An Lantern Park",
      note: "CSV 註記公園對面有多家可換匯，可與 Soạn Hà 比價後再決定。",
    },
  ],
  summary:
    "D0–D2 在峴港：先換少量應急即可；D3 抵會安後於 Tiệm Vàng Soạn Hà（17:00 行程）或燈籠公園周邊金店換大額，匯率通常較佳。",
};
