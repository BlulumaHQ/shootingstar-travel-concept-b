import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useLocale, type Locale } from "@/i18n/locale";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Shooting Star Travel" },
      { name: "description", content: "Shooting Star Travel terms of use: bookings, payment, cancellations, and liability." },
      { property: "og:title", content: "Terms of Use — Shooting Star Travel" },
      { property: "og:description", content: "Shooting Star Travel terms of use." },
    ],
  }),
  component: TermsPage,
});

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

type TermsCopy = {
  eyebrow: string;
  title: string;
  updated: string;
  blocks: Block[];
  contactLines: string[];
};

const TERMS: Record<Locale, TermsCopy> = {
  en: {
    eyebrow: "Terms of Use",
    title: "Terms of Use",
    updated: "Last updated: May 2026",
    blocks: [
      { type: "p", text: "Welcome to Shooting Star Travel (\u201cthe Company\u201d, \u201cwe\u201d, \u201cus\u201d). By browsing this website, booking a tour, submitting a reservation request, or completing payment, you confirm that you have read, understood, and agreed to the following terms and conditions." },

      { type: "h2", text: "1. Scope of Services" },
      { type: "p", text: "The Company provides curated small-group tours within Canada and surrounding regions, customized travel planning, travel consultation, and related services." },
      { type: "p", text: "All itineraries, prices, accommodation arrangements, transportation, and availability are subject to the final confirmation documents and official notice from the Company. The Company reserves the right to adjust content based on actual operational needs." },

      { type: "h2", text: "2. Booking and Payment" },
      { type: "h3", text: "2.1 Contract Formation" },
      { type: "p", text: "Full payment for tours is generally required no later than 30 days before the departure date." },
      { type: "p", text: "The travel contract is officially formed once payment has been confirmed by the Company." },
      { type: "p", text: "If payment is not completed within the specified period, the Company reserves the right to cancel the reservation and will not hold the spot." },
      { type: "h3", text: "2.2 Payment Methods" },
      { type: "p", text: "The Company accepts credit cards and other designated payment methods." },
      { type: "p", text: "All prices are quoted in Canadian Dollars (CAD) unless otherwise stated." },
      { type: "h3", text: "2.3 Credit Card Refund Fee" },
      { type: "p", text: "If a traveller pays by credit card and later requests a cancellation or refund for personal reasons, the Company will deduct the actual credit card processing fee of 4% from the refund amount." },

      { type: "h2", text: "3. Cancellations, Changes, and Refunds" },
      { type: "p", text: "To protect both parties, all cancellation or change requests must be submitted during our regular business hours:" },
      { type: "p", text: "Monday to Friday (excluding statutory holidays)." },
      { type: "p", text: "Requests submitted on weekends, holidays, or outside business hours will be officially received on the next business day." },
      { type: "p", text: "Refunds are calculated based on the number of days before departure:" },
      { type: "h3", text: "30 or more days before departure" },
      { type: "p", text: "50% of the total tour fee is refundable." },
      { type: "h3", text: "14 to 29 days before departure" },
      { type: "p", text: "30% of the total tour fee is refundable." },
      { type: "h3", text: "Within 13 days of departure (including departure day)" },
      { type: "p", text: "No refunds will be issued." },
      { type: "p", text: "If a specific tour page lists special cancellation rules, those rules will take precedence." },

      { type: "h2", text: "4. Itinerary Changes and Force Majeure" },
      { type: "h3", text: "4.1 Right to Adjust Itineraries" },
      { type: "p", text: "The Company reserves the right to adjust the itinerary, order, attractions, transportation, accommodation, or activity timing due to the following factors:" },
      { type: "ul", items: ["Local traffic conditions", "Weather", "Government announcements", "Safety considerations", "Unexpected events", "Other operational needs"] },
      { type: "p", text: "Adjustments may be made when necessary without prior notice." },
      { type: "h3", text: "4.2 Force Majeure" },
      { type: "p", text: "If the following force majeure events prevent travellers from joining a tour, or cause the tour to be cancelled, delayed, shortened, or changed:" },
      { type: "ul", items: ["Natural disasters", "Earthquakes", "Wildfires", "Floods", "Snowstorms", "Pandemics", "War", "Government orders", "Airline cancellations or delays", "Traffic accidents", "Other events beyond the Company\u2019s control"] },
      { type: "p", text: "The Company will not be liable for any resulting losses." },
      { type: "p", text: "Non-refundable costs, prepaid reservations, and related expenses that have already been incurred may still be charged in accordance with the original contract." },

      { type: "h2", text: "5. Traveller Responsibilities and Safety" },
      { type: "h3", text: "5.1 Documents and Eligibility" },
      { type: "p", text: "Travellers are responsible for confirming and holding:" },
      { type: "ul", items: ["A valid passport", "A visa (if applicable)", "Entry documents", "Other required travel documents"] },
      { type: "p", text: "Any loss caused by missing or invalid personal documents is the sole responsibility of the traveller." },
      { type: "h3", text: "5.2 Personal Health and Insurance" },
      { type: "p", text: "Travel activities may involve a certain level of risk." },
      { type: "p", text: "Travellers should assess whether they are physically fit to participate." },
      { type: "p", text: "The Company strongly recommends that travellers purchase:" },
      { type: "ul", items: ["Travel accident insurance", "Medical insurance", "Trip cancellation insurance", "Baggage insurance"] },
      { type: "p", text: "and other appropriate coverage." },
      { type: "h3", text: "5.3 Personal Belongings" },
      { type: "p", text: "Travellers are responsible for safeguarding their personal belongings, documents, cash, and valuables during the trip." },
      { type: "p", text: "The Company is not responsible for any loss, theft, damage, or other property losses." },

      { type: "h2", text: "6. Transportation and Seating" },
      { type: "p", text: "The Company will arrange suitable vehicles based on the actual group size." },
      { type: "p", text: "Travellers using tour buses, coaches, or shuttles must follow staff instructions and on-site arrangements." },
      { type: "p", text: "Seating generally follows arrival order; travellers should follow the queueing order on-site to keep the tour running smoothly." },
      { type: "p", text: "The Company reserves the right to adjust vehicles and seating arrangements." },

      { type: "h2", text: "7. Limitation of Liability" },
      { type: "p", text: "Regarding services provided by partner suppliers, including but not limited to:" },
      { type: "ul", items: ["Airlines", "Hotels", "Bus companies", "Cruise companies", "Attraction operators", "Activity providers"] },
      { type: "p", text: "The Company is only responsible for providing reasonable assistance in the event of delays, cancellations, accidents, losses, or other issues." },
      { type: "p", text: "Except as required by law, the Company is not liable for any indirect, incidental, or consequential damages." },

      { type: "h2", text: "8. Intellectual Property" },
      { type: "p", text: "All content published on this website, including but not limited to:" },
      { type: "ul", items: ["Text", "Images", "Itinerary information", "Layouts and design", "Trademarks", "Logos", "Brand identity"] },
      { type: "p", text: "is owned by Shooting Star Travel or the respective rights holders." },
      { type: "p", text: "No reproduction, modification, distribution, or commercial use is permitted without written authorization." },

      { type: "h2", text: "9. Changes to These Terms" },
      { type: "p", text: "The Company reserves the right to modify, update, or supplement these Terms at any time." },
      { type: "p", text: "Any revisions will be posted on this website and take effect immediately upon posting." },
      { type: "p", text: "Continued use of this website or services after updates constitutes acceptance of the revised Terms." },

      { type: "h2", text: "10. Contact" },
      { type: "p", text: "For any questions about these Terms, please contact:" },
    ],
    contactLines: ["Shooting Star Travel", "Email: info@shootingstartravel.ca"],
  },
  zh: {
    eyebrow: "Terms of Use",
    title: "服務條款",
    updated: "最後更新日期：2026 年 5 月",
    blocks: [
      { type: "p", text: "歡迎使用 Shooting Star Travel（以下簡稱「本公司」、「我們」）所提供之網站與旅遊服務。當您瀏覽本網站、預訂行程、提交預訂申請或完成付款時，即表示您已閱讀、理解並同意遵守以下條款與細則。" },
      { type: "h2", text: "1. 服務範圍" },
      { type: "p", text: "本公司提供加拿大境內及相關地區之精緻小團旅遊行程、客製化旅遊規劃、旅遊諮詢及相關服務。" },
      { type: "p", text: "所有行程內容、價格、住宿安排、交通方式及供應狀況均以最終確認文件及本公司正式通知為準。本公司保留因實際營運需求而調整內容之權利。" },
      { type: "h2", text: "2. 預訂與付款規定" },
      { type: "h3", text: "2.1 合約成立" },
      { type: "p", text: "本公司旅遊行程費用原則上須於出發日前 30 天完成全額付款。" },
      { type: "p", text: "待本公司確認款項入帳後，旅遊契約即正式成立。" },
      { type: "p", text: "若旅客未於指定期限內完成付款，本公司有權取消預訂並不保留旅遊名額。" },
      { type: "h3", text: "2.2 付款方式" },
      { type: "p", text: "本公司接受信用卡及其他指定付款方式。" },
      { type: "p", text: "所有價格均以加拿大幣（CAD）計價，除非另有說明。" },
      { type: "h3", text: "2.3 信用卡退款手續費" },
      { type: "p", text: "若旅客使用信用卡支付旅遊費用，並因個人因素申請取消或退款，本公司將於退款金額中扣除實際產生之信用卡刷卡手續費 4% 後辦理退款。" },
      { type: "h2", text: "3. 取消、變更與退款政策" },
      { type: "p", text: "為保障雙方權益，所有取消或變更申請必須於本公司正常營業時間內提出：" },
      { type: "p", text: "星期一至星期五（國定假日除外）" },
      { type: "p", text: "若旅客於週末、國定假日或非營業時間提出申請，將以下一個工作日作為正式受理日期。" },
      { type: "p", text: "退款比例依距離出發日之天數計算如下：" },
      { type: "h3", text: "出發日前 30 天（含）以上" },
      { type: "p", text: "可退還旅遊費用總額之 50%。" },
      { type: "h3", text: "出發日前 14 天（含）至 29 天" },
      { type: "p", text: "可退還旅遊費用總額之 30%。" },
      { type: "h3", text: "出發日前 13 天內（含出發當日）" },
      { type: "p", text: "恕不接受退款。" },
      { type: "p", text: "如行程頁面另有特別取消規定，則以該行程頁面公告內容為準。" },
      { type: "h2", text: "4. 行程變更與不可抗力因素" },
      { type: "h3", text: "4.1 行程調整權" },
      { type: "p", text: "本公司保留因下列因素調整行程內容、順序、景點、交通工具、住宿安排或活動時間之權利：" },
      { type: "ul", items: ["當地交通狀況", "天候因素", "政府公告", "安全考量", "臨時突發事件", "其他營運需求"] },
      { type: "p", text: "本公司得於必要時進行調整而不另行通知。" },
      { type: "h3", text: "4.2 不可抗力因素" },
      { type: "p", text: "若因下列不可抗力因素導致旅客無法參加行程、行程取消、延誤、縮減或變更：" },
      { type: "ul", items: ["天災", "地震", "森林火災", "洪水", "暴風雪", "疫情", "戰爭", "政府命令", "航空公司取消或延誤", "交通事故", "其他非本公司可控制因素"] },
      { type: "p", text: "本公司不承擔相關損失賠償責任。" },
      { type: "p", text: "已發生且無法退還之成本、預訂費用及相關支出仍可能依原契約收取。" },
      { type: "h2", text: "5. 旅客責任與安全須知" },
      { type: "h3", text: "5.1 證件與資格" },
      { type: "p", text: "旅客須自行確認並持有：" },
      { type: "ul", items: ["有效護照", "簽證（如適用）", "入境文件", "其他法定旅行文件"] },
      { type: "p", text: "因個人文件不足或失效而產生之損失概由旅客自行承擔。" },
      { type: "h3", text: "5.2 個人健康與保險" },
      { type: "p", text: "旅遊活動可能包含一定風險。" },
      { type: "p", text: "旅客應自行評估身體狀況是否適合參加行程。" },
      { type: "p", text: "本公司強烈建議旅客自行購買：" },
      { type: "ul", items: ["旅遊平安保險", "醫療保險", "行程取消保險", "行李保險"] },
      { type: "p", text: "等相關保障。" },
      { type: "h3", text: "5.3 個人財物" },
      { type: "p", text: "旅遊期間請自行妥善保管個人財物、證件、現金及貴重物品。" },
      { type: "p", text: "本公司對於任何遺失、遭竊、損壞或其他財物損失概不負責。" },
      { type: "h2", text: "6. 交通與搭乘規範" },
      { type: "p", text: "本公司將依實際參團人數安排適當車輛。" },
      { type: "p", text: "如行程使用旅遊巴士、旅遊車或接駁車服務，旅客應遵守工作人員指示及現場秩序安排。" },
      { type: "p", text: "座位安排原則上依實際抵達順序進行，旅客應依現場排隊秩序搭乘，以維持整體行程順暢進行。" },
      { type: "p", text: "本公司保留調整車輛及座位安排之權利。" },
      { type: "h2", text: "7. 責任限制" },
      { type: "p", text: "本公司對於合作供應商所提供之服務，包括但不限於：" },
      { type: "ul", items: ["航空公司", "飯店", "巴士公司", "郵輪公司", "景點營運單位", "活動供應商"] },
      { type: "p", text: "所造成之延誤、取消、意外事故、損失或其他問題，僅負合理協助處理之責任。" },
      { type: "p", text: "除法律另有規定外，本公司不承擔任何間接、附帶或衍生性損害賠償責任。" },
      { type: "h2", text: "8. 智慧財產權" },
      { type: "p", text: "本網站所刊載之所有內容，包括但不限於：" },
      { type: "ul", items: ["文字內容", "圖片", "行程資訊", "設計版面", "商標", "Logo", "品牌識別"] },
      { type: "p", text: "均屬 Shooting Star Travel 或相關權利人所有。" },
      { type: "p", text: "未經書面授權，不得複製、修改、散布、重製或作任何商業用途。" },
      { type: "h2", text: "9. 條款修改" },
      { type: "p", text: "本公司保留隨時修改、更新或補充本服務條款之權利。" },
      { type: "p", text: "任何修訂內容將公告於本網站，並自公告日起立即生效。" },
      { type: "p", text: "旅客於條款更新後持續使用本網站或相關服務，即視為同意接受修訂後之內容。" },
      { type: "h2", text: "10. 聯絡方式" },
      { type: "p", text: "如對本服務條款有任何疑問，請聯絡：" },
    ],
    contactLines: ["Shooting Star Travel", "Email：info@shootingstartravel.ca"],
  },
  ko: {
    eyebrow: "Terms of Use",
    title: "이용 약관",
    updated: "최종 업데이트: 2026년 5월",
    blocks: [
      { type: "p", text: "Shooting Star Travel(이하 \u201c당사\u201d)의 웹사이트 및 여행 서비스를 이용해 주셔서 감사합니다. 본 웹사이트를 이용하거나 투어를 예약, 신청, 결제하시는 경우 아래 약관을 읽고 이해하셨으며 이에 동의하신 것으로 간주됩니다." },
      { type: "h2", text: "1. 서비스 범위" },
      { type: "p", text: "당사는 캐나다 및 인근 지역의 프리미엄 소그룹 투어, 맞춤형 여행 기획, 여행 상담 및 관련 서비스를 제공합니다." },
      { type: "p", text: "모든 일정, 가격, 숙박, 교통 및 가용성은 최종 확정 문서 및 당사의 공식 안내에 따릅니다. 당사는 운영상의 필요에 따라 내용을 조정할 권리를 보유합니다." },
      { type: "h2", text: "2. 예약 및 결제" },
      { type: "h3", text: "2.1 계약 성립" },
      { type: "p", text: "투어 비용은 원칙적으로 출발일 30일 전까지 전액 결제하셔야 합니다." },
      { type: "p", text: "당사가 결제를 확인한 시점에 여행 계약이 정식으로 성립됩니다." },
      { type: "p", text: "지정된 기한 내에 결제가 완료되지 않을 경우, 당사는 예약을 취소할 권리가 있으며 자리는 보유되지 않습니다." },
      { type: "h3", text: "2.2 결제 수단" },
      { type: "p", text: "당사는 신용카드 및 지정된 기타 결제 수단을 받습니다." },
      { type: "p", text: "별도 명시가 없는 한 모든 금액은 캐나다 달러(CAD) 기준입니다." },
      { type: "h3", text: "2.3 신용카드 환불 수수료" },
      { type: "p", text: "신용카드로 결제하신 후 개인 사유로 취소 또는 환불을 요청하시는 경우, 환불 금액에서 실제 발생한 신용카드 처리 수수료 4%를 차감 후 환불해 드립니다." },
      { type: "h2", text: "3. 취소, 변경 및 환불 규정" },
      { type: "p", text: "양측의 권익 보호를 위해 모든 취소 및 변경 요청은 당사 정규 영업시간 내에 제출하셔야 합니다:" },
      { type: "p", text: "월요일 ~ 금요일 (공휴일 제외)" },
      { type: "p", text: "주말, 공휴일 또는 영업시간 외 접수된 요청은 다음 영업일을 정식 접수일로 처리합니다." },
      { type: "p", text: "환불 비율은 출발일까지 남은 일수에 따라 다음과 같이 계산됩니다:" },
      { type: "h3", text: "출발일 30일 이전" },
      { type: "p", text: "총 투어 비용의 50% 환불." },
      { type: "h3", text: "출발일 14~29일 전" },
      { type: "p", text: "총 투어 비용의 30% 환불." },
      { type: "h3", text: "출발일 13일 이내 (출발 당일 포함)" },
      { type: "p", text: "환불이 불가합니다." },
      { type: "p", text: "특정 투어 페이지에 별도의 취소 규정이 있는 경우, 해당 페이지의 안내가 우선합니다." },
      { type: "h2", text: "4. 일정 변경 및 불가항력" },
      { type: "h3", text: "4.1 일정 조정 권한" },
      { type: "p", text: "당사는 다음과 같은 사유로 일정 내용, 순서, 관광지, 교통 수단, 숙박 또는 활동 시간을 조정할 권리가 있습니다:" },
      { type: "ul", items: ["현지 교통 상황", "기상 조건", "정부 발표", "안전상의 이유", "돌발 상황", "기타 운영상의 필요"] },
      { type: "p", text: "필요시 별도 통지 없이 조정될 수 있습니다." },
      { type: "h3", text: "4.2 불가항력 사유" },
      { type: "p", text: "다음과 같은 불가항력 사유로 인해 여행자가 투어에 참여하지 못하거나 일정이 취소, 지연, 축소, 변경되는 경우:" },
      { type: "ul", items: ["자연재해", "지진", "산불", "홍수", "폭설", "전염병", "전쟁", "정부 명령", "항공사 결항 또는 지연", "교통사고", "기타 당사가 통제할 수 없는 사유"] },
      { type: "p", text: "당사는 이로 인한 손실에 대해 책임을 지지 않습니다." },
      { type: "p", text: "이미 발생했거나 환불 불가한 비용, 예약 및 관련 지출은 원 계약에 따라 청구될 수 있습니다." },
      { type: "h2", text: "5. 여행자 책임 및 안전" },
      { type: "h3", text: "5.1 서류 및 자격" },
      { type: "p", text: "여행자는 다음 사항을 직접 확인하고 소지해야 합니다:" },
      { type: "ul", items: ["유효한 여권", "비자(해당 시)", "입국 서류", "기타 법정 여행 서류"] },
      { type: "p", text: "개인 서류의 미비 또는 실효로 인한 손실은 전적으로 여행자 본인의 책임입니다." },
      { type: "h3", text: "5.2 개인 건강 및 보험" },
      { type: "p", text: "여행에는 일정한 위험이 따를 수 있습니다." },
      { type: "p", text: "여행자는 본인의 신체 상태가 일정에 적합한지 스스로 판단해야 합니다." },
      { type: "p", text: "당사는 다음과 같은 보험 가입을 강력히 권장합니다:" },
      { type: "ul", items: ["여행자 상해보험", "의료보험", "여행 취소 보험", "수하물 보험"] },
      { type: "p", text: "및 기타 관련 보장." },
      { type: "h3", text: "5.3 개인 소지품" },
      { type: "p", text: "여행 중 개인 소지품, 서류, 현금, 귀중품은 본인이 직접 안전하게 보관하셔야 합니다." },
      { type: "p", text: "당사는 분실, 도난, 파손 또는 기타 재산상의 손실에 대해 책임을 지지 않습니다." },
      { type: "h2", text: "6. 교통 및 탑승 규정" },
      { type: "p", text: "당사는 실제 참가 인원에 맞춰 적절한 차량을 배차합니다." },
      { type: "p", text: "투어 버스, 코치, 셔틀을 이용하는 경우 직원의 안내와 현장 질서에 따라 주십시오." },
      { type: "p", text: "좌석은 원칙적으로 도착 순서에 따라 배정되며, 원활한 진행을 위해 현장 대기 순서를 지켜 주십시오." },
      { type: "p", text: "당사는 차량 및 좌석 배치를 조정할 권리를 보유합니다." },
      { type: "h2", text: "7. 책임의 제한" },
      { type: "p", text: "협력 공급업체가 제공하는 서비스, 다음을 포함하되 이에 한정되지 않습니다:" },
      { type: "ul", items: ["항공사", "호텔", "버스 회사", "크루즈 회사", "관광지 운영업체", "액티비티 공급업체"] },
      { type: "p", text: "로 인한 지연, 취소, 사고, 손실 또는 기타 문제에 대해서는 합리적인 지원만을 책임집니다." },
      { type: "p", text: "법률에서 별도로 정한 경우를 제외하고, 당사는 간접적, 부수적, 결과적 손해에 대해 책임을 지지 않습니다." },
      { type: "h2", text: "8. 지적 재산권" },
      { type: "p", text: "본 웹사이트에 게재된 모든 콘텐츠, 다음을 포함하되 이에 한정되지 않습니다:" },
      { type: "ul", items: ["텍스트", "이미지", "여행 정보", "디자인 및 레이아웃", "상표", "로고", "브랜드 아이덴티티"] },
      { type: "p", text: "는 Shooting Star Travel 또는 관련 권리자의 소유입니다." },
      { type: "p", text: "서면 동의 없이 복제, 수정, 배포, 재제작 또는 상업적 사용은 금지됩니다." },
      { type: "h2", text: "9. 약관 변경" },
      { type: "p", text: "당사는 본 약관을 언제든지 수정, 업데이트 또는 보완할 권리를 보유합니다." },
      { type: "p", text: "변경 사항은 본 웹사이트에 게시되며, 게시 즉시 효력이 발생합니다." },
      { type: "p", text: "약관 변경 후에도 본 웹사이트 또는 관련 서비스를 계속 이용하시는 경우, 변경된 내용에 동의하신 것으로 간주됩니다." },
      { type: "h2", text: "10. 문의" },
      { type: "p", text: "본 약관에 대한 문의 사항은 아래로 연락 주십시오:" },
    ],
    contactLines: ["Shooting Star Travel", "Email: info@shootingstartravel.ca"],
  },
};

