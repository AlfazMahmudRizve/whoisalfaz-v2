'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Zap, Globe, Code2, BarChart3, Mail, Server } from 'lucide-react';

const techStack = [
  {
    name: 'n8n',
    role: 'Workflow Automation',
    icon: Zap,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    desc: 'Open-source automation engine for building self-healing workflows. No per-task pricing.',
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
    link: '/services/headless-architecture/',
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
    desc: 'LLM-powered agents for lead qualification, content generation, and autonomous decision-making.',
    link: '/blog/',
  },
  {
    name: 'Technical SEO',
    role: 'Search Visibility',
    icon: BarChart3,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    desc: 'Structured data, Core Web Vitals optimization, sitemap architecture, and crawl budget management.',
    link: '/services/technical-seo/',
  },
  {
    name: 'Email Systems',
    role: 'Marketing Automation',
    icon: Mail,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    desc: 'Automated drip sequences, transactional emails, and newsletter infrastructure via Brevo.',
    link: '/contact/',
  },
];

const faqs = [
  {
    q: 'Who is Alfaz Mahmud Rizve?',
    a: 'Alfaz Mahmud Rizve is a RevOps architect and full-stack automation engineer based in Bangladesh. He specializes in building autonomous revenue systems for SaaS companies, digital agencies, and small businesses using n8n workflows, AI agents, and high-performance Next.js infrastructure. His mission is to help business owners escape the "Content Treadmill" and build systems that run on autopilot.',
  },
  {
    q: 'What is workflow automation?',
    a: 'Workflow automation is the process of replacing manual, repetitive business tasks with automated systems. Instead of manually copying data between your CRM, email tool, and spreadsheets, an automation engine like n8n handles it instantly via webhooks and API integrations — saving hundreds of hours per month.',
  },
  {
    q: 'How much does n8n cost?',
    a: 'n8n offers a free self-hosted option that you can deploy on any cloud server for roughly $5-20/month in hosting costs. Unlike Zapier or Make, n8n does not charge per task execution, making it dramatically cheaper for high-volume automation. n8n Cloud plans start at $20/month for managed hosting.',
  },
  {
    q: 'What is a headless CMS?',
    a: 'A headless CMS decouples your content management from your frontend presentation. Your content lives in one system (like WordPress, Strapi, or local MDX files), while your frontend is built with a modern framework like Next.js. This architecture delivers faster page loads, better SEO, and stronger security.',
  },
  {
    q: 'Do you offer free consultations?',
    a: 'Yes. Book a free strategy call to discuss your automation needs, current tech stack, and growth goals. There is no obligation — the call is designed to identify bottlenecks and determine if a custom automation system is the right fit for your business.',
  },
];

export default function HomeContentFooter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto space-y-32">
        {/* ─── WHO IS ALFAZ MAHMUD RIZVE ─── */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-12 items-start">
            {/* Portrait */}
            <div className="hidden md:block">
              <div className="relative w-48 h-48 rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 shadow-xl">
                <Image
                  src="/profile.webp"
                  alt="Alfaz Mahmud Rizve — RevOps and Full Stack Automation Architect"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight transition-colors duration-300">
                Who Is <span className="text-teal-600 dark:text-teal-400">Alfaz</span> Mahmud Rizve?
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                <p>
                  Alfaz Mahmud Rizve is a RevOps architect and full-stack automation engineer who builds autonomous revenue systems for scaling agencies, SaaS companies, and small businesses. Based in Bangladesh and working with clients globally, he specializes in eliminating manual bottlenecks through self-healing n8n workflows, AI agent deployments, and high-performance Next.js infrastructure.
                </p>
                <p>
                  With a focus on practical, revenue-driven engineering, Alfaz helps business owners escape the &quot;Content Treadmill&quot; — replacing fragile Zapier chains and manual processes with enterprise-grade automation architectures that run 24/7 without human intervention. His work spans custom full-stack applications, headless CMS infrastructure, technical SEO, and workflow automation consulting.
                </p>
                <p>
                  Through <Link href="/blog/" className="text-teal-600 dark:text-blue-400 font-bold hover:underline">his blog</Link>, Alfaz documents the exact systems, tools, and frameworks he uses — including the 30-day automation engineering series and in-depth technical guides. He also provides <Link href="/audit/" className="text-teal-600 dark:text-blue-400 font-bold hover:underline">a free website audit tool</Link> and an <Link href="/labs/roi/" className="text-teal-600 dark:text-blue-400 font-bold hover:underline">ROI calculator</Link> to help agencies measure automation impact before investing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/portfolio/"
                  className="px-6 py-3 bg-slate-900 dark:bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 dark:hover:bg-white/15 transition-all"
                >
                  View Portfolio
                </Link>
                <Link
                  href="/contact/"
                  className="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Book Strategy Call
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TECHNOLOGY STACK ─── */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight text-center transition-colors duration-300">
            Our Technology <span className="text-purple-600 dark:text-purple-400">Stack</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-16 leading-relaxed transition-colors duration-300">
            The tools and frameworks we use to build autonomous revenue systems for modern businesses.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((tech) => (
              <Link
                key={tech.name}
                href={tech.link}
                className="group p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-teal-500/30 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg ${tech.bg} border ${tech.border} flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform`}
                  >
                    <tech.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-tight transition-colors">
                      {tech.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold">
                      {tech.role}
                    </span>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors">
                  {tech.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── FREQUENTLY ASKED QUESTIONS ─── */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight text-center transition-colors duration-300">
            Frequently Asked <span className="text-teal-600 dark:text-teal-400">Questions</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed transition-colors duration-300">
            Common questions about automation, our services, and working with Alfaz Mahmud Rizve.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-teal-500/30 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/5'
                      : 'border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-slate-900 dark:text-white font-bold text-[15px] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-teal-600 dark:text-teal-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">
                        {faq.a}
                      </p>
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
