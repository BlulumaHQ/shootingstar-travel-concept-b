import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import hero from "@/assets/hero-mountains.jpg";
import journal from "@/assets/about-collage.png";
import tourBanff from "@/assets/tour-banff.jpg";
import destJasper from "@/assets/dest-jasper.jpg";
import destWhistler from "@/assets/dest-whistler.jpg";
import destYukon from "@/assets/dest-yukon.jpg";
import tourVancouver from "@/assets/tour-vancouver.jpg";
import tourVictoria from "@/assets/tour-victoria.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import guest1 from "@/assets/guest-1.jpg";
import tourGroup from "@/assets/tour-group.jpg";
import logoSeal from "@/assets/logo-seal.png";
import { Heart as HeartFill } from "lucide-react";
import { tours as allTours } from "@/data/tours";
import { reviews as allReviews } from "@/data/reviews";
import { ReviewCard } from "@/components/site/ReviewCard";
import {
  CameraMapIcon, GroupRoadIcon, MountainFlagIcon, ShieldHeartIcon, CupSuitcaseIcon, PlaneTrailIcon,
} from "@/components/site/DoodleIcons";
import { StarMark, MountainMark, PinMark, CompassMark, BusMark, JourneyPath, DottedLine } from "@/components/site/BrandMarks";

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

const featured = allTours.slice(0, 6);

const features = [
  { Icon: CameraMapIcon,    t: "精選行程", d: "精心規劃經典路線\n探索每一個值得收藏的角落" },
  { Icon: GroupRoadIcon,    t: "小團出發", d: "小團更自在\n深度體驗在地風情" },
  { Icon: MountainFlagIcon, t: "專業旅遊", d: "在地專業嚮導帶路\n讓旅程更安心有趣" },
  { Icon: ShieldHeartIcon,  t: "安心保障", d: "完善旅遊保障制度\n讓你玩得安心無憂" },
  { Icon: CupSuitcaseIcon,  t: "貼心服務", d: "從行前到旅途中\n全程貼心為你服務" },
];

const destinations = [
  { img: tourBanff, name: "Banff", zh: "班夫", note: "湖光雪峰倒影，加拿大最經典的明信片風景。" },
  { img: destJasper, name: "Jasper", zh: "傑士伯", note: "暗夜星空保護區，靜謐而深邃的山林夜晚。" },
  { img: tourVancouver, name: "Vancouver", zh: "溫哥華", note: "山與海之間的城市，舒緩而現代的生活步調。" },
  { img: destWhistler, name: "Whistler", zh: "惠斯勒", note: "冬日滑雪、夏日山徑的度假名所。" },
  { img: tourVictoria, name: "Victoria", zh: "維多利亞", note: "英倫風情與布查特花園的春日午後。" },
  { img: tourAurora, name: "Aurora", zh: "極光", note: "夜空下最浪漫的等待，綠光輕輕落下。" },
];


