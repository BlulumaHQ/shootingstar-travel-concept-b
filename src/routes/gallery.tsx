import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState, useMemo, useEffect } from "react";
import { Play, MapPin, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { StarMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks, useLocale, type Locale } from "@/i18n/locale";
import logo from "@/assets/logo.png";

// Media
import b1 from "@/assets/banff3/b1.webp";
import b2 from "@/assets/banff3/b2.webp";
import b3 from "@/assets/banff3/b3.webp";
import b4 from "@/assets/banff3/b4.webp";
import b5 from "@/assets/banff3/b5.webp";
import b6 from "@/assets/banff3/b6.webp";
import lake9 from "@/assets/lake-tours/lake-009.webp";
import lake10 from "@/assets/lake-tours/lake-010.webp";
import lake13 from "@/assets/lake-tours/lake-013.webp";
import lake52 from "@/assets/lake-tours/lake-052.webp";
import lake55 from "@/assets/lake-tours/lake-055.webp";
import v1 from "@/assets/victoria/v1.webp";
import v2 from "@/assets/victoria/v2.webp";
import v5 from "@/assets/victoria/v5.webp";
import v7 from "@/assets/victoria/v7.webp";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Shooting Star Travel" },
      { name: "description", content: "Latest travel moments, photos, and videos from Shooting Star Travel." },
      { property: "og:title", content: "Gallery — Shooting Star Travel" },
      { property: "og:description", content: "Latest travel moments, photos, and videos from Shooting Star Travel." },
      { property: "og:image", content: b1 },
    ],
    links: hreflangLinks("/gallery", "en"),
  }),
  component: GalleryPage,
});

// ── i18n ──────────────────────────────────────────────────────────────
const T = {
  heroEyebrow: { en: "Studio Gallery", zh: "Studio Gallery", ko: "Studio Gallery" },
  heroTitle: { en: "Gallery", zh: "Gallery", ko: "Gallery" },
  heroSub: {
    en: "Latest travel moments, photos, and videos from Shooting Star Travel.",
    zh: "持續更新最新旅遊照片、影片與行程紀錄，讓你看到我們真實的旅程現場。",
    ko: "Shooting Star Travel의 최신 여행 순간과 사진, 영상.",
  },
  featuredEyebrow: { en: "Latest update", zh: "最新一筆上傳", ko: "최신 업데이트" },
  latestSection: { en: "Latest Uploads", zh: "最新上傳", ko: "최신 업로드" },
  videoBadge: { en: "Video", zh: "影片", ko: "영상" },
  viewJourney: { en: "View Journey", zh: "查看旅程", ko: "여정 보기" },
  closeBtn: { en: "Close", zh: "關閉", ko: "닫기" },
  filterAll: { en: "All", zh: "全部", ko: "전체" },
  filterPhotos: { en: "Photos", zh: "照片", ko: "사진" },
  filterVideos: { en: "Videos", zh: "影片", ko: "영상" },
  filterGroup: { en: "Group Tours", zh: "團體旅遊", ko: "그룹 투어" },
  filterDest: { en: "Destination Highlights", zh: "目的地亮點", ko: "목적지 하이라이트" },
} as const;
const t = (k: keyof typeof T, l: Locale) => T[k][l] ?? T[k].en;

// ── Data ──────────────────────────────────────────────────────────────
type Category = "group" | "destination";
type GalleryItem = {
  id: string;
  dateISO: string;
  date: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  location: Record<Locale, string>;
  category: Category;
  cover: string;
  photos: string[];
  hasVideo: boolean;
  featured?: boolean;
};

