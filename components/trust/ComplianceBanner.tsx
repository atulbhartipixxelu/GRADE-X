import Image from "next/image";
import { isoClaim, isoReady, publishedIso } from "@/lib/iso";

export function ComplianceBanner() {
  return (
    <section className="gx-hero gx-cmp-hero" aria-label="Compliance and WHS">
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
          <p className="gx-hero-kicker">Compliance and WHS</p>
          <h1 className="gx-hero-title">
            <span>Compliance </span>
            <span>you can check.</span>
          </h1>
          <p className="gx-hero-body">
            {isoReady
              ? `Grade X holds ${publishedIso.map((item) => `${item.code}:${item.edition}`).join(" and ")}, issued by ${publishedIso[0].certifier}. `
              : null}
            Every visit runs with insurance current for the work, SWMS where the job requires them,
            and a job record you can file.
          </p>
          {isoReady ? <p className="gx-faq-hero-meta">{isoClaim}</p> : null}
        </div>
      </div>
    </section>
  );
}
