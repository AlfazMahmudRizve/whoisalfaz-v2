import { Suspense } from 'react';
import { getAllPosts, getPostBySlug, getAllCategories } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import NewsletterForm from '@/components/NewsletterForm';
import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/Callout';
import ShareButtons from '@/components/ShareButtons';
import BlogImage from '@/components/BlogImage';
import StepList from '@/components/StepList';
import SearchWidget from '@/components/SearchWidget';
import DeployingTheStacks from '@/components/DeployingTheStacks';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested article could not be loaded at this time.',
    };
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDesc = post.seoDescription || post.description;
  const canonicalUrl = `https://whoisalfaz.me/blog/${slug}/`;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
      authors: ['Alfaz Mahmud Rizve'],
      section: post.categories?.[0] || 'Technology',
      images: [
        {
          url: post.image || '/featured-image.png',
        },
      ],
    },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const posts = getAllPosts();
  const categories = getAllCategories();
  const recentPosts = posts.filter(p => p.slug !== slug).slice(0, 5);

  const currentIndex = posts.findIndex(p => p.slug === slug);
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const prevPost = currentIndex !== -1 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  if (!post) {
    // Return a strict 404 to explicitly drop dead/missing legacy URLs from Google's index, solving the duplicate content soft-404 issue.
    notFound();
  }

  // Calculate read time
  const wordCount = post.content?.split(/\s+/g).length || 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 selection:bg-teal-500/30 selection:text-teal-900 dark:selection:text-teal-200 pb-20 pt-24">

      {/* AMBIENT GLOWS */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-500/5 to-transparent dark:from-teal-900/10 dark:to-transparent -z-10 transition-colors duration-300" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.seoTitle || post.title,
            "datePublished": post.date,
            "dateModified": post.date,
            "image": post.image ? [post.image] : [],
            "author": {
              "@type": "Person",
              "name": "Alfaz Mahmud Rizve",
              "url": "https://whoisalfaz.me"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Alfaz Mahmud Rizve",
              "logo": {
                "@type": "ImageObject",
                "url": "https://whoisalfaz.me/logo.png"
              }
            }
          })
        }}
      />

      {/* --- HERO SECTION: HEADER CARD --- */}
      <header className="max-w-7xl mx-auto px-6 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">

        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors mb-12 text-xs group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
        </Link>

        <div className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-[#0f172a] dark:to-slate-900 border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl dark:shadow-xl transition-colors duration-300">

          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 dark:bg-teal-500/10 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Meta Badges */}
            <div className="flex gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest shadow-sm dark:shadow-none">
                Tech Deep Dive
              </span>
              <span className="px-4 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest shadow-sm dark:shadow-none">
                Engineering
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight uppercase text-balance">
              {post.seoTitle || post.title}
            </h1>

            {/* Author & Meta Grid */}
            <div className="flex flex-wrap items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-14 pb-2">

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 ring-2 ring-slate-200 dark:ring-white/10">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src="/profile.jpg" alt="Alfaz" fill className="object-cover" />
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="text-slate-900 dark:text-white font-black text-[15px]">Alfaz Mahmud Rizve</div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">@whoisalfaz</div>
                </div>
              </div>

              <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <Calendar size={18} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>

              <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <Clock size={18} />
                <span>{readTime} min read</span>
              </div>

            </div>
          </div>
        </div>

        {/* FEATURED IMAGE (Wide & Rounded) */}
        {post.image && (
          <div className="mt-8 relative w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl group bg-white dark:bg-[#0a0a0a]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#0a0a0a] via-transparent to-transparent opacity-60" />
          </div>
        )}
      </header>


      {/* --- MAIN LAYOUT GRID (Left TOC, Center Content, Right Sidebar) --- */}
      <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[250px_1fr_300px] gap-10 xl:gap-16 relative items-start">

        {/* LEFT COLUMN: TABLE OF CONTENTS (Sticky) */}
        <div className="hidden lg:block sticky top-32 h-fit">
          <aside className="space-y-8">
            <div className="bg-white dark:bg-white/5 p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none animate-in fade-in slide-in-from-left-8 duration-1000 delay-300 fill-mode-both">
              <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 dark:border-white/5 pb-3">
                In this Article
              </h4>
              <TableOfContents />
            </div>

            {/* SHARE AREA (Detached below TOC) */}
            <div className="bg-white dark:bg-white/5 p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none animate-in fade-in slide-in-from-left-8 duration-1000 delay-500 fill-mode-both">
              <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 dark:border-white/5 pb-3">
                Share
              </h4>
              <ShareButtons />
            </div>

            {/* NEWSLETTER (Detached) */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000 delay-700 fill-mode-both">
              <div className="p-8 rounded-[2rem] bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-800 dark:border-white/10 shadow-xl">
                <h4 className="text-white font-black uppercase tracking-tight mb-3 text-lg">Join the Inner Circle</h4>
                <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">Exclusive automation tips, directly to your inbox.</p>
                <NewsletterForm />
              </div>
            </div>
          </aside>
        </div>

        {/* RIGHT COLUMN: ARTICLE CONTENT */}
        <main className="min-w-0 w-full overflow-x-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">

          <div className="
              prose prose-slate dark:prose-invert prose-lg max-w-none w-full
              prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mt-24 prose-h2:mb-10
              prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:text-teal-600 dark:prose-h3:text-teal-400 prose-h3:mt-16 prose-h3:mb-8
              prose-p:mb-8 prose-p:leading-[1.8] prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:font-medium
              prose-a:text-teal-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-teal-500 dark:hover:prose-a:text-blue-300 hover:prose-a:underline
              prose-img:max-w-4xl prose-img:mx-auto prose-img:rounded-[2rem] prose-img:shadow-xl prose-img:my-16 prose-img:border prose-img:border-slate-200 dark:prose-img:border-white/10
              prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:mb-4 prose-li:leading-[1.8] prose-li:font-medium
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50 dark:prose-blockquote:bg-teal-950/20 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200 prose-blockquote:font-medium prose-blockquote:shadow-sm dark:prose-blockquote:shadow-none
              prose-hr:my-16 prose-hr:border-slate-200 dark:prose-hr:border-white/10 prose-hr:w-full
            ">
            {/* Affiliate Disclosure */}
            {post.affiliates && post.affiliates.length > 0 && (
              <p className="text-slate-500 dark:text-slate-500 text-[13px] font-bold tracking-wide italic mb-10 border-l-4 border-slate-300 dark:border-slate-800 pl-6 py-3 bg-slate-100/50 dark:bg-slate-900/30 rounded-r-xl">
                This technical breakdown contains affiliate links. If you deploy this stack using my links, I earn a commission at no extra cost to you.
              </p>
            )}


            <MDXRemote
              source={post.content}
              components={{
                hr: () => <hr className="wp-block-separator has-alpha-channel-opacity my-16 border-slate-200 dark:border-white/10 w-full" />,
                pre: CodeBlock,
                blockquote: Callout,
                img: BlogImage,
                ol: StepList,
              }}
              options={{ mdxOptions: { format: 'md' } }}
            />

            {/* Dynamic Affiliate Links Injection */}
            {post.affiliates && post.affiliates.length > 0 && (
              <DeployingTheStacks affiliates={post.affiliates} />
            )}

            {/* Previous/Next Article Navigation */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-24 pt-12 border-t border-slate-200 dark:border-white/10">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="group p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-teal-500/50 hover:shadow-xl dark:shadow-none transition-all flex flex-col justify-center">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3 flex items-center gap-2"><ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous Post</span>
                    <h4 className="text-slate-900 dark:text-white font-black text-lg group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 uppercase tracking-tight">{prevPost.title}</h4>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="group p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-teal-500/50 hover:shadow-xl dark:shadow-none transition-all flex flex-col justify-center text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3 flex items-center justify-end gap-2">Next Post <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" /></span>
                    <h4 className="text-slate-900 dark:text-white font-black text-lg group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 uppercase tracking-tight">{nextPost.title}</h4>
                  </Link>
                ) : <div />}
              </div>
            )}
          </div>

          {/* Mobile TOC (Visible only on small screens) */}
          <div className="lg:hidden mt-20 py-10 border-t border-slate-200 dark:border-white/10">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-white/5 pb-3">In this Article</h4>
            <div className="prose-toc">
              <TableOfContents />
            </div>
          </div>

        </main>

        {/* RIGHT COLUMN: STICKY SIDEBAR (Search, Recent, Categories) */}
        <div className="hidden xl:block sticky top-32 h-[calc(100vh-8rem)] min-w-[300px]">
          <aside className="h-full overflow-y-auto pb-8 space-y-12 scrollbar-none animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 fill-mode-both">

          {/* SEARCH */}
          <div className="bg-white dark:bg-transparent p-6 rounded-[2rem] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none">
            <Suspense fallback={<div className="h-12 bg-slate-50 dark:bg-white/5 rounded-xl animate-pulse border border-slate-100 dark:border-transparent" />}>
              <SearchWidget />
            </Suspense>
          </div>

          {/* RECENT POSTS */}
          <div className="bg-white dark:bg-transparent p-6 rounded-[2rem] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none">
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Recent Posts</h4>
            <ul className="space-y-6">
              {recentPosts?.map(post => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <h5 className="text-slate-800 dark:text-slate-300 text-[15px] font-bold group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
                      {post.title}
                    </h5>
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-600 block">{new Date(post.date).toLocaleDateString()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ARCHIVES (Mock) */}
          <div className="bg-white dark:bg-transparent p-6 rounded-[2rem] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none">
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Archives</h4>
            <ul className="space-y-3 text-[15px] font-medium text-slate-500 dark:text-slate-400">
              <li><Link href="#" className="hover:text-teal-600 dark:hover:text-blue-400 block py-1 transition-colors">January 2026</Link></li>
              <li><Link href="#" className="hover:text-teal-600 dark:hover:text-blue-400 block py-1 transition-colors">December 2025</Link></li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="bg-white dark:bg-transparent p-6 rounded-[2rem] border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none">
            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Categories</h4>
            <ul className="space-y-3">
              {categories?.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/blog/category/${cat.slug}`} className="text-[14px] font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-blue-400 block py-2 border-b border-slate-100 dark:border-white/5 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          </aside>
        </div>

      </div>

      {/* Bottom CTA Area (Moved Outside Grid to un-stick Sidebars here) */}
      <div className="max-w-5xl mx-auto px-6 mt-32">
        <div className="p-1.5 rounded-[3rem] bg-gradient-to-br from-teal-400 via-emerald-500 to-teal-600 dark:from-teal-500 dark:via-purple-600 dark:to-pink-500 shadow-2xl">
          <div className="bg-white dark:bg-[#0f172a] rounded-[2.5rem] p-10 md:p-14 text-center">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300">automate your agency?</span></h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">Skip the manual grunt work. Let's build a custom system that runs your business on autopilot 24/7.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl shadow-lg dark:shadow-none hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:-translate-y-1">
                Book a Strategy Call
              </Link>
              <Link href="/services" className="px-8 py-4 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-1 shadow-sm dark:shadow-none">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>

    </article >
  );
}