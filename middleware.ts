
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = new URL(req.url);
  
  // Handle protected routes
  if (pathname.startsWith("/secret")) {
    const cookie = req.cookies.get("x-pass")?.value;
    const pass = searchParams.get("pass");

    if (cookie === process.env.SECRET_PASS || pass === process.env.SECRET_PASS) {
      const res = NextResponse.next();
      if (pass) res.cookies.set("x-pass", pass, { httpOnly: true, path: "/" });
      return res;
    }

    return NextResponse.redirect(new URL("/?need_pass=1", req.url));
  }

  // Next.js i18n will handle locale routing automatically
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|static).*)',
    // Optional: only run on root (/) URL
    // '/'
  ]
};
