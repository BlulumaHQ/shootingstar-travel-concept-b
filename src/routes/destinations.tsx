import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import banff from "@/assets/tour-banff.webp";
import jasper from "@/assets/dest-jasper.jpg";
import vancouver from "@/assets/tour-vancouver.webp";
import whistler from "@/assets/dest-whistler.webp";
import victoria from "@/assets/tour-victoria.webp";
import yukon from "@/assets/dest-yukon.webp";
import aurora from "@/assets/tour-aurora.webp";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Shooting Star Travel" },
      { name: "description", content: "From Banff to the aurora — explore the Canadian destinations most worth keeping." },
      { property: "og:title", content: "Destinations — Shooting Star Travel" },
      { property: "og:description", content: "Banff, Jasper, Vancouver, Whistler, Victoria, Yukon and the aurora." },
      { property: "og:image", content: jasper },
    ],
    links: hreflangLinks("/destinations", "zh"),
  }),
  component: DestPage,
});

const items = [
  { img: banff, name: "Banff", caption: "Postcard", note: "Lakes and snow-capped peaks — Canada's most iconic landscape." },
  { img: jasper, name: "Jasper", caption: "Dark Sky", note: "A Dark Sky Preserve — quiet, deep, contemplative." },
  { img: vancouver, name: "Vancouver", caption: "City", note: "Life lived between the mountains and the sea." },
  { img: whistler, name: "Whistler", caption: "Resort", note: "Winter slopes, summer trails — the alpine resort favourite." },
  { img: victoria, name: "Victoria", caption: "Gardens", note: "British charm and the Butchart Gardens." },
  { img: yukon, name: "Yukon", caption: "Wilderness", note: "Northern wilderness and midnight sun." },
  { img: aurora, name: "Aurora", caption: "Night Sky", note: "The most romantic kind of waiting, beneath the night sky." },
];

export function DestPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <p className="font-hand text-clay text-2xl">— destinations</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-2">Explore destinations</h1>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => (
            <article key={d.name} className="paper-card overflow-hidden rounded-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <p className="font-hand text-clay text-xl">{d.caption}</p>
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
