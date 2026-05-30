import { useLocale, type Locale } from "./locale";

type Dict = Record<string, Record<Locale, string>>;

export const dict: Dict = {
  // Nav
  "nav.home": { en: "Home", zh: "首頁", ko: "홈" },
  "nav.tours": { en: "Tours", zh: "行程介紹", ko: "투어" },
  "nav.about": { en: "About", zh: "關於我們", ko: "소개" },
  "nav.reviews": { en: "Traveler Stories", zh: "旅客分享", ko: "여행자 이야기" },
  "nav.gallery": { en: "Gallery", zh: "Gallery", ko: "Gallery" },
  "nav.blog": { en: "Journal", zh: "部落格", ko: "저널" },
  "nav.faq": { en: "FAQ", zh: "常見問題", ko: "자주묻는질문" },
  "nav.contact": { en: "Contact", zh: "聯絡我們", ko: "문의" },
  "cta.book": { en: "Book Now", zh: "立即預訂", ko: "예약하기" },
  "cta.bookArrow": { en: "Book Now →", zh: "立即預訂 →", ko: "예약하기 →" },

  // Footer
  "footer.tagline": {
    en: "Travel is more than movement. Discover journeys that shine like shooting stars.",
    zh: "旅行不只是移動。發現如流星般閃耀的旅程。",
    ko: "여행은 단순한 이동이 아닙니다. 유성처럼 빛나는 여정을 발견하세요.",
  },
  "footer.bonVoyage": { en: "— bon voyage", zh: "— bon voyage", ko: "— bon voyage" },
  "footer.closing": {
    en: "Travel is more than movement — it is a journey that shines like a shooting star.",
    zh: "旅行，不只是移動，而是一場如流星般閃耀的旅程。",
    ko: "여행은 단지 이동이 아니라, 유성처럼 빛나는 여정입니다.",
  },
  "footer.follow": { en: "Follow", zh: "Follow", ko: "Follow" },
  "footer.quickLinks": { en: "Quick Links", zh: "快速連結", ko: "빠른 링크" },
  "footer.popularTours": { en: "Popular Tours", zh: "熱門行程", ko: "인기 투어" },
  "footer.contactInfo": { en: "Contact", zh: "聯絡資訊", ko: "연락처" },
  "footer.privacy": { en: "Privacy Policy", zh: "隱私權政策", ko: "개인정보 처리방침" },
  "footer.terms": { en: "Terms of Service", zh: "服務條款", ko: "서비스 약관" },
  "footer.copyright": {
    en: "© 2026 Shootingstar Travel. Made with care in Vancouver.",
    zh: "© 2026 Shootingstar Travel. Made with care in Vancouver.",
    ko: "© 2026 Shootingstar Travel. Made with care in Vancouver.",
  },
  "footer.hours": {
    en: "Mon – Sat · 9:00 – 18:00 PST",
    zh: "週一 – 週六 · 9:00 – 18:00 PST",
    ko: "월 – 토 · 9:00 – 18:00 PST",
  },

  // Index hero
  "hero.eyebrow": { en: "Spring Journal · 2026", zh: "Spring Journal · 2026", ko: "Spring Journal · 2026" },
  "hero.title.l1": { en: "Travel is not just", zh: "旅行不只是", ko: "여행은 단지" },
  "hero.title.l2": { en: "arriving somewhere —", zh: "抵達一個地方，", ko: "어딘가에 도착하는 것이 아니라 —" },
  "hero.title.l3": { en: "it is the moment light finds you.", zh: "而是被光照亮的時刻", ko: "빛이 당신을 비추는 순간입니다." },
  "hero.body": {
    en: "Small groups. Slow days. Carefully written. Shootingstar Travel takes you across Canada and the Western United States at the lightest pace, gathering every glimmer between mountain and sea.",
    zh: "小團・慢走・用心。Shootingstar Travel 帶你以最輕盈的步調，走過加拿大與美國西部，收集山與海之間的每一道光。",
    ko: "소그룹 · 천천히 · 정성껏. Shootingstar Travel과 함께 가벼운 발걸음으로 캐나다와 미국 서부의 산과 바다 사이의 빛을 모으세요.",
  },
  "hero.exploreTours": { en: "Explore Tours", zh: "探索行程", ko: "투어 둘러보기" },
  "hero.travellerStories": { en: "Travellers' Stories →", zh: "Travellers' Stories →", ko: "Travellers' Stories →" },

  // Section eyebrows
  "section.featured": { en: "Featured Journeys", zh: "Featured Journeys", ko: "Featured Journeys" },
  "section.featuredZh": { en: "Featured Journeys", zh: "精選行程", ko: "추천 여정" },
  "section.travellersWords": { en: "Travellers' Words", zh: "Travellers' Words", ko: "Travellers' Words" },
  "section.travellersWordsZh": { en: "From Our Travellers", zh: "旅客分享", ko: "여행자의 이야기" },
  "section.travellersBody": {
    en: "Real travellers, real memories — written in their own words.",
    zh: "真實旅人寫下的小小回憶。",
    ko: "여행자들이 직접 남긴 진솔한 기억들.",
  },
  "section.aboutEyebrow": { en: "About the Studio", zh: "About the Studio", ko: "About the Studio" },
  "section.aboutHeading": { en: "About Shooting Star Travel", zh: "關於 Shooting Star Travel", ko: "Shooting Star Travel 소개" },
  "section.aboutP1": {
    en: "Every itinerary is shaped with care so that travelling becomes more than reaching a destination — it becomes a memory worth keeping.",
    zh: "用心規劃每一段旅程，讓旅行不只是到達目的地，而是留下值得收藏的回憶。",
    ko: "모든 여행은 도착 그 이상의 의미가 되도록 정성껏 설계됩니다 — 간직할 가치가 있는 추억으로.",
  },
  "section.aboutP2": {
    en: "We focus on small-group journeys across Canada and the Western United States, designing safe, comfortable, warm-hearted itineraries for travellers from many languages and backgrounds. Small groups, attentive planning, room to breathe.",
    zh: "我們專注於加拿大與美國西部的小團旅遊體驗，為不同語言與背景的旅客規劃安心、舒適、有溫度的行程。小團出發、用心安排，讓每位旅人都能放心、自在地走進每一段風景。",
    ko: "캐나다와 미국 서부 전역의 소그룹 여행에 집중하여, 다양한 언어와 배경의 여행자에게 편안하고 따뜻한 여정을 디자인합니다. 소그룹 출발, 세심한 기획, 숨 쉴 여유가 있는 일정.",
  },
  "section.meetUs": { en: "Meet the team →", zh: "認識我們 →", ko: "팀 소개 →" },
  "section.viewAll": { en: "View all →", zh: "View all →", ko: "전체 보기 →" },
  "section.moreStories": { en: "More stories →", zh: "More stories →", ko: "더 많은 이야기 →" },
  "section.viewMobile": { en: "Browse all tours →", zh: "探索所有行程 →", ko: "모든 투어 보기 →" },

  // Features (5)
  "feat1.t": { en: "Curated Itineraries", zh: "精選行程", ko: "엄선된 여정" },
  "feat1.d": { en: "Classic routes, carefully drawn —\ncollecting every corner worth keeping.", zh: "精心規劃經典路線\n探索每一個值得收藏的角落", ko: "정성껏 그린 클래식 코스 —\n간직할 가치 있는 모든 순간을." },
  "feat2.t": { en: "Small Groups", zh: "小團出發", ko: "소그룹 출발" },
  "feat2.d": { en: "Smaller groups, more space —\nfor a deeper sense of place.", zh: "小團更自在\n深度體驗在地風情", ko: "더 작은 그룹, 더 깊은 경험." },
  "feat3.t": { en: "Local Expertise", zh: "專業旅遊", ko: "현지 전문성" },
  "feat3.d": { en: "Local guides who know the land —\nso every step feels considered.", zh: "在地專業嚮導帶路\n讓旅程更安心有趣", ko: "현지를 잘 아는 가이드와 함께." },
  "feat4.t": { en: "Reliable Care", zh: "安心保障", ko: "안심 보장" },
  "feat4.d": { en: "Comprehensive travel safeguards —\ntravel with peace of mind.", zh: "完善旅遊保障制度\n讓你玩得安心無憂", ko: "포괄적인 여행 보호 — 안심하고 떠나세요." },
  "feat5.t": { en: "Thoughtful Service", zh: "貼心服務", ko: "세심한 서비스" },
  "feat5.d": { en: "From planning to the road home —\nwe stay close from start to finish.", zh: "從行前到旅途中\n全程貼心為你服務", ko: "처음부터 끝까지 함께합니다." },

  // Tours page
  "tours.title": { en: "Tours", zh: "行程介紹", ko: "투어" },
  "tours.intro": {
    en: "Every journey is planned by our local team, with small groups and a comfortable pace. Tap any tour for the full story.",
    zh: "每段旅程都由在地團隊親自策劃，小團精緻、節奏舒適。點擊任一行程查看完整介紹。",
    ko: "모든 여정은 현지 팀이 직접 기획합니다. 소그룹, 편안한 속도. 자세한 내용은 각 투어를 눌러보세요.",
  },
  "tours.viewTour": { en: "View tour →", zh: "查看行程 →", ko: "투어 보기 →" },
  "tours.view": { en: "View →", zh: "查看 →", ko: "보기 →" },

  // Destinations
  "dest.eyebrow": { en: "Destinations", zh: "Destinations", ko: "Destinations" },
  "dest.heading": { en: "Iconic places we love", zh: "我們最愛的目的地", ko: "우리가 사랑하는 목적지" },
};

export function useT() {
  const locale = useLocale();
  return (key: keyof typeof dict): string => dict[key]?.[locale] ?? dict[key]?.en ?? key;
}

export function tFor(locale: Locale, key: keyof typeof dict): string {
  return dict[key]?.[locale] ?? dict[key]?.en ?? key;
}
