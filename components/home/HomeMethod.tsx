import Link from "next/link";
import { methodology } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function HomeMethod() {
  return (
    <section className="gx-hmethod" aria-labelledby="gx-hmethod-heading">
      <div className="gx-hmethod-wrap">
        <header className="gx-hmethod-head">
          <p className="gx-hmethod-kicker">Our methodology</p>
          <div className="gx-hmethod-row">
            <div>
              <h2 id="gx-hmethod-heading">How Grade X actually operates</h2>
              <p>
                A dedicated numbered sequence — evidence of a repeatable, professional process, not
                folded into general service descriptions.
              </p>
            </div>
            <Button href="/methodology">View full methodology</Button>
          </div>
        </header>

        <ol className="gx-hmethod-grid">
          {methodology.map((item) => (
            <li key={item.step}>
              <Link href="/methodology" className="gx-hmethod-card">
                <span className="gx-hmethod-no">{item.step}</span>
                <div className="gx-hmethod-copy">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
