import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by the backend after staff change content, so an edit in the dashboard
 * shows on the site straight away instead of waiting out the revalidate window.
 *
 * Without this the pages are still correct, just up to five minutes stale; this
 * only shortens that to "immediately".
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  // With no secret configured the hook is closed rather than open.
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, reason: "REVALIDATE_SECRET is not set" },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  // Content changes ripple across listings, detail pages and the home page, so
  // the whole tree is refreshed rather than guessing which routes were touched.
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
