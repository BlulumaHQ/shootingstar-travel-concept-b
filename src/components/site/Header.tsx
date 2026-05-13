import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import headerEdge from "@/assets/header-edge.png";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "首頁" },
  { to: "/tours", label: "行程介紹" },
  { to: "/about", label: "關於我們" },
  { to: "/reviews", label: "旅客分享" },
  { to: "/blog", label: "部落格" },
  { to: "/faq", label: "常見問題" },
  { to: "/contact", label: "聯絡我們" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Solid cream bar — flush to the very top, no gap */}
      <div className="relative bg-cream">
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="flex items-center -my-2" onClick={() => setOpen(false)}>
            <img src={logo} alt="Shootingstar Travel" className="h-[88px] md:h-[140px] w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative text-[14.5px] tracking-wide text-ink/75 hover:text-primary transition-colors py-2"
                activeProps={{ className: "text-primary [&]:after:content-[''] [&]:after:absolute [&]:after:-bottom-0 [&]:after:left-1 [&]:after:right-1 [&]:after:h-[1.5px] [&]:after:bg-primary/70" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[13px] tracking-wide text-primary-foreground hover:bg-primary/90 transition shadow-[0_6px_18px_-8px_oklch(0.585_0.04_155/0.6)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              立即預訂
            </Link>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-ink relative z-10"
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

      {/* Torn paper bottom edge — overlaps next section, fully transparent below */}
      <img
        src={headerEdge}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-full w-full h-[18px] md:h-[28px] select-none drop-shadow-[0_4px_6px_rgba(60,60,60,0.05)]"
        style={{ objectFit: "fill" }}
      />

      {/* Mobile menu — full screen overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[88px] z-40 bg-cream overflow-y-auto">
          <nav className="px-8 pt-10 pb-16 flex flex-col">
            {nav.map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-serif text-[26px] text-ink py-4 border-b border-ink/10 tracking-tight"
                activeProps={{ className: "text-primary" }}
              >
                <span className="text-primary/40 text-[11px] tracking-[0.3em] mr-3 align-middle">0{i + 1}</span>
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex justify-center rounded-full bg-primary px-6 py-4 text-[14px] tracking-[0.15em] uppercase text-primary-foreground"
            >
              立即預訂 →
            </Link>
            <div className="mt-12 text-center text-[11px] tracking-[0.4em] uppercase text-ink/50">
              Shootingstar Travel · Vancouver
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
