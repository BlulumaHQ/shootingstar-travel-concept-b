import bgLake from "@/assets/bg-lake-louise.webp";
import tourRockies from "@/assets/tour-rockies.webp";
import tourBanff from "@/assets/tour-banff.webp";
import heroBanff from "@/assets/hero-banff.jpg";

export type TourKey = "halfday" | "sunrise" | "extended";

export type TourOption = {
  key: TourKey;
  name: string;
  tag: string;
  short: string;
  price: number;
  priceLabel: string;
  pickup: string;
  moraineTime: string;
  louiseTime: string;
  departures: { day: string; times: string[] }[];
  times: string[];
  pickupOptions: string[];
  highlights?: string;
  itinerary?: string[];
  bestFor: string;
  img: string;
  cta: string;
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
    h1Line1: string;
    h1Line2: string;
    sub: string;
    ctaBook: string;
    ctaCompare: string;
    badges: string[];
  };
  quickReserve: {
    eyebrow: string;
    title: string;
    continueCta: string;
    footnote: string;
  };
  why: {
    eyebrow: string;
    h2: string;
    p1: string;
    p2: string;
    features: { t: string; d: string }[];
  };
  options: {
    eyebrow: string;
    h2: string;
    labels: {
      price: string;
      pickup: string;
      moraine: string;
      louise: string;
      departures: string;
      itinerary: string;
      gratuityNote: string;
    };
  };
  compare: {
    eyebrow: string;
    h2: string;
    headers: [string, string, string, string, string, string, string];
    priceSuffix: string; // e.g. " CAD + GST"
    mobileLabels: { price: string; pickup: string; moraine: string; louise: string };
  };
  reserve: {
    eyebrow: string;
    h2: string;
    intro: string;
    fields: {
      tour: string;
      date: string;
      pickup: string;
      time: string;
      adults: string;
      children: string;
    };
    summary: {
      eyebrow: string;
      date: string;
      pickup: string;
      time: string;
      guests: string;
      adultUnit: (n: number) => string;
      childUnit: (n: number) => string;
      tourUnit: (n: number) => string;
      gst: string;
      total: string;
      gratuityNote: string;
      continueCta: string;
      footnote: string;
    };
  };
  included: {
    eyebrow: string;
    h2: string;
    includedTitle: string;
    includedItems: string[];
    notIncludedTitle: string;
    notIncludedItems: (string | { text: string; href?: string })[];
  };
  faq: {
    eyebrow: string;
    h2: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    eyebrow: string;
    h2: string;
    p: string;
    ctaReserve: string;
    ctaCompare: string;
  };
  sticky: {
    fromLabel: (price: number) => string;
    cta: string;
  };
  modal: {
    eyebrow: string;
    title: string;
    body: string;
    contactCta: string;
    close: string;
  };
  tours: Record<TourKey, TourOption>;
};

/* ============================================================
 * ENGLISH
 * ============================================================ */
