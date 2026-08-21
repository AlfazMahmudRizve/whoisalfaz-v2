import React from 'react';
import ClaimBonusClient from './ClaimBonusClient';

export const metadata = {
  title: 'Claim Your $147 ManyChat & n8n Automation Bonus Pack | WhoisAlfaz',
  description: 'Exclusive $147 companion automation bundle for Instagram Summit by ManyChat virtual attendees. Instant access to production-ready n8n workflows, WhatsApp async timeout handlers, and Apollo enrichment pipelines.',
  alternates: {
    canonical: 'https://whoisalfaz.me/claim-manychat-bonus/'
  }
};

export default function ClaimManyChatBonusPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-600/20 via-teal-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <ClaimBonusClient />
      </div>
    </main>
  );
}
