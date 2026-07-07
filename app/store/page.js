import Link from 'next/link';
import { ArrowRight, Zap, Brain, BarChart3, Sparkles, ShoppingBag, Check, Crown } from 'lucide-react';

/* ─────────────────────────────────────────────────────── */
/*  SEO METADATA                                          */
/* ─────────────────────────────────────────────────────── */
export const metadata = {
    title: "Automation Templates & Digital Products | whoisalfaz.me",
    description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Download individually or get the complete 30-Day Master Bundle.",
    alternates: {
        canonical: "https://whoisalfaz.me/store/",
    },
    openGraph: {
        title: "Automation Templates & Digital Products | whoisalfaz.me",
        description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Download individually or get the complete 30-Day Master Bundle.",
        url: "https://whoisalfaz.me/store/",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Automation Templates & Digital Products | whoisalfaz.me",
        description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Download individually or get the complete 30-Day Master Bundle.",
    },
};

/* ─────────────────────────────────────────────────────── */
/*  PRODUCT DATA                                          */
/* ─────────────────────────────────────────────────────── */
const products = [
    // ── AI & RAG ──
    { title: "AI Lead Enrichment Pipeline",       price: 49, category: "AI & RAG",               icon: Brain, blogSlug: "lead-enrichment-with-n8n", planId: "plan_LAxinedkQYitE" },
    { title: "RAG Knowledge Base Blueprint",      price: 49, category: "AI & RAG",               icon: Brain, blogSlug: "build-personal-ai-assistant", planId: "plan_D71ZRfF5b5QXl" },
    { title: "Voice AI Sales Agent",              price: 49, category: "AI & RAG",               icon: Brain, blogSlug: "n8n-ai-receptionist", planId: "plan_S50L0qOB3IvIp" },
    { title: "n8n AI Agent Nodes & Memory Buffer", price: 49, category: "AI & RAG",              icon: Brain, blogSlug: "n8n-ai-receptionist", planId: "plan_dfb2j55Fv65Ae" },
    { title: "AdCreative.ai Automated Graphic Pipeline", price: 49, category: "AI & RAG",        icon: Brain, blogSlug: "automate-personal-branding-with-n8n", planId: "plan_RV52CPVB9oXMO" },
    // ── Lead Gen & Outreach ──
    { title: "Autonomous Cold Email Machine",     price: 49, category: "Lead Gen & Outreach",    icon: Zap, blogSlug: "automate-personal-branding-with-n8n", planId: "plan_1eHKseUiDbVb8" },
    { title: "ManyChat Async Webhook Queue",      price: 19, category: "Lead Gen & Outreach",    icon: Zap, blogSlug: "capture-n8n-lead-data-from-wordpress-elementor", planId: "plan_S7pBfJZkektqQ" },
    { title: "Apollo-to-Brevo CRM Sync",          price: 19, category: "Lead Gen & Outreach",    icon: Zap, blogSlug: "automated-email-follow-up-n8n-brevo", planId: "plan_w9KXzqC4XWnnp" },
    { title: "ManyChat WhatsApp Lead Capture",     price: 19, category: "Lead Gen & Outreach",    icon: Zap, blogSlug: "capture-n8n-lead-data-from-wordpress-elementor", planId: "plan_CufMiCuLoVPE1" },
    { title: "Outbound LinkedIn Prospecting",      price: 49, category: "Lead Gen & Outreach",    icon: Zap, blogSlug: "automate-personal-branding-with-n8n", planId: "plan_yJk8svYXUtbdj" },
    { title: "Multi-Step AI Outreach Agent",       price: 49, category: "Lead Gen & Outreach",    icon: Zap, blogSlug: "automate-personal-branding-with-n8n", planId: "plan_RCBFP8rZBFkPP" },
    { title: "ManyChat Instagram DM Funnel",       price: 19, category: "Lead Gen & Outreach",    icon: Zap, blogSlug: "capture-n8n-lead-data-from-wordpress-elementor", planId: "plan_OwdgMbXwj7heu" },
    // ── Analytics & RevOps ──
    { title: "monday.com RevOps Recipes (12-pack)", price: 19, category: "Analytics & RevOps",   icon: BarChart3, blogSlug: "monday-com-automation-recipes-revops-2026", planId: "plan_g3hMmwEx3CcCz" },
    { title: "Databox RevOps Dashboard Pipeline",  price: 19, category: "Analytics & RevOps",    icon: BarChart3, blogSlug: "n8n-google-analytics-4-pipeline", planId: "plan_UCPmOKMFlvb8m" },
    { title: "Self-Healing Error Handler",          price: 49, category: "Analytics & RevOps",    icon: BarChart3, blogSlug: "n8n-global-error-handling", planId: "plan_e6tgQDrp9DMDx" },
    { title: "Trainual SOP Documenting Engine",     price: 19, category: "Analytics & RevOps",    icon: BarChart3, blogSlug: "n8n-workflow-design-best-practices", planId: "plan_3uvQxwz9jOM88" },
    { title: "Brevo CRM Automation Playbook",       price: 19, category: "Analytics & RevOps",    icon: BarChart3, blogSlug: "automated-email-follow-up-n8n-brevo", planId: "plan_lHnaCclctYENN" },
    { title: "Living Operations Manual Sync",       price: 19, category: "Analytics & RevOps",    icon: BarChart3, blogSlug: "n8n-workflow-design-best-practices", planId: "plan_xXfLHIWslz0Em" },
    { title: "End-to-End Inbound RevOps Engine",    price: 49, category: "Analytics & RevOps",    icon: BarChart3, blogSlug: "automation-operating-system-for-saas", planId: "plan_RCBFP8rZBFkPP" }, // Using Multi-Step outreach plan ID since End-to-End Inbound is associated with B2B lead pipelines
];

