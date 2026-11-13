import { publishedIso } from "@/lib/iso";

type IsoItem = (typeof publishedIso)[number];

export function IsoFacts({
  item,
  extra = false,
}: {
  item: IsoItem;
  extra?: boolean;
}) {
  return (
    <>
      <dl className={`gx-iso-facts${extra ? " is-extra" : ""}`}>
        <div>
          <dt>Certificate</dt>
          <dd>{item.number}</dd>
        </div>
        <div>
          <dt>Certifier</dt>
          <dd>{item.certifier}</dd>
        </div>
        {extra ? (
          <>
            <div>
              <dt>Issued</dt>
              <dd>{item.issued}</dd>
            </div>
            <div>
              <dt>Expiry</dt>
              <dd>{item.expiry}</dd>
            </div>
            <div>
              <dt>Registration</dt>
              <dd>{item.registration}</dd>
            </div>
            <div>
              <dt>Next surveillance</dt>
              <dd>{item.surveillance}</dd>
            </div>
            <div className="gx-iso-scope">
              <dt>Scope</dt>
              <dd>{item.scope}</dd>
            </div>
          </>
        ) : (
          <>
            <div className="gx-iso-scope">
              <dt>Scope</dt>
              <dd>{item.scope}</dd>
            </div>
            <div>
              <dt>Expiry</dt>
              <dd>{item.expiry}</dd>
            </div>
          </>
        )}
      </dl>
      {item.pdf ? (
        <a className="gx-iso-pdf" href={item.pdf}>
          Download certificate
          <span>{item.pdfMeta}</span>
        </a>
      ) : null}
    </>
  );
}
