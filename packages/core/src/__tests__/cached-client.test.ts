import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InMemoryLruCache } from '../caching/cache-store.js';
import { CachedClient } from '../caching/cached-client.js';
import { AiIntent } from '../intents/types.js';
import type { AiClient } from '../client/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeContext(data: number[] = [1, 2, 3]): AiContext<number> {
  return { dataset: data };
}

function makeClient(result: AiResult = { explanation: 'ok', confidence: 0.9 }): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue(result),
  };
}

function makeStreamClient(chunks: Partial<AiResult>[]): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
    async *streamIntent() {
      for (const chunk of chunks) {
        yield chunk;
      }
    },
  };
}

// ---------------------------------------------------------------------------
// InMemoryLruCache
// ---------------------------------------------------------------------------

describe('InMemoryLruCache', () => {
  it('stores and retrieves entries', () => {
    const cache = new InMemoryLruCache(10);
    const entry = { result: { explanation: 'test' }, timestamp: Date.now(), hits: 0 };

    cache.set('key1', entry);
    expect(cache.get('key1')).toEqual(entry);
  });

  it('returns undefined for missing keys', () => {
    const cache = new InMemoryLruCache(10);
    expect(cache.get('missing')).toBeUndefined();
  });

  it('evicts the oldest entry when full (LRU)', () => {
    const cache = new InMemoryLruCache(3);
    const now = Date.now();

    cache.set('a', { result: { explanation: 'a' }, timestamp: now, hits: 0 });
    cache.set('b', { result: { explanation: 'b' }, timestamp: now, hits: 0 });
    cache.set('c', { result: { explanation: 'c' }, timestamp: now, hits: 0 });

    // Cache is full — inserting 'd' should evict 'a' (oldest)
    cache.set('d', { result: { explanation: 'd' }, timestamp: now, hits: 0 });

    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBeDefined();
    expect(cache.get('d')).toBeDefined();
    expect(cache.size).toBe(3);
  });

  it('get moves entry to most-recent position', () => {
    const cache = new InMemoryLruCache(3);
    const now = Date.now();

    cache.set('a', { result: { explanation: 'a' }, timestamp: now, hits: 0 });
    cache.set('b', { result: { explanation: 'b' }, timestamp: now, hits: 0 });
    cache.set('c', { result: { explanation: 'c' }, timestamp: now, hits: 0 });

    // Access 'a' to make it most recent
    cache.get('a');

    // Insert 'd' — should evict 'b' (now the oldest), not 'a'
    cache.set('d', { result: { explanation: 'd' }, timestamp: now, hits: 0 });

    expect(cache.get('a')).toBeDefined();
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBeDefined();
    expect(cache.get('d')).toBeDefined();
  });

  it('delete removes an entry and returns true', () => {
    const cache = new InMemoryLruCache(10);
    cache.set('key1', { result: { explanation: 'x' }, timestamp: Date.now(), hits: 0 });

    expect(cache.delete('key1')).toBe(true);
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.size).toBe(0);
  });

  it('delete returns false for missing key', () => {
    const cache = new InMemoryLruCache(10);
    expect(cache.delete('nope')).toBe(false);
  });

  it('clear removes all entries', () => {
    const cache = new InMemoryLruCache(10);
    cache.set('a', { result: { explanation: 'a' }, timestamp: Date.now(), hits: 0 });
    cache.set('b', { result: { explanation: 'b' }, timestamp: Date.now(), hits: 0 });

    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.get('a')).toBeUndefined();
  });

  it('size reflects the number of entries', () => {
    const cache = new InMemoryLruCache(10);
    expect(cache.size).toBe(0);

    cache.set('a', { result: { explanation: 'a' }, timestamp: Date.now(), hits: 0 });
    expect(cache.size).toBe(1);

    cache.set('b', { result: { explanation: 'b' }, timestamp: Date.now(), hits: 0 });
    expect(cache.size).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// CachedClient
// ---------------------------------------------------------------------------

describe('CachedClient', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the inner client on a cache miss', async () => {
    const inner = makeClient({ explanation: 'fresh' });
    const cached = new CachedClient(inner, { ttl: 60_000 });

    const result = await cached.runIntent(AiIntent.EXPLAIN, makeContext());

    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('fresh');
  });

  it('returns cached result without calling inner on a cache hit', async () => {
    const inner = makeClient({ explanation: 'original', confidence: 0.9 });
    const cached = new CachedClient(inner, { ttl: 60_000 });
    const ctx = makeContext();

    // First call — cache miss
    await cached.runIntent(AiIntent.EXPLAIN, ctx);

    // Second call — cache hit
    const result = await cached.runIntent(AiIntent.EXPLAIN, ctx);

    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('original');
  });

  it('sets fromCache and cacheHits metadata on cache hits', async () => {
    const inner = makeClient({ explanation: 'data' });
    const cached = new CachedClient(inner, { ttl: 60_000 });
    const ctx = makeContext();

    await cached.runIntent(AiIntent.SUMMARIZE, ctx);
    const hit1 = await cached.runIntent(AiIntent.SUMMARIZE, ctx);
    const hit2 = await cached.runIntent(AiIntent.SUMMARIZE, ctx);

    expect(hit1.metadata?.fromCache).toBe(true);
    expect(hit1.metadata?.cacheHits).toBe(1);
    expect(hit2.metadata?.fromCache).toBe(true);
    expect(hit2.metadata?.cacheHits).toBe(2);
  });

  it('expires entries after TTL', async () => {
    const inner = makeClient({ explanation: 'fresh' });
    const cached = new CachedClient(inner, { ttl: 5_000 });
    const ctx = makeContext();

    await cached.runIntent(AiIntent.EXPLAIN, ctx);
    expect(inner.runIntent).toHaveBeenCalledTimes(1);

    // Advance time past TTL
    vi.advanceTimersByTime(6_000);

    await cached.runIntent(AiIntent.EXPLAIN, ctx);
    expect(inner.runIntent).toHaveBeenCalledTimes(2);
  });

  it('bypasses cache when options.cache is false', async () => {
    const inner = makeClient({ explanation: 'live' });
    const cached = new CachedClient(inner, { ttl: 60_000 });
    const ctx = makeContext();

    await cached.runIntent(AiIntent.EXPLAIN, ctx);
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { cache: false });

    expect(inner.runIntent).toHaveBeenCalledTimes(2);
  });

  it('only caches intents in cacheableIntents list', async () => {
    const inner = makeClient({ explanation: 'result' });
    const cached = new CachedClient(inner, {
      ttl: 60_000,
      cacheableIntents: [AiIntent.SUMMARIZE],
    });
    const ctx = makeContext();

    // EXPLAIN is not cacheable
    await cached.runIntent(AiIntent.EXPLAIN, ctx);
    await cached.runIntent(AiIntent.EXPLAIN, ctx);
    expect(inner.runIntent).toHaveBeenCalledTimes(2);

    // SUMMARIZE is cacheable
    await cached.runIntent(AiIntent.SUMMARIZE, ctx);
    await cached.runIntent(AiIntent.SUMMARIZE, ctx);
    expect(inner.runIntent).toHaveBeenCalledTimes(3); // Only 1 more call, second was cached
  });

  it('produces different cache keys for different intents', async () => {
    const inner = makeClient({ explanation: 'shared' });
    const cached = new CachedClient(inner, { ttl: 60_000 });
    const ctx = makeContext();

    await cached.runIntent(AiIntent.EXPLAIN, ctx);
    await cached.runIntent(AiIntent.SUMMARIZE, ctx);

    // Both should have called inner — different intents = different keys
    expect(inner.runIntent).toHaveBeenCalledTimes(2);
  });

  it('produces different cache keys for different datasets', async () => {
    const inner = makeClient({ explanation: 'data' });
    const cached = new CachedClient(inner, { ttl: 60_000 });

    await cached.runIntent(AiIntent.EXPLAIN, makeContext([1, 2]));
    await cached.runIntent(AiIntent.EXPLAIN, makeContext([3, 4]));

    expect(inner.runIntent).toHaveBeenCalledTimes(2);
  });

  it('produces different cache keys for different result-affecting options', async () => {
    const inner = makeClient({ explanation: 'data' });
    const cached = new CachedClient(inner, { ttl: 60_000 });
    const ctx = makeContext();

    // Same intent + dataset, but each option that changes the result must
    // miss the cache rather than collide with the first response.
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { model: 'gpt-4' });
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { model: 'claude-3-opus' });
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { model: 'gpt-4', temperature: 0.2 });
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { model: 'gpt-4', temperature: 0.9 });
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { model: 'gpt-4', systemPrompt: 'be terse' });

    expect(inner.runIntent).toHaveBeenCalledTimes(5);
  });

  it('hits the cache when only operational options (timeout) differ', async () => {
    const inner = makeClient({ explanation: 'data' });
    const cached = new CachedClient(inner, { ttl: 60_000 });
    const ctx = makeContext();

    // timeout does not change the result, so it must not fragment the cache.
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { model: 'gpt-4', timeout: 1000 });
    await cached.runIntent(AiIntent.EXPLAIN, ctx, { model: 'gpt-4', timeout: 9000 });

    expect(inner.runIntent).toHaveBeenCalledTimes(1);
  });

  it('streamIntent delegates to inner client without caching', async () => {
    const inner = makeStreamClient([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
    const cached = new CachedClient(inner, { ttl: 60_000 });

    const collected: Partial<AiResult>[] = [];
    for await (const chunk of cached.streamIntent!(AiIntent.EXPLAIN, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
  });
});
