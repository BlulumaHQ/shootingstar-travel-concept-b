/* ============================================================
 * Shared "Trip Information" content for the five Rocky Mountain
 * Lake tour detail pages.
 *
 * Rendered ONLY for these slugs:
 *   - rockies-signature-columbia-icefield
 *   - moraine-lake-lake-louise-half-day
 *   - 5-lakes-tour
 *   - jet-johnston-emerald-takakkaw
 *   - moraine-lake-sunrise-tour
 *
 * Written directly in the front-end (NOT from Supabase / Rezdy).
 * ============================================================ */
import type { Locale } from "@/i18n/locale";

export const LAKE_TOUR_SLUGS = [
  "rockies-signature-columbia-icefield",
  "moraine-lake-lake-louise-half-day",
  "5-lakes-tour",
  "jet-johnston-emerald-takakkaw",
  "moraine-lake-sunrise-tour",
] as const;

export type LakeTourSlug = (typeof LAKE_TOUR_SLUGS)[number];

export function isLakeTourSlug(slug: string): slug is LakeTourSlug {
  return (LAKE_TOUR_SLUGS as readonly string[]).includes(slug);
}

export const DISCOVERY_PASS_URL = "https://parkscanadashop.ca/pages/discovery-pass";

export type TripInfoListItem = string | { text: string; linkLabel: string; href: string };

export type LakeTourTripInfoPack = {
  sectionEyebrow: string;
  sectionTitle: string;
  includedTitle: string;
  notIncludedTitle: string;
  included: string[];
  notIncluded: TripInfoListItem[];
  notesTitle: string;
  notes: string[];
  sunriseExtraNote: string;
};

