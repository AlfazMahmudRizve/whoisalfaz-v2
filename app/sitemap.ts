import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { serviceData } from '@/lib/serviceData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://whoisalfaz.me';

    // 1. Static Routes (Core Pages)
    const coreRoutes = [
        '/',
        '/portfolio/',
        '/blog/',
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
    const posts = await getAllPosts();
    const blogRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}/`,
        lastModified: new Date(post.modified || post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 4. Dynamic Blog Categories
    const categoriesSet = new Set<string>();
    posts.forEach((post: any) => {
        if (post.category) {
            // Replicating category slug generation logic
            const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            categoriesSet.add(categorySlug);
        }
    });
    const categoryRoutes = Array.from(categoriesSet).map((categorySlug) => ({
        url: `${baseUrl}/blog/category/${categorySlug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...coreRoutes, ...serviceRoutes, ...blogRoutes, ...categoryRoutes];
}
