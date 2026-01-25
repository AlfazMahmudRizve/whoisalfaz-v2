'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm({ initialServiceOfInterest = "General Consulting", source = "main-contact-page" }) {
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
            <div className="bg-[#111] border border-white/10 rounded-3xl p-12 shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-center min-h-[500px]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-400" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                    Thanks for reaching out, {formData.name.split(' ')[0]}. I'll get back to you at <span className="text-white">{formData.email}</span> shortly.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-blue-400 hover:text-white transition-colors underline decoration-blue-500/30 underline-offset-4"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div id="contact-form" className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <h2 className="text-2xl font-bold text-white mb-6">Send a message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Alfaz Mahmud Rizve"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="contact@whoisalfaz.me"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Service Interest</label>
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-[#1e293b] [&>option]:text-white"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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
                    <textarea
                        rows={5}
                        required
                        placeholder="Tell me about your project, timeline, and goals..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                </div>

                {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle size={16} className="text-red-400" />
                        Something went wrong. Please try again or email directly.
                    </div>
                )}

                <button
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <span>Send Message</span>
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <p className="text-center text-slate-500 text-xs mt-4">
                    I respect your privacy. No spam, ever.
                </p>
            </form>
        </div>
    );
}
