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
        kicker="FAQ"
        title="Questions before requesting a quote."
        body="Service frequency, what the robotic process involves, response times for urgent issues, and how compliance evidence is provided. Written for facility managers and QSR operators."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/faq", label: "FAQ" },
        ]}
      />
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.id} className="gx-panel px-6 py-5">
              <summary className="cursor-pointer font-display text-[1.2rem] leading-snug text-ivory">
                {f.question}
              </summary>
              <p className="gx-body mt-4 text-[15px]">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
