import { CtaBanner } from "@/components/home/CtaBanner";
import { GalleryBanner } from "@/components/gallery/GalleryBanner";
import { GalleryBoard } from "@/components/gallery/GalleryBoard";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Work gallery",
  "Before-and-after photography from Grade X commercial kitchen hygiene. Supplied with every job.",
  "/gallery",
);

export default function GalleryPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <GalleryBanner />
      </div>

      <section className="gx-gal" aria-labelledby="gx-gal-heading">
        <div className="gx-gal-wrap">
          <header className="gx-gal-top" data-aos="fade-up">
            <p className="gx-gal-eyebrow">Work gallery</p>
            <div className="gx-gal-intro">
              <h2 id="gx-gal-heading">Gallery</h2>
              <p>Before-and-after photography supplied with every Grade X job.</p>
            </div>
          </header>
          <GalleryBoard />
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
