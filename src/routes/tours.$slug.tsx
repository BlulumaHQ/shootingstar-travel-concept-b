import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { getTour, tours } from "@/data/tours";
import { useState } from "react";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const tour = getTour(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.tour;
    return {
      meta: [
        { title: `${t?.title ?? "行程"} | Shootingstar Travel` },
        { name: "description", content: t?.intro ?? "" },
        { property: "og:title", content: t?.title ?? "" },
        { property: "og:description", content: t?.intro ?? "" },
        ...(t?.img ? [{ property: "og:image", content: t.img }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">找不到這個行程</h1>
        <Link to="/tours" className="mt-6 inline-flex text-primary underline underline-offset-4">回到行程列表</Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-ink/70">{error.message}</p>
      </section>
    </SiteLayout>
  ),
  component: TourDetailPage,
});

function BookingWidget({ tour }: { tour: ReturnType<typeof getTour> }) {
  const departures = tour?.departures ?? [
    { date: "Jul 12", seats: 8 },
    { date: "Jul 18", seats: 4 },
    { date: "Jul 26", seats: 12 },
    { date: "Aug 09", seats: 6 },
  ];
  const packages = tour?.packages ?? ["中文團", "英文團", "韓文團"];

  const [dateIdx, setDateIdx] = useState(0);
  const [pkg, setPkg] = useState(packages[0]);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<"form" | "loading" | "done">("form");

  const dep = departures[dateIdx];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("loading");
    setTimeout(() => setStage("done"), 1400);
  };

  if (stage === "loading") {
    return (
      <div className="rounded-2xl bg-cream p-10 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)] text-center">
        <div className="mx-auto h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <p className="mt-5 font-marker text-primary text-[13px] tracking-[0.25em] uppercase">— processing</p>
        <p className="mt-2 text-ink/65 text-[14px]">正在為您保留座位…</p>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="rounded-2xl bg-cream p-8 md:p-10 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)]">
        <p className="font-marker text-primary text-[13px] tracking-[0.25em] uppercase">— demo confirmation</p>
        <h3 className="font-serif text-2xl text-ink mt-3 font-semibold">預訂示意完成 ✦</h3>
        <div className="mt-5 rounded-xl bg-[var(--sand)] p-4 text-[13px] text-ink/75 leading-[1.95] space-y-1">
          <p>行程：{tour?.title}</p>
          <p>出發：{dep.date}　・　{pkg}</p>
          <p>人數：{guests} 位　・　聯絡人：{name || "—"}</p>
        </div>
        <p className="mt-5 text-ink/65 leading-[2] text-[13.5px]">
          這是預訂流程示意版本，正式網站將會串接 Booking System (例如 Checkfront / Rezdy)。
        </p>
        <button onClick={() => setStage("form")} className="mt-6 text-primary text-sm underline underline-offset-4">重新填寫</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-cream p-6 md:p-7 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)] space-y-5"
    >
      <div className="flex items-center justify-between">
        <p className="font-marker text-primary/80 text-[13px] tracking-[0.25em] uppercase">— booking</p>
        <span className="text-[11.5px] text-ink/55">剩餘 <span className="text-primary font-semibold">{dep.seats}</span> 位</span>
      </div>

      {/* Step 1: dates */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">① 選擇出發日</label>
        <div className="flex flex-wrap gap-2">
          {departures.map((d, i) => (
            <button
              type="button" key={d.date}
              onClick={() => setDateIdx(i)}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] border transition ${
                i === dateIdx ? "bg-primary text-primary-foreground border-primary" : "border-border text-ink/70 hover:border-primary/50"
              }`}
            >{d.date} <span className="opacity-70">· {d.seats}</span></button>
          ))}
        </div>
      </div>

      {/* Step 2: package */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">② 語言團別</label>
        <div className="flex flex-wrap gap-2">
          {packages.map((p) => (
            <button
              type="button" key={p}
              onClick={() => setPkg(p)}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] border transition ${
                p === pkg ? "bg-primary text-primary-foreground border-primary" : "border-border text-ink/70 hover:border-primary/50"
              }`}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Step 3: guests */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">③ 旅客人數</label>
        <div className="inline-flex items-center rounded-full border border-border bg-cream">
          <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="px-4 py-2 text-ink/70">−</button>
          <span className="w-10 text-center text-sm">{guests}</span>
          <button type="button" onClick={() => setGuests(Math.min(dep.seats, guests + 1))} className="px-4 py-2 text-ink/70">+</button>
        </div>
      </div>

      {/* Step 4: contact */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">④ 聯絡資訊</label>
        <div className="space-y-2.5">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="姓名" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="電話" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
        </div>
      </div>

      <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14.5px] tracking-wide hover:bg-primary/90 transition shadow-[0_10px_24px_-12px_oklch(0.585_0.04_155/0.7)]">
        立即結帳 →
      </button>
      <p className="text-[10.5px] text-ink/45 text-center">* 此為示意，實際付款將透過第三方系統處理</p>
    </form>
  );
}

function TourDetailPage() {
  const { tour } = Route.useLoaderData() as { tour: NonNullable<ReturnType<typeof getTour>> };

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[52vh] md:h-[68vh] min-h-[380px] overflow-hidden">
          <img src={tour.img} alt={tour.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 -mt-24 md:-mt-32 relative">
          <div className="bg-cream rounded-[8px] p-8 md:p-12 shadow-[0_30px_60px_-30px_rgba(60,80,70,0.4)] border border-border/60 max-w-3xl">
            <Link to="/tours" className="text-[12px] text-ink/60 tracking-[0.2em] uppercase hover:text-primary">← 所有行程</Link>
            <h1 className="font-serif text-3xl md:text-5xl text-ink mt-3 font-semibold leading-tight">{tour.title}</h1>
            <p className="mt-5 text-ink/70 leading-[2] text-[15px]">{tour.intro}</p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[13px]">
              <div><span className="text-ink/50">天數　</span><span className="text-ink">{tour.duration}</span></div>
              <div><span className="text-ink/50">團體　</span><span className="text-ink">{tour.group}</span></div>
              <div><span className="text-ink/50">語言　</span><span className="text-ink">{tour.language}</span></div>
              <div><span className="text-ink/50">價格　</span><span className="text-primary font-semibold">{tour.price}</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-6 md:px-12 py-20 md:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 space-y-16">
          {/* ITINERARY */}
          <section>
            <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— itinerary</p>
            <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">行程安排</h2>
            <ol className="mt-8 relative border-l border-primary/30 pl-6 space-y-8">
              {tour.itinerary.map((it, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">●</span>
                  <p className="font-marker text-primary text-sm tracking-[0.2em] uppercase">{it.stop}</p>
                  <h3 className="font-serif text-lg text-ink mt-1 font-semibold">{it.title}</h3>
                  <p className="mt-2 text-ink/65 leading-[1.95] text-[14px]">{it.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* GALLERY */}
          {tour.gallery && tour.gallery.length > 0 && (
            <section>
              <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— gallery</p>
              <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">行程剪影</h2>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {tour.gallery.map((g, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-[4px]">
                    <img src={g} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* INCLUDED + BRING + NOTES */}
          <section className="grid md:grid-cols-3 gap-8">
            {[
              { t: "費用包含", items: tour.included },
              { t: "建議攜帶", items: tour.bring },
              { t: "重要提醒", items: tour.notes },
            ].map((b) => (
              <div key={b.t}>
                <h3 className="font-serif text-lg text-ink font-semibold">{b.t}</h3>
                <div className="mt-3 h-px w-8 bg-primary/40" />
                <ul className="mt-4 space-y-2.5 text-[13.5px] text-ink/70 leading-[1.85]">
                  {b.items.map((x) => <li key={x} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary">{x}</li>)}
                </ul>
              </div>
            ))}
          </section>

          {/* FAQ */}
          {tour.faq.length > 0 && (
            <section>
              <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— faq</p>
              <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">常見問題</h2>
              <div className="mt-6 space-y-3">
                {tour.faq.map((f) => (
                  <details key={f.q} className="group rounded-2xl bg-[var(--sand)] px-6 py-4 open:bg-cream open:shadow-[0_10px_30px_-18px_rgba(60,80,70,0.3)] border border-border/60">
                    <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                      <span className="font-serif text-[15.5px] text-ink">{f.q}</span>
                      <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                    </summary>
                    <p className="mt-3 text-ink/65 leading-[1.95] text-[14px]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR — booking */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <BookingWidget tour={tour} />
          </div>
        </aside>
      </div>

      {/* CTA */}
      <section className="bg-cream pb-24 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div
            className="relative overflow-hidden rounded-[10px] p-12 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, var(--lavender-soft) 0%, var(--sage-soft) 100%)" }}
          >
            <p className="font-marker text-ink/70 text-sm tracking-[0.3em] uppercase">— have questions?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mt-4 font-medium">想了解更多？</h2>
            <p className="mt-4 text-ink/70 leading-[2] text-[14.5px]">與我們聯繫，由真人為您解答。</p>
            <Link to="/contact" className="mt-7 inline-flex rounded-full bg-primary px-8 py-3 text-primary-foreground text-sm hover:bg-primary/90 transition">聯絡我們 →</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
