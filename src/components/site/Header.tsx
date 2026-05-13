import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import headerPaper from "@/assets/header-paper.png";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "首頁" },
  { to: "/tours", label: "行程介紹" },
  { to: "/stories", label: "我們的故事" },
  { to: "/destinations", label: "旅客分享" },
  { to: "/about", label: "最新消息" },
  { to: "/contact", label: "聯絡我們" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 text-cream"
      style={{ backgroundColor: "#4a2a18" }}
    >
      {/* torn paper bottom edge overlay */}
      <div
        className="absolute left-0 right-0 -bottom-4 h-10 pointer-events-none"
        style={{
          backgroundImage: `url(${headerPaper})`,
          backgroundSize: "100% 200%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 py-3">
        <Link to="/" className="flex items-center gap-3 -my-2">
          <img src={logo} alt="Shootingstar Travel" className="h-[64px] md:h-[84px] w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-[14px] tracking-wide text-cream/85 hover:text-cream transition-colors py-2"
              activeProps={{ className: "text-cream [&]:after:content-[''] [&]:after:absolute [&]:after:-bottom-0 [&]:after:left-1 [&]:after:right-1 [&]:after:h-[1.5px] [&]:after:bg-cream/80" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-cream/95 px-6 py-2.5 text-[13px] tracking-wide text-ink hover:bg-cream transition shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            立即預訂
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-cream"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/15 bg-[oklch(0.20_0.025_50)]">
          <div className="px-6 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1.5 text-cream/85">
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full bg-cream px-5 py-2.5 text-sm text-ink">
              立即預訂
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
