"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden bg-brand px-5 pt-16 pb-8 text-white sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative h-24 w-52 overflow-hidden rounded-xl bg-white p-2 sm:h-28 sm:w-60">
          <Image
            src="/brand/logo-lockup.png"
            alt="Grade X Commercial Solutions Pty Ltd"
            fill
            className="object-contain object-left p-2"
            sizes="240px"
          />
        </div>
        <p className="mt-6 max-w-xl text-sm leading-7 text-white/75">
          {site.tagline}
          <br />
          Advanced equipment and proven methodology for professional commercial
          kitchen exhaust cleaning.
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-[1400px] gap-10 border-t border-white/15 pt-10 sm:grid-cols-4">
        <div>
          <p className="text-sm leading-7 text-white/75">
            {site.legalName}
            <br />
            {site.address.full}
            <br />
            {site.serviceArea}
          </p>
          <p className="mt-4 font-mono text-[11px] text-white/55">ABN {site.abn}</p>
        </div>
        <FooterCol items={footerNav.company} />
        <FooterCol items={footerNav.operations} />
        <div>
          <FooterCol items={footerNav.services} />
          <div className="mt-6 flex gap-4 text-sm">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/55 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col gap-2 text-sm text-white/55 sm:flex-row sm:justify-between">
        <p>
          <a href={site.phoneHref} className="hover:text-white">
            {site.phone}
          </a>
          {" · "}
          <a href={site.emailHref} className="hover:text-white">
            {site.email}
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ items }: { items: readonly { href: string; label: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-sm text-white/90 hover:text-gold-2">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
