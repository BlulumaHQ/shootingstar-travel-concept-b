import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import hero from "@/assets/hero-mountains.jpg";
import journal from "@/assets/journal.jpg";
import tourBanff from "@/assets/tour-banff.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import tourVancouver from "@/assets/tour-vancouver.jpg";
import tourVictoria from "@/assets/tour-victoria.jpg";
import tourPrivate from "@/assets/tour-private.jpg";
import destJasper from "@/assets/dest-jasper.jpg";
import destWhistler from "@/assets/dest-whistler.jpg";
import destYukon from "@/assets/dest-yukon.jpg";
import guest1 from "@/assets/guest-1.jpg";
import guest2 from "@/assets/guest-2.jpg";
import guest3 from "@/assets/guest-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shootingstar Travel | 加拿大旅行團與深度旅遊體驗" },
      { name: "description", content: "探索加拿大最值得收藏的旅程。Shootingstar Travel 提供小團旅行、洛磯山、班夫、極光與溫哥華深度旅遊體驗。" },
      { property: "og:title", content: "Shootingstar Travel | 加拿大旅行團與深度旅遊體驗" },
      { property: "og:description", content: "加拿大小團精緻旅遊・洛磯山・班夫・極光・溫哥華深度體驗。" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: HomePage,
});

const tours = [
  { img: tourRockies, title: "洛磯山經典團", desc: "七天六夜，深入班夫、露易絲湖與夢蓮湖的雪峰倒影。", price: "CAD $1,890 起" },
  { img: tourBanff, title: "班夫國家公園一日遊", desc: "從溫哥華出發，一日感受加拿大國寶級山湖景致。", price: "CAD $189 起" },
  { img: tourAurora, title: "極光追蹤之旅", desc: "育空與黃刀，五晚追光行程＋舒適小木屋住宿。", price: "CAD $2,490 起" },
  { img: tourVancouver, title: "溫哥華市區深度遊", desc: "在地嚮導帶你走進史丹利公園、Granville Island。", price: "CAD $129 起" },
  { img: tourVictoria, title: "維多利亞花園之旅", desc: "渡輪 + 布查特花園 + 古典市區漫步一日往返。", price: "CAD $219 起" },
  { img: tourPrivate, title: "私人包團服務", desc: "為您與家人朋友量身打造專屬路線與節奏。", price: "報價依需求" },
];

const features = [
  { t: "在地專業團隊", d: "深耕加拿大十餘年" },
  { t: "舒適小團出發", d: "8–14 人精緻成團" },
  { t: "精心安排路線", d: "每段旅程都是策展" },
  { t: "安心安全保障", d: "全程保險與支援" },
  { t: "用心服務每位旅客", d: "中英韓多語接待" },
];

const destinations = [
  { img: tourBanff, name: "Banff", zh: "班夫" },
  { img: destJasper, name: "Jasper", zh: "傑士伯" },
  { img: tourVancouver, name: "Vancouver", zh: "溫哥華" },
  { img: destWhistler, name: "Whistler", zh: "惠斯勒" },
  { img: tourVictoria, name: "Victoria", zh: "維多利亞" },
  { img: destYukon, name: "Yukon", zh: "育空" },
  { img: tourAurora, name: "Aurora", zh: "極光" },
];

const stories = [
  { img: guest1, name: "Mei-Lin Chen", country: "Taipei, Taiwan", lang: "中文", quote: "走進班夫的那一刻，我終於懂得什麼叫『被風景擁抱』。", rating: 5 },
  { img: guest2, name: "Jihoon & Soyoung", country: "Seoul, Korea", lang: "한국어", quote: "韓語導遊細心又溫柔，整趟旅程像和老朋友出遊。", rating: 5 },
  { img: guest3, name: "The Wong Family", country: "Hong Kong", lang: "中文", quote: "一家人最棒的回憶，孩子說明年還要再來。", rating: 5 },
];

