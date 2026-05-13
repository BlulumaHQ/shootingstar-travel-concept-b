import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import headerPaper from "@/assets/header-paper.png";
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
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b border-border/60 bg-cream/90"
      style={{
        backgroundImage: `url(${headerPaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 py-0">
        <Link to="/" className="flex items-center -my-3">
          <img src={logo} alt="Shootingstar Travel" className="h-[120px] md:h-[150px] w-auto" />
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
          className="lg:hidden p-2 -mr-2 text-ink"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-cream">
          <div className="px-6 py-5 flex flex-col gap-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1.5 text-ink/80">
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground">
              立即預訂
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
