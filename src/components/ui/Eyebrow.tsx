import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** "dark" is for sections with a charcoal background. */
  tone?: "light" | "dark";
  /** Width of the hairline rule before the label. */
  rule?: "short" | "long";
  className?: string;
};

/** Small uppercase overline with a leading hairline, used above section headings. */
export function Eyebrow({
  children,
  tone = "light",
  rule = "short",
  className = "",
}: EyebrowProps) {
  const color = tone === "dark" ? "text-secondary-fixed" : "text-secondary";
  const ruleColor = tone === "dark" ? "bg-secondary-fixed" : "bg-secondary";
  const ruleWidth = rule === "long" ? "w-12" : "w-8";

  return (
    <div
      className={`flex items-center ${rule === "long" ? "gap-4" : "gap-3"} ${className}`}
    >
      <span aria-hidden="true" className={`${ruleWidth} h-px ${ruleColor}`} />
      <span className={`type-label-md uppercase tracking-[0.25em] ${color}`}>
        {children}
      </span>
    </div>
  );
}
