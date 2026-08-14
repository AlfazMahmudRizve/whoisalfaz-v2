'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCountUpOptions {
  /** Target number to count up to (default: 30) */
  target?: number;
  /** Starting number (default: 0) */
  start?: number;
  /** Duration of the count animation in milliseconds (default: 2000) */
  duration?: number;
  /** Delay before animation starts in milliseconds (default: 1200) */
  startDelay?: number;
  /** Whether to automatically start on mount (default: true) */
  autoStart?: boolean;
  /** Optional callback triggered on completion */
  onComplete?: () => void;
}

export interface UseCountUpResult {
  /** Current integer count value */
  count: number;
  /** True when the count up animation has finished */
  isComplete: boolean;
  /** Function to restart the animation */
  reset: () => void;
  /** Function to manually trigger animation */
  startAnimation: () => void;
}

/**
 * easeOutCubic easing function
 * t is normalized time from 0 to 1
 * f(t) = 1 - (1 - t)^3
 */
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Custom React hook that smoothly animates a number from start to target
 * using requestAnimationFrame and easeOutCubic easing.
 */
export function useCountUp({
  target = 30,
  start = 0,
  duration = 2000,
  startDelay = 1200,
  autoStart = true,
  onComplete,
}: UseCountUpOptions = {}): UseCountUpResult {
  const [count, setCount] = useState<number>(start);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep latest onComplete in ref without re-triggering effects
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const cancelAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (delayTimerRef.current !== null) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    cancelAnimation();
    setCount(start);
    setIsComplete(false);
    startTimeRef.current = null;

    delayTimerRef.current = setTimeout(() => {
      const step = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        const currentVal = Math.round(start + (target - start) * easedProgress);
        setCount(currentVal);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setCount(target);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, startDelay);
  }, [start, target, duration, startDelay, cancelAnimation]);

  const reset = useCallback(() => {
    cancelAnimation();
    setCount(start);
    setIsComplete(false);
    startAnimation();
  }, [cancelAnimation, start, startAnimation]);

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
    return () => {
      cancelAnimation();
    };
  }, [autoStart, startAnimation, cancelAnimation]);

  return { count, isComplete, reset, startAnimation };
}

export default useCountUp;
