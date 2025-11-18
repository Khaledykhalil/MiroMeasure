import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// Explicitly allow static files (SVG, images, etc.)
				// Note: CSP headers are now set in middleware.js for dynamic nonce generation
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
