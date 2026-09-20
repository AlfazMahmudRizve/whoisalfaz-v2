import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation API
 *
 * Replaces time-based ISR revalidation to eliminate background ISR writes.
 * Call this endpoint after publishing/updating content in Sanity CMS.
 *
 * Usage:
 *   POST /api/revalidate
 *   Headers: { "x-revalidate-secret": "<REVALIDATION_SECRET>" }
 *   Body (JSON): { "paths": ["/blog/my-post/", "/blog/", "/blog/category/n8n-automation/"] }
 *
 * Or revalidate everything:
 *   Body (JSON): { "all": true }
 *
 * Can be triggered by:
 *   - Sanity webhook on document publish
 *   - Manual cURL call after content updates
 *   - CI/CD pipeline after deployment
 */

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
    // Validate secret
    const secret = request.headers.get('x-revalidate-secret');
    if (!REVALIDATION_SECRET || secret !== REVALIDATION_SECRET) {
        return NextResponse.json(
            { error: 'Invalid or missing revalidation secret' },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        if (body.all) {
            // Revalidate all major content paths
            const allPaths = [
                '/',
                '/blog/',
                '/services/',
                '/portfolio/',
                '/case-studies/',
                '/partners/',
            ];
            for (const path of allPaths) {
                revalidatePath(path);
            }
            // Revalidate all blog posts by layout
            revalidatePath('/blog/[slug]', 'page');
            revalidatePath('/blog/category/[slug]', 'page');
            revalidatePath('/services/[slug]', 'page');
            revalidatePath('/[slug]', 'page');

            return NextResponse.json({
                revalidated: true,
                paths: allPaths,
                message: 'All content paths revalidated',
                timestamp: new Date().toISOString(),
            });
        }

        // Revalidate specific paths
        const paths: string[] = body.paths;
        if (!paths || !Array.isArray(paths) || paths.length === 0) {
            return NextResponse.json(
                { error: 'Request body must include "paths" array or "all": true' },
                { status: 400 }
            );
        }

        // Limit to 50 paths per request to prevent abuse
        const limitedPaths = paths.slice(0, 50);
        for (const path of limitedPaths) {
            revalidatePath(path);
        }

        return NextResponse.json({
            revalidated: true,
            paths: limitedPaths,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to revalidate', details: String(error) },
            { status: 500 }
        );
    }
}
