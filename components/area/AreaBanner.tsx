import Image from "next/image";
import { site } from "@/lib/site";

export function AreaBanner() {
  return (
    <section className="gx-hero gx-area-hero" aria-label="Service area">
      <div className="gx-hero-media">
        <Image
          src="/services/kitchen-exhaust-hood.jpg"
          alt="Stainless commercial kitchen exhaust canopy with baffle filters, drop rods and work lights"
          fill
          priority
          className="gx-hero-video gx-gal-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Service area</p>
          <h1 className="gx-hero-title">
            <span>Perth metropolitan. </span>
            <span>Western Australia.</span>
          </h1>
          <p className="gx-hero-body">
            Grade X is based at {site.address.full}. We service the Perth metropolitan area and
            Western Australia. Confirm your site before requesting a quote.
          </p>
        </div>
      </div>
    </section>
  );
}
