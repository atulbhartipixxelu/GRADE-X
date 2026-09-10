import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "FAQ — kitchen exhaust cleaning Perth",
  "Answers for facility managers and QSR operators: robotic process, service frequency, emergency response, evidence packs and Perth / WA coverage.",
  "/faq",
);

export default async function FaqPage() {
  const faqs = await store.faqs();
  return (
    <>
      <PageHero
        kicker="Questions operators ask"
        title="Kitchen exhaust FAQs in Perth."
        body="Frequency, robotics, urgent response, evidence, and whether we cover the site. Written for facility managers and QSR operators — and for search."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/faq", label: "FAQ" },
        ]}
      />
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.id} className="border border-gold/15 bg-navy-2 px-6 py-5">
              <summary className="cursor-pointer font-display text-lg text-ivory">
                {f.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-mist">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
