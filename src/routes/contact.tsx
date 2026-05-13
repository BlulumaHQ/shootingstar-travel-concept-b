import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { PinMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shooting Star Travel" },
      { name: "description", content: "Book a consultation, request a custom itinerary, or get a group quote. Reach Shooting Star Travel via WhatsApp, KakaoTalk, WeChat or email." },
      { property: "og:title", content: "Contact — Shooting Star Travel" },
      { property: "og:description", content: "Your next journey begins here." },
    ],
    links: hreflangLinks("/contact", "en"),
  }),
  component: ContactPage,
});

const channels = [
  { l: "WhatsApp", v: "+1 (604) 000-0000", h: "https://wa.me/" },
  { l: "KakaoTalk", v: "@shootingstartravel", h: "#" },
  { l: "WeChat", v: "shootingstar_ca", h: "#" },
  { l: "Email", v: "hello@shootingstartravel.ca", h: "mailto:hello@shootingstartravel.ca" },
];

export function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="relative bg-cream pt-24 md:pt-32 pb-14 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-center gap-3 text-primary/75">
            <PinMark size={18} className="text-primary/65" />
            <DottedLine length={36} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase font-medium">Let's Begin</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
            Your next journey,<br />
            <span className="italic text-primary">begins here.</span>
          </h1>
          <p className="mt-7 text-ink/60 max-w-xl leading-[2] text-[15px]">
            Tell us where you'd like to go, the pace you'd like to keep, and the dream you're chasing. We reply within 24 hours.
          </p>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      <section className="bg-cream pb-32 md:pb-40 pt-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-7">
              <h2 className="font-serif text-[24px] md:text-[28px] text-ink font-medium tracking-[-0.01em] mb-8">
                Tell us your travel dream
              </h2>
              {sent ? (
                <div className="rounded-[6px] border border-primary/20 bg-card px-8 py-12 text-center shadow-[0_18px_36px_-22px_rgba(70,80,75,0.22)]">
                  <p className="text-[11px] tracking-[0.4em] uppercase text-primary/80">— Thank you</p>
                  <p className="mt-4 font-serif text-[22px] text-ink">Your message has arrived</p>
                  <p className="mt-3 text-ink/60 text-[14px] leading-[2]">We'll be in touch within 24 hours ✦</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-5"
                >
                  {[
                    { n: "name", p: "Name" },
                    { n: "email", p: "Email", t: "email" },
                    { n: "tour", p: "Tour you're interested in" },
                  ].map((f) => (
                    <div key={f.n}>
                      <label className="block text-[10.5px] tracking-[0.3em] uppercase text-ink/55 mb-2">{f.p}</label>
                      <input
                        type={f.t || "text"}
                        required
                        name={f.n}
                        className="w-full rounded-[4px] border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[14.5px] text-ink focus:outline-none focus:border-primary transition"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10.5px] tracking-[0.3em] uppercase text-ink/55 mb-2">Your travel dream</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full rounded-[4px] border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[14.5px] text-ink leading-[1.9] focus:outline-none focus:border-primary transition resize-none"
                    />
                  </div>
                  <button className="mt-4 inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[12px] tracking-[0.2em] uppercase hover:bg-primary/90 transition shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]">
                    Send enquiry <span aria-hidden>→</span>
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-5">
              <h2 className="font-serif text-[24px] md:text-[28px] text-ink font-medium tracking-[-0.01em] mb-8">
                Reach us directly
              </h2>
              <div className="space-y-0 border-t border-ink/10">
                {channels.map((c) => (
                  <a
                    key={c.l}
                    href={c.h}
                    className="group flex items-center justify-between border-b border-ink/10 px-1 py-5 hover:px-3 transition-all"
                  >
                    <span className="text-[11px] tracking-[0.3em] uppercase text-ink/70 group-hover:text-primary transition">{c.l}</span>
                    <span className="text-ink/55 text-[13.5px] group-hover:text-ink transition">{c.v}</span>
                  </a>
                ))}
              </div>
              <div className="mt-12 space-y-3 text-[13.5px] text-ink/60 leading-[2]">
                <p className="text-[10.5px] tracking-[0.3em] uppercase text-primary/80">— Studio</p>
                <p>Vancouver, BC, Canada</p>
                <p>Mon–Sat · 9:00 – 18:00 PST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
