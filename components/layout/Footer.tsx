"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNav, site } from "@/lib/site";
import { Doubled } from "@/components/ui/StaggerLink";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden px-5 pt-24 pb-8 sm:px-8">
      <p className="text-center text-sm text-mist">cold stainless, never guessed</p>
      <p className="font-display mt-4 text-center text-[22vw] leading-[0.8] tracking-tight text-ivory">
        Grade X
      </p>
      <div className="mx-auto mt-16 grid max-w-[1400px] gap-10 border-t border-ivory/10 pt-10 sm:grid-cols-4">
        <div>
          <p className="text-sm leading-7 text-mist">
            Tracked crawler. Dual-hose turret. Measured microns. Perth metro / WA.
          </p>
          <p className="mt-4 font-mono text-[11px] text-mist">ABN {site.abn}</p>
        </div>
        <FooterCol items={footerNav.company} />
        <FooterCol items={footerNav.operations} />
        <div>
          <FooterCol items={footerNav.services} />
          <div className="mt-6 flex gap-4 text-sm">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="text-mist hover:text-ivory">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col gap-2 text-sm text-mist sm:flex-row sm:justify-between">
        <p>
          {site.address.full} · {site.phone}
        </p>
        <p>© {new Date().getFullYear()} grade x. all rights reserved.</p>
      </div>
      <p className="mt-8 text-center">
        <Doubled text="made for the cookline" className="text-xs text-mist" />
      </p>
    </footer>
  );
}

function FooterCol({ items }: { items: readonly { href: string; label: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-sm text-ivory hover:text-gold">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
