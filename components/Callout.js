"use client";
import React from 'react';
import { Brain, Lightbulb, AlertTriangle } from 'lucide-react';

const CALLOUT_TYPES = {
    "Architect's Note": { icon: Brain, border: 'border-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/20', iconColor: 'text-teal-600 dark:text-teal-400', label: "Architect's Note" },
    "Pro Tip": { icon: Lightbulb, border: 'border-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20', iconColor: 'text-emerald-600 dark:text-emerald-400', label: 'Pro Tip' },
    "Warning": { icon: AlertTriangle, border: 'border-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20', iconColor: 'text-amber-600 dark:text-amber-400', label: 'Warning' },
};

function detectType(children) {
    const text = extractText(children);
    for (const keyword of Object.keys(CALLOUT_TYPES)) {
        if (text.startsWith(keyword + ':') || text.startsWith(keyword + ':')) {
            return { type: CALLOUT_TYPES[keyword], keyword };
        }
    }
    return null;
}

function extractText(node) {
    if (typeof node === 'string') return node.trim();
    if (Array.isArray(node)) return node.map(extractText).join('').trim();
    if (React.isValidElement(node) && node.props?.children) return extractText(node.props.children);
    return '';
}

export default function Callout({ children, ...props }) {
    const detected = detectType(children);

    if (!detected) {
        // Default blockquote styling with light/dark contrast and prominent link styling
        return (
            <blockquote className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-950/20 px-8 py-5 rounded-r-2xl text-slate-700 dark:text-slate-200 italic my-8 [&_a]:text-teal-600 dark:[&_a]:text-teal-400 [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-2 [&_a]:decoration-teal-500 hover:[&_a]:text-teal-700 dark:hover:[&_a]:text-teal-300 [&_a]:bg-teal-500/15 dark:[&_a]:bg-teal-400/20 [&_a]:px-1.5 [&_a]:py-0.5 [&_a]:rounded not-italic [&_a]:transition-colors" {...props}>
                {children}
            </blockquote>
        );
    }

    const { type } = detected;
    const Icon = type.icon;

    return (
        <div className={`my-10 border-l-4 ${type.border} ${type.bg} rounded-r-2xl overflow-hidden shadow-sm`}>
            {/* Header */}
            <div className={`flex items-center gap-3 px-6 py-3 ${type.bg} border-b border-slate-200/50 dark:border-white/5`}>
                <Icon size={18} className={type.iconColor} />
                <span className={`text-sm font-bold uppercase tracking-wider ${type.iconColor}`}>{type.label}</span>
            </div>
            {/* Content */}
            <div className="px-6 py-4 text-slate-700 dark:text-slate-300 leading-relaxed [&>p]:mb-0 not-italic [&_a]:text-teal-600 dark:[&_a]:text-teal-400 [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-2 [&_a]:decoration-teal-500 hover:[&_a]:text-teal-700 dark:hover:[&_a]:text-teal-300 [&_a]:bg-teal-500/15 dark:[&_a]:bg-teal-400/20 [&_a]:px-1.5 [&_a]:py-0.5 [&_a]:rounded [&_a]:transition-colors">
                {children}
            </div>
        </div>
    );
}
