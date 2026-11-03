import Link from "next/link";
import {
  BadgeCheck,
  FileCheck,
  HardHat,
  Shield,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { credentials } from "@/lib/content";
import { isoStandards } from "@/lib/iso";
import { Button } from "@/components/ui/Button";
import { IsoBadgeRow } from "@/components/trust/IsoBadgeRow";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Compliance, Insurance and ISO",
  "ISO 9001, 14001 and 45001 certificates, insurance, SWMS and WHS information. Download our certificate pack.",
  "/compliance",
);

const icons = [Sparkles, Shield, FileCheck, HardHat, UtensilsCrossed, BadgeCheck];

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
        <h1>Compliance you can check.</h1>
        <p>
          Every Grade X visit runs under written quality, environmental and safety systems, with
          insurance current for the work. Download our certificate pack, or ask us to send it to
          your procurement team.
        </p>
        <IsoBadgeRow />
        <p className="gx-cmp-pending">
          Badge artwork and downloads stay as placeholders until the certificate files arrive. We
          will not publish a certifier mark without the matching PDF.
        </p>
        <Button href="/contact">Request the full pack</Button>
      </header>

      <section className="gx-iso-tiles" aria-label="ISO certificates">
        {isoStandards.map((item) => (
          <article key={item.id} id={item.id} className="gx-iso-tile">
            <p>{item.short}</p>
            <h2>{item.code}</h2>
            <p>{item.line}</p>
            <dl>
              <div>
                <dt>Certificate</dt>
                <dd>{item.number}</dd>
              </div>
              <div>
                <dt>Certifier</dt>
                <dd>{item.certifier}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{item.scope}</dd>
              </div>
              <div>
                <dt>Expiry</dt>
                <dd>{item.expiry}</dd>
              </div>
            </dl>
            {"relatedHref" in item && item.relatedHref ? (
              <p>
                <Link href={item.relatedHref}>{item.relatedLabel}</Link>
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <ol className="gx-cmp-grid">
        {credentials.map((item, i) => {
          const Icon = icons[i] ?? Sparkles;
          const id = "id" in item ? item.id : undefined;
          return (
            <li key={item.title} id={id}>
              <article className="gx-cmp-card">
                <span className="gx-cmp-card-top">
                  <i className="gx-cmp-ico" aria-hidden>
                    <Icon strokeWidth={1.7} />
                  </i>
                  <em>{String(i + 1).padStart(2, "0")}</em>
                </span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <p>
                  <Link href="/contact">Request this file</Link>
                </p>
              </article>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
