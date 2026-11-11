import Link from 'next/link';
import { ShieldCheck, Star } from 'lucide-react';
import { normalizeAffiliateKey } from '@/lib/affiliate-catalog';

export const AFFILIATE_DATA = {
    n8n: {
        title: "n8n Cloud",
        description: "The most powerful fair-code automation platform. Get 20% off your first year on any paid plan.",
        url: "/go/n8n",
        buttonText: "Claim n8n Discount",
        badge: "Infrastructure",
        isPartner: true
    },
    vultr: {
        title: "Vultr High-Performance Cloud",
        description: "Deploy self-hosted vector databases & AI infrastructure worldwide. Claim up to $100 in free credit.",
        url: "/go/vultr-promo",
        buttonText: "Claim $100 Free Vultr Credit",
        badge: "Compute",
        isPartner: true
    },
    brevo: {
        title: "Brevo (formerly Sendinblue)",
        description: "Enterprise-grade email API and marketing automation. Excellent SMTP for n8n.",
        url: "/go/brevo",
        buttonText: "Try Brevo Free",
        badge: "Email/SMTP",
        isPartner: true
    },
    pinecone: {
        title: "Pinecone Vector Database",
        description: "The vector database for building AI applications. Essential for RAG architectures.",
        url: "/go/pinecone",
        buttonText: "Start Building with Pinecone",
        badge: "Vector DB",
        isPartner: true
    },
    qdrant: {
        title: "Qdrant Cloud",
        description: "Rust-native vector search engine for the next generation of AI. Fast, scalable, and memory-efficient.",
        url: "/go/qdrant",
        buttonText: "Try Qdrant Cloud Free",
        badge: "Vector DB",
        isPartner: false
    },
    apollo: {
        title: "Apollo.io",
        description: "The ultimate B2B database and sales engagement platform for lead generation.",
        url: "/go/apollo",
        buttonText: "Try Apollo Free",
        badge: "Lead Gen",
        isPartner: true
    },
    databox: {
        title: "Databox",
        description: "Business analytics platform to build and share custom dashboards.",
        url: "/go/databox",
        buttonText: "Start Visualizing Data",
        badge: "Analytics",
        isPartner: true
    },
    monday: {
        title: "Monday.com",
        description: "The Work OS that lets you shape workflows, your way. Perfect for team scale.",
        url: "/go/monday",
        buttonText: "Try Monday.com",
        badge: "Work OS",
        isPartner: true
    },
    turbotic: {
        title: "Turbotic",
        description: "Enterprise automation optimization and orchestration tracking system.",
        url: "/go/turbotic",
        buttonText: "Explore Turbotic",
        badge: "Orchestration",
        isPartner: true
    },
    cometchat: {
        title: "CometChat",
        description: "Developer-first in-app messaging and voice/video calling APIs.",
        url: "/go/cometchat",
        buttonText: "Integrate CometChat",
        badge: "Comms API",
        isPartner: true
    },
    adcreative: {
        title: "AdCreative.ai",
        description: "Generate conversion-focused ad creatives and social media post designs in seconds.",
        url: "/go/adcreative",
        buttonText: "Try AdCreative Free",
        badge: "AI Design",
        isPartner: true
    },
    elevenlabs: {
        title: "ElevenLabs",
        description: "The most realistic text-to-speech and voice cloning software.",
        url: "/go/elevenlabs",
        buttonText: "Try ElevenLabs",
        badge: "Voice AI",
        isPartner: true
    },
    emergent: {
        title: "Emergent",
        description: "AI-powered revenue operations platform for scaling B2B growth.",
        url: "/go/emergent",
        buttonText: "Try Emergent",
        badge: "RevOps AI",
        isPartner: true
    },
    tapstitch: {
        title: "Tapstitch",
        description: "Data integration and workflow stitching platform for modern teams.",
        url: "/go/tapstitch",
        buttonText: "Explore Tapstitch",
        badge: "Integration",
        isPartner: true
    },
    aisdr: {
        title: "AiSDR",
        description: "AI-powered sales development representative for automated outbound.",
        url: "/go/aisdr",
        buttonText: "Try AiSDR",
        badge: "AI Sales",
        isPartner: true
    },
    ags: {
        title: "Accelerated Growth Studio",
        description: "Growth engineering and product-led acquisition acceleration platform.",
        url: "/go/ags",
        buttonText: "Explore AGS",
        badge: "Growth",
        isPartner: true
    },
    manychat: {
        title: "ManyChat",
        description: "The #1 conversational marketing platform for Instagram, Facebook, and WhatsApp.",
        url: "/go/manychat",
        buttonText: "Explore ManyChat",
        badge: "Social Automation",
        isPartner: true
    },
    twilio: {
        title: "Twilio",
        description: "The industry-standard communications platform. Essential for provisioning numbers and streaming call audio.",
        url: "https://www.twilio.com/",
        buttonText: "Explore Twilio",
        badge: "Telephony",
        isPartner: false
    },
    hubspot: {
        title: "HubSpot CRM",
        description: "The leading customer relationship platform. Perfect for centralizing contacts, logs, and pipeline workflows.",
        url: "https://www.hubspot.com/",
        buttonText: "Try HubSpot",
        badge: "CRM",
        isPartner: false
    },
    dify: {
        title: "Dify.ai",
        description: "An open-source LLM app development platform. Orchestrate agents, RAG pipelines, and LLM workflows with ease.",
        url: "/go/dify",
        buttonText: "Try Dify.ai",
        badge: "AI Orchestration",
        isPartner: true
    },
    trainual: {
        title: "Trainual",
        description: "The leading standard operating procedure (SOP) and training platform for growing teams.",
        url: "/go/trainual",
        buttonText: "Try Trainual Free",
        badge: "SOP & Training",
        isPartner: true
    },
    lusha: {
        title: "Lusha",
        description: "B2B database and contact enrichment platform. Find verified emails and phone numbers instantly.",
        url: "/go/lusha",
        buttonText: "Try Lusha Free",
        badge: "Lead Gen & Data",
        isPartner: true
    },
    whatconverts: {
        title: "WhatConverts",
        description: "Call, form, chat, and lead tracking software for complete GTM attribution and marketing analytics.",
        url: "/go/whatconverts",
        buttonText: "Try WhatConverts",
        badge: "Lead Attribution",
        isPartner: true
    },
    vistasocial: {
        title: "Vista Social",
        description: "Modern social media management platform for scheduling, analytics, and multi-channel engagement.",
        url: "/go/vistasocial",
        buttonText: "Try Vista Social",
        badge: "Social Media",
        isPartner: true
    },
    softsync: {
        title: "SoftSync",
        description: "AI automation and data integration platform connecting enterprise tools with low latency.",
        url: "/go/softsync",
        buttonText: "Explore SoftSync",
        badge: "AI Automation",
        isPartner: true
    },
    runpod: {
        title: "RunPod",
        description: "Globally distributed GPU cloud compute platform for AI inference, LLM fine-tuning, and serverless AI.",
        url: "/go/runpod",
        buttonText: "Deploy on RunPod",
        badge: "GPU Cloud",
        isPartner: true
    },
    clickup: {
        title: "ClickUp",
        description: "All-in-one productivity platform for task management, team collaboration, and automated project sprints.",
        url: "/go/clickup",
        buttonText: "Try ClickUp Free",
        badge: "Project Ops",
        isPartner: true
    },
    staytuned: {
        title: "Staytuned Digital (Zenpire)",
        description: "High-conversion e-commerce growth tools, sizing charts, and Shopify store revenue automation.",
        url: "/go/staytuned",
        buttonText: "Explore Zenpire",
        badge: "E-commerce",
        isPartner: true
    },
    deel: {
        title: "Deel",
        description: "Global hiring, compliance, and international payroll platform for remote engineering teams.",
        url: "/go/deel",
        buttonText: "Get Started with Deel",
        badge: "Global HR",
        isPartner: true
    },
    plansom: {
        title: "Plansom",
        description: "Intelligent financial planning, budgeting, and automated cash flow forecasting for growing businesses.",
        url: "/go/plansom",
        buttonText: "Try Plansom",
        badge: "FinOps",
        isPartner: true
    },
    mindstudio: {
        title: "MindStudio",
        description: "No-code AI application builder. Build custom AI models, internal workflow assistants, and intelligent bots.",
        url: "/go/mindstudio",
        buttonText: "Build with MindStudio",
        badge: "No-Code AI",
        isPartner: true
    },
    foxit: {
        title: "Foxit PDF Editor",
        description: "Enterprise PDF editor, e-sign platform, and automated document workflow management solution.",
        url: "/go/foxit",
        buttonText: "Try Foxit PDF",
        badge: "Document Ops",
        isPartner: true
    },
    callhippo: {
        title: "CallHippo",
        description: "Intelligent cloud-based virtual phone system and VoIP call center software for sales teams.",
        url: "/go/callhippo",
        buttonText: "Try CallHippo",
        badge: "Cloud Telephony",
        isPartner: true
    },
    'krafera-upgrade': {
        title: "Krafera Upgrade Watch",
        description: "Automated AST scanning & monitoring for n8n 3.0 breaking nodes. Use code ALFAZUG20 for 20% off.",
        url: "/go/krafera-upgrade",
        buttonText: "Get Upgrade Watch (20% Off)",
        badge: "n8n 3.0 Safety",
        isPartner: true
    },
    'krafera-watchtower': {
        title: "Krafera Silent Failure Watch",
        description: "Continuous telemetry & watchtower alert pack to catch silent execution dropouts in production n8n workflows.",
        url: "/go/krafera-watchtower",
        buttonText: "Get Watchtower Pack",
        badge: "n8n Telemetry",
        isPartner: true
    }
};

