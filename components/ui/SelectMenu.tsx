"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

export function SelectMenu({
  name,
  value,
  options,
  placeholder = "Select",
  required = false,
  onChange,
}: {
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((item) => item.value === value);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`gx-select${open ? " is-open" : ""}`} ref={root}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        className="gx-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((next) => !next)}
      >
        <span className={current ? "" : "is-ph"}>{current?.label || placeholder}</span>
        <ChevronDown strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <ul className="gx-select-menu" role="listbox">
          {options.map((item) => (
            <li key={item.value}>
              <button
                type="button"
                className={`gx-select-option${item.value === value ? " is-on" : ""}`}
                role="option"
                aria-selected={item.value === value}
                onClick={() => {
                  onChange?.(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
