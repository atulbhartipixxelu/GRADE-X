import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="gx-about-deck-firm gx-sos-band gx-cta" aria-labelledby="gx-sos-heading">
      <div className="gx-about-deck-firm-glow" aria-hidden />

      <div className="gx-cta-inner">
        <div className="gx-cta-copy" data-aos="fade-up">
          <p className="gx-cta-kicker">
            <i aria-hidden />
            Emergency
          </p>
          <h2 id="gx-sos-heading" className="gx-cta-title">
            Urgent kitchen exhaust problem?
          </h2>
          <p className="gx-cta-lead">Call {site.phone}.</p>
          <p className="gx-cta-note">
            We prioritise Perth metro sites. [Hours and target response time.]
          </p>
          <div className="gx-cta-actions">
            <Button href="/contact">Request a quote</Button>
          </div>
        </div>

        <a className="gx-cta-card" href={site.phoneHref} data-aos="fade-up" data-aos-delay="80">
          <span className="gx-cta-card-top">
            <span className="gx-cta-icon" aria-hidden>
              <Phone strokeWidth={1.7} />
            </span>
            <span className="gx-cta-live">
              <i /> Call
            </span>
          </span>
          <span className="gx-cta-phone">{site.phone}</span>
          <span className="gx-cta-card-note">Urgent kitchen exhaust issues.</span>
          <span className="gx-cta-meta">
            <span>Area</span>
            {site.serviceArea}
          </span>
        </a>
      </div>
    </section>
  );
}
