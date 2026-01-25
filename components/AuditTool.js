'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuditTool() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [log, setLog] = useState('');

  const runAudit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setStatus('loading');

    // Authority Simulation Logs
    const logs = [
      "Initializing agents...",
      "Resolving DNS...",
      "Scanning LCP...",
      "Checking Meta Tags...",
      "Analyzing SEO Score...",
      "Generating Report..."
    ];
    for (const msg of logs) {
      setLog(msg);
      await new Promise(r => setTimeout(r, 800));
    }

    // Connect to /api/contact
    try {
      if (url) {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Audit User',
            email: email,
            // Sending website url in the message body for n8n to parse
            message: `Audit Request for: ${url}`,
            source: 'Free Audit Tool'
          })
        });
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl my-12 relative overflow-hidden group">
      {/* Subtle Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

      {status === 'idle' && (
        <form onSubmit={runAudit} className="space-y-6 relative z-10">
          <div className="space-y-1 text-center">
            <h3 className="text-2xl font-bold text-white tracking-tight">Run Free Audit</h3>
            <p className="text-slate-400 text-sm">Automated analysis of your digital footprint.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Website URL</label>
              <input
                type="url" placeholder="https://example.com" required
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                value={url} onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Name</label>
                <input
                  type="text" placeholder="John Doe"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <input
                  type="email" placeholder="you@company.com" required
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-200"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]">
              Start Analysis <ArrowRight size={18} />
            </button>
          </div>
        </form>
      )}

      {status === 'loading' && (
        <div className="text-sm space-y-6 py-10 flex flex-col items-center justify-center min-h-[300px] relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
            <Loader2 className="animate-spin text-blue-500 relative" size={48} />
          </div>
          <div className="space-y-2 text-center">
            <p className="font-medium text-white text-lg animate-pulse">Processing Data...</p>
            <p className="text-slate-500 font-mono text-xs">{log}</p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="py-8 space-y-6 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <CheckCircle className="text-green-400" size={32} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Scan Complete</h3>
            <p className="text-slate-400 max-w-xs mx-auto">Detailed report has been successfully dispatched to <span className="text-white font-medium">{email}</span>.</p>
          </div>

          <button onClick={() => setStatus('idle')} className="text-sm text-slate-500 hover:text-white transition-colors underline decoration-slate-800 underline-offset-4">
            Analyze another URL
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="py-8 space-y-6 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <AlertCircle className="text-red-400" size={32} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Connection Refused</h3>
            <p className="text-slate-400 max-w-xs mx-auto">Unable to reach the analysis server. Please try again later.</p>
          </div>

          <button onClick={() => setStatus('idle')} className="text-sm text-slate-500 hover:text-white transition-colors underline decoration-slate-800 underline-offset-4">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
