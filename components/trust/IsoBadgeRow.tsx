import Link from "next/link";
import { isoReady, publishedIso } from "@/lib/iso";

export function IsoBadgeRow({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "navy";
  compact?: boolean;
}) {
  if (!isoReady) return null;

  return (
    <ul className={`gx-iso-row ${tone === "navy" ? "is-navy" : ""} ${compact ? "is-compact" : ""}`}>
      {publishedIso.map((item) => (
        <li key={item.id}>
          <Link href={item.href} className="gx-iso-badge" aria-label={item.alt}>
            <b>{item.code}</b>
            <span>{item.short}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
