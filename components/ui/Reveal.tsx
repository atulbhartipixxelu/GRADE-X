"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showIfStillHidden } from "@/lib/showMotion";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 980px)").matches;
    if (reduce || mobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    const near = window.setTimeout(() => showIfStillHidden(el), 1200);
    const hard = window.setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "none";
    }, 2400);

    return () => {
      window.clearTimeout(near);
      window.clearTimeout(hard);
      ctx.revert();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
