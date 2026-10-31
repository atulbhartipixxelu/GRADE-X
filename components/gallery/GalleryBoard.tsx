"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { galleryShots } from "@/lib/gallery";

export function GalleryBoard() {
  const [open, setOpen] = useState<number | null>(null);
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
      <div className="gx-gal-board" id="gallery-board">
        {galleryShots.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className="gx-gal-tile"
            onClick={() => setOpen(i)}
            aria-label={item.title}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={i < 2}
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="gx-gal-tile-veil" aria-hidden />
            <span className="gx-gal-tile-cap">
              {item.label ? <em>{item.label}</em> : null}
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
            <Link href={shot.serviceHref} onClick={(event) => event.stopPropagation()}>
              View service
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
