const { NEXT_PUBLIC_API_BASE_URL } = process.env;


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {

    ignoreDuringBuilds: true,
  },
  images: {

    domains: ['stagingprojects.online']
  },
};

export default nextConfig;


// const { NEXT_PUBLIC_API_BASE_URL } = process.env;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     domains: [new URL(NEXT_PUBLIC_API_BASE_URL).hostname],
//   },
// };

// export default nextConfig;

