"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia("(max-width: 980px)");

    let ticker: ((time: number) => void) | null = null;

    const teardown = () => {
      window.removeEventListener("resize", onResize);
      if (ticker) gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(500, 33);
      ticker = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const onResize = () => ScrollTrigger.refresh();

    const setup = () => {
      teardown();
      if (reduceMq.matches || mobileMq.matches) return;

      const lenis = new Lenis({
        duration: 0.75,
        smoothWheel: true,
        wheelMultiplier: 0.86,
        touchMultiplier: 1,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      ticker = (time: number) => {
        lenisRef.current?.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      window.addEventListener("resize", onResize);
    };

    setup();
    mobileMq.addEventListener("change", setup);
    reduceMq.addEventListener("change", setup);

    return () => {
      mobileMq.removeEventListener("change", setup);
      reduceMq.removeEventListener("change", setup);
      teardown();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const later = window.setTimeout(() => ScrollTrigger.refresh(), 280);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(later);
    };
  }, [pathname]);

  return <>{children}</>;
}
