
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function About({ onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex justify-center overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="max-w-3xl w-full p-8 md:p-12 relative">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <article className="prose prose-invert prose-lg max-w-none space-y-12 pt-12">
                    <header>
                        <h2 className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-4">Educational Primer</h2>
                        <h1 className="text-4xl font-bold text-white mb-6">About This Simulation</h1>
                        <p className="text-slate-400 text-xl leading-relaxed">
                            This interactive exhibit demonstrates the phenomenon of Quantum Entanglement and the violation of Bell Inequalities, specifically the CHSH inequality.
                        </p>
                    </header>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-4">What is Entanglement?</h3>
                        <p className="text-slate-300">
                            When two particles interact as discussed later, they go into a state of entanglement.
                            This state implies that one particles state is explicitly dependent on the state of the other
                            This state conversion from the particles superposition takes place instantaneously
                        </p>
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mt-4">
                            <h4 className="font-bold text-white mb-2">Key Concept</h4>
                            <p className="text-slate-400 text-sm">
                                In an entangled pair like the Bell State |Φ⁺⟩, measuring Particle A along the Z-axis yields "Up" or "Down" randomly (50/50).
                                However, if Particle A is "Up", Particle B will <strong>always</strong> be "Up" if measured along the same axis.
                                This is the concept of entanglement talked about earlier
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-4">Bell's Theorem & The CHSH Limit</h3>
                        <p className="text-slate-300">
                            Physicist John Bell proved that if "local hidden variables" (classical instructions carried by particles) existed,
                            the correlations between measurements would obey a strict mathematical limit: <strong className="text-white">S ≤ 2</strong>.
                        </p>
                        <p className="text-slate-300 mt-4">
                            Quantum mechanics predicts that for certain measurement angles, this value can reach up to <strong className="text-cyan-400">2√2 (≈ 2.82)</strong>.
                            Observing S &gt; 2 experimentally proves that the classical view of reality—where objects have definite local properties—is incorrect.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-4">How to Use This Exhibit</h3>
                        <ul className="space-y-4 text-slate-300 list-disc pl-4">
                            <li><strong className="text-white">Prepare</strong>: Choose between an Entangled State (Quantum) and a Product State (Classical behavior).</li>
                            <li><strong className="text-white">Measure</strong>: Rotate the automated measurement apparatus (Bloch Spheres) for Alice and Bob.</li>
                            <li><strong className="text-white">Observe</strong>: Watch the correlation statistics build up in real-time.</li>
                            <li><strong className="text-white">Test</strong>: Try to find angles where the Bell Meter goes into the red zone (S &gt; 2).</li>
                        </ul>
                    </section>
                </article>
            </div>
        </motion.div>
    );
}
