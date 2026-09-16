import { reportContents } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Digital evidence and reporting",
  "Every Grade X job includes grease-thickness measurements, live video on robotic cleans, before/after photography and a written service report for facility files.",
  "/digital-evidence",
);

export default function EvidencePage() {
  return (
    <InnerMotion>
      <PageHero
        index="05"
        kicker="Digital evidence & reporting"
        title="Verification of completed work."
        body="Objective grease-thickness measurement before and after every clean, live video during the clean itself, and before/after photographic evidence supplied with every job. This is a genuine operational differentiator, presented with the same weight as the robotic technology."
        media="/slides/duct-live.jpg"
        mediaAlt="Live inspection view inside a kitchen exhaust duct"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/digital-evidence", label: "Digital evidence" },
        ]}
      />
      <section className="gx-inner-wrap gx-inner-split">
        <div className="gx-inner-copy" data-rise>
          <h2>What sits in the report</h2>
          <ul className="mt-8 space-y-4">
            {reportContents.map((item, i) => (
              <li key={item} className="flex items-start gap-4 border-b border-gold/10 pb-4">
                <span className="font-mono text-gold">0{i + 1}</span>
                <span className="text-ivory">{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Equipment includes a digital grease thickness gauge with external probe — such as the
            Teinnova Grasmeter — producing instant micron readings. Before-and-after measurements
            verify effectiveness objectively, not by visual assessment.
          </p>
        </div>
        <div className="gx-inner-card" data-rise data-tilt>
          <b>Client reporting system</b>
          <Row k="Before-and-after photos" v="Supplied with every job" />
          <Row k="Digital grease measurement" v="Before and after, objective micron readings" />
          <Row k="Live video" v="During the clean itself" />
          <Row k="Service reports" v="Areas cleaned and inspected" />
          <Row k="Compliance documentation" v="Held with the job record" />
          <Row k="Maintenance" v="Recommendations for future intervals" />
          <p>
            A visual example of a redacted real report can be added here once supplied by Grade X.
          </p>
        </div>
      </section>
      <section className="gx-inner-wrap pt-0">
        <div className="gx-inner-cta" data-rise>
          <Button href="/contact">Request a quote</Button>
        </div>
      </section>
    </InnerMotion>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] tracking-widest text-mist uppercase">{k}</p>
      <p className="mt-1 text-ivory">{v}</p>
    </div>
  );
}
