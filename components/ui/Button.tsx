import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost" | "line";
  className?: string;
};

export function Button({ href, children, variant = "gold", className = "" }: Props) {
  const styles = {
    gold: "bg-gold text-white hover:bg-gold-2 border-gold",
    ghost: "bg-transparent text-ivory hover:border-gold border-ivory/20",
    line: "bg-transparent text-ivory border-transparent px-0 underline-offset-4 hover:underline",
  }[variant];

  const cls = `inline-flex items-center justify-center rounded-full border px-7 py-3.5 font-sans text-[12px] font-semibold tracking-[0.12em] uppercase transition ${styles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <span className={cls}>{children}</span>;
}
