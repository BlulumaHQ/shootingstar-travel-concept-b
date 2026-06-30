/* ============================================================
 * Rocky Mountain Lake Tours — landing page content (EN / ZH / KO)
 * Five tours (A–E) mapped to their live Rezdy detail pages.
 * Lean schema — only what the redesigned landing page renders.
 * ============================================================ */

export type LakeTourCard = {
  letter: "A" | "B" | "C" | "D" | "E";
  slug: string;
  name: string;
  short: string;          // one-line card description
  priceFromLabel: string; // "From $230 CAD" etc.
  duration: string;
  departure: string;
  highlights: string;
  bestFor: string;
  fallbackImg: string;    // used until Supabase image arrives
};

export type LakeBundle = {
  name: string;
  flow: string[];
  tagline: string;
};

export type LakeToursContent = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    cta: string;
  };
  cards: {
    eyebrow: string;
    h2: string;
    intro: string;
    bookCta: string;
  };
  compare: {
    eyebrow: string;
    h2: string;
    headers: [string, string, string, string, string, string]; // Tour | Duration | Daily Departure | Highlights | Price | Best For
    mobileLabels: { duration: string; departure: string; highlights: string; price: string; bestFor: string };
  };
  bundles: {
    eyebrow: string;
    h2: string;
    intro: string;
    adCopy: string;
    contactCta: string;
    items: LakeBundle[];
  };
  finalCta: {
    eyebrow: string;
    h2: string;
    p: string;
    browseCta: string;
  };
  tours: LakeTourCard[];
};

import lake009 from "@/assets/lake-tours/lake-009.webp";
import lake010 from "@/assets/lake-tours/lake-010.webp";
import lake011 from "@/assets/lake-tours/lake-011.webp";
import lake013 from "@/assets/lake-tours/lake-013.webp";
import lake014 from "@/assets/lake-tours/lake-014.webp";

/** Shared hero image (re-exported so the landing page picks the same picture across locales). */
export const LAKE_TOURS_HERO_IMG = lake009;

