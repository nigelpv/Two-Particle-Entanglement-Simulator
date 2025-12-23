
import React from 'react';
import { motion } from 'framer-motion';

export default function BellMeter({ value }) {
    const CLASSICAL_LIMIT = 2.0;
    const TSIRELSON_BOUND = 2.8284;
    const MAX_SCALE = 3.0; // Slightly more than max for headroom

    // Calculate percentage
    const percent = Math.min((value / MAX_SCALE) * 100, 100);
    const limitLine = (CLASSICAL_LIMIT / MAX_SCALE) * 100;

    const isViolation = value > CLASSICAL_LIMIT;

    return (
        <div className="w-full">
            <header className="flex justify-between items-end mb-4 border-b border-slate-800 pb-2">
                <h3 className="text-slate-400 uppercase tracking-widest text-xs font-bold">Bell Operator (S)</h3>
                <div className={`text-4xl font-mono font-light tracking-tighter ${isViolation ? "text-red-500" : "text-slate-200"}`}>
                    {value.toFixed(3)}
                </div>
            </header>

            {/* The Gauge */}
            <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2">

                {/* Zones (Subtle) */}
                <div className="absolute inset-y-0 left-0 bg-slate-700" style={{ width: `${limitLine}%` }} />
                <div className="absolute inset-y-0 bg-red-900/30" style={{ left: `${limitLine}%`, right: 0 }} />

                {/* Needle / Fill */}
                <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${isViolation ? 'bg-red-500' : 'bg-slate-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                />
            </div>

            {/* Scale Labels */}
            <div className="relative h-6 text-[10px] text-slate-500 font-mono w-full">
                <span className="absolute left-0">0</span>
                <span className="absolute transform -translate-x-1/2" style={{ left: `${limitLine}%` }}>
                    Classical Limit (2.0)
                </span>
                <span className="absolute right-0">3.0</span>
            </div>

            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                {isViolation ? (
                    <span className="text-red-400">
                        NON-LOCALITY DETECTED. The correlation strength exceeds the maximum possible value for any classical local hidden variable theory.
                    </span>
                ) : (
                    "Within classical bounds. Local hidden variables could explain this correlation."
                )}
            </p>
        </div>
    );
}
