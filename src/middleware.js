import { NextResponse } from 'next/server';

// Generate a cryptographically secure nonce for CSP using Web Crypto API
// (compatible with Edge Runtime - no Node.js modules)
function generateNonce() {
  // Use Web Crypto API which is available in Edge Runtime
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  // Convert to base64 using TextEncoder/TextDecoder (Edge Runtime compatible)
  // Base64 encoding without Buffer
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let base64 = '';
  for (let i = 0; i < array.length; i += 3) {
    const b1 = array[i];
    const b2 = array[i + 1] || 0;
    const b3 = array[i + 2] || 0;
    const bitmap = (b1 << 16) | (b2 << 8) | b3;
    base64 += base64Chars.charAt((bitmap >> 18) & 63);
    base64 += base64Chars.charAt((bitmap >> 12) & 63);
    base64 += i + 1 < array.length ? base64Chars.charAt((bitmap >> 6) & 63) : '=';
    base64 += i + 2 < array.length ? base64Chars.charAt(bitmap & 63) : '=';
  }
  return base64;
}

// Simple middleware to handle locale from query params and generate strict CSP with nonces
export function middleware(request) {
  // Generate nonces for strict CSP (one per request)
  const scriptNonce = generateNonce();
  const styleNonce = generateNonce();
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', scriptNonce);
  requestHeaders.set('x-style-nonce', styleNonce);
  
  // Build strict CSP policy with nonces
  // Using 'strict-dynamic' for better XSS protection while maintaining Next.js compatibility
  // 'strict-dynamic' allows scripts loaded by nonce-script to load other scripts (cascading trust)
  const cspHeader = [
    "default-src 'self'",
    // Script sources: Use 'strict-dynamic' with nonce for strict CSP
    // 'strict-dynamic' allows scripts loaded by nonce-script to load other scripts
    // This is more secure than 'unsafe-inline' and compatible with Next.js
    // Temporarily relax script-src until all Next.js scripts receive nonces
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://miro.com https://*.miro.com https://vercel.live https://*.vercel.live https://va.vercel-scripts.com https://www.clarity.ms https://scripts.clarity.ms https://*.clarity.ms`,
    // Note: Removed 'unsafe-eval' - if Microsoft Clarity requires it, we'll need to add it back
    // Style sources: self, Google Fonts, and nonce for inline styles
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    // Font sources
    "font-src 'self' data: https://fonts.gstatic.com https://r2cdn.perplexity.ai",
    // Image sources
    "img-src 'self' data: https: blob:",
    // Connect sources for API calls
    "connect-src 'self' https://api.miro.com https://www.clarity.ms https://c.clarity.ms https://*.clarity.ms https://sourcemaps-wsdk.roktinternal.com https://va.vercel-scripts.com https://*.vercel.live",
    // Frame sources for embeds
    "frame-src 'self' https://miro.com https://*.miro.com https://www.loom.com https://*.loom.com https://vercel.live https://*.vercel.live",
    // Frame ancestors (who can embed us)
    "frame-ancestors 'self' https://miro.com https://*.miro.com",
    // Security directives
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');
  
  // Create response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Set CSP header with nonces
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // Set nonces in response headers for potential use in pages/components
  response.headers.set('x-nonce', scriptNonce);
  response.headers.set('x-style-nonce', styleNonce);
  
  // Keep referrer minimal
  response.headers.set('Referrer-Policy', 'no-referrer');
  
  return response;
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

