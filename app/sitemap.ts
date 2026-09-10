import { MetadataRoute } from 'next';
import { getSanityPosts, getSanityCategories } from '@/lib/sanity.client';
import { serviceData } from '@/lib/serviceData';

// Cache the sitemap for 12 hours to avoid cold Sanity CDN hits on every Googlebot crawl.
// Without this, each Googlebot fetch re-runs the async Sanity queries live, causing
// "Temporary processing error" if Sanity is slow or returning a non-200 at that moment.
export const revalidate = 43200; // 12 hours in seconds

interface SanityPost {
    slug: { current: string };
    date: string;
}

// 5 High-Impact Diamond Posts for Maximum Search Authority & Crawl Prioritization
const DIAMOND_POST_SLUGS = new Set([
    'screaming-frog-alternatives-free-seo-audit-tools',
    'manychat-pricing-2026',
    'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    'ai-automation-agency-business-model',
    'pinecone-vs-qdrant-vultr-benchmark',
]);

interface SanityCategory {
    slug: { current: string };
    count: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://whoisalfaz.me';

    // 1. Static Routes (Core Pages)
    const coreRoutes = [
        '/',
        '/portfolio/',
        '/store/',
        '/blog/',
        '/blog/30-days-of-n8n/',
        '/case-studies/',
        '/contact/',
        '/services/',
        '/partners/',
        '/labs/',
        '/labs/roi/',
        '/audit/',
        '/claim-manychat-bonus/',
        '/terms/',
        '/privacy-policy/',
        '/editorial-policy/',
    ].map((route) => ({
        url: route === '/' ? `${baseUrl}/` : `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '/' ? 1 : 0.8,
    }));

    // 2. Dynamic Service Pages (only canonical slugs)
    const serviceSlugs = Object.keys(serviceData).filter((slug) => slug !== 'technical-seo');
    const serviceRoutes = serviceSlugs.map((slug) => ({
        url: `${baseUrl}/services/${slug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 3. Dynamic Blog Posts — fallback to [] if Sanity is unavailable
    let posts: SanityPost[] = [];
    try {
        posts = await getSanityPosts();
    } catch (err) {
        console.error('[sitemap] Failed to fetch blog posts from Sanity:', err);
    }
    const seenBlogUrls = new Set<string>();
    const blogRoutes: MetadataRoute.Sitemap = [];

    for (const post of posts) {
        let slug = post.slug?.current;
        if (!slug) continue;

        // Exclude legacy slugs that redirect to /blog/
        if (slug === 'outstanding-ideas-for-b2b-lead-generation' || slug === 'outstanding-ideas-for-b2b-lead-capture') {
            continue;
        }

        // Map legacy slugs to active slugs
        if (slug === 'outstanding-ideas-for-youtube-shorts') {
            slug = 'automated-youtube-shorts-generator';
        } else if (slug === 'outstanding-ideas-for-saas-mvps') {
            slug = 'build-personal-ai-assistant';
        }

        const url = `${baseUrl}/blog/${slug}/`;
        if (seenBlogUrls.has(url)) {
            continue;
        }
        seenBlogUrls.add(url);

        const isDiamond = DIAMOND_POST_SLUGS.has(slug);
        blogRoutes.push({
            url,
            lastModified: new Date(post.date || new Date().toISOString()),
            changeFrequency: 'weekly' as const,
            priority: isDiamond ? 1.0 : 0.7,
        });
    }

    // 4. Dynamic Blog Categories — fallback to [] if Sanity is unavailable
    let categories: SanityCategory[] = [];
    try {
        categories = await getSanityCategories();
    } catch (err) {
        console.error('[sitemap] Failed to fetch categories from Sanity:', err);
    }
    const categoryRoutes = categories
        .filter((cat) => cat.slug?.current)
        .map((cat) => ({
            url: `${baseUrl}/blog/category/${cat.slug.current}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

    return [...coreRoutes, ...serviceRoutes, ...blogRoutes, ...categoryRoutes];
}

