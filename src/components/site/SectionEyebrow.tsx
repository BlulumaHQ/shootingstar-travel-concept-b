import type { ReactNode } from "react";
import { DottedLine } from "./BrandMarks";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  icon?: ReactNode;
  className?: string;
};

// Unified editorial section header — small caps eyebrow with thin dotted accent,
// optional sage icon, serif title, optional intro.
export function SectionEyebrow({
  eyebrow,
  title,
  intro,
  align = "left",
  icon,
  className = "",
}: Props) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const lineClass = align === "center" ? "mx-auto" : "";
  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      <div className="flex items-center gap-3 text-primary/70">
        {icon && <span aria-hidden>{icon}</span>}
        <DottedLine length={36} className={`text-primary/50 ${lineClass}`} />
        <span className="text-[11px] tracking-[0.4em] uppercase font-medium text-primary/80">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-serif text-3xl md:text-[40px] text-ink mt-5 tracking-[-0.012em] font-medium leading-[1.18]">
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-ink/60 leading-[2] text-[14.5px] max-w-xl ${align === "center" ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
