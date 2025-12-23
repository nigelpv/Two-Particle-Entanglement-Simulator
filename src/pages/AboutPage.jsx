import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none">
                <Link
                    to="/"
                    className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur border border-slate-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 text-cyan-500" />
                    Back to Simulator
                </Link>
            </nav>

            <motion.div
                className="flex justify-center pt-24 pb-20 px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-3xl w-full">
                    <article className="prose prose-invert prose-lg max-w-none space-y-12">
                        <header>
                            <h2 className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-4">Educational Primer</h2>
                            <h1 className="text-5xl font-bold text-white mb-6">About This Simulation</h1>
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

                    <footer className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-600 font-mono text-sm">
                        Exhibit 01 • Non-Locality
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
