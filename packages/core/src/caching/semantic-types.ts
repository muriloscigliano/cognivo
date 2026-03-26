import type { AiResult } from '../results/types.js';

/** Function that generates embeddings for text */
export type EmbeddingFunction = (text: string) => Promise<number[]>;

/** Semantic cache entry with embedding vector */
export interface SemanticCacheEntry {
  key: string;
  result: AiResult;
  embedding: number[];
  timestamp: number;
  hits: number;
}

/** Configuration for semantic cached client */
export interface SemanticCachedClientConfig {
  /** Function to generate embeddings */
  embedFn: EmbeddingFunction;
  /** Similarity threshold (0-1, default 0.95) */
  similarityThreshold?: number;
  /** Maximum cache entries */
  maxEntries?: number;
  /** TTL in milliseconds */
  ttlMs?: number;
}
