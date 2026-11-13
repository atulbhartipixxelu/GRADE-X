"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function StickyCtas() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="gx-sticky-cta" aria-label="Quick actions">
      <a href={site.phoneHref}>Call {site.phone}</a>
      <Button href="/contact" variant="urgent">
        Request a quote
      </Button>
    </div>
  );
}
