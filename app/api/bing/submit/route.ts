import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';
import { submitToBing, submitToIndexNow, pingGoogle } from '@/lib/bing';

// Explicitly set dynamic force so Next.js doesn't cache this route and always executes it
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret');

        // Check for Cron Secret to prevent unauthorized access
        // TEMP: Allow bypass for testing - REMOVE AFTER
        if (secret !== process.env.CRON_SECRET && secret !== 'test-bypass') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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

        console.log(`[Bing Submit] Starting submission for ${allUrls.length} URLs`);

        // 3. Trigger Triple Threat Indexing Fire-and-Forget
        const [bingResult, indexNowResult, googleResult] = await Promise.allSettled([
            submitToBing(allUrls),
            submitToIndexNow(allUrls),
            pingGoogle()
        ]);

        // Check for failures
        const bingSuccess = bingResult.status === 'fulfilled';
        const indexNowSuccess = indexNowResult.status === 'fulfilled';
        const googleSuccess = googleResult.status === 'fulfilled';

        // Log results for debugging
        console.log(`[Bing Submit] Bing: ${bingSuccess ? 'SUCCESS' : 'FAILED - ' + bingResult.reason}`);
        console.log(`[Bing Submit] IndexNow: ${indexNowSuccess ? 'SUCCESS' : 'FAILED - ' + indexNowResult.reason}`);
        console.log(`[Bing Submit] Google: ${googleSuccess ? 'SUCCESS' : 'FAILED - ' + googleResult.reason}`);

        const allSuccessful = bingSuccess && indexNowSuccess && googleSuccess;

        return NextResponse.json({
            success: allSuccessful,
            submittedUrls: allUrls.length,
            results: {
                bing: bingSuccess ? bingResult.value : { error: bingResult.reason?.message || bingResult.reason },
                indexNow: indexNowSuccess ? indexNowResult.value : { error: indexNowResult.reason?.message || indexNowResult.reason },
                google: googleSuccess ? googleResult.value : { error: googleResult.reason?.message || googleResult.reason }
            }
        }, { status: allSuccessful ? 200 : 207 }); // 207 = Multi-Status when some fail

    } catch (error: any) {
        console.error(`[Bing Submit] Critical error:`, error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error', success: false },
            { status: 500 }
        );
    }
}
