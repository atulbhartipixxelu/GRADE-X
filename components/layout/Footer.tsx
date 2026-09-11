"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  const video = useRef<HTMLVideoElement>(null);
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="gx-foot relative overflow-hidden text-white">
      <video
        ref={video}
        src="/robot/crawler.mp4"
        poster="/robot/side.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        controls={false}
        className="gx-foot-video"
        aria-hidden
      />
      <div className="gx-foot-overlay" aria-hidden />

      <FooterMedia video={video} />

      <div className="gx-foot-content relative z-10 px-5 pt-20 pb-10 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <Logo />
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/80">
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
      </div>
    </footer>
  );
}

function FooterMedia({ video }: { video: RefObject<HTMLVideoElement | null> }) {
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }
    el.muted = true;
    el.defaultMuted = true;
    el.loop = true;
    el.playsInline = true;
    const play = () => {
      void el.play().catch(() => undefined);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
        else el.pause();
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);
  return null;
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