export const LAKE_TOUR_TRIP_INFO: Record<Locale, LakeTourTripInfoPack> = {
  en: {
    sectionEyebrow: "trip information",
    sectionTitle: "Trip Information",
    includedTitle: "What's Included",
    notIncludedTitle: "Not Included",
    included: [
      "Comfortable transportation",
      "Banff pickup (selected tours)",
      "Canmore pickup (sunrise tour)",
      "Lake-area sightseeing",
      "Planned lake-access schedule",
      "Free time at selected stops",
    ],
    notIncluded: [
      "5% GST",
      "Meals & drinks",
      "Personal expenses",
      "Canoe rental",
      "Optional self-guided hikes",
      "Suggested guide gratuity $15 CAD / person",
      {
        text: "Parks Canada Discovery Pass — each guest must purchase their own in advance at",
        linkLabel: "parkscanadashop.ca",
        href: DISCOVERY_PASS_URL,
      },
    ],
    notesTitle: "Important Travel Notes",
    notes: [
      "Parks Canada Discovery Pass: Banff National Park entry is required and NOT included; each guest buys their own in advance at parkscanadashop.ca and brings it (printed or digital).",
      "Moraine Lake access depends on seasonal road rules, park regulations, weather and operations; we follow the available access schedule as closely as possible.",
      "Banff pickup point: Mount Royal Hotel parking lot.",
      "This is a lake-access & sightseeing tour with free time, not a guided hike; any walking is self-guided and optional — please return to the pickup point on time.",
      "Bring layered clothing, comfortable shoes, water, snacks, camera, sun protection, and a warm jacket for early departures.",
      "Meals and drinks are not included — please bring your own.",
      "Suggested guide gratuity: $15 CAD / person.",
      "Parks Canada Discovery Pass — each guest must purchase their own in advance at parkscanadashop.ca. (National Parks offer free admission until September 7, 2026.)",
    ],
    sunriseExtraNote:
      "This sunrise tour departs pre-dawn to reach Moraine Lake before sunrise, for the best morning light over the Valley of the Ten Peaks.",
  },
  zh: {
    sectionEyebrow: "行程資訊",
    sectionTitle: "行程資訊",
    includedTitle: "費用包含",
    notIncludedTitle: "費用不含",
    included: [
      "舒適交通車輛",
      "班夫接送（指定行程）",
      "坎莫爾接送（日出團）",
      "湖區觀光",
      "規劃好的湖區進場時間",
      "於指定景點享有自由活動時間",
    ],
    notIncluded: [
      "5% GST 加拿大消費稅",
      "餐食與飲料",
      "個人消費",
      "獨木舟租借",
      "自費自助健行",
      "建議導遊小費每人 $15 CAD",
      {
        text: "加拿大國家公園 Discovery Pass — 每位旅客需於出發前自行購買，請至",
        linkLabel: "parkscanadashop.ca",
        href: DISCOVERY_PASS_URL,
      },
    ],
    notesTitle: "重要旅行須知",
    notes: [
      "加拿大國家公園 Discovery Pass：進入班夫國家公園必備，本行程不含。請每位旅客於出發前自行於 parkscanadashop.ca 購買，並於當日攜帶（紙本或電子皆可）。",
      "夢蓮湖（Moraine Lake）進場受季節性道路規定、公園管理、天氣與營運狀況影響；我們會依當日可進場時段盡量安排。",
      "班夫上車地點：Mount Royal Hotel 停車場。",
      "本行程為湖區進場 & 觀光行程並含自由時間，並非導覽健行；任何步行皆為自助、自由選擇，請務必準時回到上車地點。",
      "建議洋蔥式穿搭，攜帶舒適鞋款、飲水、點心、相機、防曬，以及一件保暖外套（清晨出發團）。",
      "餐食與飲料不含，請自行準備。",
      "建議導遊小費：每人 $15 CAD。",
      "加拿大國家公園 Discovery Pass — 每位旅客需於出發前自行至 parkscanadashop.ca 購買。（國家公園於 2026 年 9 月 7 日前免費入場。）",
    ],
    sunriseExtraNote:
      "本日出團於天亮前出發，搶在日出前抵達夢蓮湖，享受十峰山谷上最美的晨光時刻。",
  },
  ko: {
    sectionEyebrow: "여행 정보",
    sectionTitle: "여행 정보",
    includedTitle: "포함 사항",
    notIncludedTitle: "불포함 사항",
    included: [
      "편안한 교통편",
      "밴프 픽업 (해당 투어)",
      "캔모어 픽업 (일출 투어)",
      "호수 지역 관광",
      "계획된 호수 진입 일정",
      "지정 정차지에서의 자유 시간",
    ],
    notIncluded: [
      "5% GST 캐나다 소비세",
      "식사 및 음료",
      "개인 비용",
      "카누 대여",
      "선택형 자율 하이킹",
      "권장 가이드 팁 1인당 $15 CAD",
      {
        text: "캐나다 국립공원 Discovery Pass — 각 게스트가 사전에 직접 구매해야 합니다.",
        linkLabel: "parkscanadashop.ca",
        href: DISCOVERY_PASS_URL,
      },
    ],
    notesTitle: "여행 시 꼭 확인하세요",
    notes: [
      "Parks Canada Discovery Pass: 밴프 국립공원 입장에 반드시 필요하며 투어 요금에 포함되지 않습니다. 각 게스트가 사전에 parkscanadashop.ca에서 직접 구매하여 당일 지참(인쇄 또는 모바일)해 주세요.",
      "모레인 호수 진입은 시즌별 도로 규정, 공원 관리, 날씨 및 운영 상황에 따라 달라질 수 있으며, 가능한 진입 일정에 맞춰 운영합니다.",
      "밴프 픽업 장소: Mount Royal Hotel 주차장.",
      "본 투어는 자유 시간이 포함된 호수 진입·관광 투어이며 가이드 하이킹이 아닙니다. 모든 도보 이동은 자율 선택이므로, 픽업 장소로 정시 복귀해 주세요.",
      "겹쳐 입을 수 있는 옷, 편안한 신발, 물, 간식, 카메라, 자외선 차단, 새벽 출발 시 따뜻한 외투를 준비해 주세요.",
      "식사 및 음료는 포함되지 않으니 직접 준비해 주세요.",
      "권장 가이드 팁: 1인당 $15 CAD.",
      "캐나다 국립공원 Discovery Pass — 각 게스트가 출발 전 parkscanadashop.ca에서 직접 구매해야 합니다. (2026년 9월 7일까지 국립공원 무료 입장.)",
    ],
    sunriseExtraNote:
      "본 일출 투어는 동트기 전에 출발하여 모레인 호수에 일출 전 도착, 10봉 계곡 위로 떠오르는 최고의 아침 빛을 만나도록 구성되어 있습니다.",
  },
};
