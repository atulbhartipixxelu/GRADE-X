import Link from "next/link";
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

export function HomeTrust() {
  return (
    <section className="gx-htrust" aria-labelledby="gx-htrust-heading">
      <div className="gx-htrust-wrap">
        <header className="gx-htrust-head">
          <div className="gx-htrust-top">
            <p className="gx-htrust-kicker">Trust signals</p>
            <Button href="/compliance">Compliance &amp; WHS</Button>
          </div>
          <h2 id="gx-htrust-heading">Insurance, compliance and certifications</h2>
          <p>
            Facility managers and QSR compliance teams look for this before engaging a contractor.
            Exact certificate wording is supplied by Grade X.
          </p>
        </header>

        <div className="gx-htrust-dossier">
          <div className="gx-htrust-seal" aria-hidden>
            <i className="gx-htrust-seal-ring" />
            <i className="gx-htrust-seal-ring gx-htrust-seal-ring--2" />
            <div className="gx-htrust-seal-core">
              <span>On file</span>
              <strong>Grade X</strong>
              <em>Balga WA</em>
            </div>
          </div>

          <ol className="gx-htrust-register">
            {credentials.map((item, i) => {
              const Icon = icons[i] ?? Sparkles;
              return (
                <li key={item.title}>
                  <Link href="/compliance" className="gx-htrust-row">
                    <span className="gx-htrust-no">{String(i + 1).padStart(2, "0")}</span>
                    <i className="gx-htrust-ico" aria-hidden>
                      <Icon strokeWidth={1.7} />
                    </i>
                    <div className="gx-htrust-copy">
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </div>
                    <em className="gx-htrust-mark">Held on file</em>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
