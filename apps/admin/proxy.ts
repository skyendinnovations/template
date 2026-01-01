import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated by checking for session cookie
  // Better Auth v1.0.0 uses "better-auth-session" as the default cookie name
  // const sessionCookie = request.cookies.get("better-auth-session");
  // const isAuthenticated = !!sessionCookie;

  // // If not authenticated and trying to access protected routes (like dashboard)
  // if (!isAuthenticated && pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  // // If authenticated and on home page, redirect to dashboard
  // if (isAuthenticated && pathname === "/") {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // // If authenticated and trying to access auth pages, redirect to dashboard
  // if (isAuthenticated && (pathname === "/signin" || pathname === "/signup")) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
