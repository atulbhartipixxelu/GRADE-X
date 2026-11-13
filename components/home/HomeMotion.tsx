"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showIfStillHidden, showMotion } from "@/lib/showMotion";

gsap.registerPlugin(ScrollTrigger);

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 980px)").matches;
    if (reduce || mobile) return;

    const ctx = gsap.context(() => {
      const vh = window.innerHeight || 800;
      root.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
        const inView = (el.parentElement ?? el).getBoundingClientRect().top < vh * 0.96;
        gsap.fromTo(
          el,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.25,
            ease: "power4.out",
            scrollTrigger: inView
              ? undefined
              : {
                  trigger: el.parentElement,
                  start: "top 92%",
                  once: true,
                  toggleActions: "play none none none",
                },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v)).padStart(
              el.dataset.pad ? Number(el.dataset.pad) : 1,
              "0",
            );
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = window.requestAnimationFrame(() => refresh());
    const later = window.setTimeout(refresh, 500);
    const near = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 80) showIfStillHidden(el);
      });
    }, 1100);
    const hard = window.setTimeout(() => showMotion(root), 2400);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(later);
      window.clearTimeout(near);
      window.clearTimeout(hard);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