/* ---------- ENGLISH ---------- */
export const LAKE_TOURS_EN: LakeToursContent = {
  meta: {
    title: "Canadian Rockies Lake Tours from Banff — Shootingstar Travel",
    description:
      "Five small-group day tours from Banff: Columbia Icefield, Moraine Lake, Lake Louise, Emerald Lake, Takakkaw Falls and the Moraine Lake sunrise. Book real dates with instant confirmation.",
    ogTitle: "Canadian Rockies Lake Tours from Banff",
    ogDescription:
      "Glaciers, turquoise lakes and waterfalls in one unforgettable journey. Five day-tour options from Banff with live availability.",
  },
  hero: {
    eyebrow: "— Canadian Rockies · Day Tours",
    title: "Canadian Rockies Lake Tours",
    tagline:
      "Picture yourself sipping a coffee at the Columbia Icefield, the glacier stretching out before you — turquoise lakes, glaciers, and waterfalls in one unforgettable journey.",
    cta: "Explore the tours ↓",
  },
  cards: {
    eyebrow: "— pick your tour",
    h2: "Five ways to see the Rockies",
    intro: "Each tour links to a live booking page with real-time availability and instant confirmation.",
    bookCta: "View dates & Book →",
  },
  compare: {
    eyebrow: "— compare",
    h2: "Side-by-side comparison",
    headers: ["Tour", "Duration", "Daily Departure", "Highlights", "Price", "Best For"],
    mobileLabels: {
      duration: "Duration",
      departure: "Departure",
      highlights: "Highlights",
      price: "Price",
      bestFor: "Best for",
    },
  },
  bundles: {
    eyebrow: "— suggested combinations",
    h2: "Plan your perfect Rockies trip",
    intro:
      "Combine any of the day tours above into a multi-day journey and receive a special bundle discount. Tell us your dates and we'll tailor the perfect itinerary.",
    adCopy:
      "Picture yourself sipping a Starbucks coffee at the Columbia Icefield, the glacier stretching out before you.",
    contactCta: "Contact us to plan this →",
    items: [
      { name: "Rock Star Tour", flow: ["A — Rockies Signature", "B — Moraine & Lake Louise"], tagline: "Short on time but want the absolute best-of-the-best postcards of the Rockies." },
      { name: "Lakes Chasers", flow: ["A — Rockies Signature", "C — 5 Iconic Lakes"], tagline: "Columbia Icefield plus the legendary turquoise lakes in one unforgettable sweep." },
      { name: "Banff & Yoho Highlights", flow: ["A — Rockies Signature", "B — Moraine & Lake Louise", "D — JET"], tagline: "Ice, water, canyon, lakes and waterfalls — every element of the Rockies in one trip." },
      { name: "The Postcards from Rockies", flow: ["Icefields Parkway Shuttles", "B — Moraine & Lake Louise"], tagline: "The full Icefields Parkway plus the iconic lake duo across Jasper and Banff." },
      { name: "Rockies Grand Slam", flow: ["Icefields Parkway Shuttles", "B — Moraine & Lake Louise", "D — JET"], tagline: "Complete all three national parks — Banff, Jasper and Yoho — the ultimate Rockies conquest." },
    ],
  },
  finalCta: {
    eyebrow: "— ready when you are",
    h2: "Your Canadian Rockies day, sorted.",
    p: "Pick a tour, lock in your date, and leave the driving, parking, and planning to us.",
    browseCta: "Browse all tours →",
  },
  tours: [
    {
      letter: "A",
      slug: "rockies-signature-columbia-icefield",
      name: "Rockies Signature — Columbia Icefield & Scenic Highway",
      short: "Crowfoot Glacier, Peyto Lake, Bow Lake and the Columbia Icefield along the legendary Icefields Parkway.",
      priceFromLabel: "From $230 CAD",
      duration: "~9–10 hrs",
      departure: "8:00 AM",
      highlights: "Crowfoot Glacier, Peyto Lake, Columbia Icefield, Bow Lake",
      bestFor: "Glacier & scenic-highway lovers",
      fallbackImg: lake011,
    },
    {
      letter: "B",
      slug: "moraine-lake-lake-louise-half-day",
      name: "Moraine Lake & Lake Louise Half-Day",
      short: "The two iconic Rockies lakes in a single relaxed half-day from Banff.",
      priceFromLabel: "From $130 CAD",
      duration: "Half day",
      departure: "7:30 AM & 2:00 PM",
      highlights: "Moraine Lake, Lake Louise",
      bestFor: "The two iconic lakes when time is short",
      fallbackImg: lake014,
    },
    {
      letter: "C",
      slug: "5-lakes-tour",
      name: "5 Iconic Lakes",
      short: "Collect the postcard lakes — Two Jack, Minnewanka, Moraine, Lake Louise and Emerald — in one full day.",
      priceFromLabel: "From $230 CAD",
      duration: "~10 hrs",
      departure: "8:00 AM",
      highlights: "Two Jack Lake, Lake Minnewanka, Moraine Lake, Lake Louise, Emerald Lake",
      bestFor: "Collecting all the legendary lakes",
      fallbackImg: lake013,
    },
    {
      letter: "D",
      slug: "jet-johnston-emerald-takakkaw",
      name: "JET — Johnston Canyon, Emerald Lake & Takakkaw Falls",
      short: "Canyons, turquoise water and Yoho's tallest waterfall in a single guided loop.",
      priceFromLabel: "From $170 CAD",
      duration: "~9 hrs",
      departure: "9:00 AM",
      highlights: "Johnston Canyon, Natural Bridge, Emerald Lake, Takakkaw Falls",
      bestFor: "Canyons & waterfalls",
      fallbackImg: lake010,
    },
    {
      letter: "E",
      slug: "moraine-lake-sunrise-tour",
      name: "Moraine Lake Sunrise",
      short: "Pre-dawn departure to catch first light over the Valley of the Ten Peaks.",
      priceFromLabel: "From $190 CAD",
      duration: "Early morning",
      departure: "Pre-dawn",
      highlights: "Moraine Lake sunrise, Valley of the Ten Peaks",
      bestFor: "Sunrise photographers",
      fallbackImg: lake009,
    },
  ],
};

