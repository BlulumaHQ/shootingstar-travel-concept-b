import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { TourGallery } from "@/components/site/TourGallery";
import { getTour, type Tour } from "@/data/tours";
import { useGetTour } from "@/data/useTours";
import { useLocale, withLocale, hreflangLinks, type Locale } from "@/i18n/locale";
import { formatPrice, isInternalDevNote, translateIncludedItem, translateNotIncludedItem } from "@/i18n/tourText";
import { useEffect, useState } from "react";
import { CredentialsSection } from "@/components/site/CredentialsSection";
import {
  LAKE_TOUR_TRIP_INFO,
  LAKE_TOUR_EXTRA_NOTES,
  isLakeTourSlug,
} from "@/content/lake-tour-trip-info";
import { getIcefieldsContent, type ProductId } from "@/content/icefields-i18n";

const SHUTTLE_SLUG_TO_PRODUCT: Record<string, ProductId> = {
  "banff-to-jasper-sightseeing-shuttle": "P1",
  "jasper-maligne-lake-spirit-island-day-tour": "P2A",
  "jasper-to-banff-express-shuttle": "P2B",
  "banff-to-jasper-express-shuttle": "P3A",
  "jasper-medicine-lake-maligne-lake-half-day-tour": "P3B",
  "icefields-parkway-southbound-sightseeing-shuttle": "P4",
};
const isShuttleSlug = (slug: string) => slug in SHUTTLE_SLUG_TO_PRODUCT;


const ROCKIES_KEYWORDS = ["banff", "rocky", "rockies", "jasper", "yoho", "louise", "moraine", "icefield", "canadian-rockies"];
const isRockies = (slug: string) => {
  const s = slug.toLowerCase();
  return ROCKIES_KEYWORDS.some((k) => s.includes(k));
};

type TermsSection = { title: string; intro?: string; items: { label?: string; text: string }[] };

