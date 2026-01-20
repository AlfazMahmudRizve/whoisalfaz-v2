import { getAllPosts } from '../lib/api';
import AuditTool from '../components/AuditTool';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Zap, Layout, Search, BarChart3, Database, Globe, Mail, Video } from 'lucide-react';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen selection:bg-blue-500 selection:text-white pb-20 pt-24">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

      {/* SECTION 0: HERO (NEW) */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          AI automations for SaaS, Agencies & Small Businesses <br className="hidden md:block" />
          that <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Save hours</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">grow revenue</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Done-for-you n8n workflows, high-converting WordPress funnels, and AI-powered content engines tailored to your business
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="px-8 py-4 bg-teal-400 hover:bg-teal-300 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all transform hover:-translate-y-1 block text-center">
            Book a free strategy call
          </Link>
          <Link href="/services" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors block text-center">
            See Automations & results
          </Link>
        </div>

        <div className="mt-16 border-t border-white/10 w-full"></div>
      </section>

      {/* SECTION 1: VALUE PROP "Built for SaaS founders..." */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="bg-gradient-to-br from-orange-50/5 via-white/5 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-2">Built for SaaS founders & Agencies</h2>
          <p className="text-slate-400 mb-10">Transforming manual operations into automated workflows & SEO assets.</p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                You have a proven product but limited time for manual outreach.
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                Identify high-quality leads from data scraping & enrichment tools.
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                SEO technical errors break your ranking and organic traffic.
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                Need automated follow-ups via email/LinkedIn/WhatsApp.
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                Automate conversions from cold traffic to paying leads.
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                Optimize WordPress/Webflow for speed & conversions.
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                Sync lead data to CRM (HubSpot, Airtable, Notion).
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={18} />
                Build a sustainable growth engine while you focus on product.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROCESS "4-Step Workflow" */}
      <section className="max-w-6xl mx-auto px-6 text-center mb-32">
        <h2 className="text-3xl font-bold text-white mb-4">Our 4-Step n8n Workflow Development Process</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16">From strategy to deployment, we ensure your automation is reliable, scalable, and tailored to your business goals.</p>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-y-1/2 hidden md:block"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mx-auto mb-4 border border-blue-500/20">1</div>
              <h3 className="text-white font-medium">Discovery & Audit</h3>
            </div>
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold mx-auto mb-4 border border-purple-500/20">2</div>
              <h3 className="text-white font-medium">Draft Strategy</h3>
            </div>
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold mx-auto mb-4 border border-orange-500/20">3</div>
              <h3 className="text-white font-medium">Solution Build</h3>
            </div>
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold mx-auto mb-4 border border-green-500/20">4</div>
              <h3 className="text-white font-medium">Final & Support</h3>
            </div>
          </div>

          <Link href="/contact" className="mt-12 px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-full transition-colors shadow-lg shadow-orange-500/20 inline-block">
            Book free consulting
          </Link>
        </div>
      </section>

      {/* SECTION 3: CENTERED PROFILE */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-32">
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
            <Image src="/profile.jpg" alt="Alfaz Mahmud" fill className="object-cover" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">Alfaz Mahmud Rizve</h1>
        <p className="text-slate-400 mb-8">Builder • Automator • Architect</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link href="/portfolio" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all transform hover:-translate-y-1">
            View Portfolio
          </Link>
          <Link href="/blog" className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all transform hover:-translate-y-1">
            Read my Blogs
          </Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-black font-bold rounded-full shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all transform hover:-translate-y-1">
            Book Free Strategy Call
          </Link>
        </div>
      </section>

      {/* SECTION 4: SCALE WITH AUTOMATION (AUDIT TOOL) */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Scale with automation</h2>
              <p className="text-slate-400 mb-6">Enter your details to receive a comprehensive audit of your automation potential and competitive landscape.</p>

              {/* We use the AuditTool component but control its wrapper styles above */}
              <div className="audit-tool-wrapper">
                <AuditTool />
              </div>
            </div>
            <div className="hidden md:block relative h-64 w-full bg-black/30 rounded-xl border border-white/5 p-4">
              <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono text-sm">
                [Automation Graph Placeholder]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LATEST INSIGHTS (BLOG) */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Latest Insights on n8n & Marketing Automation</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts?.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="h-full bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-colors">
                <div className="h-48 bg-slate-800 relative">
                  {post.featuredImage?.node?.sourceUrl && (
                    <Image src={post.featuredImage.node.sourceUrl} alt={post.title} fill className="object-cover" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                  <div className="text-slate-400 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog" className="px-6 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium hover:bg-blue-500/20 transition-colors">
            View all posts
          </Link>
        </div>
      </section>

      {/* SECTION 6: SERVICES GRID */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">AI automation & growth services</h2>
          <p className="text-slate-400 mt-2">End-to-end implementation for scaling your operations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Automation workflows",
              icon: Zap,
              desc: "Custom n8n workflows to handle leads, data, and operations.",
              bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400",
              link: "/services/n8n-automation"
            },
            {
              title: "Technical SEO audits",
              icon: Search,
              desc: "Deep dive analysis into your site's performance and ranking blocking issues.",
              bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400",
              link: "/services/technical-seo"
            },
            {
              title: "Strategy & consulting",
              icon: BarChart3,
              desc: "Tailored growth plans for agencies and SaaS startups.",
              bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400",
              link: "/services/growth-consulting"
            },
            {
              title: "Headless CMS Architecture",
              icon: Globe,
              desc: "The best of both worlds: The easy editing of WordPress combined with the raw speed of Next.js.",
              bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400",
              link: "/services/headless-architecture"
            },
            {
              title: "CRM architecture",
              icon: Database,
              desc: "Data organization and synchronization across your stack.",
              bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400",
              link: "/services/growth-consulting" // Fallback or new slug
            },
            {
              title: "UGC Video Ads",
              icon: Video,
              desc: "High-converting short-form video content for TikTok & Reels.",
              bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400",
              link: "/services/ugc-video-ads"
            }
          ].map((service, i) => (
            <div key={i} className={`rounded-xl border ${service.border} ${service.bg} p-8 hover:-translate-y-1 transition-transform duration-300 flex flex-col backdrop-blur-sm group`}>
              <div className={`w-12 h-12 rounded-lg ${service.bg} border ${service.border} flex items-center justify-center ${service.text} mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">{service.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
              <Link href={service.link} className={`text-sm font-bold flex items-center gap-1 ${service.text} hover:opacity-80 transition-opacity`}>
                See details <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: MISSION */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-12 text-center md:text-left relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-orange-600 font-bold uppercase tracking-wider text-xs mb-2 block">Our Mission</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our mission</h2>
            <p className="text-slate-700 mb-6 leading-relaxed">
              We help SaaS startups and agencies reclaim their time and scale efficiently. By replacing manual grunt work with intelligent automation, we empower founders to focus on product and strategy.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We believe in "No Fluff" growth—just engineered systems that work reliably in the background 24/7.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        </div>
      </section>

      {/* SECTION 8: NEWSLETTER */}
      <section className="max-w-xl mx-auto px-6 text-center pb-20">
        <h2 className="text-xl text-white font-medium mb-8">Subscribe for daily AI automation playbooks and no-fluff growth tips</h2>

        <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700">
          <h3 className="text-white font-bold mb-1">Join Inner Circle</h3>
          <p className="text-slate-500 text-xs mb-6">Weekly insights. Unsubscribe efficiently.</p>

          <form className="space-y-4">
            <input type="email" placeholder="Email address" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" />
            <button className="w-full py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold rounded-lg transition-colors">
              Subscribe Free
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
