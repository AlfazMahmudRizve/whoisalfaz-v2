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
      // 1. Redirect old Date-based WP URLs (Day precision)
      // Example: /2025/12/17/my-post -> /blog/my-post
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // 2. Redirect old Month-based WP URLs
      // Example: /2025/12/my-post -> /blog/my-post
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // 3. Redirect generic "Author" archives to homepage
      {
        source: '/author/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;