const LABELS: Record<Locale, {
  allTours: string; duration: string; language: string; price: string;
  itineraryEyebrow: string; itinerary: string;
  pricingEyebrow: string; pricing: string; tourRate: string; gratuity: string;
  galleryEyebrow: string; gallery: string;
  included: string; notIncluded: string; optional: string;
  notesEyebrow: string; notes: string; faq: string;
  termsEyebrow: string; terms: string;
  termsSections: TermsSection[];
}> = {
  en: {
    allTours: "← All tours", duration: "Duration", language: "Language", price: "Price",
    itineraryEyebrow: "itinerary", itinerary: "Itinerary",
    pricingEyebrow: "pricing", pricing: "Pricing", tourRate: "Tour Rate", gratuity: "Suggested Guide Gratuity",
    galleryEyebrow: "gallery", gallery: "Trip gallery",
    included: "Included", notIncluded: "Not Included", optional: "Optional Experiences",
    notesEyebrow: "travel notes", notes: "Travel Notes", faq: "Frequently asked",
    termsEyebrow: "terms & conditions", terms: "Shooting Star Travel Booking Terms & Conditions",
    termsSections: [
      {
        title: "1. Booking & Payment",
        items: [
          { label: "Contract formation:", text: "Full payment for the tour is required no later than 30 days before the departure date. The booking contract is formally established once payment has been confirmed. If payment is not received by the deadline, we are unable to hold your reservation." },
          { label: "Transaction fees:", text: "If payment is made by credit card and the booking is later cancelled or refunded due to personal reasons, a 4% credit card processing fee will be deducted from the refund." },
        ],
      },
      {
        title: "2. Cancellation & Refund Policy",
        intro: "To protect both parties, cancellation or change requests must be submitted during our business hours (Monday to Friday, excluding public holidays). Requests received on weekends or public holidays will be processed on the next business day. Refunds are calculated based on the number of days before the departure date as follows:",
        items: [
          { label: "30 days or more before departure:", text: "50% of the total tour fee will be refunded." },
          { label: "14 days or more before departure:", text: "30% of the total tour fee will be refunded." },
          { label: "Within 13 days of departure (including the departure day):", text: "No refund will be issued." },
        ],
      },
      {
        title: "3. Liability Statement & Traveller Information",
        items: [
          { label: "Itinerary adjustments:", text: "We reserve the right to adjust the itinerary content or order due to local traffic, weather, or unforeseen circumstances, without prior notice." },
          { label: "Force majeure:", text: "In the event of natural disasters, flight delays or cancellations, or other force majeure events that prevent participation or shorten the itinerary, the original tour fee will still apply per the contract." },
          { label: "Safety & insurance:", text: "Travellers are responsible for safeguarding their own valuables and cash during the tour; we are not liable for loss or damage to personal belongings. Travel activities carry inherent risks — please assess your health condition and consider purchasing personal travel insurance." },
          { label: "Transport guidelines:", text: "Vehicles will be arranged based on the number of participants on the day. When boarding the tour vehicle, please queue in order of arrival to keep the itinerary running smoothly." },
        ],
      },
    ],
  },
  zh: {
    allTours: "← 所有行程", duration: "天數", language: "語言", price: "費用",
    itineraryEyebrow: "行程", itinerary: "行程安排",
    pricingEyebrow: "費用", pricing: "費用說明", tourRate: "行程費用", gratuity: "建議導遊小費",
    galleryEyebrow: "相簿", gallery: "旅程相簿",
    included: "費用包含", notIncluded: "費用不含", optional: "選購體驗",
    notesEyebrow: "旅行須知", notes: "旅行須知", faq: "常見問題",
    termsEyebrow: "預訂條款", terms: "Shooting Star Travel 旅遊預訂條款與細則",
    termsSections: [
      {
        title: "1. 預訂與付款規定",
        items: [
          { label: "合約成立：", text: "本公司旅遊行程費用原則上需於出發日前 30 天付清。待款項確認入帳後，旅遊合約即正式成立。若未於期限內完成繳費，本公司恕無法保留旅遊名額。" },
          { label: "交易手續費：", text: "若使用信用卡支付旅遊費用，因個人因素申請取消或辦理退款時，將扣除 4% 之信用卡刷卡手續費後進行退款。" },
        ],
      },
      {
        title: "2. 取消與退款政策",
        intro: "為確保雙方權益，申請取消或變更行程時，請務必於本公司上班時間（週一至週五，國定假日除外）提出申請。若於週末或國定假日提出，將以隔天第一個工作日作為受理申請日期。退款比例依據距離出發日之天數計算如下：",
        items: [
          { label: "出發日前 30 天（含）：", text: "退還旅遊費用總額之 50%。" },
          { label: "出發日前 14 天（含）：", text: "退還旅遊費用總額之 30%。" },
          { label: "出發日前 13 天內（含當日）：", text: "恕不接受退款。" },
        ],
      },
      {
        title: "3. 旅遊責任聲明與權益須知",
        items: [
          { label: "行程調整權：", text: "本公司保有依當地交通、氣候或臨時突發狀況，調整行程內容或順序之權利，恕不另行通知。" },
          { label: "不可抗力因素：", text: "若遇天災、航空器延誤或取消等不可抗力因素，導致無法參加行程或行程縮減，相關旅遊費用仍需按原訂契約收取。" },
          { label: "安全與保險：", text: "旅行期間，請旅客務必自行妥善保管貴重物品與現金，本公司對於個人財物遺失或損壞概不負責。旅遊活動具備一定風險，建議旅客自行評估健康狀況並自行加購個人旅遊平安保險。" },
          { label: "搭乘規範：", text: "行程車輛將依當日參加人數安排；若搭乘旅遊車，請依現場抵達順序排隊，以維持行程順暢。" },
        ],
      },
    ],
  },
  ko: {
    allTours: "← 전체 투어", duration: "기간", language: "언어", price: "요금",
    itineraryEyebrow: "일정", itinerary: "일정",
    pricingEyebrow: "요금", pricing: "요금 안내", tourRate: "투어 요금", gratuity: "권장 가이드 팁",
    galleryEyebrow: "갤러리", gallery: "투어 갤러리",
    included: "포함 사항", notIncluded: "불포함 사항", optional: "선택 옵션",
    notesEyebrow: "여행 안내", notes: "여행 안내", faq: "자주 묻는 질문",
    termsEyebrow: "예약 약관", terms: "Shooting Star Travel 여행 예약 약관 및 세부 규정",
    termsSections: [
      {
        title: "1. 예약 및 결제 규정",
        items: [
          { label: "계약 체결:", text: "본사 투어 요금은 원칙적으로 출발일 30일 전까지 완납해야 하며, 입금이 확인되면 여행 계약이 정식으로 체결됩니다. 기한 내에 결제가 완료되지 않을 경우 예약을 보장해 드릴 수 없습니다." },
          { label: "거래 수수료:", text: "신용카드로 결제한 경우, 개인 사유로 취소 또는 환불을 신청하시면 신용카드 결제 수수료 4%를 차감한 후 환불됩니다." },
        ],
      },
      {
        title: "2. 취소 및 환불 정책",
        intro: "양측의 권익 보호를 위해 취소 또는 일정 변경 신청은 반드시 본사 업무 시간(월~금, 공휴일 제외) 내에 제출해 주시기 바랍니다. 주말 또는 공휴일에 접수된 신청은 다음 첫 영업일을 접수일로 처리합니다. 환불 비율은 출발일까지의 일수에 따라 다음과 같이 계산됩니다:",
        items: [
          { label: "출발일 30일 전(포함):", text: "총 여행 요금의 50% 환불." },
          { label: "출발일 14일 전(포함):", text: "총 여행 요금의 30% 환불." },
          { label: "출발일 13일 이내(당일 포함):", text: "환불이 불가합니다." },
        ],
      },
      {
        title: "3. 여행 책임 안내 및 고객 권익",
        items: [
          { label: "일정 조정 권한:", text: "본사는 현지 교통, 기후 또는 돌발 상황에 따라 사전 통지 없이 일정 내용 또는 순서를 조정할 권리를 보유합니다." },
          { label: "불가항력적 요인:", text: "천재지변, 항공기 지연 또는 결항 등 불가항력적 사유로 인해 투어에 참여하지 못하거나 일정이 단축되는 경우에도 원 계약에 따른 요금이 청구됩니다." },
          { label: "안전 및 보험:", text: "여행 중 귀중품과 현금은 반드시 본인이 직접 보관해 주시기 바라며, 개인 물품의 분실 또는 손상에 대해 본사는 책임지지 않습니다. 여행 활동에는 일정한 위험이 따르므로 본인의 건강 상태를 확인하시고 개인 여행자 보험에 가입하실 것을 권장합니다." },
          { label: "탑승 안내:", text: "당일 참가 인원에 따라 차량이 배정되며, 투어 차량 탑승 시 도착 순서대로 줄을 서서 원활한 일정 진행에 협조해 주시기 바랍니다." },
        ],
      },
    ],
  },
};

