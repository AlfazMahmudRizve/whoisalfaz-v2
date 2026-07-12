import Link from 'next/link';
import { Mail, MessageSquare, Facebook, Linkedin, Instagram } from 'lucide-react';
import ContactForm from '../../components/ContactForm';
import DefaultContentFooter from '../../components/footers/DefaultContentFooter';

export const metadata = {
    title: "Contact Alfaz | RevOps & Automation Consulting",
    description: "Ready to automate your agency scale? Book a strategy call or get a technical SEO audit from Alfaz Mahmud Rizve.",
    alternates: {
        canonical: '/contact/',
    },
    openGraph: {
        title: "Contact Alfaz | RevOps & Automation Consulting",
        description: "Ready to automate your agency scale? Book a strategy call or get a technical SEO audit from Alfaz Mahmud Rizve.",
        url: 'https://whoisalfaz.me/contact/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Contact Alfaz | RevOps & Automation Consulting",
        description: "Ready to automate your agency scale? Book a strategy call or get a technical SEO audit from Alfaz Mahmud Rizve.",
    }
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT: TEXT & INFO */}
                <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight transition-colors duration-300">
                        <span className="block text-teal-600 dark:text-slate-400 text-xl font-bold mb-4 tracking-widest">Let&apos;s talk growth</span>
                        Ready to automate your <span className="text-purple-600 dark:text-blue-500">Agency scale?</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 leading-relaxed transition-colors duration-300">
                        Whether you need a custom self-healing workflow, a full technical SEO audit, or just want to chat about potential bottlenecks, I&apos;m here to build the infrastructure.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-5 group">
                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-blue-500/10 text-teal-600 dark:text-blue-400 flex items-center justify-center border border-slate-200 dark:border-blue-500/20 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-black text-xl tracking-tight uppercase transition-colors duration-300">Direct Protocol</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Typically reply within 24 hours.</p>
                                <a href="mailto:contact@whoisalfaz.me" className="text-teal-600 dark:text-blue-400 font-bold hover:underline transition-colors duration-300">contact@whoisalfaz.me</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group">
                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-slate-200 dark:border-purple-500/20 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-black text-xl tracking-tight uppercase transition-colors duration-300">Consulting Calls</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Book a 30-minute discovery architecture session.</p>
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
                                <a key={i} href={social.href} target="_blank" className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm transition-all hover:-translate-y-1">
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

            {/* SEO CONTENT FOOTER */}
            <DefaultContentFooter />
        </main>
    );
}
