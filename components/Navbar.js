'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Audit Tool', href: '/audit' },
    { name: 'Blog', href: '/blog' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl px-6 h-14 flex items-center justify-between">

        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
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

      {/* Mobile Menu Backdrop & Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-20 w-[calc(100%-2rem)] max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 space-y-1 shadow-2xl z-50 transform transition-all duration-200 ease-out origin-top scale-100 opacity-100">
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
