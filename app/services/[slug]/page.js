import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ContactForm from '../../../components/ContactForm';
import { 
    ArrowRight, 
    CheckCircle2, 
    ExternalLink, 
    Clock, 
    CreditCard, 
    Users, 
    AlertTriangle, 
    Workflow, 
    ClipboardList, 
    HelpCircle, 
    ShieldCheck 
} from 'lucide-react';
import { serviceData } from '../../../lib/serviceData';
import { getSanityPosts } from '@/lib/sanity.client';

export const dynamicParams = false;

export async function generateStaticParams() {
    return Object.keys(serviceData).map((slug) => ({ slug }));
}

export const generateMetadata = async ({ params }) => {
    const { slug } = await params;
    const service = serviceData[slug];
    if (!service) return { title: 'Service Not Found' };

    const pageTitle = service.metaTitle || `${service.title} | whoisalfaz`;
    const description = service.metaDescription || service.subtitle;

    return {
        title: pageTitle,
        description: description,
        alternates: {
            canonical: `https://whoisalfaz.me/services/${slug}/`,
        },
        openGraph: {
            title: pageTitle,
            description: description,
            url: `https://whoisalfaz.me/services/${slug}/`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: description,
        }
    };
};

// Service-to-case-study mapping
const serviceCaseStudyMap = {
    'n8n-automation': ['case-study-cashops-financial-dashboard', 'case-study-careerops-ai-resume-builder'],
    'seo-organic-growth': ['case-study-whoisalfaz-seo-indexing-engine'],
    'technical-seo': ['case-study-whoisalfaz-seo-indexing-engine'],
    'custom-full-stack': ['case-study-cashops-financial-dashboard', 'case-study-urban-cafe-foodtech-platform', 'case-study-veloryc-premium-ecommerce'],
};

function renderFormattedParagraph(text) {
    if (!text || typeof text !== 'string') return text;
    const parts = [];
    const regex = /\[(.*?)\]\((.*?)\)|\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        if (match[1] && match[2]) {
            parts.push(
                <Link
                    key={match.index}
                    href={match[2]}
                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline transition-colors"
                >
                    {match[1]}
                </Link>
            );
        } else if (match[3]) {
            parts.push(<strong key={match.index} className="font-bold text-slate-900 dark:text-white">{match[3]}</strong>);
        }
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}

