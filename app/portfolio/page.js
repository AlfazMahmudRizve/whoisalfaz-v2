import Image from 'next/image';
import Link from 'next/link';
import { MapPin, GraduationCap, Briefcase, ArrowRight, ExternalLink, Code2, Cpu, Globe, Database, Layout, BarChart3 } from 'lucide-react';

export const metadata = {
    title: "Portfolio | Alfaz Mahmud Rizve",
    description: "AI Automation, Business Growth, and Technical SEO.",
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
                                I bridge the gap between <strong>Complex Engineering</strong> and <strong>Business Strategy</strong>. Specialized in n8n automation, Next.js development, and Technical SEO.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors shadow-lg hover:shadow-white/20 transform hover:-translate-y-1">
                                Start a Project
                            </Link>
                            <Link href="https://drive.google.com/file/d/12FPvWTZKNO41NAHcHfPWUM3wNQC2MdjW/view" target="_blank" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-colors flex items-center gap-2">
                                View Resume
                            </Link>
                        </div>


                        {/* Unified Technical Stack Section */}
                        <div className="pt-8 border-t border-white/5 space-y-10">



                            {/* 2. Detailed Arsenal Grid */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Technical Arsenal</p>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

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

                                    {/* SEO & Analytics */}
                                    <div className="space-y-2">
                                        <h4 className="text-white font-bold text-sm bg-green-500/10 inline-block px-2 py-1 rounded border border-green-500/20">SEO & Analytics</h4>
                                        <ul className="text-xs text-slate-400 space-y-1">
                                            <li>Technical SEO, On-Page & Off-Page</li>
                                            <li>RankMath, Ahrefs, SEMrush</li>
                                            <li>Google Search Console</li>
                                            <li>Google Analytics (GA4)</li>
                                        </ul>
                                    </div>

                                    {/* Frameworks & CMS */}
                                    <div className="space-y-2">
                                        <h4 className="text-white font-bold text-sm bg-orange-500/10 inline-block px-2 py-1 rounded border border-orange-500/20">Frameworks & CMS</h4>
                                        <ul className="text-xs text-slate-400 space-y-1">
                                            <li>WordPress, WooCommerce</li>
                                            <li>Elementor</li>
                                        </ul>
                                    </div>

                                    {/* Marketing & Ads */}
                                    <div className="space-y-2">
                                        <h4 className="text-white font-bold text-sm bg-pink-500/10 inline-block px-2 py-1 rounded border border-pink-500/20">Marketing & Ops</h4>
                                        <ul className="text-xs text-slate-400 space-y-1">
                                            <li>Facebook Ads, Meta Suite</li>
                                            <li>Audience Segmentation</li>
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
                        {/* Project 1 */}
                        <div className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-purple-900/50 group-hover:to-blue-900/50 transition-colors relative flex items-center justify-center">
                                <Cpu size={48} className="text-slate-700 group-hover:text-white transition-colors opacity-50" />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Automation</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">n8n</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Lead Processing Engine</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    A fully automated system that scrapes, enriches, and qualifies leads before syncing them to HubSpot.
                                </p>
                                <span className="text-white text-sm font-bold border-b border-transparent group-hover:border-white transition-colors">View Details</span>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-blue-900/50 group-hover:to-cyan-900/50 transition-colors relative flex items-center justify-center">
                                <Globe size={48} className="text-slate-700 group-hover:text-white transition-colors opacity-50" />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Web Dev</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Next.js</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">SaaS Marketing Site</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    High-performance landing page with 99/100 Lighthouse score and integrated booking funnel.
                                </p>
                                <span className="text-white text-sm font-bold border-b border-transparent group-hover:border-white transition-colors">View Details</span>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/50 transition-colors cursor-pointer">
                            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-green-900/50 group-hover:to-emerald-900/50 transition-colors relative flex items-center justify-center">
                                <BarChart3 size={48} className="text-slate-700 group-hover:text-white transition-colors opacity-50" />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-2 mb-4">
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">SEO</span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 uppercase tracking-wider font-bold">Audit</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Technical SEO Audit</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Comprehensive audit and fix implementation that recovered a client's 40% traffic drop.
                                </p>
                                <span className="text-white text-sm font-bold border-b border-transparent group-hover:border-white transition-colors">View Details</span>
                            </div>
                        </div>
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
                            <h3 className="text-xl font-bold text-white mb-2">Automation & Web Consultant</h3>
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
                            <p className="text-slate-500 text-sm mb-4">Artist UD - Chattogram</p>
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
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to automate your workflow?</h2>
                        <p className="text-slate-400 max-w-xl mx-auto mb-8">Let's discuss how we can save you 20+ hours a week.</p>
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
