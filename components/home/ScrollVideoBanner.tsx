"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play, Scan } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function stamp(seconds: number) {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ScrollVideoBanner() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const clockEl = useRef<HTMLSpanElement>(null);
  const lengthEl = useRef<HTMLSpanElement>(null);
  const pctEl = useRef<HTMLSpanElement>(null);
  const target = useRef(0);
  const auto = useRef(true);
  const [loopOn, setLoopOn] = useState(true);

  useLayoutEffect(() => {
    const section = root.current;
    const el = video.current;
    const introEl = intro.current;
    const cardEl = card.current;
    if (!section || !el || !introEl || !cardEl) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.loop = true;
    const startPlay = () => {
      void el.play().catch(() => undefined);
    };
    if (el.readyState >= 2) startPlay();
    else el.addEventListener("canplay", startPlay, { once: true });

    let visible = true;
    let hudAt = 0;
    const paint = (now: number) => {
      const dur = el.duration || 0;
      if (!dur || Number.isNaN(dur)) return;
      if (!auto.current) {
        const gap = target.current - el.currentTime;
        if (Math.abs(gap) > 0.04) el.currentTime += 0.35 * gap;
        else el.currentTime = target.current;
      }
      if (now - hudAt < 160) return;
      hudAt = now;
      const i = Math.min(100, Math.round((el.currentTime / dur) * 100));
      if (bar.current) bar.current.style.width = `${i}%`;
      if (clockEl.current) clockEl.current.textContent = stamp(el.currentTime);
      if (lengthEl.current) lengthEl.current.textContent = stamp(dur);
      if (pctEl.current) pctEl.current.textContent = `${i}%`;
    };

    let raf = 0;
    const tick = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      paint(now);
      raf = window.requestAnimationFrame(tick);
    };
    const startTick = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (!visible) {
          el.pause();
          return;
        }
        if (auto.current) void el.play().catch(() => undefined);
        startTick();
      },
      { threshold: 0.12 },
    );
    io.observe(section);
    startTick();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      auto.current = true;
      setLoopOn(true);
      el.loop = true;
      startPlay();
      return () => {
        el.removeEventListener("canplay", startPlay);
        io.disconnect();
        window.cancelAnimationFrame(raf);
      };
    }

    const pinEnd = "+=280%";

    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: pinEnd,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (auto.current || !el.duration || Number.isNaN(el.duration)) return;
        target.current = self.progress * el.duration;
      },
    });

    gsap.set(introEl, { autoAlpha: 1, y: 0, scale: 1 });
    gsap.set(cardEl, { autoAlpha: 0, y: 48, scale: 0.92 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: pinEnd,
        scrub: 1,
      },
    });
    tl.to(
      introEl,
      { autoAlpha: 0, y: -80, scale: 0.95, duration: 0.16, ease: "power2.in" },
      0.04,
    );
    tl.fromTo(
      cardEl,
      { autoAlpha: 0, y: 48, scale: 0.92 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.12, ease: "power2.out", immediateRender: false },
      0.22,
    );
    tl.to(cardEl, { autoAlpha: 0, y: -36, scale: 0.96, duration: 0.1, ease: "power2.in" }, 0.68);

    return () => {
      el.removeEventListener("canplay", startPlay);
      io.disconnect();
      window.cancelAnimationFrame(raf);
      tl.kill();
      pin.kill();
      el.pause();
    };
  }, []);

  const toggleLoop = () => {
    const el = video.current;
    if (!el) return;
    if (auto.current) {
      el.pause();
      el.loop = false;
      auto.current = false;
      setLoopOn(false);
      return;
    }
    el.loop = true;
    auto.current = true;
    setLoopOn(true);
    void el.play().catch(() => undefined);
  };

  return (
    <section ref={root} className="gx-hero" aria-label="Grade X robotic crawler">
      <div className="gx-hero-media">
        <video
          ref={video}
          src="/hero/banner.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
          className="gx-hero-video"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-hud">
        <p className="gx-hero-hud-left">Robotic crawler // live inspection</p>
        <div className="gx-hero-hud-right">
          <div className="gx-hero-hud-meta">
            <span>
              Timecode <b><span ref={clockEl}>00:00</span> / <span ref={lengthEl}>00:00</span></b>
            </span>
            <span>
              Mode <b>{loopOn ? "Autoplay loop" : "Scroll-driven"}</b>
            </span>
            <span>
              Progress <b><span ref={pctEl}>0%</span></b>
            </span>
          </div>
          <button type="button" className={`gx-hero-hud-play${loopOn ? " is-on" : ""}`} onClick={toggleLoop}>
            {loopOn ? <Pause strokeWidth={2} /> : <Play strokeWidth={2} />}
            {loopOn ? "Switch to scroll-lock" : "Enable autoplay"}
          </button>
        </div>
      </div>

      <div ref={intro} className="gx-hero-copy">
        <p className="gx-hero-kicker">Western Australia&apos;s only robotic kitchen exhaust specialist</p>
        <h1 className="gx-hero-title">
          <span>Precision. Technology.</span>
          <span>Compliance.</span>
        </h1>
        <p className="gx-hero-body">
          Advanced equipment and proven methodology for professional commercial kitchen exhaust
          cleaning.
        </p>
        <div className="gx-hero-actions">
          <Link href="/contact" className="gx-hero-cta-gold">
            Request a quote
            <ArrowRight strokeWidth={2} />
          </Link>
          <Link href="/technology" className="gx-hero-ghost">
            <Scan strokeWidth={2} />
            Inspect the crawler
          </Link>
        </div>
      </div>

      <div ref={card} className="gx-hero-card">
        <div className="gx-hero-card-box">
          <p className="gx-hero-card-kicker">
            <span className="gx-hero-card-dot" aria-hidden />
            Live inspection in progress
          </p>
          <h2>Interior cleaning, digitally verified</h2>
          <p>
            Digital grease-thickness readings before and after every clean, live video during robotic
            jobs, and photographic evidence in the job file.
          </p>
          <dl className="gx-hero-card-stats">
            <div>
              <dt>Pre-clean baseline</dt>
              <dd>Micron gauge</dd>
            </div>
            <div>
              <dt>Post-clean record</dt>
              <dd>Same-point test</dd>
            </div>
            <div>
              <dt>Job evidence</dt>
              <dd>Photos + video</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="gx-hero-cue">
        <span>Scroll to pilot the inspection feed</span>
        <div className="gx-hero-cue-track">
          <span ref={bar} className="gx-hero-cue-fill" />
        </div>
      </div>
    </section>
  );
}
