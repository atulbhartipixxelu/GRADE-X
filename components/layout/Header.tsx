"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ServicesMega } from "@/components/layout/ServicesMega";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const topNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/technology", label: "Technology" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isAdmin) return null;

  return (
    <>
      <div className="gx-topbar">
        <div className="gx-topbar-inner">
          <a href={site.phoneHref}>
            <Phone size={14} strokeWidth={2} />
            {site.phone}
          </a>
          <a href={site.emailHref}>
            <Mail size={14} strokeWidth={2} />
            {site.email}
          </a>
          <span>
            <MapPin size={14} strokeWidth={2} />
            {site.address.full}
          </span>
        </div>
      </div>

      <header className="gx-nav">
        <div className="gx-nav-inner">
          <button
            type="button"
            onClick={() => setMenuPath(open ? null : pathname)}
            className={`gx-nav-menu${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="gx-nav-toggle" aria-hidden>
              <i />
              <i />
              <i />
            </span>
          </button>

          <div className="gx-nav-brand">
            <Logo variant="lockup" />
          </div>

          <nav className="gx-nav-links" aria-label="Primary">
            {topNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              if (item.href === "/services") {
                return <ServicesMega key={item.href} active={active} />;
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`gx-nav-link ${active ? "is-on" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="gx-nav-end">
            <Button href="/contact" variant="urgent" className="gx-nav-quote">
              <span className="gx-nav-quote-full">Request a quote</span>
              <span className="gx-nav-quote-short">Quote</span>
            </Button>
          </div>
        </div>
      </header>

      <div className={`gx-sheet${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="gx-sheet-nav" aria-label="Mobile">
          {topNav.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuPath(null)}
                className={`gx-sheet-link${active ? " is-on" : ""}`}
              >
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="gx-sheet-foot">
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={site.emailHref}>{site.email}</a>
          <Button href="/contact" variant="urgent" onClick={() => setMenuPath(null)}>
            Request a quote
          </Button>
        </div>
      </div>
    </>
  );
}
