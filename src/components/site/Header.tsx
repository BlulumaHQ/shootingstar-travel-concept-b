import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import tornEdge from "@/assets/header-torn-edge.png";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, withLocale, locales, localeLabels, type Locale } from "@/i18n/locale";
import { useT } from "@/i18n/dict";

function LangSwitcher({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const current = useLocale();
  return (
    <div
      className={
        compact
          ? "flex items-center gap-1.5 text-[11px] tracking-[0.18em]"
          : "flex items-center gap-2 text-[11.5px] tracking-[0.22em]"
      }
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => {
        const isActive = l === current;
        const target = withLocale(pathname, l);
        return (
          <span key={l} className="flex items-center gap-2">
            {i > 0 && <span className="text-ink/25">·</span>}
            <Link
              to={target as never}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={
                "uppercase transition " +
                (isActive
                  ? "text-primary font-medium"
                  : "text-ink/55 hover:text-primary")
              }
            >
              {localeLabels[l]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

const brandByLocale: Record<Locale, { text: string; fontFamily: string; size: string }> = {
  en: { text: "Shootingstar Travel", fontFamily: '"ChenYuluoyan", "Caveat", cursive', size: "text-[22px] md:text-[30px]" },
  zh: { text: "流星与假期", fontFamily: '"MengQuNaiYou", "ChenYuluoyan", cursive', size: "text-[24px] md:text-[34px]" },
  ko: { text: "별찌아리 투어", fontFamily: '"JeonhwaSeon", cursive', size: "text-[24px] md:text-[32px]" },
};

function BrandWordmark({ locale, className = "" }: { locale: Locale; className?: string }) {
  const b = brandByLocale[locale];
  return (
    <span
      className={`leading-[1] text-ink ${b.size} ${className}`}
      style={{ fontFamily: b.fontFamily }}
    >
      {b.text}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const locale: Locale = useLocale();
  const localized = (path: string) => withLocale(path, locale);

  const nav: { to: string; label: string }[] = [
    { to: localized("/"), label: t("nav.home") },
    { to: localized("/about"), label: t("nav.about") },
    { to: localized("/tours"), label: t("nav.tours") },
    { to: localized("/reviews"), label: t("nav.reviews") },
    { to: localized("/gallery"), label: t("nav.gallery") },
    { to: localized("/faq"), label: t("nav.faq") },
    { to: localized("/contact"), label: t("nav.contact") },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{ transform: "translateZ(0)", willChange: "transform", backfaceVisibility: "hidden" }}
    >
      {/* Desktop top bar: language switcher only */}
      <div className="hidden lg:block bg-cream border-b border-ink/8">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex justify-end py-1.5">
          <LangSwitcher />
        </div>
      </div>

      {/* Mobile top bar: language switcher */}
      <div className="lg:hidden bg-cream border-b border-ink/8">
        <div className="mx-auto max-w-[1400px] px-5 flex justify-end py-1.5">
          <LangSwitcher compact onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <div className="relative bg-cream">
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link to={localized("/") as never} className="flex items-center gap-3 md:gap-4 -mb-4 md:-mb-7" onClick={() => setOpen(false)}>
            <img src={logo} alt="Shootingstar Travel" className="h-[92px] md:h-[140px] w-auto" />
            <BrandWordmark locale={locale} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to + n.label}
                to={n.to as never}
                className="relative text-[14.5px] tracking-wide text-ink/75 hover:text-primary transition-colors py-2"
                activeProps={{ className: "text-primary [&]:after:content-[''] [&]:after:absolute [&]:after:-bottom-0 [&]:after:left-1 [&]:after:right-1 [&]:after:h-[1.5px] [&]:after:bg-primary/70" }}
                activeOptions={{ exact: n.to === localized("/") }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: book button only */}
          <div className="hidden lg:flex items-center">
            <Link
              to={localized("/contact") as never}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[13px] tracking-wide text-primary-foreground hover:bg-primary/90 transition shadow-[0_6px_18px_-8px_oklch(0.585_0.04_155/0.6)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              {t("cta.book")}
            </Link>
          </div>

          {/* Mobile: hamburger only */}
          <div className="lg:hidden flex items-center">
            <button
              className="p-2 -mr-2 text-ink relative z-10"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
              </svg>
            </button>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-full h-[14px] md:h-[20px] overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <img
            src={tornEdge}
            alt=""
            className="block w-full h-full select-none"
            style={{ objectFit: "fill" }}
            draggable={false}
          />
        </div>
      </div>

      {/* Mobile menu — rendered via portal so it escapes the transformed header */}
      {open && typeof document !== "undefined" && createPortal(
        <div className="lg:hidden fixed inset-0 z-[100] bg-cream overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10 bg-cream">
            <Link to={localized("/") as never} onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <img src={logo} alt="Shootingstar Travel" className="h-[72px] w-auto" />
              <BrandWordmark locale={locale} className="!text-[20px]" />
            </Link>
            <button
              className="p-2 -mr-2 text-ink"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="px-8 pt-8 pb-16 flex flex-col bg-cream">
            {nav.map((n, i) => (
              <Link
                key={n.to + n.label}
                to={n.to as never}
                onClick={() => setOpen(false)}
                className="font-serif text-[26px] text-ink py-4 border-b border-ink/10 tracking-tight"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === localized("/") }}
              >
                <span className="text-primary/40 text-[11px] tracking-[0.3em] mr-3 align-middle">0{i + 1}</span>
                {n.label}
              </Link>
            ))}
            <Link
              to={localized("/contact") as never}
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex justify-center rounded-full bg-primary px-6 py-4 text-[14px] tracking-[0.15em] uppercase text-primary-foreground"
            >
              {t("cta.bookArrow")}
            </Link>
            <div className="mt-12 text-center text-[11px] tracking-[0.4em] uppercase text-ink/50">
              Shootingstar Travel · Vancouver
            </div>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
