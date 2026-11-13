import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IsoFacts } from "@/components/trust/IsoFacts";
import { capabilityPdf, isoClaim, isoReady, publishedIso } from "@/lib/iso";

export function ComplianceBand() {
  return (
    <section className="gx-cmp-band" aria-labelledby="gx-cmp-band-heading">
      <div className="gx-cmp-band-inner">
        <header className="gx-cmp-band-head" data-aos="fade-up">
          <p className="gx-cmp-band-kicker">Compliance</p>
          <h2 id="gx-cmp-band-heading">
            <span>Insurance, SWMS and evidence. </span>
            <span>
              All of it <em>on record.</em>
            </span>
          </h2>
          <p>
            {isoReady ? `Certified to ${isoClaim}. ` : null}
            Public and product liability and workers compensation are held for commercial site work. SWMS are
            produced where the job requires them. Ask us to send the current files to your
            procurement team.
          </p>
        </header>

        {isoReady ? (
          <ul className="gx-cmp-dockets">
            {publishedIso.map((item, index) => (
              <li key={item.id} data-aos={index % 2 ? "fade-left" : "fade-right"}>
                <article className="gx-cmp-docket" aria-labelledby={`${item.id}-band`}>
                  <span className="gx-cmp-docket-idx">{String(index + 1).padStart(2, "0")}</span>
                  <span className="gx-cmp-docket-mark">ISO</span>
                  <strong id={`${item.id}-band`}>{item.code.replace("ISO ", "")}</strong>
                  <b>
                    {item.short}
                    {item.edition ? ` · ${item.edition}` : ""}
                  </b>
                  <div className="gx-iso-desk">
                    <IsoFacts item={item} />
                  </div>
                  <details className="gx-iso-acc">
                    <summary>Certificate details</summary>
                    <IsoFacts item={item} />
                  </details>
                </article>
              </li>
            ))}
          </ul>
        ) : null}

        <footer className="gx-cmp-band-foot" data-aos="fade-up">
          <p>
            {capabilityPdf.ready ? (
              <>
                <a href={capabilityPdf.href}>
                  {capabilityPdf.label} ({capabilityPdf.meta})
                </a>
                .{" "}
              </>
            ) : null}
            <Link href="/compliance">See the compliance page</Link>.
          </p>
          <Button href="/contact">Request the files</Button>
        </footer>
      </div>
    </section>
  );
}