const faqs = [
  { q: "如何報名？", a: "您可以透過聯絡我們頁面填寫表單，或直接以 WhatsApp、KakaoTalk、WeChat 與我們聯繫，將會有專人於 24 小時內回覆。" },
  { q: "是否提供中文導遊？", a: "是的，我們提供繁體中文、簡體中文、韓文與英文導遊服務。" },
  { q: "可以取消或改期嗎？", a: "出發前 30 天以上可全額退費，依行程不同有彈性方案，詳細條款於報名時說明。" },
  { q: "是否包含住宿？", a: "多日行程包含精選住宿，皆為 3 星以上飯店或特色山屋。" },
  { q: "如何付款？", a: "支援信用卡、Interac e-Transfer、銀行轉帳與 PayPal。" },
  { q: "可以客製行程嗎？", a: "當然！私人包團服務歡迎家庭、情侶、好友團體，由我們為您量身打造。" },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO — scrapbook travel journal */}
      <section className="relative overflow-hidden bg-paper">
        <div className="absolute inset-0">
          <img src={hero} alt="" aria-hidden className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/80 to-paper" />
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(rgba(60,40,20,0.6) 1px, transparent 1.4px), radial-gradient(rgba(60,40,20,0.4) 1px, transparent 1.4px)",
              backgroundSize: "3px 3px, 7px 7px",
              backgroundPosition: "0 0, 1px 2px",
            }}
            aria-hidden
          />
        </div>

        {/* faint ruled-notebook lines on left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/2 opacity-[0.08] pointer-events-none hidden md:block"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 38px, rgba(40,30,20,0.9) 38px 39px)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1400px] px-6 pt-12 pb-36 md:pt-20 md:pb-52 md:px-12">
          <div className="grid md:grid-cols-12 gap-8 md:gap-4 items-start">
            {/* LEFT — handwritten journal entry */}
            <div className="md:col-span-7 relative pt-4 md:pt-2">
              <div className="font-marker text-clay/80 text-sm md:text-base tracking-wide rotate-[-2deg] inline-block">
                — Saturday · Banff, AB · 04:42 sunrise
              </div>

              <svg className="absolute -left-3 top-12 md:-left-10 md:top-16 w-16 h-16 text-clay/70 rotate-[-12deg] hidden md:block" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 50 C 18 30, 34 22, 56 18" strokeDasharray="2 4" />
                <path d="M56 18 l -10 -2 M56 18 l -2 10" />
              </svg>

              <h1 className="mt-5 font-marker text-ink leading-[0.95] text-[52px] md:text-[88px] tracking-tight">
                <span className="block rotate-[-1deg]">收集，</span>
                <span className="block ml-6 md:ml-16 rotate-[1deg]">每一個</span>
                <span className="block ml-2 md:ml-6 rotate-[-0.5deg]">
                  <span className="relative inline-block">
                    閃亮的
                    <svg className="absolute left-0 -bottom-2 w-full h-3 text-clay/70" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 8 C 50 2, 120 12, 197 5" />
                    </svg>
                  </span>{" "}
                  瞬間。
                </span>
              </h1>

              <p className="mt-10 font-journal text-ink/80 text-lg md:text-xl leading-relaxed max-w-md">
                從洛磯山的第一道晨光，到育空的最後一片極光——<br />
                我們把每一段加拿大旅程，寫成只屬於你的旅行日記。
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/tours"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--forest)] px-9 py-4 text-cream font-journal text-base shadow-[0_8px_22px_-8px_rgba(40,55,30,0.55),0_2px_0_rgba(0,0,0,0.06)] hover:translate-y-[-2px] hover:shadow-[0_14px_30px_-10px_rgba(40,55,30,0.6)] transition-all duration-300"
                >
                  翻開旅程目錄
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M1 7 C 7 3, 14 11, 21 7" />
                    <path d="M21 7 l -5 -3 M21 7 l -3 5" />
                  </svg>
                </Link>
                <Link to="/stories" className="font-marker text-ink/75 text-base underline decoration-clay/60 decoration-wavy underline-offset-[6px] hover:text-ink">
                  讀讀旅人筆記 →
                </Link>
              </div>

              <div className="mt-12 hidden md:flex items-center gap-3 font-marker text-clay/80 text-sm rotate-[-1deg]">
                <span className="inline-block w-10 border-t border-dashed border-clay/60" />
                est. 2014 · small group · slow travel
              </div>
            </div>

            {/* RIGHT — photo collage */}
            <div className="md:col-span-5 relative h-[420px] md:h-[560px]">
              <div className="absolute right-8 top-2 w-24 h-5 bg-[var(--tape)] rotate-[14deg] shadow-sm" aria-hidden />

              <figure className="absolute right-2 top-6 w-[230px] md:w-[270px] rotate-[-6deg] polaroid">
                <span className="tape -top-4 left-6 rotate-[-14deg]" />
                <span className="tape -top-3 right-4 w-[60px] rotate-[18deg]" />
                <img src={tourBanff} alt="Lake Louise sunrise" className="h-[200px] md:h-[230px] w-full object-cover" />
                <figcaption className="font-marker text-ink/80 text-base mt-3 text-center">
                  Lake Louise, 06:14 ✦
                </figcaption>
              </figure>

              <figure className="absolute right-28 md:right-40 top-[210px] md:top-[260px] w-[230px] md:w-[260px] rotate-[7deg] polaroid">
                <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[4deg]" />
                <img src={tourAurora} alt="Yukon aurora" className="h-[180px] md:h-[210px] w-full object-cover" />
                <figcaption className="font-marker text-ink/80 text-base mt-3 text-center">
                  green sky, Yukon ☾
                </figcaption>
              </figure>

              <div className="absolute -left-2 md:left-4 bottom-4 w-[180px] rotate-[-4deg] bg-cream/95 px-4 py-3 shadow-[0_8px_18px_-10px_rgba(0,0,0,0.25)] border border-clay/15">
                <p className="font-marker text-ink text-sm leading-snug">
                  「這趟旅程，<br />我把心遺落在班夫。」
                </p>
                <p className="mt-1 font-journal text-clay/80 text-[11px]">— Mei-Lin, 2024</p>
              </div>

              <svg className="absolute left-10 top-2 w-6 h-6 text-clay/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M12 3 v6 M12 15 v6 M3 12 h6 M15 12 h6" />
              </svg>
            </div>
          </div>
        </div>
      </section>


      {/* OUR PROMISE — editorial numbered strip */}
      <section className="relative bg-cream pt-28 pb-32">
        <div className="mx-auto max-w-[1320px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-10 items-start mb-16">
            <div className="md:col-span-4">
              <p className="font-marker text-clay/75 text-base">— our promise</p>
              <h2 className="font-serif text-4xl md:text-5xl text-ink mt-3 leading-[1.1] tracking-tight">
                慢一點，<br />走深一點。
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-ink/65 leading-[2] text-[15px]">
                十年來我們相信，旅行不是把行程塞滿，
                而是給每一刻足夠的時間去感受。
                這是我們對每一位旅人的承諾。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-clay/20">
            {features.map((f, i) => (
              <div key={f.t} className={`py-8 md:py-10 px-2 md:px-5 ${i > 0 ? "md:border-l border-clay/15" : ""} ${i > 0 ? "border-t md:border-t-0" : ""}`}>
                <span className="font-serif text-xs tracking-[0.28em] text-clay">0{i + 1}</span>
                <p className="mt-4 font-serif text-lg text-ink leading-snug">{f.t}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FEATURED TOURS — editorial, soft cards, no torn edges */}
      <section className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="font-marker text-clay/75 text-base tracking-wide">— curated journeys</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-2 tracking-tight">熱門行程推薦</h2>
            <div className="mx-auto mt-5 h-px w-16 bg-clay/30" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {tours.slice(0, 4).map((t) => (
              <article
                key={t.title}
                className="group relative bg-card rounded-[2px] overflow-hidden shadow-[0_2px_4px_-2px_rgba(60,40,20,0.06),0_18px_40px_-24px_rgba(60,40,20,0.25)] hover:shadow-[0_4px_8px_-4px_rgba(60,40,20,0.08),0_28px_50px_-24px_rgba(60,40,20,0.32)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                </div>
                <div className="p-6 pb-7">
                  <h3 className="font-serif text-xl text-ink leading-snug">{t.title}</h3>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed line-clamp-2">{t.desc}</p>
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-serif tracking-[0.18em] text-clay uppercase">{t.price}</span>
                    <span className="text-clay text-xs">★★★★★</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/tours" className="inline-flex items-center gap-2 font-serif text-sm tracking-[0.18em] uppercase text-ink/70 hover:text-primary border-b border-clay/30 pb-1">
              查看全部行程
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        
      </section>

      {/* GUEST STORIES — editorial intimate */}
      <section className="relative bg-cream py-32">
        <div className="mx-auto max-w-[1320px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 mb-20 items-end">
            <div className="md:col-span-6 md:col-start-2">
              <p className="font-marker text-clay/75 text-base">— traveller notes</p>
              <h2 className="font-serif text-5xl md:text-6xl text-ink mt-3 leading-[1.05] tracking-tight">
                寫在旅程之後的<br /><span className="italic text-clay">真實心聲</span>
              </h2>
            </div>
            <div className="md:col-span-3 md:col-start-9 text-right">
              <p className="font-serif text-ink/55 text-sm tracking-[0.18em] uppercase">2,400+ travellers</p>
              <p className="font-serif text-4xl text-primary mt-1">4.9 ★</p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-x-8 gap-y-16">
            {stories.map((s, i) => {
              const layout = [
                "md:col-span-5 md:col-start-1",
                "md:col-span-5 md:col-start-7 md:mt-20",
                "md:col-span-5 md:col-start-3 md:mt-8",
              ];
              return (
                <figure key={s.name} className={`${layout[i]} relative`}>
                  <span className="absolute -top-6 -left-2 font-serif text-7xl text-clay/25 leading-none select-none">"</span>
                  <blockquote className="font-serif text-2xl md:text-[26px] text-ink leading-[1.55] tracking-tight">
                    {s.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <img src={s.img} alt={s.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-1 ring-clay/15" />
                    <div>
                      <p className="text-sm text-ink font-medium tracking-wide">{s.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.country} · {s.lang}</p>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>


      {/* ABOUT THE JOURNEY */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={journal} alt="Travel journal" loading="lazy" className="rounded-[2px] shadow-[0_30px_60px_-30px_rgba(60,40,20,0.45)]" />
              <figure className="absolute -bottom-8 -right-4 hidden md:block polaroid w-[200px] rotate-[4deg]">
                <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
                <img src={guest1} alt="" className="h-[160px] w-full object-cover" />
                <figcaption className="font-marker text-base text-ink mt-3 text-center">first sunrise ✦</figcaption>
              </figure>
            </div>
            <div>
              <p className="font-marker text-clay/75 text-base tracking-wide">— our journey</p>
              <h2 className="font-serif text-4xl md:text-5xl text-ink mt-2 tracking-tight">關於這段旅程</h2>
              <div className="mt-5 h-px w-16 bg-clay/30" />
              <p className="mt-8 text-foreground/75 leading-[1.95] text-[15px]">
                我們相信旅行不只是抵達一個地方，而是與一群人一起記住一段時光。<br /><br />
                Shootingstar Travel 由一群熱愛加拿大山林的旅人創立。十年來我們踏遍洛磯山的每一道光、追過育空夜空裡的每一場極光，只為了把最真實、最動人的加拿大，帶到你的眼前。<br /><br />
                小團、慢走、用心—— 這是我們對每一位旅人的承諾。
              </p>
              <div className="mt-10 flex gap-10">
                <div><div className="font-serif text-3xl text-primary">10+</div><div className="text-xs text-muted-foreground mt-1 tracking-wider">年經驗</div></div>
                <div><div className="font-serif text-3xl text-primary">2,400+</div><div className="text-xs text-muted-foreground mt-1 tracking-wider">滿意旅客</div></div>
                <div><div className="font-serif text-3xl text-primary">4.9</div><div className="text-xs text-muted-foreground mt-1 tracking-wider">平均評分</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS — editorial asymmetric postcard wall */}
      <section className="relative bg-paper py-32 overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          {/* Editorial header — left aligned, asymmetric */}
          <div className="grid md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-7">
              <p className="font-marker text-clay/75 text-base">— a collection of places</p>
              <h2 className="font-serif text-5xl md:text-6xl text-ink mt-3 leading-[1.05] tracking-tight">
                值得收藏的<br className="hidden md:block" />
                <span className="italic text-clay">每一處風景</span>
              </h2>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-ink/65 leading-[1.95] text-[15px]">
                從洛磯山的清晨倒影，到育空夜空裡的綠光——
                我們為你挑選了七個最值得寫進日記的目的地。
              </p>
              <Link to="/destinations" className="mt-6 inline-flex items-center gap-2 font-serif text-sm tracking-[0.2em] uppercase text-ink/75 hover:text-primary border-b border-clay/40 pb-1">
                完整地圖 <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Magazine asymmetric grid — varied sizes, intentional negative space */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-y-16">
            {/* Banff — large feature */}
            <Link to="/destinations" className="group col-span-12 md:col-span-7 relative">
              <div className="relative overflow-hidden aspect-[5/4]">
                <img src={destinations[0].img} alt={destinations[0].name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1400ms]" />
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-marker text-clay text-sm">01 ·</span>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink tracking-tight">{destinations[0].name}</h3>
                  <p className="text-sm text-ink/60 mt-1">{destinations[0].zh} — 加拿大最經典的湖光雪峰倒影</p>
                </div>
              </div>
            </Link>

            {/* Jasper — tall portrait, offset down */}
            <Link to="/destinations" className="group col-span-6 md:col-span-4 md:col-start-9 md:mt-24 relative">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={destinations[1].img} alt={destinations[1].name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1400ms]" />
              </div>
              <div className="mt-5">
                <span className="font-marker text-clay text-sm">02</span>
                <h3 className="font-serif text-xl md:text-2xl text-ink tracking-tight mt-1">{destinations[1].name}</h3>
                <p className="text-xs text-ink/60 mt-1">{destinations[1].zh} — 暗夜星空保護區</p>
              </div>
            </Link>

            {/* Vancouver — wide landscape */}
            <Link to="/destinations" className="group col-span-12 md:col-span-5 md:col-start-2 md:mt-8 relative">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={destinations[2].img} alt={destinations[2].name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1400ms]" />
              </div>
              <div className="mt-5">
                <span className="font-marker text-clay text-sm">03</span>
                <h3 className="font-serif text-xl md:text-2xl text-ink tracking-tight mt-1">{destinations[2].name}</h3>
                <p className="text-xs text-ink/60 mt-1">{destinations[2].zh} — 山與海之間的城市</p>
              </div>
            </Link>

            {/* Whistler — portrait */}
            <Link to="/destinations" className="group col-span-6 md:col-span-3 md:col-start-8 relative">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={destinations[3].img} alt={destinations[3].name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1400ms]" />
              </div>
              <div className="mt-5">
                <span className="font-marker text-clay text-sm">04</span>
                <h3 className="font-serif text-xl text-ink tracking-tight mt-1">{destinations[3].name}</h3>
                <p className="text-xs text-ink/60 mt-1">{destinations[3].zh}</p>
              </div>
            </Link>

            {/* Editorial pull-quote — breaks the grid */}
            <div className="hidden md:flex col-span-3 col-start-1 items-center justify-center mt-16">
              <blockquote className="font-serif italic text-ink/70 text-[17px] leading-[1.7] border-l border-clay/40 pl-5">
                「每個地方，<br />都值得慢慢走過一次。」
              </blockquote>
            </div>

            {/* Victoria */}
            <Link to="/destinations" className="group col-span-6 md:col-span-4 md:col-start-5 md:mt-12 relative">
              <div className="relative overflow-hidden aspect-[4/5]">
                <img src={destinations[4].img} alt={destinations[4].name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1400ms]" />
              </div>
              <div className="mt-5">
                <span className="font-marker text-clay text-sm">05</span>
                <h3 className="font-serif text-xl text-ink tracking-tight mt-1">{destinations[4].name}</h3>
                <p className="text-xs text-ink/60 mt-1">{destinations[4].zh} — 英倫風情與花園</p>
              </div>
            </Link>

            {/* Yukon */}
            <Link to="/destinations" className="group col-span-6 md:col-span-4 md:col-start-9 relative">
              <div className="relative overflow-hidden aspect-[4/5]">
                <img src={destinations[5].img} alt={destinations[5].name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1400ms]" />
              </div>
              <div className="mt-5">
                <span className="font-marker text-clay text-sm">06</span>
                <h3 className="font-serif text-xl text-ink tracking-tight mt-1">{destinations[5].name}</h3>
                <p className="text-xs text-ink/60 mt-1">{destinations[5].zh} — 北方曠野</p>
              </div>
            </Link>

            {/* Aurora — wide finale */}
            <Link to="/destinations" className="group col-span-12 md:col-span-9 md:col-start-3 md:mt-12 relative">
              <div className="relative overflow-hidden aspect-[21/9]">
                <img src={destinations[6].img} alt={destinations[6].name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1400ms]" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
                <div className="absolute left-8 bottom-7 text-cream">
                  <span className="font-marker text-cream/85 text-sm">07 — finale</span>
                  <h3 className="font-serif text-3xl md:text-5xl tracking-tight mt-2">{destinations[6].name}</h3>
                  <p className="font-marker text-cream/80 text-base mt-1">{destinations[6].zh} — 夜空下最浪漫的等待</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-28">
          <div className="text-center mb-14">
            <p className="font-marker text-clay/75 text-base tracking-wide">— frequently asked</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-2 tracking-tight">常見問題</h2>
            <div className="mx-auto mt-5 h-px w-16 bg-clay/30" />
          </div>
          <div className="divide-y divide-border/70 border-y border-border/70">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-serif text-lg text-ink">{f.q}</span>
                  <span className="text-clay text-2xl group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-[1.9] text-[15px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA — final journal page */}
      <section className="relative bg-cream pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="relative overflow-hidden rounded-[3px] bg-paper border border-clay/15 p-12 md:p-20 text-center shadow-[0_30px_60px_-30px_rgba(60,40,20,0.35)]">
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(60,40,20,0.6) 1px, transparent 1.4px)",
                backgroundSize: "5px 5px",
              }}
              aria-hidden
            />
            <p className="font-marker text-clay/80 text-lg">— and so the journey begins</p>
            <h2 className="font-serif text-4xl md:text-6xl text-ink mt-4 leading-[1.15] tracking-tight">
              下一趟旅程，<br/>從這裡開始。
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-clay/30" />
            <p className="mt-8 text-ink/70 max-w-xl mx-auto leading-relaxed">
              告訴我們你嚮往的風景，我們為你寫下最適合的旅行劇本。
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {[
                { l: "WhatsApp", h: "https://wa.me/" },
                { l: "KakaoTalk", h: "#" },
                { l: "WeChat", h: "#" },
                { l: "Email", h: "mailto:hello@shootingstartravel.ca" },
              ].map((c) => (
                <a key={c.l} href={c.h} className="rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm tracking-wide hover:bg-primary/90 transition shadow-[0_8px_22px_-10px_rgba(40,55,30,0.5)]">
                  {c.l}
                </a>
              ))}
            </div>
          </div>
        </div>
        
      </section>
    </SiteLayout>
  );
}
