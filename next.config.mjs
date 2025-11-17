import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// Apply to all routes except static files
				source: '/:path*',
				headers: [
					// Comprehensive CSP policy
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://miro.com https://*.miro.com https://vercel.live https://*.vercel.live https://va.vercel-scripts.com https://www.clarity.ms https://scripts.clarity.ms https://*.clarity.ms",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' data: https://fonts.gstatic.com https://r2cdn.perplexity.ai",
							"img-src 'self' data: https: blob:",
							"connect-src 'self' https://api.miro.com https://www.clarity.ms https://c.clarity.ms https://*.clarity.ms https://sourcemaps-wsdk.roktinternal.com https://va.vercel-scripts.com https://*.vercel.live",
							"frame-src 'self' https://miro.com https://*.miro.com https://www.loom.com https://*.loom.com https://vercel.live https://*.vercel.live",
							"frame-ancestors 'self' https://miro.com https://*.miro.com",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"upgrade-insecure-requests",
						].join('; '),
					},
					// Keep referrer minimal
					{ key: 'Referrer-Policy', value: 'no-referrer' },
				],
			},
			{
				// Explicitly allow static files (SVG, images, etc.)
				source: '/:path*\\.(svg|png|jpg|jpeg|gif|ico|webp|woff|woff2|ttf|eot)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
				],
			},
		];
	},
};

// For now, don't use next-intl plugin since we're using query params
// export default withNextIntl(nextConfig);
export default nextConfig;
