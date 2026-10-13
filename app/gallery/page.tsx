import Link from "next/link";
import { GalleryBoard } from "@/components/gallery/GalleryBoard";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Work gallery",
  "Before-and-after photography from Grade X commercial kitchen hygiene. Supplied with every job.",
  "/gallery",
);

export default function GalleryPage() {
  return (
    <InnerMotion>
      <section className="gx-gal">
        <div className="gx-gal-top">
          <p className="gx-inner-crumbs">
            <Link href="/">Home</Link>
            {" / "}
            <span>Gallery</span>
          </p>
          <p className="gx-gal-eyebrow">Work gallery</p>
          <div className="gx-gal-intro">
            <h1>Gallery</h1>
            <p>Before-and-after photography supplied with every Grade X job.</p>
          </div>
        </div>

        <GalleryBoard />

        <div className="gx-gal-foot" data-rise>
          <Button href="/contact">Request a quote</Button>
        </div>
      </section>
    </InnerMotion>
  );
}
