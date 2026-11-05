"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    let cancelled = false;
    let started = false;
    let fallback = 0;
    let readyWait = 0;
    let hard = 0;

    const reveal = (el: Element) => {
      el.classList.add("aos-animate");
      io?.unobserve(el);
    };

    const start = () => {
      if (cancelled || started) return;
      started = true;

      const nodes = [...document.querySelectorAll("[data-aos]")];
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        nodes.forEach(reveal);
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target);
          });
        },
        { threshold: 0.04, rootMargin: "0px 0px -4% 0px" },
      );

      const vh = window.innerHeight || 800;
      nodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.96 && rect.bottom > 24) {
          reveal(el);
          return;
        }
        io?.observe(el);
      });

      fallback = window.setTimeout(() => {
        nodes.forEach(reveal);
      }, 3500);
    };

    const kick = () => {
      if (cancelled) return;
      const root = document.documentElement;
      if (root.dataset.gxReady === "1" || root.dataset.gxLoading !== "1") {
        start();
        return;
      }
      readyWait = window.setTimeout(kick, 100);
    };

    kick();
    hard = window.setTimeout(start, 2600);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.clearTimeout(readyWait);
      window.clearTimeout(hard);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
