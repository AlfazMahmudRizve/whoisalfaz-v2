import { Suspense } from 'react';
import { getSanityPostsByCategory } from '@/lib/sanity.client';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';

import SearchWidget from '../../components/SearchWidget';
import DefaultContentFooter from '../../components/footers/DefaultContentFooter';

export const metadata = {
    title: "Case Studies & Architecture Teardowns | Alfaz Mahmud Rizve",
    description: "Deep dive technical breakdowns of production automated systems, Next.js architecture, and AI agents.",
    alternates: {
        canonical: "https://whoisalfaz.me/case-studies/",
    },
    openGraph: {
        title: "Case Studies & Architecture Teardowns | Alfaz Mahmud Rizve",
        description: "Deep dive technical breakdowns of production automated systems, Next.js architecture, and AI agents.",
        url: "https://whoisalfaz.me/case-studies/",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Case Studies & Architecture Teardowns | Alfaz Mahmud Rizve",
        description: "Deep dive technical breakdowns of production automated systems, Next.js architecture, and AI agents.",
    },
};

export default async function CaseStudiesPage() {
    // We already know the category name we want
    const posts = await getSanityPostsByCategory('architecture-teardowns');

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-16 items-start">

                {/* === LEFT COLUMN: MAIN CONTENT === */}
                <div>
                    {/* HERO SECTION */}
                    <section className="mb-20 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-8 shadow-sm dark:shadow-none">
                            Technical Blueprints
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
                            Architecture Teardowns
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-2xl leading-relaxed">
                            Real-world case studies detailing the precise technical choices, systems, and code used to scale SaaS and agency operations.
                        </p>
                    </section>

                    {/* BLOG ARCHIVE */}
                    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
                        <div className="text-center md:text-left mb-12 flex items-center justify-center md:justify-start gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white inline-block uppercase tracking-tight">All Case Studies</h3>
                            <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-white/10 px-3 py-1 rounded-md">{posts?.length || 0}</span>
                        </div>

                        {(!posts || posts.length === 0) ? (
                            <div className="text-center py-20 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-sm">
                                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">Archiving case studies...</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {posts.map((post, i) => (
                                    <Link key={post.slug.current} href={`/blog/${post.slug.current}/`} className="group">
                                        <article style={{ animationDelay: `${i * 150}ms` }} className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both h-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all hover:-translate-y-2 shadow-xl dark:shadow-sm">
                                            <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                                {post.image ? (
                                                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-700">
                                                        <span className="text-xs font-black uppercase tracking-widest">No Image</span>
                                                    </div>
                                                )}
                                                {/* Overlay Date */}
                                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] text-slate-800 dark:text-white font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                                    <Clock size={12} />
                                                    {new Date(post.date).toLocaleDateString()}
                                                </div>
                                                <div className="absolute top-4 right-4 bg-blue-600 dark:bg-blue-500/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] text-white font-black uppercase tracking-widest shadow-lg">
                                                    Case Study
                                                </div>
                                            </div>
                                            <div className="p-8">
                                                <h3 className="text-slate-900 dark:text-white font-black text-xl mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug uppercase tracking-tight">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-[15px] font-medium line-clamp-3 leading-relaxed mb-6">{post.description}</p>
                                                <span className="text-blue-600 dark:text-blue-500 text-[11px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read Blueprint <ArrowRight size={14} />
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
                <div className="hidden lg:block sticky top-32 h-[calc(100vh-8rem)] min-w-[350px]">
                    <aside className="h-full overflow-y-auto pb-8 space-y-12 scrollbar-none animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">

                    {/* SEARCH */}
                    <Suspense fallback={<div className="h-12 bg-white dark:bg-white/5 rounded-xl animate-pulse border border-slate-200 dark:border-transparent" />}>
                        <SearchWidget />
                    </Suspense>

                    <div className="bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/10 border border-blue-200/50 dark:border-blue-500/20 rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl dark:shadow-none">
                        <div className="relative z-10">
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Build This Stack</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-[15px] font-medium mb-8 leading-relaxed">
                                Want to deploy one of these exact architectures for your agency? Let&apos;s map it out.
                            </p>
                            <Link href="/contact/" className="block text-center w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg dark:shadow-none">
                                Book a Technical Call
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    </div>

                    </aside>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-20 border-t border-slate-200 dark:border-white/10">
                <DefaultContentFooter />
            </div>
        </main>
    );
}
