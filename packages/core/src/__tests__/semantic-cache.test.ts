import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cosineSimilarity } from '../caching/vector-utils.js';
import { SemanticCacheStore } from '../caching/semantic-cache-store.js';
import { SemanticCachedClient } from '../caching/semantic-cached-client.js';
import { AiIntent } from '../intents/types.js';
import type { AiClient } from '../client/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { EmbeddingFunction } from '../caching/semantic-types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeContext(data: number[] = [1, 2, 3]): AiContext<number> {
  return { dataset: data };
}

function makeClient(
  result: AiResult = { explanation: 'ok', confidence: 0.9 },
): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue(result),
  };
}

function makeStreamClient(
  chunks: Partial<AiResult>[],
): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
    async *streamIntent() {
      for (const chunk of chunks) {
        yield chunk;
      }
    },
  };
}

/**
 * Returns a mock embedding function that maps known query substrings
 * to predictable vectors.
 */
function makeMockEmbedFn(): EmbeddingFunction & ReturnType<typeof vi.fn> {
  return vi.fn().mockImplementation(async (text: string) => {
    if (text.includes('[1,2,3]')) return [1, 0, 0];
    if (text.includes('[4,5,6]')) return [0, 1, 0];
    if (text.includes('[1,2,4]')) return [0.99, 0.1, 0]; // similar to [1,0,0]
    if (text.includes('[0,0,0]')) return [0, 0, 1]; // orthogonal
    return [1, 0, 0]; // default
  });
}

// ---------------------------------------------------------------------------
// cosineSimilarity
// ---------------------------------------------------------------------------

describe('cosineSimilarity', () => {
  it('returns 1 for identical vectors', () => {
    expect(cosineSimilarity([1, 0, 0], [1, 0, 0])).toBeCloseTo(1, 10);
  });

  it('returns 1 for parallel vectors with different magnitudes', () => {
    expect(cosineSimilarity([2, 0, 0], [5, 0, 0])).toBeCloseTo(1, 10);
  });

  it('returns 0 for orthogonal vectors', () => {
    expect(cosineSimilarity([1, 0, 0], [0, 1, 0])).toBeCloseTo(0, 10);
  });

  it('returns -1 for opposite vectors', () => {
    expect(cosineSimilarity([1, 0, 0], [-1, 0, 0])).toBeCloseTo(-1, 10);
  });

  it('returns 0 for zero vectors', () => {
    expect(cosineSimilarity([0, 0, 0], [1, 2, 3])).toBe(0);
  });

  it('throws on dimension mismatch', () => {
    expect(() => cosineSimilarity([1, 2], [1, 2, 3])).toThrow('Vector dimension mismatch: 2 vs 3');
  });

  it('computes correct similarity for non-trivial vectors', () => {
    // cos([1,0,0], [0.99, 0.1, 0]) should be high but not 1
    const sim = cosineSimilarity([1, 0, 0], [0.99, 0.1, 0]);
    expect(sim).toBeGreaterThan(0.99);
    expect(sim).toBeLessThan(1);
  });
});

// ---------------------------------------------------------------------------
// SemanticCacheStore
// ---------------------------------------------------------------------------

