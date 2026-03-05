import React from 'react';

export default function StepList({ children, ...props }) {
    const items = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === 'li'
    );

    return (
        <div className="my-12 space-y-0 relative" role="list">
            {items.map((item, i) => (
                <div key={i} className="flex gap-5 relative" role="listitem">
                    {/* Vertical connector line */}
                    {i < items.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-teal-500/40 to-transparent" />
                    )}

                    {/* Numbered circle */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm font-mono z-10">
                        {i + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8 pt-1.5 text-slate-300 leading-7 [&>p]:mb-0">
                        {item.props.children}
                    </div>
                </div>
            ))}
        </div>
    );
}
