import { getSanityPosts } from '@/lib/sanity.client';
import WorkflowSteps from '../components/WorkflowSteps';
import LazyAuditTool from '../components/LazyAuditTool';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Code2, Globe, Mail } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import HomeContentFooter from '../components/footers/HomeContentFooter';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/MotionWrappers';
import { HeroMarketeamUpgrade } from '@/components/hero';

export default async function Home() {
  const posts = await getSanityPosts();

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Alfaz Mahmud Rizve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alfaz Mahmud Rizve is a RevOps architect and full-stack automation engineer based in Bangladesh. He specializes in building autonomous revenue systems for SaaS companies, digital agencies, and small businesses using n8n workflows, AI agents, and high-performance Next.js infrastructure."
        }
      },
      {
        "@type": "Question",
        "name": "What is workflow automation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Workflow automation is the process of replacing manual, repetitive business tasks with automated systems. Instead of manually copying data between your CRM, email tool, and spreadsheets, an automation engine like n8n handles it instantly via webhooks and API integrations."
        }
      },
      {
        "@type": "Question",
        "name": "How much does n8n cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "n8n offers a free self-hosted option that you can deploy on any cloud server for roughly $5-20/month in hosting costs. Unlike Zapier or Make, n8n does not charge per task execution. n8n Cloud plans start at $20/month for managed hosting."
        }
      },
      {
        "@type": "Question",
        "name": "What is a headless CMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A headless CMS decouples your content management from your frontend presentation. Your content lives in one system while your frontend is built with a modern framework like Next.js, delivering faster page loads, better SEO, and stronger security."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer free consultations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Book a free strategy call to discuss your automation needs, current tech stack, and growth goals. There is no obligation."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] grid-mesh selection:bg-teal-500/20 selection:text-teal-900 dark:selection:text-teal-100 overflow-hidden relative transition-colors duration-300 pb-20">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-teal-500/5 dark:bg-teal-500/5 blur-[120px] pointer-events-none -z-10 animate-ambient-1" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] aspect-square rounded-full bg-purple-500/5 dark:bg-purple-500/5 blur-[120px] pointer-events-none -z-10 animate-ambient-2" />

      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      {/* PERSON SCHEMA — E-E-A-T Entity Signal */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Alfaz Mahmud Rizve",
          "url": "https://whoisalfaz.me",
          "image": "https://whoisalfaz.me/profile.jpg",
          "jobTitle": "RevOps Architect & Full Stack Automation Engineer",
          "description": "Alfaz Mahmud Rizve is a RevOps architect and full-stack automation engineer specializing in building autonomous revenue systems for SaaS companies, digital agencies, and small businesses using n8n workflows, AI agents, and high-performance Next.js infrastructure.",
          "sameAs": [
            "https://www.linkedin.com/in/alfaz-mahmud-rizve/",
            "https://x.com/whoisalfaz",
            "https://github.com/AlfazMahmudRizve"
          ],
          "knowsAbout": [
            "n8n Workflow Automation",
            "Revenue Operations (RevOps)",
            "Next.js",
            "Technical SEO",
            "AI Agent Architecture",
            "Headless CMS",
            "Full Stack Development",
            "Supabase",
            "Lead Enrichment Automation",
            "Progressive Web Apps"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "whoisalfaz",
            "url": "https://whoisalfaz.me"
          }
        }) }}
      />

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

      {/* SECTION 0: UPGRADED COSMIC HERO */}
      <HeroMarketeamUpgrade />

      {/* Featured Case Study Banner */}
      <section className="relative px-6 mt-8 sm:mt-12 mb-8 z-10">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/blog/case-study-urban-cafe-foodtech-platform/" 
            className="group block"
          >
            <div className="bento-card rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
              {/* Glow decorative orb */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Left Side: Thumbnail */}
              <div className="w-full md:w-80 lg:w-96 aspect-[16/10] relative rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 shrink-0 bg-slate-100 dark:bg-slate-800">
                <Image
                  src="/images/blog/case-study-urban-cafe-foodtech-platform-featured.webp"
                  alt="Kitchen OS Featured Case Study"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Right Side: Text details */}
              <div className="flex-1 flex flex-col items-start relative z-10">
                <span className="px-3.5 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  Featured Case Study
                </span>
                
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight uppercase group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Zero-Hardware Kitchen OS: How I Replaced a $2,000 POS System With a Next.js PWA
                </h3>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-2xl font-medium">
                  A deep dive into building a real-time, browser-native restaurant OS. Replaced proprietary tablets with voice-activated alerts and a Supabase real-time sync engine, saving $2,000 in upfront hardware costs and 3% commission on every transaction.
                </p>
                
                <div className="inline-flex items-center gap-2 text-xs font-black text-teal-700 dark:text-teal-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  See how I replaced a $2,000 POS system <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>


      {/* Value Proposition */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Bento: Headings and Features */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <FadeUp>
                <div className="inline-block px-4 py-1 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-lg text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-4">
                  OPERATIONAL ARCHITECTURE
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] uppercase tracking-tight transition-colors duration-300">
                  Revenue Operations <br /> <span className="text-teal-600 dark:text-teal-400">Architects</span>
                </h2>
              </FadeUp>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {[
                  { icon: Zap, title: "Autonomous Workflows", desc: "Self-healing AI agents that instantly qualify leads, sync your CRM, and scale your pipeline.", span: "sm:col-span-2" },
                  { icon: Code2, title: "Full-Stack Applications", desc: "Bespoke agency portals and client dashboards engineered for massive scale.", span: "sm:col-span-1" },
                  { icon: Globe, title: "Headless Infrastructure", desc: "The high-performance Next.js foundation that powers your entire revenue engine.", span: "sm:col-span-1" }
                ].map((item, i) => (
                  <StaggerItem key={i} className={`bento-card rounded-[2rem] p-6 flex flex-col justify-between group h-full ${item.span}`}>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                        <item.icon className="text-slate-900 dark:text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1 transition-colors duration-300">{item.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors duration-300">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Right Bento: High-Fidelity Mock Pipeline Visualizer */}
            <div className="lg:col-span-5 flex">
              <FadeUp delay={0.2} className="w-full h-full flex">
                <div className="bento-card w-full rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group">
                  
                  {/* Glowing pipeline layout */}
                  <div className="w-full flex-grow flex flex-col justify-center items-center py-6 min-h-[220px]">
                    <div className="relative w-full max-w-sm aspect-[1.8/1] flex items-center justify-between px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-slate-200/50 dark:border-white/5 p-4 sm:p-6 backdrop-blur-sm overflow-hidden">
                      
                      {/* Grid background inside mock */}
                      <div className="absolute inset-0 grid-mesh opacity-30 pointer-events-none" />

                      {/* SVG Flow Lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 60 90 L 160 90" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="2" />
                        <path d="M 60 90 L 160 90" className="animate-flow-line" stroke="#14b8a6" strokeWidth="2" />
                        <path d="M 160 90 L 260 90" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="2" />
                        <path d="M 160 90 L 260 90" className="animate-flow-line" stroke="#a855f7" strokeWidth="2" style={{ animationDelay: '0.6s' }} />
                      </svg>

                      {/* Source Node (ManyChat/Webhook) */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <Zap size={20} className="text-teal-500" />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Inbound</span>
                      </div>

                      {/* Process Node (n8n Engine) */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-teal-500/50 dark:border-teal-400/40 flex items-center justify-center shadow-xl animate-pulse-glow">
                          <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
                        </div>
                        <span className="text-[9px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.2em] font-mono">n8n Engine</span>
                      </div>

                      {/* Destination Node (CRM/Brevo) */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <Code2 size={20} className="text-purple-500" />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">CRM Sync</span>
                      </div>
                    </div>

                    {/* LED statuses */}
                    <div className="flex gap-4 mt-6 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono w-full max-w-sm px-2">
                      <div className="flex items-center gap-1.5 flex-1 justify-center bg-slate-100/50 dark:bg-white/5 py-1.5 px-3 rounded-lg border border-slate-200/50 dark:border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-led-blink shrink-0" />
                        <span>Flow Live</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-1 justify-center bg-slate-100/50 dark:bg-white/5 py-1.5 px-3 rounded-lg border border-slate-200/50 dark:border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-led-blink shrink-0" style={{ animationDelay: '0.4s' }} />
                        <span>Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Original Logo Block and Texts preserved */}
                  <div className="border-t border-slate-200/50 dark:border-white/5 pt-6 w-full flex items-center justify-between gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-md flex items-center justify-center border border-slate-100 dark:border-white/10">
                        <Image src="/logo.png" alt="Logo" width={22} height={22} className="object-contain" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none transition-colors duration-300">Enterprise Protocol</h3>
                        <p className="text-[9px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.25em] mt-1 transition-colors duration-300">Verified Infrastructure</p>
                      </div>
                    </div>
                    {/* Subtle aesthetic watermark logo */}
                    <div className="relative w-8 h-8 opacity-10">
                      <Image
                        src="/logo.png"
                        alt="whoisalfaz Logo"
                        fill
                        sizes="32px"
                        className="object-contain grayscale brightness-0 dark:invert"
                      />
                    </div>
                  </div>

                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 bg-white dark:bg-black/20 border-y border-slate-200 dark:border-white/10 overflow-hidden relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight transition-colors duration-300">
            The Execution <span className="text-teal-600 dark:text-teal-400">Framework</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 text-base font-medium transition-colors duration-300">Four phases of precision engineering to scale your technical operation.</p>
          <WorkflowSteps />
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 px-6 flex justify-center">
        <FadeUp className="w-full max-w-4xl">
          <div className="bento-card rounded-[3rem] p-8 md:p-14 text-center relative overflow-hidden group">
            
            {/* Ambient glows inside profile bento */}
            <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-teal-500/10 rounded-full blur-[50px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-[50px] pointer-events-none -z-10" />
            
            {/* Profile Photo Frame with Interactive Glow */}
            <div className="relative w-40 h-40 mx-auto mb-8 group/photo">
              {/* Spinning/pulsing backdrop rings */}
              <div className="absolute inset-[-4px] rounded-[2.5rem] bg-gradient-to-r from-teal-500 to-purple-500 opacity-30 blur-sm group-hover/photo:opacity-80 transition-opacity duration-500 -z-10" />
              <div className="absolute inset-0 rounded-[2.5rem] border border-teal-500/20 group-hover/photo:border-teal-500/50 transition-colors duration-500 -z-10" />
              
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl group-hover/photo:scale-[1.02] transition-transform duration-500">
                <Image 
                  src="/profile.webp" 
                  alt="Alfaz Mahmud Rizve — RevOps & Full Stack Automation Architect" 
                  fill 
                  sizes="160px" 
                  className="object-cover" 
                  priority 
                />
              </div>

              {/* Status Dot */}
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse shadow-lg z-10" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter uppercase transition-colors duration-300">
              <Link href="/about/alfaz-mahmud-rizve/" className="hover:text-teal-600 dark:text-teal-400 transition-colors">
                Alfaz Mahmud Rizve
              </Link>
            </h2>
            
            {/* Premium Pill Badges for Titles */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-8 max-w-xl mx-auto">
              {['RevOps Architect', 'Automation Engineer', 'Builder'].map((title, i) => (
                <span 
                  key={i} 
                  className="text-[9px] sm:text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full hover:border-teal-500/30 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
                >
                  {title}
                </span>
              ))}
            </div>

            {/* Frost Terminal Quote Callout */}
            <div className="bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-6 md:p-8 rounded-3xl max-w-2xl mx-auto mb-10 text-left relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-teal-500 to-purple-500" />
              <p className="text-base text-slate-600 dark:text-slate-355 font-semibold leading-relaxed pl-4">
                &ldquo;I design revenue growth strategies and then architect the automated infrastructure to execute them&rdquo; <span className="text-xs font-mono text-slate-455 dark:text-slate-500 block mt-2 not-italic font-medium">— Alfaz Mahmud Rizve</span>
              </p>
            </div>

            {/* Tactile Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <Link 
                href="/about/alfaz-mahmud-rizve/" 
                className="w-full sm:w-auto px-8 py-4.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center"
              >
                ABOUT ME
              </Link>
              <Link 
                href="/portfolio/" 
                className="w-full sm:w-auto px-8 py-4.5 bg-gradient-to-r from-teal-700 to-teal-600 dark:from-purple-600 dark:to-purple-500 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all transform flex items-center justify-center gap-2 btn-shimmer"
              >
                PROJECTS LIBRARY
              </Link>
              <Link 
                href="/contact/" 
                className="w-full sm:w-auto px-8 py-4.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                STRATEGY CALL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* Audit Tool Section */}
      <section className="py-16 px-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <LazyAuditTool />
        </div>
      </section>

      {/* Services */}

      <section className="py-16 px-6 bg-slate-50/50 dark:bg-black/20 backdrop-blur-sm border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight transition-colors duration-300">Technical <span className="text-teal-600 dark:text-teal-400">Solutions</span></h2>
              <p className="text-base text-slate-500 dark:text-slate-400 transition-colors duration-300">Engineered for sub-second performance and autonomous growth.</p>
            </div>
            <Link href="/services/" className="text-teal-600 dark:text-teal-400 font-black uppercase text-xs flex items-center gap-2 group">
              View All Services <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Custom Workflow Automation", icon: Zap,
                desc: "Self-healing AI workflows that instantly enrich leads and scale your sales engine without adding headcount.",
                bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500 dark:text-emerald-400",
                link: "/services/n8n-automation/"
              },
              {
                title: "Custom Full-Stack Applications", icon: Code2,
                desc: "Bespoke Agency Infrastructure. When off-the-shelf software blocks your growth, I build the exact internal tools you need.",
                bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-500 dark:text-rose-400",
                link: "/services/custom-full-stack/"
              },
              {
                title: "Headless CMS Infrastructure", icon: Globe,
                desc: "The high-performance Next.js foundation that powers your revenue engine with sub-second load times.",
                bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-500 dark:text-blue-400",
                link: "/services/headless-architecture/"
              }
            ].map((service, i) => (
              <article key={i} style={{ animationDelay: `${i * 150}ms` }} className={`animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col group`}>
                <div className={`w-12 h-12 rounded-2xl ${service.bg} border ${service.border} flex items-center justify-center ${service.text} mb-5 group-hover:scale-110 transition-transform`}>
                  <service.icon size={24} />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-3 uppercase tracking-tight transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-grow transition-colors duration-300">{service.desc}</p>
                <Link href={service.link} className={`mt-auto w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${service.bg} border ${service.border} ${service.text} hover:scale-[1.02] active:scale-[0.98] transition-all`}>
                  Details <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Dispatches Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight transition-colors duration-300">Latest <span className="text-purple-600 dark:text-purple-400">Dispatches</span></h2>
              <p className="text-base text-slate-500 dark:text-slate-400 transition-colors duration-300">Autonomous insights, engineering logs, and automation protocols.</p>
            </div>
            <Link href="/blog/" className="text-purple-600 dark:text-purple-400 font-black uppercase text-xs flex items-center gap-2 group">
              Library Access <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {posts?.slice(0, 3).map((post, i) => (
              <Link key={post.slug.current} href={`/blog/${post.slug.current}/`} className={`group h-full animate-in fade-in slide-in-from-bottom-12 zoom-in-[0.98] duration-1000 ease-out fill-mode-both delay-[${i * 150}ms]`}>
                <article className="h-full bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 dark:hover:border-blue-500/50 transition-all duration-500 flex flex-col">
                  {/* TOP IMAGE AREA WITH PILLS */}
                  <div className="h-40 bg-slate-100 dark:bg-slate-800 relative overflow-hidden p-4 flex flex-col justify-start">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
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
                  <div className="p-5 flex flex-col flex-grow relative bg-white dark:bg-[#1e293b]">
                    <h3 className="text-slate-900 dark:text-white font-black text-base mb-2 group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter leading-[1.1] text-balance">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-grow font-medium leading-relaxed">
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
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-6 group-hover:rotate-0 transition-transform">
            <Mail className="text-teal-600 dark:text-teal-400" size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight transition-colors duration-300">The Inner <span className="text-teal-600 dark:text-teal-400">Circle</span></h2>
          <p className="text-base text-slate-500 dark:text-slate-400 mb-8 font-medium transition-colors duration-300">Daily AI automation playbooks and no-fluff growth strategies for the modern architect.</p>

          <div className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] p-3 shadow-2xl border border-slate-100 dark:border-slate-700 max-w-xl mx-auto transition-colors duration-300">
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 transition-colors duration-300">
              <NewsletterForm source="home_newsletter_luxury" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXTUAL CONTENT FOOTER */}
      <HomeContentFooter />
    </main>
  );
}
