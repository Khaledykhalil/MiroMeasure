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
					// Allow being embedded by Miro (and keep it permissive otherwise)
					{
						key: 'Content-Security-Policy',
						value: "frame-ancestors 'self' https://miro.com https://*.miro.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
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