const AffiliateCard = ({ data, id, index = 0 }) => (
    <Link 
        href={data.url} 
        target="_blank" 
        rel="noopener noreferrer sponsored" 
        key={id} 
        style={{ animationDelay: `${index * 150}ms` }}
        className="animate-in fade-in zoom-in-[0.98] duration-700 fill-mode-both bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-none hover:border-teal-500/50 hover:shadow-2xl transition-all group overflow-hidden relative block flex flex-col justify-between h-full"
    >
        <div>
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="mb-6 relative z-10">
                <span className="inline-block px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                    {data.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{data.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{data.description}</p>
            </div>
        </div>

        <div className="mt-auto relative z-10 flex flex-col gap-3">
            <span className="inline-flex items-center text-teal-400 text-sm font-bold group-hover:text-teal-300 transition-colors">
                {data.buttonText} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </span>

            {/* Trust Badges */}
            <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium tracking-wide">
                <span className="flex items-center gap-1 group-hover:text-slate-400 transition-colors">
                    <ShieldCheck size={12} className="text-teal-500/50" /> Secure Link
                </span>
                {data.isPartner ? (
                    <span className="flex items-center gap-1 group-hover:text-slate-400 transition-colors">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="text-yellow-500/50 fill-yellow-500/50" />)}
                        </div>
                        Verified Partner
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-slate-400 tracking-wider">
                        Architecture Stack
                    </span>
                )}
            </div>
        </div>
    </Link>
);

