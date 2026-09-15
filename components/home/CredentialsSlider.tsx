"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { credentials } from "@/lib/content";

type Slide = {
  place: string;
  tag: string;
  title: string;
  title2: string;
  description: string;
  image: string;
  video?: string;
};

const slides: Slide[] = [
  {
    place: "Insurance",
    tag: "Public liability",
    title: "Public",
    title2: "liability",
    description: credentials[0]?.body ?? "",
    image: "/slides/plant-flange.jpg",
  },
  {
    place: "Insurance",
    tag: "Workers comp",
    title: "Workers",
    title2: "compensation",
    description: credentials[1]?.body ?? "",
    image: "/slides/kitchen-hood.jpg",
  },
  {
    place: "Food-safe practice",
    tag: "Food-safe",
    title: "Food-safe",
    title2: "practices",
    description: credentials[2]?.body ?? "",
    image: "/slides/exploded-bench.jpg",
  },
  {
    place: "WHS",
    tag: "Safe work",
    title: "WHS",
    title2: "safe work",
    description: credentials[3]?.body ?? "",
    image: "/slides/weir-wash.jpg",
  },
  {
    place: "Certifications",
    tag: "Staff certs",
    title: "Staff",
    title2: "certifications",
    description: credentials[4]?.body ?? "",
    image: "/slides/tunnel-spray.jpg",
  },
  {
    place: "Quality control",
    tag: "ISO quality",
    title: "ISO-focused",
    title2: "quality control",
    description: credentials[5]?.body ?? "",
    image: "/slides/duct-live.jpg",
  },
  {
    place: "Technology",
    tag: "Robotic",
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

  useEffect(() => {
    const root = stage.current;
    const copyEl = copy.current;
    const stackEl = stack.current;
    if (!root || !copyEl || !stackEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = root.querySelector<HTMLElement>(".gx-vault-space");
    const panels = [...stackEl.querySelectorAll<HTMLElement>(".gx-vault-shot")];
    const steps = [...root.querySelectorAll<HTMLElement>(".gx-vault-chip")];
    const media = [...stackEl.querySelectorAll<HTMLElement>(".gx-vault-media")];
    const shines = [...stackEl.querySelectorAll<HTMLElement>(".gx-vault-shine")];
    const n = slides.length;
    const kicker = copyEl.querySelector(".gx-vault-kicker");
    const title = copyEl.querySelector(".gx-vault-title");
    const body = copyEl.querySelector(".gx-vault-body");
    const count = root.querySelector(".gx-vault-now");
    const fillBar = root.querySelector<HTMLElement>(".gx-vault-fill");
    const mouse = { x: 0.5, y: 0.5 };
    const look = { x: 0.5, y: 0.5 };
    const drag = { on: false, sx: 0, start: 0, moved: 0 };
    let shown = 0;
    let playing = -1;
    let target = 0;
    let pos = 0;
    let dwell = 0;
    let live = true;
    let raf = 0;
    let last = performance.now();
    const DWELL = 5000;

    const wrap = (i: number, p: number) => {
      let o = i - p;
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      return o;
    };

    const fill = (index: number) => {
      const slide = slides[index];
      if (!slide) return;
      const num = pad(index + 1);
      copyEl.classList.remove("is-swap");
      void copyEl.offsetWidth;
      copyEl.classList.add("is-swap");
      if (kicker) kicker.textContent = slide.place;
      if (title) title.innerHTML = `<span>${slide.title}</span> <em>${slide.title2}</em>`;
      if (body) body.textContent = slide.description;
      if (count) count.textContent = num;
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

    const paint = () => {
      const mobile = window.matchMedia("(max-width: 899px)").matches;
      const active = ((Math.round(pos) % n) + n) % n;
      const t = last * 0.001;
      look.x += (mouse.x - look.x) * 0.12;
      look.y += (mouse.y - look.y) * 0.12;
      const steerX = (0.5 - look.y) * (mobile ? 6 : 14);
      const steerY = (look.x - 0.5) * (mobile ? 8 : 22);
      const idleX = Math.sin(t * 0.72) * 7.5 + Math.sin(t * 0.23) * 2;
      const idleY = Math.cos(t * 0.5) * 11;
      const floatY = Math.sin(t * 0.62) * 12;
      stackEl.style.transform = `translate3d(0, ${floatY}px, 0) rotateX(${idleX + steerX}deg) rotateY(${idleY + steerY}deg)`;

      panels.forEach((panel, i) => {
        const o = wrap(i, pos);
        const abs = Math.abs(o);
        panel.style.visibility = abs < 1.05 ? "visible" : "hidden";
        panel.style.zIndex = String(20 - Math.round(abs * 10));
        panel.classList.toggle("is-on", i === active);
        panel.style.opacity = abs > 0.92 ? String(Math.max(0, 1 - (abs - 0.92) / 0.13)) : "1";
        panel.style.transform = `translate3d(${o * 112}%, 0, ${-abs * 60}px) rotateY(${o * -9}deg)`;
      });

      media.forEach((node, i) => {
        const abs = Math.abs(wrap(i, pos));
        if (abs > 1.05) return;
        const px = (look.x - 0.5) * -22;
        const py = (look.y - 0.5) * -16;
        const zoom = 1.18 + Math.sin(t * 0.42) * 0.05;
        node.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${zoom})`;
      });

      shines.forEach((node) => {
        node.style.transform = `translate3d(${(look.x - 0.5) * 36}%, ${(look.y - 0.5) * 20}%, 0)`;
      });

      steps.forEach((step, i) => step.classList.toggle("is-on", i === active));
      if (fillBar) fillBar.style.width = `${Math.min(1, dwell / DWELL) * 100}%`;

      if (active !== shown) {
        shown = active;
        fill(active);
      }
      syncMedia(active);
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (live && !reduce && !drag.on) {
        dwell += dt * 1000;
        if (dwell >= DWELL) {
          dwell = 0;
          target = (target + 1) % n;
        }
      }
      let delta = target - pos;
      if (delta > n / 2) delta -= n;
      if (delta < -n / 2) delta += n;
      pos += delta * Math.min(1, dt * (drag.on ? 10 : 2.8));
      if (pos < 0) pos += n;
      if (pos >= n) pos -= n;
      paint();
      raf = requestAnimationFrame(tick);
    };

    const go = (index: number) => {
      target = ((index % n) + n) % n;
      dwell = 0;
    };

    fill(0);
    paint();

    if (reduce) {
      panels.forEach((panel, i) => {
        panel.style.opacity = i === 0 ? "1" : "0";
        panel.style.visibility = i === 0 ? "visible" : "hidden";
        panel.style.transform = "none";
      });
      stackEl.style.transform = "none";
      return;
    }

    const onStep = steps.map((step, i) => {
      const fn = () => go(i);
      step.addEventListener("click", fn);
      return () => step.removeEventListener("click", fn);
    });

    const onMove = (event: PointerEvent) => {
      if (!frame) return;
      const box = frame.getBoundingClientRect();
      mouse.x = (event.clientX - box.left) / Math.max(1, box.width);
      mouse.y = (event.clientY - box.top) / Math.max(1, box.height);
      if (!drag.on) return;
      const dx = event.clientX - drag.sx;
      drag.moved += Math.abs(event.movementX) + Math.abs(event.movementY);
      target = drag.start - dx / Math.max(1, box.width / 1.1);
      dwell = 0;
    };
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0 || !frame) return;
      drag.on = true;
      drag.sx = event.clientX;
      drag.start = target;
      drag.moved = 0;
      frame.classList.add("is-grabbing");
      frame.setPointerCapture(event.pointerId);
    };
    const onUp = (event: PointerEvent) => {
      if (!drag.on || !frame) return;
      drag.on = false;
      frame.classList.remove("is-grabbing");
      if (frame.hasPointerCapture(event.pointerId)) {
        frame.releasePointerCapture(event.pointerId);
      }
      if (drag.moved < 10) {
        go((shown + 1) % n);
        return;
      }
      go(Math.round(target));
    };
    const onLeave = () => {
      if (drag.on) return;
      mouse.x = 0.5;
      mouse.y = 0.5;
    };

    frame?.addEventListener("pointermove", onMove);
    frame?.addEventListener("pointerdown", onDown);
    frame?.addEventListener("pointerup", onUp);
    frame?.addEventListener("pointercancel", onUp);
    frame?.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        live = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.28 },
    );
    io.observe(root);
    raf = requestAnimationFrame(tick);

    return () => {
      live = false;
      io.disconnect();
      onStep.forEach((off) => off());
      frame?.removeEventListener("pointermove", onMove);
      frame?.removeEventListener("pointerdown", onDown);
      frame?.removeEventListener("pointerup", onUp);
      frame?.removeEventListener("pointercancel", onUp);
      frame?.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="gx-vault" aria-labelledby="gx-vault-heading">
      <div
        ref={stage}
        className="gx-vault-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Grade X compliance credentials"
      >
        <header className="gx-vault-bar">
          <span>Compliance &amp; WHS</span>
          <p className="gx-vault-count">
            <span className="gx-vault-now">01</span>
            <span>/ {pad(slides.length)}</span>
          </p>
        </header>

        <div ref={copy} className="gx-vault-copy">
          <div className="gx-vault-copy-main">
            <p className="gx-vault-kicker">{slides[0]?.place}</p>
            <h2 id="gx-vault-heading" className="gx-vault-title">
              <span>{slides[0]?.title}</span> <em>{slides[0]?.title2}</em>
            </h2>
            <p className="gx-vault-body">{slides[0]?.description}</p>
          </div>
          <Link href="/compliance" className="gx-vault-link">
            View credentials
          </Link>
        </div>

        <div className="gx-vault-space">
          <div className="gx-vault-dust" aria-hidden>
            {Array.from({ length: 14 }, (_, i) => (
              <i key={`dust-${i}`} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="gx-vault-podium" aria-hidden />
          <div className="gx-vault-orbit" aria-hidden />
          <div className="gx-vault-orbit gx-vault-orbit-2" aria-hidden />
          <div ref={stack} className="gx-vault-gyro">
            <div className="gx-vault-world">
              {slides.map((s, i) => (
                <article
                  key={`${s.title}-${i}`}
                  className="gx-vault-shot"
                  aria-label={credentials[i]?.title ?? `${s.title} ${s.title2}`}
                >
                  {s.video ? (
                    <video
                      className="gx-vault-media"
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
                    <img className="gx-vault-media" src={s.image} alt="" decoding="async" />
                  )}
                  <span className="gx-vault-shine" aria-hidden />
                  <span className="gx-vault-scanline" aria-hidden />
                </article>
              ))}
              <span className="gx-vault-sweep" aria-hidden />
            </div>
          </div>
        </div>

        <nav className="gx-vault-rail" aria-label="Credential chapters">
          {slides.map((s, i) => (
            <button
              key={`chip-${s.tag}-${i}`}
              type="button"
              className={`gx-vault-chip${i === 0 ? " is-on" : ""}`}
              aria-label={`${s.title} ${s.title2}`}
            >
              <b>{pad(i + 1)}</b>
              <span>{s.tag}</span>
            </button>
          ))}
        </nav>

        <div className="gx-vault-progress" aria-hidden>
          <i className="gx-vault-fill" />
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
