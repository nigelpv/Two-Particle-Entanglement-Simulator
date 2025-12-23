
import React from 'react';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const AxisArrow = ({ direction, color, label }) => {
    return (
        <group>
            <arrowHelper args={[direction, new THREE.Vector3(0, 0, 0), 1.2, color, 0.1, 0.05]} />
            <Html position={direction.clone().multiplyScalar(1.3)}>
                <div style={{ color: color, fontWeight: 'bold', fontSize: '12px', fontFamily: 'monospace' }}>{label}</div>
            </Html>
        </group>
    );
};

const MeasurementVector = ({ theta, phi, color }) => {
    // x = sin(theta)cos(phi)
    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(theta);
    const dir = new THREE.Vector3(x, y, z);

    return (
        <group>
            {/* The Measurement Axis */}
            {/* Using a thicker cylinder + cone for a "premium" look instead of just arrowhelper */}

            {/* Positive End */}
            <arrowHelper args={[dir, new THREE.Vector3(0, 0, 0), 1.0, color, 0.2, 0.1]} />
            {/* Negative End */}
            <arrowHelper args={[dir.clone().negate(), new THREE.Vector3(0, 0, 0), 1.0, color, 0, 0]} />

            <Html position={dir.clone().multiplyScalar(1.2)}>
                <div style={{
                    color: 'white',
                    background: color,
                    padding: '4px 8px',
                    borderRadius: '2px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    fontFamily: 'sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Axis
                </div>
            </Html>
        </group>
    );
};

export default function BlochSphere({ theta, phi, color = "#64ffda" }) {

    return (
        <group scale={1.8}>
            {/* Elegant Wireframe Sphere */}
            <Sphere args={[1, 32, 32]}>
                <meshBasicMaterial
                    color="#334155"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Sphere>
            <Sphere args={[0.99, 32, 32]}>
                <meshBasicMaterial color="#0f172a" transparent opacity={0.6} />
            </Sphere>

            {/* Coordinate Axes - Subtle */}
            <AxisArrow direction={new THREE.Vector3(1, 0, 0)} color="#475569" label="x" />
            <AxisArrow direction={new THREE.Vector3(0, 1, 0)} color="#475569" label="y" />
            <AxisArrow direction={new THREE.Vector3(0, 0, 1)} color="#475569" label="z" />

            {/* The Measurement Axis - Prominent */}
            <MeasurementVector theta={theta} phi={phi} color={color} />
        </group>
    );
}
