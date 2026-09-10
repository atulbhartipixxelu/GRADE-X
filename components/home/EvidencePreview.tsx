import { reportContents } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function EvidencePreview() {
  return (
    <section className="px-5 py-16 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          kicker="Digital evidence & reporting"
          title="What a client receives after every job."
          body="Objective grease-thickness measurement before and after every clean, live video during the clean, and photographic before/after evidence. This is a genuine service feature, not a generic quality claim."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportContents.map((item, i) => (
            <li key={item} className="border border-[var(--line)] bg-white p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-ivory">{item}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/digital-evidence">Digital evidence</Button>
        </div>
      </div>
    </section>
  );
}
