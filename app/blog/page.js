
import { Suspense } from 'react';
import { getAllPosts, getAllCategories } from '../../lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, BookOpen, Clock, ArrowRight } from 'lucide-react';

import SearchWidget from '../../components/SearchWidget';

export default async function BlogPage() {
    const posts = await getAllPosts();
    const categories = await getAllCategories();

    const recentPosts = posts?.slice(0, 5); // Top 5 for sidebar

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-16">

                {/* === LEFT COLUMN: MAIN CONTENT === */}
                <div>
                    {/* HERO SECTION */}
                    <section className="mb-20 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            AI automation, WordPress, SEO and growth for SaaS and agencies
                        </h1>
                        <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                            Discover insights, tools, and resources to enhance your tech skills.
                        </p>

                        {/* FEATURED: START YOUR JOURNEY */}
                        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Start your Automation Journey Today</h2>
                                    <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                                        Discover a variety of topics tailored to your interests. Our blog categories cover everything from AI tool reviews to practical case studies, enriching your knowledge and keeping you informed. Navigate easily and find content that resonates with you.
                                    </p>
                                    <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all">
                                        Get a Free Playbook
                                    </button>
                                </div>
                                {/* Placeholder for Book Cover similar to image */}
                                {/* Playbook Image */}
                                <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
                                    <Image src="/playbook.jpg" alt="Start Your AI Automation Today with n8n" fill className="object-contain drop-shadow-2xl" />
                                </div>
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        </div>
                    </section>

                    {/* TOPICS / CATEGORIES */}
                    <section className="mb-16">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">Topics</h3>
                        <div className="space-y-1">
                            {categories?.map((cat) => (
                                <div key={cat.slug} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors group cursor-pointer">
                                    <span className="text-slate-300 font-medium group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        {cat.name}
                                    </span>
                                    <span className="text-xs text-slate-500 bg-black/50 px-2 py-0.5 rounded-full">{cat.count}</span>
                                </div>
                            ))}
                            {!categories && <div className="text-slate-500 text-sm italic">Loading topics...</div>}
                        </div>
                    </section>

                    {/* BLOG ARCHIVE */}
                    <section>
                        <div className="text-center mb-10">
                            <h3 className="text-xl font-bold text-white inline-block border-b-2 border-white pb-1">Blog Archive</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Reusing Post Card Logic */}
                            {posts?.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                    <article className="h-full bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1">
                                        <div className="h-48 bg-slate-800 relative">
                                            {post.featuredImage?.node?.sourceUrl ? (
                                                <Image src={post.featuredImage.node.sourceUrl} alt={post.title} fill className="object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-700">
                                                    <span className="text-xs">No Image</span>
                                                </div>
                                            )}
                                            {/* Overlay Date */}
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-mono flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-white font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                                                {post.title}
                                            </h3>
                                            <div className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                            <span className="text-blue-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read Article <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {/* === RIGHT COLUMN: SIDEBAR === */}
                <aside className="space-y-12 h-fit sticky top-32">

                    {/* SEARCH */}
                    <Suspense fallback={<div className="h-12 bg-white/5 rounded-lg animate-pulse" />}>
                        <SearchWidget />
                    </Suspense>

                    {/* RECENT POSTS */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Recent Posts</h4>
                        <ul className="space-y-4">
                            {recentPosts?.map(post => (
                                <li key={post.slug}>
                                    <Link href={`/blog/${post.slug}`} className="group block">
                                        <h5 className="text-slate-300 text-sm font-medium group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                                            {post.title}
                                        </h5>
                                        <span className="text-xs text-slate-600 block">{new Date(post.date).toLocaleDateString()}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RECENT COMMENTS (Mock) */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Recent Comments</h4>
                        <p className="text-slate-500 text-xs italic">No comments to show.</p>
                    </div>

                    {/* ARCHIVES (Mock) */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Archives</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-blue-400 block py-1">January 2026</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 block py-1">December 2025</Link></li>
                        </ul>
                    </div>

                    {/* CATEGORIES (Sidebar Duplicate) */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Categories</h4>
                        <ul className="space-y-2">
                            {categories?.map(cat => (
                                <li key={cat.slug}>
                                    <Link href="#" className="text-sm text-slate-400 hover:text-blue-400 block py-1 border-b border-white/5 pb-2">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </aside>

            </div>
        </main>
    );
}
