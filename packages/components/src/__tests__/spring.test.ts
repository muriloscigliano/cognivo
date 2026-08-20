import { describe, it, expect } from 'vitest';
import {
  SPRING_PRESETS,
  sampleSpring,
  springDurationMs,
  springToLinearEasing,
  type SpringPreset,
} from '../utils/spring.js';

const PRESETS = Object.keys(SPRING_PRESETS) as SpringPreset[];

describe('spring', () => {
  it('sampleSpring starts at 0 and converges to 1', () => {
    for (const preset of PRESETS) {
      const cfg = SPRING_PRESETS[preset];
      expect(sampleSpring(cfg, 0)).toBeCloseTo(0, 5);
      expect(sampleSpring(cfg, 10)).toBeCloseTo(1, 3);
    }
  });

  it('springDurationMs is positive and finite for all presets', () => {
    for (const preset of PRESETS) {
      const ms = springDurationMs(SPRING_PRESETS[preset]);
      expect(ms).toBeGreaterThan(0);
      expect(Number.isFinite(ms)).toBe(true);
      expect(ms).toBeLessThan(5000);
    }
  });

  it('bouncy overshoots, smooth does not', () => {
    const bouncySamples = Array.from({ length: 200 }, (_, i) =>
      sampleSpring(SPRING_PRESETS.bouncy, (i / 200) * 2));
    const smoothSamples = Array.from({ length: 200 }, (_, i) =>
      sampleSpring(SPRING_PRESETS.smooth, (i / 200) * 2));
    expect(Math.max(...bouncySamples)).toBeGreaterThan(1.01);
    expect(Math.max(...smoothSamples)).toBeLessThanOrEqual(1.001);
  });

  it('springToLinearEasing produces a well-formed linear() easing', () => {
    for (const preset of PRESETS) {
      const { easing, durationMs } = springToLinearEasing(preset);
      expect(easing.startsWith('linear(0')).toBe(true);
      expect(easing.endsWith('1)')).toBe(true);
      const inner = easing.slice('linear('.length, -1);
      const stops = inner.split(', ');
      expect(stops.length).toBeGreaterThanOrEqual(16);
      for (const stop of stops) {
        expect(stop).toMatch(/^-?\d+(\.\d+)?$/);
      }
      expect(durationMs).toBeGreaterThan(0);
    }
  });

  it('accepts a custom config object', () => {
    const { easing, durationMs } = springToLinearEasing({ stiffness: 100, damping: 20 });
    expect(easing.startsWith('linear(')).toBe(true);
    expect(durationMs).toBeGreaterThan(0);
  });

  it('presets produce distinct easings', () => {
    const results = PRESETS.map((p) => springToLinearEasing(p).easing);
    expect(new Set(results).size).toBe(PRESETS.length);
  });

  it('overdamped configs use the two-pole solution: monotonic and slower than critical', () => {
    const overdamped = { stiffness: 100, damping: 40 }; // zeta = 2
    const critical = { stiffness: 100, damping: 20 };   // zeta = 1
    expect(sampleSpring(overdamped, 0)).toBeCloseTo(0, 5);
    const samples = Array.from({ length: 400 }, (_, i) => sampleSpring(overdamped, (i / 400) * 4));
    for (let i = 1; i < samples.length; i++) {
      expect(samples[i]!).toBeGreaterThanOrEqual(samples[i - 1]! - 1e-9); // monotonic
      expect(samples[i]!).toBeLessThanOrEqual(1.001);                    // no overshoot
    }
    expect(sampleSpring(overdamped, 20)).toBeCloseTo(1, 3);
    // The slow pole decays ~4x slower than the critical envelope.
    expect(springDurationMs(overdamped)).toBeGreaterThan(springDurationMs(critical) * 2);
  });
});
