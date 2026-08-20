/**
 * AgentEventStream — the typed emitter for the AgentEvent union.
 *
 * Serves both consumption styles already present in core: synchronous
 * listeners (`on`, like the coordinator's config callbacks) and
 * `for await…of` (like the clients' AsyncGenerators). Dependency-free,
 * no timers, no Date.now — events carry their own caller-supplied `ts`.
 *
 * Iterator semantics: an async iterator receives every event emitted AFTER
 * its creation (no replay buffer — this is a live stream, not an event log).
 * `close()` ends all iterators and makes further `emit` throw.
 */
import { isAgentEvent, type AgentEvent } from './events.js';

export type AgentEventListener = (event: AgentEvent) => void;

interface IteratorChannel {
  queue: AgentEvent[];
  /** Set while the iterator is awaiting an empty queue. */
  wake: (() => void) | null;
  done: boolean;
}

export class AgentEventStream implements AsyncIterable<AgentEvent> {
  private _listeners = new Set<AgentEventListener>();
  private _channels = new Set<IteratorChannel>();
  private _closed = false;

  /** Whether close() has been called. */
  get closed(): boolean {
    return this._closed;
  }

  /**
   * Emit one event to every listener and every live iterator.
   * Throws on a closed stream or a malformed event (fail closed).
   */
  emit(event: AgentEvent): void {
    if (this._closed) {
      throw new Error('AgentEventStream is closed');
    }
    if (!isAgentEvent(event)) {
      throw new Error('emit() received a value that is not a valid AgentEvent');
    }
    for (const listener of this._listeners) {
      try {
        listener(event);
      } catch {
        // One consumer's bug must not starve the others.
      }
    }
    for (const channel of this._channels) {
      channel.queue.push(event);
      channel.wake?.();
    }
  }

  /** Register a synchronous listener. Returns an idempotent unsubscribe. */
  on(listener: AgentEventListener): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  /** End the stream: all iterators complete, further emit() throws. */
  close(): void {
    if (this._closed) return;
    this._closed = true;
    this._listeners.clear();
    for (const channel of this._channels) {
      channel.done = true;
      channel.wake?.();
    }
  }

  [Symbol.asyncIterator](): AsyncIterator<AgentEvent> {
    const channel: IteratorChannel = { queue: [], wake: null, done: this._closed };
    this._channels.add(channel);

    const finish = (): IteratorResult<AgentEvent> => {
      this._channels.delete(channel);
      return { value: undefined, done: true };
    };

    return {
      next: async (): Promise<IteratorResult<AgentEvent>> => {
        while (channel.queue.length === 0) {
          if (channel.done) return finish();
          await new Promise<void>((resolve) => {
            channel.wake = resolve;
          });
          channel.wake = null;
        }
        return { value: channel.queue.shift()!, done: false };
      },
      return: async (): Promise<IteratorResult<AgentEvent>> => {
        channel.done = true;
        return finish();
      },
    };
  }
}
