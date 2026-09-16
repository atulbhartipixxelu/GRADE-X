import { InnerMotion } from "@/components/inner/InnerMotion";
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
    <InnerMotion>
      <PageHero
        index="07"
        kicker="Service Area"
        title="Perth metropolitan / Western Australia."
        body="A prospective client can confirm Grade X services their location: Perth metropolitan and Western Australia, based at 5 Elward Way, Balga WA 6061."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/service-area", label: "Service area" },
        ]}
      />
      <section className="gx-inner-wrap gx-inner-split">
        <div className="gx-inner-copy" data-rise>
          <h2>Coverage</h2>
          <ul className="mt-6 space-y-3">
            {metros.map((m) => (
              <li key={m} className="border-l border-gold pl-4 text-mist">
                {m}
              </li>
            ))}
          </ul>
          <p>
            Base: {site.address.full}. Emergency response is offered across the Perth metro.
          </p>
          <div className="gx-inner-cta">
            <Button href="/contact">Confirm your site</Button>
          </div>
        </div>
        <div className="gx-inner-card min-h-[360px]" data-rise data-tilt>
          <svg viewBox="0 0 400 360" className="h-full w-full text-gold">
            <rect x="40" y="30" width="320" height="300" fill="none" stroke="currentColor" strokeOpacity="0.25" />
            <path
              d="M120 80 L280 70 L310 160 L260 280 L140 290 L90 180 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="188" cy="150" r="7" fill="currentColor" />
            <text x="202" y="154" fill="#f4f7fb" fontSize="12">
              Balga HQ
            </text>
            <circle cx="200" cy="175" r="48" fill="none" stroke="currentColor" strokeDasharray="4 4" />
            <text x="70" y="330" fill="#5a6b82" fontSize="11">
              Perth metropolitan schematic — not a street map
            </text>
          </svg>
        </div>
      </section>
    </InnerMotion>
  );
}
