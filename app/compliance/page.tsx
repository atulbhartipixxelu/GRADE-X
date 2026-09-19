import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeCheck,
  FileCheck,
  HardHat,
  Shield,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { credentials } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Compliance and WHS",
  "Insurance, WHS, food-safe methods, SWMS and ISO-focused quality control for Grade X Commercial Solutions — written for facility managers and QSR compliance teams.",
  "/compliance",
);

const icons: LucideIcon[] = [
  Shield,
  FileCheck,
  UtensilsCrossed,
  HardHat,
  BadgeCheck,
  Sparkles,
];

export default function CompliancePage() {
  return (
    <main className="gx-cmp">
      <header className="gx-cmp-head">
        <p className="gx-cmp-crumbs">
          <Link href="/">Home</Link>
          {" / "}
          <span>Compliance</span>
        </p>
        <p className="gx-cmp-kicker">Compliance and WHS</p>
        <h1>Insurance, WHS and certifications</h1>
        <p>
          Grade X&apos;s own compliance credentials. Exact certificate wording is supplied by Grade
          X; this page presents them clearly for facility managers and QSR compliance teams.
        </p>
      </header>

      <ol className="gx-cmp-grid">
        {credentials.map((item, i) => {
          const Icon = icons[i] ?? Sparkles;
          return (
            <li key={item.title}>
              <article className="gx-cmp-card">
                <span className="gx-cmp-card-top">
                  <i className="gx-cmp-ico" aria-hidden>
                    <Icon strokeWidth={1.7} />
                  </i>
                  <em>{String(i + 1).padStart(2, "0")}</em>
                </span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="gx-cmp-note">
        <div>
          <h2>ISO-focused standards</h2>
          <p>
            Procedures are designed around recognised industry standards: detailed reporting and
            service records for every job; risk assessments, SWMS and site-specific safety
            procedures where required; ongoing quality inspections and continuous improvement.
          </p>
        </div>
        <Button href="/contact">
          Request a quote
          <ArrowUpRight strokeWidth={1.8} />
        </Button>
      </div>
    </main>
  );
}