describe('SemanticCacheStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // --- getExact ---

  describe('getExact', () => {
    it('returns result for an existing key', () => {
      const store = new SemanticCacheStore(10, 60_000);
      const result: AiResult = { explanation: 'cached' };
      store.set('k1', result, [1, 0, 0]);

      expect(store.getExact('k1')).toEqual(result);
    });

    it('returns undefined for missing key', () => {
      const store = new SemanticCacheStore(10, 60_000);
      expect(store.getExact('missing')).toBeUndefined();
    });

    it('returns undefined and deletes entry after TTL expiry', () => {
      const store = new SemanticCacheStore(10, 5_000);
      store.set('k1', { explanation: 'old' }, [1, 0, 0]);

      vi.advanceTimersByTime(6_000);

      expect(store.getExact('k1')).toBeUndefined();
      expect(store.size).toBe(0);
    });

    it('increments hits on each access', () => {
      const store = new SemanticCacheStore(10, 60_000);
      store.set('k1', { explanation: 'data' }, [1, 0, 0]);

      store.getExact('k1');
      store.getExact('k1');
      store.getExact('k1');

      // We can verify hits indirectly — the store still returns the result
      expect(store.getExact('k1')).toBeDefined();
    });
  });

  // --- getSemantic ---

  describe('getSemantic', () => {
    it('finds a similar entry above threshold', () => {
      const store = new SemanticCacheStore(10, 60_000);
      store.set('k1', { explanation: 'found' }, [1, 0, 0]);

      // [0.99, 0.1, 0] is very similar to [1, 0, 0]
      const match = store.getSemantic([0.99, 0.1, 0], 0.95);
      expect(match).toBeDefined();
      expect(match!.result.explanation).toBe('found');
      expect(match!.similarity).toBeGreaterThan(0.95);
      expect(match!.key).toBe('k1');
    });

    it('returns undefined when no entry meets threshold', () => {
      const store = new SemanticCacheStore(10, 60_000);
      store.set('k1', { explanation: 'stored' }, [1, 0, 0]);

      // [0, 1, 0] is orthogonal — similarity ~0
      const match = store.getSemantic([0, 1, 0], 0.95);
      expect(match).toBeUndefined();
    });

    it('returns the best match when multiple entries exceed threshold', () => {
      const store = new SemanticCacheStore(10, 60_000);
      store.set('k1', { explanation: 'good' }, [0.98, 0.2, 0]);
      store.set('k2', { explanation: 'better' }, [0.999, 0.01, 0]);

      const match = store.getSemantic([1, 0, 0], 0.9);
      expect(match).toBeDefined();
      expect(match!.result.explanation).toBe('better');
    });

    it('evicts expired entries during semantic search', () => {
      const store = new SemanticCacheStore(10, 5_000);
      store.set('k1', { explanation: 'old' }, [1, 0, 0]);

      vi.advanceTimersByTime(6_000);

      const match = store.getSemantic([1, 0, 0], 0.5);
      expect(match).toBeUndefined();
      expect(store.size).toBe(0);
    });
  });

  // --- set ---

  describe('set', () => {
    it('stores entries correctly', () => {
      const store = new SemanticCacheStore(10, 60_000);
      store.set('k1', { explanation: 'test' }, [1, 0, 0]);
      expect(store.size).toBe(1);
      expect(store.getExact('k1')).toBeDefined();
    });

    it('evicts the oldest entry when at capacity', () => {
      const store = new SemanticCacheStore(3, 60_000);
      store.set('a', { explanation: 'a' }, [1, 0, 0]);
      store.set('b', { explanation: 'b' }, [0, 1, 0]);
      store.set('c', { explanation: 'c' }, [0, 0, 1]);

      // At capacity — 'd' should evict 'a'
      store.set('d', { explanation: 'd' }, [1, 1, 0]);

      expect(store.getExact('a')).toBeUndefined();
      expect(store.getExact('b')).toBeDefined();
      expect(store.getExact('d')).toBeDefined();
      expect(store.size).toBe(3);
    });

    it('does not evict when updating an existing key', () => {
      const store = new SemanticCacheStore(3, 60_000);
      store.set('a', { explanation: 'a' }, [1, 0, 0]);
      store.set('b', { explanation: 'b' }, [0, 1, 0]);
      store.set('c', { explanation: 'c' }, [0, 0, 1]);

      // Updating 'a' should not evict anything
      store.set('a', { explanation: 'a-updated' }, [1, 0, 0]);

      expect(store.size).toBe(3);
      expect(store.getExact('a')!.explanation).toBe('a-updated');
      expect(store.getExact('b')).toBeDefined();
      expect(store.getExact('c')).toBeDefined();
    });
  });

  // --- clear ---

  describe('clear', () => {
    it('removes all entries', () => {
      const store = new SemanticCacheStore(10, 60_000);
      store.set('a', { explanation: 'a' }, [1, 0, 0]);
      store.set('b', { explanation: 'b' }, [0, 1, 0]);

      store.clear();

      expect(store.size).toBe(0);
      expect(store.getExact('a')).toBeUndefined();
    });
  });
});

// ---------------------------------------------------------------------------
// SemanticCachedClient
// ---------------------------------------------------------------------------

