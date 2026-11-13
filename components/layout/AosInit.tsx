"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function reveal(el: Element) {
  el.classList.add("aos-animate");
}

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let io: IntersectionObserver | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const watch = (el: Element) => {
      if (!(el instanceof HTMLElement) || el.classList.contains("aos-animate")) return;
      if (reduce) {
        reveal(el);
        return;
      }
      const vh = window.innerHeight || 800;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.98 && rect.bottom > 0) {
        reveal(el);
        return;
      }
      io?.observe(el);
    };

    const scan = () => {
      if (cancelled) return;
      document.querySelectorAll("[data-aos]").forEach(watch);
    };

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "80px 0px 25% 0px" },
    );

    const main = document.getElementById("main") ?? document.body;
    const mo = new MutationObserver(scan);
    mo.observe(main, { childList: true, subtree: true });

    scan();
    const raf = window.requestAnimationFrame(() => {
      scan();
      window.requestAnimationFrame(scan);
    });

    const near = window.setTimeout(scan, 350);
    const hard = window.setTimeout(() => {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 160) reveal(el);
      });
    }, 1600);

    const onShow = () => scan();
    window.addEventListener("pageshow", onShow);
    window.addEventListener("scroll", onShow, { passive: true });
    window.addEventListener("resize", onShow);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(near);
      window.clearTimeout(hard);
      window.removeEventListener("pageshow", onShow);
      window.removeEventListener("scroll", onShow);
      window.removeEventListener("resize", onShow);
      mo.disconnect();
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
