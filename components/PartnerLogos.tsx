"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as si from 'simple-icons';

interface Partner {
    name: string;
    logo?: string;
    siKey?: string;
    customPath?: string;
}

const partners: Partner[] = [
    { name: "n8n", customPath: "M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" },
    { name: "HubSpot", customPath: "M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" },
    { name: "Apollo.io", customPath: "M12,0C5.372,0 0,5.373 0,12 0,18.628 5.372,24 12,24 18.627,24 24,18.628 24,12A12.014,12.014 0 0 0 23.527,8.657 0.6,0.6 0 0 0 22.4,9.066H22.398C22.663,10.009 22.8,10.994 22.8,12A10.73,10.73 0 0 1 19.637,19.637 10.729,10.729 0 0 1 12,22.8 10.73,10.73 0 0 1 4.363,19.637 10.728,10.728 0 0 1 1.2,12 10.73,10.73 0 0 1 4.363,4.363 10.728,10.728 0 0 1 12,1.2C14.576,1.2 17.013,2.096 18.958,3.74A1.466,1.466 0 1 0 19.82,2.9 11.953,11.953 0 0 0 12,0ZM10.56,5.88 6.36,16.782H8.99L9.677,14.934H13.646L12.927,12.892H10.314L12.014,8.201 15.038,16.781H17.669L13.47,5.88Z" },
    { name: "Databox", customPath: "M24 16.51H20V24h4v-7.49zM14 6.49H10V24h4V6.49zM4 14.51H0V24h4v-9.49z" },
    { name: "Brevo", customPath: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM7.2 4.8h5.747c2.34 0 3.895 1.406 3.895 3.516 0 1.022-.348 1.862-1.09 2.588C17.189 11.812 18 13.22 18 14.785c0 2.86-2.64 5.016-6.164 5.016H7.199v-15zm2.085 1.952v5.537h.07c.233-.432.858-.796 2.249-1.226 2.039-.659 3.037-1.52 3.037-2.655 0-.998-.766-1.656-1.924-1.656H9.285zm4.87 5.266c-.766.385-1.67.748-2.76 1.11-1.229.387-2.11 1.386-2.11 2.407v2.315h2.365c2.387 0 4.149-1.34 4.149-3.155 0-1.067-.625-2.087-1.645-2.677z" },
    { name: "monday.com", customPath: "M21.926 7.647h-4.32a.112.112 0 0 0-.112.112v8.482c0 .062.05.112.112.112h4.32a.112.112 0 0 0 .112-.112V7.759a.112.112 0 0 0-.112-.112zm-7.603 3.635H9.988a.112.112 0 0 0-.112.112v5.047c0 .062.051.112.112.112h4.335a.112.112 0 0 0 .112-.112v-5.047a.112.112 0 0 0-.112-.112zm-7.618 2.652H2.385a.112.112 0 0 0-.112.113v2.395c0 .062.051.112.112.112h4.32a.112.112 0 0 0 .112-.112v-2.395a.112.112 0 0 0-.112-.113z" },
    { name: "Pinecone", customPath: "M15.42 1.48a.47.47 0 0 0-.84 0L12 6.57 9.42 1.48a.47.47 0 0 0-.84 0L.11 19.38a.47.47 0 0 0 .42.62H23.47a.47.47 0 0 0 .42-.62L15.42 1.48zM12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" },
    { name: "Weaviate", siKey: "siWeaviate" },
    { name: "Surfer SEO", customPath: "M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.2 16.2L8.5 12l7.7-4.2v8.4z" },
    { name: "Wati", customPath: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.1 15.6h-10.2v-1.2h10.2v1.2zm0-3.6h-10.2v-1.2h10.2v1.2zm0-3.6h-10.2V7.2h10.2v1.2z" }
];

interface PartnerLogosProps {
    title: string;
    subtitle?: string;
    variant?: 'grid' | 'marquee' | 'stack';
}

export default function PartnerLogos({ title, subtitle, variant = 'grid' }: PartnerLogosProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoPlay = () => {
        if (variant === 'stack' && isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % partners.length);
            }, 4000);
        }
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [variant, isAutoPlaying]);

    const handleDragEnd = (event: React.PointerEvent | PointerEvent | TouchEvent | MouseEvent, info: { offset: { x: number, y: number } }) => {
        if (Math.abs(info.offset.x) > 50) {
            setIsAutoPlaying(false); // Pause auto-play on manual interaction
            if (info.offset.x > 0) {
                setActiveIndex((prev) => (prev - 1 + partners.length) % partners.length);
            } else {
                setActiveIndex((prev) => (prev + 1) % partners.length);
            }
            // Resume after 10s of inactivity
            setTimeout(() => setIsAutoPlaying(true), 10000);
        }
    };

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
                        className="text-slate-400 text-sm max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            {variant === 'stack' ? (
                <div className="relative h-[450px] w-full flex items-center justify-center perspective-[1200px] touch-none">
                    <div className="relative w-full max-w-[320px] h-full flex items-center justify-center">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {partners.map((partner, i) => {
                                const total = partners.length;
                                const offset = (i - activeIndex + total) % total;

                                // Map offset to circular logic for display
                                const visualOffset = offset > total / 2 ? offset - total : offset;
                                const absOffset = Math.abs(visualOffset);

                                // Show center, 2 next, 2 previous
                                if (absOffset > 2) return null;

                                return (
                                    <motion.div
                                        key={partner.name}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={handleDragEnd}
                                        layout
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                            x: visualOffset * 100,
                                            z: -200
                                        }}
                                        animate={{
                                            opacity: 1 - absOffset * 0.3,
                                            scale: 1 - absOffset * 0.12,
                                            x: visualOffset * 140,
                                            z: -absOffset * 150,
                                            rotateY: visualOffset * -20,
                                            rotateZ: visualOffset * -2,
                                            zIndex: total - absOffset,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.5,
                                            x: visualOffset > 0 ? 300 : -300
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                        className="absolute w-64 h-80 bg-[#0d0d0d] border border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl cursor-grab active:cursor-grabbing group select-none overflow-hidden"
                                    >
                                        <div className="w-full h-full flex flex-col items-center justify-between text-center py-4">
                                            {/* Logo Container */}
                                            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500 group-hover:scale-110 shadow-inner">
                                                {partner.siKey && (si as any)[partner.siKey] ? (
                                                    <svg
                                                        role="img"
                                                        viewBox="0 0 24 24"
                                                        className="w-12 h-12 fill-slate-400 group-hover:fill-white transition-colors duration-500"
                                                        dangerouslySetInnerHTML={{ __html: ((si as any)[partner.siKey] as { path: string }).path }}
                                                    />
                                                ) : partner.customPath ? (
                                                    <svg
                                                        role="img"
                                                        viewBox="0 0 24 24"
                                                        className="w-12 h-12 fill-slate-400 group-hover:fill-white transition-colors duration-500"
                                                    >
                                                        <path d={partner.customPath} />
                                                    </svg>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                                                        <span className="text-white/20 text-2xl font-bold">
                                                            {partner.name[0]}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="text-white text-lg font-bold tracking-tight">{partner.name}</h4>
                                                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">Infrastructure Node</p>
                                            </div>

                                            {/* Stack Indicator dots */}
                                            <div className="flex gap-1.5 mt-2">
                                                {partners.slice(0, 5).map((_, dotIdx) => (
                                                    <div
                                                        key={dotIdx}
                                                        className={`w-1 h-1 rounded-full transition-all ${Math.floor(activeIndex % 5) === dotIdx ? 'bg-blue-500 w-3' : 'bg-white/10'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Premium Overlay Effects */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                <div className={variant === 'grid'
                    ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80 px-6"
                    : "flex flex-wrap items-center justify-center gap-12 opacity-80"
                }>
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="relative group transition-all duration-500"
                        >
                            <div className="h-8 md:h-10 px-4 flex items-center justify-center filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500 gap-3">
                                {partner.siKey && (si as any)[partner.siKey] ? (
                                    <svg
                                        role="img"
                                        viewBox="0 0 24 24"
                                        className="w-4 h-4 fill-current text-slate-500 group-hover:text-white transition-colors"
                                        dangerouslySetInnerHTML={{ __html: ((si as any)[partner.siKey] as { path: string }).path }}
                                    />
                                ) : partner.customPath ? (
                                    <svg
                                        role="img"
                                        viewBox="0 0 24 24"
                                        className="w-4 h-4 fill-current text-slate-500 group-hover:text-white transition-colors"
                                    >
                                        <path d={partner.customPath} />
                                    </svg>
                                ) : null}
                                <span className="text-slate-500 text-[10px] md:text-sm font-bold tracking-tighter uppercase group-hover:text-white transition-colors">
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
