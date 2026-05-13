import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { tours } from "@/data/tours";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/site/ReviewCard";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "旅客分享 | Shootingstar Travel" },
      { name: "description", content: "來自世界各地旅人的真實旅行故事、照片與回憶。" },
      { property: "og:title", content: "旅客分享 | Shootingstar Travel" },
      { property: "og:description", content: "真實旅客分享、照片與旅行記憶。" },
      { property: "og:image", content: reviews[0].photos[0] },
    ],
  }),
  component: ReviewsPage,
});

function ShareModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-cream rounded-2xl max-w-lg w-full p-7 md:p-9 my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <div className="text-center py-6">
            <p className="font-marker text-primary text-sm tracking-[0.25em] uppercase">— thank you</p>
            <h3 className="font-serif text-2xl text-ink mt-3">感謝分享！</h3>
            <p className="mt-4 text-ink/70 leading-[2] text-[14.5px]">
              你的故事已收進旅人手札，我們很期待下一段相遇。
            </p>
            <button onClick={onClose} className="mt-6 rounded-full bg-primary text-primary-foreground px-7 py-2.5 text-sm">關閉</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl text-ink font-semibold">分享我的旅程</h3>
              <button type="button" onClick={onClose} className="text-ink/50 text-xl">×</button>
            </div>
            <input required placeholder="姓名" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <input required type="email" placeholder="Email" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <select required defaultValue="" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm">
              <option value="" disabled>選擇參加的行程</option>
              {tours.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
            </select>
            <div>
              <label className="block text-[12px] text-ink/60 mb-1.5">為這趟旅程評分</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((n) => (
                  <button type="button" key={n} className="text-primary"><Star size={20} fill="currentColor" /></button>
                ))}
              </div>
            </div>
            <textarea required rows={4} placeholder="想分享的旅程故事…" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <div className="rounded-md border border-dashed border-border px-3 py-6 text-center text-[12.5px] text-ink/55">
              📷 上傳旅行照片（可選 5–6 張，示意）
            </div>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14px]">送出分享</button>
          </form>
        )}
      </div>
    </div>
  );
}

function ReviewsPage() {
  const [open, setOpen] = useState(false);
  return (
    <SiteLayout>
      <section className="bg-cream pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-marker text-primary/80 text-sm tracking-[0.3em] uppercase">— traveller voices</p>
              <h1 className="font-serif text-4xl md:text-5xl text-ink mt-3 font-medium">旅客分享</h1>
              <p className="mt-5 text-ink/65 max-w-xl leading-[2] text-[15px]">
                每段旅程都是旅人寫下的真實故事。歡迎分享你的回憶，讓下一位旅人因為你而出發。
              </p>
            </div>
            <button onClick={() => setOpen(true)} className="self-start md:self-end inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[14px] hover:bg-primary/90 transition">
              <Heart size={14} /> 分享我的旅程
            </button>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-24 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {reviews.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>

          <div className="mt-14 text-center">
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-primary/50 text-primary px-8 py-3 text-sm hover:bg-primary hover:text-primary-foreground transition">
              <Heart size={14} /> 分享我的旅程
            </button>
          </div>
        </div>
      </section>

      {open && <ShareModal onClose={() => setOpen(false)} />}
    </SiteLayout>
  );
}