/* ---------- 繁體中文 ---------- */
export const LAKE_TOURS_ZH: LakeToursContent = {
  meta: {
    title: "加拿大洛磯山脈湖區一日遊（班夫出發）— Shootingstar Travel",
    description:
      "從班夫出發的五條精選一日遊：哥倫比亞冰原、夢蓮湖、露易絲湖、翡翠湖、塔卡考瀑布，以及夢蓮湖日出團，皆可即時線上預訂。",
    ogTitle: "加拿大洛磯山脈湖區一日遊（班夫出發）",
    ogDescription:
      "冰川、湖泊、瀑布一次走遍。五種行程任你選，即時查日期、線上預訂。",
  },
  hero: {
    eyebrow: "— 加拿大洛磯山脈 · 一日遊",
    title: "加拿大洛磯山脈湖區行程",
    tagline:
      "想像自己在哥倫比亞冰原邊喝著咖啡、冰川就在眼前展開——冰川、夢幻湖水與飛瀑，一趟旅程全部收進口袋。",
    cta: "看看所有行程 ↓",
  },
  cards: {
    eyebrow: "— 挑選你的行程",
    h2: "五種玩洛磯的方式",
    intro: "每個行程都直接連到線上預訂頁，可即時查詢日期、線上確認。",
    bookCta: "查看日期 & 預訂 →",
  },
  compare: {
    eyebrow: "— 行程比較",
    h2: "五條行程一覽",
    headers: ["行程", "時長", "每日出發", "亮點", "費用", "適合"],
    mobileLabels: {
      duration: "時長",
      departure: "出發",
      highlights: "亮點",
      price: "費用",
      bestFor: "適合",
    },
  },
  bundles: {
    eyebrow: "— 推薦組合",
    h2: "規劃你的完美洛磯之旅",
    intro:
      "把上面任意行程組合成多日旅程，享有專屬組合優惠。告訴我們你的日期，我們為你客製最合適的行程。",
    adCopy: "想像自己在哥倫比亞冰原邊喝著星巴克，冰川就在眼前慢慢展開。",
    contactCta: "聯絡我們客製這個行程 →",
    items: [
      { name: "搖滾巨星之旅", flow: ["A — 洛磯經典", "B — 夢蓮湖 & 露易絲湖"], tagline: "時間有限，但想把洛磯最經典的明信片畫面一次帶回家。" },
      { name: "湖泊獵人", flow: ["A — 洛磯經典", "C — 五大絕美湖泊"], tagline: "冰原加上所有傳說中的綠松石湖泊，一次橫掃。" },
      { name: "班夫 & 優鶴精華", flow: ["A — 洛磯經典", "B — 夢蓮湖 & 露易絲湖", "D — JET"], tagline: "冰川、湖泊、峽谷與瀑布，洛磯的每個元素一次到位。" },
      { name: "洛磯明信片", flow: ["冰原大道接駁", "B — 夢蓮湖 & 露易絲湖"], tagline: "完整走完冰原大道，再收下班夫經典湖泊雙寶。" },
      { name: "洛磯大滿貫", flow: ["冰原大道接駁", "B — 夢蓮湖 & 露易絲湖", "D — JET"], tagline: "班夫、賈斯伯、優鶴三個國家公園一網打盡，終極洛磯體驗。" },
    ],
  },
  finalCta: {
    eyebrow: "— 準備好就出發",
    h2: "你的洛磯山脈一日遊，全部交給我們。",
    p: "選好行程、鎖定日期，交通、停車與安排我們一手搞定。",
    browseCta: "瀏覽所有行程 →",
  },
  tours: [
    {
      letter: "A",
      slug: "rockies-signature-columbia-icefield",
      name: "洛磯經典 — 哥倫比亞冰原 & 冰原大道",
      short: "鴉爪冰川、佩托湖、弓湖與哥倫比亞冰原，沿著傳奇冰原大道一次飽覽。",
      priceFromLabel: "$230 CAD 起",
      duration: "約 9–10 小時",
      departure: "上午 8:00",
      highlights: "鴉爪冰川、佩托湖、哥倫比亞冰原、弓湖",
      bestFor: "冰川與經典公路控",
      fallbackImg: lake011,
    },
    {
      letter: "B",
      slug: "moraine-lake-lake-louise-half-day",
      name: "夢蓮湖 & 露易絲湖半日遊",
      short: "兩大洛磯經典湖泊，半天輕鬆從班夫走完。",
      priceFromLabel: "$130 CAD 起",
      duration: "半天",
      departure: "上午 7:30 / 下午 2:00",
      highlights: "夢蓮湖、露易絲湖",
      bestFor: "時間有限，仍想看到雙湖經典",
      fallbackImg: lake014,
    },
    {
      letter: "C",
      slug: "5-lakes-tour",
      name: "五大絕美湖泊",
      short: "Two Jack、明尼旺卡、夢蓮、露易絲、翡翠——明信片湖泊一次收集滿。",
      priceFromLabel: "$230 CAD 起",
      duration: "約 10 小時",
      departure: "上午 8:00",
      highlights: "Two Jack Lake、明尼旺卡湖、夢蓮湖、露易絲湖、翡翠湖",
      bestFor: "想把傳奇湖泊一次收集完",
      fallbackImg: lake013,
    },
    {
      letter: "D",
      slug: "jet-johnston-emerald-takakkaw",
      name: "JET — 強斯頓峽谷、翡翠湖 & 塔卡考瀑布",
      short: "峽谷、湖泊與優鶴最高瀑布，一條路線通通玩到。",
      priceFromLabel: "$170 CAD 起",
      duration: "約 9 小時",
      departure: "上午 9:00",
      highlights: "強斯頓峽谷、天然橋、翡翠湖、塔卡考瀑布",
      bestFor: "峽谷與瀑布愛好者",
      fallbackImg: lake010,
    },
    {
      letter: "E",
      slug: "moraine-lake-sunrise-tour",
      name: "夢蓮湖日出團",
      short: "天未亮就出發，迎接十峰山谷上的第一道金光。",
      priceFromLabel: "$190 CAD 起",
      duration: "清晨",
      departure: "天亮前出發",
      highlights: "夢蓮湖日出、十峰山谷",
      bestFor: "日出攝影愛好者",
      fallbackImg: lake009,
    },
  ],
};

