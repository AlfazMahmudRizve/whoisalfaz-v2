'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, AlertTriangle, ExternalLink, ChevronDown, Shield, Globe, Zap, Search, Server, Lock, BarChart3, Share2, Check, Code2, Gauge, Calculator } from 'lucide-react';
import { encodeAuditResult } from '@/lib/audit-share';

const scanSteps = [
  "Resolving DNS & connectivity...",
  "Verifying SSL certificate...",
  "Analyzing meta tags & Open Graph...",
  "Scanning security headers...",
  "Checking robots.txt & sitemap...",
  "Analyzing core vitality metrics...",
  "Calculating final scores...",
];

const checkIcons = {
  'Performance & Core Web Vitals': Zap,
  'Meta Tags & Open Graph': Search,
  'SSL Certificate': Lock,
  'Security Headers': Shield,
  'Robots.txt & Sitemap': Globe,
  'DNS & Connectivity': Server,
};

const parseDetail = (text) => {
  let status = 'pass';
  let cleanText = text.trim();
  
  if (cleanText.startsWith('❌')) {
    status = 'fail';
    cleanText = cleanText.replace(/^❌\s*/, '');
  } else if (cleanText.startsWith('⚠️')) {
    status = 'warn';
    cleanText = cleanText.replace(/^⚠️\s*/, '');
  } else if (cleanText.startsWith('💡')) {
    status = 'info';
    cleanText = cleanText.replace(/^💡\s*/, '');
  } else if (cleanText.startsWith('✅')) {
    status = 'pass';
    cleanText = cleanText.replace(/^✅\s*/, '');
  }
  
  // Clean up HTML entities
  cleanText = cleanText.replace(/&amp;/g, '&')
                       .replace(/&lt;/g, '<')
                       .replace(/&gt;/g, '>')
                       .replace(/&quot;/g, '"')
                       .replace(/&#39;/g, "'");
  
  return { status, text: cleanText };
};

// SVG Score Ring
function ScoreRing({ score, size = 100, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  // Dynamic Gradient mapping
  const gradientId = `score-grad-${score}`;
  const stopColors = score >= 80 
    ? ['#14b8a6', '#10b981'] // Teal to Emerald
    : score >= 50 
      ? ['#f59e0b', '#f97316'] // Amber to Orange
      : ['#f43f5e', '#ef4444']; // Rose to Red
      
  const glowColor = score >= 80 
    ? 'rgba(16,185,129,0.15)' 
    : score >= 50 
      ? 'rgba(245,158,11,0.15)' 
      : 'rgba(239,68,68,0.15)';

  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      {/* Ambient Backing Glow */}
      <div className="absolute inset-2 rounded-full blur-xl transition-all duration-1000" style={{ backgroundColor: glowColor }} />
      
      <svg width={size} height={size} className="-rotate-90 relative z-10">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stopColors[0]} />
            <stop offset="100%" stopColor={stopColors[1]} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" className="text-slate-100 dark:text-white/5" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{score}</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black -mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

export default function AuditTool() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [scanStep, setScanStep] = useState(scanSteps[0]);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [expandedChecks, setExpandedChecks] = useState({});
  const [shareStatus, setShareStatus] = useState('idle'); // idle | copied

  const toggleCheck = (i) => setExpandedChecks(prev => ({ ...prev, [i]: !prev[i] }));

  const normalizeUrl = (u) => {
    let clean = u.trim();
    if (!clean) return '';
    if (!/^https?:\/\//i.test(clean)) {
      clean = `https://${clean}`;
    }
    return clean.replace(/^(https?:\/\/)\/+/i, '$1');
  };

  const handleUrlBlur = () => {
    if (url) setUrl(normalizeUrl(url));
  };

  const runAudit = async (e) => {
    e.preventDefault();
    const cleanUrl = normalizeUrl(url);
    if (!cleanUrl) return;
    setUrl(cleanUrl);

    setStatus('loading');
    setResults(null);
    setErrorMsg('');
    setExpandedChecks({});
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'audit_started', {
        event_category: 'Audit Tool',
        event_label: cleanUrl
      });
    }

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < scanSteps.length) {
        setScanStep(scanSteps[stepIndex]);
        stepIndex++;
      }
    }, 3000);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleanUrl, name: name || 'Audit User', email }),
      });

      clearInterval(stepInterval);
      const data = await response.json();

      if (response.ok && data.success) {
        setResults(data.results);
        setStatus('results');
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'audit_completed', {
            event_category: 'Audit Tool',
            event_label: cleanUrl
          });
        }
      } else {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      clearInterval(stepInterval);
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  const getStatusBorderColor = (s, isOpen) => {
    if (s === 'pass') return isOpen 
      ? 'border-green-500/30 bg-green-500/[0.02] dark:bg-green-500/[0.01] shadow-[0_8px_30px_rgba(16,185,129,0.06)]' 
      : 'border-green-500/10 dark:border-green-500/5 hover:border-green-500/30 hover:shadow-[0_8px_20px_rgba(16,185,129,0.04)]';
    if (s === 'warn') return isOpen 
      ? 'border-amber-500/30 bg-amber-500/[0.02] dark:bg-amber-500/[0.01] shadow-[0_8px_30px_rgba(245,158,11,0.06)]' 
      : 'border-amber-500/10 dark:border-amber-500/5 hover:border-amber-500/30 hover:shadow-[0_8px_20px_rgba(245,158,11,0.04)]';
    return isOpen 
      ? 'border-red-500/30 bg-red-500/[0.02] dark:bg-red-500/[0.01] shadow-[0_8px_30px_rgba(239,68,68,0.06)]' 
      : 'border-red-500/10 dark:border-red-500/5 hover:border-red-500/30 hover:shadow-[0_8px_20px_rgba(239,68,68,0.04)]';
  };

  const getIconBg = (s) => {
    if (s === 'pass') return 'bg-green-500/10 text-green-500 dark:text-green-400 border border-green-500/10';
    if (s === 'warn') return 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/10';
    return 'bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/10';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 dark:text-teal-400';
    if (score >= 50) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-rose-400';
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start w-full transition-colors duration-300">
      {/* LEFT COLUMN: FORM */}
      <div className="w-full lg:sticky lg:top-28 bg-white/70 dark:bg-[#1e293b]/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-slate-300/50 dark:hover:border-white/15">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 dark:bg-blue-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 dark:group-hover:bg-blue-500/20 transition-all duration-700" />
        <form onSubmit={runAudit} className="space-y-6 relative z-10">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic transition-colors duration-300">Run Free Audit</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">Real-time analysis. No fluff. Actual data.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300">Website URL</label>
              <input type="text" placeholder="https://your-site.com" required className="w-full bg-slate-50/50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-blue-500/20 focus:border-teal-500 dark:focus:border-blue-500 hover:border-slate-300 dark:hover:border-white/20 outline-none transition-all duration-300 shadow-inner" value={url} onChange={(e) => setUrl(e.target.value)} onBlur={handleUrlBlur} disabled={status === 'loading'} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300">Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-50/50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-blue-500/20 focus:border-teal-500 dark:focus:border-blue-500 hover:border-slate-300 dark:hover:border-white/20 outline-none transition-all duration-300 shadow-inner" value={name} onChange={(e) => setName(e.target.value)} disabled={status === 'loading'} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300">Email</label>
                <input type="email" placeholder="you@company.com (optional)" className="w-full bg-slate-50/50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-blue-500/20 focus:border-teal-500 dark:focus:border-blue-500 hover:border-slate-300 dark:hover:border-white/20 outline-none transition-all duration-300 shadow-inner" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'} />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1 ml-1 flex items-center gap-1.5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              Enter your email to get the full report with fix-it recommendations delivered to your inbox.
            </p>
            <button type="submit" disabled={status === 'loading'} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-blue-600 dark:to-teal-500 hover:from-slate-800 hover:to-slate-700 dark:hover:from-blue-500 dark:hover:to-teal-400 disabled:from-slate-900/50 disabled:to-slate-800/50 dark:disabled:from-blue-600/50 dark:disabled:to-teal-500/50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-tight py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 dark:shadow-blue-500/10 hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-blue-500/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
              {status === 'loading' ? 'Analyzing...' : 'Execute Analysis'} <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full h-full min-h-[400px]">
        {status === 'idle' && (
          <div className="hidden lg:flex relative h-full w-full bg-white dark:bg-black/30 rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-8 flex-col justify-center gap-6 shadow-xl dark:shadow-inner transition-colors duration-300">
            <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 transition-all hover:bg-slate-100 dark:hover:bg-white/[0.04]">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400"><Zap size={24} /></div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Workflow Speed</div>
                <div className="text-slate-900 dark:text-white font-black text-xl tracking-tight uppercase">+300% Acceleration</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 transition-all hover:bg-slate-100 dark:hover:bg-white/[0.04]">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500"><Search size={24} /></div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">SEO Integrity</div>
                <div className="text-slate-900 dark:text-white font-black text-xl tracking-tight uppercase">98/100 Protocol Opt.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 transition-all hover:bg-slate-100 dark:hover:bg-white/[0.04]">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500"><BarChart3 size={24} /></div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Conversion Growth</div>
                <div className="text-slate-900 dark:text-white font-black text-xl tracking-tight uppercase">+25% Monthly Yield</div>
              </div>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="w-full bg-white dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] transition-colors duration-300">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-teal-500 dark:bg-blue-500 blur-2xl opacity-15 animate-pulse rounded-full scale-150" />
              <Loader2 className="animate-spin text-teal-600 dark:text-blue-500 relative" size={52} />
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-xl mb-2 uppercase tracking-tight">Analyzing Protocol...</p>
            <div className="h-5">
              <p className="text-slate-500 dark:text-slate-400 font-mono text-xs animate-pulse text-center">{scanStep}</p>
            </div>
            <div className="w-48 h-1 bg-slate-200 dark:bg-white/5 rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-purple-400 dark:from-blue-500 dark:to-teal-400 rounded-full animate-[progress_20s_ease-in-out_forwards]" />
            </div>
            <p className="text-slate-400 dark:text-slate-600 text-[10px] mt-4 uppercase tracking-widest text-center font-bold">This may take up to 30 seconds</p>
          </div>
        )}

        {status === 'error' && (
          <div className="w-full bg-white dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col justify-center items-center min-h-[350px] md:min-h-[400px] transition-colors duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
              <AlertCircle className="text-red-500 dark:text-red-400" size={32} />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">Audit Failed</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-sm font-medium">{errorMsg || 'Could not complete the analysis. The URL may be unreachable.'}</p>
            </div>
          </div>
        )}

        {status === 'results' && results && (
          <div className="w-full space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Overview Bento Dashboard */}
            <div className="bg-white/70 dark:bg-[#1e293b]/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 dark:from-blue-500/40 dark:via-purple-500/40 dark:to-teal-500/40" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* 1. LEFT BOX: Individual Parameters Checked (Donut Chart) */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-2xl md:rounded-3xl h-full min-h-[170px]">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 block text-center font-bold">Parameters Checked</span>
                  
                  {(() => {
                    const allDetails = results.checks.flatMap(c => c.details);
                    let detailPassed = 0;
                    let detailFlagged = 0;
                    allDetails.forEach(detail => {
                      const parsed = parseDetail(detail);
                      if (parsed.status === 'pass') detailPassed++;
                      else detailFlagged++;
                    });
                    const totalDetails = allDetails.length || 1;
                    
                    // Donut dimensions
                    const donutRadius = 26;
                    const donutStroke = 6;
                    const donutCircum = 2 * Math.PI * donutRadius;
                    const passedOffset = donutCircum - (detailPassed / totalDetails) * donutCircum;
                    
                    return (
                      <div className="flex items-center gap-5 w-full justify-center">
                        <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: 72, height: 72 }}>
                          {/* Shadow glow */}
                          <div className="absolute inset-1.5 rounded-full bg-emerald-500/5 blur-md" />
                          <svg width={72} height={72} className="-rotate-90">
                            {/* Background track */}
                            <circle cx={36} cy={36} r={donutRadius} fill="none" stroke="currentColor" className="text-slate-100 dark:text-white/5" strokeWidth={donutStroke} />
                            {/* Passed segment */}
                            <circle cx={36} cy={36} r={donutRadius} fill="none" stroke="#10b981" strokeWidth={donutStroke} strokeDasharray={donutCircum} strokeDashoffset={passedOffset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-base font-black text-slate-900 dark:text-white leading-none">{totalDetails}</span>
                            <span className="text-[7px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mt-0.5">Total</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                            <span className="text-slate-500 dark:text-slate-400 font-bold">Passed:</span>
                            <span className="font-black text-slate-800 dark:text-slate-200">{detailPassed}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                            <span className="text-slate-500 dark:text-slate-400 font-bold">Flagged:</span>
                            <span className="font-black text-slate-800 dark:text-slate-200">{detailFlagged}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 2. CENTER BOX: Health Score Semi-Circle Gauge */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-2xl md:rounded-3xl h-full min-h-[170px] relative">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 block text-center font-bold">Health Score</span>
                  
                  {(() => {
                    const score = results.overallScore;
                    const arcLength = 125.66; // Half of 2 * PI * 40
                    const arcOffset = arcLength - (score / 100) * arcLength;
                    const gaugeStopColors = score >= 80 
                      ? ['#14b8a6', '#10b981'] // Teal to Emerald
                      : score >= 50 
                        ? ['#f59e0b', '#f97316'] // Amber to Orange
                        : ['#f43f5e', '#ef4444']; // Rose to Red
                    
                    const scoreStatus = score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : score >= 50 ? 'Needs Work' : 'Critical';
                    const badgeStyles = score >= 90 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                      : score >= 80 
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                        : score >= 50 
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20';

                    return (
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: 120, height: 65 }}>
                          {/* SVG Arch */}
                          <svg width={120} height={65} viewBox="0 0 100 55" className="overflow-visible">
                            <defs>
                              <linearGradient id="health-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={gaugeStopColors[0]} />
                                <stop offset="100%" stopColor={gaugeStopColors[1]} />
                              </linearGradient>
                            </defs>
                            {/* Track path */}
                            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" className="text-slate-100 dark:text-white/5" strokeWidth="8" strokeLinecap="round" />
                            {/* Progress path */}
                            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#health-gauge-grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={arcLength} strokeDashoffset={arcOffset} style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
                          </svg>
                          
                          {/* Text overlay in the absolute middle */}
                          <div className="absolute top-[22px] flex flex-col items-center justify-center leading-none">
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{score}</span>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full mt-1.5 tracking-wider ${badgeStyles}`}>{scoreStatus}</span>
                          </div>
                        </div>
                        
                        <p className="text-[8px] text-slate-400 dark:text-slate-500 text-center font-bold leading-normal max-w-[180px] mt-2 font-mono truncate">{results.url}</p>
                      </div>
                    );
                  })()}
                </div>

                {/* 3. RIGHT BOX: Audit Check Categories / Progress bars */}
                <div className="md:col-span-4 flex flex-col p-4 bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-2xl md:rounded-3xl h-full min-h-[170px] justify-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3.5 block text-center md:text-left font-bold">Audit Categories</span>
                  
                  {(() => {
                    const passCount = results.checks.filter(c => c.status === 'pass').length;
                    const warnCount = results.checks.filter(c => c.status === 'warn').length;
                    const failCount = results.checks.filter(c => c.status === 'fail').length;
                    
                    return (
                      <div className="space-y-2.5">
                        {/* Passed checks */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">Passed Categories</span>
                            <span className="text-emerald-500 font-black">{passCount} / 6</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${(passCount / 6) * 100}%` }} />
                          </div>
                        </div>

                        {/* Warnings */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">Warnings</span>
                            <span className="text-amber-500 font-black">{warnCount} / 6</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${(warnCount / 6) * 100}%` }} />
                          </div>
                        </div>

                        {/* Failed checks */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">Crit. Issues</span>
                            <span className="text-rose-500 font-black">{failCount} / 6</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full transition-all duration-1000" style={{ width: `${(failCount / 6) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>
            </div>

            {/* Checks List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.checks.map((check, i) => {
                const isOpen = expandedChecks[i];
                const Icon = checkIcons[check.name] || Globe;
                const gridSpan = check.name === 'Performance & Core Web Vitals' || check.name === 'Meta Tags & Open Graph'
                  ? 'md:col-span-2'
                  : 'md:col-span-1';

                const detailIcons = {
                  pass: <Check className="text-green-600 dark:text-green-400 w-3.5 h-3.5 shrink-0" />,
                  fail: <AlertCircle className="text-red-500 w-3.5 h-3.5 shrink-0" />,
                  warn: <AlertTriangle className="text-amber-500 w-3.5 h-3.5 shrink-0" />,
                  info: <Zap className="text-blue-500 w-3.5 h-3.5 shrink-0" />,
                };

                const detailStyles = {
                  pass: 'bg-green-500/[0.02] dark:bg-green-500/[0.01] border-green-500/10 text-slate-700 dark:text-slate-350',
                  fail: 'bg-red-500/[0.02] dark:bg-red-500/[0.01] border-red-500/10 text-slate-700 dark:text-slate-350',
                  warn: 'bg-amber-500/[0.02] dark:bg-amber-500/[0.01] border-amber-500/10 text-slate-700 dark:text-slate-350',
                  info: 'bg-blue-500/[0.02] dark:bg-blue-500/[0.01] border-blue-500/10 text-slate-700 dark:text-slate-355',
                };

                return (
                  <div key={i} className={`bg-white/40 dark:bg-white/[0.01] backdrop-blur-md border rounded-2xl sm:rounded-[1.5rem] transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 ${gridSpan} ${getStatusBorderColor(check.status, isOpen)}`}>
                    <button onClick={() => toggleCheck(i)} className="w-full flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-5 text-left active:scale-[0.99] transition-transform">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${getIconBg(check.status)}`}>
                          <Icon size={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base block tracking-tight uppercase">{check.name}</span>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs mt-0.5 truncate font-medium">{check.summary}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 border-l border-slate-200/50 dark:border-white/10 pl-3 sm:pl-4">
                        <div className="flex flex-col items-end">
                          <span className={`text-lg sm:text-xl font-black tabular-nums ${getScoreColor(check.score)}`}>{check.score}</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Score</span>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 sm:w-4 sm:h-4 ${isOpen ? 'rotate-180 text-slate-950 dark:text-white' : ''}`} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/10 rounded-b-2xl sm:rounded-b-[1.5rem] animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="pt-4 sm:pt-5 space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-end mb-1">
                              <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">Performance Metric</span>
                              <span className={`text-xs font-black ${getScoreColor(check.score)}`}>{check.score}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200/30 dark:border-white/5">
                              <div className={`h-full rounded-full transition-all duration-1000 ease-out ${check.score >= 80 ? 'bg-gradient-to-r from-teal-500 to-emerald-500 shadow-[0_0_10px_rgba(20,184,166,0.25)]' : check.score >= 50 ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.25)]' : 'bg-gradient-to-r from-rose-500 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.25)]'}`} style={{ width: `${check.score}%` }} />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {check.details.map((detail, j) => {
                              const parsed = parseDetail(detail);
                              const itemIcon = detailIcons[parsed.status] || detailIcons.pass;
                              const itemStyle = detailStyles[parsed.status] || detailStyles.pass;
                              return (
                                <div key={j} className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-xl text-xs font-medium leading-relaxed border transition-all ${itemStyle}`}>
                                  <div className="mt-0.5 shrink-0">{itemIcon}</div>
                                  <span className="font-sans text-slate-700 dark:text-slate-350 break-words">{parsed.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => {
                  const hash = encodeAuditResult(results);
                  const shareUrl = `${window.location.origin}/audit/results/${hash}`;
                  navigator.clipboard.writeText(shareUrl);
                  setShareStatus('copied');
                  setTimeout(() => setShareStatus('idle'), 3000);
                  
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'audit_shared', {
                      event_category: 'Audit Tool',
                      event_label: url
                    });
                  }
                }}
                className="flex-1 px-6 py-4 rounded-[1.5rem] bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-tight text-sm hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:border-slate-300 dark:hover:border-white/20 active:scale-[0.98] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                {shareStatus === 'copied' ? <><Check size={16} className="text-green-500" /> Link Copied!</> : <><Share2 size={16} /> Share Results</>}
              </button>
              <Link 
                href="/contact/" 
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'audit_discuss_clicked', {
                      event_category: 'Audit Tool',
                      event_label: 'Discuss Results'
                    });
                  }
                }}
                className="flex-1 px-6 py-4 rounded-[1.5rem] bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-500 text-white dark:text-black font-black uppercase tracking-tight text-sm hover:opacity-95 hover:shadow-lg hover:shadow-teal-500/25 dark:hover:shadow-teal-400/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                Discuss Results <ExternalLink size={16} />
              </Link>
            </div>

            {/* ── Social Share Strip ── */}
            <div className="mt-4 p-4 rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 text-center">Share your score & challenge others</p>
              <div className="flex items-center justify-center gap-3">
                {/* Twitter/X */}
                <button
                  onClick={() => {
                    const hash = encodeAuditResult(results);
                    const shareUrl = `${window.location.origin}/audit/results/${hash}`;
                    const text = `My website scored ${results.overallScore}/100 on whoisalfaz.me's free audit tool! 🔍 Check yours:`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'audit_social_share', { event_category: 'Audit Tool', event_label: 'Twitter' });
                    }
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-110"
                  title="Share on X"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </button>
                {/* LinkedIn */}
                <button
                  onClick={() => {
                    const hash = encodeAuditResult(results);
                    const shareUrl = `${window.location.origin}/audit/results/${hash}`;
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'audit_social_share', { event_category: 'Audit Tool', event_label: 'LinkedIn' });
                    }
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-[#0077b5] hover:text-white dark:hover:bg-[#0077b5] dark:hover:text-white transition-all hover:scale-110"
                  title="Share on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </button>
                {/* Facebook */}
                <button
                  onClick={() => {
                    const hash = encodeAuditResult(results);
                    const shareUrl = `${window.location.origin}/audit/results/${hash}`;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'audit_social_share', { event_category: 'Audit Tool', event_label: 'Facebook' });
                    }
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-[#1877f2] hover:text-white dark:hover:bg-[#1877f2] dark:hover:text-white transition-all hover:scale-110"
                  title="Share on Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </button>
              </div>
            </div>

            {/* ── Contextual Recommendations ── */}
            {(() => {
              const recommendations = [];
              const perfCheck = results.checks.find(c => c.name === 'Performance & Core Web Vitals');
              const seoCheck = results.checks.find(c => c.name === 'Meta Tags & Open Graph');
              const securityCheck = results.checks.find(c => c.name === 'Security Headers');
              const sslCheck = results.checks.find(c => c.name === 'SSL Certificate');

              if (perfCheck && perfCheck.score < 80) {
                recommendations.push({
                  icon: Gauge,
                  text: 'Your performance needs work — headless architecture delivers sub-second loads',
                  href: '/services/headless-architecture/',
                  color: 'text-teal-500 dark:text-teal-400',
                  bg: 'bg-teal-500/10',
                  border: 'border-teal-500/20',
                });
              }
              if (seoCheck && seoCheck.score < 80) {
                recommendations.push({
                  icon: Search,
                  text: 'SEO issues detected — get a professional Technical SEO audit',
                  href: '/services/technical-seo/',
                  color: 'text-blue-500 dark:text-blue-400',
                  bg: 'bg-blue-500/10',
                  border: 'border-blue-500/20',
                });
              }
              if ((securityCheck && securityCheck.status === 'fail') || (sslCheck && sslCheck.status === 'fail')) {
                recommendations.push({
                  icon: Code2,
                  text: 'Security gaps found — harden your site with a custom full-stack build',
                  href: '/services/custom-full-stack/',
                  color: 'text-purple-500 dark:text-purple-400',
                  bg: 'bg-purple-500/10',
                  border: 'border-purple-500/20',
                });
              }
              // Always show ROI calculator
              recommendations.push({
                icon: Calculator,
                text: 'Calculate how much automation could save your business',
                href: '/labs/roi/',
                color: 'text-emerald-500 dark:text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
              });

              return recommendations.length > 0 ? (
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Recommended next steps</p>
                  {recommendations.map((rec, i) => (
                    <Link
                      key={i}
                      href={rec.href}
                      className={`flex items-center gap-3 p-3.5 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:${rec.border} transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${rec.bg} border ${rec.border} flex items-center justify-center ${rec.color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <rec.icon size={16} />
                      </div>
                      <span className="text-slate-600 dark:text-slate-350 text-xs font-bold flex-1">{rec.text}</span>
                      <ArrowRight size={14} className={`${rec.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
                    </Link>
                  ))}
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
