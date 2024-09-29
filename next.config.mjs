/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },

  // You can add more Next.js configurations here
};

export default nextConfig;
