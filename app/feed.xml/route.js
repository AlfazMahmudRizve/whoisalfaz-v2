import { getSanityPosts } from '@/lib/sanity.client';

const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
};

export async function GET() {
    const posts = await getSanityPosts();
    const baseUrl = 'https://whoisalfaz.me';

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alfaz Mahmud Rizve | Blog</title>
    <link>${baseUrl}</link>
    <description>Insights on AI Automation, Business Growth, and Technical SEO.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />`;

    posts.forEach((post) => {
        const link = `${baseUrl}/blog/${post.slug.current}/`;
        rss += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description || '')}</description>
    </item>`;
    });

    rss += `
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        },
    });
}
