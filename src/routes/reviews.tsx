import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { ReviewCard } from "@/components/site/ReviewCard";
import { useReviews } from "@/data/useReviews";
import { tours } from "@/data/tours";
import { StarMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks, useLocale, type Locale } from "@/i18n/locale";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Traveler Stories — Shooting Star Travel" },
      { name: "description", content: "Real stories from travellers with Shooting Star Travel — share your own journey." },
      { property: "og:title", content: "Traveler Stories — Shooting Star Travel" },
      { property: "og:description", content: "Real stories from travellers with Shooting Star Travel — share your own journey." },
    ],
    links: hreflangLinks("/reviews", "en"),
  }),
  component: ReviewsPage,
});

const T = {
  heroEyebrow: { en: "Real stories from our travelers", zh: "Real stories from our travelers", ko: "Real stories from our travelers" },
  heroTitle: { en: "Traveler Stories", zh: "旅客分享", ko: "여행자 이야기" },
  heroSub: {
    en: "Memories shared by travelers who journeyed with Shooting Star Travel.",
    zh: "看看旅客們與 Shooting Star Travel 一起留下的美好回憶。",
    ko: "Shooting Star Travel과 함께한 여행자들이 남긴 소중한 기억들.",
  },
  shareCta: { en: "Share My Journey", zh: "分享我的旅程", ko: "내 여행 공유하기" },
  placeholderEyebrow: { en: "Coming soon", zh: "敬請期待", ko: "곧 공개됩니다" },
  placeholderTitle: {
    en: "The first traveller stories will appear here soon.",
    zh: "第一批旅客分享即將在這裡出現。",
    ko: "첫 여행자 이야기가 곧 이곳에 소개됩니다.",
  },
  placeholderBody: {
    en: "We are collecting genuine stories from travellers who recently joined our tours. If you have travelled with us, we'd love to share your journey here.",
    zh: "我們正在收集近期參加旅程的旅客分享。如果您曾經與我們同行，歡迎在此留下您的旅程故事。",
    ko: "최근 투어에 함께한 여행자들의 진솔한 이야기를 모으고 있습니다. 함께 여행하셨다면, 당신의 이야기를 들려주세요.",
  },
  closeBtn: { en: "Close", zh: "關閉", ko: "닫기" },
  shareTitle: { en: "Share your journey", zh: "分享你的旅程", ko: "내 여행 공유하기" },
  shareName: { en: "Name", zh: "姓名", ko: "이름" },
  shareEmail: { en: "Email", zh: "Email", ko: "이메일" },
  shareRate: { en: "Rate this journey", zh: "為這段旅程評分", ko: "이 여정 평가하기" },
  shareStory: { en: "The story you'd like to share…", zh: "想分享的旅程故事…", ko: "공유하고 싶은 이야기…" },
  shareUpload: { en: "📷 Upload travel photos (5–6 max)", zh: "📷 上傳旅行照片（最多 5–6 張）", ko: "📷 여행 사진 업로드 (최대 5–6장)" },
  shareSubmit: { en: "Submit", zh: "送出", ko: "제출" },
  chooseTour: { en: "Choose a tour", zh: "選擇行程", ko: "투어 선택" },
  thankYou: { en: "Thank you for sharing!", zh: "感謝你的分享！", ko: "공유해 주셔서 감사합니다!" },
  thankBody: {
    en: "Your story has joined our traveller's journal. We can't wait for the next time our paths cross.",
    zh: "你的故事已加入我們的旅行日誌，期待下次旅途再相見。",
    ko: "당신의 이야기가 우리의 여행 일지에 더해졌습니다.",
  },
} as const;

const t = (k: keyof typeof T, l: Locale) => T[k][l] ?? T[k].en;

function ShareModal({ onClose }: { onClose: () => void }) {
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

export function ReviewsPage() {
  const l = useLocale();
  const reviews = useReviews();
  const [shareOpen, setShareOpen] = useState(false);

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

      {/* Reviews grid */}
      <section className="bg-paper/40 pt-12 md:pt-16 pb-28 md:pb-36">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          {reviews.length === 0 ? (
            <div className="max-w-[760px] mx-auto">
              <div className="rounded-2xl border border-dashed border-primary/30 bg-cream/70 px-7 py-12 md:px-12 md:py-16 text-center shadow-[0_20px_50px_-30px_oklch(0.55_0.04_152/0.45)]">
                <div className="inline-flex items-center gap-2 text-primary/75">
                  <StarMark size={14} className="text-primary/65" />
                  <span className="text-[10.5px] tracking-[0.4em] uppercase font-medium">{t("placeholderEyebrow", l)}</span>
                </div>
                <h2 className="mt-5 font-serif text-[24px] md:text-[30px] text-ink leading-[1.35] tracking-[-0.01em]">
                  {t("placeholderTitle", l)}
                </h2>
                <p className="mt-5 text-ink/65 leading-[2] text-[14.5px] max-w-md mx-auto">
                  {t("placeholderBody", l)}
                </p>
                <button
                  onClick={() => setShareOpen(true)}
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[13px] tracking-[0.12em] uppercase hover:bg-primary/90 transition shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]"
                >
                  <Heart size={13} strokeWidth={1.6} /> {t("shareCta", l)}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {reviews.map((r, i) => (
                  <ReviewCard key={i} r={r} />
                ))}
              </div>
              <div className="mt-14 text-center">
                <button
                  onClick={() => setShareOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[13px] tracking-[0.12em] uppercase hover:bg-primary/90 transition shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]"
                >
                  <Heart size={13} strokeWidth={1.6} /> {t("shareCta", l)}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
    </SiteLayout>
  );
}