/* ---------- 한국어 ---------- */
export const LAKE_TOURS_KO: LakeToursContent = {
  meta: {
    title: "캐나디안 로키 호수 투어 (밴프 출발) — Shootingstar Travel",
    description:
      "밴프에서 출발하는 5가지 데이 투어: 컬럼비아 아이스필드, 모레인 호수, 레이크 루이스, 에메랄드 호수, 타카카우 폭포, 모레인 호수 일출 투어. 실시간 예약 가능.",
    ogTitle: "캐나디안 로키 호수 투어 (밴프 출발)",
    ogDescription:
      "빙하·터쿼이즈 호수·폭포를 하루에. 밴프 출발 5가지 데이 투어를 실시간으로 예약하세요.",
  },
  hero: {
    eyebrow: "— 캐나디안 로키 · 데이 투어",
    title: "캐나디안 로키 호수 투어",
    tagline:
      "컬럼비아 아이스필드에서 커피 한 잔, 눈앞에 펼쳐지는 빙하 — 호수, 빙하, 폭포까지 잊지 못할 하루를 그려보세요.",
    cta: "투어 보러 가기 ↓",
  },
  cards: {
    eyebrow: "— 투어 선택",
    h2: "로키를 즐기는 다섯 가지 방법",
    intro: "각 투어는 실시간 예약 가능한 상세 페이지로 연결됩니다. 바로 날짜를 확인하고 예약하세요.",
    bookCta: "날짜 보기 & 예약 →",
  },
  compare: {
    eyebrow: "— 비교",
    h2: "한눈에 비교하기",
    headers: ["투어", "소요시간", "매일 출발", "하이라이트", "요금", "추천 대상"],
    mobileLabels: {
      duration: "소요시간",
      departure: "출발",
      highlights: "하이라이트",
      price: "요금",
      bestFor: "추천 대상",
    },
  },
  bundles: {
    eyebrow: "— 추천 조합",
    h2: "당신만의 로키 여행 만들기",
    intro:
      "위 데이 투어를 자유롭게 조합해 다일 일정으로 만드시면 묶음 할인 혜택을 드립니다. 일정만 알려주시면 맞춤 여정으로 제안해 드립니다.",
    adCopy: "컬럼비아 아이스필드에서 스타벅스 한 잔, 눈앞에 펼쳐지는 빙하를 떠올려 보세요.",
    contactCta: "이 일정 문의하기 →",
    items: [
      { name: "Rock Star Tour", flow: ["A — 로키 시그니처", "B — 모레인 & 레이크 루이스"], tagline: "시간은 짧아도 로키의 베스트 컷만큼은 절대 놓치고 싶지 않은 분께." },
      { name: "Lakes Chasers", flow: ["A — 로키 시그니처", "C — 5대 호수"], tagline: "컬럼비아 아이스필드와 전설적인 터쿼이즈 호수들을 한 번에." },
      { name: "Banff & Yoho Highlights", flow: ["A — 로키 시그니처", "B — 모레인 & 레이크 루이스", "D — JET"], tagline: "빙하·호수·계곡·폭포 — 로키의 모든 요소를 한 여행에." },
      { name: "The Postcards from Rockies", flow: ["아이스필즈 파크웨이 셔틀", "B — 모레인 & 레이크 루이스"], tagline: "아이스필즈 파크웨이 전 구간과 밴프의 아이코닉한 호수 듀오." },
      { name: "Rockies Grand Slam", flow: ["아이스필즈 파크웨이 셔틀", "B — 모레인 & 레이크 루이스", "D — JET"], tagline: "밴프·재스퍼·요호 세 국립공원을 모두 정복하는 궁극의 로키 여정." },
    ],
  },
  finalCta: {
    eyebrow: "— 준비되면 출발",
    h2: "당신의 캐나디안 로키 하루, 저희가 준비해 드릴게요.",
    p: "투어를 고르고 날짜만 정해 주세요. 운전, 주차, 일정은 모두 저희가 맡습니다.",
    browseCta: "전체 투어 보기 →",
  },
  tours: [
    {
      letter: "A",
      slug: "rockies-signature-columbia-icefield",
      name: "로키 시그니처 — 컬럼비아 아이스필드 & 시닉 하이웨이",
      short: "크로풋 빙하, 페이토 호수, 보우 호수, 컬럼비아 아이스필드까지 아이스필즈 파크웨이를 따라.",
      priceFromLabel: "$230 CAD 부터",
      duration: "약 9–10시간",
      departure: "오전 8:00",
      highlights: "크로풋 빙하, 페이토 호수, 컬럼비아 아이스필드, 보우 호수",
      bestFor: "빙하·시닉 하이웨이 애호가",
      fallbackImg: lake011,
    },
    {
      letter: "B",
      slug: "moraine-lake-lake-louise-half-day",
      name: "모레인 호수 & 레이크 루이스 반일 투어",
      short: "로키의 아이코닉한 두 호수를 반나절 만에 편안하게.",
      priceFromLabel: "$130 CAD 부터",
      duration: "반일",
      departure: "오전 7:30 / 오후 2:00",
      highlights: "모레인 호수, 레이크 루이스",
      bestFor: "시간은 짧아도 두 호수만큼은 보고 싶을 때",
      fallbackImg: lake014,
    },
    {
      letter: "C",
      slug: "5-lakes-tour",
      name: "5대 아이코닉 호수",
      short: "투잭, 미네완카, 모레인, 레이크 루이스, 에메랄드 — 엽서 같은 호수를 하루에.",
      priceFromLabel: "$230 CAD 부터",
      duration: "약 10시간",
      departure: "오전 8:00",
      highlights: "투잭 호수, 미네완카 호수, 모레인 호수, 레이크 루이스, 에메랄드 호수",
      bestFor: "전설의 호수를 모두 모으고 싶을 때",
      fallbackImg: lake013,
    },
    {
      letter: "D",
      slug: "jet-johnston-emerald-takakkaw",
      name: "JET — 존스턴 캐년, 에메랄드 호수 & 타카카우 폭포",
      short: "협곡, 호수, 요호 최고 높이 폭포까지 한 번에.",
      priceFromLabel: "$170 CAD 부터",
      duration: "약 9시간",
      departure: "오전 9:00",
      highlights: "존스턴 캐년, 내추럴 브리지, 에메랄드 호수, 타카카우 폭포",
      bestFor: "협곡과 폭포를 좋아하는 분",
      fallbackImg: lake010,
    },
    {
      letter: "E",
      slug: "moraine-lake-sunrise-tour",
      name: "모레인 호수 일출 투어",
      short: "동트기 전 출발해 10봉 계곡 위로 떠오르는 첫 빛을 만나는 시간.",
      priceFromLabel: "$190 CAD 부터",
      duration: "이른 새벽",
      departure: "동트기 전",
      highlights: "모레인 호수 일출, 10봉 계곡",
      bestFor: "일출 사진가",
      fallbackImg: lake009,
    },
  ],
};
