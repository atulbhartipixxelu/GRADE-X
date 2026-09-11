"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { site } from "@/lib/site";

const topNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/technology", label: "Technology" },
  { href: "/services", label: "Services" },
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
      <header className="fixed top-0 right-0 left-0 z-50 h-[var(--header-h)] border-b border-[var(--line)] bg-[var(--header-bg)]">
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {topNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] tracking-[0.12em] uppercase transition ${
                    active ? "text-ivory" : "text-mist hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={site.phoneHref}
              className="hidden text-[12px] tracking-[0.08em] text-ivory lg:inline-flex"
            >
              {site.phone}
            </a>
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden bg-gold px-4 py-2.5 text-[12px] tracking-[0.16em] text-white uppercase sm:inline-flex"
            >
              Request a quote
            </Link>
            <button
              type="button"
              onClick={() => setMenuPath(open ? null : pathname)}
              className="text-[12px] tracking-[0.2em] text-ivory uppercase lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <div className="h-[var(--header-h)]" aria-hidden />

      <div
        className={`fixed inset-0 z-40 bg-navy transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
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
                  className="font-display block py-1 text-5xl tracking-tight text-ivory sm:text-7xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-4">
            <ThemeToggle />
            <p className="text-sm text-mist">{site.email}</p>
          </div>
          <a href={site.phoneHref} className="mt-2 text-sm text-ivory">
            {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
