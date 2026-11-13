import Image from "next/image";

export function MethodBanner() {
  return (
    <section className="gx-hero gx-method-hero" aria-label="Our methodology">
      <div className="gx-hero-media">
        <Image
          src="/slides/weir-wash.jpg"
          alt="Interior steam washing of kitchen exhaust"
          fill
          priority
          className="gx-hero-video gx-gal-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Our methodology</p>
          <h1 className="gx-hero-title">
            <span>Eight steps. </span>
            <span>Each one checkable.</span>
          </h1>
          <p className="gx-hero-body">
            Inspect, measure, protect, steam-wash, clean, inspect, re-measure, report. Each step has
            a pass or fail rule so a facility manager can see what counted.
          </p>
        </div>
      </div>
    </section>
  );
}
