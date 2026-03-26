import type { AiIntent } from '../intents/types.js';
import type { AiResult } from '../results/types.js';

/**
 * A single cache entry storing a result with timing and hit metadata.
 */
export interface CacheEntry {
  /** The cached AI result */
  result: AiResult;

  /** Timestamp (ms since epoch) when the entry was stored */
  timestamp: number;

  /** Number of times this entry has been returned from cache */
  hits: number;
}

/**
 * Abstraction for a synchronous key-value cache store.
 *
 * Implementations may use in-memory maps, localStorage, IndexedDB, etc.
 */
export interface CacheStore {
  /** Retrieve an entry by key, or undefined if not found */
  get(key: string): CacheEntry | undefined;

  /** Store an entry under the given key */
  set(key: string, entry: CacheEntry): void;

  /** Delete a single entry. Returns true if the key existed. */
  delete(key: string): boolean;

  /** Remove all entries */
  clear(): void;

  /** Number of entries currently in the store */
  readonly size: number;
}

/**
 * Configuration for the CachedClient decorator.
 */
export interface CachedClientConfig {
  /** Custom cache store implementation. Defaults to InMemoryLruCache. */
  store?: CacheStore;

  /** Time-to-live in milliseconds. Default: 300000 (5 minutes) */
  ttl?: number;

  /** Maximum number of entries before LRU eviction. Default: 100 */
  maxEntries?: number;

  /** If set, only cache results for these intents. If undefined, cache all. */
  cacheableIntents?: AiIntent[];
}
