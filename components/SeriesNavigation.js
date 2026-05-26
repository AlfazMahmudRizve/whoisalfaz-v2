import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * SeriesNavigation — renders a "Part X of Y" bar with prev/next links
 * when the current post belongs to a multi-post series.
 * 
 * @param {Object} props
 * @param {Object} props.currentPost - The current post object
 * @param {Array} props.allPosts - All posts sorted by date descending
 */
export default function SeriesNavigation({ currentPost, allPosts }) {
  if (!currentPost?.categories?.length) return null;

  // Find the primary series category (must be a chronological series like "30 Days of n8n & Automation")
  const seriesCategory = currentPost.categories.find(cat => cat.includes('30 Days'));
  if (!seriesCategory) return null;

  // Get all posts in this category, sorted by date ascending (chronological order)
  const seriesPosts = allPosts
    .filter(p => p.categories?.includes(seriesCategory))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Only show navigation if there are at least 3 posts in the series
  if (seriesPosts.length < 3) return null;

  const currentIndex = seriesPosts.findIndex(p => p.slug.current === currentPost.slug.current);
  if (currentIndex === -1) return null;

  const partNumber = currentIndex + 1;
  const totalParts = seriesPosts.length;
  const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

  return (
    <nav aria-label="Series navigation" className="max-w-7xl mx-auto px-6 mb-8">
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 md:p-6">

        {/* Desktop: 3-column grid with fixed center */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">

          {/* Previous */}
          <div className="overflow-hidden">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug.current}/`} className="group flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <ChevronLeft size={16} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span className="truncate">{prevPost.title}</span>
              </Link>
            ) : <div />}
          </div>

          {/* Center: Part indicator */}
          <div className="px-4 py-1.5 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest whitespace-nowrap">
            Part {partNumber} of {totalParts}
          </div>

          {/* Next */}
          <div className="overflow-hidden flex justify-end">
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug.current}/`} className="group flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors overflow-hidden">
                <span className="truncate">{nextPost.title}</span>
                <ChevronRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>

        </div>

        {/* Mobile: Just the part indicator */}
        <div className="flex md:hidden justify-center">
          <div className="px-4 py-1.5 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 rounded-full text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest whitespace-nowrap">
            Part {partNumber} of {totalParts}
          </div>
        </div>

      </div>
    </nav>
  );
}
