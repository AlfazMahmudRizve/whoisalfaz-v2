import { getPostsByCategory } from '@/lib/mdx';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, ArrowRight, PlayCircle } from 'lucide-react';

export const metadata = {
  title: '30 Days of n8n & Automation Series | Alfaz Mahmud Rizve',
  description: 'A comprehensive 30-day architectural blueprint for mastering n8n, automation, and enterprise RevOps. Complete guide from bare-metal servers to AI agents.',
  alternates: {
    canonical: 'https://whoisalfaz.me/blog/30-days-of-n8n/',
  },
};

export default function SeriesIndexPage() {
  const { posts } = getPostsByCategory('30-days-of-n8n-automation');

  // Sort posts chronologically for a series
  const seriesPosts = [...posts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-teal-500/10 to-transparent dark:from-teal-900/10 dark:to-transparent -z-10" />

      <div className="max-w-5xl mx-auto">
        <Link href="/blog/" className="inline-flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors mb-12 text-xs group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
        </Link>

        {/* Series Header */}
        <header className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-[#0f172a] dark:to-slate-900 border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden mb-16 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <PlayCircle size={14} className="shrink-0" /> Enterprise Series
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight uppercase">
              30 Days of <span className="text-teal-600 dark:text-teal-400">n8n</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
              Stop relying on fragile Zaps. This is a 30-part architectural blueprint for engineering robust, self-hosted, enterprise-grade automation infrastructures.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" /> {seriesPosts.length} Parts
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" /> Advanced Architecture
              </div>
            </div>
          </div>
        </header>

        {/* Series Posts Grid */}
        <div className="space-y-4">
          {seriesPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block">
              <article className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-4 md:p-6 rounded-3xl hover:border-teal-500/50 dark:hover:border-teal-400/50 hover:shadow-xl transition-all duration-300">
                
                {/* Number Indicator */}
                <div className="hidden md:flex shrink-0 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 items-center justify-center font-black text-2xl text-slate-300 dark:text-slate-600 group-hover:text-teal-500 dark:group-hover:text-teal-400 group-hover:bg-teal-50 dark:group-hover:bg-teal-500/10 transition-colors">
                  {i + 1}
                </div>

                {/* Thumbnail */}
                {post.image && (
                  <div className="shrink-0 w-full md:w-48 aspect-video rounded-2xl overflow-hidden relative border border-slate-100 dark:border-white/5">
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="md:hidden inline-flex px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-md text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                    Part {i + 1}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 md:line-clamp-1 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-1.5 hidden sm:flex">
                      <Clock size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 group-hover:gap-2.5 transition-all">
                      Read Blueprint <ArrowRight size={14} />
                    </div>
                  </div>
                </div>

              </article>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
