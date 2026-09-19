import Link from "next/link";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "FAQ — kitchen exhaust cleaning Perth",
  "Answers for facility managers and QSR operators: robotic process, service frequency, emergency response, evidence packs and Perth / WA coverage.",
  "/faq",
);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default async function FaqPage() {
  const faqs = await store.faqs();
  return (
    <InnerMotion>
      <section className="gx-faq" aria-label="Frequently asked questions">
        <header className="gx-faq-head">
          <p className="gx-faq-crumbs">
            <Link href="/">Home</Link>
            {" / "}
            <span>FAQ</span>
          </p>
          <div className="gx-faq-head-row">
            <div>
              <p className="gx-faq-kicker">FAQ</p>
              <h1>Questions before requesting a quote.</h1>
              <p className="gx-faq-lede">
                Service frequency, the robotic process, urgent response, and compliance evidence —
                written for facility managers and QSR operators.
              </p>
            </div>
            <p className="gx-faq-count">
              <b>{pad(faqs.length)}</b>
              <span>Answers on this page</span>
            </p>
          </div>
        </header>

        <ol className="gx-faq-list">
          {faqs.map((faq, i) => (
            <li key={faq.id}>
              <details className="gx-faq-item" data-rise>
                <summary>
                  <span className="gx-faq-num">{pad(i + 1)}</span>
                  <span className="gx-faq-q">{faq.question}</span>
                  <span className="gx-faq-mark" aria-hidden />
                </summary>
                <div className="gx-faq-a">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </li>
          ))}
        </ol>

        <aside className="gx-faq-foot" data-rise>
          <div>
            <p className="gx-faq-foot-kicker">Still deciding</p>
            <h2>Request a quote, or call for urgent kitchen exhaust issues.</h2>
            <p>
              Emergency response is available across the Perth metro. Perth metropolitan sites are
              prioritised.
            </p>
          </div>
          <div className="gx-faq-foot-actions">
            <Button href="/contact">Request a quote</Button>
            <a href={site.phoneHref} className="gx-faq-call">
              {site.phone}
            </a>
          </div>
        </aside>
      </section>
    </InnerMotion>
  );
}
