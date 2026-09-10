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
      className={`flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.16em] text-[#c45c28] uppercase ${className}`}
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
      <Kicker className={centered ? "justify-center" : undefined}>{kicker}</Kicker>
      <Tag
        className={`${centered ? "mx-auto" : ""} mt-3 max-w-[16ch] font-sans text-[clamp(2.2rem,5.4vw,4.55rem)] font-extrabold leading-[1.02] tracking-[-0.038em] ${
          invert ? "text-white" : "text-[#1a1712]"
        }`}
      >
        {title}
      </Tag>
      {body ? (
        <p
          className={`${centered ? "mx-auto" : ""} mt-4 max-w-xl text-[17px] leading-7 ${
            invert ? "text-white/80" : "text-mist"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
