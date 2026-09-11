"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { credentials } from "@/lib/content";

type Slide = {
  place: string;
  title: string;
  title2: string;
  description: string;
  image: string;
  video?: string;
};

const slides: Slide[] = [
  {
    place: "Insurance",
    title: "Public",
    title2: "liability",
    description: credentials[0]?.body ?? "",
    image: "/slides/plant-flange.jpg",
    video: "/robot/crawler.mp4",
  },
  {
    place: "Insurance",
    title: "Workers",
    title2: "compensation",
    description: credentials[1]?.body ?? "",
    image: "/slides/kitchen-hood.jpg",
  },
  {
    place: "Food-safe practice",
    title: "Food-safe",
    title2: "practices",
    description: credentials[2]?.body ?? "",
    image: "/slides/exploded-bench.jpg",
  },
  {
    place: "WHS",
    title: "WHS",
    title2: "safe work",
    description: credentials[3]?.body ?? "",
    image: "/slides/weir-wash.jpg",
  },
  {
    place: "Certifications",
    title: "Staff",
    title2: "certifications",
    description: credentials[4]?.body ?? "",
    image: "/slides/tunnel-spray.jpg",
  },
  {
    place: "Quality control",
    title: "ISO-focused",
    title2: "quality control",
    description: credentials[5]?.body ?? "",
    image: "/slides/duct-live.jpg",
  },
  {
    place: "Technology",
    title: "Robotic",
    title2: "kitchen exhaust",
    description:
      "Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology.",
    image: "/slides/cylinder-brush.jpg",
  },
];

const HOLD = 4.4;
const MOVE = 1.05;
const EASE = "power3.inOut";

type Metrics = {
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  numberSize: number;
  progressWidth: number;
};

function measure(el: HTMLElement): Metrics {
  const width = el.clientWidth;
  const height = el.clientHeight;
  const compact = width < 980;
  const cardWidth = compact ? 118 : 200;
  const cardHeight = compact ? 176 : 300;
  const gap = compact ? 14 : 40;
  const progressWidth = compact ? Math.max(120, Math.min(500, width - 200)) : 500;
  el.style.setProperty("--gx-stage-w", `${width}px`);
  el.style.setProperty("--gx-stage-h", `${height}px`);
  return {
    width,
    height,
    cardWidth,
    cardHeight,
    gap,
    numberSize: 50,
    progressWidth,
    offsetTop: height - (compact ? 270 : 430),
    offsetLeft: compact ? 20 : Math.max(24, width - 830),
  };
}

function tween(target: gsap.TweenTarget, vars: gsap.TweenVars) {
  return new Promise<void>((resolve) => {
    const empty = target == null || (Array.isArray(target) && target.length === 0);
    if (empty) {
      resolve();
      return;
    }
    gsap.to(target, { overwrite: "auto", ...vars, onComplete: resolve });
  });
}

