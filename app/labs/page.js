import Link from 'next/link';
import Image from 'next/image';
import { Search, Calculator, Bot, ArrowRight, BarChart3, Shield, Cpu, BookOpen, Layers, Terminal } from 'lucide-react';

export const metadata = {
    title: 'Free Tools & Resources | WhoIsAlfaz.me',
    description: 'Explore free automation tools, ROI calculators, custom AI agents, and telemetry dashboards designed to streamline operations, eliminate manual bottlenecks, and scale your agency.',
    alternates: {
        canonical: 'https://whoisalfaz.me/labs',
    },
    openGraph: {
        title: 'Free Tools & Resources | WhoIsAlfaz.me',
        description: 'Explore free automation tools, ROI calculators, custom AI agents, and telemetry dashboards designed to streamline operations, eliminate manual bottlenecks, and scale your agency.',
        url: 'https://whoisalfaz.me/labs',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Tools & Resources | WhoIsAlfaz.me',
        description: 'Explore free automation tools, ROI calculators, custom AI agents, and telemetry dashboards designed to streamline operations, eliminate manual bottlenecks, and scale your agency.',
    }
};

export default function ToolsPage() {
    const tools = [
        {
            title: 'Agency Audit',
            desc: 'Get an instant, comprehensive technical audit of your operational workflows, SEO infrastructure, performance metrics, and hidden data bottlenecks.',
            icon: Search,
            href: '/audit/',
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
            border: 'border-blue-100 dark:border-blue-500/20',
        },
        {
            title: 'ROI Calculator',
            desc: 'Quantify the financial drain of manual operations. Calculate yearly dollar losses, hourly efficiency metrics, and payback timelines for automated fixes.',
            icon: Calculator,
            href: '/labs/roi/',
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            border: 'border-emerald-100 dark:border-emerald-500/20',
        },
        {
            title: 'CashOps',
            desc: 'Developer-focused financial dashboard featuring real-time telemetry, zero-latency data aggregation, and autonomous revenue tracking.',
            icon: BarChart3,
            image: '/cashops-logo.png',
            href: 'https://cashops.whoisalfaz.me',
            color: 'text-teal-600 dark:text-green-400',
            bg: 'bg-slate-50 dark:bg-[#050505]',
            border: 'border-teal-100 dark:border-green-500/20',
        },
        {
            title: 'CareerOps',
            desc: 'Privacy-first resume optimization tool built with custom AI prompts to match job requirements without retaining or selling personal applicant data.',
            icon: Bot,
            image: '/careerops-logo.png',
            href: 'https://careerops.whoisalfaz.me',
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-slate-50 dark:bg-[#050505]',
            border: 'border-indigo-100 dark:border-indigo-500/20',
        },
        {
            title: 'Ask Alfaz AI',
            desc: 'Interactive custom AI agent trained on n8n architecture, full-stack Next.js patterns, and RevOps workflow optimization methodologies.',
            icon: Bot,
            href: '/labs/chat/',
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-500/10',
            border: 'border-purple-100 dark:border-purple-500/20',
        },
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] selection:bg-teal-500/30 selection:text-white relative overflow-hidden transition-colors duration-300">

            {/* Background Gradients */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />
            <div className="fixed top-20 left-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-pulse transition-opacity duration-300" />

            {/* Hero Header */}
            <div className="max-w-4xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight transition-colors duration-300">
                    Automation <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600 dark:from-teal-400 dark:to-blue-500">Playground</span>
                </h1>
                <p className="text-lg font-medium text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
                    Interactive engineering tools, calculators, and AI agents built to audit your tech stack, calculate workflow ROI, and test real-time operational logic.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                {tools.map((tool, i) => (
                    <Link
                        key={i}
                        href={tool.href}
                        className={`
                            group relative p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl dark:shadow-sm
                            hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2
                            flex flex-col animate-in fade-in zoom-in-95 duration-700 fill-mode-both
                        `}
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 rounded-[3rem] bg-gradient-to-br from-transparent via-transparent to-${tool.color.split('-')[1]}-500/50`} />

                        {/* Icon or Image */}
                        <div className={`w-16 h-16 rounded-2xl ${tool.bg} ${tool.border} border-2 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 overflow-hidden relative shadow-sm`}>
                            {tool.image ? (
                                <Image src={tool.image} alt={tool.title} fill className="object-contain p-2" />
                            ) : (
                                <tool.icon size={30} className={tool.color} />
                            )}
                        </div>

                        {/* Content */}
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {tool.title}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed mb-10 flex-grow transition-colors">
                            {tool.desc}
                        </p>

                        {/* CTA */}
                        <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${tool.color} opacity-80 group-hover:opacity-100 group-hover:gap-4 transition-all w-max`}>
                            <span>Initialize Routine</span>
                            <ArrowRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>

            {/* GUIDELINES & ARCHITECTURE OVERVIEW */}
            <div className="max-w-4xl mx-auto space-y-8 mb-16">
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                            <Layers size={20} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                            Labs Architecture & Technical Overview
                        </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                        The tools in our Labs playground are built on self-hosted n8n engine logic, serverless Next.js edge functions, and client-side reactive state machines. Designed with performance and security in mind, these utilities provide instant, actionable insights without operational bloat.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-white/10">
                        <div className="flex items-start gap-3">
                            <Shield size={18} className="text-teal-500 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Zero Data Retention</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Calculations and audit data remain strictly in memory or client-side context; inputs are never sold or stored permanently.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Cpu size={18} className="text-purple-500 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Deterministic Simulation</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Calculators use mathematical models derived from real agency benchmarks to project payback periods and operational cost reductions accurately.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <BookOpen size={20} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                            Usage Guidelines for Agency Leaders
                        </h3>
                    </div>
                    <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        <p>
                            <strong>1. Audit First:</strong> Run the <em>Agency Audit</em> tool to baseline your website speed, security posture, and missing automation hooks before committing capital.
                        </p>
                        <p>
                            <strong>2. Quantify Loss:</strong> Use the <em>ROI Calculator</em> with your team&apos;s effective hourly rate to pinpoint exact weekly financial leakage caused by manual tasks.
                        </p>
                        <p>
                            <strong>3. Consult AI Agent:</strong> Ask <em>Alfaz AI</em> targeted questions regarding n8n node structures, lead routing logic, or Next.js integration architectures to evaluate solutions quickly.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center animate-in fade-in duration-1000 fill-mode-both">
                <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Terminal size={14} /> More algorithms in architecture phase. Check back soon.
                </p> 
            </div>

        </main>
    );
}

