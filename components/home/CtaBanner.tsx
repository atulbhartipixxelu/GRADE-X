import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="bg-brand px-5 py-24 text-white sm:px-10 sm:py-32">
      <SectionHeading
        align="center"
        invert
        kicker="Emergency response"
        title="Emergency response is available across the Perth metro."
        body="This is a genuine service Grade X offers. Request a quote for planned work, or call for urgent kitchen exhaust issues."
      />
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/contact">Request a quote</Button>
        <Link
          href={site.phoneHref}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-[12px] font-semibold tracking-[0.12em] text-white uppercase"
        >
          {site.phone}
        </Link>
      </div>
    </section>
  );
}
