import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <Home size={13} className="inline-block -mt-0.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.url || index} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight size={12} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
              {isLast ? (
                <span
                  className="text-slate-800 dark:text-slate-300 font-black truncate max-w-[200px] sm:max-w-[320px] md:max-w-[450px]"
                  aria-current="page"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors truncate max-w-[150px] sm:max-w-[200px]"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
