'use client';

import { useState } from 'react';
import { Loader2, Check, Send } from 'lucide-react';

export default function NewsletterForm({
  source = 'Newsletter',
  variant = 'default',
  buttonText = 'Subscribe Free',
  placeholder = 'Enter your work email...',
  className = '',
}) {
  const [email, setEmail] = useState('');
  const [hpWebsite, setHpWebsite] = useState('');
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
          source: source,
          hp_website: hpWebsite,
        }),
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
      <div className="w-full py-3.5 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-700 dark:text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 animate-in fade-in zoom-in">
        <Check size={18} className="text-emerald-600 dark:text-emerald-400" />
        <span>You are subscribed! Check your inbox for your first playbook.</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`w-full ${className}`}>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2.5 w-full relative">
          {/* Honeypot field for bot protection */}
          <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
            <input
              type="text"
              name="hp_website"
              tabIndex={-1}
              autoComplete="off"
              value={hpWebsite}
              onChange={(e) => setHpWebsite(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder={placeholder}
            required
            className="w-full sm:flex-1 bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-full px-5 py-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 shadow-xs transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-7 py-3.5 bg-teal-600 hover:bg-teal-700 dark:bg-teal-400 dark:hover:bg-teal-300 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-teal-600/20 shrink-0 cursor-pointer"
          >
            {status === 'loading' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <span>{buttonText}</span>
                <Send size={14} className="translate-y-px" />
              </>
            )}
          </button>
        </form>
        {status === 'error' && (
          <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold text-center mt-2.5">
            Unable to subscribe right now. Please check your email or try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className={`space-y-3.5 w-full relative ${className}`}>
      {/* Honeypot field for bot protection */}
      <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
        <input
          type="text"
          name="hp_website"
          tabIndex={-1}
          autoComplete="off"
          value={hpWebsite}
          onChange={(e) => setHpWebsite(e.target.value)}
        />
      </div>
      <input
        type="email"
        placeholder={placeholder}
        required
        className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 shadow-xs transition-all duration-300 text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 dark:bg-teal-400 dark:hover:bg-teal-300 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-teal-500/20 cursor-pointer"
      >
        {status === 'loading' ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            <span>{buttonText}</span>
            <Send size={16} className="translate-y-px" />
          </>
        )}
      </button>
      {status === 'error' && (
        <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold text-center mt-1">
          Unable to subscribe right now. Please check your email or try again.
        </p>
      )}
    </form>
  );
}
