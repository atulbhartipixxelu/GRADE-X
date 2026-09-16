import { InnerMotion } from "@/components/inner/InnerMotion";
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
    <InnerMotion>
      <PageHero
        index="09"
        kicker="FAQ"
        title="Questions before requesting a quote."
        body="Service frequency, what the robotic process involves, response times for urgent issues, and how compliance evidence is provided. Written for facility managers and QSR operators."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/faq", label: "FAQ" },
        ]}
      />
      <section className="gx-inner-wrap max-w-4xl">
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.id} className="gx-inner-card" data-rise>
              <summary className="text-[1.15rem] leading-snug text-ivory">{f.question}</summary>
              <p className="gx-body mt-4 text-[15px]">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </InnerMotion>
  );
}
