import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import tornEdge from "@/assets/header-torn-edge.png";
import paperTexture from "@/assets/paper-texture.webp";
import footerWaves from "@/assets/footer-waves.jpg";
import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLocale, withLocale } from "@/i18n/locale";
import { useT } from "@/i18n/dict";
import { StarMark, DottedLine } from "@/components/site/BrandMarks";

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: MessageCircle, href: "#", label: "LINE" },
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
    { l: t("nav.reviews"), to: lp("/reviews") },
    { l: t("nav.blog"), to: lp("/blog") },
    { l: t("nav.faq"), to: lp("/faq") },
  ];

  const popularToursByLocale = {
    en: [
      { l: "Seattle 1-Day Tour", to: lp("/tours/seattle-1-day") },
      { l: "Seattle 2-Day Tour", to: lp("/tours/seattle-2-day") },
      { l: "Victoria 1-Day Tour", to: lp("/tours/victoria-1-day") },
      { l: "Whistler 1-Day Tour", to: lp("/tours/whistler-1-day") },
      { l: "Rocky Mountains 3-Day Tour", to: lp("/tours/rockies-3-day") },
    ],
    zh: [
      { l: "西雅圖一日遊", to: lp("/tours/seattle-1-day") },
      { l: "西雅圖兩日遊", to: lp("/tours/seattle-2-day") },
      { l: "維多利亞一日遊", to: lp("/tours/victoria-1-day") },
      { l: "惠斯勒一日遊", to: lp("/tours/whistler-1-day") },
      { l: "加拿大洛磯山三日遊", to: lp("/tours/rockies-3-day") },
    ],
    ko: [
      { l: "시애틀 1일 투어", to: lp("/tours/seattle-1-day") },
      { l: "시애틀 2일 투어", to: lp("/tours/seattle-2-day") },
      { l: "빅토리아 1일 투어", to: lp("/tours/victoria-1-day") },
      { l: "휘슬러 1일 투어", to: lp("/tours/whistler-1-day") },
      { l: "캐나다 록키 3일 투어", to: lp("/tours/rockies-3-day") },
    ],
  } as const;
  const popularTours = popularToursByLocale[locale];

  const contact: { Icon: typeof Phone; t: string; href?: string }[] = [
    { Icon: Phone, t: "+1 (604) 123-4567", href: "tel:+16041234567" },
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

      {/* Sage wave pattern background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${footerWaves})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Soft paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `url(${paperTexture})`,
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
        }}
      />
      {/* Warm tonal washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--lavender-soft)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 w-[620px] h-[620px] rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--sage-soft)" }}
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
          <p className="text-[13.5px] leading-[2] text-ink/65 max-w-xs">
            {t("footer.tagline")}
          </p>

          <div>
            <ColTitle>{t("footer.follow")}</ColTitle>
            <div className="mt-5 flex items-center justify-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
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
            <ul className="mt-5 space-y-3 text-[13.5px] text-ink/70">
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
              <ul className="mt-5 space-y-3 text-[13.5px] text-ink/70">
                {quickLinks.map((l) => (
                  <li key={l.l}>
                    <Link to={l.to} className="hover:text-primary transition">{l.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ColTitle>{t("footer.popularTours")}</ColTitle>
              <ul className="mt-5 space-y-3 text-[13.5px] text-ink/70">
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
            <p className="mt-7 text-[13.5px] leading-[2] text-ink/65 max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
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
            <ul className="mt-6 space-y-3.5 text-[13.5px] text-ink/70">
              {quickLinks.map((l) => (
                <li key={l.l}>
                  <Link to={l.to} className="hover:text-primary transition">{l.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <ColTitle>{t("footer.popularTours")}</ColTitle>
            <ul className="mt-6 space-y-3.5 text-[13.5px] text-ink/70">
              {popularTours.map((l) => (
                <li key={l.l}>
                  <Link to={l.to} className="hover:text-primary transition">{l.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <ColTitle>{t("footer.contactInfo")}</ColTitle>
            <ul className="mt-6 space-y-3.5 text-[13.5px] text-ink/70">
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