const categories = [
    { label: "All",                   anchor: "#products",    icon: ShoppingBag },
    { label: "AI & RAG",              anchor: "#ai-rag",      icon: Brain },
    { label: "Lead Gen & Outreach",   anchor: "#lead-gen",    icon: Zap },
    { label: "Analytics & RevOps",    anchor: "#analytics",   icon: BarChart3 },
];

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
/*  PRODUCT CARD COMPONENT                                */
/* ─────────────────────────────────────────────────────── */
function ProductCard({ product, index }) {
    const Icon = product.icon;
    return (
        <div
            style={{ animationDelay: `${index * 80}ms` }}
            className="animate-in fade-in zoom-in-[0.98] duration-700 fill-mode-both bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-none hover:border-teal-500/50 hover:shadow-2xl transition-all group overflow-hidden relative flex flex-col"
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Price Badge — Top Right */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[11px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-wider z-10">
                ${product.price}
            </div>

            {/* Category Badge */}
            <div className="mb-4 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    <Icon size={12} />
                    {product.category}
                </span>
            </div>

            {/* Title & Description */}
            <div className="flex-1 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 pr-16 leading-tight">{product.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Production-ready n8n workflow template. Download the JSON, import, and run.
                </p>
            </div>

            {/* CTA */}
            <div className="mt-6 relative z-10 flex flex-wrap items-center justify-between gap-4">
                <a
                    href={`https://whop.com/checkout/${product.planId || 'plan_PLACEHOLDER'}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-bold group-hover:text-teal-500 dark:group-hover:text-teal-300 transition-colors"
                >
                    Get Template <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                {product.blogSlug && (
                    <Link
                        href={`/blog/${product.blogSlug}/`}
                        className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-semibold transition-colors"
                    >
                        Read Guide →
                    </Link>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────── */
/*  CATEGORY SECTION                                      */
/* ─────────────────────────────────────────────────────── */
function CategorySection({ id, label, icon: Icon, items }) {
    return (
        <div id={id} className="scroll-mt-32 mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <Icon size={20} className="text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{label}</h2>
                <span className="ml-auto px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider border border-slate-200 dark:border-white/5">
                    {items.length} templates
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((product, i) => (
                    <ProductCard key={product.title} product={product} index={i} />
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────── */
/*  MAIN PAGE                                             */
/* ─────────────────────────────────────────────────────── */
export default function StorePage() {
    /* Schema.org JSON-LD */
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "30-Day Automation Master Bundle",
            "description": "All 19 production-ready n8n workflow templates, private Discord support, 12-month breakage guarantee, lifetime updates, and master .env configuration template.",
            "brand": {
                "@type": "Brand",
                "name": "whoisalfaz.me"
            },
            "offers": {
                "@type": "Offer",
                "price": "149",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://whop.com/checkout/plan_vhZzXEqVAiZNm"
            }
        },
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

    /* Grouped products for category sections */
    const aiRag = products.filter(p => p.category === "AI & RAG");
    const leadGen = products.filter(p => p.category === "Lead Gen & Outreach");
    const analytics = products.filter(p => p.category === "Analytics & RevOps");

    const bundleFeatures = [
        "All 19 Production Workflows",
        "Private Discord Support Channel",
        "12-Month Breakage Guarantee",
        "Lifetime Updates",
        "Master .env Configuration Template",
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
                <section className="mb-20 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-mono uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse"></span>
                        Digital Products
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tighter mb-6 uppercase">
                        Automation{' '}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 dark:from-teal-400 dark:to-purple-400">
                            Templates & Blueprints
                        </span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Production-ready n8n workflows. Download the JSON. Import. Run.
                    </p>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION B: MASTER BUNDLE FLAGSHIP CARD     */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
                    <div className="relative bg-white dark:bg-slate-950/20 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-500/10 dark:to-purple-500/10 border border-slate-200 dark:border-teal-500/30 rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl dark:shadow-none">
                        {/* Background shimmer accent */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-purple-500/10 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3" />

                        {/* BEST VALUE Badge */}
                        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/20">
                                <Crown size={12} />
                                Best Value
                            </span>
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                            {/* Left: Info */}
                            <div className="flex-1">
                                <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.3em] mb-4 block">
                                    Complete Collection
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4 leading-[1.1]">
                                    30-Day Automation{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 dark:from-teal-400 dark:to-purple-400">
                                        Master Bundle
                                    </span>
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed max-w-xl mb-8">
                                    Every template in one battle-tested package. Deploy a complete automation infrastructure in 30 days — from AI-powered lead enrichment to self-healing error handlers.
                                </p>

                                {/* Feature List */}
                                <ul className="space-y-3 mb-8">
                                    {bundleFeatures.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                            <div className="w-5 h-5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 dark:border-teal-500/30 flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-teal-600 dark:text-teal-400" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right: Pricing & CTA */}
                            <div className="lg:min-w-[280px] w-full lg:w-auto">
                                <div className="bg-slate-50 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-8 text-center shadow-sm dark:shadow-none">
                                    <div className="mb-6">
                                        <span className="text-slate-400 dark:text-slate-500 line-through text-lg font-medium">$661</span>
                                        <div className="text-5xl font-black text-slate-900 dark:text-white mt-2">$149</div>
                                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-2 block">
                                            Save 77% — One-time payment
                                        </span>
                                    </div>
                                    <a
                                        href="https://whop.com/checkout/plan_vhZzXEqVAiZNm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-shimmer w-full block py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        Get the Complete Bundle →
                                    </a>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-4 uppercase tracking-wider font-medium">
                                        Instant access · No recurring fees
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION C: CATEGORY FILTER (Anchor-based)  */}
                {/* ═══════════════════════════════════════════ */}
                <section id="products" className="mb-16 scroll-mt-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {categories.map((cat) => {
                            const CatIcon = cat.icon;
                            return (
                                <a
                                    key={cat.label}
                                    href={cat.anchor}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/5 shadow-sm dark:shadow-none transition-all"
                                >
                                    <CatIcon size={14} />
                                    {cat.label}
                                </a>
                            );
                        })}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em] font-medium">
                        {products.length} templates available · Click a category to jump
                    </p>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION D: PRODUCT GRID (by Category)      */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-32 animate-in fade-in duration-1000 delay-500 fill-mode-both">
                    <CategorySection id="ai-rag"    label="AI & RAG"             icon={Brain}     items={aiRag} />
                    <CategorySection id="lead-gen"   label="Lead Gen & Outreach"  icon={Zap}       items={leadGen} />
                    <CategorySection id="analytics"  label="Analytics & RevOps"   icon={BarChart3} items={analytics} />
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION E: SERVICES UPSELL                 */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
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
