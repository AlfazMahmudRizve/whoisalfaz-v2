import { Suspense } from 'react';
import { getPostsByCategory, getAllCategories } from '@/lib/mdx';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';

import SearchWidget from '../../components/SearchWidget';

export const metadata = {
    title: "Case Studies & Architecture Teardowns | Alfaz Mahmud Rizve",
    description: "Deep dive technical breakdowns of production automated systems, Next.js architecture, and AI agents.",
};

export default async function CaseStudiesPage() {
    // We already know the category name we want
    const { posts } = getPostsByCategory('architecture-teardowns');

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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-6">
                            Technical Blueprints
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Architecture Teardowns
                        </h1>
                        <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                            Real-world case studies detailing the precise technical choices, systems, and code used to scale SaaS and agency operations.
                        </p>
                    </section>

                    {/* BLOG ARCHIVE */}
                    <section>
                        <div className="text-center mb-10 flex items-center gap-4">
                            <h3 className="text-xl font-bold text-white inline-block border-b-2 border-white pb-1">All Case Studies</h3>
                            <span className="text-xs text-slate-500 bg-white/10 px-3 py-1 rounded-full">{posts?.length || 0}</span>
                        </div>

                        {(!posts || posts.length === 0) ? (
                            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                                <p className="text-slate-400">Archiving case studies...</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {posts.map((post) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                        <article className="h-full bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1">
                                            <div className="h-48 bg-slate-800 relative">
                                                {post.image ? (
                                                    <Image src={post.image} alt={post.title} fill className="object-cover" />
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
                                                <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-wider shadow-lg">
                                                    Case Study
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">{post.description}</p>
                                                <span className="text-blue-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read Blueprint <ArrowRight size={12} />
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* === RIGHT COLUMN: SIDEBAR === */}
                <aside className="space-y-12 h-[calc(100vh-8rem)] overflow-y-auto pb-8 sticky top-32 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 hidden lg:block">

                    {/* SEARCH */}
                    <Suspense fallback={<div className="h-12 bg-white/5 rounded-lg animate-pulse" />}>
                        <SearchWidget />
                    </Suspense>

                    <div className="bg-gradient-to-b from-blue-900/20 to-purple-900/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold text-white mb-2">Build This Stack</h4>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Want to deploy one of these exact architectures for your agency? Let's map it out.
                            </p>
                            <Link href="/contact" className="block text-center w-full py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                                Book a Technical Call
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    </div>

                </aside>

            </div>
        </main>
    );
}
