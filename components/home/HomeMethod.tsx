import Link from "next/link";
import { methodology } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function HomeMethod() {
  return (
    <section className="gx-hmethod" aria-labelledby="gx-hmethod-heading">
      <div className="gx-hmethod-wrap">
        <header className="gx-hmethod-head" data-aos="method-head">
          <p className="gx-hmethod-kicker">Our methodology</p>
          <h2 id="gx-hmethod-heading">How Grade X actually operates</h2>
          <p>
            A dedicated numbered sequence — evidence of a repeatable, professional process, not
            folded into general service descriptions.
          </p>
          <Button href="/methodology">View full methodology</Button>
        </header>

        <ol className="gx-hmethod-path">
          {methodology.map((item, i) => (
            <li
              key={item.step}
              className={i % 2 ? "is-right" : "is-left"}
              data-aos={i % 2 ? "method-right" : "method-left"}
              data-aos-delay={String((i % 4) * 90)}
            >
              <b className="gx-hmethod-no">{item.step}</b>
              <Link href="/methodology" className="gx-hmethod-step">
                <span className="gx-hmethod-ghost" aria-hidden>
                  {item.step}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="gx-hmethod-go" aria-hidden>
                  <i />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
