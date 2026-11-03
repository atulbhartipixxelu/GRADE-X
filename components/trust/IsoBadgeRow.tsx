import Link from "next/link";
import { isoStandards } from "@/lib/iso";

export function IsoBadgeRow({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "navy";
  compact?: boolean;
}) {
  return (
    <ul className={`gx-iso-row ${tone === "navy" ? "is-navy" : ""} ${compact ? "is-compact" : ""}`}>
      {isoStandards.map((item) => (
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
