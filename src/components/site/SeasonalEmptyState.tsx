import { Link } from "@tanstack/react-router";
import { useLocale, withLocale, type Locale } from "@/i18n/locale";

/**
 * Shown on region / lake / shuttle pages when every tour in that group is
 * hidden in the admin (usually because the season has ended). Replaces an
 * empty grid with a clear message and two ways forward.
 */
const COPY: Record<Locale, { title: string; body: string; browse: string; contact: string }> = {
  en: {
    title: "These tours are resting for the season",
    body: "Our Banff, Jasper and lake departures are seasonal and reopen each summer. See what's running now, or send us your dates — we're happy to plan a private trip.",
    browse: "See current tours →",
    contact: "Plan a private trip",
  },
  zh: {
    title: "本系列行程目前為淡季暫停",
    body: "班夫、賈斯珀與湖泊行程為季節性出團，每年夏季重新開放。歡迎先看看目前出團的行程，或告訴我們您的日期，我們可為您安排包車私人行程。",
    browse: "查看目前行程 →",
    contact: "安排包車行程",
  },
  ko: {
    title: "현재 비수기로 운영을 쉬고 있습니다",
    body: "밴프·재스퍼·호수 투어는 시즌 상품으로 매년 여름 다시 열립니다. 현재 운영 중인 투어를 보시거나 원하시는 날짜를 알려주시면 프라이빗 투어를 안내해 드립니다.",
    browse: "현재 투어 보기 →",
    contact: "프라이빗 투어 문의",
  },
};

export function SeasonalEmptyState({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const c = COPY[locale];
  return (
    <div
      className={`rounded-2xl border border-dashed border-primary/30 bg-cream px-6 py-12 md:px-12 md:py-14 text-center ${className}`}
    >
      <h3 className="font-serif text-2xl md:text-[28px] text-ink font-semibold">{c.title}</h3>
      <p className="mt-4 mx-auto max-w-xl text-ink/65 leading-[1.9] text-[14.5px]">{c.body}</p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to={withLocale("/tours", locale) as never}
          className="inline-flex rounded-full bg-primary text-primary-foreground px-7 py-3 text-[14px] tracking-wide hover:bg-primary/90 transition"
        >
          {c.browse}
        </Link>
        <Link
          to={withLocale("/contact", locale) as never}
          className="inline-flex rounded-full border border-primary/40 text-primary px-7 py-3 text-[14px] tracking-wide hover:bg-primary/5 transition"
        >
          {c.contact}
        </Link>
      </div>
    </div>
  );
}
