import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TRENDS = {
    up: { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    down: { icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10' },
    neutral: { icon: Minus, color: 'text-slate-400', bg: 'bg-slate-500/10' },
};

export default function StatCard({ value, label, trend = 'neutral', suffix = '' }) {
    const t = TRENDS[trend] || TRENDS.neutral;
    const Icon = t.icon;

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-center hover:border-teal-500/30 transition-colors group">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${t.bg} mb-4`}>
                <Icon size={14} className={t.color} />
                <span className={`text-xs font-bold ${t.color}`}>{trend === 'up' ? 'Increase' : trend === 'down' ? 'Decrease' : 'Stable'}</span>
            </div>
            <div className="text-4xl font-black text-white mb-2 tracking-tight group-hover:text-teal-400 transition-colors">
                {value}{suffix}
            </div>
            <div className="text-sm text-slate-500 font-medium">{label}</div>
        </div>
    );
}
