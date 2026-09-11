"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme !== "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex size-10 items-center justify-center rounded-full border border-[var(--line)] text-ivory transition hover:border-gold hover:text-gold ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 3.2v1.8M12 19v1.8M4.9 4.9l1.3 1.3M17.8 17.8l1.3 1.3M3.2 12h1.8M19 12h1.8M4.9 19.1l1.3-1.3M17.8 6.2l1.3-1.3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" aria-hidden>
          <path
            d="M15.2 4.4A7.4 7.4 0 1 0 19.6 15 6.2 6.2 0 0 1 15.2 4.4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
