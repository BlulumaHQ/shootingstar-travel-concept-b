import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import banff from "@/assets/tour-banff.jpg";
import jasper from "@/assets/dest-jasper.jpg";
import vancouver from "@/assets/tour-vancouver.jpg";
import whistler from "@/assets/dest-whistler.jpg";
import victoria from "@/assets/tour-victoria.jpg";
import yukon from "@/assets/dest-yukon.jpg";
import aurora from "@/assets/tour-aurora.jpg";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "目的地 | Shootingstar Travel" },
      { name: "description", content: "從班夫到極光，探索加拿大最值得收藏的目的地。" },
      { property: "og:title", content: "目的地 | Shootingstar Travel" },
      { property: "og:description", content: "Banff、Jasper、Vancouver、Whistler、Victoria、Yukon、Aurora。" },
      { property: "og:image", content: jasper },
    ],
  }),
  component: DestPage,
});

const items = [
  { img: banff, name: "Banff", zh: "班夫", note: "湖光雪峰，加拿大最經典的明信片風景。" },
  { img: jasper, name: "Jasper", zh: "傑士伯", note: "暗夜星空保護區，靜謐而深邃。" },
  { img: vancouver, name: "Vancouver", zh: "溫哥華", note: "山與海之間的城市生活。" },
  { img: whistler, name: "Whistler", zh: "惠斯勒", note: "冬日滑雪、夏日山徑的度假名所。" },
  { img: victoria, name: "Victoria", zh: "維多利亞", note: "英倫風情與布查特花園。" },
  { img: yukon, name: "Yukon", zh: "育空", note: "北方曠野與午夜陽光。" },
  { img: aurora, name: "Aurora", zh: "極光", note: "夜空下最浪漫的等待。" },
];

export function DestPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <p className="font-hand text-clay text-2xl">— destinations</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-2">探索目的地</h1>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => (
            <article key={d.name} className="paper-card overflow-hidden rounded-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <p className="font-hand text-clay text-xl">{d.zh}</p>
                <h3 className="font-serif text-2xl">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
