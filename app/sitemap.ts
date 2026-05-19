import { MetadataRoute } from 'next';
import { getSanityPosts, getSanityCategories } from '@/lib/sanity.client';
import { serviceData } from '@/lib/serviceData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://whoisalfaz.me';

    // 1. Static Routes (Core Pages)
    const coreRoutes = [
        '/',
        '/portfolio/',
        '/blog/',
        '/case-studies/',
        '/contact/',
        '/services/',
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

    // 3. Dynamic Blog Posts
    const posts = await getSanityPosts();
    const blogRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug.current}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 4. Dynamic Blog Categories
    const categories = await getSanityCategories();
    const validCategories = categories.filter((cat: any) => cat.count > 0);
    const categoryRoutes = validCategories.map((cat: any) => ({
        url: `${baseUrl}/blog/category/${cat.slug.current}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...coreRoutes, ...serviceRoutes, ...blogRoutes, ...categoryRoutes];
}
