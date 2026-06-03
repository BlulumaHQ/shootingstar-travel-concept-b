import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { StarMark, DottedLine } from "@/components/site/BrandMarks";
import { hreflangLinks, useLocale, withLocale, type Locale } from "@/i18n/locale";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Shooting Star Travel" },
      { name: "description", content: "Frequently asked questions about Shooting Star Travel: booking, payment, itineraries, cancellations, language groups, and pre-trip preparation." },
      { property: "og:title", content: "FAQ — Shooting Star Travel" },
      { property: "og:description", content: "Booking, payment, itineraries, cancellations, language groups, and pre-trip preparation answered." },
    ],
    links: hreflangLinks("/faq", "en"),
  }),
  component: FaqPage,
});

type Group = { title: string; items: { q: string; a: string }[] };

const pack: Record<Locale, {
  eyebrow: string;
  heading: string;
  intro: string;
  notFound: string;
  contact: string;
  groups: Group[];
}> = {
  en: {
    eyebrow: "Frequently Asked",
    heading: "Frequently asked",
    intro: "The questions our travellers ask most before they set off.",
    notFound: "Couldn't find your question?",
    contact: "Contact Us →",
    groups: [
      {
        title: "Booking & Payment",
        items: [
          { q: "How do I book?", a: "Fill out the form on our Contact page or message us on WhatsApp, KakaoTalk or WeChat. A team member will reply within 24 hours." },
          { q: "Which payment methods do you accept?", a: "We accept credit card and other designated payment methods. All prices are quoted in Canadian Dollars (CAD) unless otherwise stated." },
          { q: "When is full payment due?", a: "Full payment is generally required at least 30 days before departure. The booking contract becomes effective once we confirm receipt of payment. If payment is not received by the deadline, we reserve the right to cancel the booking without holding your seat." },
          { q: "Is there a credit card refund fee?", a: "If you paid by credit card and request a cancellation or refund for personal reasons, we will deduct the actual 4% credit card processing fee from the refund amount." },
          { q: "When will I receive a confirmation?", a: "Usually within 24 hours by email; up to 48 hours during peak season." },
        ],
      },
      {
        title: "Itineraries",
        items: [
          { q: "How many travellers per group?", a: "We run small groups, typically 8–14, so every traveller has space to enjoy the experience." },
          { q: "Is accommodation included?", a: "Multi-day tours include selected accommodation — 3-star or above hotels or character mountain lodges." },
          { q: "Are meals included?", a: "Some tours include breakfast or signature meals; each tour page lists what's covered." },
          { q: "Can I customise an itinerary?", a: "Absolutely. Our private tours are designed for families, couples and groups of friends." },
        ],
      },
      {
        title: "Cancellation & Refunds",
        items: [
          { q: "What is the cancellation & refund policy?", a: "Refund amounts are calculated based on the number of days before departure: 30+ days before departure — 50% refund of the total tour fee; 14–29 days before departure — 30% refund; within 13 days of departure (including the departure day) — no refund. If a specific tour page lists different terms, those terms apply." },
          { q: "When are cancellation requests processed?", a: "Cancellation or change requests must be submitted during our regular business hours (Monday to Friday, excluding statutory holidays). Requests received on weekends, public holidays or outside business hours will be processed on the next business day." },
          { q: "What if weather or force majeure forces a change?", a: "We reserve the right to adjust itineraries, routes, attractions, transportation and accommodation due to weather, traffic, government notices, safety considerations or unexpected events. For force majeure events (storms, wildfires, floods, pandemics, government orders, airline cancellations, etc.) we are not liable for related losses, and any non-refundable supplier costs already incurred may still apply." },
          { q: "Can I transfer my seat to someone else?", a: "Yes — please share their contact details at least 7 days before departure so we can complete the transfer and insurance updates." },
        ],
      },
      {
        title: "Languages & Groups",
        items: [
          { q: "Which language groups are offered?", a: "We currently run English, Chinese and Korean groups. Private tours can be tailored to other languages." },
          { q: "Will the guide speak my language?", a: "Mandarin and Korean departures are led by native-speaking guides — communication is seamless." },
          { q: "Can different language groups travel together?", a: "Usually no, to preserve experience quality. Private tours can be arranged with mixed languages." },
        ],
      },
      {
        title: "Pre-trip Preparation",
        items: [
          { q: "What should I pack?", a: "Bring a warm jacket, comfortable waterproof shoes, sunscreen and moisturiser. Each tour page includes a detailed packing list." },
          { q: "Do I need travel insurance?", a: "Travel involves a certain level of risk. We strongly recommend purchasing travel, medical, trip cancellation and baggage insurance for full peace of mind. Travellers are responsible for valid passports, visas and entry documents." },
          { q: "Where is the meeting point?", a: "Most tours meet at a designated point in downtown Vancouver or Calgary. Private tours can offer hotel pickup." },
          { q: "Can I bring older family or children?", a: "Yes — our pace is gentle and suits children aged 6+ and active seniors." },
        ],
      },
    ],
  },
  zh: {
    eyebrow: "常見問題",
    heading: "常見問題",
    intro: "出發前，旅客最常問我們的問題。",
    notFound: "沒有找到你的問題嗎？",
    contact: "聯絡我們 →",
    groups: [
      {
        title: "預訂與付款",
        items: [
          { q: "如何報名？", a: "您可以透過聯絡我們頁面填寫表單，或直接以 WhatsApp、KakaoTalk、WeChat 與我們聯繫，將會有專人於 24 小時內回覆。" },
          { q: "接受哪些付款方式？", a: "本公司接受信用卡及其他指定付款方式。所有價格均以加拿大幣（CAD）計價，除非另有說明。" },
          { q: "何時須完成全額付款？", a: "本公司旅遊行程費用原則上須於出發日前 30 天完成全額付款。待本公司確認款項入帳後，旅遊契約即正式成立。若未於指定期限內完成付款，本公司有權取消預訂並不保留旅遊名額。" },
          { q: "信用卡退款是否會收取手續費？", a: "若您使用信用卡支付旅遊費用，並因個人因素申請取消或退款，本公司將於退款金額中扣除實際產生之信用卡刷卡手續費 4% 後辦理退款。" },
          { q: "多久會收到確認？", a: "通常 24 小時內以 Email 回覆；旺季最長可能 48 小時。" },
        ],
      },
      {
        title: "行程內容",
        items: [
          { q: "每團人數是多少？", a: "我們採小團出發，通常 8–14 人，讓每位旅人都有舒適空間。" },
          { q: "是否包含住宿？", a: "多日行程包含精選住宿，皆為 3 星以上飯店或特色山屋。" },
          { q: "是否包含餐食？", a: "部分行程包含早餐或特色餐食，請詳閱各行程頁面說明。" },
          { q: "可以客製行程嗎？", a: "可以。我們的包團行程適合家庭、情侶與好友團體量身規劃。" },
        ],
      },
      {
        title: "取消與退款",
        items: [
          { q: "取消與退款規定為何？", a: "退款比例依距離出發日之天數計算：出發日前 30 天（含）以上 — 可退還旅遊費用總額之 50%；出發日前 14 天（含）至 29 天 — 可退還 30%；出發日前 13 天內（含出發當日） — 恕不接受退款。若行程頁面另有特別規定，則以該行程頁面公告內容為準。" },
          { q: "什麼時候提出取消會被受理？", a: "所有取消或變更申請必須於本公司正常營業時間內提出（星期一至星期五，國定假日除外）。若於週末、國定假日或非營業時間提出申請，將以下一個工作日作為正式受理日期。" },
          { q: "因天候或不可抗力導致行程變動怎麼辦？", a: "本公司保留因天候、交通、政府公告、安全考量、臨時突發事件等因素調整行程內容、順序、景點、交通與住宿之權利。若因天災、森林火災、洪水、暴風雪、疫情、政府命令、航空公司取消等不可抗力因素導致行程變動或取消，本公司不承擔相關損失賠償責任，已發生且無法退還之成本仍可能依原契約收取。" },
          { q: "可以將名額轉讓給其他人嗎？", a: "可以，請於出發前 7 天提供新旅客的聯絡資料，以便辦理轉讓與保險更新。" },
        ],
      },
      {
        title: "語言與團體",
        items: [
          { q: "提供哪些語言團？", a: "目前提供英語、中文與韓語團。私人包團可依需求安排其他語言。" },
          { q: "導遊會說我的語言嗎？", a: "中文與韓語團由母語導遊帶領，溝通順暢無礙。" },
          { q: "不同語言的旅客會合併同團嗎？", a: "原則上不會，以維持旅遊品質。包團行程可彈性安排混合語言。" },
        ],
      },
      {
        title: "出發前準備",
        items: [
          { q: "需要準備什麼？", a: "建議攜帶保暖外套、舒適防水鞋、防曬與保濕用品。每個行程頁面皆附有詳細打包清單。" },
          { q: "需要保旅遊保險嗎？", a: "旅遊活動可能包含一定風險，本公司強烈建議旅客自行購買旅遊平安、醫療、行程取消與行李保險。旅客須自行確認並持有有效護照、簽證與入境文件。" },
          { q: "集合地點在哪裡？", a: "多數行程於溫哥華或卡加利市中心指定地點集合。包團行程可安排飯店接送。" },
          { q: "可以攜帶長輩或小孩嗎？", a: "可以，我們的節奏輕鬆，適合 6 歲以上兒童與健康長者。" },
        ],
      },
    ],
  },
  ko: {
    eyebrow: "자주 묻는 질문",
    heading: "자주 묻는 질문",
    intro: "여행자분들이 출발 전에 가장 많이 묻는 질문들입니다.",
    notFound: "원하는 답변을 찾지 못하셨나요?",
    contact: "문의하기 →",
    groups: [
      {
        title: "예약 및 결제",
        items: [
          { q: "예약은 어떻게 하나요?", a: "문의 페이지의 양식을 작성하시거나 WhatsApp, 카카오톡, WeChat으로 메시지를 보내주세요. 담당자가 24시간 이내에 답변드립니다." },
          { q: "어떤 결제 방법을 사용할 수 있나요?", a: "신용카드 및 기타 지정 결제 수단을 받습니다. 모든 가격은 별도 명시가 없는 한 캐나다 달러(CAD) 기준입니다." },
          { q: "전액 결제는 언제까지 해야 하나요?", a: "원칙적으로 출발일 30일 전까지 전액 결제가 완료되어야 합니다. 결제 확인 후 여행 계약이 정식으로 성립됩니다. 기한 내에 결제가 완료되지 않으면 예약은 취소될 수 있으며 좌석은 보장되지 않습니다." },
          { q: "신용카드 환불 수수료가 있나요?", a: "신용카드로 결제하신 후 개인 사정으로 취소 또는 환불을 요청하시는 경우, 실제 발생한 신용카드 처리 수수료 4%를 환불 금액에서 공제합니다." },
          { q: "확인은 언제 받을 수 있나요?", a: "보통 24시간 이내에 이메일로 답변드리며, 성수기에는 최대 48시간이 소요될 수 있습니다." },
        ],
      },
      {
        title: "여행 일정",
        items: [
          { q: "한 그룹당 인원은 몇 명인가요?", a: "보통 8–14명의 소그룹으로 운영되어 모든 여행자가 여유롭게 즐길 수 있습니다." },
          { q: "숙박이 포함되나요?", a: "다일정 투어는 엄선된 3성급 이상 호텔 또는 특색 있는 산장 숙박이 포함됩니다." },
          { q: "식사가 포함되나요?", a: "일부 투어는 조식 또는 시그니처 식사가 포함됩니다. 자세한 내용은 각 투어 페이지를 참고해 주세요." },
          { q: "일정을 맞춤으로 짤 수 있나요?", a: "가능합니다. 가족, 커플, 친구 그룹을 위한 프라이빗 투어를 맞춤 설계해 드립니다." },
        ],
      },
      {
        title: "취소 및 환불",
        items: [
          { q: "취소 및 환불 규정은 어떻게 되나요?", a: "환불 금액은 출발일까지 남은 일수에 따라 계산됩니다. 출발일 30일 이전 — 총 여행비의 50% 환불, 출발일 14–29일 전 — 30% 환불, 출발일 13일 이내(출발 당일 포함) — 환불 불가. 각 투어 페이지에 별도 취소 규정이 있는 경우 해당 페이지의 내용이 우선합니다." },
          { q: "취소 신청은 언제 처리되나요?", a: "모든 취소 및 변경 신청은 정상 영업시간(월요일–금요일, 공휴일 제외) 내에 접수되어야 합니다. 주말, 공휴일 또는 영업시간 외에 접수된 신청은 다음 영업일을 정식 접수일로 합니다." },
          { q: "날씨나 불가항력으로 인한 변경은 어떻게 되나요?", a: "당사는 날씨, 교통, 정부 공지, 안전상의 이유, 돌발 상황 등에 따라 일정, 순서, 관광지, 교통수단, 숙박을 조정할 권리가 있습니다. 천재지변, 산불, 홍수, 폭설, 전염병, 정부 명령, 항공편 취소 등 불가항력 사유로 일정이 변경 또는 취소되는 경우, 당사는 관련 손실에 대한 배상 책임을 지지 않으며, 이미 발생하여 환불 불가능한 비용은 그대로 청구될 수 있습니다." },
          { q: "다른 사람에게 자리를 양도할 수 있나요?", a: "가능합니다. 출발 최소 7일 전에 새로운 여행자의 연락처를 전달해 주시면 양도 및 보험 갱신을 진행해 드립니다." },
        ],
      },
      {
        title: "언어 및 그룹",
        items: [
          { q: "어떤 언어 그룹이 있나요?", a: "현재 영어, 중국어, 한국어 그룹을 운영하고 있습니다. 프라이빗 투어는 다른 언어로도 맞춤 운영이 가능합니다." },
          { q: "가이드가 제 언어를 구사하나요?", a: "한국어 및 중국어 출발 그룹은 원어민 가이드가 함께해 원활한 의사소통이 가능합니다." },
          { q: "다른 언어 그룹과 함께 여행할 수 있나요?", a: "여행의 질을 위해 보통은 합치지 않습니다. 프라이빗 투어는 혼합 언어로도 진행 가능합니다." },
        ],
      },
      {
        title: "출발 전 준비",
        items: [
          { q: "무엇을 챙겨야 하나요?", a: "따뜻한 자켓, 편안한 방수 신발, 자외선 차단제와 보습제를 챙겨주세요. 각 투어 페이지에 상세한 준비물 리스트가 안내되어 있습니다." },
          { q: "여행자 보험이 필요한가요?", a: "여행에는 일정한 위험이 따르므로 여행자, 의료, 여행 취소, 수하물 보험 가입을 강력히 권장합니다. 유효한 여권, 비자, 입국 서류는 여행자 본인의 책임입니다." },
          { q: "집합 장소는 어디인가요?", a: "대부분의 투어는 밴쿠버 또는 캘거리 시내의 지정된 장소에서 집합합니다. 프라이빗 투어는 호텔 픽업이 가능합니다." },
          { q: "어르신이나 어린이도 참여할 수 있나요?", a: "가능합니다. 여유로운 일정으로 6세 이상 어린이와 건강한 어르신께 적합합니다." },
        ],
      },
    ],
  },
};

