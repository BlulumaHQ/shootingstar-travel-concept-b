import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import hero from "@/assets/hero-mountains.jpg";
import heroCabin from "@/assets/hero-cabin.jpg";
import journal from "@/assets/journal.jpg";
import tourBanff from "@/assets/tour-banff.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import tourVancouver from "@/assets/tour-vancouver.jpg";
import tourVictoria from "@/assets/tour-victoria.jpg";
import tourPrivate from "@/assets/tour-private.jpg";
import tourIcefield from "@/assets/tour-icefield.jpg";
import tourToronto from "@/assets/tour-toronto.jpg";
import destJasper from "@/assets/dest-jasper.jpg";
import destWhistler from "@/assets/dest-whistler.jpg";
import destYukon from "@/assets/dest-yukon.jpg";
import guest1 from "@/assets/guest-1.jpg";
import guest2 from "@/assets/guest-2.jpg";
import guest3 from "@/assets/guest-3.jpg";
import { MapPin, Users, UserCheck, Heart, Camera, Heart as HeartFill, Star } from "lucide-react";

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
  { img: tourRockies, title: "落磯山經典團 5天4夜", desc: "班夫・露易絲湖・冰原大道", price: "CAD $1,280 起" },
  { img: tourBanff, title: "班夫國家公園一日遊", desc: "夢蓮湖・露易絲湖・弓河瀑布", price: "CAD $179 起" },
  { img: tourAurora, title: "極光追蹤之旅", desc: "黃刀鎮・極光小屋・專業攝影", price: "CAD $229 起" },
  { img: tourToronto, title: "溫哥華市區深度遊", desc: "城市精華景點・深度體驗", price: "CAD $129 起" },
  { img: tourIcefield, title: "哥倫比亞冰原大道", desc: "冰原雪車・天空步道・弓湖", price: "CAD $199 起" },
];

