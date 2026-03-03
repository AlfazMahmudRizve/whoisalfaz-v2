'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';

export default function GlobalChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const [inputValue, setInputValue] = useState('');

    const { messages, status, sendMessage } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: '1',
                role: 'assistant',
                content: "Hi! I'm Alfaz AI. Ask me anything about automation or web dev.",
            }
        ]
    });

    const isLoading = status === 'streaming' || status === 'submitted';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isLoading, isOpen]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const tempVal = inputValue;
        setInputValue(''); // Clear immediately for UX

        sendMessage({
            role: 'user',
            content: tempVal
        });
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close chat" : "Open chat"}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.3)] text-black hover:bg-teal-400 transition-colors"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center overflow-hidden">
                                <Image src="/logo.png" alt="Alfaz AI" width={32} height={32} className="object-cover" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Alfaz AI Agent</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-slate-400 font-mono tracking-wider">ONLINE</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {msg.role !== 'user' && (
                                        <div className="w-6 h-6 rounded flex-shrink-0 bg-black/50 border border-white/10 overflow-hidden">
                                            <Image src="/logo.png" alt="AI" width={24} height={24} className="object-cover" />
                                        </div>
                                    )}
                                    <div className={`
                    max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap
                    ${msg.role !== 'user' ? 'bg-[#151515] text-slate-300 rounded-tl-none border border-white/5' : 'bg-teal-500/20 text-teal-50 border border-teal-500/20 rounded-tr-none'}
                  `}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 rounded flex-shrink-0 bg-black/50 border border-white/10 overflow-hidden">
                                        <Image src="/logo.png" alt="AI" width={24} height={24} className="object-cover" />
                                    </div>
                                    <div className="bg-[#151515] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                                        <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white/5 border-t border-white/5">
                            <form onSubmit={handleFormSubmit} className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask a question..."
                                    className="w-full bg-[#151515] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-teal-500 text-black rounded-lg hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
