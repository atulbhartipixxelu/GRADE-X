import Image from "next/image";
import { site } from "@/lib/site";

export function PrivacyBanner() {
  return (
    <section className="gx-hero gx-legal-hero" aria-label="Privacy policy">
      <div className="gx-hero-media">
        <Image
          src="/evidence/service-report.jpg"
          alt="Hood cleaning service inspection report on a clipboard, with date, technician and status fields"
          fill
          priority
          className="gx-hero-video gx-gal-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Legal</p>
          <h1 className="gx-hero-title">
            <span>Privacy </span>
            <span>policy.</span>
          </h1>
          <p className="gx-hero-body">
            Last updated 3 November 2026. {site.legalName} explains how we handle personal
            information submitted through this website.
          </p>
        </div>
      </div>
    </section>
  );
}
