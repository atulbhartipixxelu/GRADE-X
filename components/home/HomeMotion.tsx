"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeMotion({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.25,
            ease: "power4.out",
            scrollTrigger: { trigger: el.parentElement, start: "top 92%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v)).padStart(
              el.dataset.pad ? Number(el.dataset.pad) : 1,
              "0",
            );
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 900);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return <>{children}</>;
}
