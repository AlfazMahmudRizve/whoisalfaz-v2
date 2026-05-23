'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, AlertTriangle, ExternalLink, ChevronDown, Shield, Globe, Zap, Search, Server, Lock, BarChart3, Share2, Check } from 'lucide-react';
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

// SVG Score Ring
function ScoreRing({ score, size = 130, strokeWidth = 8 }) {
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
        <span className="text-4xl font-black text-slate-900 dark:text-white">{score}</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">/ 100</span>
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

  const getStatusBorderColor = (s) => {
    if (s === 'pass') return 'border-green-500/15 hover:border-green-500/30';
    if (s === 'warn') return 'border-amber-500/15 hover:border-amber-500/30';
    return 'border-red-500/15 hover:border-red-500/30';
  };

  const getIconBg = (s) => {
    if (s === 'pass') return 'bg-green-500/10 text-green-500 dark:text-green-400';
    if (s === 'warn') return 'bg-amber-500/10 text-amber-500 dark:text-amber-400';
    return 'bg-red-500/10 text-red-500 dark:text-red-400';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 dark:text-green-400';
    if (score >= 50) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start w-full transition-colors duration-300">
      {/* LEFT COLUMN: FORM */}
      <div className="w-full bg-white dark:bg-[#1e293b]/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl dark:shadow-2xl relative overflow-hidden group transition-colors duration-300">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 dark:bg-blue-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 dark:group-hover:bg-blue-500/20 transition-all duration-700" />
        <form onSubmit={runAudit} className="space-y-6 relative z-10">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic transition-colors duration-300">Run Free Audit</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">Real-time analysis. No fluff. Actual data.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300">Website URL</label>
              <input type="text" placeholder="https://your-site.com" required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 focus:border-teal-500/50 dark:focus:border-blue-500/50 outline-none transition-all duration-200 shadow-inner" value={url} onChange={(e) => setUrl(e.target.value)} onBlur={handleUrlBlur} disabled={status === 'loading'} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300">Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 focus:border-teal-500/50 dark:focus:border-blue-500/50 outline-none transition-all duration-200 shadow-inner" value={name} onChange={(e) => setName(e.target.value)} disabled={status === 'loading'} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors duration-300">Email</label>
                <input type="email" placeholder="you@company.com (optional)" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-blue-500/50 focus:border-teal-500/50 dark:focus:border-blue-500/50 outline-none transition-all duration-200 shadow-inner" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'} />
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 -mt-1 ml-1 flex items-center gap-1.5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              Enter your email to get the full report with fix-it recommendations delivered to your inbox.
            </p>
            <button type="submit" disabled={status === 'loading'} className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 disabled:bg-slate-900/50 dark:disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-tight py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-slate-500/25 active:scale-[0.98]">
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
          <div className="w-full h-full bg-white dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] transition-colors duration-300">
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
          <div className="w-full h-full bg-white dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col justify-center items-center min-h-[400px] transition-colors duration-300">
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
          <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Overview */}
            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 relative overflow-hidden transition-colors duration-300 shadow-xl dark:shadow-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 dark:from-transparent dark:via-blue-500/50 dark:to-transparent" />
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={results.overallScore} size={100} strokeWidth={6} />
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div>
                    <span className={`text-2xl font-black uppercase ${getScoreColor(results.overallScore)}`}>Grade {results.grade}</span>
                    <p className="text-slate-500 text-[10px] font-mono mt-0.5 truncate font-bold">{results.url}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    {results.checks.filter(c => c.status === 'pass').length > 0 && <span className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full"><CheckCircle size={12} />{results.checks.filter(c => c.status === 'pass').length} Passed</span>}
                    {results.checks.filter(c => c.status === 'warn').length > 0 && <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full"><AlertTriangle size={12} />{results.checks.filter(c => c.status === 'warn').length} Warn</span>}
                    {results.checks.filter(c => c.status === 'fail').length > 0 && <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full"><AlertCircle size={12} />{results.checks.filter(c => c.status === 'fail').length} Failed</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Checks List */}
            <div className="flex flex-col gap-3">
              {results.checks.map((check, i) => {
                const isOpen = expandedChecks[i];
                const Icon = checkIcons[check.name] || Globe;
                return (
                  <div key={i} className={`bg-white dark:bg-white/[0.03] border rounded-[1.5rem] transition-all duration-300 ${getStatusBorderColor(check.status)} ${isOpen ? 'ring-2 ring-slate-200 dark:ring-white/10 shadow-lg' : 'shadow-sm dark:shadow-none'}`}>
                    <button onClick={() => toggleCheck(i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getIconBg(check.status)}`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-slate-900 dark:text-white font-bold text-base block tracking-tight uppercase">{check.name}</span>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 truncate font-medium">{check.summary}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0 border-l border-slate-200 dark:border-white/10 pl-4">
                        <div className="flex flex-col items-end">
                          <span className={`text-xl font-black tabular-nums ${getScoreColor(check.score)}`}>{check.score}</span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Score</span>
                        </div>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900 dark:text-white' : ''}`} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/10 rounded-b-[1.5rem]">
                        <div className="pt-5 space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-end mb-1">
                              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Performance Metric</span>
                              <span className={`text-xs font-black ${getScoreColor(check.score)}`}>{check.score}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${check.score >= 80 ? 'bg-green-500' : check.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${check.score}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            {check.details.map((detail, j) => {
                              const isFail = detail.startsWith('❌');
                              const isWarn = detail.startsWith('⚠️') || detail.startsWith('💡');
                              return (
                                <div key={j} className={`p-4 rounded-xl text-xs font-mono font-medium leading-relaxed border ${isFail ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300/90' : isWarn ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300/90' : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'}`}>
                                  {detail}
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
            <div className="flex gap-3 mt-6">
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
                className="flex-1 px-6 py-4 rounded-[1.5rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-tight text-sm hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2 shadow-sm"
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
                className="flex-1 px-6 py-4 rounded-[1.5rem] bg-slate-900 dark:bg-teal-500 text-white dark:text-black font-black uppercase tracking-tight text-sm hover:bg-slate-800 dark:hover:bg-teal-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 dark:shadow-teal-500/10 hover:-translate-y-1">
                Discuss Results <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