export function TermsPage() {
  const locale = useLocale();
  const t = TERMS[locale];
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
        <p className="font-marker text-primary/70 text-[13px] tracking-[0.3em] uppercase">{t.eyebrow}</p>
        <h1 className="font-serif text-3xl md:text-5xl mt-4 mb-10 leading-tight">{t.title}</h1>
        <div className="prose prose-neutral max-w-none text-ink/80 text-[15px] leading-[1.95]">
          <p className="text-ink/60 text-sm">{t.updated}</p>
          {t.blocks.map((b, i) => {
            if (b.type === "h2") return <h2 key={i} className="font-serif text-2xl md:text-3xl font-semibold mt-14 mb-4 text-ink">{b.text}</h2>;
            if (b.type === "h3") return <h3 key={i} className="font-serif text-xl md:text-2xl font-semibold mt-8 mb-3 text-ink">{b.text}</h3>;
            if (b.type === "ul") return (
              <ul key={i} className="list-disc pl-6 space-y-1">
                {b.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            );
            return <p key={i}>{b.text}</p>;
          })}
          {t.contactLines.map((line) =>
            line.startsWith("Email") ? (
              <p key={line}>
                {line.split(/info@shootingstartravel\.com/)[0]}
                <a href="mailto:info@shootingstartravel.ca" className="underline text-primary hover:text-primary/80">info@shootingstartravel.ca</a>
              </p>
            ) : (
              <p key={line}>{line}</p>
            )
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
