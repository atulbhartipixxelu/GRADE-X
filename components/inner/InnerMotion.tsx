"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showIfStillHidden, showMotion } from "@/lib/showMotion";

gsap.registerPlugin(ScrollTrigger);

export function InnerMotion({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 980px)").matches;
    const bar = root.querySelector<HTMLElement>(".gx-inner-progress i");

    const ctx = gsap.context(() => {
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
          },
        });
      }

      if (reduce || mobile) return;

      const vh = window.innerHeight || 800;

      root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el, i) => {
        const inView = el.getBoundingClientRect().top < vh * 0.94;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: Number(el.dataset.delay || 0) + (i % 4) * 0.04,
            ease: "power3.out",
            scrollTrigger: inView
              ? undefined
              : {
                  trigger: el,
                  start: "top 92%",
                  once: true,
                  toggleActions: "play none none none",
                },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
        const inView = (el.parentElement ?? el).getBoundingClientRect().top < vh * 0.96;
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.05,
            ease: "power4.out",
            scrollTrigger: inView
              ? undefined
              : {
                  trigger: el.parentElement,
                  start: "top 94%",
                  once: true,
                  toggleActions: "play none none none",
                },
          },
        );
      });
    }, root);

    const tilts = [...root.querySelectorAll<HTMLElement>("[data-tilt]")];
    const onMove = (event: PointerEvent) => {
      tilts.forEach((card) => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / Math.max(1, box.width) - 0.5;
        const y = (event.clientY - box.top) / Math.max(1, box.height) - 0.5;
        const inside =
          event.clientX >= box.left &&
          event.clientX <= box.right &&
          event.clientY >= box.top &&
          event.clientY <= box.bottom;
        if (!inside) {
          card.style.transform = "";
          return;
        }
        card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateZ(8px)`;
      });
    };
    const onLeave = () => {
      tilts.forEach((card) => {
        card.style.transform = "";
      });
    };

    if (!reduce && !mobile) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    const refresh = () => ScrollTrigger.refresh();
    const raf = window.requestAnimationFrame(() => refresh());
    const later = window.setTimeout(refresh, 400);

    const near = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>("[data-rise], [data-clip]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 80) showIfStillHidden(el);
      });
    }, 1100);

    const hard = window.setTimeout(() => {
      showMotion(root);
    }, 2400);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(later);
      window.clearTimeout(near);
      window.clearTimeout(hard);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div className="gx-inner" ref={rootRef}>
      <div className="gx-inner-progress" aria-hidden>
        <i />
      </div>
      {children}
    </div>
  );
}
