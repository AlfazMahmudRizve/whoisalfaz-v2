import Link from 'next/link';
import { ArrowRight, Zap, BarChart3, Sparkles, Construction, ChevronRight } from 'lucide-react';
import StoreCatalog from '../../components/StoreCatalog';
import NewsletterForm from '../../components/NewsletterForm';

/* ─────────────────────────────────────────────────────── */
/*  SEO METADATA                                          */
/* ─────────────────────────────────────────────────────── */
export const metadata = {
    title: "Automation Templates & Digital Products | whoisalfaz.me",
    description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Get access to 18 premium templates.",
    alternates: {
        canonical: "https://whoisalfaz.me/store/",
    },
    openGraph: {
        title: "Automation Templates & Digital Products | whoisalfaz.me",
        description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Get access to 18 premium templates.",
        url: "https://whoisalfaz.me/store/",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Automation Templates & Digital Products | whoisalfaz.me",
        description: "Production-ready n8n workflow templates, AI automation blueprints, and RevOps systems. Get access to 18 premium templates.",
    },
};

const products = [
    {
        planId: "plan_vhZzXEqVAiZNm",
        title: "30-Day Automation Master Bundle",
        price: 149,
        purchaseUrl: "https://whop.com/checkout/plan_vhZzXEqVAiZNm",
        category: "all",
        isBundle: true,
        image: "automations-for-saas-and-agencies-featured.webp",
        description: "Get the complete collection of all 18 production-ready n8n workflows, plus private Discord community access, a 12-month guarantee, and lifetime updates.",
        integrations: ["n8n", "OpenAI", "ManyChat", "monday.com", "HubSpot", "Brevo"]
    },
    {
        planId: "plan_LAxinedkQYitE",
        title: "AI Lead Enrichment Pipeline",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_LAxinedkQYitE",
        category: "ai-rag",
        image: "lead-enrichment-with-n8n-featured.webp",
        description: "Automate B2B lead enrichment & scoring in 5 minutes using Apollo.io, OpenAI, HubSpot, and Slack notifications.",
        integrations: ["n8n", "Apollo.io", "OpenAI", "HubSpot", "Slack"]
    },
    {
        planId: "plan_D71ZRfF5b5QXl",
        title: "RAG Knowledge Base Blueprint",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_D71ZRfF5b5QXl",
        category: "ai-rag",
        image: "n8n-rag-tutorial-featured.webp",
        description: "Connect n8n to vector databases (Pinecone/Qdrant) for high-context semantic search and RAG knowledge retrieval.",
        integrations: ["n8n", "Pinecone", "Qdrant", "OpenAI"]
    },
    {
        planId: "plan_S50L0qOB3IvIp",
        title: "Voice AI Sales Agent",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_S50L0qOB3IvIp",
        category: "ai-rag",
        image: "n8n-ai-receptionist-featured.webp",
        description: "Deploy a real-time voice receptionist using Twilio, ElevenLabs, and n8n to qualify leads and book appointments.",
        integrations: ["n8n", "Twilio", "ElevenLabs", "Google Calendar"]
    },
    {
        planId: "plan_dfb2j55Fv65Ae",
        title: "n8n AI Agent Nodes & Memory Buffer",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_dfb2j55Fv65Ae",
        category: "ai-rag",
        image: "n8n-ai-agent-tools-featured.webp",
        description: "Implement stateful multi-agent planning, prompt memory window buffers, and tool integrations inside n8n.",
        integrations: ["n8n", "OpenAI", "Pinecone", "Tavily Search"]
    },
    {
        planId: "plan_RV52CPVB9oXMO",
        title: "AdCreative.ai Automated Graphic Pipeline",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_RV52CPVB9oXMO",
        category: "ai-rag",
        image: "automate-client-reporting-with-n8n-featured.webp",
        description: "Automatically design conversion-focused banner ads using AdCreative.ai, Airtable, and Google Drive.",
        integrations: ["n8n", "AdCreative.ai", "Airtable", "Google Drive"]
    },
    {
        planId: "plan_1eHKseUiDbVb8",
        title: "Autonomous Cold Email Machine",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_1eHKseUiDbVb8",
        category: "outreach",
        image: "automate-personal-branding-with-n8n-featured.webp",
        description: "Launch automated outbound cold email sequences utilizing n8n, Smartlead, Instantly, and Apollo.io.",
        integrations: ["n8n", "Smartlead", "Instantly", "Apollo.io"]
    },
    {
        planId: "plan_S7pBfJZkektqQ",
        title: "ManyChat Async Webhook Queue",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_S7pBfJZkektqQ",
        category: "inbound",
        image: "capture-n8n-lead-data-from-wordpress-elementor-featured.webp",
        description: "High-throughput webhook queue template to handle viral social traffic without dropping webhook payloads.",
        integrations: ["n8n", "ManyChat", "Webhooks"]
    },
    {
        planId: "plan_w9KXzqC4XWnnp",
        title: "Apollo-to-Brevo CRM Sync",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_w9KXzqC4XWnnp",
        category: "outreach",
        image: "automated-email-follow-up-n8n-brevo-featured.webp",
        description: "Keep contact lists and marketing campaigns synchronized between Apollo.io prospecting and Brevo CRM.",
        integrations: ["n8n", "Apollo.io", "Brevo CRM"]
    },
    {
        planId: "plan_CufMiCuLoVPE1",
        title: "ManyChat WhatsApp Lead Capture",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_CufMiCuLoVPE1",
        category: "inbound",
        image: "outstanding-ideas-for-b2b-lead-capture-featured.webp",
        description: "ManyChat WhatsApp automation workflows for context-aware B2B lead capture, scoring, and Slack alerts.",
        integrations: ["n8n", "WhatsApp", "ManyChat", "Slack"]
    },
    {
        planId: "plan_yJk8svYXUtbdj",
        title: "Outbound LinkedIn Prospecting",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_yJk8svYXUtbdj",
        category: "outreach",
        image: "automated-content-research-by-alfaz-mahmud-rizve-featured.webp",
        description: "Automated LinkedIn connection invites and message sequence warming throttles to bypass account limits.",
        integrations: ["n8n", "LinkedIn API", "Apollo.io"]
    },
    {
        planId: "plan_RCBFP8rZBFkPP",
        title: "Multi-Step AI Outreach Agent",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_RCBFP8rZBFkPP",
        category: "outreach",
        image: "outstanding-ideas-for-b2b-lead-generation-featured.webp",
        description: "Autonomous B2B multi-step AI outreach agent utilizing n8n and OpenAI models for reply sentiment analysis.",
        integrations: ["n8n", "OpenAI", "Brevo CRM"]
    },
    {
        planId: "plan_OwdgMbXwj7heu",
        title: "ManyChat Instagram DM Funnel",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_OwdgMbXwj7heu",
        category: "inbound",
        image: "automated-youtube-shorts-generator-featured.webp",
        description: "Instagram DM comment-to-message triggers, lead magnet delivery, and CRM logging.",
        integrations: ["n8n", "ManyChat", "Instagram DM"]
    },
    {
        planId: "plan_g3hMmwEx3CcCz",
        title: "monday.com RevOps Recipes (12-pack)",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_g3hMmwEx3CcCz",
        category: "revops",
        image: "essential-n8n-core-nodes-by-alfaz-mahmud-rizve-featured.webp",
        description: "Get 12 battle-tested monday.com automation blueprints to handle lead onboarding, assignments, and deal logging.",
        integrations: ["n8n", "monday.com"]
    },
    {
        planId: "plan_UCPmOKMFlvb8m",
        title: "Databox RevOps Dashboard Pipeline",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_UCPmOKMFlvb8m",
        category: "revops",
        image: "n8n-google-analytics-4-pipeline-featured.webp",
        description: "Stream pipeline velocity, conversion metrics, and deal values straight to your Databox dashboards.",
        integrations: ["n8n", "Databox", "monday.com"]
    },
    {
        planId: "plan_e6tgQDrp9DMDx",
        title: "Self-Healing Error Handler",
        price: 49,
        purchaseUrl: "https://whop.com/checkout/plan_e6tgQDrp9DMDx",
        category: "revops",
        image: "n8n-debugging-error-handling-basics-featured.webp",
        description: "Global error-catching workflow that automatically captures execution logs, alerts Slack/Discord, and retries.",
        integrations: ["n8n", "Slack Webhooks", "Discord Webhooks"]
    },
    {
        planId: "plan_3uvQxwz9jOM88",
        title: "Trainual SOP Documenting Engine",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_3uvQxwz9jOM88",
        category: "revops",
        image: "n8n-workflow-design-best-practices-featured.webp",
        description: "Automatically document all n8n workflows into training SOPs inside Trainual as you deploy them.",
        integrations: ["n8n", "Trainual", "monday.com"]
    },
    {
        planId: "plan_lHnaCclctYENN",
        title: "Brevo CRM Automation Playbook",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_lHnaCclctYENN",
        category: "revops",
        image: "facebook-lead-ads-automation-by-alfaz-mahmud-rizve-featured.webp",
        description: "Complete Brevo marketing campaigns and transactional list management automation blueprints.",
        integrations: ["n8n", "Brevo CRM"]
    },
    {
        planId: "plan_xXfLHIWslz0Em",
        title: "Living Operations Manual Sync",
        price: 19,
        purchaseUrl: "https://whop.com/checkout/plan_xXfLHIWslz0Em",
        category: "revops",
        image: "n8n-production-workflows-by-alfaz-mahmud-rizve-featured.webp",
        description: "Keep operations manuals, Wikis, and SOP portals in sync with real-time automated database updates.",
        integrations: ["n8n", "Trainual", "monday.com"]
    }
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

export default async function StorePage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const isPreview = resolvedSearchParams?.preview === 'true';

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
        <main className="min-h-screen pb-32 pt-32 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-slate-900/40 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            {isPreview ? (
                <div className="max-w-6xl mx-auto px-6 space-y-16">
                    {/* ═══════════════════════════════════════════ */}
                    {/* HERO SECTION                               */}
                    {/* ═══════════════════════════════════════════ */}
                    <section className="text-center max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-mono uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse"></span>
                            PREVIEW MODE (ACTIVE)
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tighter uppercase">
                            n8n Automation{' '}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 dark:from-teal-400 dark:to-purple-400">
                                Workflow Store
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Skip building from scratch. Access production-ready, stress-tested n8n blueprint templates to automate your RevOps, outreach, and AI pipelines.
                        </p>
                    </section>

                    {/* ═══════════════════════════════════════════ */}
                    {/* PRODUCTS CATALOG SECTION                   */}
                    {/* ═══════════════════════════════════════════ */}
                    <section className="w-full">
                        <StoreCatalog products={products} />
                    </section>

                    {/* ═══════════════════════════════════════════ */}
                    {/* SERVICES UPSELL                            */}
                    {/* ═══════════════════════════════════════════ */}
                    <section className="border-t border-slate-200 dark:border-white/5 pt-20">
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
                            {services.map((s) => {
                                const SIcon = s.icon;
                                return (
                                    <Link
                                        key={s.title}
                                        href={s.slug}
                                        className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-7 shadow-xl dark:shadow-none hover:border-purple-500/50 hover:shadow-2xl transition-all group overflow-hidden relative block"
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
                    </section>
                </div>
            ) : (
                <div className="max-w-xl mx-auto px-6 text-center mt-12 md:mt-20">
                    <div className="bg-white dark:bg-slate-950/20 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-purple-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 -z-10" />

                        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-8">
                            <Construction className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-mono uppercase tracking-widest mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse"></span>
                            Under Construction
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 animate-in fade-in slide-in-from-bottom duration-500">
                            The Workflow Store
                        </h1>

                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                            Our storefront of production-grade n8n automation blueprints, RevOps recipes, and AI outbound machines is currently undergoing final polishing. Sign up to get notified the second we launch.
                        </p>

                        <div className="w-full max-w-sm mx-auto">
                            <NewsletterForm source="store_coming_soon" />
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
                            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors uppercase tracking-wider">
                                Back to Homepage <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
