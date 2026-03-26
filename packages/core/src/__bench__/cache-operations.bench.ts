import { bench, describe } from 'vitest';
import { InMemoryLruCache } from '../caching/cache-store.js';
import type { CacheEntry } from '../caching/types.js';

/**
 * Helper to create a minimal valid CacheEntry for benchmarking.
 */
function makeEntry(i: number): CacheEntry {
  return {
    result: { explanation: `result-${i}`, confidence: 0.95 },
    timestamp: Date.now(),
    hits: 0,
  };
}

// ---------------------------------------------------------------------------
// SET operations
// ---------------------------------------------------------------------------
describe('InMemoryLruCache — set', () => {
  bench('set 100 entries', () => {
    const cache = new InMemoryLruCache(100);
    for (let i = 0; i < 100; i++) {
      cache.set(`key-${i}`, makeEntry(i));
    }
  });

  bench('set 1,000 entries', () => {
    const cache = new InMemoryLruCache(1_000);
    for (let i = 0; i < 1_000; i++) {
      cache.set(`key-${i}`, makeEntry(i));
    }
  });

  bench('set 10,000 entries', () => {
    const cache = new InMemoryLruCache(10_000);
    for (let i = 0; i < 10_000; i++) {
      cache.set(`key-${i}`, makeEntry(i));
    }
  });
});

// ---------------------------------------------------------------------------
// GET operations — cache hits
// ---------------------------------------------------------------------------
describe('InMemoryLruCache — get (hit)', () => {
  const cache100 = new InMemoryLruCache(100);
  for (let i = 0; i < 100; i++) cache100.set(`key-${i}`, makeEntry(i));

  const cache1k = new InMemoryLruCache(1_000);
  for (let i = 0; i < 1_000; i++) cache1k.set(`key-${i}`, makeEntry(i));

  const cache10k = new InMemoryLruCache(10_000);
  for (let i = 0; i < 10_000; i++) cache10k.set(`key-${i}`, makeEntry(i));

  bench('get (hit) from 100 entries', () => {
    for (let i = 0; i < 100; i++) {
      cache100.get(`key-${i}`);
    }
  });

  bench('get (hit) from 1,000 entries', () => {
    for (let i = 0; i < 1_000; i++) {
      cache1k.get(`key-${i}`);
    }
  });

  bench('get (hit) from 10,000 entries', () => {
    for (let i = 0; i < 10_000; i++) {
      cache10k.get(`key-${i}`);
    }
  });
});

// ---------------------------------------------------------------------------
// GET operations — cache misses
// ---------------------------------------------------------------------------
describe('InMemoryLruCache — get (miss)', () => {
  const cache100 = new InMemoryLruCache(100);
  for (let i = 0; i < 100; i++) cache100.set(`key-${i}`, makeEntry(i));

  const cache1k = new InMemoryLruCache(1_000);
  for (let i = 0; i < 1_000; i++) cache1k.set(`key-${i}`, makeEntry(i));

  const cache10k = new InMemoryLruCache(10_000);
  for (let i = 0; i < 10_000; i++) cache10k.set(`key-${i}`, makeEntry(i));

  bench('get (miss) from 100 entries', () => {
    for (let i = 0; i < 100; i++) {
      cache100.get(`miss-${i}`);
    }
  });

  bench('get (miss) from 1,000 entries', () => {
    for (let i = 0; i < 1_000; i++) {
      cache1k.get(`miss-${i}`);
    }
  });

  bench('get (miss) from 10,000 entries', () => {
    for (let i = 0; i < 10_000; i++) {
      cache10k.get(`miss-${i}`);
    }
  });
});

// ---------------------------------------------------------------------------
// Eviction performance — writing beyond capacity
// ---------------------------------------------------------------------------
describe('InMemoryLruCache — eviction', () => {
  bench('eviction: 200 sets into capacity-100 cache', () => {
    const cache = new InMemoryLruCache(100);
    for (let i = 0; i < 200; i++) {
      cache.set(`key-${i}`, makeEntry(i));
    }
  });

  bench('eviction: 2,000 sets into capacity-1,000 cache', () => {
    const cache = new InMemoryLruCache(1_000);
    for (let i = 0; i < 2_000; i++) {
      cache.set(`key-${i}`, makeEntry(i));
    }
  });

  bench('eviction: 20,000 sets into capacity-10,000 cache', () => {
    const cache = new InMemoryLruCache(10_000);
    for (let i = 0; i < 20_000; i++) {
      cache.set(`key-${i}`, makeEntry(i));
    }
  });
});
