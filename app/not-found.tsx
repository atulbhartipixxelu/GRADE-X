import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <p className="font-mono text-[11px] tracking-[0.32em] text-gold uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl text-ivory">Page not in the system.</h1>
      <p className="mt-4 text-mist">The route does not exist. Return home or request a quote.</p>
      <div className="mt-10 flex justify-center gap-4">
        <Button href="/">Home</Button>
        <Button href="/contact" variant="ghost">
          Quote
        </Button>
      </div>
    </div>
  );
}
