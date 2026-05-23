'use client';

import { useState } from 'react';
import { Loader2, Check, Send } from 'lucide-react';

export default function NewsletterForm({ source = 'Newsletter' }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: source
                })
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="w-full py-4 bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 dark:border-green-500/30 rounded-xl text-green-700 dark:text-green-300 font-bold flex items-center justify-center gap-2 animate-in fade-in zoom-in">
                <Check size={20} />
                <span>Subscribed protocol verified!</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubscribe} className="space-y-4 w-full">
            <input
                type="email"
                placeholder="Secure connection email..."
                required
                className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 shadow-inner transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-teal-600 dark:bg-blue-600 hover:bg-teal-500 dark:hover:bg-blue-500 text-white font-black uppercase tracking-tight rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 dark:shadow-blue-500/20 hover:shadow-teal-500/40 dark:hover:shadow-blue-500/40"
            >
                {status === 'loading' ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <>
                        <span>Verify & Subscribe</span>
                        <Send size={18} className="translate-y-px" />
                    </>
                )}
            </button>
            {status === 'error' && (
                <p className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-wider text-center mt-2">Protocol failed. Retransmit data.</p>
            )}
        </form>
    );
}
