import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer
      className="relative text-cream"
      style={{
        backgroundImage:
          "linear-gradient(180deg, oklch(0.22 0.025 50) 0%, oklch(0.17 0.022 50) 100%)",
      }}
    >
      {/* torn paper top edge */}
      <div
        className="absolute -top-[1px] left-0 right-0 h-4 bg-cream"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 8px 0, transparent 7px, #000 8px)",
          maskImage:
            "radial-gradient(circle at 8px 0, transparent 7px, #000 8px)",
          WebkitMaskSize: "16px 16px",
          maskSize: "16px 16px",
          WebkitMaskRepeat: "repeat-x",
          maskRepeat: "repeat-x",
          WebkitMaskPosition: "top",
          maskPosition: "top",
        }}
        aria-hidden
      />

      {/* wood grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(120,60,20,0.5) 0 2px, transparent 2px 6px), repeating-linear-gradient(90deg, rgba(255,200,140,0.25) 0 1px, transparent 1px 22px)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-12 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* brand col */}
          <div className="md:col-span-3">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Shootingstar Travel" className="h-[80px] w-auto" />
            </Link>
            <ul className="mt-6 space-y-3 text-sm text-cream/75">
              <li className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92V21a1 1 0 0 1-1.11 1A19 19 0 0 1 2 4.11 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.29 1L7.21 10.21a16 16 0 0 0 6.58 6.58l1.46-1.59a1 1 0 0 1 1-.29l4 1a1 1 0 0 1 .75 1Z"/></svg>
                +1 (604) 123-4567
              </li>
              <li className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
                info@shootingstartravel.com
              </li>
              <li className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Vancouver, BC, Canada
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              {[
                { l: "Facebook", p: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { l: "Instagram", p: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" },
                { l: "Share", p: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" },
              ].map((s) => (
                <a key={s.l} href="#" aria-label={s.l} className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 hover:border-cream/60 hover:bg-cream/5 transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.p}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div className="md:col-span-2 md:col-start-5">
            <h4 className="font-serif text-base text-cream tracking-wide">快速連結</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/70">
              <li><Link to="/" className="hover:text-cream transition">首頁</Link></li>
              <li><Link to="/tours" className="hover:text-cream transition">行程介紹</Link></li>
              <li><Link to="/destinations" className="hover:text-cream transition">旅客分享</Link></li>
              <li><Link to="/about" className="hover:text-cream transition">最新消息</Link></li>
              <li><Link to="/contact" className="hover:text-cream transition">聯絡我們</Link></li>
            </ul>
          </div>

          {/* popular tours */}
          <div className="md:col-span-2">
            <h4 className="font-serif text-base text-cream tracking-wide">熱門行程</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/70">
              <li>落磯山經典團 5天4夜</li>
              <li>班夫國家公園一日遊</li>
              <li>極光追蹤之旅</li>
              <li>溫哥華市區深度遊</li>
              <li>哥倫比亞冰原大道</li>
            </ul>
          </div>

          {/* about us */}
          <div className="md:col-span-2">
            <h4 className="font-serif text-base text-cream tracking-wide">關於我們</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/70">
              <li><Link to="/stories" className="hover:text-cream transition">我們的故事</Link></li>
              <li>專業團隊</li>
              <li>常見問題</li>
              <li>旅遊須知</li>
              <li>隱私政策</li>
            </ul>
          </div>

          {/* travel info */}
          <div className="md:col-span-2">
            <h4 className="font-serif text-base text-cream tracking-wide">旅遊資訊</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/70">
              <li>簽證資訊</li>
              <li>旅遊保險</li>
              <li>天氣資訊</li>
              <li>行前準備</li>
              <li>當地資訊</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/12 flex flex-col md:flex-row items-center justify-center gap-2 text-[12px] tracking-wide text-cream/45">
          <p>© 2026 Shootingstar Travel. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
