import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "常見問題 FAQ | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 加拿大旅遊常見問題：報名、付款、行程、取消改期、語言團別與出發前準備。" },
      { property: "og:title", content: "常見問題 FAQ | Shootingstar Travel" },
      { property: "og:description", content: "報名、付款、行程、取消、語言團別與出發前準備的完整解答。" },
    ],
  }),
  component: FaqPage,
});

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "報名與付款",
    items: [
      { q: "如何報名？", a: "您可以透過聯絡我們頁面填寫表單，或直接以 WhatsApp、KakaoTalk、WeChat 與我們聯繫，將會有專人於 24 小時內回覆。" },
      { q: "可以使用哪些付款方式？", a: "支援信用卡、Interac e-Transfer、銀行轉帳與 PayPal，部分行程亦可現場付款。" },
      { q: "需要先付訂金嗎？", a: "多日行程通常收取 30% 訂金以保留座位，餘款於出發前 14 天內結清。" },
      { q: "報名後多久收到確認？", a: "通常於 24 小時內收到 Email 確認；旺季可能延長至 48 小時。" },
    ],
  },
  {
    title: "行程安排",
    items: [
      { q: "每團多少人？", a: "我們以小團為主，平均 6–14 人，讓每位旅人都能擁有舒適的體驗空間。" },
      { q: "是否包含住宿？", a: "多日行程包含精選住宿，皆為 3 星以上飯店或特色山屋。" },
      { q: "是否包含餐食？", a: "依行程不同，部分包含早餐或特色餐，行程頁會明確列出。" },
      { q: "可以客製行程嗎？", a: "當然！私人包團服務歡迎家庭、情侶、好友團體，由我們為您量身打造。" },
    ],
  },
  {
    title: "取消與改期",
    items: [
      { q: "可以取消或改期嗎？", a: "出發前 30 天以上可全額退費；14–29 天可改期一次；14 天內恕無法退費，但仍可協助轉讓。" },
      { q: "若因天候取消怎麼辦？", a: "因不可抗力（暴風雪、山區封路）導致無法成行，將安排改期或全額退款。" },
      { q: "可以將名額轉讓他人嗎？", a: "可以，請於出發前 7 天告知我們聯絡資訊，方便接送與保險登記。" },
    ],
  },
  {
    title: "語言與團別",
    items: [
      { q: "提供哪些語言團？", a: "目前提供繁體中文、簡體中文、韓文與英文團別，部分私人行程可指定語言。" },
      { q: "導遊會說中文嗎？", a: "中文團皆由華語領隊或在地中文導遊帶領，溝通完全沒有問題。" },
      { q: "不同語言團可以一起拼團嗎？", a: "通常不會，以維持每位旅人的體驗品質；私人包團則可彈性安排。" },
    ],
  },
  {
    title: "出發前準備",
    items: [
      { q: "需要準備哪些裝備？", a: "建議攜帶保暖外套、舒適防水鞋、防曬與保濕用品，每個行程頁都有詳細建議清單。" },
      { q: "需要自行投保嗎？", a: "我們強烈建議旅客自行投保旅遊平安險與醫療險，以獲得最完整保障。" },
      { q: "從哪裡集合出發？", a: "多數行程於溫哥華或卡加利市區指定地點集合，私人團可協調飯店接送。" },
      { q: "可以帶長輩或小孩嗎？", a: "可以！我們的行程節奏舒緩，適合 6 歲以上孩童及行動方便的長輩。" },
    ],
  },
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="bg-cream">
        <div className="mx-auto max-w-[920px] px-6 md:px-10 pt-16 md:pt-24 pb-12 text-center">
          <p className="font-marker text-primary/75 text-sm tracking-[0.3em] uppercase">— frequently asked</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mt-4 tracking-tight font-medium">常見問題</h1>
          <p className="mt-5 text-ink/65 leading-[2] text-[15px] max-w-xl mx-auto">
            出發之前，旅人們最常問我們的事 ✦
          </p>
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="mx-auto max-w-[920px] px-6 md:px-10 space-y-14">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="flex items-baseline gap-3 mb-5">
                <h2 className="font-serif text-2xl text-ink font-semibold">{g.title}</h2>
                <span className="h-px flex-1 bg-accent/40" />
              </div>
              <div className="space-y-1">
                {g.items.map((it, i) => (
                  <details
                    key={it.q}
                    open={i === 0}
                    className="group border-b border-accent/40 py-4 open:pb-5"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                      <span className="font-serif text-[15.5px] text-ink leading-snug">{it.q}</span>
                      <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                    </summary>
                    <p className="mt-3 text-ink/65 leading-[1.95] text-[14px]">{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-6">
            <p className="text-ink/65 text-[14px] mb-5">沒有找到你的問題？</p>
            <Link to="/contact" className="inline-flex rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm hover:bg-primary/90 transition">
              聯絡我們 →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
