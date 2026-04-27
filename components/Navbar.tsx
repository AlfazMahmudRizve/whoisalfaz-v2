'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/blog/category/architecture-teardowns' },
    { name: 'Blog', href: '/blog' },
    { name: 'Lab', href: '/labs' },
    { name: 'Portfolio', href: '/portfolio' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-6xl bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-full shadow-lg dark:shadow-2xl px-6 h-14 flex items-center justify-between relative transition-colors duration-300">

        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes="60px" priority />
          </div>
          <span className="font-bold tracking-tight text-sm text-slate-900 dark:text-white transition-colors duration-300">
            <span className="text-teal-600 dark:text-teal-400">whois</span><span className="text-purple-600 dark:text-purple-500">alfaz</span> <span className="text-teal-600 dark:text-teal-400">.me</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={
                (link as any).highlight
                  ? 'px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-teal-500/20 transition-all'
                  : 'hover:text-teal-600 dark:hover:text-white transition-colors duration-200'
              }
            >
              {link.name}
            </Link>
          ))}

          {/* Search Icon Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`hover:text-teal-600 dark:hover:text-white transition-colors duration-200 ${isSearchOpen ? 'text-teal-600 dark:text-white' : ''}`}
            aria-label="Toggle Search"
          >
            <Search size={18} />
          </button>
          
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/audit"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'click_free_audit_nav', {
                  event_category: 'Navigation',
                  event_label: 'Free Audit Teal Pill'
                });
              }
            }}
            className="px-4 py-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold rounded-full hover:bg-teal-500/20 transition-all uppercase tracking-wider"
          >
            Free Audit
          </Link>
          <Link href="/contact" className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm">
            Work With Me
          </Link>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 text-slate-600 dark:text-slate-400"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button className="text-slate-600 dark:text-slate-400" onClick={() => setIsOpen(!isOpen)} aria-label="Open navigation menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Floating Search Bar (Desktop) */}
      {isSearchOpen && (
        <div className="absolute top-20 w-full max-w-md px-4 hidden md:block animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-xl p-2 shadow-2xl flex items-center gap-2">
            <Search size={16} className="text-slate-500 ml-2" />
            <form
              className="flex-1"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const target = e.currentTarget;
                const input = target.elements.namedItem('search') as HTMLInputElement;
                const query = input?.value;
                if (query) window.location.href = `/search?q=${encodeURIComponent(query)}`;
              }}
            >
              <input
                name="search"
                autoFocus
                type="text"
                placeholder="Search articles..."
                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 h-10 outline-none"
              />
            </form>
            <button onClick={() => setIsSearchOpen(false)} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop & Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-20 w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-2xl p-2 space-y-1 shadow-2xl z-50 transform transition-all duration-200 ease-out">
            {/* Mobile Search Input */}
            <div className="px-2 pt-2 mb-2">
              <form
                className="relative"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const target = e.currentTarget;
                  const input = target.elements.namedItem('searchMobile') as HTMLInputElement;
                  const query = input?.value;
                  if (query) window.location.href = `/search?q=${encodeURIComponent(query)}`;
                }}
              >
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="searchMobile"
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </form>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 font-medium hover:text-teal-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all active:scale-95 flex items-center justify-between group"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 text-teal-500 transition-opacity">→</span>
              </Link>
            ))}
            <div className="h-px bg-slate-200 dark:bg-white/10 my-2 mx-2"></div>
            <Link
              href="/contact"
              className="block px-4 py-3 text-center bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors mx-2 mb-2"
              onClick={() => setIsOpen(false)}
            >
              Work With Me
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
