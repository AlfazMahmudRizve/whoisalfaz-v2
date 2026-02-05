import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.56.1:3000", "localhost:3000"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'whoisalfaz.me', // Trust your live site
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'v1.whoisalfaz.me', // Allow new GraphQL endpoint images
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        // Match old WordPress date-based URLs: /YYYY/MM/post-slug
        source: '/:year(\\d{4})/:month(\\d{2})/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;