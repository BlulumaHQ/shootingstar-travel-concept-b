import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { PinMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";
import { hreflangLinks, useLocale, type Locale } from "@/i18n/locale";

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
  { l: "WhatsApp", v: "1-604-765-7765", h: "https://wa.me/16047657765" },
  { l: "KakaoTalk", v: "@shootingstartravel", h: "#" },
  { l: "WeChat", v: "shootingstar_ca", h: "#" },
  { l: "Email", v: "hello@shootingstartravel.ca", h: "mailto:hello@shootingstartravel.ca" },
];

type Pack = {
  eyebrow: string; titleA: string; titleB: string; intro: string;
  formHeading: string;
  fName: string; fTour: string; fDream: string;
  primaryLanguage: string; primaryLanguageHelp: string;
  send: string; thanks: string; arrived: string; followup: string;
  reach: string; studio: string; location: string; hours: string;
};

const PACKS: Record<Locale, Pack> = {
  en: {
    eyebrow: "Let's Begin",
    titleA: "Your next journey,", titleB: "begins here.",
    intro: "Tell us where you'd like to go, the pace you'd like to keep, and the dream you're chasing. We reply within 24 hours.",
    formHeading: "Tell us your travel dream",
    fName: "Name", fTour: "Tour you're interested in", fDream: "Your travel dream",
    primaryLanguage: "Primary Language",
    primaryLanguageHelp: "Guide language may vary depending on group composition. We will do our best to accommodate your preferred language, but a single-language tour cannot be guaranteed.",
    send: "Send enquiry", thanks: "— Thank you", arrived: "Your message has arrived", followup: "We'll be in touch within 24 hours ✦",
    reach: "Reach us directly", studio: "— Studio", location: "Vancouver, BC, Canada", hours: "Mon–Sat · 9:00 – 18:00 PST",
  },
  zh: {
    eyebrow: "開始你的旅程",
    titleA: "下一趟旅程,", titleB: "從這裡開始。",
    intro: "告訴我們你想去的地方、想要的步調，以及你正在追尋的夢想。我們將於 24 小時內回覆。",
    formHeading: "告訴我們你的旅行夢想",
    fName: "姓名", fTour: "感興趣的行程", fDream: "你的旅行夢想",
    primaryLanguage: "主要語言",
    primaryLanguageHelp: "導遊語言將依當團旅客組成安排。我們會盡量配合您的語言需求，但無法保證安排單一語言團。",
    send: "送出詢問", thanks: "— 感謝您", arrived: "我們已收到您的訊息", followup: "我們將於 24 小時內回覆 ✦",
    reach: "直接聯繫我們", studio: "— 工作室", location: "加拿大 卑詩省 溫哥華", hours: "週一至週六 · 9:00 – 18:00 PST",
  },
  ko: {
    eyebrow: "여정의 시작",
    titleA: "당신의 다음 여정은,", titleB: "여기서 시작됩니다.",
    intro: "원하시는 목적지, 페이스, 그리고 꿈꾸는 여정을 알려주세요. 24시간 이내에 답변드립니다.",
    formHeading: "당신의 여행 이야기를 들려주세요",
    fName: "이름", fTour: "관심 있는 투어", fDream: "당신의 여행 이야기",
    primaryLanguage: "선호 언어",
    primaryLanguageHelp: "가이드 언어는 투어 구성에 따라 달라질 수 있습니다. 원하시는 언어를 최대한 배정해 드리지만, 단일 언어 투어를 보장할 수는 없습니다.",
    send: "문의 보내기", thanks: "— 감사합니다", arrived: "메시지가 도착했습니다", followup: "24시간 이내에 연락드립니다 ✦",
    reach: "직접 연락하기", studio: "— 스튜디오", location: "캐나다 BC주 밴쿠버", hours: "월–토 · 9:00 – 18:00 PST",
  },
};

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const locale = useLocale();
  const p = PACKS[locale];
  return (
    <SiteLayout>
      <section className="relative bg-cream pt-24 md:pt-32 pb-14 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-center gap-3 text-primary/75">
            <PinMark size={18} className="text-primary/65" />
            <DottedLine length={36} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase font-medium">{p.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
            {p.titleA}<br />
            <span className="italic text-primary">{p.titleB}</span>
          </h1>
          <p className="mt-7 text-ink/60 max-w-xl leading-[2] text-[15px]">
            {p.intro}
          </p>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      <section className="bg-cream pb-32 md:pb-40 pt-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-7">
              <h2 className="font-serif text-[24px] md:text-[28px] text-ink font-medium tracking-[-0.01em] mb-8">
                {p.formHeading}
              </h2>
              {sent ? (
                <div className="rounded-[6px] border border-primary/20 bg-card px-8 py-12 text-center shadow-[0_18px_36px_-22px_rgba(70,80,75,0.22)]">
                  <p className="text-[11px] tracking-[0.4em] uppercase text-primary/80">{p.thanks}</p>
                  <p className="mt-4 font-serif text-[22px] text-ink">{p.arrived}</p>
                  <p className="mt-3 text-ink/60 text-[14px] leading-[2]">{p.followup}</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-5"
                >
                  {[
                    { n: "name", label: p.fName },
                    { n: "email", label: "Email", t: "email" },
                    { n: "tour", label: p.fTour },
                  ].map((f) => (
                    <div key={f.n}>
                      <label className="block text-[10.5px] tracking-[0.3em] uppercase text-ink/55 mb-2">{f.label}</label>
                      <input
                        type={f.t || "text"}
                        required
                        name={f.n}
                        className="w-full rounded-[4px] border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[14.5px] text-ink focus:outline-none focus:border-primary transition"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10.5px] tracking-[0.3em] uppercase text-ink/55 mb-2">{p.primaryLanguage}</label>
                    <select
                      name="primaryLanguage"
                      defaultValue=""
                      className="w-full rounded-[4px] border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[14.5px] text-ink focus:outline-none focus:border-primary transition"
                    >
                      <option value="" disabled>—</option>
                      <option value="english">English</option>
                      <option value="chinese">Chinese / 中文</option>
                      <option value="korean">Korean / 한국어</option>
                    </select>
                    <p className="mt-2 text-[12px] text-ink/55 leading-[1.7]">{p.primaryLanguageHelp}</p>
                  </div>
                  <div>
                    <label className="block text-[10.5px] tracking-[0.3em] uppercase text-ink/55 mb-2">{p.fDream}</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full rounded-[4px] border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[14.5px] text-ink leading-[1.9] focus:outline-none focus:border-primary transition resize-none"
                    />
                  </div>
                  <button className="mt-4 inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[12px] tracking-[0.2em] uppercase hover:bg-primary/90 transition shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)]">
                    {p.send} <span aria-hidden>→</span>
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-5">
              <h2 className="font-serif text-[24px] md:text-[28px] text-ink font-medium tracking-[-0.01em] mb-8">
                {p.reach}
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
                <p className="text-[10.5px] tracking-[0.3em] uppercase text-primary/80">{p.studio}</p>
                <p>{p.location}</p>
                <p>{p.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
