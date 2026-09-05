'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, Sparkles } from 'lucide-react';
import { projects, CATEGORIES, CategoryId } from '@/data/projects';

export default function PortfolioProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    }
    return projects.filter((p) => p.categories.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="space-y-12">
      {/* SECTION HEADER & CATEGORY FILTER TABS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm dark:shadow-none">
            <Sparkles size={13} className="text-amber-500" />
            Selected Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
            Featured Work
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Selected automation and web projects.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-md'
                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            All ({projects.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = projects.filter((p) => p.categories.includes(cat.id)).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-md'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* UNIFIED PROJECTS GRID - ALL CARDS IN IDENTICAL COHESIVE GEOMETRY */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, i) => (
          <a
            key={project.id}
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${i * 100}ms` }}
            className={`animate-in fade-in zoom-in-95 duration-700 fill-mode-both group bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden ${project.theme.hoverBorder} shadow-xl hover:shadow-2xl dark:shadow-none transition-all cursor-pointer flex flex-col`}
          >
            {/* Top Logo / Visual Container */}
            <div className="h-48 bg-slate-50 dark:bg-[#050505] border-b border-slate-100 dark:border-white/5 group-hover:bg-slate-100 dark:group-hover:bg-white/[0.02] transition-colors relative p-8 flex items-center justify-center overflow-hidden">
              {project.id === 'heaven-atelier' ? (
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent rounded-2xl" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-[#E8DCC8]">
                    <span>Racdox 2026</span>
                    <span className="text-amber-300 font-bold">Vitest 31/31</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={`${project.title} Logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Badge overlay on top right */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-black shadow-sm ${project.theme.badgeBg} ${project.theme.badgeText} border ${project.theme.badgeBorder}`}
                >
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-full text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black shadow-sm dark:shadow-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight group-hover:text-amber-600 dark:group-hover:text-teal-400 transition-colors">
                  {project.shortTitle || project.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest border-b border-transparent group-hover:border-amber-600 dark:group-hover:border-amber-400 transition-colors flex items-center gap-2 w-max">
                  View Experience <ExternalLink size={14} />
                </span>

                {project.repoUrl && (
                  <span className="text-[11px] font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    GitHub Code ↗
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
