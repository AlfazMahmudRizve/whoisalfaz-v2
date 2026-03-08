import { Suspense } from 'react';
import { getAllPosts, getPostBySlug, getAllCategories } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import NewsletterForm from '@/components/NewsletterForm';
import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/Callout';
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
      images: [
        {
          url: post.image || '/profile.jpg',
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
    <article className="min-h-screen bg-[#0a0a0a] selection:bg-teal-500/30 selection:text-teal-200 pb-20 pt-24">

      {/* AMBIENT GLOWS */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-900/10 to-transparent -z-10" />

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
      <header className="max-w-7xl mx-auto px-6 mb-10">

        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
        </Link>

        <div className="bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">

          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Meta Badges */}
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
                Tech Deep Dive
              </span>
              <span className="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
                Engineering
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight text-balance">
              {post.seoTitle || post.title}
            </h1>

            {/* Author & Meta Grid */}
            <div className="flex flex-wrap items-center gap-8 text-sm text-slate-400 mt-12 pb-2">

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 p-0.5 ring-2 ring-white/10">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src="/profile.jpg" alt="Alfaz" fill className="object-cover" />
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold">Alfaz Mahmud Rizve</div>
                  <div className="text-xs text-slate-500">@whoisalfaz</div>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{readTime} min read</span>
              </div>

            </div>
          </div>
        </div>

        {/* FEATURED IMAGE (Wide & Rounded) */}
        {post.image && (
          <div className="mt-6 relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
          </div>
        )}
      </header>


      {/* --- MAIN LAYOUT GRID (Left TOC, Center Content, Right Sidebar) --- */}
      <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[250px_1fr_300px] gap-10 xl:gap-16 relative">

        {/* LEFT COLUMN: STICKY SIDEBAR (TOC + Share) */}
        <aside className="hidden lg:block h-fit sticky top-32 space-y-12 min-w-0 w-full">

          {/* Table of Contents */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Table of Contents</h4>
            <TableOfContents />
          </div>

          {/* Social Share (Vertical) */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Share</h4>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-sm font-medium border border-white/5 hover:border-white/10">
                <Twitter size={16} className="text-blue-400" /> Twitter
              </button>
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-sm font-medium border border-white/5 hover:border-white/10">
                <Linkedin size={16} className="text-blue-600" /> LinkedIn
              </button>
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-sm font-medium border border-white/5 hover:border-white/10">
                <LinkIcon size={16} className="text-purple-400" /> Copy Link
              </button>
            </div>
          </div>

          {/* Mini Newsletter (Sidebar) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10">
            <h4 className="text-white font-bold mb-2 text-sm">Join the Inner Circle</h4>
            <p className="text-xs text-slate-400 mb-4">Exclusive automation tips, directly to your inbox.</p>
            <NewsletterForm source="sidebar" />
          </div>

        </aside>


        {/* RIGHT COLUMN: ARTICLE CONTENT */}
        <main className="min-w-0 w-full overflow-x-hidden">

          <div className="
              prose prose-invert prose-lg max-w-none w-full
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-4xl lg:prose-h2:text-5xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:tracking-tight
              prose-h3:text-3xl lg:prose-h3:text-4xl prose-h3:text-teal-400 prose-h3:mt-12 prose-h3:mb-6
              prose-p:mb-8 prose-p:leading-8 prose-p:text-slate-300
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
              prose-img:max-w-3xl prose-img:mx-auto prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12
              prose-li:text-slate-300 prose-li:mb-4 prose-li:leading-7
              prose-strong:text-white prose-strong:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-950/20 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-200 prose-blockquote:italic
              prose-hr:my-12 prose-hr:border-white/10 prose-hr:w-full
            ">
            {/* Affiliate Disclosure */}
            {post.affiliates && post.affiliates.length > 0 && (
              <p className="text-slate-500 text-sm italic mb-6 border-l-2 border-slate-800 pl-6 py-2 bg-slate-900/30 rounded-r-lg">
                This technical breakdown contains affiliate links. If you deploy this stack using my links, I earn a commission at no extra cost to you.
              </p>
            )}

            {/* Hardcoded Article Byline */}
            <p className="text-white font-bold mb-12 text-[1.1rem]">
              By Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect at <a href="https://whoisalfaz.me" className="text-teal-400 no-underline hover:text-teal-300">whoisalfaz.me</a>
            </p>

            <MDXRemote
              source={post.content}
              components={{
                hr: () => <hr className="wp-block-separator has-alpha-channel-opacity my-16 border-white/10 w-full" />,
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-8 border-t border-white/10">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/50 transition-colors flex flex-col justify-center">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous Post</span>
                    <h4 className="text-white font-bold group-hover:text-teal-400 transition-colors line-clamp-2">{prevPost.title}</h4>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/50 transition-colors flex flex-col justify-center text-right">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2 flex items-center justify-end gap-2">Next Post <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" /></span>
                    <h4 className="text-white font-bold group-hover:text-teal-400 transition-colors line-clamp-2">{nextPost.title}</h4>
                  </Link>
                ) : <div />}
              </div>
            )}
          </div>

          {/* Mobile TOC (Visible only on small screens) */}
          <div className="lg:hidden mt-12 py-8 border-t border-white/10">
            <h4 className="text-sm font-bold text-white mb-4">In this Article</h4>
            <TableOfContents />
          </div>

          {/* Bottom CTA Area */}
          <div className="mt-20 p-1 rounded-3xl bg-gradient-to-br from-teal-500 via-purple-600 to-pink-500">
            <div className="bg-[#0f172a] rounded-[22px] p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to automate your agency?</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">Skip the manual grunt work. Let's build a custom system that runs your business on autopilot 24/7.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors">
                  Book a Strategy Call
                </Link>
                <Link href="/services" className="px-8 py-4 bg-white/5 text-white font-bold rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  View Services
                </Link>
              </div>
            </div>
          </div>

        </main>

        {/* RIGHT COLUMN: STICKY SIDEBAR (Search, Recent, Categories) */}
        <aside className="hidden xl:block space-y-12 h-[calc(100vh-8rem)] overflow-y-auto pb-8 sticky top-32 min-w-[300px] scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">

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

          {/* ARCHIVES (Mock) */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Archives</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-blue-400 block py-1">January 2026</Link></li>
              <li><Link href="#" className="hover:text-blue-400 block py-1">December 2025</Link></li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Categories</h4>
            <ul className="space-y-2">
              {categories?.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/blog/category/${cat.slug}`} className="text-sm text-slate-400 hover:text-blue-400 block py-1 border-b border-white/5 pb-2">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </aside>

      </div>

    </article >
  );
}