const features = [
  { icon: MapPin,    t: "精選行程", d: "精心規劃經典路線\n帶你探索最美景點" },
  { icon: Users,     t: "小團出發", d: "小團出發更自在\n深度體驗在地風情" },
  { icon: UserCheck, t: "專業導遊", d: "在地專業嚮導帶路\n讓旅程更安心有趣" },
  { icon: Heart,     t: "安心保障", d: "完善旅遊保障制度\n讓你玩得安心無憂" },
  { icon: Camera,    t: "貼心服務", d: "從行前到旅途中\n全程貼心為你服務" },
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
  { img: guest1, name: "小美", quote: "這趟旅行太值得了！導遊非常專業又貼心，景色美到讓人屏息，已經推薦給朋友們了！", rating: 5 },
  { img: guest2, name: "阿哲", quote: "行程安排很順，時間抓得剛剛好，不會太趕也不會無聊，下次還想再參加！", rating: 5 },
  { img: guest3, name: "Rachel", quote: "極光之旅超級成真！工作人員很用心，拍照狠拍一流，整趟旅程都非常感動！", rating: 5 },
  { img: guest1, name: "家豪", quote: "服務超級級好，有任何問題都能即時處理，讓我們玩得很放心！", rating: 5 },
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
      {/* HERO — airy editorial */}
      <section className="relative bg-cream overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 pt-20 md:pt-28 pb-24 md:pb-32">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <p className="font-marker text-primary/80 text-base tracking-[0.25em] uppercase">— spring journal</p>
              <h1 className="font-serif text-[40px] md:text-[64px] leading-[1.15] tracking-tight text-ink mt-6 font-medium">
                旅行不只是<br />
                抵達一個地方，<br />
                <span className="italic text-primary">而是被光照亮的時刻</span>
              </h1>
              <p className="mt-8 text-ink/65 leading-[2] text-[15.5px] max-w-md">
                小團・慢走・用心。Shootingstar Travel 帶你以最輕盈的步調，
                收集加拿大山與海之間的每一道光。
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-primary-foreground font-medium text-[14.5px] tracking-wide shadow-[0_10px_28px_-12px_oklch(0.585_0.04_155/0.7)] hover:bg-primary/90 transition"
                >
                  探索所有行程 <span aria-hidden>→</span>
                </Link>
                <Link to="/stories" className="text-ink/70 text-[14px] underline decoration-primary/40 underline-offset-[6px] hover:text-primary transition">
                  讀讀旅人故事 →
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 order-1 md:order-2 relative">
              <div className="relative">
                <div className="absolute -top-6 -left-4 md:-left-8 w-32 h-32 rounded-full opacity-60 blur-2xl" style={{ background: "var(--lavender-soft)" }} aria-hidden />
                <div className="absolute -bottom-8 -right-4 w-40 h-40 rounded-full opacity-50 blur-2xl" style={{ background: "var(--sage-soft)" }} aria-hidden />
                <figure className="relative polaroid rotate-[2deg] max-w-[460px] ml-auto">
                  <span className="tape -top-4 left-10 rotate-[-8deg]" aria-hidden />
                  <img src={tourBanff} alt="Mountain reflection at golden hour" className="h-[320px] md:h-[420px] w-full object-cover" width={800} height={600} />
                  <figcaption className="font-marker text-ink/80 text-base mt-4 text-center">
                    一起出發吧 ✦
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — 5 icon row, breathable */}
      <section className="relative bg-[var(--sand)] py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-14">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.t} className="flex flex-col items-start">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-cream border border-primary/15 text-primary shadow-[0_4px_14px_-6px_oklch(0.585_0.04_155/0.4)]">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <p className="mt-6 font-serif text-[17px] text-ink font-semibold">{f.t}</p>
                  <p className="mt-2.5 text-[12.5px] text-ink/60 leading-[1.85] whitespace-pre-line">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* FEATURED TOURS — 5 polaroid cards with hearts */}
      <section className="relative bg-paper pt-12 pb-24">
        <div className="mx-auto max-w-[1320px] px-6 md:px-12">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div className="flex items-end gap-5">
              <h2 className="font-serif text-3xl md:text-4xl text-ink tracking-tight font-semibold">熱門行程推薦</h2>
              <svg className="hidden md:block mb-2 w-24 h-3 text-clay/60" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M2 6 C 30 1, 70 11, 96 5" />
                <path d="M96 5 l -7 -2 M96 5 l -2 7" />
              </svg>
            </div>
            <Link
              to="/tours"
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-[oklch(0.30_0.04_60)] px-5 py-2.5 text-cream text-[13px] tracking-wide hover:bg-[oklch(0.26_0.04_60)] transition"
            >
              探索所有行程 <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {tours.map((t) => (
              <article
                key={t.title}
                className="group relative bg-card rounded-[3px] p-3 pb-5 shadow-[0_2px_4px_-2px_rgba(60,40,20,0.08),0_18px_36px_-22px_rgba(60,40,20,0.32)] hover:-translate-y-1 hover:rotate-[0.5deg] transition-all duration-500"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-[2px]">
                  <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                  <button aria-label="Save" className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-cream/85 text-clay backdrop-blur-sm hover:bg-cream transition">
                    <HeartFill size={13} strokeWidth={1.8} />
                  </button>
                </div>
                <div className="px-1 pt-4">
                  <h3 className="font-serif text-[15px] md:text-base text-ink leading-snug font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-[11.5px] text-ink/55 leading-relaxed">{t.desc}</p>
                  <p className="mt-3 font-serif text-[13.5px] text-ink font-semibold">{t.price}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link to="/tours" className="inline-flex items-center gap-2 rounded-md bg-[oklch(0.30_0.04_60)] px-5 py-2.5 text-cream text-[13px]">
              探索所有行程 →
            </Link>
          </div>
        </div>
      </section>

      {/* GUEST STORIES — 4 polaroid testimonials */}
      <section className="relative bg-paper pb-28">
        <div className="mx-auto max-w-[1320px] px-6 md:px-12">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-ink tracking-tight font-semibold">旅客真實分享</h2>
            <svg className="hidden md:block w-24 h-3 text-clay/60" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 6 C 30 1, 70 11, 96 5" />
              <path d="M96 5 l -7 -2 M96 5 l -2 7" />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {stories.map((s, i) => {
              const rotations = ["rotate-[-2deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[2deg]"];
              return (
                <figure key={i} className={`relative ${rotations[i]} flex gap-4 items-start bg-card p-4 shadow-[0_10px_24px_-12px_rgba(60,40,20,0.3)]`}>
                  <span className="absolute -top-3 left-6 w-16 h-5 bg-[var(--tape)] rotate-[-6deg] shadow-sm" aria-hidden />
                  <div className="shrink-0 w-[110px]">
                    <img src={s.img} alt={s.name} loading="lazy" className="h-[120px] w-full object-cover" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex gap-0.5 text-[oklch(0.7_0.18_70)]">
                      {Array.from({ length: s.rating }).map((_, j) => <Star key={j} size={11} fill="currentColor" stroke="none" />)}
                    </div>
                    <p className="mt-2 text-[12px] text-ink/75 leading-[1.7]">{s.quote}</p>
                    <p className="mt-2 text-right font-marker text-[11px] text-ink/60">— {s.name}</p>
                  </div>
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
