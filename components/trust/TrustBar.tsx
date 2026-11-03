import Link from "next/link";
import { isoStandards, trustTicks } from "@/lib/iso";

const factTicks = trustTicks.filter((tick) => !tick.startsWith("Certified to ISO"));

export function TrustBar() {
  return (
    <section className="gx-trustbar" aria-label="Certifications and site controls">
      <div className="gx-trustbar-inner">
        <header className="gx-trustbar-head" data-aos="fade-right">
          <div>
            <p className="gx-trustbar-kicker">Certified systems</p>
            <p className="gx-trustbar-lead">{trustTicks[0]}</p>
          </div>
          <Link className="gx-trustbar-pack" href="/compliance">
            Certificate pack
          </Link>
        </header>

        <ul className="gx-trustbar-isos">
          {isoStandards.map((item, index) => (
            <li key={item.id} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
              <Link href={item.href} className="gx-trustbar-iso" aria-label={item.alt}>
                <span className="gx-trustbar-iso-mark">ISO</span>
                <strong>{item.code.replace("ISO ", "")}</strong>
                <b>{item.short}</b>
                <em>{item.line}</em>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="gx-trustbar-ticks" data-aos="fade-up">
          {factTicks.map((tick) => (
            <li key={tick}>{tick}</li>
          ))}
        </ul>

        <p className="gx-trustbar-note" data-aos="fade-up">
          Certificate numbers, certifier and expiry dates sit in our{" "}
          <Link href="/compliance">certificate pack</Link> once issued. Badges here are labelled
          placeholders until those files are published.
        </p>
      </div>
    </section>
  );
}
