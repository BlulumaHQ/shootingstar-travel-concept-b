import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import g1 from "@/assets/guest-1.jpg";
import g2 from "@/assets/guest-2.jpg";
import g3 from "@/assets/guest-3.jpg";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "旅客故事 | Shootingstar Travel" },
      { name: "description", content: "來自世界各地旅人在加拿大的真實故事與旅行回憶。" },
      { property: "og:title", content: "旅客故事 | Shootingstar Travel" },
      { property: "og:description", content: "真實旅客分享、照片與旅行記憶。" },
      { property: "og:image", content: g1 },
    ],
  }),
  component: StoriesPage,
});

const items = [
  { img: g1, name: "Mei-Lin Chen", country: "Taipei, Taiwan", lang: "中文", quote: "走進班夫的那一刻，我終於懂得什麼叫『被風景擁抱』。導遊細心，整趟旅程沒有趕路的緊張感。", rating: 5 },
  { img: g2, name: "Jihoon & Soyoung", country: "Seoul, Korea", lang: "한국어", quote: "韓語導遊細心又溫柔，整趟旅程像和老朋友出遊。Lake Louise 的清晨美得像夢。", rating: 5 },
  { img: g3, name: "The Wong Family", country: "Hong Kong", lang: "中文", quote: "一家人最棒的回憶，孩子說明年還要再來。極光出現的那一夜我們都哭了。", rating: 5 },
];

function StoriesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <p className="font-hand text-clay text-2xl">— guest stories</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-2">旅客故事</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">每一位旅人，都是我們最珍惜的故事。</p>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {items.map((s, i) => (
            <div key={s.name} className={`relative polaroid ${i % 2 ? "md:rotate-[2deg]" : "md:rotate-[-2deg]"}`}>
              <span className="tape -top-3 left-10" />
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="pt-5">
                <div className="text-clay">{"★".repeat(s.rating)}</div>
                <p className="font-hand text-2xl text-ink mt-2 leading-snug">"{s.quote}"</p>
                <p className="mt-4 text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.country} · {s.lang}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 paper-card rounded-2xl p-10 md:p-14 text-center">
          <p className="font-hand text-clay text-2xl">— share your memory</p>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">分享你的旅程</h2>
          <p className="mt-3 text-muted-foreground">即將開放線上投稿，讓你的回憶成為下一位旅人的靈感。</p>
        </div>
      </section>
    </SiteLayout>
  );
}
