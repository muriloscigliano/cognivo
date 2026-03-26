import { describe, it, expect } from 'vitest';
import {
  BiasRegistry,
  registry,
  getAllBiases,
  queryBiases,
  getStatistics,
} from '../utils/bias-registry.js';
import { BiasCategory } from '../biases/core/types.js';

describe('BiasRegistry', () => {
  it('creates a registry instance', () => {
    const reg = new BiasRegistry();
    expect(reg).toBeInstanceOf(BiasRegistry);
  });

  it('loads all biases', () => {
    const reg = new BiasRegistry();
    const all = reg.getAll();
    expect(all.length).toBeGreaterThanOrEqual(170);
  });

  it('gets bias by ID', () => {
    const reg = new BiasRegistry();
    const bias = reg.getById('anchoring-bias');
    expect(bias).toBeDefined();
    expect(bias?.metadata.id).toBe('anchoring-bias');
    expect(bias?.metadata.name).toBeTruthy();
  });

  it('returns undefined for unknown ID', () => {
    const reg = new BiasRegistry();
    expect(reg.getById('nonexistent-bias')).toBeUndefined();
  });

  it('gets biases by category', () => {
    const reg = new BiasRegistry();
    const biases = reg.getByCategory(BiasCategory.DECISION_MAKING);
    expect(biases.length).toBeGreaterThan(0);
  });

  it('gets biases by tag', () => {
    const reg = new BiasRegistry();
    const biases = reg.getByTag('pricing');
    expect(biases.length).toBeGreaterThan(0);
  });
});

describe('Module exports', () => {
  it('exports a singleton registry', () => {
    expect(registry).toBeInstanceOf(BiasRegistry);
  });

  it('getAllBiases returns array', () => {
    const biases = getAllBiases();
    expect(Array.isArray(biases)).toBe(true);
    expect(biases.length).toBeGreaterThanOrEqual(170);
  });

  it('queryBiases filters by search term', () => {
    const results = queryBiases({ searchTerm: 'anchoring' });
    expect(results.length).toBeGreaterThan(0);
  });

  it('getStatistics returns bias counts', () => {
    const stats = getStatistics();
    expect(stats).toBeDefined();
    expect(stats.total).toBeGreaterThanOrEqual(170);
  });
});
