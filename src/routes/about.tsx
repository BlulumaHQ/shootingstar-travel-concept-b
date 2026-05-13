import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import journal from "@/assets/about-collage.png";
import tourBanff from "@/assets/tour-banff.webp";
import tourRockies from "@/assets/tour-rockies.webp";
import { CompassMark, StarMark, MountainMark, PinMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { useLocale, type Locale } from "@/i18n/locale";

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
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/about" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh/about" },
      { rel: "alternate", hrefLang: "ko", href: "https://shootingstar-travel-concept-b.lovable.app/ko/about" },
      { rel: "alternate", hrefLang: "x-default", href: "https://shootingstar-travel-concept-b.lovable.app/about" },
    ],
  }),
  component: AboutPage,
});

type Pack = {
  eyebrow: string; titleA: string; titleB: string; intro: string;
  storyEyebrow: string; storyHeading: string; storyBody: string[];
  stat1: string; stat1L: string; stat2: string; stat2L: string; stat3: string; stat3L: string;
  valuesEyebrow: string; valuesHeading: string; valuesBody: string;
  values: { t: string; d: string }[];
  whoEyebrow: string; whoHeading: string; whoBody: string;
  whoTags: string[];
};

const PACKS: Record<Locale, Pack> = {
  en: {
    eyebrow: "About the Studio",
    titleA: "About ", titleB: "Shooting Star Travel",
    intro: "We craft each journey with care so travel becomes more than arriving — it becomes a memory worth keeping.",
    storyEyebrow: "Our Story",
    storyHeading: "Quiet hours worth keeping",
    storyBody: [
      "Shooting Star Travel is devoted to small-group travel across Canada — calm, considered itineraries for travellers from many languages and backgrounds.",
      "We believe a journey is not just about visiting places. It's about meeting landscape, culture and people, one slow day at a time.",
      "From sunrise in Calgary to starlight over the Yukon, we hope to write Canada into your travel diary, one chapter at a time.",
    ],
    stat1: "10+", stat1L: "Years on the ground",
    stat2: "2,400+", stat2L: "Travellers hosted",
    stat3: "4.9", stat3L: "Average rating",
    valuesEyebrow: "What We Believe",
    valuesHeading: "Our travel philosophy",
    valuesBody: "Five things we care about — woven through every departure.",
    values: [
      { t: "Small groups, more comfort", d: "8–14 travellers per departure — no rushing, no crowds, every guest is looked after." },
      { t: "Considered in every detail", d: "From airport pickups to the corner café, every touchpoint is hand-picked." },
      { t: "English, Mandarin & Korean guides", d: "Conversation and storytelling designed for travellers in their own language." },
      { t: "Safety and clear communication", d: "Full travel insurance and a 24-hour contact line so loved ones rest easy." },
      { t: "Journeys with story", d: "We believe travel is not about arriving but about memories worth keeping." },
    ],
    whoEyebrow: "Who We Travel With",
    whoHeading: "Designed for these travellers",
    whoBody: "Whether it's your first time in Canada, a slow family holiday, or a trip you'd rather take in your mother tongue — we bring the same care to every journey we shape for you.",
    whoTags: ["Mandarin-speaking families", "Korean long-stay & holiday", "Couples & honeymooners", "International small groups"],
  },
  zh: {
    eyebrow: "About the Studio",
    titleA: "關於 ", titleB: "Shooting Star Travel",
    intro: "用心規劃每一段旅程,讓旅行不只是到達目的地,而是留下值得收藏的回憶。",
    storyEyebrow: "Our Story",
    storyHeading: "值得收藏的安靜時光",
    storyBody: [
      "Shooting Star Travel 致力於加拿大小團旅遊 — 為不同語言與背景的旅人提供舒緩、用心的行程。",
      "我們相信旅行不只是造訪一個地方,而是與風景、文化、人們相遇 — 一天一天慢慢來。",
      "從卡加利的清晨到育空的星光,我們希望將加拿大寫進你的旅行日記,一頁一頁。",
    ],
    stat1: "10+", stat1L: "在地經驗",
    stat2: "2,400+", stat2L: "旅人陪伴",
    stat3: "4.9", stat3L: "平均評價",
    valuesEyebrow: "What We Believe",
    valuesHeading: "我們的旅行哲學",
    valuesBody: "五個我們在乎的事 — 貫穿每一次出發。",
    values: [
      { t: "小團更舒適", d: "每團 8–14 人 — 不趕、不擠,每位旅人都被照顧到。" },
      { t: "細節都用心", d: "從機場接送到街角咖啡,每個接觸點都精挑細選。" },
      { t: "中英韓三語導遊", d: "用旅人母語對話與述說的旅程。" },
      { t: "安全與清晰溝通", d: "完整旅遊保險與 24 小時聯絡專線,讓家人安心。" },
      { t: "有故事的旅程", d: "我們相信旅行不在抵達,而在值得收藏的回憶。" },
    ],
    whoEyebrow: "Who We Travel With",
    whoHeading: "為這些旅人而設計",
    whoBody: "無論是第一次來加拿大、慢步調的家庭旅行,或是想用母語旅行的你 — 我們都用同樣的用心為你規劃每一段旅程。",
    whoTags: ["中文家庭", "韓文長期 / 假期", "情侶與蜜月", "國際小團"],
  },
  ko: {
    eyebrow: "About the Studio",
    titleA: "소개 ", titleB: "Shooting Star Travel",
    intro: "모든 여정을 정성껏 설계해 여행이 도착 그 이상이 되도록 — 간직할 가치 있는 추억으로.",
    storyEyebrow: "Our Story",
    storyHeading: "간직할 가치 있는 고요한 시간",
    storyBody: [
      "Shooting Star Travel은 캐나다 전역의 소그룹 여행에 헌신합니다 — 다양한 언어와 배경의 여행자를 위한 차분하고 사려 깊은 일정.",
      "여행은 단지 장소를 방문하는 것이 아니라 풍경, 문화, 사람들을 하루하루 천천히 만나는 것이라 믿습니다.",
      "캘거리의 일출부터 유콘의 별빛까지, 캐나다를 당신의 여행 일기에 한 장 한 장 적어드리고 싶습니다.",
    ],
    stat1: "10+", stat1L: "현지 운영 경력",
    stat2: "2,400+", stat2L: "함께한 여행자",
    stat3: "4.9", stat3L: "평균 평점",
    valuesEyebrow: "What We Believe",
    valuesHeading: "우리의 여행 철학",
    valuesBody: "우리가 소중히 여기는 다섯 가지 — 모든 출발에 녹아 있습니다.",
    values: [
      { t: "소그룹의 편안함", d: "출발당 8–14명 — 서두르지 않고, 붐비지 않으며, 모든 손님을 살핍니다." },
      { t: "모든 디테일을 고민합니다", d: "공항 픽업부터 골목 카페까지, 모든 접점을 직접 고릅니다." },
      { t: "영어/중국어/한국어 가이드", d: "여행자의 모국어로 이야기하는 여정." },
      { t: "안전과 명확한 소통", d: "전 일정 여행자 보험과 24시간 연락 채널로 가족도 안심." },
      { t: "이야기가 있는 여정", d: "여행의 본질은 도착이 아니라 간직할 추억이라 믿습니다." },
    ],
    whoEyebrow: "Who We Travel With",
    whoHeading: "이런 여행자를 위해 설계되었습니다",
    whoBody: "캐나다 첫 방문이든, 가족과의 느린 휴가든, 모국어로 떠나고 싶은 여행이든 — 모든 여정에 동일한 정성을 담습니다.",
    whoTags: ["중국어권 가족", "한국 장기/휴가", "커플 & 허니문", "국제 소그룹"],
  },
};

