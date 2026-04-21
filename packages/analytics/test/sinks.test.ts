import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import {
  consoleSink,
  fetchSink,
  batchSink,
  localStorageSink,
} from '../src/index.js';
import type { AnalyticsEvent } from '../src/index.js';

function makeEvent(overrides: Partial<AnalyticsEvent> = {}): AnalyticsEvent {
  return {
    timestamp: '2026-04-21T12:00:00.000Z',
    component: 'cg-button',
    event: 'cg-button-click',
    detail: { variant: 'primary' },
    page: '/docs',
    sessionId: 'sess_test',
    ...overrides,
  };
}

describe('consoleSink', () => {
  it('logs component + event + detail', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleSink(makeEvent());
    expect(log).toHaveBeenCalledWith(
      '[cognivo/analytics]',
      'cg-button',
      'cg-button-click',
      { variant: 'primary' }
    );
    log.mockRestore();
  });
});

describe('fetchSink', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    fetchMock = vi.fn(() => Promise.resolve({ ok: true } as Response));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });
  afterEach(() => {
    // @ts-expect-error cleanup
    delete (globalThis as any).fetch;
  });

  it('POSTs each event to the configured URL', () => {
    const sink = fetchSink('https://example.com/ingest');
    sink(makeEvent());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://example.com/ingest');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body).component).toBe('cg-button');
  });

  it('swallows network errors', () => {
    fetchMock.mockImplementationOnce(() => Promise.reject(new Error('nope')));
    const sink = fetchSink('https://example.com/ingest');
    expect(() => sink(makeEvent())).not.toThrow();
  });
});

describe('batchSink', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock = vi.fn(() => Promise.resolve({ ok: true } as Response));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    // Force the fetch fallback (no sendBeacon in happy-dom normally).
    if ((navigator as any).sendBeacon) {
      (navigator as any).sendBeacon = undefined;
    }
  });
  afterEach(() => {
    vi.useRealTimers();
    // @ts-expect-error cleanup
    delete (globalThis as any).fetch;
  });

  it('flushes when batchSize is reached', () => {
    const sink = batchSink('https://example.com/ingest', {
      batchSize: 3,
      flushMs: 999999,
    });
    sink(makeEvent());
    sink(makeEvent());
    expect(fetchMock).not.toHaveBeenCalled();
    sink(makeEvent());
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.events).toHaveLength(3);
  });

  it('flushes after flushMs timeout', () => {
    const sink = batchSink('https://example.com/ingest', {
      batchSize: 100,
      flushMs: 1000,
    });
    sink(makeEvent());
    expect(fetchMock).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('no-ops if the queue is empty on flush', () => {
    batchSink('https://example.com/ingest', { batchSize: 2, flushMs: 500 });
    vi.advanceTimersByTime(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('localStorageSink', () => {
  // happy-dom exposes localStorage via a Proxy that blocks property
  // replacement; install a mock Storage object on `globalThis.localStorage`
  // for the duration of each test.
  let store: Record<string, string>;
  let setCount: number;
  let throwOnSet: boolean;
  let originalLocalStorage: PropertyDescriptor | undefined;

  beforeEach(() => {
    store = {};
    setCount = 0;
    throwOnSet = false;

    originalLocalStorage = Object.getOwnPropertyDescriptor(
      globalThis,
      'localStorage'
    );
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k: string) =>
          Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null,
        setItem: (k: string, v: string) => {
          setCount++;
          if (throwOnSet) throw new Error('quota');
          store[k] = v;
        },
        removeItem: (k: string) => {
          delete store[k];
        },
        clear: () => {
          store = {};
        },
      },
    });
  });

  afterEach(() => {
    if (originalLocalStorage) {
      Object.defineProperty(globalThis, 'localStorage', originalLocalStorage);
    } else {
      // @ts-expect-error cleanup
      delete (globalThis as any).localStorage;
    }
  });

  it('appends events under the key', () => {
    const sink = localStorageSink('test:key');
    sink(makeEvent());
    sink(makeEvent({ event: 'cg-submit' }));

    const stored = JSON.parse(store['test:key'] || '[]');
    expect(stored).toHaveLength(2);
    expect(stored[1].event).toBe('cg-submit');
  });

  it('caps stored events at 500', () => {
    const sink = localStorageSink('test:cap');
    for (let i = 0; i < 510; i++) {
      sink(makeEvent({ event: `evt-${i}` }));
    }
    const stored = JSON.parse(store['test:cap'] || '[]');
    expect(stored).toHaveLength(500);
    expect(stored[0].event).toBe('evt-10');
    expect(stored[499].event).toBe('evt-509');
  });

  it('swallows storage errors (quota exceeded, etc.)', () => {
    throwOnSet = true;
    const sink = localStorageSink('test:err');
    expect(() => sink(makeEvent())).not.toThrow();
    expect(setCount).toBeGreaterThan(0); // attempt was made
  });
});
