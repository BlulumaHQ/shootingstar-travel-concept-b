import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { StarMark, DottedLine } from "@/components/site/BrandMarks";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Shooting Star Travel" },
      { name: "description", content: "Frequently asked questions about Shooting Star Travel: booking, payment, itineraries, cancellations, language groups, and pre-trip preparation." },
      { property: "og:title", content: "FAQ — Shooting Star Travel" },
      { property: "og:description", content: "Booking, payment, itineraries, cancellations, language groups, and pre-trip preparation answered." },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/faq" },
    ],
  }),
  component: FaqPage,
});

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Booking & Payment",
    items: [
      { q: "How do I book?", a: "Fill out the form on our Contact page or message us on WhatsApp, KakaoTalk or WeChat. A team member will reply within 24 hours." },
      { q: "Which payment methods do you accept?", a: "Credit card, Interac e-Transfer, bank transfer and PayPal. Some tours may also be paid in person." },
      { q: "Is a deposit required?", a: "Multi-day tours typically require a 30% deposit to hold your seat, with the balance due 14 days before departure." },
      { q: "When will I receive a confirmation?", a: "Usually within 24 hours by email; up to 48 hours during peak season." },
    ],
  },
  {
    title: "Itineraries",
    items: [
      { q: "How many travellers per group?", a: "We run small groups, typically 6–14, so every traveller has space to enjoy the experience." },
      { q: "Is accommodation included?", a: "Multi-day tours include selected accommodation — 3-star+ hotels or character mountain lodges." },
      { q: "Are meals included?", a: "Some tours include breakfast or signature meals; each tour page lists what's covered." },
      { q: "Can I customise an itinerary?", a: "Absolutely. Our private tours are designed for families, couples and groups of friends." },
    ],
  },
  {
    title: "Cancellation & Changes",
    items: [
      { q: "Can I cancel or reschedule?", a: "Full refund 30+ days before departure; one reschedule allowed 14–29 days out; within 14 days no refund, but you may transfer the seat." },
      { q: "What if weather forces a cancellation?", a: "If a tour cannot run due to force majeure (snowstorms, road closures), we'll reschedule or refund in full." },
      { q: "Can I transfer my seat to someone else?", a: "Yes — please share their contact details at least 7 days before departure for transfer and insurance." },
    ],
  },
  {
    title: "Languages & Groups",
    items: [
      { q: "Which language groups are offered?", a: "We currently run English, Mandarin (Traditional & Simplified) and Korean groups. Private tours can be tailored to other languages." },
      { q: "Will the guide speak Mandarin?", a: "Mandarin departures are led by Mandarin-speaking guides — communication is seamless." },
      { q: "Can different language groups travel together?", a: "Usually no, to preserve experience quality. Private tours can be arranged with mixed languages." },
    ],
  },
  {
    title: "Pre-trip Preparation",
    items: [
      { q: "What should I pack?", a: "Bring a warm jacket, comfortable waterproof shoes, sunscreen and moisturiser. Each tour page includes a detailed packing list." },
      { q: "Do I need travel insurance?", a: "We strongly recommend personal travel and medical insurance for full peace of mind." },
      { q: "Where is the meeting point?", a: "Most tours meet at a designated point in downtown Vancouver or Calgary. Private tours can offer hotel pickup." },
      { q: "Can I bring older family or children?", a: "Yes — our pace is gentle and suits children aged 6+ and active seniors." },
    ],
  },
];

export function FaqPage() {
  return (
    <SiteLayout>
      <section className="bg-cream">
        <div className="mx-auto max-w-[920px] px-6 md:px-10 pt-24 md:pt-36 pb-16 text-center">
          <div className="flex items-center justify-center gap-3 text-primary/75">
            <DottedLine length={28} className="text-primary/45" />
            <StarMark size={18} className="text-primary/65" />
            <span className="text-[11px] tracking-[0.4em] uppercase">Frequently Asked</span>
            <StarMark size={18} className="text-primary/65" />
            <DottedLine length={28} className="text-primary/45" />
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-7 tracking-[-0.015em] font-medium leading-[1.1]">Frequently asked</h1>
          <p className="mt-7 text-ink/60 leading-[2] text-[15px] max-w-xl mx-auto">
            The questions our travellers ask most before they set off.
          </p>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40">
        <div className="mx-auto max-w-[920px] px-6 md:px-10 space-y-20">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="flex items-baseline gap-4 mb-7">
                <span className="text-[11px] tracking-[0.4em] uppercase text-primary/70">{g.title}</span>
                <span className="h-px flex-1 bg-primary/20" />
              </div>
              <div className="space-y-1">
                {g.items.map((it, i) => (
                  <details
                    key={it.q}
                    open={i === 0}
                    className="group border-b border-primary/15 py-6 open:pb-7"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                      <span className="font-serif text-[16px] text-ink leading-snug">{it.q}</span>
                      <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                    </summary>
                    <p className="mt-4 text-ink/60 leading-[2] text-[14px]">{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-10">
            <p className="text-ink/60 text-[14px] mb-6">Couldn't find your question?</p>
            <Link to="/contact" className="inline-flex rounded-full bg-primary text-primary-foreground px-8 py-3.5 text-[12.5px] tracking-[0.18em] uppercase hover:bg-primary/90 transition">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
