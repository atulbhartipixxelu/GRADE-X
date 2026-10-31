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
          <div className="gx-nav-start">
            <button
              type="button"
              onClick={() => setMenuPath(open ? null : pathname)}
              className="gx-nav-menu lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
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
            <Button href="/contact" className="gx-nav-quote hidden sm:inline-flex">
              Contact Us
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#0c0f16] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex h-full flex-col justify-end px-6 pb-16 sm:px-12">
          <ul>
            {topNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuPath(null)}
                  className="font-display block py-1 text-5xl tracking-tight text-white sm:text-7xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <p className="text-sm text-white/70">{site.email}</p>
          </div>
          <a href={site.phoneHref} className="mt-2 text-sm text-white">
            {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
