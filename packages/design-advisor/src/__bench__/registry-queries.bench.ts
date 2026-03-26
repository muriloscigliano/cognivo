import { bench, describe } from 'vitest';
import { BiasRegistry } from '../utils/bias-registry.js';
import { BiasCategory, ImpactLevel } from '../biases/core/types.js';

const registry = new BiasRegistry();

// ---------------------------------------------------------------------------
// Query all biases
// ---------------------------------------------------------------------------
describe('BiasRegistry — getAll', () => {
  bench('getAll()', () => {
    registry.getAll();
  });
});

// ---------------------------------------------------------------------------
// Query by category
// ---------------------------------------------------------------------------
describe('BiasRegistry — getByCategory', () => {
  bench('getByCategory(COGNITIVE)', () => {
    registry.getByCategory(BiasCategory.COGNITIVE);
  });

  bench('getByCategory(DECISION_MAKING)', () => {
    registry.getByCategory(BiasCategory.DECISION_MAKING);
  });

  bench('getByCategory(MEMORY)', () => {
    registry.getByCategory(BiasCategory.MEMORY);
  });

  bench('getByCategory(SOCIAL)', () => {
    registry.getByCategory(BiasCategory.SOCIAL);
  });

  bench('getByCategory(PERCEPTION)', () => {
    registry.getByCategory(BiasCategory.PERCEPTION);
  });
});

// ---------------------------------------------------------------------------
// Query by tag
// ---------------------------------------------------------------------------
describe('BiasRegistry — getByTag', () => {
  bench('getByTag("pricing")', () => {
    registry.getByTag('pricing');
  });

  bench('getByTag("conversion")', () => {
    registry.getByTag('conversion');
  });

  bench('getByTag("ux")', () => {
    registry.getByTag('ux');
  });
});

// ---------------------------------------------------------------------------
// Search by text
// ---------------------------------------------------------------------------
describe('BiasRegistry — query with searchTerm', () => {
  bench('search "anchoring"', () => {
    registry.query({ searchTerm: 'anchoring' });
  });

  bench('search "memory"', () => {
    registry.query({ searchTerm: 'memory' });
  });

  bench('search "social proof"', () => {
    registry.query({ searchTerm: 'social proof' });
  });

  bench('search nonexistent term', () => {
    registry.query({ searchTerm: 'xyznonexistent' });
  });
});

// ---------------------------------------------------------------------------
// Combined query filters
// ---------------------------------------------------------------------------
describe('BiasRegistry — advanced query', () => {
  bench('filter by category + tag', () => {
    registry.query({
      categories: [BiasCategory.COGNITIVE],
      tags: ['pricing'],
    });
  });

  bench('filter by category + impact level', () => {
    registry.query({
      categories: [BiasCategory.DECISION_MAKING],
      impactLevel: [ImpactLevel.HIGH, ImpactLevel.CRITICAL],
    });
  });

  bench('filter by multiple categories + searchTerm + limit', () => {
    registry.query({
      categories: [BiasCategory.COGNITIVE, BiasCategory.SOCIAL],
      searchTerm: 'bias',
      limit: 10,
    });
  });
});

// ---------------------------------------------------------------------------
// Get statistics
// ---------------------------------------------------------------------------
describe('BiasRegistry — getStatistics', () => {
  bench('getStatistics()', () => {
    registry.getStatistics();
  });
});

// ---------------------------------------------------------------------------
// Recommend biases
// ---------------------------------------------------------------------------
describe('BiasRegistry — recommend', () => {
  bench('recommend for web design context', () => {
    registry.recommend({
      designType: 'web',
      industry: 'e-commerce',
      userGoals: ['conversion', 'trust'],
    });
  });

  bench('recommend for mobile design context', () => {
    registry.recommend({
      designType: 'mobile',
      userGoals: ['engagement'],
    });
  });

  bench('recommend with minimal context', () => {
    registry.recommend({
      designType: 'web',
    });
  });
});
