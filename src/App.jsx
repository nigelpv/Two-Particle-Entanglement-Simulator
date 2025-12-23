
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, HelpCircle } from 'lucide-react';
import {
  STATE_PHI_PLUS, STATE_PHI_MINUS, STATE_PSI_PLUS, STATE_PSI_MINUS, STATE_00,
  getProbabilities, calculateCHSH
} from './engine/QuantumEngine';

import Hero from './components/Hero';
import StateSelector from './components/StateSelector';
import BlochSphere from './components/BlochSphere';
import ProbabilityChart from './components/ProbabilityChart';
import CorrelationHeatmap from './components/CorrelationHeatmap';
import BellMeter from './components/BellMeter';
import About from './components/About';

// Presets
const STATES = {
  'Φ+ (Phi Plus)': STATE_PHI_PLUS,
  'Product State |00> (Separable)': STATE_00,
  'Φ- (Phi Minus)': STATE_PHI_MINUS,
  'Ψ+ (Psi Plus)': STATE_PSI_PLUS,
  'Ψ- (Psi Minus)': STATE_PSI_MINUS,
};

function App() {
  // State
  const [selectedStateName, setSelectedStateName] = useState('Φ+ (Phi Plus)');
  const [thetaA, setThetaA] = useState(0);
  const [phiA, setPhiA] = useState(0);
  const [thetaB, setThetaB] = useState(Math.PI / 4);
  const [phiB, setPhiB] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  // Refs for scrolling
  const simulatorRef = useRef(null);
  const scrollToSim = () => simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });

  // Derived Quantum Logic
  const quantumState = useMemo(() => STATES[selectedStateName], [selectedStateName]);
  const [stats, setStats] = useState({ probs: { pp: 0.5, pm: 0, mp: 0, mm: 0.5 }, chsh: 2.0 });

  useEffect(() => {
    const probs = getProbabilities(quantumState, thetaA, phiA, thetaB, phiB);
    const angles = {
      a: { theta: thetaA, phi: phiA },
      a_prime: { theta: thetaA + Math.PI / 2, phi: phiA },
      b: { theta: thetaB, phi: phiB },
      b_prime: { theta: thetaB - Math.PI / 2, phi: phiB }
    };
    const sVal = calculateCHSH(quantumState, angles);
    setStats({ probs, chsh: sVal });
  }, [quantumState, thetaA, phiA, thetaB, phiB]);

  // UI Helpers
  const Slider = ({ label, value, setter, color }) => (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-2 uppercase tracking-wider">
        <span>{label}</span>
        <span style={{ color }}>{(value / Math.PI).toFixed(2)}π</span>
      </div>
      <input
        type="range" min="0" max={2 * Math.PI} step="0.01"
        value={value}
        onChange={(e) => setter(parseFloat(e.target.value))}
        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-cyan-400 transition-colors"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          {/* Logo area, intentionally left minimal */}
        </div>
        <button
          onClick={() => setShowAbout(true)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur border border-slate-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
        >
          <Info className="w-4 h-4 text-cyan-500" />
          About this Exhibit
        </button>
      </nav>

      <AnimatePresence>
        {showAbout && <About onClose={() => setShowAbout(false)} />}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <Hero onStart={scrollToSim} />

      {/* Main Simulator Content */}
      <div ref={simulatorRef} className="relative z-10 bg-slate-950 border-t border-slate-900 shadow-[0_-50px_100px_rgba(0,0,0,1)]">

        {/* 2. State Selection */}
        <StateSelector selectedState={selectedStateName} onSelect={setSelectedStateName} />

        {/* 3. Measurement Apparatus */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Measurement Apparatus</h2>
            <p className="text-slate-400 max-w-lg text-base leading-relaxed">
              Orient the Stern-Gerlach detectors. The axes represent the direction of measurement for each particle.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center gap-12 items-center">
            {/* Alice */}
            <div className="flex flex-col items-center">
              <div className="w-80 h-80 shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 rounded-full border border-slate-800/50 shadow-2xl mb-8 relative overflow-hidden">
                <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <BlochSphere theta={thetaA} phi={phiA} color="#22d3ee" />
                  <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
                </Canvas>
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
              <div className="w-full max-w-[240px] space-y-6">
                <div className="text-center text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-4">Detector A (Alice)</div>
                <Slider label="Polar Angle θ" value={thetaA} setter={setThetaA} color="#22d3ee" />
                <Slider label="Azimuthal Angle φ" value={phiA} setter={setPhiA} color="#22d3ee" />
              </div>
            </div>

            {/* Bob */}
            <div className="flex flex-col items-center">
              <div className="w-80 h-80 shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 rounded-full border border-slate-800/50 shadow-2xl mb-8 relative overflow-hidden">
                <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <BlochSphere theta={thetaB} phi={phiB} color="#c084fc" />
                  <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
                </Canvas>
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
              <div className="w-full max-w-[240px] space-y-6">
                <div className="text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Detector B (Bob)</div>
                <Slider label="Polar Angle θ" value={thetaB} setter={setThetaB} color="#c084fc" />
                <Slider label="Azimuthal Angle φ" value={phiB} setter={setPhiB} color="#c084fc" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Results & Analysis */}
        <section className="bg-slate-900 border-t border-slate-800 py-32 px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">

            {/* Statistics Panel */}
            <div className="space-y-16">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Experimental Results</h2>
                <ProbabilityChart probabilities={stats.probs} />
              </div>
              <div>
                <BellMeter value={stats.chsh} />
              </div>
            </div>

            {/* Correlation Map Panel */}
            <div className="flex flex-col items-center justify-center bg-slate-950 rounded-3xl border border-slate-800 p-10 shadow-inner">
              <h3 className="text-slate-200 font-bold mb-4 text-lg">Quantum Correlation Landscape</h3>
              <p className="text-sm text-slate-500 mb-10 max-w-sm text-center">
                Visualizing the expectation value E(θa, θb) across the entire configuration space.
              </p>
              <CorrelationHeatmap currentThetaA={thetaA} currentThetaB={thetaB} />
            </div>
          </div>
        </section>

        <footer className="py-20 text-center text-slate-600 text-sm font-mono tracking-widest border-t border-slate-900 bg-slate-950">
          Interactive Quantum Simulation • 2025
        </footer>

      </div>
    </div>
  );
}

export default App;
