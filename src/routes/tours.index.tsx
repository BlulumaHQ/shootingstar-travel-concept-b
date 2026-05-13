import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { tours } from "@/data/tours";
import { Heart } from "lucide-react";
import { BusMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "Tours — Shooting Star Travel" },
      { name: "description", content: "Browse Shooting Star Travel's curated small-group journeys across Canada: the Rockies, Banff, the aurora, Vancouver, Victoria and private custom tours." },
      { property: "og:title", content: "Tours — Shooting Star Travel" },
      { property: "og:description", content: "Curated small-group journeys across Canada, designed by our local team." },
      { property: "og:image", content: tours[0].img },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/tours" },
    ],
  }),
  component: ToursIndexPage,
});

export function ToursIndexPage() {
  return (
    <SiteLayout>
      <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-24 md:pt-32 pb-14">
        <div className="flex items-center gap-3 text-primary/75">
          <BusMark size={20} className="text-primary/65" />
          <DottedLine length={36} className="text-primary/45" />
          <span className="text-[11px] tracking-[0.4em] uppercase">Featured Journeys</span>
        </div>
        <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
          Tours
        </h1>
        <p className="mt-7 text-ink/60 max-w-2xl leading-[2] text-[15px]">
          Each journey is shaped by our local team — small groups, considered pace. Click any tour to see the full story.
        </p>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>
      <section className="mx-auto max-w-[1280px] px-6 md:px-12 pb-32 md:pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
                  <span className="text-[11.5px] text-primary tracking-wide">View tour →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
