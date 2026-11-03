import { reportContents } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Digital evidence and reporting",
  "Every Grade X job includes grease-thickness measurements, photos and a written service report. Live video is on robotic cleans.",
  "/digital-evidence",
);

export default function EvidencePage() {
  return (
    <InnerMotion>
      <PageHero
        index="05"
        kicker="Digital evidence & reporting"
        title="Every clean ends with proof."
        body="Grease thickness measured in microns before and after. Photos. A service report listing what was cleaned and inspected. All of it filed against your site and ready for your insurer or brand auditor."
        media="/slides/duct-live.jpg"
        mediaAlt="Live inspection view inside a kitchen exhaust duct during a robotic clean"
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
            On robotic cleans you also get live footage of the inside of the duct. Live video is
            part of the robotic service, not a claim for every non-robotic visit.
          </p>
          <p>
            How the pack is delivered and how long we keep records: [to be confirmed]. Measuring
            device: [gauge to be confirmed].
          </p>
        </div>
        <div className="gx-inner-card" data-rise>
          <b>Sample report</b>
          <p>
            A redacted sample with client details removed will sit here as a download as soon as it
            is supplied. Until then this card is the layout only.
          </p>
          <Row k="Before-and-after photos" v="Supplied with every job" />
          <Row k="Digital grease measurement" v="Before and after, micron readings" />
          <Row k="Live video" v="On robotic cleans" />
          <Row k="Service reports" v="Areas cleaned and inspected" />
          <Row k="Recommendations" v="Next interval, on the job record" />
        </div>
      </section>
      <section className="gx-inner-wrap pt-0">
        <div className="gx-inner-cta" data-rise>
          <Button href="/contact" variant="urgent">
            Request a quote
          </Button>
          <Button href="/gallery" variant="ghost">
            Work gallery
          </Button>
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
