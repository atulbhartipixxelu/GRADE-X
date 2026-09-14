"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "@/components/3d/HeroScene";
import { storyDrive } from "@/lib/storyDrive";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    kicker: "Technology",
    title: "Robotic kitchen exhaust cleaning technology.",
    body: "Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology.",
  },
  {
    kicker: "The platform",
    title: "A stainless tracked crawler.",
    body: "Chevron drive plates, dual high-pressure hoses, an articulating turret with twin nozzles, LED work lights and a forward inspection camera.",
  },
  {
    kicker: "Evidence",
    title: "Precision. Technology. Compliance.",
    body: "Objective grease-thickness measurement before and after every clean, live video during the clean, and photographic before/after evidence.",
  },
] as const;

export function RobotStory() {
  const stage = useRef<HTMLElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const cards = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const stageEl = stage.current;
    const railEl = rail.current;
    if (!stageEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      storyDrive.progress = 0.35;
      storyDrive.active = true;
      cards.current[0]?.classList.add("is-on");
      return;
    }

    const ctx = gsap.context(() => {
      cards.current.forEach((el, i) => {
        gsap.set(el, {
          autoAlpha: i === 0 ? 1 : 0,
          xPercent: i === 0 ? 0 : 28,
          y: i === 0 ? 0 : 18,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            storyDrive.active = self.isActive;
          },
          onUpdate: (self) => {
            storyDrive.progress = self.progress;
            if (railEl) railEl.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      cards.current.forEach((el, i) => {
        const last = i === cards.current.length - 1;
        const t0 = i * 0.3;
        tl.to(
          el,
          { autoAlpha: 1, xPercent: 0, y: 0, duration: 0.12 },
          t0,
        ).to(
          el,
          {
            autoAlpha: last ? 1 : 0,
            xPercent: last ? -6 : -26,
            y: last ? 0 : -12,
            duration: 0.14,
          },
          t0 + 0.22,
        );
      });
    }, stageEl);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const t = window.setTimeout(refresh, 350);

    return () => {
      window.removeEventListener("resize", refresh);
      window.clearTimeout(t);
      storyDrive.active = false;
      storyDrive.progress = 0;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={stage} className="gx-story">
      <div className="gx-story-pin">
        <div className="gx-story-copy">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.title}
              ref={(el) => {
                if (el) cards.current[i] = el;
              }}
              className="gx-story-chapter"
            >
              <p className="gx-story-kicker">{chapter.kicker}</p>
              <h2>{chapter.title}</h2>
              <p className="gx-story-body">{chapter.body}</p>
            </div>
          ))}
        </div>
        <div className="gx-story-scene">
          <HeroScene mode="story" />
        </div>
        <div className="gx-story-wash" aria-hidden />
        <div className="gx-story-progress" aria-hidden>
          <span ref={rail} />
        </div>
      </div>
    </section>
  );
}
