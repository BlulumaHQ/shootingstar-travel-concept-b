import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import tourBanff from "@/assets/tour-banff.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import tourVancouver from "@/assets/tour-vancouver.jpg";
import tourVictoria from "@/assets/tour-victoria.jpg";
import tourPrivate from "@/assets/tour-private.jpg";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "精選行程 | Shootingstar Travel" },
      { name: "description", content: "瀏覽 Shootingstar Travel 加拿大小團精選行程：洛磯山、班夫、極光、溫哥華、維多利亞與私人包團。" },
      { property: "og:title", content: "精選行程 | Shootingstar Travel" },
      { property: "og:description", content: "加拿大小團精選旅程，由在地團隊用心策劃。" },
      { property: "og:image", content: tourBanff },
    ],
  }),
  component: ToursPage,
});

const tours = [
  { img: tourRockies, title: "洛磯山經典團", days: "7 天 6 夜", price: "CAD $1,890 起", desc: "深入班夫、露易絲湖與夢蓮湖，從晨霧到星空，完整收藏洛磯山的每一道光。" },
  { img: tourBanff, title: "班夫國家公園一日遊", days: "1 日", price: "CAD $189 起", desc: "從溫哥華出發，輕鬆探訪加拿大國寶級山湖景致。" },
  { img: tourAurora, title: "極光追蹤之旅", days: "5 晚", price: "CAD $2,490 起", desc: "育空與黃刀夜空下的追光行程，搭配舒適小木屋。" },
  { img: tourVancouver, title: "溫哥華市區深度遊", days: "1 日", price: "CAD $129 起", desc: "在地嚮導帶你走進史丹利公園與 Granville Island。" },
  { img: tourVictoria, title: "維多利亞花園之旅", days: "1 日", price: "CAD $219 起", desc: "渡輪 + 布查特花園 + 古典市區漫步。" },
  { img: tourPrivate, title: "私人包團服務", days: "客製", price: "報價依需求", desc: "為你與家人朋友量身打造的專屬旅程。" },
];

function ToursPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <p className="font-hand text-clay text-2xl">— featured journeys</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-2">精選行程</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">每段旅程都由在地團隊親自策劃，小團精緻、節奏舒適。</p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {tours.map((t) => (
            <article key={t.title} className="paper-card rounded-xl overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between text-xs text-clay uppercase tracking-widest">
                  <span>{t.days}</span><span>{t.price}</span>
                </div>
                <h3 className="font-serif text-2xl mt-3">{t.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                <Link to="/contact" className="mt-5 inline-flex items-center text-primary hover:underline text-sm">立即預約 →</Link>
              </div>
            </article>
          ))}
        </div>

        {/* Booking placeholder */}
        <div className="mt-20 paper-card rounded-2xl p-10 md:p-14 text-center">
          <p className="font-hand text-clay text-2xl">— booking</p>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">即時預約系統</h2>
          <p className="mt-4 text-muted-foreground">即將整合 Checkfront / Rezdy 線上預約，讓您直接挑選日期與名額。</p>
          <Link to="/contact" className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 text-primary-foreground">先填寫詢問單</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
