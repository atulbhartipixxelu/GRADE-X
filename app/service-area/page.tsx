import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

const metros = [
  "Perth CBD",
  "North: Joondalup, Stirling, Wanneroo, Balga",
  "South: Fremantle, Cockburn, Rockingham",
  "East: Midland, Belmont, Canning",
  "West: Scarborough, Cambridge, Nedlands",
  "Wider WA by arrangement",
];

export const metadata = pageMeta(
  "Service area — Perth and Western Australia",
  "Grade X Commercial Solutions services the Perth metropolitan area and Western Australia from Balga. Confirm your site before requesting a quote.",
  "/service-area",
);

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        kicker="Where we work"
        title="Kitchen exhaust cleaning across Perth."
        body="A prospective client should confirm coverage in seconds. Grade X is based in Balga and attends commercial kitchens across the metro — with wider WA by arrangement."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/service-area", label: "Service area" },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-ivory">Coverage</h2>
          <ul className="mt-6 space-y-3">
            {metros.map((m) => (
              <li key={m} className="border-l border-gold pl-4 text-mist">
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-mist">
            Base: {site.address.full}. Emergency response is offered across the Perth metro.
          </p>
          <div className="mt-8">
            <Button href="/contact">Confirm your site</Button>
          </div>
        </div>
        <div className="min-h-[360px] border border-gold/20 bg-navy-2 relative overflow-hidden">
          <div className="grid-overlay absolute inset-0" />
          <svg viewBox="0 0 400 360" className="relative h-full w-full p-8 text-gold">
            <rect x="40" y="30" width="320" height="300" fill="none" stroke="currentColor" strokeOpacity="0.25" />
            <path
              d="M120 80 L280 70 L310 160 L260 280 L140 290 L90 180 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="188" cy="150" r="7" fill="currentColor" />
            <text x="202" y="154" fill="#f3eee4" fontSize="12">
              Balga HQ
            </text>
            <circle cx="200" cy="175" r="48" fill="none" stroke="currentColor" strokeDasharray="4 4" />
            <text x="70" y="330" fill="#b7c0cc" fontSize="11">
              Perth metropolitan schematic — not a street map
            </text>
          </svg>
        </div>
      </section>
    </>
  );
}
