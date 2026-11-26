import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Page Not Found | whoisalfaz.me",
    description: "The page you are looking for has been moved, deleted, or possibly never existed.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-center px-6">
            <h1 className="text-9xl font-black text-slate-800 mb-4 select-none">404</h1>
            <h2 className="text-4xl font-bold text-white mb-6">Page Not Found</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                The page you are looking for has been moved, deleted, or possibly never existed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                >
                    Return Home
                </Link>
                <Link
                    href="/blog/"
                    className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-white/10 transition-colors"
                >
                    Read Blog
                </Link>
            </div>
        </div>
    );
}
