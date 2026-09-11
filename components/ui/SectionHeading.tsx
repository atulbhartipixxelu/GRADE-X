import type { ReactNode } from "react";

export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-sans text-[12px] font-semibold tracking-[0.16em] text-gold uppercase ${className}`}
    >
      <span className="size-[7px] shrink-0 rounded-full bg-current" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  body,
  as: Tag = "h2",
  invert = false,
  align = "left",
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  body?: ReactNode;
  as?: "h1" | "h2" | "h3";
  invert?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"} ${className}`}>
      <Kicker className={`${centered ? "justify-center" : ""} ${invert ? "text-white" : ""}`}>
        {kicker}
      </Kicker>
      <Tag
        className={`${centered ? "mx-auto" : ""} font-display mt-4 max-w-[20ch] text-[clamp(2rem,4.4vw,3.65rem)] font-semibold leading-[1.08] ${
          invert ? "text-white" : "text-ivory"
        }`}
      >
        {title}
      </Tag>
      {body ? (
        <p
          className={`${centered ? "mx-auto" : ""} mt-5 max-w-[36rem] font-sans text-[1.0625rem] leading-[1.7] tracking-[0.01em] ${
            invert
              ? "font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_8px_24px_rgba(0,0,0,0.35)]"
              : "gx-body"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
