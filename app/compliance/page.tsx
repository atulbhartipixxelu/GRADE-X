import { credentials } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Compliance and WHS",
  "Insurance, WHS, food-safe methods, SWMS and ISO-focused quality control for Grade X Commercial Solutions — written for facility managers and QSR compliance teams.",
  "/compliance",
);

export default function CompliancePage() {
  return (
    <InnerMotion>
      <PageHero
        index="06"
        kicker="Compliance and WHS"
        title="Insurance, WHS, food-safe practice and certifications."
        body="This page covers Grade X’s own compliance credentials in more depth than a homepage trust-badge strip. Exact wording and current certificate details will be provided by Grade X; this page presents them clearly and credibly."
        media="/slides/plant-flange.jpg"
        mediaAlt="Documented commercial site work"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/compliance", label: "Compliance" },
        ]}
      />
      <section className="gx-inner-wrap">
        <div className="gx-inner-grid gx-inner-grid-2">
          {credentials.map((c, i) => (
            <article key={c.title} className="gx-inner-card" data-rise data-tilt>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
        <div className="gx-inner-card mt-8" data-rise>
          <h2>ISO-focused standards</h2>
          <p>
            Procedures are designed around recognised industry standards and best practice: detailed
            reporting and service records for every job; risk assessments, SWMS and site-specific
            safety procedures where required; ongoing quality inspections and continuous improvement.
            This sits with the same weight as insurance — because it is how Grade X actually operates.
          </p>
          <div className="gx-inner-cta">
            <Button href="/contact">Request a quote</Button>
          </div>
        </div>
      </section>
    </InnerMotion>
  );
}
