import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { l: "首頁", to: "/" },
  { l: "行程介紹", to: "/tours" },
  { l: "關於我們", to: "/about" },
  { l: "旅客分享", to: "/reviews" },
  { l: "部落格", to: "/blog" },
  { l: "常見問題", to: "/faq" },
];

const popularTours = [
  { l: "落磯山經典團", to: "/tours/rocky-mountain-classic" },
  { l: "班夫一日遊", to: "/tours/banff-day" },
  { l: "極光追蹤之旅", to: "/tours/aurora-chase" },
  { l: "溫哥華市區深度遊", to: "/tours/vancouver-city" },
  { l: "維多利亞花園之旅", to: "/tours/victoria-garden" },
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: MessageCircle, href: "#", label: "LINE" },
];

const contact = [
  { Icon: Phone, t: "+1 (604) 123-4567", href: "tel:+16041234567" },
  { Icon: Mail, t: "info@shootingstartravel.com", href: "mailto:info@shootingstartravel.com" },
  { Icon: MapPin, t: "Vancouver, BC, Canada" },
  { Icon: Clock, t: "週一 – 週六 · 9:00 – 18:00 PST" },
];

function ColTitle({ children }: { children: React.ReactNode }) {
  // Unified typeface — same font-sans family, only weight/tracking change
  return (
    <h4 className="text-[11px] font-medium text-cream/55 tracking-[0.32em] uppercase">
      {children}
    </h4>
  );
}

export function Footer() {
  return (
    <footer
      className="relative text-cream isolate overflow-hidden"
      style={{
        // Premium tonal layering — sage-green ink, subtle radial highlights, no flat fill
        backgroundColor: "oklch(0.34 0.022 158)",
        backgroundImage: [
          "radial-gradient(120% 80% at 18% 0%, oklch(0.42 0.025 158 / 0.55), transparent 55%)",
          "radial-gradient(90% 70% at 88% 110%, oklch(0.27 0.018 158 / 0.65), transparent 60%)",
          "linear-gradient(180deg, oklch(0.36 0.022 158) 0%, oklch(0.30 0.018 158) 100%)",
        ].join(", "),
      }}
    >
      {/* paper-like grain — extremely subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 1.4px)",
          backgroundSize: "3px 3px",
        }}
      />
      {/* warm cinematic light — top */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "oklch(0.85 0.04 90)" }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 md:px-14 pt-24 md:pt-36 pb-12 md:pb-16">
        {/* Closing line */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-cream/55 text-[11px] tracking-[0.45em] uppercase">— bon voyage</p>
          <h3 className="font-serif text-[26px] md:text-[42px] mt-6 md:mt-7 leading-[1.35] text-cream font-light tracking-[-0.005em]">
            願每一段旅程，<br className="md:hidden" />都成為你最珍藏的時光。
          </h3>
        </div>

        {/* MOBILE — open layout (no accordions) */}
        <div className="md:hidden flex flex-col items-center text-center gap-12">
          {/* centered logo */}
          <Link to="/" className="inline-flex items-center bg-cream/95 rounded-2xl px-6 py-4 shadow-sm">
            <img src={logo} alt="Shootingstar Travel" className="h-[110px] w-auto" />
          </Link>
          <p className="text-[13.5px] leading-[2] text-cream/70 max-w-xs">
            加拿大小團精緻旅遊，<br />用心為每位旅人寫下獨一無二的旅行篇章。
          </p>

          {/* socials — always visible */}
          <div>
            <ColTitle>Follow</ColTitle>
            <div className="mt-5 flex items-center justify-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 hover:border-cream/70 hover:bg-cream/10 transition"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* contact — always visible */}
          <div>
            <ColTitle>Contact</ColTitle>
            <ul className="mt-5 space-y-3 text-[13.5px] text-cream/75">
              {contact.map(({ Icon, t, href }) => (
                <li key={t} className="flex items-center justify-center gap-2.5">
                  <Icon size={13} strokeWidth={1.5} className="text-cream/55" />
                  {href ? <a href={href} className="hover:text-cream">{t}</a> : <span>{t}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* link columns side-by-side, compact */}
          <div className="grid grid-cols-2 gap-10 w-full max-w-sm text-left">
            <div>
              <ColTitle>快速連結</ColTitle>
              <ul className="mt-5 space-y-3 text-[13.5px] text-cream/75">
                {quickLinks.map((l) => (
                  <li key={l.l}><Link to={l.to} className="hover:text-cream transition">{l.l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <ColTitle>熱門行程</ColTitle>
              <ul className="mt-5 space-y-3 text-[13.5px] text-cream/75">
                {popularTours.map((l) => (
                  <li key={l.l}><Link to={l.to} className="hover:text-cream transition">{l.l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* DESKTOP — generous breathing room */}
        <div className="hidden md:grid grid-cols-12 gap-16 items-start">
          <div className="col-span-4 pr-6">
            <Link to="/" className="inline-flex items-center bg-cream/95 rounded-2xl px-6 py-4 shadow-sm">
              <img src={logo} alt="Shootingstar Travel" className="h-[130px] w-auto" />
            </Link>
            <p className="mt-7 text-[14px] leading-[2] text-cream/70 max-w-xs">
              Shootingstar Travel — 加拿大小團精緻旅遊，
              用心為每位旅人寫下獨一無二的旅行篇章。
            </p>
            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 hover:border-cream/70 hover:bg-cream/10 transition"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-2 col-start-6">
            <ColTitle>快速連結</ColTitle>
            <ul className="mt-7 space-y-3.5 text-[13.5px] text-cream/75">
              {quickLinks.map((l) => (
                <li key={l.l}><Link to={l.to} className="hover:text-cream transition">{l.l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <ColTitle>熱門行程</ColTitle>
            <ul className="mt-7 space-y-3.5 text-[13.5px] text-cream/75">
              {popularTours.map((l) => (
                <li key={l.l}><Link to={l.to} className="hover:text-cream transition">{l.l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <ColTitle>聯絡資訊</ColTitle>
            <ul className="mt-7 space-y-3.5 text-[13.5px] text-cream/75">
              {contact.map(({ Icon, t, href }) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Icon size={14} strokeWidth={1.5} className="text-cream/55 mt-1" />
                  {href ? <a href={href} className="hover:text-cream leading-snug">{t}</a> : <span className="leading-snug">{t}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-7 border-t border-cream/12 flex flex-col gap-3 text-[12px] tracking-wide text-cream/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">
            <p>© 2026 Shootingstar Travel. Made with care in Vancouver.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link to="/privacy" className="hover:text-cream transition">隱私權政策</Link>
              <span className="text-cream/25">·</span>
              <Link to="/terms" className="hover:text-cream transition">服務條款</Link>
              <span className="text-cream/25">·</span>
              <a href="https://bluluma.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition">
                Web Design by BluLuma
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
