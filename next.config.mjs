/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
		  {
			source: '/',
			destination: '/geo',
			permanent: true, // or false for temporary redirects
		  },
		]
	}
};

export default nextConfig;
