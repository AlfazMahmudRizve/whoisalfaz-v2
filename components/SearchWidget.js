'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchWidget() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Sync local state with URL param on load
        if (searchParams.has('q')) {
            const timer = setTimeout(() => {
                setQuery(searchParams.get('q') || '');
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirect to search page with query param
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Search</label>
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-lg py-3 pl-4 pr-10 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-teal-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-teal-500 dark:focus:ring-blue-500 transition-all text-sm"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Search size={16} />
                </button>
            </form>
        </div>
    );
}
