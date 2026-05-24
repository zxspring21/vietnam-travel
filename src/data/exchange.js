/** 換匯 — Tiệm Vàng Soạn Hà（峴港海洲）營業 07:00–19:00 */
export const SOAN_HA_HOURS = { open: "07:00", close: "19:00", label: "每日 7:00–19:00" };

export const EXCHANGE_ADVICE = {
  primary: {
    name: "Tiệm Vàng Soạn Hà",
    csvName: "Tiệm Vàng Soạn Hà",
    scheduledDay: 1,
    scheduledTime: "09:00",
    hours: SOAN_HA_HOURS.label,
    note: "Day 1（6/12）休閒日 09:00 換匯，不與 Klook 搶早上。",
  },
  itinerarySwap: {
    summary:
      "已將原 Day1 峴港一日遊改排 Day 3（6/14），原 Day3 休閒改 Day 1，方便首日換匯。",
    klookWarning:
      "若 Klook #1573 訂單日期仍為 6/12，請在 Klook 改期至 6/14，或把 App 內 Day 3 當作實際出團日。",
  },
  arrivalPlan: {
    flightLand: "18:10",
    carryOnOnly: true,
    soanHaCloses: "19:00",
    verdict: "當晚不必換匯",
    day0Instead: "Day 0：機場 → Dream Suite 入住 → Esco Beach 晚餐。大額換匯留 Day 1 09:00。",
  },
  earlyOptions: [
    {
      label: "峴港漢市場 Han Market",
      day: 3,
      note: "Klook 一日遊（Day 3）含韓市場，可順便比價小額。",
    },
    {
      label: "機場兌換",
      day: 0,
      note: "匯率較差，只換首晚 Grab＋小費即可。",
    },
  ],
  summary:
    "抵達日晚只入住吃飯；Day 1 09:00 Soạn Hà 換匯（休閒日）。Klook 峴港團在 Day 3。",
};
