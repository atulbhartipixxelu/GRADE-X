import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function GalleryBanner() {
  return (
    <section className="gx-hero gx-gal-hero" aria-label="Work gallery">
      <div className="gx-hero-media">
        <Image
          src="/gallery/cookline-after.jpg"
          alt="Polished stainless cookline pipes and flanges after hygiene cleaning"
          fill
          priority
          className="gx-hero-video gx-gal-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Work gallery</p>
          <h1 className="gx-hero-title">
            <span>Before-and-after</span>
            <span>photography.</span>
          </h1>
          <p className="gx-hero-body">
            Before-and-after photography supplied with every Grade X job.
          </p>
          <div className="gx-hero-actions">
            <Button href="/contact">Request a quote</Button>
            <a className="gx-hero-play" href="#gallery-board">
              <span className="gx-hero-play-icon">
                <Play strokeWidth={2} />
                <i />
                <i />
              </span>
              View the work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
