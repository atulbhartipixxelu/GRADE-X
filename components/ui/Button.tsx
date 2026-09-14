import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost" | "line";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "gold",
  className = "",
  type = "button",
  disabled,
  onClick,
}: Props) {
  const cls = `gx-btn gx-btn--${variant} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
