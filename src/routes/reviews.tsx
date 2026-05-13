import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import g1 from "@/assets/guest-1.jpg";
import g2 from "@/assets/guest-2.jpg";
import g3 from "@/assets/guest-3.jpg";
import tourBanff from "@/assets/tour-banff.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import { Star, Heart } from "lucide-react";
import { tours } from "@/data/tours";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "旅客分享 | Shootingstar Travel" },
      { name: "description", content: "來自世界各地旅人的真實旅行故事、照片與回憶。" },
      { property: "og:title", content: "旅客分享 | Shootingstar Travel" },
      { property: "og:description", content: "真實旅客分享、照片與旅行記憶。" },
      { property: "og:image", content: g1 },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [
  { img: g1, photo: tourBanff, name: "Mei-Lin Chen", country: "Taipei, TW", tour: "落磯山經典團", rating: 5, text: "走進班夫的那一刻，我終於懂得什麼叫『被風景擁抱』。導遊細心，整趟旅程沒有趕路的緊張感。" },
  { img: g2, photo: tourAurora, name: "Jihoon Park", country: "Seoul, KR", tour: "極光追蹤之旅", rating: 5, text: "韓語導遊細心又溫柔，整趟旅程像和老朋友出遊。極光出現的那夜，我們都沉默了。" },
  { img: g3, photo: tourRockies, name: "The Wong Family", country: "Hong Kong", tour: "落磯山經典團", rating: 5, text: "一家人最棒的回憶，孩子說明年還要再來。冰原大道的雪白讓人心都靜下來。" },
  { img: g1, photo: tourBanff, name: "Rachel L.", country: "Vancouver, CA", tour: "班夫一日遊", rating: 5, text: "短短一天卻完整收藏經典湖景，行程順暢、講解清楚，回家立刻分享給朋友。" },
  { img: g2, photo: tourAurora, name: "小柔", country: "Taichung, TW", tour: "極光追蹤之旅", rating: 5, text: "在 -25 度等到極光的瞬間，覺得一切都值得。工作人員幫我們拍了好多人生美照。" },
  { img: g3, photo: tourRockies, name: "Daniel K.", country: "Toronto, CA", tour: "哥倫比亞冰原大道", rating: 4, text: "天空步道很值得，導遊也很有耐心。希望午餐可以再多一點選擇。" },
];

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
              您的內容將由管理員審核後發布。
            </p>
            <button onClick={onClose} className="mt-6 rounded-full bg-primary text-primary-foreground px-7 py-2.5 text-sm">關閉</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl text-ink font-semibold">分享我的旅程</h3>
              <button type="button" onClick={onClose} className="text-ink/50 text-xl">×</button>
            </div>
            <p className="text-[12.5px] text-ink/55">所有分享將由管理員審核後刊登。</p>
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
              📷 上傳照片（拖曳或點擊選擇 — 示意）
            </div>
            <label className="flex items-start gap-2 text-[12.5px] text-ink/65">
              <input type="checkbox" required className="mt-0.5" />
              <span>我同意 Shootingstar Travel 在審核後使用我的內容於官方網站。</span>
            </label>
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
                每一段旅程，都是旅人寫下的真實故事。歡迎分享你的回憶，讓下一位旅人因為你而出發。
              </p>
            </div>
            <button onClick={() => setOpen(true)} className="self-start md:self-end inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[14px] hover:bg-primary/90 transition">
              <Heart size={14} /> 分享我的旅程
            </button>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-24 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {reviews.map((r, i) => (
              <article key={i} className="bg-card rounded-[6px] overflow-hidden shadow-[0_2px_4px_-2px_rgba(70,80,75,0.06),0_18px_36px_-22px_rgba(70,80,75,0.22)] flex flex-col">
                <div className="aspect-[5/4] overflow-hidden">
                  <img src={r.photo} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-[oklch(0.7_0.18_70)]">
                      {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} fill="currentColor" stroke="none" />)}
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-primary border border-primary/40 rounded-full px-2 py-0.5">Admin Approved</span>
                  </div>
                  <p className="mt-3 text-[13.5px] text-ink/75 leading-[1.9] flex-1">{r.text}</p>
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
                    <img src={r.img} alt={r.name} className="h-9 w-9 rounded-full object-cover" />
                    <div className="leading-tight">
                      <p className="text-[13px] text-ink font-medium">{r.name}</p>
                      <p className="text-[11px] text-ink/55">{r.country} · {r.tour}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
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
