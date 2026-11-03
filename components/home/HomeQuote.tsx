import { Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { replyWindow } from "@/lib/iso";
import { site } from "@/lib/site";

export function HomeQuote() {
  return (
    <section className="gx-home-quote" id="quote" aria-labelledby="gx-home-quote-heading">
      <div className="gx-home-quote-inner">
        <div className="gx-home-quote-panel">
          <div className="gx-home-quote-copy" data-aos="fade-right">
            <div>
              <p className="gx-home-quote-kicker">Quote</p>
              <h2 id="gx-home-quote-heading">
                Tell us about <em>your site.</em>
              </h2>
              <p>
                Let us know what you need, how many sites and your timing. We&apos;ll reply within{" "}
                {replyWindow}. If it&apos;s urgent, call {site.phone}.
              </p>
            </div>
            <ul className="gx-home-quote-facts">
              <li>
                <b>Reply</b>
                <span>Within {replyWindow}</span>
              </li>
              <li>
                <b>Urgent</b>
                <a href={site.phoneHref}>
                  <Phone strokeWidth={1.8} aria-hidden />
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
          <div className="gx-home-quote-card" data-aos="fade-left">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
