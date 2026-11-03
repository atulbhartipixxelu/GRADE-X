import { methodology } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { CertifiedStrip } from "@/components/trust/CertifiedStrip";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Our methodology",
  "Grade X's eight-step kitchen exhaust methodology: inspect, measure, protect, steam-wash, clean, inspect, re-measure, report. Each step has a pass or fail rule.",
  "/methodology",
);

export default function MethodologyPage() {
  return (
    <InnerMotion>
      <PageHero
        index="04"
        kicker="Our Methodology"
        title="Eight steps. Each one checkable."
        body="Inspect, measure, protect, steam-wash, clean, inspect, re-measure, report. Each step has a pass or fail rule so a facility manager can see what counted."
        media="/slides/weir-wash.jpg"
        mediaAlt="Interior steam washing of kitchen exhaust"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/methodology", label: "Methodology" },
        ]}
      />
      <CertifiedStrip />
      <section className="gx-inner-wrap max-w-5xl">
        {methodology.map((m) => (
          <article key={m.step} className="gx-inner-step" data-rise>
            <span>{m.step}</span>
            <div>
              <b className="font-mono text-[11px] tracking-[0.22em] text-gold-2 uppercase">Step {m.step}</b>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.2rem)] text-ivory">{m.title}</h2>
              <p className="gx-body mt-3">{m.body}</p>
              <p className="gx-body mt-3">{m.pass}</p>
            </div>
          </article>
        ))}
        <div className="gx-inner-cta" data-rise>
          <Button href="/contact" variant="urgent">
            Request a quote
          </Button>
          <Button href="/digital-evidence" variant="ghost">
            Digital evidence
          </Button>
        </div>
      </section>
    </InnerMotion>
  );
}
