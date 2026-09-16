import { methodology } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Our methodology",
  "Grade X’s eight-step kitchen exhaust methodology: inspect, measure, protect, steam-wash, clean, inspect, re-measure, report.",
  "/methodology",
);

export default function MethodologyPage() {
  return (
    <InnerMotion>
      <PageHero
        index="04"
        kicker="Our Methodology"
        title="How Grade X actually operates."
        body="This methodology is presented as its own numbered sequence — evidence of a repeatable, professional process, not folded into general service descriptions."
        media="/slides/weir-wash.jpg"
        mediaAlt="Interior steam washing of kitchen exhaust"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/methodology", label: "Methodology" },
        ]}
      />
      <section className="gx-inner-wrap max-w-5xl">
        {methodology.map((m) => (
          <article key={m.step} className="gx-inner-step" data-rise>
            <span>{m.step}</span>
            <div>
              <b className="font-mono text-[11px] tracking-[0.22em] text-gold-2 uppercase">Step {m.step}</b>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.2rem)] text-ivory">{m.title}</h2>
              <p className="gx-body mt-3">{m.body}</p>
            </div>
          </article>
        ))}
        <div className="gx-inner-cta" data-rise>
          <Button href="/contact">Request a quote</Button>
        </div>
      </section>
    </InnerMotion>
  );
}
