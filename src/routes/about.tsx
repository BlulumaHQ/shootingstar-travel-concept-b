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
      { name: "description", content: "Shooting Star Travel crafts thoughtfully designed small-group tours across Canada and the Western United States — rare, memorable journeys for travellers of every language and background." },
      { property: "og:title", content: "About — Shooting Star Travel" },
      { property: "og:description", content: "Small-group journeys across Canada and the Western United States — rare, memorable, and made to be kept." },
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
  slogan: string;
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
    slogan: "Travel is not just about reaching a destination — it is about discovering a journey that shines like a shooting star.",
    eyebrow: "About the Studio",
    titleA: "About ", titleB: "Shooting Star Travel",
    intro: "At Shooting Star Travel, we believe travel is more than simply moving from one destination to another. Every journey should feel like a shooting star — rare, memorable, and filled with moments that stay with you long after the trip has ended.",
    storyEyebrow: "Our Story",
    storyHeading: "Once-in-a-lifetime journeys, one memory at a time",
    storyBody: [
      "The name Shooting Star Travel was inspired by the idea that some experiences only happen once in a lifetime. Whether it is watching the sunrise over the Rocky Mountains, standing before the Grand Canyon, exploring the coastline of the Pacific Northwest, or discovering hidden gems along the way, these are the moments that turn an ordinary vacation into an unforgettable story.",
      "We specialize in thoughtfully designed small-group tours across Canada and the Western United States. Our itineraries are carefully planned to balance iconic destinations, local experiences, comfort, flexibility, and genuine human connection.",
      "We welcome travellers from different cultures, backgrounds, and languages. Whether you are travelling with family, friends, or on your own, our goal is to create journeys that feel personal, effortless, and meaningful.",
      "Travel is not just about reaching a destination. It is about discovering a journey that shines like a shooting star — one unforgettable memory at a time.",
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
      { t: "Tours in your language", d: "We run separate English, Mandarin, and Korean departures. Each tour is hosted in one language — please choose the one that suits you." },
      { t: "Safety and clear communication", d: "Full travel insurance and a 24-hour contact line so loved ones rest easy." },
      { t: "Journeys with story", d: "We believe travel is not about arriving but about memories worth keeping." },
    ],
    whoEyebrow: "Who We Travel With",
    whoHeading: "Designed for these travellers",
    whoBody: "Whether it's your first time in Canada, a slow family holiday, or a trip you'd rather take in your mother tongue — we bring the same care to every journey we shape for you.",
    whoTags: ["Mandarin-speaking families", "Korean long-stay & holiday", "Couples & honeymooners", "International small groups"],
  },
  zh: {
    slogan: "旅行不只是抵達目的地——而是發現一段如流星般閃耀的旅程。",
    eyebrow: "About the Studio",
    titleA: "關於 ", titleB: "Shooting Star Travel",
    intro: "在 Shooting Star Travel，我們相信旅行不只是從一個地方移動到另一個地方。每一段旅程都應該像流星一樣——珍貴、難忘，充滿了旅程結束後仍會留在心中的時刻。",
    storyEyebrow: "Our Story",
    storyHeading: "一生一次的旅程，一次一段回憶",
    storyBody: [
      "Shooting Star Travel 這個名字來自於一個信念：有些體驗一生只有一次。無論是在洛磯山觀賞日出、站在大峽谷前、探索太平洋西北的海岸線，或是沿途發現隱藏的風景——這些時刻都能把一次平凡的假期變成一段難忘的故事。",
      "我們專注於精心設計的小團行程，足跡遍及加拿大與美國西部。每一份行程都在經典景點、在地體驗、舒適、彈性與真誠交流之間細心取得平衡。",
      "我們歡迎來自不同文化、背景與語言的旅人。無論你是與家人、朋友同行，或是獨自出發，我們的目標都是打造既私人、又輕鬆且有意義的旅程。",
      "旅行不只是抵達目的地，而是發現一段如流星般閃耀的旅程——一次一個難忘的回憶。",
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
      { t: "中文 / 英文 / 韓文團", d: "我們分別提供中文、英文、韓文出發團，每一團皆以單一語言進行。請依您的語言選擇對應行程。" },
      { t: "安全與清晰溝通", d: "完整旅遊保險與 24 小時聯絡專線,讓家人安心。" },
      { t: "有故事的旅程", d: "我們相信旅行不在抵達,而在值得收藏的回憶。" },
    ],
    whoEyebrow: "Who We Travel With",
    whoHeading: "為這些旅人而設計",
    whoBody: "無論是第一次來北美旅遊、慢步調的家庭旅行，或是想用母語旅行的你——我們都用同樣的用心為你規劃每一段旅程。",
    whoTags: ["中文家庭", "韓文長期 / 假期", "情侶與蜜月", "國際小團"],
  },
  ko: {
    slogan: "여행은 단지 목적지에 도착하는 것이 아니라, 유성처럼 빛나는 여정을 발견하는 것입니다.",
    eyebrow: "About the Studio",
    titleA: "소개 ", titleB: "Shooting Star Travel",
    intro: "Shooting Star Travel은 여행이 단순히 한 장소에서 다른 장소로 이동하는 것 이상이라고 믿습니다. 모든 여정은 유성처럼 — 흔치 않고, 기억에 남으며, 여행이 끝난 후에도 오랫동안 마음에 머무는 순간들로 가득해야 합니다.",
    storyEyebrow: "Our Story",
    storyHeading: "인생에 한 번뿐인 여정, 한 번에 하나의 추억",
    storyBody: [
      "Shooting Star Travel이라는 이름은 어떤 경험은 인생에 단 한 번뿐이라는 생각에서 영감을 얻었습니다. 로키 산맥 위로 떠오르는 일출을 바라보든, 그랜드 캐니언 앞에 서 있든, 태평양 북서부 해안을 탐험하든, 길 위에서 숨겨진 보석을 발견하든 — 이러한 순간들이 평범한 휴가를 잊지 못할 이야기로 바꿉니다.",
      "우리는 캐나다와 미국 서부 전역에서 정성껏 설계한 소그룹 투어를 전문으로 합니다. 모든 일정은 상징적인 명소, 현지 체험, 편안함, 유연성, 그리고 진솔한 만남 사이의 균형을 신중하게 고려해 계획됩니다.",
      "다양한 문화, 배경, 언어를 가진 여행자를 환영합니다. 가족, 친구와 함께든, 혼자 떠나든 — 우리는 모든 여정을 개인적이고 편안하며 의미 있는 시간으로 만드는 것을 목표로 합니다.",
      "여행은 단지 목적지에 도착하는 것이 아닙니다. 유성처럼 빛나는 여정을 발견하는 것입니다 — 한 번에 하나씩, 잊지 못할 추억을 쌓아가며.",
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
    whoBody: "북미가 처음이든, 가족과의 느린 휴가든, 모국어로 떠나고 싶은 여행이든 — 모든 여정에 동일한 정성을 담습니다.",
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
          <p className="mt-5 font-serif text-xl md:text-2xl text-ink/70 italic leading-relaxed max-w-2xl">
            {p.slogan}
          </p>
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
