import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  output: 'standalone',
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
      // 4. Redirect legacy portfolio page
      {
        source: '/who-is-alfaz-mahmud-rizve',
        destination: '/portfolio',
        permanent: true,
      },
      // 5. Redirect root-level legacy blog posts (Catch-all for known old URLs)
      // Note: We avoid catching valid pages like /contact by using a regex that looks for specific legacy keywords
      // But a better approach to not break valid root pages is to hardcode the known legacy slugs or match the old pattern
      // Since WordPress URLs didn't have a specific prefix, we'll try to redirect specific legacy slugs found in GSC
      {
        source: '/:slug(n8n-global-error-handling|outstanding-ideas-for-youtube-shorts|automate-personal-branding-with-n8n|facebook-lead-ads-automation-by-alfaz-mahmud-rizve|automation-operating-system-for-saas|how-to-build-an-api-with-n8n|what-is-n8n-and-how-to-set-it-up|n8n-tips-and-tricks-by-alfaz-mahmud-rizve|outstanding-ideas-for-saas-mvps|build-an-automated-rank-tracker-tool-with-n8n|n8n-data-privacy-security-guide|essential-n8n-core-nodes-by-alfaz-mahmud-rizve|n8n-slack-notifications-by-alfaz-mahmud-rizve|n8n-debugging-error-handling-basics|outstanding-ideas-for-b2b-lead-generation|n8n-automation-service-by-alfaz-mahmud-rizve|lead-scoring-automation-with-alfaz-mahmud-rizve|capture-n8n-lead-data-from-wordpress-elementor|n8n-production-workflows-by-alfaz-mahmud-rizve|n8n-ai-receptionist)',
        destination: '/blog/:slug',
        permanent: true,
      },
      // 6. Redirect legacy /category/ root path to /blog/category/
      {
        source: '/category/:slug',
        destination: '/blog/category/:slug',
        permanent: true,
      },
      // 7. Affiliate Link Cloaking
      {
        source: '/go/monday',
        destination: 'https://try.monday.com/66vrkkiezhrz',
        permanent: true,
      },
      {
        source: '/go/n8n',
        destination: 'https://n8n.partnerlinks.io/ch585gsqzanp',
        permanent: true,
      },
      {
        source: '/go/brevo',
        destination: 'https://get.brevo.com/6b88c13841c4',
        permanent: true,
      },
      {
        source: '/go/databox',
        destination: 'https://join.databox.com/qfzdqmwp7elc',
        permanent: true,
      },
      {
        source: '/go/turbotic',
        destination: 'https://try.turbotic.com/2xu9cie2qj39',
        permanent: true,
      },
      {
        source: '/go/cometchat',
        destination: 'https://try.cometchat.com/r4j3p5y2c9mn',
        permanent: true,
      },
      {
        source: '/go/apollo',
        destination: 'https://get.apollo.io/bs1ny1i5eigv',
        permanent: true,
      },
      {
        source: '/go/adcreative',
        destination: 'https://free-trial.adcreative.ai/78ye4zckgmez',
        permanent: true,
      },
      {
        source: '/go/elevenlabs',
        destination: 'https://try.elevenlabs.io/vde8vlnbokq4',
        permanent: true,
      },
      {
        source: '/go/vultr-promo',
        destination: 'https://www.vultr.com/?ref=9859101-9J',
        permanent: true,
      },
      {
        source: '/go/vultr',
        destination: 'https://www.vultr.com/?ref=9859100',
        permanent: true,
      },
    ];
  },
  async headers() {
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https://whoisalfaz.me https://www.googletagmanager.com;
        font-src 'self' https://fonts.gstatic.com data:;
        connect-src 'self' https://pagespeedonline.googleapis.com https://www.google-analytics.com;
        frame-src 'self';
        object-src 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeader },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;