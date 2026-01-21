'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Send, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm Alfaz AI. I can help you estimate project costs, explain Headless Architecture, or audit your current stack. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Auto-scroll removed as per user request
    // const messagesEndRef = useRef(null);
    // const scrollToBottom = () => {
    //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };
    // useEffect(() => {
    //   scrollToBottom();
    // }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add User Message with UNIQUE ID
        const userMsg = {
            id: Date.now() + Math.random(), // Unique ID to prevent key collision
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Send to API (Rule-Based Mock)
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputValue }),
            });

            const data = await response.json();

            if (response.ok) {
                const aiMsg = {
                    id: Date.now() + 1 + Math.random(), // Unique ID
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
                id: Date.now() + 1 + Math.random(), // Unique ID
                text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <main className="h-screen bg-[#0a0a0a] flex flex-col pt-24 pb-6 px-4 md:px-0 relative overflow-hidden selection:bg-teal-500/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -z-10" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

            {/* Header */}
            <div className="max-w-3xl mx-auto w-full flex items-center justify-between mb-6 px-4">
                <Link href="/labs" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Labs
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Alfaz AI Online</span>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 max-w-3xl mx-auto w-full bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-sm relative">

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
                        {/* <div ref={messagesEndRef} /> */}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#0a0a0a]/50 border-t border-white/5 backdrop-blur-md">
                    <form onSubmit={handleSend} className="relative flex items-end gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about automation or project costs..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[50px] text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all font-medium"
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
                            <Sparkles size={8} /> Powered by Alfaz AI v1.0
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
