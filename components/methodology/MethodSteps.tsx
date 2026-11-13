import { methodology } from "@/lib/content";

function gates(rule: string) {
  const at = rule.indexOf(" Fail:");
  if (at < 0) return { pass: rule.replace(/^Pass:\s*/i, ""), fail: "" };
  return {
    pass: rule.slice(0, at).replace(/^Pass:\s*/i, "").trim(),
    fail: rule.slice(at + 6).trim(),
  };
}

export function MethodSteps() {
  return (
    <section className="gx-method" aria-labelledby="gx-method-heading">
      <div className="gx-method-wrap">
        <header className="gx-about-story-head" data-aos="fade-up">
          <p className="gx-about-story-kicker">The method</p>
          <h2 id="gx-method-heading">Eight steps, written as pass or fail.</h2>
        </header>

        <ol className="gx-method-list">
          {methodology.map((item, i) => {
            const rule = gates(item.pass);
            return (
              <li key={item.step}>
                <article className="gx-method-step" data-aos="fade-up" data-aos-delay={String((i % 3) * 40)}>
                  <span className="gx-method-no" aria-hidden>
                    {item.step}
                  </span>
                  <div className="gx-method-copy">
                    <p className="gx-method-kicker">Step {item.step}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <div className="gx-method-gates">
                    <p>
                      <span>Pass</span>
                      {rule.pass}
                    </p>
                    {rule.fail ? (
                      <p className="is-fail">
                        <span>Fail</span>
                        {rule.fail}
                      </p>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
