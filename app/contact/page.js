import Link from 'next/link';
import { Mail, MessageSquare, Facebook, Linkedin, Instagram, Clock, CheckCircle2, ShieldAlert, HelpCircle } from 'lucide-react';
import ContactForm from '../../components/ContactForm';
import DefaultContentFooter from '../../components/footers/DefaultContentFooter';

export const metadata = {
    title: "Contact Alfaz | RevOps & Automation Consulting",
    description: "Ready to automate your agency scale? Book a strategy call or get a technical SEO audit from Alfaz Mahmud Rizve. Review response SLAs and engagement prerequisites.",
    alternates: {
        canonical: 'https://whoisalfaz.me/contact',
    },
    openGraph: {
        title: "Contact Alfaz | RevOps & Automation Consulting",
        description: "Ready to automate your agency scale? Book a strategy call or get a technical SEO audit from Alfaz Mahmud Rizve.",
        url: 'https://whoisalfaz.me/contact',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Contact Alfaz | RevOps & Automation Consulting",
        description: "Ready to automate your agency scale? Book a strategy call or get a technical SEO audit from Alfaz Mahmud Rizve.",
    }
};

export default function ContactPage() {
    const faqs = [
        {
            q: "What is the typical project timeline for custom RevOps automation?",
            a: "Initial architecture audits take 2-3 business days. Full n8n or full-stack workflow implementations typically range from 1 to 3 weeks depending on API complexity, custom payload transformation, and staging requirements."
        },
        {
            q: "How are API credentials and enterprise data secured?",
            a: "All credentials are encrypted at rest using AES-256 bits within isolated environment vars. Workflows run on self-hosted, SOC2/GDPR-compliant infrastructure without exposing client data payloads to untrusted third parties."
        },
        {
            q: "What are your engagement prerequisites before starting a build?",
            a: "We require access to Sandbox/Staging API keys, clear process flowcharts or step-by-step documentation of current manual bottlenecks, and a designated internal technical point-of-contact."
        },
        {
            q: "Do you offer post-deployment maintenance and monitoring SLAs?",
            a: "Yes. Every client deployment includes a 30-day post-launch warranty with automated error tracking alerts, webhook retry monitoring, and rapid patch deployment guarantees."
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

                {/* LEFT: TEXT & INFO */}
                <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight transition-colors duration-300">
                        <span className="block text-teal-600 dark:text-slate-400 text-xl font-bold mb-4 tracking-widest">Let&apos;s talk growth</span>
                        Ready to automate your <span className="text-purple-600 dark:text-blue-500">Agency scale?</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 leading-relaxed transition-colors duration-300">
                        Whether you need a custom self-healing workflow, a full technical SEO audit, or just want to eliminate manual data entry bottlenecks across your agency tech stack, I&apos;m ready to architect your backend solution.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-5 group">
                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-blue-500/10 text-teal-600 dark:text-blue-400 flex items-center justify-center border border-slate-200 dark:border-blue-500/20 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-black text-xl tracking-tight uppercase transition-colors duration-300">Direct Protocol</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Guaranteed reply within 24 business hours.</p>
                                <a href="mailto:contact@whoisalfaz.me" className="text-teal-600 dark:text-blue-400 font-bold hover:underline transition-colors duration-300">contact@whoisalfaz.me</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group">
                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-slate-200 dark:border-purple-500/20 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-black text-xl tracking-tight uppercase transition-colors duration-300">Consulting Calls</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Book a 30-minute deep-dive architecture session.</p>
                                <Link href="#contact-form" className="text-purple-600 dark:text-purple-400 font-bold hover:underline transition-colors duration-300">Book availability &rarr;</Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
                        <h4 className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-6">Connect on Socials</h4>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: "https://facebook.com/alfazmahmudrizve" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/alfaz-mahmud-rizve/" },
                                { icon: Instagram, href: "https://www.instagram.com/whois.alfaz/" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm transition-all hover:-translate-y-1">
                                    <social.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-150 fill-mode-both">
                    <ContactForm source="contact" />
                </div>

            </div>

            {/* PREREQUISITES & SLA SECTION */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                            <CheckCircle2 size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Engagement Prerequisites</h3>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                        To ensure high execution speed and maximum return on your strategy call, please ensure your team has prepared:
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm">
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                            <span>Detailed breakdown of current manual workflow steps and time sinks.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                            <span>List of SaaS tools, databases, and APIs involved (e.g. HubSpot, Brevo, PostgreSQL).</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                            <span>Target KPI benchmarks (e.g. lead latency target, monthly time savings target).</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Response SLAs & Standards</h3>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                        Operational transparency is built directly into our client communication guidelines:
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm">
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                            <span><strong>Standard Inquiry SLA:</strong> Initial response within 24 business hours (Monday–Friday).</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                            <span><strong>Audit Delivery SLA:</strong> Complete technical audit document generated within 72 hours.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                            <span><strong>Active Client Emergency SLA:</strong> Sub-2 hour response for critical workflow outages.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-2.5 bg-teal-500/10 rounded-xl text-teal-600 dark:text-teal-400 mb-4">
                        <HelpCircle size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-slate-900 dark:text-white font-bold text-base mb-3 flex items-start gap-2">
                                <span className="text-teal-600 dark:text-teal-400 font-mono text-sm">Q:</span> {faq.q}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEO CONTENT FOOTER */}
            <DefaultContentFooter />
        </main>
    );
}

