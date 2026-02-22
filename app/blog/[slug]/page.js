import { getAllPosts, getPostBySlug } from '@/lib/api';
import { replaceBackendUrl } from '@/lib/seo-utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import NewsletterForm from '@/components/NewsletterForm';
import xss from 'xss';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const seoTitle = post.seo?.title || post.title;
  const seoDesc = post.seo?.description || post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160);
  const canonicalUrl = post.seo?.canonicalUrl || `https://whoisalfaz.me/blog/${slug}/`;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seo?.openGraph?.title || seoTitle,
      description: post.seo?.openGraph?.description || seoDesc,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: post.seo?.openGraph?.image?.sourceUrl || post.featuredImage?.node?.sourceUrl || '/profile.jpg',
        },
      ],
    },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
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
            "headline": replaceBackendUrl(post.title),
            "datePublished": post.date,
            "dateModified": post.modified || post.date,
            "image": post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
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
              {replaceBackendUrl(post.title)}
            </h1>

            {/* Author & Meta Grid */}
            <div className="flex flex-wrap items-center gap-8 text-sm text-slate-400">

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
        {post.featuredImage?.node?.sourceUrl && (
          <div className="mt-6 relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src={post.featuredImage.node.sourceUrl}
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


      {/* --- MAIN LAYOUT GRID (Left TOC, Right Content) --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 relative">

        {/* LEFT COLUMN: STICKY SIDEBAR (TOC + Share) */}
        <aside className="hidden lg:block h-fit sticky top-32 space-y-12 min-w-[280px]">

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
        <main className="min-w-0">

          <div className="
              prose prose-lg prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
              prose-h1:text-5xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:text-teal-400
              prose-p:text-slate-300 prose-p:leading-8 prose-p:mb-6
              prose-a:text-teal-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-teal-300 hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-950/10 prose-blockquote:px-8 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:text-teal-100 prose-blockquote:not-italic
              prose-code:text-pink-300 prose-code:bg-[#0f172a] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-white/10 prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0f172a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:p-6
              prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-10 prose-img:w-full
              prose-li:text-slate-300 prose-li:marker:text-teal-500
              prose-strong:text-white prose-strong:font-bold
              prose-hr:border-white/10 prose-hr:my-12
            "
            dangerouslySetInnerHTML={{
              __html: xss(
                replaceBackendUrl(post.content)
              )
            }}
          />

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
      </div>

    </article>
  );
}