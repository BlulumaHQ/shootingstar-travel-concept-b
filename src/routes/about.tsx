import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import journal from "@/assets/about-collage.png";
import tourBanff from "@/assets/tour-banff.jpg";
import tourRockies from "@/assets/tour-rockies.jpg";
import tourAurora from "@/assets/tour-aurora.jpg";
import { CompassMark, StarMark, MountainMark, PinMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "關於我們 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 是加拿大在地小團旅遊品牌，專為中文、韓文與英文旅客設計安心、舒適、有溫度的行程。" },
      { property: "og:title", content: "關於我們 | Shootingstar Travel" },
      { property: "og:description", content: "在地小團、慢走、用心 — 我們對每位旅人的承諾。" },
      { property: "og:image", content: journal },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "小團出發，更舒適", d: "8–14 人小團，不趕路、不堵點，每位旅人都被照顧到。" },
  { t: "用心安排每個細節", d: "從接機、住宿到一杯咖啡的轉角，每個環節都親自挑選。" },
  { t: "中文・韓文・英文導遊", d: "為不同語言旅客設計流暢溝通與在地解說。" },
  { t: "重視安全與溝通", d: "完整旅遊保險、24 小時聯絡窗口，讓家人放心。" },
  { t: "讓旅程更有故事感", d: "我們相信旅行不只到達目的地，而是留下值得收藏的回憶。" },
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
            關於 <span className="italic text-primary">Shooting Star Travel</span>
          </h1>
          <p className="mt-8 text-ink/65 max-w-2xl leading-[2] text-[15.5px]">
            用心規劃每一段旅程，讓旅行不只是到達目的地，而是留下值得收藏的回憶。
          </p>
        </div>
        <JourneyPath className="absolute bottom-0 left-0 right-0 w-full h-24 text-primary/30 pointer-events-none" variant="long" />
      </section>

      {/* STORY — editorial collage left, text right */}
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
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium tracking-[-0.012em] leading-[1.18]">為旅人寫下值得收藏的時光</h2>
              <div className="mt-7 space-y-5 text-ink/75 leading-[2] text-[15px]">
                <p>
                  Shooting Star Travel 專注於加拿大在地旅遊體驗，為不同語言與背景的旅客規劃安心、舒適、有溫度的行程。
                </p>
                <p>
                  我們相信旅行不只是參觀景點，而是透過每一次出發，遇見風景、文化與人之間的連結。
                </p>
                <p>
                  從卡加利的清晨到育空的星空，我們在路上的每一天，都希望能與你一起，把加拿大寫進你的旅行日記裡。
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div><div className="font-serif text-2xl text-primary">10+</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">年在地經驗</div></div>
                <div><div className="font-serif text-2xl text-primary">2,400+</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">旅人共同走過</div></div>
                <div><div className="font-serif text-2xl text-primary">4.9</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">平均評價</div></div>
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
            <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium tracking-[-0.012em]">我們的旅行哲學</h2>
            <p className="mt-6 text-ink/60 leading-[2] text-[15px]">五個我們在意的事，串起每一次出發。</p>
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
          <h2 className="font-serif text-3xl md:text-[44px] text-ink mt-7 font-medium tracking-[-0.012em]">為這些旅人而設計</h2>
          <p className="mt-6 text-ink/65 leading-[2] text-[15px] max-w-2xl mx-auto">
            無論你是第一次來加拿大、想一家人慢慢走、或是希望能用母語放心溝通——
            我們都用同樣的用心，準備一段屬於你的旅程。
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {["中文家庭旅客", "韓國長住或度假", "情侶 / 蜜月旅人", "國際小團體"].map((g) => (
              <div key={g} className="rounded-2xl bg-[var(--sand)] py-5 text-[13.5px] text-ink/75">{g}</div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
