import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "服務條款 Terms of Use — Shooting Star Travel" },
      { name: "description", content: "Shooting Star Travel 服務條款。預訂、付款、取消與責任聲明。" },
      { property: "og:title", content: "服務條款 — Shooting Star Travel" },
      { property: "og:description", content: "Shooting Star Travel 服務條款。" },
    ],
  }),
  component: TermsPage,
});

export function TermsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
        <p className="font-marker text-primary/70 text-[13px] tracking-[0.3em] uppercase">Terms of Use</p>
        <h1 className="font-serif text-3xl md:text-5xl mt-4 mb-10 leading-tight">服務條款</h1>
        <div className="prose prose-neutral max-w-none text-ink/80 text-[15px] leading-[1.95]">
          <p className="text-ink/60 text-sm">最後更新日期：2026 年 5 月</p>

          <p>歡迎使用 Shooting Star Travel（以下簡稱「本公司」、「我們」）所提供之網站與旅遊服務。當您瀏覽本網站、預訂行程、提交預訂申請或完成付款時，即表示您已閱讀、理解並同意遵守以下條款與細則。</p>

          <h2 className="font-serif text-xl mt-10">1. 服務範圍</h2>
          <p>本公司提供加拿大境內及相關地區之精緻小團旅遊行程、客製化旅遊規劃、旅遊諮詢及相關服務。</p>
          <p>所有行程內容、價格、住宿安排、交通方式及供應狀況均以最終確認文件及本公司正式通知為準。本公司保留因實際營運需求而調整內容之權利。</p>

          <h2 className="font-serif text-xl mt-10">2. 預訂與付款規定</h2>

          <h3 className="font-serif text-lg mt-6">2.1 合約成立</h3>
          <p>本公司旅遊行程費用原則上須於出發日前 30 天完成全額付款。</p>
          <p>待本公司確認款項入帳後，旅遊契約即正式成立。</p>
          <p>若旅客未於指定期限內完成付款，本公司有權取消預訂並不保留旅遊名額。</p>

          <h3 className="font-serif text-lg mt-6">2.2 付款方式</h3>
          <p>本公司接受信用卡及其他指定付款方式。</p>
          <p>所有價格均以加拿大幣（CAD）計價，除非另有說明。</p>

          <h3 className="font-serif text-lg mt-6">2.3 信用卡退款手續費</h3>
          <p>若旅客使用信用卡支付旅遊費用，並因個人因素申請取消或退款，本公司將於退款金額中扣除實際產生之信用卡刷卡手續費 4% 後辦理退款。</p>

          <h2 className="font-serif text-xl mt-10">3. 取消、變更與退款政策</h2>
          <p>為保障雙方權益，所有取消或變更申請必須於本公司正常營業時間內提出：</p>
          <p>星期一至星期五（國定假日除外）</p>
          <p>若旅客於週末、國定假日或非營業時間提出申請，將以下一個工作日作為正式受理日期。</p>
          <p>退款比例依距離出發日之天數計算如下：</p>

          <h3 className="font-serif text-lg mt-6">出發日前 30 天（含）以上</h3>
          <p>可退還旅遊費用總額之 50%。</p>

          <h3 className="font-serif text-lg mt-6">出發日前 14 天（含）至 29 天</h3>
          <p>可退還旅遊費用總額之 30%。</p>

          <h3 className="font-serif text-lg mt-6">出發日前 13 天內（含出發當日）</h3>
          <p>恕不接受退款。</p>
          <p>如行程頁面另有特別取消規定，則以該行程頁面公告內容為準。</p>

          <h2 className="font-serif text-xl mt-10">4. 行程變更與不可抗力因素</h2>

          <h3 className="font-serif text-lg mt-6">4.1 行程調整權</h3>
          <p>本公司保留因下列因素調整行程內容、順序、景點、交通工具、住宿安排或活動時間之權利：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>當地交通狀況</li>
            <li>天候因素</li>
            <li>政府公告</li>
            <li>安全考量</li>
            <li>臨時突發事件</li>
            <li>其他營運需求</li>
          </ul>
          <p>本公司得於必要時進行調整而不另行通知。</p>

          <h3 className="font-serif text-lg mt-6">4.2 不可抗力因素</h3>
          <p>若因下列不可抗力因素導致旅客無法參加行程、行程取消、延誤、縮減或變更：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>天災</li>
            <li>地震</li>
            <li>森林火災</li>
            <li>洪水</li>
            <li>暴風雪</li>
            <li>疫情</li>
            <li>戰爭</li>
            <li>政府命令</li>
            <li>航空公司取消或延誤</li>
            <li>交通事故</li>
            <li>其他非本公司可控制因素</li>
          </ul>
          <p>本公司不承擔相關損失賠償責任。</p>
          <p>已發生且無法退還之成本、預訂費用及相關支出仍可能依原契約收取。</p>

          <h2 className="font-serif text-xl mt-10">5. 旅客責任與安全須知</h2>

          <h3 className="font-serif text-lg mt-6">5.1 證件與資格</h3>
          <p>旅客須自行確認並持有：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>有效護照</li>
            <li>簽證（如適用）</li>
            <li>入境文件</li>
            <li>其他法定旅行文件</li>
          </ul>
          <p>因個人文件不足或失效而產生之損失概由旅客自行承擔。</p>

          <h3 className="font-serif text-lg mt-6">5.2 個人健康與保險</h3>
          <p>旅遊活動可能包含一定風險。</p>
          <p>旅客應自行評估身體狀況是否適合參加行程。</p>
          <p>本公司強烈建議旅客自行購買：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>旅遊平安保險</li>
            <li>醫療保險</li>
            <li>行程取消保險</li>
            <li>行李保險</li>
          </ul>
          <p>等相關保障。</p>

          <h3 className="font-serif text-lg mt-6">5.3 個人財物</h3>
          <p>旅遊期間請自行妥善保管個人財物、證件、現金及貴重物品。</p>
          <p>本公司對於任何遺失、遭竊、損壞或其他財物損失概不負責。</p>

          <h2 className="font-serif text-xl mt-10">6. 交通與搭乘規範</h2>
          <p>本公司將依實際參團人數安排適當車輛。</p>
          <p>如行程使用旅遊巴士、旅遊車或接駁車服務，旅客應遵守工作人員指示及現場秩序安排。</p>
          <p>座位安排原則上依實際抵達順序進行，旅客應依現場排隊秩序搭乘，以維持整體行程順暢進行。</p>
          <p>本公司保留調整車輛及座位安排之權利。</p>

          <h2 className="font-serif text-xl mt-10">7. 責任限制</h2>
          <p>本公司對於合作供應商所提供之服務，包括但不限於：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>航空公司</li>
            <li>飯店</li>
            <li>巴士公司</li>
            <li>郵輪公司</li>
            <li>景點營運單位</li>
            <li>活動供應商</li>
          </ul>
          <p>所造成之延誤、取消、意外事故、損失或其他問題，僅負合理協助處理之責任。</p>
          <p>除法律另有規定外，本公司不承擔任何間接、附帶或衍生性損害賠償責任。</p>

          <h2 className="font-serif text-xl mt-10">8. 智慧財產權</h2>
          <p>本網站所刊載之所有內容，包括但不限於：</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>文字內容</li>
            <li>圖片</li>
            <li>行程資訊</li>
            <li>設計版面</li>
            <li>商標</li>
            <li>Logo</li>
            <li>品牌識別</li>
          </ul>
          <p>均屬 Shooting Star Travel 或相關權利人所有。</p>
          <p>未經書面授權，不得複製、修改、散布、重製或作任何商業用途。</p>

          <h2 className="font-serif text-xl mt-10">9. 條款修改</h2>
          <p>本公司保留隨時修改、更新或補充本服務條款之權利。</p>
          <p>任何修訂內容將公告於本網站，並自公告日起立即生效。</p>
          <p>旅客於條款更新後持續使用本網站或相關服務，即視為同意接受修訂後之內容。</p>

          <h2 className="font-serif text-xl mt-10">10. 聯絡方式</h2>
          <p>如對本服務條款有任何疑問，請聯絡：</p>
          <p>Shooting Star Travel</p>
          <p>Email：<a href="mailto:info@shootingstartravel.com" className="underline text-primary hover:text-primary/80">info@shootingstartravel.com</a></p>
        </div>
      </section>
    </SiteLayout>
  );
}
