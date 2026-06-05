import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useLocale, withLocale, type Locale } from "@/i18n/locale";
import { seoHead } from "@/i18n/seo";
import hero from "@/assets/hero-mountains.jpg";
import journal from "@/assets/about-collage.png";
import tourBanff from "@/assets/tour-banff.webp";
import destWhistler from "@/assets/dest-whistler.webp";
import destYukon from "@/assets/dest-yukon.webp";
import tourVancouver from "@/assets/tour-vancouver.webp";
import tourVictoria from "@/assets/tour-victoria.webp";
import tourAurora from "@/assets/tour-aurora.webp";
import tourGroup from "@/assets/tour-group.webp";
import bgLake from "@/assets/bg-lake-louise.webp";
import logoSeal from "@/assets/logo-seal.png";
import { Heart as HeartFill } from "lucide-react";
import { useTours } from "@/data/useTours";
import { useReviews } from "@/data/useReviews";
import { ReviewCard } from "@/components/site/ReviewCard";
import {
  CameraMapIcon, GroupRoadIcon, MountainFlagIcon, ShieldHeartIcon, CupSuitcaseIcon,
} from "@/components/site/DoodleIcons";
import { StarMark, MountainMark, PinMark, CompassMark, BusMark, JourneyPath, DottedLine } from "@/components/site/BrandMarks";
import { PlaneJourney } from "@/components/site/PlaneJourney";
import { HeroDarkSlideshow, type HeroDarkSlide } from "@/components/site/HeroDarkSlideshow";
import { CredentialsSection } from "@/components/site/CredentialsSection";
import heroBgMoraine from "@/assets/hero-bg-moraine.webp";
import heroIcefield from "@/assets/tour-icefield.webp";
import lakeHero from "@/assets/lake-tours/lake-009.webp";


export const Route = createFileRoute("/")({
  head: () => ({
    ...seoHead({
      path: "/",
      locale: "en",
      title: "Shootingstar Travel — Boutique Canadian Rockies, Banff & Western US Tours",
      description: "Boutique small-group tours across Canada and the Western United States — the Canadian Rockies, Banff, Vancouver, Victoria, Seattle, Las Vegas and beyond — with English, Mandarin and Korean-friendly guides. Slow travel, considered detail.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Shootingstar Travel",
          url: "https://shootingstar-travel-concept-b.lovable.app/",
          areaServed: ["Canada", "British Columbia", "Alberta", "Yukon", "United States", "Washington", "Oregon", "California", "Nevada"],
          knowsLanguage: ["en", "zh", "ko"],
          sameAs: [],
          address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" },
        }),
      },
    ],
  }),
  component: HomePage,
});

type Pack = {
  slogan: string;
  heroEyebrow: string;
  heroL1: string; heroL2: string; heroL3: string;
  heroBody: string;
  ctaExplore: string; ctaStories: string;
  featuresEyebrow: string;
  feat: { t: string; d: string }[];
  featuredEyebrow: string; featuredHeading: string; viewAll: string; viewAllMobile: string; viewTour: string;
  storiesEyebrow: string; storiesHeading: string; storiesBody: string; moreStories: string; moreStoriesMobile: string;
  aboutEyebrow: string; aboutHeading: string; aboutP1: string; aboutP2: string; meetUs: string;
  beliefsEyebrow: string; beliefsHeading: string; beliefsBody: string;
  beliefs: { num: string; title: string; desc: string }[];
  faqEyebrow: string; faqHeading: string; viewAllFaqs: string;
  faqs: { q: string; a: string }[];
  ctaSectionEyebrow: string; ctaTitleA: string; ctaTitleB: string; ctaBody: string;
  ctaExploreAll: string; ctaContact: string;
};

