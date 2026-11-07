import Link from 'next/link';
import PartnerLogos from '../../components/PartnerLogos';
import PlacementRequestForm from '../../components/PlacementRequestForm';
import { 
    ArrowDown, 
    Globe, 
    Link2, 
    ShieldAlert, 
    FileCode, 
    BarChart3, 
    Users, 
    Sparkles, 
    Layers, 
    Video, 
    CheckCircle2, 
    Share2,
    ArrowUpRight,
    Youtube,
    Linkedin,
    Github,
    BookOpen,
    Code2,
    Cpu,
    Twitter,
    MessageSquare,
    Briefcase
} from 'lucide-react';

export const metadata = {
    title: "Media Kit & B2B SaaS Partnerships (2026) | whoisalfaz.me",
    description: "Official 2026 Media Kit & Technical Partnerships for whoisalfaz.me. Verified audience metrics, multichannel channel links, flat-fee sponsorships, hybrid partner programs, and API blueprints.",
    openGraph: {
        title: "Media Kit & B2B SaaS Partnerships (2026) | whoisalfaz.me",
        description: "High-authority contextual link integrations, sponsored API blueprints, and multichannel B2B SaaS partnerships with Alfaz Mahmud Rizve.",
        url: "https://whoisalfaz.me/partners/",
    },
    alternates: { canonical: "https://whoisalfaz.me/partners/" },
};

const CHANNELS = [
    {
        name: "Technical Engineering Blog",
        handle: "whoisalfaz.me/blog",
        url: "https://whoisalfaz.me/blog/",
        badge: "Primary Hub",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
        icon: BookOpen,
        description: "50+ production-grade blueprints, workflow tutorials, and high-intent B2B SaaS teardowns with permanent indexation.",
        cta: "Read Technical Guides"
    },
    {
        name: "YouTube (GTM & RevOps Automation)",
        handle: "@whoisalfazz",
        url: "https://www.youtube.com/@whoisalfazz",
        badge: "Engineering Video",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: Youtube,
        description: "Screen-recorded n8n architecture breakdowns, webhook parsers, and custom API pipeline demonstrations.",
        cta: "Watch Automation Setup"
    },
    {
        name: "YouTube (B2B SaaS Reviews)",
        handle: "@alfazreviews",
        url: "https://www.youtube.com/@alfazreviews",
        badge: "Product Reviews",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: Video,
        description: "Hands-on B2B software evaluations, UI/UX teardowns, and side-by-side feature comparisons for software buyers.",
        cta: "Explore Software Reviews"
    },
    {
        name: "TikTok (Short-Form SaaS Spotlights)",
        handle: "@alfaz.tech.product",
        url: "https://www.tiktok.com/@alfaz.tech.product",
        badge: "Rapid Discovery",
        badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
        icon: Sparkles,
        description: "Bite-sized SaaS utility walkthroughs, developer tool highlights, and viral software tips for technical builders.",
        cta: "View Tech Demos"
    },
    {
        name: "LinkedIn (RevOps & B2B Leadership)",
        handle: "in/alfaz-mahmud-rizve",
        url: "https://www.linkedin.com/in/alfaz-mahmud-rizve/",
        badge: "Executive Network",
        badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        icon: Linkedin,
        description: "Strategic engineering commentary, RevOps frameworks, and B2B software architecture shared with 1st-degree leaders.",
        cta: "Connect on LinkedIn"
    },
    {
        name: "n8n Official Creator Profile",
        handle: "n8n.io/creators/whoisalfaz",
        url: "https://n8n.io/creators/whoisalfaz/",
        badge: "Verified Creator",
        badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        icon: Code2,
        description: "Production-ready, public workflow templates used by thousands of automation agencies and enterprise teams.",
        cta: "View Public Templates"
    },
    {
        name: "Hashnode Engineering Publication",
        handle: "alfazreviews.hashnode.dev",
        url: "https://hashnode.com/@alfazreviews",
        badge: "Canonical Syndication",
        badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        icon: BookOpen,
        description: "Technical articles with verified cross-domain canonical authority and software evaluation roundups.",
        cta: "Visit Hashnode Blog"
    },
    {
        name: "Dev.to Technical Publication",
        handle: "dev.to/alfazreviews",
        url: "https://dev.to/alfazreviews",
        badge: "Developer Community",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: Cpu,
        description: "Deep technical articles syndicated to global developers, DevOps specialists, and full-stack engineers.",
        cta: "Read on Dev.to"
    },
    {
        name: "Quora (AEO & AI Search Authority)",
        handle: "quora.com/profile/Alfaz-Mahmud-Rizve",
        url: "https://www.quora.com/profile/Alfaz-Mahmud-Rizve",
        badge: "Generative Engine Optimization",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: MessageSquare,
        description: "Top-ranking featured technical answers indexed by ChatGPT, Perplexity, and Google AI Overviews.",
        cta: "View Quora Profile"
    },
    {
        name: "Contra (Verified Independent Architect)",
        handle: "contra.com/alfazreviews",
        url: "https://contra.com/alfazreviews",
        badge: "Independent Expert",
        badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        icon: Briefcase,
        description: "Verified professional services portfolio, enterprise consulting credentials, and client recommendations.",
        cta: "View Contra Profile"
    },
    {
        name: "Peerlist Professional Profile",
        handle: "peerlist.io/alfazreviews",
        url: "https://peerlist.io/alfazreviews",
        badge: "Verified Builder",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: Globe,
        description: "Peer-reviewed project portfolio, technical case studies, and software release verification.",
        cta: "View Peerlist Profile"
    },
    {
        name: "GitHub Engineering Hub",
        handle: "github.com/AlfazMahmudRizve",
        url: "https://github.com/AlfazMahmudRizve",
        badge: "Open Source Code",
        badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        icon: Github,
        description: "Open-source scripts, automation orchestrators, Next.js architecture, and technical SEO tools.",
        cta: "View Repositories"
    },
    {
        name: "X / Twitter (Automation & Tech Bites)",
        handle: "@whois_alfaz",
        url: "https://x.com/whois_alfaz",
        badge: "Real-time Updates",
        badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        icon: Twitter,
        description: "Live commentary on AI agents, automation releases, and B2B SaaS growth tactics.",
        cta: "Follow on X"
    }
];

