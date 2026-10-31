"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { categoryImages } from "@/lib/categoryMedia";
import type { ServiceCategory } from "@/lib/content";

export function ServicesBanner({
  groups,
}: {
  groups: { key: ServiceCategory; title: string; count: number }[];
}) {
  return (
    <section className="gx-hero gx-svc-hero" aria-label="Grade X services">
      <div className="gx-hero-media">
        <Image
          src="/services/kitchen-exhaust-hood.jpg"
          alt="Commercial kitchen exhaust canopy"
          fill
          priority
          className="gx-hero-video gx-svc-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner gx-svc-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Services</p>
          <h1 className="gx-hero-title">
            <span>All 21</span>
            <span>Grade X services.</span>
          </h1>
          <p className="gx-hero-body">
            Organised into kitchen exhaust & hygiene specialty, kitchen equipment cleaning, lobby
            & front-of-house, and exterior & general commercial. Each service has its own short
            description.
          </p>
          <div className="gx-hero-actions">
            <Button href="/contact">Request a quote</Button>
            <a className="gx-hero-play" href="#kitchen-exhaust">
              <span className="gx-hero-play-icon">
                <Play strokeWidth={2} />
                <i />
                <i />
              </span>
              View categories
            </a>
          </div>
        </div>

        <div className="gx-svc-hero-bays">
          {groups.map((g, i) => (
            <a key={g.key} href={`#${g.key}`} className="gx-svc-hero-bay">
              <span className="gx-svc-hero-frame">
                <span className="gx-svc-hero-shot">
                  <Image
                    src={categoryImages[g.key]}
                    alt={g.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    priority={i < 2}
                  />
                </span>
                <span className="gx-svc-hero-bay-veil" />
                <span className="gx-svc-hero-cap">
                  <em>
                    {String(i + 1).padStart(2, "0")}
                    <b>{String(g.count).padStart(2, "0")}</b>
                  </em>
                  <strong>{g.title}</strong>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
