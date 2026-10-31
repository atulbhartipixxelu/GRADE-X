"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="gx-foot">
      <div className="gx-foot-inner">
        <div className="gx-foot-brand">
          <Logo variant="lockup" tone="light" />
          <p className="gx-foot-tag">{site.tagline}</p>
          <p>
            Advanced equipment and proven methodology for professional commercial kitchen exhaust
            cleaning.
          </p>
        </div>
        <FooterCol title="Company" items={footerNav.company} />
        <FooterCol title="Operations" items={footerNav.operations} />
        <div className="gx-foot-contact">
          <p className="gx-foot-title">Contact</p>
          <p className="gx-foot-legal">{site.legalName}</p>
          <ul className="gx-foot-facts">
            <li>
              <MapPin strokeWidth={1.7} aria-hidden />
              <span>{site.address.full}</span>
            </li>
            <li>
              <Phone strokeWidth={1.7} aria-hidden />
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <Mail strokeWidth={1.7} aria-hidden />
              <a href={site.emailHref}>{site.email}</a>
            </li>
          </ul>
          <p className="gx-foot-area">{site.serviceArea}</p>
          <p className="gx-foot-abn">ABN {site.abn}</p>
        </div>
      </div>
      <div className="gx-foot-bar">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <div>
          {footerNav.legal.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="gx-foot-title">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
