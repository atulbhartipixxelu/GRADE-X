"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Doubled } from "@/components/ui/StaggerLink";
import { site } from "@/lib/site";

const topNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Story" },
  { href: "/technology", label: "Machine" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isAdmin) return null;

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 h-[var(--header-h)] border-b border-[#1a1712]/8 bg-white">
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
                    active ? "text-[#1a1712]" : "text-[#6e675c] hover:text-[#1a1712]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden bg-[#1a1712] px-4 py-2.5 text-[12px] tracking-[0.16em] text-white uppercase sm:inline-flex"
            >
              Get a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-[12px] tracking-[0.2em] text-[#1a1712] uppercase lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <div className="h-[var(--header-h)]" aria-hidden />

      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex h-full flex-col justify-end px-6 pb-16 sm:px-12">
          <ul>
            {topNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display block py-1 text-6xl tracking-tight text-[#1a1712] sm:text-8xl"
                >
                  <Doubled text={item.label} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-[#6e675c]">{site.email}</p>
        </div>
      </div>
    </>
  );
}