const PACKS: Record<Locale, Pack> = {
  en: {
    slogan: "Travel is more than movement — it is a journey that shines like a shooting star.",
    heroEyebrow: "Spring Journal · 2026",
    heroL1: "Travel is not just",
    heroL2: "arriving somewhere —",
    heroL3: "it is the moment light finds you.",
    heroBody: "Small groups. Slow days. Carefully written. Shootingstar Travel takes you across Canada and the Western United States at the lightest pace, gathering every glimmer between mountain and sea.",
    ctaExplore: "Explore Tours",
    ctaStories: "Travellers' Stories →",
    featuresEyebrow: "Why Travel With Us",
    feat: [
      { t: "Curated Itineraries", d: "Classic routes, carefully drawn —\ncollecting every corner worth keeping." },
      { t: "Small Groups", d: "Smaller groups, more space —\nfor a deeper sense of place." },
      { t: "Local Expertise", d: "Local guides who know the land —\nso every step feels considered." },
      { t: "Reliable Care", d: "Comprehensive travel safeguards —\ntravel with peace of mind." },
      { t: "Thoughtful Service", d: "From planning to the road home —\nwe stay close from start to finish." },
    ],
    featuredEyebrow: "Featured Journeys",
    featuredHeading: "Featured Journeys",
    viewAll: "View all",
    viewAllMobile: "Browse all tours →",
    viewTour: "View →",
    storiesEyebrow: "Travellers' Words",
    storiesHeading: "From our travellers",
    storiesBody: "Real travellers, real memories — written in their own words.",
    moreStories: "More stories →",
    moreStoriesMobile: "More stories →",
    aboutEyebrow: "About the Studio",
    aboutHeading: "About Shooting Star Travel",
    aboutP1: "Every itinerary is shaped with care so that travelling becomes more than reaching a destination — it becomes a memory worth keeping.",
    aboutP2: "We focus on small-group journeys across Canada and the Western United States, designing safe, comfortable, warm-hearted itineraries for travellers from many languages and backgrounds. Small groups, attentive planning, room to breathe.",
    meetUs: "Meet the team →",
    beliefsEyebrow: "What We Believe",
    beliefsHeading: "Our Travel Philosophy",
    beliefsBody: "Five things we care about — in every departure.",
    beliefs: [
      { num: "01", title: "Small Groups", desc: "8–14 people per group — unhurried, uncrowded, every traveller is looked after." },
      { num: "02", title: "Thoughtful Detail", desc: "From airport pickups to corner cafés, every touchpoint is carefully chosen." },
      { num: "03", title: "Trilingual Guides", desc: "Conversations and storytelling in the traveller's mother tongue." },
      { num: "04", title: "Safety & Clear Communication", desc: "Full travel insurance and a 24-hour hotline — so family can rest easy." },
      { num: "05", title: "Journeys with Stories", desc: "We believe travel is not about arriving, but about memories worth keeping." },
    ],
    faqEyebrow: "Frequently Asked",
    faqHeading: "Frequently asked",
    viewAllFaqs: "View all FAQs →",
    faqs: [
      { q: "How do I book?", a: "Use the form on our Contact page, or reach us on WhatsApp, KakaoTalk or WeChat. A team member will reply within 24 hours." },
      { q: "Are guides available in my language?", a: "Yes — we host departures in English, Chinese and Korean." },
      { q: "When is full payment due?", a: "Full payment is generally required at least 30 days before departure. The booking is confirmed once we receive payment." },
      { q: "What is the cancellation & refund policy?", a: "30+ days before departure: 50% refund. 14–29 days before: 30% refund. Within 13 days (including departure day): no refund. Specific tour pages may set their own terms." },
      { q: "Is there a credit card refund fee?", a: "If you paid by credit card and request a refund, a 4% credit card processing fee is deducted from the refund amount." },
      { q: "How can I pay?", a: "We accept credit card and other designated payment methods. All prices are in Canadian Dollars (CAD)." },
    ],
    ctaSectionEyebrow: "And the journey begins",
    ctaTitleA: "Your next journey,",
    ctaTitleB: "begins here.",
    ctaBody: "Tell us where you'd like to go, and we'll help you find the journey that suits you best.",
    ctaExploreAll: "Browse all tours →",
    ctaContact: "Contact us",
  },
  zh: {
    slogan: "旅行，不只是移動，而是一場如流星般閃耀的旅程。",
    heroEyebrow: "Spring Journal · 2026",
    heroL1: "旅行不只是",
    heroL2: "抵達一個地方,",
    heroL3: "而是被光照亮的時刻",
    heroBody: "小團・慢走・用心。Shootingstar Travel 帶你以最輕盈的步調,走過加拿大與美國西部,收集山與海之間的每一道光。",
    ctaExplore: "探索行程",
    ctaStories: "Travellers' Stories →",
    featuresEyebrow: "為什麼選擇我們",
    feat: [
      { t: "精選行程", d: "精心規劃經典路線\n探索每一個值得收藏的角落" },
      { t: "小團出發", d: "小團更自在\n深度體驗在地風情" },
      { t: "專業旅遊", d: "在地專業嚮導帶路\n讓旅程更安心有趣" },
      { t: "安心保障", d: "完善旅遊保障制度\n讓你玩得安心無憂" },
      { t: "貼心服務", d: "從行前到旅途中\n全程貼心為你服務" },
    ],
    featuredEyebrow: "Featured Journeys",
    featuredHeading: "精選行程",
    viewAll: "查看全部",
    viewAllMobile: "探索所有行程 →",
    viewTour: "查看 →",
    storiesEyebrow: "Travellers' Words",
    storiesHeading: "旅客分享",
    storiesBody: "真實旅人寫下的小小回憶。",
    moreStories: "更多分享 →",
    moreStoriesMobile: "更多分享 →",
    aboutEyebrow: "About the Studio",
    aboutHeading: "關於 Shooting Star Travel",
    aboutP1: "用心規劃每一段旅程,讓旅行不只是到達目的地,而是留下值得收藏的回憶。",
    aboutP2: "我們專注於加拿大與美國西部的小團旅遊體驗,為不同語言與背景的旅客規劃安心、舒適、有溫度的行程。小團出發、用心安排,讓每位旅人都能放心、自在地走進每一段風景。",
    meetUs: "認識我們 →",
    beliefsEyebrow: "我們的旅行哲學",
    beliefsHeading: "五個我們在乎的事",
    beliefsBody: "貫穿每一次出發。",
    beliefs: [
      { num: "01", title: "小團更舒適", desc: "每團 8–14 人 — 不趕、不擠,每位旅人都被照顧到。" },
      { num: "02", title: "細節都用心", desc: "從機場接送到街角咖啡,每個接觸點都精挑細選。" },
      { num: "03", title: "中英韓三語導遊", desc: "用旅人母語對話與述說的旅程。" },
      { num: "04", title: "安全與清晰溝通", desc: "完整旅遊保險與 24 小時聯絡專線,讓家人安心。" },
      { num: "05", title: "有故事的旅程", desc: "我們相信旅行不在抵達,而在值得收藏的回憶。" },
    ],
    faqEyebrow: "Frequently Asked",
    faqHeading: "常見問題",
    viewAllFaqs: "查看所有常見問題 →",
    faqs: [
      { q: "如何報名？", a: "您可以透過聯絡我們頁面填寫表單，或直接以 WhatsApp、KakaoTalk、WeChat 與我們聯繫，將會有專人於 24 小時內回覆。" },
      { q: "是否提供中文導遊？", a: "是的，我們提供中文、韓文與英文導遊服務。" },
      { q: "何時須完成付款？", a: "旅遊費用原則上須於出發日前 30 天完成全額付款，款項入帳後旅遊契約正式成立。" },
      { q: "取消與退款規定為何？", a: "出發前 30 天（含）以上可退 50%；14–29 天可退 30%；13 天內（含出發當日）恕不退款。各行程頁面若另有規定則以該頁公告為準。" },
      { q: "信用卡退款是否收手續費？", a: "以信用卡付款後申請退款者，將扣除實際產生之信用卡手續費 4% 後辦理退款。" },
      { q: "如何付款？", a: "本公司接受信用卡及其他指定付款方式，所有價格以加拿大幣（CAD）計價。" },
    ],
    ctaSectionEyebrow: "And the journey begins",
    ctaTitleA: "下一趟旅程,",
    ctaTitleB: "從這裡開始。",
    ctaBody: "告訴我們你想去的地方,我們會協助你找到最適合的行程。",
    ctaExploreAll: "探索所有行程 →",
    ctaContact: "聯絡我們",
  },
  ko: {
    slogan: "여행은 단지 이동이 아니라, 유성처럼 빛나는 여정입니다.",
    heroEyebrow: "Spring Journal · 2026",
    heroL1: "여행은 단지",
    heroL2: "어딘가에 도착하는 것이 아니라 —",
    heroL3: "빛이 당신을 비추는 순간입니다.",
    heroBody: "소그룹 · 천천히 · 정성껏. Shootingstar Travel과 함께 가벼운 발걸음으로 캐나다와 미국 서부의 산과 바다 사이의 모든 빛을 모으세요.",
    ctaExplore: "투어 둘러보기",
    ctaStories: "여행자 이야기 →",
    featuresEyebrow: "함께 떠나야 할 이유",
    feat: [
      { t: "엄선된 여정", d: "정성껏 그린 클래식 코스 —\n간직할 가치 있는 모든 순간을." },
      { t: "소그룹 출발", d: "더 작은 그룹, 더 깊은\n현지 경험." },
      { t: "현지 전문성", d: "땅을 잘 아는 현지 가이드와\n함께하는 모든 발걸음." },
      { t: "안심 보장", d: "포괄적인 여행 보호 —\n안심하고 떠나세요." },
      { t: "세심한 서비스", d: "준비부터 귀국까지\n처음부터 끝까지 함께합니다." },
    ],
    featuredEyebrow: "Featured Journeys",
    featuredHeading: "추천 여정",
    viewAll: "전체 보기",
    viewAllMobile: "모든 투어 보기 →",
    viewTour: "보기 →",
    storiesEyebrow: "Travellers' Words",
    storiesHeading: "여행자의 이야기",
    storiesBody: "여행자들이 직접 남긴 진솔한 기억들.",
    moreStories: "더 많은 이야기 →",
    moreStoriesMobile: "더 많은 이야기 →",
    aboutEyebrow: "About the Studio",
    aboutHeading: "Shooting Star Travel 소개",
    aboutP1: "모든 여정은 도착 그 이상의 의미가 되도록 정성껏 설계됩니다 — 간직할 가치가 있는 추억으로.",
    aboutP2: "캐나다와 미국 서부 전역의 소그룹 여행에 집중하여, 다양한 언어와 배경의 여행자에게 편안하고 따뜻한 여정을 디자인합니다. 소그룹 출발, 세심한 기획, 숨 쉴 여유가 있는 일정.",
    meetUs: "팀 소개 →",
    beliefsEyebrow: "우리의 여행 철학",
    beliefsHeading: "우리가 아끼는 다섯 가지",
    beliefsBody: "모든 출발에 담겨 있습니다.",
    beliefs: [
      { num: "01", title: "소그룹의 편안함", desc: "그룹당 8–14명 — 서두르지 않고, 붐비지 않게, 모든 여행자가 돌봄받는 여정." },
      { num: "02", title: "디테일까지 정성껏", desc: "공항 픽업부터 골목 카페까지, 모든 접점은 정성껏 고릅니다." },
      { num: "03", title: "한·중·영 3개국어 가이드", desc: "여행자의 모국어로 대화하고 이야기를 전하는 여정." },
      { num: "04", title: "안전과 명확한 소통", desc: "포괄적인 여행 보험과 24시간 연락 라인 — 가족도 안심할 수 있습니다." },
      { num: "05", title: "이야기가 있는 여정", desc: "우리는 여행이 도착이 아니라, 간직할 가치가 있는 추억이라고 믿습니다." },
    ],
    faqEyebrow: "Frequently Asked",
    faqHeading: "자주 묻는 질문",
    viewAllFaqs: "모든 FAQ 보기 →",
    faqs: [
      { q: "어떻게 예약하나요?", a: "문의 페이지의 양식을 작성하시거나 WhatsApp, 카카오톡, WeChat으로 연락 주세요. 24시간 이내에 답변드립니다." },
      { q: "한국어 가이드가 있나요?", a: "네 — 영어, 중국어, 한국어 출발이 가능합니다." },
      { q: "전액 결제는 언제까지 해야 하나요?", a: "원칙적으로 출발일 30일 전까지 전액 결제가 완료되어야 하며, 결제 확인 후 여행 계약이 정식으로 성립됩니다." },
      { q: "취소 및 환불 규정은 어떻게 되나요?", a: "출발 30일 이전: 50% 환불, 14–29일 전: 30% 환불, 13일 이내(출발 당일 포함): 환불 불가. 각 투어 페이지에 별도 규정이 있는 경우 해당 내용이 우선합니다." },
      { q: "신용카드 환불 수수료가 있나요?", a: "신용카드로 결제 후 환불을 요청하시는 경우, 실제 발생한 신용카드 수수료 4%를 환불 금액에서 공제합니다." },
      { q: "결제 방법은?", a: "신용카드 및 기타 지정 결제 수단을 받으며, 모든 가격은 캐나다 달러(CAD) 기준입니다." },
    ],
    ctaSectionEyebrow: "And the journey begins",
    ctaTitleA: "당신의 다음 여정은,",
    ctaTitleB: "여기에서 시작됩니다.",
    ctaBody: "원하시는 목적지를 알려주세요. 가장 잘 맞는 여정을 찾아드립니다.",
    ctaExploreAll: "모든 투어 보기 →",
    ctaContact: "문의하기",
  },
};