export const Route = createFileRoute("/tours/$slug")({
  loader: async ({ params }) => {
    const { fetchTourBySlugByLocale } = await import("@/data/toursSource");
    const tour = await fetchTourBySlugByLocale("zh", params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ params, loaderData }) => {
    const t = loaderData?.tour;
    return {
      meta: [
        { title: `${t?.title ?? "Tour"} — Shooting Star Travel` },
        { name: "description", content: t?.intro ?? "" },
        { property: "og:title", content: t?.title ?? "" },
        { property: "og:description", content: t?.intro ?? "" },
        ...(t?.img ? [{ property: "og:image", content: t.img }] : []),
      ],
      links: hreflangLinks(`/tours/${params.slug}`, "en"),
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">Tour not found</h1>
        <Link to="/tours" className="mt-6 inline-flex text-primary underline underline-offset-4">Back to all tours</Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-ink/70">{error.message}</p>
      </section>
    </SiteLayout>
  ),
  component: TourDetailPage,
});

type RezdyPriceOption = {
  label: string;
  price: number;
  seatsUsed: number;
  minQuantity?: number;
  maxQuantity?: number;
  priceGroupType?: string;
};

type RezdySession = {
  id: string | null;
  startTimeLocal: string | null;
  endTimeLocal: string | null;
  allDay: boolean;
  seatsAvailable: number | null;
  priceOptions: RezdyPriceOption[];
};

type RezdyExtra = {
  id: string | null;
  name: string;
  description: string;
  price: number;
  extraPriceType: string;
  isOptional: boolean;
};

function formatSessionDate(startTimeLocal: string | null): string {
  if (!startTimeLocal) return "—";
  const [date, time] = startTimeLocal.replace("T", " ").split(" ");
  const d = new Date(`${date}T${(time ?? "00:00:00").slice(0, 8)}`);
  if (Number.isNaN(d.getTime())) return startTimeLocal;
  const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  if (!time || time.startsWith("00:00")) return dateStr;
  const timeStr = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${dateStr} · ${timeStr}`;
}

const BOOKING_I18N: Record<Locale, {
  eyebrow: string; bookTitle: string; contactBody: string; contactCta: string;
  from: string; chooseDate: string; liveAvail: string; loadingDates: string;
  loadErrFallback: string; noDates1: string; noDates2: string; noDates3: string;
  soldOut: string; seatsLeft: (n: number) => string; tickets: string;
  addOns: string;
  pickupLocation: string; pickupChoose: string; pickupMinutes: (n: number) => string;
  preferredLanguage: string;
  langEnglish: string; langMandarin: string; langKorean: string;
  total: (n: number) => string; firstName: string; lastName: string;
  email: string; phone: string; requestBooking: string;
  disclaimer: string; sending: string; submitting: string; received: string;
  thanks: string; thanksBody: string; another: string;
  groupHint: string; selectGroup: string; wrongGroup: string; perPerson: (price: string) => string;
  groupOf: (n: number) => string; groupRange: (min: number, max: number) => string;
}> = {

  en: {
    eyebrow: "— booking", bookTitle: "Book this tour",
    contactBody: "To arrange a date for this tour, please get in touch with our team.",
    contactCta: "Contact us to book →",
    from: "from", chooseDate: "Choose a date", liveAvail: "· live availability",
    loadingDates: "Loading available dates…",
    loadErrFallback: "Unable to load availability. Please try again later.",
    noDates1: "No scheduled dates yet — please ", noDates2: "contact us", noDates3: " to arrange a date.",
    soldOut: "Sold out", seatsLeft: (n) => `${n} seats left`,
    tickets: "Tickets",
    addOns: "Optional add-ons",
    pickupLocation: "Pickup location", pickupChoose: "Select a pickup location", pickupMinutes: (n) => `${n} min before departure`,
    preferredLanguage: "Preferred language",

    langEnglish: "English", langMandarin: "Mandarin", langKorean: "Korean",
    total: (n) => `Total (${n})`,
    firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone",
    requestBooking: "Book Now →",
    disclaimer: "* Confirms your booking instantly. Payment will be processed securely.",
    sending: "— processing booking", submitting: "Confirming your booking…",
    received: "— booking confirmed", thanks: "Thank you! ✦",
    thanksBody: "Your booking has been confirmed — a confirmation email is on its way.",
    another: "Make another booking",
    groupHint: "Select one group size only. Pricing is based on shared room occupancy.",
    selectGroup: "Please select your group size",
    wrongGroup: "Please choose the correct group size for your party",
    perPerson: (price) => `$${price} CAD per person`,
    groupOf: (n) => `Group of ${n}`,
    groupRange: (min, max) => `Group size ${min}–${max}`,
  },
  zh: {
    eyebrow: "— 預訂", bookTitle: "預訂此行程",
    contactBody: "請與我們的團隊聯繫，以安排您的出發日期。",
    contactCta: "聯絡我們預訂 →",
    from: "起價", chooseDate: "選擇日期", liveAvail: "· 即時可訂",
    loadingDates: "正在載入可訂日期…",
    loadErrFallback: "目前無法載入可訂日期，請稍後再試。",
    noDates1: "目前尚無預定日期 — 請", noDates2: "聯絡我們", noDates3: "安排日期。",
    soldOut: "已售完", seatsLeft: (n) => `剩餘 ${n} 個名額`,
    tickets: "票種",
    addOns: "選購加購",
    pickupLocation: "上車地點", pickupChoose: "請選擇上車地點", pickupMinutes: (n) => `出發前 ${n} 分鐘`,
    preferredLanguage: "語言偏好",

    langEnglish: "英文", langMandarin: "中文", langKorean: "韓文",
    total: (n) => `總計（${n}）`,
    firstName: "名字", lastName: "姓氏", email: "電子郵件", phone: "電話",
    requestBooking: "確認預訂 →",
    disclaimer: "* 將立即完成預訂，並以安全方式處理付款。",
    sending: "— 處理中", submitting: "正在確認您的預訂…",
    received: "— 預訂成功", thanks: "感謝您！✦",
    thanksBody: "您的預訂已成功，確認信件即將寄出。",
    another: "再預訂一筆",
    groupHint: "僅能選擇一種人數組合，價格依共用房間人數計算。",
    selectGroup: "請選擇您的人數組合",
    wrongGroup: "請選擇符合您人數的正確組合",
    perPerson: (price) => `每人 $${price} CAD`,
    groupOf: (n) => `${n}人成行`,
    groupRange: (min, max) => `${min}–${max}人`,
  },
  ko: {
    eyebrow: "— 예약", bookTitle: "이 투어 예약하기",
    contactBody: "투어 일정을 잡으시려면 저희 팀으로 문의해 주세요.",
    contactCta: "예약 문의하기 →",
    from: "최저가", chooseDate: "날짜 선택", liveAvail: "· 실시간 예약 가능",
    loadingDates: "예약 가능 날짜를 불러오는 중…",
    loadErrFallback: "예약 가능 날짜를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.",
    noDates1: "아직 일정이 등록되지 않았습니다 — ", noDates2: "문의해 주시면", noDates3: " 날짜를 안내해 드립니다.",
    soldOut: "매진", seatsLeft: (n) => `${n}석 남음`,
    tickets: "티켓",
    addOns: "선택 옵션",
    pickupLocation: "픽업 장소", pickupChoose: "픽업 장소를 선택하세요", pickupMinutes: (n) => `출발 ${n}분 전`,
    preferredLanguage: "선호 언어",

    langEnglish: "영어", langMandarin: "중국어", langKorean: "한국어",
    total: (n) => `합계 (${n})`,
    firstName: "이름", lastName: "성", email: "이메일", phone: "전화번호",
    requestBooking: "지금 예약 →",
    disclaimer: "* 즉시 예약이 확정되며 결제는 안전하게 처리됩니다.",
    sending: "— 처리 중", submitting: "예약을 확정하는 중입니다…",
    received: "— 예약 완료", thanks: "감사합니다! ✦",
    thanksBody: "예약이 완료되었습니다. 확인 이메일이 곧 발송됩니다.",
    another: "다른 예약 만들기",
    groupHint: "인원 구성은 하나만 선택하세요. 가격은 객실 공유 인원 기준입니다.",
    selectGroup: "그룹 인원을 선택해 주세요",
    wrongGroup: "일행 인원에 맞는 그룹을 선택해 주세요",
    perPerson: (price) => `1인당 $${price} CAD`,
    groupOf: (n) => `${n}인`,
    groupRange: (min, max) => `${min}–${max}인`,
  },
};

function translatePriceLabel(label: string, locale: Locale): string {
  if (locale === "en") return label;
  const t = label.trim();
  const groupNum =
    t.match(/group of\s*(\d+)/i)?.[1] ??
    t.match(/\(\s*(\d+)\s*(?:people|persons|pax)\s*\)/i)?.[1] ??
    null;
  if (groupNum) {
    return locale === "zh"
      ? `每人（${groupNum}人成行）`
      : `${groupNum}인 그룹 (1인당)`;
  }
  const low = t.toLowerCase();
  const ZH: Record<string, string> = {
    "per person": "每人", adult: "成人", child: "兒童",
    solo: "單人", "solo (1 person)": "單人",
  };
  const KO: Record<string, string> = {
    "per person": "1인당", adult: "성인", child: "어린이",
    solo: "1인", "solo (1 person)": "1인",
  };
  const map = locale === "zh" ? ZH : KO;
  return map[low] ?? label;
}

function isGroupBand(p: RezdyPriceOption): boolean {
  return (
    typeof p.maxQuantity === "number" &&
    p.maxQuantity > 0 &&
    (p.minQuantity ?? 0) >= 1
  );
}

function formatGroupBandLabel(
  min: number,
  max: number,
  locale: Locale,
  B: (typeof BOOKING_I18N)[Locale],
): string {
  return min === max ? B.groupOf(min) : B.groupRange(min, max);
}



export function BookingWidget({ tour, idPrefix = "" }: { tour: ReturnType<typeof getTour>; idPrefix?: string }) {
  const productCode = (tour as Tour | undefined)?.rezdyProductCode ?? null;
  const locale = useLocale();
  const B = BOOKING_I18N[locale];
  const contactHref = withLocale("/contact", locale);

  // No Rezdy product code → contact-only CTA, no booking UI
  if (!productCode) {
    return (
      <div className="rounded-2xl bg-cream p-6 border-2 border-accent/40 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.45)] space-y-4">
        <div>
          <p className="font-marker text-primary/80 text-[12px] tracking-[0.25em] uppercase">{B.eyebrow}</p>
          <h3 className="font-serif text-xl text-ink mt-1 font-semibold">{B.bookTitle}</h3>
        </div>
        <p className="text-[13.5px] text-ink/70 leading-[1.85]">{B.contactBody}</p>
        <Link
          to={contactHref as never}
          id={`${idPrefix}contact-cta`}
          className="block w-full text-center rounded-full bg-primary text-primary-foreground py-3 text-[14.5px] tracking-wide hover:bg-primary/90 transition shadow-[0_10px_24px_-12px_oklch(0.585_0.04_155/0.7)]"
        >
          {B.contactCta}
        </Link>
      </div>
    );
  }


  const [sessions, setSessions] = useState<RezdySession[] | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [extras, setExtras] = useState<RezdyExtra[]>([]);
  const [extraQty, setExtraQty] = useState<Record<string, number>>({});
  const [pickupId, setPickupId] = useState<string | null>(null);
  type PickupOption = { locationName: string; address: string; minutesPrior: number | null };
  const [pickups, setPickups] = useState<PickupOption[]>([]);
  const [pickupLocation, setPickupLocation] = useState<string>("");


  const defaultLang =
    locale === "zh" ? "Mandarin" : locale === "ko" ? "Korean" : "English";
  const [preferredLanguage, setPreferredLanguage] = useState<string>(defaultLang);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [stage, setStage] = useState<"form" | "loading" | "done">("form");
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetch(`/api/rezdy/availability?productCode=${encodeURIComponent(productCode)}`)
      .then(async (r) => {
        const json = (await r.json()) as
          | { success: true; sessions: RezdySession[] }
          | { success: false; message: string };
        if (cancelled) return;
        if (!("success" in json) || json.success === false) {
          setLoadError(("message" in json && json.message) || "Unable to load availability.");
          setStatus("error");
          return;
        }
        const usable = (json.sessions ?? []).filter((s) => s.id && s.startTimeLocal);
        setSessions(usable);
        setStatus("ready");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setLoadError(e instanceof Error ? e.message : "Network error");
        setStatus("error");
      });

    fetch(`/api/rezdy/product?productCode=${encodeURIComponent(productCode)}`)
      .then(async (r) => {
        const json = (await r.json()) as
          | { success: true; extras: RezdyExtra[]; pickupId: string | null; pickups?: PickupOption[] }
          | { success: false; message: string };
        if (cancelled) return;
        if ("success" in json && json.success) {
          setExtras(json.extras ?? []);
          setPickupId(json.pickupId ?? null);
          setPickups(json.pickups ?? []);
        }

      })
      .catch(() => {
        /* extras are optional */
      });

    return () => {
      cancelled = true;
    };
  }, [productCode]);

  const selectedSession = sessions?.find((s) => s.id === selectedId) ?? null;

  // Reset quantities when session changes
  useEffect(() => {
    if (!selectedSession) {
      setQuantities({});
      return;
    }
    const init: Record<string, number> = {};
    selectedSession.priceOptions.forEach((p, i) => {
      init[`${p.label}__${i}`] = i === 0 ? 1 : 0;
    });
    setQuantities(init);
  }, [selectedId]);

  const totalQty = Object.values(quantities).reduce((a, b) => a + b, 0);
  const ticketsPrice = selectedSession
    ? selectedSession.priceOptions.reduce((sum, p, i) => {
        const q = quantities[`${p.label}__${i}`] ?? 0;
        return sum + p.price * q;
      }, 0)
    : 0;
  const extrasPrice = extras.reduce((sum, x, i) => {
    const q = extraQty[`${x.name}__${i}`] ?? 0;
    return sum + x.price * q;
  }, 0);
  const totalPrice = ticketsPrice + extrasPrice;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession || !selectedSession.startTimeLocal || totalQty < 1) return;
    setBookingError(null);
    setStage("loading");
    try {
      const items = selectedSession.priceOptions
        .map((p, i) => ({ label: p.label, quantity: quantities[`${p.label}__${i}`] ?? 0 }))
        .filter((it) => it.quantity > 0);

      const extrasPayload = extras
        .map((x, i) => ({
          name: x.name,
          quantity: extraQty[`${x.name}__${i}`] ?? 0,
          price: x.price,
        }))
        .filter((x) => x.quantity > 0);

      const res = await fetch("/api/rezdy/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productCode,
          startTimeLocal: selectedSession.startTimeLocal,
          items,
          extras: extrasPayload,
          preferredLanguage,
          pickupId,
          pickupLocationName: pickupLocation || null,

          customer: { firstName, lastName, email, phone },
        }),
      });
      const json = (await res.json()) as
        | { success: true }
        | { success: false; message: string };
      if (!("success" in json) || !json.success) {
        setBookingError(("message" in json && json.message) || "Booking failed.");
        setStage("form");
        return;
      }
      setStage("done");
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Network error");
      setStage("form");
    }
  };

  if (stage === "loading") {
    return (
      <div className="rounded-2xl bg-cream p-10 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)] text-center">
        <div className="mx-auto h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <p className="mt-5 font-marker text-primary text-[13px] tracking-[0.25em] uppercase">{B.sending}</p>
        <p className="mt-2 text-ink/65 text-[14px]">{B.submitting}</p>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="rounded-2xl bg-cream p-7 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)]">
        <p className="font-marker text-primary text-[13px] tracking-[0.25em] uppercase">{B.received}</p>
        <h3 className="font-serif text-2xl text-ink mt-3 font-semibold">{B.thanks}</h3>
        <p className="mt-5 text-ink/75 leading-[2] text-[13.5px]">{B.thanksBody}</p>
        <button
          onClick={() => setStage("form")}
          className="mt-5 text-primary text-sm underline underline-offset-4"
        >
          {B.another}
        </button>
      </div>
    );
  }


  const continueDisabled =
    status !== "ready" || !selectedSession || totalQty < 1 || !firstName || !lastName || !email || !phone || (pickups.length > 0 && !pickupLocation);


  return (
    <form
      id={`${idPrefix}booking-form`}
      onSubmit={submit}
      className="rounded-2xl bg-cream p-6 border-2 border-accent/40 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.45)] space-y-5"
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <p className="font-marker text-primary/80 text-[12px] tracking-[0.25em] uppercase">{B.eyebrow}</p>
          <h3 className="font-serif text-xl text-ink mt-1 font-semibold">{B.bookTitle}</h3>
        </div>
        <span className="text-[11px] text-ink/55">
          {B.from} <span className="text-primary font-serif text-[15px] font-semibold">{formatPrice(tour?.price, locale)}</span>
        </span>
      </div>

      {/* Date selector */}
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">
          {B.chooseDate}
          {status === "ready" && <span className="ml-2 text-[10px] text-primary/70 normal-case tracking-normal">{B.liveAvail}</span>}
        </label>

        {status === "loading" && <p className="text-[12px] text-ink/55">{B.loadingDates}</p>}
        {status === "error" && (
          <p className="text-[12px] text-red-600">{loadError ?? B.loadErrFallback}</p>
        )}
        {status === "ready" && sessions && sessions.length === 0 && (
          <p className="text-[12.5px] text-ink/65 leading-[1.85]">
            {B.noDates1}
            <Link to={contactHref as never} className="text-primary underline underline-offset-4">
              {B.noDates2}
            </Link>
            {B.noDates3}
          </p>
        )}
        {status === "ready" && sessions && sessions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto">
            {sessions.map((s) => {
              const isSel = s.id === selectedId;
              const soldOut = (s.seatsAvailable ?? 0) <= 0;
              return (
                <button
                  type="button"
                  key={s.id}
                  disabled={soldOut}
                  onClick={() => setSelectedId(s.id)}
                  className={`rounded-full px-3 py-1.5 text-[12px] border transition ${
                    isSel
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-ink/70 hover:border-primary/50"
                  } ${soldOut ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                  title={soldOut ? B.soldOut : B.seatsLeft(s.seatsAvailable ?? 0)}
                >
                  {formatSessionDate(s.startTimeLocal)}
                  {typeof s.seatsAvailable === "number" && !soldOut && (
                    <span className="ml-1.5 text-[10px] opacity-70">({s.seatsAvailable})</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price options + quantity steppers */}
      {selectedSession && selectedSession.priceOptions.length > 0 && (
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">{B.tickets}</label>
          <div className="space-y-2">
            {selectedSession.priceOptions.map((p, i) => {
              const key = `${p.label}__${i}`;
              const q = quantities[key] ?? 0;
              return (
                <div key={key} className="flex items-center justify-between rounded-md border border-border bg-cream px-3 py-2">
                  <div>
                    <p className="text-[13.5px] text-ink font-medium">{translatePriceLabel(p.label, locale)}</p>
                    <p className="text-[11.5px] text-ink/60">${p.price.toFixed(2)} CAD</p>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantities((qs) => ({ ...qs, [key]: Math.max(0, (qs[key] ?? 0) - 1) }))}
                      className="px-3 py-1.5 text-ink/70"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{q}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantities((qs) => {
                          const next = (qs[key] ?? 0) + 1;
                          const others = Object.entries(qs).reduce(
                            (sum, [k, v]) => (k === key ? sum : sum + v),
                            0,
                          );
                          const max = selectedSession.seatsAvailable ?? Infinity;
                          if (others + next > max) return qs;
                          return { ...qs, [key]: next };
                        })
                      }
                      className="px-3 py-1.5 text-ink/70"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {totalQty > 0 && (
            <div className="mt-3 rounded-xl bg-[var(--sand)] p-3 text-[13px] text-ink/80 flex justify-between font-serif">
              <span>{B.total(totalQty)}</span>
              <span className="font-semibold text-ink">${totalPrice.toFixed(2)} CAD</span>
            </div>
          )}
        </div>
      )}

      {/* Optional add-ons (Rezdy extras) */}
      {extras.length > 0 && (
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">{B.addOns}</label>
          <div className="space-y-2">
            {extras.map((x, i) => {
              const key = `${x.name}__${i}`;
              const q = extraQty[key] ?? 0;
              return (
                <div key={key} className="flex items-center justify-between rounded-md border border-border bg-cream px-3 py-2">
                  <div className="pr-3 min-w-0">
                    <p className="text-[13.5px] text-ink font-medium truncate">{x.name}</p>
                    <p className="text-[11.5px] text-ink/60">${x.price.toFixed(2)} CAD</p>
                  </div>
                  <div className="inline-flex items-center rounded-full border border-border shrink-0">
                    <button
                      type="button"
                      onClick={() => setExtraQty((qs) => ({ ...qs, [key]: Math.max(0, (qs[key] ?? 0) - 1) }))}
                      className="px-3 py-1.5 text-ink/70"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{q}</span>
                    <button
                      type="button"
                      onClick={() => setExtraQty((qs) => ({ ...qs, [key]: (qs[key] ?? 0) + 1 }))}
                      className="px-3 py-1.5 text-ink/70"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pickup location (only when Rezdy returns pickups for this product) */}
      {pickups.length > 0 && (
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">{B.pickupLocation}</label>
          <select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm"
          >
            <option value="">{B.pickupChoose}</option>
            {pickups.map((p) => (
              <option key={p.locationName} value={p.locationName}>
                {p.locationName}
                {p.minutesPrior != null ? ` · ${B.pickupMinutes(p.minutesPrior)}` : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Preferred language (Rezdy required) */}

      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">{B.preferredLanguage}</label>
        <select
          required
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm"
        >
          <option value="English">{B.langEnglish}</option>
          <option value="Mandarin">{B.langMandarin}</option>
          <option value="Korean">{B.langKorean}</option>
        </select>
      </div>

      {/* Customer form */}
      <div className="space-y-2.5 pt-1">
        <div className="grid grid-cols-2 gap-2.5">
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={B.firstName}
            className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm"
          />
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={B.lastName}
            className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm"
          />
        </div>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={B.email}
          className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm"
        />
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={B.phone}
          className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm"
        />
      </div>

      {bookingError && (
        <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-[12.5px] text-red-700">
          {bookingError}
        </div>
      )}

      <button
        type="submit"
        disabled={continueDisabled}
        className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14.5px] tracking-wide hover:bg-primary/90 transition shadow-[0_10px_24px_-12px_oklch(0.585_0.04_155/0.7)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {B.requestBooking}
      </button>
      <p className="text-[10.5px] text-ink/45 text-center">{B.disclaimer}</p>
    </form>
  );
}

export function TourDetailPage() {
  const params = useParams({ strict: false }) as { slug?: string };
  const slug = params.slug ?? "";
  const getLocalizedTour = useGetTour();
  const locale = useLocale();
  const tour = getLocalizedTour(slug) as Tour | undefined;

  if (!tour) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-serif text-3xl text-ink">Tour not found</h1>
          <Link to={withLocale("/tours", locale) as never} className="mt-6 inline-flex text-primary underline underline-offset-4">Back to all tours</Link>
        </section>
      </SiteLayout>
    );
  }

  const toursHref = withLocale("/tours", locale);
  const T = LABELS[locale];


  return (
    <SiteLayout>
      {/* Compact hero band */}
      <section className="relative bg-cream">
        <div className="relative h-[34vh] md:h-[42vh] min-h-[240px] max-h-[420px] overflow-hidden">
          <img src={tour.img} alt={tour.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-cream" />
        </div>
      </section>

      {/* Main two-column layout */}
      <div className="mx-auto max-w-[1240px] px-5 md:px-10 -mt-10 md:-mt-16 relative pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT — content (~65%) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Title block */}
            <header className="bg-cream rounded-[8px] p-7 md:p-9 border border-border/60 shadow-[0_30px_60px_-30px_rgba(60,80,70,0.35)]">
              <Link to={toursHref as never} className="text-[12px] text-ink/60 tracking-[0.2em] uppercase hover:text-primary">{T.allTours}</Link>
              <h1 className="tour-title font-serif text-3xl md:text-[42px] text-ink mt-3 font-semibold leading-[1.2]">{tour.title}</h1>
              <p className="mt-4 text-ink/70 leading-[1.95] text-[15px]">{tour.intro}</p>
              <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[13px]">
                <div><span className="text-ink/50">{T.duration} </span><span className="text-ink">{tour.duration}</span></div>
                <div><span className="text-ink/50">{T.price} </span><span className="text-primary font-semibold">{formatPrice(tour.price, locale)}</span></div>
              </div>
              {tour.language && (
                <div className="mt-4 rounded-[4px] bg-[var(--sand)]/60 px-4 py-3 border-l-2 border-primary/40">
                  <p className="text-[10.5px] tracking-[0.3em] uppercase text-ink/55 mb-1.5">{T.language}</p>
                  <p className="text-[13px] text-ink/75 leading-[1.85]">{tour.language}</p>
                </div>
              )}
              {tour.pickup && (
                <p className="mt-4 text-[13px] text-ink/70 leading-[1.85] border-l-2 border-primary/40 pl-3">{tour.pickup}</p>
              )}
            </header>

            {/* Mobile booking panel */}
            <div className="lg:hidden">
              <BookingWidget tour={tour} idPrefix="m-" />
            </div>

            {/* Shared Trip Information — only on the five Rocky Mountain Lake tours */}
            {isLakeTourSlug(slug) && <LakeTourTripInfo locale={locale} slug={slug} />}


            {/* ITINERARY */}
            <section>
              <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.itineraryEyebrow}</p>
              <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.itinerary}</h2>
              <ol className="mt-7 relative border-l border-primary/30 pl-6 space-y-7">
                {tour.itinerary.map((it, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">●</span>
                    <p className="font-marker text-primary text-sm tracking-[0.2em] uppercase">{it.stop}</p>
                    <h3 className="font-serif text-lg text-ink mt-1 font-semibold">{it.title}</h3>
                    <p className="mt-2 text-ink/65 leading-[1.95] text-[14px]">{it.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* PRICING */}
            <section>
              <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.pricingEyebrow}</p>
              <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.pricing}</h2>
              {tour.roomOptions && tour.roomOptions.length > 0 ? (
                <>
                  <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    {tour.roomOptions.map((r) => (
                      <div key={r.label} className="rounded-[6px] border border-border/70 bg-cream p-5">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{r.guests}</p>
                        <h4 className="font-serif text-[16px] text-ink mt-1 font-semibold leading-snug">{r.label}</h4>
                        <p className="mt-3 font-serif text-primary text-[17px] font-semibold">{formatPrice(r.price, locale)}</p>
                      </div>
                    ))}
                  </div>
                  {tour.roomNote && (
                    <p className="mt-4 text-[13px] text-ink/65 leading-[1.95] italic">{tour.roomNote}</p>
                  )}
                </>
              ) : (
                <div className="mt-6 rounded-[6px] border border-border/70 bg-cream p-5">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{T.tourRate}</p>
                  <p className="mt-1 font-serif text-primary text-[20px] font-semibold">{formatPrice(tour.price, locale)}</p>
                </div>
              )}
              {tour.gratuity && (
                <p className="mt-4 text-[13px] text-ink/70">
                  <span className="text-ink/55">{T.gratuity}: </span>
                  <span className="text-ink">{tour.gratuity}</span>
                </p>
              )}
            </section>

            {tour.gallery && tour.gallery.length > 0 && (
              <section>
                <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.galleryEyebrow}</p>
                <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.gallery}</h2>
                <div className="mt-7">
                  <TourGallery images={tour.gallery} title={tour.title} />
                </div>
              </section>
            )}

            <section className="grid md:grid-cols-3 gap-8">
              {[
                { t: T.included, items: tour.included, kind: "included" as const },
                { t: T.notIncluded, items: tour.notIncluded ?? [], kind: "notIncluded" as const },
                { t: T.optional, items: tour.optional ?? [], kind: "optional" as const },
              ].filter((b) => b.items.length > 0).map((b) => (
                <div key={b.t}>
                  <h3 className="font-serif text-lg text-ink font-semibold">{b.t}</h3>
                  <div className="mt-3 h-px w-8 bg-primary/40" />
                  <ul className="mt-4 space-y-2.5 text-[13.5px] text-ink/70 leading-[1.85]">
                    {b.items.map((x, i) => {
                      const rawText = typeof x === "string" ? x : x.text;
                      const translated =
                        b.kind === "included"
                          ? translateIncludedItem(rawText, locale)
                          : b.kind === "notIncluded"
                          ? translateNotIncludedItem(rawText, locale)
                          : rawText;
                      const content = typeof x === "string" ? translated : (
                        <>
                          {translated}{" "}
                          {x.href && (
                            <a href={x.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">{x.href}</a>
                          )}
                        </>
                      );
                      const key = typeof x === "string" ? x : `${x.text}-${i}`;
                      return <li key={key} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary">{content}</li>;
                    })}
                  </ul>
                </div>
              ))}
            </section>

            {(() => {
              const visibleNotes = tour.notes.filter((n) => {
                const text = typeof n === "string" ? n : n.text;
                return !isInternalDevNote(text);
              });
              if (visibleNotes.length === 0) return null;
              return (
              <section>
                <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.notesEyebrow}</p>
                <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.notes}</h2>
                <ul className="mt-5 space-y-3 text-[14px] text-ink/70 leading-[1.95]">
                  {visibleNotes.map((n, i) => {
                    const content = typeof n === "string" ? n : (
                      <>
                        {n.text}
                        {n.href && (
                          <> <a href={n.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">{n.href}</a></>
                        )}
                      </>
                    );
                    const key = typeof n === "string" ? n : `${n.text}-${i}`;
                    return <li key={key} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary">{content}</li>;
                  })}
                </ul>
              </section>
              );
            })()}

            {tour.faq && tour.faq.length > 0 && (
              <section>
                <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— faq</p>
                <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.faq}</h2>
                <div className="mt-6 space-y-3">
                  {tour.faq.map((f) => (
                    <details key={f.q} className="group rounded-2xl bg-[var(--sand)] px-6 py-4 open:bg-cream open:shadow-[0_10px_30px_-18px_rgba(60,80,70,0.3)] border border-border/60">
                      <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                        <span className="font-serif text-[15.5px] text-ink">{f.q}</span>
                        <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                      </summary>
                      <p className="mt-3 text-ink/65 leading-[1.95] text-[14px]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* TERMS & CONDITIONS */}
            <section>
              <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.termsEyebrow}</p>
              <h2 className="font-serif text-2xl md:text-[28px] text-ink mt-3 font-semibold leading-snug">{T.terms}</h2>
              <div className="mt-6 space-y-7 text-[13.5px] text-ink/70 leading-[1.9]">
                {T.termsSections.map((s) => (
                  <div key={s.title}>
                    <h3 className="font-serif text-[16px] text-ink font-semibold">{s.title}</h3>
                    {s.intro && <p className="mt-2">{s.intro}</p>}
                    <ul className="mt-3 space-y-2.5">
                      {s.items.map((it, i) => (
                        <li key={i} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary">
                          {it.label && <span className="text-ink font-medium">{it.label} </span>}
                          {it.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Shuttle-only extras — appended below standard content for the 6 Icefields shuttle products */}
            {isShuttleSlug(slug) && <ShuttleExtras slug={slug} locale={locale} />}
          </div>

          {/* RIGHT — sticky booking */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-[110px]">
              <BookingWidget tour={tour} />
            </div>
          </aside>
        </div>
      </div>

      {isRockies(slug) && <CredentialsSection />}

      {/* Mobile sticky bottom CTA */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-cream/95 backdrop-blur border-t border-border px-5 py-3 flex items-center justify-between gap-3 shadow-[0_-10px_30px_-15px_rgba(60,80,70,0.3)]">
        <div>
          <p className="text-[10.5px] text-ink/55 tracking-[0.2em] uppercase">From</p>
          <p className="font-serif text-primary text-lg font-semibold leading-tight">{formatPrice(tour.price, locale)}</p>
        </div>
        <a
          href="#m-booking-form"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("m-booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex-1 text-center rounded-full bg-primary text-primary-foreground py-3 text-[14px] tracking-wide"
        >
          Book now →
        </a>
      </div>
    </SiteLayout>
  );
}

/* ============================================================
 * LakeTourTripInfo — shared "What's Included / Not Included"
 * + "Important Travel Notes" block, rendered ONLY for the five
 * Rocky Mountain Lake tour detail pages.
 * ============================================================ */
function LakeTourTripInfo({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const pack = LAKE_TOUR_TRIP_INFO[locale];
  const extraNotes =
    (isLakeTourSlug(slug) && LAKE_TOUR_EXTRA_NOTES[slug]?.[locale]) || [];
  const notes = [...pack.notes, ...extraNotes];
  const isSunrise = slug === "moraine-lake-sunrise-tour";


  return (
    <section
      aria-labelledby="lake-tour-trip-info-heading"
      className="rounded-2xl border border-border/60 bg-cream p-7 md:p-9 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.3)]"
    >
      <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
        — {pack.sectionEyebrow}
      </p>
      <h2
        id="lake-tour-trip-info-heading"
        className="mt-3 font-serif text-2xl md:text-[28px] text-ink font-semibold"
      >
        {pack.sectionTitle}
      </h2>

      {/* Block 1 — Included / Not Included */}
      <div className="mt-7 grid md:grid-cols-2 gap-7">
        <div>
          <h3 className="font-serif text-[17px] text-ink font-semibold">
            {pack.includedTitle}
          </h3>
          <div className="mt-3 h-px w-10 bg-primary/60" />
          <ul className="mt-5 space-y-2.5 text-[14px] text-ink/75 leading-[1.9]">
            {pack.included.map((it) => (
              <li
                key={it}
                className="pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-primary"
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-[17px] text-ink font-semibold">
            {pack.notIncludedTitle}
          </h3>
          <div className="mt-3 h-px w-10 bg-ink/30" />
          <ul className="mt-5 space-y-2.5 text-[14px] text-ink/75 leading-[1.9]">
            {pack.notIncluded.map((it, i) => {
              const key = typeof it === "string" ? it : `${it.text}-${i}`;
              return (
                <li
                  key={key}
                  className="pl-5 relative before:content-['×'] before:absolute before:left-0 before:text-ink/40"
                >
                  {typeof it === "string" ? (
                    it
                  ) : (
                    <>
                      {it.text}{" "}
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                      >
                        {it.linkLabel}
                      </a>
                      .
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Block 2 — Important Travel Notes */}
      <div className="mt-9 pt-7 border-t border-border/60">
        <h3 className="font-serif text-[17px] text-ink font-semibold">
          {pack.notesTitle}
        </h3>
        <div className="mt-3 h-px w-10 bg-primary/60" />
        <ol className="mt-5 space-y-3 text-[14px] text-ink/75 leading-[1.95] list-decimal pl-5 marker:text-primary marker:font-serif">
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}

        </ol>

        {isSunrise && (
          <div className="mt-5 rounded-xl border border-primary/25 bg-primary/5 px-5 py-4">
            <p className="text-[13.5px] text-ink/80 leading-[1.9] italic">
              {pack.sunriseExtraNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
 * ShuttleExtras — appended-only sections for the 6 Icefields
 * shuttle products. Rendered at the bottom of the standard
 * left-column content; does NOT alter the standard layout or
 * the booking widget position.
 * ============================================================ */
function ShuttleExtras({ slug, locale }: { slug: string; locale: Locale }) {
  const productId = SHUTTLE_SLUG_TO_PRODUCT[slug];
  const c = getIcefieldsContent(locale);
  const product = c.products[productId];

  return (
    <>
      {/* Key Attractions on This Route */}
      <section>
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.routeSection.highlightsEyebrow}</p>
        <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{c.routeSection.highlightsHeading}</h2>
        <div className="mt-7 grid sm:grid-cols-2 gap-5">
          {c.routeSection.highlights.map((h) => (
            <div key={h.name} className="rounded-[8px] border border-border/60 bg-cream p-5">
              <h3 className="font-serif text-[17px] text-ink font-semibold">{h.name}</h3>
              <p className="mt-2 text-[14px] text-ink/70 leading-[1.9]">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stop-by-Stop Itinerary */}
      <section>
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.routeSection.timelineEyebrow}</p>
        <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{c.routeSection.timelineHeading}</h2>
        <ol className="mt-7 relative border-l border-primary/30 pl-6 space-y-6">
          {product.schedule.map((step, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">●</span>
              <p className="font-marker text-primary text-xs tracking-[0.2em] uppercase">{c.routeSection.stopLabel} {i + 1}</p>
              <p className="mt-1 text-ink/80 leading-[1.9] text-[14.5px]">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pickup & drop-off notes (collapsible) */}
      <details className="group rounded-2xl bg-[var(--sand)] open:bg-cream open:shadow-[0_10px_30px_-18px_rgba(60,80,70,0.3)] border border-border/60 px-6 py-4">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
          <span className="font-serif text-[17px] text-ink font-semibold">{c.pickupNotes.heading}</span>
          <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
        </summary>
        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          {c.pickupNotes.cards.map((card) => (
            <div key={card.t}>
              <h4 className="font-serif text-[15px] text-ink font-semibold">{card.t}</h4>
              <ul className="mt-2 space-y-1.5 text-[13.5px] text-ink/70 leading-[1.85]">
                {card.lines.map((l, i) => (
                  <li key={i} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary">{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      {/* Travel Notes (FAQ) */}
      <section>
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.faq.eyebrow}</p>
        <h2 className="font-serif text-2xl md:text-[28px] text-ink mt-3 font-semibold">{c.faq.heading}</h2>
        <div className="mt-6 space-y-3">
          {c.faq.items.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-[var(--sand)] px-6 py-4 open:bg-cream open:shadow-[0_10px_30px_-18px_rgba(60,80,70,0.3)] border border-border/60">
              <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                <span className="font-serif text-[15.5px] text-ink">{f.q}</span>
                <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
              </summary>
              <p className="mt-3 text-ink/65 leading-[1.95] text-[14px]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Booking Terms (collapsible) */}
      <details className="group rounded-2xl bg-[var(--sand)] open:bg-cream open:shadow-[0_10px_30px_-18px_rgba(60,80,70,0.3)] border border-border/60 px-6 py-4">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
          <span className="font-serif text-[17px] text-ink font-semibold">{c.terms.heading}</span>
          <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
        </summary>
        <div className="mt-5 space-y-5 text-[13.5px] text-ink/70 leading-[1.9]">
          {c.terms.blocks.map((b) => (
            <div key={b.t}>
              <h4 className="font-serif text-[15px] text-ink font-semibold">{b.t}</h4>
              <p className="mt-1.5">{b.d}</p>
            </div>
          ))}
        </div>
      </details>
    </>
  );
}

