import Image from "next/image";
import { categoryAlts } from "@/lib/categoryMedia";

export function ServicesBanner() {
  return (
    <section className="gx-hero gx-svc-hero" aria-label="Grade X services">
      <div className="gx-hero-media">
        <Image
          src="/services/kitchen-exhaust-hood.jpg"
          alt={categoryAlts["kitchen-exhaust"]}
          fill
          priority
          className="gx-hero-video gx-gal-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Services</p>
          <h1 className="gx-hero-title">
            <span>All 21 </span>
            <span>Grade X services.</span>
          </h1>
          <p className="gx-hero-body">
            Organised into kitchen exhaust &amp; hygiene specialty, kitchen equipment cleaning,
            lobby &amp; front-of-house, and exterior &amp; general commercial. Each service has
            its own short description.
          </p>
        </div>
      </div>
    </section>
  );
}
