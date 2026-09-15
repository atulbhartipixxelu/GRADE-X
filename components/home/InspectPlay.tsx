"use client";

import Link from "next/link";
import { HeroScene } from "@/components/3d/HeroScene";

const reads = [
  { n: "01", k: "Platform", v: "Robotic exhaust cleaning" },
  { n: "02", k: "Measure", v: "Digital grease thickness gauge" },
  { n: "03", k: "Record", v: "Live video during the clean" },
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
          Technology
          <span>WA only</span>
        </p>
        <h2 id="gx-play-heading" className="gx-play-title">
          <span>Robotic kitchen exhaust</span>
          <span>cleaning technology.</span>
        </h2>
        <p className="gx-play-body">
          Grade X is currently the only company in WA operating robotic kitchen exhaust
          cleaning technology. The scene shows the process inside a duct: a camera and
          scanning element moving through the exhaust system.
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
