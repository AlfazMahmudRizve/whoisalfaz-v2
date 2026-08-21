import { Sparkles, ArrowRight, Video, CheckCircle, ShieldCheck, Gift, Info, Bot, Zap } from 'lucide-react';

export default function ManyChatSummitBanner({
  title = "Instagram Summit by ManyChat: The Growth Blueprint",
  description = "Join 15,000+ top marketing agencies, e-commerce brand owners, and automation architects to master Instagram DM automation funnels, AI voice agents, and Meta-compliant lead capture.",
  referralUrl = "https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack",
  claimUrl = "/claim-manychat-bonus"
}) {
  return (
    <aside className="my-10 relative overflow-hidden rounded-3xl border border-purple-500/30 dark:border-purple-500/20 bg-gradient-to-br from-purple-50/90 via-white to-teal-50/60 dark:from-purple-950/40 dark:via-slate-900/90 dark:to-teal-950/30 p-6 md:p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-md">
      {/* Decorative Radial Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-bl from-purple-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-teal-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start gap-5 max-w-2xl">
          {/* High-Tech Animated Icon Badge */}
          <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-0.5 shadow-lg shadow-purple-500/30">
            <div className="w-full h-full bg-slate-950/90 backdrop-blur-md rounded-[14px] flex flex-col items-center justify-center text-center p-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-teal-500/20" />
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mb-1 relative z-10" />
              <span className="text-[9px] font-black uppercase tracking-wider text-teal-300 relative z-10">SUMMIT</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Partner Event
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <Video className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                Virtual Masterclass Pass
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <Gift className="w-3 h-3" />
                Includes $147 n8n Bonus Pack
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

            {/* FTC Disclosure */}
            <div className="pt-2 flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              <Info className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Affiliate Disclosure:</strong> When you purchase your pass via our partner link, we receive a commission at no extra cost to you, which unlocks our complimentary n8n Companion Blueprint Pack.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto shrink-0">
          <a
            href={referralUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 hover:from-purple-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            <span>Claim Virtual Summit Pass</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <Link
            href={claimUrl}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline text-center"
          >
            <Gift className="w-3.5 h-3.5" />
            Already bought? Claim $147 Bonus →
          </Link>
        </div>
      </div>
    </aside>
  );
}
