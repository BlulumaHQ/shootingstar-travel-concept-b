import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import tornEdge from "@/assets/header-torn-edge.png";
import { Facebook, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLocale, withLocale } from "@/i18n/locale";
import { useT } from "@/i18n/dict";
import { getPhone } from "@/i18n/contact";
import { StarMark, DottedLine } from "@/components/site/BrandMarks";


const socials = [
  {
    Icon: Facebook,
    href: "https://www.facebook.com/people/Shooting-Star-Travel-%E6%B5%81%E6%98%9F%E9%9B%A8%E5%81%87%E6%9C%9F/61590391288968/",
    label: "Facebook",
  },
];


function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[10.5px] tracking-[0.38em] uppercase text-primary font-medium">
      {children}
    </h4>
  );
}

export function Footer() {
  const t = useT();
  const locale = useLocale();
  const lp = (p: string) => withLocale(p, locale) as never;

  const quickLinks = [
    { l: t("nav.home"), to: lp("/") },
    { l: t("nav.tours"), to: lp("/tours") },
    { l: t("nav.about"), to: lp("/about") },
    { l: t("nav.gallery"), to: lp("/gallery") },
    { l: t("nav.faq"), to: lp("/faq") },
  ];

  const popularToursByLocale = {
    en: [
      { l: "Western US 8-Day Tour", to: lp("/tours/western-usa-8-day") },
      { l: "Rocky Mountains 3-Day Tour", to: lp("/tours/rockies-3-day") },
      { l: "Las Vegas & Canyons 4-Day Tour", to: lp("/tours/vegas-canyon-4-day") },
      { l: "Victoria 1-Day Tour", to: lp("/tours/victoria-1-day") },
      { l: "Seattle 2-Day Tour", to: lp("/tours/seattle-2-day") },
    ],
    zh: [
      { l: "美西八日遊", to: lp("/tours/western-usa-8-day") },
      { l: "加拿大洛磯山三日遊", to: lp("/tours/rockies-3-day") },
      { l: "拉斯維加斯與大峽谷四日遊", to: lp("/tours/vegas-canyon-4-day") },
      { l: "維多利亞一日遊", to: lp("/tours/victoria-1-day") },
      { l: "西雅圖兩日遊", to: lp("/tours/seattle-2-day") },
    ],
    ko: [
      { l: "미국 서부 8일 투어", to: lp("/tours/western-usa-8-day") },
      { l: "캐나다 록키 3일 투어", to: lp("/tours/rockies-3-day") },
      { l: "라스베이거스 & 캐니언 4일 투어", to: lp("/tours/vegas-canyon-4-day") },
      { l: "빅토리아 1일 투어", to: lp("/tours/victoria-1-day") },
      { l: "시애틀 2일 투어", to: lp("/tours/seattle-2-day") },
    ],
  } as const;
  const popularTours = popularToursByLocale[locale];

  const phone = getPhone(locale);
  const contact: { Icon: typeof Phone; t: string; href?: string }[] = [
    { Icon: Phone, t: phone.display, href: phone.tel },
    { Icon: Mail, t: "info@shootingstartravel.com", href: "mailto:info@shootingstartravel.com" },
    { Icon: MapPin, t: "Vancouver, BC, Canada" },
    { Icon: Clock, t: t("footer.hours") },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-cream text-ink">
      {/* Torn paper top edge — mirrors the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-[14px] md:h-[20px] overflow-hidden"
      >
        <img
          src={tornEdge}
          alt=""
          className="block w-full h-full select-none scale-y-[-1]"
          style={{ objectFit: "fill" }}
          draggable={false}
        />
      </div>

      {/* Soft fog gradient — paper to mist */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--cream) 0%, var(--paper) 38%, var(--sand) 72%, oklch(0.93 0.012 152) 100%)",
        }}
      />

      {/* Subtle mountain silhouette — cinematic far horizon */}
      <svg
        aria-hidden
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[280px] md:h-[360px] opacity-[0.22]"
      >
        {/* Far range — faintest */}
        <path
          d="M0 260 L120 210 L220 235 L340 180 L460 220 L580 175 L700 215 L820 165 L940 205 L1060 170 L1180 200 L1300 175 L1440 210 L1440 360 L0 360 Z"
          fill="var(--sage-soft)"
          opacity="0.55"
        />
        {/* Mid range */}
        <path
          d="M0 295 L100 260 L210 285 L320 240 L440 280 L560 235 L680 275 L800 230 L920 270 L1040 235 L1160 275 L1280 240 L1440 270 L1440 360 L0 360 Z"
          fill="var(--sage)"
          opacity="0.55"
        />
        {/* Near range — strongest */}
        <path
          d="M0 330 L130 305 L260 320 L380 290 L500 315 L620 285 L760 320 L880 295 L1000 318 L1140 290 L1280 315 L1440 300 L1440 360 L0 360 Z"
          fill="var(--forest)"
          opacity="0.5"
        />
      </svg>

      {/* Soft fog wash near the horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[160px] md:bottom-[220px] h-40 md:h-56"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.97 0.01 90 / 0.55) 50%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />


      <div className="relative mx-auto max-w-[1240px] px-6 md:px-14 pt-24 md:pt-32 pb-12 md:pb-16">
        {/* Editorial closing block */}
        <div className="text-center mb-20 md:mb-24">
          <div className="flex items-center justify-center gap-3 text-primary/75">
            <DottedLine length={28} className="text-primary/45" />
            <StarMark size={14} className="text-primary/65" />
            <DottedLine length={28} className="text-primary/45" />
          </div>
          <p className="mt-5 text-ink/55 text-[11px] tracking-[0.45em] uppercase">
            {t("footer.bonVoyage")}
          </p>
          <h3 className="font-serif text-[26px] md:text-[42px] mt-6 md:mt-7 leading-[1.3] text-ink font-medium tracking-[-0.012em]">
            {t("footer.closing")}
          </h3>
          <p className="font-marker text-primary/70 text-[16px] md:text-[18px] mt-5">
            — Shootingstar Travel
          </p>
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex flex-col items-center text-center gap-12">
          <Link to={lp("/")} className="inline-flex items-center">
            <img src={logo} alt="Shootingstar Travel" className="h-[120px] w-auto" />
          </Link>
          <p className="text-[13.5px] leading-[2] text-ink/80 max-w-xs">
            {t("footer.tagline")}
          </p>

          <div>
            <ColTitle>{t("footer.follow")}</ColTitle>
            <div className="mt-5 flex items-center justify-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>

              ))}
            </div>
          </div>

          <div>
            <ColTitle>{t("footer.contactInfo")}</ColTitle>
            <ul className="mt-5 space-y-3 text-[13.5px] text-ink/85">
              {contact.map(({ Icon, t: txt, href }) => (
                <li key={txt} className="flex items-center justify-center gap-2.5">
                  <Icon size={13} strokeWidth={1.5} className="text-primary/60" />
                  {href ? (
                    <a href={href} className="hover:text-primary transition">{txt}</a>
                  ) : (
                    <span>{txt}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 w-full max-w-sm text-left">
            <div>
              <ColTitle>{t("footer.quickLinks")}</ColTitle>
              <ul className="mt-5 space-y-3 text-[13.5px] text-ink/85">
                {quickLinks.map((l) => (
                  <li key={l.l}>
                    <Link to={l.to} className="hover:text-primary transition">{l.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ColTitle>{t("footer.popularTours")}</ColTitle>
              <ul className="mt-5 space-y-3 text-[13.5px] text-ink/85">
                {popularTours.map((l) => (
                  <li key={l.l}>
                    <Link to={l.to} className="hover:text-primary transition">{l.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid grid-cols-12 gap-10 items-start">
          <div className="col-span-3">
            <Link to={lp("/")} className="inline-flex items-center">
              <img src={logo} alt="Shootingstar Travel" className="h-[140px] w-auto" />
            </Link>
            <p className="mt-7 text-[13.5px] leading-[2] text-ink/80 max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>

              ))}
            </div>
          </div>

          <div className="col-span-1" aria-hidden />

          <div className="col-span-2">
            <ColTitle>{t("footer.quickLinks")}</ColTitle>
            <ul className="mt-6 space-y-3.5 text-[13.5px] text-ink/85">
              {quickLinks.map((l) => (
                <li key={l.l}>
                  <Link to={l.to} className="hover:text-primary transition">{l.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <ColTitle>{t("footer.popularTours")}</ColTitle>
            <ul className="mt-6 space-y-3.5 text-[13.5px] text-ink/85">
              {popularTours.map((l) => (
                <li key={l.l}>
                  <Link to={l.to} className="hover:text-primary transition">{l.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <ColTitle>{t("footer.contactInfo")}</ColTitle>
            <ul className="mt-6 space-y-3.5 text-[13.5px] text-ink/85">
              {contact.map(({ Icon, t: txt, href }) => (
                <li key={txt} className="flex items-start gap-2.5">
                  <Icon size={14} strokeWidth={1.5} className="text-primary/60 mt-1" />
                  {href ? (
                    <a href={href} className="hover:text-primary leading-snug transition">{txt}</a>
                  ) : (
                    <span className="leading-snug">{txt}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-7 border-t border-ink/15 flex flex-col gap-3 text-[12px] tracking-wide text-ink/55">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">
            <p>{t("footer.copyright")}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link to={lp("/privacy")} className="hover:text-primary transition">{t("footer.privacy")}</Link>
              <span className="text-ink/25">·</span>
              <Link to={lp("/terms")} className="hover:text-primary transition">{t("footer.terms")}</Link>
              <span className="text-ink/25">·</span>
              <a
                href="https://bluluma.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                Web Design by BluLuma
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
