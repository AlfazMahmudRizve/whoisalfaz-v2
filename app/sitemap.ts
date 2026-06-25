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
        '/blog/',
        '/blog/30-days-of-n8n/',
        '/about/alfaz-mahmud-rizve/',
        '/case-studies/',
        '/contact/',
        '/services/',
        '/partners/',
        '/labs/',
        '/labs/roi/',
        '/audit/',
        '/terms/',
        '/privacy-policy/',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '/' ? 1 : 0.8,
    }));

    // 2. Dynamic Service Pages
    const serviceSlugs = Object.keys(serviceData);
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
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.current}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 4. Dynamic Blog Categories — fallback to [] if Sanity is unavailable
    let categories: SanityCategory[] = [];
    try {
        categories = await getSanityCategories();
    } catch (err) {
        console.error('[sitemap] Failed to fetch categories from Sanity:', err);
    }
    const validCategories = categories.filter((cat) => cat.count > 0);
    const categoryRoutes = validCategories.map((cat) => ({
        url: `${baseUrl}/blog/category/${cat.slug.current}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...coreRoutes, ...serviceRoutes, ...blogRoutes, ...categoryRoutes];
}

