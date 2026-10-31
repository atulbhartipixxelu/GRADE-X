"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FileCheck,
  HardHat,
  Shield,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { credentials } from "@/lib/content";
import { Button } from "@/components/ui/Button";

const icons: LucideIcon[] = [
  Shield,
  FileCheck,
  UtensilsCrossed,
  HardHat,
  BadgeCheck,
  Sparkles,
];

function trackPointer(event: PointerEvent<HTMLAnchorElement>) {
  const tile = event.currentTarget;
  const box = tile.getBoundingClientRect();
  const x = (event.clientX - box.left) / Math.max(1, box.width);
  const y = (event.clientY - box.top) / Math.max(1, box.height);
  tile.style.setProperty("--gx-x", `${(x * 100).toFixed(2)}%`);
  tile.style.setProperty("--gx-y", `${(y * 100).toFixed(2)}%`);
  tile.style.setProperty("--gx-nx", x.toFixed(3));
  tile.style.setProperty("--gx-ny", y.toFixed(3));
}

function clearPointer(event: PointerEvent<HTMLAnchorElement>) {
  const tile = event.currentTarget;
  tile.style.setProperty("--gx-nx", "0.5");
  tile.style.setProperty("--gx-ny", "0.5");
}

export function HomeTrust() {
  return (
    <section className="gx-htrust" aria-labelledby="gx-htrust-heading">
      <div className="gx-htrust-wrap">
        <header className="gx-htrust-head">
          <div className="gx-htrust-top">
            <p className="gx-htrust-kicker">Trust signals</p>
            <Button href="/compliance">Compliance &amp; WHS</Button>
          </div>
          <div className="gx-htrust-intro">
            <div>
              <h2 id="gx-htrust-heading">Insurance, compliance and certifications</h2>
              <p className="gx-htrust-file">
                <span>On file</span>
                Grade X · Balga WA
              </p>
            </div>
            <p>
              Facility managers and QSR compliance teams look for this before engaging a contractor.
              Exact certificate wording is supplied by Grade X.
            </p>
          </div>
        </header>

        <ol className="gx-htrust-board">
          {credentials.map((item, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <li key={item.title}>
                <Link
                  href="/compliance"
                  className="gx-htrust-tile"
                  onPointerMove={trackPointer}
                  onPointerLeave={clearPointer}
                >
                  <i className="gx-htrust-liquid" aria-hidden />
                  <span className="gx-htrust-tile-top">
                    <i className="gx-htrust-ico" aria-hidden>
                      <Icon strokeWidth={1.7} />
                    </i>
                    <em>{String(i + 1).padStart(2, "0")}</em>
                  </span>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
