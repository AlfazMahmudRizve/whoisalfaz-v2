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
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name: 'Subscriber',
                    message: 'Newsletter Subscription Request',
                    source: source
                })
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="w-full py-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200 font-bold flex items-center justify-center gap-2 animate-in fade-in zoom-in">
                <Check size={18} />
                <span>Subscribed successfully!</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubscribe} className="space-y-4">
            <input
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                disabled={status === 'loading'}
                className="w-full py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <span>Subscribe Free</span>
                )}
            </button>
            {status === 'error' && (
                <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
            )}
        </form>
    );
}
