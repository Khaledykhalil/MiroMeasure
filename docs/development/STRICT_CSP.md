# Strict Content Security Policy (CSP) Implementation

**Last Updated:** November 17, 2025

## Overview

MeasureMint now uses a **strict CSP** with nonces instead of the previous allowlist-based CSP. This provides better protection against XSS attacks while maintaining compatibility with Next.js and third-party services.

## What Changed

### Before (Allowlist CSP)
- Used `'unsafe-inline'` for scripts and styles
- Less secure against XSS attacks
- Easier to implement but vulnerable

### After (Strict CSP)
- Uses **nonces** (cryptographically random tokens) for inline scripts/styles
- Uses **`strict-dynamic`** for cascading script trust
- More secure against XSS attacks
- Removed `'unsafe-inline'` from script-src and style-src

## Implementation Details

### Middleware-Based CSP (`src/middleware.js`)

The CSP is now generated dynamically in middleware with unique nonces per request:

```javascript
// Generate nonces per request
const scriptNonce = generateNonce();
const styleNonce = generateNonce();

// CSP with nonces and strict-dynamic
script-src 'self' 'nonce-{scriptNonce}' 'strict-dynamic' https://...
style-src 'self' 'nonce-{styleNonce}' https://...
```

### Key Features

1. **Nonces**: Unique per-request tokens for inline scripts/styles
2. **`strict-dynamic`**: Allows scripts loaded by nonce-script to load other scripts (cascading trust)
3. **Removed `'unsafe-inline'`**: No longer allows arbitrary inline scripts
4. **Removed `'unsafe-eval'`**: Removed for better security (may need to add back if Microsoft Clarity requires it)

## Security Benefits

✅ **Better XSS Protection**: Nonces prevent injection of unauthorized inline scripts  
✅ **Cascading Trust**: `strict-dynamic` allows legitimate scripts to load dependencies  
✅ **Per-Request Security**: Each request gets unique nonces  
✅ **No Unsafe Directives**: Removed `'unsafe-inline'` and `'unsafe-eval'` (where possible)

## Compatibility Notes

### Next.js Compatibility
- Next.js Script components should work automatically
- Next.js hydration scripts are handled via `strict-dynamic`
- No changes needed to existing Script components

### Third-Party Services
- **Miro SDK**: ✅ Works (external script)
- **Vercel Analytics**: ✅ Works (external script)
- **Microsoft Clarity**: ⚠️ May require `'unsafe-eval'` - monitor for errors
- **Google Fonts**: ✅ Works (external stylesheet)

## Testing

After deployment, check browser console for CSP violations:

1. **Expected**: No CSP errors for legitimate resources
2. **If Microsoft Clarity fails**: Add `'unsafe-eval'` back to script-src
3. **If Next.js scripts fail**: Verify `strict-dynamic` is working

## Adding `'unsafe-eval'` Back (If Needed)

If Microsoft Clarity or other services require `'unsafe-eval'`, update `src/middleware.js`:

```javascript
`script-src 'self' 'nonce-${scriptNonce}' 'strict-dynamic' 'unsafe-eval' https://...`
```

⚠️ **Security Note**: `'unsafe-eval'` reduces security but may be necessary for some third-party SDKs.

## Monitoring

Watch for CSP violations in:
- Browser console (client-side)
- Server logs (server-side)
- Vercel Analytics (production)

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Strict CSP Guide](https://web.dev/strict-csp/)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)