const items: GalleryItem[] = [
  {
    id: "rocky-mountain-highlights",
    dateISO: "2026-05-29",
    date: { en: "May 29, 2026", zh: "2026 年 5 月 29 日", ko: "2026년 5월 29일" },
    title: {
      en: "Rocky Mountain Tour Highlights",
      zh: "洛磯山脈旅程亮點",
      ko: "로키 마운틴 하이라이트",
    },
    description: {
      en: "A quick look at our latest group journey through the Canadian Rockies.",
      zh: "帶你快速回顧最近一團走過加拿大洛磯山脈的精彩瞬間。",
      ko: "캐나디안 로키를 여행한 최근 그룹의 하이라이트를 빠르게 살펴보세요.",
    },
    location: {
      en: "Canadian Rockies",
      zh: "加拿大洛磯山脈",
      ko: "캐나디안 로키",
    },
    category: "group",
    cover: b1,
    photos: [b1, b2, b3, b4, b5, b6],
    hasVideo: false,
    featured: true,
  },
  {
    id: "banff-two-lake-day",
    dateISO: "2026-07-18",
    date: { en: "July 18, 2026", zh: "2026 年 7 月 18 日", ko: "2026년 7월 18일" },
    title: {
      en: "Banff Two-Lake Day Tour",
      zh: "Banff 雙湖一日遊現場",
      ko: "밴프 투-레이크 1일 투어",
    },
    description: {
      en: "Bright weather, soft light, and happy travellers around Lake Louise and Moraine Lake.",
      zh: "天氣好、光線柔，旅客笑得很開心，把 Banff 雙湖經典畫面一次收齊。",
      ko: "맑은 날씨와 부드러운 빛, 그리고 즐거운 여행자들의 모습.",
    },
    location: {
      en: "Lake Louise & Moraine Lake",
      zh: "Lake Louise 與 Moraine Lake",
      ko: "레이크 루이스 & 모레인 레이크",
    },
    category: "destination",
    cover: lake10,
    photos: [lake10, lake9, lake13, lake52, lake55],
    hasVideo: true,
  },
  {
    id: "victoria-day",
    dateISO: "2026-08-09",
    date: { en: "August 9, 2026", zh: "2026 年 8 月 9 日", ko: "2026년 8월 9일" },
    title: {
      en: "Victoria Coastal Day Trip",
      zh: "維多利亞海岸一日遊",
      ko: "빅토리아 해안 1일 투어",
    },
    description: {
      en: "Garden highlights, ferry views, and a peaceful walk around the Inner Harbour.",
      zh: "賞花、搭船、漫步維多利亞內港，慢慢走過一整天。",
      ko: "정원과 페리, 이너 하버 산책까지 함께한 하루.",
    },
    location: {
      en: "Butchart Gardens & Inner Harbour",
      zh: "Butchart Gardens 與 Inner Harbour",
      ko: "부차트 가든 & 이너 하버",
    },
    category: "destination",
    cover: v1,
    photos: [v1, v2, v5, v7],
    hasVideo: false,
  },
];

// ── Subtle watermark (small padding) ──────────────────────────────────
function Watermark() {
  return (
    <div
      className="pointer-events-none absolute bottom-2 right-2 z-10 rounded-md"
      style={{ background: "rgba(255,255,255,0.72)", padding: "5px" }}
    >
      <img
        src={logo}
        alt=""
        draggable={false}
        className="block opacity-80 select-none"
        style={{ height: 22, width: "auto", maxWidth: 80 }}
      />
    </div>
  );
}

function ImgWithMark({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      <Watermark />
    </div>
  );
}

