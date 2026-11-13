"use client";

export function SkipLink() {
  return (
    <a
      className="gx-skip"
      href="#main"
      onClick={() => {
        window.requestAnimationFrame(() => {
          document.getElementById("main")?.focus();
        });
      }}
    >
      Skip to main content
    </a>
  );
}
