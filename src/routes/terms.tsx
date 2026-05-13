import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "服務條款 Terms of Use — Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 服務條款。預訂、付款、取消與責任聲明。" },
      { property: "og:title", content: "服務條款 — Shootingstar Travel" },
      { property: "og:description", content: "Shootingstar Travel 服務條款。" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
        <p className="font-marker text-primary/70 text-[13px] tracking-[0.3em] uppercase">terms of use</p>
        <h1 className="font-serif text-3xl md:text-5xl mt-4 mb-10 leading-tight">服務條款</h1>
        <div className="prose prose-neutral max-w-none text-ink/80 space-y-6 text-[15px] leading-[1.95]">
          <p className="text-ink/60 text-sm">最後更新日期：2026 年 5 月</p>
          <p>歡迎使用 Shootingstar Travel（以下稱「我們」）所提供之網站與旅遊服務。當您瀏覽本網站、預訂行程或進行付款時，即表示您同意以下條款。</p>

          <h2 className="font-serif text-xl mt-10">1. 服務範圍</h2>
          <p>我們提供加拿大境內小團精緻旅遊行程、客製行程規劃及相關旅遊諮詢服務。所有行程內容、價格與供應狀況以最終確認文件為準。</p>

          <h2 className="font-serif text-xl mt-10">2. 預訂與付款</h2>
          <p>預訂須於指定期限內完成付款，視為訂位成功。我們透過第三方支付處理商（例如 Stripe）安全處理付款資訊。所有交易以加幣（CAD）報價，除非另有說明。</p>

          <h2 className="font-serif text-xl mt-10">3. 取消與退款政策</h2>
          <p>出發前 30 天以上取消，可全額退款（扣除手續費）；15 – 29 天取消，退款 50%；14 天內取消恕不退款。詳細條款依各行程說明為準。</p>

          <h2 className="font-serif text-xl mt-10">4. 行程變更</h2>
          <p>因天候、交通、安全或其他不可抗力因素，我們保留調整或取消行程的權利，並將提供合理的替代方案或退款。</p>

          <h2 className="font-serif text-xl mt-10">5. 旅客責任</h2>
          <p>旅客須持有有效旅行證件、相關簽證、足夠之旅遊保險，並遵守當地法律與行程安排。任何因旅客個人疏忽造成之損失由旅客自行承擔。</p>

          <h2 className="font-serif text-xl mt-10">6. 責任限制</h2>
          <p>我們對於合作供應商（如航空公司、飯店、活動提供者）所導致之延誤、損失或事故，僅負合理協助之責任。</p>

          <h2 className="font-serif text-xl mt-10">7. 智慧財產</h2>
          <p>網站上的所有圖片、文案、設計與品牌標誌均屬 Shootingstar Travel 所有，未經授權不得轉載或商業使用。</p>

          <h2 className="font-serif text-xl mt-10">8. 條款修改</h2>
          <p>我們保留隨時修改本條款之權利，最新版本將公告於本頁面。</p>

          <p className="text-ink/60 text-sm mt-10">如有任何問題，請聯繫：info@shootingstartravel.com</p>
        </div>
      </section>
    </SiteLayout>
  );
}
