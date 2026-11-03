"use client";

import Link from "next/link";
import type { PointerEvent } from "react";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost" | "line" | "urgent";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const box = el.getBoundingClientRect();
  const x = ((event.clientX - box.left) / Math.max(1, box.width)) * 100;
  const y = ((event.clientY - box.top) / Math.max(1, box.height)) * 100;
  el.style.setProperty("--gx-x", `${x.toFixed(2)}%`);
  el.style.setProperty("--gx-y", `${y.toFixed(2)}%`);
}

const pointer = {
  onPointerMove: trackPointer,
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
      <Link href={href} className={cls} {...pointer}>
        <span className="gx-btn-label">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick} {...pointer}>
      <span className="gx-btn-label">{children}</span>
    </button>
  );
}
