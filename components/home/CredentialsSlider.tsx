"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { credentials } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

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

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CredentialsSlider() {
  const stage = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const marquee = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = stage.current;
    const copyEl = copy.current;
    const stackEl = stack.current;
    if (!root || !copyEl || !stackEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = [...stackEl.querySelectorAll<HTMLElement>(".gx-reel-panel")];
    const steps = [...root.querySelectorAll<HTMLElement>(".gx-reel-step")];
    const media = [...stackEl.querySelectorAll<HTMLElement>(".gx-reel-media")];
    const last = Math.max(slides.length - 1, 1);
    let shown = 0;
    let playing = -1;

    const kicker = copyEl.querySelector(".gx-reel-kicker");
    const title = copyEl.querySelector(".gx-reel-title");
    const body = copyEl.querySelector(".gx-reel-body");
    const count = copyEl.querySelector(".gx-reel-now");
    const mark = copyEl.querySelector(".gx-reel-mark");
    const cap = root.querySelector(".gx-reel-cap");
    const fillBar = root.querySelector<HTMLElement>(".gx-reel-fill");

    const fill = (index: number) => {
      const slide = slides[index];
      if (!slide) return;
      const n = pad(index + 1);
      if (kicker) kicker.textContent = slide.place;
      if (title) title.innerHTML = `<span>${slide.title}</span><span>${slide.title2}</span>`;
      if (body) body.textContent = slide.description;
      if (count) count.textContent = n;
      if (mark) mark.textContent = n;
      if (cap) cap.textContent = slide.place;
    };

    const syncMedia = (active: number) => {
      if (active === playing) return;
      playing = active;
      panels.forEach((panel, i) => {
        const vid = panel.querySelector("video");
        if (!vid) return;
        if (i === active) {
          if (vid.paused) void vid.play().catch(() => undefined);
        } else if (!vid.paused) {
          vid.pause();
        }
      });
    };

    const paint = (progress: number) => {
      const p = progress * last;
      const active = Math.max(0, Math.min(last, Math.round(p)));

      panels.forEach((panel, i) => {
        const abs = Math.abs(i - p);
        panel.style.opacity = String(Math.max(0, 1 - abs));
        panel.style.zIndex = String(10 + Math.round((1 - abs) * 10));
      });
      media.forEach((node, i) => {
        const abs = Math.abs(i - p);
        node.style.transform = `scale(${1.04 - Math.min(abs, 1) * 0.04})`;
      });
      steps.forEach((step, i) => {
        step.classList.toggle("is-on", i === active);
      });
      if (fillBar) fillBar.style.width = `${progress * 100}%`;
      copyEl.style.opacity = String(0.55 + (1 - Math.min(1, Math.abs(p - active) * 1.8)) * 0.45);

      if (active !== shown) {
        shown = active;
        fill(active);
      }
      syncMedia(active);
    };

    const goTo = (index: number, trigger: ScrollTrigger | null) => {
      if (!trigger) return;
      const next = Math.max(0, Math.min(1, index / last));
      window.scrollTo({
        top: trigger.start + next * (trigger.end - trigger.start),
        behavior: "smooth",
      });
    };

    fill(0);
    paint(0);

    if (reduce) {
      panels.forEach((panel, i) => {
        panel.style.opacity = i === 0 ? "1" : "0";
      });
      copyEl.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${slides.length * window.innerHeight * 0.7}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
        onRefresh: (self) => paint(self.progress),
      });

      steps.forEach((step, i) => {
        step.addEventListener("click", () => goTo(i, trigger));
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gx-reel" aria-labelledby="gx-reel-heading">
      <div
        ref={stage}
        className="gx-reel-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Grade X compliance credentials"
      >
        <div ref={copy} className="gx-reel-copy">
          <p className="gx-reel-mark" aria-hidden>
            01
          </p>
          <header className="gx-reel-top">
            <span>Compliance &amp; WHS</span>
            <p className="gx-reel-count">
              <span className="gx-reel-now">01</span>
              <span>/ {pad(slides.length)}</span>
            </p>
          </header>
          <div className="gx-reel-main">
            <p className="gx-reel-kicker">{slides[0]?.place}</p>
            <h2 id="gx-reel-heading" className="gx-reel-title">
              <span>{slides[0]?.title}</span>
              <span>{slides[0]?.title2}</span>
            </h2>
            <p className="gx-reel-body">{slides[0]?.description}</p>
            <Link href="/compliance" className="gx-reel-link">
              View credentials
            </Link>
          </div>
          <nav className="gx-reel-nav" aria-label="Credential chapters">
            <div className="gx-reel-steps">
              {slides.map((s, i) => (
                <button
                  key={`step-${s.title}-${i}`}
                  type="button"
                  className={`gx-reel-step${i === 0 ? " is-on" : ""}`}
                  aria-label={`${s.title} ${s.title2}`}
                >
                  <i />
                  <span>{pad(i + 1)}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div ref={stack} className="gx-reel-frame">
          {slides.map((s, i) => (
            <article
              key={`${s.title}-${i}`}
              className="gx-reel-panel"
              aria-label={credentials[i]?.title ?? `${s.title} ${s.title2}`}
            >
              {s.video ? (
                <video
                  className="gx-reel-media"
                  src={s.video}
                  poster={s.image}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="gx-reel-media" src={s.image} alt="" decoding="async" />
              )}
            </article>
          ))}
          <div className="gx-reel-veil" aria-hidden />
          <p className="gx-reel-cap">{slides[0]?.place}</p>
          <div className="gx-reel-progress" aria-hidden>
            <i className="gx-reel-fill" />
          </div>
        </div>
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
        {Array.from({ length: 2 }, (_, i) => (
          <CertPhrase key={`a-${i}`} />
        ))}
      </div>
      <div className="gx-cert-set" aria-hidden>
        {Array.from({ length: 2 }, (_, i) => (
          <CertPhrase key={`b-${i}`} />
        ))}
      </div>
    </div>
  );
}

function CertPhrase() {
  return (
    <span className="gx-cert-item">
      <span className="gx-cert-bot" aria-hidden>
        <video
          className="gx-cert-bot-media"
          src="/robot/platform-spin.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
        />
      </span>
      <span className="gx-cert-copy">Exact certificate wording is supplied by</span>
      <span className="gx-cert-brand">Grade X</span>
      <Link href="/compliance" className="gx-cert-link">
        Compliance &amp; WHS
      </Link>
      <span className="gx-cert-sep" aria-hidden>
        <i />
      </span>
    </span>
  );
}

function CertCursor({ host }: { host: React.RefObject<HTMLDivElement | null> }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hostEl = host.current;
    const cursor = el.current;
    if (!hostEl || !cursor) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    hostEl.classList.add("gx-cert-has-cursor");
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
      const rect = hostEl.getBoundingClientRect();
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

    hostEl.addEventListener("pointermove", onMove);
    hostEl.addEventListener("pointerleave", onLeave);
    return () => {
      hostEl.classList.remove("gx-cert-has-cursor");
      hostEl.removeEventListener("pointermove", onMove);
      hostEl.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [host]);

  return <div ref={el} className="gx-cert-cursor" aria-hidden />;
}
