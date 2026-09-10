import Link from "next/link";

export function Doubled({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`doubled inline-flex flex-wrap ${className}`}>
      {text.split("").map((ch, i) => (
        <span key={`${ch}${i}`} className="doubled__pair">
          <span>{ch === " " ? "\u00A0" : ch}</span>
          <span aria-hidden>{ch === " " ? "\u00A0" : ch}</span>
        </span>
      ))}
    </span>
  );
}

export function StaggerLink({
  href,
  text,
  className = "",
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`inline-flex ${className}`}>
      <Doubled text={text} />
    </Link>
  );
}