const FEATURE_ICONS = [CameraMapIcon, GroupRoadIcon, MountainFlagIcon, ShieldHeartIcon, CupSuitcaseIcon];

const DEST_IMAGES = [tourBanff, tourVancouver, destWhistler, tourVictoria, tourAurora, destYukon];

type HeroSlideCopy = {
  eyebrow: string;
  h1Line1: string;
  h1Line2?: string;
  sub: string;
  primary: string;
  secondary?: string;
  badges?: string[];
};
type HeroCopy = {
  intro: HeroSlideCopy;
  lakes: HeroSlideCopy;
  icefields: HeroSlideCopy;
};

const HERO_COPY: Record<Locale, HeroCopy> = {
  en: {
    intro: {
      eyebrow: "— Shooting Star Travel",
      h1Line1: "Travel that shines",
      h1Line2: "like a shooting star.",
      sub: "Boutique small-group journeys across the Canadian Rockies and the Western United States — paced for slow mornings, mountain light, and stories worth keeping.",
      primary: "Explore Tours",
      secondary: "Our Story",
      badges: ["Small Groups", "Korean Friendly", "Vancouver Departure"],
    },
    lakes: {
      eyebrow: "— Featured · Canadian Rockies",
      h1Line1: "Rocky Mountain",
      h1Line2: "Lake Tours",
      sub: "Moraine Lake, Lake Louise, Emerald Lake — turquoise water and alpine air on a single, considered day across the Bow Valley.",
      primary: "View Lake Tours",
      secondary: "See Itinerary",
      badges: ["1 Day · Banff", "Korean Friendly", "Hotel Pickup"],
    },
    icefields: {
      eyebrow: "— New · Banff ⇄ Jasper",
      h1Line1: "Icefields Parkway",
      h1Line2: "Shuttle & Sightseeing",
      sub: "Flexible weekday-based shuttles between Banff, Jasper, the Columbia Icefield, and Maligne Lake — with optional attractions and clear pickup points.",
      primary: "View Shuttle Tours",
      secondary: "Compare Routes",
      badges: ["Banff ⇄ Jasper", "Columbia Icefield", "Maligne Lake"],
    },
  },
  zh: {
    intro: {
      eyebrow: "— Shooting Star Travel",
      h1Line1: "旅行,",
      h1Line2: "如流星般閃耀。",
      sub: "加拿大洛磯山脈與美國西部的精品小團旅行 —— 緩慢的清晨、山林的光,以及值得收藏的故事。",
      primary: "探索行程",
      secondary: "關於我們",
      badges: ["小團出發", "韓語友善", "溫哥華出發"],
    },
    lakes: {
      eyebrow: "— 精選 · 加拿大洛磯",
      h1Line1: "洛磯山脈",
      h1Line2: "湖泊一日遊",
      sub: "夢蓮湖、露易絲湖、翡翠湖 —— 一天之內,走過 Bow Valley 的綠松石湖水與高山空氣。",
      primary: "查看湖泊行程",
      secondary: "詳細安排",
      badges: ["一日 · 班夫", "韓語友善", "飯店接送"],
    },
    icefields: {
      eyebrow: "— 全新 · 班夫 ⇄ 賈斯珀",
      h1Line1: "冰原大道",
      h1Line2: "接駁與觀光行程",
      sub: "班夫、賈斯珀、哥倫比亞冰原與瑪琳湖之間的彈性接駁,依星期安排路線,可加購景點門票,接送地點清楚。",
      primary: "查看接駁行程",
      secondary: "比較路線",
      badges: ["班夫 ⇄ 賈斯珀", "哥倫比亞冰原", "瑪琳湖"],
    },
  },
  ko: {
    intro: {
      eyebrow: "— Shooting Star Travel",
      h1Line1: "별똥별처럼",
      h1Line2: "빛나는 여행.",
      sub: "캐나디안 록키와 미국 서부를 가로지르는 부티크 소그룹 여정 — 느린 아침, 산의 빛, 그리고 간직할 만한 이야기.",
      primary: "투어 둘러보기",
      secondary: "브랜드 이야기",
      badges: ["소그룹", "한국어 안내", "밴쿠버 출발"],
    },
    lakes: {
      eyebrow: "— 추천 · 캐나디안 록키",
      h1Line1: "로키 마운틴",
      h1Line2: "레이크 투어",
      sub: "모레인 호수, 루이스 호수, 에메랄드 호수 — 보우 밸리의 터쿠아즈 빛 호수와 알파인의 공기를 하루에.",
      primary: "레이크 투어 보기",
      secondary: "일정 보기",
      badges: ["1일 · 밴프", "한국어 안내", "호텔 픽업"],
    },
    icefields: {
      eyebrow: "— 신상품 · 밴프 ⇄ 재스퍼",
      h1Line1: "아이스필드 파크웨이",
      h1Line2: "셔틀 & 사이트싱",
      sub: "밴프, 재스퍼, 컬럼비아 아이스필드, 멀린 호수 사이의 요일별 셔틀 — 선택형 어트랙션 티켓과 명확한 픽업 지점.",
      primary: "셔틀 투어 보기",
      secondary: "노선 비교",
      badges: ["밴프 ⇄ 재스퍼", "컬럼비아 아이스필드", "멀린 호수"],
    },
  },
};

