import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { TourGallery } from "@/components/site/TourGallery";
import { getTour, type Tour } from "@/data/tours";
import { useGetTour } from "@/data/useTours";
import { useLocale, withLocale, hreflangLinks, type Locale } from "@/i18n/locale";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CredentialsSection } from "@/components/site/CredentialsSection";

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
  loader: ({ params }) => {
    const tour = getTour(params.slug);
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

type RezdySessionDto = {
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  seatsAvailable: number | null;
  price: number | null;
  currency: string;
  productCode: string;
  rawSessionId: string | null;
};

function formatRezdyDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

export function BookingWidget({ tour, idPrefix = "" }: { tour: ReturnType<typeof getTour>; idPrefix?: string }) {
  const locale = useLocale();
  const langCopy = {
    en: {
      label: "Preferred Language",
      tooltip: "Language preference only. Guide language depends on group composition and guide availability. We will do our best to accommodate your preferred language, but a single-language tour cannot be guaranteed.",
      note: "Selecting a language indicates your preference only — it does not guarantee a dedicated single-language tour.",
      options: ["English Preferred", "Mandarin Preferred", "Korean Preferred"],
    },
    zh: {
      label: "偏好語言",
      tooltip: "僅為語言偏好。導遊語言將依當團旅客組成與導遊安排而定。我們會盡力安排您的偏好語言，但無法保證提供單一語言團。",
      note: "選擇語言僅代表您的偏好——並不保證會安排單一語言導覽團。",
      options: ["偏好英文", "偏好中文", "偏好韓文"],
    },
    ko: {
      label: "선호 언어",
      tooltip: "언어 선호일 뿐입니다. 가이드 언어는 투어 구성과 가이드 가능 여부에 따라 결정됩니다. 선호하시는 언어를 최대한 반영하도록 노력하지만, 단일 언어 투어를 보장할 수는 없습니다.",
      note: "언어 선택은 선호 사항일 뿐이며, 단일 언어 투어를 보장하지는 않습니다.",
      options: ["영어 선호", "중국어 선호", "한국어 선호"],
    },
  }[locale];

  const isVictoria = tour?.slug === "victoria-1-day";

  const [rezdySessions, setRezdySessions] = useState<RezdySessionDto[] | null>(null);
  const [rezdyStatus, setRezdyStatus] = useState<"idle" | "loading" | "ready" | "error">(
    isVictoria ? "loading" : "idle",
  );
  const [rezdyError, setRezdyError] = useState<string | null>(null);

  useEffect(() => {
    if (!isVictoria) return;
    let cancelled = false;
    setRezdyStatus("loading");
    fetch("/api/rezdy/victoria-availability")
      .then(async (r) => {
        const json = (await r.json()) as
          | { success: true; sessions: RezdySessionDto[] }
          | { success: false; message: string; details?: string };
        if (cancelled) return;
        if (!("success" in json) || json.success === false) {
          setRezdyError(("message" in json && json.message) || "Unable to load availability.");
          setRezdyStatus("error");
          return;
        }
        setRezdySessions(json.sessions.filter((s) => s.date));
        setRezdyStatus("ready");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setRezdyError(e instanceof Error ? e.message : "Network error");
        setRezdyStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [isVictoria]);

  const liveDepartures =
    isVictoria && rezdySessions
      ? rezdySessions.map((s) => ({ date: formatRezdyDate(s.date), seats: s.seatsAvailable ?? 0 }))
      : null;

  const departures =
    liveDepartures ??
    tour?.departures ?? [
      { date: "Jul 12", seats: 8 },
      { date: "Jul 18", seats: 4 },
      { date: "Jul 26", seats: 12 },
      { date: "Aug 09", seats: 6 },
    ];
  const packages = tour?.packages ?? langCopy.options;

  const [dateIdx, setDateIdx] = useState(0);
  const [pkg, setPkg] = useState(packages[0]);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<"form" | "loading" | "done">("form");

  const dep = departures[Math.min(dateIdx, Math.max(0, departures.length - 1))] ?? departures[0];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("loading");
    setTimeout(() => setStage("done"), 1200);
  };

  if (stage === "loading") {
    return (
      <div className="rounded-2xl bg-cream p-10 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)] text-center">
        <div className="mx-auto h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <p className="mt-5 font-marker text-primary text-[13px] tracking-[0.25em] uppercase">— processing</p>
        <p className="mt-2 text-ink/65 text-[14px]">Holding your seat…</p>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="rounded-2xl bg-cream p-7 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)]">
        <p className="font-marker text-primary text-[13px] tracking-[0.25em] uppercase">— demo confirmation</p>
        <h3 className="font-serif text-2xl text-ink mt-3 font-semibold">Booking demo complete ✦</h3>
        <div className="mt-5 rounded-xl bg-[var(--sand)] p-4 text-[13px] text-ink/75 leading-[1.95] space-y-1">
          <p>Tour: {tour?.title}</p>
          <p>Departure: {dep.date} · {pkg}</p>
          <p>Guests: {guests} · Contact: {name || "—"}</p>
        </div>
        <p className="mt-5 text-ink/65 leading-[2] text-[13px]">
          This is a preview of the booking flow — the live site will integrate a third-party booking system.
        </p>
        <button onClick={() => setStage("form")} className="mt-5 text-primary text-sm underline underline-offset-4">Start over</button>
      </div>
    );
  }

  return (
    <form
      id={`${idPrefix}booking-form`}
      onSubmit={submit}
      className="rounded-2xl bg-cream p-6 border-2 border-accent/40 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.45)] space-y-5"
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <p className="font-marker text-primary/80 text-[12px] tracking-[0.25em] uppercase">— booking</p>
          <h3 className="font-serif text-xl text-ink mt-1 font-semibold">Book this tour</h3>
        </div>
        <span className="text-[11px] text-ink/55">from <span className="text-primary font-serif text-[15px] font-semibold">{tour?.price}</span></span>
      </div>

      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">Choose a date</label>
        <div className="flex flex-wrap gap-1.5">
          {departures.map((d, i) => (
            <button
              type="button" key={d.date}
              onClick={() => setDateIdx(i)}
              className={`rounded-full px-3 py-1.5 text-[12px] border transition ${
                i === dateIdx ? "bg-primary text-primary-foreground border-primary" : "border-border text-ink/70 hover:border-primary/50"
              }`}
            >{d.date}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55">{langCopy.label}</label>
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={langCopy.label}
                  className="inline-flex items-center justify-center text-ink/45 hover:text-primary transition"
                >
                  <Info size={13} strokeWidth={2} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[260px] text-[11.5px] leading-[1.55] text-left">
                {langCopy.tooltip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {packages.map((p) => (
            <button
              type="button" key={p}
              onClick={() => setPkg(p)}
              className={`rounded-full px-3 py-1.5 text-[12px] border transition ${
                p === pkg ? "bg-primary text-primary-foreground border-primary" : "border-border text-ink/70 hover:border-primary/50"
              }`}
            >{p}</button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ink/55 leading-[1.6]">{langCopy.note}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">Travellers</label>
          <div className="inline-flex items-center rounded-full border border-border bg-cream">
            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="px-3 py-1.5 text-ink/70">−</button>
            <span className="w-8 text-center text-sm">{guests}</span>
            <button type="button" onClick={() => setGuests(Math.min(dep.seats, guests + 1))} className="px-3 py-1.5 text-ink/70">+</button>
          </div>
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">Seats left</label>
          <p className="pt-1.5 text-primary font-serif text-lg font-semibold">{dep.seats} <span className="text-[11px] text-ink/55 font-sans">seats</span></p>
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
        <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
      </div>

      <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14.5px] tracking-wide hover:bg-primary/90 transition shadow-[0_10px_24px_-12px_oklch(0.585_0.04_155/0.7)]">
        Continue to checkout →
      </button>
      <p className="text-[10.5px] text-ink/45 text-center">* Demo only — payment will run through a third-party system on the live site.</p>
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
                <div><span className="text-ink/50">{T.price} </span><span className="text-primary font-semibold">{tour.price}</span></div>
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
                        <p className="mt-3 font-serif text-primary text-[17px] font-semibold">{r.price}</p>
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
                  <p className="mt-1 font-serif text-primary text-[20px] font-semibold">{tour.price}</p>
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
                { t: T.included, items: tour.included },
                { t: T.notIncluded, items: tour.notIncluded ?? [] },
                { t: T.optional, items: tour.optional ?? [] },
              ].filter((b) => b.items.length > 0).map((b) => (
                <div key={b.t}>
                  <h3 className="font-serif text-lg text-ink font-semibold">{b.t}</h3>
                  <div className="mt-3 h-px w-8 bg-primary/40" />
                  <ul className="mt-4 space-y-2.5 text-[13.5px] text-ink/70 leading-[1.85]">
                    {b.items.map((x, i) => {
                      const content = typeof x === "string" ? x : (
                        <>
                          {x.text}{" "}
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

            {tour.notes.length > 0 && (
              <section>
                <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.notesEyebrow}</p>
                <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.notes}</h2>
                <ul className="mt-5 space-y-3 text-[14px] text-ink/70 leading-[1.95]">
                  {tour.notes.map((n, i) => {
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
            )}

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
          <p className="font-serif text-primary text-lg font-semibold leading-tight">{tour.price}</p>
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
