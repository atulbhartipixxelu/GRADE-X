"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { capabilityPdf, publishedIso } from "@/lib/iso";
import { footerNav, site } from "@/lib/site";

const rail = [...footerNav.company, ...footerNav.operations, ...footerNav.services].filter(
  (item) => item.href !== capabilityPdf.href || capabilityPdf.ready,
);

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="gx-foot">
      <div className="gx-foot-inner">
        <div className="gx-foot-brand">
          <Logo variant="lockup" tone="navy" />
          <p className="gx-foot-tag">{site.tagline}</p>
          <p>
            Western Australia&apos;s robotic kitchen exhaust cleaning specialists. Robotic cleaning,
            digital grease readings and photo evidence on every job.
          </p>
        </div>

        <div className="gx-foot-call">
          <p className="gx-foot-label">Phone</p>
          <a className="gx-foot-phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <p className="gx-foot-area">{site.serviceArea}</p>
          <Button href="/contact" variant="urgent">
            Request a quote
          </Button>
        </div>

        <div className="gx-foot-where">
          <p className="gx-foot-label">Base</p>
          <p className="gx-foot-legal">{site.legalName}</p>
          <p>{site.address.full}</p>
          <a href={site.emailHref}>{site.email}</a>
        </div>
      </div>

      <nav className="gx-foot-rail" aria-label="Footer">
        {rail.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="gx-foot-meta">
        <ul className="gx-foot-iso">
          {publishedIso.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="gx-iso-stamp" aria-label={item.alt}>
                <small>ISO</small>
                <strong>{item.code.replace("ISO ", "")}</strong>
                <span>{item.short}</span>
              </Link>
            </li>
          ))}
          {capabilityPdf.ready ? (
            <li>
              <a
                className="gx-iso-stamp"
                href={capabilityPdf.href}
                aria-label={`${capabilityPdf.label} (${capabilityPdf.meta})`}
              >
                <small>PDF</small>
                <strong>{capabilityPdf.size}</strong>
                <span>Capability statement</span>
              </a>
            </li>
          ) : null}
        </ul>
        <p className="gx-foot-abn">ABN {site.abn}</p>
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
