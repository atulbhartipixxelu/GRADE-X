import Image from "next/image";
import Link from "next/link";

export function MachinePassCard() {
  return (
    <div className="machine-pass relative w-full max-w-[300px] shrink-0">
      <div
        className="absolute inset-0 translate-x-2 translate-y-2 rounded-[22px] bg-gold/35"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-[22px] border border-white/40 bg-white/92 shadow-[0_22px_50px_rgba(10,42,94,0.28)] backdrop-blur-md">
        <div className="flex items-center justify-between px-4 pt-3">
          <p className="flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.18em] text-gold uppercase">
            <span className="live-dot size-1.5 rounded-full bg-gold" />
            Robotic platform
          </p>
        </div>

        <div className="relative mx-3 mt-3 aspect-[5/4] overflow-hidden rounded-[16px] bg-navy">
          <span className="pointer-events-none absolute top-2 left-2 z-10 size-3 border-t border-l border-ivory/40" />
          <span className="pointer-events-none absolute top-2 right-2 z-10 size-3 border-t border-r border-ivory/40" />
          <span className="pointer-events-none absolute bottom-2 left-2 z-10 size-3 border-b border-l border-ivory/40" />
          <span className="pointer-events-none absolute right-2 bottom-2 z-10 size-3 border-b border-r border-ivory/40" />
          <Image
            src="/robot/front.jpg"
            alt="Grade X robotic kitchen exhaust cleaning platform"
            fill
            className="object-contain p-3"
            sizes="280px"
            priority
          />
        </div>

        <div className="px-4 pt-3 pb-4">
          <p className="font-display text-[1.35rem] leading-none tracking-tight text-ivory">
            Kitchen exhaust robot
          </p>
          <p className="mt-1 font-sans text-[12px] tracking-[0.01em] text-mist">
            Dual hose · turret · camera
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href="/contact"
              className="flex-1 rounded-full bg-gold py-2.5 text-center font-sans text-[11px] font-semibold tracking-[0.12em] text-white uppercase"
            >
              Quote
            </Link>
            <Link
              href="/technology"
              className="flex-1 rounded-full border border-ivory/15 bg-white py-2.5 text-center font-sans text-[11px] font-semibold tracking-[0.12em] text-ivory uppercase"
            >
              Technology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
