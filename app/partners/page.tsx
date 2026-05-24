import PartnerLogos from '../../components/PartnerLogos';
import PlacementRequestForm from '../../components/PlacementRequestForm';
import { ArrowDown, Globe, Link2, ShieldAlert, FileCode } from 'lucide-react';

export const metadata = {
    title: "Sponsorships & B2B Content Placements | whoisalfaz.me",
    description: "High-authority contextual link integrations and sponsored API tear-downs for B2B SaaS, DevTools, and RevOps platforms. Strict niche filter. 24h turnaround.",
    openGraph: {
        title: "Technical Partnerships & B2B Architecture Placements",
        description: "High-authority contextual link integrations and sponsored API tear-downs for B2B SaaS, DevTools, and RevOps platforms.",
        url: "https://whoisalfaz.me/partners/",
    },
    alternates: { canonical: "https://whoisalfaz.me/partners/" },
};

export default function PartnersPage() {
    return (
        <main className="min-h-screen selection:bg-white selection:text-black pb-32 pt-32 bg-[#0a0a0a]">
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-6xl mx-auto px-6">

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 1: HERO                            */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-20 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                        Accepting Placements
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-6">
                        Technical Partnerships{' '}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                            & B2B Architecture Placements
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10">
                        I partner exclusively with B2B SaaS, DevTools, and RevOps platforms to deliver high-authority content, API tear-downs, and seamless architectural link integrations.
                    </p>

                    <a
                        href="#placement-form"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1"
                    >
                        Submit a Placement Request
                        <ArrowDown size={18} className="animate-bounce" />
                    </a>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 2: BENTO GRID                      */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Card 1: The Infrastructure (Wide — spans 2 cols) */}
                        <div className="md:col-span-2 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/[0.06] transition-all group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                                    <Globe size={20} className="text-teal-400" />
                                </div>
                                <h3 className="text-white font-black uppercase tracking-tight">The Infrastructure</h3>
                            </div>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                A Next.js-powered technical hub strictly focused on workflow automation, system architecture, and RevOps engineering. Zero fluff. Pure technical execution.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['40+ Technical Articles', '105 Indexed Pages', 'US/UK/EU/AU Audience', 'B2B Decision Makers'].map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 border border-white/10 font-mono uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card 2: Contextual Link Integration (Square) */}
                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/[0.06] transition-all group relative overflow-hidden">
                            <div className="absolute top-4 right-4 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-black text-teal-400 uppercase tracking-wider">
                                $80 — $150
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <Link2 size={20} className="text-purple-400" />
                                </div>
                                <h3 className="text-white font-black uppercase tracking-tight text-sm">Contextual Link Integration</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Seamless, highly relevant backlink placements within aging, high-authority technical content. Permanently embedded into the server architecture. 24-hour turnaround.
                            </p>
                        </div>

                        {/* Card 3: The Strict Filter (Square) */}
                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/[0.06] transition-all group relative overflow-hidden">
                            <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-black text-red-400 uppercase tracking-wider">
                                Zero Tolerance
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <ShieldAlert size={20} className="text-red-400" />
                                </div>
                                <h3 className="text-white font-black uppercase tracking-tight text-sm">The Strict Filter</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                To protect domain authority, I operate a zero-tolerance policy for low-tier niches. No Casino. No Crypto. No CBD. No Generic AI Wrappers. <span className="text-white font-bold">B2B Tech and SaaS only.</span>
                            </p>
                        </div>

                        {/* Card 4: Sponsored API Tear-Downs (Wide — spans 2 cols) */}
                        <div className="md:col-span-2 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/[0.06] transition-all group">
                            <div className="absolute top-4 right-4 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-black text-teal-400 uppercase tracking-wider hidden md:block">
                                $300 — $500
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                                    <FileCode size={20} className="text-teal-400" />
                                </div>
                                <h3 className="text-white font-black uppercase tracking-tight">Sponsored API & Tool Tear-Downs</h3>
                                <span className="md:hidden px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-black text-teal-400 uppercase tracking-wider">$300 — $500</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                Dedicated, original deep-dives into your software. I will build a custom workflow or application utilizing your tool, complete with code snippets, architecture diagrams, and high-fidelity screenshots.
                            </p>
                        </div>

                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 3: PLACEMENT REQUEST FORM           */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-32 max-w-3xl mx-auto">
                    <PlacementRequestForm />
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 4: EXISTING CONTENT (Authority)     */}
                {/* ═══════════════════════════════════════════ */}
                <div className="border-t border-white/5 pt-24">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Why This Platform Converts</span>
                    </div>

                    {/* Logo Grid */}
                    <section className="mb-32 py-12 border-y border-white/5">
                        <PartnerLogos title="Official Technology Partners" />
                    </section>

                    {/* The Architect & The Audience */}
                    <section className="grid md:grid-cols-2 gap-16 mb-32 items-start">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-white">
                                <span className="text-xl font-bold font-mono opacity-20">01</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">The Architect & The Audience</h2>
                            </div>
                            <div className="p-8 border-l-2 border-white/10 bg-white/[0.02]">
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    <strong>Alfaz Mahmud Rizve</strong><br />
                                    <span className="text-xs uppercase tracking-widest text-slate-500">RevOps & Full-Stack Automation Architect</span>
                                </p>
                                <p className="text-slate-300 font-medium text-lg leading-relaxed">
                                    I do not build &quot;content.&quot; I build <span className="text-white border-b border-white/20">Infrastructure.</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 pt-6 md:pt-14">
                            <p className="text-slate-400 leading-relaxed">
                                My audience consists of high-intent technical decision-makers:
                            </p>
                            <div className="space-y-4">
                                {[
                                    { t: "Agency Owners", d: "Performance & Creative firms scaling delivery via headless stacks." },
                                    { t: "SaaS Founders", d: "Seed to Series B founders automating lead-to-renewal lifecycles." },
                                    { t: "Technical Implementers", d: "Professionals executing the exact workflows I architect." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1.5 w-1 h-1 rounded-full bg-white shrink-0" />
                                        <p className="text-slate-300 text-sm">
                                            <strong className="text-white">{item.t}:</strong> {item.d}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-white/5">
                                <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-4">Firmographics</div>
                                <div className="flex flex-wrap gap-4">
                                    <span className="px-3 py-1 bg-white/5 rounded text-[10px] text-slate-400 border border-white/10">US/UK/EU/AU</span>
                                    <span className="px-3 py-1 bg-white/5 rounded text-[10px] text-slate-400 border border-white/10">LTV $15K - $50K</span>
                                    <span className="px-3 py-1 bg-white/5 rounded text-[10px] text-slate-400 border border-white/10">Infrastructure Dependent</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* The Prerequisite Injection Model */}
                    <section className="mb-32">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/3">
                                <div className="flex items-center gap-3 text-white mb-8">
                                    <span className="text-xl font-bold font-mono opacity-20">02</span>
                                    <h2 className="text-2xl font-bold uppercase tracking-tight">The Prerequisite <br />Injection Model</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                    I do not use banner ads or generic &quot;Top 10&quot; lists. My conversion strategy is **Mandatory Technical Integration.**
                                </p>
                                <div className="bg-white/5 p-6 border border-white/10 italic text-slate-400 text-xs">
                                    &quot;I don&apos;t recommend tools. I require them.&quot;
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                {[
                                    { n: "01", t: "Tutorial/Build", d: "I publish production-grade automation recipes (e.g., 'Autonomous Lead Scoring with AI & Vector Databases')." },
                                    { n: "02", t: "Prerequisite Step", d: "To execute the build, the reader must have access to specific API keys or integration environments." },
                                    { n: "03", t: "Account Creation", d: "Your SaaS is injected as the only supported prerequisite. Readers create accounts via tracking links to sync with the provided code schema." },
                                    { n: "04", t: "Retention", d: "Users do not 'trial'; they implement. Your tool becomes the engine of their revenue system, making it functionally impossible to churn." }
                                ].map((step, i) => (
                                    <div key={i} className="group relative p-8 bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors">
                                        <span className="absolute top-8 right-8 text-3xl font-mono text-white/5 group-hover:text-white/10 transition-colors uppercase italic">{step.n}</span>
                                        <h3 className="text-white font-bold mb-2 uppercase tracking-tight">{step.t}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">{step.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Stack & Criteria */}
                    <section className="mb-32">
                        <div className="bg-white text-black p-12 md:p-16 flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/2">
                                <h2 className="text-4xl font-black uppercase leading-none mb-8">Current <br />Infrastructure <br />Stack</h2>
                                <p className="text-black/60 text-sm leading-relaxed max-w-sm">
                                    I only partner with tools that meet the Architect&apos;s Standard. Robust APIs and webhook support are mandatory.
                                </p>
                            </div>
                            <div className="md:w-1/2 grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Automation</h4>
                                    <ul className="text-sm font-medium space-y-1"><li>n8n.io</li><li>Make.com</li><li>Python/Node</li></ul>
                                </div>
                                <div>
                                    <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Data/CRM</h4>
                                    <ul className="text-sm font-medium space-y-1"><li>HubSpot</li><li>Supabase</li><li>Pipedrive</li></ul>
                                </div>
                                <div>
                                    <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Headless</h4>
                                    <ul className="text-sm font-medium space-y-1"><li>Strapi</li><li>Contentful</li><li>Sanity</li></ul>
                                </div>
                                <div>
                                    <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Infra</h4>
                                    <ul className="text-sm font-medium space-y-1"><li>Vercel</li><li>AWS</li><li>DigitalOcean</li></ul>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
