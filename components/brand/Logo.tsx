import Link from "next/link";

export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect width="40" height="40" rx="11" fill="#1a1712" />
      <circle cx="20" cy="20" r="11.2" stroke="#f3eee4" strokeWidth="1.8" />
      <path
        d="M8 20h24"
        stroke="#f3eee4"
        strokeWidth="1.2"
        strokeDasharray="2.2 2.4"
        opacity="0.55"
      />
      <path
        d="M13.2 13.2 26.8 26.8M26.8 13.2 13.2 26.8"
        stroke="#3d5c45"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3.4" fill="#f3eee4" />
      <circle cx="20" cy="20" r="1.45" fill="#3d5c45" />
    </svg>
  );
}

export function Logo({
  href = "/",
  compact = false,
}: {
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link href={href} className="group flex items-center gap-3" aria-label="Grade X home">
      <LogoMark className="size-10 shrink-0 transition-transform duration-500 group-hover:rotate-90" />
      <span className="leading-none">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-semibold tracking-[0.28em] text-[#1a1712]">
            GRADE
          </span>
          <span className="font-display text-[22px] leading-none tracking-tight text-[#3d5c45]">
            X
          </span>
        </span>
        {!compact && (
          <span className="mt-1 block text-[9px] tracking-[0.34em] text-[#6e675c] uppercase">
            Crawler mark
          </span>
        )}
      </span>
    </Link>
  );
}
