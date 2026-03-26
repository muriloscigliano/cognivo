/**
 * InMemoryLruCache — Least-Recently-Used cache backed by a Map.
 *
 * Uses Map insertion order for O(1) LRU tracking:
 * - On `get`, the entry is deleted and re-inserted to move it to the end (most recent).
 * - On `set`, if the cache is full, the oldest entry (first in iteration order) is evicted.
 */

import type { CacheEntry, CacheStore } from './types.js';

export class InMemoryLruCache implements CacheStore {
  private readonly maxEntries: number;
  private readonly map = new Map<string, CacheEntry>();

  constructor(maxEntries: number = 100) {
    this.maxEntries = maxEntries;
  }

  get(key: string): CacheEntry | undefined {
    const entry = this.map.get(key);
    if (entry === undefined) {
      return undefined;
    }

    // Move to most-recent position by re-inserting
    this.map.delete(key);
    this.map.set(key, entry);

    return entry;
  }

  set(key: string, entry: CacheEntry): void {
    // If key already exists, remove it first so it moves to the end
    if (this.map.has(key)) {
      this.map.delete(key);
    }

    // Evict oldest entry if at capacity
    if (this.map.size >= this.maxEntries) {
      const oldestKey = this.map.keys().next().value as string;
      this.map.delete(oldestKey);
    }

    this.map.set(key, entry);
  }

  delete(key: string): boolean {
    return this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }
}
