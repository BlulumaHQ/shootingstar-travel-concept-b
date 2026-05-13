import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useState } from "react";

const groups = [
  {
    title: "快速連結",
    links: [
      { l: "首頁", to: "/" },
      { l: "行程介紹", to: "/tours" },
      { l: "關於我們", to: "/about" },
      { l: "旅客分享", to: "/reviews" },
      { l: "部落格", to: "/blog" },
      { l: "常見問題", to: "/faq" },
    ],
  },
  {
    title: "熱門行程",
    links: [
      { l: "落磯山經典團", to: "/tours/rockies-classic" },
      { l: "班夫一日遊", to: "/tours/banff-day" },
      { l: "極光追蹤之旅", to: "/tours/aurora" },
      { l: "溫哥華市區深度遊", to: "/tours/vancouver-city" },
    ],
  },
  {
    title: "聯絡資訊",
    text: [
      "+1 (604) 123-4567",
      "info@shootingstartravel.com",
      "Vancouver, BC, Canada",
      "週一 – 週六 9:00 – 18:00 PST",
    ],
  },
  {
    title: "社群平台",
    text: ["Instagram @shootingstar.travel", "Facebook / Shootingstar Travel", "LINE / @shootingstar"],
  },
];

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-cream/15">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-[14px] tracking-[0.18em] uppercase text-cream/90"
      >
        <span>{title}</span>
        <span className={`text-cream/60 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="pb-5 text-[14px] text-cream/75 space-y-3">{children}</div>}
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="relative text-cream"
      style={{
        backgroundImage:
          "linear-gradient(180deg, oklch(0.55 0.03 155) 0%, oklch(0.49 0.025 155) 100%)",
      }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12 pt-28 md:pt-40 pb-14 md:pb-20">
        {/* Closing line */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-cream/65 text-[11px] tracking-[0.4em] uppercase">— bon voyage</p>
          <h3 className="font-serif text-2xl md:text-[40px] mt-6 md:mt-7 leading-[1.35] text-cream font-light tracking-[-0.01em]">
            願每一段旅程，<br />都成為你最珍藏的時光。
          </h3>
        </div>

        {/* Brand block — always visible */}
        <div className="md:hidden flex flex-col items-start gap-4 mb-2">
          <Link to="/" className="inline-flex items-center bg-cream/95 rounded-2xl px-5 py-3 shadow-sm">
            <img src={logo} alt="Shootingstar Travel" className="h-[110px] w-auto" />
          </Link>
          <p className="text-sm leading-[1.9] text-cream/75 max-w-sm">
            加拿大小團精緻旅遊，用心為每位旅人寫下獨一無二的旅行篇章。
          </p>
        </div>

        {/* MOBILE — accordion */}
        <div className="md:hidden mt-4">
          {groups.map((g) => (
            <Accordion key={g.title} title={g.title}>
              {g.links && (
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.l}>
                      <Link to={l.to} className="hover:text-cream">{l.l}</Link>
                    </li>
                  ))}
                </ul>
              )}
              {g.text && (
                <ul className="space-y-2">
                  {g.text.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
            </Accordion>
          ))}
        </div>

        {/* DESKTOP — multi column */}
        <div className="hidden md:grid gap-14 md:gap-12 md:grid-cols-12 items-start">
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center bg-cream/95 rounded-2xl px-6 py-4 shadow-sm">
              <img src={logo} alt="Shootingstar Travel" className="h-[140px] w-auto" />
            </Link>
            <p className="mt-6 text-sm leading-[2] text-cream/75 max-w-sm">
              Shootingstar Travel — 加拿大小團精緻旅遊，
              用心為每位旅人寫下獨一無二的旅行篇章。
            </p>
            <div className="mt-7 flex items-center gap-3">
              {["Facebook", "Instagram"].map((s) => (
                <a key={s} href="#" aria-label={s} className="grid h-10 w-10 place-items-center rounded-full border border-cream/30 hover:border-cream/70 hover:bg-cream/10 transition text-[12px]">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {groups.slice(0, 3).map((g) => (
            <div key={g.title} className="md:col-span-2 last:md:col-span-3">
              <h4 className="font-serif text-[12px] text-cream/90 tracking-[0.25em] uppercase">{g.title}</h4>
              {g.links && (
                <ul className="mt-6 space-y-3.5 text-[14px] text-cream/75">
                  {g.links.map((l) => (
                    <li key={l.l}><Link to={l.to} className="hover:text-cream transition">{l.l}</Link></li>
                  ))}
                </ul>
              )}
              {g.text && (
                <ul className="mt-6 space-y-3.5 text-[14px] text-cream/75">
                  {g.text.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-cream/15 flex flex-col gap-4 text-[12px] tracking-wide text-cream/55">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p>© 2026 Shootingstar Travel. Made with care in Vancouver.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link to="/privacy" className="hover:text-cream transition">隱私權政策</Link>
              <span className="text-cream/25">·</span>
              <Link to="/terms" className="hover:text-cream transition">服務條款</Link>
              <span className="text-cream/25">·</span>
              <a href="https://bluluma.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition">
                Web Design by BluLuma
              </a>
            </div>
          </div>
          <p className="font-marker text-cream/45 text-center md:text-right">— see you on the road ✦</p>
        </div>
      </div>
    </footer>
  );
}
