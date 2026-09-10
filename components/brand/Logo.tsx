import Image from "next/image";
import Link from "next/link";

export function Logo({
  href = "/",
  variant = "color",
  className = "",
}: {
  href?: string;
  variant?: "color" | "onDark";
  className?: string;
}) {
  const src =
    variant === "onDark"
      ? "/brand/logo-lockup-dark.png"
      : "/brand/logo-lockup.png";

  return (
    <Link
      href={href}
      className={`relative block h-[3.35rem] w-[8.1rem] sm:h-[3.6rem] sm:w-[8.7rem] ${className}`}
      aria-label="Grade X Commercial Solutions home"
    >
      <Image
        src={src}
        alt="Grade X Commercial Solutions Pty Ltd"
        fill
        className="object-contain object-left"
        sizes="140px"
        priority
      />
    </Link>
  );
}

export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-shield.png"
      alt=""
      width={40}
      height={40}
      className={className}
      aria-hidden
    />
  );
}
