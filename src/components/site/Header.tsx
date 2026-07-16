import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import tornEdge from "@/assets/header-torn-edge.png";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, withLocale, locales, localeLabels, type Locale } from "@/i18n/locale";
import { setSavedLocale } from "@/lib/language-preference";
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
              onClick={() => {
                setSavedLocale(l);
                onNavigate?.();
              }}
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
  zh: { text: "流星雨假期", fontFamily: '"MengQuNaiYou", "ChenYuluoyan", cursive', size: "text-[24px] md:text-[34px]" },
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

function ChevronDown({ open = false, size = 12 }: { open?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className={"transition-transform " + (open ? "rotate-180" : "")}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ToursDropdown({
  locale,
  label,
  active,
}: {
  locale: Locale;
  label: string;
  active: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const localized = (p: string) => withLocale(p, locale);

  const items = [
    { to: localized("/tours"), label: t("nav.toursAll") },
    { to: localized("/banff-tours"), label: t("nav.toursBanff") },
    { to: localized("/jasper-tours"), label: t("nav.toursJasper") },
    { to: `${localized("/tours")}?region=canada`, label: t("nav.toursCanada") },
    { to: `${localized("/tours")}?region=usa`, label: t("nav.toursUsa") },
  ];

  const openNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) closeSoon();
      }}
    >
      <div className="flex items-center gap-1.5">
        <Link
          to={localized("/tours") as never}
          className={
            "relative text-[14.5px] tracking-wide transition-colors py-2 " +
            (active ? "text-primary" : "text-ink/75 hover:text-primary")
          }
          aria-haspopup="true"
          aria-expanded={open}
        >
          <span className="relative">
            {label}
            {active && (
              <span className="pointer-events-none absolute -bottom-0 left-1 right-1 h-[1.5px] bg-primary/70" />
            )}
          </span>
        </Link>
        <button
          type="button"
          aria-label="Tour regions"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={
            "p-1 -ml-0.5 transition-colors " +
            (active ? "text-primary" : "text-ink/60 hover:text-primary")
          }
        >
          <ChevronDown open={open} />
        </button>
      </div>

      {open && (
        <div
          className="absolute left-0 top-full pt-3 z-50 min-w-[220px]"
          role="menu"
        >
          <div className="rounded-[6px] border border-ink/10 bg-cream shadow-[0_10px_30px_-12px_rgba(70,80,75,0.28)] py-2">
            {items.map((i) => (
              <Link
                key={i.to + i.label}
                to={i.to as never}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-[13.5px] text-ink/80 tracking-wide hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const { pathname } = useLocation();
  const t = useT();
  const locale: Locale = useLocale();
  const localized = (path: string) => withLocale(path, locale);

  const toursHref = localized("/tours");
  const isToursActive =
    pathname === toursHref ||
    pathname.startsWith(toursHref + "/") ||
    pathname === localized("/banff-tours") ||
    pathname === localized("/jasper-tours");

  const nav: { to: string; label: string; key: string }[] = [
    { to: localized("/"), label: t("nav.home"), key: "home" },
    { to: localized("/about"), label: t("nav.about"), key: "about" },
    { to: toursHref, label: t("nav.tours"), key: "tours" },
    { to: localized("/gallery"), label: t("nav.gallery"), key: "gallery" },
    { to: localized("/reviews"), label: t("nav.reviews"), key: "reviews" },
    { to: localized("/faq"), label: t("nav.faq"), key: "faq" },
    { to: localized("/contact"), label: t("nav.contact"), key: "contact" },
  ];

  const mobileToursSub = [
    { to: localized("/tours"), label: t("nav.toursAll") },
    { to: localized("/banff-tours"), label: t("nav.toursBanff") },
    { to: localized("/jasper-tours"), label: t("nav.toursJasper") },
    { to: `${localized("/tours")}?region=canada`, label: t("nav.toursCanada") },
    { to: `${localized("/tours")}?region=usa`, label: t("nav.toursUsa") },
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
        <div className="relative z-10 mx-auto flex min-h-[108px] max-w-[1400px] items-center justify-between px-5 py-3 pb-2 md:min-h-[148px] md:px-10 md:py-4 md:pb-3">
          <Link to={localized("/") as never} className="relative z-10 flex items-center gap-3 md:gap-4" onClick={() => setOpen(false)}>
            <img src={logo} alt="Shootingstar Travel" className="h-[82px] md:h-[128px] w-auto shrink-0" />
            <BrandWordmark locale={locale} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) =>
              n.key === "tours" ? (
                <ToursDropdown key="tours" locale={locale} label={n.label} active={isToursActive} />
              ) : (
                <Link
                  key={n.to + n.label}
                  to={n.to as never}
                  className="relative text-[14.5px] tracking-wide text-ink/75 hover:text-primary transition-colors py-2"
                  activeProps={{ className: "text-primary [&]:after:content-[''] [&]:after:absolute [&]:after:-bottom-0 [&]:after:left-1 [&]:after:right-1 [&]:after:h-[1.5px] [&]:after:bg-primary/70" }}
                  activeOptions={{ exact: n.to === localized("/") }}
                >
                  {n.label}
                </Link>
              ),
            )}
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
          className="pointer-events-none absolute left-0 right-0 top-full z-0 h-[14px] md:h-[20px] overflow-hidden"
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
              <img src={logo} alt="Shootingstar Travel" className="h-[62px] w-auto" />
              <BrandWordmark locale={locale} className="!text-[18px]" />
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
            {nav.map((n, i) =>
              n.key === "tours" ? (
                <div key="tours" className="border-b border-ink/10">
                  <div className="flex items-center justify-between">
                    <Link
                      to={n.to as never}
                      onClick={() => setOpen(false)}
                      className="flex-1 font-serif text-[26px] text-ink py-4 tracking-tight"
                      activeProps={{ className: "text-primary" }}
                    >
                      <span className="text-primary/40 text-[11px] tracking-[0.3em] mr-3 align-middle">0{i + 1}</span>
                      {n.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle tour regions"
                      aria-expanded={mobileToursOpen}
                      onClick={() => setMobileToursOpen((v) => !v)}
                      className="p-3 text-ink/60"
                    >
                      <ChevronDown open={mobileToursOpen} size={16} />
                    </button>
                  </div>
                  {mobileToursOpen && (
                    <ul className="pb-4 pl-10 space-y-1">
                      {mobileToursSub.map((s) => (
                        <li key={s.to + s.label}>
                          <Link
                            to={s.to as never}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 text-[15px] text-ink/75 tracking-wide hover:text-primary transition-colors"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
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
              ),
            )}
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
