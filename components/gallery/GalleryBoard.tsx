"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { galleryItems, galleryShots } from "@/lib/gallery";

const filters = ["All", "Exhaust", "Canopy", "Equipment", "Lobby", "Exterior"] as const;

function groupFilter(kicker: string) {
  const k = kicker.toLowerCase();
  if (k.includes("exhaust")) return "Exhaust";
  if (k.includes("canopy")) return "Canopy";
  if (k.includes("lobby")) return "Lobby";
  if (k.includes("exterior")) return "Exterior";
  return "Equipment";
}

export function GalleryBoard() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const shots = useMemo(() => {
    if (filter === "All") return galleryShots.map((shot, index) => ({ shot, index }));
    const allowed = new Set(
      galleryItems
        .filter((item) => groupFilter(item.kicker) === filter)
        .flatMap((item) => item.images.map((image) => image.src)),
    );
    return galleryShots
      .map((shot, index) => ({ shot, index }))
      .filter((entry) => allowed.has(entry.shot.src));
  }, [filter]);

  const shot = open !== null ? galleryShots[open] : null;

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") {
        setOpen((cur) => (cur === null ? cur : (cur + 1) % galleryShots.length));
      }
      if (event.key === "ArrowLeft") {
        setOpen((cur) =>
          cur === null ? cur : (cur - 1 + galleryShots.length) % galleryShots.length,
        );
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="gx-gal-toolbar">
        <div className="gx-gal-filters" role="tablist" aria-label="Filter gallery">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? "is-on" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="gx-gal-count">
          <b>{String(shots.length).padStart(2, "0")}</b>
          <span>/ {String(galleryShots.length).padStart(2, "0")}</span>
        </p>
      </div>
      {filter !== "All" && shots.length === 0 ? (
        <p className="gx-gal-empty">
          No {filter.toLowerCase()} photographs on file yet. Those pairs will be added with the same
          camera angle, a service caption and a date once they are supplied.
        </p>
      ) : null}
      <div className="gx-gal-board" id="gallery-board">
        {shots.map(({ shot: item, index }) => (
          <button
            key={item.src}
            type="button"
            className="gx-gal-tile"
            onClick={() => setOpen(index)}
            aria-label={item.title}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={index < 2}
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="gx-gal-tile-veil" aria-hidden />
            <span className="gx-gal-tile-cap">
              {item.label ? <em>{item.label}</em> : <em>Job photo</em>}
              <strong>{item.title}</strong>
            </span>
          </button>
        ))}
      </div>

      {shot && open !== null ? (
        <div className="gx-gal-lite" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button type="button" className="gx-gal-lite-x" onClick={() => setOpen(null)}>
            Close
          </button>
          <div className="gx-gal-lite-meta">
            <p className="gx-gal-lite-name">{shot.title}</p>
            <p>{shot.caption}</p>
            <p>Reading: [before / after microns to be added next to each pair].</p>
            <Link href={shot.serviceHref} onClick={(event) => event.stopPropagation()}>
              View {shot.title.replace(" — Before", "").replace(" — After", "")}
            </Link>
          </div>
          <figure onClick={(event) => event.stopPropagation()}>
            <Image src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-contain" />
          </figure>
        </div>
      ) : null}
    </>
  );
}
