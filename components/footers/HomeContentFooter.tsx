'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LucideIcon, ChevronDown, Zap, Globe, Code2, BarChart3, Mail, Server } from 'lucide-react';

interface TechStackItem {
  name: string;
  role: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  desc: string;
  link: string;
}

const techStack: TechStackItem[] = [
  {
    name: 'n8n',
    role: 'Workflow Automation',
    icon: Zap,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    desc: 'Open-source automation engine for building self-healing workflows without per-task fee locks.',
    link: '/services/n8n-automation/',
  },
  {
    name: 'Next.js',
    role: 'Frontend Framework',
    icon: Globe,
    color: 'text-white',
    bg: 'bg-white/5',
    border: 'border-white/10',
    desc: 'React framework for server-rendered, SEO-optimized web applications with sub-second load times.',
    link: '/services/',
  },
  {
    name: 'Custom Apps',
    role: 'Full-Stack Development',
    icon: Code2,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    desc: 'Bespoke internal tools, dashboards, and client portals engineered for your specific business logic.',
    link: '/services/custom-full-stack/',
  },
  {
    name: 'AI Agents',
    role: 'Intelligent Automation',
    icon: Server,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    desc: 'LLM-powered agents for lead qualification, RAG retrieval, and autonomous decision-making.',
    link: '/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/',
  },
  {
    name: 'Technical SEO',
    role: 'Search Visibility',
    icon: BarChart3,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    desc: 'Structured data, Core Web Vitals optimization, sitemap architecture, and crawl budget management.',
    link: '/blog/screaming-frog-alternatives-free-seo-audit-tools/',
  },
  {
    name: 'Email Systems',
    role: 'Marketing Automation',
    icon: Mail,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    desc: 'Automated drip sequences, transactional emails, and lead nurture infrastructure via Brevo.',
    link: '/contact/',
  },
];

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    q: 'Who is Alfaz Mahmud Rizve?',
    a: (
      <>
        Alfaz Mahmud Rizve is a RevOps architect and full-stack automation engineer based in Bangladesh. He specializes in building autonomous revenue systems for SaaS companies, digital agencies, and small businesses using n8n workflows, <Link href="/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">Dify vs n8n AI workflow architecture</Link>, and high-performance Next.js infrastructure. His mission is to help business owners adopt the <Link href="/blog/ai-automation-agency-business-model/" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">AI automation agency business model</Link> and build systems that run on autopilot.
      </>
    ),
  },
  {
    q: 'What is workflow automation?',
    a: (
      <>
        Workflow automation is the process of replacing manual, repetitive business tasks with automated systems. Instead of manually copying data between your CRM, email tool, and spreadsheets, an automation engine like n8n handles it instantly via webhooks and API integrations — saving hundreds of hours per month. For messaging funnels, review our <Link href="/blog/manychat-pricing-2026/" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">ManyChat 2026 pricing teardown</Link> to eliminate per-contact penalty costs.
      </>
    ),
  },
  {
    q: 'How much does n8n cost?',
    a: (
      <>
        n8n offers a free self-hosted option that you can deploy on any cloud server for roughly $5-20/month in hosting costs. Unlike Zapier or Make, n8n does not charge per task execution, making it dramatically cheaper for high-volume automation. When engineering self-hosted RAG systems with n8n, consult our <Link href="/blog/pinecone-vs-qdrant-vultr-benchmark/" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">Pinecone vs Qdrant benchmark on Vultr</Link> for detailed memory and hardware cost comparisons.
      </>
    ),
  },
  {
    q: 'What is a headless CMS and how do I audit my technical SEO?',
    a: (
      <>
        A headless CMS decouples your content management from your frontend presentation. Your content lives in one system while your frontend is built with a modern framework like Next.js, delivering faster page loads, better SEO, and stronger security. You can inspect your Core Web Vitals and security headers using our browser-based <Link href="/blog/screaming-frog-alternatives-free-seo-audit-tools/" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">free Screaming Frog alternative</Link>.
      </>
    ),
  },
  {
    q: 'Do you offer free consultations?',
    a: (
      <>
        Yes. Book a free strategy call to discuss your automation needs, current tech stack, and growth goals. There is no obligation — the call is designed to identify bottlenecks and determine if a custom automation system is the right fit for your business.
      </>
    ),
  },
];

