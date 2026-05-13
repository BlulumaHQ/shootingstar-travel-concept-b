import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer
      className="relative text-cream"
      style={{
        backgroundImage:
          "linear-gradient(180deg, oklch(0.55 0.03 155) 0%, oklch(0.49 0.025 155) 100%)",
      }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12 pt-28 md:pt-32 pb-20">
        {/* Editorial closing line */}
        <div className="text-center mb-20">
          <p className="font-marker text-cream/70 text-base tracking-[0.3em] uppercase">— bon voyage</p>
          <h3 className="font-serif text-3xl md:text-4xl mt-5 leading-[1.4] text-cream font-light">
            願每一段旅程，<br />都成為你最珍藏的時光。
          </h3>
        </div>

        <div className="grid gap-14 md:gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center">
              <img src={logo} alt="Shootingstar Travel" className="h-[68px] w-auto opacity-95 brightness-0 invert" />
            </Link>
            <p className="mt-6 text-sm leading-[2] text-cream/75 max-w-sm">
              Shootingstar Travel — 加拿大小團精緻旅遊，
              用心為每位旅人寫下獨一無二的旅行篇章。
            </p>
            <div className="mt-7 flex items-center gap-3">
              {[
                { l: "Facebook", p: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { l: "Instagram", p: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" },
              ].map((s) => (
                <a key={s.l} href="#" aria-label={s.l} className="grid h-10 w-10 place-items-center rounded-full border border-cream/30 hover:border-cream/70 hover:bg-cream/10 transition">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={s.p}/></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-serif text-[13px] text-cream/90 tracking-[0.25em] uppercase">探索</h4>
            <ul className="mt-6 space-y-4 text-[14px] text-cream/75">
              <li><Link to="/tours" className="hover:text-cream transition">行程介紹</Link></li>
              <li><Link to="/destinations" className="hover:text-cream transition">目的地</Link></li>
              <li><Link to="/stories" className="hover:text-cream transition">旅人故事</Link></li>
              <li><Link to="/about" className="hover:text-cream transition">關於我們</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif text-[13px] text-cream/90 tracking-[0.25em] uppercase">聯絡</h4>
            <ul className="mt-6 space-y-4 text-[14px] text-cream/75">
              <li>+1 (604) 123-4567</li>
              <li>info@shootingstartravel.com</li>
              <li>Vancouver, BC, Canada</li>
              <li><Link to="/contact" className="underline underline-offset-4 hover:text-cream">寫信給我們 →</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-cream/15 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] tracking-wide text-cream/55">
          <p>© 2026 Shootingstar Travel. Made with care in Vancouver.</p>
          <p className="font-marker text-cream/45">— see you on the road ✦</p>
        </div>
      </div>
    </footer>
  );
}
