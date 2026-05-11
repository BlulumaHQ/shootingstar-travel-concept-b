import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative bg-[oklch(0.24_0.03_140)] text-cream overflow-hidden">
      {/* subtle paper grain — no torn edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,250,240,0.7) 1px, transparent 1.4px)",
          backgroundSize: "4px 4px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-12 pt-28 pb-16">
        {/* Closing journal line — editorial, asymmetric */}
        <div className="grid md:grid-cols-12 gap-12 items-end pb-20 border-b border-cream/12">
          <div className="md:col-span-7">
            <p className="font-marker text-cream/55 text-sm tracking-wide">— end of this chapter</p>
            <h3 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
              謝謝你，<br />
              <span className="italic text-cream/75">與我們同行。</span>
            </h3>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-sm text-cream/65 leading-[2]">
              每一段旅程都是一封寫給未來的信。
              我們在溫哥華等你，為下一頁，寫下開始。
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 font-serif text-xs tracking-[0.28em] uppercase text-cream/85 border-b border-cream/40 pb-1.5 hover:text-cream hover:border-cream transition"
            >
              開始你的旅程 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Quiet info row */}
        <div className="mt-16 grid gap-12 md:grid-cols-12 text-sm">
          <div className="md:col-span-4">
            <h4 className="font-serif text-base text-cream tracking-wide">Shootingstar Travel</h4>
            <p className="mt-4 text-cream/55 leading-[1.95]">
              加拿大在地深度旅行<br />
              小團精緻體驗 · 自 2014
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif text-[11px] tracking-[0.28em] uppercase text-cream/50">索引</h4>
            <ul className="mt-4 space-y-2.5 text-cream/70">
              <li><Link to="/tours" className="hover:text-cream transition">精選行程</Link></li>
              <li><Link to="/destinations" className="hover:text-cream transition">目的地</Link></li>
              <li><Link to="/stories" className="hover:text-cream transition">旅客故事</Link></li>
              <li><Link to="/about" className="hover:text-cream transition">關於我們</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif text-[11px] tracking-[0.28em] uppercase text-cream/50">寄信給我們</h4>
            <ul className="mt-4 space-y-2.5 text-cream/70 leading-relaxed">
              <li>Vancouver, BC, Canada</li>
              <li>hello@shootingstartravel.ca</li>
              <li className="text-cream/50 text-xs tracking-wider pt-1">WhatsApp · KakaoTalk · WeChat</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-serif text-[11px] tracking-[0.28em] uppercase text-cream/50">追蹤</h4>
            <ul className="mt-4 space-y-2.5 text-cream/70">
              <li><a href="#" className="hover:text-cream transition">Instagram</a></li>
              <li><a href="#" className="hover:text-cream transition">YouTube</a></li>
              <li><a href="#" className="hover:text-cream transition">小紅書</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] tracking-wider text-cream/40">
          <p>© 2026 Shootingstar Travel. All rights reserved.</p>
          <p>
            Web Design by{" "}
            <a href="https://bluluma.com" target="_blank" rel="noopener noreferrer" className="text-cream/65 hover:text-cream hover:underline">
              Bluluma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