export const LAKE_TOURS_EN: LakeToursContent = {
  meta: {
    title: "Moraine Lake & Lake Louise Tours from Banff — Shootingstar Travel",
    description:
      "Skip the parking stress. Visit Moraine Lake and Lake Louise with a comfortable guided lake tour from Banff — sunrise, half-day, or extended options.",
    ogTitle: "Moraine Lake & Lake Louise Tours from Banff",
    ogDescription:
      "Choose from sunrise, half-day, or extended lake tours from Banff. No parking stress. Real lake time.",
  },
  hero: {
    eyebrow: "— Banff · Lake Tours",
    h1Line1: "Moraine Lake & Lake Louise,",
    h1Line2: "Made Easy",
    sub: "Choose from sunrise, half-day, or extended lake tours designed for travelers who want the beauty of the Rockies without the stress of driving, parking, or shuttle planning.",
    ctaBook: "Book Your Lake Tour →",
    ctaCompare: "Compare Tour Options",
    badges: [
      "Banff Pickup Available",
      "Moraine Lake Access",
      "Lake Louise Included",
      "Small-Group Style Tour",
    ],
  },
  quickReserve: {
    eyebrow: "— Quick Reserve",
    title: "Pick your lake tour",
    continueCta: "Continue to Booking →",
    footnote: "* Online booking integration coming soon.",
  },
  why: {
    eyebrow: "— why book this tour",
    h2: "The Rockies Are Beautiful. Getting There Can Be Complicated.",
    p1: "Moraine Lake and Lake Louise are two of the most famous destinations in the Canadian Rockies, but parking, shuttle access, early morning traffic, and changing seasonal rules can make planning stressful.",
    p2: "Our lake tours are designed to make the experience simple. Choose your preferred schedule, meet at the pickup point, and enjoy a comfortable ride to the lakes with time to explore at your own pace.",
    features: [
      { t: "No Parking Stress", d: "Avoid the hassle of finding parking near the lakes." },
      { t: "Banff Pickup", d: "Convenient pickup from Banff at the Mount Royal Hotel parking area." },
      { t: "Flexible Tour Styles", d: "Choose from a half-day lake visit, sunrise tour, or extended lake exploration." },
      { t: "More Time at the Lakes", d: "Enjoy meaningful free time instead of rushing through a quick photo stop." },
    ],
  },
  options: {
    eyebrow: "— tour options",
    h2: "Choose Your Lake Day",
    labels: {
      price: "Price",
      pickup: "Pickup",
      moraine: "Moraine Lake",
      louise: "Lake Louise",
      departures: "Departures",
      itinerary: "Itinerary",
      gratuityNote: "Suggested guide gratuity: $15 CAD / person",
    },
  },
  compare: {
    eyebrow: "— compare",
    h2: "Side-by-Side Comparison",
    headers: ["Tour", "Best For", "Price", "Pickup", "Departure", "Moraine Lake", "Lake Louise"],
    priceSuffix: " CAD + GST",
    mobileLabels: { price: "Price", pickup: "Pickup", moraine: "Moraine", louise: "Lake Louise" },
  },
  reserve: {
    eyebrow: "— reserve",
    h2: "Reserve Your Lake Tour",
    intro:
      "Select your tour option, pickup location, departure time, and number of guests. Online booking integration will be connected soon.",
    fields: {
      tour: "Select Tour",
      date: "Select Date",
      pickup: "Pickup Location",
      time: "Departure Time",
      adults: "Adults",
      children: "Children",
    },
    summary: {
      eyebrow: "— order summary",
      date: "Date",
      pickup: "Pickup",
      time: "Time",
      guests: "Guests",
      adultUnit: (n) => `${n} adult${n !== 1 ? "s" : ""}`,
      childUnit: (n) => `${n} child${n !== 1 ? "ren" : ""}`,
      tourUnit: (n) => `Tour × ${n}`,
      gst: "GST (5%)",
      total: "Estimated Total",
      gratuityNote: "Suggested guide gratuity of $15 CAD / person not included.",
      continueCta: "Continue to Booking →",
      footnote:
        "Final availability and payment will be confirmed through our official booking system.",
    },
  },
  included: {
    eyebrow: "— what's included",
    h2: "What's Included",
    includedTitle: "Included",
    includedItems: [
      "Comfortable transportation",
      "Banff pickup for selected tours",
      "Canmore pickup for sunrise tour",
      "Moraine Lake visit",
      "Lake Louise visit",
      "Planned lake access schedule",
      "Free time at selected stops",
    ],
    notIncludedTitle: "Not Included",
    notIncludedItems: [
      "5% GST",
      "Meals and drinks",
      "Personal expenses",
      "Canoe rental",
      "Optional self-guided hikes",
      "Suggested guide gratuity of $15 CAD / person",
      { text: "Parks Canada Discovery Pass (must be purchased individually by each guest in advance)", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
  },
  faq: {
    eyebrow: "— travel notes",
    h2: "Important Travel Notes",
    items: [
      {
        q: "Do I need a Parks Canada Discovery Pass?",
        a: "Yes. Banff National Park entry is required for this tour and is NOT included in the tour price. Each guest must purchase their own Parks Canada Discovery Pass in advance under their own name at parkscanadashop.ca and bring it (printed or digital) on tour day.",
      },
      {
        q: "Is Moraine Lake access guaranteed?",
        a: "Moraine Lake access is subject to seasonal road rules, park regulations, weather, and operational conditions. The tour is designed to follow the available access schedule as closely as possible.",
      },
      { q: "Where is the Banff pickup point?", a: "The Banff pickup point is the Mount Royal Hotel parking lot." },
      {
        q: "Is this a guided hiking tour?",
        a: "No. This is a lake access and sightseeing tour. Guests will have free time at the lakes. Any walking or hiking activities are self-guided and optional.",
      },
      {
        q: "Can I hike during the free time?",
        a: "Yes, guests who are physically able may choose to explore nearby self-guided routes during free time. Suggested routes include Fairview Lookout, Consolation Lakes, or Lake Agnes Tea House depending on the selected tour and available time. Guests are responsible for returning to the pickup point on time.",
      },
      { q: "Are meals included?", a: "No. Meals and drinks are not included. Guests should bring snacks, water, and any food needed during the tour." },
      { q: "What should I bring?", a: "Bring layered clothing, comfortable walking shoes, water, snacks, a camera, sun protection, and a warm jacket for early morning departures." },
      { q: "Is the sunrise tour very early?", a: "Yes. The sunrise tour departs early in order to reach Moraine Lake before sunrise and give guests the best chance to enjoy the morning light over the Valley of the Ten Peaks." },
      { q: "Is gratuity included?", a: "No. Suggested guide gratuity is $15 CAD per person." },
    ],
  },
  finalCta: {
    eyebrow: "— ready when you are",
    h2: "See Moraine Lake & Lake Louise Without the Stress",
    p: "Choose the tour style that fits your travel pace, from a simple half-day visit to a sunrise experience or a longer lake exploration day.",
    ctaReserve: "Reserve Your Lake Tour →",
    ctaCompare: "Compare Tour Options",
  },
  sticky: {
    fromLabel: (p) => `From $${p} CAD`,
    cta: "Book Lake Tour →",
  },
  modal: {
    eyebrow: "— booking system",
    title: "Booking system coming soon.",
    body: "Please contact Shooting Star Travel to reserve this tour. Our team will confirm availability and walk you through the booking.",
    contactCta: "Contact Us to Book →",
    close: "Close",
  },
  tours: {
    halfday: {
      key: "halfday",
      name: "Rocky Mountains Two Lakes Half-Day Tour",
      tag: "Best for Easy Lake Access",
      short:
        "A simple and scenic half-day tour from Banff to Moraine Lake and Lake Louise, perfect for travelers who want a comfortable lake experience without a full-day commitment.",
      price: 155,
      priceLabel: "$155 CAD + GST / person",
      pickup: "Banff — Mount Royal Hotel parking lot",
      moraineTime: "2 hours",
      louiseTime: "1 hour",
      departures: [
        { day: "Tuesday & Wednesday", times: ["8:00 AM", "2:00 PM"] },
        { day: "Mon, Thu, Fri, Sat, Sun", times: ["8:00 AM", "9:00 AM", "2:00 PM", "3:00 PM"] },
      ],
      times: ["8:00 AM", "9:00 AM", "2:00 PM", "3:00 PM"],
      pickupOptions: ["Banff — Mount Royal Hotel Parking Lot"],
      bestFor: "Best for simple lake access",
      img: tourBanff,
      cta: "Select Half-Day Tour",
    },
    sunrise: {
      key: "sunrise",
      name: "Moraine Lake Sunrise Tour",
      tag: "Best for Sunrise Photography",
      short:
        "A classic early-morning Rockies experience for travelers who want to catch the first light at Moraine Lake and enjoy extended free time at Lake Louise.",
      price: 225,
      priceLabel: "$225 CAD + GST / person",
      pickup: "Canmore 2:45 AM · Banff 3:15 AM",
      moraineTime: "Sunrise — 8:00 AM",
      louiseTime: "3 hours",
      departures: [{ day: "Every Thursday", times: ["Canmore 2:45 AM", "Banff 3:15 AM"] }],
      times: ["Canmore 2:45 AM", "Banff 3:15 AM"],
      pickupOptions: ["Canmore — Sunrise Tour Only", "Banff — Mount Royal Hotel Parking Lot"],
      highlights:
        "Arrive early at Moraine Lake to secure a beautiful sunrise viewing experience over the Valley of the Ten Peaks.",
      itinerary: [
        "Arrive at Moraine Lake and wait for sunrise.",
        "Depart Moraine Lake at 8:00 AM.",
        "Continue to Lake Louise for 3 hours of free time.",
        "Walk along the lakeshore or, if physically able, explore short self-guided trails such as Fairview Lookout.",
        "Depart Lake Louise at 11:00 AM and return to Banff.",
      ],
      bestFor: "Best for sunrise photography",
      img: heroBanff,
      cta: "Select Sunrise Tour",
    },
    extended: {
      key: "extended",
      name: "Two Lakes Extended Exploration Tour",
      tag: "Best for Longer Free Time",
      short:
        "A deeper lake experience with longer free time at both Moraine Lake and Lake Louise — ideal for guests who want to explore, walk, hike, and take photos at a slower pace.",
      price: 200,
      priceLabel: "$200 CAD + GST / person",
      pickup: "Banff — Mount Royal Hotel parking lot",
      moraineTime: "3.5 hours",
      louiseTime: "4 hours",
      departures: [{ day: "Every Tuesday", times: ["6:30 AM"] }],
      times: ["Banff 6:30 AM"],
      pickupOptions: ["Banff — Mount Royal Hotel Parking Lot"],
      highlights: "Avoid peak crowds and enjoy extended time at both lakes.",
      itinerary: [
        "Moraine Lake: stay 3.5 hours. Depart at 11:00 AM for Lake Louise.",
        "Free time options at Moraine: lakeside views, photography, canoe rental, or self-guided routes such as Consolation Lakes if physically able.",
        "Lake Louise: stay 4 hours.",
        "Free time options at Lake Louise: lakeshore walk, relax near the water, or a self-guided trail such as Lake Agnes Tea House if physically able.",
      ],
      bestFor: "Best for deeper exploration",
      img: tourRockies,
      cta: "Select Extended Tour",
    },
  },
};

/* ============================================================
 * 繁體中文 (Traditional Chinese) — 旅客語氣，自然口吻
 * ============================================================ */
export const LAKE_TOURS_ZH: LakeToursContent = {
  meta: {
    title: "夢蓮湖 & 露易絲湖一日遊（班夫出發）— Shootingstar Travel",
    description:
      "不用煩惱停車、班次、交通管制。從班夫舒服出發，玩夢蓮湖與露易絲湖。日出團、半日遊、深度遊三種行程任你挑。",
    ogTitle: "夢蓮湖 & 露易絲湖湖區行程（班夫出發）",
    ogDescription: "日出團・半日遊・深度遊三選一。免停車、免搶車位，真正在湖邊好好待著。",
  },
  hero: {
    eyebrow: "— 班夫 · 湖區行程",
    h1Line1: "夢蓮湖 & 露易絲湖，",
    h1Line2: "輕鬆玩，不卡關",
    sub: "三種行程，依你的旅遊節奏挑：日出團、半日遊、湖區深度遊。班夫舒服出發，免停車、免搶接駁、免一早盯交通管制，把心力留給洛磯山的風景。",
    ctaBook: "立即預訂湖區行程 →",
    ctaCompare: "比較行程方案",
    badges: ["班夫接送", "夢蓮湖入園", "含露易絲湖", "小團體風格"],
  },
  quickReserve: {
    eyebrow: "— 快速預訂",
    title: "選擇你的湖區行程",
    continueCta: "前往預訂 →",
    footnote: "＊線上付款系統即將開通。",
  },
  why: {
    eyebrow: "— 為什麼選這個行程",
    h2: "洛磯山很美，但要走進去其實沒那麼簡單。",
    p1: "夢蓮湖與露易絲湖是加拿大洛磯山最具代表性的兩座湖，但現在停車一位難求、接駁班次有限、清晨車流壅塞，加上每年季節性的交通管制規定，自己安排其實相當花時間。",
    p2: "我們的湖區行程把這些麻煩都先幫你處理好。挑好喜歡的時段、到指定接送點上車，剩下的就是好好享受湖邊時光，依自己的步調慢慢走、慢慢拍。",
    features: [
      { t: "免煩惱停車", d: "湖區停車位有限，由我們直接帶你進去，省下繞圈找位的時間。" },
      { t: "班夫直接接送", d: "在班夫 Mount Royal Hotel 停車場集合，方便又好找。" },
      { t: "三種行程任挑", d: "想輕鬆走、想拍日出，還是想在湖邊待久一點，都有對應方案。" },
      { t: "湖邊待得夠久", d: "不是下車十分鐘拍照就走，而是真的留時間讓你好好感受。" },
    ],
  },
  options: {
    eyebrow: "— 行程選擇",
    h2: "挑一個適合你的湖邊一日",
    labels: {
      price: "價格",
      pickup: "接送點",
      moraine: "夢蓮湖",
      louise: "露易絲湖",
      departures: "出發時間",
      itinerary: "行程安排",
      gratuityNote: "建議司導小費：每人 $15 CAD",
    },
  },
  compare: {
    eyebrow: "— 行程比較",
    h2: "三種行程一次看清楚",
    headers: ["行程", "適合對象", "價格", "接送點", "出發時間", "夢蓮湖", "露易絲湖"],
    priceSuffix: " CAD + GST",
    mobileLabels: { price: "價格", pickup: "接送", moraine: "夢蓮湖", louise: "露易絲湖" },
  },
  reserve: {
    eyebrow: "— 預訂",
    h2: "預訂你的湖區行程",
    intro: "選擇行程方案、接送點、出發時間與人數即可。線上付款系統即將開通。",
    fields: {
      tour: "選擇行程",
      date: "選擇日期",
      pickup: "接送地點",
      time: "出發時間",
      adults: "大人",
      children: "兒童",
    },
    summary: {
      eyebrow: "— 訂單摘要",
      date: "日期",
      pickup: "接送點",
      time: "出發時間",
      guests: "人數",
      adultUnit: (n) => `大人 ${n} 位`,
      childUnit: (n) => `兒童 ${n} 位`,
      tourUnit: (n) => `行程 × ${n}`,
      gst: "GST 稅金（5%）",
      total: "預估總額",
      gratuityNote: "建議司導小費每人 $15 CAD，未含於上方金額。",
      continueCta: "前往預訂 →",
      footnote: "最終空位與付款，將透過正式預訂系統再行確認。",
    },
  },
  included: {
    eyebrow: "— 行程包含",
    h2: "費用包含什麼？",
    includedTitle: "費用包含",
    includedItems: [
      "舒適交通車",
      "班夫接送（適用對應行程）",
      "Canmore 接送（限日出團）",
      "夢蓮湖入園",
      "露易絲湖停留",
      "完整湖區安排",
      "湖邊自由活動時間",
    ],
    notIncludedTitle: "費用不包含",
    notIncludedItems: [
      "5% GST 稅金",
      "餐點與飲料",
      "個人消費",
      "獨木舟租借",
      "選擇性自由健行",
      "建議司導小費（每人 $15 CAD）",
      { text: "加拿大國家公園 Discovery Pass（須由旅客本人提前購買）", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
  },
  faq: {
    eyebrow: "— 出發前必看",
    h2: "出發前重要提醒",
    items: [
      {
        q: "需要購買加拿大國家公園 Discovery Pass 嗎？",
        a: "需要。本行程會進入 Banff 國家公園，但園區門票不包含在團費中。請每位旅客提前於 parkscanadashop.ca 以本人名字購買 Parks Canada Discovery Pass，並於行程當日攜帶（紙本或電子皆可）。",
      },
      {
        q: "夢蓮湖一定能進得去嗎？",
        a: "夢蓮湖每年的入園規定會依季節、國家公園規範、天氣與現場狀況有所不同。我們會盡可能依當下開放規則安排，讓你最大化進入機會。",
      },
      { q: "班夫接送點在哪裡？", a: "班夫接送點為 Mount Royal Hotel 停車場。" },
      {
        q: "這是健行團嗎？",
        a: "不是。這是以湖區觀景與自由活動為主的行程，會在湖邊安排自由時間。任何步道散步或健行都屬於選擇性、自助性質。",
      },
      {
        q: "自由時間可以去走步道嗎？",
        a: "可以，體力允許的旅客可以利用自由時間自行走附近的短步道，例如 Fairview Lookout、Consolation Lakes、或 Lake Agnes Tea House，依行程與時間而定。請務必準時回到上車地點。",
      },
      { q: "有含餐嗎？", a: "不含餐。請自備點心、飲水及行程中需要的食物。" },
      {
        q: "建議帶什麼？",
        a: "建議洋蔥式穿搭、好走的鞋、飲水、點心、相機、防曬用品；如為清晨出發，請準備保暖外套。",
      },
      {
        q: "日出團是不是真的很早？",
        a: "是的，為了趕在日出前抵達夢蓮湖、把握十峰谷上方的晨光，日出團出發時間相當早，敬請預留休息時間。",
      },
      { q: "費用有含小費嗎？", a: "未含。建議司導小費每人 $15 CAD。" },
    ],
  },
  finalCta: {
    eyebrow: "— 準備好就出發",
    h2: "用最輕鬆的方式，看見夢蓮湖與露易絲湖",
    p: "依你的旅遊步調挑一個方案：想輕鬆半天玩完、想拍最美日出、或想在湖邊待久一點，都有對應行程。",
    ctaReserve: "立即預訂湖區行程 →",
    ctaCompare: "比較行程方案",
  },
  sticky: {
    fromLabel: (p) => `每人 $${p} CAD 起`,
    cta: "預訂湖區行程 →",
  },
  modal: {
    eyebrow: "— 預訂系統",
    title: "線上預訂系統即將開通",
    body: "請先透過聯絡方式與 Shooting Star Travel 預約，我們的客服會協助確認空位並完成訂位流程。",
    contactCta: "聯絡我們完成預訂 →",
    close: "關閉",
  },
  tours: {
    halfday: {
      key: "halfday",
      name: "洛磯山雙湖半日遊",
      tag: "輕鬆玩湖首選",
      short:
        "從班夫出發的舒服半日遊，一次造訪夢蓮湖與露易絲湖。適合不想佔用整天行程，又想好好看湖的旅客。",
      price: 155,
      priceLabel: "$155 CAD + GST / 每人",
      pickup: "班夫 — Mount Royal Hotel 停車場",
      moraineTime: "2 小時",
      louiseTime: "1 小時",
      departures: [
        { day: "週二、週三", times: ["8:00 AM", "2:00 PM"] },
        { day: "週一、週四、週五、週六、週日", times: ["8:00 AM", "9:00 AM", "2:00 PM", "3:00 PM"] },
      ],
      times: ["8:00 AM", "9:00 AM", "2:00 PM", "3:00 PM"],
      pickupOptions: ["班夫 — Mount Royal Hotel 停車場"],
      bestFor: "輕鬆走訪兩座湖",
      img: tourBanff,
      cta: "選擇半日遊",
    },
    sunrise: {
      key: "sunrise",
      name: "夢蓮湖日出團",
      tag: "日出攝影首選",
      short:
        "經典的洛磯山清晨體驗，搶在第一道光之前抵達夢蓮湖，之後再到露易絲湖享有充裕的自由時間。",
      price: 225,
      priceLabel: "$225 CAD + GST / 每人",
      pickup: "Canmore 2:45 AM · 班夫 3:15 AM",
      moraineTime: "日出 — 8:00 AM",
      louiseTime: "3 小時",
      departures: [{ day: "每週四", times: ["Canmore 2:45 AM", "班夫 3:15 AM"] }],
      times: ["Canmore 2:45 AM", "班夫 3:15 AM"],
      pickupOptions: ["Canmore — 僅限日出團", "班夫 — Mount Royal Hotel 停車場"],
      highlights: "提早抵達夢蓮湖，搶占十峰谷上方最美晨光的觀景位置。",
      itinerary: [
        "抵達夢蓮湖,等待日出。",
        "8:00 AM 離開夢蓮湖。",
        "前往露易絲湖,享有 3 小時自由時間。",
        "可沿湖畔散步;體力允許者可自行走 Fairview Lookout 等短程步道。",
        "11:00 AM 從露易絲湖出發,返回班夫。",
      ],
      bestFor: "適合日出攝影",
      img: heroBanff,
      cta: "選擇日出團",
    },
    extended: {
      key: "extended",
      name: "雙湖深度遊",
      tag: "湖邊待最久",
      short:
        "在夢蓮湖與露易絲湖都安排更長的自由時間，適合喜歡慢慢走、慢慢拍、想好好感受湖區氛圍的旅客。",
      price: 200,
      priceLabel: "$200 CAD + GST / 每人",
      pickup: "班夫 — Mount Royal Hotel 停車場",
      moraineTime: "3.5 小時",
      louiseTime: "4 小時",
      departures: [{ day: "每週二", times: ["6:30 AM"] }],
      times: ["班夫 6:30 AM"],
      pickupOptions: ["班夫 — Mount Royal Hotel 停車場"],
      highlights: "避開最擁擠時段,在兩座湖都享有充裕停留時間。",
      itinerary: [
        "夢蓮湖停留 3.5 小時，11:00 AM 出發前往露易絲湖。",
        "夢蓮湖自由活動：湖畔賞景、攝影、租獨木舟，或自行走 Consolation Lakes 等步道（依體力決定）。",
        "露易絲湖停留 4 小時。",
        "露易絲湖自由活動：湖邊散步、放鬆休息，或自行走 Lake Agnes Tea House 步道（依體力決定）。",
      ],
      bestFor: "適合深度走訪",
      img: tourRockies,
      cta: "選擇深度遊",
    },
  },
};

/* ============================================================
 * 한국어 (Korean) — 친절·정중한 여행 안내 톤
 * ============================================================ */
export const LAKE_TOURS_KO: LakeToursContent = {
  meta: {
    title: "모레인 호수 & 루이스 호수 투어 (밴프 출발) — Shootingstar Travel",
    description:
      "주차 걱정, 셔틀 예약, 새벽 운전은 그만. 밴프에서 편하게 출발하는 모레인 호수 & 루이스 호수 투어 — 일출, 반일, 익스텐디드 코스 중 선택하세요.",
    ogTitle: "모레인 호수 & 루이스 호수 투어 (밴프 출발)",
    ogDescription: "일출·반일·익스텐디드 중 원하는 일정으로. 주차 스트레스 없이, 호수 앞에서 충분한 시간을.",
  },
  hero: {
    eyebrow: "— 밴프 · 호수 투어",
    h1Line1: "모레인 호수 & 루이스 호수,",
    h1Line2: "이제 편하게 다녀오세요",
    sub: "운전과 주차, 셔틀 예약은 저희에게 맡기세요. 일출, 반일, 익스텐디드 세 가지 코스 중 여행 페이스에 맞는 일정을 선택하시면 됩니다.",
    ctaBook: "호수 투어 예약하기 →",
    ctaCompare: "코스 비교해 보기",
    badges: ["밴프 픽업 가능", "모레인 호수 입장", "루이스 호수 포함", "스몰 그룹 스타일"],
  },
  quickReserve: {
    eyebrow: "— 빠른 예약",
    title: "원하는 호수 투어를 선택하세요",
    continueCta: "예약 진행 →",
    footnote: "* 온라인 결제 시스템은 곧 오픈 예정입니다.",
  },
  why: {
    eyebrow: "— 이 투어를 추천하는 이유",
    h2: "로키는 아름답습니다. 다만, 거기까지 가는 길이 생각보다 복잡합니다.",
    p1: "모레인 호수와 루이스 호수는 캐나다 로키에서 가장 사랑받는 두 호수이지만, 주차 공간 부족, 셔틀 예약, 새벽 교통 체증, 시즌별 통제 규정 등으로 직접 일정을 짜기가 쉽지 않습니다.",
    p2: "저희 호수 투어는 이런 번거로움을 모두 미리 정리해 두었습니다. 원하는 시간대를 고르고 픽업 장소에 와 주시면, 편안한 차량으로 호수까지 모셔다 드립니다. 호수에서는 본인의 페이스대로 천천히 둘러보세요.",
    features: [
      { t: "주차 걱정 NO", d: "한정된 주차 공간을 찾아 헤맬 필요 없이, 바로 호수까지 안내해 드립니다." },
      { t: "밴프 픽업", d: "밴프 Mount Royal Hotel 주차장에서 편리하게 출발합니다." },
      { t: "유연한 코스", d: "가볍게 둘러보는 반일, 일출 감상, 호수에서 더 오래 머무는 익스텐디드 중 선택." },
      { t: "호수에서 충분한 시간", d: "사진만 찍고 떠나는 투어가 아닌, 진짜 호수를 즐길 수 있는 시간을 드립니다." },
    ],
  },
  options: {
    eyebrow: "— 투어 옵션",
    h2: "오늘의 호수 일정을 선택하세요",
    labels: {
      price: "요금",
      pickup: "픽업 장소",
      moraine: "모레인 호수",
      louise: "루이스 호수",
      departures: "출발 시간",
      itinerary: "일정",
      gratuityNote: "권장 가이드 팁: 1인당 $15 CAD",
    },
  },
  compare: {
    eyebrow: "— 비교",
    h2: "한눈에 보는 코스 비교",
    headers: ["투어", "추천 대상", "요금", "픽업", "출발", "모레인 호수", "루이스 호수"],
    priceSuffix: " CAD + GST",
    mobileLabels: { price: "요금", pickup: "픽업", moraine: "모레인", louise: "루이스" },
  },
  reserve: {
    eyebrow: "— 예약",
    h2: "호수 투어 예약하기",
    intro:
      "원하시는 코스, 픽업 장소, 출발 시간, 인원을 선택해 주세요. 온라인 결제 시스템은 곧 연동될 예정입니다.",
    fields: {
      tour: "코스 선택",
      date: "날짜 선택",
      pickup: "픽업 장소",
      time: "출발 시간",
      adults: "성인",
      children: "아동",
    },
    summary: {
      eyebrow: "— 예약 내역",
      date: "날짜",
      pickup: "픽업",
      time: "출발 시간",
      guests: "인원",
      adultUnit: (n) => `성인 ${n}명`,
      childUnit: (n) => `아동 ${n}명`,
      tourUnit: (n) => `투어 × ${n}`,
      gst: "GST (5%)",
      total: "예상 합계",
      gratuityNote: "권장 가이드 팁(1인당 $15 CAD)은 합계에 포함되어 있지 않습니다.",
      continueCta: "예약 진행 →",
      footnote: "최종 가능 여부 및 결제는 정식 예약 시스템을 통해 안내 드립니다.",
    },
  },
  included: {
    eyebrow: "— 포함 사항",
    h2: "포함 / 불포함 사항",
    includedTitle: "포함 사항",
    includedItems: [
      "쾌적한 차량 이동",
      "선택 코스의 밴프 픽업",
      "일출 투어의 캔모어 픽업",
      "모레인 호수 입장",
      "루이스 호수 방문",
      "사전 계획된 호수 일정",
      "각 정차지에서의 자유 시간",
    ],
    notIncludedTitle: "불포함 사항",
    notIncludedItems: [
      "5% GST 세금",
      "식사 및 음료",
      "개인 경비",
      "카누 대여",
      "선택 사항인 자율 트레킹",
      "권장 가이드 팁 (1인당 $15 CAD)",
      { text: "Parks Canada Discovery Pass (각 게스트가 사전에 직접 구매 필요)", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
  },
  faq: {
    eyebrow: "— 여행 안내",
    h2: "출발 전 꼭 확인해 주세요",
    items: [
      {
        q: "Parks Canada Discovery Pass가 필요한가요?",
        a: "네, 필요합니다. 본 투어는 밴프 국립공원에 입장하며, 국립공원 입장료는 투어 요금에 포함되어 있지 않습니다. 각 게스트가 parkscanadashop.ca에서 본인 명의로 사전에 Discovery Pass를 구매하시고, 투어 당일 지참(인쇄본 또는 모바일)해 주세요.",
      },
      {
        q: "모레인 호수 입장이 항상 보장되나요?",
        a: "모레인 호수는 시즌별 도로 운영 규정, 국립공원 규제, 날씨, 현장 상황에 따라 입장 조건이 달라질 수 있습니다. 투어는 그 시점에 가능한 입장 일정에 최대한 맞추어 운영됩니다.",
      },
      { q: "밴프 픽업 장소는 어디인가요?", a: "밴프 픽업 장소는 Mount Royal Hotel 주차장입니다." },
      {
        q: "이 투어는 가이드 트레킹 투어인가요?",
        a: "아니요. 호수 방문과 자유 시간 위주의 관광 투어입니다. 호수에서 자유롭게 시간을 보내실 수 있으며, 산책이나 가벼운 트레킹은 모두 자율적으로 이루어집니다.",
      },
      {
        q: "자유 시간에 트레킹을 해도 되나요?",
        a: "네, 체력에 무리가 없으시다면 자유 시간 동안 인근의 자율 트레일을 둘러보실 수 있습니다. 코스와 잔여 시간에 따라 Fairview Lookout, Consolation Lakes, Lake Agnes Tea House 등이 추천됩니다. 단, 정해진 시간 안에 픽업 장소로 돌아오셔야 합니다.",
      },
      { q: "식사가 포함되어 있나요?", a: "포함되어 있지 않습니다. 간식, 물, 필요한 음식은 직접 챙겨 와 주세요." },
      {
        q: "무엇을 챙겨 가면 좋을까요?",
        a: "겹쳐 입을 수 있는 옷차림, 편한 신발, 물, 간식, 카메라, 자외선 차단제 등을 권장 드리며, 새벽 출발 코스는 따뜻한 외투를 꼭 준비해 주세요.",
      },
      {
        q: "일출 투어는 정말 많이 이른가요?",
        a: "네, 일출 전에 모레인 호수에 도착해서 텐 픽스 밸리 위로 떠오르는 빛을 보시려면 매우 이른 시간에 출발해야 합니다. 전날 충분한 휴식을 부탁드립니다.",
      },
      { q: "팁이 포함되어 있나요?", a: "포함되어 있지 않습니다. 권장 가이드 팁은 1인당 $15 CAD입니다." },
    ],
  },
  finalCta: {
    eyebrow: "— 준비되셨다면",
    h2: "스트레스 없이, 모레인 호수와 루이스 호수를 만나 보세요",
    p: "가볍게 다녀오는 반일, 새벽 일출 감상, 호수에서 더 오래 머무는 익스텐디드 코스 중 여행 페이스에 맞는 일정을 선택해 보세요.",
    ctaReserve: "호수 투어 예약하기 →",
    ctaCompare: "코스 비교해 보기",
  },
  sticky: {
    fromLabel: (p) => `1인당 $${p} CAD 부터`,
    cta: "호수 투어 예약 →",
  },
  modal: {
    eyebrow: "— 예약 시스템",
    title: "온라인 예약 시스템 곧 오픈 예정입니다",
    body: "Shooting Star Travel로 연락 주시면, 담당자가 가능 일정을 확인해 드리고 예약을 도와드립니다.",
    contactCta: "문의하고 예약하기 →",
    close: "닫기",
  },
  tours: {
    halfday: {
      key: "halfday",
      name: "로키 두 호수 반일 투어",
      tag: "편하게 둘러보기 좋아요",
      short:
        "밴프에서 출발해 모레인 호수와 루이스 호수를 한 번에 둘러보는 반일 투어. 하루 전체를 쓰지 않고도 두 호수를 편하게 만나 보고 싶은 분께 추천합니다.",
      price: 155,
      priceLabel: "$155 CAD + GST / 1인",
      pickup: "밴프 — Mount Royal Hotel 주차장",
      moraineTime: "2시간",
      louiseTime: "1시간",
      departures: [
        { day: "화요일 · 수요일", times: ["오전 8:00", "오후 2:00"] },
        { day: "월·목·금·토·일", times: ["오전 8:00", "오전 9:00", "오후 2:00", "오후 3:00"] },
      ],
      times: ["오전 8:00", "오전 9:00", "오후 2:00", "오후 3:00"],
      pickupOptions: ["밴프 — Mount Royal Hotel 주차장"],
      bestFor: "두 호수를 부담 없이",
      img: tourBanff,
      cta: "반일 투어 선택",
    },
    sunrise: {
      key: "sunrise",
      name: "모레인 호수 일출 투어",
      tag: "일출 사진에 최적",
      short:
        "텐 픽스 밸리 위로 떠오르는 첫 빛을 모레인 호수에서 만나는 클래식 새벽 코스. 이후 루이스 호수에서 여유로운 자유 시간까지 즐기실 수 있습니다.",
      price: 225,
      priceLabel: "$225 CAD + GST / 1인",
      pickup: "캔모어 오전 2:45 · 밴프 오전 3:15",
      moraineTime: "일출 — 오전 8:00",
      louiseTime: "3시간",
      departures: [{ day: "매주 목요일", times: ["캔모어 오전 2:45", "밴프 오전 3:15"] }],
      times: ["캔모어 오전 2:45", "밴프 오전 3:15"],
      pickupOptions: ["캔모어 — 일출 투어 전용", "밴프 — Mount Royal Hotel 주차장"],
      highlights: "모레인 호수에 일찍 도착해 텐 픽스 밸리 위 일출을 좋은 자리에서 감상합니다.",
      itinerary: [
        "모레인 호수 도착 후 일출을 기다립니다.",
        "오전 8:00, 모레인 호수에서 출발합니다.",
        "루이스 호수로 이동, 3시간 자유 시간을 보냅니다.",
        "호숫가 산책, 또는 체력이 허락된다면 Fairview Lookout 같은 짧은 자율 트레일도 가능합니다.",
        "오전 11:00, 루이스 호수에서 출발해 밴프로 돌아옵니다.",
      ],
      bestFor: "일출 사진을 원하신다면",
      img: heroBanff,
      cta: "일출 투어 선택",
    },
    extended: {
      key: "extended",
      name: "두 호수 익스텐디드 투어",
      tag: "호수에서 오래 머물기",
      short:
        "모레인 호수와 루이스 호수 모두에서 더 긴 자유 시간을 드리는 코스. 천천히 걷고, 사진을 찍고, 호수의 분위기를 느끼고 싶은 분께 잘 맞습니다.",
      price: 200,
      priceLabel: "$200 CAD + GST / 1인",
      pickup: "밴프 — Mount Royal Hotel 주차장",
      moraineTime: "3.5시간",
      louiseTime: "4시간",
      departures: [{ day: "매주 화요일", times: ["오전 6:30"] }],
      times: ["밴프 오전 6:30"],
      pickupOptions: ["밴프 — Mount Royal Hotel 주차장"],
      highlights: "혼잡한 시간대를 피해 두 호수에서 충분한 시간을 보낼 수 있습니다.",
      itinerary: [
        "모레인 호수에서 3.5시간 머문 뒤 오전 11:00 루이스 호수로 출발합니다.",
        "모레인 자유 시간: 호숫가 감상, 사진, 카누 대여, 또는 체력이 허락된다면 Consolation Lakes 같은 자율 트레일도 가능합니다.",
        "루이스 호수에서 4시간 머뭅니다.",
        "루이스 자유 시간: 호숫가 산책, 휴식, 또는 체력이 허락된다면 Lake Agnes Tea House 같은 자율 트레일도 가능합니다.",
      ],
      bestFor: "여유롭게 깊이 둘러보기",
      img: tourRockies,
      cta: "익스텐디드 선택",
    },
  },
};
