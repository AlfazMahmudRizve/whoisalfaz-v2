import { getAllPosts } from '@/lib/mdx';
import WorkflowSteps from '../components/WorkflowSteps';
import AuditTool from '../components/AuditTool';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Code2, Globe, Mail } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import PartnerLogos from '../components/PartnerLogos';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] selection:bg-teal-500/20 selection:text-teal-900 dark:selection:text-teal-100 overflow-hidden relative transition-colors duration-300 pb-20 pt-24">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

      {/* SECTION 0: HERO */}
      <section className="relative pt-10 pb-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 animate-in fade-in slide-in-from-bottom-12 zoom-in-[0.98] duration-1000 ease-out fill-mode-both">
          
          <div className="inline-block px-4 py-1.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-full text-xs font-bold text-teal-700 dark:text-teal-300 mb-8 shadow-sm">
            AUTONOMOUS REVENUE SYSTEMS
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[0.9] tracking-tighter max-w-5xl uppercase transition-colors duration-300">
            Autonomous <span className="text-teal-600 dark:text-teal-400">Revenue Engines</span> <br /> Built on Sub-Second <span className="text-purple-600 dark:text-purple-400">Infrastructure</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium transition-colors duration-300">
            I eliminate manual bottlenecks for scaling agencies with self-healing n8n workflows, AI agents, and high-performance Next.js architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md">
            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-teal-400 text-white dark:text-black font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all transform flex items-center justify-center gap-2">
              Book Strategy Call <ArrowRight size={20} />
            </Link>
            <Link href="/services" className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm flex items-center justify-center">
              Our Solutions
            </Link>
          </div>

          {/* Stat Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-14 pt-8 border-t border-slate-200/60 dark:border-white/5 w-full max-w-2xl">
            {[
              { value: '30+', label: 'Systems Documented' },
              { value: '6', label: 'AI Integrations' },
              { value: '< 1s', label: 'Load Time' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-300">{stat.value}</span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Divider */}
      <section className="py-12 bg-white/30 dark:bg-white/5 backdrop-blur-sm border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <PartnerLogos title="POWERING SCALE FOR MODERN INFRASTRUCTURE" />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 animate-in fade-in slide-in-from-left-12 duration-1000 ease-out fill-mode-both">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] uppercase tracking-tight transition-colors duration-300">
                Revenue Operations <br /> <span className="text-teal-600 dark:text-teal-400">Architects</span>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: Zap, title: "Autonomous Workflows", desc: "Self-healing AI agents that instantly qualify leads, sync your CRM, and scale your pipeline." },
                  { icon: Code2, title: "Full-Stack Applications", desc: "Bespoke agency portals and client dashboards engineered for massive scale." },
                  { icon: Globe, title: "Headless Infrastructure", desc: "The high-performance Next.js foundation that powers your entire revenue engine." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <item.icon className="text-slate-900 dark:text-white" size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1 transition-colors duration-300">{item.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm transition-colors duration-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative animate-in fade-in slide-in-from-right-12 duration-1000 ease-out fill-mode-both">
              <div className="relative z-10 bg-white dark:bg-white/5 rounded-[3rem] p-8 shadow-2xl dark:shadow-2xl-dark border border-slate-200 dark:border-white/10 overflow-hidden group transition-colors duration-300">
                <div className="aspect-[4/3] bg-slate-50 dark:bg-[#0a0a0a]/50 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-12 transition-colors duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo.png"
                      alt="whoisalfaz Logo"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110 grayscale brightness-0 dark:invert opacity-10"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 mb-6 rounded-3xl bg-white dark:bg-white/10 shadow-xl flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                      <Image src="/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter transition-colors duration-300">Enterprise Protocol</h3>
                    <p className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.3em] mt-2 transition-colors duration-300">Verified Infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-white dark:bg-black/20 border-y border-slate-200 dark:border-white/10 overflow-hidden relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight transition-colors duration-300">
            The Execution <span className="text-teal-600 dark:text-teal-400">Framework</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-20 text-lg font-medium transition-colors duration-300">Four phases of precision engineering to scale your technical operation.</p>
          <WorkflowSteps />
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-48 h-48 mx-auto mb-12">
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl dark:shadow-black/50 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image src="/profile.jpg" alt="Alfaz Mahmud Rizve — RevOps & Full Stack Automation Architect" fill sizes="192px" className="object-cover" priority />
            </div>
          </div>

          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase transition-colors duration-300">
            Alfaz Mahmud Rizve
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-bold mb-8 tracking-widest uppercase transition-colors duration-300">RevOps Architect &bull; Automation Engineer &bull; Builder</p>

          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium italic mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 border-l-4 border-blue-500 pl-6 py-2 bg-slate-100 dark:bg-blue-500/5 rounded-r-lg">
            "I design revenue growth strategies and then architect the automated infrastructure to execute them" - Alfaz Mahmud Rizve
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/portfolio" className="px-10 py-5 bg-teal-600 dark:bg-purple-600 text-white font-black rounded-2xl shadow-lg hover:shadow-teal-500/40 hover:-translate-y-1 transition-all">
              PROJECTS LIBRARY
            </Link>
            <Link href="/contact" className="px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center gap-2">
              STRATEGY CALL <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Audit Tool Section */}
      <section className="py-32 px-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <AuditTool />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 bg-slate-50/50 dark:bg-black/20 backdrop-blur-3xl border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight transition-colors duration-300">Technical <span className="text-teal-600 dark:text-teal-400">Solutions</span></h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 transition-colors duration-300">Engineered for sub-second performance and autonomous growth.</p>
            </div>
            <Link href="/services" className="text-teal-600 dark:text-teal-400 font-black uppercase text-sm flex items-center gap-2 group">
              View All Services <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Workflow Automation",
                icon: Zap,
                desc: "Self-healing AI workflows that instantly enrich leads and scale your sales engine without adding headcount.",
                bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500 dark:text-emerald-400",
                link: "/services/n8n-automation"
              },
              {
                title: "Custom Full-Stack Applications",
                icon: Code2,
                desc: "Bespoke Agency Infrastructure. When off-the-shelf software blocks your growth, I build the exact internal tools you need.",
                bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-500 dark:text-rose-400",
                link: "/services/custom-full-stack"
              },
              {
                title: "Headless CMS Infrastructure",
                icon: Globe,
                desc: "The high-performance Next.js foundation that powers your revenue engine with sub-second load times.",
                bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-500 dark:text-blue-400",
                link: "/services/headless-architecture"
              }
            ].map((service, i) => (
              <article key={i} style={{ animationDelay: `${i * 150}ms` }} className={`animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col group`}>
                <div className={`w-14 h-14 rounded-2xl ${service.bg} border ${service.border} flex items-center justify-center ${service.text} mb-8 group-hover:scale-110 transition-transform`}>
                  <service.icon size={28} />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-4 uppercase tracking-tight transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow transition-colors duration-300">{service.desc}</p>
                <Link href={service.link} className={`mt-auto w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${service.bg} border ${service.border} ${service.text} hover:scale-[1.02] active:scale-[0.98] transition-all`}>
                  Details <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Dispatches Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight transition-colors duration-300">Latest <span className="text-purple-600 dark:text-purple-400">Dispatches</span></h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 transition-colors duration-300">Autonomous insights, engineering logs, and automation protocols.</p>
            </div>
            <Link href="/blog" className="text-purple-600 dark:text-purple-400 font-black uppercase text-sm flex items-center gap-2 group">
              Library Access <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts?.slice(0, 3).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`group h-full animate-in fade-in slide-in-from-bottom-12 zoom-in-[0.98] duration-1000 ease-out fill-mode-both delay-[${i * 150}ms]`}>
                <article className="h-full bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 dark:hover:border-blue-500/50 transition-all duration-500 flex flex-col">
                  {/* TOP IMAGE AREA WITH PILLS */}
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden p-4 flex flex-col justify-start">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-teal-500/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Pills overlay */}
                    <div className="relative z-10 flex flex-wrap gap-2">
                       {post.categories && post.categories.length > 0 ? post.categories.slice(0, 3).map(cat => (
                         <span key={cat} className="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
                           {cat}
                         </span>
                       )) : (
                         <span className="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
                           DISPATCH
                         </span>
                       )}
                    </div>
                  </div>
                  
                  {/* BOTTOM CONTENT AREA */}
                   <div className="p-6 flex flex-col flex-grow relative bg-white dark:bg-[#1e293b]">
                     <h3 className="text-slate-900 dark:text-white font-black text-lg mb-3 group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter leading-[1.1] text-balance">
                      {post.title}
                    </h3>
                     <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 flex-grow font-medium leading-relaxed">
                      {post.description}
                    </p>
                    <div className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex justify-end items-center w-full group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors gap-1.5">
                       <span>DETAILS</span>
                       <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="w-20 h-20 bg-teal-500/10 border border-teal-500/20 rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-6 group-hover:rotate-0 transition-transform">
            <Mail className="text-teal-600 dark:text-teal-400" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight transition-colors duration-300">The Inner <span className="text-teal-600 dark:text-teal-400">Circle</span></h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 font-medium transition-colors duration-300">Daily AI automation playbooks and no-fluff growth strategies for the modern architect.</p>

          <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-4 shadow-2xl border border-slate-100 dark:border-slate-700 max-w-xl mx-auto transition-colors duration-300">
            <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 transition-colors duration-300">
              <NewsletterForm source="home_newsletter_luxury" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
