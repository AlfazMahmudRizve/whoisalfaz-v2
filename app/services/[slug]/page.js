import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ContactForm from '../../../components/ContactForm';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { serviceData } from '../../../lib/serviceData';
import { getAllPosts } from '@/lib/mdx';

export const generateMetadata = async ({ params }) => {
    const { slug } = await params;
    const service = serviceData[slug];
    if (!service) return { title: 'Service Not Found' };

    return {
        title: `${service.title} | Services`,
        description: service.subtitle,
        alternates: {
            canonical: `/services/${slug}/`,
        },
        openGraph: {
            title: `${service.title} | Services`,
            description: service.subtitle,
            url: `https://whoisalfaz.me/services/${slug}/`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} | Services`,
            description: service.subtitle,
        }
    };
}

// Service-to-case-study mapping
const serviceCaseStudyMap = {
    'n8n-automation': ['case-study-cashops-financial-dashboard', 'case-study-careerops-ai-resume-builder'],
    'headless-architecture': ['case-study-cashops-financial-dashboard', 'case-study-urban-cafe-foodtech-platform'],
    'technical-seo': ['case-study-whoisalfaz-seo-indexing-engine'],
    'custom-full-stack': ['case-study-cashops-financial-dashboard', 'case-study-urban-cafe-foodtech-platform', 'case-study-veloryc-premium-ecommerce'],
};

export default async function ServiceDetailPage({ params }) {
    const { slug } = await params;
    let service = serviceData[slug];

    if (!service) {
        notFound();
    }

    const allPosts = await getAllPosts();
    const relatedCaseStudies = (serviceCaseStudyMap[slug] || [])
        .map(csSlug => allPosts.find(p => p.slug === csSlug))
        .filter(Boolean)
        .slice(0, 3);

    const { title, subtitle, themeColor, icon: Icon, detailedContent, features, contactOption, price } = service;

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* SERVICE SCHEMA — Rich Result Signal */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": title,
                    "description": subtitle,
                    "serviceType": title,
                    "provider": {
                        "@type": "Person",
                        "name": "Alfaz Mahmud Rizve",
                        "url": "https://whoisalfaz.me",
                        "jobTitle": "RevOps Architect & Full Stack Automation Engineer"
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
                }) }}
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
                <Link href="/services" className="inline-flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors mb-12 text-xs">
                    <ArrowRight className="rotate-180" size={16} /> Back to Services
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-10 backdrop-blur-sm shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10"
                            style={{
                                backgroundColor: `color-mix(in srgb, ${themeColor} 10%, transparent)`,
                                color: themeColor
                            }}
                        >
                            <Icon size={40} />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight uppercase tracking-tight">
                            {title}
                        </h1>

                        <div className="inline-block px-6 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white mb-8 shadow-sm dark:shadow-none">
                            Starting at <span style={{ color: themeColor }}>{price}</span>
                        </div>

                        <h2
                            className="text-xl md:text-2xl font-bold mb-12 leading-relaxed"
                            style={{ color: themeColor }}
                        >
                            {subtitle}
                        </h2>

                        <div className="prose prose-slate dark:prose-invert prose-lg mb-16 max-w-none">
                            {detailedContent ? (
                                detailedContent.map((paragraph, index) => (
                                    <p key={index} className="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))
                            ) : null}
                        </div>

                        {/* Related Case Studies */}
                        {relatedCaseStudies.length > 0 && (
                            <div className="bg-white dark:bg-[#111] p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors duration-300 mb-16">
                                <h3 className="text-slate-900 dark:text-white font-black text-xl mb-2 uppercase tracking-widest border-b border-slate-100 dark:border-white/10 pb-4">See This In Action</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Real-world examples of this service in production.</p>
                                <div className="space-y-6">
                                    {relatedCaseStudies.map((cs) => (
                                        <Link key={cs.slug} href={`/blog/${cs.slug}/`} className="group block">
                                            <article className="flex gap-6 items-start p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all">
                                                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                    {cs.image ? (
                                                        <Image src={cs.image} alt={cs.title} fill className="object-cover" />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                            <span className="text-[10px] font-black uppercase">CS</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2.5 py-1 bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest rounded-full">Case Study</span>
                                                    </div>
                                                    <h4 className="text-slate-900 dark:text-white font-black text-sm mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">{cs.title}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed">{cs.description}</p>
                                                </div>
                                                <ExternalLink size={16} className="text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 shrink-0 mt-1 transition-colors" />
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/case-studies/" className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                    View All Case Studies <ArrowRight size={14} />
                                </Link>
                            </div>
                        )}

                        {/* LEFT CONTENT END */}
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="lg:sticky lg:top-32 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                        {/* Features List */}
                        <div className="bg-white dark:bg-[#111] p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors duration-300 mb-8">
                            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-8 uppercase tracking-widest border-b border-slate-100 dark:border-white/10 pb-4">What&apos;s Included</h3>
                            <ul className="space-y-5">
                                {features && features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                                        <span className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact CTA Card */}
                        {contactOption && (
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white/10 dark:to-white/5 p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none transition-colors duration-300">
                                <div className="text-center mb-8">
                                    <h3 className="text-white dark:text-slate-900 font-black text-2xl mb-3 uppercase tracking-widest">Ready to Get Started?</h3>
                                    <p className="text-slate-400 dark:text-slate-600 text-sm font-medium leading-relaxed">{contactOption}</p>
                                </div>
                                <ContactForm serviceSlug={slug} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
