"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categoryMeta, services, type ServiceCategory } from "@/lib/content";
import { categoryImages } from "@/lib/categoryMedia";

const order: ServiceCategory[] = [
  "kitchen-exhaust",
  "kitchen-equipment",
  "lobby",
  "exterior",
];

const railLabel: Record<ServiceCategory, string> = {
  "kitchen-exhaust": "Kitchen exhaust",
  "kitchen-equipment": "Kitchen equipment",
  lobby: "Lobby & front-of-house",
  exterior: "Exterior",
};

const groups = order.map((id, i) => ({
  id,
  n: String(i + 1).padStart(2, "0"),
  rail: railLabel[id],
  title: categoryMeta[id].title,
  description: categoryMeta[id].description,
  image: categoryImages[id],
  items: services.filter((item) => item.category === id),
}));

export function ServicesMega({ active }: { active: boolean }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const closeTimer = useRef(0);
  const skipHover = useRef(false);
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState<ServiceCategory>("kitchen-exhaust");
  const group = groups.find((item) => item.id === cat) ?? groups[0];

  const show = () => {
    if (skipHover.current) return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 280);
  };

  const toggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    window.clearTimeout(closeTimer.current);
    if (open) {
      skipHover.current = true;
      setOpen(false);
      return;
    }
    skipHover.current = false;
    setOpen(true);
  };

  const stillInside = (node: EventTarget | null) => {
    const nav = root.current?.closest(".gx-nav");
    return Boolean(
      node instanceof Node && (root.current?.contains(node) || nav?.contains(node)),
    );
  };

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };

    const nav = root.current?.closest<HTMLElement>(".gx-nav");
    const onNavLeave = (event: globalThis.MouseEvent) => {
      if (stillInside(event.relatedTarget)) return;
      hide();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    nav?.addEventListener("mouseleave", onNavLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      nav?.removeEventListener("mouseleave", onNavLeave);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={root}
      className={`gx-mega ${open ? "is-open" : ""}`}
      onMouseEnter={show}
      onMouseLeave={(event) => {
        skipHover.current = false;
        if (stillInside(event.relatedTarget)) return;
        hide();
      }}
    >
      <Link
        href="/services"
        className={`gx-nav-link gx-mega-trigger ${active || open ? "is-on" : ""}`}
        onFocus={show}
      >
        Services
      </Link>
      <button
        type="button"
        className={`gx-mega-plus ${open ? "is-on" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={open ? "Close services menu" : "Open services menu"}
        onClick={toggle}
      >
        <i className="gx-mega-mark" aria-hidden />
      </button>

      <span className="gx-mega-bridge" aria-hidden />
      <div className="gx-mega-veil" aria-hidden />

      <div className="gx-mega-panel" aria-hidden={!open} aria-label="Services">
        <div className="gx-mega-inner">
          <div className="gx-mega-rail" role="tablist" aria-label="Service categories">
            {groups.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === cat}
                className={`gx-mega-tab ${item.id === cat ? "is-on" : ""}`}
                onMouseEnter={() => setCat(item.id)}
                onFocus={() => setCat(item.id)}
                onClick={() => setCat(item.id)}
              >
                <span>{item.n}</span>
                {item.rail}
              </button>
            ))}
          </div>

          <div className="gx-mega-list" key={group.id}>
            <p className="gx-mega-kicker">
              {group.n} / {String(groups.length).padStart(2, "0")}
            </p>
            <h3 className="gx-mega-title">{group.title}</h3>
            <p className="gx-mega-copy">{group.description}</p>
            <ul>
              {group.items.map((item, i) => (
                <li key={item.slug} style={{ ["--i" as string]: String(i) }}>
                  <Link href={`/services/${item.slug}`} onClick={() => setOpen(false)}>
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/services#${group.id}`}
            className="gx-mega-shot"
            onClick={() => setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={group.image} alt="" />
            <span>
              <b>{String(group.items.length).padStart(2, "0")}</b>
              services in this category
            </span>
          </Link>
        </div>

        <div className="gx-mega-bar">
          <p>{String(services.length).padStart(2, "0")} services across four categories</p>
          <Link href="/services" onClick={() => setOpen(false)}>
            View all services
          </Link>
        </div>
      </div>
    </div>
  );
}
