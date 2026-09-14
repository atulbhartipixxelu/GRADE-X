"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Kicker } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function CtaBanner() {
  const stage = useRef<HTMLElement>(null);
  const bg = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const root = stage.current;
    const image = bg.current;
    if (!root || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.18, xPercent: -6, yPercent: -4 },
        {
          scale: 1.05,
          xPercent: 6,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={stage} className="gx-sos" aria-labelledby="gx-sos-heading">
      <div className="gx-sos-media" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bg}
          className="gx-sos-bg"
          src="/slides/tunnel-spray.jpg"
          alt=""
          decoding="async"
        />
      </div>
      <div className="gx-sos-veil" aria-hidden />
      <div className="gx-sos-rings" aria-hidden />

      <div className="gx-sos-inner">
        <div className="gx-sos-copy">
          <div className="gx-sos-meta">
            <Kicker className="text-white">Emergency response</Kicker>
            <p className="gx-sos-area">{site.serviceArea}</p>
          </div>
          <h2 id="gx-sos-heading" className="gx-sos-title">
            <span>Emergency response</span>
            <span>is available across</span>
            <span>the Perth metro.</span>
          </h2>
          <p className="gx-sos-body">
            This is a genuine service Grade X offers. Request a quote for planned
            work, or call for urgent kitchen exhaust issues.
          </p>
          <Link href="/contact" className="gx-sos-quote">
            Request a quote
          </Link>
        </div>

        <a href={site.phoneHref} className="gx-sos-dial">
          <span className="gx-sos-live">
            <i />
            Urgent
          </span>
          <span className="gx-sos-icon" aria-hidden>
            <Phone strokeWidth={1.7} />
          </span>
          <p className="gx-sos-card-kicker">Urgent kitchen exhaust issues</p>
          <p className="gx-sos-phone">{site.phone}</p>
          <p className="gx-sos-card-note">
            Perth metropolitan sites are prioritised. Call for urgent issues.
          </p>
        </a>
      </div>
    </section>
  );
}
