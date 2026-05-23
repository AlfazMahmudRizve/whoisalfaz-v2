import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import DefaultContentFooter from '../../components/footers/DefaultContentFooter';

export const metadata = {
    title: "Portfolio | Alfaz Mahmud Rizve",
    description: "I design business growth strategies and then architect the automated infrastructure to execute them.",
    alternates: {
        canonical: '/portfolio/',
    },
    openGraph: {
        title: "Portfolio | Alfaz Mahmud Rizve",
        description: "I design business growth strategies and then architect the automated infrastructure to execute them.",
        url: 'https://whoisalfaz.me/portfolio/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Portfolio | Alfaz Mahmud Rizve",
        description: "I design business growth strategies and then architect the automated infrastructure to execute them.",
    }
};

export default function Portfolio() {
    return (
        <main className="min-h-screen selection:bg-purple-500 selection:text-white pb-20 pt-32 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 overflow-hidden">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-slate-50 to-slate-50 dark:from-purple-900/20 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-6xl mx-auto px-6 space-y-32">

                {/* HERO SECTION */}
                <section className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-purple-500/10 border border-slate-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-widest shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            Open for new projects
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tight uppercase transition-colors duration-300">
                                Building digital <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">Growth Engines.</span>
                            </h1>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl transition-colors duration-300">
                                I bridge the gap between <strong>Complex Engineering</strong> and <strong>Business Strategy</strong>. Specialized in Headless Next.js, n8n Automation, and Custom Full-Stack Applications.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/contact/" className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-teal-600 dark:hover:bg-slate-200 transition-all shadow-xl hover:shadow-teal-500/20 dark:shadow-white/10 hover:-translate-y-1">
                                Start a Project
                            </Link>
                            <Link href="/services/" className="px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm rounded-full transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
                                Explore Services
                            </Link>
                        </div>


                    </div>

                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative animate-in fade-in zoom-in-95 duration-1000 delay-150 fill-mode-both">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 dark:from-blue-500/20 dark:to-purple-500/20 blur-3xl -z-10 rounded-full animate-pulse-slow"></div>

                        {/* Concentric Circles Visuals */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200 dark:border-white/5 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-200 dark:border-white/5 rounded-full opacity-50"></div>

                        <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-white dark:border-white/10 shadow-[0_0_50px_rgba(45,212,191,0.2)] dark:shadow-[0_0_50px_rgba(59,130,246,0.2)] group">
                            <Image src="/profile.jpg" alt="Alfaz Mahmud" fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                        </div>
                    </div>
                </section>

                {/* Unified Technical Stack Section (Full Width) */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both pt-16 mt-16 lg:mt-32">
                    <div>
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Technical Arsenal</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">The core stack powering digital growth engines.</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">

                            {/* Programming & Web */}
                            <div className="space-y-5 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 p-6 md:p-8 rounded-[2rem] shadow-xl dark:shadow-none hover:border-slate-300 dark:hover:border-white/10 transition-colors hover:-translate-y-1 hover:shadow-2xl duration-300 group">
                                <h4 className="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 inline-block px-4 py-2 rounded-full border border-blue-100 dark:border-blue-500/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">Programming</h4>
                                <ul className="text-[13px] font-bold text-slate-600 dark:text-slate-400 space-y-3 pl-1 leading-relaxed">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Next.js</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Python</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>JavaScript</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Node.js</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>HTML5 / CSS3</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Tailwind CSS</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>C / C++</li>
                                </ul>
                            </div>

                            {/* Automation & Tools */}
                            <div className="space-y-5 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 p-6 md:p-8 rounded-[2rem] shadow-xl dark:shadow-none hover:border-slate-300 dark:hover:border-white/10 transition-colors hover:-translate-y-1 hover:shadow-2xl duration-300 group" style={{ animationDelay: '150ms' }}>
                                <h4 className="text-purple-600 dark:text-purple-400 font-bold text-[10px] uppercase tracking-widest bg-purple-50 dark:bg-purple-500/10 inline-block px-4 py-2 rounded-full border border-purple-100 dark:border-purple-500/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">Automation</h4>
                                <ul className="text-[13px] font-bold text-slate-600 dark:text-slate-400 space-y-3 pl-1 leading-relaxed">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>n8n</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Zapier</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Git / GitHub</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>AWS (Basic)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>DigitalOcean</li>
                                </ul>
                            </div>

                            {/* Database & Backend */}
                            <div className="space-y-5 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 p-6 md:p-8 rounded-[2rem] shadow-xl dark:shadow-none hover:border-slate-300 dark:hover:border-white/10 transition-colors hover:-translate-y-1 hover:shadow-2xl duration-300 group" style={{ animationDelay: '300ms' }}>
                                <h4 className="text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 inline-block px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-500/20 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">Backend</h4>
                                <ul className="text-[13px] font-bold text-slate-600 dark:text-slate-400 space-y-3 pl-1 leading-relaxed">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>PostgreSQL</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Supabase</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>REST APIs</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Node.js</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Redis</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Firebase</li>
                                </ul>
                            </div>

                            {/* Growth Stack */}
                            <div className="space-y-5 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 p-6 md:p-8 rounded-[2rem] shadow-xl dark:shadow-none hover:border-slate-300 dark:hover:border-white/10 transition-colors hover:-translate-y-1 hover:shadow-2xl duration-300 group" style={{ animationDelay: '450ms' }}>
                                <h4 className="text-teal-600 dark:text-teal-400 font-bold text-[10px] uppercase tracking-widest bg-teal-50 dark:bg-green-500/10 inline-block px-4 py-2 rounded-full border border-teal-100 dark:border-green-500/20 group-hover:bg-teal-100 dark:group-hover:bg-green-500/20 transition-colors">Growth</h4>
                                <ul className="text-[13px] font-bold text-slate-600 dark:text-slate-400 space-y-3 pl-1 leading-relaxed">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Technical SEO</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>GA4</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>RankMath</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Ahrefs / SEMrush</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Meta Suite Ads</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>Lead Strategy</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>

                {/* PROJECTS GRID */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Featured Work</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Selected automation and web projects.</p>
                        </div>
                        <Link href="/services/" className="text-teal-600 dark:text-blue-400 font-bold text-sm hover:text-teal-700 dark:hover:text-white transition-colors hidden md:block uppercase tracking-wider">View Services &rarr;</Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Project - Urban Harvest Cafe */}
                        <a href="https://urbancafe.whoisalfaz.me" target="_blank" rel="noopener noreferrer" style={{ animationDelay: '0ms' }} className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both group bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden hover:border-amber-500/50 shadow-xl hover:shadow-2xl dark:shadow-none transition-all cursor-pointer">
                            <div className="h-48 bg-slate-50 dark:bg-[#050505] border-b border-slate-100 dark:border-white/5 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/urban.png" alt="Urban Harvest Cafe Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 rounded-full text-[10px] uppercase tracking-widest font-black shadow-sm dark:shadow-none">FoodTech</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Next.js</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Real-time</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Urban Harvest Cafe</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                                    Modern, artisan food ordering application built for warmth and cravings. Features a seamless serving tray system, real-time kitchen logic, and a &quot;fresh-first&quot; design philosophy.
                                </p>
                                <span className="text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest border-b border-transparent group-hover:border-amber-600 dark:group-hover:border-amber-400 transition-colors flex items-center gap-2 w-max">
                                    View Experience <ExternalLink size={14} />
                                </span>
                            </div>
                        </a>

                        {/* Project - Veloryc */}
                        <Link href="/blog/case-study-veloryc-premium-ecommerce/" style={{ animationDelay: '150ms' }} className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both group bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden hover:border-purple-500/50 shadow-xl hover:shadow-2xl dark:shadow-none transition-all cursor-pointer">
                            <div className="h-48 bg-slate-50 dark:bg-[#050505] border-b border-slate-100 dark:border-white/5 group-hover:bg-purple-50 dark:group-hover:bg-purple-950/30 transition-colors relative p-8 flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <Image src="/veloryc.png" alt="Veloryc Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 rounded-full text-[10px] uppercase tracking-widest font-black shadow-sm dark:shadow-none">Next.js</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Supabase</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Pure CSS</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Veloryc</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                                    Premium, high-performance e-commerce platform engineered for advanced skincare products. Features a real-time Supabase integration, sophisticated fluid UI, and a dedicated headless admin command center.
                                </p>
                                <span className="text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-widest border-b border-transparent group-hover:border-purple-600 dark:group-hover:border-purple-400 transition-colors flex items-center gap-2 w-max">
                                    View Experience <ExternalLink size={14} />
                                </span>
                            </div>
                        </Link>

                        {/* Project - Spectre */}
                        <a href="https://spectre.whoisalfaz.me/" target="_blank" rel="noopener noreferrer" style={{ animationDelay: '300ms' }} className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both group bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden hover:border-cyan-500/50 shadow-xl hover:shadow-2xl dark:shadow-none transition-all cursor-pointer">
                            <div className="h-48 bg-slate-50 dark:bg-[#050505] border-b border-slate-100 dark:border-white/5 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/spectre-logo.png" alt="Spectre Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 rounded-full text-[10px] uppercase tracking-widest font-black shadow-sm dark:shadow-none">R3F</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Next.js</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Canvas API</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Spectre</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                                    Immersive Commerce Experience. Cinema-quality 3D product disassembly with custom &apos;Progressive Buffering&apos; for instant TTI and locked 60FPS fluid scroll.
                                </p>
                                <span className="text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-widest border-b border-transparent group-hover:border-cyan-600 dark:group-hover:border-cyan-400 transition-colors flex items-center gap-2 w-max">
                                    View Experience <ExternalLink size={14} />
                                </span>
                            </div>
                        </a>

                        {/* Project 3 - CashOps */}
                        <a href="https://cashops.whoisalfaz.me" target="_blank" rel="noopener noreferrer" style={{ animationDelay: '450ms' }} className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both group bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden hover:border-emerald-500/50 shadow-xl hover:shadow-2xl dark:shadow-none transition-all cursor-pointer">
                            <div className="h-48 bg-slate-50 dark:bg-[#050505] border-b border-slate-100 dark:border-white/5 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/cashops-logo.png" alt="CashOps Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-[10px] uppercase tracking-widest font-black shadow-sm dark:shadow-none">Next.js</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">React Context</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Tailwind</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">CashOps.app</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                                    A developer-focused financial dashboard featuring real-time state management and zero-latency data visualization.
                                </p>
                                <span className="text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest border-b border-transparent group-hover:border-emerald-600 dark:group-hover:border-emerald-400 transition-colors flex items-center gap-2 w-max">
                                    Live Beta <ExternalLink size={14} />
                                </span>
                            </div>
                        </a>

                        {/* Project 4 - CareerOps */}
                        <a href="https://careerops.whoisalfaz.me/" target="_blank" rel="noopener noreferrer" style={{ animationDelay: '600ms' }} className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both group bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden hover:border-blue-500/50 shadow-xl hover:shadow-2xl dark:shadow-none transition-all cursor-pointer">
                            <div className="h-48 bg-slate-50 dark:bg-[#050505] border-b border-slate-100 dark:border-white/5 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/careerops-logo.png" alt="CareerOps Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 rounded-full text-[10px] uppercase tracking-widest font-black shadow-sm dark:shadow-none">AI</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">n8n</span>
                                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Next.js</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">CareerOps</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                                    The Stateless AI Career Strategist. Privacy-first resume optimization using local-first logic and n8n orchestration.
                                </p>
                                <span className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border-b border-transparent group-hover:border-blue-600 dark:group-hover:border-blue-400 transition-colors flex items-center gap-2 w-max">
                                    Make Resume <ExternalLink size={14} />
                                </span>
                            </div>
                        </a>
                    </div>
                </section>

                {/* EXPERIENCE TIMELINE */}
                <section className="grid lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight sticky top-32">Experience & <br />Timeline</h2>
                    </div>
                    <div className="lg:col-span-8 space-y-12 relative border-l-2 border-slate-200 dark:border-white/10 pl-8 ml-4 md:ml-0">
                        {/* Item 1 */}
                        <div className="relative">
                            <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full bg-teal-500 border-4 border-slate-50 dark:border-[#0a0a0a]"></span>
                            <span className="text-teal-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-2 block">2023 - Present</span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">RevOps & Full-Stack Automation Architect</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Freelance / WhoIsAlfaz</p>
                            <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed max-w-2xl bg-white dark:bg-[#111] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                Architecting end-to-end automation systems for agencies. Specialized in connecting CRMs (HubSpot, Pipedrive) with marketing channels using n8n and Make. Migrating clients off legacy CMS platforms to high-performance Next.js stacks.
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="relative">
                            <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full bg-slate-400 dark:bg-slate-700 border-4 border-slate-50 dark:border-[#0a0a0a]"></span>
                            <span className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2 block">2020 - Present</span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Digital Operations Lead</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Artica - Chattogram</p>
                            <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed max-w-2xl bg-white dark:bg-[#111] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                Managed digital presence and ad campaigns. Optimized content strategy and oversaw social media growth, resulting in consistent engagement increases.
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div className="relative">
                            <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full bg-slate-400 dark:bg-slate-700 border-4 border-slate-50 dark:border-[#0a0a0a]"></span>
                            <span className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2 block">2022 - 2026</span>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">BSc Computer Science</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">IIUC, BANGLADESH</p>
                            <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed max-w-2xl bg-white dark:bg-[#111] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                Focusing on Software Engineering, Database Systems, and Algorithms. Building strong foundational knowledge to back up practical automation skills.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gradient-to-r from-teal-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-[3rem] p-16 text-center border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-2xl dark:shadow-none animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight max-w-2xl mx-auto leading-tight">Ready to scale your agency&apos;s infrastructure?</h2>
                        <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto mb-10 text-lg">Let&apos;s replace your legacy systems with high-speed Headless tech and autonomous workflows.</p>
                        <Link href="mailto:contact@whoisalfaz.me" className="inline-block bg-slate-900 text-white dark:bg-white dark:text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-teal-600 dark:hover:bg-slate-200 transition-all shadow-xl hover:-translate-y-1">
                            Get in Touch
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 dark:bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </section>

                {/* SEO CONTENT FOOTER */}
                <DefaultContentFooter />

            </div>
        </main>
    );
}
