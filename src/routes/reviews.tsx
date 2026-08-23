import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { Star, UserCircle, Upload } from "lucide-react";
import { ReviewCard, type Review } from "@/components/site/ReviewCard";
import { useReviews } from "@/data/useReviews";
import { useTours } from "@/data/useTours";
import { StarMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks, useLocale, type Locale } from "@/i18n/locale";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Traveler Stories — Shooting Star Travel" },
      { name: "description", content: "Real stories from travellers with Shooting Star Travel — share your own journey." },
      { property: "og:title", content: "Traveler Stories — Shooting Star Travel" },
      { property: "og:description", content: "Real stories from travellers with Shooting Star Travel — share your own journey." },
    ],
    links: hreflangLinks("/reviews", "zh"),
  }),
  component: ReviewsPage,
});

const T = {
  heroEyebrow: { en: "Share your story", zh: "分享你的旅程", ko: "여행 이야기 공유" },
  heroTitle: { en: "Traveler Stories", zh: "旅客分享", ko: "여행자 이야기" },
  heroSub: {
    en: "Tell us about your journey with Shooting Star Travel. Approved stories appear below.",
    zh: "和我們分享你與 Shooting Star Travel 的旅程，審核通過後將顯示於下方。",
    ko: "Shooting Star Travel과 함께한 여행 이야기를 들려주세요. 승인된 후기는 아래에 표시됩니다.",
  },
  fName: { en: "Name", zh: "姓名", ko: "이름" },
  fAvatar: { en: "Your photo (optional)", zh: "你的頭像（選填）", ko: "프로필 사진(선택)" },
  fRating: { en: "Rating", zh: "評分", ko: "평점" },
  fTour: { en: "Which tour?", zh: "哪個行程？", ko: "어떤 투어?" },
  fReview: { en: "Your review", zh: "你的評論", ko: "후기" },
  fPhotos: { en: "Add photos (up to 5)", zh: "上傳照片（最多 5 張）", ko: "사진 추가(최대 5장)" },
  fSubmit: { en: "Submit", zh: "送出", ko: "제출" },
  fSubmitting: { en: "Submitting…", zh: "送出中…", ko: "전송 중…" },
  warnMax: {
    en: "You can upload up to 5 photos.",
    zh: "最多可上傳 5 張照片。",
    ko: "사진은 최대 5장까지 업로드할 수 있습니다.",
  },
  warnSize: {
    en: "Each photo must be 8 MB or smaller. Please choose a smaller photo.",
    zh: "每張照片大小不可超過 8 MB，請選擇較小的照片。",
    ko: "각 사진은 8MB 이하여야 합니다. 더 작은 사진을 선택해 주세요.",
  },
  warnType: {
    en: "Unsupported file type. Please upload JPEG, PNG, WebP or HEIC images.",
    zh: "不支援的檔案格式，請上傳 JPEG、PNG、WebP 或 HEIC 圖片。",
    ko: "지원하지 않는 형식입니다. JPEG, PNG, WebP 또는 HEIC 이미지를 올려주세요.",
  },
  photoCount: {
    en: "photos",
    zh: "張照片",
    ko: "장",
  },
  removePhoto: { en: "Remove photo", zh: "移除照片", ko: "사진 삭제" },
  errUpload: {
    en: "A photo failed to upload. Nothing was submitted — please try again.",
    zh: "照片上傳失敗，尚未送出評論，請再試一次。",
    ko: "사진 업로드에 실패했습니다. 제출되지 않았으니 다시 시도해 주세요.",
  },

  thanks: {
    en: "Thank you for sharing your journey! Your review will appear after it's approved.",
    zh: "感謝你分享旅程！你的評論將在審核後顯示。",
    ko: "여행 이야기를 공유해 주셔서 감사합니다! 후기는 승인 후 표시됩니다.",
  },
  errSubmit: {
    en: "Something went wrong submitting your review. Please try again.",
    zh: "送出時發生錯誤，請再試一次。",
    ko: "후기 전송 중 문제가 발생했습니다. 다시 시도해 주세요.",
  },
  cta: { en: "Share My Journey", zh: "分享我的旅程", ko: "내 여행 이야기 공유하기" },
  close: { en: "Close", zh: "關閉", ko: "닫기" },
  chooseTour: { en: "Choose a tour", zh: "選擇行程", ko: "투어 선택" },

  sortLabel: { en: "Sort", zh: "排序", ko: "정렬" },
  sortHigh: { en: "Rating: High to Low", zh: "評分：高到低", ko: "평점: 높은순" },
  sortLow: { en: "Rating: Low to High", zh: "評分：低到高", ko: "평점: 낮은순" },
  filterLabel: { en: "Tour", zh: "行程", ko: "투어" },
  allTours: { en: "All tours", zh: "全部行程", ko: "모든 투어" },
  emptyApproved: {
    en: "Be the first to share your story.",
    zh: "成為第一位分享故事的旅客。",
    ko: "첫 번째 이야기를 들려주세요.",
  },
} as const;

