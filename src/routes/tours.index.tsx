import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { tours } from "@/data/tours";
import { useTours } from "@/data/useTours";
import { useLocale, withLocale, hreflangLinks, type Locale } from "@/i18n/locale";
import { Heart } from "lucide-react";
import { BusMark, DottedLine, JourneyPath, PinMark } from "@/components/site/BrandMarks";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "Tours — Shooting Star Travel" },
      { name: "description", content: "Browse Shooting Star Travel's curated small-group journeys across Canada and the USA." },
      { property: "og:title", content: "Tours — Shooting Star Travel" },
      { property: "og:description", content: "Curated small-group journeys, designed by our local team." },
      { property: "og:image", content: tours[0].img },
    ],
    links: hreflangLinks("/tours", "en"),
  }),
  component: ToursIndexPage,
});

const US_SLUGS = new Set([
  "seattle-1-day",
  "seattle-2-day",
  "western-usa-8-day",
  "vegas-canyon-4-day",
  "los-angeles-3-day",
  "oregon-coast-3-day",
]);

type Pack = {
  eyebrow: string;
  heading: string;
  body: string;
  canadaEyebrow: string;
  canadaHeading: string;
  canadaBody: string;
  usEyebrow: string;
  usHeading: string;
  usBody: string;
  viewTour: string;
};

const PACKS: Record<Locale, Pack> = {
  en: {
    eyebrow: "Featured Journeys",
    heading: "Tours",
    body: "Each journey is shaped by our local team — small groups, considered pace. Click any tour to see the full story.",
    canadaEyebrow: "Canada · True North",
    canadaHeading: "Canadian Journeys",
    canadaBody: "From the Rockies' mirror lakes to Pacific gardens — slow days across British Columbia and Alberta.",
    usEyebrow: "USA · West Coast & Southwest",
    usHeading: "American Journeys",
    usBody: "Seattle mornings, Pacific coastlines, neon canyons — boutique road trips across the western United States.",
    viewTour: "View tour →",
  },
  zh: {
    eyebrow: "Featured Journeys",
    heading: "行程介紹",
    body: "每一段旅程都由在地團隊規劃 —— 小團出發、用心安排。點選任一行程查看完整故事。",
    canadaEyebrow: "加拿大 · 北國風景",
    canadaHeading: "加拿大行程",
    canadaBody: "從洛磯山的鏡面湖泊，到太平洋畔的花園 —— 在卑詩與亞伯達之間慢慢走過。",
    usEyebrow: "美國 · 西岸與西南",
    usHeading: "美國行程",
    usBody: "西雅圖的清晨、太平洋的海岸、霓虹與峽谷 —— 一段段橫越美國西部的精品公路旅行。",
    viewTour: "查看 →",
  },
  ko: {
    eyebrow: "Featured Journeys",
    heading: "투어 소개",
    body: "모든 여정은 현지 팀이 정성껏 디자인합니다 — 소그룹, 여유로운 페이스. 클릭하면 자세한 이야기를 볼 수 있습니다.",
    canadaEyebrow: "캐나다 · 트루 노스",
    canadaHeading: "캐나다 여정",
    canadaBody: "록키의 거울 같은 호수에서 태평양의 정원까지 — 브리티시컬럼비아와 앨버타를 천천히 걷는 시간.",
    usEyebrow: "미국 · 서부와 남서부",
    usHeading: "미국 여정",
    usBody: "시애틀의 아침, 태평양의 해안, 네온과 캐니언 — 미국 서부를 가로지르는 부티크 로드트립.",
    viewTour: "보기 →",
  },
};

export function ToursIndexPage() {
  const locale = useLocale();
  const tours = useTours();
  const p = PACKS[locale];
  const canada = tours.filter((t) => !US_SLUGS.has(t.slug));
  const usa = tours.filter((t) => US_SLUGS.has(t.slug));

  const renderCard = (t: (typeof tours)[number]) => (
    <Link
      to={withLocale(t.href ?? `/tours/${t.slug}`, locale) as never}
      key={t.slug}
      className="group relative bg-card rounded-[6px] p-3 pb-5 shadow-[0_2px_4px_-2px_rgba(70,80,75,0.06),0_18px_36px_-22px_rgba(70,80,75,0.22)] hover:-translate-y-1 transition-all duration-500 block"
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-[4px]">
        <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
        <button aria-label="Save" onClick={(e) => e.preventDefault()} className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-cream/90 text-primary backdrop-blur-sm hover:bg-cream transition">
          <Heart size={13} strokeWidth={1.8} />
        </button>
      </div>
      <div className="px-1 pt-4">
        <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50">{t.duration}</p>
        <h3 className="tour-title font-serif text-[16px] text-ink leading-snug font-semibold mt-1.5">{t.title}</h3>
        <p className="mt-1.5 text-[12px] text-ink/55 leading-relaxed">{t.desc}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-serif text-[13.5px] text-primary font-semibold">{t.price}</p>
          <span className="text-[11.5px] text-primary tracking-wide">{p.viewTour}</span>
        </div>
      </div>
    </Link>
  );

  const renderCategory = (
    eyebrow: string,
    heading: string,
    body: string,
    list: typeof tours,
  ) => (
    <section className="mx-auto max-w-[1280px] px-6 md:px-12 pb-24 md:pb-28">
      <div className="mb-12 md:mb-14">
        <div className="flex items-center gap-3 text-primary/75">
          <PinMark size={18} className="text-primary/65" />
          <DottedLine length={32} className="text-primary/45" />
          <span className="text-[11px] tracking-[0.4em] uppercase">{eyebrow}</span>
        </div>
        <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-semibold tracking-[-0.015em]">{heading}</h2>
        <p className="mt-4 text-ink/65 max-w-2xl leading-[1.95] text-[14.5px]">{body}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {list.map(renderCard)}
      </div>
    </section>
  );

  return (
    <SiteLayout>
      <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-24 md:pt-32 pb-14">
        <div className="flex items-center gap-3 text-primary/75">
          <BusMark size={20} className="text-primary/65" />
          <DottedLine length={36} className="text-primary/45" />
          <span className="text-[11px] tracking-[0.4em] uppercase">{p.eyebrow}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
          {p.heading}
        </h1>
        <p className="mt-7 text-ink/60 max-w-2xl leading-[2] text-[15px]">{p.body}</p>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      {canada.length > 0 && renderCategory(p.canadaEyebrow, p.canadaHeading, p.canadaBody, canada)}
      {usa.length > 0 && renderCategory(p.usEyebrow, p.usHeading, p.usBody, usa)}

      <div className="pb-16" />
    </SiteLayout>
  );
}