function buildHeroSlides(locale: Locale, link: (path: string) => string): HeroDarkSlide[] {
  const c = HERO_COPY[locale];
  return [
    {
      id: "intro",
      image: heroBgMoraine,
      eyebrow: c.intro.eyebrow,
      h1Line1: c.intro.h1Line1,
      h1Line2: c.intro.h1Line2,
      sub: c.intro.sub,
      badges: c.intro.badges,
      primary: { label: c.intro.primary, to: link("/tours") },
      secondary: c.intro.secondary ? { label: c.intro.secondary, to: link("/about") } : undefined,
      durationMs: 2000,
    },
    {
      id: "lakes",
      image: lakeHero,
      eyebrow: c.lakes.eyebrow,
      h1Line1: c.lakes.h1Line1,
      h1Line2: c.lakes.h1Line2,
      sub: c.lakes.sub,
      badges: c.lakes.badges,
      primary: { label: c.lakes.primary, to: link("/rocky-mountain-lake-tours") },
      secondary: c.lakes.secondary ? { label: c.lakes.secondary, to: link("/rocky-mountain-lake-tours") } : undefined,
      durationMs: 5000,
    },
    {
      id: "icefields",
      image: heroIcefield,
      eyebrow: c.icefields.eyebrow,
      h1Line1: c.icefields.h1Line1,
      h1Line2: c.icefields.h1Line2,
      sub: c.icefields.sub,
      badges: c.icefields.badges,
      primary: { label: c.icefields.primary, to: link("/icefields-parkway-jasper-banff-shuttle-tours") },
      secondary: c.icefields.secondary ? { label: c.icefields.secondary, to: link("/icefields-parkway-jasper-banff-shuttle-tours") } : undefined,
      durationMs: 5000,
    },
  ];
}



