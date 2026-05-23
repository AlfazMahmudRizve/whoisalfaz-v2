
import { getSanityPosts } from '@/lib/sanity.client';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

import SearchWidget from '../../components/SearchWidget';

export default async function SearchPage({ searchParams }) {
    const posts = await getSanityPosts();

    // Handle Search Filter (Next.js 15+ async searchParams)
    const { q } = searchParams ? await searchParams : {};

    // Filter posts if query exists
    const displayPosts = q
        ? posts.filter(post =>
            post.title.toLowerCase().includes(q.toLowerCase()) ||
            (post.description || '').toLowerCase().includes(q.toLowerCase())
        )
        : [];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-slate-50 dark:bg-[#0a0a0a] -z-20 transition-colors duration-300" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/30 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Search Results</h1>
                    <div className="max-w-xl mx-auto">
                        <Suspense fallback={<div className="h-12 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />}>
                            <SearchWidget />
                        </Suspense>
                    </div>
                </div>

                {q && (
                    <div className="mb-8 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                        Showing results for: <span className="text-slate-900 dark:text-white font-bold transition-colors duration-300">&quot;{q}&quot;</span>
                    </div>
                )}

                {displayPosts?.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        {displayPosts?.map((post) => (
                            <Link key={post.slug.current} href={`/blog/${post.slug.current}`} className="group">
                                <article className="h-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-teal-500/50 dark:hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-sm dark:shadow-none">
                                    <div className="h-48 bg-slate-100 dark:bg-slate-800 relative">
                                        {post.image ? (
                                            <Image src={post.image} alt={post.title} fill className="object-cover" />
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
                    <div className="text-center py-20 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 transition-colors duration-300">
                        <Search size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{q ? "No results found" : "Enter a search term"}</h3>
                        <p className="text-slate-500 dark:text-slate-400">Try searching for a different keyword or browse our <Link href="/blog/" className="text-teal-600 dark:text-blue-400 hover:underline">Blog</Link>.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
