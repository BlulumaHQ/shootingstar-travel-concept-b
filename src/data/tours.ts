import tourBanff from "@/assets/tour-banff.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import tourVancouver from "@/assets/tour-vancouver.jpg";
import tourVictoria from "@/assets/tour-victoria.jpg";
import tourPrivate from "@/assets/tour-private.jpg";
import tourIcefield from "@/assets/tour-icefield.jpg";
import tourToronto from "@/assets/tour-toronto.jpg";

export type Tour = {
  slug: string;
  img: string;
  gallery?: string[];
  title: string;
  desc: string;
  intro: string;
  duration: string;
  group: string;
  language: string;
  price: string;
  itinerary: { stop: string; title: string; body: string }[];
  included: string[];
  bring: string[];
  notes: string[];
  faq: { q: string; a: string }[];
  departures?: { date: string; seats: number }[];
  packages?: string[];
};

export const tours: Tour[] = [
  {
    slug: "rocky-mountain-classic",
    img: tourRockies,
    gallery: [tourRockies, tourBanff, tourIcefield],
    title: "落磯山經典團 5 天 4 夜",
    desc: "班夫・露易絲湖・冰原大道",
    intro: "從卡加利出發，深入加拿大最壯麗的山脈，收藏每一道清晨的湖光與星空。",
    duration: "5 天 4 夜",
    group: "小團 8–14 人",
    language: "中文 / 英文 / 韓文",
    price: "CAD $1,280 起",
    itinerary: [
      { stop: "Day 1", title: "卡加利集合・前往班夫", body: "下午抵達班夫小鎮，散步硫磺山纜車區，於溫泉鎮享用晚餐。" },
      { stop: "Day 2", title: "夢蓮湖・露易絲湖", body: "晨光中前往十峰山倒影，午後在露易絲湖畔咖啡時光。" },
      { stop: "Day 3", title: "冰原大道", body: "途經弓湖、鴉爪冰川，登上哥倫比亞冰原雪車與天空步道。" },
      { stop: "Day 4", title: "傑士伯國家公園", body: "前往瑪琳湖搭船遊精靈島，傍晚返回班夫感受小鎮夜色。" },
      { stop: "Day 5", title: "返回卡加利", body: "途中拜訪坎摩爾小鎮，午後抵達機場結束行程。" },
    ],
    included: ["專業中文 / 韓文導遊", "4 晚 3 星以上飯店", "每日早餐 + 4 餐", "全程交通與門票", "旅遊保險"],
    bring: ["保暖外套（即使夏天）", "舒適防滑步行鞋", "水壺與防曬", "個人藥品", "相機"],
    notes: [
      "山區天氣多變，請預留彈性",
      "出發前 30 天以上可全額退費",
      "未滿 6 歲幼童不適合本行程",
    ],
    faq: [
      { q: "是否包含機票？", a: "不包含，建議飛抵卡加利 (YYC)，我們可協助安排機場接送。" },
      { q: "需要簽證嗎？", a: "請依您的護照國籍辦理 eTA 或加拿大簽證。" },
      { q: "有單人房嗎？", a: "可加價升級單人房，請於報名時告知。" },
    ],
  },
  {
    slug: "banff-day",
    img: tourBanff,
    gallery: [tourBanff, tourRockies],
    title: "班夫國家公園一日遊",
    desc: "夢蓮湖・露易絲湖・弓河瀑布",
    intro: "從班夫出發的一日精選，輕鬆收藏洛磯山三大經典湖景。",
    duration: "1 日 (約 9 小時)",
    group: "小團 6–12 人",
    language: "中文 / 英文",
    price: "CAD $179 起",
    itinerary: [
      { stop: "08:00", title: "班夫鎮集合出發", body: "於指定地點集合，導遊簡介行程。" },
      { stop: "09:30", title: "夢蓮湖 Moraine Lake", body: "登上岩石堆觀景台，欣賞十峰山倒影。" },
      { stop: "12:00", title: "露易絲湖午餐", body: "湖畔自由活動 + 午餐時間（自理）。" },
      { stop: "15:00", title: "弓河瀑布 Bow Falls", body: "短程步行欣賞瀑布與班夫春溪飯店。" },
      { stop: "17:30", title: "返回班夫鎮", body: "結束今日精彩行程。" },
    ],
    included: ["專業中文導遊", "全程交通", "國家公園門票"],
    bring: ["午餐費用自理", "保暖衣物", "舒適步行鞋"],
    notes: ["夢蓮湖夏季有交通管制，行程順序可能調整"],
    faq: [
      { q: "可以帶小孩嗎？", a: "歡迎，4 歲以上適合此行程。" },
      { q: "是否包含午餐？", a: "不含。露易絲湖區域有多家餐廳可選。" },
    ],
  },
  {
    slug: "aurora-chase",
    img: tourAurora,
    gallery: [tourAurora],
    title: "極光追蹤之旅",
    desc: "黃刀鎮・極光小屋・專業攝影",
    intro: "在黃刀鎮的極光帶下，等待綠光輕輕落下。",
    duration: "4 晚 5 日",
    group: "小團 6–10 人",
    language: "中文 / 英文",
    price: "CAD $229 起 (每晚追光)",
    itinerary: [
      { stop: "Day 1", title: "抵達黃刀鎮", body: "機場接機，入住飯店，傍晚說明會。" },
      { stop: "Day 2-4", title: "極光追蹤", body: "每晚 22:00 出發前往極光小屋，待至 02:00。" },
      { stop: "Day 5", title: "送機返程", body: "結束追光行程，期待下一次相遇。" },
    ],
    included: ["極光小屋使用", "保暖極地衣物租借", "熱飲與點心", "攝影教學"],
    bring: ["護照", "個人保暖底層衣物", "備用相機電池"],
    notes: ["極光為自然現象，不保證 100% 看見"],
    faq: [
      { q: "最佳季節？", a: "11 月至次年 4 月為最佳觀測期。" },
      { q: "需要自備相機嗎？", a: "建議自備，導遊可提供拍攝設定指導。" },
    ],
  },
  {
    slug: "vancouver-city",
    img: tourToronto,
    gallery: [tourToronto, tourVancouver],
    title: "溫哥華市區深度遊",
    desc: "城市精華景點・深度體驗",
    intro: "在地嚮導帶你走進溫哥華最有故事的街角。",
    duration: "1 日",
    group: "小團 4–10 人",
    language: "中文 / 英文 / 韓文",
    price: "CAD $129 起",
    itinerary: [
      { stop: "09:00", title: "Stanley Park", body: "海堤騎行 + 圖騰柱景點。" },
      { stop: "11:30", title: "Granville Island", body: "公共市場與工藝小店漫遊。" },
      { stop: "14:00", title: "Gastown", body: "蒸汽鐘與磚石街道散步。" },
      { stop: "16:00", title: "Canada Place", body: "海濱景觀與城市天際線。" },
    ],
    included: ["專業導遊", "全程交通", "Granville Island 渡輪"],
    bring: ["舒適鞋", "雨具（溫哥華多雨）", "相機"],
    notes: ["午餐自理，導遊可推薦在地餐廳"],
    faq: [
      { q: "從哪裡出發？", a: "溫哥華市中心 Burrard 站集合。" },
    ],
  },
  // icefields-parkway tour removed — was a Jasper-area tour, not part of the approved 6.
  {
    slug: "victoria-garden",
    img: tourVictoria,
    gallery: [tourVictoria],
    title: "維多利亞花園之旅",
    desc: "渡輪 + 布查特花園 + 古典市區",
    intro: "英倫風情與花園午後，最舒緩的離島小旅行。",
    duration: "1 日",
    group: "小團 6–14 人",
    language: "中文 / 英文",
    price: "CAD $219 起",
    itinerary: [
      { stop: "07:00", title: "溫哥華集合", body: "前往 Tsawwassen 渡輪碼頭。" },
      { stop: "09:00", title: "BC Ferries", body: "搭乘渡輪欣賞海峽風景。" },
      { stop: "11:00", title: "布查特花園", body: "下沉花園・玫瑰園・日式園。" },
      { stop: "14:30", title: "維多利亞市區", body: "省議會大樓・內港散步。" },
      { stop: "20:00", title: "返回溫哥華", body: "結束行程。" },
    ],
    included: ["渡輪票", "布查特花園門票", "全程交通"],
    bring: ["輕便鞋", "相機", "防曬"],
    notes: ["花季為 5–9 月，不同月份景觀不同"],
    faq: [{ q: "可以單獨報名嗎？", a: "可以，最低 2 人成行。" }],
  },
  {
    slug: "private-tour",
    img: tourPrivate,
    gallery: [tourPrivate],
    title: "私人包團服務",
    desc: "為你與家人朋友量身打造",
    intro: "彈性日期、彈性路線、彈性節奏。讓我們為你寫一段獨家旅行劇本。",
    duration: "客製 (1–14 日)",
    group: "2–20 人",
    language: "中文 / 英文 / 韓文",
    price: "報價依需求",
    itinerary: [
      { stop: "Step 1", title: "需求溝通", body: "告訴我們人數、日期、興趣與預算。" },
      { stop: "Step 2", title: "行程提案", body: "48 小時內提供量身路線與報價。" },
      { stop: "Step 3", title: "確認與付款", body: "細節確認，繳交訂金。" },
      { stop: "Step 4", title: "出發！", body: "專屬導遊全程陪伴。" },
    ],
    included: ["量身行程設計", "私人專車", "專屬導遊"],
    bring: ["依行程而定"],
    notes: ["建議提前 1 個月以上預約"],
    faq: [{ q: "最少幾人成行？", a: "2 人即可。" }],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
