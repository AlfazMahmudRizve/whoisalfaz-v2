
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

const CATEGORY_MAP = {
    '30-days-of-n8n-automation': {
        name: '30 Days of n8n Automation',
        title: '30 Days of n8n Automation Series | whoisalfaz',
        description: 'A comprehensive 30-day architectural blueprint for mastering n8n, self-hosted automation, and enterprise RevOps workflows.'
    },
    'architecture-teardowns': {
        name: 'Architecture Teardowns & Case Studies',
        title: 'Architecture Teardowns & Case Studies | whoisalfaz',
        description: 'Deep dive technical case studies detailing production automated systems, Next.js architecture, and AI agent frameworks.'
    },
    'ai-content-systems': {
        name: 'AI Content Systems',
        title: 'AI Content Systems & LLM Automation | whoisalfaz',
        description: 'Guides and blueprints for building autonomous AI content generation engines, vector databases, and programmatic workflow pipelines.'
    },
    'ai-lead-generation': {
        name: 'AI Lead Generation',
        title: 'AI Lead Generation & Outbound Automation | whoisalfaz',
        description: 'Technical blueprints for building automated B2B lead generation infrastructure, Apollo.io scraping, Brevo cold email, and AI SDRs.'
    },
    'n8n-automation': {
        name: 'n8n Automation',
        title: 'n8n Automation — Technical Guides & Blueprints | whoisalfaz',
        description: 'Definitive technical guides for building self-hosted, scalable, and enterprise-ready workflow automations using n8n and vector DBs.'
    },
    'revops-architecture': {
        name: 'RevOps Architecture',
        title: 'RevOps Architecture & Data Attribution | whoisalfaz',
        description: 'Engineering methodologies for unifying revenue operations, CRM data pipelines, attribution models, and Databox dashboards.'
    },
    'tool-comparisons': {
        name: 'Tool Comparisons',
        title: 'Tool Comparisons & Benchmarks | whoisalfaz',
        description: 'Objective, benchmark-driven technical evaluations comparing modern automation platforms, vector databases, and AI tools.'
    },
    'seo-optimization': {
        name: 'SEO & Optimization',
        title: 'SEO & Optimization — Technical Guides | whoisalfaz',
        description: 'Forensic technical SEO guides, programmatic indexation blueprints, and Generative Engine Optimization (GEO) strategies.'
    }
};

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const category = await getSanityCategoryBySlug(slug);
    const custom = CATEGORY_MAP[slug];

    const name = custom?.name || category?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const title = custom?.title || `${name} — Technical Guides & Blueprints | whoisalfaz`;
    const description = custom?.description || (category?.description
        ? `${category.description.slice(0, 155).trim()}...`
        : `Read all articles about ${name}. Technical tutorials, case studies, and architectural blueprints by Alfaz Mahmud Rizve.`);

    return {
        title,
        description,
        alternates: {
            canonical: `https://whoisalfaz.me/blog/category/${slug}/`,
        },
        openGraph: {
            title,
            description,
            url: `https://whoisalfaz.me/blog/category/${slug}/`,
            type: 'website',
            siteName: 'whoisalfaz',
            images: [
                {
                    url: 'https://whoisalfaz.me/featured-image.png',
                    width: 1200,
                    height: 630,
                    alt: `${name} Category – whoisalfaz`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://whoisalfaz.me/featured-image.png'],
        }
    };
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const posts = await getSanityPostsByCategory(slug);
    const category = await getSanityCategoryBySlug(slug);
    const custom = CATEGORY_MAP[slug];
    const categoryName = custom?.name || category?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const categoryDescription = custom?.description || category?.description;

    const rawCategories = await getSanityCategories();
    const defaultRequiredCategories = [
        { name: "AI Content Systems", slug: { current: "ai-content-systems" } },
        { name: "Learn Automation in 30 Days", slug: { current: "learn-automation-in-30-days" } },
        { name: "30 Days of n8n Automation", slug: { current: "30-days-of-n8n-automation" } },
        { name: "Architecture Teardowns", slug: { current: "architecture-teardowns" } }
    ];
    const allCategories = [...(rawCategories || [])];
    defaultRequiredCategories.forEach(req => {
        if (!allCategories.some(c => c.slug?.current === req.slug.current)) {
            allCategories.push(req);
        }
    });
    const recentPosts = await getSidebarData();

    const categoryJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": `${categoryName} — Blog`,
                "description": categoryDescription || `All articles about ${categoryName} by Alfaz Mahmud Rizve.`,
                "url": `https://whoisalfaz.me/blog/category/${slug}/`,
                "mainEntity": {
                    "@type": "ItemList",
                    "numberOfItems": posts?.length || 0,
                    "itemListElement": (posts || []).map((post, i) => ({
                        "@type": "ListItem",
                        "position": i + 1,
                        "url": `https://whoisalfaz.me/blog/${post.slug.current}/`,
                        "name": post.title
                    }))
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://whoisalfaz.me/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Blog",
                        "item": "https://whoisalfaz.me/blog/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": categoryName,
                        "item": `https://whoisalfaz.me/blog/category/${slug}/`
                    }
                ]
            }
        ]
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* JSON-LD SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
            />
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-slate-50 dark:bg-[#0a0a0a] -z-20 transition-colors duration-300" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/30 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-16 items-start">

                {/* === LEFT COLUMN: MAIN CONTENT === */}
                <div>
                    {/* HERO SECTION */}
                    <section className="mb-12 bg-white dark:bg-[#111111]/80 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm backdrop-blur-sm transition-colors duration-300">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                            <Link href="/blog/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
                            <ChevronRight size={14} />
                            <span className="text-teal-600 dark:text-blue-400 font-medium">Category</span>
                            <ChevronRight size={14} />
                            <span className="text-slate-900 dark:text-white font-semibold transition-colors duration-300">{categoryName}</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-white/10">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                                <span className="text-teal-600 dark:text-blue-500">#</span> {categoryName}
                            </h1>
                            <span className="px-3 py-1 bg-teal-50 dark:bg-blue-950/50 text-teal-700 dark:text-blue-400 text-xs font-semibold rounded-full border border-teal-200/50 dark:border-blue-800/50">
                                {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
                            </span>
                        </div>

                        {categoryDescription ? (
                            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                                {categoryDescription.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph.trim()}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
                                Browsing all articles in <span className="text-slate-900 dark:text-white font-medium transition-colors duration-300">&quot;{categoryName}&quot;</span>.
                            </p>
                        )}
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

                    {/* DIRECT H2 ANSWER SUMMARIES FOR SEMRUSH OPTIMIZATION */}
                    <section className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 space-y-10">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">
                                What is included in the {categoryName} category?
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
                                The {categoryName} category features in-depth technical guides, production-tested code examples, architectural blueprints, and step-by-step implementation tutorials designed by Alfaz Mahmud Rizve to help engineers and founders scale their RevOps and automation infrastructure.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">
                                How to apply these {categoryName} architectural blueprints
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
                                You can apply these {categoryName} blueprints directly by downloading the included workflow JSON files, following the step-by-step deployment instructions for self-hosted servers, or contacting our team for custom infrastructure implementation.
                            </p>
                        </div>
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
