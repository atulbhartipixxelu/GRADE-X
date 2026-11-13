import Image from "next/image";

export function TermsBanner() {
  return (
    <section className="gx-hero gx-legal-hero" aria-label="Terms of service">
      <div className="gx-hero-media">
        <Image
          src="/evidence/compliance.jpg"
          alt="Grade X ISO 9001:2015 certificate of registration from Globus Certifications"
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
            <span>Terms of </span>
            <span>service.</span>
          </h1>
          <p className="gx-hero-body">
            Last updated 3 November 2026. These terms cover use of this website. Cleaning work is
            governed by the quotation and any site agreement issued by Grade X.
          </p>
        </div>
      </div>
    </section>
  );
}
