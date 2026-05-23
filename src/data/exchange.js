/** 換匯 — Tiệm Vàng Soạn Hà（峴港海洲）營業 07:00–19:00 */
export const SOAN_HA_HOURS = { open: "07:00", close: "19:00", label: "每日 7:00–19:00" };

export const EXCHANGE_ADVICE = {
  primary: {
    name: "Tiệm Vàng Soạn Hà",
    csvName: "Tiệm Vàng Soạn Hà",
    scheduledDay: 1,
    scheduledTime: "07:15",
    hours: SOAN_HA_HOURS.label,
    note: "正式行程排 Day 1 早上（09:00 Klook 出發前）。",
  },
  arrivalPlan: {
    flightLand: "18:10",
    carryOnOnly: true,
    soanHaCloses: "19:00",
    verdict: "當晚抵達後不建議賭 Soạn Hà",
    reasoning: [
      "僅随身行李約 15–25 分鐘出關，Grab 機場→海洲約 20–30 分鐘。",
      "順利也要 18:45–19:10 才到，與 19:00 打烊重疊或已關。",
      "下機直衝換匯風險高；建議機場只換極少量或刷卡，大額 Day1 07:15 處理。",
    ],
    planB: {
      label: "極樂觀情況（不建議當主計畫）",
      steps: "18:10 落地 → 18:25 出關 → Grab 直達 Soạn Hà（不先回飯店）→ 19:00 前完成",
      risk: "班機延誤、入境排隊、晚高峰 Grab 一項就來不及。",
    },
    day0Instead: "Day 0：機場 Grab → Elite 入住 → Madame Lân 晚餐（同海洲區）。",
  },
  earlyOptions: [
    {
      label: "峴港漢市場 Han Market 周邊",
      day: 1,
      note: "Klook 一日遊 13:00 含韓市場，可順便比價小額。",
    },
    {
      label: "機場兌換",
      day: 0,
      note: "匯率較差，只換首晚 Grab＋小費即可。",
    },
  ],
  summary:
    "Soạn Hà 19:00 關門，IT551 18:10 抵達當晚幾乎來不及。Day 1 07:15 換匯最穩；Day 0 先入住吃飯。",
};
