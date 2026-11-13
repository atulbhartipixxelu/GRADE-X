import Image from "next/image";

export function EvidenceBanner() {
  return (
    <section className="gx-hero gx-evd-hero" aria-label="Digital evidence">
      <div className="gx-hero-media">
        <Image
          src="/evidence/grease-measurement.jpg"
          alt="Operator reviewing digital measurement records on a rugged tablet"
          fill
          priority
          className="gx-hero-video gx-gal-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Digital evidence</p>
          <h1 className="gx-hero-title">
            <span>Every clean </span>
            <span>ends with proof.</span>
          </h1>
          <p className="gx-hero-body">
            Grease thickness measured in microns before and after. Photos. A service report listing
            what was cleaned and inspected. All of it filed against your site and ready for your
            insurer or brand auditor.
          </p>
        </div>
      </div>
    </section>
  );
}
