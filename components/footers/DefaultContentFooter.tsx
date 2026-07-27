import Link from 'next/link';
import { ArrowRight, Search, Zap, BarChart3 } from 'lucide-react';

export default function DefaultContentFooter() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link
            href="/audit/"
            className="group p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-teal-500/30 dark:hover:border-teal-500/20 transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 dark:text-teal-400 mb-5 group-hover:scale-110 transition-transform">
              <Search size={22} />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 uppercase tracking-tight transition-colors">
              Free Website Audit
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow transition-colors">
              Check your SEO score, page speed, SSL, and security headers in 30 seconds. No signup needed.
            </p>
            <span className="text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
              Run Audit <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href="/services/growth-consulting/"
            className="group p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-purple-500/30 dark:hover:border-purple-500/20 transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <BarChart3 size={22} />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 uppercase tracking-tight transition-colors">
              Growth Consulting
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow transition-colors">
              Eliminate revenue leaks, audit your tech stack, and build a technical roadmap to scale operations.
            </p>
            <span className="text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
              Growth Roadmap <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href="/services/"
            className="group p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-5 group-hover:scale-110 transition-transform">
              <Zap size={22} />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 uppercase tracking-tight transition-colors">
              Automation Solutions
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow transition-colors">
              Custom n8n workflows, AI agents, and full-stack applications built for agencies and SaaS.
            </p>
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
              View Services <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
