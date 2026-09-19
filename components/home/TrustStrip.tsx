"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "@/components/ui/SectionHeading";
import { CoreParticles } from "@/components/home/CoreParticles";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  {
    n: "01",
    t: "Robotic exhaust cleaning platform",
    b: "Currently the only company in WA operating this technology.",
  },
  {
    n: "02",
    t: "Digital grease thickness gauge",
    b: "Instant, real-time micron readings, including technology such as the Teinnova Grasmeter.",
  },
  {
    n: "03",
    t: "Interior steam washing",
    b: "Professional-grade steam and extraction, reducing reliance on harsh chemicals.",
  },
  {
    n: "04",
    t: "Live video during the clean",
    b: "Plus before-and-after photographic evidence with every job.",
  },
];

export function TrustStrip() {
  const stage = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stageEl = stage.current;
    const copyEl = copy.current;
    const photoEl = photo.current;
    const videoEl = video.current;
    if (!stageEl || !copyEl || !photoEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stageEl.classList.add("is-in");
      stageEl.style.setProperty("--gx-wash", "1");
      return;
    }

    const rows = stageEl.querySelectorAll<HTMLElement>(".gx-core-spec");
    const cta = stageEl.querySelector<HTMLElement>(".gx-core-link");

    const ctx = gsap.context(() => {
      gsap.set(stageEl, { "--gx-wash": 0 });
      gsap.to(stageEl, {
        "--gx-wash": 1,
        ease: "none",
        scrollTrigger: {
          trigger: stageEl,
          start: "top 82%",
          end: "top 28%",
          scrub: 1.2,
        },
      });
      gsap.set(copyEl, {
        y: 80,
        autoAlpha: 0,
      });
      gsap.set(photoEl, {
        y: 90,
        scale: 0.92,
        autoAlpha: 0,
        transformOrigin: "center center",
      });
      const from = [
        { x: -42, y: -36 },
        { x: 42, y: -36 },
        { x: -42, y: 36 },
        { x: 42, y: 36 },
      ];
      rows.forEach((row, i) => {
        const origin = from[i] ?? { x: 0, y: 24 };
        gsap.set(row, { x: origin.x, y: origin.y, autoAlpha: 0 });
      });
      if (cta) gsap.set(cta, { y: 16, autoAlpha: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onStart: () => stageEl.classList.add("is-in"),
        onReverseComplete: () => stageEl.classList.remove("is-in"),
      });

      tl.to(copyEl, { y: 0, autoAlpha: 1, duration: 0.9 }, 0)
        .to(photoEl, { y: 0, scale: 1, autoAlpha: 1, duration: 1 }, 0.08)
        .to(
          rows,
          { x: 0, y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.12, ease: "power3.out" },
          0.42,
        )
        .to(cta, { y: 0, autoAlpha: 1, duration: 0.35 }, 0.55);

      ScrollTrigger.create({
        trigger: stageEl,
        start: "top 78%",
        end: "bottom 16%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeave: () => {
          stageEl.classList.remove("is-in");
          tl.pause(0);
        },
        onLeaveBack: () => {
          stageEl.classList.remove("is-in");
          tl.pause(0);
        },
      });
    }, stageEl);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const t = window.setTimeout(refresh, 400);

    let mediaIo: IntersectionObserver | undefined;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      const play = () => {
        void videoEl.play().catch(() => undefined);
      };
      mediaIo = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) play();
          else videoEl.pause();
        },
        { threshold: 0.2 },
      );
      mediaIo.observe(videoEl);
    }

    return () => {
      window.removeEventListener("resize", refresh);
      window.clearTimeout(t);
      mediaIo?.disconnect();
      videoEl?.pause();
      ctx.revert();
    };
  }, []);

  return (
      <section
        ref={stage}
        className="gx-depth gx-depth-stage gx-core"
        aria-labelledby="gx-core-heading"
      >
        <div className="gx-depth-wash" aria-hidden />
        <div className="gx-depth-glow gx-depth-glow--top" aria-hidden />
        <div className="gx-depth-glow gx-depth-glow--bottom" aria-hidden />
        <CoreParticles />

        <div className="gx-core-inner">
          <div ref={copy} className="gx-core-copy">
            <Kicker>Core differentiator</Kicker>
            <h2 id="gx-core-heading" className="gx-core-title">
              <span>Robotic kitchen</span>
              <span>exhaust cleaning</span>
              <span>technology.</span>
            </h2>
            <p className="gx-core-body">
              Grade X is currently the only company in WA operating robotic kitchen exhaust
              cleaning technology, a genuine, verifiable point of differentiation in a category
              most competitors service manually. Reference photos of the platform are shown
              here; a dedicated Technology page covers the system in full.
            </p>
            <Link href="/technology" className="gx-core-link">
              View technology
            </Link>
          </div>

          <div ref={photo} className="gx-core-bay">
            <div className="gx-core-orbit" aria-hidden />
            <div className="gx-core-orbit gx-core-orbit--slow" aria-hidden />
            <div className="gx-core-plinth">
              <video
                ref={video}
                src="/robot/platform-spin.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                controls={false}
                className="gx-core-video"
                aria-label="Grade X robotic kitchen exhaust cleaning platform"
              />
              <p className="gx-core-stamp">Only in WA</p>
            </div>
            <ol className="gx-core-specs">
              {specs.map((s) => (
                <li key={s.n} className="gx-core-spec">
                  <i className="gx-core-spec-line" aria-hidden />
                  <div className="gx-core-spec-card">
                    <i className="gx-core-spec-wash" aria-hidden />
                    <span>{s.n}</span>
                    <strong>{s.t}</strong>
                    <p>{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
}
