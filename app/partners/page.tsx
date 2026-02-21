import Link from 'next/link';
import PartnerLogos from '../../components/PartnerLogos';
import { ArrowRight, Terminal, Shield, Zap, Target, Cpu } from 'lucide-react';

export const metadata = {
    title: "Partnership Prospectus | Alfaz Mahmud Rizve",
    description: "Targeting Enterprise Growth via Technical Dependency. Official B2B SaaS Partner Prospectus.",
};

export default function PartnersPage() {
    return (
        <main className="min-h-screen selection:bg-white selection:text-black pb-32 pt-32 bg-[#0a0a0a]">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-5xl mx-auto px-6">

                {/* HERO SECTION */}
                <section className="mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        Partnership Prospectus
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tighter mb-8">
                        Targeting Enterprise Growth <br />
                        <span className="text-slate-500 text-3xl md:text-5xl">via Technical Dependency.</span>
                    </h1>

                    <div className="h-1 w-24 bg-white mb-12"></div>
                </section>

                {/* LOGO GRID SECTION (CRITICAL PLACEMENT) */}
                <section className="mb-32 py-12 border-y border-white/5">
                    <PartnerLogos
                        variant="stack"
                        title="Official Technology Partners"
                        subtitle="Production-grade integrations currently orchestrated for consulting clients and technical readers."
                    />
                </section>

                {/* 01. THE ARCHITECT & THE AUDIENCE */}
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
                                I do not build "content." I build <span className="text-white border-b border-white/20">Infrastructure.</span>
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

                {/* 03. THE CONVERSION MECHANISM */}
                <section className="mb-32">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <div className="flex items-center gap-3 text-white mb-8">
                                <span className="text-xl font-bold font-mono opacity-20">02</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">The Prerequisite <br />Injection Model</h2>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                I do not use banner ads or generic "Top 10" lists. My conversion strategy is **Mandatory Technical Integration.**
                            </p>
                            <div className="bg-white/5 p-6 border border-white/10 italic text-slate-400 text-xs">
                                "I don't recommend tools. I require them."
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

                {/* STACK & CRITERIA */}
                <section className="mb-32">
                    <div className="bg-white text-black p-12 md:p-16 flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-black uppercase leading-none mb-8">Current <br />Infrastructure <br />Stack</h2>
                            <p className="text-black/60 text-sm leading-relaxed max-w-sm">
                                I only partner with tools that meet the Architect's Standard. Robust APIs and webhook support are mandatory.
                            </p>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Automation</h4>
                                <ul className="text-sm font-medium space-y-1">
                                    <li>n8n.io</li>
                                    <li>Make.com</li>
                                    <li>Python/Node</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Data/CRM</h4>
                                <ul className="text-sm font-medium space-y-1">
                                    <li>HubSpot</li>
                                    <li>Supabase</li>
                                    <li>Pipedrive</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Headless</h4>
                                <ul className="text-sm font-medium space-y-1">
                                    <li>Strapi</li>
                                    <li>Contentful</li>
                                    <li>Sanity</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Infra</h4>
                                <ul className="text-sm font-medium space-y-1">
                                    <li>Vercel</li>
                                    <li>AWS</li>
                                    <li>DigitalOcean</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE CONSULTING MANDATE (CTA PREP) */}
                <section className="mb-32 max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-8 italic">The Consulting Mandate</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        Beyond the public repository, I operate a high-ticket consultancy for agencies. When I architect systems for private clients ($2,500+), I perform the **Manual Provisioning.**
                    </p>
                    <p className="text-slate-300 font-medium mb-12">
                        I choose the stack. I set up the accounts. I link the billing. Your tool is embedded into their core business operations from day zero.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="mailto:partners@whoisalfaz.me" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-tight hover:bg-slate-200 transition-colors flex items-center gap-2">
                            Approve Participation <ArrowRight size={18} />
                        </Link>
                        <Link href="/contact" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-tight hover:bg-white/5 transition-colors">
                            Schedule Integration Call
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}
