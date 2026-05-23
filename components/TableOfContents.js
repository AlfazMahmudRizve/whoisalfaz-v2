'use client';

import { useState, useEffect, useRef } from 'react';

export default function TableOfContents() {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        // 1. Find all headings inside the prose content
        const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3'));

        // 2. Generate IDs and create data structure
        const headingData = elements.map((elem, index) => {
            const id = elem.id || `heading-${index}`;
            elem.id = id; // Ensure it has an ID
            return {
                id,
                text: elem.textContent,
                level: elem.tagName.toLowerCase()
            };
        });

        const timer = setTimeout(() => {
            setHeadings(headingData);
        }, 0);

        // 3. Optional: Intersection Observer for active state
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (activeId && containerRef.current) {
            const activeElement = containerRef.current.querySelector(`[data-id="${activeId}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [activeId]);

    if (headings.length === 0) return null;

    return (
        <ul ref={containerRef} className="space-y-3 text-sm border-l border-white/10 max-h-[60vh] overflow-y-auto scrollbar-none pr-2">
            {headings.map((heading) => (
                <li 
                    key={heading.id} 
                    data-id={heading.id}
                    className={`pl-4 transition-all duration-300 ${heading.level === 'h3' ? 'ml-2' : ''} ${activeId === heading.id ? 'border-l-2 border-blue-500 text-slate-900 dark:text-white font-black -ml-[1px] bg-slate-50 dark:bg-white/5 py-1 rounded-r-lg' : 'text-slate-400 hover:text-blue-400'}`}
                >
                    <a href={`#${heading.id}`} className="block py-1" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Offset for sticky header if unnecessary since scrollIntoView block start handles it often, 
                        // but if there's a fixed header, manual offset via window.scrollTo might be needed.
                    }}>
                        {heading.text}
                    </a>
                </li>
            ))}
        </ul>
    );
}