export function HomePage() {
  const locale = useLocale();
  const p = PACKS[locale];
  const tours = useTours();
  const reviews = useReviews();
  const featured = useMemo(() => [...tours].sort(() => Math.random() - 0.5).slice(0, 6), [tours]);
  const link = (path: string) => withLocale(path, locale);

  return (
    <SiteLayout>
      {/* HERO SLIDESHOW */}
      <HeroSlideshow slides={buildHeroSlides(locale, link)} backgroundImage={heroBgMoraine} />

      {/* TRUST / FEATURE ICONS — quieter, tighter rhythm */}
      <section className="relative bg-[oklch(0.92_0.018_82)] py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-14">
            {p.feat.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={f.t} className="flex flex-col items-start">
                  <span className="text-primary"><Icon size={48} /></span>
                  <p className="feat-title mt-5 font-serif text-[17px] text-ink font-semibold">{f.t}</p>
                  <p className="feat-tagline mt-3 text-[13px] text-ink/75 leading-[1.9] whitespace-pre-line">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* FEATURED TOURS — breathing space */}
      <section className="relative bg-cream pt-28 md:pt-36 pb-28 md:pb-36">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <BusMark size={18} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.featuredEyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[44px] text-ink tracking-[-0.015em] font-semibold mt-5">{p.featuredHeading}</h2>
            </div>
            <Link to={link("/tours") as never} className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-primary text-[12px] tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground transition">
              {p.viewAll} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featured.map((t) => (
              <Link
                to={link(t.href ?? `/tours/${t.slug}`) as never}
                key={t.slug}
                className="group relative bg-card rounded-[6px] p-3 pb-6 shadow-[0_2px_6px_-2px_rgba(70,80,75,0.05),0_36px_64px_-32px_rgba(70,80,75,0.32)] hover:-translate-y-1.5 hover:shadow-[0_4px_10px_-2px_rgba(70,80,75,0.08),0_48px_80px_-32px_rgba(70,80,75,0.4)] transition-all duration-500 block"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-[4px]">
                  <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                  <button aria-label="Save" onClick={(e) => e.preventDefault()} className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-cream/90 text-primary backdrop-blur-sm hover:bg-cream transition">
                    <HeartFill size={13} strokeWidth={1.8} />
                  </button>
                </div>
                <div className="px-2 pt-5">
                  <h3 className="tour-title font-serif text-[16px] md:text-[17px] text-ink leading-snug font-semibold">{t.title}</h3>
                  <p className="mt-2 text-[12.5px] text-ink/70 leading-[1.85]">{t.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-serif text-[14px] text-primary font-semibold">{t.price}</p>
                    <span className="text-[11px] text-primary tracking-[0.18em] uppercase">{p.viewTour}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
            <Link to={link("/tours") as never} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground text-[13px]">
              {p.viewAllMobile}
            </Link>
          </div>
        </div>
      </section>


      {/* GUEST STORIES */}
      <section className="relative bg-[var(--sand)] py-24 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-end justify-between gap-4 mb-14">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={18} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.storiesEyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[44px] text-ink tracking-[-0.015em] font-semibold mt-5">{p.storiesHeading}</h2>
              <p className="mt-5 text-ink/75 text-[14.5px] leading-[2]">{p.storiesBody}</p>
            </div>
            <Link to={link("/reviews") as never} className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-primary text-[12px] tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground transition">
              {p.moreStories}
            </Link>
          </div>
        </div>

        <div className="hidden md:block marquee-pause relative">
          <div className="overflow-hidden">
            <div className="animate-marquee flex gap-6 w-max px-6">
              {[...reviews, ...reviews].map((r, i) => (
                <div key={i} className="w-[340px] shrink-0">
                  <ReviewCard r={r} compact />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden mt-2">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-4">
            {reviews.map((r, i) => (
              <div key={i} className="snap-center shrink-0 w-[82vw] max-w-[340px]">
                <ReviewCard r={r} compact />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 px-6">
            <Link to={link("/reviews") as never} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-[13px]">{p.moreStoriesMobile}</Link>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="bg-cream py-24 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-6 relative">
              <div className="relative">
                <img src={journal} alt="Shooting Star travel collage" loading="lazy" className="rounded-[4px] shadow-[0_30px_60px_-30px_rgba(60,80,70,0.4)] w-full" />
                <img
                  src={logoSeal}
                  alt="Shooting Star Travel"
                  className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-12 w-[34%] md:w-[30%] rotate-[-8deg] pointer-events-none"
                  style={{
                    filter:
                      "drop-shadow(0 0 0 #fff) drop-shadow(0 0 2px #fff) drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(0 14px 18px rgba(60,80,70,0.35))",
                  }}
                />
              </div>
              <div className="absolute -bottom-10 -right-6 md:-right-6 w-[42%] block">
                <img src={tourGroup} alt="Shooting Star tour group at a scenic viewpoint" loading="lazy" className="aspect-[4/5] object-cover rounded-[4px] border-[5px] md:border-[6px] border-cream shadow-[0_20px_40px_-20px_rgba(60,80,70,0.4)] w-full" />
              </div>
            </div>
            <div className="md:col-span-6 md:pl-4">
              <div className="flex items-center gap-3 text-primary/75">
                <CompassMark size={18} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.aboutEyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[44px] text-ink mt-5 font-semibold leading-[1.18] tracking-[-0.015em]">{p.aboutHeading}</h2>
              <p className="mt-7 text-ink/80 leading-[2.05] text-[15.5px]">{p.aboutP1}</p>
              <p className="mt-6 text-ink/80 leading-[2.05] text-[15.5px]">{p.aboutP2}</p>
              <Link to={link("/about") as never} className="mt-8 inline-flex items-center gap-2 text-primary text-[14px] underline underline-offset-[6px] decoration-primary/40 hover:decoration-primary">
                {p.meetUs}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section
        className="relative py-20 md:py-28"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--sage-soft) 45%, var(--cream)) 0%, color-mix(in oklab, var(--sage) 22%, var(--cream)) 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="max-w-xl mb-20">
            <div className="flex items-center gap-3 text-primary/75">
              <MountainMark size={20} className="text-primary/65" />
              <DottedLine length={32} className="text-primary/45" />
              <span className="text-[11px] tracking-[0.4em] uppercase">{p.beliefsEyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium tracking-[-0.012em]">{p.beliefsHeading}</h2>
            <p className="mt-6 text-ink/60 leading-[2] text-[15px]">{p.beliefsBody}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
            {p.beliefs.map((b, i) => (
              <div key={b.num}>
                <p className="font-marker text-primary text-sm tracking-[0.2em]">{b.num ?? `0${i + 1}`}</p>
                <h3 className="belief-title font-serif text-[17px] text-ink mt-3 font-semibold leading-snug">{b.title}</h3>
                <div className="mt-3 h-px w-8 bg-primary/40" />
                <p className="belief-desc mt-4 text-[13px] text-ink/65 leading-[1.95]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-28 md:py-36">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={16} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.faqEyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[44px] text-ink mt-5 tracking-[-0.015em] font-semibold">{p.faqHeading}</h2>
            </div>
            <Link to={link("/faq") as never} className="text-primary text-[12px] tracking-[0.18em] uppercase underline decoration-primary/40 underline-offset-[8px] hover:decoration-primary">
              {p.viewAllFaqs}
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
            {p.faqs.map((f, i) => (
              <details
                key={f.q}
                open={i < 2}
                className="group border-b border-primary/15 py-2 transition-colors hover:border-primary/35 open:border-primary/40"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none gap-6 py-5 px-2 -mx-2 rounded-[4px] transition hover:bg-primary/[0.04] group-open:bg-primary/[0.05]">
                  <span className="font-serif text-[16.5px] md:text-[17.5px] text-ink leading-snug font-semibold group-open:text-primary transition-colors">{f.q}</span>
                  <span className="text-primary text-2xl group-open:rotate-45 transition shrink-0 leading-none">+</span>
                </summary>
                <p className="mt-1 mb-4 px-2 text-ink/80 leading-[2.05] text-[14.5px]">{f.a}</p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* CREDENTIALS — Licensed, Certified & Authorized */}
      <CredentialsSection />

      {/* CONTACT CTA */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgLake})` }}
          aria-hidden
        />
        {/* brand-tinted overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.97 0.02 95 / 0.86) 0%, oklch(0.93 0.04 165 / 0.72) 55%, oklch(0.86 0.05 200 / 0.55) 100%)",
          }}
          aria-hidden
        />
        <JourneyPath className="absolute inset-0 w-full h-full text-ink/30 opacity-60 pointer-events-none" variant="long" />
        <div className="mx-auto max-w-[1240px] px-6 md:px-12 py-24 md:py-32 relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-7">
              <p className="font-serif text-lg md:text-xl text-ink/70 italic mb-5">
                {p.slogan}
              </p>
              <div className="flex items-center gap-3 text-ink/65">
                <MountainMark size={20} className="text-ink/55" />
                <DottedLine length={32} className="text-ink/35" />
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.ctaSectionEyebrow}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-[56px] text-ink mt-6 leading-[1.1] tracking-[-0.015em] font-medium">
                {p.ctaTitleA}<br />{p.ctaTitleB}
              </h2>
              <p className="mt-7 text-ink/80 leading-[2.05] text-[15.5px] max-w-lg">{p.ctaBody}</p>
            </div>
            <div className="md:col-span-5 md:pl-4">
              <div className="flex flex-wrap gap-3">
                <Link to={link("/tours") as never} className="rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm tracking-wide hover:bg-primary/90 transition shadow-[0_10px_24px_-12px_oklch(0.585_0.04_155/0.6)]">
                  {p.ctaExploreAll}
                </Link>
                <Link to={link("/contact") as never} className="rounded-full border border-ink/30 text-ink px-7 py-3 text-sm tracking-wide hover:bg-cream transition">
                  {p.ctaContact}
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { l: "WhatsApp", h: "https://wa.me/16047657765" },
                  { l: "Email", h: "mailto:hello@shootingstartravel.ca" },
                  { l: "KakaoTalk", h: "#" },
                ].map((c) => (
                  <a key={c.l} href={c.h} className="rounded-full bg-cream/70 backdrop-blur-sm text-ink/75 px-4 py-1.5 text-[12.5px] hover:bg-cream transition">
                    {c.l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
