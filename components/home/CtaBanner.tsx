import Link from "next/link";
import { Doubled } from "@/components/ui/StaggerLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="px-5 py-24 sm:px-10 sm:py-32">
      <SectionHeading
        align="center"
        kicker="Before the next audit"
        title="Book a measured clean for your Perth site."
        body="Filmed, photographed, micron-read. Request a quote before the next inspection window closes."
      />
      <div className="mt-10 flex flex-wrap justify-center gap-10 text-3xl">
        <Link href="/contact" className="text-ivory">
          <Doubled text="Get your quote" />
        </Link>
        <Link href="/technology" className="text-ivory">
          <Doubled text="Explore machine" />
        </Link>
      </div>
      <p className="mt-8 text-center text-sm text-mist">{site.phone}</p>
    </section>
  );
}
