"use client";
import { m, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export function FadeUp({ children, delay = 0, className = "", inline = false }: { children: ReactNode, delay?: number, className?: string, inline?: boolean }) {
  const Component = inline ? m.span : m.div;
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function FadeIn({ children, delay = 0, className = "", inline = false }: { children: ReactNode, delay?: number, className?: string, inline?: boolean }) {
  const Component = inline ? m.span : m.div;
  return (
    <Component
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerContainer({ children, className = "", delayChildren = 0.1, staggerChildren = 0.1 }: { children: ReactNode, className?: string, delayChildren?: number, staggerChildren?: number }) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren,
          }
        }
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
