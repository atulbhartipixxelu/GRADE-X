import { capabilityPdf, isoClaim, isoReady, publishedIso, trustTicks } from "@/lib/iso";
import { IsoFacts } from "@/components/trust/IsoFacts";

export function TrustBar() {
  return (
    <section className="gx-trustbar" aria-label="Site controls">
      <div className="gx-trustbar-inner">
        <header className="gx-trustbar-head" data-aos="fade-right">
          <div>
            <p className="gx-trustbar-kicker">On record</p>
            <p className="gx-trustbar-lead">
              {isoReady
                ? `Certified to ${isoClaim}. Insurance and SWMS held on file.`
                : "Insurance, SWMS and job evidence held on file."}
            </p>
          </div>
          {capabilityPdf.ready ? (
            <a className="gx-trustbar-pack" href={capabilityPdf.href}>
              {capabilityPdf.label}
              <span>{capabilityPdf.meta}</span>
            </a>
          ) : null}
        </header>

        {isoReady ? (
          <ul className="gx-trustbar-isos">
            {publishedIso.map((item, index) => (
              <li key={item.id} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
                <article className="gx-trustbar-iso" id={`home-${item.id}`}>
                  <span className="gx-trustbar-iso-mark">ISO</span>
                  <strong>{item.code.replace("ISO ", "")}</strong>
                  <b>
                    {item.short}
                    {item.edition ? ` · ${item.edition}` : ""}
                  </b>
                  <IsoFacts item={item} />
                </article>
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="gx-trustbar-ticks" data-aos="fade-up">
          {trustTicks.map((tick) => (
            <li key={tick}>{tick}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
