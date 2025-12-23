
import { complex, add, multiply, eigs, kron, exp, sqrt, abs, conj, matrix, trace } from 'mathjs';

// --- Constants & Operators ---

export const I = matrix([[1, 0], [0, 1]]);
export const X = matrix([[0, 1], [1, 0]]);
export const Y = matrix([[0, complex(0, -1)], [complex(0, 1), 0]]);
export const Z = matrix([[1, 0], [0, -1]]);

/**
 * Computes the tensor product of two 2x2 matrices.
 * @param {Matrix} A 
 * @param {Matrix} B 
 */
export const tensor = (A, B) => kron(A, B);

// --- State Vector Logic ---

// Basis vectors for a single qubit
export const UP = matrix([1, 0]); // |0>
export const DOWN = matrix([0, 1]); // |1>

/**
 * Creates a general qubit state from angles theta and phi.
 * |psi> = cos(theta/2)|0> + e^(i*phi)sin(theta/2)|1>
 */
export const createQubit = (theta, phi) => {
    const c = Math.cos(theta / 2);
    const s = Math.sin(theta / 2);
    const phase = exp(complex(0, phi));
    return matrix([c, multiply(s, phase)]); // Vector [alpha, beta]
};

// Bell States
const SQRT2_INV = 1 / Math.sqrt(2);
// |Phi+> = (|00> + |11>) / sqrt(2)
export const STATE_PHI_PLUS = multiply(SQRT2_INV, add(kron(UP, UP), kron(DOWN, DOWN)));
// |Phi-> = (|00> - |11>) / sqrt(2)
export const STATE_PHI_MINUS = multiply(SQRT2_INV, add(kron(UP, UP), multiply(-1, kron(DOWN, DOWN))));
// |Psi+> = (|01> + |10>) / sqrt(2)
export const STATE_PSI_PLUS = multiply(SQRT2_INV, add(kron(UP, DOWN), kron(DOWN, UP)));
// |Psi-> = (|01> - |10>) / sqrt(2)
export const STATE_PSI_MINUS = multiply(SQRT2_INV, add(kron(UP, DOWN), multiply(-1, kron(DOWN, UP))));

// Separable State |00> = |0> tensor |0>
export const STATE_00 = kron(UP, UP);


// --- Measurement Logic ---

/**
 * Returns the operator for measurement along a generic axis determined by theta, phi.
 * n = (sin theta cos phi, sin theta sin phi, cos theta)
 * Operator = n . sigma = nx*X + ny*Y + nz*Z
 */
export const getSpinOperator = (theta, phi) => {
    const nx = Math.sin(theta) * Math.cos(phi);
    const ny = Math.sin(theta) * Math.sin(phi);
    const nz = Math.cos(theta);

    const Op = add(
        multiply(nx, X),
        add(
            multiply(ny, Y),
            multiply(nz, Z)
        )
    );
    return Op;
};

/**
 * Computes the expectation value E(a, b) = <psi | (sigma_a tensor sigma_b) | psi>
 * @param {Matrix} stateVector 4D state vector
 * @param {number} thetaA 
 * @param {number} phiA 
 * @param {number} thetaB 
 * @param {number} phiB 
 */
export const getExpectationValue = (stateVector, thetaA, phiA, thetaB, phiB) => {
    const OpA = getSpinOperator(thetaA, phiA);
    const OpB = getSpinOperator(thetaB, phiB);
    const Observable = kron(OpA, OpB);

    // <psi | O | psi>
    // stateVector is a 1D array/matrix from mathjs. need to handle dims carefully.
    // Ensure stateVector is a column vector (4x1)
    const stateCol = matrix(stateVector).reshape([4, 1]);
    const stateBra = transpose(conj(stateCol)); // Row vector (1x4)

    const val = multiply(multiply(stateBra, Observable), stateCol);

    // Result is a 1x1 matrix with a complex number (should be real for Hermitian ops)
    const result = val.get([0, 0]);
    return result.re; // Return real part
};

/**
 * Computes Joint Probabilities for outcomes ++, +-, -+, --
 * P(++, a, b) = |<a+|b+| psi>|^2 ... simpler way:
 * Projector P_plus = |+><+| where |+> is eigenstate of n.sigma with eval +1
 * Actually, P_plus = (I + n.sigma) / 2
 */
export const getProbabilities = (stateVector, thetaA, phiA, thetaB, phiB) => {
    const OpA = getSpinOperator(thetaA, phiA);
    const OpB = getSpinOperator(thetaB, phiB);

    // Projectors
    const P_A_plus = multiply(0.5, add(I, OpA));
    const P_A_minus = multiply(0.5, add(I, multiply(-1, OpA)));
    const P_B_plus = multiply(0.5, add(I, OpB));
    const P_B_minus = multiply(0.5, add(I, multiply(-1, OpB)));

    // Joint Projectors
    const P_pp = kron(P_A_plus, P_B_plus);
    const P_pm = kron(P_A_plus, P_B_minus);
    const P_mp = kron(P_A_minus, P_B_plus);
    const P_mm = kron(P_A_minus, P_B_minus);

    const calcProb = (Proj) => {
        const stateCol = matrix(stateVector).reshape([4, 1]);
        const stateBra = transpose(conj(stateCol));
        // <psi | P | psi>
        const val = multiply(multiply(stateBra, Proj), stateCol);
        return val.get([0, 0]).re;
    };

    return {// order is p:up & m:down
        pp: calcProb(P_pp),
        pm: calcProb(P_pm),
        mp: calcProb(P_mp),
        mm: calcProb(P_mm)
    };
};

/**
 * Calculates CHSH value S defined as |E(a, b) - E(a, b') + E(a', b) + E(a', b')|
 * Standard configuration often used:
 * a = 0, a' = pi/2 (or similar)
 * but this function should take specific settings if we want dynamic meter.
 * Usually for S_max = 2*sqrt(2):
 * a=0 (z), a'=pi/2 (x)
 * b=pi/4, b'=-pi/4 (in x-z plane)
 */
export const calculateCHSH = (stateVector, angles) => {
    // angles object structure: { a: {theta, phi}, a_prime: {theta, phi}, ... }
    const { a, a_prime, b, b_prime } = angles;

    const E_ab = getExpectationValue(stateVector, a.theta, a.phi, b.theta, b.phi);
    const E_abp = getExpectationValue(stateVector, a.theta, a.phi, b_prime.theta, b_prime.phi);
    const E_apb = getExpectationValue(stateVector, a_prime.theta, a_prime.phi, b.theta, b.phi);
    const E_apbp = getExpectationValue(stateVector, a_prime.theta, a_prime.phi, b_prime.theta, b_prime.phi);

    // S = E(a,b) - E(a,b') + E(a',b) + E(a',b')
    // Note: The sign of the term to subtract depends on convention, usually one term has minus.
    // Classical bound |S| <= 2

    return Math.abs(E_ab - E_abp + E_apb + E_apbp);
};


// Helper for transpose which isn't directly named 'transpose' in import sometimes or requires 2D
// mathjs 'transpose' function
import { transpose } from 'mathjs';

