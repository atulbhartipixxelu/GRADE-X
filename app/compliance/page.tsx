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
import { capabilityPdf, isoReady, publishedIso } from "@/lib/iso";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/home/CtaBanner";
import { CertifiedStrip } from "@/components/trust/CertifiedStrip";
import { ComplianceBanner } from "@/components/trust/ComplianceBanner";
import { IsoFacts } from "@/components/trust/IsoFacts";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Compliance, insurance and WHS",
  isoReady
    ? `${publishedIso.map((item) => `${item.code}:${item.edition}`).join(" and ")} certificates for Grade X, plus insurance, SWMS and WHS files your procurement team can download or request.`
    : "Insurance, SWMS and WHS files for Grade X commercial kitchen work. Request the current pack for your procurement team.",
  "/compliance",
);

const icons = [Sparkles, Shield, FileCheck, HardHat, UtensilsCrossed, BadgeCheck];

export default function CompliancePage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <ComplianceBanner />
      </div>
      <CertifiedStrip />

      {isoReady ? (
        <section className="gx-cmp-page" aria-labelledby="gx-cmp-heading">
          <div className="gx-about-story-wrap">
            <header className="gx-about-story-head" data-aos="fade-up">
              <p className="gx-about-story-kicker">Certificates</p>
              <h2 id="gx-cmp-heading">Issued and current</h2>
            </header>

            <div className="gx-cmp-iso">
              {publishedIso.map((item) => (
                <article key={item.id} id={item.id} className="gx-cmp-iso-card" data-aos="fade-up">
                  <div className="gx-cmp-iso-top">
                    <p className="gx-cmp-iso-kicker">
                      <b>ISO</b>
                      <span>{item.short}</span>
                    </p>
                    <p className="gx-cmp-iso-no" aria-hidden>
                      {item.code.replace("ISO ", "")}
                    </p>
                  </div>
                  <h3>
                    {item.code}:{item.edition}
                  </h3>
                  <p className="gx-cmp-iso-line">{item.line}</p>
                  <IsoFacts item={item} extra />
                  {"relatedHref" in item && item.relatedHref ? (
                    <p className="gx-cmp-iso-related">
                      Related: <Link href={item.relatedHref}>{item.relatedLabel}</Link>
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="gx-cmp-files-sec"
        aria-labelledby={isoReady ? "gx-cmp-files-heading" : "gx-cmp-heading"}
      >
        <div className="gx-about-story-wrap">
          <header className="gx-about-story-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">On file</p>
            <h2 id={isoReady ? "gx-cmp-files-heading" : "gx-cmp-heading"}>
              What procurement asks for
            </h2>
          </header>

          <ol className="gx-cmp-files">
            {credentials.map((item, i) => {
              const Icon = icons[i] ?? Sparkles;
              const id = "id" in item ? item.id : undefined;
              const isIso = id === "iso";
              return (
                <li key={item.title} id={id}>
                  <article
                    className="gx-cmp-file"
                    data-aos="fade-up"
                    data-aos-delay={String((i % 3) * 70)}
                  >
                    <span className="gx-cmp-file-top">
                      <i className="gx-cmp-file-ico" aria-hidden>
                        <Icon strokeWidth={1.7} />
                      </i>
                      <em>{String(i + 1).padStart(2, "0")}</em>
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    {isIso && isoReady ? (
                      <p>
                        <Link href="#iso-9001">View certificates</Link>
                      </p>
                    ) : (
                      <p>
                        <Link href="/contact">Request this file</Link>
                      </p>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>

          <aside className="gx-cmp-pack" data-aos="fade-up">
            <div>
              <p className="gx-cmp-pack-kicker">
                {capabilityPdf.ready ? "Capability" : "Files"}
              </p>
              <p>
                {capabilityPdf.ready ? (
                  <>
                    <a href={capabilityPdf.href}>
                      {capabilityPdf.label} ({capabilityPdf.meta})
                    </a>
                    .{" "}
                  </>
                ) : null}
                Ask us to send the current files to your procurement team.
              </p>
            </div>
            <Button href="/contact">Request the full pack</Button>
          </aside>
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
