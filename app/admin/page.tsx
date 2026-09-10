import Link from "next/link";
import { store } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminHomePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const quotes = await store.quotes();
  const unread = quotes.filter((q) => q.status === "new").length;

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <header className="flex items-center justify-between border-b border-gold/15 px-6 py-4">
        <p className="font-display text-lg">Grade X CMS</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-mist">{session.email}</span>
          <Link href="/" className="text-gold">
            View site
          </Link>
          <LogoutButton />
        </div>
      </header>
      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 md:grid-cols-3">
        <Card href="/admin/quotes" title="Quote requests" meta={`${unread} new · ${quotes.length} total`} />
        <Card href="/admin/content" title="Services, FAQs, blog" meta="Edit site content" />
        <Card href="/admin/settings" title="Settings" meta="Notification email & GA" />
      </div>
    </div>
  );
}

function Card({ href, title, meta }: { href: string; title: string; meta: string }) {
  return (
    <Link href={href} className="border border-gold/20 p-6 hover:border-gold">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-mist">{meta}</p>
    </Link>
  );
}
