import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { Star, Heart, Upload, X, Play, MapPin, Calendar } from "lucide-react";
import { tours } from "@/data/tours";
import { reviews } from "@/data/reviews";
import { useReviews } from "@/data/useReviews";
import { ReviewCard } from "@/components/site/ReviewCard";
import { StarMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks, useLocale, type Locale } from "@/i18n/locale";
import logo from "@/assets/logo.png";

// Owner post media
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

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Journey Stories — Shooting Star Travel" },
      { name: "description", content: "Real moments from our tours, shared by our team and travellers." },
      { property: "og:title", content: "Journey Stories — Shooting Star Travel" },
      { property: "og:description", content: "Real moments from our tours, shared by our team and travellers." },
      { property: "og:image", content: reviews[0].photos[0] },
    ],
    links: hreflangLinks("/reviews", "en"),
  }),
  component: ReviewsPage,
});

// ── i18n helper for this page ─────────────────────────────────────────
const T = {
  heroTitle: { en: "Journey Stories", zh: "旅程分享", ko: "여행 이야기" },
  heroSub: {
    en: "Real moments from our tours, shared by our team and travellers.",
    zh: "來自旅程現場與旅客回憶的真實分享。",
    ko: "투어 현장과 여행자들이 남긴 실제 여행 순간들입니다.",
  },
  shareCta: { en: "Share My Journey", zh: "分享我的旅程", ko: "내 여행 공유하기" },
  ownerCta: { en: "Owner Upload Preview", zh: "Owner Upload Preview", ko: "Owner Upload Preview" },
  previewNote: {
    en: "Preview only. Admin upload system will be connected later.",
    zh: "目前為展示版，之後會連接後台上傳系統。",
    ko: "현재는 미리보기이며, 관리자 업로드 시스템은 추후 연결됩니다.",
  },
  ownerSection: { en: "Latest Journey Updates", zh: "最新旅程分享", ko: "최신 여행 공유" },
  ownerEyebrow: { en: "From the Studio", zh: "團隊現場直送", ko: "스튜디오에서" },
  travellerSection: { en: "Traveller Reviews", zh: "旅客心得", ko: "여행자 후기" },
  travellerEyebrow: { en: "Travellers' Voices", zh: "旅客的聲音", ko: "여행자의 목소리" },
  travellerBody: {
    en: "Each journey is a real story written by a traveller. Share yours, so the next traveller can set off because of you.",
    zh: "每段旅程都是旅人親手寫下的故事。分享你的回憶，讓下一位旅人因為你出發。",
    ko: "각 여정은 여행자가 직접 쓴 진짜 이야기입니다. 당신의 이야기를 들려주세요.",
  },
  viewJourney: { en: "View Journey", zh: "查看旅程", ko: "여정 보기" },
  videoBadge: { en: "Video", zh: "影片", ko: "영상" },
  closeBtn: { en: "Close", zh: "關閉", ko: "닫기" },
  // owner modal
  ownerModalTitle: { en: "Owner Journey Upload", zh: "Owner Journey Upload", ko: "Owner Journey Upload" },
  fieldDate: { en: "Tour date", zh: "旅程日期", ko: "투어 날짜" },
  fieldTour: { en: "Tour name", zh: "行程名稱", ko: "투어 이름" },
  fieldDest: { en: "Destination / location", zh: "目的地 / 地點", ko: "목적지 / 위치" },
  fieldCaption: { en: "Caption", zh: "說明文字", ko: "캡션" },
  fieldPhotos: { en: "Upload photos", zh: "上傳照片", ko: "사진 업로드" },
  fieldVideo: { en: "Upload video", zh: "上傳影片", ko: "동영상 업로드" },
  publish: { en: "Publish", zh: "發佈", ko: "게시하기" },
  uploadHint: { en: "Click or drop files here (mock)", zh: "點擊或拖曳檔案（展示版）", ko: "파일을 클릭하거나 끌어다 놓기 (미리보기)" },
  publishSuccess: {
    en: "Preview saved. Real upload system will be connected later.",
    zh: "展示資料已儲存。正式上傳系統之後會再連接。",
    ko: "미리보기 자료가 저장되었습니다. 실제 업로드 시스템은 추후 연결됩니다.",
  },
  chooseTour: { en: "Choose a tour", zh: "選擇行程", ko: "투어 선택" },
  // share modal
  shareTitle: { en: "Share your journey", zh: "分享你的旅程", ko: "내 여행 공유하기" },
  shareName: { en: "Name", zh: "姓名", ko: "이름" },
  shareEmail: { en: "Email", zh: "Email", ko: "이메일" },
  shareRate: { en: "Rate this journey", zh: "為這段旅程評分", ko: "이 여정 평가하기" },
  shareStory: { en: "The story you'd like to share…", zh: "想分享的旅程故事…", ko: "공유하고 싶은 이야기…" },
  shareUpload: { en: "📷 Upload travel photos (5–6 max, illustrative)", zh: "📷 上傳旅行照片（最多 5–6 張）", ko: "📷 여행 사진 업로드 (최대 5–6장)" },
  shareSubmit: { en: "Submit", zh: "送出", ko: "제출" },
  thankYou: { en: "Thank you for sharing!", zh: "感謝你的分享！", ko: "공유해 주셔서 감사합니다!" },
  thankBody: {
    en: "Your story has joined our traveller's journal. We can't wait for the next time our paths cross.",
    zh: "你的故事已加入我們的旅行日誌，期待下次旅途再相見。",
    ko: "당신의 이야기가 우리의 여행 일지에 더해졌습니다. 다음 여정에서 또 만나요.",
  },
} as const;

