'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Lab', href: '/labs' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl px-6 h-14 flex items-center justify-between relative">

        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes="60px" priority />
          </div>
          <span className="font-bold tracking-tight text-sm">
            <span className="text-teal-400">whois</span><span className="text-purple-500">alfaz</span> <span className="text-teal-400">.me</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-white transition-colors duration-200">
              {link.name}
            </Link>
          ))}

          {/* Search Icon Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`hover:text-white transition-colors duration-200 ${isSearchOpen ? 'text-white' : ''}`}
            aria-label="Toggle Search"
          >
            <Search size={18} />
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a href="mailto:contact@whoisalfaz.me" className="px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-slate-200 transition-colors shadow-sm">
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Floating Search Bar (Desktop) */}
      {isSearchOpen && (
        <div className="absolute top-20 w-full max-w-md px-4 hidden md:block animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-2 shadow-2xl flex items-center gap-2">
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
                className="w-full bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-slate-600 h-10"
              />
            </form>
            <button onClick={() => setIsSearchOpen(false)} className="p-2 text-slate-500 hover:text-white">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-20 w-[calc(100%-2rem)] max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 space-y-1 shadow-2xl z-50 transform transition-all duration-200 ease-out origin-top scale-100 opacity-100">
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </form>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-slate-400 font-medium hover:text-white hover:bg-white/10 transition-all active:scale-95 flex items-center justify-between group"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity">→</span>
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2 mx-2"></div>
            <a
              href="mailto:contact@whoisalfaz.me"
              className="block px-4 py-3 text-center bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors mx-2 mb-2"
              onClick={() => setIsOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </>
      )}
    </nav>
  );
}
