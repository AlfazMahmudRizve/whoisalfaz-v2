'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';

export default function PlacementRequestForm() {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyUrl: '',
        placementType: 'Sponsored Technical Guide & Blueprint ($450-$650)',
        budget: '',
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
                    service: formData.placementType,
                    message: `[PLACEMENT REQUEST]\nCompany URL: ${formData.companyUrl}\nBudget: ${formData.budget}\nPlacement Type: ${formData.placementType}\n\n${formData.message}`,
                    source: 'partnerships'
                })
            });

            if (res.ok) {
                setStatus('success');
                setFormData(prev => ({ ...prev, message: '', companyUrl: '', budget: '' }));
            } else {
                throw new Error('Failed');
            }
        } catch {
            setStatus('error');
        }
    };

    const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all";
    const labelClass = "text-xs font-black text-slate-400 uppercase tracking-widest ml-1";

    if (status === 'success') {
        return (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                    <CheckCircle className="text-green-400" size={40} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Request Received</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                    I review all placement requests within 24 hours. If your site and niche qualify, I&apos;ll reply with available inventory and turnaround.
                </p>
                <button onClick={() => setStatus('idle')} className="px-6 py-3 rounded-xl bg-white/5 text-teal-400 font-bold hover:bg-white/10 transition-colors uppercase tracking-tight text-sm">
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <div id="placement-form" className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500"></div>

            <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={20} className="text-teal-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Vetted Submissions Only</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">Submit a Placement Request</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className={labelClass}>Your Name</label>
                        <input type="text" required placeholder="Jane Smith" className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelClass}>Email Address</label>
                        <input type="email" required placeholder="jane@company.com" className={inputClass} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className={labelClass}>Company / Product URL *</label>
                        <input type="url" required placeholder="https://your-saas.com" className={inputClass} value={formData.companyUrl} onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelClass}>Budget Range *</label>
                        <div className="relative">
                            <select required className={`${inputClass} appearance-none font-medium [&>option]:bg-[#1e293b] [&>option]:text-white`} value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}>
                                <option value="" disabled>Select your budget</option>
                                <option value="$100-$180 (Link Placement)">$100-$180 (Link Placement)</option>
                                <option value="$250-$350 (Comparison Feature)">$250-$350 (Comparison Feature)</option>
                                <option value="$450-$650 (Sponsored Guide & Blueprint)">$450-$650 (Sponsored Guide & Blueprint)</option>
                                <option value="$950-$1,400 (360° Multichannel Bundle)">$950-$1,400 (360° Multichannel Bundle)</option>
                                <option value="Hybrid (Base Fee + Performance CPA)">Hybrid (Base Fee + Performance CPA)</option>
                                <option value="$1,500+ (Custom Enterprise Integration)">$1,500+ (Custom Enterprise Integration)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={labelClass}>Placement Type</label>
                    <div className="relative">
                        <select className={`${inputClass} appearance-none font-medium [&>option]:bg-[#1e293b] [&>option]:text-white`} value={formData.placementType} onChange={(e) => setFormData({ ...formData, placementType: e.target.value })}>
                            <option value="Sponsored Technical Guide & Blueprint ($450-$650)">Sponsored Technical Guide & Blueprint ($450-$650)</option>
                            <option value="Contextual Link Placement ($100-$180)">Contextual Link Placement ($100-$180)</option>
                            <option value="SaaS Comparison & Alternatives Feature ($250-$350)">SaaS Comparison & Alternatives Feature ($250-$350)</option>
                            <option value="360° Multichannel Launch Bundle ($950-$1,400)">360° Multichannel Launch Bundle ($950-$1,400)</option>
                            <option value="Hybrid Partnership (Base Fee + CPA / Rev-Share)">Hybrid Partnership (Base Fee + CPA / Rev-Share)</option>
                            <option value="Custom Technical Partnership">Custom Technical Partnership</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={labelClass}>Additional Details</label>
                    <textarea rows={4} placeholder="Describe your product, target keywords, and any specific content you'd like the link placed in..." className={`${inputClass} resize-none`} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>

                {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-300 font-bold uppercase tracking-tight p-4 rounded-xl flex items-center justify-center gap-2 text-sm">
                        <AlertCircle size={18} /> Submission failed. Please try again.
                    </div>
                )}

                <button disabled={status === 'loading'} className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1">
                    {status === 'loading' ? (
                        <><Loader2 size={20} className="animate-spin" /><span>Submitting...</span></>
                    ) : (
                        <><span>Submit Request</span><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                </button>

                <p className="text-center text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">
                    Casino · Crypto · CBD · Generic AI Wrappers → Auto-rejected
                </p>
            </form>
        </div>
    );
}
