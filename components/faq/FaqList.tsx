"use client";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function FaqList({
  items,
}: {
  items: { id: string; question: string; answer: string }[];
}) {
  function onToggle(event: React.SyntheticEvent<HTMLDetailsElement>) {
    const current = event.currentTarget;
    if (!current.open) return;
    current
      .closest(".gx-faq-list")
      ?.querySelectorAll<HTMLDetailsElement>("details.gx-faq-row")
      .forEach((el) => {
        if (el !== current) el.open = false;
      });
  }

  return (
    <ol className="gx-faq-list">
      {items.map((faq, i) => (
        <li key={faq.id}>
          <details className="gx-faq-row" name="gx-faq" onToggle={onToggle}>
            <summary>
              <span className="gx-faq-num">{pad(i + 1)}</span>
              <span className="gx-faq-q">{faq.question}</span>
              <span className="gx-faq-mark" aria-hidden />
            </summary>
            <div className="gx-faq-a">
              <p>{faq.answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