export function CredentialsSlider() {
  const root = useRef<HTMLElement>(null);
  const marquee = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = root.current;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (sel: string) => stage.querySelector(sel) as HTMLElement | null;
    const card = (i: number) => q(`#gx-card-${i}`);
    const content = (i: number) => q(`#gx-card-content-${i}`);
    const num = (i: number) => q(`#gx-slide-item-${i}`);

    let order = slides.map((_, i) => i);
    let detailsEven = true;
    let m = measure(stage);
    let alive = true;
    let inView = false;
    let moving = false;
    let queued: 1 | -1 | null = null;
    let holdTl: gsap.core.Timeline | null = null;
    let holdResolve: (() => void) | null = null;
    let extraCleanup = () => {};
    let runStarted = false;

    const ctx = gsap.context(() => {
      function detailsSel(active: boolean) {
        const even = active ? detailsEven : !detailsEven;
        return even ? "#gx-details-even" : "#gx-details-odd";
      }

      function detailsKids(sel: string, group: "all" | "titles" | "copy" = "all") {
        const node = q(sel);
        if (!node) return [];
        const titles = [
          node.querySelector(".text"),
          node.querySelector(".title-1"),
          node.querySelector(".title-2"),
        ];
        const copy = [node.querySelector(".desc"), node.querySelector(".cta")];
        if (group === "titles") return titles.filter(Boolean);
        if (group === "copy") return copy.filter(Boolean);
        return [...titles, ...copy].filter(Boolean);
      }

      function fillDetails(sel: string, index: number) {
        const slide = slides[index];
        if (!slide) return;
        const node = q(sel);
        if (!node) return;
        const text = node.querySelector(".text");
        const t1 = node.querySelector(".title-1");
        const t2 = node.querySelector(".title-2");
        const desc = node.querySelector(".desc");
        if (text) text.textContent = slide.place;
        if (t1) t1.textContent = slide.title;
        if (t2) t2.textContent = slide.title2;
        if (desc) desc.textContent = slide.description;
      }

      function placeRest(rest: number[], fromRight: boolean) {
        rest.forEach((i, index) => {
          const x = m.offsetLeft + index * (m.cardWidth + m.gap);
          gsap.set(card(i), {
            x: fromRight ? x + 400 : x,
            y: m.offsetTop,
            width: m.cardWidth,
            height: m.cardHeight,
            zIndex: 30,
            borderRadius: 10,
            autoAlpha: 1,
          });
          gsap.set(content(i), {
            x: fromRight ? x + 400 : x,
            y: m.offsetTop + m.cardHeight - 100,
            autoAlpha: 1,
            zIndex: 40,
          });
          gsap.set(num(i), { x: (index + 1) * m.numberSize });
        });
      }

      function placeDock() {
        const dock = q(".gx-timed-dock");
        if (!dock) return;
        const restCount = Math.max(order.length - 1, 1);
        gsap.set(dock, {
          x: m.offsetLeft - 28,
          y: m.offsetTop - 24,
          width: restCount * (m.cardWidth + m.gap) - m.gap + 56,
          height: m.cardHeight + 96,
        });
      }

      function syncMedia() {
        const active = order[0];
        slides.forEach((_, i) => {
          const media = card(i)?.querySelector("video");
          if (!media) return;
          if (i === active && inView) {
            if (media.paused) void media.play().catch(() => undefined);
          } else if (!media.paused) {
            media.pause();
          }
        });
      }

      function layoutStatic(opening = false) {
        m = measure(stage);
        const [active, ...rest] = order;
        const detailsActive = detailsSel(true);
        const detailsInactive = detailsSel(false);

        gsap.set("#gx-pagination", {
          top: m.offsetTop + (m.cardHeight + 30),
          left: m.offsetLeft,
          y: opening ? 200 : 0,
          opacity: opening ? 0 : 1,
          zIndex: 60,
        });
        gsap.set(card(active), {
          x: 0,
          y: 0,
          width: m.width,
          height: m.height,
          borderRadius: 0,
          autoAlpha: 1,
          zIndex: 10,
        });
        gsap.set(content(active), { autoAlpha: 0 });
        gsap.set(num(active), { x: 0 });
        gsap.set(detailsActive, {
          opacity: opening ? 0 : 1,
          zIndex: 26,
          x: opening ? -80 : 0,
        });
        gsap.set(detailsKids(detailsActive), { y: 0 });
        gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
        gsap.set(detailsKids(detailsInactive, "titles"), { y: 80 });
        gsap.set(detailsKids(detailsInactive, "copy"), { y: 40 });
        gsap.set(".gx-timed-progress-track", { width: m.progressWidth });
        placeRest(rest, opening);
        placeDock();
        syncMedia();
      }

      async function step(dir: 1 | -1) {
        if (dir === 1) {
          const first = order.shift();
          if (first !== undefined) order.push(first);
        } else {
          const last = order.pop();
          if (last !== undefined) order.unshift(last);
        }

        detailsEven = !detailsEven;
        const detailsActive = detailsSel(true);
        const detailsInactive = detailsSel(false);
        const [active, ...rest] = order;
        const prv = dir === 1 ? rest[rest.length - 1] : rest[0];
        if (active === undefined || prv === undefined) return;

        fillDetails(detailsActive, active);
        syncMedia();

        gsap.set(detailsActive, { zIndex: 26, opacity: 0 });
        gsap.set(detailsInactive, { zIndex: 12 });
        gsap.set(detailsKids(detailsActive), { y: 16, opacity: 0 });
        gsap.set(card(active), { zIndex: 10 });
        gsap.set(card(prv), { zIndex: 8 });

        const xPrv =
          m.offsetLeft + (dir === 1 ? rest.length - 1 : 0) * (m.cardWidth + m.gap);

        const jobs = [
          tween(card(active), {
            x: 0,
            y: 0,
            width: m.width,
            height: m.height,
            borderRadius: 0,
            autoAlpha: 1,
            duration: MOVE,
            ease: EASE,
          }),
          tween(content(active), { autoAlpha: 0, duration: 0.28, ease: EASE }),
          tween(card(prv), {
            x: xPrv,
            y: m.offsetTop,
            width: m.cardWidth,
            height: m.cardHeight,
            borderRadius: 10,
            autoAlpha: 1,
            duration: MOVE,
            ease: EASE,
          }),
          tween(content(prv), {
            x: xPrv,
            y: m.offsetTop + m.cardHeight - 100,
            autoAlpha: 1,
            duration: MOVE,
            ease: EASE,
          }),
          tween(num(active), { x: 0, duration: MOVE, ease: EASE }),
          tween(num(prv), {
            x: (dir === 1 ? rest.length : 1) * m.numberSize,
            duration: MOVE,
            ease: EASE,
          }),
          tween(detailsInactive, { opacity: 0, duration: 0.35, ease: "power2.out" }),
          tween(detailsActive, { opacity: 1, duration: 0.55, delay: 0.08, ease: "power2.out" }),
          tween(detailsKids(detailsActive, "titles"), {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.1,
            stagger: 0.09,
            ease: "power2.out",
          }),
          tween(detailsKids(detailsActive, "copy"), {
            y: 0,
            opacity: 1,
            duration: 0.65,
            delay: 0.22,
            stagger: 0.08,
            ease: "power2.out",
          }),
        ];

        rest.forEach((i, index) => {
          if (i === prv) return;
          const xNew = m.offsetLeft + index * (m.cardWidth + m.gap);
          gsap.set(card(i), { zIndex: 30 });
          jobs.push(
            tween(card(i), {
              x: xNew,
              y: m.offsetTop,
              width: m.cardWidth,
              height: m.cardHeight,
              autoAlpha: 1,
              duration: MOVE,
              delay: 0.04 * (index + 1),
              ease: EASE,
            }),
          );
          jobs.push(
            tween(content(i), {
              x: xNew,
              y: m.offsetTop + m.cardHeight - 100,
              autoAlpha: 1,
              duration: MOVE,
              delay: 0.04 * (index + 1),
              ease: EASE,
            }),
          );
          jobs.push(tween(num(i), { x: (index + 1) * m.numberSize, duration: MOVE, ease: EASE }));
        });

        await Promise.all(jobs);
        gsap.set(card(active), { zIndex: 10 });
        gsap.set(card(prv), { zIndex: 30 });
        gsap.set(detailsActive, { zIndex: 26, opacity: 1 });
        gsap.set(detailsKids(detailsActive), { y: 0, opacity: 1 });
        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(detailsKids(detailsInactive), { y: 16, opacity: 0 });
        placeDock();
        syncMedia();
      }

      function finishHold() {
        holdTl?.kill();
        holdTl = null;
        const done = holdResolve;
        holdResolve = null;
        done?.();
      }

      function playHold() {
        return new Promise<void>((resolve) => {
          holdResolve = resolve;
          const bar = q(".gx-timed-indicator");
          const fill = q(".gx-timed-progress-fill");
          gsap.set(bar, { x: 0, scaleX: 0, transformOrigin: "left center" });
          gsap.set(fill, { width: 0 });
          holdTl = gsap.timeline({ onComplete: finishHold });
          holdTl.to(bar, { scaleX: 1, duration: HOLD, ease: "none" }, 0);
          holdTl.to(fill, { width: m.progressWidth, duration: HOLD, ease: "none" }, 0);
        });
      }

      async function run() {
        while (alive) {
          if (reduce) break;
          if (!inView) {
            finishHold();
            await new Promise((r) => window.setTimeout(r, 280));
            continue;
          }
          if (queued == null) await playHold();
          if (!alive) break;
          if (!inView) continue;
          const dir = queued ?? 1;
          queued = null;
          moving = true;
          finishHold();
          gsap.set(".gx-timed-indicator", { scaleX: 0 });
          await step(dir);
          moving = false;
        }
      }

      function request(dir: 1 | -1) {
        if (reduce) return;
        queued = dir;
        if (moving) return;
        finishHold();
      }

      function init() {
        slides.forEach((s) => {
          const preload = new Image();
          preload.src = s.image;
        });
        const [active, ...rest] = order;
        fillDetails("#gx-details-even", active ?? 0);
        fillDetails("#gx-details-odd", rest[0] ?? 0);
        layoutStatic(true);
        gsap.set(".gx-timed-indicator", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".gx-timed-cover", { x: 0 });

        if (reduce) {
          gsap.set(".gx-timed-cover", { autoAlpha: 0 });
          gsap.set("#gx-pagination", { y: 0, opacity: 1 });
          gsap.set("#gx-details-even", { opacity: 1, x: 0 });
          placeRest(rest, false);
          return;
        }

        const startDelay = 0.35;
        gsap.to(".gx-timed-cover", {
          x: m.width + 400,
          delay: 0.15,
          duration: 0.7,
          ease: EASE,
        });
        rest.forEach((i, index) => {
          const x = m.offsetLeft + index * (m.cardWidth + m.gap);
          gsap.to(card(i), { x, duration: 0.85, delay: startDelay + 0.05 * index, ease: EASE });
          gsap.to(content(i), { x, duration: 0.85, delay: startDelay + 0.05 * index, ease: EASE });
        });
        gsap.to("#gx-pagination", { y: 0, opacity: 1, duration: 0.85, ease: EASE, delay: startDelay });
        gsap.to("#gx-details-even", { opacity: 1, x: 0, duration: 0.85, ease: EASE, delay: startDelay });
      }

      q(".gx-timed-prev")?.addEventListener("click", () => request(-1));
      q(".gx-timed-next")?.addEventListener("click", () => request(1));
      slides.forEach((_, i) => {
        card(i)?.addEventListener("click", () => {
          if (order.indexOf(i) <= 0) return;
          request(1);
        });
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          inView = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.2);
          syncMedia();
          if (inView && !runStarted && !reduce) {
            runStarted = true;
            window.setTimeout(() => {
              if (alive) void run();
            }, 900);
          }
          if (!inView) finishHold();
        },
        { threshold: [0, 0.2, 0.5], rootMargin: "80px 0px" },
      );
      io.observe(stage);

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          if (!alive || moving) return;
          layoutStatic(false);
        }, 160);
      };
      window.addEventListener("resize", onResize);

      init();

      extraCleanup = () => {
        finishHold();
        io.disconnect();
        window.removeEventListener("resize", onResize);
        window.clearTimeout(resizeTimer);
      };
    }, stage);

    return () => {
      alive = false;
      extraCleanup();
      ctx.revert();
    };
  }, []);

  const first = slides[0];

  return (
    <section className="gx-timed" aria-labelledby="gx-timed-heading">
      <h2 id="gx-timed-heading" className="sr-only">
        Insurance, WHS and food-safe practice.
      </h2>
      <div
        ref={root}
        className="gx-timed-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Grade X compliance credentials"
      >
        <InspectCursor host={root} />
        <div className="gx-timed-indicator" aria-hidden />

        {slides.map((s, i) => (
          <article
            key={`card-${s.title}-${i}`}
            id={`gx-card-${i}`}
            className="gx-timed-card"
            aria-label={credentials[i]?.title ?? `${s.title} ${s.title2}`}
          >
            {s.video ? (
              <video
                src={s.video}
                poster={s.image}
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={s.image} alt="" decoding="async" />
            )}
          </article>
        ))}

        {slides.map((s, i) => (
          <div
            key={`content-${s.title}-${i}`}
            id={`gx-card-content-${i}`}
            className="gx-timed-card-content"
          >
            <div className="content-start" />
            <div className="content-place">{s.place}</div>
            <div className="content-title-1">{s.title}</div>
            <div className="content-title-2">{s.title2}</div>
          </div>
        ))}

        <div className="gx-timed-wash" aria-hidden />
        <div className="gx-timed-dock" aria-hidden />

        <DetailsPanel id="gx-details-even" slide={first} />
        <DetailsPanel id="gx-details-odd" slide={first} />

        <div className="gx-timed-pagination" id="gx-pagination">
          <button type="button" className="gx-timed-arrow gx-timed-prev" aria-label="Previous credential">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button type="button" className="gx-timed-arrow gx-timed-next" aria-label="Next credential">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="gx-timed-progress">
            <div className="gx-timed-progress-track">
              <div className="gx-timed-progress-fill" />
            </div>
          </div>
          <div className="gx-timed-numbers" id="gx-slide-numbers">
            {slides.map((_, i) => (
              <div key={i} className="item" id={`gx-slide-item-${i}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="gx-timed-cover" aria-hidden />
      </div>

      <div ref={marquee} className="gx-cert-marquee">
        <CertCursor host={marquee} />
        <p className="sr-only">
          Exact certificate wording is supplied by Grade X. Compliance and WHS.
        </p>
        <CertTrack />
      </div>
    </section>
  );
}

function CertTrack() {
  return (
    <div className="gx-cert-track">
      <div className="gx-cert-set">
        {Array.from({ length: 4 }, (_, i) => (
          <CertPhrase key={`a-${i}`} />
        ))}
      </div>
      <div className="gx-cert-set" aria-hidden>
        {Array.from({ length: 4 }, (_, i) => (
          <CertPhrase key={`b-${i}`} />
        ))}
      </div>
    </div>
  );
}

function CertPhrase() {
  return (
    <span className="gx-cert-item">
      <span className="gx-cert-copy">Exact certificate wording is supplied by</span>
      <span className="gx-cert-brand">Grade X</span>
      <span className="gx-cert-rule" aria-hidden />
      <Link href="/compliance" className="gx-cert-link">
        Compliance &amp; WHS
      </Link>
    </span>
  );
}

function CertCursor({ host }: { host: React.RefObject<HTMLElement | null> }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = host.current;
    const cursor = el.current;
    if (!stage || !cursor) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stage.classList.add("gx-cert-has-cursor");
    let mx = 0;
    let my = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let hovering = false;

    const tick = () => {
      if (!hovering) {
        raf = 0;
        return;
      }
      x += (mx - x) * 0.22;
      y += (my - y) * 0.22;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      hovering = true;
      cursor.classList.add("is-on");
      cursor.classList.toggle("is-hot", Boolean((e.target as HTMLElement | null)?.closest("a")));
      if (!raf) raf = window.requestAnimationFrame(tick);
    };
    const onLeave = () => {
      hovering = false;
      cursor.classList.remove("is-on", "is-hot");
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.classList.remove("gx-cert-has-cursor");
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [host]);

  return (
    <div ref={el} className="gx-cert-cursor" aria-hidden />
  );
}

function InspectCursor({ host }: { host: React.RefObject<HTMLElement | null> }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = host.current;
    const cursor = el.current;
    if (!stage || !cursor) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stage.classList.add("gx-timed-has-cursor");
    let mx = stage.clientWidth / 2;
    let my = stage.clientHeight / 2;
    let x = mx;
    let y = my;
    let raf = 0;
    let hovering = false;

    const tick = () => {
      if (!hovering) {
        raf = 0;
        return;
      }
      x += (mx - x) * 0.16;
      y += (my - y) * 0.16;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      cursor.classList.add("is-on");
      const hot = (e.target as HTMLElement | null)?.closest("a, button, .gx-timed-card");
      cursor.classList.toggle("is-hot", Boolean(hot));
      hovering = true;
      if (!raf) raf = window.requestAnimationFrame(tick);
    };
    const onLeave = () => {
      hovering = false;
      cursor.classList.remove("is-on", "is-hot");
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      stage.classList.remove("gx-timed-has-cursor");
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [host]);

  return (
    <div ref={el} className="gx-cursor" aria-hidden>
      <span className="gx-cursor-ring" />
      <span className="gx-cursor-ticks" />
      <span className="gx-cursor-dot" />
    </div>
  );
}

function DetailsPanel({
  id,
  slide,
}: {
  id: string;
  slide: Slide | undefined;
}) {
  if (!slide) return null;
  return (
    <div className="gx-timed-details" id={id}>
      <div className="place-box">
        <div className="text">{slide.place}</div>
      </div>
      <div className="gx-timed-headline">
        <div className="title-box-1">
          <div className="title-1">{slide.title}</div>
        </div>
        <div className="title-box-2">
          <div className="title-2">{slide.title2}</div>
        </div>
      </div>
      <div className="desc">{slide.description}</div>
      <div className="cta">
        <Link href="/contact" className="bookmark" aria-label="Request a quote">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link href="/compliance" className="discover">
          Compliance &amp; WHS
        </Link>
      </div>
    </div>
  );
}
