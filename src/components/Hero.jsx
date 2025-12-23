
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero({ onStart }) {
    return (
        <section className="min-h-screen w-full flex flex-col justify-center items-center text-center p-8 bg-slate-950 relative overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl space-y-6 flex-grow flex flex-col justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-cyan-500 font-mono text-xs tracking-[0.25em] uppercase mb-4">
                        Quantum Mechanics Interactive
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                        Entanglement & <br />
                        <span className="text-slate-400">The Limits of Reality</span>
                    </h1>
                </motion.div>

                <motion.p
                    className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    An interactive journey into Bell inequality violations in a two-particle quantum system.
                    Discover why measuring one particle can instantaneously correlate with another, defying classical intuition.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="pt-6"
                >
                    <button
                        onClick={onStart}
                        className="group flex items-center gap-2 mx-auto px-6 py-2.5 bg-white text-slate-950 rounded-full font-medium hover:bg-cyan-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] text-sm"
                    >
                        Start Exploring
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* Footer decoration */}
            <div className="relative z-10 text-[10px] text-slate-600 font-mono tracking-widest uppercase pb-6">
                Exhibit 01 • Non-Locality
            </div>
        </section>
    );
}
