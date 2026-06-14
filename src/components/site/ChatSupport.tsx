import { useState } from "react";
import { MessageCircle, Copy, Check, ExternalLink } from "lucide-react";
import { useLocale, type Locale } from "@/i18n/locale";

export const CHAT_CHANNELS = {
  kakao: {
    label: "KakaoTalk",
    id: "noworriesyep",
    href: "https://qr.kakao.com/talk/noworriesyep",
    type: "link" as const,
  },
  whatsapp: {
    label: "WhatsApp",
    id: "+1 (604) 765-7765",
    href: "https://wa.me/16047657765",
    type: "link" as const,
  },
  wechat: { label: "WeChat", id: "Shootingstartravel", type: "copy" as const },
};

type Pack = {
  eyebrow: string;
  heading: string;
  intro: string;
  copy: string;
  copied: string;
  openChat: string;
  noteCompact: string;
};

const PACKS: Record<Locale, Pack> = {
  en: {
    eyebrow: "Chat Support",
    heading: "Need help? Chat with us.",
    intro:
      "Bookings go through the booking system. For questions, special requests or itinerary advice, reach our team on any of these channels.",
    copy: "Copy ID",
    copied: "Copied",
    openChat: "Open chat",
    noteCompact: "Need help with your booking? Contact us through:",
  },
  zh: {
    eyebrow: "客服諮詢",
    heading: "需要協助嗎？歡迎與我們聯繫。",
    intro:
      "訂位請使用上方訂位系統。如有問題、特殊需求或行程建議，歡迎透過以下任一管道與我們聯繫。",
    copy: "複製 ID",
    copied: "已複製",
    openChat: "開始對話",
    noteCompact: "預訂上有任何問題嗎？歡迎透過以下管道聯繫：",
  },
  ko: {
    eyebrow: "고객 지원",
    heading: "도움이 필요하신가요?",
    intro:
      "예약은 위 예약 시스템에서 진행해 주세요. 문의·특별 요청·일정 상담은 아래 채널 중 편하신 곳으로 연락 주세요.",
    copy: "ID 복사",
    copied: "복사 완료",
    openChat: "채팅 열기",
    noteCompact: "예약 관련 도움이 필요하시면 아래로 문의해 주세요:",
  },
};

function ChannelRow({
  channel,
  pack,
}: {
  channel: (typeof CHAT_CHANNELS)[keyof typeof CHAT_CHANNELS];
  pack: Pack;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(channel.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-cream px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[10.5px] tracking-[0.3em] uppercase text-primary/80">{channel.label}</p>
        <p className="mt-1 font-mono text-[14px] text-ink truncate">{channel.id}</p>
      </div>
      {channel.type === "link" ? (
        <a
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-[12px] tracking-wide hover:bg-primary/90 transition shrink-0"
        >
          {pack.openChat} <ExternalLink size={12} />
        </a>
      ) : (
        <button
          onClick={onCopy}
          aria-label={pack.copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 text-primary px-4 py-2 text-[12px] tracking-wide hover:bg-primary hover:text-primary-foreground transition shrink-0"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? pack.copied : pack.copy}
        </button>
      )}
    </div>
  );
}

/** Full section — used on Contact page. */
export function ChatSupportSection() {
  const locale = useLocale();
  const p = PACKS[locale];
  return (
    <div>
      <p className="text-[10.5px] tracking-[0.3em] uppercase text-primary/80 inline-flex items-center gap-2">
        <MessageCircle size={12} /> {p.eyebrow}
      </p>
      <h3 className="font-serif text-[22px] md:text-[26px] text-ink font-medium tracking-[-0.01em] mt-3">
        {p.heading}
      </h3>
      <p className="mt-3 text-[13.5px] text-ink/65 leading-[1.95] max-w-md">{p.intro}</p>
      <div className="mt-6 space-y-3">
        {Object.values(CHAT_CHANNELS).map((c) => (
          <ChannelRow key={c.label} channel={c} pack={p} />
        ))}
      </div>
    </div>
  );
}

/** Compact note — used beneath a booking widget. */
export function ChatSupportNote() {
  const locale = useLocale();
  const p = PACKS[locale];
  return (
    <div className="mt-8 rounded-2xl border border-border/70 bg-cream/70 p-5 md:p-6">
      <p className="text-[10.5px] tracking-[0.3em] uppercase text-primary/80 inline-flex items-center gap-2">
        <MessageCircle size={12} /> {p.eyebrow}
      </p>
      <p className="mt-2 text-[14px] text-ink/75 leading-[1.85]">{p.noteCompact}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.values(CHAT_CHANNELS).map((c) =>
          c.type === "link" ? (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 text-primary px-4 py-2 text-[12.5px] hover:bg-primary hover:text-primary-foreground transition"
            >
              {c.label} <ExternalLink size={11} />
            </a>
          ) : (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-cream text-ink/75 px-4 py-2 text-[12.5px]"
            >
              {c.label} · <span className="font-mono text-ink">{c.id}</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