export default function HomeContentFooter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/30 transition-colors">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* ─── 1. ARCHITECT BRIEFING: WHO IS ALFAZ MAHMUD RIZVE ─── */}
        <div id="about" className="scroll-mt-24">
          <div className="rounded-[2.5rem] p-8 sm:p-12 border bg-white dark:bg-[#111622] border-slate-200/90 dark:border-white/10 shadow-xl relative overflow-hidden transition-all">
            
            <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-center">
              {/* Portrait with Status Badge */}
              <div className="relative mx-auto md:mx-0 w-48 h-48 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-white/10 shadow-xl shrink-0 group">
                <Image
                  src="/profile.webp"
                  alt="Alfaz Mahmud Rizve — GTM & RevOps Architect"
                  fill
                  sizes="208px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                <span className="absolute bottom-3 right-3 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#111622]" />
                </span>
              </div>

              {/* Bio & Credentials */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-3 bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>GTM &amp; RevOps Architect • Verified n8n Creator</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-urbanist font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                  Who Is <span className="text-teal-700 dark:text-teal-400">Alfaz</span> Mahmud Rizve?
                </h2>

                <div className="space-y-3.5 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  <p>
                    I engineer autonomous revenue engines for scaling SaaS brands, digital agencies, and enterprise founders. Based in Bangladesh and consulting globally, I bridge high-velocity SEO architecture, sub-second Next.js web applications, and self-healing n8n RevOps pipelines.
                  </p>
                  <p>
                    My goal is simple: replace fragile no-code tools and manual operational drag with enterprise-grade systems that generate pipeline and convert buyers 24/7. Explore our empirical{' '}
                    <Link href="/blog/pinecone-vs-qdrant-vultr-benchmark/" className="text-teal-700 dark:text-teal-400 font-semibold hover:underline">
                      Pinecone vs Qdrant benchmark
                    </Link>, our verified{' '}
                    <Link href="/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/" className="text-teal-700 dark:text-teal-400 font-semibold hover:underline">
                      Dify vs n8n workflow architecture
                    </Link>, or run our browser-native{' '}
                    <Link href="/audit/" className="text-teal-700 dark:text-teal-400 font-semibold hover:underline">
                      free website audit tool
                    </Link>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <Link
                    href="/portfolio/"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-sm"
                  >
                    View Project Library
                  </Link>
                  <Link
                    href="/contact/"
                    className="px-6 py-3 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-400 border border-teal-500/20 font-bold text-xs uppercase tracking-wider rounded-full transition-all"
                  >
                    Book Strategy Call
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── 2. TECHNOLOGY STACK & CAPABILITIES ─── */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-urbanist font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Technology <span className="text-purple-600 dark:text-purple-400">Stack &amp; Capabilities</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
              Core production engines and frameworks deployed across our client infrastructure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {techStack.map((tech) => (
              <Link
                key={tech.name}
                href={tech.link}
                className="group p-6 rounded-2xl bg-white dark:bg-[#111622] border border-slate-200/90 dark:border-white/10 hover:border-teal-500/40 dark:hover:border-teal-400/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className={`w-10 h-10 rounded-xl ${tech.bg} border ${tech.border} flex items-center justify-center ${tech.color} group-hover:scale-105 transition-transform`}>
                      <tech.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold text-base uppercase tracking-tight group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {tech.name}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {tech.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {tech.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                  <span>Explore Architecture</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── 3. FREQUENTLY ASKED QUESTIONS ─── */}
        <div id="faq" className="max-w-3xl mx-auto scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-urbanist font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Frequently Asked <span className="text-teal-700 dark:text-teal-400">Questions</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
              Transparent answers regarding client engagements, timeline delivery, and technical ownership.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-teal-500/40 bg-teal-500/[0.03] shadow-sm'
                      : 'border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#111622] hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                  >
                    <span className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${
                      isOpen ? 'text-teal-800 dark:text-teal-300' : 'text-slate-900 dark:text-white'
                    }`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-teal-600 dark:text-teal-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 -mt-1 border-t border-slate-100 dark:border-white/[0.04] pt-3">
                      <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
