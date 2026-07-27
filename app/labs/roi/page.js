'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertCircle, ArrowRight, ShieldAlert, CheckCircle2, DollarSign, Clock, HelpCircle, BookOpen } from 'lucide-react';

export default function ROICalculator() {
    const [hours, setHours] = useState(10);
    const [rate, setRate] = useState(100);
    const [employees, setEmployees] = useState(1);

    const weeklyLoss = hours * rate * employees;
    const yearlyLoss = weeklyLoss * 52;
    const automationCost = 3000;

    const netFirstYearSavings = Math.max(0, yearlyLoss - automationCost);
    const roiPercentage = Math.round((netFirstYearSavings / automationCost) * 100);
    const paybackWeeks = (automationCost / (weeklyLoss || 1)).toFixed(1);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] text-white selection:bg-red-500/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto">
                {/* Nav Back */}
                <Link href="/labs/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-medium group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Labs
                </Link>

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-2xl mb-6">
                        <Calculator size={32} className="text-red-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        How Much is <span className="text-red-500">Manual Work</span> Costing You?
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Calculate the hidden operational drain on your agency resources. See the mathematical reality of manual tasks and discover your automation ROI.
                    </p>
                </div>

                {/* Calculator Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden mb-16">

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

                        {/* LEFT: INPUTS */}
                        <div className="space-y-10">

                            {/* Hours Input */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="font-bold text-slate-200">Hours spent per week (H)</label>
                                    <span className="text-blue-400 font-mono font-bold bg-blue-500/10 px-2 py-0.5 rounded">{hours} hrs</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="40"
                                    value={hours}
                                    onChange={(e) => setHours(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                                />
                                <p className="text-xs text-slate-500 mt-2">Repetitive tasks per employee (copy-pasting, manual reporting, manual lead routing).</p>
                            </div>

                            {/* Rate Input */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="font-bold text-slate-200">Hourly Value / Rate ($ R)</label>
                                    <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">${rate}/hr</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="500"
                                    step="5"
                                    value={rate}
                                    onChange={(e) => setRate(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                                />
                                <p className="text-xs text-slate-500 mt-2">Effective hourly cost or billable rate of team members.</p>
                            </div>

                            {/* Employees Input */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="font-bold text-slate-200">Number of Team Members (N)</label>
                                    <span className="text-purple-400 font-mono font-bold bg-purple-500/10 px-2 py-0.5 rounded">{employees}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={employees}
                                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                                />
                                <p className="text-xs text-slate-500 mt-2">Number of personnel executing these routine steps.</p>
                            </div>

                        </div>

                        {/* RIGHT: RESULTS */}
                        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-12">

                            <div className="text-center md:text-left mb-8">
                                <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Estimated Yearly Financial Drain</div>
                                <div className="text-5xl md:text-6xl font-black text-red-500 tracking-tighter drop-shadow-lg">
                                    -{formatCurrency(yearlyLoss)}
                                </div>
                                <div className="text-slate-400 text-sm mt-2 font-mono">
                                    That&apos;s <span className="text-red-400">-{formatCurrency(weeklyLoss)}</span> wasted every week across {employees} member(s).
                                </div>
                            </div>

                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8 relative">
                                <div className="flex items-start gap-4">
                                    <AlertCircle size={24} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-emerald-400 font-bold mb-1">The Automation Fix & Payback</h3>
                                        <p className="text-emerald-200/70 text-xs leading-relaxed mb-3">
                                            Automating this workflow costs a typical one-time architecture fee of <span className="font-bold text-white">{formatCurrency(automationCost)}</span>.
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-300">
                                                Payback: <strong className="text-white">{paybackWeeks} wks</strong>
                                            </div>
                                            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-300">
                                                1-Yr ROI: <strong className="text-white">+{roiPercentage}%</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/contact/"
                                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2 group text-sm uppercase tracking-wider"
                            >
                                Stop Losing Money – Book a Fix
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                        </div>
                    </div>
                </div>

                {/* FORMULAS & USAGE GUIDELINES SECTION */}
                <div className="space-y-8 mb-16">
                    {/* Mathematical Formulas Card */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                <BookOpen size={20} />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">
                                Calculation Formula & Methodology
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Our ROI calculator evaluates operational inefficiency using standardized corporate RevOps benchmarking formulas:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <h3 className="font-bold text-teal-400 mb-2 font-mono text-xs uppercase tracking-widest">1. Weekly Financial Loss</h3>
                                <p className="font-mono text-xs text-slate-400 bg-black/40 p-3 rounded-lg border border-white/5 mb-2">
                                    Weekly Loss = Hours × Rate × Employees
                                </p>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Calculates the direct payroll or opportunity cost lost every 7 days due to manual execution.
                                </p>
                            </div>

                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <h3 className="font-bold text-purple-400 mb-2 font-mono text-xs uppercase tracking-widest">2. Payback Period & Net ROI</h3>
                                <p className="font-mono text-xs text-slate-400 bg-black/40 p-3 rounded-lg border border-white/5 mb-2">
                                    Payback Weeks = One-Time Cost ÷ Weekly Loss
                                </p>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Determines how many weeks of workflow operation are required to fully recover capital deployment costs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Usage Guidelines Card */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                <CheckCircle2 size={20} />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">
                                Step-by-Step Usage Guidelines
                            </h2>
                        </div>
                        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                            <p>
                                <strong>Step 1: Estimate Weekly Hours (H):</strong> Calculate the average hours your team spends weekly on manual tasks such as copying lead data between CRMs, crafting routine updates, or aggregating financial reports.
                            </p>
                            <p>
                                <strong>Step 2: Define Hourly Value (R):</strong> Use your client billing rate (for founders/agency owners) or fully burdened employee hourly cost (salary + benefits ÷ 2,000 hours).
                            </p>
                            <p>
                                <strong>Step 3: Select Team Scope (N):</strong> Adjust the slider to represent the total headcount affected by these operational friction points.
                            </p>
                            <p>
                                <strong>Step 4: Evaluate Payback:</strong> Review the estimated payback period. Workflows with payback periods under 8 weeks represent prime candidates for immediate automation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cross-links */}
                <div className="grid sm:grid-cols-2 gap-5">
                    <Link
                        href="/audit/"
                        className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/30 transition-all hover:-translate-y-1"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                            <AlertCircle size={18} />
                        </div>
                        <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Free Website Audit</h3>
                        <p className="text-slate-500 text-xs leading-relaxed mb-3">Check your SEO, performance, SSL, and security in 30 seconds.</p>
                        <span className="text-teal-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                            Run Audit <ArrowRight size={12} />
                        </span>
                    </Link>
                    <Link
                        href="/services/"
                        className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1"
                    >
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                            <Calculator size={18} />
                        </div>
                        <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Automation Solutions</h3>
                        <p className="text-slate-500 text-xs leading-relaxed mb-3">Custom n8n workflows, AI agents, and full-stack apps built for scale.</p>
                        <span className="text-purple-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Services <ArrowRight size={12} />
                        </span>
                    </Link>
                </div>

            </div>
        </main>
    );
}

