
import React from 'react';
import { motion } from 'framer-motion';

export default function ProbabilityChart({ probabilities }) {
    const data = [
        { label: '↑↑', sub: 'Up/Up', value: probabilities.pp },
        { label: '↑↓', sub: 'Up/Down', value: probabilities.pm },
        { label: '↓↑', sub: 'Down/Up', value: probabilities.mp },
        { label: '↓↓', sub: 'Down/Down', value: probabilities.mm },
    ];

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <h3 className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-6 border-b border-slate-800 pb-2">
                Joint Probabilities
            </h3>

            <div className="flex gap-4 h-32 items-end">
                {data.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end group">
                        {/* Numeric Value */}
                        <motion.div
                            className="text-right text-xs font-mono text-slate-400 mb-1 border-b border-slate-700/50 pb-1"
                            animate={{ opacity: 1 }}
                        >
                            {(d.value * 100).toFixed(0)}%
                        </motion.div>

                        {/* Bar */}
                        <div className="h-full w-full bg-slate-900 rounded-sm relative overflow-hidden">
                            <motion.div
                                className="absolute bottom-0 w-full bg-slate-600 group-hover:bg-cyan-500/50 transition-colors duration-500"
                                initial={{ height: 0 }}
                                animate={{ height: `${d.value * 100}%` }}
                                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                            />
                        </div>

                        {/* Label */}
                        <div className="mt-2 text-center">
                            <div className="text-sm font-bold text-slate-300 tracking-widest">{d.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
