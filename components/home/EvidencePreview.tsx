import { testimonials } from "@/lib/content";
import { Marquee } from "@/components/layout/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EvidencePreview() {
  return (
    <section className="py-16">
      <div className="mx-auto mb-10 max-w-[1400px] px-5 sm:px-10">
        <SectionHeading
          kicker="Kitchens on file"
          title="What operators say after the pass."
        />
      </div>
      <Marquee>
        {testimonials.concat(testimonials).map((t, i) => (
          <article
            key={`${t.id}-${i}`}
            className="w-[min(80vw,420px)] shrink-0 border border-ivory/10 p-8"
          >
            <p className="font-display text-3xl leading-snug tracking-tight text-ivory">
              “{t.quote.split(".")[0]}.”
            </p>
            <p className="mt-4 text-sm text-mist">
              @{t.organisation.replace(/\s+/g, "").toLowerCase()}
            </p>
          </article>
        ))}
      </Marquee>
    </section>
  );
}
