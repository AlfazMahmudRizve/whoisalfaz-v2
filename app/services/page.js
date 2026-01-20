
import AuditTool from '../../components/AuditTool';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Globe, BarChart3, Search, Video, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {

    const services = [
        {
            title: "n8n Automation Workflows",
            slug: "n8n-automation",
            desc: "Stop wasting time. We build custom n8n workflows that handle your leads, data entry, and CRM syncs automatically.",
            price: "300",
            icon: Zap,
            color: "emerald", // Green
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            text: "text-emerald-400",
            btn: "bg-emerald-500 hover:bg-emerald-400",
            cta: "Automate Your Workflows"
        },
        {
            title: "Headless CMS Architecture",
            slug: "headless-architecture",
            desc: "The best of both worlds: The easy editing of WordPress combined with the raw speed of Next.js.",
            price: "1,500",
            icon: Globe,
            color: "blue", // Blue
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            text: "text-blue-400",
            btn: "bg-blue-500 hover:bg-blue-400",
            cta: "Build My Headless System"
        },
        {
            title: "Strategy & Growth Consulting",
            slug: "growth-consulting",
            desc: "Not sure what to automate? We analyze your business processes and create a roadmap to cut costs and scale revenue.",
            price: "200/h",
            icon: BarChart3,
            color: "purple", // Purple
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            text: "text-purple-400",
            btn: "bg-purple-500 hover:bg-purple-400",
            cta: "Get My Growth Roadmap"
        },
        {
            title: "Technical SEO Audits",
            slug: "technical-seo",
            desc: "Deep dive analysis of your site's health. We find and fix the invisible technical errors killing your rankings.",
            price: "350",
            icon: Search,
            color: "orange", // Orange
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
            text: "text-orange-400",
            btn: "bg-orange-500 hover:bg-orange-400",
            cta: "Find My Ranking Errors"
        },
        {
            title: "UGC Product Videos",
            slug: "ugc-video-ads",
            desc: "Authentic, high-converting video content for your SaaS or product. Perfect for TikTok, Reels, and Ads.",
            price: "150",
            icon: Video,
            color: "red", // Red
            bg: "bg-red-500/10",
            border: "border-red-500/20",
            text: "text-red-400",
            btn: "bg-red-500 hover:bg-red-400",
            cta: "Order Viral UGC Ads"
        },
        {
            title: "Custom Prompt Design",
            slug: "custom-prompts",
            desc: "Get the most out of LLMs. We design complex prompt chains for ChatGPT/Claude to automate content creation.",
            price: "100",
            icon: MessageSquare,
            color: "violet", // Violet
            bg: "bg-violet-500/10",
            border: "border-violet-500/20",
            text: "text-violet-400",
            btn: "bg-violet-500 hover:bg-violet-400",
            cta: "Supercharge My AI Prompts"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 overflow-x-hidden">

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/10 via-[#0a0a0a] to-[#0a0a0a] -z-10" />


            {/* HERO: DONE FOR YOU AUTOMATIONS */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Technical Expertise Meets <span className="text-emerald-400">Creative Strategy</span>
                </h1>
                <p className="text-slate-400 text-lg mb-12">
                    Scaling your business with custom automation, high-performance web development, and data-driven marketing.
                </p>

                {/* Audit Tool Embed */}
                <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl relative shadow-2xl max-w-2xl mx-auto">
                    <h3 className="text-white font-bold mb-6">Receive Free Audit</h3>
                    <div className="audit-tool-wrapper">
                        <AuditTool />
                    </div>
                </div>
            </div>

            {/* ALERT SECTION */}
            <div className="max-w-4xl mx-auto mb-24">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-red-500/20 p-4 rounded-full text-red-400">
                        <BarChart3 size={32} />
                    </div>
                    <div>
                        <h3 className="text-red-400 font-bold text-lg mb-2">Want to eliminate the "Agency Grunt Work"?</h3>
                        <p className="text-red-200/70 text-sm leading-relaxed">
                            Most agencies waste 40+ hours/week on copy-paste tasks. Our automations eliminate this instantly.
                            If you are still doing it via spreadsheets, you are losing money every hour.
                        </p>
                    </div>
                </div>
            </div>

            {/* SERVICES GRID */}
            <section className="max-w-6xl mx-auto mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
                    <p className="text-slate-500 text-sm">Flexible solutions for every stage of growth.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className={`rounded-xl border ${s.border} ${s.bg} p-8 hover:-translate-y-1 transition-transform duration-300 flex flex-col backdrop-blur-sm`}>
                            <div className={`w-12 h-12 rounded-lg ${s.bg} border ${s.border} flex items-center justify-center ${s.text} mb-6`}>
                                <s.icon size={24} />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-4">{s.title}</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                                {s.desc}
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="text-xs text-slate-400 mb-4">Starting From <span className="text-white font-bold text-lg block">${s.price}</span></div>
                                <Link href={`/services/${s.slug}`} className={`w-full block py-3 text-center rounded-lg text-white font-bold text-sm transition-opacity hover:opacity-90 ${s.btn}`}>
                                    {s.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* GENERAL CONSULTATION */}
            <section className="bg-[#0f172a] border-y border-white/5 py-16 mb-32">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold text-white mb-4">Unsure What You Need?</h2>
                    <p className="text-slate-400 mb-8 text-lg">Let's discuss your unique challenges and define a custom path forward.</p>
                    <Link href="/contact" className="inline-block px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all">
                        Book a General Discovery Call
                    </Link>
                </div>
            </section>

            {/* BONUS PLAYBOOK */}
            <section className="max-w-5xl mx-auto mb-32">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-emerald-400">Bonus!!! Here's a free playbook for you to get started</h2>
                </div>
                <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-xl mb-4">Scale with automation</h3>
                        <p className="text-slate-400 text-sm mb-6">get 30+ ready-to-use n8n blueprints for agencies. Stop reinventing the wheel.</p>
                        <form className="space-y-4">
                            <input type="email" placeholder="Enter your email" className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500" />
                            <button className="w-full py-3 bg-[#8b5cf6] text-white font-bold rounded-lg hover:bg-[#7c3aed] transition-colors">
                                Send Me The Guide
                            </button>
                        </form>
                        <p className="text-xs text-slate-600 mt-4 text-center">No spam. Unsubscribe anytime.</p>
                    </div>
                    {/* Book visual placeholder */}
                    <div className="w-48 h-64 bg-black/50 border border-white/10 rounded-lg flex items-center justify-center relative shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-500">
                        <div className="text-center">
                            <Zap size={32} className="text-emerald-400 mx-auto mb-2" />
                            <span className="text-white font-bold text-xs uppercase tracking-widest">Playbook</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* PORTFOLIO PREVIEW */}
            <section className="max-w-4xl mx-auto mb-32 text-center">
                <span className="text-slate-500 text-xs uppercase tracking-widest mb-2 block">Our Work</span>
                <h2 className="text-3xl font-bold text-white mb-12">Explore Our Professional n8n Automation Projects</h2>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 hover:border-emerald-500/30 transition-colors cursor-pointer group">
                    <div className="w-24 h-24 relative rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                        <Image src="/icon.png" alt="Project" fill className="object-contain p-2" />
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-emerald-400 transition-colors">WhoIsAlfaz.me</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                            The exact site you are looking at. Built with Next.js 14, WordPress Headless CMS, and automated deployment pipelines via n8n.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-300 border border-white/5">Next.js</span>
                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-300 border border-white/5">Automation</span>
                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-300 border border-white/5">SEO</span>
                        </div>
                    </div>
                    <div>
                        <Link href="/portfolio" className="px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all whitespace-nowrap">
                            See Details
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <Link href="/portfolio" className="text-slate-400 text-sm hover:text-white transition-colors underline decoration-slate-700 underline-offset-4">
                        View Full Portfolio
                    </Link>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto mb-20">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        "How long does it take to build an automation?",
                        "Do you offer ongoing support?",
                        "Can you integrate with my specific CRM?",
                        "What is your refund policy?",
                        "Do I need to pay for n8n hosting?"
                    ].map((q, i) => (
                        <div key={i} className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden group">
                            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                                <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{q}</span>
                                <ChevronDown size={16} className="text-slate-500" />
                            </summary>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}
