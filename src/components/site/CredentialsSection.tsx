import { ShieldCheck, Mountain } from "lucide-react";
import { useLocale, type Locale } from "@/i18n/locale";
import { DottedLine } from "./BrandMarks";
import { PursuitLogo } from "./PursuitLogo";
import citapLogo from "@/assets/citap-logo.png";

type Pack = {
  eyebrow: string;
  heading: string;
  intro: string;
  partnersLabel: string;
  certsLabel: string;
  parksLabel: string;
  certs: { label: string; number: string }[];
  parksTitle: string;
  parksDesc: string;
  parks: string[];
};

const PACKS: Record<Locale, Pack> = {
  en: {
    eyebrow: "Licensed · Certified · Authorized",
    heading: "Travel with confidence",
    intro:
      "A fully licensed boutique tour operator — accredited, insured and authorized to operate across Canada and the national parks of the Canadian Rockies.",
    partnersLabel: "Official Industry Partners",
    certsLabel: "Transportation Certifications",
    parksLabel: "Parks Canada Authorization",
    certs: [
      { label: "Commercial Carrier", number: "CPBC #85224" },
      { label: "Passenger Transportation", number: "PT #75649" },
      { label: "USDOT Registered Carrier", number: "USDOT #4539076" },
      { label: "FMCSA Motor Carrier", number: "MC #1800979" },
    ],
    parksTitle: "Authorized Commercial Operator",
    parksDesc: "Permitted to operate in:",
    parks: ["Banff National Park", "Jasper National Park", "Yoho National Park"],
  },
  zh: {
    eyebrow: "合法・認證・授權",
    heading: "讓您安心同行",
    intro:
      "全合法登記的精品旅遊營運商 — 已取得加拿大與美國跨境營運所需的認證、保險與國家公園授權。",
    partnersLabel: "官方產業夥伴",
    certsLabel: "交通營運認證",
    parksLabel: "加拿大國家公園授權",
    certs: [
      { label: "商業客運執照", number: "CPBC #85224" },
      { label: "客運交通許可", number: "PT #75649" },
      { label: "美國 USDOT 註冊客運", number: "USDOT #4539076" },
      { label: "FMCSA 汽車承運人", number: "MC #1800979" },
    ],
    parksTitle: "授權商業營運商",
    parksDesc: "獲准於以下國家公園營運：",
    parks: ["班夫國家公園", "賈斯伯國家公園", "幽鶴國家公園"],
  },
  ko: {
    eyebrow: "정식 인가 · 인증 · 운영 허가",
    heading: "안심하고 떠나는 여정",
    intro:
      "정식 인가받은 부티크 투어 오퍼레이터 — 캐나다와 미국 전역, 그리고 캐나디안 록키 국립공원 운영을 위한 인증과 보험을 모두 갖추고 있습니다.",
    partnersLabel: "공식 산업 파트너",
    certsLabel: "운송 인증",
    parksLabel: "캐나다 국립공원 운영 허가",
    certs: [
      { label: "상업 운송 사업자", number: "CPBC #85224" },
      { label: "여객 운송 허가", number: "PT #75649" },
      { label: "USDOT 등록 운송업자", number: "USDOT #4539076" },
      { label: "FMCSA 자동차 운송업자", number: "MC #1800979" },
    ],
    parksTitle: "공식 상업 운영 허가",
    parksDesc: "다음 국립공원에서의 운영이 허가되었습니다:",
    parks: ["밴프 국립공원", "재스퍼 국립공원", "요호 국립공원"],
  },
};

export function CredentialsSection() {
  const locale = useLocale();
  const p = PACKS[locale];

  return (
    <section className="relative bg-cream py-24 md:py-28 border-t border-b border-primary/10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 text-primary/75">
            <DottedLine length={32} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase">{p.eyebrow}</span>
            <DottedLine length={32} className="text-primary/45" />
          </div>
          <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 tracking-[-0.012em] font-medium leading-[1.18]">
            {p.heading}
          </h2>
          <p className="mt-5 text-ink/60 leading-[2] text-[14.5px] max-w-2xl">{p.intro}</p>
        </div>

        {/* ROW 1 — Partner logos */}
        <div className="mb-14">
          <p className="text-center text-[10.5px] tracking-[0.35em] uppercase text-ink/45 mb-7">
            {p.partnersLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 py-6 border-y border-primary/10">
            <img
              src={citapLogo}
              alt="CITAP+ — Canadian Independent Tour Advisor Partners"
              className="h-14 md:h-16 w-auto object-contain opacity-80"
              loading="lazy"
            />
            <PursuitLogo className="h-7 md:h-8 w-auto text-ink/55" />
          </div>
        </div>

        {/* ROW 2 — Certification cards */}
        <div className="mb-14">
          <p className="text-center text-[10.5px] tracking-[0.35em] uppercase text-ink/45 mb-7">
            {p.certsLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {p.certs.map((c) => (
              <div
                key={c.number}
                className="group relative bg-[var(--sand)]/40 border border-primary/15 rounded-[6px] p-6 flex flex-col items-center text-center transition hover:border-primary/40 hover:bg-cream"
              >
                <div className="w-12 h-12 rounded-full border border-primary/30 grid place-items-center text-primary mb-4 transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <ShieldCheck size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[17px] text-ink font-semibold leading-snug">
                  {c.label}
                </h3>
                <div className="mt-3 h-px w-8 bg-primary/40" />
                <p className="mt-4 font-marker text-sm tracking-[0.2em] uppercase text-primary">
                  {c.number}
                </p>


              </div>
            ))}
          </div>
        </div>

        {/* ROW 3 — Parks Canada authorization */}
        <div>
          <p className="text-center text-[10.5px] tracking-[0.35em] uppercase text-ink/45 mb-7">
            {p.parksLabel}
          </p>
          <div
            className="relative overflow-hidden rounded-[8px] border border-primary/20 px-7 md:px-12 py-10 md:py-12"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--sage-soft) 32%, var(--cream)) 0%, color-mix(in oklab, var(--sage) 12%, var(--cream)) 100%)",
            }}
          >
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="md:col-span-3 flex justify-center md:justify-start">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary/30 grid place-items-center text-primary bg-cream/60">
                  <Mountain size={40} strokeWidth={1.4} />
                </div>
              </div>
              <div className="md:col-span-9 text-center md:text-left">
                <h3 className="font-serif text-2xl md:text-[26px] text-ink font-semibold leading-snug">
                  {p.parksTitle}
                </h3>
                <p className="mt-3 text-ink/70 text-[14px] leading-[1.9]">{p.parksDesc}</p>
                <ul className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[13.5px] text-ink/80">
                  {p.parks.map((park) => (
                    <li
                      key={park}
                      className="flex items-center gap-2 before:content-['●'] before:text-primary/60 before:text-[10px]"
                    >
                      {park}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
