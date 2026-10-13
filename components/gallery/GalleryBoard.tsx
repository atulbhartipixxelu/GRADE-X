"use client";

import Image from "next/image";
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
      <div className="gx-gal-board">
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
          </button>
        ))}
      </div>

      {shot && open !== null ? (
        <div className="gx-gal-lite" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button type="button" className="gx-gal-lite-x" onClick={() => setOpen(null)}>
            Close
          </button>
          <p className="gx-gal-lite-name">{shot.title}</p>
          <figure onClick={(event) => event.stopPropagation()}>
            <Image src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-contain" />
          </figure>
        </div>
      ) : null}
    </>
  );
}
