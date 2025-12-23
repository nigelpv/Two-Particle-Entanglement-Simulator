
import React from 'react';
import { motion } from 'framer-motion';

export default function StateSelector({ selectedState, onSelect }) {

    const cards = [
        {
            id: 'Φ+ (Phi Plus)',
            title: 'Entangled State |Φ⁺⟩',
            desc: 'The "Bell State". Measurements are perfectly correlated. Shows non-local quantum behavior.',
            features: ['S > 2 possible', 'Perfect Correlation', 'Maximally Entangled']
        },
        {
            id: 'Product State |00> (Separable)',
            title: 'Separable State |00⟩',
            desc: 'A product state |0⟩⊗|0⟩. Particles behave independently. Obey classical limits.',
            features: ['S ≤ 2 always', 'No Entanglement', 'Independent Behavior']
        }
    ];

    return (
        <section className="py-24 px-6 max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold text-white">Prepare the Quantum System</h2>
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Select a state to prepare. In entangled systems, individual particles do not possess independent states;
                    only their joint correlations are physically meaningful.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {cards.map((card) => {
                    const isSelected = selectedState === card.id;
                    return (
                        <motion.button
                            key={card.id}
                            onClick={() => onSelect(card.id)}
                            className={`relative text-left p-10 rounded-3xl border transition-all duration-300 group ${isSelected
                                ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.15)]'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/60'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSelected && (
                                <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                            )}

                            <h3 className={`text-2xl font-bold mb-4 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                {card.title}
                            </h3>
                            <p className="text-slate-400 mb-8 text-base leading-relaxed">
                                {card.desc}
                            </p>

                            <div className="flex gap-3 flex-wrap">
                                {card.features.map(f => (
                                    <span key={f} className={`text-sm px-3 py-1.5 rounded-md border ${isSelected
                                        ? 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
                                        : 'border-slate-700 bg-slate-800 text-slate-500'
                                        }`}>
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
}
