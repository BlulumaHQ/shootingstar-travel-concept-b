import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import journal from "@/assets/about-collage.png";
import tourBanff from "@/assets/tour-banff.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import { CompassMark, StarMark, MountainMark, PinMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shooting Star Travel" },
      { name: "description", content: "Shooting Star Travel is a Canada-based boutique small-group travel studio crafting calm, considered journeys for English, Mandarin and Korean travellers." },
      { property: "og:title", content: "About — Shooting Star Travel" },
      { property: "og:description", content: "Small groups, slow travel, considered detail — our promise to every traveller." },
      { property: "og:image", content: journal },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/about" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "Small groups, more comfort", d: "8–14 travellers per departure — no rushing, no crowds, every guest is looked after." },
  { t: "Considered in every detail", d: "From airport pickups to the corner café, every touchpoint is hand-picked." },
  { t: "English, Mandarin & Korean guides", d: "Conversation and storytelling designed for travellers in their own language." },
  { t: "Safety and clear communication", d: "Full travel insurance and a 24-hour contact line so loved ones rest easy." },
  { t: "Journeys with story", d: "We believe travel is not about arriving but about memories worth keeping." },
];

export function AboutPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-cream">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 pt-24 md:pt-36 pb-16 md:pb-20">
          <div className="flex items-center gap-3 text-primary/75">
            <CompassMark size={20} className="text-primary/65" />
            <DottedLine length={36} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase">About the Studio</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[64px] text-ink mt-7 font-medium leading-[1.1] tracking-[-0.018em] max-w-3xl">
            About <span className="italic text-primary">Shooting Star Travel</span>
          </h1>
          <p className="mt-8 text-ink/65 max-w-2xl leading-[2] text-[15.5px]">
            We craft each journey with care so travel becomes more than arriving — it becomes a memory worth keeping.
          </p>
        </div>
        <JourneyPath className="absolute bottom-0 left-0 right-0 w-full h-24 text-primary/30 pointer-events-none" variant="long" />
      </section>

      {/* STORY */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-6">
              <div className="relative">
                <img src={journal} alt="Travel journal" loading="lazy" className="rounded-[4px] shadow-[0_30px_60px_-30px_rgba(60,80,70,0.4)] w-full" />
                <img src={tourRockies} alt="" loading="lazy" className="hidden md:block absolute -bottom-10 -right-8 w-[44%] aspect-[4/5] object-cover rounded-[4px] border-[6px] border-cream shadow-[0_20px_40px_-20px_rgba(60,80,70,0.4)]" />
                <img src={tourBanff} alt="" loading="lazy" className="hidden md:block absolute -top-8 -right-4 w-[30%] aspect-square object-cover rounded-[4px] border-[6px] border-cream rotate-[3deg] shadow-[0_18px_30px_-18px_rgba(60,80,70,0.4)]" />
              </div>
            </div>
            <div className="md:col-span-6 md:pl-4">
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={16} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">Our Story</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium tracking-[-0.012em] leading-[1.18]">Quiet hours worth keeping</h2>
              <div className="mt-7 space-y-5 text-ink/75 leading-[2] text-[15px]">
                <p>
                  Shooting Star Travel is devoted to small-group travel across Canada — calm, considered itineraries for travellers from many languages and backgrounds.
                </p>
                <p>
                  We believe a journey is not just about visiting places. It's about meeting landscape, culture and people, one slow day at a time.
                </p>
                <p>
                  From sunrise in Calgary to starlight over the Yukon, we hope to write Canada into your travel diary, one chapter at a time.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div><div className="font-serif text-2xl text-primary">10+</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">Years on the ground</div></div>
                <div><div className="font-serif text-2xl text-primary">2,400+</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">Travellers hosted</div></div>
                <div><div className="font-serif text-2xl text-primary">4.9</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">Average rating</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[var(--sand)] py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="max-w-xl mb-20">
            <div className="flex items-center gap-3 text-primary/75">
              <MountainMark size={20} className="text-primary/65" />
              <DottedLine length={32} className="text-primary/45" />
              <span className="text-[11px] tracking-[0.4em] uppercase">What We Believe</span>
            </div>
            <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium tracking-[-0.012em]">Our travel philosophy</h2>
            <p className="mt-6 text-ink/60 leading-[2] text-[15px]">Five things we care about — woven through every departure.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
            {values.map((v, i) => (
              <div key={v.t}>
                <p className="font-marker text-primary text-sm tracking-[0.2em]">0{i + 1}</p>
                <h3 className="font-serif text-[17px] text-ink mt-3 font-semibold leading-snug">{v.t}</h3>
                <div className="mt-3 h-px w-8 bg-primary/40" />
                <p className="mt-4 text-[13px] text-ink/65 leading-[1.95]">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-cream py-28 md:py-36">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-3 text-primary/75">
            <DottedLine length={24} className="text-primary/45" />
            <PinMark size={18} className="text-primary/65" />
            <span className="text-[11px] tracking-[0.4em] uppercase">Who We Travel With</span>
            <PinMark size={18} className="text-primary/65" />
            <DottedLine length={24} className="text-primary/45" />
          </div>
          <h2 className="font-serif text-3xl md:text-[44px] text-ink mt-7 font-medium tracking-[-0.012em]">Designed for these travellers</h2>
          <p className="mt-6 text-ink/65 leading-[2] text-[15px] max-w-2xl mx-auto">
            Whether it's your first time in Canada, a slow family holiday, or a trip you'd rather take in your mother tongue —
            we bring the same care to every journey we shape for you.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {["Mandarin-speaking families", "Korean long-stay & holiday", "Couples & honeymooners", "International small groups"].map((g) => (
              <div key={g} className="rounded-2xl bg-[var(--sand)] py-5 text-[13.5px] text-ink/75">{g}</div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
