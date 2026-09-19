import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="gx-about-deck-firm gx-sos-band" aria-labelledby="gx-sos-heading">
      <div className="gx-about-deck-firm-glow" aria-hidden />

      <div className="gx-about-deck-firm-row">
        <div>
          <b>Emergency response</b>
          <h3 id="gx-sos-heading">{site.emergency}</h3>
          <p>Urgent kitchen exhaust issues.</p>
        </div>

        <p className="gx-about-deck-firm-note">
          This is a genuine service Grade X offers. Request a quote for planned work, or call for
          urgent kitchen exhaust issues.
        </p>

        <Button href="/contact">Request a quote</Button>
      </div>

      <ul className="gx-about-deck-firm-rail">
        <li>
          <span>Call</span>
          <a href={site.phoneHref}>{site.phone}</a>
        </li>
        <li>
          <span>Area</span>
          {site.serviceArea}
        </li>
      </ul>
    </section>
  );
}
