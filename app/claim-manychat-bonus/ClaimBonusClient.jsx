'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Download, CheckCircle2, ShieldCheck, Video, Info, FileCode, Zap, Layers } from 'lucide-react';

export default function ClaimBonusClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hp_website: '' // Honeypot
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const summitUrl = "https://igsummit.manychat.com/virtual";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/claim-bonus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setDownloadUrl(data.downloadUrl || 'https://whoisalfaz.me/downloads/manychat-automation-bonus-pack.zip');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to process request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Independent Community Automation Guide
        </div>

        <div className="flex justify-center my-6">
          <div className="w-32 sm:w-40 aspect-[4/5] rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl shadow-purple-500/25 bg-slate-950">
            <img
              src="/images/manychat-summit/summit-2026-portrait.svg"
              alt="ManyChat Instagram Summit 2026 Keynote"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Free ManyChat & n8n <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-teal-300 to-emerald-400">Automation Blueprint Pack</span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed">
          Production-grade n8n workflows for agency operators and automation architects. Eliminate the 10-second external webhook timeout, enrich leads with Apollo, and deploy multi-tenant RAG without chat freezing.
        </p>

        {/* Summit info pill */}
        <div className="pt-2">
          <a
            href={summitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-all"
          >
            <Video className="w-3.5 h-3.5 text-teal-400" />
            <span>Looking for the official Instagram Summit by ManyChat? View event pass here</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Blueprint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blueprint 1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Blueprint #1</span>
              <span className="text-xs font-bold text-teal-400 bg-teal-950/60 border border-teal-500/20 px-2 py-0.5 rounded">Core Utility</span>
            </div>
            <h3 className="text-lg font-bold text-white">ManyChat 10s Async Timeout Handler</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decouples synchronous ManyChat webhooks from heavy AI and database operations. Prevents chat drop-offs with asynchronous WhatsApp & DM callbacks.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-teal-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ready-to-import n8n JSON
          </div>
        </div>

        {/* Blueprint 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-teal-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Blueprint #2</span>
              <span className="text-xs font-bold text-purple-400 bg-purple-950/60 border border-purple-500/20 px-2 py-0.5 rounded">RevOps Sync</span>
            </div>
            <h3 className="text-lg font-bold text-white">Apollo to Brevo Lead Enrichment Pipeline</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically queries Apollo API for inbound leads, strips disposable emails, scores ICP qualification, and syncs clean data to Brevo.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-teal-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Production Tested
          </div>
        </div>

        {/* Blueprint 3 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Blueprint #3</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">AI Memory</span>
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Tenant Qdrant AI RAG Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise vector search knowledge base blueprint. Features client workspace isolation, payload filtering, and grounded citation retrieval.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-teal-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Full Docker & n8n config
          </div>
        </div>
      </div>

      {/* Direct Download Form Card */}
      <div className="bg-slate-900 border border-teal-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        {status === 'success' ? (
          <div className="text-center space-y-6 py-6 animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-teal-500/20 border border-teal-500/30 rounded-full flex items-center justify-center mx-auto text-teal-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">🎉 Blueprint Pack Ready!</h2>
              <p className="text-slate-300 max-w-md mx-auto text-sm">
                A confirmation email with your permanent download link has also been sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="pt-4">
              <a
                href={downloadUrl}
                download
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-teal-500/20 hover:scale-105 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Download Blueprint Pack (.ZIP)</span>
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Need custom implementation? Reply directly to our email or visit <a href="/contact/" className="text-teal-400 hover:underline">whoisalfaz.me/contact/</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">Download the Free Blueprint Pack</h2>
              <p className="text-sm text-slate-400">
                Enter your details below to receive instant access to the ready-to-import n8n workflows and documentation.
              </p>
            </div>

            {/* Honeypot field (hidden from real users) */}
            <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <input
                type="text"
                name="hp_website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.hp_website}
                onChange={(e) => setFormData({ ...formData, hp_website: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Work / Primary Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium text-center">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 hover:opacity-95 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span>Generating Download Access...</span>
              ) : (
                <>
                  <span>Download Free Blueprint Pack Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Instant direct download · 100% free · Zero spam guarantee</span>
            </div>
          </form>
        )}
      </div>

      {/* Independent Resource Notice */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-300">
          <Info className="w-4 h-4 text-teal-400" />
          <span>Independent Educational Resource Notice</span>
        </div>
        <p className="leading-relaxed">
          whoisalfaz.me is an independent automation engineering consultancy operated by Alfaz Mahmud Rizve. ManyChat is a registered trademark of ManyChat, Inc. All workflows, guides, and blueprints provided here are independently developed educational companion resources created to help developers and agency operators build scalable, resilient automation architectures.
        </p>
      </div>
    </div>
  );
}
