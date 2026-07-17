import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useTours } from "@/data/useTours";
import { useLocale, withLocale, type Locale } from "@/i18n/locale";
import { getRegions, type Region } from "@/data/tourRegions";
import { sortToursByCategory } from "@/data/sortTours";
import { TourCard } from "@/components/site/TourCard";
import { BusMark, DottedLine, PinMark } from "@/components/site/BrandMarks";

export type RegionLandingContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroIntro: string;
  gridEyebrow: string;
  gridHeading: string;
  viewTour: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
};

export const REGION_LANDING_CONTENT: Record<"banff" | "jasper", Record<Locale, RegionLandingContent>> = {
  banff: {
    en: {
      heroEyebrow: "Banff · Alberta",
      heroHeading: "Banff Day Tours & Shuttles",
      heroIntro:
        "Discover the Canadian Rockies from Banff with Shooting Star Travel. Small-group day tours to Lake Louise, Moraine Lake, the Icefields Parkway and beyond — plus reliable shuttles between Banff and Jasper.",
      gridEyebrow: "Banff Tours",
      gridHeading: "Explore Banff",
      viewTour: "View tour →",
      ctaHeading: "Plan your Banff journey",
      ctaBody: "Custom itineraries, private departures, or advice on the right day tour — we're happy to help.",
      ctaButton: "Contact us",
    },
    zh: {
      heroEyebrow: "班夫 · 亞伯達",
      heroHeading: "班夫一日遊 & 接駁行程",
      heroIntro:
        "從班夫出發，跟著 Shooting Star Travel 走進加拿大洛磯山脈。小團一日遊帶你走訪露易絲湖、夢蓮湖、冰原大道，並提供班夫與賈斯伯之間的可靠接駁服務。",
      gridEyebrow: "班夫行程",
      gridHeading: "探索班夫",
      viewTour: "查看行程 →",
      ctaHeading: "規劃你的班夫旅程",
      ctaBody: "客製行程、私人包團或行程建議，都歡迎聯絡我們。",
      ctaButton: "聯絡我們",
    },
    ko: {
      heroEyebrow: "밴프 · 앨버타",
      heroHeading: "밴프 데이 투어 & 셔틀",
      heroIntro:
        "밴프에서 출발해 Shooting Star Travel과 함께 캐나디안 로키를 만나보세요. 레이크 루이스, 모레인 호수, 아이스필즈 파크웨이 소그룹 투어와 밴프–재스퍼 셔틀을 안내합니다.",
      gridEyebrow: "밴프 투어",
      gridHeading: "밴프 둘러보기",
      viewTour: "투어 보기 →",
      ctaHeading: "밴프 여정을 계획하세요",
      ctaBody: "맞춤 일정, 프라이빗 투어, 또는 어떤 투어가 맞을지 편하게 문의해 주세요.",
      ctaButton: "문의하기",
    },
  },
  jasper: {
    en: {
      heroEyebrow: "Jasper · Alberta",
      heroHeading: "Jasper Day Tours & Shuttles",
      heroIntro:
        "Explore Jasper's wild north with Shooting Star Travel. Small-group day tours to Maligne Lake and Spirit Island, plus daily Icefields Parkway shuttles between Jasper and Banff.",
      gridEyebrow: "Jasper Tours",
      gridHeading: "Explore Jasper",
      viewTour: "View tour →",
      ctaHeading: "Plan your Jasper journey",
      ctaBody: "Combining a Jasper day tour with a Banff shuttle? We'll build the perfect route.",
      ctaButton: "Contact us",
    },
    zh: {
      heroEyebrow: "賈斯伯 · 亞伯達",
      heroHeading: "賈斯伯一日遊 & 接駁行程",
      heroIntro:
        "跟著 Shooting Star Travel 走進賈斯伯的北國原野。小團一日遊帶你前往瑪琳湖與精靈島，並提供每日冰原大道班夫–賈斯伯接駁。",
      gridEyebrow: "賈斯伯行程",
      gridHeading: "探索賈斯伯",
      viewTour: "查看行程 →",
      ctaHeading: "規劃你的賈斯伯旅程",
      ctaBody: "想把賈斯伯一日遊和班夫接駁組合起來？我們為你安排最合適的路線。",
      ctaButton: "聯絡我們",
    },
    ko: {
      heroEyebrow: "재스퍼 · 앨버타",
      heroHeading: "재스퍼 데이 투어 & 셔틀",
      heroIntro:
        "Shooting Star Travel과 함께 재스퍼의 야생을 만나보세요. 말린 호수와 스피릿 아일랜드 소그룹 투어, 그리고 재스퍼–밴프 아이스필즈 파크웨이 셔틀을 운영합니다.",
      gridEyebrow: "재스퍼 투어",
      gridHeading: "재스퍼 둘러보기",
      viewTour: "투어 보기 →",
      ctaHeading: "재스퍼 여정을 계획하세요",
      ctaBody: "재스퍼 데이 투어와 밴프 셔틀을 함께 계획하고 싶다면 편하게 문의해 주세요.",
      ctaButton: "문의하기",
    },
  },
};

export function RegionToursLanding({
  region,
  heroImg,
  content,
}: {
  region: Region;
  heroImg: string;
  content: RegionLandingContent;
}) {
  const locale = useLocale();
  const tours = useTours();
  const list = sortToursByCategory(tours.filter((t) => getRegions(t.slug).includes(region)));

  return (
    <SiteLayout>
      <section className="relative h-[52vh] min-h-[380px] md:h-[62vh] md:min-h-[520px] flex items-end overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/35 to-transparent" />
        <div className="relative mx-auto max-w-[1280px] w-full px-6 md:px-12 pb-14 md:pb-20 text-cream">
          <div className="flex items-center gap-3 text-cream/85">
            <BusMark size={20} className="text-cream/70" />
            <DottedLine length={36} className="text-cream/60" />
            <span className="text-[11px] tracking-[0.4em] uppercase">{content.heroEyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] mt-5 font-medium tracking-[-0.015em] leading-[1.1] !text-cream">
            {content.heroHeading}
          </h1>
          <p className="mt-6 max-w-2xl text-cream/85 leading-[1.9] text-[15px]">{content.heroIntro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 md:px-12 pt-20 md:pt-24 pb-24 md:pb-28">
        <div className="mb-12 md:mb-14">
          <div className="flex items-center gap-3 text-primary/75">
            <PinMark size={18} className="text-primary/65" />
            <DottedLine length={32} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase">{content.gridEyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-semibold tracking-[-0.015em]">
            {content.gridHeading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {list.map((t) => (
            <TourCard key={t.slug} tour={t} locale={locale} />
          ))}
        </div>

      </section>

      <section className="mx-auto max-w-[1280px] px-6 md:px-12 pb-24 md:pb-28">
        <div className="bg-card rounded-[6px] p-10 md:p-14 text-center shadow-[0_2px_4px_-2px_rgba(70,80,75,0.06),0_18px_36px_-22px_rgba(70,80,75,0.22)]">
          <h2 className="font-serif text-2xl md:text-[32px] text-ink font-semibold tracking-[-0.015em]">
            {content.ctaHeading}
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-ink/65 leading-[1.9] text-[14.5px]">{content.ctaBody}</p>
          <div className="mt-7">
            <Link
              to={withLocale("/contact", locale) as never}
              className="inline-flex items-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-[13px] tracking-[0.15em] uppercase text-primary-foreground hover:bg-primary/90 transition"
            >
              {content.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
