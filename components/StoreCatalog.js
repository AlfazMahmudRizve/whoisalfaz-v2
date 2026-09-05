"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Search, 
  Sparkles, 
  Zap, 
  Brain, 
  MessageSquare, 
  Terminal, 
  ChevronRight, 
  CheckCircle2, 
  FileCode2, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers
} from "lucide-react";
import { VAULT_WORKFLOWS, VaultWorkflow } from "../data/vaultWorkflows";

export default function StoreCatalog({ products = VAULT_WORKFLOWS }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Workflows", icon: Sparkles },
    { id: "ai-rag", name: "AI & RAG", icon: Brain },
    { id: "outreach", name: "Outreach & Email", icon: Zap },
    { id: "inbound", name: "Inbound & Funnels", icon: MessageSquare },
    { id: "revops", name: "RevOps & Telemetry", icon: Terminal },
  ];

  // Merge products passed as prop or use VAULT_WORKFLOWS
  const allItems = VAULT_WORKFLOWS;

  const filteredProducts = allItems.filter((p) => {
    // 1. Category Filter
    if (filter !== "all" && p.category !== filter) return false;

    // 2. Search Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const titleMatch = p.title.toLowerCase().includes(query);
      const descMatch = p.description.toLowerCase().includes(query);
      const tagMatch = p.integrations.some((t) => t.toLowerCase().includes(query));
      const execMatch = p.executionType?.toLowerCase().includes(query);
      return titleMatch || descMatch || tagMatch || execMatch;
    }

    return true;
  });

  const bundle = allItems.find((p) => p.isBundle);
  const otherProducts = filteredProducts.filter((p) => !p.isBundle);
  const showBundleHeader = filter === "all" && searchQuery.trim() === "" && bundle;

  return (
    <div className="space-y-10">
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/70 dark:bg-[#0f0f0f]/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                    : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                }`}
              >
                <Icon size={14} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search blueprints by app or use-case..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* 1. Master Bundle Highlight */}
        {showBundleHeader && (
          <div className="relative group rounded-3xl overflow-hidden border border-purple-500/30 dark:border-purple-500/20 bg-gradient-to-br from-purple-500/[0.06] via-slate-50 to-teal-500/[0.04] dark:from-purple-950/20 dark:via-[#0a0a0a] dark:to-teal-950/20 p-8 md:p-12 shadow-xl transition-all duration-300 hover:border-purple-500/50">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-teal-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
              <div className="space-y-5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-[11px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Master Collection Bundle
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-[11px] font-mono uppercase tracking-wider">
                    All 18 Production Blueprints
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  30-Day Automation Master Archive
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                  {bundle.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    "18 Production-Hardened JSON Files",
                    "Over 220+ Pre-Configured n8n Nodes",
                    "Self-Healing Error Handling Included",
                    "Step-by-Step Canvas Setup Guides",
                    "12-Month Breaking Change Warranty",
                    "Instant Whop Digital Delivery"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={15} className="text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Integration Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {bundle.integrations.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white dark:bg-white/[0.04] text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purchase Box */}
              <div className="w-full lg:w-80 shrink-0 bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl text-center space-y-5">
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                    Individual Value $640+
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white">
                    $149
                  </div>
                  <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                    Save Over 76% With Bundle
                  </div>
                </div>

                <a
                  href={bundle.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
                >
                  Acquire Master Archive <ArrowRight size={14} />
                </a>

                <div className="text-[10px] text-slate-400 leading-tight">
                  Instant Whop access • Direct JSON file downloads • Lifetime updates
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Grid of Individual Workflow Products */}
        {otherProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <div
                key={p.planId}
                className="group bg-white dark:bg-[#0c0c0c] border border-slate-200/80 dark:border-white/10 hover:border-teal-500/50 dark:hover:border-teal-400/40 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden border-b border-slate-200/60 dark:border-white/5">
                  <img
                    src={`/images/blog/${p.image}`}
                    alt={p.title}
                    className="object-cover w-full h-full opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Subtle technical gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-white border border-white/10">
                      {p.category === "ai-rag" && "AI & RAG"}
                      {p.category === "outreach" && "Outreach"}
                      {p.category === "inbound" && "Inbound"}
                      {p.category === "revops" && "RevOps"}
                    </span>

                    <span className="px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-white/95 dark:bg-black/90 text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 shadow-sm">
                      ${p.price}
                    </span>
                  </div>

                  {/* Bottom Blueprint Specs */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/90 text-[11px] font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Cpu size={12} className="text-teal-400" />
                      {p.nodeCount} Nodes
                    </span>
                    <span className="text-white/60 text-[10px] uppercase">
                      {p.complexity}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 md:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-teal-600 dark:text-teal-400 uppercase font-bold tracking-wider">
                      <FileCode2 size={12} />
                      <span>{p.executionType}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-2">
                      {p.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  {/* Tech stack pills & Purchase Button */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1">
                      {p.integrations.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.integrations.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                          +{p.integrations.length - 4}
                        </span>
                      )}
                    </div>

                    <a
                      href={p.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-600 dark:bg-white dark:hover:bg-teal-400 text-white dark:text-slate-950 dark:hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
                    >
                      <span>Acquire Blueprint</span>
                      <ChevronRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !showBundleHeader && (
            <div className="text-center py-16 bg-white/50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/10 rounded-3xl">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No blueprints match your filter criteria. Try clearing the search or selecting another category.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
