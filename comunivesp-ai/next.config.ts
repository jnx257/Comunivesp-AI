import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'figma.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apps.univesp.br',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
