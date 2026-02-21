import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ifh.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ifh.cc',
      },
    ],
  },
};

export default nextConfig;
