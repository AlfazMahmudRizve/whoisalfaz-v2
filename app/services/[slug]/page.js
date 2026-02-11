
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactForm from '../../../components/ContactForm';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { serviceData } from '../../../lib/serviceData';

export const generateMetadata = async ({ params }) => {
    const { slug } = await params;
    const service = serviceData[slug];
    if (!service) return { title: 'Service Not Found' };

    return {
        title: `${service.title} | Services`,
        description: service.subtitle
    };
}

export default async function ServiceDetailPage({ params }) {
    const { slug } = await params;
    let service = serviceData[slug];

    if (!service) {
        notFound();
    }

    const { title, subtitle, themeColor, icon: Icon, detailedContent, features, contactOption, price } = service;

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />

            {/* Dynamic Background Gradient */}
            <div
                className="fixed inset-0 -z-10 opacity-20"
                style={{
                    background: `radial-gradient(ellipse at top right, ${themeColor} 0%, #0a0a0a 70%)`
                }}
            />

            <div className="max-w-6xl mx-auto">
                <Link href="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 text-sm">
                    <ArrowRight className="rotate-180" size={16} /> Back to Services
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <div>
                        <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm"
                            style={{
                                backgroundColor: `${themeColor}1a`, // 10% opacity
                                borderColor: `${themeColor}33`, // 20% opacity
                                borderWidth: '1px',
                                color: themeColor
                            }}
                        >
                            <Icon size={32} />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {title}
                        </h1>

                        <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xl font-bold text-white mb-6">
                            Starting at <span style={{ color: themeColor }}>{price}</span>
                        </div>

                        <h2
                            className="text-xl font-medium mb-12"
                            style={{ color: themeColor }}
                        >
                            {subtitle}
                        </h2>

                        <div className="prose prose-invert prose-lg mb-12">
                            {detailedContent ? (
                                detailedContent.map((paragraph, index) => (
                                    <p key={index} className="text-slate-400 leading-relaxed text-lg mb-6">
                                        {paragraph}
                                    </p>
                                ))
                            ) : (
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    Service description unavailable.
                                </p>
                            )}
                        </div>

                        <div className="mb-12">
                            <h3 className="text-white font-bold text-xl mb-6">What's Included:</h3>
                            <ul className="space-y-4">
                                {features?.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2 size={20} className="shrink-0 mt-1" style={{ color: themeColor }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT CONTENT (CONTACT FORM) */}
                    <div className="lg:sticky lg:top-32">
                        <div className="relative">
                            {/* Decorative Glow */}
                            <div
                                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                                style={{
                                    backgroundColor: themeColor,
                                    opacity: 0.2
                                }}
                            ></div>

                            <h3 className="text-white font-bold text-xl mb-2 relative z-10 pl-2">Get Started</h3>
                            <p className="text-slate-400 text-sm mb-6 relative z-10 pl-2">
                                Ready to scale with <span style={{ color: themeColor }}>{title}</span>? Fill out the form below.
                            </p>

                            <div className="relative z-10">
                                <ContactForm initialServiceOfInterest={contactOption} source={`service-${slug}`} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
