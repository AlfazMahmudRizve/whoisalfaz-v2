import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
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
      // 2b. Date Archive Fallbacks (when no post slug is present)
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})',
        destination: '/blog/',
        permanent: true,
      },
      // 3. Redirect generic "Author" archives to homepage
      {
        source: '/author/:path*',
        destination: '/',
        permanent: true,
      },
      // 3b. WP Spam & Movie Taxonomy Cleanups
      {
        source: '/cast/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/director/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/uncategorized/:path*',
        destination: '/blog/',
        permanent: true,
      },
      // 4. Redirect legacy portfolio page
      {
        source: '/who-is-alfaz-mahmud-rizve',
        destination: '/portfolio',
        permanent: true,
      },
      // 5. Redirect root-level legacy blog posts (Catch-all for known old URLs)
      {
        source: '/:slug(n8n-global-error-handling|automate-personal-branding-with-n8n|facebook-lead-ads-automation-by-alfaz-mahmud-rizve|automation-operating-system-for-saas|how-to-build-an-api-with-n8n|what-is-n8n-and-how-to-set-it-up|n8n-tips-and-tricks-by-alfaz-mahmud-rizve|build-an-automated-rank-tracker-tool-with-n8n|n8n-data-privacy-security-guide|essential-n8n-core-nodes-by-alfaz-mahmud-rizve|n8n-slack-notifications-by-alfaz-mahmud-rizve|n8n-debugging-error-handling-basics|n8n-automation-service-by-alfaz-mahmud-rizve|lead-scoring-automation-with-alfaz-mahmud-rizve|capture-n8n-lead-data-from-wordpress-elementor|n8n-production-workflows-by-alfaz-mahmud-rizve|n8n-ai-receptionist|free-n8n-practical-guide|ai-automation-for-saas-agencies-blog|ai-automation-services-for-saas-agencies|professional-n8n-automation-services|n8n-workflow-design-best-practices|what-is-n8n-by-alfaz-mahmud-rizve|lead-enrichment-with-n8n|outstanding-ideas-for-youtube-shorts|outstanding-ideas-for-b2b-lead-generation|outstanding-ideas-for-saas-mvps|advanced-n8n-automation-the-ultimate-2025-seo-integration-masterclass|automated-content-research-by-alfaz-mahmud-rizve|automated-email-follow-up-n8n-brevo|n8n-google-analytics-4-pipeline)',
        destination: '/blog/:slug',
        permanent: true,
      },
      // 5b. Redirect old static pages
      {
        source: '/terms-and-conditions',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/termsandconditions',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/contact-alfaz-mahmud-rizve',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/about-me',
        destination: '/portfolio',
        permanent: true,
      },
      // 6. Redirect legacy /category/ root path to /blog/category/
      {
        source: '/category/:slug',
        destination: '/blog/category/:slug',
        permanent: true,
      },
      // 6b. Fix: Redirect old double-dash category slug to clean single-dash
      {
        source: '/blog/category/30-days-of-n8n--automation/',
        destination: '/blog/category/30-days-of-n8n-automation/',
        permanent: true,
      },
      // 6c. Strip /feed/ from any path
      {
        source: '/:path*/feed',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/',
        permanent: true,
      },
      // 6d. Legacy Service Pages Redirects (404 mapping)
      {
        source: '/services/n8n-automation-workflows',
        destination: '/services/n8n-automation/',
        permanent: true,
      },
      {
        source: '/services/strategy-consulting',
        destination: '/services/growth-consulting/',
        permanent: true,
      },
      {
        source: '/services/strategy-growth-consulting',
        destination: '/services/growth-consulting/',
        permanent: true,
      },
      {
        source: '/services/business-strategy-consulting',
        destination: '/services/growth-consulting/',
        permanent: true,
      },
      {
        source: '/services/wordpress-websites',
        destination: '/services/headless-architecture/',
        permanent: true,
      },
      {
        source: '/services/wordpress-websites-funnels',
        destination: '/services/headless-architecture/',
        permanent: true,
      },
      {
        source: '/services/ugc-videos',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/services/ugc-product-videos',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/services/custom-prompts',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/services/custom-prompt-design',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/services-2-2',
        destination: '/services/',
        permanent: true,
      },
      // 6e. Legacy renamed or missing blog posts (404/Soft 404 cleanups)
      {
        source: '/blog/outstanding-ideas-for-youtube-shorts',
        destination: '/blog/automated-youtube-shorts-generator/',
        permanent: true,
      },
      {
        source: '/blog/outstanding-ideas-for-saas-mvps',
        destination: '/blog/build-personal-ai-assistant/',
        permanent: true,
      },
      {
        source: '/blog/outstanding-ideas-for-b2b-lead-generation',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/outstanding-ideas-for-b2b-lead-capture',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/free-n8n-practical-guide',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/who-is-alfaz-mahmud-rizve',
        destination: '/portfolio/',
        permanent: true,
      },
      {
        source: '/blog/contact-alfaz-mahmud-rizve',
        destination: '/contact/',
        permanent: true,
      },
      {
        source: '/blog/automated-facebook-leads-n8n',
        destination: '/blog/facebook-lead-ads-automation-by-alfaz-mahmud-rizve/',
        permanent: true,
      },
      {
        source: '/blog/capture-n8n-lead-data-from-wordpress-elementor/:path+',
        destination: '/blog/capture-n8n-lead-data-from-wordpress-elementor/',
        permanent: true,
      },
      // 6f. Legacy general 404 mappings
      {
        source: '/pricing',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/resources',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/free-tools',
        destination: '/labs/',
        permanent: true,
      },
      {
        source: '/get-in-touch',
        destination: '/contact/',
        permanent: true,
      },
      {
        source: '/free-resources/wordpress-gpl-library',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/free-resources/n8n-workflow-templates',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/free-resources/mini-seo-audit',
        destination: '/audit/',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/',
        permanent: true,
      },
      {
        source: '/v2/everything',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/rest/oauth2-credential/callback',
        destination: '/',
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
      {
        source: '/go/manychat',
        destination: 'https://manychat.partnerlinks.io/jugrrxxzawym',
        permanent: true,
      },
    ];
  },
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://analytics.ahrefs.com https://static.cloudflareinsights.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https://whoisalfaz.me https://www.googletagmanager.com https://cdn.sanity.io;
        font-src 'self' https://fonts.gstatic.com data:;
        connect-src 'self' https://pagespeedonline.googleapis.com https://*.google-analytics.com https://www.google-analytics.com https://*.analytics.google.com https://analytics.ahrefs.com https://cloudflareinsights.com https://*.sanity.io;
        frame-src 'self';
        object-src 'none';
        ${isDev ? '' : 'upgrade-insecure-requests;'}
    `.replace(/\s{2,}/g, ' ').trim();

    const securityHeaders = [
      { key: 'Content-Security-Policy', value: cspHeader },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];

    // HSTS should only be sent in production — it forces HTTPS which breaks localhost
    if (!isDev) {
      securityHeaders.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      });
    }

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/go/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;