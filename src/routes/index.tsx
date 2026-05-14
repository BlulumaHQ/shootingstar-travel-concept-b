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

export const Route = createFileRoute("/")({
  head: () => ({
    ...seoHead({
      path: "/",
      locale: "en",
      title: "Shootingstar Travel — Boutique Canadian Rockies, Banff & Vancouver Tours",
      description: "Boutique small-group tours across Canada — the Canadian Rockies, Banff, Vancouver, Victoria and aurora chases — with English, Mandarin and Korean-friendly guides. Slow travel, considered detail.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Shootingstar Travel",
          url: "https://shootingstar-travel-concept-b.lovable.app/",
          areaServed: ["Canada", "British Columbia", "Alberta", "Yukon"],
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
  heroEyebrow: string;
  heroL1: string; heroL2: string; heroL3: string;
  heroBody: string;
  ctaExplore: string; ctaStories: string;
  featuresEyebrow: string;
  feat: { t: string; d: string }[];
  featuredEyebrow: string; featuredHeading: string; viewAll: string; viewAllMobile: string; viewTour: string;
  storiesEyebrow: string; storiesHeading: string; storiesBody: string; moreStories: string; moreStoriesMobile: string;
  aboutEyebrow: string; aboutHeading: string; aboutP1: string; aboutP2: string; meetUs: string;
  destEyebrow: string; destHeadingA: string; destHeadingB: string; destBody: string; swipe: string;
  destinations: { name: string; sub: string; note: string }[];
  faqEyebrow: string; faqHeading: string; viewAllFaqs: string;
  faqs: { q: string; a: string }[];
  ctaSectionEyebrow: string; ctaTitleA: string; ctaTitleB: string; ctaBody: string;
  ctaExploreAll: string; ctaContact: string;
};

const PACKS: Record<Locale, Pack> = {
  en: {
    heroEyebrow: "Spring Journal · 2026",
    heroL1: "Travel is not just",
    heroL2: "arriving somewhere —",
    heroL3: "it is the moment light finds you.",
    heroBody: "Small groups. Slow days. Carefully written. Shootingstar Travel takes you across Canada at the lightest pace, gathering every glimmer between mountain and sea.",
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
    aboutP2: "We focus on Canadian local experiences, designing safe, comfortable, warm-hearted journeys for travellers from many languages and backgrounds. Small groups, attentive planning, room to breathe.",
    meetUs: "Meet the team →",
    destEyebrow: "A Collection of Places",
    destHeadingA: "Every view ",
    destHeadingB: "worth keeping",
    destBody: "From morning reflections in the Rockies to green light over the Yukon — six destinations worth writing into your diary.",
    swipe: "— swipe →",
    destinations: [
      { name: "Banff", sub: "Postcard", note: "Mirror lakes and snowy peaks — Canada's most iconic postcard." },
      { name: "Vancouver", sub: "City", note: "A city between mountains and sea — modern, calm, alive." },
      { name: "Whistler", sub: "Resort", note: "A year-round resort — winter skiing, summer trails." },
      { name: "Victoria", sub: "Gardens", note: "British charm and the gardens of Butchart on a spring afternoon." },
      { name: "Aurora", sub: "Night Sky", note: "The most romantic wait under the night sky — green light drifting down." },
      { name: "Yukon", sub: "Wilderness", note: "The quiet of the far north — endless rivers of stars." },
    ],
    faqEyebrow: "Frequently Asked",
    faqHeading: "Frequently asked",
    viewAllFaqs: "View all FAQs →",
    faqs: [
      { q: "How do I book?", a: "Use the form on our Contact page, or reach us on WhatsApp, KakaoTalk or WeChat. A team member will reply within 24 hours." },
      { q: "Are guides available in my language?", a: "Yes — we host departures in English, Mandarin (Traditional & Simplified) and Korean." },
      { q: "Can I cancel or reschedule?", a: "Full refund 30+ days before departure; flexible options apply per tour and are explained at booking." },
      { q: "Is accommodation included?", a: "Multi-day tours include selected 3-star+ hotels or character mountain lodges." },
      { q: "How can I pay?", a: "Credit card, Interac e-Transfer, bank transfer and PayPal." },
    ],
    ctaSectionEyebrow: "And the journey begins",
    ctaTitleA: "Your next journey,",
    ctaTitleB: "begins here.",
    ctaBody: "Tell us where you'd like to go, and we'll help you find the journey that suits you best.",
    ctaExploreAll: "Browse all tours →",
    ctaContact: "Contact us",
  },
  zh: {
    heroEyebrow: "Spring Journal · 2026",
    heroL1: "旅行不只是",
    heroL2: "抵達一個地方,",
    heroL3: "而是被光照亮的時刻",
    heroBody: "小團・慢走・用心。Shootingstar Travel 帶你以最輕盈的步調,收集加拿大山與海之間的每一道光。",
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
    aboutP2: "我們專注於加拿大在地旅遊體驗,為不同語言與背景的旅客規劃安心、舒適、有溫度的行程。小團出發、用心安排,讓每位旅人都能放心、自在地走進每一段風景。",
    meetUs: "認識我們 →",
    destEyebrow: "A Collection of Places",
    destHeadingA: "值得收藏的",
    destHeadingB: "每一處風景",
    destBody: "從洛磯山的清晨倒影,到育空夜空裡的綠光—— 六個最值得寫進日記的目的地。",
    swipe: "— 滑動 →",
    destinations: [
      { name: "Banff", sub: "班夫", note: "湖光雪峰倒影,加拿大最經典的明信片風景。" },
      { name: "Vancouver", sub: "溫哥華", note: "山與海之間的城市,舒緩而現代的生活步調。" },
      { name: "Whistler", sub: "惠斯勒", note: "冬日滑雪、夏日山徑的度假名所。" },
      { name: "Victoria", sub: "維多利亞", note: "英倫風情與布查特花園的春日午後。" },
      { name: "Aurora", sub: "極光", note: "夜空下最浪漫的等待,綠光輕輕落下。" },
      { name: "Yukon", sub: "育空", note: "邊境之北的寂靜,星河無限延伸。" },
    ],
    faqEyebrow: "Frequently Asked",
    faqHeading: "常見問題",
    viewAllFaqs: "查看所有常見問題 →",
    faqs: [
      { q: "如何報名？", a: "您可以透過聯絡我們頁面填寫表單,或直接以 WhatsApp、KakaoTalk、WeChat 與我們聯繫,將會有專人於 24 小時內回覆。" },
      { q: "是否提供中文導遊？", a: "是的,我們提供繁體中文、簡體中文、韓文與英文導遊服務。" },
      { q: "可以取消或改期嗎？", a: "出發前 30 天以上可全額退費,依行程不同有彈性方案,詳細條款於報名時說明。" },
      { q: "是否包含住宿？", a: "多日行程包含精選住宿,皆為 3 星以上飯店或特色山屋。" },
      { q: "如何付款？", a: "支援信用卡、Interac e-Transfer、銀行轉帳與 PayPal。" },
    ],
    ctaSectionEyebrow: "And the journey begins",
    ctaTitleA: "下一趟旅程,",
    ctaTitleB: "從這裡開始。",
    ctaBody: "告訴我們你想去的地方,我們會協助你找到最適合的行程。",
    ctaExploreAll: "探索所有行程 →",
    ctaContact: "聯絡我們",
  },
  ko: {
    heroEyebrow: "Spring Journal · 2026",
    heroL1: "여행은 단지",
    heroL2: "어딘가에 도착하는 것이 아니라 —",
    heroL3: "빛이 당신을 비추는 순간입니다.",
    heroBody: "소그룹 · 천천히 · 정성껏. Shootingstar Travel과 함께 가벼운 발걸음으로 캐나다의 산과 바다 사이의 모든 빛을 모으세요.",
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
    aboutP2: "캐나다 현지 체험에 집중하여 다양한 언어와 배경의 여행자에게 편안하고 따뜻한 여정을 디자인합니다. 소그룹 출발, 세심한 기획, 숨 쉴 여유가 있는 일정.",
    meetUs: "팀 소개 →",
    destEyebrow: "A Collection of Places",
    destHeadingA: "간직할 가치 있는 ",
    destHeadingB: "모든 풍경",
    destBody: "로키의 새벽 반영부터 유콘 밤하늘의 초록빛까지 — 일기에 적어둘 가치가 있는 여섯 곳의 목적지.",
    swipe: "— 스와이프 →",
    destinations: [
      { name: "Banff", sub: "밴프", note: "거울 같은 호수와 설산 — 캐나다에서 가장 상징적인 풍경." },
      { name: "Vancouver", sub: "밴쿠버", note: "산과 바다 사이의 도시 — 현대적이고 평온한 일상." },
      { name: "Whistler", sub: "휘슬러", note: "겨울 스키, 여름 트레일 — 사계절 리조트." },
      { name: "Victoria", sub: "빅토리아", note: "영국풍의 매력과 부차트 가든의 봄날 오후." },
      { name: "Aurora", sub: "오로라", note: "밤하늘 아래 가장 낭만적인 기다림 — 부드럽게 내려오는 초록빛." },
      { name: "Yukon", sub: "유콘", note: "먼 북녘의 고요 — 끝없이 흐르는 별의 강." },
    ],
    faqEyebrow: "Frequently Asked",
    faqHeading: "자주 묻는 질문",
    viewAllFaqs: "모든 FAQ 보기 →",
    faqs: [
      { q: "어떻게 예약하나요?", a: "문의 페이지의 양식을 작성하시거나 WhatsApp, 카카오톡, WeChat으로 연락 주세요. 24시간 이내에 답변드립니다." },
      { q: "한국어 가이드가 있나요?", a: "네 — 영어, 중국어(번체/간체), 한국어 출발이 가능합니다." },
      { q: "취소 또는 일정 변경이 가능한가요?", a: "출발 30일 이전 전액 환불; 투어별 유연한 옵션은 예약 시 안내드립니다." },
      { q: "숙박이 포함되나요?", a: "다일정 투어는 엄선된 3성급 이상 호텔 또는 산장이 포함됩니다." },
      { q: "결제 방법은?", a: "신용카드, Interac e-Transfer, 은행 송금, PayPal을 지원합니다." },
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

export function HomePage() {
  const locale = useLocale();
  const p = PACKS[locale];
  const tours = useTours();
  const reviews = useReviews();
  const featured = tours.slice(0, 6);
  const link = (path: string) => withLocale(path, locale);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-cream overflow-hidden">
        <PlaneJourney className="absolute inset-x-0 top-[16%] w-full h-32 md:h-44 text-primary/55 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-10 md:pt-28 pb-20 md:pb-36">
          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center">
            <div className="md:col-span-6 order-1">
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={14} className="text-primary/65" />
                <DottedLine length={28} className="text-primary/45" />
                <span className="text-[10.5px] md:text-[11px] tracking-[0.38em] uppercase font-medium">{p.heroEyebrow}</span>
              </div>
              <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[64px] leading-[1.12] tracking-[-0.012em] text-ink mt-5 md:mt-7 font-medium">
                {p.heroL1}<br />
                {p.heroL2}<br />
                <span className="italic text-primary">{p.heroL3}</span>
              </h1>
              <p className="mt-5 md:mt-9 text-ink/60 leading-[1.95] text-[14px] md:text-[15px] max-w-md">{p.heroBody}</p>
              <div className="mt-7 md:mt-12 flex flex-wrap items-center gap-4 md:gap-6">
                <Link to={link("/tours") as never} className="inline-flex items-center gap-3 rounded-full bg-primary px-7 md:px-8 py-3 md:py-3.5 text-primary-foreground font-medium text-[13px] md:text-[14px] tracking-[0.08em] uppercase shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)] hover:bg-primary/90 transition">
                  {p.ctaExplore} <span aria-hidden>→</span>
                </Link>
                <Link to={link("/reviews") as never} className="text-ink/65 text-[12.5px] md:text-[13.5px] tracking-[0.08em] uppercase underline decoration-primary/30 underline-offset-[6px] hover:text-primary transition">
                  {p.ctaStories}
                </Link>
              </div>
            </div>

            <div className="md:hidden order-2 mt-2 relative">
              <div className="relative h-[220px] mx-auto max-w-[420px]">
                <div className="absolute -top-6 -left-4 w-32 h-32 rounded-full opacity-50 blur-3xl" style={{ background: "var(--lavender-soft)" }} aria-hidden />
                <div className="absolute -bottom-6 -right-4 w-36 h-36 rounded-full opacity-50 blur-3xl" style={{ background: "var(--sage-soft)" }} aria-hidden />
                <figure className="polaroid absolute top-2 left-2 w-[44%] rotate-[-5deg] z-10">
                  <img src={tourBanff} alt="" className="aspect-square w-full object-cover" />
                  <figcaption className="font-marker text-ink/65 text-[11px] mt-2 text-center">Banff</figcaption>
                </figure>
                <figure className="polaroid absolute bottom-0 right-2 w-[44%] rotate-[4deg] z-20">
                  <img src={tourAurora} alt="" className="aspect-square w-full object-cover" />
                  <figcaption className="font-marker text-ink/65 text-[11px] mt-2 text-center">Yukon</figcaption>
                </figure>
              </div>
            </div>

            <div className="hidden md:block md:col-span-6 order-2 relative">
              <div className="relative h-[560px] mx-auto max-w-[520px]">
                <div className="absolute -top-10 -left-6 w-44 h-44 rounded-full opacity-50 blur-3xl" style={{ background: "var(--lavender-soft)" }} aria-hidden />
                <div className="absolute -bottom-10 -right-6 w-52 h-52 rounded-full opacity-50 blur-3xl" style={{ background: "var(--sage-soft)" }} aria-hidden />
                <figure className="polaroid absolute top-2 left-4 w-[60%] rotate-[-5deg] z-10">
                  <img src={tourBanff} alt="Mountain reflection at golden hour" className="aspect-square w-full object-cover" />
                  <figcaption className="font-marker text-ink/70 text-[13px] mt-3 text-center tracking-wide">Banff · 06:42</figcaption>
                </figure>
                <figure className="polaroid absolute bottom-0 right-4 w-[60%] rotate-[4deg] z-20">
                  <img src={tourAurora} alt="Aurora over still lake" className="aspect-square w-full object-cover" />
                  <figcaption className="font-marker text-ink/70 text-[13px] mt-3 text-center tracking-wide">Yukon · 23:18</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / FEATURE ICONS */}
      <section className="relative bg-[var(--sand)] py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-14">
            {p.feat.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={f.t} className="flex flex-col items-start">
                  <span className="text-primary"><Icon size={48} /></span>
                  <p className="mt-5 font-serif text-[17px] text-ink font-semibold">{f.t}</p>
                  <p className="mt-2.5 text-[12.5px] text-ink/60 leading-[1.85] whitespace-pre-line">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="relative bg-cream pt-20 md:pt-24 pb-24 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <BusMark size={18} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.featuredEyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink tracking-[-0.012em] font-medium mt-5">{p.featuredHeading}</h2>
            </div>
            <Link to={link("/tours") as never} className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-primary text-[12px] tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground transition">
              {p.viewAll} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10">
            {featured.map((t) => (
              <Link
                to={link(`/tours/${t.slug}`) as never}
                key={t.slug}
                className="group relative bg-card rounded-[6px] p-3 pb-5 shadow-[0_2px_4px_-2px_rgba(70,80,75,0.06),0_18px_36px_-22px_rgba(70,80,75,0.22)] hover:-translate-y-1 transition-all duration-500 block"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-[4px]">
                  <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                  <button aria-label="Save" onClick={(e) => e.preventDefault()} className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-cream/90 text-primary backdrop-blur-sm hover:bg-cream transition">
                    <HeartFill size={13} strokeWidth={1.8} />
                  </button>
                </div>
                <div className="px-1 pt-4">
                  <h3 className="font-serif text-[15px] md:text-base text-ink leading-snug font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-[11.5px] text-ink/55 leading-relaxed">{t.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-serif text-[13.5px] text-primary font-semibold">{t.price}</p>
                    <span className="text-[11px] text-primary">{p.viewTour}</span>
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
              <h2 className="font-serif text-3xl md:text-[40px] text-ink tracking-[-0.012em] font-medium mt-5">{p.storiesHeading}</h2>
              <p className="mt-4 text-ink/55 text-[13.5px] leading-[2]">{p.storiesBody}</p>
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
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium leading-[1.18] tracking-[-0.012em]">{p.aboutHeading}</h2>
              <p className="mt-7 text-ink/70 leading-[2] text-[15px]">{p.aboutP1}</p>
              <p className="mt-5 text-ink/70 leading-[2] text-[15px]">{p.aboutP2}</p>
              <Link to={link("/about") as never} className="mt-8 inline-flex items-center gap-2 text-primary text-[14px] underline underline-offset-[6px] decoration-primary/40 hover:decoration-primary">
                {p.meetUs}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="relative bg-[var(--sand)] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="text-center mb-20 md:mb-24">
            <div className="flex items-center justify-center gap-3 text-primary/75">
              <DottedLine length={24} className="text-primary/45" />
              <PinMark size={18} className="text-primary/65" />
              <span className="text-[11px] tracking-[0.4em] uppercase">{p.destEyebrow}</span>
              <PinMark size={18} className="text-primary/65" />
              <DottedLine length={24} className="text-primary/45" />
            </div>
            <h2 className="font-serif text-4xl md:text-[52px] text-ink mt-6 leading-[1.15] tracking-[-0.015em] font-medium">
              {p.destHeadingA}<span className="italic text-primary">{p.destHeadingB}</span>
            </h2>
            <p className="mt-6 text-ink/65 leading-[2] text-[15px] max-w-xl mx-auto">{p.destBody}</p>
          </div>

          <div className="md:hidden -mx-6 px-6">
            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pr-12">
              {p.destinations.map((d, i) => (
                <article key={d.name} className="snap-start shrink-0 w-[78%] max-w-[320px]">
                  <div className="aspect-[4/5] overflow-hidden rounded-[4px] shadow-[0_20px_40px_-25px_rgba(60,80,70,0.35)]">
                    <img src={DEST_IMAGES[i]} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-4">
                    <p className="font-marker text-primary text-[12px] tracking-[0.2em] uppercase">{d.sub}</p>
                    <h3 className="font-serif text-lg text-ink mt-1 font-semibold">{d.name}</h3>
                    <p className="mt-2 text-[13px] text-ink/65 leading-[1.85]">{d.note}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-[10.5px] tracking-[0.4em] uppercase text-ink/40 mt-2">{p.swipe}</p>
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {p.destinations.map((d, i) => (
              <article key={d.name} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_20px_40px_-25px_rgba(60,80,70,0.35)]">
                  <img src={DEST_IMAGES[i]} alt={d.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1200ms]" />
                </div>
                <div className="mt-5">
                  <p className="font-marker text-primary text-[13px] tracking-[0.2em] uppercase">{d.sub}</p>
                  <h3 className="font-serif text-xl text-ink mt-1.5 font-semibold">{d.name}</h3>
                  <p className="mt-3 text-[13.5px] text-ink/65 leading-[1.9]">{d.note}</p>
                </div>
              </article>
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
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 tracking-[-0.012em] font-medium">{p.faqHeading}</h2>
            </div>
            <Link to={link("/faq") as never} className="text-primary text-[12px] tracking-[0.18em] uppercase underline decoration-primary/40 underline-offset-[8px] hover:decoration-primary">
              {p.viewAllFaqs}
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {p.faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-primary/15 py-6 open:pb-7">
                <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                  <span className="font-serif text-[16px] text-ink leading-snug">{f.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                </summary>
                <p className="mt-4 text-ink/60 leading-[2] text-[14px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

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
              <div className="flex items-center gap-3 text-ink/65">
                <MountainMark size={20} className="text-ink/55" />
                <DottedLine length={32} className="text-ink/35" />
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.ctaSectionEyebrow}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-[56px] text-ink mt-6 leading-[1.1] tracking-[-0.015em] font-medium">
                {p.ctaTitleA}<br />{p.ctaTitleB}
              </h2>
              <p className="mt-7 text-ink/70 leading-[2] text-[15px] max-w-lg">{p.ctaBody}</p>
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
                  { l: "WhatsApp", h: "https://wa.me/" },
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
