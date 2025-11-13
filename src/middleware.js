import { NextResponse } from 'next/server';

// Simple middleware to handle locale from query params
// For now, we're using query params (?lang=ru) instead of path-based routing
export function middleware(request) {
  // Allow all requests to pass through
  // Locale handling is done client-side via query params
  return NextResponse.next();
}

export const config = {
  // Match all routes except API routes and static files
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

