import Link from 'next/link';
import Image from 'next/image';
import { Search, Calculator, Bot, ArrowRight, BarChart3 } from 'lucide-react';

export const metadata = {
    title: 'Free Tools & Resources | WhoIsAlfaz.me',
    description: 'Explore free automation tools, ROI calculators, and custom AI agents designed to help you streamline operations, eliminate manual work, and scale your agency or SaaS business.',
    alternates: {
        canonical: '/labs/',
    },
    openGraph: {
        title: 'Free Tools & Resources | WhoIsAlfaz.me',
        description: 'Explore free automation tools, ROI calculators, and custom AI agents designed to help you streamline operations, eliminate manual work, and scale your agency or SaaS business.',
        url: 'https://whoisalfaz.me/labs/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Tools & Resources | WhoIsAlfaz.me',
        description: 'Explore free automation tools, ROI calculators, and custom AI agents designed to help you streamline operations, eliminate manual work, and scale your agency or SaaS business.',
    }
};

export default function ToolsPage() {
    const tools = [
        {
            title: 'Agency Audit',
            desc: 'Get a comprehensive audit of your automation potential and hidden bottlenecks.',
            icon: Search,
            href: '/audit/',
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
            border: 'border-blue-100 dark:border-blue-500/20',
        },
        {
            title: 'ROI Calculator',
            desc: 'Calculate exactly how much money you can save by automating your manual tasks.',
            icon: Calculator,
            href: '/labs/roi/',
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            border: 'border-emerald-100 dark:border-emerald-500/20',
        },
        {
            title: 'CashOps',
            desc: 'Developer-focused financial dashboard with real-time telemetry and zero-latency data visualization.',
            icon: BarChart3,
            image: '/cashops-logo.png',
            href: 'https://cashops.whoisalfaz.me',
            color: 'text-teal-600 dark:text-green-400',
            bg: 'bg-slate-50 dark:bg-[#050505]',
            border: 'border-teal-100 dark:border-green-500/20',
        },
        {
            title: 'CareerOps',
            desc: 'Privacy-first resume optimization. AI-powered role matching without storing your data.',
            icon: Bot,
            image: '/careerops-logo.png',
            href: 'https://careerops.whoisalfaz.me',
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-slate-50 dark:bg-[#050505]',
            border: 'border-indigo-100 dark:border-indigo-500/20',
        },
        {
            title: 'Ask Alfaz AI',
            desc: 'Chat with our custom AI agent trained on n8n workflows and growth strategies.',
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
            <div className="max-w-4xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight transition-colors duration-300">
                    Automation <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600 dark:from-teal-400 dark:to-blue-500">Playground</span>
                </h1>
                <p className="text-lg font-medium text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
                    Free tools to calculate your ROI, audit your site, and test our custom AI agents.
                    Stop guessing and start optimizing.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
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
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {tool.title}
                        </h3>
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
            
            <div className="max-w-4xl mx-auto mt-16 text-center animate-in fade-in duration-1000 delay-1000 fill-mode-both">
               <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">More algorithms in architecture phase. Check back soon.</p> 
            </div>

        </main>
    );
}
