
const steps = [
    {
        num: 1,
        title: "Discovery & Audit",
        border: "border-blue-500/20",
        bg: "bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400"
    },
    {
        num: 2,
        title: "Draft Strategy",
        border: "border-purple-500/20",
        bg: "bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400"
    },
    {
        num: 3,
        title: "Solution Build",
        border: "border-orange-500/20",
        bg: "bg-orange-500/10",
        text: "text-orange-600 dark:text-orange-400"
    },
    {
        num: 4,
        title: "Final & Support",
        border: "border-green-500/20",
        bg: "bg-green-500/10",
        text: "text-green-600 dark:text-green-400"
    }
];

export default function WorkflowSteps() {
    return (
        <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-teal-500/20 via-blue-500/40 to-purple-500/20 dark:from-transparent dark:via-blue-500/50 dark:to-transparent -translate-y-1/2 hidden md:block rounded-full"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both workflow-step bg-white dark:bg-[#0a0a0a] p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none mx-auto w-full max-w-[220px] hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-[#111] transition-all duration-300 hover:-translate-y-2 group"
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center font-black text-xl mx-auto mb-6 border ${step.border} ${step.text} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                            {step.num}
                        </div>
                        <h3 className="text-slate-900 dark:text-white font-bold text-[15px] uppercase tracking-tight">{step.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
