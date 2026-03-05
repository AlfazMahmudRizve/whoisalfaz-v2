import Link from 'next/link';
import { ShieldCheck, Star } from 'lucide-react';

const AFFILIATE_DATA = {
    n8n: {
        title: "n8n Cloud",
        description: "The most powerful fair-code automation platform. Get 20% off your first year on any paid plan.",
        url: "https://n8n.partnerlinks.io/8qovl1a3y7q6",
        buttonText: "Claim n8n Discount",
        badge: "Infrastructure"
    },
    vultr: {
        title: "Vultr High-Performance VPS",
        description: "Deploy self-hosted instances worldwide with enterprise NVMe storage. Get $300 in free credit.",
        url: "https://www.vultr.com/?ref=9530510-8H",
        buttonText: "Claim $300 Vultr Credit",
        badge: "Compute"
    },
    brevo: {
        title: "Brevo (formerly Sendinblue)",
        description: "Enterprise-grade email API and marketing automation. Excellent SMTP for n8n.",
        url: "https://get.brevo.com/60gns0w2n9o1",
        buttonText: "Try Brevo Free",
        badge: "Email/SMTP"
    },
    pinecone: {
        title: "Pinecone Vector Database",
        description: "The vector database for building AI applications. Essential for RAG architectures.",
        url: "https://try.pinecone.io/ra3cq48xakg6",
        buttonText: "Start Building with Pinecone",
        badge: "Vector DB"
    },
    apollo: {
        title: "Apollo.io",
        description: "The ultimate B2B database and sales engagement platform for lead generation.",
        url: "https://apollo.grsm.io/s3jmtpdx8g1s",
        buttonText: "Try Apollo Free",
        badge: "Lead Gen"
    },
    databox: {
        title: "Databox",
        description: "Business analytics platform to build and share custom dashboards.",
        url: "https://databox.com/?a=AlfazMahmudRizve",
        buttonText: "Start Visualizing Data",
        badge: "Analytics"
    },
    monday: {
        title: "Monday.com",
        description: "The Work OS that lets you shape workflows, your way. Perfect for team scale.",
        url: "https://try.monday.com/66vrkkiezhrz",
        buttonText: "Try Monday.com",
        badge: "Work OS"
    },
    turbotic: {
        title: "Turbotic",
        description: "Enterprise automation optimization and orchestration tracking system.",
        url: "https://try.turbotic.com/2xu9cie2qj39",
        buttonText: "Explore Turbotic",
        badge: "Orchestration"
    },
    cometchat: {
        title: "CometChat",
        description: "Developer-first in-app messaging and voice/video calling APIs.",
        url: "https://try.cometchat.com/r4j3p5y2c9mn",
        buttonText: "Integrate CometChat",
        badge: "Comms API"
    },
    adcreative: {
        title: "AdCreative.ai",
        description: "Generate conversion-focused ad creatives and social media post designs in seconds.",
        url: "https://free-trial.adcreative.ai/78ye4zckgmez",
        buttonText: "Try AdCreative Free",
        badge: "AI Design"
    },
    elevenlabs: {
        title: "ElevenLabs",
        description: "The most realistic text-to-speech and voice cloning software.",
        url: "https://try.elevenlabs.io/vde8vlnbokq4",
        buttonText: "Try ElevenLabs",
        badge: "Voice AI"
    },
    emergent: {
        title: "Emergent",
        description: "AI-powered revenue operations platform for scaling B2B growth.",
        url: "https://get.emergent.sh/f7yhqncomeyr",
        buttonText: "Try Emergent",
        badge: "RevOps AI"
    },
    tapstitch: {
        title: "Tapstitch",
        description: "Data integration and workflow stitching platform for modern teams.",
        url: "https://affiliate.tapstitch.com/7k2jjtg3dl0f",
        buttonText: "Explore Tapstitch",
        badge: "Integration"
    },
    aisdr: {
        title: "AiSDR",
        description: "AI-powered sales development representative for automated outbound.",
        url: "https://partner.aisdr.com/2jffam3qqf6h",
        buttonText: "Try AiSDR",
        badge: "AI Sales"
    },
    ags: {
        title: "Accelerated Growth Studio",
        description: "Growth engineering and product-led acquisition acceleration platform.",
        url: "https://acceleratedgrowthstudio.partnerlinks.io/ferzzxgyi9p3",
        buttonText: "Explore AGS",
        badge: "Growth"
    }
};

const AffiliateCard = ({ data, id }) => (
    <Link href={data.url} target="_blank" rel="noopener noreferrer" key={id} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-teal-500/50 transition-all group overflow-hidden relative block flex flex-col justify-between h-full">
        <div>
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="mb-6 relative z-10">
                <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                    {data.badge}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{data.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-2">{data.description}</p>
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
                <span className="flex items-center gap-1 group-hover:text-slate-400 transition-colors">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="text-yellow-500/50 fill-yellow-500/50" />)}
                    </div>
                    Verified Partner
                </span>
            </div>
        </div>
    </Link>
);

export default function DeployingTheStacks({ affiliates = [] }) {
    // Determine Primary (explicitly requested) Affiliates
    const primaryKeys = affiliates.map(k => k.toLowerCase()).filter(k => AFFILIATE_DATA[k]);

    // Determine Secondary (all other) Affiliates
    const allKeys = Object.keys(AFFILIATE_DATA);
    const secondaryKeys = allKeys.filter(k => !primaryKeys.includes(k));

    if (primaryKeys.length === 0 && secondaryKeys.length === 0) return null;

    return (
        <section className="mt-16 pt-16 border-t border-white/10 relative">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-teal-900/5 to-transparent -z-10 pointer-events-none" />

            {/* Primary Section */}
            {primaryKeys.length > 0 && (
                <div className="mb-16 relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-6 tracking-tight relative z-10">Core Deployment Stack</h3>
                    <p className="text-slate-300 mb-10 leading-relaxed max-w-2xl relative z-10">
                        To build this exact architecture in production, you will need the core infrastructure. I strictly use and recommend the following enterprise-grade platforms.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-10">
                        {primaryKeys.map((key) => <AffiliateCard key={key} id={key} data={AFFILIATE_DATA[key]} />)}
                    </div>
                </div>
            )}

            {/* Secondary Section */}
            {secondaryKeys.length > 0 && (
                <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-slate-200 mb-8 tracking-tight border-b border-white/5 pb-4">Complementary RevOps Toolchain</h4>
                    <div className="grid sm:grid-cols-2 gap-10">
                        {secondaryKeys.map((key) => <AffiliateCard key={key} id={key} data={AFFILIATE_DATA[key]} />)}
                    </div>
                </div>
            )}
        </section>
    );
}
