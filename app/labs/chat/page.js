'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Send, User, Sparkles, ArrowRight, Search, Zap, Bot, ShieldCheck, HelpCircle, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm Alfaz AI. I can help you estimate project costs, explain Headless Architecture, audit your current stack, or design self-healing n8n workflows. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = {
            id: Date.now() + Math.random(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputValue }),
            });

            const data = await response.json();

            if (response.ok) {
                const aiMsg = {
                    id: Date.now() + 1 + Math.random(),
                    text: data.reply,
                    sender: 'ai',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMsg]);
            } else {
                throw new Error(data.error || 'Failed to fetch');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMsg = {
                id: Date.now() + 1 + Math.random(),
                text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const sampleQueries = [
        "How do I prevent duplicate leads in an n8n workflow?",
        "What is the cost difference between Zapier and self-hosted n8n?",
        "How can I optimize Next.js Core Web Vitals for maximum SEO performance?",
        "What are the prerequisites for building an enterprise RevOps engine?"
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a] flex flex-col pt-24 pb-16 px-4 md:px-0 relative overflow-hidden selection:bg-teal-500/30 text-white">

            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -z-10" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

            {/* Header */}
            <div className="max-w-3xl mx-auto w-full flex items-center justify-between mb-6 px-4">
                <h1 className="sr-only">Alfaz AI Chat - Automation & RevOps Assistant</h1>
                <Link href="/labs/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Labs
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Alfaz AI v1.0 Online</span>
                </div>
            </div>

            {/* Chat Container */}
            <div className="max-w-3xl mx-auto w-full h-[550px] bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-sm relative mb-8">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                {/* Avatar */}
                                <div className={`
                                  w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden
                                  ${msg.sender === 'ai' ? 'bg-black/50 border border-white/10' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'}
                                `}>
                                    {msg.sender === 'ai' ? (
                                        <Image src="/logo.png" alt="Alfaz AI" width={32} height={32} className="object-cover" />
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>

                                {/* Bubble */}
                                <div className={`
                                  max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-line
                                  ${msg.sender === 'ai' ? 'bg-[#111] border border-white/10 text-slate-300 rounded-tl-none' : 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-none'}
                                `}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4"
                            >
                                <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <Image src="/logo.png" alt="Alfaz AI" width={32} height={32} className="object-cover" />
                                </div>
                                <div className="bg-[#111] border border-white/10 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1.5 min-w-[3rem]">
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#0a0a0a]/50 border-t border-white/5 backdrop-blur-md">
                    <form onSubmit={handleSend} className="relative flex items-end gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about n8n workflows, RevOps, or project costs..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[50px] text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all font-medium text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className="
                                h-[50px] w-[50px] flex-shrink-0 bg-teal-500 text-black rounded-xl flex items-center justify-center
                                hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.2)]
                            "
                        >
                            <Send size={20} />
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-slate-600 flex items-center justify-center gap-1">
                            <Sparkles size={8} /> Powered by Alfaz AI v1.0 • Trained on RevOps & Engineering System Rules
                        </p>
                    </div>
                </div>

            </div>

            {/* TOOL DOCUMENTATION & USAGE GUIDELINES */}
            <div className="max-w-3xl mx-auto w-full space-y-6 mb-8 px-4">
                
                {/* Capabilities & Knowledge Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
                            <Bot size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-white uppercase tracking-tight">
                            About Alfaz AI Assistant
                        </h2>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Alfaz AI is a specialized conversational assistant trained explicitly on our RevOps engineering methodologies, n8n workflow schemas, API payload structures, and full-stack Next.js optimization practices.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                        <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                            <ShieldCheck size={16} className="text-teal-400 mt-0.5 shrink-0" />
                            <span><strong>Stateless & Secure:</strong> Chat sessions are processed ephemerally without persisting sensitive business logic or personal data.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                            <Terminal size={16} className="text-purple-400 mt-0.5 shrink-0" />
                            <span><strong>Deterministic Logic:</strong> Engineered to provide concrete architectural guidance rather than generic AI fluff.</span>
                        </div>
                    </div>
                </div>

                {/* Sample Prompt Guidelines */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                            <HelpCircle size={18} />
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                            Recommended Prompts & Test Queries
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sampleQueries.map((query, i) => (
                            <button
                                key={i}
                                onClick={() => setInputValue(query)}
                                className="text-left text-xs bg-white/5 hover:bg-white/10 border border-white/5 hover:border-teal-500/30 p-3 rounded-xl text-slate-300 hover:text-white transition-all group"
                            >
                                <span className="text-teal-400 font-mono mr-1">→</span> {query}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Cross-links to prevent dead end */}
            <div className="max-w-3xl mx-auto w-full grid grid-cols-2 gap-3 px-4">
                <Link href="/audit/" className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/20 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Search size={14} />
                    </div>
                    <div>
                        <span className="text-white text-xs font-bold block">Free Audit</span>
                        <span className="text-slate-500 text-[10px]">Check your site</span>
                    </div>
                </Link>
                <Link href="/services/" className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/20 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Zap size={14} />
                    </div>
                    <div>
                        <span className="text-white text-xs font-bold block">Services</span>
                        <span className="text-slate-500 text-[10px]">View solutions</span>
                    </div>
                </Link>
            </div>
        </main>
    );
}

