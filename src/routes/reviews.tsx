import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { tours } from "@/data/tours";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/site/ReviewCard";
import { StarMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Traveller Stories — Shooting Star Travel" },
      { name: "description", content: "Real travel stories, photos and memories from travellers around the world." },
      { property: "og:title", content: "Traveller Stories — Shooting Star Travel" },
      { property: "og:description", content: "Authentic traveller stories, photos and travel memories." },
      { property: "og:image", content: reviews[0].photos[0] },
    ],
    links: hreflangLinks("/reviews", "en"),
  }),
  component: ReviewsPage,
});

export function ShareModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-cream rounded-2xl max-w-lg w-full p-7 md:p-9 my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <div className="text-center py-6">
            <p className="font-marker text-primary text-sm tracking-[0.25em] uppercase">— thank you</p>
            <h3 className="font-serif text-2xl text-ink mt-3">Thank you for sharing!</h3>
            <p className="mt-4 text-ink/70 leading-[2] text-[14.5px]">
              Your story has joined our traveller's journal. We can't wait for the next time our paths cross.
            </p>
            <button onClick={onClose} className="mt-6 rounded-full bg-primary text-primary-foreground px-7 py-2.5 text-sm">Close</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl text-ink font-semibold">Share your journey</h3>
              <button type="button" onClick={onClose} className="text-ink/50 text-xl">×</button>
            </div>
            <input required placeholder="Name" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <input required type="email" placeholder="Email" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <select required defaultValue="" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm">
              <option value="" disabled>Choose the tour you joined</option>
              {tours.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
            </select>
            <div>
              <label className="block text-[12px] text-ink/60 mb-1.5">Rate this journey</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((n) => (
                  <button type="button" key={n} className="text-primary"><Star size={20} fill="currentColor" /></button>
                ))}
              </div>
            </div>
            <textarea required rows={4} placeholder="The story you'd like to share…" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
            <div className="rounded-md border border-dashed border-border px-3 py-6 text-center text-[12.5px] text-ink/55">
              📷 Upload travel photos (5–6 max, illustrative)
            </div>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14px]">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ReviewsPage() {
  const [open, setOpen] = useState(false);
  return (
    <SiteLayout>
      <section className="relative bg-cream pt-24 md:pt-32 pb-16 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={18} className="text-primary/65" />
                <DottedLine length={36} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase font-medium">Travellers' Voices</span>
              </div>
              <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
                Traveller stories
              </h1>
              <p className="mt-7 text-ink/60 max-w-xl leading-[2] text-[15px]">
                Each journey is a real story written by a traveller. Share yours, so the next traveller can set off because of you.
              </p>
            </div>
            <button onClick={() => setOpen(true)} className="self-start md:self-end inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[13px] tracking-[0.12em] uppercase hover:bg-primary/90 transition shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]">
              <Heart size={13} strokeWidth={1.6} /> Share my journey
            </button>
          </div>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      <section className="bg-cream pb-32 md:pb-40 pt-8">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {reviews.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>

          <div className="mt-20 text-center">
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-primary/40 text-primary px-8 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground transition">
              <Heart size={13} strokeWidth={1.6} /> Share my journey
            </button>
          </div>
        </div>
      </section>

      {open && <ShareModal onClose={() => setOpen(false)} />}
    </SiteLayout>
  );
}