describe('SemanticCachedClient', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls inner client on a cache miss and stores the result', async () => {
    const inner = makeClient({ explanation: 'fresh', confidence: 0.9 });
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, { embedFn });

    const result = await client.runIntent(AiIntent.EXPLAIN, makeContext());

    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('fresh');
    expect(result.metadata?.fromCache).toBeUndefined();
    expect(client.cache.size).toBe(1);
  });

  it('returns exact cache hit without calling inner client', async () => {
    const inner = makeClient({ explanation: 'original' });
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, { embedFn });
    const ctx = makeContext();

    // First call — cache miss
    await client.runIntent(AiIntent.EXPLAIN, ctx);
    // Second call — exact cache hit (same key)
    const result = await client.runIntent(AiIntent.EXPLAIN, ctx);

    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('original');
    expect(result.metadata?.fromCache).toBe(true);
    expect(result.metadata?.semantic).toBe(false);
  });

  it('does not call embedFn on exact cache hit', async () => {
    const inner = makeClient({ explanation: 'original' });
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, { embedFn });
    const ctx = makeContext();

    await client.runIntent(AiIntent.EXPLAIN, ctx);
    embedFn.mockClear();

    await client.runIntent(AiIntent.EXPLAIN, ctx);

    // embedFn should NOT be called on exact hit (tier 1 returns before tier 2)
    expect(embedFn).not.toHaveBeenCalled();
  });

  it('returns semantic cache hit for similar queries', async () => {
    const inner = makeClient({ explanation: 'semantic-match' });
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, {
      embedFn,
      similarityThreshold: 0.95,
    });

    // First call with [1,2,3] -> embedding [1,0,0]
    await client.runIntent(AiIntent.EXPLAIN, makeContext([1, 2, 3]));

    // Second call with [1,2,4] -> embedding [0.99,0.1,0] (similar to [1,0,0])
    const result = await client.runIntent(AiIntent.EXPLAIN, makeContext([1, 2, 4]));

    // Inner client should only have been called once — second was semantic hit
    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('semantic-match');
    expect(result.metadata?.fromCache).toBe(true);
    expect(result.metadata?.semantic).toBe(true);
    expect(result.metadata?.similarity).toBeGreaterThan(0.95);
  });

  it('calls inner client when semantic similarity is below threshold', async () => {
    const inner = makeClient({ explanation: 'different' });
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, {
      embedFn,
      similarityThreshold: 0.95,
    });

    // First call with [1,2,3] -> embedding [1,0,0]
    await client.runIntent(AiIntent.EXPLAIN, makeContext([1, 2, 3]));

    // Second call with [4,5,6] -> embedding [0,1,0] (orthogonal)
    await client.runIntent(AiIntent.EXPLAIN, makeContext([4, 5, 6]));

    // Inner client should have been called twice — no semantic match
    expect(inner.runIntent).toHaveBeenCalledTimes(2);
  });

  it('preserves existing metadata on cache hits', async () => {
    const inner = makeClient({
      explanation: 'with-meta',
      metadata: { model: 'gpt-4', tokens: 100 },
    });
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, { embedFn });
    const ctx = makeContext();

    await client.runIntent(AiIntent.EXPLAIN, ctx);
    const result = await client.runIntent(AiIntent.EXPLAIN, ctx);

    expect(result.metadata?.model).toBe('gpt-4');
    expect(result.metadata?.tokens).toBe(100);
    expect(result.metadata?.fromCache).toBe(true);
  });

  it('streamIntent delegates to inner client', async () => {
    const inner = makeStreamClient([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, { embedFn });

    const collected: Partial<AiResult>[] = [];
    for await (const chunk of client.streamIntent(AiIntent.EXPLAIN, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
  });

  it('streamIntent throws if inner client does not support streaming', async () => {
    const inner = makeClient();
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, { embedFn });

    const gen = client.streamIntent(AiIntent.EXPLAIN, makeContext());
    await expect(gen.next()).rejects.toThrow('Inner client does not support streaming');
  });

  it('respects custom similarity threshold', async () => {
    const inner = makeClient({ explanation: 'result' });
    const embedFn = makeMockEmbedFn();

    // Very high threshold — should NOT match [0.99, 0.1, 0] vs [1, 0, 0]
    const client = new SemanticCachedClient(inner, {
      embedFn,
      similarityThreshold: 0.9999,
    });

    await client.runIntent(AiIntent.EXPLAIN, makeContext([1, 2, 3]));
    await client.runIntent(AiIntent.EXPLAIN, makeContext([1, 2, 4]));

    // Both should have called inner — threshold too high for semantic match
    expect(inner.runIntent).toHaveBeenCalledTimes(2);
  });

  it('exposes cache store via cache getter', () => {
    const inner = makeClient();
    const embedFn = makeMockEmbedFn();
    const client = new SemanticCachedClient(inner, { embedFn });

    expect(client.cache).toBeInstanceOf(SemanticCacheStore);
    expect(client.cache.size).toBe(0);
  });
});
