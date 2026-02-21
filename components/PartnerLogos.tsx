"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Partner {
    name: string;
    logo?: string;
}

const partners: Partner[] = [
    { name: "n8n" },
    { name: "HubSpot" },
    { name: "Elementor" },
    { name: "Apollo.io" },
    { name: "Databox" },
    { name: "Brevo" },
    { name: "monday.com" },
    { name: "Pinecone" },
    { name: "Weaviate" },
    { name: "Surfer SEO" },
    { name: "Wati" }
];

interface PartnerLogosProps {
    title: string;
    subtitle?: string;
    variant?: 'grid' | 'marquee' | 'stack';
}

export default function PartnerLogos({ title, subtitle, variant = 'grid' }: PartnerLogosProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (variant === 'stack') {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % partners.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [variant]);

    return (
        <div className="w-full">
            <div className="text-center mb-10">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono"
                >
                    {title}
                </motion.h3>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-400 text-sm"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            {variant === 'stack' ? (
                <div className="relative h-[400px] w-full flex items-center justify-center perspective-[1200px] overflow-hidden">
                    <div className="relative w-full max-w-[300px] h-full flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                            {partners.map((partner, i) => {
                                // Calculate position relative to activeIndex
                                const total = partners.length;
                                const offset = (i - activeIndex + total) % total;

                                // Show only a few cards for the stack effect
                                if (offset > 3 && offset < total - 3) return null;

                                // Map offset to visual properties
                                // 0: Center (Active)
                                // 1, 2, 3: Right/Back
                                // -1, -2, -3: Left/Back
                                const visualOffset = offset > total / 2 ? offset - total : offset;
                                const absOffset = Math.abs(visualOffset);

                                return (
                                    <motion.div
                                        key={partner.name}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8, x: visualOffset * 100 }}
                                        animate={{
                                            opacity: 1 - absOffset * 0.25,
                                            scale: 1 - absOffset * 0.1,
                                            x: visualOffset * 120,
                                            z: -absOffset * 100,
                                            rotateY: visualOffset * -15,
                                            zIndex: total - absOffset,
                                        }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20
                                        }}
                                        className="absolute w-64 h-80 bg-[#111] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl backdrop-blur-xl group"
                                    >
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                                            {/* Logo Placeholder Box */}
                                            <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                                <span className="text-white/10 text-4xl">
                                                    {partner.name[0]}
                                                </span>
                                            </div>

                                            <div className="text-center">
                                                <h4 className="text-white font-bold tracking-tight mb-1">{partner.name}</h4>
                                                <div className="h-0.5 w-8 bg-white/20 mx-auto rounded-full group-hover:w-12 transition-all"></div>
                                            </div>

                                            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/5 uppercase tracking-widest">
                                                Partner ID: {i.toString().padStart(2, '0')}
                                            </div>
                                        </div>

                                        {/* Glare Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                <div className={variant === 'grid'
                    ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80"
                    : "flex flex-wrap items-center justify-center gap-12 opacity-80"
                }>
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="relative group transition-all duration-500"
                        >
                            <div className="h-8 md:h-10 px-4 flex items-center justify-center filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500">
                                <span className="text-slate-500 text-[10px] md:text-xs font-bold tracking-tighter uppercase group-hover:text-white transition-colors">
                                    {partner.name}
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full"></div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
