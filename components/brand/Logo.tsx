import Image from "next/image";
import Link from "next/link";

export function Logo({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`gx-logo flex items-center gap-2.5 ${className}`}
      aria-label="Grade X Commercial Solutions home"
    >
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
