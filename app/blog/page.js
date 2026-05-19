import { Suspense } from 'react';

import { getSanityPosts, getSanityCategories } from '@/lib/sanity.client';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, BookOpen, Clock, ArrowRight } from 'lucide-react';

import SearchWidget from '../../components/SearchWidget';
import DefaultContentFooter from '../../components/footers/DefaultContentFooter';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/MotionWrappers';

export const metadata = {
    title: "Blog | AI Automation, Next.js & RevOps Insights",
    description: "Actionable engineering playbooks, n8n automation tutorials, and architectural insights for scaling SaaS founders and agencies.",
    alternates: {
        canonical: '/blog/',
    },
    openGraph: {
        title: "Blog | AI Automation, Next.js & RevOps Insights",
        description: "Actionable engineering playbooks, n8n automation tutorials, and architectural insights for scaling SaaS founders and agencies.",
        url: 'https://whoisalfaz.me/blog/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Blog | AI Automation, Next.js & RevOps Insights",
        description: "Actionable engineering playbooks, n8n automation tutorials, and architectural insights for scaling SaaS founders and agencies.",
    }
};

export default async function BlogPage() {
    const posts = await getSanityPosts();
    const categories = await getSanityCategories();

    const recentPosts = posts?.slice(0, 5); // Top 5 for sidebar

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* CollectionPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Blog | AI Automation, Next.js & RevOps Insights",
                        "description": "Actionable engineering playbooks, n8n automation tutorials, and architectural insights for scaling SaaS founders and agencies.",
                        "url": "https://whoisalfaz.me/blog/",
                        "mainEntity": {
                            "@type": "ItemList",
                            "numberOfItems": posts.length,
                            "itemListElement": posts.slice(0, 10).map((post, i) => ({
                                "@type": "ListItem",
                                "position": i + 1,
                                "url": `https://whoisalfaz.me/blog/${post.slug}/`
                            }))
                        }
                    })
                }}
            />
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-16 items-start">

                {/* === LEFT COLUMN: MAIN CONTENT === */}
                <div>
                    {/* HERO SECTION */}
                    <FadeUp className="mb-20 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
                            AI automation, Next.js, SEO and <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-blue-400 dark:to-purple-400">growth for SaaS and agencies</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-2xl font-medium">
                            Discover insights, tools, and resources to enhance your tech skills.
                        </p>

                        {/* FEATURED: START YOUR JOURNEY */}
                        <div className="bg-white dark:bg-gradient-to-r dark:from-[#0f172a] dark:to-[#1e293b] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group shadow-2xl dark:shadow-lg transition-colors duration-300">
                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Start your Automation Journey Today</h2>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-[15px] font-medium">
                                        Discover a variety of topics tailored to your interests. Our blog categories cover everything from AI tool reviews to practical case studies, enriching your knowledge and keeping you informed.
                                    </p>
                                    <button className="px-8 py-4 bg-teal-600 dark:bg-transparent border-2 border-transparent dark:border-white text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-teal-700 dark:hover:bg-white dark:hover:text-black transition-all shadow-md dark:shadow-none">
                                        Get a Free Playbook
                                    </button>
                                </div>
                                {/* Playbook Image */}
                                <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
                                    <Image src="/playbook.jpg" alt="Start Your AI Automation Today with n8n" fill className="object-contain drop-shadow-2xl" />
                                </div>
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        </div>
                    </FadeUp>

                    {/* TOPICS / CATEGORIES */}
                    <FadeUp delay={0.15} className="mb-20">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4 uppercase tracking-tight">Topics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categories?.map((cat, i) => (
                                <Link key={cat.slug.current} href={`/blog/category/${cat.slug.current}/`} style={{ animationDelay: `${i * 100}ms` }} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-teal-500/50 dark:hover:border-blue-500/50 transition-all group cursor-pointer shadow-sm hover:shadow-md dark:shadow-none">
                                    <span className="text-slate-700 dark:text-slate-300 font-bold group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-blue-500"></span>
                                        {cat.name}
                                    </span>
                                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-black/50 px-2.5 py-1 rounded-md">{cat.count}</span>
                                </Link>
                            ))}
                            {!categories && <div className="text-slate-500 text-sm font-medium animate-pulse">Loading topics...</div>}
                        </div>
                    </FadeUp>

                    {/* BLOG ARCHIVE */}
                    <FadeUp delay={0.3} className="mb-20">
                        <div className="text-center md:text-left mb-12 border-b border-slate-200 dark:border-white/10 pb-4">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white inline-block uppercase tracking-tight">Blog Archive</h3>
                        </div>

                        <StaggerContainer className="grid md:grid-cols-2 gap-8">
                            {posts?.map((post, i) => (
                                <StaggerItem key={post.slug.current} className="h-full">
                                    <Link href={`/blog/${post.slug.current}/`} className="group block h-full">
                                        <article className="h-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:border-teal-400/50 dark:hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl dark:shadow-sm flex flex-col">
                                            
                                            {/* TOP IMAGE AREA WITH PILLS */}
                                            <div className="h-64 bg-slate-100 dark:bg-slate-800 relative overflow-hidden p-6 flex flex-col justify-start">
                                                {post.image ? (
                                                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-teal-500/20" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                
                                                {/* Pills overlay */}
                                                <div className="relative z-10 flex flex-wrap gap-2">
                                                    {/* Date Pill */}
                                                    <span className="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-[10px] text-slate-900 dark:text-white font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                                        <Clock size={12} />
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                    {/* Category Pills */}
                                                    {post.categories && post.categories.length > 0 && post.categories.slice(0, 2).map(cat => (
                                                        <span key={cat} className="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* BOTTOM CONTENT AREA */}
                                            <div className="p-8 flex flex-col flex-grow relative bg-white dark:bg-[#0a0a0a]">
                                                <h3 className="text-slate-900 dark:text-white font-black text-2xl mb-4 group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter leading-[1.1] text-balance">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium line-clamp-3 leading-relaxed mb-8 flex-grow">
                                                    {post.description}
                                                </p>
                                                <div className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex justify-end items-center w-full group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors gap-1.5">
                                                    <span>DETAILS</span>
                                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </FadeUp>
                </div>

                {/* === RIGHT COLUMN: SIDEBAR === */}
                <div className="hidden lg:block sticky top-32 h-[calc(100vh-8rem)] min-w-[350px]">
                    <FadeUp delay={0.4} className="h-full overflow-y-auto pb-8 space-y-12 scrollbar-none">

                    {/* SEARCH */}
                    <Suspense fallback={<div className="h-12 bg-white dark:bg-white/5 rounded-xl animate-pulse border border-slate-200 dark:border-transparent" />}>
                        <SearchWidget />
                    </Suspense>

                    {/* RECENT POSTS */}
                    <div className="bg-white dark:bg-transparent p-6 rounded-[2rem] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Recent Posts</h4>
                        <StaggerContainer className="space-y-6">
                            {recentPosts?.map((post, i) => (
                                <StaggerItem key={post.slug.current} className="block">
                                    <Link href={`/blog/${post.slug.current}/`} className="group block">
                                        <h5 className="text-slate-800 dark:text-slate-300 text-[15px] font-bold group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
                                            {post.title}
                                        </h5>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-600 block">{new Date(post.date).toLocaleDateString()}</span>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>



                    {/* ARCHIVES (Mock) */}
                    <div className="bg-white dark:bg-transparent p-6 rounded-[2rem] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Archives</h4>
                        <ul className="space-y-3 text-[15px] font-medium text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-teal-600 dark:hover:text-blue-400 block py-1 transition-colors">January 2026</Link></li>
                            <li><Link href="#" className="hover:text-teal-600 dark:hover:text-blue-400 block py-1 transition-colors">December 2025</Link></li>
                        </ul>
                    </div>

                    {/* CATEGORIES (Sidebar Duplicate) */}
                    <div className="bg-white dark:bg-transparent p-6 rounded-[2rem] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Categories</h4>
                        <ul className="space-y-3">
                            {categories?.map(cat => (
                                <li key={cat.slug}>
                                    <Link href={`/blog/category/${cat.slug.current}/`} className="text-[14px] font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-blue-400 flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/5 group transition-colors">
                                        <span>{cat.name}</span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={14} /></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    </FadeUp>
                </div>

            </div>

            {/* SEO CONTENT FOOTER */}
            <DefaultContentFooter />
        </main>
    );
}
