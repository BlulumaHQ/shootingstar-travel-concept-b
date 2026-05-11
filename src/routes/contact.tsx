import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "聯絡我們 | Shootingstar Travel" },
      { name: "description", content: "預約諮詢、客製行程、團體報價。透過 WhatsApp、KakaoTalk、WeChat 或 Email 與 Shootingstar Travel 聯繫。" },
      { property: "og:title", content: "聯絡我們 | Shootingstar Travel" },
      { property: "og:description", content: "下一趟旅程，從這裡開始。" },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { l: "WhatsApp", v: "+1 (604) 000-0000", h: "https://wa.me/" },
  { l: "KakaoTalk", v: "@shootingstartravel", h: "#" },
  { l: "WeChat", v: "shootingstar_ca", h: "#" },
  { l: "Email", v: "hello@shootingstartravel.ca", h: "mailto:hello@shootingstartravel.ca" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <p className="font-hand text-clay text-2xl">— let's begin</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-2">下一趟旅程，<br/>從這裡開始。</h1>

        <div className="grid md:grid-cols-2 gap-12 mt-14">
          <div className="paper-card rounded-xl p-8">
            <h2 className="font-serif text-2xl mb-6">告訴我們你的旅行夢想</h2>
            {sent ? (
              <p className="text-primary">收到您的訊息，我們將於 24 小時內回覆 ✦</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-4"
              >
                {[
                  { n: "name", p: "姓名" },
                  { n: "email", p: "Email", t: "email" },
                  { n: "tour", p: "感興趣的行程" },
                ].map((f) => (
                  <input key={f.n} type={f.t || "text"} required name={f.n} placeholder={f.p}
                    className="w-full rounded-md border border-border bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40" />
                ))}
                <textarea required rows={5} placeholder="您想去哪裡？想要什麼樣的體驗？"
                  className="w-full rounded-md border border-border bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <button className="w-full rounded-full bg-primary text-primary-foreground py-3.5">送出詢問</button>
              </form>
            )}
          </div>

          <div>
            <h2 className="font-serif text-2xl mb-6">直接聯繫我們</h2>
            <div className="space-y-3">
              {channels.map((c) => (
                <a key={c.l} href={c.h} className="flex items-center justify-between paper-card rounded-xl px-6 py-4 hover:translate-x-1 transition">
                  <span className="font-medium">{c.l}</span>
                  <span className="text-muted-foreground text-sm">{c.v}</span>
                </a>
              ))}
            </div>
            <div className="mt-10 paper-card rounded-xl p-6 text-sm text-muted-foreground">
              辦公室：Vancouver, BC, Canada<br/>
              營業時間：週一至週六 9:00 – 18:00 PST
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
