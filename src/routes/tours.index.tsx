import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { tours } from "@/data/tours";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "行程介紹 | Shootingstar Travel" },
      { name: "description", content: "瀏覽 Shootingstar Travel 加拿大小團精選行程：洛磯山、班夫、極光、溫哥華、維多利亞與私人包團。" },
      { property: "og:title", content: "行程介紹 | Shootingstar Travel" },
      { property: "og:description", content: "加拿大小團精選旅程，由在地團隊用心策劃。" },
      { property: "og:image", content: tours[0].img },
    ],
  }),
  component: ToursIndexPage,
});

function ToursIndexPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1280px] px-6 md:px-12 pt-16 md:pt-24 pb-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.3em] uppercase">— featured journeys</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mt-3 font-medium">行程介紹</h1>
        <p className="mt-4 text-ink/65 max-w-2xl leading-[2] text-[15px]">
          每段旅程都由在地團隊親自策劃，小團精緻、節奏舒適。點擊任一行程查看完整介紹。
        </p>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 md:px-12 pb-24 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {tours.map((t) => (
            <Link
              to="/tours/$slug"
              params={{ slug: t.slug }}
              key={t.slug}
              className="group relative bg-card rounded-[6px] p-3 pb-5 shadow-[0_2px_4px_-2px_rgba(70,80,75,0.06),0_18px_36px_-22px_rgba(70,80,75,0.22)] hover:-translate-y-1 transition-all duration-500 block"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-[4px]">
                <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                <button aria-label="Save" onClick={(e) => e.preventDefault()} className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-cream/90 text-primary backdrop-blur-sm hover:bg-cream transition">
                  <Heart size={13} strokeWidth={1.8} />
                </button>
              </div>
              <div className="px-1 pt-4">
                <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50">{t.duration}</p>
                <h3 className="font-serif text-[16px] text-ink leading-snug font-semibold mt-1.5">{t.title}</h3>
                <p className="mt-1.5 text-[12px] text-ink/55 leading-relaxed">{t.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-serif text-[13.5px] text-primary font-semibold">{t.price}</p>
                  <span className="text-[11.5px] text-primary tracking-wide">查看行程 →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
