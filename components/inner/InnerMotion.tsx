"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InnerMotion({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.querySelector(".gx-inner");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

      if (reduce) return;

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 56, opacity: 0, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.05,
            delay: Number(el.dataset.delay || 0) + (i % 4) * 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: el.parentElement, start: "top 90%" },
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

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 700);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div className="gx-inner">
      <div className="gx-inner-progress" aria-hidden>
        <i />
      </div>
      {children}
    </div>
  );
}