const t = (k: keyof typeof T, l: Locale) => T[k][l] ?? T[k].en;

// ── Owner journey mock data ───────────────────────────────────────────
type OwnerPost = {
  id: string;
  dateISO: string;
  date: Record<Locale, string>;
  tour: Record<Locale, string>;
  destination: Record<Locale, string>;
  caption: Record<Locale, string>;
  photos: string[];
  hasVideo: boolean;
};

const ownerPosts: OwnerPost[] = [
  {
    id: "rockies-3day-jul12",
    dateISO: "2026-07-12",
    date: { en: "July 12, 2026", zh: "2026 年 7 月 12 日", ko: "2026년 7월 12일" },
    tour: {
      en: "Rocky Mountains 3-Day Tour",
      zh: "洛磯山脈三日遊",
      ko: "로키 마운틴 3일 투어",
    },
    destination: {
      en: "Banff · Lake Louise · Columbia Icefield",
      zh: "Banff・Lake Louise・哥倫比亞冰原",
      ko: "밴프 · 레이크 루이스 · 콜롬비아 아이스필드",
    },
    caption: {
      en: "A beautiful summer Rockies group with clear lake views, glacier scenery, and a smooth Calgary round-trip journey.",
      zh: "夏日洛磯山脈小團，湖面清澈、冰原壯麗，Calgary 來回行程順暢舒服。",
      ko: "맑은 호수와 빙하 풍경, 캘거리 왕복까지 매끄럽게 이어진 여름 로키 소그룹 여정이었습니다.",
    },
    photos: [b1, b2, b3, b4, b5, b6],
    hasVideo: false,
  },
  {
    id: "banff-two-lake-jul18",
    dateISO: "2026-07-18",
    date: { en: "July 18, 2026", zh: "2026 年 7 月 18 日", ko: "2026년 7월 18일" },
    tour: {
      en: "Banff Two-Lake Tour 1-Day",
      zh: "Banff 雙湖一日遊",
      ko: "밴프 투-레이크 1일 투어",
    },
    destination: {
      en: "Lake Louise & Moraine Lake",
      zh: "Lake Louise 與 Moraine Lake",
      ko: "레이크 루이스 & 모레인 레이크",
    },
    caption: {
      en: "A relaxed one-day lake tour with bright weather, soft mountain light, and happy travellers enjoying the classic Banff scenery.",
      zh: "天氣好、光線柔，輕鬆的雙湖一日遊，旅客笑得很開心，把 Banff 經典畫面一次收齊。",
      ko: "맑은 날씨와 부드러운 산빛 아래, 여행자들이 밴프의 클래식한 풍경을 마음껏 즐긴 여유로운 호수 1일 투어.",
    },
    photos: [lake10, lake9, lake13, lake52, lake55],
    hasVideo: true,
  },
  {
    id: "victoria-aug9",
    dateISO: "2026-08-09",
    date: { en: "August 9, 2026", zh: "2026 年 8 月 9 日", ko: "2026년 8월 9일" },
    tour: {
      en: "Victoria 1-Day Tour",
      zh: "維多利亞一日遊",
      ko: "빅토리아 1일 투어",
    },
    destination: {
      en: "Butchart Gardens & Inner Harbour",
      zh: "Butchart Gardens 與 Inner Harbour",
      ko: "부차트 가든 & 이너 하버",
    },
    caption: {
      en: "A colourful coastal day trip with garden highlights, ferry views, and a peaceful walk around Victoria's Inner Harbour.",
      zh: "繽紛海岸一日遊，賞花、搭船、漫步維多利亞內港，慢慢走過一整天。",
      ko: "정원 하이라이트와 페리 풍경, 빅토리아 이너 하버 산책까지 즐긴 다채로운 해안 당일 여행.",
    },
    photos: [v1, v2, v5, v7],
    hasVideo: false,
  },
];

