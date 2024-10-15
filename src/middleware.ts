import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If user is signed in and trying to access sign-in or sign-up pages
  if (token && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  // If user is not signed in and trying to access protected pages
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow the request to proceed as usual
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ["/auth/signin", "/auth/signup", "/dashboard/:path*"],
};
