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
	},
	eslint: {
		ignoreDuringBuilds: true,
	  },
};

export default nextConfig;