export default function DeployingTheStacks({ affiliates = [] }) {
    // Determine Primary (explicitly requested) Affiliates with normalization
    const primaryKeys = affiliates
        .map(k => normalizeAffiliateKey(k))
        .filter(k => AFFILIATE_DATA[k]);

    // Determine Secondary (all other) Affiliates
    const allKeys = Object.keys(AFFILIATE_DATA);
    const secondaryKeys = allKeys.filter(k => !primaryKeys.includes(k)).slice(0, 3);

    if (primaryKeys.length === 0 && secondaryKeys.length === 0) return null;

    return (
        <section className="mt-10 pt-10 border-t border-white/10 relative">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-teal-900/5 to-transparent -z-10 pointer-events-none" />

            {/* Primary Section */}
            {primaryKeys.length > 0 && (
                <div className="mb-16 relative z-10">
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight relative z-10">Core Deployment Stack</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl relative z-10">
                        To build this exact architecture in production, you will need the core infrastructure. I strictly use and recommend the following enterprise-grade platforms.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {primaryKeys.map((key, index) => <AffiliateCard key={key} id={key} data={AFFILIATE_DATA[key]} index={index} />)}
                    </div>
                </div>
            )}

            {/* Secondary Section */}
            {secondaryKeys.length > 0 && (
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 tracking-tight border-b border-slate-200 dark:border-white/5 pb-4">Complementary RevOps Toolchain</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {secondaryKeys.map((key, index) => <AffiliateCard key={key} id={key} data={AFFILIATE_DATA[key]} index={index} />)}
                    </div>
                </div>
            )}
        </section>
    );
}
