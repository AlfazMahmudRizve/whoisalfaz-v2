'use client';

import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons() {
    const [copied, setCopied] = useState(false);

    const getUrl = () => typeof window !== 'undefined' ? window.location.href : '';
    const getTitle = () => typeof document !== 'undefined' ? document.title : '';

    const shareTwitter = () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(getTitle())}`;
        window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420');
    };

    const shareLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`;
        window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420');
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(getUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const input = document.createElement('input');
            input.value = getUrl();
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const btnClass = "flex items-center justify-center gap-3 w-full py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm dark:shadow-none";

    return (
        <div className="flex flex-col gap-3">
            <button onClick={shareTwitter} className={btnClass}>
                <Twitter size={14} className="text-blue-400" />
                <span>Twitter</span>
            </button>
            <button onClick={shareLinkedIn} className={btnClass}>
                <Linkedin size={14} className="text-blue-600" />
                <span>LinkedIn</span>
            </button>
            <button onClick={copyLink} className={btnClass}>
                {copied ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} className="text-purple-500" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
        </div>
    );
}
