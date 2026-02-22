import Image from 'next/image';
import Link from 'next/link';
import { MapPin, GraduationCap, Briefcase, ArrowRight, ExternalLink, Code2, Cpu, Globe, Database, Layout, BarChart3 } from 'lucide-react';

export const metadata = {
    title: "Portfolio | Alfaz Mahmud Rizve",
    description: "I design business growth strategies and then architect the automated infrastructure to execute them.",
};

export default function Portfolio() {
    return (
        <main className="min-h-screen selection:bg-purple-500 selection:text-white pb-20 pt-32">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-6xl mx-auto px-6 space-y-32">

                {/* HERO SECTION */}
                <section className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            Open for new projects
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                                Building digital <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Growth Engines.</span>
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                                I bridge the gap between <strong>Complex Engineering</strong> and <strong>Business Strategy</strong>. Specialized in Headless Next.js, n8n Automation, and Custom Full-Stack Applications.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors shadow-lg hover:shadow-white/20 transform hover:-translate-y-1">
                                Start a Project
                            </Link>
                            <Link href="/services" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-colors flex items-center gap-2">
                                Explore Services
                            </Link>
                        </div>


                        {/* Unified Technical Stack Section */}
                        <div className="pt-8 border-t border-white/5 space-y-10">



                            {/* 2. Detailed Arsenal Grid */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Technical Arsenal</p>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                                    {/* Programming & Web */}
                                    <div className="space-y-2">
                                        <h4 className="text-white font-bold text-sm bg-blue-500/10 inline-block px-2 py-1 rounded border border-blue-500/20">Programming & Web</h4>
                                        <ul className="text-xs text-slate-400 space-y-1">
                                            <li>Next.js, Python, JavaScript, Node.js</li>
                                            <li>HTML5, CSS3, Tailwind CSS</li>
                                            <li>C/C++</li>
                                        </ul>
                                    </div>

                                    {/* Automation & Tools */}
                                    <div className="space-y-2">
                                        <h4 className="text-white font-bold text-sm bg-purple-500/10 inline-block px-2 py-1 rounded border border-purple-500/20">Automation & Tools</h4>
                                        <ul className="text-xs text-slate-400 space-y-1">
                                            <li>n8n, Zapier</li>
                                            <li>Git/GitHub, AWS (Basic)</li>
                                            <li>DigitalOcean</li>
                                        </ul>
                                    </div>

                                    {/* Database & Backend */}
                                    <div className="space-y-2">
                                        <h4 className="text-white font-bold text-sm bg-indigo-500/10 inline-block px-2 py-1 rounded border border-indigo-500/20">Database & Backend</h4>
                                        <ul className="text-xs text-slate-400 space-y-1">
                                            <li>PostgreSQL, Supabase</li>
                                            <li>REST APIs, Node.js</li>
                                            <li>Redis, Firebase</li>
                                        </ul>
                                    </div>

                                    {/* Growth Stack */}
                                    <div className="space-y-2">
                                        <h4 className="text-white font-bold text-sm bg-green-500/10 inline-block px-2 py-1 rounded border border-green-500/20">Growth Stack</h4>
                                        <ul className="text-xs text-slate-400 space-y-1">
                                            <li>Technical SEO, Google Analytics 4</li>
                                            <li>RankMath, Ahrefs, SEMrush</li>
                                            <li>Facebook Ads, Meta Suite</li>
                                            <li>Lead Scoring & Strategy</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full animate-pulse-slow"></div>

                        {/* Concentric Circles Visuals */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full opacity-50"></div>

                        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.2)] group">
                            <Image src="/profile.jpg" alt="Alfaz Mahmud" fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                        </div>
                    </div>
                </section>

                {/* PROJECTS GRID */}
                <section>
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Featured Work</h2>
                            <p className="text-slate-400">Selected automation and web projects.</p>
                        </div>
                        <Link href="/services" className="text-blue-400 text-sm hover:text-white transition-colors hidden md:block">View Services &rarr;</Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Project - Urban Harvest Cafe */}
                        <a href="https://urbancafe.whoisalfaz.me" target="_blank" rel="noopener noreferrer" className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-[#050505] group-hover:bg-amber-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/urban.png" alt="Urban Harvest Cafe Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[10px] uppercase tracking-wider font-bold">FoodTech</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Next.js</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Real-time</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Urban Harvest Cafe</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Modern, artisan food ordering application built for warmth and cravings. Features a seamless serving tray system, real-time kitchen logic, and a "fresh-first" design philosophy.
                                </p>
                                <span className="text-amber-400 text-sm font-bold border-b border-transparent group-hover:border-amber-400 transition-colors flex items-center gap-1">
                                    View Experience <ExternalLink size={12} />
                                </span>
                            </div>
                        </a>

                        {/* Project - Veloryc */}
                        <a href="https://veloryc.whoisalfaz.me" target="_blank" rel="noopener noreferrer" className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-[#050505] group-hover:bg-purple-950/30 transition-colors relative p-8 flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <Image src="/veloryc.png" alt="Veloryc Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[10px] uppercase tracking-wider font-bold">Next.js</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Supabase</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Pure CSS</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Veloryc</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Premium, high-performance e-commerce platform engineered for advanced skincare products. Features a real-time Supabase integration, sophisticated fluid UI, and a dedicated headless admin command center.
                                </p>
                                <span className="text-purple-400 text-sm font-bold border-b border-transparent group-hover:border-purple-400 transition-colors flex items-center gap-1">
                                    View Experience <ExternalLink size={12} />
                                </span>
                            </div>
                        </a>

                        {/* Project 0 - Spectre */}
                        <a href="https://spectre.whoisalfaz.me/" target="_blank" rel="noopener noreferrer" className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-[#050505] group-hover:bg-cyan-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/spectre-logo.png" alt="Spectre Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[10px] uppercase tracking-wider font-bold">R3F</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Next.js</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Canvas API</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Spectre</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Immersive Commerce Experience. Cinema-quality 3D product disassembly with custom 'Progressive Buffering' for instant TTI and locked 60FPS fluid scroll.
                                </p>
                                <span className="text-cyan-400 text-sm font-bold border-b border-transparent group-hover:border-cyan-400 transition-colors flex items-center gap-1">
                                    View Experience <ExternalLink size={12} />
                                </span>
                            </div>
                        </a>

                        {/* Project 1 - Removed Lead Processing Engine */}



                        {/* Project 3 - CashOps */}
                        <a href="https://cashops.whoisalfaz.me" target="_blank" rel="noopener noreferrer" className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-[#050505] group-hover:bg-emerald-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/cashops-logo.png" alt="CashOps Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] uppercase tracking-wider font-bold">Next.js</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">React Context</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Tailwind</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">CashOps.app</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    A developer-focused financial dashboard featuring real-time state management and zero-latency data visualization.
                                </p>
                                <span className="text-emerald-400 text-sm font-bold border-b border-transparent group-hover:border-emerald-400 transition-colors flex items-center gap-1">
                                    Live Beta <ExternalLink size={12} />
                                </span>
                            </div>
                        </a>

                        {/* Project 4 - CareerOps */}
                        <a href="https://careerops.whoisalfaz.me/" target="_blank" rel="noopener noreferrer" className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-[#050505] group-hover:bg-blue-950/30 transition-colors relative p-8">
                                <div className="relative w-full h-full">
                                    <Image src="/careerops-logo.png" alt="CareerOps Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[10px] uppercase tracking-wider font-bold">AI</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">n8n</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Next.js</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">CareerOps</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    The Stateless AI Career Strategist. Privacy-first resume optimization using local-first logic and n8n orchestration.
                                </p>
                                <span className="text-blue-400 text-sm font-bold border-b border-transparent group-hover:border-blue-400 transition-colors flex items-center gap-1">
                                    Make Resume <ExternalLink size={12} />
                                </span>
                            </div>
                        </a>
                    </div>
                </section>

                {/* EXPERIENCE TIMELINE */}
                <section className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl font-bold text-white mb-4 sticky top-32">Experience & <br />Timeline</h2>
                    </div>
                    <div className="lg:col-span-8 space-y-12 relative border-l border-white/10 pl-8 ml-4 md:ml-0">
                        {/* Item 1 */}
                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-blue-500 border-4 border-[#0a0a0a]"></span>
                            <span className="text-blue-400 text-sm font-mono mb-2 block">2023 - Present</span>
                            <h3 className="text-xl font-bold text-white mb-2">RevOps & Full-Stack Automation Architect</h3>
                            <p className="text-slate-500 text-sm mb-4">Freelance / WhoIsAlfaz</p>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                                Architecting end-to-end automation systems for agencies. Specialized in connecting CRMs (HubSpot, Pipedrive) with marketing channels using n8n and Make. Building rapid-scale WordPress and Next.js sites.
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-slate-700 border-4 border-[#0a0a0a]"></span>
                            <span className="text-slate-500 text-sm font-mono mb-2 block">2020 - Present</span>
                            <h3 className="text-xl font-bold text-white mb-2">Digital Operations Lead</h3>
                            <p className="text-slate-500 text-sm mb-4">Artica - Chattogram</p>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                                Managed digital presence and ad campaigns. Optimized content strategy and oversaw social media growth, resulting in consistent engagement increases.
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div className="relative">
                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-slate-700 border-4 border-[#0a0a0a]"></span>
                            <span className="text-slate-500 text-sm font-mono mb-2 block">2022 - 2026</span>
                            <h3 className="text-xl font-bold text-white mb-2">BSc Computer Science</h3>
                            <p className="text-slate-500 text-sm mb-4">International Islamic University Chittagong</p>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                                Focusing on Software Engineering, Database Systems, and Algorithms. Building strong foundational knowledge to back up practical automation skills.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl p-12 text-center border border-white/10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to scale your agency's infrastructure?</h2>
                        <p className="text-slate-400 max-w-xl mx-auto mb-8">Let's replace your legacy systems with high-speed Headless tech and autonomous workflows.</p>
                        <Link href="mailto:contact@whoisalfaz.me" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                            Get in Touch
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </section>

            </div>
        </main>
    );
}