const t = (k: keyof typeof T, l: Locale) => T[k][l] ?? T[k].en;

const BUCKET = "review-photos";

async function uploadImage(file: File): Promise<string> {
  const processed = await compressImage(file);
  const ext = (processed.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, processed, {
    contentType: processed.type || "image/jpeg",
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}


function SubmitForm({ onDone }: { onDone: () => void }) {
  const l = useLocale();
  const tours = useTours();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [tourSlug, setTourSlug] = useState("");
  const [text, setText] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [warn, setWarn] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function onAvatarPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!isAcceptedImage(f)) return setWarn(t("warnType", l));
    if (f.size > MAX_SOURCE_BYTES) return setWarn(t("warnSize", l));
    setWarn("");
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  }

  function onPhotosPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    e.target.value = "";
    let message = "";
    const valid: File[] = [];
    for (const f of picked) {
      if (!isAcceptedImage(f)) { message = t("warnType", l); continue; }
      if (f.size > MAX_SOURCE_BYTES) { message = t("warnSize", l); continue; }
      valid.push(f);
    }
    setPhotoFiles((prev) => {
      const keys = new Set(prev.map(fileKey));
      const merged = [...prev];
      for (const f of valid) {
        if (keys.has(fileKey(f))) continue;
        if (merged.length >= MAX_PHOTOS) { message = t("warnMax", l); break; }
        keys.add(fileKey(f));
        merged.push(f);
      }
      return merged;
    });
    setWarn(message);
  }

  function removePhoto(i: number) {
    setPhotoFiles((prev) => prev.filter((_, n) => n !== i));
    setWarn("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setErr("");
    if (!name.trim() || !tourSlug || !text.trim() || !rating) return;
    if (photoFiles.length > MAX_PHOTOS) return setWarn(t("warnMax", l));
    setBusy(true);
    try {
      const tour = tours.find((tr) => tr.slug === tourSlug);
      const tour_label = tour?.title ?? tourSlug;

      let avatarUrl: string | null = null;
      const photoUrls: string[] = [];
      try {
        if (avatarFile) avatarUrl = await uploadImage(avatarFile);
        for (const f of photoFiles) photoUrls.push(await uploadImage(f));
      } catch (upErr) {
        console.error(upErr);
        setErr(t("errUpload", l));
        return;
      }

      const { error } = await supabase.from("reviews").insert({
        name: name.trim(),
        avatar: avatarUrl,
        tour_slug: tourSlug,
        tour_label,
        rating,
        text: text.trim(),
        photos: photoUrls,
        status: "pending",
      });
      if (error) throw error;
      onDone();
    } catch (e2) {
      console.error(e2);
      setErr(t("errSubmit", l));
    } finally {
      setBusy(false);
    }
  }


  const stars = hoverRating || rating;

  return (
    <form onSubmit={onSubmit} className="bg-cream rounded-2xl shadow-[0_20px_50px_-30px_oklch(0.55_0.04_152/0.4)] border border-border/60 p-7 md:p-10 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[12px] tracking-[0.18em] uppercase text-ink/55 mb-2">{t("fName", l)} *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.18em] uppercase text-ink/55 mb-2">{t("fAvatar", l)}</label>
          <div className="flex items-center gap-3">
            {avatarPreview ? (
              <img src={avatarPreview} alt="" className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-border/60 flex items-center justify-center">
                <UserCircle size={26} className="text-ink/40" />
              </div>
            )}
            <label className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[12px] text-ink/70 hover:bg-paper/60 transition">
              <Upload size={13} /> {t("fAvatar", l)}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onAvatarPick} />
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[12px] tracking-[0.18em] uppercase text-ink/55 mb-2">{t("fRating", l)} *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-[oklch(0.7_0.18_70)] p-1"
              aria-label={`${n} star`}
            >
              <Star size={22} fill={n <= stars ? "currentColor" : "none"} stroke="currentColor" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[12px] tracking-[0.18em] uppercase text-ink/55 mb-2">{t("fTour", l)} *</label>
        <select
          required
          value={tourSlug}
          onChange={(e) => setTourSlug(e.target.value)}
          className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
        >
          <option value="" disabled>{t("chooseTour", l)}</option>
          {tours.map((tr) => (
            <option key={tr.slug} value={tr.slug}>{tr.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[12px] tracking-[0.18em] uppercase text-ink/55 mb-2">{t("fReview", l)} *</label>
        <textarea
          required
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 leading-[1.8]"
        />
      </div>

      <div>
        <label className="block text-[12px] tracking-[0.18em] uppercase text-ink/55 mb-2">{t("fPhotos", l)}</label>
        <div className="flex items-center gap-3 flex-wrap">
          <label className={`inline-flex items-center gap-2 rounded-full border border-dashed border-border px-5 py-3 text-[13px] text-ink/65 transition ${photoFiles.length >= MAX_PHOTOS ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-paper/60"}`}>
            <Upload size={14} /> {t("fPhotos", l)}
            <input
              type="file"
              accept={ACCEPT_ATTR}
              multiple
              disabled={photoFiles.length >= MAX_PHOTOS}
              className="hidden"
              onChange={onPhotosPick}
            />
          </label>
          <span className="text-[12px] text-ink/55 tabular-nums">{photoFiles.length} / {MAX_PHOTOS} {t("photoCount", l)}</span>
        </div>
        {photoFiles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {photoFiles.map((f, i) => (
              <div key={fileKey(f)} className="relative h-20 w-20 rounded-md overflow-hidden border border-border/60">
                <img src={URL.createObjectURL(f)} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label={t("removePhoto", l)}
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-black/60 text-white text-[11px] leading-none cursor-pointer hover:bg-black/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {warn && <p className="mt-2 text-[12px] text-[oklch(0.55_0.18_30)]">{warn}</p>}
      </div>

      {err && <p className="text-[13px] text-destructive">{err}</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-primary text-primary-foreground px-8 py-3 text-[13px] tracking-[0.12em] uppercase hover:bg-primary/90 transition disabled:opacity-60 shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]"
        >
          {busy ? t("fSubmitting", l) : t("fSubmit", l)}
        </button>
      </div>
    </form>
  );
}

export function ReviewsPage() {
  const l = useLocale();
  const reviews = useReviews();
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sortDir, setSortDir] = useState<"high" | "low">("high");
  const [tourFilter, setTourFilter] = useState<string>("all");

  const tourOptions = useMemo(() => {
    const set = new Map<string, string>();
    reviews.forEach((r) => {
      if (r.tour) set.set(r.tour, r.tour);
    });
    return Array.from(set.keys());
  }, [reviews]);

  const visible = useMemo(() => {
    let list: Review[] = reviews.slice();
    if (tourFilter !== "all") list = list.filter((r) => r.tour === tourFilter);
    list.sort((a, b) => (sortDir === "high" ? b.rating - a.rating : a.rating - b.rating));
    return list;
  }, [reviews, sortDir, tourFilter]);

  return (
    <SiteLayout>
      {/* Slim CTA bar */}
      <section className="relative bg-cream pt-24 md:pt-28 pb-10 md:pb-12 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="md:max-w-[60%]">
              <div className="inline-flex items-center gap-3 text-primary/75">
                <StarMark size={16} className="text-primary/65" />
                <DottedLine length={28} className="text-primary/45" />
                <span className="text-[10.5px] tracking-[0.4em] uppercase font-medium">— {t("heroEyebrow", l)}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-[40px] text-ink mt-3 font-medium tracking-[-0.015em] leading-[1.1]">
                {t("heroTitle", l)}
              </h1>
              <p className="mt-3 text-ink/65 leading-[1.7] text-[14px]">{t("heroSub", l)}</p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => { setSubmitted(false); setOpen(true); }}
                className="rounded-full bg-primary text-primary-foreground px-7 py-3 text-[12.5px] tracking-[0.14em] uppercase hover:bg-primary/90 transition shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]"
              >
                {t("cta", l)}
              </button>
            </div>
          </div>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      {/* Approved reviews */}
      <section className="bg-paper/40 pt-12 md:pt-16 pb-28 md:pb-36">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          {reviews.length === 0 ? (
            <p className="text-center text-ink/55 text-[14.5px]">{t("emptyApproved", l)}</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <label className="text-[11.5px] tracking-[0.2em] uppercase text-ink/55">{t("filterLabel", l)}</label>
                  <select
                    value={tourFilter}
                    onChange={(e) => setTourFilter(e.target.value)}
                    className="rounded-md border border-border bg-cream px-3 py-1.5 text-[13px]"
                  >
                    <option value="all">{t("allTours", l)}</option>
                    {tourOptions.map((tr) => (
                      <option key={tr} value={tr}>{tr}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[11.5px] tracking-[0.2em] uppercase text-ink/55">{t("sortLabel", l)}</label>
                  <select
                    value={sortDir}
                    onChange={(e) => setSortDir(e.target.value as "high" | "low")}
                    className="rounded-md border border-border bg-cream px-3 py-1.5 text-[13px]"
                  >
                    <option value="high">{t("sortHigh", l)}</option>
                    <option value="low">{t("sortLow", l)}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {visible.map((r, i) => (
                  <ReviewCard key={i} r={r} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Submit modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto bg-cream p-0 border-border/60">
          <div className="p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <p className="font-marker text-primary text-sm tracking-[0.25em] uppercase">— thank you</p>
                <p className="mt-4 font-serif text-2xl text-ink leading-[1.4]">{t("thanks", l)}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-8 rounded-full border border-border px-6 py-2.5 text-[12px] tracking-[0.14em] uppercase text-ink/70 hover:bg-paper/60 transition"
                >
                  {t("close", l)}
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[10.5px] tracking-[0.4em] uppercase font-medium text-primary/75">— {t("heroEyebrow", l)}</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-ink mt-2 font-medium tracking-[-0.015em]">{t("heroTitle", l)}</h2>
                </div>
                <SubmitForm onDone={() => setSubmitted(true)} />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

