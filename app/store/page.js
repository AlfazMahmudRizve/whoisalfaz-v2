import Link from 'next/link';
import { ArrowRight, Zap, Brain, BarChart3, Sparkles, ShoppingBag, Check, Crown, Hourglass } from 'lucide-react';
import NewsletterForm from '../../components/NewsletterForm';

/* ─────────────────────────────────────────────────────── */
/*  SEO METADATA                                          */
/* ─────────────────────────────────────────────────────── */
export const metadata = {
    title: "Automation Templates & Digital Products | whoisalfaz.me",
    description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Coming soon to whoisalfaz.me.",
    alternates: {
        canonical: "https://whoisalfaz.me/store/",
    },
    openGraph: {
        title: "Automation Templates & Digital Products | whoisalfaz.me",
        description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Coming soon to whoisalfaz.me.",
        url: "https://whoisalfaz.me/store/",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Automation Templates & Digital Products | whoisalfaz.me",
        description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Coming soon to whoisalfaz.me.",
    },
};

const services = [
    {
        title: "Custom Workflow Automation",
        price: "Starting at $750",
        desc: "End-to-end n8n builds tailored to your exact revenue stack. Fully autonomous, self-healing, and production-hardened.",
        icon: Zap,
        slug: "/services/n8n-automation/",
    },
    {
        title: "Strategy & Growth Consulting",
        price: "$200/hour",
        desc: "Map your processes. Find the bottlenecks. Build the automation roadmap to cut costs and scale revenue on autopilot.",
        icon: BarChart3,
        slug: "/services/growth-consulting/",
    },
    {
        title: "Custom Full-Stack Applications",
        price: "Starting at $2,500",
        desc: "Bespoke web applications, internal portals, and client dashboards built from scratch with Next.js, Supabase, and Vercel.",
        icon: Sparkles,
        slug: "/services/custom-full-stack/",
    },
];

/* ─────────────────────────────────────────────────────── */
/*  MAIN PAGE                                             */
/* ─────────────────────────────────────────────────────── */
export default function StorePage() {
    /* Schema.org JSON-LD */
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://whoisalfaz.me/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Store",
                    "item": "https://whoisalfaz.me/store/"
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen selection:bg-slate-900 dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 pt-32 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-slate-900/40 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-6xl mx-auto px-6">

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION A: HERO                            */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-16 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-mono uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse"></span>
                        Store Launching Soon
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tighter mb-6 uppercase">
                        Automation{' '}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 dark:from-teal-400 dark:to-purple-400">
                            Templates & Blueprints
                        </span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Production-ready n8n workflows and enterprise integration recipes.
                    </p>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION B: COMING SOON WAITING LIST CARD   */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-24 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
                    <div className="relative bg-white dark:bg-slate-950/20 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-500/10 dark:to-purple-500/10 border border-slate-200 dark:border-teal-500/30 rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl dark:shadow-none text-center">
                        {/* Background shimmer accent */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-purple-500/10 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3" />

                        <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
                            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 dark:border-teal-500/30 flex items-center justify-center mb-6 animate-pulse">
                                <Hourglass size={28} className="text-teal-600 dark:text-teal-400" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                                Auditing & Packaging Blueprints
                            </h2>

                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                                We are currently auditing, stress-testing, and packaging our production-ready n8n workflows and RevOps blueprints for public release. Sign up below to get notified the second we launch and claim an early-bird discount.
                            </p>

                            <div className="w-full">
                                <NewsletterForm source="Store Launch Waitlist" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION C: SERVICES UPSELL                 */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
                    <div className="border-t border-slate-200 dark:border-white/5 pt-20">
                        <div className="text-center mb-14">
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] mb-4 block">
                                Done-For-You Services
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
                                Need It Done{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600 dark:from-purple-400 dark:to-teal-400">
                                    For You?
                                </span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                                Templates get you 80% of the way. For the other 20% — custom logic, integrations, and production hardening — let us handle it.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {services.map((s, i) => {
                                const SIcon = s.icon;
                                return (
                                    <Link
                                        key={s.title}
                                        href={s.slug}
                                        style={{ animationDelay: `${i * 150}ms` }}
                                        className="animate-in fade-in zoom-in-[0.98] duration-700 fill-mode-both bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-7 shadow-xl dark:shadow-none hover:border-purple-500/50 hover:shadow-2xl transition-all group overflow-hidden relative block"
                                    >
                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                                                <SIcon size={22} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <h3 className="text-slate-900 dark:text-white font-black text-lg mb-2 uppercase tracking-tight">{s.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{s.desc}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-purple-600 dark:text-purple-400 font-black text-sm uppercase tracking-wider">{s.price}</span>
                                                <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 text-sm font-bold group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
