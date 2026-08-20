/**
 * AgentEventStream — the typed emitter for the AgentEvent union.
 *
 * Serves both consumption styles already present in core: synchronous
 * listeners (`on`, like the coordinator's config callbacks) and
 * `for await…of` (like the clients' AsyncGenerators). Dependency-free,
 * no timers, no Date.now — events carry their own caller-supplied `ts`.
 *
 * Semantics:
 * - An async iterator receives every event emitted AFTER its creation
 *   (live stream, no replay buffer). An iterator you obtain but never
 *   consume keeps queueing events until it is `return()`ed or the stream
 *   closes — consume or release iterators.
 * - Emits are causally ordered: an emit issued from inside a listener is
 *   queued and dispatched after the current event finishes dispatching,
 *   so every consumer observes cause before effect.
 * - `close()` ends all iterators (after any already-queued events drain)
 *   and makes further `emit` throw. Pending `next()` calls always settle.
 */
import { isAgentEvent, type AgentEvent } from './events.js';

export type AgentEventListener = (event: AgentEvent) => void;

type Waiter = (result: IteratorResult<AgentEvent>) => void;

interface IteratorChannel {
  queue: AgentEvent[];
  /** FIFO of pending next() resolvers — supports concurrent next() calls. */
  waiters: Waiter[];
  done: boolean;
}

function drainChannel(channel: IteratorChannel): void {
  while (channel.waiters.length > 0 && channel.queue.length > 0) {
    channel.waiters.shift()!({ value: channel.queue.shift()!, done: false });
  }
  if (channel.done && channel.queue.length === 0) {
    while (channel.waiters.length > 0) {
      channel.waiters.shift()!({ value: undefined, done: true });
    }
  }
}

export class AgentEventStream implements AsyncIterable<AgentEvent> {
  private _listeners = new Set<AgentEventListener>();
  private _channels = new Set<IteratorChannel>();
  private _closed = false;
  private _dispatchQueue: AgentEvent[] = [];
  private _dispatching = false;

  /** Whether close() has been called. */
  get closed(): boolean {
    return this._closed;
  }

  /**
   * Emit one event to every listener and every live iterator.
   * Throws on a closed stream or a malformed event (fail closed).
   * Re-entrant emits (from inside a listener) are queued so all consumers
   * see events in causal order.
   */
  emit(event: AgentEvent): void {
    if (this._closed) {
      throw new Error('AgentEventStream is closed');
    }
    if (!isAgentEvent(event)) {
      throw new Error('emit() received a value that is not a valid AgentEvent');
    }
    this._dispatchQueue.push(event);
    if (this._dispatching) return;
    this._dispatching = true;
    try {
      while (this._dispatchQueue.length > 0) {
        const next = this._dispatchQueue.shift()!;
        for (const channel of this._channels) {
          channel.queue.push(next);
          drainChannel(channel);
        }
        for (const listener of this._listeners) {
          try {
            listener(next);
          } catch {
            // One consumer's bug must not starve the others.
          }
        }
      }
    } finally {
      this._dispatching = false;
    }
  }

  /** Register a synchronous listener. Returns an idempotent unsubscribe. */
  on(listener: AgentEventListener): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  /**
   * End the stream: iterators drain their queued events then complete,
   * pending next() calls settle, further emit() throws.
   */
  close(): void {
    if (this._closed) return;
    this._closed = true;
    this._listeners.clear();
    for (const channel of this._channels) {
      channel.done = true;
      drainChannel(channel);
    }
  }

  [Symbol.asyncIterator](): AsyncIterator<AgentEvent> {
    const channel: IteratorChannel = { queue: [], waiters: [], done: this._closed };
    this._channels.add(channel);

    return {
      next: (): Promise<IteratorResult<AgentEvent>> => {
        if (channel.queue.length > 0) {
          return Promise.resolve({ value: channel.queue.shift()!, done: false });
        }
        if (channel.done) {
          this._channels.delete(channel);
          return Promise.resolve({ value: undefined, done: true });
        }
        return new Promise<IteratorResult<AgentEvent>>((resolve) => {
          channel.waiters.push(resolve);
        });
      },
      return: (): Promise<IteratorResult<AgentEvent>> => {
        channel.done = true;
        channel.queue.length = 0;
        drainChannel(channel); // settles every pending next() with done
        this._channels.delete(channel);
        return Promise.resolve({ value: undefined, done: true });
      },
    };
  }
}
