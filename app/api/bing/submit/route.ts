import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/api';
import { submitToBing } from '@/lib/bing';

export async function GET() {
    try {
        const baseUrl = 'https://whoisalfaz.me';

        // 1. Static Routes (Same as sitemap.ts)
        const staticRoutes = [
            '',
            '/portfolio',
            '/blog',
            '/contact',
            '/services',
            '/labs',
            '/labs/roi',
        ].map(route => `${baseUrl}${route}`);

        // 2. Dynamic Routes (Blog Posts)
        const posts = await getAllPosts();
        const blogRoutes = posts.map((post: any) => `${baseUrl}/blog/${post.slug}`);

        const allUrls = [...staticRoutes, ...blogRoutes];

        // 3. Submit to Bing
        // Standard limit is 10,000 URLs per day. We send all in one batch (max 500 per batch usually).
        // Since we have fewer than 500, one batch is fine.

        const result = await submitToBing(allUrls);

        return NextResponse.json({
            success: true,
            submittedUrls: allUrls.length,
            bingResponse: result
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
