import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { isoStandards } from "@/lib/iso";

export function ComplianceBand() {
  return (
    <section className="gx-cmp-band" aria-labelledby="gx-cmp-band-heading">
      <div className="gx-cmp-band-inner">
        <header className="gx-cmp-band-head" data-aos="fade-up">
          <p className="gx-cmp-band-kicker">Compliance</p>
          <h2 id="gx-cmp-band-heading">
            <span>Three ISO certifications.</span>
            <span>
              All of it <em>on record.</em>
            </span>
          </h2>
          <p>
            Certified by [certification body]. Scope: [exact scope]. Certificate numbers and expiry
            dates are in our certificate pack.
          </p>
        </header>

        <ul className="gx-cmp-dockets">
          {isoStandards.map((item, index) => (
            <li key={item.id} data-aos={index % 2 ? "fade-left" : "fade-right"}>
              <Link href={item.href} className="gx-cmp-docket" aria-label={item.alt}>
                <span className="gx-cmp-docket-idx">{String(index + 1).padStart(2, "0")}</span>
                <span className="gx-cmp-docket-mark">ISO</span>
                <strong>{item.code.replace("ISO ", "")}</strong>
                <b>{item.short}</b>
                <em>{item.line}</em>
                <dl>
                  <div>
                    <dt>Number</dt>
                    <dd>{item.number}</dd>
                  </div>
                  <div>
                    <dt>Expiry</dt>
                    <dd>{item.expiry}</dd>
                  </div>
                </dl>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="gx-cmp-band-foot" data-aos="fade-up">
          <p>
            Placeholder labels only. The certifier&apos;s marks go up when the certificate files
            arrive. <Link href="/compliance">See the six-tile compliance page</Link>.
          </p>
          <Button href="/compliance">Download certificate pack</Button>
        </footer>
      </div>
    </section>
  );
}