const faqs = [
  { q: "如何報名？", a: "您可以透過聯絡我們頁面填寫表單，或直接以 WhatsApp、KakaoTalk、WeChat 與我們聯繫，將會有專人於 24 小時內回覆。" },
  { q: "是否提供中文導遊？", a: "是的，我們提供繁體中文、簡體中文、韓文與英文導遊服務。" },
  { q: "可以取消或改期嗎？", a: "出發前 30 天以上可全額退費，依行程不同有彈性方案，詳細條款於報名時說明。" },
  { q: "是否包含住宿？", a: "多日行程包含精選住宿，皆為 3 星以上飯店或特色山屋。" },
  { q: "如何付款？", a: "支援信用卡、Interac e-Transfer、銀行轉帳與 PayPal。" },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO — editorial 2-polaroid composition */}
      <section className="relative bg-cream">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 pt-20 md:pt-28 pb-24 md:pb-36">
          <div className="grid md:grid-cols-12 gap-14 md:gap-20 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <p className="font-marker text-primary/75 text-[12px] tracking-[0.32em] uppercase">Spring Journal · 2026</p>
              <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.08] tracking-[-0.015em] text-ink mt-7 font-medium">
                旅行不只是<br />
                抵達一個地方，<br />
                <span className="italic text-primary">而是被光照亮的時刻</span>
              </h1>
              <p className="mt-9 text-ink/60 leading-[2] text-[15px] max-w-md">
                小團・慢走・用心。Shootingstar Travel 帶你以最輕盈的步調，
                收集加拿大山與海之間的每一道光。
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Link to="/tours" className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-primary-foreground font-medium text-[14px] tracking-[0.08em] uppercase shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)] hover:bg-primary/90 transition">
                  探索行程 <span aria-hidden>→</span>
                </Link>
                <Link to="/reviews" className="text-ink/65 text-[13.5px] tracking-[0.08em] uppercase underline decoration-primary/30 underline-offset-[6px] hover:text-primary transition">
                  Travellers' Stories →
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 order-1 md:order-2 relative">
              <div className="relative h-[440px] md:h-[560px] mx-auto max-w-[520px]">
                {/* soft ambient glow */}
                <div className="absolute -top-10 -left-6 w-44 h-44 rounded-full opacity-50 blur-3xl" style={{ background: "var(--lavender-soft)" }} aria-hidden />
                <div className="absolute -bottom-10 -right-6 w-52 h-52 rounded-full opacity-50 blur-3xl" style={{ background: "var(--sage-soft)" }} aria-hidden />

                {/* paper airplane — fully visible, no clip */}
                <PlaneTrailIcon size={84} className="absolute -top-6 -right-2 text-primary/40 rotate-[-10deg] hidden md:block z-20" />

                {/* Polaroid 1 — back */}
                <figure className="polaroid absolute top-2 left-0 md:left-4 w-[60%] rotate-[-5deg] z-10">
                  <img src={tourBanff} alt="Mountain reflection at golden hour" className="aspect-square w-full object-cover" />
                  <figcaption className="font-marker text-ink/70 text-[13px] mt-3 text-center tracking-wide">Banff · 06:42</figcaption>
                </figure>

                {/* Polaroid 2 — front, overlapping */}
                <figure className="polaroid absolute bottom-0 right-0 md:right-4 w-[60%] rotate-[4deg] z-20">
                  <img src={tourAurora} alt="Aurora over still lake" className="aspect-square w-full object-cover" />
                  <figcaption className="font-marker text-ink/70 text-[13px] mt-3 text-center tracking-wide">Yukon · 23:18</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / FEATURE ICONS */}
      <section className="relative bg-[var(--sand)] py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-14">
            {features.map((f) => (
              <div key={f.t} className="flex flex-col items-start">
                <span className="text-primary"><f.Icon size={48} /></span>
                <p className="mt-5 font-serif text-[17px] text-ink font-semibold">{f.t}</p>
                <p className="mt-2.5 text-[12.5px] text-ink/60 leading-[1.85] whitespace-pre-line">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="relative bg-cream pt-20 md:pt-24 pb-24 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <BusMark size={18} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">Featured Journeys</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink tracking-[-0.012em] font-medium mt-5">精選行程</h2>
            </div>
            <Link to="/tours" className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-primary text-[12px] tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground transition">
              View all <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10">
            {featured.map((t) => (
              <Link
                to="/tours/$slug"
                params={{ slug: t.slug }}
                key={t.slug}
                className="group relative bg-card rounded-[6px] p-3 pb-5 shadow-[0_2px_4px_-2px_rgba(70,80,75,0.06),0_18px_36px_-22px_rgba(70,80,75,0.22)] hover:-translate-y-1 transition-all duration-500 block"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-[4px]">
                  <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                  <button aria-label="Save" onClick={(e) => e.preventDefault()} className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-cream/90 text-primary backdrop-blur-sm hover:bg-cream transition">
                    <HeartFill size={13} strokeWidth={1.8} />
                  </button>
                </div>
                <div className="px-1 pt-4">
                  <h3 className="font-serif text-[15px] md:text-base text-ink leading-snug font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-[11.5px] text-ink/55 leading-relaxed">{t.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-serif text-[13.5px] text-primary font-semibold">{t.price}</p>
                    <span className="text-[11px] text-primary">查看 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
            <Link to="/tours" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground text-[13px]">
              探索所有行程 →
            </Link>
          </div>
        </div>
      </section>

      {/* GUEST STORIES — 旅客分享 */}
      <section className="relative bg-[var(--sand)] py-24 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-end justify-between gap-4 mb-14">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={18} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">Travellers' Words</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink tracking-[-0.012em] font-medium mt-5">旅客分享</h2>
              <p className="mt-4 text-ink/55 text-[13.5px] leading-[2]">真實旅人寫下的小小回憶。</p>
            </div>
            <Link to="/reviews" className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-primary text-[12px] tracking-[0.18em] uppercase hover:bg-primary hover:text-primary-foreground transition">
              More stories →
            </Link>
          </div>
        </div>

        {/* Desktop marquee */}
        <div className="hidden md:block marquee-pause relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--sand)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--sand)] to-transparent z-10" />
          <div className="overflow-hidden">
            <div className="animate-marquee flex gap-6 w-max px-6">
              {[...allReviews, ...allReviews].map((r, i) => (
                <div key={i} className="w-[340px] shrink-0">
                  <ReviewCard r={r} compact />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile swipe */}
        <div className="md:hidden mt-2">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-4">
            {allReviews.map((r, i) => (
              <div key={i} className="snap-center shrink-0 w-[82vw] max-w-[340px]">
                <ReviewCard r={r} compact />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 px-6">
            <Link to="/reviews" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-[13px]">更多分享 →</Link>
          </div>
        </div>
      </section>

      {/* ABOUT US — editorial */}
      <section className="bg-cream py-24 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-6 relative">
              <div className="relative">
                <img src={journal} alt="Shooting Star travel collage" loading="lazy" className="rounded-[4px] shadow-[0_30px_60px_-30px_rgba(60,80,70,0.4)] w-full" />
                {/* Logo sticker — bottom-left of main collage, die-cut white edge */}
                <img
                  src={logoSeal}
                  alt="Shooting Star Travel"
                  className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-12 w-[34%] md:w-[30%] rotate-[-8deg] pointer-events-none"
                  style={{
                    filter:
                      "drop-shadow(0 0 0 #fff) drop-shadow(0 0 2px #fff) drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(0 14px 18px rgba(60,80,70,0.35))",
                  }}
                />
              </div>
              <div className="hidden md:block absolute -bottom-10 -right-6 w-[42%]">
                <img src={tourGroup} alt="Shooting Star tour group at a scenic viewpoint" loading="lazy" className="aspect-[4/5] object-cover rounded-[4px] border-[6px] border-cream shadow-[0_20px_40px_-20px_rgba(60,80,70,0.4)] w-full" />
              </div>
            </div>
            <div className="md:col-span-6 md:pl-4">
              <div className="flex items-center gap-3 text-primary/75">
                <CompassMark size={18} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">About the Studio</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium leading-[1.18] tracking-[-0.012em]">關於 Shooting Star Travel</h2>
              <p className="mt-7 text-ink/70 leading-[2] text-[15px]">
                用心規劃每一段旅程，讓旅行不只是到達目的地，而是留下值得收藏的回憶。
              </p>
              <p className="mt-5 text-ink/70 leading-[2] text-[15px]">
                我們專注於加拿大在地旅遊體驗，為不同語言與背景的旅客規劃安心、舒適、有溫度的行程。
                小團出發、用心安排，讓每位旅人都能放心、自在地走進每一段風景。
              </p>
              <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-primary text-[14px] underline underline-offset-[6px] decoration-primary/40 hover:decoration-primary">
                認識我們 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS — fixed 3-col grid */}
      <section className="relative bg-[var(--sand)] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="text-center mb-20 md:mb-24">
            <div className="flex items-center justify-center gap-3 text-primary/75">
              <DottedLine length={24} className="text-primary/45" />
              <PinMark size={18} className="text-primary/65" />
              <span className="text-[11px] tracking-[0.4em] uppercase">A Collection of Places</span>
              <PinMark size={18} className="text-primary/65" />
              <DottedLine length={24} className="text-primary/45" />
            </div>
            <h2 className="font-serif text-4xl md:text-[52px] text-ink mt-6 leading-[1.15] tracking-[-0.015em] font-medium">
              值得收藏的<span className="italic text-primary">每一處風景</span>
            </h2>
            <p className="mt-6 text-ink/65 leading-[2] text-[15px] max-w-xl mx-auto">
              從洛磯山的清晨倒影，到育空夜空裡的綠光—— 七個最值得寫進日記的目的地。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {destinations.map((d) => (
              <article key={d.name} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_20px_40px_-25px_rgba(60,80,70,0.35)]">
                  <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1200ms]" />
                </div>
                <div className="mt-5">
                  <p className="font-marker text-primary text-[13px] tracking-[0.2em] uppercase">{d.zh}</p>
                  <h3 className="font-serif text-xl text-ink mt-1.5 font-semibold">{d.name}</h3>
                  <p className="mt-3 text-[13.5px] text-ink/65 leading-[1.9]">{d.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — luxury negative space */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-28 md:py-36">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 text-primary/75">
                <StarMark size={16} className="text-primary/65" />
                <DottedLine length={32} className="text-primary/45" />
                <span className="text-[11px] tracking-[0.4em] uppercase">Frequently Asked</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 tracking-[-0.012em] font-medium">常見問題</h2>
            </div>
            <Link to="/faq" className="text-primary text-[12px] tracking-[0.18em] uppercase underline decoration-primary/40 underline-offset-[8px] hover:decoration-primary">
              View all FAQs →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group border-b border-primary/15 py-6 open:pb-7"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                  <span className="font-serif text-[16px] text-ink leading-snug">{f.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                </summary>
                <p className="mt-4 text-ink/60 leading-[2] text-[14px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA — full-width row */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--lavender-soft) 0%, var(--sage-soft) 100%)" }}
      >
        {/* unified journey path */}
        <JourneyPath className="absolute inset-0 w-full h-full text-ink/30 opacity-60 pointer-events-none" variant="long" />
        <div className="mx-auto max-w-[1240px] px-6 md:px-12 py-24 md:py-32 relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 text-ink/65">
                <MountainMark size={20} className="text-ink/55" />
                <DottedLine length={32} className="text-ink/35" />
                <span className="text-[11px] tracking-[0.4em] uppercase">And the journey begins</span>
              </div>
              <h2 className="font-serif text-4xl md:text-[56px] text-ink mt-6 leading-[1.1] tracking-[-0.015em] font-medium">
                下一趟旅程，<br />從這裡開始。
              </h2>
              <p className="mt-7 text-ink/70 leading-[2] text-[15px] max-w-lg">
                告訴我們你想去的地方，我們會協助你找到最適合的行程。
              </p>
            </div>
            <div className="md:col-span-5 md:pl-4">
              <div className="flex flex-wrap gap-3">
                <Link to="/tours" className="rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm tracking-wide hover:bg-primary/90 transition shadow-[0_10px_24px_-12px_oklch(0.585_0.04_155/0.6)]">
                  探索所有行程 →
                </Link>
                <Link to="/contact" className="rounded-full border border-ink/30 text-ink px-7 py-3 text-sm tracking-wide hover:bg-cream transition">
                  聯絡我們
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { l: "WhatsApp", h: "https://wa.me/" },
                  { l: "Email", h: "mailto:hello@shootingstartravel.ca" },
                  { l: "KakaoTalk", h: "#" },
                ].map((c) => (
                  <a key={c.l} href={c.h} className="rounded-full bg-cream/70 backdrop-blur-sm text-ink/75 px-4 py-1.5 text-[12.5px] hover:bg-cream transition">
                    {c.l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
