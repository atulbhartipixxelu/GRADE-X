import { reportContents } from "@/lib/content";
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
    <>
      <PageHero
        kicker="Digital evidence & reporting"
        title="Verification of completed work."
        body="Objective grease-thickness measurement before and after every clean, live video during the clean itself, and before/after photographic evidence supplied with every job. This is a genuine operational differentiator, presented with the same weight as the robotic technology."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/digital-evidence", label: "Digital evidence" },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-ivory">What sits in the report</h2>
          <ul className="mt-8 space-y-4">
            {reportContents.map((item, i) => (
              <li key={item} className="flex items-start gap-4 border-b border-gold/10 pb-4">
                <span className="font-mono text-gold">0{i + 1}</span>
                <span className="text-ivory">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-7 text-mist">
            Equipment includes a digital grease thickness gauge with external probe — such as the Teinnova Grasmeter — producing instant micron readings. Before-and-after measurements verify effectiveness objectively, not by visual assessment.
          </p>
        </div>
        <div className="border border-gold/20 bg-navy-2 p-8">
          <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
            Client reporting system
          </p>
          <div className="mt-6 space-y-5">
            <Row k="Before-and-after photos" v="Supplied with every job" />
            <Row k="Digital grease measurement" v="Before and after, objective micron readings" />
            <Row k="Live video" v="During the clean itself" />
            <Row k="Service reports" v="Areas cleaned and inspected" />
            <Row k="Compliance documentation" v="Held with the job record" />
            <Row k="Maintenance" v="Recommendations for future intervals" />
          </div>
          <p className="mt-8 text-xs leading-6 text-mist">
            A visual example of a redacted real report can be added here once supplied by Grade X. The page structure is ready for that upload.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Button href="/contact">Request a quote</Button>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-widest text-mist uppercase">{k}</p>
      <p className="mt-1 text-ivory">{v}</p>
    </div>
  );
}
