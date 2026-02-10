
import AuditTool from '../../components/AuditTool';
import { Search, Zap, BarChart3 } from 'lucide-react';

export default function AuditPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Scale Your Business with <span className="text-blue-500">Intelligent Automation</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Stop wasting time on manual tasks. Our audit process identifies bottlenecks and creates a custom roadmap to automate your operations and increase revenue.
                    </p>
                </div>

                {/* AUDIT TOOL SECTION */}
                <section className="max-w-4xl mx-auto mb-32">
                    <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Get Your Free Automation Score</h2>
                                <p className="text-slate-400 mb-6 text-sm">Enter your website and details to receive an instant analysis of your technical SEO and automation potential.</p>

                                <div className="audit-tool-wrapper">
                                    <AuditTool />
                                </div>
                            </div>
                            <div className="hidden md:block relative h-full min-h-[300px] w-full bg-black/30 rounded-xl border border-white/5 p-6 flex flex-col justify-center gap-4">
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><Zap size={20} /></div>
                                    <div>
                                        <div className="text-xs text-slate-500">Workflow Speed</div>
                                        <div className="text-white font-bold">Increased by 300%</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Search size={20} /></div>
                                    <div>
                                        <div className="text-xs text-slate-500">SEO Score</div>
                                        <div className="text-white font-bold">98/100 Optimized</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500"><BarChart3 size={20} /></div>
                                    <div>
                                        <div className="text-xs text-slate-500">Revenue Growth</div>
                                        <div className="text-white font-bold">+25% Month over Month</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WORK PROCESS SECTION */}
                <section className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Audit & Deployment Process</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Step 1 */}
                        <div className="flex gap-6 group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl group-hover:bg-blue-500 group-hover:text-white transition-all">1</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">Discovery & Deep Dive</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    We don't guess. We start by mapping your entire current workflow. From lead intake to customer delivery, we identify every manual touchpoint and bottleneck slowing you down.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6 group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl group-hover:bg-purple-500 group-hover:text-white transition-all">2</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">Strategy & Architecture</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    We design a custom n8n workflow architecture tailored to your goals. You get a complete visual roadmap showing exactly how data will flow between your CRM, Website, and Marketing tools.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6 group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl group-hover:bg-orange-500 group-hover:text-white transition-all">3</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">Rapid Implementation</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Our team builds and connects your automations. We utilize robust error-handling protocols to ensure 99.9% uptime, so your business runs even when you sleep.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-6 group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-bold text-xl group-hover:bg-green-500 group-hover:text-white transition-all">4</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">Testing & Handover</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    We rigorously test every scenario. Once verified, we hand over the "keys" with full documentation and training, ensuring your team is empowered to manage the new system.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
