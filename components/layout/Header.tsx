"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
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
  const isHome = pathname === "/";
  const [overHero, setOverHero] = useState(isHome);
  const open = menuPath === pathname;
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const hero = document.querySelector(".gx-hero");
    const onScroll = () => {
      if (!hero) {
        setOverHero(true);
        return;
      }
      setOverHero(hero.getBoundingClientRect().bottom > 88);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = window.setInterval(onScroll, 200);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(id);
    };
  }, [isHome]);

  if (isAdmin) return null;

  const onVideo = isHome && overHero;

  return (
    <>
      <header className={`gx-nav ${onVideo ? "gx-nav--over" : ""}`}>
        <div className="gx-nav-inner">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {topNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`gx-nav-link text-[13px] tracking-[0.12em] uppercase transition ${
                    active ? "is-on" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href={site.phoneHref} className="gx-nav-phone hidden lg:inline-flex">
              {site.phone}
            </a>
            <Button href="/contact" className="hidden sm:inline-flex">
              Request a quote
            </Button>
            <button
              type="button"
              onClick={() => setMenuPath(open ? null : pathname)}
              className="gx-nav-menu lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      {!isHome ? <div className="h-[var(--header-h)]" aria-hidden /> : null}

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
          <div className="mt-10">
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
