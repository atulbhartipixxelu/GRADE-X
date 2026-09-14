"use client";

import Link from "next/link";
import { HeroScene } from "@/components/3d/HeroScene";

const reads = [
  { n: "01", k: "Platform", v: "Stainless tracked crawler" },
  { n: "02", k: "Head", v: "Twin turret nozzles" },
  { n: "03", k: "Record", v: "Inspection camera + LED" },
] as const;

export function InspectPlay() {
  return (
    <section className="gx-play" aria-labelledby="gx-play-heading">
      <div className="gx-play-view">
        <HeroScene mode="tech" />
      </div>
      <div className="gx-play-veil" aria-hidden />

      <div className="gx-play-copy">
        <p className="gx-play-kicker">
          <i />
          3D visualisation
          <span>Live interior</span>
        </p>
        <h2 id="gx-play-heading" className="gx-play-title">
          <span>Robotic exhaust cleaning</span>
          <span>inside the duct.</span>
        </h2>
        <p className="gx-play-body">
          The 3D treatment visualises the robotic exhaust cleaning process — a duct
          with the platform moving through it — supporting the headline, not replacing
          it.
        </p>
        <ol className="gx-play-reads">
          {reads.map((row) => (
            <li key={row.n}>
              <em>{row.n}</em>
              <span>
                {row.k}
                <strong>{row.v}</strong>
              </span>
            </li>
          ))}
        </ol>
        <Link href="/technology" className="gx-play-link">
          View technology
        </Link>
      </div>
    </section>
  );
}
