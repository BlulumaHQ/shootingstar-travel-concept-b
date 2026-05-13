import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import banff from "@/assets/tour-banff.jpg";
import rockies from "@/assets/tour-rockies.jpg";
import vancouver from "@/assets/tour-vancouver.jpg";
import aurora from "@/assets/tour-aurora.jpg";
import jasper from "@/assets/dest-jasper.jpg";
import victoria from "@/assets/tour-victoria.jpg";
import { CompassMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Shooting Star Travel" },
      { name: "description", content: "Canada travel guides, seasonal advice and local notes — to help you plan your next journey." },
      { property: "og:title", content: "Journal — Shooting Star Travel" },
      { property: "og:description", content: "Canadian travel knowledge and a local perspective, curated by Shooting Star Travel." },
      { property: "og:image", content: rockies },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/blog" },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { img: rockies, cat: "Travel Guide", title: "8 things to know before visiting the Canadian Rockies", excerpt: "Weather, transport, lodging and the best season — a complete prep list for first-timers in the Rockies.", read: "8 min read" },
  { img: banff, cat: "Trip Comparison", title: "Banff: independent travel or guided tour?", excerpt: "Comparing budget, depth and flexibility to help you choose the way to travel that suits you best.", read: "6 min read" },
  { img: vancouver, cat: "City Guide", title: "First time in Vancouver: which spots are worth your time?", excerpt: "Ten corners locals love, from Stanley Park to Granville Island.", read: "7 min read" },
  { img: aurora, cat: "Aurora Guide", title: "When to chase the aurora — and how to prepare", excerpt: "When are sightings most likely, and what should you pack? A complete guide in one read.", read: "9 min read" },
  { img: jasper, cat: "Slow Travel", title: "Jasper: the underrated Dark Sky Preserve", excerpt: "Quieter and more raw than Banff — meet a hidden-gem mountain town in this guide.", read: "5 min read" },
  { img: victoria, cat: "Island Travel", title: "A day in Victoria: gardens, ferries and English afternoon tea", excerpt: "The most beautiful one-day island escape from Vancouver.", read: "6 min read" },
];

export function BlogPage() {
  const [feature, ...rest] = posts;
  return (
    <SiteLayout>
      <section className="relative bg-cream pt-24 md:pt-32 pb-14 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-center gap-3 text-primary/75">
            <CompassMark size={18} className="text-primary/65" />
            <DottedLine length={36} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase font-medium">Travel Journal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
            Journal
          </h1>
          <p className="mt-7 text-ink/60 max-w-xl leading-[2] text-[15px]">
            Travel notes, seasonal advice and a local perspective. May these words travel with you as you plan what's next.
          </p>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      <section className="bg-cream pb-12 pt-6">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <Link to="/blog" className="group grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_20px_40px_-25px_rgba(60,80,70,0.35)]">
              <img src={feature.img} alt={feature.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-700" />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-medium">{feature.cat}</p>
              <h2 className="font-serif text-2xl md:text-[36px] text-ink mt-4 leading-[1.2] tracking-[-0.012em] font-medium">{feature.title}</h2>
              <p className="mt-6 text-ink/60 leading-[2] text-[15px]">{feature.excerpt}</p>
              <div className="mt-7 flex items-center gap-5 text-[12px] text-ink/50 tracking-[0.1em] uppercase">
                <span>{feature.read}</span>
                <span className="text-primary tracking-[0.18em]">Read more →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40 pt-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {rest.map((p) => (
              <Link to="/blog" key={p.title} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_18px_36px_-24px_rgba(60,80,70,0.32)]">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1000ms]" />
                </div>
                <p className="mt-6 text-[10.5px] tracking-[0.3em] uppercase text-primary font-medium">{p.cat}</p>
                <h3 className="mt-2.5 font-serif text-[19px] text-ink leading-snug font-semibold group-hover:text-primary transition">{p.title}</h3>
                <p className="mt-3 text-[13.5px] text-ink/60 leading-[1.95]">{p.excerpt}</p>
                <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-ink/45">{p.read} · Read more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
