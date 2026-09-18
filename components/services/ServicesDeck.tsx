"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryImages } from "@/lib/categoryMedia";
import { ServicesParticles } from "@/components/services/ServicesParticles";
import type { ServiceCategory } from "@/lib/content";

export type ServiceGroup = {
  key: ServiceCategory;
  title: string;
  description: string;
  items: { slug: string; name: string; excerpt: string }[];
};

export function ServicesDeck({ groups }: { groups: ServiceGroup[] }) {
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
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.12, 0.28, 0.5] },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  return (
    <div className="gx-svc-deck">
      <nav className="gx-svc-index" aria-label="Service categories">
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
        <section
          key={g.key}
          id={g.key}
          className={`gx-svc-bay ${i % 2 === 1 ? "gx-svc-bay--flip gx-svc-bay--gold" : "gx-svc-bay--ink"}`}
        >
          <div className="gx-svc-bay-visual">
            <ServicesParticles className="gx-svc-bay-particles" />
            <Image
              src={categoryImages[g.key]}
              alt={g.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
            <div className="gx-svc-bay-veil" aria-hidden>
              <i className="gx-svc-bay-tick gx-svc-bay-tick-tl" />
              <i className="gx-svc-bay-tick gx-svc-bay-tick-tr" />
              <i className="gx-svc-bay-tick gx-svc-bay-tick-bl" />
              <i className="gx-svc-bay-tick gx-svc-bay-tick-br" />
            </div>
            <p className="gx-svc-bay-no" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </p>
            <div className="gx-svc-bay-caption">
              <p>Category {String(i + 1).padStart(2, "0")} / 04</p>
              <h2>{g.title}</h2>
            </div>
          </div>

          <div className="gx-svc-bay-copy">
            <p className="gx-svc-bay-kicker">
              {String(g.items.length).padStart(2, "0")} services
            </p>
            <h3>{g.title}</h3>
            <p className="gx-svc-bay-lede">{g.description}</p>
            <ol className="gx-svc-manifest">
              {g.items.map((s, n) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="gx-svc-line" data-rise>
                    <span className="gx-svc-line-no">{String(n + 1).padStart(2, "0")}</span>
                    <span className="gx-svc-line-copy">
                      <strong>{s.name}</strong>
                      <em>{s.excerpt}</em>
                    </span>
                    <span className="gx-svc-line-go">
                      View
                      <i />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}
    </div>
  );
}
