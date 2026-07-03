import { describe, it, expect, beforeEach } from 'vitest';
import { LazyBiasRegistry } from '../utils/lazy-bias-registry.js';
import { BiasCategory } from '../biases/core/types.js';

// Lazy category loading uses dynamic imports resolved from disk; cold, shared
// CI runners routinely exceed vitest's 5s default. A generous per-test timeout
// keeps these deterministic without masking a genuine hang.
describe('LazyBiasRegistry', { timeout: 30_000 }, () => {
  let registry: LazyBiasRegistry;

  beforeEach(() => {
    registry = new LazyBiasRegistry();
  });

  // =========================================================================
  // loadCategory
  // =========================================================================

  describe('loadCategory', () => {
    it('loads biases from a category', async () => {
      const biases = await registry.loadCategory(BiasCategory.DECISION_MAKING);
      expect(biases.length).toBeGreaterThan(0);
      // Every returned bias should be a valid BiasCard with metadata
      for (const bias of biases) {
        expect(bias.metadata).toBeDefined();
        expect(bias.metadata.id).toBeTruthy();
        expect(bias.metadata.name).toBeTruthy();
      }
    });

    it('returns cached results on second call', async () => {
      const first = await registry.loadCategory(BiasCategory.SOCIAL);
      const second = await registry.loadCategory(BiasCategory.SOCIAL);
      // Should be the exact same array reference (cached)
      expect(first).toBe(second);
    });

    it('loads social biases with expected content', async () => {
      const biases = await registry.loadCategory(BiasCategory.SOCIAL);
      const ids = biases.map(b => b.metadata.id);
      expect(ids).toContain('social-proof');
      expect(ids).toContain('bandwagon-effect');
    });

    it('loads cognitive biases with expected content', async () => {
      const biases = await registry.loadCategory(BiasCategory.COGNITIVE);
      const ids = biases.map(b => b.metadata.id);
      expect(ids).toContain('anchoring-bias');
      expect(ids).toContain('confirmation-bias');
      expect(ids).toContain('framing-effect');
    });

    it('loads memory biases with expected content', async () => {
      const biases = await registry.loadCategory(BiasCategory.MEMORY);
      const ids = biases.map(b => b.metadata.id);
      expect(ids).toContain('peak-end-rule');
      expect(ids).toContain('zeigarnik-effect');
    });

    it('loads decision-making biases with expected content', async () => {
      const biases = await registry.loadCategory(BiasCategory.DECISION_MAKING);
      const ids = biases.map(b => b.metadata.id);
      expect(ids).toContain('loss-aversion');
      expect(ids).toContain('sunk-cost-fallacy');
      expect(ids).toContain('status-quo-bias');
    });

    it('returns empty array for categories with no biases', async () => {
      const biases = await registry.loadCategory(BiasCategory.ATTRIBUTION);
      expect(biases).toEqual([]);
    });

    it('handles emotional category (currently empty)', async () => {
      const biases = await registry.loadCategory(BiasCategory.EMOTIONAL);
      expect(biases).toEqual([]);
    });

    it('loads perception category', async () => {
      const biases = await registry.loadCategory(BiasCategory.PERCEPTION);
      // Perception has at least von-restorff-effect
      const ids = biases.map(b => b.metadata.id);
      expect(ids).toContain('von-restorff-effect');
    });
  });

  // =========================================================================
  // loadAll
  // =========================================================================

  describe('loadAll', () => {
    it('loads all categories and returns all biases', async () => {
      const all = await registry.loadAll();
      // Should have 180 biases total across all categories
      expect(all.length).toBeGreaterThanOrEqual(170);
    });

    it('returns cached results on second call', async () => {
      const first = await registry.loadAll();
      const second = await registry.loadAll();
      // Both should return same count
      expect(first.length).toBe(second.length);
    });

    it('includes biases from multiple categories', async () => {
      const all = await registry.loadAll();
      const ids = all.map(b => b.metadata.id);
      // Spot-check biases from different categories
      expect(ids).toContain('anchoring-bias'); // cognitive
      expect(ids).toContain('social-proof'); // social
      expect(ids).toContain('loss-aversion'); // decision-making
      expect(ids).toContain('peak-end-rule'); // memory
      expect(ids).toContain('von-restorff-effect'); // perception
    });
  });

  // =========================================================================
  // getById
  // =========================================================================

  describe('getById', () => {
    it('finds a known bias', async () => {
      const bias = await registry.getById('anchoring-bias');
      expect(bias).toBeDefined();
      expect(bias?.metadata.id).toBe('anchoring-bias');
      expect(bias?.metadata.name).toBe('Anchoring Bias');
    });

    it('returns undefined for unknown ID', async () => {
      const bias = await registry.getById('nonexistent-bias-xyz');
      expect(bias).toBeUndefined();
    });

    it('finds bias from already-loaded category without full load', async () => {
      // Pre-load only cognitive
      await registry.loadCategory(BiasCategory.COGNITIVE);
      const status = registry.getLoadStatus();
      expect(status.categories).toContain('cognitive');

      // Should find anchoring-bias from already-loaded cognitive category
      const bias = await registry.getById('anchoring-bias');
      expect(bias).toBeDefined();
      expect(bias?.metadata.id).toBe('anchoring-bias');
    });

    it('triggers full load when bias not in loaded categories', async () => {
      // Pre-load only perception
      await registry.loadCategory(BiasCategory.PERCEPTION);

      // social-proof is in social category, should trigger loadAll
      const bias = await registry.getById('social-proof');
      expect(bias).toBeDefined();
      expect(bias?.metadata.id).toBe('social-proof');
    });
  });

  // =========================================================================
  // query
  // =========================================================================

  describe('query', () => {
    it('filters by category and only loads that category', async () => {
      const results = await registry.query({
        category: BiasCategory.SOCIAL,
      });

      expect(results.length).toBeGreaterThan(0);

      // Should only have loaded the social category
      const status = registry.getLoadStatus();
      expect(status.categories).toContain('social');
      // Should NOT have loaded all categories
      expect(status.categories.length).toBeLessThanOrEqual(1);
    });

    it('filters by search text', async () => {
      const results = await registry.query({
        search: 'anchoring',
      });

      expect(results.length).toBeGreaterThan(0);
      // Every result should mention "anchoring" somewhere relevant
      for (const bias of results) {
        const matchesName = bias.metadata.name.toLowerCase().includes('anchoring');
        const matchesAlias = bias.metadata.aliases.some(
          a => a.toLowerCase().includes('anchoring')
        );
        const matchesDefinition = bias.definition.simple.toLowerCase().includes('anchoring');
        const matchesTag = bias.metadata.tags.some(
          t => t.toLowerCase().includes('anchoring')
        );
        expect(matchesName || matchesAlias || matchesDefinition || matchesTag).toBe(true);
      }
    });

    it('filters by tags', async () => {
      const results = await registry.query({
        tags: ['pricing'],
      });

      expect(results.length).toBeGreaterThan(0);
      // Every result should have the 'pricing' tag
      for (const bias of results) {
        expect(bias.metadata.tags).toContain('pricing');
      }
    });

    it('combines category and tag filters', async () => {
      const allCognitive = await registry.loadCategory(BiasCategory.COGNITIVE);
      registry.clear();

      const results = await registry.query({
        category: BiasCategory.COGNITIVE,
        tags: ['pricing'],
      });

      expect(results.length).toBeGreaterThan(0);
      // Should be a subset of all cognitive biases
      expect(results.length).toBeLessThanOrEqual(allCognitive.length);

      for (const bias of results) {
        expect(bias.metadata.tags).toContain('pricing');
      }
    });

    it('combines category and search filters', async () => {
      const results = await registry.query({
        category: BiasCategory.DECISION_MAKING,
        search: 'loss',
      });

      expect(results.length).toBeGreaterThan(0);
    });

    it('returns empty array when no biases match', async () => {
      const results = await registry.query({
        search: 'xyznonexistent999',
      });

      expect(results).toEqual([]);
    });

    it('loads all categories when no category filter specified', async () => {
      await registry.query({
        tags: ['pricing'],
      });

      // Should have loaded all categories since no category filter
      const status = registry.getLoadStatus();
      expect(status.categories.length).toBeGreaterThan(1);
    });
  });

  // =========================================================================
  // getLoadStatus
  // =========================================================================

  describe('getLoadStatus', () => {
    it('reports zero loaded when fresh', () => {
      const status = registry.getLoadStatus();
      expect(status.loaded).toBe(0);
      expect(status.categories).toEqual([]);
    });

    it('reports correct counts after loading a category', async () => {
      const socialBiases = await registry.loadCategory(BiasCategory.SOCIAL);
      const status = registry.getLoadStatus();

      expect(status.loaded).toBe(socialBiases.length);
      expect(status.categories).toContain('social');
    });

    it('reports correct counts after loading multiple categories', async () => {
      const social = await registry.loadCategory(BiasCategory.SOCIAL);
      const cognitive = await registry.loadCategory(BiasCategory.COGNITIVE);
      const status = registry.getLoadStatus();

      expect(status.loaded).toBe(social.length + cognitive.length);
      expect(status.categories).toContain('social');
      expect(status.categories).toContain('cognitive');
    });

    it('does not count empty categories in categories list', async () => {
      await registry.loadCategory(BiasCategory.ATTRIBUTION);
      const status = registry.getLoadStatus();
      expect(status.loaded).toBe(0);
      // Attribution has no biases, so it should not appear
      expect(status.categories).not.toContain('attribution');
    });
  });

  // =========================================================================
  // clear
  // =========================================================================

  describe('clear', () => {
    it('resets the registry to initial state', async () => {
      // Load some data
      await registry.loadAll();
      const statusBefore = registry.getLoadStatus();
      expect(statusBefore.loaded).toBeGreaterThan(0);

      // Clear
      registry.clear();

      const statusAfter = registry.getLoadStatus();
      expect(statusAfter.loaded).toBe(0);
      expect(statusAfter.categories).toEqual([]);
    });

    it('allows reloading after clear', async () => {
      await registry.loadCategory(BiasCategory.SOCIAL);
      registry.clear();

      // Should be able to reload
      const biases = await registry.loadCategory(BiasCategory.SOCIAL);
      expect(biases.length).toBeGreaterThan(0);
    });
  });
});
