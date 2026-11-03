"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function StickyCtas() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="gx-sticky-cta" aria-label="Quick actions">
      <a href={site.phoneHref}>Call {site.phone}</a>
      <a href="/contact">Request a quote</a>
    </div>
  );
}
