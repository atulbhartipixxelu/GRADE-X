import { credentials } from "@/lib/content";
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
    <>
      <PageHero
        kicker="Compliance and WHS"
        title="Insurance, WHS, food-safe practice and certifications."
        body="This page covers Grade X’s own compliance credentials in more depth than a homepage trust-badge strip. Exact wording and current certificate details will be provided by Grade X; this page presents them clearly and credibly."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/compliance", label: "Compliance" },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-2">
        {credentials.map((c) => (
          <article key={c.title} className="border border-gold/15 p-8">
            <h2 className="font-display text-2xl text-ivory">{c.title}</h2>
            <p className="mt-4 text-sm leading-7 text-mist">{c.body}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="border border-gold/20 bg-navy-2 p-10">
          <h2 className="font-display text-3xl text-ivory">ISO-focused standards</h2>
          <p className="mt-4 max-w-3xl leading-8 text-mist">
            Procedures are designed around recognised industry standards and best practice: detailed reporting and service records for every job; risk assessments, SWMS and site-specific safety procedures where required; ongoing quality inspections and continuous improvement. This sits with the same weight as insurance — because it is how Grade X actually operates.
          </p>
          <div className="mt-8">
            <Button href="/contact">Request a quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