export default function PartnersPage() {
    return (
        <main className="min-h-screen selection:bg-white selection:text-black pb-32 pt-32 bg-[#0a0a0a]">
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-6xl mx-auto px-6">

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 1: HERO & BADGE                     */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-20 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                        2026 Media Kit &amp; Partnerships • Flat-Fee &amp; Hybrid Models
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-6">
                        Technical Partnerships{' '}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                            &amp; 2026 B2B Media Kit
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10">
                        I partner with category-leading B2B SaaS, DevTools, and RevOps platforms to deliver high-authority technical guides, hands-on API blueprints, and multichannel audience activation. Zero fluff. Pure technical execution for high-LTV decision-makers.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#placement-form"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-teal-500/20 transition-all hover:-translate-y-1 text-sm"
                        >
                            Submit a Placement Request
                            <ArrowDown size={18} className="animate-bounce" />
                        </a>
                        <a
                            href="#channels"
                            className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold uppercase tracking-wider rounded-xl transition-all hover:-translate-y-1 text-sm"
                        >
                            Explore Channels &amp; Links
                        </a>
                        <a
                            href="#rate-card"
                            className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-teal-300 border border-teal-500/20 font-bold uppercase tracking-wider rounded-xl transition-all hover:-translate-y-1 text-sm"
                        >
                            View Rate Card &amp; Tiers
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 2: AUDIENCE & TRAFFIC METRICS       */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-3">
                                <Users size={20} className="text-teal-400" />
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">68%</div>
                            <div className="text-xs uppercase font-mono tracking-wider text-slate-400">B2B Decision-Makers</div>
                            <p className="text-[11px] text-slate-500 mt-2">Founders, RevOps leads, VP/Directors, and senior engineers with direct software buying authority.</p>
                        </div>

                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3">
                                <Globe size={20} className="text-purple-400" />
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">85%</div>
                            <div className="text-xs uppercase font-mono tracking-wider text-slate-400">Tier-1 Markets</div>
                            <p className="text-[11px] text-slate-500 mt-2">United States (42%), UK &amp; Europe (28%), Canada &amp; Australia (15%). High-LTV commercial value.</p>
                        </div>

                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
                                <FileCode size={20} className="text-blue-400" />
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">50+</div>
                            <div className="text-xs uppercase font-mono tracking-wider text-slate-400">Deep Playbooks</div>
                            <p className="text-[11px] text-slate-500 mt-2">Production n8n workflows, RAG systems, outbound cold email stacks, and CRM pipelines.</p>
                        </div>

                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-all">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                                <BarChart3 size={20} className="text-emerald-400" />
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">High-Intent</div>
                            <div className="text-xs uppercase font-mono tracking-wider text-slate-400">Commercial SEO</div>
                            <p className="text-[11px] text-slate-500 mt-2">Top Google rankings for transactional search queries (ManyChat pricing, n8n error handling, vector DBs).</p>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 3: VERIFIED CHANNELS DIRECTORY      */}
                {/* ═══════════════════════════════════════════ */}
                <section id="channels" className="mb-24 scroll-mt-28">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] block mb-2">Multichannel Distribution</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Verified Channels &amp; Ecosystem Links</h2>
                        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-3">Every channel where we publish, syndicate, and demonstrate software to technical buyers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {CHANNELS.map((ch, i) => {
                            const IconComponent = ch.icon;
                            return (
                                <a
                                    key={i}
                                    href={ch.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-teal-500/30 transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent size={20} className="text-teal-400" />
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${ch.badgeColor}`}>
                                                {ch.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-white font-black text-base uppercase tracking-tight mb-1 group-hover:text-teal-300 transition-colors flex items-center gap-1.5">
                                            {ch.name}
                                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </h3>
                                        <div className="text-[11px] font-mono text-slate-500 mb-3">{ch.handle}</div>
                                        <p className="text-slate-400 text-xs leading-relaxed mb-6">
                                            {ch.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-teal-400 font-bold group-hover:translate-x-1 transition-transform">
                                        <span>{ch.cta}</span>
                                        <span>→</span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 4: 2026 RATE CARD & OFFERINGS       */}
                {/* ═══════════════════════════════════════════ */}
                <section id="rate-card" className="mb-24 scroll-mt-28">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] block mb-2">Transparent Pricing</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">2026 Rate Card &amp; Partnership Tiers</h2>
                        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-3">Select guaranteed flat-fee insertion or performance-based hybrid terms.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Tier 1: Contextual Placement */}
                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all relative flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                        <Link2 size={20} className="text-purple-400" />
                                    </div>
                                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[11px] font-black text-purple-300 font-mono">
                                        $100 — $180 flat
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Contextual Link &amp; Resource Integration</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Seamless, highly relevant anchor placement embedded within existing, high-ranking technical articles (e.g. ManyChat pricing teardowns, n8n error handling, Apollo outbound pipelines). Permanent server-side indexation.
                                </p>
                                <ul className="space-y-2 mb-6 text-xs text-slate-300">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Fast 24–48h deployment SLA</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Contextual editorial match (no spammy sidebar/footer links)</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Permanent placement with clean canonical trust</li>
                                </ul>
                            </div>
                            <a href="#placement-form" className="text-xs font-mono uppercase tracking-wider text-teal-400 hover:text-teal-300 flex items-center gap-1 font-bold">
                                Request Link Placement →
                            </a>
                        </div>

                        {/* Tier 2: Sponsored In-Depth Guide */}
                        <div className="bg-gradient-to-b from-teal-500/[0.08] to-white/[0.02] border-2 border-teal-500/40 rounded-2xl p-8 relative flex flex-col justify-between shadow-xl shadow-teal-500/10">
                            <div className="absolute -top-3 right-6 px-3 py-0.5 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                Most Popular for SaaS
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                                        <FileCode size={20} className="text-teal-400" />
                                    </div>
                                    <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[11px] font-black text-teal-300 font-mono">
                                        $450 — $650 flat <span className="text-slate-400 font-normal">or $300 + CPA</span>
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Sponsored Technical Guide &amp; Blueprint</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Dedicated 1,500–2,500 word deep-dive tutorial centered around your software. We build and publish a working production pipeline utilizing your API, complete with copy-pasteable JSON workflows, architecture schemas, and custom visual assets.
                                </p>
                                <ul className="space-y-2 mb-6 text-xs text-slate-300">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Production-ready workflow JSON / code download</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Custom WebP diagrams and UI walkthroughs</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> BlogPosting &amp; TechArticle JSON-LD schema markup</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Hybrid model: $300 base + standard affiliate CPA</li>
                                </ul>
                            </div>
                            <div className="pt-2">
                                <div className="text-[11px] text-slate-500 font-mono mb-2">
                                    Sample: <Link href="/blog/how-to-upgrade-to-n8n-3-without-breaking-workflows/" className="text-teal-400 hover:underline">n8n 3.0 Migration Blueprint →</Link>
                                </div>
                                <a href="#placement-form" className="text-xs font-mono uppercase tracking-wider text-teal-400 hover:text-teal-300 flex items-center gap-1 font-bold">
                                    Commission a Blueprint →
                                </a>
                            </div>
                        </div>

                        {/* Tier 3: Comparison Feature */}
                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all relative flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                        <Layers size={20} className="text-blue-400" />
                                    </div>
                                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[11px] font-black text-blue-300 font-mono">
                                        $250 — $350 flat <span className="text-slate-400 font-normal">or $150 + CPA</span>
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">SaaS Comparison &amp; Alternatives Roundup</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    High-visibility placement in a top-performing &quot;Best Alternatives&quot; or head-to-head comparison article. Captures buyers actively researching replacements for category incumbents.
                                </p>
                                <ul className="space-y-2 mb-6 text-xs text-slate-300">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Dedicated 300–500 word feature with pros/cons matrix</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Prominent CTA button with custom referral tracking</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Targets high-converting bottom-of-funnel searches</li>
                                </ul>
                            </div>
                            <div className="pt-2">
                                <div className="text-[11px] text-slate-500 font-mono mb-2">
                                    Sample: <Link href="/blog/pinecone-vs-qdrant/" className="text-teal-400 hover:underline">Pinecone vs. Qdrant Comparison →</Link>
                                </div>
                                <a href="#placement-form" className="text-xs font-mono uppercase tracking-wider text-teal-400 hover:text-teal-300 flex items-center gap-1 font-bold">
                                    Target Buyer Keywords →
                                </a>
                            </div>
                        </div>

                        {/* Tier 4: Multichannel Launch Bundle */}
                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-all relative flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                        <Sparkles size={20} className="text-amber-400" />
                                    </div>
                                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[11px] font-black text-amber-300 font-mono">
                                        $950 — $1,400 flat <span className="text-slate-400 font-normal">or $600 + CPA</span>
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">360° Multichannel Launch Bundle</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Comprehensive technical rollout covering all channels: written blog guide on whoisalfaz.me, hands-on YouTube video teardown, short-form TikTok demo, and LinkedIn distribution.
                                </p>
                                <ul className="space-y-2 mb-6 text-xs text-slate-300">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Full technical blog tutorial + schema markup</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> 5–10 min hands-on video on YouTube (@whoisalfazz / @alfazreviews)</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> Short-form feature spotlight on TikTok (@alfaz.tech.product)</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 shrink-0" /> LinkedIn technical breakdown post to 1st-degree RevOps network</li>
                                </ul>
                            </div>
                            <a href="#placement-form" className="text-xs font-mono uppercase tracking-wider text-teal-400 hover:text-teal-300 flex items-center gap-1 font-bold">
                                Book Multichannel Package →
                            </a>
                        </div>

                    </div>

                    {/* Performance Note */}
                    <div className="mt-8 p-6 bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Share2 size={24} className="text-teal-400 shrink-0" />
                            <div>
                                <h4 className="text-white font-bold text-sm">Managing Partner Programs on PartnerStack, Impact, or Awin?</h4>
                                <p className="text-slate-400 text-xs">We actively support hybrid agreements combining a flat setup fee with recurring rev-share or trial-to-paid CPA.</p>
                            </div>
                        </div>
                        <a href="#placement-form" className="px-5 py-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 font-bold text-xs uppercase tracking-wider whitespace-nowrap hover:bg-teal-500/20 transition-all">
                            Discuss Hybrid Terms
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 5: THE STRICT FILTER                */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-24">
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                                <ShieldAlert size={24} className="text-red-400" />
                            </div>
                            <div>
                                <div className="inline-block px-2.5 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-widest rounded mb-2">
                                    Quality Standard
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">The Strict Niche Filter</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                                    To protect domain authority and maintain reader trust, I operate a zero-tolerance policy for low-tier niches. <span className="text-white font-semibold">No Casino. No Crypto. No CBD. No Generic AI Wrappers.</span> We work strictly with verified B2B SaaS, DevTools, APIs, and RevOps software platforms with proven utility.
                                </p>
                            </div>
                        </div>
                        <div className="shrink-0 text-center md:text-right">
                            <div className="text-2xl font-black text-white">100%</div>
                            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Search Guidelines Compliant</div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 6: PLACEMENT REQUEST FORM           */}
                {/* ═══════════════════════════════════════════ */}
                <section className="mb-32 max-w-3xl mx-auto">
                    <PlacementRequestForm />
                </section>

                {/* ═══════════════════════════════════════════ */}
                {/* SECTION 7: AUTHORITY & THE MODEL            */}
                {/* ═══════════════════════════════════════════ */}
                <div className="border-t border-white/5 pt-24">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Why This Platform Converts</span>
                    </div>

                    {/* Logo Grid */}
                    <section className="mb-32 py-12 border-y border-white/5">
                        <PartnerLogos title="Official Technology Partners &amp; Integrations" />
                    </section>

                    {/* The Architect & The Audience */}
                    <section className="grid md:grid-cols-2 gap-16 mb-32 items-start">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-white">
                                <span className="text-xl font-bold font-mono opacity-20">01</span>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">The Architect &amp; The Audience</h2>
                            </div>
                            <div className="p-8 border-l-2 border-white/10 bg-white/[0.02]">
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    <strong>Alfaz Mahmud Rizve</strong><br />
                                    <span className="text-xs uppercase tracking-widest text-slate-500">RevOps &amp; Full-Stack Automation Architect</span>
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
                                    { t: "Agency Owners", d: "Performance & Creative firms scaling delivery via headless stacks and automated workflows." },
                                    { t: "SaaS Founders", d: "Seed to Series B founders automating outbound pipelines, user onboarding, and lead-to-renewal lifecycles." },
                                    { t: "Technical Implementers", d: "RevOps engineers, developers, and operators executing the exact blueprints I architect." }
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
                                    <span className="px-3 py-1 bg-white/5 rounded text-[10px] text-slate-400 border border-white/10">US / UK / EU / AU</span>
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
                                    I do not use generic banner ads or spammy lists. My conversion strategy is **Mandatory Technical Integration.**
                                </p>
                                <div className="bg-white/5 p-6 border border-white/10 italic text-slate-400 text-xs">
                                    &quot;I don&apos;t recommend tools. I require them.&quot;
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                {[
                                    { n: "01", t: "Tutorial / Blueprint", d: "I publish production-grade automation recipes (e.g., 'Autonomous Lead Scoring with AI & Vector Databases')." },
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
                                    <h3 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Automation</h3>
                                    <ul className="text-sm font-medium space-y-1"><li>n8n.io</li><li>Make.com</li><li>Python / Node.js</li></ul>
                                </div>
                                <div>
                                    <h3 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Data &amp; CRM</h3>
                                    <ul className="text-sm font-medium space-y-1"><li>HubSpot</li><li>Apollo.io</li><li>Supabase</li><li>Brevo</li></ul>
                                </div>
                                <div>
                                    <h3 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Headless &amp; Search</h3>
                                    <ul className="text-sm font-medium space-y-1"><li>Next.js 15</li><li>Sanity CMS</li><li>Pinecone / Vector DBs</li></ul>
                                </div>
                                <div>
                                    <h3 className="font-bold border-b-2 border-black/10 pb-2 mb-4 uppercase text-xs">Cloud Infra</h3>
                                    <ul className="text-sm font-medium space-y-1"><li>Vercel Edge</li><li>AWS</li><li>DigitalOcean</li></ul>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
