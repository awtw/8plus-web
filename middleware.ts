
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Quick demo: protect /secret route by checking cookie or query ?pass=
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = new URL(req.url);
  if (!pathname.startsWith("/secret")) return;

  const cookie = req.cookies.get("x-pass")?.value;
  const pass = searchParams.get("pass");

  if (cookie === process.env.SECRET_PASS || pass === process.env.SECRET_PASS) {
    const res = NextResponse.next();
    if (pass) res.cookies.set("x-pass", pass, { httpOnly: true, path: "/" });
    return res;
  }

  return NextResponse.redirect(new URL("/?need_pass=1", req.url));
}

export const config = {
  matcher: ["/secret/:path*"]
};
