import { getPostBySlug, getPageBySlug, getAllPosts, getSitemapData } from '../../lib/api';
import xss from 'xss';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, UserCircle } from 'lucide-react';

export async function generateStaticParams() {
    const { pages } = await getSitemapData();
    return pages.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    let data = await getPostBySlug(slug);
    if (!data) data = await getPageBySlug(slug);

    if (!data) return { title: 'Page Not Found' };

    const seoTitle = data.seo?.title || data.title;
    const seoDesc = data.seo?.description || '';
    const canonicalUrl = data.seo?.canonicalUrl || `https://whoisalfaz.me/${slug}/`;

    return {
        title: seoTitle,
        description: seoDesc,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: data.seo?.openGraph?.title || seoTitle,
            description: data.seo?.openGraph?.description || seoDesc,
            url: canonicalUrl,
            images: [
                {
                    url: data.seo?.openGraph?.image?.sourceUrl || data.featuredImage?.node?.sourceUrl || '/profile.jpg',
                },
            ],
        },
    };
}
export default async function Page({ params }) {
    const { slug } = await params;

    // 1. Try to find a Post first
    let data = await getPostBySlug(slug);
    let type = 'post';

    // 2. If not a post, try to find a Page
    if (!data) {
        data = await getPageBySlug(slug);
        type = 'page';
    }

    // 3. If neither, 404
    if (!data) {
        notFound();
    }

    const isAbout = slug === 'about';
    const isServices = slug === 'services';

    return (
        <main className="min-h-screen selection:bg-blue-500 selection:text-white pb-20 pt-32">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-4xl mx-auto px-6">
                {/* Navigation */}
                <nav className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </nav>

                {/* PROFILE HEADER (Only for About Page) */}
                {isAbout && (
                    <div className="flex flex-col items-center justify-center mb-16 text-center space-y-6">
                        <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-black/50 overflow-hidden relative shadow-2xl">
                            {/* Replace with actual avatar if available, using placeholder for now */}
                            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                <UserCircle size={64} className="text-slate-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-white tracking-tight">Alfaz Mahmud</h1>
                            <p className="text-blue-400 font-mono text-sm">AI Automation Architect</p>
                        </div>
                    </div>
                )}

                {/* MAIN CONTENT CARD */}
                <article className={`
           bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden
           ${isServices ? 'text-center' : ''}
        `}>
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

                    {/* Post/Page Header */}
                    {!isAbout && (
                        <header className="mb-10 border-b border-white/5 pb-8">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                {data.title}
                            </h1>

                            {/* Metadata for Posts */}
                            {type === 'post' && (
                                <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                    <span>{new Date(data.date).toLocaleDateString()}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                    <span>By Alfaz Mahmud</span>
                                </div>
                            )}
                        </header>
                    )}

                    {/* Featured Image for Posts */}
                    {type === 'post' && data.featuredImage?.node?.sourceUrl && (
                        <div className="mb-10 rounded-xl overflow-hidden border border-white/10 shadow-lg relative h-64 md:h-96 w-full">
                            <Image
                                src={data.featuredImage.node.sourceUrl}
                                alt={data.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* WordPress Content */}
                    <div
                        className={`
               prose prose-invert prose-lg max-w-none 
               prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
               prose-p:text-slate-300 prose-p:leading-relaxed
               prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
               prose-strong:text-white
               prose-code:text-blue-300 prose-code:bg-blue-900/20 prose-code:px-1 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
               prose-li:text-slate-300
               prose-blockquote:border-l-blue-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
               ${isServices ? 'prose-p:mx-auto prose-headings:mx-auto' : ''}
             `}
                        dangerouslySetInnerHTML={{ __html: xss(data.content) }}
                    />
                </article>
            </div>
        </main>
    );
}
