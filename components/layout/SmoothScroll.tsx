"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia("(max-width: 980px)");

    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;

    const teardown = () => {
      window.removeEventListener("resize", onResize);
      if (ticker) gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(500, 33);
      ticker = null;
      lenis?.destroy();
      lenis = null;
    };

    const onResize = () => ScrollTrigger.refresh();

    const setup = () => {
      teardown();
      if (reduceMq.matches || mobileMq.matches) return;

      lenis = new Lenis({
        duration: 0.75,
        smoothWheel: true,
        wheelMultiplier: 0.86,
        touchMultiplier: 1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      ticker = (time: number) => {
        lenis?.raf(time * 1000);
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

  return <>{children}</>;
}
