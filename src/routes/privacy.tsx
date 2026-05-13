import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "隱私權政策 Privacy Policy — Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 隱私權政策。我們如何收集、使用和保護您的個人資訊。" },
      { property: "og:title", content: "隱私權政策 — Shootingstar Travel" },
      { property: "og:description", content: "Shootingstar Travel 隱私權政策。" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
        <p className="font-marker text-primary/70 text-[13px] tracking-[0.3em] uppercase">privacy policy</p>
        <h1 className="font-serif text-3xl md:text-5xl mt-4 mb-10 leading-tight">隱私權政策</h1>
        <div className="prose prose-neutral max-w-none text-ink/80 space-y-6 text-[15px] leading-[1.95]">
          <p className="text-ink/60 text-sm">最後更新日期：2026 年 5 月</p>
          <p>Shootingstar Travel（以下稱「我們」）尊重並重視每位旅客的個人隱私。本政策說明我們在您使用本網站、預訂行程或與我們聯繫時，如何收集、使用、儲存與保護您的個人資料。</p>

          <h2 className="font-serif text-xl mt-10">1. 我們收集的資訊</h2>
          <p>當您預訂行程、訂閱電子報或聯繫我們時，我們可能會收集：姓名、聯絡電話、電子郵件、付款資訊、護照／證件資訊（限行程必要）、緊急聯絡人、飲食或健康需求等。</p>

          <h2 className="font-serif text-xl mt-10">2. 資訊使用方式</h2>
          <p>我們使用您的資料以：完成預訂與付款、提供行程相關通知、處理客戶服務、寄送行銷或活動資訊（您可隨時取消訂閱）、改善網站體驗。</p>

          <h2 className="font-serif text-xl mt-10">3. 付款資訊</h2>
          <p>付款交易由第三方支付處理商（例如 Stripe）以加密方式處理。我們不會在自有伺服器儲存完整信用卡號。</p>

          <h2 className="font-serif text-xl mt-10">4. 資料分享</h2>
          <p>除完成行程所需（如航空公司、飯店、保險、合作供應商）或法律要求外，我們不會將您的個人資料出售或分享給第三方。</p>

          <h2 className="font-serif text-xl mt-10">5. Cookie 與分析</h2>
          <p>本網站使用 Cookie 與分析工具以了解使用情況並改善服務。您可在瀏覽器設定中停用 Cookie。</p>

          <h2 className="font-serif text-xl mt-10">6. 您的權利</h2>
          <p>您可隨時要求查閱、修改或刪除您的個人資料，請來信 info@shootingstartravel.com。</p>

          <h2 className="font-serif text-xl mt-10">7. 政策更新</h2>
          <p>本政策可能不定期更新，最新版本將公布於本頁面。</p>

          <p className="text-ink/60 text-sm mt-10">如有任何問題，請聯繫：info@shootingstartravel.com</p>
        </div>
      </section>
    </SiteLayout>
  );
}
