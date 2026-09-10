import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET() {
  try {
    await requireAdmin();
    const [services, faqs, testimonials, caseStudies, posts, settings] = await Promise.all([
      store.services(),
      store.faqs(),
      store.testimonials(),
      store.caseStudies(),
      store.posts(),
      store.settings(),
    ]);
    return NextResponse.json({ services, faqs, testimonials, caseStudies, posts, settings });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    if (body.services) await store.saveServices(body.services);
    if (body.faqs) await store.saveFaqs(body.faqs);
    if (body.testimonials) await store.saveTestimonials(body.testimonials);
    if (body.caseStudies) await store.saveCaseStudies(body.caseStudies);
    if (body.posts) await store.savePosts(body.posts);
    if (body.settings) await store.saveSettings(body.settings);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
