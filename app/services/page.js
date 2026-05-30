import AuditTool from '../../components/AuditTool';
import DefaultContentFooter from '../../components/footers/DefaultContentFooter';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Globe, BarChart3, Search, ChevronDown, Code2 } from 'lucide-react';
import NewsletterForm from '../../components/NewsletterForm';
import PartnerLogos from '../../components/PartnerLogos';

export const metadata = {
    title: "Revenue Automation & Technical Solutions | Alfaz Mahmud Rizve",
    description: "Eliminate manual bottlenecks with autonomous n8n workflows, bespoke full-stack applications, and high-performance headless infrastructure.",
    alternates: {
        canonical: '/services/',
    },
    openGraph: {
        title: "Revenue Automation & Technical Solutions | Alfaz Mahmud Rizve",
        description: "Eliminate manual bottlenecks with autonomous n8n workflows, bespoke full-stack applications, and high-performance headless infrastructure.",
        url: 'https://whoisalfaz.me/services/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Revenue Automation & Technical Solutions | Alfaz Mahmud Rizve",
        description: "Eliminate manual bottlenecks with autonomous n8n workflows, bespoke full-stack applications, and high-performance headless infrastructure.",
    }
};

export default function ServicesPage() {

    const services = [
        {
            title: "Custom Workflow Automation",
            slug: "n8n-automation",
            desc: "Replace your manual data entry with autonomous agents. We build self-healing workflows that instantly qualify leads and sync your CRM, saving your team 20+ hours a week.",
            price: "750",
            icon: Zap,
            cardClass: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
            iconClass: "border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
            borderClass: "border-emerald-100 dark:border-emerald-500/20",
            priceClass: "text-emerald-600",
            btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400",
            cta: "Automate Your Workflows"
        },
        {
            title: "Custom Full-Stack Applications",
            slug: "custom-full-stack",
            desc: "When off-the-shelf software falls short, I build the exact tool you need. As a Full-Stack Architect, I develop custom web applications, bespoke internal agency portals, and secure client dashboards from the ground up.",
            price: "2,500",
            icon: Code2,
            cardClass: "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
            iconClass: "border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400",
            borderClass: "border-rose-100 dark:border-rose-500/20",
            priceClass: "text-rose-600",
            btnClass: "bg-rose-600 hover:bg-rose-700 text-white dark:bg-rose-500 dark:hover:bg-rose-400",
            cta: "Build My Custom App"
        },
        {
            title: "Headless CMS Infrastructure",
            slug: "headless-architecture",
            desc: "The high-performance foundation your revenue engine runs on. Sub-second load times, perfect Core Web Vitals, and full content editing for your marketing team.",
            price: "1,500",
            icon: Globe,
            cardClass: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
            iconClass: "border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400",
            borderClass: "border-blue-100 dark:border-blue-500/20",
            priceClass: "text-blue-600",
            btnClass: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-400",
            cta: "Build My Headless System"
        },
        {
            title: "Technical SEO Audits",
            slug: "technical-seo",
            desc: "Deep dive analysis of your site's health. We find and fix the invisible technical errors killing your rankings.",
            price: "350",
            icon: Search,
            cardClass: "bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20",
            iconClass: "border-orange-100 dark:border-orange-500/20 text-orange-600 dark:text-orange-400",
            borderClass: "border-orange-100 dark:border-orange-500/20",
            priceClass: "text-orange-600",
            btnClass: "bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-400",
            cta: "Find My Ranking Errors"
        },
        {
            title: "Strategy & Growth Consulting",
            slug: "growth-consulting",
            desc: "Not sure what to automate? We analyze your business processes and create a roadmap to cut costs and scale revenue.",
            price: "200/h",
            icon: BarChart3,
            cardClass: "bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20",
            iconClass: "border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400",
            borderClass: "border-purple-100 dark:border-purple-500/20",
            priceClass: "text-purple-600",
            btnClass: "bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-400",
            cta: "Get My Growth Roadmap"
        }
    ];

    const jsonLd = [
        ...services.map(s => ({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": s.title,
            "provider": {
                "@type": "Person",
                "name": "Alfaz Mahmud Rizve"
            },
            "description": s.desc,
            "offers": {
                "@type": "Offer",
                "price": s.price.replace('/h', '').replace(',', ''),
                "priceCurrency": "USD"
            }
        })),
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "How long does it take to build an automation?", "acceptedAnswer": { "@type": "Answer", "text": "Simple workflows (e.g., lead sync) take 2-3 days. Complex agency operating systems can take 2-4 weeks. We always start with a discovery call to give you an exact timeline." } },
                { "@type": "Question", "name": "Do you offer ongoing support?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All projects come with 30 days of free monitoring. After that, we offer monthly maintenance packages to ensure your automations run smoothly as platforms update their APIs." } },
                { "@type": "Question", "name": "Can you integrate with my specific CRM?", "acceptedAnswer": { "@type": "Answer", "text": "Almost certainly. If it has an API, we can connect to it. We specialize in HubSpot, Airtable, Pipedrive, and GoHighLevel, but custom integrations are our bread and butter." } },
                { "@type": "Question", "name": "What is your refund policy?", "acceptedAnswer": { "@type": "Answer", "text": "We work on a milestone basis. If we cannot deliver the agreed-upon scope, you don't pay for that milestone. We prioritize transparent communication to ensure you're always happy with the output." } },
                { "@type": "Question", "name": "Do I need to pay for n8n hosting?", "acceptedAnswer": { "@type": "Answer", "text": "You have two options: Cloud (approx $20/mo) or Self-Hosted (approx $5-10/mo on a VPS). We can set up either for you, but we usually recommend self-hosting for maximum data privacy and lower costs at scale." } },
                { "@type": "Question", "name": "How do AI automation agencies price their services?", "acceptedAnswer": { "@type": "Answer", "text": "Most AI automation agencies charge via a monthly retainer model (ranging from $1,500 to $5,000/month) or a productized service package for specific custom workflows." } }
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 overflow-x-hidden bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-green-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />


            {/* HERO: DONE FOR YOU AUTOMATIONS */}
            <div className="max-w-4xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
                    Revenue Operations That <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400 dark:from-emerald-400 dark:to-teal-300">Run On Autopilot</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                    Autonomous workflows, bespoke applications, and the high-performance infrastructure to scale without adding headcount.
                </p>

                {/* Audit Tool Embed */}
                <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[3rem] shadow-2xl dark:shadow-2xl max-w-6xl mx-auto relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-400 dark:from-emerald-600 dark:via-blue-500 dark:to-purple-500"></div>
                    <h3 className="text-slate-900 dark:text-white font-black text-lg sm:text-xl mb-6 sm:mb-8 uppercase tracking-tight">Receive Free Audit</h3>
                    <div className="audit-tool-wrapper">
                        <AuditTool />
                    </div>
                </div>
            </div>

            {/* ALERT SECTION */}
            <div className="max-w-4xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 shadow-md dark:shadow-none rounded-[2rem] p-8 text-center md:text-left flex flex-col md:flex-row items-center gap-6 transition-colors duration-300">
                    <div className="bg-red-100 dark:bg-red-500/20 p-4 rounded-full text-red-600 dark:text-red-400 shrink-0 shadow-inner dark:shadow-none">
                        <BarChart3 size={32} />
                    </div>
                    <div>
                        <h3 className="text-red-700 dark:text-red-400 font-black text-xl mb-2 uppercase tracking-tight">Want to eliminate the &quot;Agency Grunt Work&quot;?</h3>
                        <p className="text-red-600 dark:text-red-200/70 text-sm md:text-[15px] font-medium leading-relaxed">
                            Most agencies waste 40+ hours/week on copy-paste tasks. Our automations eliminate this instantly.
                            If you are still doing it via spreadsheets, you are losing money every hour.
                        </p>
                    </div>
                </div>
            </div>

            {/* SERVICES GRID */}
            <section className="max-w-6xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Our Services</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Flexible solutions for every stage of growth.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <div key={i} style={{ animationDelay: `${i * 150}ms` }} className={`animate-in fade-in zoom-in-[0.95] slide-in-from-bottom-4 duration-700 fill-mode-both rounded-2xl border ${s.cardClass} p-7 hover:-translate-y-2 transition-all duration-300 flex flex-col backdrop-blur-sm shadow-lg dark:shadow-sm`}>
                            <div className={`w-12 h-12 rounded-xl bg-white dark:bg-black/20 border ${s.iconClass} flex items-center justify-center mb-5 shadow-sm dark:shadow-none`}>
                                <s.icon size={22} />
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-black text-lg mb-3 uppercase tracking-tight">{s.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed mb-6 flex-grow">
                                {s.desc}
                            </p>

                            <div className={`mt-auto pt-6 border-t ${s.borderClass}`}>
                                <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Starting From <span className={`font-black text-xl block mt-1 ${s.priceClass} dark:text-white`}>${s.price}</span></div>
                                <Link href={`/services/${s.slug}`} className={`w-full block py-3 text-center rounded-lg font-black uppercase tracking-widest text-xs transition-transform hover:-translate-y-1 shadow-md dark:shadow-sm ${s.btnClass}`}>
                                    {s.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* GENERAL CONSULTATION */}
            <section className="bg-white dark:bg-[#0f172a] border-y border-slate-200 dark:border-white/5 py-24 mb-32 transition-colors duration-300 animate-in fade-in duration-1000 delay-500 fill-mode-both">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Unsure What You Need?</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg md:text-xl max-w-2xl mx-auto font-medium">Let&apos;s discuss your unique challenges and define a custom path forward.</p>
                    <Link href="/contact/" className="inline-block px-10 py-5 border-2 border-slate-900 dark:border-white/20 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all mb-24 shadow-sm hover:shadow-xl">
                        Book a Discovery Call
                    </Link>

                    {/* Consulting Stack Social Proof */}
                    <div className="pt-16 border-t border-slate-200 dark:border-white/5">
                        <PartnerLogos
                            title="Supported Infrastructure"
                            subtitle="The enterprise stack I orchestrate for high-ticket consulting builds."
                        />
                    </div>
                </div>
            </section>

            {/* BONUS PLAYBOOK */}
            <section className="max-w-5xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-black text-teal-600 dark:text-emerald-400 uppercase tracking-widest leading-relaxed px-4">Bonus!!! Here&apos;s a free playbook to get started</h2>
                </div>
                <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-10 md:p-14 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto shadow-2xl transition-colors duration-300">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-slate-900 dark:text-white font-black text-3xl mb-4 uppercase tracking-tight">Scale with automation</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium mb-8 leading-relaxed">Get 30+ ready-to-use n8n blueprints for agencies. Stop reinventing the wheel.</p>
                        <NewsletterForm source="services_newsletter" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-6 text-center">No spam. Unsubscribe anytime.</p>
                    </div>
                    {/* Book visual placeholder */}
                    <div className="hidden md:flex w-48 h-64 border border-slate-200 dark:border-white/10 rounded-xl items-center justify-center relative shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-500 overflow-hidden bg-slate-50 dark:bg-[#050505]">
                        <Image src="/playbook.jpg" alt="Playbook Cover" fill className="object-contain" />
                    </div>
                </div>
            </section>

            {/* PORTFOLIO PREVIEW */}
            <section className="max-w-4xl mx-auto mb-32 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
                <span className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-4 block">Our Work</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-14 uppercase tracking-tight max-w-2xl mx-auto leading-tight">Explore Our Professional n8n Automation Projects</h2>

                <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 hover:border-teal-500/50 hover:shadow-2xl dark:hover:border-emerald-500/30 transition-all cursor-pointer group shadow-xl dark:shadow-sm">
                    <div className="w-24 h-24 relative rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 flex-shrink-0 bg-slate-50 dark:bg-[#050505] shadow-inner">
                        <Image src="/icon.png" alt="Project" fill className="object-contain p-2" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h3 className="text-slate-900 dark:text-white font-black text-2xl mb-3 group-hover:text-teal-600 dark:group-hover:text-emerald-400 transition-colors uppercase tracking-tight">WhoIsAlfaz.me</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium mb-6 line-clamp-2 leading-relaxed">
                            The exact site you are looking at. Built with Next.js, Native MDX Architecture, and automated deployment pipelines.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-300 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Next.js</span>
                            <span className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-300 uppercase tracking-widest font-black shadow-sm dark:shadow-none">Automation</span>
                            <span className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-300 uppercase tracking-widest font-black shadow-sm dark:shadow-none">SEO</span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link href="/portfolio/" className="px-6 py-3 bg-teal-50 dark:bg-emerald-500/10 text-teal-600 dark:text-emerald-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all whitespace-nowrap shadow-sm hover:shadow-md">
                            See Details
                        </Link>
                    </div>
                </div>

                <div className="mt-12">
                    <Link href="/portfolio/" className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-teal-600 dark:hover:text-white transition-colors underline decoration-slate-300 dark:decoration-slate-700 underline-offset-8">
                        View Full Portfolio
                    </Link>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto mb-20 animate-in fade-in duration-1000 delay-[900ms] fill-mode-both">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-10 text-center uppercase tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        {
                            q: "How long does it take to build an automation?",
                            a: "Simple workflows (e.g., lead sync) take 2-3 days. Complex agency operating systems can take 2-4 weeks. We always start with a discovery call to give you an exact timeline."
                        },
                        {
                            q: "Do you offer ongoing support?",
                            a: "Yes. All projects come with 30 days of free monitoring. After that, we offer monthly maintenance packages to ensure your automations run smoothly as platforms update their APIs."
                        },
                        {
                            q: "Can you integrate with my specific CRM?",
                            a: "Almost certainly. If it has an API, we can connect to it. We specialize in HubSpot, Airtable, Pipedrive, and GoHighLevel, but custom integrations are our bread and butter."
                        },
                        {
                            q: "What is your refund policy?",
                            a: "We work on a milestone basis. If we cannot deliver the agreed-upon scope, you don't pay for that milestone. We prioritize transparent communication to ensure you're always happy with the output."
                        },
                        {
                            q: "Do I need to pay for n8n hosting?",
                            a: "You have two options: Cloud (approx $20/mo) or Self-Hosted (approx $5-10/mo on a VPS). We can set up either for you, but we usually recommend self-hosting for maximum data privacy and lower costs at scale."
                        },
                        {
                            q: "How do AI automation agencies price their services?",
                            a: "Most AI automation agencies charge via a monthly retainer model (ranging from $1,500 to $5,000/month) or a productized service package for specific custom workflows."
                        }
                    ].map((item, i) => (
                        <details key={i} style={{ animationDelay: `${i * 100}ms` }} className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden group shadow-sm transition-colors duration-300">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none outline-none">
                                <span className="text-slate-900 dark:text-slate-300 font-bold group-hover:text-teal-600 dark:group-hover:text-white transition-colors">{item.q}</span>
                                <ChevronDown size={18} className="text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed border-t border-slate-100 dark:border-white/5 mt-2 transition-colors duration-300">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

                {/* SEO CONTENT FOOTER */}
                <DefaultContentFooter />

        </main>
    );
}
