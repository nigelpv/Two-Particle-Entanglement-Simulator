
import React, { useEffect, useRef } from 'react';

export default function CorrelationHeatmap({ currentThetaA, currentThetaB }) {
    const canvasRef = useRef(null);
    const size = 400; // High res

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const thA = (x / size) * 2 * Math.PI;
                const thB = (y / size) * 2 * Math.PI;

                // Visualization E = cos(thA - thB)
                // -1 (Blue) to 1 (Red)
                // Using a 'Magma' or 'Viridis' style map might be nicer, but let's stick to Semantic Red/Blue
                // Red = Correlated, Blue = Anti-Correlated, Black = 0
                const E = Math.cos(thA - thB);

                const index = (y * size + x) * 4;

                // Smoother gradient:
                // E = -1 (Blue: 0, 100, 255)
                // E = 0 (Black: 15, 23, 42 - slate-950)
                // E = 1 (Red: 220, 38, 38)

                let r, g, b;
                if (E > 0) {
                    // Interpolate Black to Red
                    r = 15 + E * (220 - 15);
                    g = 23 + E * (38 - 23);
                    b = 42 + E * (38 - 42);
                } else {
                    // Interpolate Black to Blue
                    const absE = Math.abs(E);
                    r = 15 + absE * (0 - 15);
                    g = 23 + absE * (100 - 23);
                    b = 42 + absE * (255 - 42);
                }

                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0);

    }, []);

    const x = (currentThetaA / (2 * Math.PI)) * size;
    const y = (currentThetaB / (2 * Math.PI)) * size;

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative w-full max-w-[400px] aspect-square bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-800">
                {/* Y Axis */}
                <div className="absolute left-2 top-2 text-[10px] text-slate-500 font-mono flex flex-col gap-1 z-10">
                    <span>2π</span>
                    <span>θb</span>
                    <span>0</span>
                </div>

                <canvas ref={canvasRef} width={size} height={size} className="w-full h-full opacity-90" />

                {/* Marker */}
                <div
                    className="absolute w-3 h-3 rounded-full border border-white shadow-[0_0_15px_white] bg-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
                    style={{ left: `${(currentThetaA / (2 * Math.PI)) * 100}%`, top: `${(currentThetaB / (2 * Math.PI)) * 100}%` }}
                />

                {/* Grid Lines Overlay */}
                <div className="absolute inset-0 border border-slate-700/20 pointer-events-none" />
            </div>

            <div className="w-full max-w-[400px] flex justify-between text-[10px] text-slate-500 font-mono mt-1 px-1">
                <span>0</span>
                <span>Measurement Angle A (θa)</span>
                <span>2π</span>
            </div>

            {/* Legend Line */}
            <div className="w-full max-w-[400px] mt-4 flex items-center gap-4">
                <span className="text-xs text-blue-400 font-bold">-1</span>
                <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-blue-600 via-slate-900 to-red-600" />
                <span className="text-xs text-red-500 font-bold">+1</span>
            </div>
        </div>
    );
}
