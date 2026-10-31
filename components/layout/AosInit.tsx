"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SKIP =
  ".gx-hero, .gx-reel, .gx-evd, .gx-about-banner, .gx-about-facts, .gx-about-story, .gx-about-firm, .gx-cta, .gx-about-deck-firm, .gx-tech-hero, .gx-tech-pass, .gx-tech-arch, .gx-tech-sight, .gx-svc-hero, .gx-core, .gx-hmethod";

const CARD_SEL = [
  ".gx-htrust-head",
  ".gx-htrust-tile",
  ".gx-about-deck-firm-row",
  ".gx-inner-wrap > *",
  ".gx-inner-card",
  ".gx-faq-head",
  ".gx-faq-item",
  ".gx-com-head",
  ".gx-com-form",
  ".gx-com-aside",
  ".gx-tech-pass-rail",
  ".gx-tech-pass-port",
  ".gx-tech-arch-head",
  ".gx-tech-arch-track li",
  ".gx-gal-top",
  ".gx-gal-tile",
  ".gx-blog-lead",
  ".gx-blog-card",
  ".gx-foot-inner > *",
].join(", ");

const OWNED = "data-gx-aos";

function mark(el: Element, effect: string, delay = 0, duration = 800) {
  if (el.hasAttribute("data-aos")) return false;
  el.setAttribute("data-aos", effect);
  if (delay) el.setAttribute("data-aos-delay", String(delay));
  el.setAttribute("data-aos-duration", String(duration));
  el.setAttribute(OWNED, "1");
  return true;
}

function revert(el: Element) {
  if (el.getAttribute(OWNED) !== "1") return;
  el.removeAttribute("data-aos");
  el.removeAttribute("data-aos-delay");
  el.removeAttribute("data-aos-duration");
  el.removeAttribute(OWNED);
  el.classList.remove("aos-animate");
}

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    let cancelled = false;
    const owned: Element[] = [];

    const start = () => {
      if (cancelled) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nodes: Element[] = [];

      document.querySelectorAll(CARD_SEL).forEach((el, i) => {
        if (el.closest(SKIP)) return;
        const effect = el.matches(".gx-tech-pass-rail")
          ? "fade-right"
          : el.matches(".gx-tech-pass-port")
            ? "fade-left"
            : i % 2
              ? "fade-left"
              : "fade-right";
        if (mark(el, effect, (i % 5) * 70, 750)) owned.push(el);
        nodes.push(el);
      });

      document.querySelectorAll("[data-aos]").forEach((el) => {
        if (!nodes.includes(el)) nodes.push(el);
      });

      if (reduce) {
        nodes.forEach((el) => el.classList.add("aos-animate"));
        return;
      }

      const play = (el: Element, on: boolean) => {
        el.classList.toggle("aos-animate", on);
      };

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) play(entry.target, true);
            else play(entry.target, false);
          });
        },
        { threshold: [0, 0.12, 0.2], rootMargin: "0px 0px -8% 0px" },
      );

      nodes.forEach((el) => io?.observe(el));
    };

    const timer = window.setTimeout(start, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      io?.disconnect();
      owned.forEach(revert);
    };
  }, [pathname]);

  return null;
}
