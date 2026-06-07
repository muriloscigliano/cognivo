import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { FallbackConfig } from './types.js';

/**
 * FallbackClient — Decorator that wraps multiple AiClients in a failover chain.
 *
 * Iterates through clients in order. If a client throws and `shouldFallback`
 * returns true, the next client is tried. Otherwise, the error is re-thrown.
 *
 * Usage:
 * ```ts
 * const client = new FallbackClient({
 *   clients: [primaryClient, secondaryClient],
 *   onFallback: (err, idx) => console.warn(`Client ${idx} failed`, err),
 * });
 * ```
 */
export class FallbackClient implements AiClient {
  private readonly clients: AiClient[];
  private readonly shouldFallback: (error: Error) => boolean;
  private readonly onFallback: ((error: Error, clientIndex: number) => void) | undefined;

  constructor(config: FallbackConfig) {
    if (!config.clients || config.clients.length === 0) {
      throw new Error('FallbackClient requires at least one client');
    }

    this.clients = [...config.clients];
    this.shouldFallback = config.shouldFallback ?? (() => true);
    this.onFallback = config.onFallback ?? undefined;
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    let lastError: Error | undefined;

    for (let i = 0; i < this.clients.length; i++) {
      const current = this.clients[i]!;
      try {
        return await current.runIntent(intent, context, options);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        const hasMoreClients = i < this.clients.length - 1;

        if (hasMoreClients && this.shouldFallback(lastError)) {
          this.onFallback?.(lastError, i);
          continue;
        }

        throw lastError;
      }
    }

    // Unreachable — loop always returns or throws — but satisfies TypeScript.
    throw lastError ?? new Error('No clients available');
  }

  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): AsyncGenerator<Partial<AiResult>> {
    let lastError: Error | undefined;

    for (let i = 0; i < this.clients.length; i++) {
      const client = this.clients[i]!;

      // Skip clients that don't support streaming.
      if (typeof client.streamIntent !== 'function') {
        const hasMoreClients = i < this.clients.length - 1;
        if (hasMoreClients) {
          this.onFallback?.(
            new Error('Client does not support streaming'),
            i,
          );
          continue;
        }
        throw new Error('No client supports streaming');
      }

      // Track whether this client emitted any chunk. Once a chunk has been
      // yielded downstream we can't take it back, so failing over to another
      // client would splice its full stream after the partial one and corrupt
      // the output. Fallback is therefore only safe BEFORE the first chunk.
      let emitted = false;
      try {
        for await (const chunk of client.streamIntent(intent, context, options)) {
          emitted = true;
          yield chunk;
        }
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        if (emitted) {
          // Mid-stream failure after partial output — surfacing the error is
          // the only correct option; silently replaying another client would
          // duplicate the already-emitted prefix.
          throw lastError;
        }

        const hasMoreClients = i < this.clients.length - 1;

        if (hasMoreClients && this.shouldFallback(lastError)) {
          this.onFallback?.(lastError, i);
          continue;
        }

        throw lastError;
      }
    }

    throw lastError ?? new Error('No clients available');
  }
}
