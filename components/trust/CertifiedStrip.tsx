import Link from "next/link";
import { ClipboardList, ShieldCheck } from "lucide-react";
import { isoStandards } from "@/lib/iso";

const extras = {
  Insured: {
    Icon: ShieldCheck,
    line: "Fully insured.",
  },
  SWMS: {
    Icon: ClipboardList,
    line: "SWMS on every site.",
  },
} as const;

export function CertifiedStrip({
  extra = ["Insured", "SWMS"],
}: {
  extra?: string[];
}) {
  return (
    <div className="gx-cert-strip" aria-label="Certified systems">
      <ul className="gx-cert-marks">
        {isoStandards.map((item) => (
          <li key={item.id}>
            <Link href={item.href} aria-label={item.alt}>
              <b>
                <small>ISO</small>
                <strong>{item.code.replace("ISO ", "")}</strong>
              </b>
              <em>
                <span>{item.short}</span>
                <i>{item.line}</i>
              </em>
            </Link>
          </li>
        ))}
        {extra.map((item) => {
          const meta = extras[item as keyof typeof extras];
          return (
            <li key={item}>
              <p>
                <b>
                  <small>{meta ? <meta.Icon strokeWidth={1.8} aria-hidden /> : "On record"}</small>
                  <strong>{item}</strong>
                </b>
                <em>
                  <span>On record</span>
                  <i>{meta?.line ?? item}</i>
                </em>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
