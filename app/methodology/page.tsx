import { methodology } from "@/lib/content";
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
    <>
      <PageHero
        kicker="Our Methodology"
        title="How Grade X actually operates."
        body="This methodology is presented as its own numbered sequence — evidence of a repeatable, professional process, not folded into general service descriptions."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/methodology", label: "Methodology" },
        ]}
      />
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <ol className="relative border-l border-gold/30 pl-8">
          {methodology.map((m) => (
            <li key={m.step} className="relative mb-14 last:mb-0">
              <span className="absolute top-1 -left-[41px] grid size-6 place-items-center rounded-full border border-gold bg-navy font-mono text-[10px] text-gold">
                {m.step}
              </span>
              <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
                Step {m.step}
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.7rem,2.6vw,2.15rem)] text-ivory">{m.title}</h2>
              <p className="gx-body mt-4">{m.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16">
          <Button href="/contact">Request a quote</Button>
        </div>
      </section>
    </>
  );
}
