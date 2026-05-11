import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "首頁" },
  { to: "/tours", label: "精選行程" },
  { to: "/destinations", label: "目的地" },
  { to: "/stories", label: "旅客故事" },
  { to: "/about", label: "關於我們" },
  { to: "/contact", label: "聯絡我們" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-cream/95 backdrop-blur-md" : "bg-cream/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 py-0">
        <Link to="/" className="flex items-center -my-3">
          <img src={logo} alt="Shootingstar Travel" className="h-[96px] md:h-[140px] w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-[15px] tracking-wide text-foreground/80 hover:text-primary transition-colors py-2"
              activeProps={{ className: "text-primary font-medium [&]:after:content-[''] [&]:after:absolute [&]:after:-bottom-0.5 [&]:after:left-0 [&]:after:right-0 [&]:after:h-[2px] [&]:after:bg-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            立即預訂
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
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
          <div className="px-6 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1.5 text-foreground/80">
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
              立即預訂
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
