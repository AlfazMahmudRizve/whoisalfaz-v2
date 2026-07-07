import Link from "next/link";
import { Check } from "lucide-react";

export default function WhopProductCard({
  title,
  description,
  price,
  checkoutUrl,
  isBundle = false,
  features = [],
}) {
  return (
    <Link
      href={checkoutUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
    >
      {/* Outer wrapper — gradient glow ring for bundles */}
      <div
        className={`relative rounded-2xl ${
          isBundle
            ? "bg-gradient-to-r from-teal-500/20 to-purple-500/20 p-[1px]"
            : ""
        }`}
      >
        {/* Card */}
        <div
          className={`relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] backdrop-blur-md border ${
            isBundle
              ? "border-transparent"
              : "border-slate-200 dark:border-white/10"
          } p-6 transition-all duration-300 hover:border-teal-500/50`}
        >
          {/* Price badge — top-right */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            {isBundle && (
              <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Best Value
              </span>
            )}
            <span className="rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-xs font-black uppercase text-teal-600 dark:text-teal-400">
              {price}
            </span>
          </div>

          {/* Content */}
          <div className="pr-24">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <ul className="mt-4 space-y-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-teal-500" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="mt-5">
            <span className="btn-shimmer block w-full rounded-xl bg-teal-600 py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-all group-hover:bg-teal-500">
              Get Access →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
