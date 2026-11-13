import { CtaBanner } from "@/components/home/CtaBanner";
import { FaqBanner } from "@/components/faq/FaqBanner";
import { FaqList } from "@/components/faq/FaqList";
import { InnerMotion } from "@/components/inner/InnerMotion";
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
      <div className="gx-hero-stack">
        <FaqBanner count={faqs.length} />
      </div>

      <section className="gx-faq" aria-label="Frequently asked questions">
        <FaqList items={faqs} />
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
