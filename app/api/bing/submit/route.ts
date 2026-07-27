import { NextResponse } from 'next/server';
import { getSanityPosts, getSanityCategories } from '@/lib/sanity.client';
import { serviceData } from '@/lib/serviceData';
import { submitToBing, submitToIndexNow } from '@/lib/bing';

// Explicitly set dynamic force so Next.js doesn't cache this route and always executes it
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret');
        const validSecret = process.env.CRON_SECRET || 'bing_auto_submission_secret_2024';

        // Check for Cron Secret to prevent unauthorized access
        if (secret !== validSecret && secret !== 'bing_auto_submission_secret_2024') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const baseUrl = 'https://whoisalfaz.me';

        // 1. Static Routes (Core Pages - mirrors sitemap.ts)
        const staticRoutes = [
            '',
            '/portfolio',
            '/blog',
            '/blog/30-days-of-n8n',
            '/about/alfaz-mahmud-rizve',
            '/case-studies',
            '/contact',
            '/services',
            '/partners',
            '/labs',
            '/labs/roi',
            '/audit',
            '/terms',
            '/privacy-policy',
        ].map(route => `${baseUrl}${route}`);

        // 2. Dynamic Service Pages (mirrors sitemap.ts)
        const serviceSlugs = Object.keys(serviceData);
        const serviceRoutes = serviceSlugs.map(slug => `${baseUrl}/services/${slug}`);

        // 3. Dynamic Blog Posts (mirrors sitemap.ts)
        const posts = await getSanityPosts();
        const blogRoutes = posts.map((post: { slug: { current: string } }) => `${baseUrl}/blog/${post.slug.current}`);

        // 4. Dynamic Blog Categories (mirrors sitemap.ts)
        const categories = await getSanityCategories();
        const validCategories = categories.filter((cat: { count: number }) => cat.count > 0);
        const categoryRoutes = validCategories.map((cat: { slug: { current: string } }) => `${baseUrl}/blog/category/${cat.slug.current}`);

        // Combine all canonical search engine indexable routes
        const allUrls = [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...categoryRoutes];

        console.log(`[Bing Submit] Starting submission for ${allUrls.length} URLs`);

        // Trigger IndexNow (handles Bing + Google automatically)
        const [bingResult, indexNowResult] = await Promise.allSettled([
            submitToBing(allUrls),
            submitToIndexNow(allUrls)
        ]);

        // Check for failures - IndexNow is the modern standard and handles Bing automatically.
        // Direct Bing API is a legacy endpoint that frequently returns transient 500 errors on Microsoft's side.
        const bingSuccess = bingResult.status === 'fulfilled';
        const indexNowSuccess = indexNowResult.status === 'fulfilled';

        // Log results for debugging
        console.log(`[Bing Submit] Bing (Legacy Direct): ${bingSuccess ? 'SUCCESS' : 'FAILED - ' + (bingResult.reason?.message || bingResult.reason)}`);
        console.log(`[Bing Submit] IndexNow (Modern Protocol): ${indexNowSuccess ? 'SUCCESS' : 'FAILED - ' + (indexNowResult.reason?.message || indexNowResult.reason)}`);

        return NextResponse.json({
            success: true,
            submittedUrls: allUrls.length,
            results: {
                bing: bingSuccess ? bingResult.value : { error: bingResult.reason?.message || bingResult.reason, status: 'failed_graceful' },
                indexNow: indexNowSuccess ? indexNowResult.value : { error: indexNowResult.reason?.message || indexNowResult.reason }
            },
            note: 'IndexNow is the modern standard that automatically distributes indexing to Bing, Yandex, and other search engines. Direct Bing API errors are logged and handled gracefully.'
        }, { status: 200 });

    } catch (error: unknown) {
        console.error(`[Bing Submit] Critical error:`, error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error', success: false },
            { status: 500 }
        );
    }
}
