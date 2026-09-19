import Image from "next/image";
import Link from "next/link";

export function BrandLockup({
  className = "",
  priority = false,
  sizes = "200px",
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <span className={`gx-brand ${className}`}>
      <Image
        src="/brand/logo.png"
        alt=""
        width={1024}
        height={289}
        className="gx-brand-img"
        sizes={sizes}
        priority={priority}
        unoptimized
      />
    </span>
  );
}

export function Logo({
  href = "/",
  className = "",
  variant = "wordmark",
}: {
  href?: string;
  className?: string;
  variant?: "wordmark" | "lockup";
}) {
  return (
    <Link
      href={href}
      className={variant === "lockup" ? `gx-brand-link ${className}` : `gx-logo flex items-center gap-2.5 ${className}`}
      data-gx-logo={variant === "lockup" ? "header" : undefined}
      aria-label="Grade X Commercial Solutions home"
    >
      {variant === "lockup" ? (
        <BrandLockup className="gx-brand--nav" priority sizes="280px" />
      ) : (
        <>
          <span className="gx-logo-mark relative size-[2.85rem] shrink-0 overflow-hidden sm:size-[3.1rem]">
            <Image
              src="/brand/logo-shield.png"
              alt=""
              fill
              className="object-contain p-[3px]"
              sizes="50px"
              priority
            />
          </span>
          <span className="gx-logo-type min-w-0 leading-none">
            <span className="gx-logo-name">
              GRADE<span>X</span>
            </span>
            <span className="gx-logo-sub">Commercial Solutions Pty Ltd</span>
          </span>
        </>
      )}
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