export function AboutPage() {
  const p = PACKS[useLocale()];
  return (
    <SiteLayout>
      <section className="relative bg-cream">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 pt-24 md:pt-36 pb-16 md:pb-20">
          <div className="flex items-center gap-3 text-primary/75">
            <CompassMark size={20} className="text-primary/65" />
            <DottedLine length={36} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase">{p.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[64px] text-ink mt-7 font-medium leading-[1.1] tracking-[-0.018em] max-w-3xl">
            {p.titleA}<span className="italic text-primary">{p.titleB}</span>
          </h1>
          <p className="mt-8 text-ink/65 max-w-2xl leading-[2] text-[15.5px]">{p.intro}</p>
        </div>
        <JourneyPath className="absolute bottom-0 left-0 right-0 w-full h-24 text-primary/30 pointer-events-none" variant="long" />
      </section>

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
                <span className="text-[11px] tracking-[0.4em] uppercase">{p.storyEyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium tracking-[-0.012em] leading-[1.18]">{p.storyHeading}</h2>
              <div className="mt-7 space-y-5 text-ink/75 leading-[2] text-[15px]">
                {p.storyBody.map((s) => <p key={s}>{s}</p>)}
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div><div className="font-serif text-2xl text-primary">{p.stat1}</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">{p.stat1L}</div></div>
                <div><div className="font-serif text-2xl text-primary">{p.stat2}</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">{p.stat2L}</div></div>
                <div><div className="font-serif text-2xl text-primary">{p.stat3}</div><div className="text-[11.5px] text-ink/55 mt-1 tracking-wider">{p.stat3L}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--sand)] py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="max-w-xl mb-20">
            <div className="flex items-center gap-3 text-primary/75">
              <MountainMark size={20} className="text-primary/65" />
              <DottedLine length={32} className="text-primary/45" />
              <span className="text-[11px] tracking-[0.4em] uppercase">{p.valuesEyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 font-medium tracking-[-0.012em]">{p.valuesHeading}</h2>
            <p className="mt-6 text-ink/60 leading-[2] text-[15px]">{p.valuesBody}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
            {p.values.map((v, i) => (
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

      <section className="bg-cream py-28 md:py-36">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-3 text-primary/75">
            <DottedLine length={24} className="text-primary/45" />
            <PinMark size={18} className="text-primary/65" />
            <span className="text-[11px] tracking-[0.4em] uppercase">{p.whoEyebrow}</span>
            <PinMark size={18} className="text-primary/65" />
            <DottedLine length={24} className="text-primary/45" />
          </div>
          <h2 className="font-serif text-3xl md:text-[44px] text-ink mt-7 font-medium tracking-[-0.012em]">{p.whoHeading}</h2>
          <p className="mt-6 text-ink/65 leading-[2] text-[15px] max-w-2xl mx-auto">{p.whoBody}</p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {p.whoTags.map((g) => (
              <div key={g} className="rounded-2xl bg-[var(--sand)] py-5 text-[13.5px] text-ink/75">{g}</div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