export default async function ServiceDetailPage({ params }) {
    const { slug } = await params;
    const service = serviceData[slug];

    if (!service) {
        notFound();
    }

    const allPosts = await getSanityPosts();
    const relatedCaseStudies = (serviceCaseStudyMap[slug] || [])
        .map(csSlug => allPosts.find(p => p.slug.current === csSlug))
        .filter(Boolean)
        .slice(0, 3);

    const { 
        title, 
        subtitle, 
        themeColor, 
        icon: Icon, 
        detailedContent, 
        features, 
        contactOption, 
        price,
        priceLabel = "Starting at",
        timeline,
        paymentTerms,
        targetAudience,
        problemStatement,
        deliverables,
        processSteps,
        buyerRequirements,
        faqs
    } = service;

    const schemaData = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": title,
            "description": service.metaDescription || subtitle,
            "serviceType": title,
            "provider": {
                "@type": "Person",
                "name": "Alfaz Mahmud Rizve",
                "url": "https://whoisalfaz.me",
                "jobTitle": "GTM & RevOps Architect"
            },
            "url": `https://whoisalfaz.me/services/${slug}/`,
            "areaServed": "Worldwide",
            "offers": {
                "@type": "Offer",
                "price": price.replace(/[^0-9.]/g, ''),
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": price.replace(/[^0-9.]/g, ''),
                    "priceCurrency": "USD"
                }
            }
        }
    ];

    if (faqs && faqs.length > 0) {
        schemaData.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        });
    }

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* STRUCTURED DATA — Service & FAQPage Rich Result Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50 dark:from-transparent dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-20 transition-colors duration-300" />

            {/* Dynamic Background Gradient */}
            <div
                className="fixed inset-0 -z-10 opacity-[0.05] dark:opacity-20 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(ellipse at top right, ${themeColor} 0%, transparent 70%)`
                }}
            />

            <div className="max-w-6xl mx-auto">
                <Link href="/services/" className="inline-flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors mb-12 text-xs">
                    <ArrowRight className="rotate-180" size={16} /> Back to Services
                </Link>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* LEFT CONTENT — 7 COLUMNS */}
                    <div className="lg:col-span-7 space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                        {/* HERO HEADER */}
                        <div>
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10"
                                style={{
                                    backgroundColor: `color-mix(in srgb, ${themeColor} 10%, transparent)`,
                                    color: themeColor
                                }}
                            >
                                <Icon size={32} />
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
                                {title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <div className="inline-block px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
                                    {priceLabel} <span style={{ color: themeColor }}>{price}</span>
                                </div>
                                {timeline && (
                                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs font-bold text-slate-600 dark:text-slate-300">
                                        <Clock size={14} style={{ color: themeColor }} />
                                        <span>{timeline}</span>
                                    </div>
                                )}
                            </div>

                            <p
                                className="text-base md:text-lg font-bold leading-relaxed mb-6"
                                style={{ color: themeColor }}
                            >
                                {subtitle}
                            </p>

                            {/* DETAILED OVERVIEW PROSE */}
                            <div className="prose prose-slate dark:prose-invert prose-sm max-w-none">
                                {detailedContent ? (
                                    detailedContent.map((paragraph, index) => (
                                        <p key={index} className="mb-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                            {renderFormattedParagraph(paragraph)}
                                        </p>
                                    ))
                                ) : null}
                            </div>
                        </div>

                        {/* WHO IT IS FOR & THE PROBLEM */}
                        {(targetAudience || problemStatement) && (
                            <div className="grid sm:grid-cols-2 gap-6">
                                {targetAudience && (
                                    <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                                        <div className="flex items-center gap-2.5 mb-3 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">
                                            <Users size={16} style={{ color: themeColor }} />
                                            <span>Who It Is For</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed">
                                            {targetAudience}
                                        </p>
                                    </div>
                                )}
                                {problemStatement && (
                                    <div className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                                        <div className="flex items-center gap-2.5 mb-3 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">
                                            <AlertTriangle size={16} className="text-amber-500" />
                                            <span>The Operational Challenge</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed">
                                            {problemStatement}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* WHAT IS DELIVERED */}
                        {deliverables && deliverables.length > 0 && (
                            <div className="bg-white dark:bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-white/10 pb-4">
                                    <ShieldCheck size={22} style={{ color: themeColor }} />
                                    <h2 className="text-slate-900 dark:text-white font-black text-lg uppercase tracking-widest">What Is Delivered</h2>
                                </div>
                                <ul className="space-y-4">
                                    {deliverables.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3.5">
                                            <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* 4-STEP EXECUTION FRAMEWORK */}
                        {processSteps && processSteps.length > 0 && (
                            <div className="bg-white dark:bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm">
                                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-white/10 pb-4">
                                    <Workflow size={22} style={{ color: themeColor }} />
                                    <div>
                                        <h2 className="text-slate-900 dark:text-white font-black text-lg uppercase tracking-widest">4-Step Execution Framework</h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Predictable engineering from audit to production</p>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {processSteps.map((step, index) => (
                                        <div key={index} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col">
                                            <span 
                                                className="text-xs font-black uppercase tracking-widest mb-2"
                                                style={{ color: themeColor }}
                                            >
                                                Step {step.number}
                                            </span>
                                            <h3 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-tight mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-medium">
                                                {step.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BUYER PREREQUISITES */}
                        {buyerRequirements && buyerRequirements.length > 0 && (
                            <div className="bg-white dark:bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-white/10 pb-4">
                                    <ClipboardList size={22} style={{ color: themeColor }} />
                                    <div>
                                        <h2 className="text-slate-900 dark:text-white font-black text-lg uppercase tracking-widest">What We Need From You</h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Prerequisites to start your build immediately</p>
                                    </div>
                                </div>
                                <ul className="space-y-3.5">
                                    {buyerRequirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: themeColor }}></span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* FAQS SECTION */}
                        {faqs && faqs.length > 0 && (
                            <div className="bg-white dark:bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm">
                                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-white/10 pb-4">
                                    <HelpCircle size={22} style={{ color: themeColor }} />
                                    <div>
                                        <h2 className="text-slate-900 dark:text-white font-black text-lg uppercase tracking-widest">Frequently Asked Questions</h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Clear answers regarding scope, integrations, and support</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                            <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-2.5">
                                                {faq.question}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* RELATED CASE STUDIES */}
                        {relatedCaseStudies.length > 0 && (
                            <div className="bg-white dark:bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors duration-300">
                                <h3 className="text-slate-900 dark:text-white font-black text-lg mb-2 uppercase tracking-widest border-b border-slate-100 dark:border-white/10 pb-4">See This In Action</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-6">Real-world examples of this architecture in production.</p>
                                <div className="space-y-4">
                                    {relatedCaseStudies.map((cs) => (
                                        <Link key={cs.slug.current} href={`/blog/${cs.slug.current}/`} className="group block">
                                            <article className="flex gap-4 md:gap-6 items-start p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all">
                                                <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                    {cs.image ? (
                                                        <Image src={cs.image} alt={cs.title} fill className="object-cover" />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                            <span className="text-[10px] font-black uppercase">CS</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <span className="px-2.5 py-0.5 bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest rounded-full">Case Study</span>
                                                    </div>
                                                    <h4 className="text-slate-900 dark:text-white font-black text-xs md:text-sm mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">{cs.title}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed">{cs.description}</p>
                                                </div>
                                                <ExternalLink size={16} className="text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 shrink-0 mt-1 transition-colors" />
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/case-studies/" className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                    View All Case Studies <ArrowRight size={14} />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN — 5 COLUMNS (STICKY) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                        {/* COMMERCIAL SPECS CARD */}
                        <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-lg">
                            <h3 className="text-slate-900 dark:text-white font-black text-base mb-6 uppercase tracking-widest border-b border-slate-100 dark:border-white/10 pb-4">
                                Commercial Specifications
                            </h3>
                            <div className="space-y-4 text-xs font-medium">
                                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                        <CreditCard size={14} /> Investment
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-white">{priceLabel} {price}</span>
                                </div>
                                {timeline && (
                                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                            <Clock size={14} /> Timeline
                                        </span>
                                        <span className="font-bold text-slate-900 dark:text-white text-right">{timeline}</span>
                                    </div>
                                )}
                                {paymentTerms && (
                                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                            <CreditCard size={14} /> Payment Terms
                                        </span>
                                        <span className="font-bold text-slate-900 dark:text-white text-right">{paymentTerms}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                        <ShieldCheck size={14} /> Post-Launch Warranty
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-white">30 Days Monitoring</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                        <Clock size={14} /> Timezone & Comms
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-white">UTC+6 (Async-First)</span>
                                </div>
                            </div>
                        </div>

                        {/* FEATURES CHECKLIST CARD */}
                        <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-lg">
                            <h3 className="text-slate-900 dark:text-white font-black text-base mb-6 uppercase tracking-widest border-b border-slate-100 dark:border-white/10 pb-4">Key Capabilities</h3>
                            <ul className="space-y-3.5">
                                {features && features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                                        <span className="text-slate-700 dark:text-slate-300 text-xs font-medium leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CONTACT / DISCOVERY FORM */}
                        {contactOption && (
                            <div>
                                <ContactForm 
                                    initialServiceOfInterest={contactOption} 
                                    source={`service-${slug}`} 
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
