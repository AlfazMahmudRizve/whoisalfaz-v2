import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Video, Users, CheckCircle } from 'lucide-react';

export default function ManyChatSummitBanner({
  title = "Instagram Summit by ManyChat: The 2026 Growth Blueprint",
  description = "Join 15,000+ top marketing agencies, e-commerce brand owners, and automation architects to master the latest Instagram DM automation funnels, AI voice agents, and Meta-compliant lead capture.",
  referralUrl = "https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack"
}) {
  return (
    <aside className="my-10 relative overflow-hidden rounded-2xl border border-purple-500/30 dark:border-purple-500/20 bg-gradient-to-br from-purple-50/80 via-white to-teal-50/50 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-teal-950/20 p-6 md:p-8 shadow-xl shadow-purple-500/5 backdrop-blur-md">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-bl from-purple-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Official ManyChat Event
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <Video className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Virtual Masterclass Access
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-teal-500" /> Live AI Bot Teardowns
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-teal-500" /> Agency Scale Frameworks
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-teal-500" /> Full Replay Access
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto shrink-0">
          <a
            href={referralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 hover:from-purple-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            <span>Claim Virtual Summit Pass</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="text-[11px] text-center text-slate-500 dark:text-slate-400">
            Instant ticket confirmation via ManyChat
          </span>
        </div>
      </div>
    </aside>
  );
}
