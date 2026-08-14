'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface TypewriterHeadingProps {
  /** First segment of text styled in crisp white / dark slate (default: "Autonomous Revenue Engines Built on Sub-Second Infrastructure") */
  text1?: string;
  /** Second segment of text styled with neon purple-teal gradient (default: " — Engineered to Scale Your Agency to 8 Figures!") */
  text2?: string;
  /** Speed per character in milliseconds (default: 35) */
  typingSpeed?: number;
  /** Delay in milliseconds before typing begins (default: 400) */
  startDelay?: number;
  /** Optional callback fired when typing completes */
  onComplete?: () => void;
  /** Optional additional class name for the wrapper heading */
  className?: string;
  /** HTML Tag to render (default: 'h1') */
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

/**
 * TypewriterHeading Component
 * 
 * High-performance, SSR-safe character-by-character typewriter heading
 * designed for the hero section with Urbanist font, dual-tone gradient styling,
 * accessible SEO indexing, and an animated neon cursor.
 */
export function TypewriterHeading({
  text1 = 'Autonomous Revenue Engines Built on Sub-Second Infrastructure',
  text2 = ' — Engineered to Scale Your Agency to 8 Figures!',
  typingSpeed = 35,
  startDelay = 400,
  onComplete,
  className = '',
  as: Tag = 'h1',
}: TypewriterHeadingProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  const fullText = useMemo(() => `${text1}${text2}`, [text1, text2]);
  const totalLength = fullText.length;
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setMounted(true);
    setDisplayedCount(0);
    setIsTypingComplete(false);

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let currentLength = 0;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        currentLength += 1;
        setDisplayedCount(currentLength);

        if (currentLength >= totalLength) {
          if (intervalId) clearInterval(intervalId);
          setIsTypingComplete(true);
          onCompleteRef.current?.();
        }
      }, typingSpeed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [fullText, totalLength, typingSpeed, startDelay]);

  // Slices for text1 and text2
  const text1Slice = mounted
    ? fullText.slice(0, Math.min(displayedCount, text1.length))
    : text1;

  const text2Slice = mounted && displayedCount > text1.length
    ? fullText.slice(text1.length, Math.min(displayedCount, totalLength))
    : mounted
      ? ''
      : text2;

  return (
    <Tag
      className={`font-urbanist font-extrabold sm:font-black tracking-tight leading-[1.08] select-none ${className}`}
      aria-label={fullText}
    >
      {/* Screen-reader full text for guaranteed SEO & accessibility */}
      <span className="sr-only">{fullText}</span>

      {/* Visual Typewritten Content */}
      <span aria-hidden="true" className="inline">
        {/* Segment 1: Slate-900 / Crisp White */}
        <span className="text-slate-900 dark:text-white transition-colors duration-300">
          {text1Slice}
        </span>

        {/* Segment 2: Neon Purple-Teal Gradient */}
        {text2Slice && (
          <span className="bg-gradient-to-r from-purple-400 via-teal-300 to-purple-400 bg-clip-text text-transparent transition-colors duration-300">
            {text2Slice}
          </span>
        )}

        {/* Animated Neon Blinking Cursor */}
        <span
          className={`inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.82em] align-middle ml-1.5 rounded-sm transition-all duration-300 ${
            isTypingComplete
              ? 'bg-[#2DD4BF] shadow-[0_0_12px_#2DD4BF] animate-pulse opacity-90'
              : 'bg-[#A068FF] shadow-[0_0_12px_#A068FF] animate-blink-cursor opacity-100'
          }`}
          style={{ verticalAlign: '-0.06em' }}
        />
      </span>
    </Tag>
  );
}

export default TypewriterHeading;
