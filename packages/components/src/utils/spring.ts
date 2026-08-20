/**
 * Spring → CSS `linear()` easing compiler.
 *
 * Samples the closed-form solution of a damped harmonic oscillator into a
 * CSS `linear()` easing string so spring motion runs GPU-composited with no
 * per-frame JavaScript. Used by <cg-liquid-item> move transitions.
 */

export type SpringPreset = 'snappy' | 'smooth' | 'bouncy';

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}

export const SPRING_PRESETS: Record<SpringPreset, SpringConfig> = {
  snappy: { stiffness: 300, damping: 24 },
  smooth: { stiffness: 170, damping: 26 },
  bouncy: { stiffness: 220, damping: 12 },
};

const SETTLE_THRESHOLD = 0.001;
const DEFAULT_SAMPLES = 32;

/**
 * Position of the spring at time `tSec`, normalized so the value travels
 * 0 → 1. Closed-form solution for initial displacement 1, initial velocity 0.
 */
export function sampleSpring(cfg: SpringConfig, tSec: number): number {
  const mass = cfg.mass ?? 1;
  const omega0 = Math.sqrt(cfg.stiffness / mass);
  const zeta = cfg.damping / (2 * Math.sqrt(cfg.stiffness * mass));

  let displacement: number;
  if (zeta < 1) {
    // Underdamped: decaying oscillation.
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    displacement = Math.exp(-zeta * omega0 * tSec)
      * (Math.cos(omegaD * tSec) + ((zeta * omega0) / omegaD) * Math.sin(omegaD * tSec));
  } else if (zeta === 1) {
    // Critically damped.
    displacement = Math.exp(-omega0 * tSec) * (1 + omega0 * tSec);
  } else {
    // Overdamped: two real poles, no oscillation.
    const omegaD = omega0 * Math.sqrt(zeta * zeta - 1);
    displacement = Math.exp(-zeta * omega0 * tSec)
      * (Math.cosh(omegaD * tSec) + ((zeta * omega0) / omegaD) * Math.sinh(omegaD * tSec));
  }
  return 1 - displacement;
}

/** Time (ms) for the spring to stay within SETTLE_THRESHOLD of its target. */
export function springDurationMs(cfg: SpringConfig): number {
  const mass = cfg.mass ?? 1;
  const omega0 = Math.sqrt(cfg.stiffness / mass);
  const zeta = cfg.damping / (2 * Math.sqrt(cfg.stiffness * mass));
  // Slowest decay rate: the envelope for zeta <= 1, the slow pole above it.
  const decayRate = zeta <= 1
    ? zeta * omega0
    : omega0 * (zeta - Math.sqrt(zeta * zeta - 1));
  const settleSec = Math.log(1 / SETTLE_THRESHOLD) / decayRate;
  return Math.ceil(settleSec * 1000);
}

/**
 * Compile a spring into `{ easing, durationMs }` where `easing` is a CSS
 * `linear()` function with evenly spaced stops.
 */
export function springToLinearEasing(
  spring: SpringPreset | SpringConfig,
  samples: number = DEFAULT_SAMPLES,
): { easing: string; durationMs: number } {
  const cfg = typeof spring === 'string' ? SPRING_PRESETS[spring] : spring;
  const durationMs = springDurationMs(cfg);
  const durationSec = durationMs / 1000;

  const stops: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const progress = i / samples;
    const value = i === samples ? 1 : sampleSpring(cfg, progress * durationSec);
    // Round to 4 decimals to keep the string compact and deterministic.
    stops.push(String(Math.round(value * 10000) / 10000));
  }
  return { easing: `linear(${stops.join(', ')})`, durationMs };
}
