'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm({ initialServiceOfInterest = "General Consulting", source = "contact" }) {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: initialServiceOfInterest,
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    service: formData.service,
                    message: formData.message,
                    source: source
                })
            });

            if (res.ok) {
                setStatus('success');
                setFormData(prev => ({ ...prev, message: '' })); // Clear message but keep name/email
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-center min-h-[500px] transition-colors duration-300">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500"></div>
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20">
                    <CheckCircle className="text-green-500 dark:text-green-400" size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Transmission Secured</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 font-medium">
                    Protocol verified, {formData.name.split(' ')[0]}. I&apos;ll route a response to <span className="text-slate-900 dark:text-white font-bold">{formData.email}</span> within 24 hours.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-teal-600 dark:text-blue-400 font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors uppercase tracking-tight text-sm"
                >
                    Initiate new sequence
                </button>
            </div>
        );
    }

    return (
        <div id="contact-form" className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] p-10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
            {/* Decorative Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500"></div>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tight uppercase">Initialize Project</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Alfaz Mahmud Rizve"
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 focus:border-teal-500/50 dark:focus:border-blue-500/50 transition-all shadow-inner"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="contact@whoisalfaz.me"
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 focus:border-teal-500/50 dark:focus:border-blue-500/50 transition-all shadow-inner"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Architecture Requested</label>
                    <div className="relative">
                        <select
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 focus:border-teal-500/50 dark:focus:border-blue-500/50 transition-all shadow-inner appearance-none font-medium [&>option]:bg-white dark:[&>option]:bg-[#1e293b] [&>option]:text-slate-900 dark:[&>option]:text-white"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                            <option value="Custom Workflow Automation">Custom Workflow Automation</option>
                            <option value="Technical SEO Audit">Technical SEO Audit</option>
                            <option value="Headless CMS Architecture">Headless CMS Architecture</option>
                            <option value="Custom App Development">Custom App Development</option>
                            <option value="General Consulting">General Consulting</option>
                            <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Operational Requirements</label>
                    <textarea
                        rows={5}
                        required
                        placeholder="Detail your exact requirements, bottlenecks, and timeline..."
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 focus:border-teal-500/50 dark:focus:border-blue-500/50 transition-all resize-none shadow-inner"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                </div>

                {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 font-bold uppercase tracking-tight p-4 rounded-xl flex items-center justify-center gap-2 text-sm">
                        <AlertCircle size={18} />
                        Transmission Failure. Retransmit manually.
                    </div>
                )}

                <button
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-slate-900 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-500 hover:bg-slate-800 dark:hover:from-blue-500 dark:hover:to-blue-400 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-slate-900/20 dark:shadow-blue-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>Encrypting...</span>
                        </>
                    ) : (
                        <>
                            <span>Transmit Protocol</span>
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>

                <p className="text-center text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-6">
                    End-to-end encrypted. Zero spam tolerance.
                </p>
            </form>
        </div>
    );
}
