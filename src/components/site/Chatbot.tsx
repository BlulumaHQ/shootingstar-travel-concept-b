import { useState } from "react";

const quick = ["洛磯山團", "Banff", "極光旅行", "中文團", "韓文團"];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ from: "bot" | "me"; text: string }[]>([
    { from: "bot", text: "你好 👋 有想去的行程嗎？我可以幫你推薦適合的旅程。" },
  ]);

  const send = (t: string) => {
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        { from: "bot", text: `太棒了！「${t}」目前有幾個熱門出發日，要我幫你看看 7 月的小團名額嗎？✦` },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Travel chat"
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[55] grid h-16 w-16 place-items-center rounded-full bg-cream border border-primary/30 shadow-[0_18px_40px_-14px_rgba(60,80,70,0.45)] hover:scale-105 transition"
        style={{ background: "linear-gradient(135deg, var(--cream), var(--lavender-soft))" }}
      >
        <svg width="38" height="38" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          {/* notebook */}
          <rect x="10" y="12" width="40" height="36" rx="4" />
          <path d="M16 12 v36 M22 12 v36" strokeOpacity="0.4" />
          {/* smile */}
          <circle cx="34" cy="28" r="1.2" fill="currentColor" />
          <circle cx="42" cy="28" r="1.2" fill="currentColor" />
          <path d="M33 34 q5 4 10 0" />
          {/* speech tail */}
          <path d="M44 50 l4 6 l-2 -6" />
          {/* sparkle */}
          <path d="M52 16 l1.5 3 l3 1.5 l-3 1.5 l-1.5 3 l-1.5 -3 l-3 -1.5 l3 -1.5 z" className="text-accent" stroke="currentColor" />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 md:right-7 z-[55] w-[min(92vw,360px)] rounded-2xl bg-cream border border-border shadow-[0_30px_60px_-20px_rgba(60,80,70,0.4)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 bg-[var(--sand)] border-b border-border">
            <div>
              <p className="font-marker text-primary text-xs tracking-[0.25em] uppercase">— travel buddy</p>
              <p className="font-serif text-[15px] text-ink mt-0.5 font-semibold">小星 · Shootingstar</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-ink/50 text-xl">×</button>
          </div>
          <div className="px-4 py-4 max-h-[300px] overflow-y-auto space-y-2.5">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.7] ${m.from === "me" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-[var(--sand)] text-ink rounded-tl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[11.5px] rounded-full border border-primary/30 text-primary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition"
              >
                {q}
              </button>
            ))}
          </div>
          <p className="px-4 pb-4 text-[10.5px] text-ink/45 text-center">* 此為示意聊天，正式版本將串接智能客服</p>
        </div>
      )}
    </>
  );
}
