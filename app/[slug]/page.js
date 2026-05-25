import { getSanityPostBySlug, getSanityPosts } from '@/lib/sanity.client';
import { redirect, notFound } from 'next/navigation';

export async function generateStaticParams() {
    // Statically build redirect pages for all active posts for maximum redirect speed
    const posts = await getSanityPosts();
    return posts.map(p => ({ slug: p.slug.current }));
}

export default async function DynamicRootPage({ params }) {
    const { slug } = await params;

    // Check if the slug corresponds to a valid Sanity blog post
    const post = await getSanityPostBySlug(slug);
    if (!post) {
        notFound();
    }

    // Redirect to the canonical blog post path
    redirect(`/blog/${slug}/`);
}