// ── Watermark overlay ─────────────────────────────────────────────────
function Watermark() {
  return (
    <div className="pointer-events-none absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-full bg-cream/70 backdrop-blur-[2px] px-1.5 py-1 shadow-sm">
      <img
        src={logo}
        alt=""
        className="h-7 md:h-9 w-auto opacity-[0.55] select-none"
        draggable={false}
        style={{ maxWidth: 48 }}
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

// ── Existing traveller share modal (kept) ─────────────────────────────
export function ShareModal({ onClose }: { onClose: () => void }) {
  const l = useLocale();
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-cream rounded-2xl max-w-lg w-full p-7 md:p-9 my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <div className="text-center py-6">
            <p className="font-marker text-primary text-sm tracking-[0.25em] uppercase">— thank you</p>
            <h3 className="font-serif text-2xl text-ink mt-3">{t("thankYou", l)}</h3>
            <p className="mt-4 text-ink/70 leading-[2] text-[14.5px]">{t("thankBody", l)}</p>
            <button onClick={onClose} className="mt-6 rounded-full bg-primary text-primary-foreground px-7 py-2.5 text-sm">
              {t("closeBtn", l)}
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl text-ink font-semibold">{t("shareTitle", l)}</h3>
              <button type="button" onClick={onClose} className="text-ink/50 text-xl">×</button>
            </div>
            <input required placeholder={t("shareName", l)} className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <input required type="email" placeholder={t("shareEmail", l)} className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <select required defaultValue="" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm">
              <option value="" disabled>{t("chooseTour", l)}</option>
              {tours.map((tr) => <option key={tr.slug} value={tr.slug}>{tr.title}</option>)}
            </select>
            <div>
              <label className="block text-[12px] text-ink/60 mb-1.5">{t("shareRate", l)}</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((n) => (
                  <button type="button" key={n} className="text-primary"><Star size={20} fill="currentColor" /></button>
                ))}
              </div>
            </div>
            <textarea required rows={4} placeholder={t("shareStory", l)} className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <div className="rounded-md border border-dashed border-border px-3 py-6 text-center text-[12.5px] text-ink/55">
              {t("shareUpload", l)}
            </div>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14px]">
              {t("shareSubmit", l)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Mock owner upload modal ───────────────────────────────────────────
function OwnerUploadModal({ onClose }: { onClose: () => void }) {
  const l = useLocale();
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-cream rounded-2xl max-w-xl w-full p-7 md:p-9 my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <div className="text-center py-6">
            <p className="font-marker text-primary text-sm tracking-[0.25em] uppercase">— preview</p>
            <h3 className="font-serif text-2xl text-ink mt-3">✓</h3>
            <p className="mt-4 text-ink/70 leading-[2] text-[14.5px]">{t("publishSuccess", l)}</p>
            <button onClick={onClose} className="mt-6 rounded-full bg-primary text-primary-foreground px-7 py-2.5 text-sm">
              {t("closeBtn", l)}
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-marker text-primary text-[11px] tracking-[0.3em] uppercase">— admin preview</p>
                <h3 className="font-serif text-2xl text-ink font-semibold mt-1">{t("ownerModalTitle", l)}</h3>
              </div>
              <button type="button" onClick={onClose} className="text-ink/50 text-xl"><X size={20} /></button>
            </div>
            <p className="text-[12px] text-ink/55 italic">{t("previewNote", l)}</p>

            <div>
              <label className="block text-[12px] text-ink/65 mb-1.5">{t("fieldDate", l)}</label>
              <input type="date" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-[12px] text-ink/65 mb-1.5">{t("fieldTour", l)}</label>
              <select defaultValue="" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm">
                <option value="" disabled>{t("chooseTour", l)}</option>
                {tours.map((tr) => <option key={tr.slug} value={tr.slug}>{tr.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-ink/65 mb-1.5">{t("fieldDest", l)}</label>
              <input className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-[12px] text-ink/65 mb-1.5">{t("fieldCaption", l)}</label>
              <textarea rows={3} className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] text-ink/65 mb-1.5">{t("fieldPhotos", l)}</label>
                <div className="rounded-md border border-dashed border-border px-3 py-6 text-center text-[12px] text-ink/55">
                  <Upload size={16} className="inline mr-1" /> {t("uploadHint", l)}
                </div>
              </div>
              <div>
                <label className="block text-[12px] text-ink/65 mb-1.5">{t("fieldVideo", l)}</label>
                <div className="rounded-md border border-dashed border-border px-3 py-6 text-center text-[12px] text-ink/55">
                  <Play size={16} className="inline mr-1" /> {t("uploadHint", l)}
                </div>
              </div>
            </div>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14px]">
              {t("publish", l)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Journey detail modal ──────────────────────────────────────────────
function JourneyDetail({ post, onClose }: { post: OwnerPost; onClose: () => void }) {
  const l = useLocale();
  return (
    <div className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-cream rounded-2xl max-w-4xl w-full my-8 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-7 md:px-9 pt-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sage-soft/40 text-ink/75 px-3 py-1 text-[11.5px]">
              <Calendar size={12} /> {post.date[l]}
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-ink font-semibold mt-3">{post.tour[l]}</h3>
            <p className="text-ink/65 text-[13px] mt-1 flex items-center gap-1.5"><MapPin size={13} />{post.destination[l]}</p>
          </div>
          <button onClick={onClose} className="text-ink/50 p-1"><X size={22} /></button>
        </div>
        <div className="px-7 md:px-9 mt-5">
          <p className="text-ink/80 leading-[2] text-[14.5px] font-serif">{post.caption[l]}</p>
        </div>
        <div className="px-7 md:px-9 mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {post.photos.map((p, i) => (
            <ImgWithMark key={i} src={p} className="aspect-[4/3] rounded-lg" />
          ))}
          {post.hasVideo && (
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

// ── Owner post card ───────────────────────────────────────────────────
function OwnerPostCard({ post, onOpen }: { post: OwnerPost; onOpen: () => void }) {
  const l = useLocale();
  const thumbs = post.photos.slice(1, 4);
  return (
    <article className="bg-card rounded-[12px] overflow-hidden shadow-[0_2px_6px_-2px_rgba(70,80,75,0.05),0_36px_64px_-32px_rgba(70,80,75,0.32)] flex flex-col h-full">
      <div className="relative">
        <ImgWithMark src={post.photos[0]} className="aspect-[5/4]" />
        {post.hasVideo && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/75 text-cream px-2.5 py-1 text-[10.5px] tracking-[0.18em] uppercase">
            <Play size={11} fill="currentColor" /> {t("videoBadge", l)}
          </div>
        )}
      </div>
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-sage-soft/40 text-ink/70 px-2.5 py-1 text-[11px]">
          <Calendar size={11} /> {post.date[l]}
        </div>
        <h3 className="font-serif text-[20px] md:text-[22px] text-ink font-semibold mt-3 leading-tight">{post.tour[l]}</h3>
        <p className="text-ink/60 text-[12.5px] mt-1 flex items-center gap-1.5"><MapPin size={12} />{post.destination[l]}</p>
        <p className="mt-4 text-[13.5px] text-ink/80 leading-[1.9] font-serif flex-1">{post.caption[l]}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {thumbs.map((p, i) => (
            <ImgWithMark key={i} src={p} className="aspect-square rounded-md" />
          ))}
        </div>

        <button
          onClick={onOpen}
          className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-[12.5px] tracking-[0.12em] uppercase hover:bg-primary/90 transition"
        >
          {t("viewJourney", l)} →
        </button>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export function ReviewsPage() {
  const l = useLocale();
  const travellerReviews = useReviews();
  const [shareOpen, setShareOpen] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<OwnerPost | null>(null);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-cream pt-24 md:pt-32 pb-20 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-primary/75">
              <StarMark size={18} className="text-primary/65" />
              <DottedLine length={36} className="text-primary/45" />
              <span className="text-[11px] tracking-[0.4em] uppercase font-medium">— Journey Stories</span>
            </div>
            <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
              {t("heroTitle", l)}
            </h1>
            <p className="mt-7 text-ink/65 leading-[2] text-[15px] max-w-xl">{t("heroSub", l)}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShareOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[13px] tracking-[0.12em] uppercase hover:bg-primary/90 transition shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]"
              >
                <Heart size={13} strokeWidth={1.6} /> {t("shareCta", l)}
              </button>
              <button
                onClick={() => setOwnerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-primary/45 text-primary px-6 py-2.5 text-[12.5px] tracking-[0.12em] uppercase hover:bg-primary/5 transition"
              >
                <Upload size={13} strokeWidth={1.8} /> {t("ownerCta", l)}
              </button>
            </div>
          </div>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      {/* Owner journey updates */}
      <section className="bg-paper/50 pt-16 md:pt-20 pb-20 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={16} className="text-primary/65" />
                <span className="text-[11px] tracking-[0.4em] uppercase font-medium">{t("ownerEyebrow", l)}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-4 font-medium tracking-[-0.01em]">
                {t("ownerSection", l)}
              </h2>
            </div>
            <div className="md:text-right max-w-xs">
              <button
                onClick={() => setOwnerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 text-primary px-5 py-2 text-[12px] tracking-[0.12em] uppercase hover:bg-primary hover:text-primary-foreground transition"
              >
                <Upload size={12} /> {t("ownerCta", l)}
              </button>
              <p className="mt-2 text-[11.5px] text-ink/50 italic">{t("previewNote", l)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {ownerPosts.map((p) => (
              <OwnerPostCard key={p.id} post={p} onOpen={() => setDetailPost(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* Traveller reviews */}
      <section className="bg-cream pt-20 md:pt-24 pb-28 md:pb-36">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <Heart size={14} className="text-primary/65" />
                <span className="text-[11px] tracking-[0.4em] uppercase font-medium">{t("travellerEyebrow", l)}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-4 font-medium tracking-[-0.01em]">
                {t("travellerSection", l)}
              </h2>
              <p className="mt-4 max-w-xl text-ink/60 leading-[1.9] text-[14px]">{t("travellerBody", l)}</p>
            </div>
            <button
              onClick={() => setShareOpen(true)}
              className="self-start md:self-end inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-[12.5px] tracking-[0.12em] uppercase hover:bg-primary/90 transition"
            >
              <Heart size={13} /> {t("shareCta", l)}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {travellerReviews.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => setShareOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 text-primary px-8 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground transition"
            >
              <Heart size={13} strokeWidth={1.6} /> {t("shareCta", l)}
            </button>
          </div>
        </div>
      </section>

      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
      {ownerOpen && <OwnerUploadModal onClose={() => setOwnerOpen(false)} />}
      {detailPost && <JourneyDetail post={detailPost} onClose={() => setDetailPost(null)} />}
    </SiteLayout>
  );
}
