"use client";

export function Marquee({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track gap-10 pr-10">
        {children}
        {children}
      </div>
    </div>
  );
}
