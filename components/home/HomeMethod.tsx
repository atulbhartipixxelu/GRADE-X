import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  ClipboardCheck,
  FileText,
  Gauge,
  ScanSearch,
  Shield,
  Sparkles,
  SprayCan,
  Wind,
} from "lucide-react";
import { methodology } from "@/lib/content";
import { Button } from "@/components/ui/Button";

const icons: LucideIcon[] = [
  ScanSearch,
  Gauge,
  Shield,
  SprayCan,
  Wind,
  ClipboardCheck,
  Sparkles,
  FileText,
];

export function HomeMethod() {
  return (
    <section className="gx-hmethod" aria-labelledby="gx-hmethod-heading">
      <div className="gx-hmethod-wrap">
        <header className="gx-hmethod-head">
          <p className="gx-hmethod-kicker">Our methodology</p>
          <div className="gx-hmethod-row">
            <div>
              <h2 id="gx-hmethod-heading">How Grade X actually operates</h2>
              <p>
                A dedicated numbered sequence — evidence of a repeatable, professional process, not
                folded into general service descriptions.
              </p>
            </div>
            <Button href="/methodology">View full methodology</Button>
          </div>
        </header>

        <ol className="gx-hmethod-grid">
          {methodology.map((item, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <li key={item.step}>
                <Link href="/methodology" className="gx-hmethod-card">
                  <span className="gx-hmethod-card-top">
                    <i className="gx-hmethod-ico" aria-hidden>
                      <Icon strokeWidth={1.7} />
                    </i>
                    <em>{item.step}</em>
                    <ArrowUpRight className="gx-hmethod-go" strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3>{item.title}</h3>
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
