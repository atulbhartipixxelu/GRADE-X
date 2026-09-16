"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "Stainless", label: "Tracked crawler chassis" },
  { value: "Twin turret", label: "Dual-hose high-pressure jets" },
  { value: "Live camera", label: "LED interior confirmation" },
  { value: "Only in WA", label: "This class of robotic platform" },
];

const marks = ["Tracks", "Turret", "Hoses", "Camera", "LED"];

export function TechBanner() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = root.current;
    const el = video.current;
    const bar = fill.current;
    if (!section || !el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.pause();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.loop = true;
      void el.play().catch(() => undefined);
      return () => el.pause();
    }

    const sceneA = section.querySelectorAll<HTMLElement>('[data-scene="a"] .gx-about-banner-line > span');
    const sceneB = section.querySelectorAll<HTMLElement>('[data-scene="b"] .gx-about-banner-line > span');
    const cue = section.querySelector<HTMLElement>("[data-cue]");
    const facts = section.querySelectorAll<HTMLElement>("[data-stat]");
    const tags = section.querySelectorAll<HTMLElement>("[data-mark]");
    const meet = section.querySelector<HTMLElement>("[data-meet]");

    gsap.set(sceneB, { yPercent: 110 });
    gsap.set(facts, { opacity: 0, y: 18 });
    gsap.set(tags, { opacity: 0, x: -12 });

    let blobUrl = "";
    let dead = false;
    let armed = false;
    let target = 0;
    let ctx: gsap.Context | undefined;

    const durationOf = () => {
      const dur = el.duration;
      return Number.isFinite(dur) && dur > 0 ? dur : 0;
    };

    const apply = () => {
      const dur = durationOf();
      if (!dur || el.seeking) return;
      const next = Math.min(Math.max(target, 0), Math.max(dur - 0.001, 0));
      if (Math.abs(el.currentTime - next) < 1 / 60) return;
      el.currentTime = next;
    };

    const onSeeked = () => apply();
    el.addEventListener("seeked", onSeeked);

    const arm = () => {
      if (dead || armed || durationOf() <= 0) return;
      armed = true;
      el.pause();

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 3.2)}`,
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const dur = durationOf();
              if (!dur) return;
              target = self.progress * Math.max(dur - 0.001, 0);
              apply();
              if (bar) bar.style.width = `${self.progress * 100}%`;
            },
          },
        });

        tl.to(cue, { opacity: 0, y: 12, duration: 0.12 }, 0.04)
          .to(meet, { y: -10, duration: 1, ease: "none" }, 0)
          .to(sceneA, { yPercent: -110, duration: 0.22, stagger: 0.04, ease: "power2.inOut" }, 0.12)
          .to(sceneB, { yPercent: 0, duration: 0.24, stagger: 0.05, ease: "power2.out" }, 0.22)
          .to(facts, { opacity: 1, y: 0, duration: 0.18, stagger: 0.04, ease: "power2.out" }, 0.32)
          .to(tags, { opacity: 1, x: 0, duration: 0.16, stagger: 0.03, ease: "power2.out" }, 0.36)
          .to({}, { duration: 0.55 });
      }, section);

      ScrollTrigger.refresh();
    };

    const boot = async () => {
      try {
        const src = el.getAttribute("src") || "/technology/crawler-scrub.mp4";
        const res = await fetch(src, { cache: "force-cache" });
        const blob = await res.blob();
        if (dead) return;
        blobUrl = URL.createObjectURL(blob);
        el.src = blobUrl;
        el.load();
      } catch {
        /* keep file src */
      }

      const ready = () => arm();
      el.addEventListener("loadeddata", ready, { once: true });
      if (el.readyState >= 2) ready();
    };

    void boot();

    return () => {
      dead = true;
      el.removeEventListener("seeked", onSeeked);
      ctx?.revert();
      el.pause();
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <section ref={root} className="gx-about-banner" aria-label="Robotic exhaust cleaning technology">
      <div className="gx-about-banner-stage">
        <video
          ref={video}
          className="gx-about-banner-video"
          src="/technology/crawler-scrub.mp4?v=scrub1"
          poster="/robot/front.jpg"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
        />
        <div className="gx-about-banner-veil" aria-hidden />

        <p className="gx-about-banner-meet" data-meet>
          <span>Meet</span>
          <b>the crawler</b>
        </p>

        <ul className="gx-about-banner-marks" aria-hidden>
          {marks.map((mark) => (
            <li key={mark} data-mark>
              <i />
              {mark}
            </li>
          ))}
        </ul>

        <ul className="gx-about-banner-stats">
          {stats.map((item) => (
            <li key={item.value} data-stat>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="gx-about-banner-titles">
          <h1 className="gx-about-banner-h" data-scene="a">
            <span className="gx-about-banner-line">
              <span>Robotic kitchen</span>
            </span>
            <span className="gx-about-banner-line">
              <span>exhaust cleaning.</span>
            </span>
          </h1>
          <p className="gx-about-banner-h gx-about-banner-h--b" data-scene="b">
            <span className="gx-about-banner-line">
              <span>The only robotic</span>
            </span>
            <span className="gx-about-banner-line">
              <span>platform of this kind in WA</span>
            </span>
          </p>
        </div>

        <p className="gx-about-banner-cue" data-cue>
          Scroll to reveal
        </p>

        <div className="gx-about-banner-bar" aria-hidden>
          <span ref={fill} />
        </div>
      </div>
    </section>
  );
}
