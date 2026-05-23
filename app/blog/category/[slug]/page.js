
import { Suspense } from 'react';

import { getSanityPostsByCategory, getSanityCategories, getSanityPosts, getSanityCategoryBySlug } from '@/lib/sanity.client';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, BookOpen, Clock, ArrowRight } from 'lucide-react';
import SearchWidget from '../../../../components/SearchWidget';

// Helper to get cached posts for sidebar (optional optimization)
async function getSidebarData() {
    const posts = await getSanityPosts();
    return posts?.slice(0, 5) || [];
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const category = await getSanityCategoryBySlug(slug);
    const name = category?.name || slug;
    const title = `${name} — Blog`;
    const description = `Read all articles about ${name}. Technical tutorials, case studies, and architectural blueprints by Alfaz Mahmud Rizve.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/blog/category/${slug}/`,
        },
        openGraph: {
            title,
            description,
            url: `https://whoisalfaz.me/blog/category/${slug}/`,
            type: 'website',
        },
    };
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const posts = await getSanityPostsByCategory(slug);
    const category = await getSanityCategoryBySlug(slug);
    const allCategories = await getSanityCategories();
    const recentPosts = await getSidebarData();

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* CollectionPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": `${category?.name || slug} — Blog`,
                        "description": `All articles about ${category?.name || slug} by Alfaz Mahmud Rizve.`,
                        "url": `https://whoisalfaz.me/blog/category/${slug}/`,
                        "mainEntity": {
                            "@type": "ItemList",
                            "numberOfItems": posts.length,
                            "itemListElement": posts.map((post, i) => ({
                                "@type": "ListItem",
                                "position": i + 1,
                                "url": `https://whoisalfaz.me/blog/${post.slug.current}/`
                            }))
                        }
                    })
                }}
            />
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-slate-50 dark:bg-[#0a0a0a] -z-20 transition-colors duration-300" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/30 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-16 items-start">

                {/* === LEFT COLUMN: MAIN CONTENT === */}
                <div>
                    {/* HEADER */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-400 mb-4">
                            <Link href="/blog/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
                            <ChevronRight size={14} />
                            <span className="text-teal-600 dark:text-blue-400">Category</span>
                            <ChevronRight size={14} />
                            <span className="text-slate-900 dark:text-white capitalize transition-colors duration-300">{category?.name || slug}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                            <span className="text-teal-600 dark:text-blue-500">#</span> {category?.name || slug}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
                            Browsing all articles in <span className="text-slate-900 dark:text-white font-medium transition-colors duration-300">&quot;{category?.name || slug}&quot;</span>.
                        </p>
                    </section>

                    {/* BLOG ARCHIVE */}
                    <section>
                        {posts.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                {posts.map((post) => (
                                    <Link key={post.slug.current} href={`/blog/${post.slug.current}/`} className="group">
                                        <article className="h-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-teal-500/50 dark:hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-sm dark:shadow-none">
                                            <div className="h-48 bg-slate-100 dark:bg-slate-800 relative">
                                                {post.image ? (
                                                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-700">
                                                        <span className="text-xs">No Image</span>
                                                    </div>
                                                )}
                                                {/* Overlay Date */}
                                                <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-700 dark:text-white font-mono flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {new Date(post.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-3 group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">{post.description}</p>
                                                <span className="text-teal-600 dark:text-blue-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read Article <ArrowRight size={12} />
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                                <BookOpen size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">No posts found</h3>
                                <p className="text-slate-500 dark:text-slate-400">We couldn&apos;t find any articles in this category.</p>
                                <Link href="/blog/" className="inline-block mt-6 px-6 py-2 bg-teal-600 dark:bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-teal-500 dark:hover:bg-blue-500 transition-colors">
                                    Return to Blog
                                </Link>
                            </div>
                        )}
                    </section>
                </div>

                {/* === RIGHT COLUMN: SIDEBAR === */}
                <div className="hidden lg:block sticky top-32 h-[calc(100vh-8rem)] min-w-[350px]">
                    <aside className="h-full overflow-y-auto pb-8 space-y-12 scrollbar-none">

                    {/* SEARCH */}
                    <Suspense fallback={<div className="h-12 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />}>
                        <SearchWidget />
                    </Suspense>

                    {/* RECENT POSTS */}
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Recent Posts</h4>
                        <ul className="space-y-4">
                            {recentPosts?.map(post => (
                                <li key={post.slug.current}>
                                    <Link href={`/blog/${post.slug.current}/`} className="group block">
                                        <h5 className="text-slate-600 dark:text-slate-300 text-sm font-medium group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                                            {post.title}
                                        </h5>
                                        <span className="text-xs text-slate-400 dark:text-slate-600 block">{new Date(post.date).toLocaleDateString()}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CATEGORIES */}
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Categories</h4>
                        <ul className="space-y-2">
                            {allCategories?.map(cat => (
                                <li key={cat.slug.current}>
                                    <Link href={`/blog/category/${cat.slug.current}/`} className={`text-sm block py-1 border-b border-slate-200 dark:border-white/5 pb-2 transition-colors ${cat.slug.current === slug ? 'text-teal-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-blue-400'}`}>
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    </aside>
                </div>

            </div>
        </main>
    );
}
