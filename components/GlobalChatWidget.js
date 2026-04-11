'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send } from 'lucide-react';

const KNOWLEDGE_BASE = [
    {
        keywords: ['pricing', 'cost', 'price', 'rates', 'fee', 'charge', 'much'],
        response: "My pricing is structured to deliver immediate ROI:\n• Automation Workflows start at $300\n• Headless Web Systems start at $1,500\n• Strategy & Consulting is $200/hr\n\nWould you like to book a discovery call to get a custom quote?"
    },
    {
        keywords: ['who', 'alfaz', 'you', 'name', 'about', 'background'],
        response: "I'm the designated virtual assistant for Alfaz Mahmud Rizve. Alfaz is a Full-Stack Automation Architect and Business Growth Consultant. He specializes in helping SaaS founders and agencies scale by replacing fragile 'Zapier Band-Aids' with enterprise-grade, autonomous systems."
    },
    {
        keywords: ['contact', 'email', 'hire', 'book', 'call', 'reach', 'touch', 'meeting'],
        response: "You can reach Alfaz directly via email at contact@whoisalfaz.me, or you can use the Contact page on this site to book a free 30-minute discovery call."
    },
    {
        keywords: ['stack', 'tech', 'technology', 'tools', 'software', 'build', 'framework'],
        response: "Alfaz builds high-performance infrastructure. His core tech stack includes:\n• Next.js & React (Frontend/Backend)\n• n8n & Python (Enterprise Automation & AI)\n• Prisma (Database ORM)\n• Tailwind CSS (Styling)\n• Vercel & DigitalOcean (Deployment)"
    },
    {
        keywords: ['service', 'offer', 'do', 'help', 'automation', 'web', 'agency', 'saas'],
        response: "Alfaz offers three core services:\n1. Custom Automation Workflows (n8n/Make)\n2. High-Performance Headless Web Apps (Next.js)\n3. RevOps Strategy & Consulting\n\nHe essentially builds the 'central nervous system' for scaling businesses so you can focus on revenue, not admin work."
    }
];

const DEFAULT_RESPONSE = "I'm a localized virtual assistant trained on Alfaz's business. I can instantly answer questions about his pricing, services, tech stack, and background. What would you like to know?";

export default function GlobalChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm Alfaz's virtual assistant. Ask me anything about his pricing, services, or tech stack.",
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isTyping, isOpen]);

    // CSS transition: open triggers visible after a frame
    useEffect(() => {
        if (isOpen) {
            // Allow DOM to paint the initial state, then trigger transition
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setIsVisible(true));
            });
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for CSS exit transition before unmounting
        setTimeout(() => setIsOpen(false), 200);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userText = inputValue.trim();
        if (!userText || isTyping) return;

        const newMessages = [...messages, { id: Date.now().toString(), role: 'user', content: userText }];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const lowerInput = userText.toLowerCase();
            let aiResponse = DEFAULT_RESPONSE;

            for (const item of KNOWLEDGE_BASE) {
                if (item.keywords.some(kw => lowerInput.includes(kw))) {
                    aiResponse = item.response;
                    break;
                }
            }

            setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponse }]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => isOpen ? handleClose() : setIsOpen(true)}
                aria-label={isOpen ? "Close chat" : "Open chat"}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.3)] text-black hover:bg-teal-400 hover:scale-105 active:scale-95 transition-all duration-200"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window — pure CSS transitions, no framer-motion */}
            {isOpen && (
                <div
                    className={`fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5 transition-all duration-200 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
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

                        {isTyping && (
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
                                disabled={!inputValue.trim() || isTyping}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-teal-500 text-black rounded-lg hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
