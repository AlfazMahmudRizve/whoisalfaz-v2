import { Send } from 'lucide-react';

export default function ContactForm({ initialServiceOfInterest = "General Consulting" }) {
    return (
        <div id="contact-form" className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <h2 className="text-2xl font-bold text-white mb-6">Send a message</h2>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Name</label>
                        <input type="text" placeholder="Alfaz Mahmud Rizve" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                        <input type="email" placeholder="contact@whoisalfaz.me" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Service Interest</label>
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-[#1e293b] [&>option]:text-white"
                        defaultValue={initialServiceOfInterest}
                    >
                        <option value="n8n Automation Development">n8n Automation Development</option>
                        <option value="Technical SEO Audit">Technical SEO Audit</option>
                        <option value="Headless CMS Architecture">Headless CMS Architecture</option>
                        <option value="General Consulting">General Consulting</option>
                        <option value="UGC Video Ads">UGC Video Ads</option>
                        <option value="Custom AI Prompts">Custom AI Prompts</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Details</label>
                    <textarea rows={5} placeholder="Tell me about your project, timeline, and goals..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group">
                    <span>Send Message</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-slate-500 text-xs mt-4">
                    I respect your privacy. No spam, ever.
                </p>
            </form>
        </div>
    );
}
