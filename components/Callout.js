"use client";
import React from 'react';
import { Brain, Lightbulb, AlertTriangle, Info } from 'lucide-react';

const CALLOUT_TYPES = {
    "Architect's Note": { icon: Brain, border: 'border-teal-500', bg: 'bg-teal-950/20', iconColor: 'text-teal-400', label: "Architect's Note" },
    "Pro Tip": { icon: Lightbulb, border: 'border-emerald-500', bg: 'bg-emerald-950/20', iconColor: 'text-emerald-400', label: 'Pro Tip' },
    "Warning": { icon: AlertTriangle, border: 'border-amber-500', bg: 'bg-amber-950/20', iconColor: 'text-amber-400', label: 'Warning' },
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
        // Default blockquote styling — preserve existing look
        return (
            <blockquote className="border-l-4 border-teal-500 bg-teal-950/20 px-8 py-4 rounded-r-2xl text-slate-200 italic my-8" {...props}>
                {children}
            </blockquote>
        );
    }

    const { type } = detected;
    const Icon = type.icon;

    return (
        <div className={`my-10 border-l-4 ${type.border} ${type.bg} rounded-r-2xl overflow-hidden`}>
            {/* Header */}
            <div className={`flex items-center gap-3 px-6 py-3 ${type.bg} border-b border-white/5`}>
                <Icon size={18} className={type.iconColor} />
                <span className={`text-sm font-bold uppercase tracking-wider ${type.iconColor}`}>{type.label}</span>
            </div>
            {/* Content */}
            <div className="px-6 py-4 text-slate-300 leading-relaxed [&>p]:mb-0 not-italic">
                {children}
            </div>
        </div>
    );
}
