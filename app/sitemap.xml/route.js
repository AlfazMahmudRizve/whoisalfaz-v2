import { getSitemapData } from '../../lib/api';

export async function GET() {
    const { posts, pages } = await getSitemapData();
    const baseUrl = 'https://whoisalfaz.me';

    // Manual Static Routes
    const staticRoutes = [
        '',
        '/blog',
        '/services',
        '/contact',
        '/labs',
        '/portfolio',
        '/about',
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add Static Routes
    staticRoutes.forEach((route) => {
        sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Add Pages (Dynamic from WordPress)
    pages.forEach((page) => {
        // Exclude pages that might conflict with static routes or shouldn't be indexed
        if (['home', 'blog', 'services', 'contact', 'labs', 'portfolio', 'about'].includes(page.slug)) return;

        sitemap += `
  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${page.modified || page.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add Blog Posts
    posts.forEach((post) => {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.modified || post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        },
    });
}
