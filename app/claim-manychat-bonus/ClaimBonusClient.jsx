'use client';

import React, { useState } from 'react';
import { Sparkles, Gift, ArrowRight, Download, CheckCircle2, ShieldCheck, Video, Info, FileCode, Zap, Layers } from 'lucide-react';

export default function ClaimBonusClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    hp_website: '' // Honeypot
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const referralUrl = "https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

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
        setErrorMessage(data.error || 'Failed to process claim. Please check your information.');
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5" />
          Official Partner Bonus Portal
        </div>

        <div className="flex justify-center my-4">
          <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl shadow-purple-500/20">
            <img
              src="/images/manychat-summit/summit-promo-portrait.png"
              alt="ManyChat Instagram Summit Official Artwork"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Claim Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-teal-300 to-emerald-400">$147 ManyChat & n8n</span> Automation Pack
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed">
          Secured your <strong>Virtual Pass</strong> for the Instagram Summit by ManyChat? Enter your details below to instantly unlock our 3 production-ready n8n workflow blueprints.
        </p>

        {/* Haven't bought yet CTA */}
        <div className="pt-2">
          <a
            href={referralUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all"
          >
            <span>Don't have a ticket yet? Grab your summit pass here</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bonus Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bonus 1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Bonus #1</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">$49 Value</span>
            </div>
            <h3 className="text-lg font-bold text-white">ManyChat 10s Async Timeout Handler</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decouples synchronous ManyChat webhooks from heavy AI and database operations. Prevents chat drop-offs with async WhatsApp & DM callbacks.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-teal-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ready-to-import n8n JSON
          </div>
        </div>

        {/* Bonus 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-teal-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Bonus #2</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">$49 Value</span>
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

        {/* Bonus 3 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Bonus #3</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">$49 Value</span>
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

      {/* Claim Form Card */}
      <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        {status === 'success' ? (
          <div className="text-center space-y-6 py-6 animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-teal-500/20 border border-teal-500/30 rounded-full flex items-center justify-center mx-auto text-teal-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">🎉 Bonus Pack Unlocked!</h2>
              <p className="text-slate-300 max-w-md mx-auto text-sm">
                A confirmation email with your permanent download link has been dispatched to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="pt-4">
              <a
                href={downloadUrl}
                download
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-teal-500/20 hover:scale-105 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Download $147 Blueprint Pack (.ZIP)</span>
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Need custom implementation? Reply directly to our email or visit <a href="/contact/" className="text-teal-400 hover:underline">whoisalfaz.me/contact/</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">Unlock Your Blueprint Download</h2>
              <p className="text-sm text-slate-400">
                Fill in your details below to receive instant access to the templates and documentation.
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
                <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">ManyChat Ticket Order ID or Email Used at Checkout</label>
              <input
                type="text"
                placeholder="e.g. MC-982341 or the email used when purchasing on ManyChat"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.orderId}
                onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
              />
              <p className="text-[11px] text-slate-500">
                Found in your confirmation email from ManyChat / Stripe. If you haven't bought yet, <a href={referralUrl} target="_blank" rel="sponsored noopener noreferrer" className="text-purple-400 hover:underline">get your summit ticket here first</a>.
              </p>
            </div>

            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium text-center">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span>Verifying & Preparing Download...</span>
              ) : (
                <>
                  <span>Claim $147 Bonus Pack Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Instant direct download · Zero spam guarantee · Verified Brevo delivery</span>
            </div>
          </form>
        )}
      </div>

      {/* FTC & Transparency Footer */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-300">
          <Info className="w-4 h-4 text-purple-400" />
          <span>Affiliate & Bonus Transparency Notice</span>
        </div>
        <p className="leading-relaxed">
          Accelerated Growth Studio (whoisalfaz.me) is an authorized independent affiliate partner for ManyChat. When you purchase a virtual ticket through our referral links, ManyChat compensates us with a partner commission at no additional cost to you. This compensation enables us to research, build, and distribute open-source RevOps automation blueprints and free developer resources. The templates provided are educational companion materials developed by Alfaz Mahmud Rizve.
        </p>
      </div>
    </div>
  );
}
