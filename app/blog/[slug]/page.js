
import xss from 'xss';
import { getPostBySlug } from '../../../lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, User, Twitter, Linkedin, Facebook, Instagram, Link as LinkIcon } from 'lucide-react';
import TableOfContents from '../../../components/TableOfContents';
import NewsletterForm from '../../../components/NewsletterForm';

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#0a0a0a]">
        <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-blue-400 hover:underline">Return to Blog</Link>
      </div>
    );
  }

  // Calculate read time
  const wordCount = post.content?.split(/\s+/g).length || 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen pb-20 pt-32 relative bg-[#0a0a0a] selection:bg-purple-500/30 selection:text-white">

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      {/* HEADER SECTION */}
      <header className="max-w-4xl mx-auto px-6 mb-16 text-center">

        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 text-sm font-medium group bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-white/20">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
        </Link>

        {/* Meta Badges */}
        <div className="flex justify-center gap-3 mb-8">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            Growth Engineering
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
            n8n Automation
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 border-y border-white/5 py-6 w-fit mx-auto px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 relative overflow-hidden">
                <Image src="/profile.jpg" alt="Alfaz" fill className="object-cover" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-xs">Alfaz Mahmud</div>
              <div className="text-[10px] uppercase tracking-wider">Author</div>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-500" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-500" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </header>


      {/* MAIN CONTENT LAYOUT: SIDEBAR + CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        {/* LEFT: CONTENT */}
        <div className="lg:pr-8">

          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 group">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </div>
          )}

          {/* PROSE CONTENT */}
          <div className="
                prose prose-lg prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-ul:marker:text-blue-500 prose-ol:marker:text-blue-500
                prose-li:text-slate-300
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-900/10 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-blue-200
                prose-code:text-purple-300 prose-code:bg-purple-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-xl
                prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-12
             "
            dangerouslySetInnerHTML={{ __html: xss(post.content) }}
          />

          {/* AUTHOR BOX FOOTER */}
          <div className="mt-20 p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden relative flex-shrink-0">
              <Image src="/profile.jpg" alt="Alfaz" fill className="object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Written by Alfaz Mahmud Rizve</h3>
              <p className="text-slate-400 text-sm mb-4">Automation Architect & Full Stack Developer. Helping agencies scale with 10x efficiency.</p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://www.facebook.com/" target="_blank" className="text-slate-500 hover:text-blue-400 transition-colors"><Facebook size={18} /></a>
                <a href="https://www.linkedin.com/in/alfaz-mahmud-rizve/" target="_blank" className="text-slate-500 hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
                <a href="https://www.instagram.com/whois.alfaz/" target="_blank" className="text-slate-500 hover:text-blue-400 transition-colors"><Instagram size={18} /></a>
              </div>
            </div>
          </div>

        </div>


        {/* RIGHT: SIDEBAR (Sticky) */}
        <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">

          {/* TABLE OF CONTENTS */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">On this page</h4>
            <TableOfContents />
          </div>

          {/* NEWSLETTER (Glowing Box) */}
          <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/20">
            <div className="bg-[#0a0a0a] rounded-xl p-6 h-full relative overflow-hidden">
              {/* Decorative background blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -mr-16 -mt-16"></div>

              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Join the Inner Circle</h3>
              <p className="text-slate-400 text-xs mb-6 relative z-10">Get weekly automation blueprints and n8n tips delivered to your inbox.</p>

              <div className="relative z-10">
                <NewsletterForm source={`blog-${slug}`} />
              </div>
            </div>
          </div>

          {/* SHARE */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Share Article</h4>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                <Twitter size={14} /> Tweet
              </button>
              <button className="flex-1 py-2 bg-blue-900/20 text-blue-300 rounded-lg text-xs font-bold hover:bg-blue-800 hover:text-white transition-colors flex items-center justify-center gap-2">
                <Linkedin size={14} /> Share
              </button>
            </div>
          </div>

        </aside>

      </div>
    </article>
  );
}