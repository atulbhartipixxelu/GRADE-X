"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categoryAlts, categoryImages } from "@/lib/categoryMedia";
import type { ServiceCategory } from "@/lib/content";
import { serviceIconFallback, serviceIcons } from "@/lib/serviceIcons";

gsap.registerPlugin(ScrollTrigger);

export type ServiceGroup = {
  key: ServiceCategory;
  title: string;
  description: string;
  items: { slug: string; name: string; excerpt: string }[];
};

export function ServicesDeck({ groups }: { groups: ServiceGroup[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(groups[0]?.key ?? "kitchen-exhaust");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as ServiceCategory;
    if (groups.some((g) => g.key === hash)) setActive(hash);

    const nodes = groups
      .map((g) => document.getElementById(g.key))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id as ServiceCategory);
      },
      { rootMargin: "-12% 0px -28% 0px", threshold: [0.08, 0.22, 0.45] },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [...root.querySelectorAll<HTMLElement>(".gx-svc-cat-parallax")];
    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const frame = layer.parentElement;
        if (!frame) return;
        gsap.fromTo(
          layer,
          { yPercent: -16 },
          {
            yPercent: 16,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 240);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [groups]);

  return (
    <div className="gx-svc-cats" ref={rootRef}>
      <nav className="gx-svc-tabs" aria-label="Service categories">
        {groups.map((g) => (
          <a
            key={g.key}
            href={`#${g.key}`}
            className={active === g.key ? "is-on" : ""}
            onClick={() => setActive(g.key)}
          >
            {g.title}
          </a>
        ))}
      </nav>

      {groups.map((g, i) => (
        <section key={g.key} id={g.key} className="gx-svc-cat">
          <figure className="gx-svc-cat-media relative">
            <div className="gx-svc-cat-parallax">
              <Image
                src={categoryImages[g.key]}
                alt={categoryAlts[g.key]}
                fill
                sizes="100vw"
              />
            </div>
            <figcaption>
              <p>
                {String(i + 1).padStart(2, "0")} / 04
                <span>{String(g.items.length).padStart(2, "0")} services</span>
              </p>
              <h2>{g.title}</h2>
            </figcaption>
          </figure>

          <div className="gx-about-story-wrap gx-svc-cat-body">
            <p className="gx-svc-cat-lede" data-aos="fade-up">
              {g.description}
            </p>
            <ol className="gx-svc-items">
              {g.items.map((s, n) => {
                const Icon = serviceIcons[s.slug] ?? serviceIconFallback;
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="gx-svc-item"
                      data-aos="fade-up"
                      data-aos-delay={String((n % 2) * 70)}
                    >
                      <span className="gx-svc-item-top">
                        <i className="gx-svc-item-ico" aria-hidden>
                          <Icon strokeWidth={1.7} />
                        </i>
                        <b>{String(n + 1).padStart(2, "0")}</b>
                      </span>
                      <strong>{s.name}</strong>
                      <em>{s.excerpt}</em>
                      <i className="gx-svc-view">
                        View
                        <ArrowUpRight strokeWidth={2.2} aria-hidden />
                      </i>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ))}
    </div>
  );
}
