'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { decodeAuditResult } from '@/lib/audit-share';
import { CheckCircle, AlertTriangle, AlertCircle, Shield, Globe, Zap, Search, Server, Lock, ArrowRight, Copy, Check, type LucideIcon } from 'lucide-react';

const checkIcons: Record<string, LucideIcon> = {
  'Performance & Core Web Vitals': Zap,
  'Meta Tags & Open Graph': Search,
  'SSL Certificate': Lock,
  'Security Headers': Shield,
  'Robots.txt & Sitemap': Globe,
  'DNS & Connectivity': Server,
};

function ScoreRing({ score, size = 140, strokeWidth = 8 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s ease-out' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-slate-900 dark:text-white">{score}</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">/ 100</span>
      </div>
    </div>
  );
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500 dark:text-green-400';
  if (score >= 50) return 'text-amber-500 dark:text-amber-400';
  return 'text-red-500 dark:text-red-400';
};

const getStatusBg = (status: string) => {
  if (status === 'pass') return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
  if (status === 'warn') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
  return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
};

const getStatusLabel = (status: string) => {
  if (status === 'pass') return 'Passed';
  if (status === 'warn') return 'Warning';
  return 'Failed';
};

export default function SharedResultsPage() {
  const params = useParams();
  const hash = params?.hash as string;
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!hash) return null;
    return decodeAuditResult(hash);
  }, [hash]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="fixed inset-0 bg-slate-50 dark:bg-[#0a0a0a] -z-20" />
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="text-red-500" size={36} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase">Invalid Results Link</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">This audit results link is invalid or has been corrupted.</p>
          <Link href="/audit/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-black font-bold uppercase tracking-wider text-sm rounded-full hover:bg-slate-800 dark:hover:bg-teal-400 transition-all">
            Run Your Own Audit <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const auditDate = new Date(result.t).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const passCount = result.c.filter(c => c.st === 'pass').length;
  const warnCount = result.c.filter(c => c.st === 'warn').length;
  const failCount = result.c.filter(c => c.st === 'fail').length;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="fixed inset-0 bg-slate-50 dark:bg-[#0a0a0a] -z-20 transition-colors duration-300" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Website Audit Results</p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight transition-colors">
            Audit Report
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">{result.u}</p>
          <p className="text-slate-400 dark:text-slate-600 text-xs mt-2">Audited on {auditDate}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 text-center relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 dark:from-transparent dark:via-blue-500/50 dark:to-transparent" />

          <ScoreRing score={result.o} />

          <div className="mt-6 space-y-3">
            <span className={`text-3xl font-black uppercase ${getScoreColor(result.o)}`}>Grade {result.g}</span>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {passCount > 0 && <span className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full"><CheckCircle size={12} />{passCount} Passed</span>}
              {warnCount > 0 && <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full"><AlertTriangle size={12} />{warnCount} Warning</span>}
              {failCount > 0 && <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full"><AlertCircle size={12} />{failCount} Failed</span>}
            </div>
          </div>
        </div>

        {/* Individual Check Results */}
        <div className="space-y-3">
          {result.c.map((check, i) => {
            const Icon = checkIcons[check.n] || Globe;
            return (
              <div key={i} className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 transition-colors duration-300 shadow-sm dark:shadow-none">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${getStatusBg(check.st)}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-slate-900 dark:text-white font-bold text-sm block uppercase tracking-tight transition-colors">{check.n}</span>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 truncate transition-colors">{check.sm}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <span className={`text-xl font-black tabular-nums ${getScoreColor(check.s)}`}>{check.s}</span>
                    <span className="text-[9px] text-slate-500 uppercase block tracking-wider font-bold">{getStatusLabel(check.st)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Share + CTA Row */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-xs rounded-2xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all shadow-sm"
          >
            {copied ? <><Check size={16} className="text-green-500" /> Copied!</> : <><Copy size={16} /> Copy Link</>}
          </button>
          <Link
            href="/audit/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-black font-black uppercase tracking-wider text-sm rounded-2xl hover:bg-slate-800 dark:hover:bg-teal-400 transition-all shadow-xl hover:-translate-y-0.5"
          >
            Run Your Own Free Audit <ArrowRight size={16} />
          </Link>
        </div>

        {/* Branding */}
        <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold pt-4">
          Powered by <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">whoisalfaz.me</Link> — Free Website Audit Tool
        </p>
      </div>
    </main>
  );
}
