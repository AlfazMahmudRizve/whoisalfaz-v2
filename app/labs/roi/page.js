'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ROICalculator() {
    const [hours, setHours] = useState(10);
    const [rate, setRate] = useState(100);
    const [employees, setEmployees] = useState(1);

    const weeklyLoss = hours * rate * employees;
    const yearlyLoss = weeklyLoss * 52;
    const automationCost = 3000;

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
                <Link href="/labs" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 text-sm font-medium group">
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
                        Calculate the hidden drain on your business resources. See the real cost of "I'll just do it myself."
                    </p>
                </div>

                {/* Calculator Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

                        {/* LEFT: INPUTS */}
                        <div className="space-y-10">

                            {/* Hours Input */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="font-bold text-slate-200">Hours spent per week</label>
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
                                <p className="text-xs text-slate-500 mt-2">Time spent on repetitive manual tasks.</p>
                            </div>

                            {/* Rate Input */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="font-bold text-slate-200">Hourly Value ($)</label>
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
                                <p className="text-xs text-slate-500 mt-2">Your billing rate or effective hourly worth.</p>
                            </div>

                            {/* Employees Input */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="font-bold text-slate-200">Number of Employees</label>
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
                                <p className="text-xs text-slate-500 mt-2">People performing these tasks.</p>
                            </div>

                        </div>

                        {/* RIGHT: RESULTS */}
                        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-12">

                            <div className="text-center md:text-left mb-8">
                                <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Estimated Yearly Loss</div>
                                <div className="text-5xl md:text-6xl font-black text-red-500 tracking-tighter drop-shadow-lg">
                                    -{formatCurrency(yearlyLoss)}
                                </div>
                                <div className="text-slate-400 text-sm mt-2 font-mono">
                                    That's <span className="text-red-400">-{formatCurrency(weeklyLoss)}</span> wasted every week.
                                </div>
                            </div>

                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8 relative">
                                <div className="flex items-start gap-4">
                                    <AlertCircle size={24} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-emerald-400 font-bold mb-1">The Automation Fix</h3>
                                        <p className="text-emerald-200/70 text-sm leading-relaxed">
                                            You could automate this workflow completely for a typical one-time cost of roughly <span className="font-bold text-white">{formatCurrency(automationCost)}</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2 group"
                            >
                                Stop Losing Money – Book a Fix
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