export function FaqPage() {
  const locale = useLocale();
  const p = pack[locale];
  const contactHref = withLocale("/contact", locale);
  return (
    <SiteLayout>
      <section className="bg-cream">
        <div className="mx-auto max-w-[920px] px-6 md:px-10 pt-24 md:pt-36 pb-16 text-center">
          <div className="flex items-center justify-center gap-3 text-primary/75">
            <DottedLine length={28} className="text-primary/45" />
            <StarMark size={18} className="text-primary/65" />
            <span className="text-[11px] tracking-[0.4em] uppercase">{p.eyebrow}</span>
            <StarMark size={18} className="text-primary/65" />
            <DottedLine length={28} className="text-primary/45" />
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-7 tracking-[-0.015em] font-medium leading-[1.1]">{p.heading}</h1>
          <p className="mt-7 text-ink/60 leading-[2] text-[15px] max-w-xl mx-auto">
            {p.intro}
          </p>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40">
        <div className="mx-auto max-w-[920px] px-6 md:px-10 space-y-20">
          {p.groups.map((g) => (
            <div key={g.title}>
              <div className="flex items-baseline gap-4 mb-7">
                <span className="text-[11px] tracking-[0.4em] uppercase text-primary/70">{g.title}</span>
                <span className="h-px flex-1 bg-primary/20" />
              </div>
              <div className="space-y-1">
                {g.items.map((it, i) => (
                  <details
                    key={it.q}
                    open={i === 0}
                    className="group border-b border-primary/15 py-6 open:pb-7"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                      <span className="font-serif text-[16px] text-ink leading-snug">{it.q}</span>
                      <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                    </summary>
                    <p className="mt-4 text-ink/60 leading-[2] text-[14px]">{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-10">
            <p className="text-ink/60 text-[14px] mb-6">{p.notFound}</p>
            <Link to={contactHref as never} className="inline-flex rounded-full bg-primary text-primary-foreground px-8 py-3.5 text-[12.5px] tracking-[0.18em] uppercase hover:bg-primary/90 transition">
              {p.contact}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
