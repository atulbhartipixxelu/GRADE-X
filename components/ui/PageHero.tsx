import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PageHero({
  kicker,
  title,
  body,
  crumbs,
}: {
  kicker: string;
  title: ReactNode;
  body: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden pt-8">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        {crumbs ? (
          <p className="mb-8 text-[13px] text-mist">
            {crumbs.map((c, i) => (
              <span key={c.href}>
                <Link href={c.href} className="hover:text-ivory">
                  {c.label}
                </Link>
                {i < crumbs.length - 1 ? " / " : null}
              </span>
            ))}
          </p>
        ) : null}
        <SectionHeading as="h1" kicker={kicker} title={title} body={body} />
      </div>
    </section>
  );
}
