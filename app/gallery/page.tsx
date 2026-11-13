import { CtaBanner } from "@/components/home/CtaBanner";
import { GalleryBanner } from "@/components/gallery/GalleryBanner";
import { GalleryBoard } from "@/components/gallery/GalleryBoard";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Work gallery",
  "Before-and-after photography from Grade X commercial kitchen hygiene. Every job includes photos you can file with insurers or brand auditors.",
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
            <h2 id="gx-gal-heading">
              Every job has <em>photographs.</em>
            </h2>
            <p>
              Before-and-after photography supplied with every Grade X job. Captions use the
              service and type of site. No client names.
            </p>
          </header>
          <GalleryBoard />
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
