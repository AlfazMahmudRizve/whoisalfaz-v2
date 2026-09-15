import React from 'react';
import ClaimBonusClient from './ClaimBonusClient';

export const metadata = {
  title: 'Free ManyChat & n8n Automation Blueprint Pack | WhoisAlfaz',
  description: 'Download 3 production-ready n8n automation blueprints for ManyChat operators: 10s async timeout handler, Apollo lead enrichment, and multi-tenant RAG.',
  alternates: {
    canonical: 'https://whoisalfaz.me/claim-manychat-bonus/'
  },
  openGraph: {
    title: 'Free ManyChat & n8n Automation Blueprint Pack | WhoisAlfaz',
    description: 'Download 3 production-ready n8n automation blueprints for ManyChat operators: 10s async timeout handler, Apollo lead enrichment, and multi-tenant RAG.',
    url: 'https://whoisalfaz.me/claim-manychat-bonus/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ManyChat & n8n Automation Blueprint Pack | WhoisAlfaz',
    description: 'Download 3 production-ready n8n automation blueprints for ManyChat operators: 10s async timeout handler, Apollo lead enrichment, and multi-tenant RAG.',
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
