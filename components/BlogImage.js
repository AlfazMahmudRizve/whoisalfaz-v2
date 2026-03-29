"use client";
import { useState, useCallback } from 'react';
import Image from 'next/image';

export default function BlogImage({ src, alt, ...props }) {
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    // Handle keyboard escape
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') setOpen(false);
    }, []);

    if (!src) return null;

    // Check if user manually passed priority in MDX (e.g. `<img src="..." priority="true" />`)
    const isPriority = props.priority === "true" || props.priority === true;

    // Generate SEO fallback alt text from the filename if manually omitted
    const fallbackAltText = typeof src === 'string' 
        ? src.split('/').pop()?.split('.')[0]?.replace(/-/g, ' ') 
        : 'Article reference image';
        
    const finalAlt = alt || fallbackAltText;

    return (
        <>
            {/* Inline Image (clickable) */}
            <span
                role="button"
                tabIndex={0}
                onClick={handleOpen}
                onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
                className="block cursor-zoom-in my-12 group"
            >
                <Image
                    src={src}
                    alt={finalAlt}
                    width={1200}
                    height={675}
                    quality={85}
                    priority={isPriority}
                    loading={isPriority ? "eager" : "lazy"}
                    fetchPriority={isPriority ? "high" : "auto"}
                    className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 group-hover:shadow-teal-500/10 group-hover:border-teal-500/30"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                    {...props}
                />
                <span className="block text-center text-xs text-slate-600 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand
                </span>
            </span>

            {/* Lightbox Overlay */}
            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-200"
                    onClick={handleClose}
                    onKeyDown={handleKeyDown}
                    tabIndex={-1}
                    ref={(el) => el?.focus()}
                >
                    <Image
                        src={src}
                        alt={finalAlt}
                        width={1920}
                        height={1080}
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        sizes="90vw"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {/* Close hint */}
                    <span className="absolute top-6 right-6 text-slate-500 text-sm font-mono">ESC to close</span>
                </div>
            )}
        </>
    );
}
