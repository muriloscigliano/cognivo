import type { SemanticCacheEntry } from './semantic-types.js';
import type { AiResult } from '../results/types.js';
import { cosineSimilarity } from './vector-utils.js';

/**
 * Semantic Cache Store
 *
 * Stores cache entries with embeddings and supports similarity-based lookup.
 * Uses cosine similarity to find semantically similar queries.
 */
export class SemanticCacheStore {
  private entries: Map<string, SemanticCacheEntry> = new Map();
  private maxEntries: number;
  private ttlMs: number;

  constructor(maxEntries = 100, ttlMs = 300000) {
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
  }

  /** Exact match lookup by key */
  getExact(key: string): AiResult | undefined {
    const entry = this.entries.get(key);
    if (entry === undefined) return undefined;
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.entries.delete(key);
      return undefined;
    }
    entry.hits++;
    return entry.result;
  }

  /** Semantic match lookup by embedding similarity */
  getSemantic(
    embedding: number[],
    threshold: number,
  ): { result: AiResult; similarity: number; key: string } | undefined {
    let bestMatch: { result: AiResult; similarity: number; key: string } | undefined;
    const now = Date.now();

    for (const [key, entry] of this.entries) {
      if (now - entry.timestamp > this.ttlMs) {
        this.entries.delete(key);
        continue;
      }
      const sim = cosineSimilarity(embedding, entry.embedding);
      if (sim >= threshold && (bestMatch === undefined || sim > bestMatch.similarity)) {
        bestMatch = { result: entry.result, similarity: sim, key };
      }
    }

    if (bestMatch !== undefined) {
      const entry = this.entries.get(bestMatch.key);
      if (entry !== undefined) entry.hits++;
    }

    return bestMatch;
  }

  /** Store an entry with its embedding */
  set(key: string, result: AiResult, embedding: number[]): void {
    // Evict oldest if at capacity
    if (this.entries.size >= this.maxEntries && !this.entries.has(key)) {
      const oldest = this.entries.keys().next().value;
      if (oldest !== undefined) this.entries.delete(oldest);
    }
    this.entries.set(key, {
      key,
      result,
      embedding,
      timestamp: Date.now(),
      hits: 0,
    });
  }

  /** Get cache statistics */
  get size(): number {
    return this.entries.size;
  }

  /** Clear all entries */
  clear(): void {
    this.entries.clear();
  }
}
