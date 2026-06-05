import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useLocale, type Locale } from "@/i18n/locale";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel privacy policy: how we collect, use, and protect your personal information." },
      { property: "og:title", content: "Privacy Policy — Shootingstar Travel" },
      { property: "og:description", content: "Shootingstar Travel privacy policy." },
    ],
  }),
  component: PrivacyPage,
});

type PrivacyCopy = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string }[];
  contact: string;
};

const PRIVACY: Record<Locale, PrivacyCopy> = {
  en: {
    eyebrow: "privacy policy",
    title: "Privacy Policy",
    updated: "Last updated: May 2026",
    intro:
      "Shootingstar Travel (\u201cwe\u201d, \u201cus\u201d) respects the privacy of every traveller. This policy explains how we collect, use, store, and protect your personal information when you use our website, book a tour, or contact us.",
    sections: [
      { h: "1. Information We Collect", p: "When you book a tour, subscribe to our newsletter, or contact us, we may collect: name, phone number, email address, payment information, passport/ID details (only when required for the trip), emergency contact, dietary or health needs." },
      { h: "2. How We Use Your Information", p: "We use your information to: complete bookings and payments, send trip-related notifications, provide customer service, send marketing or event updates (you can unsubscribe at any time), and improve the website experience." },
      { h: "3. Payment Information", p: "Payment transactions are processed by third-party payment providers (such as Stripe) in encrypted form. We do not store complete credit card numbers on our own servers." },
      { h: "4. Sharing of Information", p: "Except as required to deliver the trip (e.g. airlines, hotels, insurance, partner suppliers) or as required by law, we do not sell or share your personal information with third parties." },
      { h: "5. Cookies and Analytics", p: "This website uses cookies and analytics tools to understand usage and improve our service. You may disable cookies in your browser settings." },
      { h: "6. Your Rights", p: "You may request access to, correction of, or deletion of your personal information at any time by emailing info@shootingstartravel.com." },
      { h: "7. Policy Updates", p: "This policy may be updated from time to time. The latest version will always be posted on this page." },
    ],
    contact: "If you have any questions, please contact: info@shootingstartravel.com",
  },
  zh: {
    eyebrow: "privacy policy",
    title: "隱私權政策",
    updated: "最後更新日期：2026 年 5 月",
    intro:
      "Shootingstar Travel（以下稱「我們」）尊重並重視每位旅客的個人隱私。本政策說明我們在您使用本網站、預訂行程或與我們聯繫時，如何收集、使用、儲存與保護您的個人資料。",
    sections: [
      { h: "1. 我們收集的資訊", p: "當您預訂行程、訂閱電子報或聯繫我們時，我們可能會收集：姓名、聯絡電話、電子郵件、付款資訊、護照／證件資訊（限行程必要）、緊急聯絡人、飲食或健康需求等。" },
      { h: "2. 資訊使用方式", p: "我們使用您的資料以：完成預訂與付款、提供行程相關通知、處理客戶服務、寄送行銷或活動資訊（您可隨時取消訂閱）、改善網站體驗。" },
      { h: "3. 付款資訊", p: "付款交易由第三方支付處理商（例如 Stripe）以加密方式處理。我們不會在自有伺服器儲存完整信用卡號。" },
      { h: "4. 資料分享", p: "除完成行程所需（如航空公司、飯店、保險、合作供應商）或法律要求外，我們不會將您的個人資料出售或分享給第三方。" },
      { h: "5. Cookie 與分析", p: "本網站使用 Cookie 與分析工具以了解使用情況並改善服務。您可在瀏覽器設定中停用 Cookie。" },
      { h: "6. 您的權利", p: "您可隨時要求查閱、修改或刪除您的個人資料，請來信 info@shootingstartravel.com。" },
      { h: "7. 政策更新", p: "本政策可能不定期更新，最新版本將公布於本頁面。" },
    ],
    contact: "如有任何問題，請聯繫：info@shootingstartravel.com",
  },
  ko: {
    eyebrow: "privacy policy",
    title: "개인정보 처리방침",
    updated: "최종 업데이트: 2026년 5월",
    intro:
      "Shootingstar Travel(이하 \u201c당사\u201d)은 모든 여행자의 개인정보를 소중히 여깁니다. 본 방침은 귀하가 당사 웹사이트를 이용하거나 투어를 예약하거나 당사에 연락할 때 개인정보를 어떻게 수집, 이용, 보관, 보호하는지 설명합니다.",
    sections: [
      { h: "1. 수집하는 정보", p: "투어 예약, 뉴스레터 구독, 문의 시 당사는 다음 정보를 수집할 수 있습니다: 이름, 연락처, 이메일, 결제 정보, 여권/신분증 정보(여행에 필요한 경우에 한함), 비상 연락처, 식이 및 건강 관련 요구사항." },
      { h: "2. 정보의 이용 목적", p: "수집한 정보는 예약 및 결제 처리, 여행 관련 안내, 고객 서비스 제공, 마케팅 및 이벤트 안내(언제든지 수신 거부 가능), 웹사이트 경험 개선을 위해 사용됩니다." },
      { h: "3. 결제 정보", p: "모든 결제는 제3자 결제 대행사(예: Stripe)에서 암호화되어 처리되며, 당사 서버에는 전체 카드번호를 저장하지 않습니다." },
      { h: "4. 정보의 공유", p: "여행 진행에 필요한 경우(항공사, 호텔, 보험, 협력 공급업체 등) 또는 법률상 요구되는 경우를 제외하고, 당사는 귀하의 개인정보를 제3자에게 판매하거나 공유하지 않습니다." },
      { h: "5. 쿠키 및 분석", p: "본 웹사이트는 이용 현황을 파악하고 서비스를 개선하기 위해 쿠키 및 분석 도구를 사용합니다. 브라우저 설정에서 쿠키를 비활성화하실 수 있습니다." },
      { h: "6. 귀하의 권리", p: "귀하는 언제든지 info@shootingstartravel.com 으로 이메일을 보내 개인정보의 열람, 수정, 삭제를 요청하실 수 있습니다." },
      { h: "7. 방침 변경", p: "본 방침은 수시로 업데이트될 수 있으며, 최신 내용은 본 페이지에 게시됩니다." },
    ],
    contact: "문의 사항이 있으시면 info@shootingstartravel.com 으로 연락해 주세요.",
  },
};

export function PrivacyPage() {
  const locale = useLocale();
  const t = PRIVACY[locale];
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
        <p className="font-marker text-primary/70 text-[13px] tracking-[0.3em] uppercase">{t.eyebrow}</p>
        <h1 className="font-serif text-3xl md:text-5xl mt-4 mb-10 leading-tight">{t.title}</h1>
        <div className="prose prose-neutral max-w-none text-ink/80 space-y-6 text-[15px] leading-[1.95]">
          <p className="text-ink/60 text-sm">{t.updated}</p>
          <p>{t.intro}</p>
          {t.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-serif text-xl mt-10">{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
          <p className="text-ink/60 text-sm mt-10">{t.contact}</p>
        </div>
      </section>
    </SiteLayout>
  );
}
