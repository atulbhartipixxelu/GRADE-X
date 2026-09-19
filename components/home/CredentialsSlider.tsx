"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Bot,
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

const items = [
  ...credentials.map((item, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: item.title,
    body: item.body,
    Icon: icons[i] ?? Sparkles,
  })),
  {
    n: "07",
    title: "Robotic kitchen exhaust",
    body: "Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology.",
    Icon: Bot,
  },
];

export function CredentialsSlider() {
  return (
    <section className="gx-creds" aria-labelledby="gx-creds-heading">
      <div className="gx-creds-wrap">
        <header className="gx-creds-head">
          <div>
            <p className="gx-creds-kicker">Compliance &amp; WHS</p>
            <h2 id="gx-creds-heading">Credentials that sit on the job file</h2>
            <p>
              Insurance, food-safe methods, SWMS and ISO-focused quality control — held on file and
              supplied to facility managers on request.
            </p>
          </div>
          <Button href="/compliance">View credentials</Button>
        </header>

        <figure className="gx-creds-photo">
          <Image
            src="/slides/duct-live.jpg"
            alt="Grade X robotic kitchen exhaust crawler"
            fill
            sizes="(max-width: 1500px) 92vw, 1500px"
            className="gx-creds-photo-img"
          />
        </figure>

        <ul className="gx-creds-grid">
          {items.map((item) => (
            <li key={item.n}>
              <article className="gx-creds-card">
                <div className="gx-creds-card-top">
                  <i className="gx-creds-ico" aria-hidden>
                    <item.Icon strokeWidth={1.75} />
                  </i>
                  <span>{item.n}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <p className="gx-creds-note">
          Exact certificate wording is supplied by Grade X.
          <Link href="/compliance">Compliance &amp; WHS</Link>
        </p>
      </div>
    </section>
  );
}
