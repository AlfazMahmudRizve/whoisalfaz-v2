
import Link from 'next/link';
import { Search, Calculator, Bot, ArrowRight, BarChart3 } from 'lucide-react';

export const metadata = {
    title: 'Free Tools & Resources | WhoIsAlfaz.me',
    description: 'Free automation tools, ROI calculators, and AI agents to help you scale your agency or SaaS.',
};

export default function ToolsPage() {
    const tools = [
        {
            title: 'Agency Audit',
            desc: 'Get a comprehensive audit of your automation potential and hidden bottlenecks.',
            icon: Search,
            href: '/audit',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
        },
        {
            title: 'ROI Calculator',
            desc: 'Calculate exactly how much money you can save by automating your manual tasks.',
            icon: Calculator,
            href: '/labs/roi',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
        },
        {
            title: 'CashOps.app',
            desc: 'Developer-focused financial dashboard with real-time telemetry and zero-latency visualization.',
            icon: BarChart3,
            href: 'https://cashops.whoisalfaz.me',
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
        },
        {
            title: 'Ask Alfaz AI',
            desc: 'Chat with our custom AI agent trained on n8n workflows and growth strategies.',
            icon: Bot,
            href: '/labs/chat',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
        },
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] selection:bg-teal-500/30 selection:text-white relative overflow-hidden">

            {/* Background Gradients */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a] -z-10" />
            <div className="fixed top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-pulse" />

            {/* Hero Header */}
            <div className="max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                    Automation <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Playground</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Free tools to calculate your ROI, audit your site, and test our custom AI agents.
                    Stop guessing and start optimizing.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {tools.map((tool, i) => (
                    <Link
                        key={i}
                        href={tool.href}
                        className={`
              group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm
              hover:border-opacity-50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1
              flex flex-col
            `}
                    >
                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-${tool.color.split('-')[1]}-500/50`} />

                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-2xl ${tool.bg} ${tool.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <tool.icon size={28} className={tool.color} />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-50 group-hover:tracking-wide transition-all">
                            {tool.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                            {tool.desc}
                        </p>

                        {/* CTA */}
                        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${tool.color} opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all`}>
                            <span>Try Tool</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>

        </main>
    );
}
