import Link from 'next/link';
import { Mail, MessageSquare, Facebook, Linkedin, Instagram } from 'lucide-react';
import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT: TEXT & INFO */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        <span className="block text-slate-400 text-xl font-medium mb-2">Let's talk growth</span>
                        Ready to automate your <span className="text-blue-500">Agency scale?</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                        Whether you need a custom n8n workflow, a full technical SEO audit, or just want to chat about potential bottlenecks, I'm here to help.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 mt-1">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Email Me Directly</h3>
                                <p className="text-slate-400 text-sm mb-2">Typically reply within 24 hours.</p>
                                <a href="mailto:contact@whoisalfaz.me" className="text-blue-400 font-mono hover:underline">contact@whoisalfaz.me</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 mt-1">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Consulting Calls</h3>
                                <p className="text-slate-400 text-sm mb-2">Book a 30-minute discovery session.</p>
                                <Link href="#contact-form" className="text-purple-400 hover:underline">Book availability &rarr;</Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10">
                        <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Connect on Socials</h4>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/" target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/alfaz-mahmud-rizve/" target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/whois.alfaz/" target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>


                {/* RIGHT: FORM */}
                <ContactForm />

            </div>
        </main>
    );
}
