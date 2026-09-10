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
        kicker="Digital evidence"
        title="Proof from inside the exhaust run."
        body="Objective grease-thickness measurement before and after every clean. Live video during the clean itself. Photographic evidence with every job. Same weight as the robotic platform — because facility managers look for both."
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
            Sample job file
          </p>
          <div className="mt-6 space-y-5">
            <Row k="Site" v="QSR cookline · Perth metro" />
            <Row k="Baseline" v="412 µm canopy plenum / 268 µm duct sample" />
            <Row k="After clean" v="18 µm / 22 µm" />
            <Row k="Method" v="Steam wash + robotic interior pass" />
            <Row k="Next interval" v="90 days · high fryer load" />
          </div>
          <p className="mt-8 text-xs leading-6 text-mist">
            Illustrative layout. Grade X replaces this with a redacted real report once supplied. The structure is ready for CMS upload.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Button href="/contact">Ask for a sample evidence pack</Button>
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