// ── Detail modal ──────────────────────────────────────────────────────
function Detail({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const l = useLocale();
  return (
    <div className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-cream rounded-2xl max-w-4xl w-full my-8 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-7 md:px-9 pt-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sage-soft/40 text-ink/75 px-3 py-1 text-[11.5px]">
              <Calendar size={12} /> {item.date[l]}
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-ink font-semibold mt-3">{item.title[l]}</h3>
            <p className="text-ink/65 text-[13px] mt-1 flex items-center gap-1.5"><MapPin size={13} />{item.location[l]}</p>
          </div>
          <button onClick={onClose} className="text-ink/50 p-1"><X size={22} /></button>
        </div>
        <div className="px-7 md:px-9 mt-5">
          <p className="text-ink/80 leading-[2] text-[14.5px] font-serif">{item.description[l]}</p>
        </div>
        <div className="px-7 md:px-9 mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {item.photos.map((p, i) => (
            <ImgWithMark key={i} src={p} className="aspect-[4/3] rounded-lg" />
          ))}
          {item.hasVideo && (
            <div className="relative aspect-[4/3] rounded-lg bg-ink/85 grid place-items-center text-cream/80 col-span-2 md:col-span-1">
              <div className="text-center">
                <Play size={36} className="mx-auto mb-2" />
                <p className="text-[12px] tracking-[0.2em] uppercase">{t("videoBadge", l)}</p>
              </div>
            </div>
          )}
        </div>
        <div className="px-7 md:px-9 py-7 mt-4 text-right">
          <button onClick={onClose} className="rounded-full border border-primary/40 text-primary px-7 py-2.5 text-[13px] tracking-[0.12em] uppercase hover:bg-primary hover:text-primary-foreground transition">
            {t("closeBtn", l)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────
function Card({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const l = useLocale();
  return (
    <article
      className="bg-card rounded-[12px] overflow-hidden shadow-[0_2px_6px_-2px_rgba(70,80,75,0.05),0_36px_64px_-32px_rgba(70,80,75,0.32)] flex flex-col h-full cursor-pointer group"
      onClick={onOpen}
    >
      <div className="relative">
        <ImgWithMark src={item.cover} className="aspect-[5/4]" />
        {item.hasVideo && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/75 text-cream px-2.5 py-1 text-[10.5px] tracking-[0.18em] uppercase">
            <Play size={11} fill="currentColor" /> {t("videoBadge", l)}
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-sage-soft/40 text-ink/75 px-2.5 py-1 text-[11px] font-medium">
          <Calendar size={11} /> {item.date[l]}
        </div>
        <h3 className="font-serif text-[20px] text-ink font-semibold mt-3 leading-tight group-hover:text-primary transition-colors">
          {item.title[l]}
        </h3>
        <p className="text-ink/60 text-[12.5px] mt-1 flex items-center gap-1.5"><MapPin size={12} />{item.location[l]}</p>
        <p className="mt-3 text-[13.5px] text-ink/80 leading-[1.85] font-serif flex-1">{item.description[l]}</p>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
type Filter = "all" | "photos" | "videos" | "group" | "destination";

export function GalleryPage() {
  const l = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [detail, setDetail] = useState<GalleryItem | null>(null);

  const sorted = useMemo(() => [...items].sort((a, b) => b.dateISO.localeCompare(a.dateISO)), []);
  const featured = sorted.find((i) => i.featured) ?? sorted[0];
  const rest = sorted.filter((i) => i.id !== featured.id);

  const filtered = useMemo(() => {
    return rest.filter((i) => {
      if (filter === "all") return true;
      if (filter === "photos") return !i.hasVideo;
      if (filter === "videos") return i.hasVideo;
      return i.category === filter;
    });
  }, [rest, filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("filterAll", l) },
    { key: "photos", label: t("filterPhotos", l) },
    { key: "videos", label: t("filterVideos", l) },
    { key: "group", label: t("filterGroup", l) },
    { key: "destination", label: t("filterDest", l) },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-cream pt-24 md:pt-32 pb-16 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-primary/75">
              <StarMark size={18} className="text-primary/65" />
              <DottedLine length={36} className="text-primary/45" />
              <span className="text-[11px] tracking-[0.4em] uppercase font-medium">— {t("heroEyebrow", l)}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
              {t("heroTitle", l)}
            </h1>
            <p className="mt-7 text-ink/65 leading-[2] text-[15px] max-w-xl">{t("heroSub", l)}</p>
          </div>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      {/* Featured */}
      <section className="bg-paper/40 pt-16 md:pt-20 pb-12">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-center gap-3 text-primary/75 mb-6">
            <span className="text-[11px] tracking-[0.4em] uppercase font-medium">— {t("featuredEyebrow", l)}</span>
          </div>
          <article
            className="grid md:grid-cols-2 gap-0 bg-card rounded-[14px] overflow-hidden shadow-[0_36px_72px_-36px_rgba(70,80,75,0.32)] cursor-pointer group"
            onClick={() => setDetail(featured)}
          >
            <div className="relative">
              <ImgWithMark src={featured.cover} className="aspect-[5/4] md:aspect-auto md:h-full" />
              {featured.hasVideo && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-ink/75 text-cream px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
                  <Play size={12} fill="currentColor" /> {t("videoBadge", l)}
                </div>
              )}
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-sage-soft/50 text-ink/80 px-3 py-1.5 text-[12px] font-medium">
                <Calendar size={12} /> {featured.date[l]}
              </div>
              <h2 className="font-serif text-3xl md:text-[36px] text-ink font-semibold mt-4 leading-tight group-hover:text-primary transition-colors">
                {featured.title[l]}
              </h2>
              <p className="text-ink/65 text-[13px] mt-2 flex items-center gap-1.5"><MapPin size={13} />{featured.location[l]}</p>
              <p className="mt-5 text-[14.5px] text-ink/80 leading-[2] font-serif">{featured.description[l]}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Latest uploads with filters */}
      <section className="bg-paper/40 pb-28 md:pb-36">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <h2 className="font-serif text-3xl md:text-[40px] text-ink font-medium tracking-[-0.01em]">
              {t("latestSection", l)}
            </h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={
                    "rounded-full px-4 py-2 text-[12px] tracking-[0.1em] uppercase transition " +
                    (filter === f.key
                      ? "bg-primary text-primary-foreground"
                      : "border border-primary/30 text-ink/70 hover:border-primary hover:text-primary")
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-ink/55 text-[14px] py-16">—</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              {filtered.map((it) => (
                <Card key={it.id} item={it} onOpen={() => setDetail(it)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {detail && <Detail item={detail} onClose={() => setDetail(null)} />}
    </SiteLayout>
  );
}
